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
  BackHandler,
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
import {Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler';
import {theme} from '@/theme';
import {authService, isGuestMode} from '@/services';
import {styles} from './Sidebar.styles';
import {InfoIcon} from '@/components/icons';

// Import app version from package.json
const packageJson = require('../../package.json');

// === TYPES ===

type MenuOption = 'profile' | 'settings' | 'tools' | 'help' | 'logout' | 'devtools';

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
  const [overlayActive, setOverlayActive] = useState(false);

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
        // Immediately disable touch blocking when closing starts
        runOnJS(setOverlayActive)(false);
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
    .activeOffsetX([-10, 10]) // Require 10px movement to activate gesture
    .failOffsetY([-10, 10]); // Cancel if vertical scroll detected (prevents conflict with scrolling)

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
      // Enable touch blocking when opening
      setOverlayActive(true);
      // Animate in
      translateX.value = withSpring(0, SPRING_CONFIG);
      overlayOpacity.value = withSpring(1, SPRING_CONFIG);
    } else {
      // Disable touch blocking immediately when closing starts
      setOverlayActive(false);
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

  // Handle Android back button
  useEffect(() => {
    if (!visible || !shouldRender) {
      return;
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove();
  }, [visible, shouldRender, onClose]);

  // === EVENT HANDLERS ===
  const handleSelect = useCallback(
    (option: MenuOption) => {
      onSelect(option);
      onClose();
    },
    [onSelect, onClose],
  );

  const handleOverlayPress = useCallback(() => {
    // Immediately disable touch blocking when closing starts
    setOverlayActive(false);
    onClose();
  }, [onClose]);

  // === RENDER ===
  if (!shouldRender) {
    return null;
  }

  return (
    <View
      style={[StyleSheet.absoluteFillObject, styles.overlayContainer]}
      pointerEvents={overlayActive ? 'auto' : 'none'}>
      <GestureHandlerRootView style={styles.container}>
        {/* Backdrop overlay - tap to close */}
        {/* pointerEvents controlled by overlayActive state - disables immediately when closing */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleOverlayPress}
          pointerEvents={overlayActive ? 'auto' : 'none'}>
          <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
        </Pressable>

        {/* Sidebar drawer - entire sidebar is draggable */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.sidebar,
              {width: sidebarWidth},
              sidebarAnimatedStyle,
            ]}>
            {/* Drag Handle - Visual indicator on right edge */}
            <View style={styles.dragHandleArea}>
              <View style={styles.dragHandleBar} />
            </View>

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
          {/* Profile: Account management and settings (distinct from bottom 'Social' tab for community features) */}
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
            onPress={() => handleSelect('tools')}>
            <Text style={styles.menuText}>Tools</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({pressed}) => [styles.menuItem, styles.menuItemWithIcon, pressed && styles.menuItemPressed]}
            onPress={() => handleSelect('help')}>
            <InfoIcon size={18} color={theme.colors.textPrimary} />
            <Text style={styles.menuText}>Help</Text>
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            style={({pressed}) => [styles.menuItem, pressed && styles.menuItemPressed]}
            onPress={() => handleSelect('logout')}>
            <Text style={styles.menuText}>Logout</Text>
          </Pressable>

          {/* Footer - Version Number (tap to open DevTools) */}
          <View style={styles.footer}>
            <Pressable
              style={({pressed}) => [styles.versionContainer, pressed && styles.versionPressed]}
              onPress={() => handleSelect('devtools')}>
              <Text style={styles.versionText}>v{packageJson.version}</Text>
            </Pressable>
          </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders
export const Sidebar = React.memo(SidebarComponent);
Sidebar.displayName = 'Sidebar';
