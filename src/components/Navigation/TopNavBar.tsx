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
import {HamburgerRegularThin, ChevronRegular, PlateIconQuadGrip} from '@/components/icons';

// === TYPES ===

export type TopNavBarProps = {
  onMenuPress: () => void;
  onBackPress?: () => void; // Optional back button
  onGearPress?: () => void; // Optional gear icon on right side
  centerContent?: React.ReactNode; // Optional center content (e.g., title text)
  leftContent?: React.ReactNode; // Optional custom left content (replaces back button)
};

// === COMPONENT ===

export const TopNavBar: React.FC<TopNavBarProps> = React.memo(
  ({onMenuPress, onBackPress, onGearPress, centerContent, leftContent}) => {
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

            {/* Custom left content or Back Button */}
            {leftContent ? (
              <View style={styles.backButton}>{leftContent}</View>
            ) : onBackPress ? (
              <Pressable
                onPress={onBackPress}
                style={({pressed}) => [
                  styles.backButton,
                  pressed && styles.pressed,
                ]}>
                <ChevronRegular
                  size={theme.layout.topNav.backIconSize}
                  color={theme.colors.textPrimary}
                />
              </Pressable>
            ) : null}
          </View>

          {/* Center content (optional) */}
          {centerContent && (
            <View style={styles.centerContainer}>
              {centerContent}
            </View>
          )}

          {/* Right side - Gear Icon (optional) */}
          {onGearPress && (
            <Pressable
              onPress={onGearPress}
              style={({pressed}) => [
                styles.gearButton,
                pressed && styles.pressed,
              ]}>
              <PlateIconQuadGrip
                size={theme.layout.topNav.menuIconSize - 2}
                color={theme.colors.textSecondary}
              />
            </Pressable>
          )}
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
    gap: 20, // Gap between hamburger and back chevron
  },

  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none', // Allow taps to pass through to buttons
  },

  menuButton: {
    padding: 0,
  },

  backButton: {
    padding: 0,
    marginTop: 2, // 2dp from top of navigation bar
  },

  gearButton: {
    padding: 0,
    marginTop: 4, // Align with plan image
  },

  pressed: {
    opacity: theme.layout.interaction.pressedOpacity,
    transform: [{scale: theme.layout.interaction.pressedScale}],
  },
});
