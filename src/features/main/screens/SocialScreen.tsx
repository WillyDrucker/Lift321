// ==========================================================================
// SOCIAL SCREEN
//
// Social/community screen displaying activity feed from friends and community.
// Shows workout completions, achievements, and personal records.
//
// NOTE: This is accessed via bottom 'Social' tab (distinct from sidebar 'Profile'):
// - Bottom 'Social' tab: Social/community features, activity feed (this screen)
// - Sidebar 'Profile': Account management, settings, personal data
//
// Dependencies: theme tokens, navigation components, activity feed data
// Used by: Bottom tab navigation (activeTab='social')
// ==========================================================================

import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import type {RootStackScreenProps} from '@/navigation/types';
import {
  TopNavBar,
  WeekCalendar,
  PlanProgressBar,
  BottomTabBar,
  Sidebar,
  ActivityFeedCard,
  type TabItem,
} from '@/components';
import {MOCK_ACTIVITY_DATA} from '@/data/mockActivityData';

// ============================================================================
// TYPES
// ============================================================================

type SocialScreenProps = RootStackScreenProps<'SocialScreen'>;

// ============================================================================
// COMPONENT
// ============================================================================

export const SocialScreen: React.FC<SocialScreenProps> = ({navigation}) => {
  // ==========================================================================
  // STATE
  // ==========================================================================

  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabItem>('social');
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);

  // Calculate dynamic bottom padding to match BottomTabBar height
  const dynamicBottomTabHeight = insets.bottom > theme.layout.bottomNav.gestureNavThreshold
    ? theme.layout.bottomNav.height + theme.layout.bottomNav.buttonNavExtraHeight
    : theme.layout.bottomNav.height;

  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  const handleMenuPress = useCallback(() => {
    setSidebarVisible(true);
  }, []);

  const handleGuidePress = useCallback(() => {
    navigation.navigate('HelpScreen');
  }, [navigation]);

  const handleTabPress = useCallback((tab: TabItem) => {
    const {handleTabNavigation} = require('@/services');
    handleTabNavigation(tab, activeTab, navigation);
    setActiveTab(tab);
  }, [activeTab, navigation]);

  const handleSidebarSelect = useCallback(
    async (option: 'profile' | 'settings' | 'help' | 'logout' | 'devtools') => {
      console.log('Sidebar option selected:', option);

      switch (option) {
        case 'profile':
          navigation.navigate('ProfileScreen');
          break;
        case 'settings':
          navigation.navigate('SettingsScreen');
          break;
        case 'help':
          navigation.navigate('HelpScreen');
          break;
        case 'devtools':
          navigation.navigate('DevToolsScreen');
          break;
        case 'logout':
          console.log('Logout - clearing auth state');
          const {disableGuestMode, signOut} = await import('@/services');
          await disableGuestMode();
          await signOut();
          break;
      }
    },
    [navigation],
  );

  const handleActivityPress = useCallback((activityId: string) => {
    console.log('Activity pressed:', activityId);
    // TODO: Navigate to activity detail or user profile
  }, []);

  const handleLikePress = useCallback((activityId: string) => {
    console.log('Like pressed:', activityId);
    // TODO: Toggle like on activity
  }, []);

  const handleCommentPress = useCallback((activityId: string) => {
    console.log('Comment pressed:', activityId);
    // TODO: Open comments for activity
  }, []);

  // ==========================================================================
  // RENDER
  // ==========================================================================

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.backgroundPrimary}
        translucent={false}
      />
      <SafeAreaView style={styles.container}>
        {/* Scrollable Content Area */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: dynamicBottomTabHeight + theme.spacing.s}
          ]}
          showsVerticalScrollIndicator={false}>

          {/* Activity Feed Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Recent Activity</Text>
          </View>

          {/* Activity Feed Cards */}
          <View style={styles.activityFeed}>
            {MOCK_ACTIVITY_DATA.map((activity) => (
              <ActivityFeedCard
                key={activity.id}
                activity={activity}
                onPress={() => handleActivityPress(activity.id)}
                onLikePress={() => handleLikePress(activity.id)}
                onCommentPress={() => handleCommentPress(activity.id)}
              />
            ))}
          </View>
        </ScrollView>

        {/* Fixed Top Navigation (renders above ScrollView) */}
        <View style={styles.topBarsContainer}>
          <TopNavBar
            onGuidePress={handleGuidePress}
            onMenuPress={handleMenuPress}
          />

          {/* Divider Bar */}
          <View style={styles.divider} />

          {/* Week Calendar */}
          <WeekCalendar />

          {/* Plan Progress */}
          <PlanProgressBar />
        </View>

        {/* Bottom Navigation */}
        <BottomTabBar
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </SafeAreaView>

      {/* Sidebar Menu */}
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onSelect={handleSidebarSelect}
      />
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

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: theme.layout.planProgress.topPosition + theme.layout.planProgress.height,
    paddingHorizontal: theme.spacing.s,
  },

  sectionHeader: {
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.s,
  },

  sectionHeaderText: {
    ...theme.textStyles.heading2,
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
  },

  activityFeed: {
    // Activity cards have their own marginBottom
  },
});
