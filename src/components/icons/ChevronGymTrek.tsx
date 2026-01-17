// ==========================================================================
// COMPONENT - ChevronGymTrek Icon
//
// Gym-Trek style chevron with blocky pixel-art aesthetic.
// 1000x1000 viewBox with thick geometric shapes.
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Navigation headers, back buttons
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

// === TYPES ===

type ChevronGymTrekProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const ChevronGymTrek: React.FC<ChevronGymTrekProps> = ({
  size = 32,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Top center 200x200 box */}
      <Rect x="400" y="0" width="200" height="200" fill={color} />

      {/* Bottom center 200x200 box */}
      <Rect x="400" y="800" width="200" height="200" fill={color} />

      {/* Left center 200x200 box */}
      <Rect x="0" y="400" width="200" height="200" fill={color} />

      {/* Diagonal connecting top box right edge to left box left edge */}
      <Polygon points="600,0 600,200 0,600 0,400" fill={color} />

      {/* Diagonal connecting left box left edge to bottom box right edge */}
      <Polygon points="0,400 0,600 600,1000 600,800" fill={color} />
    </Svg>
  );
};
