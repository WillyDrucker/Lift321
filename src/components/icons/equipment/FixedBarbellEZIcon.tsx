// ==========================================================================
// FIXED BARBELL EZ ICON
//
// Equipment icon for fixed EZ barbell exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// Style: Gym-Trek Bold (45° angles)
// ==========================================================================

import React from 'react';
import Svg, {Polygon} from 'react-native-svg';

type FixedBarbellEZIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const FixedBarbellEZIcon: React.FC<FixedBarbellEZIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left plate (consolidated) - 45° angles on left */}
      <Polygon fill={color} points="100,100 100,400 50,400 0,350 0,150 50,100" />

      {/* EZ bar (consolidated) */}
      <Polygon fill={color} points="120,225 220,225 310,275 400,225 600,225 690,275 780,225 880,225 880,275 780,275 690,325 600,275 400,275 310,325 220,275 120,275" />

      {/* Right plate (consolidated) - 45° angles on right */}
      <Polygon fill={color} points="900,100 950,100 1000,150 1000,350 950,400 900,400" />
    </Svg>
  );
};
