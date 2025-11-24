// ==========================================================================
// MOCK ACTIVITY DATA
//
// Sample activity feed data for SocialScreen development.
// Provides realistic workout activity posts for UI implementation.
//
// TODO: Replace with real data from backend when social features are implemented
// ==========================================================================

// ============================================================================
// TYPES
// ============================================================================

export type ActivityType = 'workout_completed' | 'achievement' | 'personal_record';

export type ActivityItem = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: ActivityType;
  workoutType?: string;
  timestamp: Date;
  description: string;
  stats?: {
    duration?: number;
    sets?: number;
    weight?: number;
  };
  likes?: number;
  comments?: number;
};

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOCK_ACTIVITY_DATA: ActivityItem[] = [
  {
    id: 'activity-1',
    userId: 'user-1',
    userName: 'John Martinez',
    type: 'workout_completed',
    workoutType: 'CHEST',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    description: 'completed a CHEST workout',
    stats: {
      duration: 45,
      sets: 12,
    },
    likes: 8,
    comments: 2,
  },
  {
    id: 'activity-2',
    userId: 'user-2',
    userName: 'Sarah Chen',
    type: 'personal_record',
    workoutType: 'CHEST',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    description: 'achieved a new personal record - Bench Press 225 lbs!',
    stats: {
      weight: 225,
    },
    likes: 24,
    comments: 7,
  },
  {
    id: 'activity-3',
    userId: 'user-3',
    userName: 'Mike Thompson',
    type: 'workout_completed',
    workoutType: 'LEGS',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    description: 'completed a LEGS workout',
    stats: {
      duration: 52,
      sets: 15,
    },
    likes: 12,
    comments: 3,
  },
  {
    id: 'activity-4',
    userId: 'user-4',
    userName: 'Emma Rodriguez',
    type: 'achievement',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    description: 'earned the "Week Warrior" badge - 5 workouts this week!',
    likes: 18,
    comments: 5,
  },
  {
    id: 'activity-5',
    userId: 'user-5',
    userName: 'David Park',
    type: 'workout_completed',
    workoutType: 'BACK',
    timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000), // 1.5 days ago
    description: 'completed a BACK workout',
    stats: {
      duration: 48,
      sets: 14,
    },
    likes: 9,
    comments: 1,
  },
  {
    id: 'activity-6',
    userId: 'user-6',
    userName: 'Lisa Anderson',
    type: 'personal_record',
    workoutType: 'LEGS',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    description: 'achieved a new personal record - Squat 315 lbs!',
    stats: {
      weight: 315,
    },
    likes: 31,
    comments: 9,
  },
  {
    id: 'activity-7',
    userId: 'user-7',
    userName: 'James Wilson',
    type: 'workout_completed',
    workoutType: 'SHOULDERS',
    timestamp: new Date(Date.now() - 2.5 * 24 * 60 * 60 * 1000), // 2.5 days ago
    description: 'completed a SHOULDERS workout',
    stats: {
      duration: 40,
      sets: 10,
    },
    likes: 7,
    comments: 2,
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get relative time string from timestamp (e.g., "2h ago", "1d ago")
 */
export const getRelativeTime = (timestamp: Date): string => {
  const now = Date.now();
  const diff = now - timestamp.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
};
