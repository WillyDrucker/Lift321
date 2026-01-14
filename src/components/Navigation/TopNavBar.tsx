// ==========================================================================
// TOP NAVIGATION BAR COMPONENT
//
// Top navigation bar with guide/help and hamburger menu icons.
// Fixed position navigation for all main screens.
//
// Dependencies: theme tokens, icons
// Used by: HomePage, PlansPage, WorkoutOverviewScreen
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import {HamburgerRegularThin, LeftChevron} from '@/components/icons';

// === TYPES ===

export type TopNavBarProps = {
  onMenuPress: () => void;
  onBackPress?: () => void; // Optional back button
};

// === COMPONENT ===

export const TopNavBar: React.FC<TopNavBarProps> = React.memo(
  ({onMenuPress, onBackPress}) => {
    const insets = useSafeAreaInsets();

    return (
      <>
        {/* Status bar background extension - dynamic height based on device */}
        <View style={[styles.statusBarBackground, {height: insets.top}]} />

        <View style={[styles.container, {top: insets.top}]}>
          {/* Left side buttons */}
          <View style={styles.leftButtonsContainer}>
            {/* Hamburger Menu - Left aligned */}
            <Pressable
              onPress={onMenuPress}
              style={({pressed}) => [
                styles.menuButton,
                pressed && styles.pressed,
              ]}>
              <HamburgerRegularThin
                size={theme.layout.topNav.menuIconSize}
                color={theme.colors.textPrimary}
              />
            </Pressable>

            {/* Back Button - Optional, 16dp from hamburger */}
            {onBackPress && (
              <Pressable
                onPress={onBackPress}
                style={({pressed}) => [
                  styles.backButton,
                  pressed && styles.pressed,
                ]}>
                <LeftChevron
                  size={theme.layout.topNav.backIconSize}
                  color={theme.colors.textPrimary}
                />
              </Pressable>
            )}
          </View>
        </View>
      </>
    );
  },
);

TopNavBar.displayName = 'TopNavBar';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height is set dynamically via insets.top
    backgroundColor: theme.colors.pureBlack,
  },

  container: {
    position: 'absolute',
    // top is set dynamically via insets.top
    left: 0,
    right: 0,
    height: theme.layout.topNav.height,
    backgroundColor: theme.colors.pureBlack,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal,
    paddingTop: 1, // 1dp + 3dp SVG dead space = 4dp visual for hamburger
  },

  leftButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.m, // Standard gap between navigation icons
  },

  menuButton: {
    padding: 0,
  },

  backButton: {
    padding: 0,
  },

  pressed: {
    opacity: theme.layout.interaction.pressedOpacity,
    transform: [{scale: theme.layout.interaction.pressedScale}],
  },
});
