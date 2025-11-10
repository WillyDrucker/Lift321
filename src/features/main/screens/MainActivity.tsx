// ==========================================================================
// MAIN ACTIVITY SCREEN
//
// Main activity screen for guest users and authenticated members.
// Shows workout plan preview with day selector and bottom navigation.
//
// Dependencies: theme tokens, React Navigation, icons, SimpleMenu
// Used by: Navigation stack (from LoginScreen guest login)
// ==========================================================================

import React, {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {
  HamburgerIcon,
  HomeIcon,
  PlansIcon,
  HistoryIcon,
  StatsIcon,
  ProfileIcon,
} from '@/components/icons';
import {SimpleMenu} from '@/components/SimpleMenu';

// === TYPES ===

type MainActivityProps = RootStackScreenProps<'MainActivity'>;

type DayOfWeek = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

type NavItem = 'plans' | 'history' | 'home' | 'stats' | 'profile';

// Placeholder workout data structure
type WorkoutDay = {
  day: DayOfWeek;
  name: string;
  exercises: string[];
};

// === CONSTANTS ===

// Days of the week for tab selector
const DAYS: DayOfWeek[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Placeholder workout plan data
const WORKOUT_PLAN: WorkoutDay[] = [
  {
    day: 'Mon',
    name: 'Push Day',
    exercises: ['Bench Press', 'Overhead Press', 'Tricep Dips', 'Push-ups'],
  },
  {
    day: 'Tue',
    name: 'Pull Day',
    exercises: ['Deadlift', 'Pull-ups', 'Barbell Rows', 'Face Pulls'],
  },
  {
    day: 'Wed',
    name: 'Leg Day',
    exercises: ['Squats', 'Leg Press', 'Lunges', 'Calf Raises'],
  },
  {
    day: 'Thu',
    name: 'Upper Body',
    exercises: ['Incline Press', 'Cable Rows', 'Lateral Raises', 'Curls'],
  },
  {
    day: 'Fri',
    name: 'Lower Body',
    exercises: ['Front Squats', 'Romanian Deadlifts', 'Leg Curls', 'Glute Bridges'],
  },
  {
    day: 'Sat',
    name: 'Full Body',
    exercises: ['Power Cleans', 'Front Squats', 'Pull-ups', 'Dips'],
  },
  {
    day: 'Sun',
    name: 'Rest Day',
    exercises: ['Active Recovery', 'Stretching', 'Light Cardio'],
  },
];

// === COMPONENT ===

export const MainActivity: React.FC<MainActivityProps> = ({navigation}) => {
  // === STATE ===
  // Component state management

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Mon');
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<NavItem>('home');

  // === HOOKS ===
  // Get current workout based on selected day

  const currentWorkout = WORKOUT_PLAN.find(w => w.day === selectedDay) || WORKOUT_PLAN[0];

  // === EVENT HANDLERS ===
  // User interaction callbacks

  const handleDaySelect = useCallback((day: DayOfWeek) => {
    setSelectedDay(day);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setMenuVisible(prev => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setMenuVisible(false);
  }, []);

  const handleMenuSelect = useCallback((option: 'settings' | 'profile' | 'logout') => {
    // TODO: Implement menu actions
    console.log('Menu option selected:', option);
  }, []);

  const handleNavPress = useCallback((nav: NavItem) => {
    setActiveNav(nav);
    // TODO: Implement navigation to different screens
    console.log('Nav pressed:', nav);
  }, []);

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundPrimary}
      />
      <SafeAreaView style={styles.container}>
        {/* Header with Hamburger Menu and Logo */}
        <View style={styles.header}>
          <Pressable
            style={({pressed}) => [
              styles.hamburgerButton,
              pressed && styles.hamburgerPressed,
            ]}
            onPress={handleMenuToggle}>
            <HamburgerIcon
              size={28}
              color={theme.colors.textPrimary}
            />
          </Pressable>

          <View style={styles.logoContainer}>
            <Text style={styles.liftText}>LIFT</Text>
            <View style={styles.logoWrapper}>
              <View style={styles.logoShadowLayer3} />
              <View style={styles.logoShadowLayer2} />
              <View style={styles.logoShadowLayer1} />
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Simple Menu Dropdown */}
        <SimpleMenu
          visible={menuVisible}
          onClose={handleMenuClose}
          onSelect={handleMenuSelect}
        />

        {/* Main Content with ScrollView */}
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}
          showsVerticalScrollIndicator={false}>

          {/* Day Selector Tabs */}
          <View style={styles.dayTabsContainer}>
            {DAYS.map(day => {
              const isActive = day === selectedDay;
              return (
                <Pressable
                  key={day}
                  style={({pressed}) => [
                    styles.dayTab,
                    isActive && styles.dayTabActive,
                    pressed && styles.dayTabPressed,
                  ]}
                  onPress={() => handleDaySelect(day)}>
                  <Text
                    style={[
                      styles.dayTabText,
                      isActive && styles.dayTabTextActive,
                    ]}>
                    {day}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Workout Plan Preview Card */}
          <View style={styles.workoutCard}>
            <Text style={styles.workoutDayName}>{currentWorkout.name}</Text>
            <Text style={styles.workoutDayLabel}>{currentWorkout.day}</Text>

            <View style={styles.exerciseList}>
              {currentWorkout.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseItem}>
                  <View style={styles.exerciseBullet} />
                  <Text style={styles.exerciseText}>{exercise}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <Pressable
            style={styles.navButton}
            onPress={() => handleNavPress('plans')}>
            <PlansIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeNav === 'plans'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.navLabel,
                activeNav === 'plans' && styles.navLabelActive,
              ]}>
              Plans
            </Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => handleNavPress('history')}>
            <HistoryIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeNav === 'history'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.navLabel,
                activeNav === 'history' && styles.navLabelActive,
              ]}>
              History
            </Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => handleNavPress('home')}>
            <HomeIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeNav === 'home'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.navLabel,
                activeNav === 'home' && styles.navLabelActive,
              ]}>
              Home
            </Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => handleNavPress('stats')}>
            <StatsIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeNav === 'stats'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.navLabel,
                activeNav === 'stats' && styles.navLabelActive,
              ]}>
              Stats
            </Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={() => handleNavPress('profile')}>
            <ProfileIcon
              size={theme.layout.bottomNav.iconSize}
              color={
                activeNav === 'profile'
                  ? theme.colors.navActive
                  : theme.colors.navInactive
              }
            />
            <Text
              style={[
                styles.navLabel,
                activeNav === 'profile' && styles.navLabelActive,
              ]}>
              Profile
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  // === HEADER STYLES ===

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: theme.layout.header.indent,
    paddingRight: theme.layout.header.indent,
    marginTop: theme.layout.header.appTopSpacing,
  },

  hamburgerButton: {
    padding: theme.spacing.s,
    marginRight: theme.spacing.m,
  },

  hamburgerPressed: {
    opacity: 0.6,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  liftText: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.brand,
    color: theme.colors.textPrimary,
    letterSpacing: 1,
    ...theme.textShadows.default,
  },

  logoWrapper: {
    marginLeft: theme.spacing.s,
    position: 'relative',
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
  },

  logoShadowLayer1: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer1.top,
    left: theme.buttons.shadowLayers.layer1.left,
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer1.opacity})`,
    borderRadius: theme.layout.logo.borderRadius,
  },

  logoShadowLayer2: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer2.top,
    left: theme.buttons.shadowLayers.layer2.left,
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer2.opacity})`,
    borderRadius: theme.layout.logo.borderRadius,
  },

  logoShadowLayer3: {
    position: 'absolute',
    top: theme.buttons.shadowLayers.layer3.top,
    left: theme.buttons.shadowLayers.layer3.left,
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    backgroundColor: `rgba(0, 0, 0, ${theme.buttons.shadowLayers.layer3.opacity})`,
    borderRadius: theme.layout.logo.borderRadius,
  },

  logo: {
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    position: 'relative',
  },

  // === SCROLL CONTENT STYLES ===

  scrollContent: {
    flex: 1,
  },

  scrollContentContainer: {
    paddingBottom: theme.spacing.xl,
  },

  // === DAY TABS STYLES ===

  dayTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.dayTabs.paddingHorizontal,
    marginTop: theme.spacing.xl,
    marginBottom: theme.layout.dayTabs.marginBottom,
    gap: theme.layout.dayTabs.spacing,
  },

  dayTab: {
    flex: 1,
    height: theme.layout.dayTabs.height,
    backgroundColor: theme.colors.tabInactive,
    borderRadius: theme.spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: theme.layout.dayTabs.buttonMinWidth,
  },

  dayTabActive: {
    backgroundColor: theme.colors.tabActive,
  },

  dayTabPressed: {
    opacity: 0.7,
  },

  dayTabText: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.tabInactiveText,
  },

  dayTabTextActive: {
    color: theme.colors.tabActiveText,
    fontWeight: theme.typography.fontWeight.bold,
  },

  // === WORKOUT CARD STYLES ===

  workoutCard: {
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: theme.layout.workoutCard.borderRadius,
    padding: theme.layout.workoutCard.padding,
    marginHorizontal: theme.layout.workoutCard.marginHorizontal,
    marginBottom: theme.layout.workoutCard.marginBottom,
  },

  workoutDayName: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.brand,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
    ...theme.textShadows.subtle,
  },

  workoutDayLabel: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.l,
  },

  exerciseList: {
    gap: theme.layout.workoutCard.exerciseSpacing,
  },

  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  exerciseBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    marginRight: theme.spacing.m,
  },

  exerciseText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textPrimary,
    flex: 1,
  },

  // === BOTTOM NAVIGATION STYLES ===

  bottomNav: {
    flexDirection: 'row',
    height: theme.layout.bottomNav.height,
    backgroundColor: theme.colors.backgroundSecondary,
    paddingVertical: theme.layout.bottomNav.paddingVertical,
    paddingHorizontal: theme.layout.bottomNav.paddingHorizontal,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderDefault,
  },

  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navLabel: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.navInactive,
    marginTop: theme.spacing.xs,
  },

  navLabelActive: {
    color: theme.colors.navActive,
    fontWeight: theme.typography.fontWeight.bold,
  },
});
