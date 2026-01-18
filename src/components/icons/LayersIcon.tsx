// ==========================================================================
// LAYERS ICON COMPONENT
//
// Toggle icon showing stacked layers (full view) or single layer (compact view).
// Used for view mode switching.
//
// Dependencies: react-native-svg
// Used by: ActiveWorkoutScreen
// ==========================================================================

import React from 'react';
import Svg, {Rect} from 'react-native-svg';

// ============================================================================
// TYPES
// ============================================================================

type LayersIconProps = {
  size?: number;
  color?: string;
  variant?: 'stacked' | 'single';
};

// ============================================================================
// COMPONENT
// ============================================================================

export const LayersIcon: React.FC<LayersIconProps> = ({
  size = 32,
  color = '#FFFFFF',
  variant = 'stacked',
}) => {
  if (variant === 'single') {
    // Single layer - one rectangle centered
    return (
      <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <Rect
          x={4}
          y={11}
          width={24}
          height={10}
          rx={2}
          fill={color}
        />
      </Svg>
    );
  }

  // Stacked layers - three rectangles
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Top layer */}
      <Rect
        x={4}
        y={4}
        width={24}
        height={6}
        rx={2}
        fill={color}
      />
      {/* Middle layer */}
      <Rect
        x={4}
        y={13}
        width={24}
        height={6}
        rx={2}
        fill={color}
      />
      {/* Bottom layer */}
      <Rect
        x={4}
        y={22}
        width={24}
        height={6}
        rx={2}
        fill={color}
      />
    </Svg>
  );
};
