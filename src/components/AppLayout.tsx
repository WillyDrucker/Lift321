// ==========================================================================
// APP LAYOUT COMPONENT
//
// Global layout wrapper providing consistent navigation chrome across screens.
// Includes TopNavBar, WeekCalendar, PlanProgressBar, and Sidebar management.
// Screens only need to provide their content as children.
//
// Dependencies: theme tokens, navigation components
// Used by: HomePage, PlansPage, SocialScreen, BodyPartSelectorScreen
// ==========================================================================

import React, {useState, useCallback, type ReactNode} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import {TopNavBar} from './Navigation/TopNavBar';
import {WeekCalendar} from './Navigation/WeekCalendar';
import {PlanProgressBar} from './Navigation/PlanProgressBar';
import {Sidebar} from './Sidebar';
import {BottomSheetPortal} from './BottomSheetPortal';
import {disableGuestMode, signOut} from '@/services';

// ============================================================================
// TYPES
// ============================================================================

type SidebarOption = 'profile' | 'settings' | 'tools' | 'help' | 'logout' | 'devtools';

type AppLayoutProps = {
  children: ReactNode;
  // Navigation options
  showBackButton?: boolean;
  onBackPress?: () => void;
  // Calendar options
  showWeekCalendar?: boolean;
  selectedDay?: string;
  onDayPress?: (date: string) => void;
  // Progress bar options
  showPlanProgress?: boolean;
  completedWorkouts?: number;
  totalWorkouts?: number;
  // Navigation callback for sidebar options
  onNavigate?: (screen: string) => void;
  // Custom sidebar handler (overrides default)
  onSidebarSelect?: (option: SidebarOption) => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  showBackButton = false,
  onBackPress,
  showWeekCalendar = true,
  selectedDay = '',
  onDayPress,
  showPlanProgress = true,
  completedWorkouts = 3,
  totalWorkouts = 36,
  onNavigate,
  onSidebarSelect: customSidebarHandler,
}) => {
  // === STATE ===
  const insets = useSafeAreaInsets();
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Calculate dynamic bottom padding based on device navigation type
  const dynamicBottomTabHeight = insets.bottom > theme.layout.bottomNav.gestureNavThreshold
    ? theme.layout.bottomNav.height + theme.layout.bottomNav.buttonNavExtraHeight
    : theme.layout.bottomNav.height;

  // Calculate content padding top based on which elements are shown
  const getContentPaddingTop = () => {
    let padding = insets.top + theme.layout.topNav.height;
    if (showWeekCalendar) {
      padding += theme.layout.weekCalendar.height;
    }
    if (showPlanProgress) {
      padding += theme.layout.planProgress.height;
    }
    // Subtract 4dp for visual alignment
    return padding - 4;
  };

  // === EVENT HANDLERS ===

  const handleMenuPress = useCallback(() => {
    setSidebarVisible(true);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarVisible(false);
  }, []);

  const handleSidebarSelect = useCallback(
    async (option: SidebarOption) => {
      setSidebarVisible(false);

      // Use custom handler if provided
      if (customSidebarHandler) {
        customSidebarHandler(option);
        return;
      }

      // Default handling
      switch (option) {
        case 'profile':
          onNavigate?.('ProfileScreen');
          break;
        case 'settings':
          onNavigate?.('SettingsScreen');
          break;
        case 'tools':
          onNavigate?.('ToolsScreen');
          break;
        case 'help':
          onNavigate?.('HelpScreen');
          break;
        case 'devtools':
          onNavigate?.('DevToolsScreen');
          break;
        case 'logout':
          console.log('Logout - clearing auth state');
          await disableGuestMode();
          await signOut();
          break;
      }
    },
    [customSidebarHandler, onNavigate],
  );

  // === RENDER ===

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundPrimary}
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* Content Area - receives dynamic padding */}
        <View
          style={[
            styles.contentArea,
            {
              paddingTop: getContentPaddingTop(),
              paddingBottom: dynamicBottomTabHeight + theme.spacing.s,
            },
          ]}>
          {children}
        </View>

        {/* Fixed Top Navigation (renders above content) */}
        <View style={styles.topBarsContainer}>
          <TopNavBar
            onMenuPress={handleMenuPress}
            onBackPress={showBackButton ? onBackPress : undefined}
          />

          {/* Divider Bar */}
          <View style={styles.divider} />

          {/* Week Calendar (optional) */}
          {showWeekCalendar && (
            <WeekCalendar
              selectedDay={selectedDay}
              onDayPress={onDayPress}
            />
          )}

          {/* Plan Progress (optional) */}
          {showPlanProgress && (
            <PlanProgressBar
              completedWorkouts={completedWorkouts}
              totalWorkouts={totalWorkouts}
            />
          )}
        </View>
      </SafeAreaView>

      {/* Sidebar Menu */}
      <Sidebar
        visible={sidebarVisible}
        onClose={handleSidebarClose}
        onSelect={handleSidebarSelect}
      />

      {/* Global Bottom Sheet Portal */}
      <BottomSheetPortal />
    </>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.pureBlack,
  },

  topBarsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: theme.colors.pureBlack,
  },

  divider: {
    height: theme.layout.border.thin,
    backgroundColor: theme.colors.borderDefault,
  },

  contentArea: {
    flex: 1,
    // paddingTop and paddingBottom are set dynamically
  },
});
