// ==========================================================================
// NAVIGATION SERVICE
//
// Centralized navigation logic for bottom tab bar across all screens.
// Ensures consistent tab behavior and proper stack management.
//
// Dependencies: React Navigation types, TabItem type
// Used by: All screens with BottomTabBar
// ==========================================================================

import type {NavigationProp} from '@react-navigation/native';
import type {MainStackParamList} from '@/navigation/types';
import type {TabItem} from '@/components';

// ============================================================================
// TAB NAVIGATION HANDLER
// ============================================================================

/**
 * Centralized tab press handler for consistent navigation behavior
 *
 * Handles tab navigation with proper stack management:
 * - Navigates to root screen of each tab
 * - Resets navigation stack to prevent returning to nested screens
 * - Prevents unnecessary re-navigation when already on target tab
 *
 * @param tab - The tab item that was pressed
 * @param currentTab - The currently active tab
 * @param navigation - React Navigation navigation prop
 */
export const handleTabNavigation = (
  tab: TabItem,
  currentTab: TabItem,
  navigation: NavigationProp<MainStackParamList>,
): void => {
  // Don't navigate if already on the target tab
  if (tab === currentTab) {
    // Optional: Could add scroll-to-top behavior here in the future
    return;
  }

  // Navigate to the root screen of each tab
  switch (tab) {
    case 'home':
      // Reset to HomePage (clears any nested workout screens)
      navigation.reset({
        index: 0,
        routes: [{name: 'HomePage'}],
      });
      break;

    case 'plans':
      // Reset to PlansPage
      navigation.reset({
        index: 0,
        routes: [{name: 'PlansPage'}],
      });
      break;

    case 'performance':
      // TODO: Navigate to performance screen when implemented
      console.log('Performance screen not yet implemented');
      break;

    case 'social':
      // Reset to SocialScreen
      // Note: 'social' tab focuses on community/social features vs sidebar 'profile' for account management
      navigation.reset({
        index: 0,
        routes: [{name: 'SocialScreen'}],
      });
      break;

    default:
      console.warn(`Unknown tab: ${tab}`);
  }
};
