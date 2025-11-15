// ==========================================================================
// USE WEEK CALENDAR HOOK
//
// Custom hook for calculating current week (Sunday to Saturday) with dates.
// Returns array of day data for calendar display.
//
// Dependencies: None (pure date calculation)
// Used by: HomePage, WeekCalendar component
// ==========================================================================

import {useMemo} from 'react';

// === TYPES ===

export type DayData = {
  dayLetter: string;
  date: string;
  fullDate: Date;
};

// === HOOK ===

export const useWeekCalendar = () => {
  const weekDays = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 6 = Saturday
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - currentDay);

    const week: DayData[] = [];
    const dayLetters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    for (let i = 0; i < 7; i++) {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dateString = `${month}/${day}`;

      week.push({
        dayLetter: dayLetters[i],
        date: dateString,
        fullDate: date,
      });
    }

    return week;
  }, []); // Recalculate only when component mounts

  const todayString = useMemo(() => {
    const today = new Date();
    return `${today.getMonth() + 1}/${today.getDate()}`;
  }, []);

  return {
    weekDays,
    todayString,
  };
};
