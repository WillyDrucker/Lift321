// ==========================================================================
// BODYWEIGHT ICON
//
// Equipment icon for bodyweight exercises in the exercise selector.
// Canvas: 1000 x 500 (2:1 aspect ratio)
// ==========================================================================

import React from 'react';
import Svg, {Rect} from 'react-native-svg';

type BodyweightIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const BodyweightIcon: React.FC<BodyweightIconProps> = ({
  width = 48,
  height = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 500" fill="none">
      {/* Left vertical bar */}
      <Rect fill={color} x="300" y="0" width="50" height="500" />

      {/* Right vertical bar */}
      <Rect fill={color} x="650" y="0" width="50" height="500" />

      {/* Horizontal bar */}
      <Rect fill={color} x="370" y="50" width="260" height="50" />

      {/* Floor */}
      <Rect fill={color} x="0" y="450" width="1000" height="50" />
    </Svg>
  );
};
