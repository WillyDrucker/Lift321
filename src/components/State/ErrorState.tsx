// ==========================================================================
// ERROR STATE
//
// Reusable error state component with message and retry button.
// Provides consistent error UX across the app.
//
// Dependencies: React Native
// Used by: Screens and components with async operations
// ==========================================================================

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  fullScreen?: boolean;
};

// === COMPONENT ===

/**
 * Error state component
 * Displays error message with optional retry button
 *
 * @example
 * <ErrorState message="Failed to load workouts" onRetry={refetch} />
 * <ErrorState fullScreen />
 */
export const ErrorState: React.FC<ErrorStateProps> = React.memo(
  ({
    message = 'Something went wrong',
    onRetry,
    retryText = 'Try Again',
    fullScreen = false,
  }) => {
    return (
      <View style={[styles.container, fullScreen && styles.fullScreen]}>
        <View style={styles.content}>
          <Text style={styles.title}>Error</Text>
          <Text style={styles.message}>{message}</Text>
          {onRetry && (
            <Pressable
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={onRetry}
            >
              <Text style={styles.buttonText}>{retryText}</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

ErrorState.displayName = 'ErrorState';

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

  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },

  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionDanger,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },

  message: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.relaxed,
  },

  button: {
    backgroundColor: theme.colors.actionSuccess,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.spacing.sm,
  },

  buttonPressed: {
    opacity: theme.buttons.opacity.pressed,
  },

  buttonText: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    letterSpacing: theme.typography.letterSpacing.button,
  },
});
