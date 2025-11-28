// ==========================================================================
// VIDEO CARD COMPONENT
//
// Collapsible card displaying a tutorial video for the current exercise.
// Uses react-native-youtube-iframe for reliable playback.
//
// Dependencies: theme tokens, react-native-youtube-iframe
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {theme} from '@/theme';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ============================================================================
// TYPES
// ============================================================================

type VideoCardProps = {
  exerciseName?: string;
  videoId?: string; // Optional prop to pass specific video ID later
};

// ============================================================================
// COMPONENT
// ============================================================================

export const VideoCard: React.FC<VideoCardProps> = ({
  exerciseName = 'EXERCISE',
  videoId = 'dQw4w9WgXcQ' // Original Rickroll
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.header, expanded && styles.headerExpanded]} 
        onPress={toggleExpand}
        activeOpacity={0.7}
      >
        <Text style={styles.exerciseName} numberOfLines={1} ellipsizeMode="tail">
            {exerciseName.toUpperCase()}
        </Text>
        <Text style={styles.chevron}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.videoContent}>
            <YoutubePlayer
              height={220}
              play={false}
              videoId={videoId}
              forceAndroidAutoplay={false}
              initialPlayerParams={{
                modestbranding: true,
                rel: false,
              }}
              webViewStyle={{opacity: 0.99}} // Hack to prevent some Android rendering glitches
            />
        </View>
      )}
    </View>
  );
};


// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.s,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: theme.spacing.s,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.borderDefault,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
    height: 60,
  },
  headerExpanded: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderDefault,
  },
  exerciseName: {
    flex: 1,
    fontSize: theme.typography.fontSize.l,
    color: theme.colors.actionSuccess,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
  },
  chevron: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginLeft: 8,
  },
  videoContent: {
    width: '100%',
    // backgroundColor: '#000', // Removed to avoid black bars if aspect ratio differs
  },
});
