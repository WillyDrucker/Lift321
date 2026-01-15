// ==========================================================================
// HAMBURGER GYM-TREK ICON COMPONENT
//
// Gym-Trek style hamburger with 45° chamfered corners on top and bottom bars.
// Canvas: 1000x1000, no dead space.
//
// Dependencies: react-native-svg
// Used by: TopNavBar (option 2)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

// === TYPES ===

type HamburgerGymTrekProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const HamburgerGymTrek: React.FC<HamburgerGymTrekProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Top bar - 45° chamfers on top corners */}
      <Polygon fill={color} points="200,0 800,0 1000,200 0,200" />
      {/* Middle bar */}
      <Rect fill={color} x="0" y="400" width="1000" height="200" />
      {/* Bottom bar - 45° chamfers on bottom corners */}
      <Polygon fill={color} points="0,800 1000,800 800,1000 200,1000" />
    </Svg>
  );
};
