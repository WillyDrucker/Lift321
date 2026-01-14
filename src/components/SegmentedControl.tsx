// ==========================================================================
// SEGMENTED CONTROL COMPONENT
//
// iOS-style segmented control for switching between options.
// Two equal-width touchable segments with active/inactive states.
//
// Dependencies: theme tokens
// Used by: ToggleableDialControlCard, other components needing mode selection
// ==========================================================================

import React, {memo} from 'react';
import type {ReactNode} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {theme} from '@/theme';

// ============================================================================
// TYPES
// ============================================================================

type SegmentedControlProps = {
  options: (string | ReactNode)[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

const SegmentedControlComponent: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = index === selectedIndex;
        const isString = typeof option === 'string';

        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.segment,
              isSelected && styles.segmentActive,
              index === 0 && styles.segmentFirst,
              index === options.length - 1 && styles.segmentLast,
            ]}
            onPress={() => onSelect(index)}
            activeOpacity={1}
          >
            {isString ? (
              <Text
                style={[
                  styles.segmentText,
                  isSelected && styles.segmentTextActive,
                ]}
              >
                {option}
              </Text>
            ) : (
              option
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    marginBottom: theme.spacing.s,
  },
  segment: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  segmentFirst: {
    borderTopLeftRadius: theme.spacing.s,
    borderBottomLeftRadius: theme.spacing.s,
  },
  segmentLast: {
    borderTopRightRadius: theme.spacing.s,
    borderBottomRightRadius: theme.spacing.s,
  },
  segmentActive: {
    backgroundColor: theme.colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: theme.colors.actionSuccess,
  },
  segmentText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  segmentTextActive: {
    color: theme.colors.textPrimary,
  },
});

// Memoize to prevent re-renders when props haven't changed
export const SegmentedControl = memo(SegmentedControlComponent);
