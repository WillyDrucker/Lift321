// ==========================================================================
// HAMBURGER DUMBBELL REGULAR ICON COMPONENT
//
// Dumbbell-style hamburger with narrow middle bar.
// Canvas: 1000x1000, no dead space.
//
// Dependencies: react-native-svg
// Used by: TopNavBar (option 3)
// ==========================================================================

import React from 'react';
import Svg, {Rect} from 'react-native-svg';

// === TYPES ===

type HamburgerDumbbellRegularProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const HamburgerDumbbellRegular: React.FC<HamburgerDumbbellRegularProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Top bar - full width */}
      <Rect fill={color} x="0" y="0" width="1000" height="200" />
      {/* Middle bar - narrow (dumbbell handle) */}
      <Rect fill={color} x="300" y="400" width="400" height="200" />
      {/* Bottom bar - full width */}
      <Rect fill={color} x="0" y="800" width="1000" height="200" />
    </Svg>
  );
};
