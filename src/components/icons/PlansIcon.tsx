// ==========================================================================
// PLANS ICON COMPONENT
//
// SVG training plans icon (calendar/document).
//
// Dependencies: react-native-svg
// Used by: Bottom navigation bar
// ==========================================================================

import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

// === TYPES ===

type PlansIconProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const PlansIcon: React.FC<PlansIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={4}
        width={18}
        height={18}
        rx={2}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2V6M8 2V6M3 10H21"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
