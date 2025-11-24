// ==========================================================================
// USE WEEK CALENDAR HOOK
//
// Custom hook for calculating current week (Sunday to Saturday) with dates.
// Returns array of day data for calendar display.
//
// Dependencies: dateUtils
// Used by: HomePage, WeekCalendar component
// ==========================================================================

import {useMemo, useState, useEffect} from 'react';
import {getWeekDates, getDayLetter, formatDateShort, getCurrentDate, getOverrideDayCache} from '@/utils';

// === TYPES ===

export type DayData = {
  dayLetter: string;
  date: string;
  fullDate: Date;
};

// === HOOK ===

export const useWeekCalendar = () => {
  // Track override changes to trigger recalculation
  const [overrideDay, setOverrideDay] = useState(getOverrideDayCache());

  // Poll for override changes (simple approach for immediate updates)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentOverride = getOverrideDayCache();
      if (currentOverride !== overrideDay) {
        setOverrideDay(currentOverride);
      }
    }, 100); // Check every 100ms

    return () => clearInterval(interval);
  }, [overrideDay]);

  const weekDays = useMemo(() => {
    const weekDates = getWeekDates(); // Now uses getCurrentDate() internally

    return weekDates.map(date => ({
      dayLetter: getDayLetter(date),
      date: formatDateShort(date),
      fullDate: date,
    }));
  }, [overrideDay]); // Recalculate when override changes

  const todayString = useMemo(() => {
    return formatDateShort(getCurrentDate()); // Use override-aware date
  }, [overrideDay]); // Recalculate when override changes

  return {
    weekDays,
    todayString,
  };
};
