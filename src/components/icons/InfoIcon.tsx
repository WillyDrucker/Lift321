// ==========================================================================
// INFO ICON COMPONENT
//
// SVG info/help icon (question mark in circle).
// Used for guide/help button in top navigation.
//
// Dependencies: react-native-svg
// Used by: TopNavBar
// ==========================================================================

import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

// === TYPES ===

type InfoIconProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const InfoIcon: React.FC<InfoIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Circle outline */}
      <Circle
        cx={12}
        cy={12}
        r={9}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Question mark top curve and stem */}
      <Path
        d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Question mark dot */}
      <Path
        d="M12 17H12.01"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
