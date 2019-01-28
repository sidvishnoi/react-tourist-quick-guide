import React = require('react');
import * as renderer from 'react-test-renderer';

import Ad from '.';

describe('Component - Ad', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<Ad />);
    expect(tree).toMatchSnapshot();
  });
});
