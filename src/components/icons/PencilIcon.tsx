import React from 'react';
import {Svg, Path, SvgProps} from 'react-native-svg';
import {theme} from '@/theme';

export const PencilIcon: React.FC<SvgProps> = ({
  color = theme.colors.textPrimary,
  width = 24,
  height = 24,
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M16.862 4.487L18.549 2.8C18.9397 2.40933 19.4696 2.18985 20.0222 2.18985C20.5748 2.18985 21.1047 2.40933 21.4954 2.8C21.8861 3.19067 22.1056 3.72056 22.1056 4.27316C22.1056 4.82577 21.8861 5.35565 21.4954 5.74633L10.675 16.5667C10.2948 16.9465 9.8103 17.2075 9.28299 17.3167L5.5 18.1L6.283 14.3167C6.39215 13.7893 6.65318 13.3049 7.03299 12.9247L16.862 4.487ZM16.862 4.487L19.5 7.125"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
