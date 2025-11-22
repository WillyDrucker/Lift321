// ==========================================================================
// TOP NAVIGATION BAR COMPONENT
//
// Top navigation bar with search and hamburger menu icons.
// Fixed position navigation for HomePage.
//
// Dependencies: theme tokens, icons
// Used by: HomePage
// ==========================================================================

import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {theme} from '@/theme';
import {SearchIcon, HamburgerIcon, LeftChevron} from '@/components/icons';

// === TYPES ===

export type TopNavBarProps = {
  onSearchPress: () => void;
  onMenuPress: () => void;
  onBackPress?: () => void; // Optional back button
};

// === COMPONENT ===

export const TopNavBar: React.FC<TopNavBarProps> = React.memo(
  ({onSearchPress, onMenuPress, onBackPress}) => {
    return (
      <>
        {/* Status bar background extension */}
        <View style={styles.statusBarBackground} />

        <View style={styles.container}>
          {/* Left side buttons */}
          <View style={styles.leftButtonsContainer}>
            {/* Hamburger Menu - Left aligned */}
            <Pressable
              onPress={onMenuPress}
              style={({pressed}) => [
                styles.menuButton,
                pressed && styles.pressed,
              ]}>
              <HamburgerIcon
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

          {/* Search Icon - Right aligned */}
          <Pressable
            onPress={onSearchPress}
            style={({pressed}) => [
              styles.searchButton,
              pressed && styles.pressed,
            ]}>
            <SearchIcon
              size={theme.layout.topNav.searchIconSize}
              color={theme.colors.textPrimary}
            />
          </Pressable>
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
    height: theme.layout.topNav.topSpacing,
    backgroundColor: theme.colors.pureBlack, // Pure black background (global standard)
  },

  container: {
    position: 'absolute',
    top: theme.layout.topNav.topSpacing,
    left: 0,
    right: 0,
    height: theme.layout.topNav.height,
    backgroundColor: theme.colors.pureBlack, // Pure black background (global standard)
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal,
  },

  leftButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.m, // Standard gap between navigation icons
  },

  menuButton: {
    padding: 0,
  },

  backButton: {
    padding: 0,
  },

  searchButton: {
    padding: 0,
  },

  pressed: {
    opacity: theme.layout.interaction.pressedOpacity,
    transform: [{scale: theme.layout.interaction.pressedScale}],
  },
});
