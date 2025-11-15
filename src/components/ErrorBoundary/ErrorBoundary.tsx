// ==========================================================================
// ERROR BOUNDARY
//
// React error boundary to catch and handle component errors.
// Prevents app crashes and displays fallback UI.
//
// Dependencies: React
// Used by: App.tsx to wrap entire app
// ==========================================================================

import React, {Component, ReactNode} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (error: Error, resetError: () => void) => ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

// === COMPONENT ===

/**
 * Error boundary component
 * Catches JavaScript errors in child component tree
 * Displays fallback UI instead of crashing the app
 *
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // === LIFECYCLE ===

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  // === HANDLERS ===

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  // === RENDER ===

  render() {
    const {hasError, error} = this.state;
    const {children, fallback} = this.props;

    if (hasError && error) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback(error, this.resetError);
      }

      // Default fallback UI
      return (
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Something went wrong</Text>
            <Text style={styles.message}>
              The app encountered an unexpected error.
            </Text>
            {__DEV__ && (
              <View style={styles.errorDetails}>
                <Text style={styles.errorTitle}>Error Details:</Text>
                <Text style={styles.errorText}>{error.message}</Text>
              </View>
            )}
            <Pressable
              style={({pressed}) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={this.resetError}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        </View>
      );
    }

    return children;
  }
}

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: theme.spacing.xl,
  },

  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },

  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },

  message: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.relaxed,
  },

  errorDetails: {
    width: '100%',
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing.md,
    borderRadius: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },

  errorTitle: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionDanger,
    marginBottom: theme.spacing.xs,
  },

  errorText: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.regular,
    color: theme.colors.textSecondary,
    fontFamily: 'monospace',
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
