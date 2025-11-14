// ==========================================================================
// SEARCH ICON COMPONENT
//
// SVG search icon (magnifying glass).
//
// Dependencies: react-native-svg
// Used by: HomePage navigation bar
// ==========================================================================

import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

// === TYPES ===

type SearchIconProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const SearchIcon: React.FC<SearchIconProps> = ({
  size = 24,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="11"
        cy="11"
        r="8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 21L16.65 16.65"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
