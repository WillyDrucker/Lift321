import React from 'react';
import Svg, {Circle, Ellipse, G, Path} from 'react-native-svg';

type PlateIconQuadGripProps = {
  size?: number;
  color?: string;
};

export const PlateIconQuadGrip: React.FC<PlateIconQuadGripProps> = ({
  size = 28,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1000 1000" fill="none">
      {/* Outer ring */}
      <Circle
        cx="500"
        cy="500"
        r="465"
        stroke={color}
        strokeWidth={60}
        fill="none"
      />

      {/* Small 6-tooth gear around center */}
      <Path
        d="M480 370 L520 370 L520 420 L555 440 L580 395 L620 425 L580 465 L620 485 L620 515 L580 535 L620 575 L580 605 L555 560 L520 580 L520 630 L480 630 L480 580 L445 560 L420 605 L380 575 L420 535 L380 515 L380 485 L420 465 L380 425 L420 395 L445 440 L480 420 Z"
        stroke={color}
        strokeWidth={30}
        strokeLinejoin="round"
        fill="none"
      />

      {/* Center hole (for barbell) */}
      <Circle
        cx="500"
        cy="500"
        r="60"
        stroke={color}
        strokeWidth={30}
        fill="none"
      />

      {/* Grip hole cutouts - 4 oval slots near outer ring */}
      {/* Top grip hole (horizontal) */}
      <Ellipse
        cx="500"
        cy="120"
        rx="135"
        ry="53"
        stroke={color}
        strokeWidth={60}
        fill="none"
      />

      {/* Right grip hole (vertical) */}
      <G transform="rotate(90, 880, 500)">
        <Ellipse
          cx="880"
          cy="500"
          rx="135"
          ry="53"
          stroke={color}
          strokeWidth={60}
          fill="none"
        />
      </G>

      {/* Bottom grip hole (horizontal) */}
      <Ellipse
        cx="500"
        cy="880"
        rx="135"
        ry="53"
        stroke={color}
        strokeWidth={60}
        fill="none"
      />

      {/* Left grip hole (vertical) */}
      <G transform="rotate(90, 120, 500)">
        <Ellipse
          cx="120"
          cy="500"
          rx="135"
          ry="53"
          stroke={color}
          strokeWidth={60}
          fill="none"
        />
      </G>
    </Svg>
  );
};
