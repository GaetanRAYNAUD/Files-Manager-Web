import type { FC } from 'react';

interface Props {
  width?: string;
  height?: string;
}

export const TwitchLogo: FC<Props> = ({ width = 32, height = 32 }) => {
  return (
    <svg
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      viewBox='0 0 2400 2800'
      xmlSpace='preserve'
      width={width}
      height={height}
    >
      <g>
        <polygon fill='#FFFFFF' points='2200,1300 1800,1700 1400,1700 1050,2050 1050,1700 600,1700 600,200 2200,200' />
        <g>
          <g id='Layer_1-2'>
            <path
              fill='#9146FF' d='M500,0L0,500v1800h600v500l500-500h400l900-900V0H500z M2200,1300l-400,400h-400l-350,
              350v-350H600V200h1600 V1300z'
            />
            <rect x='1700' y='550' fill='#9146FF' width='200' height='600' />
            <rect x='1150' y='550' fill='#9146FF' width='200' height='600' />
          </g>
        </g>
      </g>
    </svg>
  );
};