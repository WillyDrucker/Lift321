// ==========================================================================
// DEFAULT SCREEN LAYOUT COMPONENT
//
// Reusable screen layout wrapper with consistent top bar and back button.
// Provides standard spacing and structure for all app screens.
//
// Dependencies: theme tokens, LeftChevron component
// Used by: All main app screens (Settings, Profile, Help, etc.)
// ==========================================================================

import React, {type ReactNode} from 'react';
import {Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {theme} from '@/theme';
import {LeftChevron, BottomSheetPortal} from '@/components';

// === TYPES ===

type DefaultScreenLayoutProps = {
  title?: string;
  onBack?: () => void;
  children: ReactNode;
  showBackButton?: boolean;
};

// === COMPONENT ===

/**
 * Default screen layout with top bar and optional back button
 * Provides consistent structure and spacing across all screens
 *
 * @param title - Screen title displayed in top bar (optional)
 * @param onBack - Back button handler (if not provided, back button hidden)
 * @param children - Screen content
 * @param showBackButton - Override to force show/hide back button
 */
export const DefaultScreenLayout: React.FC<DefaultScreenLayoutProps> = ({
  title,
  onBack,
  children,
  showBackButton = true,
}) => {
  // === RENDER ===

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.backgroundPrimary} />
      <SafeAreaView style={styles.container}>
        {/* Status bar background extension */}
        <View style={styles.statusBarBackground} />

        {/* Top Bar */}
        <View style={styles.topBar}>
          {/* Back Button */}
          {showBackButton && onBack && (
            <Pressable
              onPress={onBack}
              style={({pressed}) => [styles.backButton, pressed && styles.backButtonPressed]}>
              <LeftChevron size={theme.layout.topNav.backIconSize} color={theme.colors.textPrimary} />
            </Pressable>
          )}

          {/* Title */}
          {title && <Text style={styles.title}>{title}</Text>}
        </View>

        {/* Divider Bar */}
        <View style={styles.divider} />

        {/* Screen Content */}
        <View style={styles.content}>{children}</View>
      </SafeAreaView>

      {/* Global Bottom Sheet Portal */}
      <BottomSheetPortal />
    </>
  );
};

// === STYLES ===

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },

  statusBarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: theme.layout.topNav.topSpacing,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.layout.topNav.topSpacing,
    height: theme.layout.topNav.height,
    paddingHorizontal: theme.layout.topNav.paddingHorizontal,
    backgroundColor: theme.colors.backgroundPrimary,
  },

  backButton: {
    // No padding - icon sizing handles touch target
  },

  backButtonPressed: {
    opacity: theme.layout.interaction.pressedOpacity,
    transform: [{scale: theme.layout.interaction.pressedScale}],
  },

  title: {
    ...theme.textStyles.heading1,
    color: theme.colors.textPrimary,
    flex: 1,
    marginLeft: theme.spacing.m,
  },

  divider: {
    height: theme.layout.border.thin,
    backgroundColor: theme.colors.borderDefault,
  },

  content: {
    flex: 1,
  },
});
