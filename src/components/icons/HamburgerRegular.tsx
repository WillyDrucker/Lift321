// ==========================================================================
// HAMBURGER REGULAR ICON COMPONENT
//
// Standard rectangular hamburger menu icon.
// Canvas: 1000x1000, no dead space.
//
// Dependencies: react-native-svg
// Used by: TopNavBar (option 1)
// ==========================================================================

import React from 'react';
import Svg, {Rect} from 'react-native-svg';

// === TYPES ===

type HamburgerRegularProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const HamburgerRegular: React.FC<HamburgerRegularProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Top bar */}
      <Rect fill={color} x="0" y="0" width="1000" height="200" />
      {/* Middle bar */}
      <Rect fill={color} x="0" y="400" width="1000" height="200" />
      {/* Bottom bar */}
      <Rect fill={color} x="0" y="800" width="1000" height="200" />
    </Svg>
  );
};
