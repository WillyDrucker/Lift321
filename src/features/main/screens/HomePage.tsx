// ==========================================================================
// HOME PAGE SCREEN
//
// Main home screen for guest users and authenticated members.
// Displays welcome box and workout recommendations.
//
// Dependencies: theme tokens, hooks, AppLayout
// Used by: Navigation stack (from LoginScreen guest login)
// ==========================================================================

import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {theme} from '@/theme';
import type {TabScreenProps} from '@/navigation/types';
import {
  AppLayout,
  WelcomeBox,
  WorkoutCardsScroller,
  CustomWorkoutCardsScroller,
} from '@/components';
import {useSwipeGesture} from '@/hooks';
import {getWelcomeMessage} from '@/utils/workoutSchedule';

// === TYPES ===

type HomePageProps = TabScreenProps<'HomePage'>;

// === COMPONENT ===

export const HomePage: React.FC<HomePageProps> = ({navigation}) => {
  // === STATE ===

  const [selectedDay, setSelectedDay] = useState<string>('');
  const [welcomeVisible, setWelcomeVisible] = useState<boolean>(true);

  // === COMPUTED VALUES ===

  const welcomeMessage = getWelcomeMessage();

  // Plan progress data (static for now)
  const totalWorkouts = 36;
  const completedWorkouts = 3;

  // === HOOKS ===

  const {translateX, opacity, panHandlers} = useSwipeGesture({
    onDismiss: () => setWelcomeVisible(false),
  });

  // === EFFECTS ===

  useEffect(() => {
    translateX.setValue(0);
    opacity.setValue(1);
  }, []);

  // === EVENT HANDLERS ===

  const handleDayPress = useCallback((date: string) => {
    setSelectedDay(date);
    console.log('Day pressed:', date);
  }, []);

  const handleNavigate = useCallback((screen: string) => {
    navigation.navigate(screen as any);
  }, [navigation]);

  // === RENDER ===

  return (
    <AppLayout
      selectedDay={selectedDay}
      onDayPress={handleDayPress}
      completedWorkouts={completedWorkouts}
      totalWorkouts={totalWorkouts}
      onNavigate={handleNavigate}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled={true}
      >
        {/* Welcome Box */}
        <WelcomeBox
          userName="Willy"
          message={welcomeMessage}
          visible={welcomeVisible}
          translateX={translateX}
          opacity={opacity}
          panHandlers={panHandlers}
        />

        {/* My Workouts Section Header */}
        <View style={[styles.sectionHeader, {marginTop: 2}]}>
          <Text style={styles.sectionHeaderText}>My Workouts</Text>
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
    </AppLayout>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  sectionHeader: {
    marginTop: 8,
    marginBottom: theme.spacing.xs,
    marginLeft: theme.layout.recommendedWorkout.leftMargin,
  },

  sectionHeaderText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureWhite,
  },
});
