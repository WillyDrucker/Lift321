// ==========================================================================
// BODY PART WORKOUTS SCREEN
//
// Full workout browser organized by body part with horizontal card scrolling.
// Cards are grouped by body part (Chest → Arms → Shoulders → Back → Legs → Abs).
// Top tabs sync with scroll position and allow quick navigation.
//
// Dependencies: theme tokens, navigation types, shared components
// Used by: Navigation stack (from WorkoutCard press on HomePage)
// ==========================================================================

import React, {useState, useCallback, useRef, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import type {MainStackScreenProps} from '@/navigation/types';
import {
  TopNavBar,
  WeekCalendar,
  PlanProgressBar,
  Sidebar,
  StandaloneBottomTabBar,
} from '@/components';
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

// One workout card per body part
const BODY_PART_WORKOUTS: BodyPartWorkout[] = [
  {bodyPart: 'Chest', title: 'Chest'},
  {bodyPart: 'Arms', title: 'Arms'},
  {bodyPart: 'Shoulders', title: 'Shoulders'},
  {bodyPart: 'Back', title: 'Back'},
  {bodyPart: 'Legs', title: 'Legs'},
  {bodyPart: 'Abs', title: 'Abs'},
];

// Card dimensions from theme
const CARD_WIDTH = theme.layout.recommendedWorkout.cardWidth;
const CARD_SPACING = theme.layout.recommendedWorkout.cardSpacing;
const CARD_MARGIN = theme.layout.recommendedWorkout.leftMargin + 4; // Visual margin + offset

// Calculate which body part index each card belongs to
const getBodyPartIndices = (): number[] => {
  return BODY_PART_WORKOUTS.map(workout =>
    BODY_PARTS.indexOf(workout.bodyPart)
  );
};

// Simulated "today's focus" - will come from user's plan
const getTodaysFocus = (): BodyPart => {
  const dayOfWeek = new Date().getDay();
  const focusMap: Record<number, BodyPart> = {
    0: 'Chest',     // Sunday (Rest day - default to Chest)
    1: 'Chest',     // Monday
    2: 'Arms',      // Tuesday
    3: 'Shoulders', // Wednesday
    4: 'Back',      // Thursday
    5: 'Legs',      // Friday
    6: 'Legs',      // Saturday (matches JSON - Legs day 2)
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

  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const {suggester} = route.params;
  const todaysFocus = getTodaysFocus();
  const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>(todaysFocus);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  // Plan progress data (static for now - will come from context)
  const planName = 'Lift 3-2-1';
  const totalWorkouts = 36;
  const completedWorkouts = 3;

  // Body part indices for each card
  const bodyPartIndices = useMemo(() => getBodyPartIndices(), []);

  // Calculate snap interval
  const SNAP_INTERVAL = CARD_WIDTH + CARD_SPACING;

  // Calculate dynamic bottom padding for bottom tab bar
  const dynamicBottomTabHeight = insets.bottom > theme.layout.bottomNav.gestureNavThreshold
    ? theme.layout.bottomNav.height + theme.layout.bottomNav.buttonNavExtraHeight
    : theme.layout.bottomNav.height;

  // ==========================================================================
  // EFFECTS
  // ==========================================================================

  // Auto-scroll to today's focus on mount
  useEffect(() => {
    const firstCardIndex = BODY_PART_WORKOUTS.findIndex(w => w.bodyPart === todaysFocus);
    if (firstCardIndex !== -1 && scrollViewRef.current) {
      // Small delay to ensure scroll view is ready
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

    // Find first card index for this body part
    const firstCardIndex = BODY_PART_WORKOUTS.findIndex(w => w.bodyPart === bodyPart);
    if (firstCardIndex !== -1 && scrollViewRef.current) {
      const scrollPosition = firstCardIndex * SNAP_INTERVAL;
      scrollViewRef.current.scrollTo({x: scrollPosition, animated: true});
    }
  }, [SNAP_INTERVAL]);

  const handleScroll = useCallback((event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const cardIndex = Math.round(offsetX / SNAP_INTERVAL);

    // Clamp to valid range
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

  const handleGuidePress = useCallback(() => {
    navigation.navigate('HelpScreen');
  }, [navigation]);

  const handleMenuPress = useCallback(() => {
    setSidebarVisible(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarVisible(false);
  }, []);

  const handleSidebarSelect = useCallback(
    async (option: 'profile' | 'settings' | 'help' | 'logout' | 'devtools') => {
      setSidebarVisible(false);
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
        case 'devtools':
          navigation.navigate('DevToolsScreen');
          break;
      }
    },
    [navigation],
  );

  // ==========================================================================
  // RENDER
  // ==========================================================================

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
            {paddingBottom: dynamicBottomTabHeight + theme.spacing.lg}
          ]}
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
                  isFirstCard={index === 0}
                  isLastCard={index === BODY_PART_WORKOUTS.length - 1}
                  index={index}
                  scrollX={scrollX}
                  cardIndex={index}
                  cardWidth={CARD_WIDTH}
                  onPress={() => navigation.navigate('WorkoutOverview', {
                    workoutType: workout.bodyPart,
                    suggester: suggester,
                  })}
                />
              ))}
            </Animated.ScrollView>
          </View>
        </ScrollView>

        {/* Fixed Top Navigation (renders above ScrollView) */}
        <View style={styles.topBarsContainer}>
          <TopNavBar
            onGuidePress={handleGuidePress}
            onMenuPress={handleMenuPress}
            onBackPress={handleBack}
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

        {/* Sidebar */}
        <Sidebar
          visible={sidebarVisible}
          onClose={handleSidebarClose}
          onSelect={handleSidebarSelect}
        />

        {/* Bottom Tab Bar */}
        <StandaloneBottomTabBar activeTab="home" />
      </SafeAreaView>
    </>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 140, // Space for fixed top bars
  },
  topBarsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.pureBlack,
    zIndex: 10,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderPrimary,
    marginHorizontal: theme.spacing.lg,
  },
  tabsSection: {
    paddingTop: theme.spacing.md,
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
  tabSelected: {
    // Selected state handled by text color
  },
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
    paddingHorizontal: theme.spacing.lg,
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
