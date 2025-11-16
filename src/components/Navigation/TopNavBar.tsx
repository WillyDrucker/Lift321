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
import {SearchIcon, HamburgerIcon} from '@/components/icons';

// === TYPES ===

export type TopNavBarProps = {
  onSearchPress: () => void;
  onMenuPress: () => void;
};

// === COMPONENT ===

export const TopNavBar: React.FC<TopNavBarProps> = React.memo(
  ({onSearchPress, onMenuPress}) => {
    return (
      <>
        {/* Status bar background extension */}
        <View style={styles.statusBarBackground} />

        <View style={styles.container}>
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
    backgroundColor: theme.colors.backgroundPrimary,
  },

  container: {
    position: 'absolute',
    top: theme.layout.topNav.topSpacing,
    left: 0,
    right: 0,
    height: theme.layout.topNav.height,
    backgroundColor: theme.colors.backgroundPrimary,
    borderWidth: theme.layout.topNav.borderWidth,
    borderColor: theme.colors.textPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.layout.topNav.paddingHorizontal,
  },

  menuButton: {
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
