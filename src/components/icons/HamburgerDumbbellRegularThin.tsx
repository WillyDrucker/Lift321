// ==========================================================================
// ICON COMPONENT - Hamburger Dumbbell Regular Thin
//
// Thin hamburger menu icon with dumbbell styling (narrow middle bar).
// Canvas: 1000 x 750, Bar height: 150 units, Gap: 150 units
// Middle bar: 400u width centered
//
// Usage: Navigation menu toggle icon with dumbbell motif
// ==========================================================================

import React from 'react';
import Svg, {Rect} from 'react-native-svg';

// === TYPES ===
type HamburgerDumbbellRegularThinProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===
export const HamburgerDumbbellRegularThin: React.FC<HamburgerDumbbellRegularThinProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 750" fill="none">
      {/* Top bar - full width, 150u height, at top edge */}
      <Rect fill={color} x="0" y="0" width="1000" height="150" />
      {/* Middle bar - 400u width, 150u height (dumbbell grip) */}
      <Rect fill={color} x="300" y="300" width="400" height="150" />
      {/* Bottom bar - full width, 150u height */}
      <Rect fill={color} x="0" y="600" width="1000" height="150" />
    </Svg>
  );
};
