// ==========================================================================
// EZ BAR ICON
//
// Equipment icon for EZ bar exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

type EZBarIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const EZBarIcon: React.FC<EZBarIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left collar */}
      <Rect fill={color} x="0" y="225" width="50" height="50" />

      {/* Left outer plate */}
      <Rect fill={color} x="70" y="100" width="50" height="300" />

      {/* Left inner plate */}
      <Rect fill={color} x="140" y="50" width="50" height="400" />

      {/* EZ bar (consolidated) */}
      <Polygon fill={color} points="210,225 310,225 367.5,275 425,225 575,225 632.5,275 690,225 790,225 790,275 690,275 632.5,325 575,275 425,275 367.5,325 310,275 210,275" />

      {/* Right inner plate */}
      <Rect fill={color} x="810" y="50" width="50" height="400" />

      {/* Right outer plate */}
      <Rect fill={color} x="880" y="100" width="50" height="300" />

      {/* Right collar */}
      <Rect fill={color} x="950" y="225" width="50" height="50" />
    </Svg>
  );
};
