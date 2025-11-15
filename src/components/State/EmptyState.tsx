// ==========================================================================
// EMPTY STATE
//
// Reusable empty state component for when no data is available.
// Provides consistent empty UX across the app.
//
// Dependencies: React Native
// Used by: List screens, data displays
// ==========================================================================

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type EmptyStateProps = {
  title?: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  fullScreen?: boolean;
};

// === COMPONENT ===

/**
 * Empty state component
 * Displays when no data is available with optional CTA
 *
 * @example
 * <EmptyState
 *   title="No Workouts"
 *   message="You haven't created any workouts yet"
 *   actionText="Create Workout"
 *   onAction={navigateToCreate}
 * />
 */
export const EmptyState: React.FC<EmptyStateProps> = React.memo(
  ({title, message, actionText, onAction, fullScreen = false}) => {
    return (
      <View style={[styles.container, fullScreen && styles.fullScreen]}>
        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          <Text style={styles.message}>{message}</Text>
          {actionText && onAction && (
            <Pressable
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={onAction}
            >
              <Text style={styles.buttonText}>{actionText}</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

EmptyState.displayName = 'EmptyState';

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
    color: theme.colors.textPrimary,
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
