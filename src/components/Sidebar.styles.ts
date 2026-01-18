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
  overlayContainer: {
    zIndex: 1000, // Above all content, below navigation modals
  },

  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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

  dragHandleArea: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 32, // 32dp draggable space on the right
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it's above sidebar content
  },

  dragHandleBar: {
    width: 4, // Vertical bar width
    height: 48, // Vertical bar height
    backgroundColor: theme.colors.textSecondary,
    borderRadius: 2,
  },

  header: {
    paddingTop: theme.layout.sidebar.headerPaddingTop,
    paddingBottom: theme.layout.sidebar.headerPaddingBottom,
    paddingHorizontal: theme.layout.sidebar.itemPaddingHorizontal,
    alignItems: 'center',
  },

  logo: {
    width: 100,
    height: 52, // Matches LoginScreen logo (729:380 aspect ratio)
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
    paddingLeft: theme.layout.sidebar.itemPaddingHorizontal,
    paddingRight: theme.layout.sidebar.itemPaddingHorizontal + 32, // Account for drag handle area
  },

  menuItemWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // 16dp between icon and text
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
    marginLeft: theme.spacing.m,
    marginRight: theme.spacing.m + 32, // Account for drag handle area
  },

  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing.l,
    paddingLeft: theme.layout.sidebar.itemPaddingHorizontal,
    paddingRight: theme.layout.sidebar.itemPaddingHorizontal + 32, // Account for drag handle area
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
