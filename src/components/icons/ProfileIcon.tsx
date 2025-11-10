// ==========================================================================
// PROFILE ICON COMPONENT
//
// SVG profile icon (user silhouette).
//
// Dependencies: react-native-svg
// Used by: Bottom navigation bar
// ==========================================================================

import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

// === TYPES ===

type ProfileIconProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const ProfileIcon: React.FC<ProfileIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={8}
        r={4}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
