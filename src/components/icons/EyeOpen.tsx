// ==========================================================================
// COMPONENT - EyeOpen Icon
//
// SVG eye icon for showing password (eye open state).
// Simple line-based design with 2px stroke, rounded caps.
//
// Philosophy: Reusable icon component with customizable color and size
// Dependencies: react-native-svg
// Used by: Password input fields, visibility toggles
// ==========================================================================

import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

// === TYPES ===

interface EyeOpenProps {
  size?: number;
  color?: string;
}

// === COMPONENT ===

export const EyeOpen: React.FC<EyeOpenProps> = ({
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={3}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
