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
// Dependencies: theme tokens, AppLayout, activity feed data
// Used by: Bottom tab navigation (activeTab='social')
// ==========================================================================

import React, {useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type {ActivityItem} from '@/data/mockActivityData';
import {theme} from '@/theme';
import type {TabScreenProps} from '@/navigation/types';
import {AppLayout, ActivityFeedCard} from '@/components';
import {MOCK_ACTIVITY_DATA} from '@/data/mockActivityData';

// ============================================================================
// TYPES
// ============================================================================

type SocialScreenProps = TabScreenProps<'SocialScreen'>;

// ============================================================================
// COMPONENT
// ============================================================================

export const SocialScreen: React.FC<SocialScreenProps> = ({navigation}) => {
  // ==========================================================================
  // EVENT HANDLERS
  // ==========================================================================

  const handleNavigate = useCallback((screen: string) => {
    navigation.navigate(screen as any);
  }, [navigation]);

  const handleActivityPress = useCallback((activityId: string) => {
    console.log('Activity pressed:', activityId);
  }, []);

  const handleLikePress = useCallback((activityId: string) => {
    console.log('Like pressed:', activityId);
  }, []);

  const handleCommentPress = useCallback((activityId: string) => {
    console.log('Comment pressed:', activityId);
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
    <AppLayout onNavigate={handleNavigate}>
      <FlatList
        data={MOCK_ACTIVITY_DATA}
        renderItem={renderActivityItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        initialNumToRender={5}
        windowSize={5}
      />
    </AppLayout>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },

  listContent: {
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
