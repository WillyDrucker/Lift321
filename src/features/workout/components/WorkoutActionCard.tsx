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
  withRepeat,
  withDelay,
  interpolateColor,
} from 'react-native-reanimated';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

type WorkoutActionCardProps = {
  isResting: boolean;
  isComplete?: boolean;
  restDuration?: number;
  onLogSet: () => void;
  onEndRest: () => void;
  onFinish?: () => void;
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
  const hasLoggedFirstSet = useRef(false);

  // Animated progress value (0 to 1)
  const progress = useSharedValue(0);

  // Animated pulse value for subtitle (0 = black, 1 = blue)
  const subtitlePulse = useSharedValue(0);

  // Animated style for fill bar
  const fillAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  // Animated style for pulsing subtitle (black to green pulse on first set)
  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      subtitlePulse.value,
      [0, 1],
      [theme.colors.pureBlack, theme.colors.actionSuccess]
    ),
  }));

  // Track when first set is logged (entering rest mode means a set was logged)
  useEffect(() => {
    if (isResting) {
      hasLoggedFirstSet.current = true;
    }
  }, [isResting]);

  // Pulsing animation disabled for performance testing
  // TODO: Re-enable once performance issue is resolved
  // useEffect(() => {
  //   if (!isResting && !isComplete && !hasLoggedFirstSet.current) {
  //     subtitlePulse.value = 0;
  //     subtitlePulse.value = withDelay(
  //       theme.layout.actionCard.pulseDelay,
  //       withRepeat(
  //         withTiming(1, {duration: theme.layout.actionCard.pulseDuration}),
  //         -1,
  //         true
  //       )
  //     );
  //   } else {
  //     subtitlePulse.value = withTiming(0, {duration: theme.layout.animation.duration});
  //   }
  // }, [isResting, isComplete]);

  // Store onEndRest in a ref to avoid stale closures
  const onEndRestRef = useRef(onEndRest);
  onEndRestRef.current = onEndRest;

  // Reset timer when entering rest mode
  useEffect(() => {
    if (isResting && !isComplete) {
      setSecondsLeft(initialSeconds);
      progress.value = 0;

      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            progress.value = withTiming(1, {duration: theme.layout.actionCard.timerAnimationDuration});
            // Defer callback to next tick to avoid setState-during-render
            setTimeout(() => onEndRestRef.current(), 0);
            return 0;
          }

          const newSeconds = prev - 1;
          const elapsed = initialSeconds - newSeconds;
          progress.value = withTiming(elapsed / initialSeconds, {duration: theme.layout.actionCard.timerAnimationDuration});

          return newSeconds;
        });
      }, theme.layout.actionCard.timerAnimationDuration);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      progress.value = 0;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isResting, isComplete, initialSeconds]);

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
          <Animated.Text style={[styles.logButtonSubtitle, subtitleAnimatedStyle]}>
            TAP AFTER COMPLETING SET
          </Animated.Text>
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
  // === LOG SET STATE ===
  logButton: {
    backgroundColor: theme.colors.actionSuccess,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.layout.controlCard.height,
    shadowColor: theme.colors.shadowBlack,
    shadowOffset: {width: 0, height: theme.layout.border.medium},
    shadowOpacity: 0.3,
    shadowRadius: theme.spacing.xs,
    elevation: theme.spacing.xs,
  },
  logButtonTitle: {
    fontSize: theme.layout.actionCard.titleFontSize,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.pureBlack,
    textTransform: 'uppercase',
    marginBottom: theme.layout.actionCard.titleMarginBottom,
  },
  logButtonSubtitle: {
    fontSize: theme.layout.actionCard.subtitleFontSize,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.pureBlack,
  },

  // === REST STATE ===
  restButton: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.layout.controlCard.height,
    borderWidth: theme.layout.border.medium,
    borderColor: theme.colors.actionWarning,
    overflow: 'hidden',
    position: 'relative',
  },
  fillBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.actionWarning,
    opacity: theme.layout.actionCard.fillBarOpacity,
    borderRadius: theme.spacing.s - theme.layout.border.medium,
  },
  restContent: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  restLabel: {
    fontSize: theme.layout.actionCard.restLabelFontSize,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    marginBottom: theme.layout.actionCard.titleMarginBottom,
  },
  restValue: {
    fontSize: theme.layout.actionCard.restValueFontSize,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    marginBottom: theme.layout.actionCard.restValueMarginBottom,
  },
  restHint: {
    fontSize: theme.layout.actionCard.restHintFontSize,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    opacity: theme.layout.interaction.pressedOpacity,
  },
});
