// ==========================================================================
// HOME PAGE SCREEN
//
// Main home screen for guest users and authenticated members.
// Displays navigation, calendar, progress, welcome box, and workout recommendations.
//
// Dependencies: theme tokens, hooks, navigation components
// Used by: Navigation stack (from LoginScreen guest login)
// ==========================================================================

import React, {useState, useRef, useEffect} from 'react';
import {
  Animated,
  Easing,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {
  TopNavBar,
  WeekCalendar,
  PlanProgressBar,
  BottomTabBar,
  WelcomeBox,
  WorkoutCardsScroller,
  CustomWorkoutCardsScroller,
  Sidebar,
  type TabItem,
} from '@/components';
import {useSwipeGesture} from '@/hooks';

// === TYPES ===

type HomePageProps = RootStackScreenProps<'HomePage'>;

// === COMPONENT ===

export const HomePage: React.FC<HomePageProps> = ({navigation}) => {
  // === STATE ===
  // Component state management

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabItem>('home');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [welcomeVisible, setWelcomeVisible] = useState<boolean>(true);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  // No animated positioning needed for flow layout - cards stack naturally

  // Plan progress data (static for now)
  const planName = 'Lift 3-2-1';
  const totalWorkouts = 36; // 12 weeks × 3 days/week
  const completedWorkouts = 3; // Week 1 complete (3 days)

  // Calculate dynamic bottom padding to match BottomTabBar height
  // The dynamicHeight already accounts for safe area - no need to add insets again
  const dynamicBottomTabHeight = insets.bottom > theme.layout.bottomNav.gestureNavThreshold
    ? theme.layout.bottomNav.height + theme.layout.bottomNav.buttonNavExtraHeight
    : theme.layout.bottomNav.height;

  // === HOOKS ===
  // Swipe gesture for welcome box dismissal

  const {translateX, opacity, panHandlers} = useSwipeGesture({
    onDismiss: () => setWelcomeVisible(false),
  });

  // === EFFECTS ===
  // Entrance animation for welcome box

  useEffect(() => {
    // Set initial position off-screen to the right
    translateX.setValue(300);
    opacity.setValue(0);

    // Animate whoosh-in from right to left
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, []); // Run only once on mount

  // === EVENT HANDLERS ===
  // User interaction callbacks

  const handleMenuPress = () => {
    setSidebarVisible(true);
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    // TODO: Open search screen
  };

  const handleDayPress = (date: string) => {
    setSelectedDay(date);
    console.log('Day pressed:', date);
    // TODO: Load workouts for selected day
  };

  const handleTabPress = (tab: TabItem) => {
    setActiveTab(tab);
    console.log('Tab pressed:', tab);

    // Navigate to different screens based on tab
    switch (tab) {
      case 'plans':
        navigation.navigate('PlansPage');
        break;
      case 'home':
        // Already on home page
        break;
      case 'performance':
        // TODO: Navigate to performance screen
        console.log('Performance screen not yet implemented');
        break;
      case 'profile':
        navigation.navigate('ProfileScreen');
        break;
    }
  };

  const handleSidebarSelect = async (
    option: 'profile' | 'settings' | 'help' | 'logout',
  ) => {
    console.log('Sidebar option selected:', option);

    switch (option) {
      case 'profile':
        navigation.navigate('ProfileScreen');
        break;
      case 'settings':
        navigation.navigate('SettingsScreen');
        break;
      case 'help':
        navigation.navigate('HelpScreen');
        break;
      case 'logout':
        console.log('Logout - clearing auth state');
        // Clear guest mode and sign out
        const {disableGuestMode, signOut} = await import('@/services');
        await disableGuestMode();
        await signOut();
        // Auth change will automatically trigger navigation to AuthNavigator
        break;
    }
  };

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundPrimary}
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* Scrollable Content Area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: dynamicBottomTabHeight + theme.spacing.s}
          ]}
          showsVerticalScrollIndicator={false}
          snapToInterval={256 + 40} // Snap to each workout section (card height + header)
          decelerationRate="fast"
          snapToAlignment="start"
          directionalLockEnabled={true}
        >
          {/* Welcome Box */}
          <WelcomeBox
            userName="Willy"
            message="We're glad you're here and value your time. Let's get started. Select a workout below."
            visible={welcomeVisible}
            translateX={translateX}
            opacity={opacity}
            panHandlers={panHandlers}
          />

          {/* Primary Workouts Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Primary Workouts</Text>
          </View>

          {/* Workout Cards Scroller */}
          <WorkoutCardsScroller />

          {/* Specialized Workouts Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Specialized Workouts</Text>
          </View>

          {/* Custom Workout Cards Scroller */}
          <CustomWorkoutCardsScroller />
        </ScrollView>

        {/* Fixed Top Navigation (renders above ScrollView) */}
        <View style={styles.topBarsContainer}>
          <TopNavBar
            onSearchPress={handleSearchPress}
            onMenuPress={handleMenuPress}
          />

          {/* Divider Bar */}
          <View style={styles.divider} />

          {/* Week Calendar */}
          <WeekCalendar
            selectedDay={selectedDay}
            onDayPress={handleDayPress}
          />

          {/* Plan Progress */}
          <PlanProgressBar
            planName={planName}
            completedWorkouts={completedWorkouts}
            totalWorkouts={totalWorkouts}
          />
        </View>

        {/* Bottom Navigation */}
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },

  topBarsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Fixed bars layer above scrollable content
    backgroundColor: theme.colors.pureBlack, // Pure black background (global standard)
  },

  divider: {
    height: theme.layout.border.thin,
    backgroundColor: theme.colors.borderDefault,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: theme.layout.planProgress.topPosition + theme.layout.planProgress.height, // Scrollable content starts below fixed progress bar
    // paddingBottom is set dynamically via inline style to match BottomTabBar height (accounts for safe area insets)
  },

  sectionHeader: {
    marginTop: theme.spacing.s, // 8dp spacing from element above
    marginBottom: theme.spacing.xs,
    marginLeft: theme.layout.recommendedWorkout.leftMargin, // Align with workout cards
  },

  sectionHeaderText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureWhite,
  },
});
