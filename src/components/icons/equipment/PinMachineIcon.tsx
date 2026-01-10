// ==========================================================================
// PIN MACHINE ICON
//
// Equipment icon for pin-machine exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

type PinMachineIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const PinMachineIcon: React.FC<PinMachineIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left upright */}
      <Rect fill={color} x="140" y="150" width="50" height="150" />

      {/* Left handle + angled arm (consolidated) */}
      <Polygon fill={color} points="210,150 260,150 405,0 455,0 455,50 405,50 260,200 210,200" />

      {/* Right handle + angled arm (consolidated) */}
      <Polygon fill={color} points="545,0 595,0 740,150 790,150 790,200 740,200 595,50 545,50" />

      {/* Right upright */}
      <Rect fill={color} x="810" y="150" width="50" height="150" />

      {/* Center vertical bar */}
      <Rect fill={color} x="475" y="0" width="50" height="220" />

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
