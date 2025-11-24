// ==========================================================================
// DEVELOPER TOOLS SERVICE
//
// Provides developer utilities for testing and debugging.
// Currently supports overriding the current day of week for testing workflows.
//
// Dependencies: AsyncStorage, dateUtils
// Used by: DevTools screen, date-dependent features
// ==========================================================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import type {DayOfWeek} from '@/utils/dateUtils';
import {setOverrideDayCache} from '@/utils/dateUtils';

// === CONSTANTS ===

const STORAGE_KEY_OVERRIDE_DAY = '@devtools/override_day';

// === DAY OVERRIDE FUNCTIONS ===

/**
 * Set an override for the current day of week
 * Used for testing workflows that depend on specific days
 * Updates both AsyncStorage (persistence) and in-memory cache (immediate effect)
 */
export const setOverrideDay = async (dayOfWeek: DayOfWeek): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_OVERRIDE_DAY, dayOfWeek.toString());
    // Update in-memory cache for immediate effect
    setOverrideDayCache(dayOfWeek);
  } catch (error) {
    console.error('Failed to set override day:', error);
  }
};

/**
 * Clear the day of week override
 * Returns app to using actual current day
 * Updates both AsyncStorage (persistence) and in-memory cache (immediate effect)
 */
export const clearOverrideDay = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY_OVERRIDE_DAY);
    // Clear in-memory cache for immediate effect
    setOverrideDayCache(null);
  } catch (error) {
    console.error('Failed to clear override day:', error);
  }
};

/**
 * Get the current override day if one is set
 * Returns null if no override is active
 */
export const getOverrideDay = async (): Promise<DayOfWeek | null> => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY_OVERRIDE_DAY);
    if (value === null) return null;

    const dayOfWeek = parseInt(value, 10) as DayOfWeek;

    // Validate it's a valid day (0-6)
    if (dayOfWeek >= 0 && dayOfWeek <= 6) {
      return dayOfWeek;
    }

    return null;
  } catch (error) {
    console.error('Failed to get override day:', error);
    return null;
  }
};

/**
 * Get the current day of week, accounting for any override
 * Returns override day if set, otherwise returns actual current day
 */
export const getCurrentDay = async (): Promise<DayOfWeek> => {
  const override = await getOverrideDay();
  if (override !== null) {
    return override;
  }

  // Return actual current day
  return new Date().getDay() as DayOfWeek;
};

/**
 * Initialize the override system
 * Loads any persisted override from AsyncStorage into in-memory cache
 * Should be called once on app startup
 */
export const initializeOverride = async (): Promise<void> => {
  try {
    const override = await getOverrideDay();
    setOverrideDayCache(override);
  } catch (error) {
    console.error('Failed to initialize override:', error);
  }
};
