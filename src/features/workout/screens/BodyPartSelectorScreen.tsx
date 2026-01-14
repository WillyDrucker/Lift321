// ==========================================================================
// BODY PART WORKOUTS SCREEN
//
// Full workout browser organized by body part with horizontal card scrolling.
// Cards are grouped by body part (Chest → Arms → Shoulders → Back → Legs → Abs).
// Top tabs sync with scroll position and allow quick navigation.
//
// Dependencies: theme tokens, navigation types, AppLayout
// Used by: Navigation stack (from WorkoutCard press on HomePage)
// ==========================================================================

import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {theme} from '@/theme';
import type {MainStackScreenProps} from '@/navigation/types';
import {AppLayout, StandaloneBottomTabBar} from '@/components';
import {WorkoutCard} from '@/components/WorkoutCard';

// ============================================================================
// TYPES
// ============================================================================

type BodyPartSelectorProps = MainStackScreenProps<'BodyPartSelector'>;

type BodyPart = 'Chest' | 'Arms' | 'Shoulders' | 'Back' | 'Legs' | 'Abs';

type BodyPartWorkout = {
  bodyPart: BodyPart;
  title: string;
  subtitle?: string;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const SCREEN_WIDTH = Dimensions.get('window').width;
const BODY_PARTS: BodyPart[] = ['Chest', 'Arms', 'Shoulders', 'Back', 'Legs', 'Abs'];

const BODY_PART_WORKOUTS: BodyPartWorkout[] = [
  {bodyPart: 'Chest', title: 'Chest 3-2-1'},
  {bodyPart: 'Arms', title: 'Arms 3-2-1'},
  {bodyPart: 'Shoulders', title: 'Shoulders 3-2-1'},
  {bodyPart: 'Back', title: 'Back 3-2-1'},
  {bodyPart: 'Legs', title: 'Legs 3-2-1'},
  {bodyPart: 'Abs', title: 'Abs 3-2-1'},
];

const CARD_WIDTH = theme.layout.recommendedWorkout.cardWidth;
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing;
const CARD_MARGIN = theme.layout.recommendedWorkout.leftMargin + 4;

const getBodyPartIndices = (): number[] => {
  return BODY_PART_WORKOUTS.map(workout =>
    BODY_PARTS.indexOf(workout.bodyPart)
  );
};

const DAY_NAMES: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const getTodaysDayName = (): string => {
  const dayOfWeek = new Date().getDay();
  return DAY_NAMES[dayOfWeek];
};

const getTodaysFocus = (): BodyPart => {
  const dayOfWeek = new Date().getDay();
  const focusMap: Record<number, BodyPart> = {
    0: 'Chest',
    1: 'Chest',
    2: 'Arms',
    3: 'Shoulders',
    4: 'Back',
    5: 'Legs',
    6: 'Legs',
  };
  return focusMap[dayOfWeek];
};

// ============================================================================
// COMPONENT
// ============================================================================

export const BodyPartSelectorScreen: React.FC<BodyPartSelectorProps> = ({
  route,
  navigation,
}) => {
  // ==========================================================================
  // STATE
  // ==========================================================================

  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const {suggester} = route.params;
  const todaysFocus = getTodaysFocus();
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>(todaysFocus);
  const [selectedDay, setSelectedDay] = useState<string>('');

  const totalWorkouts = 36;
  const completedWorkouts = 3;

  const bodyPartIndices = useMemo(() => getBodyPartIndices(), []);
  const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

  // ==========================================================================
  // EFFECTS
  // ==========================================================================

  useEffect(() => {
    const firstCardIndex = BODY_PART_WORKOUTS.findIndex(w => w.bodyPart === todaysFocus);
    if (firstCardIndex !== -1 && scrollViewRef.current) {
      setTimeout(() => {
        const scrollPosition = firstCardIndex * SNAP_INTERVAL;
        scrollViewRef.current?.scrollTo({x: scrollPosition, animated: false});
      }, 100);
    }
  }, [todaysFocus, SNAP_INTERVAL]);

  // ==========================================================================
  // HANDLERS
  // ==========================================================================

  const handleBodyPartSelect = useCallback((bodyPart: BodyPart) => {
    setSelectedBodyPart(bodyPart);

    const firstCardIndex = BODY_PART_WORKOUTS.findIndex(w => w.bodyPart === bodyPart);
    if (firstCardIndex !== -1 && scrollViewRef.current) {
      const scrollPosition = firstCardIndex * SNAP_INTERVAL;
      scrollViewRef.current.scrollTo({x: scrollPosition, animated: true});
    }
  }, [SNAP_INTERVAL]);

  const handleScroll = useCallback((event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const cardIndex = Math.round(offsetX / SNAP_INTERVAL);

    const clampedIndex = Math.max(0, Math.min(cardIndex, BODY_PART_WORKOUTS.length - 1));
    const currentBodyPart = BODY_PART_WORKOUTS[clampedIndex]?.bodyPart;

    if (currentBodyPart && currentBodyPart !== selectedBodyPart) {
      setSelectedBodyPart(currentBodyPart);
    }
  }, [SNAP_INTERVAL, selectedBodyPart]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDayPress = useCallback((date: string) => {
    setSelectedDay(date);
  }, []);

  const handleNavigate = useCallback((screen: string) => {
    navigation.navigate(screen as any);
  }, [navigation]);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <>
      <AppLayout
        showBackButton={true}
        onBackPress={handleBack}
        selectedDay={selectedDay}
        onDayPress={handleDayPress}
        completedWorkouts={completedWorkouts}
        totalWorkouts={totalWorkouts}
        onNavigate={handleNavigate}
      >
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Body Part Tabs */}
          <View style={styles.tabsSection}>
            <View style={styles.tabsRow}>
              {BODY_PARTS.map((bodyPart, index) => {
                const isSelected = selectedBodyPart === bodyPart;
                const isLast = index === BODY_PARTS.length - 1;

                return (
                  <React.Fragment key={bodyPart}>
                    <TouchableOpacity
                      style={[
                        styles.tab,
                        isSelected && styles.tabSelected,
                      ]}
                      onPress={() => handleBodyPartSelect(bodyPart)}
                    >
                      <Text
                        style={[
                          styles.tabText,
                          isSelected && styles.tabTextSelected,
                        ]}
                      >
                        {bodyPart.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                    {!isLast && <Text style={styles.tabSeparator}>|</Text>}
                  </React.Fragment>
                );
              })}
            </View>
          </View>

          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              {selectedBodyPart} Workouts
            </Text>
          </View>

          {/* Horizontal Workout Cards Scroller */}
          <View style={styles.cardsContainer}>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={0.985}
              snapToInterval={SNAP_INTERVAL}
              snapToAlignment="start"
              disableIntervalMomentum={true}
              contentContainerStyle={{paddingLeft: CARD_MARGIN, paddingRight: CARD_MARGIN}}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true, listener: handleScroll}
              )}
              onMomentumScrollEnd={handleScroll}
            >
              {BODY_PART_WORKOUTS.map((workout, index) => (
                <WorkoutCard
                  key={`${workout.bodyPart}-${workout.title}-${index}`}
                  workoutType={workout.bodyPart}
                  title={workout.title}
                  isFirstCard={index === 0}
                  isLastCard={index === BODY_PART_WORKOUTS.length - 1}
                  index={index}
                  scrollX={scrollX}
                  cardIndex={index}
                  cardWidth={CARD_WIDTH}
                  onPress={() => navigation.navigate('WorkoutOverview', {
                    workoutType: workout.bodyPart,
                    suggester: suggester,
                    day: getTodaysDayName(),
                  })}
                />
              ))}
            </Animated.ScrollView>
          </View>
        </ScrollView>
      </AppLayout>

      {/* Bottom Tab Bar (standalone for stack screens) */}
      <StandaloneBottomTabBar activeTab="home" />
    </>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  tabsSection: {
    paddingTop: 0,
    paddingBottom: theme.spacing.sm,
    paddingHorizontal: theme.spacing.s,
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tab: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.xs,
  },
  tabSelected: {},
  tabText: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold as '700',
    color: theme.colors.textSecondary,
  },
  tabTextSelected: {
    color: theme.colors.actionSuccess,
  },
  tabSeparator: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.textSecondary,
    marginHorizontal: 2,
  },
  sectionHeader: {
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  sectionHeaderText: {
    fontSize: theme.typography.fontSize.lg,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold as '700',
    color: theme.colors.textPrimary,
  },
  cardsContainer: {
    height: theme.layout.recommendedWorkout.height,
    overflow: 'visible',
  },
});
