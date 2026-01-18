// ==========================================================================
// BOTTOM SHEET COMPONENT
//
// Reusable modal bottom sheet with swipe-to-dismiss gesture.
// Slides up from bottom with dark overlay backdrop.
// Template for all dropdown/selection menus in the app.
//
// PERFORMANCE: Uses react-native-reanimated (UI thread) and
// react-native-gesture-handler (native gestures) for smooth 60fps.
//
// Dependencies: theme tokens, Reanimated 3, Gesture Handler 2
// Used by: ExerciseCard exercise selector, future selection menus
// ==========================================================================

import React, {useCallback, useEffect, useState, ReactNode} from 'react';
import {
  BackHandler,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  LayoutChangeEvent,
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

// ============================================================================
// TYPES
// ============================================================================

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxHeightPercent?: number;
  bottomOffset?: number; // Space from bottom (e.g., tab bar height)
  topOffset?: number; // Space from top (e.g., header height)
};

// ============================================================================
// SPRING CONFIGURATION
// ============================================================================

const SPRING_CONFIG = {
  damping: 20,
  stiffness: 90,
  mass: 0.5,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

// ============================================================================
// COMPONENT
// ============================================================================

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
  maxHeightPercent = theme.layout.bottomSheet.maxHeightPercent,
  bottomOffset = theme.layout.bottomNav.height, // Default to tab bar height
  topOffset = theme.layout.topNav.topSpacing + theme.layout.topNav.height, // Default to below top nav
}) => {
  // === STATE ===
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal open state (blocks touches)
  const [contentHeight, setContentHeight] = useState(0);

  // Get reactive window dimensions
  const {height: screenHeight} = useWindowDimensions();

  // Calculate sheet dimensions based on available screen space
  const availableHeight = screenHeight - bottomOffset - topOffset;
  const maxHeight = Math.min(availableHeight, (screenHeight * maxHeightPercent) / 100);
  const headerHeight = title ? theme.layout.bottomSheet.headerHeight : 0;
  const handleAreaHeight = theme.layout.bottomSheet.handleHeight;
  const paddingVertical = theme.layout.bottomSheet.paddingBottom;

  // Dynamic sheet height based on content, capped at available space
  const calculatedHeight = contentHeight + headerHeight + handleAreaHeight + paddingVertical;
  const sheetHeight = Math.min(calculatedHeight, maxHeight);

  // === SHARED VALUES (UI THREAD) ===
  const translateY = useSharedValue(sheetHeight || theme.layout.bottomSheet.fallbackHeight);
  // overlayOpacity: 0 (hidden) to 1 (visible)
  const overlayOpacity = useSharedValue(0);

  // === GESTURE HANDLER ===
  // Only on handle area - avoids conflict with ScrollView
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Only allow downward drag (positive translationY)
      const newTranslateY = Math.max(0, event.translationY);
      translateY.value = newTranslateY;
      // Update overlay opacity proportionally
      overlayOpacity.value = interpolate(
        newTranslateY,
        [0, sheetHeight],
        [1, 0],
        Extrapolation.CLAMP,
      );
    })
    .onEnd((event) => {
      // Check if should close based on distance or velocity
      const swipeDistance = event.translationY;
      const swipeVelocity = event.velocityY;

      const shouldClose =
        swipeDistance > sheetHeight * theme.layout.bottomSheet.swipeDismissThreshold ||
        swipeVelocity > theme.layout.bottomSheet.swipeVelocityThreshold;

      if (shouldClose) {
        // Close with animation - onClose triggers the effect which handles animation
        runOnJS(onClose)();
      } else {
        // Snap back to open (translateY = 0)
        translateY.value = withSpring(0, SPRING_CONFIG);
        overlayOpacity.value = withSpring(1, SPRING_CONFIG);
      }
    })
    .activeOffsetY([-theme.layout.bottomSheet.gestureActivationThreshold, theme.layout.bottomSheet.gestureActivationThreshold]);

  // === ANIMATED STYLES ===
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
  }));

  // === HOOKS ===

  // Handle visibility changes with entrance animation (instant close for responsiveness)
  useEffect(() => {
    if (visible) {
      // OPENING: Show Modal and animate in
      setIsModalVisible(true);
      translateY.value = sheetHeight || theme.layout.bottomSheet.fallbackHeight;
      const timer = setTimeout(() => {
        translateY.value = withSpring(0, SPRING_CONFIG);
        overlayOpacity.value = withSpring(1, SPRING_CONFIG);
      }, theme.layout.bottomSheet.animationDelay);
      return () => clearTimeout(timer);
    } else if (isModalVisible) {
      // CLOSING: Instant close for immediate touch responsiveness
      setIsModalVisible(false);
    }
  }, [visible, sheetHeight]);

  // Update animation when sheet height changes (content measured)
  useEffect(() => {
    if (visible && isModalVisible && contentHeight > 0) {
      translateY.value = withSpring(0, SPRING_CONFIG); // Visible position
    }
  }, [sheetHeight, visible, isModalVisible, contentHeight]);

  // Handle Android back button
  useEffect(() => {
    if (!visible || !isModalVisible) {
      return;
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });

    return () => backHandler.remove();
  }, [visible, isModalVisible, onClose]);

  // === EVENT HANDLERS ===
  const handleOverlayPress = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleContentLayout = useCallback((event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout;
    setContentHeight(height);
  }, []);

  // === RENDER ===
  if (!isModalVisible) {
    return null;
  }

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={styles.container}>
        {/* Backdrop overlay - tap anywhere to close (covers full screen) */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={handleOverlayPress}
        >
          <Animated.View style={[styles.overlay, overlayAnimatedStyle]} />
        </Pressable>

        {/* Clipping container - between header and tab bar */}
        <View style={[styles.sheetClipContainer, {bottom: bottomOffset, top: topOffset}]}>
          {/* Bottom sheet - animates within clipped area */}
          <Animated.View
            style={[
              styles.sheet,
              {height: sheetHeight},
              sheetAnimatedStyle,
            ]}>
          {/* Drag Handle - gesture detector only on handle */}
          <GestureDetector gesture={panGesture}>
            <Animated.View style={styles.handleContainer}>
              <View style={styles.handle} />
            </Animated.View>
          </GestureDetector>

          {/* Close Button (X) - upper right */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <View style={styles.closeIconContainer}>
              <View style={[styles.closeLine, styles.closeLineLeft]} />
              <View style={[styles.closeLine, styles.closeLineRight]} />
            </View>
          </TouchableOpacity>

          {/* Optional Title Header */}
          {title && (
            <View style={styles.headerContainer}>
              <Text style={styles.headerTitle}>{title}</Text>
            </View>
          )}

          {/* Content Area - Always use ScrollView for consistent behavior */}
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContentContainer}
            showsVerticalScrollIndicator={true}
            bounces={false}
          >
            <View onLayout={handleContentLayout}>
              {children}
            </View>
          </ScrollView>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlayBackground,
  },
  sheetClipContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    // top and bottom are set dynamically via topOffset/bottomOffset props
    overflow: 'hidden', // Clips the sheet animation within bounds
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, // Positioned at bottom of clipping container
    backgroundColor: theme.colors.backgroundCard,
    borderTopLeftRadius: theme.layout.bottomSheet.borderRadius,
    borderTopRightRadius: theme.layout.bottomSheet.borderRadius,
    // Shadow for elevation
    shadowColor: theme.colors.shadowBlack,
    shadowOffset: {width: 0, height: theme.layout.bottomSheet.shadowOffsetY},
    shadowOpacity: 0.3,
    shadowRadius: theme.layout.bottomSheet.shadowRadius,
    elevation: theme.layout.bottomSheet.elevation,
  },
  handleContainer: {
    height: theme.layout.bottomSheet.handleHeight,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: theme.layout.bottomSheet.paddingTop,
  },
  handle: {
    width: theme.layout.bottomSheet.handleWidth,
    height: theme.layout.bottomSheet.handleBarHeight,
    backgroundColor: theme.colors.textSecondary,
    borderRadius: theme.layout.bottomSheet.handleBarHeight / 2,
    opacity: theme.layout.bottomSheet.handleOpacity,
  },
  closeButton: {
    position: 'absolute',
    top: theme.layout.bottomSheet.closeButtonOffset,
    right: theme.layout.bottomSheet.closeButtonOffset,
    width: theme.layout.bottomSheet.closeButtonSize,
    height: theme.layout.bottomSheet.closeButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeIconContainer: {
    width: theme.layout.bottomSheet.closeButtonSize,
    height: theme.layout.bottomSheet.closeButtonSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeLine: {
    position: 'absolute',
    width: theme.layout.bottomSheet.closeLineWidth,
    height: theme.layout.bottomSheet.closeLineHeight,
    backgroundColor: theme.colors.textSecondary,
    borderRadius: theme.layout.bottomSheet.closeLineHeight / 2,
  },
  closeLineLeft: {
    transform: [{rotate: '45deg'}],
  },
  closeLineRight: {
    transform: [{rotate: '-45deg'}],
  },
  headerContainer: {
    height: theme.layout.bottomSheet.headerHeight,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
    marginHorizontal: theme.layout.bottomSheet.paddingHorizontal,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  content: {
    paddingHorizontal: theme.layout.bottomSheet.paddingHorizontal,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: theme.layout.bottomSheet.paddingHorizontal,
    paddingBottom: theme.layout.bottomSheet.paddingBottom,
    flexGrow: 1,
  },
});

// ============================================================================
// EXPORT
// ============================================================================

// Wrap with React.memo to prevent unnecessary re-renders
export const BottomSheet = React.memo(BottomSheetComponent);
BottomSheet.displayName = 'BottomSheet';
