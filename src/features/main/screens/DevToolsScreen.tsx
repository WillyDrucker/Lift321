// ==========================================================================
// DEVELOPER TOOLS SCREEN
//
// Developer utilities for testing and debugging.
// Provides day of week override for testing date-dependent workflows.
//
// Dependencies: theme tokens, devToolsService, dateUtils
// Used by: Sidebar menu (version number tap)
// ==========================================================================

import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, StyleSheet, Text, View, Pressable} from 'react-native';
import {theme} from '@/theme';
import type {MainStackScreenProps} from '@/navigation/types';
import {DefaultScreenLayout} from '@/components';
import {setOverrideDay, clearOverrideDay, getOverrideDay} from '@/services/devToolsService';
import type {DayOfWeek} from '@/utils/dateUtils';

// === TYPES ===

type DevToolsScreenProps = MainStackScreenProps<'DevToolsScreen'>;

type DayOption = {
  value: DayOfWeek;
  label: string;
  shortLabel: string;
};

// === CONSTANTS ===

const DAY_OPTIONS: DayOption[] = [
  {value: 0, label: 'Sunday', shortLabel: 'SUN'},
  {value: 1, label: 'Monday', shortLabel: 'MON'},
  {value: 2, label: 'Tuesday', shortLabel: 'TUE'},
  {value: 3, label: 'Wednesday', shortLabel: 'WED'},
  {value: 4, label: 'Thursday', shortLabel: 'THU'},
  {value: 5, label: 'Friday', shortLabel: 'FRI'},
  {value: 6, label: 'Saturday', shortLabel: 'SAT'},
];

// === COMPONENT ===

export const DevToolsScreen: React.FC<DevToolsScreenProps> = ({navigation}) => {
  // === STATE ===
  const [selectedDay, setSelectedDay] = useState<DayOfWeek | null>(null);
  const [actualDay] = useState<DayOfWeek>(new Date().getDay() as DayOfWeek);

  // === EFFECTS ===

  // Load current override on mount
  useEffect(() => {
    const loadOverride = async () => {
      const override = await getOverrideDay();
      setSelectedDay(override);
    };
    loadOverride();
  }, []);

  // === EVENT HANDLERS ===

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleDaySelect = useCallback(async (day: DayOfWeek) => {
    await setOverrideDay(day);
    setSelectedDay(day);
  }, []);

  const handleClearOverride = useCallback(async () => {
    await clearOverrideDay();
    setSelectedDay(null);
  }, []);

  // === RENDER ===

  return (
    <DefaultScreenLayout title="Developer Tools" onBack={handleBack}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Day Override Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DAY OF WEEK OVERRIDE</Text>
          <Text style={styles.sectionDescription}>
            Override the current day for testing date-dependent features.
          </Text>

          {/* Current Status */}
          <View style={styles.statusContainer}>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Actual Day:</Text>
              <Text style={styles.statusValue}>
                {DAY_OPTIONS[actualDay].label}
              </Text>
            </View>
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Override Day:</Text>
              <Text style={[styles.statusValue, selectedDay !== null && styles.statusValueActive]}>
                {selectedDay !== null ? DAY_OPTIONS[selectedDay].label : 'None'}
              </Text>
            </View>
          </View>

          {/* Day Selector Grid */}
          <View style={styles.dayGrid}>
            {DAY_OPTIONS.map((day) => (
              <Pressable
                key={day.value}
                style={({pressed}) => [
                  styles.dayButton,
                  selectedDay === day.value && styles.dayButtonSelected,
                  pressed && styles.dayButtonPressed,
                ]}
                onPress={() => handleDaySelect(day.value)}>
                <Text
                  style={[
                    styles.dayButtonText,
                    selectedDay === day.value && styles.dayButtonTextSelected,
                  ]}>
                  {day.shortLabel}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Clear Override Button */}
          {selectedDay !== null && (
            <Pressable
              style={({pressed}) => [
                styles.clearButton,
                pressed && styles.clearButtonPressed,
              ]}
              onPress={handleClearOverride}>
              <Text style={styles.clearButtonText}>CLEAR OVERRIDE</Text>
            </Pressable>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Tip: The day override persists across app restarts and affects all date-dependent features.
          </Text>
        </View>
      </ScrollView>
    </DefaultScreenLayout>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: theme.spacing.m,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.xl,
  },

  section: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },

  sectionTitle: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },

  sectionDescription: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.m,
  },

  statusContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.spacing.xs,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },

  statusLabel: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
  },

  statusValue: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },

  statusValueActive: {
    color: theme.colors.actionSuccess,
  },

  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.s,
    marginBottom: theme.spacing.m,
  },

  dayButton: {
    flex: 1,
    minWidth: '30%',
    height: 50,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.spacing.s,
    borderWidth: theme.layout.border.medium,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dayButtonSelected: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderColor: theme.colors.actionSuccess,
  },

  dayButtonPressed: {
    opacity: 0.7,
  },

  dayButtonText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
  },

  dayButtonTextSelected: {
    color: theme.colors.actionSuccess,
  },

  clearButton: {
    height: 50,
    backgroundColor: theme.colors.backgroundTertiary,
    borderRadius: theme.spacing.s,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clearButtonPressed: {
    opacity: 0.7,
  },

  clearButtonText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },

  infoSection: {
    padding: theme.spacing.m,
  },

  infoText: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textTertiary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
