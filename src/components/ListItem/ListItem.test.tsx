import React = require('react');
import * as renderer from 'react-test-renderer';

import ListItem from '.';

describe('Component - ListItem', () => {
  it('renders empty item', () => {
    const tree = renderer.create(<ListItem />);
    expect(tree).toMatchSnapshot();
  });

  it('renders plain text', () => {
    const tree = renderer.create(<ListItem>PASS</ListItem>);
    expect(tree).toMatchSnapshot();
  });
});
