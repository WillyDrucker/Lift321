// ==========================================================================
// DATE UTILITIES
//
// Date formatting, manipulation, and calculation helpers.
// Used throughout the app for consistent date handling.
//
// Dependencies: None (pure date logic)
// Used by: Components, hooks, screens requiring date operations
// ==========================================================================

// === TYPES ===

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 6 = Saturday

export type DateInfo = {
  date: Date;
  dayOfWeek: DayOfWeek;
  dayName: string;
  monthName: string;
  year: number;
  month: number;
  day: number;
};

// === CONSTANTS ===

const DAY_NAMES_FULL = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const MONTH_NAMES_FULL = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// === DATE FORMATTING ===

/**
 * Formats date as M/D (e.g., "12/25")
 */
export const formatDateShort = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

/**
 * Formats date as MM/DD/YYYY (e.g., "12/25/2024")
 */
export const formatDateFull = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

/**
 * Formats date as "Month Day, Year" (e.g., "December 25, 2024")
 */
export const formatDateLong = (date: Date): string => {
  const monthName = MONTH_NAMES_FULL[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${monthName} ${day}, ${year}`;
};

/**
 * Gets day letter (S, M, T, W, T, F, S)
 */
export const getDayLetter = (date: Date): string => {
  return DAY_LETTERS[date.getDay()];
};

/**
 * Gets short day name (Sun, Mon, etc.)
 */
export const getDayNameShort = (date: Date): string => {
  return DAY_NAMES_SHORT[date.getDay()];
};

/**
 * Gets full day name (Sunday, Monday, etc.)
 */
export const getDayNameFull = (date: Date): string => {
  return DAY_NAMES_FULL[date.getDay()];
};

/**
 * Gets short month name (Jan, Feb, etc.)
 */
export const getMonthNameShort = (date: Date): string => {
  return MONTH_NAMES_SHORT[date.getMonth()];
};

/**
 * Gets full month name (January, February, etc.)
 */
export const getMonthNameFull = (date: Date): string => {
  return MONTH_NAMES_FULL[date.getMonth()];
};

// === DATE CALCULATIONS ===

/**
 * Gets the start of the current week (Sunday)
 */
export const getWeekStart = (date: Date = new Date()): Date => {
  const currentDay = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - currentDay);
  sunday.setHours(0, 0, 0, 0);
  return sunday;
};

/**
 * Gets the end of the current week (Saturday)
 */
export const getWeekEnd = (date: Date = new Date()): Date => {
  const currentDay = date.getDay();
  const saturday = new Date(date);
  saturday.setDate(date.getDate() + (6 - currentDay));
  saturday.setHours(23, 59, 59, 999);
  return saturday;
};

/**
 * Gets an array of dates for the current week (Sunday to Saturday)
 */
export const getWeekDates = (date: Date = new Date()): Date[] => {
  const sunday = getWeekStart(date);
  const weekDates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(sunday);
    day.setDate(sunday.getDate() + i);
    weekDates.push(day);
  }

  return weekDates;
};

/**
 * Checks if two dates are the same day (ignores time)
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

/**
 * Checks if date is today
 */
export const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

/**
 * Adds days to a date (negative values subtract days)
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Adds months to a date (negative values subtract months)
 */
export const addMonths = (date: Date, months: number): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Gets number of days between two dates
 */
export const getDaysBetween = (date1: Date, date2: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / msPerDay);
};

/**
 * Gets comprehensive date information
 */
export const getDateInfo = (date: Date = new Date()): DateInfo => {
  return {
    date,
    dayOfWeek: date.getDay() as DayOfWeek,
    dayName: DAY_NAMES_FULL[date.getDay()],
    monthName: MONTH_NAMES_FULL[date.getMonth()],
    year: date.getFullYear(),
    month: date.getMonth() + 1, // 1-based month
    day: date.getDate(),
  };
};
