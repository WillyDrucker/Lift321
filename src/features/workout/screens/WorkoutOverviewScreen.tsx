// ==========================================================================
// WORKOUT OVERVIEW SCREEN
//
// Generic workout overview screen that adapts to all workout types.
// Displays workout summary and allows users to configure options before beginning.
//
// Dependencies: theme tokens, navigation types, workout data
// Used by: Navigation stack (from WorkoutCard BEGIN button)
// ==========================================================================

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {TopNavBar, BottomTabBar, Sidebar, type TabItem} from '@/components';

// === TYPES ===

type WorkoutOverviewProps = RootStackScreenProps<'WorkoutOverview'>;

// === COMPONENT ===

export const WorkoutOverviewScreen: React.FC<WorkoutOverviewProps> = ({
  route,
  navigation,
}) => {
  // === STATE ===
  // Component state management

  const {workoutType} = route.params;
  const [activeTab, setActiveTab] = useState<TabItem>('home');
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [selectedPlanFocus, setSelectedPlanFocus] = useState<'strength' | 'balanced' | 'growth'>('balanced');
  const [selectedWeightTypes, setSelectedWeightTypes] = useState<Set<string>>(
    new Set(['all', 'free', 'machines', 'bands', 'bodyweight'])
  );
  const [selectedSession, setSelectedSession] = useState<'standard' | 'express' | 'maintenance'>('standard');

  // === EVENT HANDLERS ===
  // User interaction callbacks

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleMenuPress = () => {
    setSidebarVisible(true);
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // TODO: Open search screen
  };

  const handleTabPress = (tab: TabItem) => {
    setActiveTab(tab);
    console.log('Tab pressed:', tab);
    // TODO: Implement navigation to different sections
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

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.pureBlack}
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* Fixed Top Navigation */}
        <View style={styles.topNavContainer}>
          <TopNavBar
            onSearchPress={handleSearchPress}
            onMenuPress={handleMenuPress}
            onBackPress={handleBackPress}
          />
        </View>

        {/* Fixed Workout Title Bar */}
        <View style={styles.workoutTitleBar}>
          {/* Workout Title */}
          <Text style={styles.workoutTitleText}>{workoutType}</Text>

          {/* Let's Go Button with Shadow */}
          <View style={styles.letsGoButtonContainer}>
            {/* Shadow Layer 3 - Darkest, furthest */}
            <View style={[styles.letsGoButtonShadow, styles.shadowLayer3]} />
            {/* Shadow Layer 2 - Medium darkness */}
            <View style={[styles.letsGoButtonShadow, styles.shadowLayer2]} />
            {/* Shadow Layer 1 - Lightest, closest */}
            <View style={[styles.letsGoButtonShadow, styles.shadowLayer1]} />
            {/* Actual Button */}
            <TouchableOpacity
              style={styles.letsGoButton}
              onPress={() => console.log('Let\'s Go pressed')}
              activeOpacity={0.8}>
              <Text style={styles.letsGoButtonText}>LET'S GO!</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Scrollable Content Area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
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
                  selectedSession === 'standard' && {color: theme.colors.actionSuccess},
                  selectedSession === 'express' && {color: '#77ff00'},
                  selectedSession === 'maintenance' && {color: '#ffff00'},
                ]}>
                  {selectedSession === 'standard' && '31 MINUTES'}
                  {selectedSession === 'express' && '25 MINUTES'}
                  {selectedSession === 'maintenance' && '19 MINUTES'}
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
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
      </SafeAreaView>

      {/* Sidebar Menu */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onSelect={handleSidebarSelect}
      />
    </>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

// Selector text sizing for compact multi-option displays
const SELECTOR_TEXT_SIZE = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },

  topNavContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: theme.colors.pureBlack,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingTop: theme.layout.topNav.topSpacing + theme.layout.topNav.height + 66 + theme.spacing.s, // Start from bottom of title bar (64dp nav + 66dp bar + 8dp)
    paddingBottom: theme.layout.bottomNav.height + theme.spacing.s, // Clear bottom navigation with standard margin
    paddingLeft: theme.spacing.s, // Standard screen edge margin
    paddingRight: theme.spacing.s, // Standard screen edge margin
  },

  // === WORKOUT TITLE BAR ===
  workoutTitleBar: {
    position: 'absolute', // Fixed position below top nav
    top: theme.layout.topNav.topSpacing + theme.layout.topNav.height, // 64dp (32 status + 32 nav)
    left: 0,
    right: 0,
    height: 66, // 8dp top + 50dp button + 8dp bottom = perfectly balanced
    backgroundColor: theme.colors.backgroundPrimary,
    borderBottomWidth: theme.layout.border.thin, // Green border on bottom
    borderBottomColor: theme.colors.actionSuccess, // Green border
    flexDirection: 'row', // Horizontal layout for title and button
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Space between title and button
    paddingLeft: theme.spacing.s, // 8dp from left edge
    paddingRight: theme.spacing.s, // 8dp from right edge
    zIndex: 5, // Below top nav (10) but above content
  },

  workoutTitleText: {
    fontSize: theme.typography.fontSize.xxxl, // 32dp
    fontFamily: theme.typography.fontFamily.workoutCard, // Zuume-ExtraBold
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    includeFontPadding: false, // Eliminate Android font padding for precise alignment
    transform: [{scaleX: 1.2}, {translateY: 1}], // 20% wider + 1dp down for optical centering
    marginLeft: 14, // 8dp bar padding + 6dp scaleX compensation + 8dp spacing = 16dp visual alignment
  },

  // === LET'S GO BUTTON ===
  letsGoButtonContainer: {
    width: 100, // Same as Begin button
    height: 50, // Fits in 66dp bar with 8dp spacing
  },

  letsGoButtonShadow: {
    position: 'absolute',
    width: 100,
    height: 50,
    backgroundColor: theme.colors.shadowBlack,
    borderRadius: 8,
  },

  letsGoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 50,
    backgroundColor: theme.colors.actionSuccess, // Green background
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  letsGoButtonText: {
    fontSize: theme.typography.fontSize.l, // 20dp - Same as Begin button
    fontFamily: theme.typography.fontFamily.primary, // Roboto
    fontWeight: theme.typography.fontWeight.bold, // Bold
    color: theme.colors.pureBlack, // Black text on green
    textTransform: 'uppercase',
  },

  // Shadow layers for drop shadow effect
  shadowLayer3: {
    bottom: -6, // Furthest shadow layer
    right: 0,
    opacity: 0.15,
  },

  shadowLayer2: {
    bottom: -4, // Middle shadow layer
    right: 0,
    opacity: 0.25,
  },

  shadowLayer1: {
    bottom: -2, // Closest shadow layer
    right: 0,
    opacity: 0.4,
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
    fontWeight: theme.typography.fontWeight.bold, // Ensure bold text
    // Color is set dynamically based on selected session
    // Standard: green (#00FF00)
    // Express: olive (#77ff00)
    // Maintenance: yellow (#ffff00)
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
});
