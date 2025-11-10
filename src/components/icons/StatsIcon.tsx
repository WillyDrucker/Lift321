// ==========================================================================
// STATS ICON COMPONENT
//
// SVG statistics icon (bar chart).
//
// Dependencies: react-native-svg
// Used by: Bottom navigation bar
// ==========================================================================

import React from 'react';
import Svg, {Path} from 'react-native-svg';

// === TYPES ===

type StatsIconProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const StatsIcon: React.FC<StatsIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 20V10M12 20V4M6 20V14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
