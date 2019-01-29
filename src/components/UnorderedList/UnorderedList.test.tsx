import React = require('react');
import * as renderer from 'react-test-renderer';

import UnorderedList from '.';

describe('Component - UnorderedList', () => {
  it('renders empty list', () => {
    const tree = renderer.create(<UnorderedList items={[]} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders list with plain text items', () => {
    const items = ['one', 'two'];
    const tree = renderer.create(<UnorderedList items={items} />);
    expect(tree).toMatchSnapshot();
  });

  it('renders list with JSX items', () => {
    const items = [<span>one</span>, <span>two</span>];
    const tree = renderer.create(<UnorderedList items={items} />);
    expect(tree).toMatchSnapshot();
  });
});
