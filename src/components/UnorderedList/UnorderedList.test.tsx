import React = require('react');
import * as renderer from 'react-test-renderer';

import UnorderedList from '.';

describe('Component - UnorderedList', () => {
  it('renders nothing if no items or children provided', () => {
    const tree = renderer.create(<UnorderedList />);
    expect(tree).toMatchSnapshot();
  });

  it('renders empty list if items is empty array', () => {
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

  it('renders JSX children', () => {
    const tree = renderer.create(
      <UnorderedList>
        <span>one</span>
        <span>two</span>
      </UnorderedList>,
    );
    expect(tree).toMatchSnapshot();
  });
});
