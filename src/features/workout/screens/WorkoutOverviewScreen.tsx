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

        {/* Scrollable Content Area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Workout Overview Title Card */}
          <View style={styles.workoutTitleCard}>
            <View style={styles.workoutTitleSelector}>
              {/* Workout Title */}
              <Text style={styles.workoutTitleText}>{workoutType}</Text>
            </View>
          </View>

          {/* Workout Overview Plan Card */}
          <View style={styles.workoutPlanCard}>
            {/* Current Plan Selector */}
            <TouchableOpacity
              style={styles.workoutPlanCurrentSelector}
              onPress={() => console.log('Current plan pressed')}
              activeOpacity={1}>
              <Text style={styles.workoutPlanCurrentText}>CURRENT PLAN</Text>
            </TouchableOpacity>

            {/* Plan Name Selector */}
            <TouchableOpacity
              style={styles.workoutPlanNameSelector}
              onPress={() => console.log('Plan selector pressed')}
              activeOpacity={1}>
              <Text style={styles.workoutPlanNameText}>
                <Text style={styles.workoutPlanNameItalic}>LIFT</Text> 3-2-1
              </Text>
            </TouchableOpacity>

            {/* Week Progress Selector */}
            <TouchableOpacity
              style={styles.workoutPlanWeekSelector}
              onPress={() => console.log('Week selector pressed')}
              activeOpacity={1}>
              <Text style={styles.workoutPlanWeekText}>
                WEEK <Text style={styles.workoutPlanWeekGreen}>2 </Text>OF<Text style={styles.workoutPlanWeekGreen}> 15</Text>
              </Text>
            </TouchableOpacity>

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
            {/* Current Session Selector */}
            <TouchableOpacity
              style={styles.workoutSessionCurrentSelector}
              onPress={() => console.log('Current session pressed')}
              activeOpacity={1}>
              <Text style={styles.workoutSessionCurrentText}>CURRENT SESSION</Text>
            </TouchableOpacity>

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
            {/* Current Equipment Selector */}
            <TouchableOpacity
              style={styles.workoutEquipmentCurrentSelector}
              onPress={() => console.log('Current equipment pressed')}
              activeOpacity={1}>
              <Text style={styles.workoutEquipmentCurrentText}>CURRENT EQUIPMENT</Text>
            </TouchableOpacity>

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
    paddingTop: theme.layout.topNav.topSpacing + theme.layout.topNav.height + theme.spacing.s, // Clear full navigation bar with standard margin
    paddingBottom: theme.layout.bottomNav.height + theme.spacing.s, // Clear bottom navigation with standard margin
    paddingLeft: theme.spacing.s, // Standard screen edge margin
    paddingRight: theme.spacing.s, // Standard screen edge margin
  },

  // === WORKOUT TITLE CARD ===
  workoutTitleCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    padding: theme.spacing.s, // Standard card internal padding
    marginBottom: theme.spacing.s, // Standard card separation
  },

  workoutTitleSelector: {
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.pureBlack,
    borderRadius: theme.spacing.s, // Standard selector border radius
    justifyContent: 'center',
    alignItems: 'center',
  },

  workoutTitleText: {
    fontSize: theme.typography.fontSize.xxxl,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === WORKOUT PLAN CARD ===
  workoutPlanCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    padding: theme.spacing.s, // Standard card internal padding
    marginBottom: theme.spacing.s, // Standard card separation
  },

  workoutPlanCurrentSelector: {
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    marginBottom: 1, // Minimal spacing between stacked selectors
  },

  workoutPlanCurrentText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary labels
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Subdued label color for hierarchy
    textTransform: 'uppercase',
  },

  workoutPlanNameSelector: {
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    borderWidth: theme.layout.border.thin,
    borderColor: theme.colors.actionSuccess, // Highlight border for active selection
    marginBottom: 1, // Minimal spacing between stacked selectors
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

  workoutPlanWeekSelector: {
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    borderWidth: theme.layout.border.thin,
    borderColor: 'transparent', // No border for non-interactive display
    marginBottom: 1, // Minimal spacing between stacked selectors
  },

  workoutPlanWeekText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary selectors
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
  },

  workoutPlanWeekGreen: {
    color: theme.colors.actionSuccess, // Highlight color for key values
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
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === WORKOUT SESSION CARD ===
  workoutSessionCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    padding: theme.spacing.s, // Standard card internal padding
    marginBottom: theme.spacing.s, // Standard card separation
  },

  workoutSessionCurrentSelector: {
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    marginBottom: 1, // Minimal spacing between stacked selectors
  },

  workoutSessionCurrentText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary labels
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Subdued label color for hierarchy
    textTransform: 'uppercase',
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
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  // === WORKOUT EQUIPMENT CARD ===
  workoutEquipmentCard: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s, // Standard card border radius
    padding: theme.spacing.s, // Standard card internal padding
  },

  workoutEquipmentCurrentSelector: {
    height: 50, // Standard selector height for touch targets
    backgroundColor: theme.colors.pureBlack,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.spacing.s, // Standard selector border radius
    marginBottom: 1, // Minimal spacing between stacked selectors
  },

  workoutEquipmentCurrentText: {
    fontSize: theme.typography.fontSize.xl, // Large text for primary labels
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.backgroundTertiary, // Subdued label color for hierarchy
    textTransform: 'uppercase',
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
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    textAlign: 'center', // Center text within selector
  },
});
