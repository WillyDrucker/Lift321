// ==========================================================================
// COMPONENT - ChevronRegular Icon
//
// Regular chevron with standard thickness.
// 600x1000 viewBox (narrower aspect ratio).
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Navigation headers, back buttons
// ==========================================================================

import React from 'react';
import Svg, {Polygon} from 'react-native-svg';

// === TYPES ===

type ChevronRegularProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const ChevronRegular: React.FC<ChevronRegularProps> = ({
  size = 32,
  color = 'currentColor',
}) => {
  // Maintain aspect ratio: 600x1000 = 0.6:1
  const width = size * 0.6;
  const height = size;

  return (
    <Svg width={width} height={height} viewBox="0 0 600 1000" fill="none">
      {/* Upper diagonal */}
      <Polygon points="500,0 600,100 200,500 0,500" fill={color} />

      {/* Lower diagonal */}
      <Polygon points="0,500 200,500 600,900 500,1000" fill={color} />
    </Svg>
  );
};
