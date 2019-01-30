import React = require('react');
import * as renderer from 'react-test-renderer';

import Loader from '.';

describe('Component - Loader', () => {
  it('matches snapshot - default', () => {
    const tree = renderer.create(<Loader />);
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot - option overrides', () => {
    const tree = renderer.create(
      <Loader size={100} color="red" speed="fast" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
