import { configure } from '@storybook/react';
import { configure as configureEnzyme } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const req = require.context('../src/components', true, /\.story\.(t|j)sx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configureEnzyme({ adapter: new Adapter() });
configure(loadStories, module);
