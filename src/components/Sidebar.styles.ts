// ==========================================================================
// SIDEBAR - STYLES
//
// StyleSheet definitions for Sidebar component.
// Extracted for maintainability and file size management.
//
// Dependencies: theme tokens
// Used by: Sidebar.tsx
// ==========================================================================

import {StyleSheet} from 'react-native';
import {theme} from '@/theme';

export const styles = StyleSheet.create({
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

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.l,
    paddingHorizontal: theme.layout.sidebar.itemPaddingHorizontal,
  },

  versionContainer: {
    paddingVertical: theme.spacing.s,
    alignItems: 'center',
    borderRadius: theme.spacing.xs,
  },

  versionPressed: {
    backgroundColor: theme.colors.backgroundSecondary,
  },

  versionText: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textTertiary,
  },
});
