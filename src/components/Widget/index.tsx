import * as React from 'react';
import styled from 'styled-components';

export interface WidgetProps {
  props: {
    state: string;
    data: any;
  };
  component: any;
}

const Widget = styled.div`
  background: #fff;
`;

const PassiveWidget = styled(Widget)`
  align-items: 'center';
  display: 'flex';
  flex-direction: 'column';
  justify-content: 'center';
  padding: '1em';
`;

export default function({ props, component: Component }: WidgetProps) {
  if (!props || !props.data || props.state !== 'ready') {
    return (
      <PassiveWidget>
        {props.state === 'loading' ? <Loader /> : <Error />}
      </PassiveWidget>
    );
  }

  return (
    <Widget>
      <Component {...props.data} />
    </Widget>
  );
}

function Loader() {
  // from: https://samherbert.net/svg-loaders/
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#ff8a00"
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
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}

function Error() {
  return (
    <>
      <p style={{ fontSize: '2em' }}>😞</p>
      <h4>Something went wrong.</h4>
    </>
  );
}
