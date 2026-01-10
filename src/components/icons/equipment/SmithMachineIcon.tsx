// ==========================================================================
// SMITH MACHINE ICON
//
// Equipment icon for Smith machine exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

type SmithMachineIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const SmithMachineIcon: React.FC<SmithMachineIconProps> = ({
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

      {/* Left horizontal bar */}
      <Rect fill={color} x="210" y="150" width="70" height="50" />

      {/* Right horizontal bar */}
      <Rect fill={color} x="720" y="150" width="70" height="50" />

      {/* Right upright */}
      <Rect fill={color} x="810" y="25" width="50" height="300" />

      {/* Far right upright */}
      <Rect fill={color} x="880" y="75" width="50" height="200" />

      {/* Far right square */}
      <Rect fill={color} x="950" y="150" width="50" height="50" />

      {/* Left guide rail + weight squares + bottom bar (consolidated) */}
      <Polygon fill={color} points="300,0 350,0 350,50 400,50 400,100 350,100 350,250 400,250 400,300 350,300 350,350 400,350 400,400 350,400 350,450 400,450 400,500 250,500 250,450 300,450" />

      {/* Center horizontal bar (barbell) */}
      <Rect fill={color} x="370" y="150" width="260" height="50" />

      {/* Right guide rail + weight squares + bottom bar (consolidated) */}
      <Polygon fill={color} points="650,0 700,0 700,450 750,450 750,500 600,500 600,450 650,450 650,400 600,400 600,350 650,350 650,300 600,300 600,250 650,250 650,100 600,100 600,50 650,50" />
    </Svg>
  );
};
