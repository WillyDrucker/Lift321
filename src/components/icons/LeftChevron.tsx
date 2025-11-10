// ==========================================================================
// COMPONENT - LeftChevron Icon
//
// SVG chevron pointing left for back/previous navigation.
// 32x32 viewBox with 3px stroke width, rounded caps and joins.
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Navigation headers, back buttons
// ==========================================================================

import React from 'react';
import Svg, {Path} from 'react-native-svg';

// === TYPES ===

interface LeftChevronProps {
  size?: number;
  color?: string;
}

// === COMPONENT ===

export const LeftChevron: React.FC<LeftChevronProps> = ({
  size = 32,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M20 24L12 16L20 8"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
