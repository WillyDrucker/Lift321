// ==========================================================================
// WORKOUT TIMER COMPONENT
//
// A simple timer component for tracking rest periods or workout duration.
// Defaults to 5 minutes (countdown) or stopwatch mode.
// Tap to Start/Stop, Long Press to Reset.
// Can be controlled via ref for auto-start.
//
// Dependencies: theme tokens
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

type WorkoutTimerProps = {
  initialMinutes?: number; // Default to 5 if not provided
};

export type WorkoutTimerHandle = {
    start: () => void;
    stop: () => void;
    reset: () => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const WorkoutTimer = forwardRef<WorkoutTimerHandle, WorkoutTimerProps>(({ initialMinutes = 5 }, ref) => {
  const initialSeconds = initialMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
      start: () => setIsRunning(true),
      stop: () => setIsRunning(false),
      reset: () => {
          setIsRunning(false);
          setSecondsLeft(initialSeconds);
      }
  }));

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
            if (prev <= 1) {
                setIsRunning(false);
                return 0;
            }
            return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, secondsLeft]);

  const toggleTimer = () => {
    if (secondsLeft === 0) {
        // If timer finished, reset on tap
        setSecondsLeft(initialSeconds);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>REST TIMER</Text>
        </View>

        <TouchableOpacity 
            style={[
                styles.timerButton, 
                isRunning && styles.timerRunning,
                secondsLeft === 0 && styles.timerFinished
            ]}
            onPress={toggleTimer}
            onLongPress={resetTimer}
            delayLongPress={500}
            activeOpacity={0.7}
        >
            <Text style={[
                styles.timerValue, 
                isRunning && styles.timerValueRunning,
                secondsLeft === 0 && styles.timerValueFinished
            ]}>
                {formatTime(secondsLeft)}
            </Text>
            <Text style={styles.timerLabel}>
                {isRunning ? 'STOP' : (secondsLeft === 0 ? 'RESET' : 'START')}
            </Text>
        </TouchableOpacity>
        <Text style={styles.hintText}>5:00 DEFAULT • HOLD TO RESET</Text>
    </View>
  );
});

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.s,
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  header: {
    marginBottom: theme.spacing.s,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
  },
  timerButton: {
    width: 100, // Slightly smaller than before to fit card style
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.textSecondary,
    marginBottom: 8,
  },
  timerRunning: {
    borderColor: theme.colors.actionSuccess,
    backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  timerFinished: {
      borderColor: theme.colors.actionWarning,
      backgroundColor: 'rgba(255, 170, 0, 0.1)',
  },
  timerLabel: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    marginTop: 4,
  },
  timerValue: {
    fontSize: 28,
    color: theme.colors.pureWhite,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
  },
  timerValueRunning: {
    color: theme.colors.actionSuccess,
  },
  timerValueFinished: {
      color: theme.colors.actionWarning,
  },
  hintText: {
    fontSize: 10,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.primary,
  },
});
