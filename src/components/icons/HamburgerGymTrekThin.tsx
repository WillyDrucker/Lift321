// ==========================================================================
// ICON COMPONENT - Hamburger Gym-Trek Thin
//
// Thin hamburger menu icon with 45° chamfered corners (Gym-Trek style).
// Canvas: 1000 x 750, Bar height: 150 units, Gap: 150 units
//
// Usage: Navigation menu toggle icon with gym/fitness styling
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

// === TYPES ===
type HamburgerGymTrekThinProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===
export const HamburgerGymTrekThin: React.FC<HamburgerGymTrekThinProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 750" fill="none">
      {/* Top bar - 45° chamfers on top-left and top-right */}
      <Polygon fill={color} points="150,0 850,0 1000,150 0,150" />
      {/* Middle bar - full width, 150u height */}
      <Rect fill={color} x="0" y="300" width="1000" height="150" />
      {/* Bottom bar - 45° chamfers on bottom-left and bottom-right */}
      <Polygon fill={color} points="0,600 1000,600 850,750 150,750" />
    </Svg>
  );
};
