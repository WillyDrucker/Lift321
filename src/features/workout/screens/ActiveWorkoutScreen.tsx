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

import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {theme} from '@/theme';
import {styles} from './ActiveWorkoutScreen.styles';
import type {RootStackScreenProps} from '@/navigation/types';
import {getExercisesForWorkout, type SessionType} from '@/services/exerciseService';
import {WorkoutLayout} from '@/features/workout/components/WorkoutLayout';
import {ExerciseSetRow} from '@/features/workout/components/ExerciseSetRow';
import {WorkoutActionCard} from '@/features/workout/components/WorkoutActionCard';
import {ExerciseCard} from '@/features/workout/components/ExerciseCard';
import {ToggleableDialControlCard} from '@/features/workout/components/ToggleableDialControlCard';
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
    startWorkout,
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

  // Use config from context (pre-initialized before navigation)
  // Falls back to route params only for edge cases (direct navigation, deep links)
  const workoutType = config?.workoutType || route.params.workoutType;
  const sessionType = config?.sessionType || route.params.sessionType;
  const workoutDay = route.params.day || 'Monday';

  // Fallback initialization only if context wasn't pre-initialized
  // This handles edge cases like deep linking or direct navigation
  useEffect(() => {
    if (!config) {
      startWorkout({
        workoutType: route.params.workoutType,
        sessionType: route.params.sessionType,
      });
    }
  }, [config, startWorkout, route.params.workoutType, route.params.sessionType]);

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

  // Derive current set number, total sets, and muscle group from active set key
  const {currentSet, totalSets, currentMuscleGroup} = useMemo(() => {
    if (!activeSetKey) {
      return {currentSet: 1, totalSets: 1, currentMuscleGroup: 'Major1'};
    }
    const parts = activeSetKey.split('-');
    const setNumber = parseInt(parts[parts.length - 1], 10) || 1;
    const exerciseName = parts.slice(0, -1).join('-');

    // Find the exercise to get total sets and muscle group
    const exercise = workoutData.exercises.find(e => e.exercise_name === exerciseName);
    const total = exercise?.adjustedSets || 1;
    const muscleGroup = exercise?.muscle_group || 'Major1';

    return {currentSet: setNumber, totalSets: total, currentMuscleGroup: muscleGroup};
  }, [activeSetKey, workoutData.exercises]);

  // Calculate global set index (0-based) and total sets for status bar
  const {globalSetIndex, globalTotalSets} = useMemo(() => {
    const total = orderedSetKeys.length;
    if (!activeSetKey) {
      return {globalSetIndex: 0, globalTotalSets: total};
    }
    const index = orderedSetKeys.indexOf(activeSetKey);
    return {
      globalSetIndex: index >= 0 ? index : 0,
      globalTotalSets: total,
    };
  }, [activeSetKey, orderedSetKeys]);

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
      currentSetIndex={globalSetIndex}
      totalSets={globalTotalSets}
      sidebarVisible={sidebarVisible}
      onSidebarClose={() => setSidebarVisible(false)}
      onSidebarSelect={() => {}}
      onBackPress={handleBackPress}
      onMenuPress={handleMenuPress}
      onGuidePress={handleGuidePress}
      navigation={navigation}>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

          {/* 1. Exercise Card (Collapsible) */}
          <ExerciseCard
            exerciseName={currentExerciseName}
            currentSet={currentSet}
            totalSets={totalSets}
            bodyPart={workoutType}
            muscleGroup={currentMuscleGroup}
            day={workoutDay}
          />

          {/* 2. Toggleable Dial Control - Switch between Reps and Weight */}
          <ToggleableDialControlCard
            initialReps={currentGlobalReps}
            initialWeight={currentGlobalWeight}
            targetReps={10}
            onRepsChange={setGlobalReps}
            onWeightChange={setGlobalWeight}
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
                  text="END WORKOUT EARLY"
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