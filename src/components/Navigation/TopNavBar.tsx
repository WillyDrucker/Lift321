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
      <View style={styles.container}>
        {/* Hamburger Menu - Left aligned */}
        <Pressable onPress={onMenuPress} style={styles.menuButton}>
          <HamburgerIcon
            size={theme.layout.topNav.menuIconSize}
            color={theme.colors.textPrimary}
          />
        </Pressable>

        {/* Search Icon - Right aligned */}
        <Pressable onPress={onSearchPress} style={styles.searchButton}>
          <SearchIcon
            size={theme.layout.topNav.searchIconSize}
            color={theme.colors.textPrimary}
          />
        </Pressable>
      </View>
    );
  },
);

TopNavBar.displayName = 'TopNavBar';

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: theme.layout.topNav.topSpacing,
    left: 0,
    right: 0,
    height: theme.layout.topNav.height,
    backgroundColor: theme.colors.pureBlack,
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
});
