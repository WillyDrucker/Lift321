// ==========================================================================
// ACTIVE WORKOUT SCREEN
//
// Screen displayed when user starts an active workout session.
// Interactive screen with video, weight/reps control, timer, and exercise list.
// Automates flow: completing a set starts timer and advances to next set.
//
// Dependencies: theme tokens, navigation types, workout data
// Used by: Navigation stack (from WorkoutOverview LET'S GO button)
// ==========================================================================

import React, {useState, useMemo, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {getExercisesForWorkout, type SessionType} from '@/services/exerciseService';
import {WorkoutLayout} from '@/features/workout/components/WorkoutLayout';
import {ExerciseSetRow} from '@/features/workout/components/ExerciseSetRow';
import {WorkoutActionCard} from '@/features/workout/components/WorkoutActionCard';
import {VideoCard} from '@/features/workout/components/VideoCard';
import {WeightControlCard} from '@/features/workout/components/WeightControlCard';
import {RepsControlCard} from '@/features/workout/components/RepsControlCard';
import {ActionButton} from '@/components';
import {PencilIcon} from '@/components/icons';
import {useActiveWorkout} from '@/features/workout/context/ActiveWorkoutContext';

// ============================================================================
// TYPES
// ============================================================================

type ActiveWorkoutProps = RootStackScreenProps<'ActiveWorkout'>;

// ============================================================================
// COMPONENT
// ============================================================================

export const ActiveWorkoutScreen: React.FC<ActiveWorkoutProps> = ({
  route,
  navigation,
}) => {
  // ==========================================================================
  // CONTEXT & STATE
  // ==========================================================================

  const {
    config,
    workoutState,
    activeSetKey,
    currentGlobalWeight,
    currentGlobalReps,
    isResting,
    isWorkoutComplete,
    updateSet,
    logSet,
    endRest,
    setGlobalWeight,
    setGlobalReps,
    deleteSet,
    selectSet,
    endWorkout,
  } = useActiveWorkout();

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fallback if context is empty (shouldn't happen in normal flow)
  const workoutType = config?.workoutType || route.params.workoutType;
  const sessionType = config?.sessionType || route.params.sessionType;

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================

  const workoutData = useMemo(() => {
    return getExercisesForWorkout(workoutType, sessionType);
  }, [workoutType, sessionType]);

  // Generate ordered list of set keys for navigation
  const orderedSetKeys = useMemo(() => {
    const keys: string[] = [];
    workoutData.exercises.forEach((exercise) => {
      if (exercise.adjustedSets > 0) {
        for (let i = 1; i <= exercise.adjustedSets; i++) {
          keys.push(`${exercise.exercise_name}-${i}`);
        }
      }
    });
    return keys;
  }, [workoutData]);

  const verticalLineHeight = useMemo(() => {
    const START_OFFSET = 25;
    const SET_HEIGHT = 50; 
    const SET_MARGIN = 5; 
    const GROUP_SPACER = 32; 

    let totalHeight = START_OFFSET;
    let exerciseCount = 0;

    workoutData.exercises.forEach((exercise) => {
      if (exercise.adjustedSets === 0) return;

      if (exerciseCount > 0) {
        totalHeight += GROUP_SPACER;
      }

      totalHeight += exercise.adjustedSets * (SET_HEIGHT + SET_MARGIN);

      exerciseCount++;
    });

    totalHeight -= SET_MARGIN;
    totalHeight -= (SET_HEIGHT / 2);
    totalHeight += (SET_MARGIN / 2);

    return totalHeight;
  }, [workoutData.exercises]);

  // Derive current exercise name from active set key
  const currentExerciseName = useMemo(() => {
      if (!activeSetKey) {
          if (isWorkoutComplete) return 'WORKOUT COMPLETE';
          // Fallback
          if (orderedSetKeys.length > 0) {
              return orderedSetKeys[0].split('-').slice(0, -1).join('-'); 
          }
          return 'WORKOUT';
      }
      const parts = activeSetKey.split('-');
      return parts.slice(0, -1).join('-');
  }, [activeSetKey, orderedSetKeys, isWorkoutComplete]);

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  const handleBackPress = () => navigation.goBack();
  const handleMenuPress = () => setSidebarVisible(true);
  const handleGuidePress = () => navigation.navigate('HelpScreen');
  
  const handleFinishWorkout = useCallback(() => {
    console.log('Workout Finished!', workoutState);
    endWorkout(); // Clears context
    navigation.navigate('Tabs', {screen: 'Home'});
  }, [workoutState, endWorkout, navigation]);

  // ==========================================================================
  // HELPER RENDER FUNCTIONS
  // ==========================================================================

  const getExerciseImage = (exerciseName: string) => {
    const imageName = exerciseName.toLowerCase().replace(/\s+/g, '-');
    const imageMap: Record<string, any> = {
      'bench-press': require('@/assets/images/exercises/bench-press.png'),
      'incline-bench-press': require('@/assets/images/exercises/incline-bench-press.png'),
      'chest-flyes': require('@/assets/images/exercises/chest-flyes.png'),
      'chest-press': require('@/assets/images/exercises/bench-press.png'),
    };
    return imageMap[imageName] || imageMap['bench-press'];
  };

  const renderExerciseSets = (
    exerciseName: string,
    totalSets: number,
  ) => {
    const sets: JSX.Element[] = [];

    for (let setNumber = 1; setNumber <= totalSets; setNumber++) {
      const key = `${exerciseName}-${setNumber}`;
      const isActive = key === activeSetKey;
      
      sets.push(
        <View key={key} style={[styles.setWrapper, isActive && styles.activeSetWrapper]}>
            {isActive && !isEditing && <View style={styles.activeIndicator} />}
            <ExerciseSetRow
            setNumber={setNumber}
            totalSets={totalSets}
            targetReps={10}
            exerciseName={exerciseName}
            exerciseImage={getExerciseImage(exerciseName)}
            sessionType={sessionType}
            initialData={workoutState[key]}
            isEditing={isEditing}
            onPress={() => selectSet(key)}
            onDelete={() => deleteSet(key)}
            onUpdate={(data) => updateSet(key, data)} // Still needed for interface
            />
        </View>
      );
    }

    return sets;
  };

  const renderExercises = () => {
    const exerciseGroups: JSX.Element[] = [];

    workoutData.exercises.forEach((exercise, index) => {
      if (exercise.adjustedSets === 0) return;

      if (index > 0) {
        exerciseGroups.push(
          <View key={`spacer-${index}`} style={styles.exerciseGroupSpacer} />
        );
      }

      exerciseGroups.push(
        <View key={`group-${exercise.exercise_name}`} style={styles.exerciseGroup}>
          {renderExerciseSets(exercise.exercise_name, exercise.adjustedSets)}
        </View>
      );
    });

    return exerciseGroups;
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <WorkoutLayout
      workoutType={workoutType}
      showLetsGoButton={false}
      sidebarVisible={sidebarVisible}
      onSidebarClose={() => setSidebarVisible(false)}
      onSidebarSelect={() => {}}
      onBackPress={handleBackPress}
      onMenuPress={handleMenuPress}
      onGuidePress={handleGuidePress}>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

          {/* 1. Video Card (Collapsible) */}
          <VideoCard exerciseName={currentExerciseName} />

          {/* 2. Weight Control Card */}
          <WeightControlCard 
            initialWeight={currentGlobalWeight}
            onWeightChange={setGlobalWeight}
          />

          {/* 3. Reps Control Card */}
          <RepsControlCard
            initialReps={currentGlobalReps}
            onRepsChange={setGlobalReps}
          />

          {/* 4. Action Card (Log Set / Rest Timer / Finish) */}
          <WorkoutActionCard 
            isResting={isResting}
            isComplete={isWorkoutComplete}
            onLogSet={logSet}
            onEndRest={endRest}
            onFinish={handleFinishWorkout}
          />

          {/* 5. Today's Workout (Exercise List) */}
          <View style={[styles.todaysWorkoutCard, isEditing && styles.cardEditing]}>
            <View style={styles.todaysWorkoutHeader}>
              <Text style={styles.todaysWorkoutText}>TODAY'S WORKOUT</Text>
              <View style={styles.titleConnector} />
              <TouchableOpacity 
                onPress={() => setIsEditing(!isEditing)}
                style={styles.editButton}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
              >
                <PencilIcon 
                    width={28} 
                    height={28} 
                    color={isEditing ? theme.colors.actionWarning : theme.colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            <View style={styles.exerciseTreeContainer}>
              <View style={[styles.verticalLine, {height: verticalLineHeight}]} />
              {renderExercises()}
            </View>
          </View>

          {/* End Workout Button (Visible ONLY if not complete) */}
          {!isWorkoutComplete && (
            <View style={styles.finishButtonContainer}>
               <ActionButton 
                  text="END WORKOUT" 
                  onPress={handleFinishWorkout}
                  style={{backgroundColor: theme.colors.actionWarning}}
                  textStyle={styles.finishButtonText}
              />
            </View>
          )}

        </ScrollView>
    </WorkoutLayout>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.s,
    paddingBottom: 100,
  },
  todaysWorkoutCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    paddingHorizontal: theme.spacing.s,
    paddingBottom: theme.spacing.s,
    marginTop: theme.spacing.s,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  cardEditing: {
    borderColor: theme.colors.actionWarning,
  },
  editButton: {
    marginLeft: theme.spacing.xs,
  },
  todaysWorkoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 13,
    marginBottom: 13,
  },
  todaysWorkoutText: {
    fontSize: theme.typography.fontSize.xl,
    lineHeight: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary,
    textTransform: 'uppercase',
    textAlign: 'center',
    includeFontPadding: false,
  },
  titleConnector: {
    position: 'absolute',
    left: 0,
    top: 12,
    width: 50,
    height: 1,
    backgroundColor: theme.colors.pureWhite,
  },
  exerciseTreeContainer: {
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    left: 0,
    top: -25,
    width: 1,
    backgroundColor: theme.colors.pureWhite,
  },
  exerciseGroup: {
    marginBottom: 0,
  },
  exerciseGroupSpacer: {
    height: 32,
  },
  setWrapper: {
      position: 'relative',
  },
  activeSetWrapper: {
      // Could add visual emphasis here if needed
  },
  activeIndicator: {
      position: 'absolute',
      left: -8,
      top: 10,
      bottom: 10,
      width: 4,
      backgroundColor: theme.colors.actionSuccess,
      borderRadius: 2,
      zIndex: 10,
  },
  finishButtonContainer: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  finishButtonText: {
    fontWeight: 'bold',
  },
});