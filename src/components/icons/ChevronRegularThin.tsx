// ==========================================================================
// COMPONENT - ChevronRegularThin Icon
//
// Thin regular chevron with narrower stroke width.
// 1000x1000 viewBox with width 100 diagonals.
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Navigation headers, back buttons
// ==========================================================================

import React from 'react';
import Svg, {Polygon} from 'react-native-svg';

// === TYPES ===

type ChevronRegularThinProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const ChevronRegularThin: React.FC<ChevronRegularThinProps> = ({
  size = 32,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Upper diagonal - width 100 */}
      <Polygon points="500,0 550,50 100,500 0,500" fill={color} />

      {/* Lower diagonal - width 100, mirrored */}
      <Polygon points="0,500 100,500 550,950 500,1000" fill={color} />
    </Svg>
  );
};
