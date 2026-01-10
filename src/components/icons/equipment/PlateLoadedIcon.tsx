// ==========================================================================
// PLATE LOADED ICON
//
// Equipment icon for plate-loaded machine exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon, Path} from 'react-native-svg';

type PlateLoadedIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const PlateLoadedIcon: React.FC<PlateLoadedIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Far left square */}
      <Rect fill={color} x="0" y="150" width="50" height="50" />

      {/* Far left upright */}
      <Rect fill={color} x="70" y="75" width="50" height="200" />

      {/* Left upright */}
      <Rect fill={color} x="140" y="25" width="50" height="300" />

      {/* Left handle + angled arm (consolidated) */}
      <Polygon fill={color} points="210,150 260,150 405,0 455,0 455,50 405,50 260,200 210,200" />

      {/* Right handle + angled arm (consolidated) */}
      <Polygon fill={color} points="545,0 595,0 740,150 790,150 790,200 740,200 595,50 545,50" />

      {/* Right upright */}
      <Rect fill={color} x="810" y="25" width="50" height="300" />

      {/* Far right upright */}
      <Rect fill={color} x="880" y="75" width="50" height="200" />

      {/* Far right square */}
      <Rect fill={color} x="950" y="150" width="50" height="50" />

      {/* Left weight stack guide rail */}
      <Rect fill={color} x="300" y="0" width="50" height="500" />

      {/* Right weight stack guide rail */}
      <Rect fill={color} x="650" y="0" width="50" height="500" />

      {/* Upper center column */}
      <Rect fill={color} x="475" y="0" width="50" height="50" />

      {/* Center frame: trapezoid + arms + first bar (with interior hole) */}
      <Path fill={color} fillRule="evenodd" d="M475,70 L525,70 L550,70 L600,120 L600,360 L400,360 L400,120 L450,70 Z M450,120 L550,120 L550,310 L450,310 Z" />

      {/* Second weight stack bar */}
      <Rect fill={color} x="400" y="380" width="200" height="50" />
    </Svg>
  );
};
