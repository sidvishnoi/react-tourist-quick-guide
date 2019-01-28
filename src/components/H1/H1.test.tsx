import 'jest-styled-components';
import React = require('react');
import * as renderer from 'react-test-renderer';

import H1 from '.';

describe('Component - H1', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<H1>PASS</H1>);
    expect(tree).toMatchSnapshot();
  });
});
