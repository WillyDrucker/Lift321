// ==========================================================================
// HOME PAGE SCREEN
//
// Main home screen for guest users and authenticated members.
// Displays navigation, calendar, progress, welcome box, and workout recommendations.
//
// Dependencies: theme tokens, hooks, navigation components
// Used by: Navigation stack (from LoginScreen guest login)
// ==========================================================================

import React, {useState, useRef} from 'react';
import {Animated, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {
  TopNavBar,
  WeekCalendar,
  PlanProgressBar,
  BottomTabBar,
  WelcomeBox,
  RecommendedWorkoutBox,
  type TabItem,
} from '@/components';
import {useSwipeGesture} from '@/hooks';

// === TYPES ===

type HomePageProps = RootStackScreenProps<'HomePage'>;

// === COMPONENT ===

export const HomePage: React.FC<HomePageProps> = ({navigation}) => {
  // === STATE ===
  // Component state management

  const [activeTab, setActiveTab] = useState<TabItem>('home');
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [welcomeVisible, setWelcomeVisible] = useState<boolean>(true);
  const [menuTapCount, setMenuTapCount] = useState<number>(0);
  const tapTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Animated value for workout box positioning
  const workoutBoxTop = useRef(
    new Animated.Value(theme.layout.recommendedWorkout.topPositionWithWelcome),
  ).current;

  // Plan progress data (static for now)
  const planName = 'Lift 3-2-1';
  const totalWorkouts = 36; // 12 weeks × 3 days/week
  const completedWorkouts = 3; // Week 1 complete (3 days)

  // === HOOKS ===
  // Swipe gesture for welcome box dismissal

  const {translateX, opacity, panHandlers, resetPosition} = useSwipeGesture({
    onDismiss: () => setWelcomeVisible(false),
    workoutBoxAnimatedTop: workoutBoxTop,
  });

  // === EVENT HANDLERS ===
  // User interaction callbacks

  const handleMenuPress = () => {
    // Triple-tap detection for showing welcome box
    setMenuTapCount(prev => prev + 1);

    if (tapTimerRef.current) {
      clearTimeout(tapTimerRef.current);
    }

    tapTimerRef.current = setTimeout(() => {
      if (menuTapCount + 1 === 3) {
        console.log('Triple tap detected - showing welcome box');
        resetPosition();
        setWelcomeVisible(true);
      }
      setMenuTapCount(0);
    }, theme.layout.animation.tripleTapTimeout);

    console.log('Menu pressed');
    // TODO: Open sidebar menu
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
    // TODO: Implement navigation to different sections
  };

  // === RENDER ===
  // Main component JSX structure

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.pureBlack}
      />
      <SafeAreaView style={styles.container}>
        {/* Top Navigation */}
        <TopNavBar
          onSearchPress={handleSearchPress}
          onMenuPress={handleMenuPress}
        />

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

        {/* Welcome Box */}
        <WelcomeBox
          userName="Willy"
          message="We're glad you're here and value your time. Let's get started. Select a workout below."
          visible={welcomeVisible}
          translateX={translateX}
          opacity={opacity}
          panHandlers={panHandlers}
        />

        {/* Recommended Workout */}
        <RecommendedWorkoutBox
          workoutTitle="Chest (Push)"
          animatedTop={workoutBoxTop}
        />

        {/* Bottom Navigation */}
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </SafeAreaView>
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
});
