// ==========================================================================
// PLANS PAGE
//
// Main plans selection screen displaying available workout plans.
// Layout mirrors HomePage with plan cards instead of workout cards.
//
// Dependencies: Navigation, theme tokens, PlanCardsScroller
// Used by: Main navigation
// ==========================================================================

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import type {TabScreenProps} from '@/navigation/types';
import {TopNavBar} from '@/components/Navigation/TopNavBar';
import {WeekCalendar} from '@/components/Navigation/WeekCalendar';
import {PlanProgressBar} from '@/components/Navigation/PlanProgressBar';
import {Sidebar} from '@/components/Sidebar';
import {PlanCardsScroller} from '@/components/PlanCardsScroller';
import {disableGuestMode, signOut} from '@/services';

// === TYPES ===

export type PlansPageProps = TabScreenProps<'PlansPage'>;

// === CONSTANTS ===

// First section: "Lift 321 Plans" (8 plan cards)
const LIFT_PLANS = [
  'Lift 3-2-1',
  'Lift 3-2-GLP-1',
  'Beginner 3-2-1',
  'Advanced 3-2-1',
  'Expert 3-2-1',
  'Strength 3-2-1',
  'Growth 3-2-1',
  'Zero-to-SuperHero',
];

// Second section: "Popular Plans" (3 plan cards)
const POPULAR_PLANS = ['Athlete', 'Weight Loss', 'Lean'];

// === COMPONENT ===

export const PlansPage: React.FC<PlansPageProps> = ({navigation}) => {
  // === STATE ===

  const insets = useSafeAreaInsets();
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  // Calculate dynamic bottom tab bar height based on safe area insets
  // Detects gesture navigation (small inset) vs button navigation (large inset)
  const dynamicBottomTabHeight =
    insets.bottom > theme.layout.bottomNav.gestureNavThreshold
      ? theme.layout.bottomNav.height +
        theme.layout.bottomNav.buttonNavExtraHeight
      : theme.layout.bottomNav.height;

  // === EVENT HANDLERS ===

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
        await disableGuestMode();
        await signOut();
        // Auth change will automatically trigger navigation to AuthNavigator
        break;
    }
  };

  // === RENDER ===

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.pureBlack} />

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: dynamicBottomTabHeight + theme.spacing.s,
          },
        ]}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        directionalLockEnabled={true}>
        {/* Section 1: Lift 321 Plans */}
        <Text style={styles.sectionHeaderText}>Lift 321 Plans</Text>
        <PlanCardsScroller
          plans={LIFT_PLANS}
          cardHeight={theme.layout.planCard.height}
        />

        {/* Section 2: Popular Plans */}
        <Text style={[styles.sectionHeaderText, styles.popularPlansHeader]}>
          Popular Plans
        </Text>
        <PlanCardsScroller
          plans={POPULAR_PLANS}
          cardHeight={theme.layout.planCard.height}
        />
      </ScrollView>

      {/* Fixed Top Bars (Absolute Positioned) */}
      <View style={styles.fixedTopBars}>
        <TopNavBar
          onMenuPress={handleMenuPress}
          onGuidePress={handleGuidePress}
        />
        <View style={styles.divider} />
        <WeekCalendar />
        <PlanProgressBar />
      </View>

      {/* Sidebar (Overlay) */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onSelect={handleSidebarSelect}
      />
    </SafeAreaView>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    // paddingTop: Clear space for fixed top bars (TopNav + Calendar + Progress)
    paddingTop:
      theme.layout.planProgress.topPosition + theme.layout.planProgress.height,
    // paddingBottom: Dynamic based on safe area insets (set inline)
  },

  // === FIXED TOP BARS ===

  fixedTopBars: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: theme.colors.pureBlack,
  },

  divider: {
    height: theme.layout.border.thin,
    backgroundColor: theme.colors.navActive,
    position: 'absolute',
    top: theme.layout.topNav.topSpacing + theme.layout.topNav.height,
    left: 0,
    right: 0,
  },

  // === SECTION HEADERS ===

  sectionHeaderText: {
    fontSize: theme.typography.fontSize.m, // 16dp
    fontFamily: theme.typography.fontFamily.primary, // Roboto
    fontWeight: theme.typography.fontWeight.bold, // 700
    color: theme.colors.pureWhite,
    marginTop: theme.spacing.s, // 8dp
    marginBottom: theme.spacing.xs, // 4dp
    marginLeft: theme.layout.recommendedWorkout.leftMargin, // 8dp (align with cards)
  },

  popularPlansHeader: {
    marginTop: theme.spacing.m, // 16dp below first scroller
  },
});
