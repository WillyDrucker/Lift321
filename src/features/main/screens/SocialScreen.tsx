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
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {ActivityItem} from '@/data/mockActivityData';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {theme} from '@/theme';
import type {TabScreenProps} from '@/navigation/types';
import {
  TopNavBar,
  WeekCalendar,
  PlanProgressBar,
  Sidebar,
  ActivityFeedCard,
} from '@/components';
import {MOCK_ACTIVITY_DATA} from '@/data/mockActivityData';
import {disableGuestMode, signOut} from '@/services';

// ============================================================================
// TYPES
// ============================================================================

type SocialScreenProps = TabScreenProps<'SocialScreen'>;

// ============================================================================
// COMPONENT
// ============================================================================

export const SocialScreen: React.FC<SocialScreenProps> = ({navigation}) => {
  // ==========================================================================
  // STATE
  // ==========================================================================

  const insets = useSafeAreaInsets();
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
  // RENDER HELPERS
  // ==========================================================================

  const renderActivityItem = useCallback(({item}: {item: ActivityItem}) => (
    <ActivityFeedCard
      activity={item}
      onPress={() => handleActivityPress(item.id)}
      onLikePress={() => handleLikePress(item.id)}
      onCommentPress={() => handleCommentPress(item.id)}
    />
  ), [handleActivityPress, handleLikePress, handleCommentPress]);

  const keyExtractor = useCallback((item: ActivityItem) => item.id, []);

  const ListHeader = useCallback(() => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>Recent Activity</Text>
    </View>
  ), []);

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
        {/* Activity Feed with FlatList for virtualization */}
        <FlatList
          data={MOCK_ACTIVITY_DATA}
          renderItem={renderActivityItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeader}
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {paddingBottom: dynamicBottomTabHeight + theme.spacing.s}
          ]}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={5}
          initialNumToRender={5}
          windowSize={5}
        />

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
});
