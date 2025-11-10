// ==========================================================================
// SIDEBAR COMPONENT
//
// Slide-out sidebar drawer for navigation and menu options.
// Slides from left with dark overlay backdrop.
//
// Dependencies: theme tokens, React Native Animated API
// Used by: MainActivity hamburger menu
// ==========================================================================

import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
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

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: MenuOption) => void;
};

// === COMPONENT ===

export const Sidebar: React.FC<SidebarProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  // === STATE ===
  // Animation value for slide-in/out

  const slideAnim = useRef(new Animated.Value(-1)).current;
  const screenWidth = Dimensions.get('window').width;
  const sidebarWidth = (screenWidth * theme.layout.sidebar.widthPercentage) / 100;

  // === HOOKS ===
  // Trigger animation when visibility changes

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: theme.layout.sidebar.animationDuration,
        useNativeDriver: true,
      }).start();
    } else {
      // Slide out
      Animated.timing(slideAnim, {
        toValue: -1,
        duration: theme.layout.sidebar.animationDuration,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  // === EVENT HANDLERS ===
  // Handle menu item selection

  const handleSelect = (option: MenuOption) => {
    onSelect(option);
    onClose();
  };

  // === RENDER ===
  // Modal with animated sidebar

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      {/* Backdrop - tap to close */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Sidebar - prevent tap-through */}
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.sidebar,
                {
                  width: sidebarWidth,
                  transform: [
                    {
                      translateX: slideAnim.interpolate({
                        inputRange: [-1, 0],
                        outputRange: [-sidebarWidth, 0],
                      }),
                    },
                  ],
                },
              ]}>
              {/* Menu Items */}
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
            </Animated.View>
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
    backgroundColor: theme.colors.overlayBackground,
    justifyContent: 'flex-start',
  },

  sidebar: {
    height: '100%',
    backgroundColor: theme.colors.backgroundCard,
    paddingTop: theme.spacing.xxl,
    ...theme.viewShadows.large,
  },

  menuItem: {
    paddingVertical: theme.layout.sidebar.itemPaddingVertical,
    paddingHorizontal: theme.layout.sidebar.itemPaddingHorizontal,
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
    height: theme.layout.border.thin,
    backgroundColor: theme.colors.borderDefault,
    marginHorizontal: theme.spacing.m,
  },
});
