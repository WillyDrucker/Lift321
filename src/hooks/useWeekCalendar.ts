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
  // Track actual date to refresh when day changes (midnight rollover or app resume)
  const [currentDateString, setCurrentDateString] = useState(() => formatDateShort(new Date()));

  // Poll for override changes and actual date changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Check for override changes
      const currentOverride = getOverrideDayCache();
      if (currentOverride !== overrideDay) {
        setOverrideDay(currentOverride);
      }

      // Check for actual date changes (midnight rollover or device date change)
      const actualDateString = formatDateShort(new Date());
      if (actualDateString !== currentDateString) {
        setCurrentDateString(actualDateString);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [overrideDay, currentDateString]);

  const weekDays = useMemo(() => {
    const weekDates = getWeekDates(); // Now uses getCurrentDate() internally

    return weekDates.map(date => ({
      dayLetter: getDayLetter(date),
      date: formatDateShort(date),
      fullDate: date,
    }));
  }, [overrideDay, currentDateString]); // Recalculate when override or actual date changes

  const todayString = useMemo(() => {
    return formatDateShort(getCurrentDate()); // Use override-aware date
  }, [overrideDay, currentDateString]); // Recalculate when override or actual date changes

  return {
    weekDays,
    todayString,
  };
};
