import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { mount, shallow } from 'enzyme';
import * as expect from 'expect';
import { describe, it, specs } from 'storybook-addon-specifications';

import * as React from 'react';
import Widget, { WidgetProps } from '.';

const stories = storiesOf('Widget', module);
stories.addDecorator(withKnobs);

stories.add('widget', () => {
  const Component = ({ value }: { value: string }) => <div>{value}</div>;

  const componentProps: WidgetProps['props'] = {
    data: {
      value: text('text', '😀😀😀'),
    },
    state: select('state', ['ready', 'loading', 'error'], 'ready'),
  };

  const story = (props: WidgetProps['props']) => {
    return <Widget props={props} component={Component} />;
  };

  specs(() =>
    describe('widget', () => {
      it('displays widget when state is `ready`', () => {
        const el = story({ data: { value: 'foo' }, state: 'ready' });
        const output = shallow(el);

        expect(output.containsMatchingElement(Component({ value: 'foo' })));
      });

      it('displays error when state is `error`', () => {
        const el = story({ data: { value: 'foo' }, state: 'error' });
        const output = mount(el);

        expect(
          output
            .find('h4')
            .last()
            .text()
            .includes('Something went wrong'),
        ).toBeTruthy();
      });

      it('displays Loader when state is `loading`', () => {
        const el = story({ data: { value: 'foo' }, state: 'loading' });
        const output = mount(el);

        expect(output.find('svg.loader').exists()).toBeTruthy();
      });
    }),
  );

  return story(componentProps);
});
