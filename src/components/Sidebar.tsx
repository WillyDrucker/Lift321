// ==========================================================================
// SIDEBAR COMPONENT
//
// Slide-out sidebar drawer for navigation and menu options.
// Slides from left with dark overlay backdrop.
//
// PERFORMANCE: Uses react-native-reanimated (UI thread) and
// react-native-gesture-handler (native gestures) for butter-smooth 60fps
// performance on physical devices.
//
// Dependencies: theme tokens, Reanimated 3, Gesture Handler 2
// Used by: HomePage hamburger menu
// ==========================================================================

import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {theme} from '@/theme';
import {authService, isGuestMode} from '@/services';

// === TYPES ===

type MenuOption = 'profile' | 'settings' | 'help' | 'logout';

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: MenuOption) => void;
};

// === SPRING CONFIGURATION ===
// Consistent spring physics for all animations - matches platform standards

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 90,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

// === COMPONENT ===

const SidebarComponent: React.FC<SidebarProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  // === STATE ===
  const [userEmail, setUserEmail] = useState<string>('');
  const [shouldRender, setShouldRender] = useState(false);

  // Get reactive window dimensions for rotation support
  const {width: screenWidth} = useWindowDimensions();
  const sidebarWidth = (screenWidth * theme.layout.sidebar.widthPercentage) / 100;

  // === SHARED VALUES (UI THREAD) ===
  // translateX: -sidebarWidth (hidden) to 0 (visible)
  const translateX = useSharedValue(-sidebarWidth);
  // overlayOpacity: 0 (hidden) to 1 (visible)
  const overlayOpacity = useSharedValue(0);

  // === GESTURE HANDLER ===
  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Gesture started - no action needed
    })
    .onUpdate((event) => {
      // Follow finger movement (only allow left swipe)
      const newTranslateX = Math.min(0, event.translationX);
      translateX.value = newTranslateX;
      // Update overlay opacity proportionally
      overlayOpacity.value = interpolate(
        newTranslateX,
        [-sidebarWidth, 0],
        [0, 1],
        Extrapolation.CLAMP,
      );
    })
    .onEnd((event) => {
      // Check if should close based on distance or velocity
      const swipeDistance = Math.abs(event.translationX);
      const swipeVelocity = Math.abs(event.velocityX);

      const shouldClose =
        swipeDistance > sidebarWidth * theme.layout.sidebar.swipeDismissThresholdPercentage ||
        swipeVelocity > theme.layout.sidebar.swipeVelocityThreshold * 1000; // Convert to px/s

      if (shouldClose) {
        // Animate closed
        translateX.value = withSpring(-sidebarWidth, SPRING_CONFIG);
        overlayOpacity.value = withSpring(0, SPRING_CONFIG, (finished) => {
          if (finished) {
            runOnJS(onClose)();
          }
        });
      } else {
        // Snap back to open
        translateX.value = withSpring(0, SPRING_CONFIG);
        overlayOpacity.value = withSpring(1, SPRING_CONFIG);
      }
    })
    .activeOffsetX([-10, 10]); // Require 10px movement to activate

  // === ANIMATED STYLES ===
  const sidebarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  // === HOOKS ===

  // Handle visibility changes
  useEffect(() => {
    if (visible) {
      // Show immediately
      setShouldRender(true);
      // Animate in
      translateX.value = withSpring(0, SPRING_CONFIG);
      overlayOpacity.value = withSpring(1, SPRING_CONFIG);
    } else {
      // Animate out
      translateX.value = withSpring(-sidebarWidth, SPRING_CONFIG);
      overlayOpacity.value = withSpring(0, SPRING_CONFIG, (finished) => {
        if (finished) {
          // Hide after animation completes
          runOnJS(setShouldRender)(false);
        }
      });
    }
  }, [visible, sidebarWidth]);

  // Fetch user email AFTER sidebar is fully visible (non-blocking)
  useEffect(() => {
    if (!visible || userEmail) {
      return;
    }

    // Delay fetch to avoid interfering with animation
    const fetchTimer = setTimeout(async () => {
      try {
        const isGuest = await isGuestMode();
        if (isGuest) {
          setUserEmail('Guest');
          return;
        }

        const result = await authService.getCurrentUser();
        if (result.status === 'success' && result.data.email) {
          setUserEmail(result.data.email);
        } else {
          setUserEmail('User');
        }
      } catch (error) {
        console.error('Failed to fetch user email:', error);
        setUserEmail('User');
      }
    }, 300); // Fetch after animation completes (~300ms)

    return () => clearTimeout(fetchTimer);
  }, [visible, userEmail]);

  // === EVENT HANDLERS ===
  const handleSelect = useCallback(
    (option: MenuOption) => {
      onSelect(option);
      onClose();
    },
    [onSelect, onClose],
  );

  const handleOverlayPress = useCallback(() => {
    onClose();
  }, [onClose]);

  // === RENDER ===
  if (!shouldRender) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Backdrop overlay - tap to close */}
      <Pressable style={StyleSheet.absoluteFill} onPress={handleOverlayPress}>
        <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
      </Pressable>

      {/* Sidebar drawer with gesture handling */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.sidebar,
            {width: sidebarWidth},
            sidebarAnimatedStyle,
          ]}>
          {/* Header Section */}
          <View style={styles.header}>
            {/* Logo */}
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* User Email */}
            <Text style={styles.username}>{userEmail || 'Loading...'}</Text>
          </View>

          {/* Menu Items */}
          <Pressable
            style={({pressed}) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => handleSelect('profile')}>
            <Text style={styles.menuText}>Profile</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({pressed}) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => handleSelect('settings')}>
            <Text style={styles.menuText}>Settings</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({pressed}) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => handleSelect('help')}>
            <Text style={styles.menuText}>Help</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({pressed}) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => handleSelect('logout')}>
            <Text style={styles.menuText}>Logout</Text>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders
export const Sidebar = React.memo(SidebarComponent);
Sidebar.displayName = 'Sidebar';

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlayBackground,
  },

  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.colors.backgroundCard,
    ...theme.viewShadows.large,
  },

  header: {
    paddingTop: theme.layout.sidebar.headerPaddingTop,
    paddingBottom: theme.layout.sidebar.headerPaddingBottom,
    paddingHorizontal: theme.layout.sidebar.itemPaddingHorizontal,
    alignItems: 'center',
  },

  logo: {
    width: theme.layout.logo.size,
    height: theme.layout.logo.size,
    marginBottom: theme.layout.sidebar.logoMarginBottom,
  },

  username: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.textPrimary,
    marginBottom: theme.layout.sidebar.usernameMarginBottom,
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
