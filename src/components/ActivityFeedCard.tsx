// ==========================================================================
// ACTIVITY FEED CARD COMPONENT
//
// Card component for displaying user activity in the social feed.
// Shows workout completions, achievements, and personal records.
//
// Dependencies: theme tokens, mock activity data types
// Used by: SocialScreen
// ==========================================================================

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '@/theme';
import type {ActivityItem} from '@/data/mockActivityData';
import {getRelativeTime} from '@/data/mockActivityData';

// ============================================================================
// TYPES
// ============================================================================

type ActivityFeedCardProps = {
  activity: ActivityItem;
  onPress?: () => void;
  onLikePress?: () => void;
  onCommentPress?: () => void;
};

// ============================================================================
// COMPONENT
// ============================================================================

export const ActivityFeedCard: React.FC<ActivityFeedCardProps> = React.memo(({
  activity,
  onPress,
  onLikePress,
  onCommentPress,
}) => {
  // Determine activity badge color based on type
  const getBadgeColor = () => {
    switch (activity.type) {
      case 'personal_record':
        return theme.colors.actionSuccess; // Green for PRs
      case 'achievement':
        return theme.colors.achievementGold;
      case 'workout_completed':
      default:
        return theme.colors.textSecondary; // Gray for regular workouts
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}>
      {/* Header: User info and timestamp */}
      <View style={styles.header}>
        {/* User Avatar Placeholder */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {activity.userName.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* User name and timestamp */}
        <View style={styles.headerText}>
          <Text style={styles.userName}>{activity.userName}</Text>
          <Text style={styles.timestamp}>
            {getRelativeTime(activity.timestamp)}
          </Text>
        </View>

        {/* Activity type badge */}
        {activity.type === 'personal_record' && (
          <View style={[styles.badge, {borderColor: getBadgeColor()}]}>
            <Text style={[styles.badgeText, {color: getBadgeColor()}]}>PR</Text>
          </View>
        )}
        {activity.type === 'achievement' && (
          <View style={[styles.badge, {borderColor: getBadgeColor()}]}>
            <Text style={[styles.badgeText, {color: getBadgeColor()}]}>🏆</Text>
          </View>
        )}
      </View>

      {/* Activity description */}
      <Text style={styles.description}>{activity.description}</Text>

      {/* Stats row (if present) */}
      {activity.stats && (
        <View style={styles.statsRow}>
          {activity.stats.duration && (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Duration:</Text>
              <Text style={styles.statValue}>{activity.stats.duration} min</Text>
            </View>
          )}
          {activity.stats.sets && (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Sets:</Text>
              <Text style={styles.statValue}>{activity.stats.sets}</Text>
            </View>
          )}
          {activity.stats.weight && (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Weight:</Text>
              <Text style={styles.statValue}>{activity.stats.weight} lbs</Text>
            </View>
          )}
        </View>
      )}

      {/* Action buttons row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onLikePress}
          activeOpacity={0.7}>
          <Text style={styles.actionText}>
            👍 {activity.likes || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={onCommentPress}
          activeOpacity={0.7}>
          <Text style={styles.actionText}>
            💬 {activity.comments || 0}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

ActivityFeedCard.displayName = 'ActivityFeedCard';

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.backgroundPrimary,
    borderRadius: theme.spacing.s,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.s,
  },

  // === HEADER ===
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundTertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.s,
  },

  avatarText: {
    fontSize: theme.typography.fontSize.l,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
  },

  headerText: {
    flex: 1,
  },

  userName: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.textPrimary,
    marginBottom: 2,
  },

  timestamp: {
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textTertiary,
  },

  badge: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: theme.layout.border.thin,
  },

  badgeText: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
  },

  // === DESCRIPTION ===
  description: {
    fontSize: theme.typography.fontSize.m,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.s,
    lineHeight: 20,
  },

  // === STATS ROW ===
  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.m,
    marginBottom: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statLabel: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textTertiary,
    marginRight: 4,
  },

  statValue: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.actionSuccess,
  },

  // === ACTIONS ROW ===
  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.m,
    borderTopWidth: theme.layout.border.thin,
    borderTopColor: theme.colors.backgroundTertiary,
    paddingTop: theme.spacing.s,
  },

  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionText: {
    fontSize: theme.typography.fontSize.s,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.textSecondary,
  },
});
