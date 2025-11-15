// ==========================================================================
// LOADING STATE
//
// Reusable loading state component with spinner and optional message.
// Provides consistent loading UX across the app.
//
// Dependencies: React Native
// Used by: Screens and components with async operations
// ==========================================================================

import React from 'react';
import {View, ActivityIndicator, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type LoadingStateProps = {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
};

// === COMPONENT ===

/**
 * Loading state component
 * Displays activity indicator with optional message
 *
 * @example
 * <LoadingState message="Loading workouts..." />
 * <LoadingState fullScreen />
 */
export const LoadingState: React.FC<LoadingStateProps> = React.memo(
  ({
    message,
    size = 'large',
    color = theme.colors.actionSuccess,
    fullScreen = false,
  }) => {
    return (
      <View style={[styles.container, fullScreen && styles.fullScreen]}>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    );
  },
);

LoadingState.displayName = 'LoadingState';

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },

  fullScreen: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  message: {
    marginTop: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
