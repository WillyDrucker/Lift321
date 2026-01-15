// ==========================================================================
// ICON COMPONENT - Hamburger Dumbbell Gym-Trek Thin
//
// Thin hamburger menu icon with dumbbell styling and 45° chamfered corners.
// Canvas: 1000 x 750, Bar height: 150 units, Gap: 150 units
// Middle bar: 400u width centered
//
// Usage: Navigation menu toggle icon combining dumbbell and gym-trek styles
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

// === TYPES ===
type HamburgerDumbbellGymTrekThinProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===
export const HamburgerDumbbellGymTrekThin: React.FC<HamburgerDumbbellGymTrekThinProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 750" fill="none">
      {/* Top bar - 45° chamfers on top-left and top-right */}
      <Polygon fill={color} points="150,0 850,0 1000,150 0,150" />
      {/* Middle bar - 400u width, 150u height (dumbbell grip) */}
      <Rect fill={color} x="300" y="300" width="400" height="150" />
      {/* Bottom bar - 45° chamfers on bottom-left and bottom-right */}
      <Polygon fill={color} points="0,600 1000,600 850,750 150,750" />
    </Svg>
  );
};
