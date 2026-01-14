// ==========================================================================
// PLANS PAGE
//
// Main plans selection screen displaying available workout plans.
// Layout mirrors HomePage with plan cards instead of workout cards.
//
// Dependencies: Navigation, theme tokens, AppLayout, PlanCardsScroller
// Used by: Main navigation
// ==========================================================================

import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {theme} from '@/theme';
import type {TabScreenProps} from '@/navigation/types';
import {AppLayout} from '@/components';
import {PlanCardsScroller} from '@/components/PlanCardsScroller';
import {usePlan} from '@/features/plans/context/PlanContext';

// === TYPES ===

export type PlansPageProps = TabScreenProps<'PlansPage'>;

// === COMPONENT ===

export const PlansPage: React.FC<PlansPageProps> = ({navigation}) => {
  // === STATE ===

  const {popularPlans, userPlans} = usePlan();

  // === EVENT HANDLERS ===

  const handleNavigate = useCallback((screen: string) => {
    navigation.navigate(screen as any);
  }, [navigation]);

  // === RENDER ===

  return (
    <AppLayout onNavigate={handleNavigate}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        directionalLockEnabled={true}
      >
        {/* Section 1: Lift 321 Plans */}
        <Text style={styles.sectionHeaderText}>Lift 321 Plans</Text>
        <PlanCardsScroller />

        {/* Section 2: Popular Plans */}
        <Text style={[styles.sectionHeaderText, styles.additionalSectionHeader]}>
          Popular Plans
        </Text>
        <PlanCardsScroller plans={popularPlans} selectable={true} />

        {/* Section 3: User Plans */}
        <Text style={[styles.sectionHeaderText, styles.additionalSectionHeader]}>
          User Plans
        </Text>
        <PlanCardsScroller plans={userPlans} selectable={true} />
      </ScrollView>
    </AppLayout>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  sectionHeaderText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.pureWhite,
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.xs,
    marginLeft: theme.layout.recommendedWorkout.leftMargin,
  },

  additionalSectionHeader: {
    marginTop: theme.spacing.m,
  },
});
