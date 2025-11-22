// ==========================================================================
// SIDEBAR COMPONENT
//
// Slide-out sidebar drawer for navigation and menu options.
// Slides from left with dark overlay backdrop.
//
// Dependencies: theme tokens, React Native Animated API
// Used by: HomePage hamburger menu
// ==========================================================================

import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import {theme} from '@/theme';
import {authService, isGuestMode} from '@/services';

// === TYPES ===

type MenuOption = 'profile' | 'settings' | 'help' | 'logout';

type SidebarProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: MenuOption) => void;
  slideAnim?: Animated.Value;
  overlayOpacity?: Animated.Value;
};

// === COMPONENT ===

export const Sidebar: React.FC<SidebarProps> = ({
  visible,
  onClose,
  onSelect,
  slideAnim: externalSlideAnim,
  overlayOpacity: externalOverlayOpacity,
}) => {
  // === STATE ===
  const internalSlideAnim = useRef(new Animated.Value(-1)).current;
  const internalOverlayOpacity = useRef(new Animated.Value(0)).current;
  const slideAnim = externalSlideAnim || internalSlideAnim;
  const overlayOpacity = externalOverlayOpacity || internalOverlayOpacity;
  const [modalVisible, setModalVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimatingRef = useRef(false);
  const screenWidth = Dimensions.get('window').width;
  const sidebarWidth = (screenWidth * theme.layout.sidebar.widthPercentage) / 100;

  // Swipe-to-close gesture handler
  const swipePanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Activate if swiping left with significant movement
        return Math.abs(gestureState.dx) > theme.layout.sidebar.gestureActivationThreshold;
      },
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        // Capture gesture if clearly swiping left
        return gestureState.dx < -theme.layout.sidebar.gestureDirectionThreshold;
      },
      onPanResponderGrant: () => {
        // Grant responder - gesture started
      },
      onPanResponderMove: (evt, gestureState) => {
        // Update slide position as user swipes (follows finger in both directions)
        const progress = Math.max(-1, Math.min(0, gestureState.dx / sidebarWidth));
        slideAnim.setValue(progress);
        // Also fade overlay proportionally
        overlayOpacity.setValue(Math.max(0, Math.min(1, 1 + progress)));
      },
      onPanResponderRelease: (evt, gestureState) => {
        // Close if swiped more than threshold percentage of sidebar width or with velocity
        const swipeDistance = Math.abs(gestureState.dx);
        const swipeVelocity = Math.abs(gestureState.vx);

        if (
          swipeDistance > sidebarWidth * theme.layout.sidebar.swipeDismissThresholdPercentage ||
          swipeVelocity > theme.layout.sidebar.swipeVelocityThreshold
        ) {
          // Quick close animation
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: -1,
              duration: theme.layout.sidebar.animationDuration,
              useNativeDriver: true,
            }),
            Animated.timing(overlayOpacity, {
              toValue: 0,
              duration: theme.layout.sidebar.animationDuration,
              useNativeDriver: true,
            }),
          ]).start(() => onClose());
        } else {
          // Snap back to open position with faster spring
          Animated.parallel([
            Animated.spring(slideAnim, {
              toValue: 0,
              useNativeDriver: true,
              tension: theme.layout.sidebar.springTension,
              friction: theme.layout.sidebar.springFriction,
            }),
            Animated.spring(overlayOpacity, {
              toValue: 1,
              useNativeDriver: true,
              tension: theme.layout.sidebar.springTension,
              friction: theme.layout.sidebar.springFriction,
            }),
          ]).start();
        }
      },
      onPanResponderTerminate: () => {
        // Another component has taken over - snap back quickly
        Animated.parallel([
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            tension: theme.layout.sidebar.springTension,
            friction: theme.layout.sidebar.springFriction,
          }),
          Animated.spring(overlayOpacity, {
            toValue: 1,
            useNativeDriver: true,
            tension: theme.layout.sidebar.springTension,
            friction: theme.layout.sidebar.springFriction,
          }),
        ]).start();
      },
    }),
  ).current;

  // === HOOKS ===

  // Fetch user email on mount
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        // Check if guest mode
        const isGuest = await isGuestMode();
        if (isGuest) {
          setUserEmail('Guest');
          return;
        }

        // Get authenticated user
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
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    if (visible) {
      // Clear any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      // Stop any running animations before starting new one
      slideAnim.stopAnimation();
      overlayOpacity.stopAnimation();

      setModalVisible(true);
      isAnimatingRef.current = true;

      // Animate to open position with spring for smooth feel
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: theme.layout.sidebar.springTension,
          friction: theme.layout.sidebar.springFriction,
          velocity: 2,
        }),
        Animated.spring(overlayOpacity, {
          toValue: 1,
          useNativeDriver: true,
          tension: theme.layout.sidebar.springTension,
          friction: theme.layout.sidebar.springFriction,
        }),
      ]).start(() => {
        isAnimatingRef.current = false;
      });
    } else {
      // Stop any running animations
      slideAnim.stopAnimation();
      overlayOpacity.stopAnimation();

      isAnimatingRef.current = true;

      // Start close animation with spring
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: -1,
          useNativeDriver: true,
          tension: theme.layout.sidebar.springTension,
          friction: theme.layout.sidebar.springFriction,
        }),
        Animated.spring(overlayOpacity, {
          toValue: 0,
          useNativeDriver: true,
          tension: theme.layout.sidebar.springTension,
          friction: theme.layout.sidebar.springFriction,
        }),
      ]).start(() => {
        isAnimatingRef.current = false;
      });

      // Hide modal after animation completes (spring is ~200ms)
      closeTimeoutRef.current = setTimeout(() => {
        setModalVisible(false);
        closeTimeoutRef.current = null;
      }, 200);
    }
  }, [visible, slideAnim, overlayOpacity]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // === EVENT HANDLERS ===
  const handleSelect = (option: MenuOption) => {
    onSelect(option);
    onClose();
  };

  // === RENDER ===
  if (!modalVisible) {
    return null;
  }

  return (
    <Modal
      visible={modalVisible}
      transparent
      animationType="none"
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      {/* Backdrop - tap to close */}
      <Pressable style={styles.container} onPress={onClose}>
        <Animated.View style={[styles.overlay, {opacity: overlayOpacity}]} />
      </Pressable>

      {/* Sidebar - drag to close */}
      <Animated.View
        style={[
          styles.sidebar,
          {
            width: sidebarWidth + 100, // Add 100px to compensate for left padding
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
        {/* Draggable overlay for gestures */}
        <View {...swipePanResponder.panHandlers} style={styles.gestureOverlay}>
          {/* Header Section */}
          <View style={styles.header}>
            {/* Logo */}
            <Image
              source={require('@/assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* User Email */}
            <Text style={styles.username}>{userEmail}</Text>
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
        </View>
      </Animated.View>
    </Modal>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlayBackground,
  },

  sidebar: {
    position: 'absolute',
    left: -100, // Extend 100px to the left to prevent background showing during spring
    top: 0,
    bottom: 0,
    height: Dimensions.get('window').height, // Use full window height to cover safe areas
    paddingLeft: 100, // Add padding to compensate for negative left position
    backgroundColor: theme.colors.backgroundCard,
    ...theme.viewShadows.large,
  },

  gestureOverlay: {
    flex: 1,
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
