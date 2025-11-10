// ==========================================================================
// COMPONENT - RightChevron Icon
//
// SVG chevron pointing right for forward/next navigation.
// 32x32 viewBox with 3px stroke width, rounded caps and joins.
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Navigation headers, next buttons, forward actions
// ==========================================================================

import React from 'react';
import Svg, {Path} from 'react-native-svg';

// === TYPES ===

interface RightChevronProps {
  size?: number;
  color?: string;
}

// === COMPONENT ===

export const RightChevron: React.FC<RightChevronProps> = ({
  size = 32,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Path
        d="M12 8L20 16L12 24"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
