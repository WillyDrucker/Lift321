// ==========================================================================
// RESISTANCE BAND ICON
//
// Equipment icon for resistance band exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// Style: Gym-Trek Bold (45° angles)
// ==========================================================================

import React from 'react';
import Svg, {Rect, Polygon} from 'react-native-svg';

type ResistanceBandIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const ResistanceBandIcon: React.FC<ResistanceBandIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left handle - vertical bar */}
      <Rect fill={color} x="0" y="100" width="50" height="300" />

      {/* Left handle - top bar */}
      <Rect fill={color} x="70" y="100" width="100" height="50" />

      {/* Left handle - bottom bar */}
      <Rect fill={color} x="70" y="350" width="100" height="50" />

      {/* Left handle - trapezoid */}
      <Polygon fill={color} points="190,100 240,150 240,350 190,400" />

      {/* Right handle - vertical bar */}
      <Rect fill={color} x="950" y="100" width="50" height="300" />

      {/* Right handle - top bar */}
      <Rect fill={color} x="830" y="100" width="100" height="50" />

      {/* Right handle - bottom bar */}
      <Rect fill={color} x="830" y="350" width="100" height="50" />

      {/* Right handle - trapezoid */}
      <Polygon fill={color} points="810,100 760,150 760,350 810,400" />

      {/* Left upper hook (consolidated) */}
      <Polygon fill={color} points="260,275 260,225 304.3,225 325,204.3 325,125 375,75 475,75 475,125 395.7,125 375,145.7 375,225 325,275" />

      {/* Center vertical bar with chamfers (consolidated) */}
      <Polygon fill={color} points="475,75 525,125 525,354.3 545.7,375 525,425 475,375 475,145.7 454.3,125" />

      {/* Right lower hook (consolidated) */}
      <Polygon fill={color} points="740,225 740,275 695.7,275 675,295.7 675,375 625,425 525,425 525,375 604.3,375 625,354.3 625,275 675,225" />
    </Svg>
  );
};
