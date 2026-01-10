// ==========================================================================
// DUMBBELL ICON
//
// Equipment icon for dumbbell exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// Style: Gym-Trek Bold (45° angles, crossed dumbbells)
// ==========================================================================

import React from 'react';
import Svg, {G, Rect, Polygon} from 'react-native-svg';

type DumbbellIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const DumbbellIcon: React.FC<DumbbellIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left dumbbell (rotated -45°) */}
      <G transform="translate(5, 20) rotate(-45, 225, 250)">
        {/* Left collar+plate consolidated */}
        <Polygon fill={color} points="0,150 50,100 100,100 100,400 50,400 0,350" />

        {/* Handle - 210w x 50h */}
        <Rect fill={color} x="120" y="225" width="210" height="50" />

        {/* Right plate+collar consolidated */}
        <Polygon fill={color} points="350,100 400,100 450,150 450,350 400,400 350,400" />
      </G>

      {/* Right dumbbell (rotated 45°) */}
      <G transform="translate(-5, 20) rotate(45, 775, 250)">
        {/* Left collar+plate consolidated */}
        <Polygon fill={color} points="550,150 600,100 650,100 650,400 600,400 550,350" />

        {/* Handle - 210w x 50h */}
        <Rect fill={color} x="670" y="225" width="210" height="50" />

        {/* Right plate+collar consolidated */}
        <Polygon fill={color} points="900,100 950,100 1000,150 1000,350 950,400 900,400" />
      </G>
    </Svg>
  );
};
