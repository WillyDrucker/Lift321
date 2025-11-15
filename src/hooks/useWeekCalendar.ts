// ==========================================================================
// USE WEEK CALENDAR HOOK
//
// Custom hook for calculating current week (Sunday to Saturday) with dates.
// Returns array of day data for calendar display.
//
// Dependencies: dateUtils
// Used by: HomePage, WeekCalendar component
// ==========================================================================

import {useMemo} from 'react';
import {getWeekDates, getDayLetter, formatDateShort} from '@/utils';

// === TYPES ===

export type DayData = {
  dayLetter: string;
  date: string;
  fullDate: Date;
};

// === HOOK ===

export const useWeekCalendar = () => {
  const weekDays = useMemo(() => {
    const weekDates = getWeekDates();

    return weekDates.map(date => ({
      dayLetter: getDayLetter(date),
      date: formatDateShort(date),
      fullDate: date,
    }));
  }, []); // Recalculate only when component mounts

  const todayString = useMemo(() => {
    return formatDateShort(new Date());
  }, []);

  return {
    weekDays,
    todayString,
  };
};
