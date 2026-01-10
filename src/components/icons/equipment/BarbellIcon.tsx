// ==========================================================================
// BARBELL ICON
//
// Equipment icon for barbell exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// ==========================================================================

import React from 'react';
import Svg, {Rect} from 'react-native-svg';

type BarbellIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const BarbellIcon: React.FC<BarbellIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left collar - 50w x 50h */}
      <Rect fill={color} x="0" y="225" width="50" height="50" />

      {/* Left outer plate - 50w, 300h */}
      <Rect fill={color} x="70" y="100" width="50" height="300" />

      {/* Left inner plate - 50w, 400h */}
      <Rect fill={color} x="140" y="50" width="50" height="400" />

      {/* Bar - centered, 580w x 50h */}
      <Rect fill={color} x="210" y="225" width="580" height="50" />

      {/* Right inner plate - 50w, 400h */}
      <Rect fill={color} x="810" y="50" width="50" height="400" />

      {/* Right outer plate - 50w, 300h */}
      <Rect fill={color} x="880" y="100" width="50" height="300" />

      {/* Right collar - 50w x 50h */}
      <Rect fill={color} x="950" y="225" width="50" height="50" />
    </Svg>
  );
};
