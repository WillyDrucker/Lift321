// ==========================================================================
// SIMPLE MENU COMPONENT
//
// Dropdown menu for hamburger navigation.
// Shows Settings, Profile, and Logout options.
//
// Dependencies: theme tokens, React Native
// Used by: MainActivity hamburger menu
// ==========================================================================

import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {theme} from '@/theme';

// === TYPES ===

type MenuOption = 'settings' | 'profile' | 'logout';

type SimpleMenuProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: MenuOption) => void;
  anchorPosition?: {top: number; left: number};
};

// === COMPONENT ===

export const SimpleMenu: React.FC<SimpleMenuProps> = ({
  visible,
  onClose,
  onSelect,
  anchorPosition = {top: 140, left: 16},
}) => {
  // === EVENT HANDLERS ===
  // Handle menu item selection

  const handleSelect = (option: MenuOption) => {
    onSelect(option);
    onClose();
  };

  // === RENDER ===
  // Modal with menu options positioned near hamburger icon

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.menuContainer,
                {top: anchorPosition.top, left: anchorPosition.left},
              ]}>
              <Pressable
                style={({pressed}) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => handleSelect('settings')}>
                <Text style={styles.menuText}>Settings</Text>
              </Pressable>

              <View style={styles.divider} />

              <Pressable
                style={({pressed}) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => handleSelect('profile')}>
                <Text style={styles.menuText}>Profile</Text>
              </Pressable>

              <View style={styles.divider} />

              <Pressable
                style={({pressed}) => [
                  styles.menuItem,
                  pressed && styles.menuItemPressed,
                ]}
                onPress={() => handleSelect('logout')}>
                <Text style={styles.menuText}>Logout</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// === STYLES ===
// StyleSheet definitions using global theme tokens

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },

  menuContainer: {
    position: 'absolute',
    backgroundColor: theme.colors.backgroundCard,
    borderRadius: theme.spacing.s,
    minWidth: 150,
    ...theme.viewShadows.large,
  },

  menuItem: {
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
  },

  menuItemPressed: {
    backgroundColor: theme.colors.backgroundSecondary,
  },

  menuText: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textPrimary,
  },

  divider: {
    height: theme.layout.form.dividerThickness,
    backgroundColor: theme.colors.borderDefault,
    marginHorizontal: theme.spacing.s,
  },
});
