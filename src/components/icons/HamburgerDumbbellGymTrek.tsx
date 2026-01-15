// ==========================================================================
// HAMBURGER DUMBBELL GYM-TREK ICON COMPONENT
//
// Dumbbell-style hamburger with 45° chamfered corners and narrow middle bar.
// Canvas: 1000x1000, no dead space.
//
// Dependencies: react-native-svg
// Used by: TopNavBar (option 4)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

// === TYPES ===

type HamburgerDumbbellGymTrekProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const HamburgerDumbbellGymTrek: React.FC<HamburgerDumbbellGymTrekProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Top bar - 45° chamfers on top corners */}
      <Polygon fill={color} points="200,0 800,0 1000,200 0,200" />
      {/* Middle bar - narrow (dumbbell handle) */}
      <Rect fill={color} x="300" y="400" width="400" height="200" />
      {/* Bottom bar - 45° chamfers on bottom corners */}
      <Polygon fill={color} points="0,800 1000,800 800,1000 200,1000" />
    </Svg>
  );
};
