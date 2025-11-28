// ==========================================================================
// WORKOUT OVERVIEW SCREEN
//
// Generic workout overview screen that adapts to all workout types.
// Displays workout summary and allows users to configure options before beginning.
//
// Dependencies: theme tokens, navigation types, workout data
// Used by: Navigation stack (from WorkoutCard BEGIN button)
// ==========================================================================

import React, {useState, useMemo} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {getExercisesForWorkout, type SessionType} from '@/services/exerciseService';
import {getWorkoutDuration} from '@/utils/durationCalculator';
import {WorkoutLayout} from '@/features/workout/components/WorkoutLayout';

// ============================================================================
// TYPES
// ============================================================================

type WorkoutOverviewProps = RootStackScreenProps<'WorkoutOverview'>;

// ============================================================================
// COMPONENT
// ============================================================================

export const WorkoutOverviewScreen: React.FC<WorkoutOverviewProps> = ({
  route,
  navigation,
}) => {
  // ==========================================================================
  // STATE
  // ==========================================================================

  const {workoutType} = route.params;

  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [selectedPlanFocus, setSelectedPlanFocus] = useState<'strength' | 'balanced' | 'growth'>('balanced');
  const [selectedWeightTypes, setSelectedWeightTypes] = useState<Set<string>>(
    new Set(['all', 'free', 'machines', 'bands', 'bodyweight'])
  );
  const [selectedSession, setSelectedSession] = useState<'standard' | 'express' | 'maintenance'>('standard');

  // ==========================================================================
  // COMPUTED VALUES
  // ==========================================================================

  // Convert lowercase session to PascalCase SessionType
  const sessionType: SessionType = useMemo(() => {
    return selectedSession.charAt(0).toUpperCase() + selectedSession.slice(1) as SessionType;
  }, [selectedSession]);

  // Load exercises for current workout and session type
  const workoutData = useMemo(() => {
    return getExercisesForWorkout(workoutType, sessionType);
  }, [workoutType, sessionType]);

  // Calculate workout duration dynamically
  const workoutDuration = useMemo(() => {
    return getWorkoutDuration(workoutData.totalSets);
  }, [workoutData.totalSets]);

  // Calculate dynamic vertical line height for exercise tree
  const verticalLineHeight = useMemo(() => {
    const START_OFFSET = 25; // Offset to connect with title connector
    const SET_HEIGHT = 50; // Height of each exercise row
    const SET_MARGIN = 5; // Margin between sets
    const GROUP_SPACER = 32; // Spacer between exercise groups

    let totalHeight = START_OFFSET;
    let exerciseCount = 0;

    workoutData.exercises.forEach((exercise, index) => {
      if (exercise.adjustedSets === 0) return;

      // Add spacer before this group (except first group)
      if (exerciseCount > 0) {
        totalHeight += GROUP_SPACER;
      }

      // Add height for all sets in this exercise
      totalHeight += exercise.adjustedSets * (SET_HEIGHT + SET_MARGIN);

      exerciseCount++;
    });

    // Subtract margin from last set and add half set height to end at center
    totalHeight -= SET_MARGIN;
    totalHeight -= (SET_HEIGHT / 2);
    totalHeight += (SET_MARGIN / 2);

    return totalHeight;
  }, [workoutData.exercises]);


  // ==========================================================================
  // HELPER FUNCTIONS
  // ==========================================================================

  /**
   * Get exercise image source based on exercise name
   * TODO: Make this dynamic based on exercise data
   */
  const getExerciseImage = (exerciseName: string) => {
    // Convert to kebab-case for file naming
    const imageName = exerciseName.toLowerCase().replace(/\s+/g, '-');

    // Map known exercises to their images
    const imageMap: Record<string, any> = {
      'bench-press': require('@/assets/images/exercises/bench-press.png'),
      'incline-bench-press': require('@/assets/images/exercises/incline-bench-press.png'),
      'chest-flyes': require('@/assets/images/exercises/chest-flyes.png'),
      'chest-press': require('@/assets/images/exercises/bench-press.png'), // Use bench press as fallback
    };

    return imageMap[imageName] || imageMap['bench-press']; // Fallback to bench press
  };

  /**
   * Render all sets for an exercise
   */
  const renderExerciseSets = (
    exerciseName: string,
    totalSets: number,
    currentReps: number,
  ) => {
    const sets: JSX.Element[] = [];

    for (let setNumber = 1; setNumber <= totalSets; setNumber++) {
      sets.push(
        <View key={`${exerciseName}-set-${setNumber}`} style={styles.exerciseSetRow}>
          <View style={styles.horizontalConnector} />
          <TouchableOpacity
            style={styles.exerciseRow}
            onPress={() => console.log(`${exerciseName} Set ${setNumber} selected`)}
            activeOpacity={1}>
            <Image
              source={getExerciseImage(exerciseName)}
              style={styles.exerciseImage}
              resizeMode="cover"
            />
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exerciseName.toUpperCase()}</Text>
              <Text style={styles.exerciseSetCount}>
                <Text style={styles.exerciseSetLabel}>SET: </Text>
                <Text style={[
                  styles.exerciseSetNumber,
                  selectedSession === 'standard' && {color: theme.colors.sessionStandard},
                  selectedSession === 'express' && {color: theme.colors.sessionExpress},
                  selectedSession === 'maintenance' && {color: theme.colors.sessionMaintenance},
                ]}>
                  {setNumber}{' '}
                </Text>
                <Text style={styles.exerciseSetLabel}>OF </Text>
                <Text style={[
                  styles.exerciseSetNumber,
                  selectedSession === 'standard' && {color: theme.colors.sessionStandard},
                  selectedSession === 'express' && {color: theme.colors.sessionExpress},
                  selectedSession === 'maintenance' && {color: theme.colors.sessionMaintenance},
                ]}>
                  {totalSets}
                </Text>
              </Text>
            </View>
            <Text style={styles.exerciseReps}>
              <Text style={styles.exerciseRepsLabel}>REPS: </Text>
              <Text style={styles.exerciseRepsNumber}>{currentReps}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return sets;
  };

  /**
   * Render all exercise groups with tree structure
   */
  const renderExercises = () => {
    const exerciseGroups: JSX.Element[] = [];

    workoutData.exercises.forEach((exercise, index) => {
      // Skip exercises with 0 adjusted sets
      if (exercise.adjustedSets === 0) {
        return;
      }

      // Add spacer between exercise groups (not before first group)
      if (index > 0) {
        exerciseGroups.push(
          <View key={`spacer-${index}`} style={styles.exerciseGroupSpacer} />
        );
      }

      // Render exercise group
      exerciseGroups.push(
        <View key={`group-${exercise.exercise_name}`} style={styles.exerciseGroup}>
          {renderExerciseSets(exercise.exercise_name, exercise.adjustedSets, 10)}
        </View>
      );
    });

    return exerciseGroups;
  };

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setSidebarVisible(true);
  };

  const handleGuidePress = () => {
    navigation.navigate('HelpScreen');
  };

  const handleSidebarSelect = async (
    option: 'profile' | 'settings' | 'help' | 'logout',
  ) => {
    console.log('Sidebar option selected:', option);

    switch (option) {
      case 'settings':
        navigation.navigate('SettingsScreen');
        break;
      case 'logout':
        // TODO: Implement logout
        console.log('Logout requested');
        break;
      default:
        console.log('Option not implemented:', option);
    }
  };

  const handleAllWeightsPress = () => {
    // Select all equipment types
    setSelectedWeightTypes(new Set(['all', 'free', 'machines', 'bands', 'bodyweight']));
  };

  const handleEquipmentPress = (type: 'free' | 'machines' | 'bands' | 'bodyweight') => {
    setSelectedWeightTypes(prevSelected => {
      const newSelected = new Set<string>();

      // If all are currently selected (including 'all'), first action is to select only the clicked one
      if (prevSelected.has('all')) {
        newSelected.add(type);
      } else {
        // Normal toggle behavior
        // Copy previous selections
        prevSelected.forEach(item => newSelected.add(item));

        // Toggle the equipment type
        if (newSelected.has(type)) {
          newSelected.delete(type);
        } else {
          newSelected.add(type);
        }

        // Check if all equipment types are now selected
        if (newSelected.has('free') && newSelected.has('machines') &&
            newSelected.has('bands') && newSelected.has('bodyweight')) {
          newSelected.add('all');
        }
      }

      return newSelected;
    });
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================

  const handleLetsGoPress = () => {
    navigation.navigate('ActiveWorkout', {
      workoutType,
      sessionType,
      planFocus: selectedPlanFocus,
      selectedEquipment: selectedWeightTypes,
      weekProgress: {
        current: 2,
        total: 15,
      },
    });
  };

  return (
    <WorkoutLayout
      workoutType={workoutType}
      showLetsGoButton={true}
      onLetsGoPress={handleLetsGoPress}
      sidebarVisible={sidebarVisible}
      onSidebarClose={() => setSidebarVisible(false)}
      onSidebarSelect={handleSidebarSelect}
      onBackPress={handleBackPress}
      onMenuPress={handleMenuPress}
      onGuidePress={handleGuidePress}
      navigation={navigation}>
      {/* Scrollable Content Area */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: 250} // Extra bottom padding ensures content clears navigation on all devices
        ]}
        showsVerticalScrollIndicator={false}>
          {/* Workout Overview Plan Card */}
          <View style={styles.workoutPlanCard}>
            {/* Current Plan Label */}
            <Text style={styles.workoutPlanCurrentText}>CURRENT PLAN</Text>

            {/* Plan Name Selector */}
            <TouchableOpacity
              style={styles.workoutPlanNameSelector}
              onPress={() => console.log('Plan selector pressed')}
              activeOpacity={1}>
              <Text style={styles.workoutPlanNameText}>
                <Text style={styles.workoutPlanNameItalic}>LIFT</Text> 3-2-1
              </Text>
            </TouchableOpacity>

            {/* Progress Bar */}
            <View style={styles.progressBarWrapper}>
              <Text style={styles.progressBarWeekText}>
                WEEK <Text style={styles.progressBarWeekGreen}>2 </Text>OF<Text style={styles.progressBarWeekGreen}> 15</Text>
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, {width: '8.33%'}]} />
                </View>
              </View>
            </View>

            {/* Plan Focus Selectors */}
            <View style={styles.workoutPlanFocusContainer}>
              <TouchableOpacity
                style={[
                  styles.workoutPlanFocusSelector,
                  selectedPlanFocus === 'strength' && styles.workoutPlanFocusSelected,
                ]}
                onPress={() => setSelectedPlanFocus('strength')}
                activeOpacity={1}>
                <Text style={styles.workoutPlanFocusText}>STRENGTH</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.workoutPlanFocusSelector,
                  selectedPlanFocus === 'balanced' && styles.workoutPlanFocusSelected,
                ]}
                onPress={() => setSelectedPlanFocus('balanced')}
                activeOpacity={1}>
                <Text style={styles.workoutPlanFocusText}>BALANCED</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.workoutPlanFocusSelector,
                  selectedPlanFocus === 'growth' && styles.workoutPlanFocusSelected,
                ]}
                onPress={() => setSelectedPlanFocus('growth')}
                activeOpacity={1}>
                <Text style={styles.workoutPlanFocusText}>GROWTH</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Workout Overview Session Card */}
          <View style={styles.workoutSessionCard}>
            {/* Current Session Text */}
            <Text style={styles.workoutSessionCurrentText}>CURRENT SESSION</Text>

            {/* Duration Selector */}
            <View style={styles.workoutSessionDurationSelector}>
              <Text style={styles.workoutSessionDurationLabel}>
                DURATION: <Text style={[
                  styles.workoutSessionDurationValue,
                  selectedSession === 'standard' && {color: theme.colors.sessionStandard},
                  selectedSession === 'express' && {color: theme.colors.sessionExpress},
                  selectedSession === 'maintenance' && {color: theme.colors.sessionMaintenance},
                ]}>
                  {workoutDuration} MINUTES
                </Text>
              </Text>
            </View>

            {/* Session Type Selectors */}
            <View style={styles.workoutSessionTypesContainer}>
              <TouchableOpacity
                style={[
                  styles.workoutSessionTypeSelector,
                  selectedSession === 'standard' && styles.workoutSessionTypeSelected,
                ]}
                onPress={() => setSelectedSession('standard')}
                activeOpacity={1}>
                <Text style={styles.workoutSessionTypeText}>STANDARD</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.workoutSessionTypeSelector,
                  selectedSession === 'express' && styles.workoutSessionTypeSelected,
                ]}
                onPress={() => setSelectedSession('express')}
                activeOpacity={1}>
                <Text style={styles.workoutSessionTypeText}>EXPRESS</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.workoutSessionTypeSelector,
                  selectedSession === 'maintenance' && styles.workoutSessionTypeSelected,
                ]}
                onPress={() => setSelectedSession('maintenance')}
                activeOpacity={1}>
                <Text style={styles.workoutSessionTypeText}>MAINTENANCE</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Workout Overview Equipment Card */}
          <View style={styles.workoutEquipmentCard}>
            {/* Current Equipment Text */}
            <Text style={styles.workoutEquipmentCurrentText}>CURRENT EQUIPMENT</Text>

            {/* Equipment Type Selectors */}
            <View style={styles.workoutEquipmentTypesContainer}>
              {/* First Row: All Weights, Free Weights, Machines */}
              <View style={styles.workoutEquipmentTypeRow}>
                <TouchableOpacity
                  style={[
                    styles.workoutEquipmentTypeSelector,
                    selectedWeightTypes.has('all') && styles.workoutEquipmentTypeSelected,
                  ]}
                  onPress={handleAllWeightsPress}
                  activeOpacity={1}>
                  <Text style={styles.workoutEquipmentTypeText}>
                    ALL{'\n'}WEIGHTS
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.workoutEquipmentTypeSelector,
                    selectedWeightTypes.has('free') && styles.workoutEquipmentTypeSelected,
                  ]}
                  onPress={() => handleEquipmentPress('free')}
                  activeOpacity={1}>
                  <Text style={styles.workoutEquipmentTypeText}>
                    FREE{'\n'}WEIGHTS
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.workoutEquipmentTypeSelector,
                    selectedWeightTypes.has('machines') && styles.workoutEquipmentTypeSelected,
                  ]}
                  onPress={() => handleEquipmentPress('machines')}
                  activeOpacity={1}>
                  <Text style={styles.workoutEquipmentTypeText}>MACHINES</Text>
                </TouchableOpacity>
              </View>

              {/* Second Row: Bands, Bodyweight */}
              <View style={styles.workoutEquipmentTypeRow}>
                <TouchableOpacity
                  style={[
                    styles.workoutEquipmentTypeSelector,
                    selectedWeightTypes.has('bands') && styles.workoutEquipmentTypeSelected,
                  ]}
                  onPress={() => handleEquipmentPress('bands')}
                  activeOpacity={1}>
                  <Text style={styles.workoutEquipmentTypeText}>BANDS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.workoutEquipmentTypeSelector,
                    selectedWeightTypes.has('bodyweight') && styles.workoutEquipmentTypeSelected,
                  ]}
                  onPress={() => handleEquipmentPress('bodyweight')}
                  activeOpacity={1}>
                  <Text style={styles.workoutEquipmentTypeText}>BODYWEIGHT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Today's Workout Card */}
          <View style={styles.todaysWorkoutCard}>
            {/* Today's Workout Text with Connector */}
            <View style={styles.todaysWorkoutHeader}>
              <Text style={styles.todaysWorkoutText}>TODAY'S WORKOUT</Text>
              {/* Horizontal connector from "T" to tree line */}
              <View style={styles.titleConnector} />
            </View>

            {/* Exercise Tree Structure */}
            <View style={styles.exerciseTreeContainer}>
              {/* Vertical line running down from title connector (dynamic height) */}
              <View style={[styles.verticalLine, {height: verticalLineHeight}]} />

              {/* Dynamic Exercise Groups */}
              {renderExercises()}
            </View>
          </View>
        </ScrollView>
    </WorkoutLayout>
  );
};

// ============================================================================
// STYLES
// ============================================================================

// Selector text sizing for compact multi-option displays
const SELECTOR_TEXT_SIZE = 12;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingLeft: theme.spacing.s, // Standard screen edge margin
    paddingRight: theme.spacing.s, // Standard screen edge margin
  },

  // === WORKOUT PLAN CARD ===
  workoutPlanCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    paddingLeft: theme.spacing.s, // Standard card internal padding
    paddingRight: theme.spacing.s, // Standard card internal padding
    paddingBottom: theme.spacing.s, // Standard card internal padding
    marginBottom: theme.spacing.s, // Standard card separation
  },

  workoutPlanCurrentText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary labels
    lineHeight: theme.typography.fontSize.xl, // Match font size to eliminate extra line spacing
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Same as selector background
    textTransform: 'uppercase',
    textAlign: 'center', // Center the text horizontally
    includeFontPadding: false, // Remove Android font padding for precise spacing
    marginTop: 13, // Compensate for 3dp font metrics to achieve visual 16dp
    marginBottom: 13, // Compensate for 3dp font metrics to achieve visual 16dp
  },

  workoutPlanNameSelector: {
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    borderWidth: theme.layout.border.thin, // 1dp green border
    borderColor: theme.colors.actionSuccess, // Green border
  },

  workoutPlanNameText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary selectors
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
  },

  workoutPlanNameItalic: {
    fontStyle: 'italic', // Brand name emphasis
    fontWeight: theme.typography.fontWeight.bold,
  },

  progressBarWrapper: {
    marginTop: theme.spacing.s, // 8dp from LIFT 3-2-1 selector
    marginBottom: theme.spacing.s, // 8dp from plan focus selectors below
    flexDirection: 'row', // Horizontal layout for text and bar
    alignItems: 'center', // Center items vertically
    gap: 16, // 16dp between text and bar
  },

  progressBarWeekText: {
    fontSize: 12, // 12dp text size
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.navInactive, // Match progress bar background color
    textTransform: 'uppercase',
    // No marginLeft - card padding provides 8dp from edge
  },

  progressBarWeekGreen: {
    color: theme.colors.actionSuccess, // Green for numbers
  },

  progressBarContainer: {
    flex: 1, // Take remaining space
    // No marginRight - card padding provides 8dp from edge
  },

  progressBarBackground: {
    height: theme.layout.progressBar.height,
    backgroundColor: theme.colors.navInactive,
    borderRadius: theme.layout.progressBar.borderRadius, // Rounded edges
    overflow: 'hidden',
  },

  progressBarFill: {
    height: theme.layout.progressBar.height,
    backgroundColor: theme.colors.navActive, // Same green as home page
    borderRadius: theme.layout.progressBar.borderRadius, // Rounded edges
  },

  workoutPlanFocusContainer: {
    flexDirection: 'row',
    gap: 1, // Minimal gap creates visual grouping
  },

  workoutPlanFocusSelector: {
    flex: 1,
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent', // Border appears only when selected
  },

  workoutPlanFocusSelected: {
    borderColor: theme.colors.actionSuccess, // Active selection indicator
  },

  workoutPlanFocusText: {
    fontSize: SELECTOR_TEXT_SIZE,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary, // Light gray (#B0B0B0)
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === WORKOUT SESSION CARD ===
  workoutSessionCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    paddingLeft: theme.spacing.s, // Standard card internal padding
    paddingRight: theme.spacing.s, // Standard card internal padding
    paddingBottom: theme.spacing.s, // Standard card internal padding
    marginBottom: theme.spacing.s, // Standard card separation
  },

  workoutSessionCurrentText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary labels
    lineHeight: theme.typography.fontSize.xl, // Match font size to eliminate extra line spacing
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Same as Current Plan
    textTransform: 'uppercase',
    textAlign: 'center', // Center the text horizontally
    includeFontPadding: false, // Remove Android font padding for precise spacing
    marginTop: 13, // Compensate for 3dp font metrics to achieve visual 16dp
    marginBottom: 13, // Compensate for 3dp font metrics to achieve visual 16dp
  },

  workoutSessionDurationSelector: {
    height: 50, // Standard selector height
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    marginBottom: theme.spacing.s, // 8dp from session type selectors below
  },

  workoutSessionDurationLabel: {
    fontSize: theme.typography.fontSize.m, // 16dp text size
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary, // White text for "DURATION:"
    textTransform: 'uppercase',
  },

  workoutSessionDurationValue: {
    fontWeight: theme.typography.fontWeight.bold,
    // Color set dynamically based on session type via theme.colors.session{Standard|Express|Maintenance}
  },

  workoutSessionTypesContainer: {
    flexDirection: 'row',
    gap: 1, // Minimal gap creates visual grouping
  },

  workoutSessionTypeSelector: {
    flex: 1,
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent', // Border appears only when selected
  },

  workoutSessionTypeSelected: {
    borderColor: theme.colors.actionSuccess, // Active selection indicator
  },

  workoutSessionTypeText: {
    fontSize: SELECTOR_TEXT_SIZE,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary, // Light gray (#B0B0B0)
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === WORKOUT EQUIPMENT CARD ===
  workoutEquipmentCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    paddingLeft: theme.spacing.s, // Standard card internal padding
    paddingRight: theme.spacing.s, // Standard card internal padding
    paddingBottom: theme.spacing.s, // Standard card internal padding
  },

  workoutEquipmentCurrentText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary labels
    lineHeight: theme.typography.fontSize.xl, // Match font size to eliminate extra line spacing
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Same as Current Plan
    textTransform: 'uppercase',
    textAlign: 'center', // Center the text horizontally
    includeFontPadding: false, // Remove Android font padding for precise spacing
    marginTop: 13, // Compensate for 3dp font metrics to achieve visual 16dp
    marginBottom: 13, // Compensate for 3dp font metrics to achieve visual 16dp
  },

  workoutEquipmentTypesContainer: {
    gap: 1, // Minimal gap creates visual grouping
  },

  workoutEquipmentTypeRow: {
    flexDirection: 'row',
    gap: 1, // Minimal gap creates visual grouping
  },

  workoutEquipmentTypeSelector: {
    flex: 1,
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent', // Border appears only when selected
  },

  workoutEquipmentTypeSelected: {
    borderColor: theme.colors.actionSuccess, // Active selection indicator
  },

  workoutEquipmentTypeText: {
    fontSize: SELECTOR_TEXT_SIZE,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary, // Light gray (#B0B0B0)
    textTransform: 'uppercase',
    textAlign: 'center', // Center text within selector
  },

  // === TODAY'S WORKOUT CARD ===
  todaysWorkoutCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    paddingLeft: theme.spacing.s, // Standard card internal padding
    paddingRight: theme.spacing.s, // Standard card internal padding
    paddingBottom: theme.spacing.s, // Standard card internal padding
    marginTop: theme.spacing.s, // Standard card separation
  },

  todaysWorkoutHeader: {
    position: 'relative', // For absolute positioning of titleConnector
    marginTop: 13, // Compensate for 3dp font metrics to achieve visual 16dp
    marginBottom: 13, // Compensate for 3dp font metrics to achieve visual 16dp
  },

  todaysWorkoutText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary labels
    lineHeight: theme.typography.fontSize.xl, // Match font size to eliminate extra line spacing
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Same as other card headers
    textTransform: 'uppercase',
    textAlign: 'center', // Center the text horizontally
    includeFontPadding: false, // Remove Android font padding for precise spacing
  },

  titleConnector: {
    position: 'absolute',
    left: 0, // Start at left edge of card content (card has 8dp padding, so this is 8dp from card edge)
    top: 12, // Center vertically with text (24dp font / 2 = 12dp)
    width: 50, // 50dp horizontal line to "T" in "TODAY'S WORKOUT"
    height: 1,
    backgroundColor: theme.colors.pureWhite, // White line
  },

  // === EXERCISE TREE STRUCTURE ===
  exerciseTreeContainer: {
    position: 'relative',
  },

  verticalLine: {
    position: 'absolute',
    left: 0, // At left edge of card content (8dp from card edge due to card padding) - connects to titleConnector
    top: -13 - 12, // Extend up to connect with titleConnector (-13 for marginBottom, -12 to center with text) = -25dp
    // Height is set dynamically based on exercise count and session type
    width: 1,
    backgroundColor: theme.colors.pureWhite, // White line
  },

  exerciseGroup: {
    marginBottom: 0, // No margin - exerciseGroupSpacer controls spacing between groups
  },

  exerciseSetRow: {
    position: 'relative',
    marginBottom: 5, // 5dp spacing between individual sets
    marginLeft: 16, // Make room for horizontal connector (0 + 16 = 16dp)
  },

  horizontalConnector: {
    position: 'absolute',
    left: -16, // Position connector to connect from vertical line (16 - 16 = 0 where vertical line is)
    top: 25, // Center vertically with exercise row (50dp height / 2 = 25dp)
    width: 16, // 16dp line from vertical to exercise card
    height: 1,
    backgroundColor: theme.colors.pureWhite, // White line
  },

  exerciseGroupSpacer: {
    height: 32, // 32dp separation between different exercise groups (3 sets, 2 sets, 1 set)
  },

  exerciseList: {
    gap: theme.spacing.s, // 8dp spacing between exercises
  },

  exerciseRow: {
    height: 50, // 50dp total height
    backgroundColor: theme.colors.pureBlack,
    borderRadius: theme.spacing.s,
    flexDirection: 'row', // Horizontal layout for image and text
    position: 'relative', // For absolute positioning of children
  },

  exerciseImage: {
    width: 46, // 46dp square image (50dp - 4dp for 2dp margins on all sides)
    height: 46,
    borderRadius: 6, // Adjusted rounding to match new image size
    position: 'absolute',
    top: 2, // 2dp from top
    left: 2, // 2dp from left
  },

  exerciseInfo: {
    position: 'absolute',
    left: 56, // 2dp + 46dp image + 8dp spacing = 56dp from left
    top: 0,
    bottom: 0,
    flexDirection: 'column', // Stack name and set count vertically
    justifyContent: 'space-between', // Space between name (top) and set count (bottom)
  },

  exerciseName: {
    fontSize: theme.typography.fontSize.m, // 16dp
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess, // Green text
    textTransform: 'uppercase',
    includeFontPadding: false, // Remove Android extra padding
    lineHeight: 16, // Match font size for precise control
    marginTop: 6, // 6dp to achieve visual 8dp (compensates for 2dp inherent spacing)
  },

  exerciseSetCount: {
    fontSize: theme.typography.fontSize.m, // 16dp - same size as exercise name
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    includeFontPadding: false, // Remove Android extra padding
    lineHeight: 16, // Match font size for precise control
    marginBottom: 6, // 6dp to achieve visual 8dp (compensates for 2dp inherent spacing)
  },

  exerciseSetLabel: {
    color: theme.colors.textSecondary, // Gray text for "SET:", "OF"
  },

  exerciseSetNumber: {
    // Color set dynamically based on session type via theme.colors.session{Standard|Express|Maintenance}
  },

  exerciseReps: {
    fontSize: theme.typography.fontSize.m, // 16dp - same size as exercise name
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    textTransform: 'uppercase',
    position: 'absolute',
    right: 8, // 8dp from right edge
    bottom: 6, // 6dp to achieve visual 8dp (compensates for 2dp inherent spacing)
    textAlign: 'right', // Right aligned
    includeFontPadding: false, // Remove Android extra padding
    lineHeight: 16, // Match font size for precise control
  },

  exerciseRepsLabel: {
    color: theme.colors.textSecondary, // Gray text for "REPS:"
  },

  exerciseRepsNumber: {
    color: theme.colors.actionSuccess, // Green text for rep count
  },

  exerciseDetails: {
    fontSize: theme.typography.fontSize.s, // 14dp
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textSecondary, // Light gray
    textTransform: 'uppercase',
  },
});
