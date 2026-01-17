// ==========================================================================
// COMPONENT - ChevronGymTrekAlt Icon
//
// Alternative Gym-Trek style chevron with smaller blocky elements.
// 1000x1000 viewBox with 100px geometric shapes.
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Navigation headers, back buttons
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

// === TYPES ===

type ChevronGymTrekAltProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const ChevronGymTrekAlt: React.FC<ChevronGymTrekAltProps> = ({
  size = 32,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Top edge boxes */}
      <Rect x="400" y="0" width="100" height="100" fill={color} />
      <Rect x="500" y="0" width="100" height="100" fill={color} />

      {/* Bottom centered boxes */}
      <Rect x="400" y="900" width="100" height="100" fill={color} />
      <Rect x="500" y="900" width="100" height="100" fill={color} />

      {/* Left edge boxes */}
      <Rect x="0" y="400" width="100" height="100" fill={color} />
      <Rect x="100" y="400" width="100" height="100" fill={color} />
      <Rect x="0" y="500" width="100" height="100" fill={color} />

      {/* Upper diagonal */}
      <Polygon points="500,0 600,100 200,500 0,500" fill={color} />

      {/* Lower diagonal */}
      <Polygon points="0,500 200,500 600,900 500,1000" fill={color} />
    </Svg>
  );
};
