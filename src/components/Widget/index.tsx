import * as React from 'react';
import styled from 'styled-components';

import Loader from '../Loader';

export interface WidgetProps {
  props: {
    state: string;
    props: any;
  };
  component: any;
}

const Widget = styled.div`
  background: #fff;
  padding: 1rem;

  @media print {
    padding: 0;
  }
`;

// widget in loading or error state
const PassiveWidget = styled(Widget)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
`;

export default function({ props, component: Component }: WidgetProps) {
  if (!props || !props.props || props.state !== 'ready') {
    return (
      <PassiveWidget>
        {props.state === 'loading' ? <Loader /> : <Error />}
      </PassiveWidget>
    );
  }

  return (
    <Widget>
      <Component {...props.props} />
    </Widget>
  );
}

function Error() {
  return (
    <>
      <p style={{ fontSize: '2em', margin: 0 }}>😞</p>
      <h4 style={{ margin: 0 }}>Something went wrong.</h4>
    </>
  );
}
