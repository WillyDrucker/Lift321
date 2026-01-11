// ==========================================================================
// HAMBURGER ICON COMPONENT
//
// SVG hamburger menu icon (three horizontal lines).
//
// Dependencies: react-native-svg
// Used by: MainActivity header
// ==========================================================================

import React from 'react';
import Svg, {Path} from 'react-native-svg';

// === TYPES ===

type HamburgerIconProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M0 12H24M0 6H24M0 18H24"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
