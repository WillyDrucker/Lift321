// ==========================================================================
// CABLE MACHINE ICON
//
// Equipment icon for cable machine exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// Style: Gym-Trek Bold (45° angles)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

type CableMachineIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const CableMachineIcon: React.FC<CableMachineIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Top frame with horizontal bars (consolidated) */}
      <Polygon fill={color} points="60,150 260,150 405,0 475,0 525,0 595,0 740,150 940,150 940,200 740,200 595,50 525,50 475,50 405,50 260,200 60,200" />

      {/* Center cable - top section */}
      <Rect fill={color} x="490" y="70" width="20" height="150" />

      {/* Center cable - through weight stack */}
      <Rect fill={color} x="490" y="240" width="20" height="260" />

      {/* Left weight stack guide rail */}
      <Rect fill={color} x="300" y="0" width="50" height="500" />

      {/* Right weight stack guide rail */}
      <Rect fill={color} x="650" y="0" width="50" height="500" />

      {/* Weight stack - 4 horizontal bars */}
      <Rect fill={color} x="400" y="240" width="200" height="50" />
      <Rect fill={color} x="400" y="310" width="200" height="50" />
      <Rect fill={color} x="400" y="380" width="200" height="50" />
      <Rect fill={color} x="400" y="450" width="200" height="50" />
    </Svg>
  );
};
