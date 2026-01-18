// ==========================================================================
// COMPONENT - CheckmarkRegular Icon
//
// Regular checkmark with standard thickness.
// 1000x1000 viewBox (square aspect ratio).
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Completed states, confirmation indicators
// ==========================================================================

import React from 'react';
import Svg, {Polygon} from 'react-native-svg';

// === TYPES ===

type CheckmarkRegularProps = {
  size?: number;
  color?: string;
};

// === COMPONENT ===

export const CheckmarkRegular: React.FC<CheckmarkRegularProps> = ({
  size = 32,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Left diagonal: left center to bottom */}
      <Polygon points="0,500 200,500 467,1000 267,1000" fill={color} />

      {/* Right diagonal: upper right to bottom */}
      <Polygon points="800,0 1000,0 467,1000 267,1000" fill={color} />
    </Svg>
  );
};
