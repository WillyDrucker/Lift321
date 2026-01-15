// ==========================================================================
// ICON COMPONENT - Hamburger Regular Thin
//
// Thin hamburger menu icon with standard rectangular bars.
// Canvas: 1000 x 750, Bar height: 150 units, Gap: 150 units
//
// Usage: Navigation menu toggle icon
// ==========================================================================

import React from 'react';
import Svg, {Rect} from 'react-native-svg';

// === TYPES ===
type HamburgerRegularThinProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===
export const HamburgerRegularThin: React.FC<HamburgerRegularThinProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 750" fill="none">
      {/* Top bar - full width, 150u height, at top edge */}
      <Rect fill={color} x="0" y="0" width="1000" height="150" />
      {/* Middle bar - full width, 150u height */}
      <Rect fill={color} x="0" y="300" width="1000" height="150" />
      {/* Bottom bar - full width, 150u height */}
      <Rect fill={color} x="0" y="600" width="1000" height="150" />
    </Svg>
  );
};
