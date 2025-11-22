// ==========================================================================
// WEEK CALENDAR COMPONENT
//
// Week view calendar bar (Sunday to Saturday) with day selection.
// Highlights current day and selected day.
//
// Dependencies: theme tokens, useWeekCalendar hook
// Used by: HomePage
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {theme} from '@/theme';
import {useWeekCalendar} from '@/hooks';

// === TYPES ===

export type WeekCalendarProps = {
  selectedDay: string;
  onDayPress: (date: string) => void;
};

// === COMPONENT ===

export const WeekCalendar: React.FC<WeekCalendarProps> = React.memo(
  ({selectedDay, onDayPress}) => {
    const {weekDays, todayString} = useWeekCalendar();

    return (
      <View style={styles.container}>
        {weekDays.map((day, index) => {
          const isToday = day.date === todayString;
          return (
            <Pressable
              key={index}
              style={styles.daySection}
              onPress={() => onDayPress(day.date)}>
              <Text
                style={[styles.dayLetter, isToday && styles.dayLetterActive]}>
                {day.dayLetter}
              </Text>
              <Text style={[styles.dayDate, isToday && styles.dayDateActive]}>
                {day.date}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );
  },
);

WeekCalendar.displayName = 'WeekCalendar';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: theme.layout.weekCalendar.topPosition,
    left: 0,
    right: 0,
    height: theme.layout.weekCalendar.height,
    backgroundColor: theme.colors.pureBlack, // Pure black background (global standard)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  daySection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },

  dayLetter: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.navInactive,
    includeFontPadding: false,
    marginTop: theme.layout.dayCalendar.dayLetterMarginTop,
  },

  dayLetterActive: {
    color: theme.colors.navActive,
  },

  dayDate: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.navInactive,
    marginTop: theme.layout.dayCalendar.dayDateMarginTop,
    includeFontPadding: false,
  },

  dayDateActive: {
    color: theme.colors.navActive,
  },
});
