import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import * as React from 'react';
import Widget, { WidgetProps } from '.';

const stories = storiesOf('Widget', module);
stories.addDecorator(withKnobs);

stories.add('widget', () => {
  const Component = ({ value }: { value: string }) => <div>{value}</div>;

  const componentProps: WidgetProps['props'] = {
    props: {
      value: text('text', '😀😀😀'),
    },
    state: select('state', ['ready', 'loading', 'error'], 'ready'),
  };

  return <Widget props={componentProps} component={Component} />;
});
