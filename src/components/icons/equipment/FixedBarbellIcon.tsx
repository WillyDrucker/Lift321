// ==========================================================================
// FIXED BARBELL ICON
//
// Equipment icon for fixed barbell exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// Style: Gym-Trek Bold (45° angles)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

type FixedBarbellIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const FixedBarbellIcon: React.FC<FixedBarbellIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left plate (consolidated) - 45° angles on left */}
      <Polygon fill={color} points="100,100 100,400 50,400 0,350 0,150 50,100" />

      {/* Bar */}
      <Rect fill={color} x="120" y="225" width="760" height="50" />

      {/* Right plate (consolidated) - 45° angles on right */}
      <Polygon fill={color} points="900,100 950,100 1000,150 1000,350 950,400 900,400" />
    </Svg>
  );
};
