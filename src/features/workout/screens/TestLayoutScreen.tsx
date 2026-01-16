// ==========================================================================
// TEST LAYOUT SCREEN
//
// Experimental sandbox screen for testing new layout ideas.
// Complete copy of ActiveWorkoutScreen with LOCAL state only.
// Changes here do NOT affect ActiveWorkoutScreen or shared components.
//
// NOTE: This screen is temporary and will be deleted after testing.
//
// Dependencies: theme tokens, navigation types, workout data
// Used by: Navigation (from ActiveWorkoutScreen TEST LAYOUT button)
// ==========================================================================

import React, {useState, useMemo, useCallback} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import {styles} from './ActiveWorkoutScreen.styles';
import type {RootStackScreenProps} from '@/navigation/types';
import {getExercisesForWorkout, type SessionType} from '@/services/exerciseService';
import {calculateWorkoutDuration} from '@/utils/durationCalculator';
import {WorkoutLayout} from '@/features/workout/components/WorkoutLayout';
import {ExerciseSetRow} from '@/features/workout/components/ExerciseSetRow';
import {TestToggleableDialControlCard} from '@/features/workout/components/test/TestToggleableDialControlCard';
import {ActionButton, BottomSheet} from '@/components';
import {GearIcon, BarbellIcon, DumbbellIcon, EZBarIcon, FixedBarbellIcon, FixedBarbellEZIcon, PinMachineIcon, CableMachineIcon, PlateLoadedIcon, SmithMachineIcon, ResistanceBandIcon, BodyweightIcon} from '@/components/icons';
import exercisesData from '@/data/exercises.json';
import {usePlan} from '@/features/plans/context/PlanContext';

// ============================================================================
// CONSTANTS
// ============================================================================

const COLOR_CODE_MAP: Record<string, string> = {
  cc1: theme.colors.actionSuccess,
  cc2: theme.colors.sessionExpress,
  cc3: theme.colors.sessionMaintenance,
  cc4: theme.colors.actionWarning,
  red: theme.colors.actionDanger,
};

// ============================================================================
// TYPES
// ============================================================================

type TestLayoutProps = RootStackScreenProps<'TestLayout'>;

type SetData = {
  reps: number;
  weight: number;
  completed: boolean;
  timestamp?: number;
};

type Exercise = {
  day: string;
  body_part: string;
  push_pull: string;
  muscle_group: string;
  sets: string;
  exercise_name: string;
  position: string;
  equipment_use: string;
  equipment_setup: string;
  equipment_weight: string;
  program_order: string;
  program_color_code: string;
  program1_order: string;
  program1_color_code: string;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const TestLayoutScreen: React.FC<TestLayoutProps> = ({
  route,
  navigation,
}) => {
  // ==========================================================================
  // LOCAL STATE (NOT FROM CONTEXT - COMPLETELY ISOLATED)
  // ==========================================================================

  const workoutType = route.params.workoutType;
  const sessionType = route.params.sessionType;
  const workoutDay = route.params.day || 'Monday';
  const restMinutes = 5; // Default rest time

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [isResting, setIsResting] = useState<boolean>(false);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState<boolean>(false);

  // Local workout state
  const [workoutState, setWorkoutState] = useState<Record<string, SetData>>({});
  const [currentGlobalReps, setCurrentGlobalReps] = useState<number>(10);
  const [currentGlobalWeight, setCurrentGlobalWeight] = useState<number>(0);
  const [activeSetKey, setActiveSetKey] = useState<string | null>(null);

  // Error states (local)
  const [hasRepsError, setHasRepsError] = useState<boolean>(false);
  const [hasWeightError, setHasWeightError] = useState<boolean>(false);

  // Exercise selector state
  const [exerciseSelectorVisible, setExerciseSelectorVisible] = useState<boolean>(false);
  const [selectedExerciseKey, setSelectedExerciseKey] = useState<string | null>(null);

  // Safe area insets for bottom sheet positioning
  const insets = useSafeAreaInsets();

  // Get selected plan from context for logo
  const {selectedPlan} = usePlan();

  const targetReps = 10; // Default target

  // Test title (comment out and use workoutType for production)
  const displayTitle = workoutType;

  // Title layout logic:
  // - Short titles (≤19 chars): MINS aligned with title, no wrap
  // - Long titles (>19 chars): MINS pushed down, title wraps
  const needsWrapping = displayTitle.length > 19;

  // Track dynamic title bar height for MINS positioning
  // - Short: 55 (40 + 15)
  // - Long (wrap): 55 + 30 = 85 (wrappedTitleExtra from WorkoutLayout)
  const [titleBarHeight, setTitleBarHeight] = useState(40 + 15 + (needsWrapping ? 30 : 0));
  const bottomSheetTopOffset = insets.top + theme.layout.topNav.height + titleBarHeight + 1;

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

  // Initialize activeSetKey if not set
  React.useEffect(() => {
    if (!activeSetKey && orderedSetKeys.length > 0) {
      setActiveSetKey(orderedSetKeys[0]);
    }
  }, [activeSetKey, orderedSetKeys]);

  const verticalLineHeight = useMemo(() => {
    const SET_HEIGHT = 50;
    const SET_MARGIN = 5;
    const GROUP_SPACER = 32;

    // Extra height from dial section injected after active set:
    // marginTop(3) + SegmentedControl(44) + gap(8) + dialRow(48) + gap(8) + logSet(48) + marginBottom(16)
    const DIAL_SECTION_HEIGHT = 3 + 44 + 8 + 48 + 8 + 48 + 16; // 175dp

    let totalHeight = -25; // Start at center of first row (top: 25 offset)
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

    // Add dial section height (always shown for active set)
    if (activeSetKey) {
      totalHeight += DIAL_SECTION_HEIGHT;
    }

    return totalHeight;
  }, [workoutData.exercises, activeSetKey]);

  // Derive current exercise name from active set key
  const currentExerciseName = useMemo(() => {
      if (!activeSetKey) {
          if (isWorkoutComplete) return 'WORKOUT COMPLETE';
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

    const exercise = workoutData.exercises.find(e => e.exercise_name === exerciseName);
    const total = exercise?.adjustedSets || 1;
    const muscleGroup = exercise?.muscle_group || 'Major1';

    return {currentSet: setNumber, totalSets: total, currentMuscleGroup: muscleGroup};
  }, [activeSetKey, workoutData.exercises]);

  // Calculate global set index and total sets for status bar
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

  // Calculate remaining sets and time for status card
  const {remainingSets, remainingMinutes} = useMemo(() => {
    const remaining = globalTotalSets - globalSetIndex;
    const minutes = remaining > 0
      ? calculateWorkoutDuration({totalSets: remaining, restMinutesPerSet: restMinutes}).totalMinutes
      : 0;
    return {remainingSets: remaining, remainingMinutes: minutes};
  }, [globalSetIndex, globalTotalSets, restMinutes]);

  // Get muscle group for the selected exercise (for alternate exercises lookup)
  const selectedMuscleGroup = useMemo(() => {
    if (!selectedExerciseKey) return 'Major1';
    const exerciseName = selectedExerciseKey.split('-').slice(0, -1).join('-');
    const exercise = workoutData.exercises.find(e => e.exercise_name === exerciseName);
    return exercise?.muscle_group || 'Major1';
  }, [selectedExerciseKey, workoutData.exercises]);

  // Get alternate exercises for the selected exercise
  const alternateExercises = useMemo(() => {
    if (!selectedExerciseKey) return [];

    const filtered = (exercisesData as Exercise[]).filter((ex) => {
      const matchesBodyPart = ex.body_part === workoutType;
      const matchesMuscleGroup = ex.muscle_group === selectedMuscleGroup;
      const matchesDay = workoutType === 'Legs' ? ex.day === workoutDay : true;
      return matchesBodyPart && matchesMuscleGroup && matchesDay;
    });

    const sorted = filtered.sort((a, b) => {
      const orderA = parseInt(a.program_order.replace('order', ''), 10);
      const orderB = parseInt(b.program_order.replace('order', ''), 10);
      return orderA - orderB;
    });

    return sorted.map((ex, index) => ({
      id: `${ex.exercise_name}-${ex.equipment_setup}-${index}`,
      name: ex.exercise_name,
      position: ex.position,
      equipmentUse: ex.equipment_use,
      equipmentSetup: ex.equipment_setup,
      equipmentWeight: ex.equipment_weight,
      colorCode: ex.program_color_code,
      order: ex.program_order,
    }));
  }, [selectedExerciseKey, workoutType, selectedMuscleGroup, workoutDay]);

  // ==========================================================================
  // LOCAL HANDLERS
  // ==========================================================================

  const handleBackPress = () => navigation.goBack();
  const handleMenuPress = () => setSidebarVisible(true);

  const handleBackToActiveWorkout = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleLogSet = useCallback(() => {
    // Validate inputs
    if (currentGlobalReps === 0) {
      setHasRepsError(true);
    }
    if (currentGlobalWeight === 0) {
      setHasWeightError(true);
    }

    if (currentGlobalReps === 0 || currentGlobalWeight === 0) {
      return;
    }

    if (!activeSetKey) return;

    // Log the set
    setWorkoutState(prev => ({
      ...prev,
      [activeSetKey]: {
        reps: currentGlobalReps,
        weight: currentGlobalWeight,
        completed: true,
        timestamp: Date.now(),
      },
    }));

    // Move to next set or complete workout
    const currentIndex = orderedSetKeys.indexOf(activeSetKey);
    if (currentIndex < orderedSetKeys.length - 1) {
      setActiveSetKey(orderedSetKeys[currentIndex + 1]);
      setIsResting(true);
    } else {
      setIsWorkoutComplete(true);
    }
  }, [activeSetKey, currentGlobalReps, currentGlobalWeight, orderedSetKeys]);

  const handleEndRest = useCallback(() => {
    setIsResting(false);
  }, []);

  const handleSelectSet = useCallback((key: string) => {
    setActiveSetKey(key);
  }, []);

  const handleUpdateSet = useCallback((key: string, data: SetData) => {
    setWorkoutState(prev => ({
      ...prev,
      [key]: data,
    }));
  }, []);

  const clearRepsError = useCallback(() => setHasRepsError(false), []);
  const clearWeightError = useCallback(() => setHasWeightError(false), []);

  // Exercise selector handlers
  const handleExerciseRowPress = useCallback((key: string) => {
    setSelectedExerciseKey(key);
    setExerciseSelectorVisible(true);
  }, []);

  const handleExerciseSelectorClose = useCallback(() => {
    setExerciseSelectorVisible(false);
    setSelectedExerciseKey(null);
  }, []);

  const handleExerciseSelect = useCallback((exercise: {
    id: string;
    name: string;
    equipmentUse: string;
    equipmentWeight: string;
    equipmentSetup: string;
    colorCode: string;
    order: string;
  }) => {
    // TODO: Update the exercise for the selected set
    console.log('Selected exercise:', exercise.name);
    setExerciseSelectorVisible(false);
    setSelectedExerciseKey(null);
  }, []);

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
    exerciseTotalSets: number,
  ) => {
    const sets: JSX.Element[] = [];

    for (let setNumber = 1; setNumber <= exerciseTotalSets; setNumber++) {
      const key = `${exerciseName}-${setNumber}`;
      const isActive = key === activeSetKey;

      sets.push(
        <TouchableOpacity
          key={key}
          style={[styles.setWrapper, isActive && styles.activeSetWrapper]}
          onPress={() => handleExerciseRowPress(key)}
          activeOpacity={0.7}
        >
            {isActive && <View style={styles.activeIndicator} />}
            <ExerciseSetRow
            setNumber={setNumber}
            totalSets={exerciseTotalSets}
            targetReps={10}
            exerciseName={exerciseName}
            exerciseImage={getExerciseImage(exerciseName)}
            sessionType={sessionType}
            initialData={workoutState[key]
              ? {weight: String(workoutState[key].weight), reps: String(workoutState[key].reps), completed: workoutState[key].completed}
              : {weight: '0', reps: '0', completed: false}
            }
            isEditing={false}
            onPress={() => handleSelectSet(key)}
            onDelete={() => {}}
            onUpdate={(data) => handleUpdateSet(key, data)}
            />
        </TouchableOpacity>
      );

      // Inject dial card and LOG SET button after the active set
      if (isActive) {
        sets.push(
          <View key={`dial-${key}`} style={{marginTop: 3, marginBottom: 16}}>
            <TestToggleableDialControlCard
              initialReps={currentGlobalReps}
              initialWeight={currentGlobalWeight}
              targetReps={targetReps}
              onRepsChange={setCurrentGlobalReps}
              onWeightChange={setCurrentGlobalWeight}
              hasRepsError={hasRepsError}
              hasWeightError={hasWeightError}
              onRepsErrorAnimationComplete={clearRepsError}
              onWeightErrorAnimationComplete={clearWeightError}
            />
            {/* LOG SET Button - 48dp, 8dp below dial, aligned with dial (marginLeft: 16) */}
            <TouchableOpacity
              onPress={handleLogSet}
              style={{
                height: 48,
                backgroundColor: theme.colors.actionSuccess,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 8,
                marginLeft: 16,
              }}
              activeOpacity={0.7}
            >
              <Text style={{
                fontSize: 20,
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.pureBlack,
              }}>
                LOG SET
              </Text>
            </TouchableOpacity>
          </View>
        );
      }
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
      workoutType={displayTitle as any}
      titleMaxWidth={250}
      showLetsGoButton={false}
      currentSetIndex={globalSetIndex}
      totalSets={globalTotalSets}
      restMinutesPerSet={restMinutes}
      sidebarVisible={sidebarVisible}
      onSidebarClose={() => setSidebarVisible(false)}
      onSidebarSelect={() => {}}
      onMenuPress={handleMenuPress}
      navigation={navigation}
      hideNavGear={true}
      hidePlanImage={true}
      titleBarExtraHeight={15}
      wrappedTitle={needsWrapping}
      dynamicTitleHeight={true}
      onTitleBarHeightChange={setTitleBarHeight}
      navBarLeftContent={
        <Text style={{
          color: theme.colors.actionDanger,
          fontSize: 24,
          fontFamily: theme.typography.fontFamily.primary,
          fontWeight: theme.typography.fontWeight.bold,
          includeFontPadding: false,
          marginTop: -2,
        }}>
          T
        </Text>
      }>

      {/* Plan Logo - Custom positioned in nav bar, extending into title bar */}
      <Image
        source={selectedPlan.image}
        style={{
          position: 'absolute',
          left: '50%',
          top: insets.top + 4, // Align with top of hamburger icon
          height: 40, // Maintains 3:1 aspect ratio with 120 width
          width: 120,
          transform: [{translateX: -60}],
          zIndex: 20,
        }}
        resizeMode="contain"
      />

      {/* Gear Icon - Right aligned in navigation bar */}
      <TouchableOpacity style={{
        position: 'absolute',
        right: 16,
        top: insets.top + 1, // 4dp from top of nav bar (1dp padding + 3dp SVG offset)
        zIndex: 21,
      }}>
        <GearIcon width={27} height={27} color={theme.colors.textSecondary} />
      </TouchableOpacity>

      {/* MINS - Position depends on title length: aligned with title OR pushed down */}
      <View style={{
        position: 'absolute',
        right: 16,
        top: needsWrapping
          ? insets.top + theme.layout.topNav.height + titleBarHeight - 4 - 32 // Pushed down: 4dp from bottom
          : insets.top + theme.layout.topNav.height + 20, // Normal: aligned with title
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        zIndex: 21,
      }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{
            fontSize: theme.typography.fontSize.m,
            fontFamily: theme.typography.fontFamily.primary,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.backgroundTertiary,
          }}>MINS</Text>
          <Text style={{
            fontSize: theme.typography.fontSize.m,
            fontFamily: theme.typography.fontFamily.primary,
            fontWeight: theme.typography.fontWeight.bold,
            marginTop: -4,
            opacity: 0, // Invisible spacer to push MINS text up
          }}>(LBS)</Text>
        </View>
        <Text style={{
          fontSize: 32,
          fontFamily: theme.typography.fontFamily.primary,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.actionSuccess,
          includeFontPadding: false,
        }}>{remainingMinutes}</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

          {/* Today's Workout (Exercise List with embedded dial + LOG SET) */}
          <View style={styles.todaysWorkoutCard}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
              marginBottom: 5,
              marginHorizontal: 0, // Card already has 8dp padding
            }}>
              <View style={{flex: 1, paddingRight: 7}}>
                <Text style={[styles.todaysWorkoutText, {textAlign: 'center'}]}>TODAY'S WORKOUT</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={{
                    fontSize: theme.typography.fontSize.m,
                    fontFamily: theme.typography.fontFamily.primary,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.backgroundTertiary,
                  }}>SETS</Text>
                  <Text style={{
                    fontSize: theme.typography.fontSize.m,
                    fontFamily: theme.typography.fontFamily.primary,
                    fontWeight: theme.typography.fontWeight.bold,
                    marginTop: -4,
                    opacity: 0, // Invisible spacer to push SETS text up
                  }}>(LBS)</Text>
                </View>
                <Text style={{
                  fontSize: 32,
                  fontFamily: theme.typography.fontFamily.primary,
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.actionSuccess,
                  includeFontPadding: false,
                  minWidth: 38, // Reserve space for 2 digits
                  textAlign: 'left', // Single digits left-aligned, grows to right
                }}>{remainingSets}</Text>
              </View>
            </View>

            <View style={styles.exerciseTreeContainer}>
              <View style={[styles.verticalLine, {height: verticalLineHeight, top: 25}]} />
              {renderExercises()}
            </View>
          </View>

          {/* Back to Active Workout Button */}
          <View style={styles.finishButtonContainer}>
             <ActionButton
                text="BACK TO ACTIVE WORKOUT"
                onPress={handleBackToActiveWorkout}
                style={{backgroundColor: theme.colors.actionWarning}}
                textStyle={styles.finishButtonText}
            />
          </View>

        </ScrollView>

      {/* Exercise Selector Bottom Sheet */}
      <BottomSheet
        visible={exerciseSelectorVisible}
        onClose={handleExerciseSelectorClose}
        topOffset={bottomSheetTopOffset}
        maxHeightPercent={95}
      >
        {alternateExercises.map((exercise, index) => {
          const isRedNote = exercise.colorCode === 'red';
          const rowTextColor = COLOR_CODE_MAP[exercise.colorCode] || theme.colors.textPrimary;

          if (isRedNote) {
            return (
              <View
                key={exercise.id}
                style={{
                  borderBottomWidth: index < alternateExercises.length - 1 ? 1 : 0,
                  borderBottomColor: theme.colors.borderDefault,
                  paddingBottom: 8,
                  marginTop: index > 0 ? 8 : 0,
                }}
              >
                <Text style={{
                  fontSize: 24,
                  fontFamily: theme.typography.fontFamily.primary,
                  fontWeight: 'bold',
                  color: rowTextColor,
                  textAlign: 'center',
                }}>
                  {exercise.name.toUpperCase()}
                </Text>
              </View>
            );
          }

          const equipmentLower = exercise.equipmentUse.toLowerCase();
          const weightLower = exercise.equipmentWeight?.toLowerCase() || '';
          const setupLower = exercise.equipmentSetup?.toLowerCase() || '';

          const isFreeWeight = weightLower === 'free weight';
          const isPinLoaded = weightLower === 'pin-loaded';
          const isPlateLoaded = weightLower === 'plate-loaded';
          const isLinearWeight = weightLower === 'linear weight';
          const isResistance = weightLower === 'resistance';
          const isBodyweight = weightLower === 'bodyweight';

          return (
            <TouchableOpacity
              key={exercise.id}
              style={{
                borderBottomWidth: index < alternateExercises.length - 1 ? 1 : 0,
                borderBottomColor: theme.colors.borderDefault,
                marginTop: index > 0 ? 8 : 0,
              }}
              onPress={() => handleExerciseSelect(exercise)}
              activeOpacity={0.7}
            >
              <Text style={{
                fontSize: 24,
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: 'bold',
                color: rowTextColor,
                textAlign: 'center',
                marginBottom: 4,
              }}>
                {exercise.name.toUpperCase()}
              </Text>

              <View style={{position: 'relative', width: '100%'}}>
                <View style={{position: 'absolute', left: 0, top: 18, width: 48, alignItems: 'center'}}>
                  {isFreeWeight && equipmentLower === 'barbell' && <BarbellIcon width={48} height={24} color={rowTextColor} />}
                  {isFreeWeight && (equipmentLower === 'dumbbell' || equipmentLower === 'dumbbells') && <DumbbellIcon width={48} height={24} color={rowTextColor} />}
                  {isFreeWeight && equipmentLower === 'ez bar' && <EZBarIcon width={48} height={24} color={rowTextColor} />}
                  {isFreeWeight && equipmentLower === 'fixed barbell' && <FixedBarbellIcon width={48} height={24} color={rowTextColor} />}
                  {isPinLoaded && setupLower === 'cable machine' && <CableMachineIcon width={48} height={24} color={rowTextColor} />}
                  {isPinLoaded && setupLower !== 'cable machine' && <PinMachineIcon width={48} height={24} color={rowTextColor} />}
                  {isPlateLoaded && <PlateLoadedIcon width={48} height={24} color={rowTextColor} />}
                  {isLinearWeight && setupLower.includes('smith machine') && <SmithMachineIcon width={48} height={24} color={rowTextColor} />}
                  {isResistance && <ResistanceBandIcon width={48} height={24} color={rowTextColor} />}
                  {isBodyweight && <BodyweightIcon width={48} height={24} color={rowTextColor} />}
                </View>

                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 14, fontFamily: theme.typography.fontFamily.primary, fontWeight: 'bold', color: rowTextColor, marginBottom: 4}}>
                    {exercise.equipmentSetup.toUpperCase()}
                  </Text>
                  <Text style={{fontSize: 14, fontFamily: theme.typography.fontFamily.primary, fontWeight: 'bold', color: rowTextColor, marginBottom: 4}}>
                    {exercise.equipmentWeight.toUpperCase()}
                  </Text>
                  <Text style={{fontSize: 14, fontFamily: theme.typography.fontFamily.primary, fontWeight: 'bold', color: rowTextColor, marginBottom: 8}}>
                    {exercise.position.toUpperCase()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </BottomSheet>
    </WorkoutLayout>
  );
};
