// ==========================================================================
// WORKOUT ACTION CARD COMPONENT
//
// Primary action area for the active workout.
// Switches between "LOG SET" button (during workout) and "REST TIMER" (during rest).
//
// Dependencies: theme tokens, WorkoutTimer logic
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

type WorkoutActionCardProps = {
  isResting: boolean;
  isComplete?: boolean; // New prop
  restDuration?: number;
  onLogSet: () => void;
  onEndRest: () => void;
  onFinish?: () => void; // New prop
};

// ============================================================================
// COMPONENT
// ============================================================================

export const WorkoutActionCard: React.FC<WorkoutActionCardProps> = ({
  isResting,
  isComplete = false,
  restDuration = 5,
  onLogSet,
  onEndRest,
  onFinish,
}) => {
  // Timer State
  const initialSeconds = restDuration * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Animated progress value (0 to 1)
  const progress = useSharedValue(0);

  // Animated style for fill bar
  const fillAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  // Reset timer when entering rest mode
  useEffect(() => {
    if (isResting && !isComplete) {
      setSecondsLeft(initialSeconds);
      progress.value = 0; // Reset to 0 at start

      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            progress.value = withTiming(1, {duration: 1000}); // Fill to 100%
            onEndRest();
            return 0;
          }

          // Update progress smoothly
          const newSeconds = prev - 1;
          const elapsed = initialSeconds - newSeconds;
          progress.value = withTiming(elapsed / initialSeconds, {duration: 1000});

          return newSeconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      progress.value = 0; // Reset when not resting
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isResting, isComplete, initialSeconds, onEndRest]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // === RENDER: FINISH MODE ===
  if (isComplete) {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.logButton}
          onPress={onFinish}
          activeOpacity={0.8}
        >
          <Text style={styles.logButtonTitle}>FINISH WORKOUT</Text>
          <Text style={styles.logButtonSubtitle}>TAP TO SAVE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // === RENDER: LOG SET MODE ===
  if (!isResting) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logButton}
          onPress={onLogSet}
          activeOpacity={0.8}
        >
          <Text style={styles.logButtonTitle}>LOG SET</Text>
          <Text style={styles.logButtonSubtitle}>TAP AFTER COMPLETING SET</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // === RENDER: REST MODE ===
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.restButton}
        onPress={onEndRest}
        activeOpacity={0.8}
      >
        {/* Animated Fill Bar */}
        <Animated.View style={[styles.fillBar, fillAnimatedStyle]} />

        {/* Text Content (on top of fill) */}
        <View style={styles.restContent}>
          <Text style={styles.restLabel}>RESTING...</Text>
          <Text style={styles.restValue}>{formatTime(secondsLeft)}</Text>
          <Text style={styles.restHint}>TAP TO SKIP</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.s,
  },
  // Log Set State
  logButton: {
    backgroundColor: theme.colors.actionSuccess,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80, // Reduced from 100
    shadowColor: theme.colors.shadowBlack,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  logButtonTitle: {
    fontSize: 20, // Reduced from 24
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.pureBlack, // Contrast on green
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  logButtonSubtitle: {
    fontSize: 12, // Reduced from 14
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.pureBlack,
    opacity: 0.7,
  },

  // Rest State
  restButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    borderWidth: 2,
    borderColor: theme.colors.actionWarning, // Orange/Yellow for rest/wait
    overflow: 'hidden', // Clip fill to button bounds
    position: 'relative', // Enable absolute positioning for fill
  },
  fillBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.actionWarning, // Orange fill
    opacity: 0.2, // Subtle, doesn't obscure text
    borderRadius: theme.spacing.s - 2, // Match button radius minus border
  },
  restContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure text stays on top
  },
  restLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  restValue: {
    fontSize: 36,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  restHint: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    opacity: 0.8,
  },
});
