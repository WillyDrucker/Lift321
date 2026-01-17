// ==========================================================================
// GEAR ICON
//
// Settings gear icon for workout settings bar.
// SVG path creates a classic gear/cog shape.
// Canvas: 1000x1000, no dead space.
//
// Dependencies: react-native-svg
// Used by: WorkoutLayout
// ==========================================================================

import React from 'react';
import Svg, {G, Path} from 'react-native-svg';

type GearIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const GearIcon: React.FC<GearIconProps> = ({
  width = 28,
  height = 28,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 1000 1000" fill="none">
      <G transform="rotate(90, 500, 500)">
        {/* Center circle (settings hole) - 25% larger */}
        <Path
          d="M500 693C610 693 700 603 700 500C700 397 610 307 500 307C390 307 300 397 300 500C300 603 390 693 500 693Z"
          stroke={color}
          strokeWidth={67}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Outer gear shape */}
        <Path
          d="M33 543V457C33 404 73 361 123 361C209 361 244 298 200 221C177 176 190 118 234 93L317 44C353 22 401 36 423 73L429 83C471 160 529 160 571 83L577 73C599 36 647 22 683 44L766 93C810 118 823 176 800 221C756 298 791 361 877 361C927 361 967 404 967 457V543C967 596 927 639 877 639C791 639 756 702 800 779C823 824 810 882 766 907L683 956C647 978 599 964 577 927L571 917C529 840 471 840 429 917L423 927C401 964 353 978 317 956L234 907C190 882 177 824 200 779C244 702 209 639 123 639C73 639 33 596 33 543Z"
          stroke={color}
          strokeWidth={67}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
