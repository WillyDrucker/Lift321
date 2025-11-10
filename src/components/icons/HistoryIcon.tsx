// ==========================================================================
// HISTORY ICON COMPONENT
//
// SVG history icon (clock with arrow).
//
// Dependencies: react-native-svg
// Used by: Bottom navigation bar
// ==========================================================================

import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

// === TYPES ===

type HistoryIconProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const HistoryIcon: React.FC<HistoryIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={9}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 6V12L16 14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 12H1M5 5L3.5 3.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
