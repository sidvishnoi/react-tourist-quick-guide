import * as React from 'react';

interface LoaderProps {
  size?: number;
  color?: string;
  speed?: 'fast' | 'slow' | 'normal';
}

const enum Duration {
  slow = 1.5,
  normal = 1,
  fast = 0.5,
}

export default function Loader(props: LoaderProps) {
  const { size = 50, color = '#ff8a00', speed = 'normal' } = props;
  const duration =
    speed === 'normal'
      ? Duration.normal
      : speed === 'fast'
      ? Duration.fast
      : Duration.slow;
  // from: https://samherbert.net/svg-loaders/
  return (
    <svg
      width={size.toString()}
      height={size.toString()}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      className="loader"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur={`${duration}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}
