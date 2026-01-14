// ==========================================================================
// TOOLS SCREEN
//
// Tools and utilities screen for users.
// Provides workout calculators, timers, and other fitness tools.
//
// Dependencies: theme tokens, navigation types
// Used by: Sidebar menu navigation
// ==========================================================================

import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {theme} from '@/theme';
import type {MainStackScreenProps} from '@/navigation/types';
import {DefaultScreenLayout} from '@/components';

// === TYPES ===

type ToolsScreenProps = MainStackScreenProps<'ToolsScreen'>;

// === COMPONENT ===

export const ToolsScreen: React.FC<ToolsScreenProps> = ({navigation}) => {
  // === EVENT HANDLERS ===

  const handleBack = () => {
    navigation.goBack();
  };

  // === RENDER ===

  return (
    <DefaultScreenLayout title="Tools" onBack={handleBack}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Placeholder Content */}
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Tools</Text>
          <Text style={styles.placeholderSubtext}>Coming soon...</Text>
        </View>
      </ScrollView>
    </DefaultScreenLayout>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xl,
  },

  placeholderText: {
    ...theme.textStyles.heading2,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.s,
  },

  placeholderSubtext: {
    ...theme.textStyles.body,
    color: theme.colors.textSecondary,
  },
});
