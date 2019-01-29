import { mount } from 'enzyme';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import React = require('react');
import * as renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });

import CityMeta from '.';

describe('Componets - CityMeta', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(
      <CityMeta
        onMoveButtonClick={() => null}
        onRemoveButtonClick={() => null}
        name="PASS"
        distance={10}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('calls destroyer on remove button click', () => {
    const onMoveButtonClick = (): null => null;
    const onRemoveButtonClick = jest.fn();

    const output = mount(
      <CityMeta
        onMoveButtonClick={onMoveButtonClick}
        onRemoveButtonClick={onRemoveButtonClick}
        name="PASS"
        distance={10}
      />,
    );
    const removeButton = output.find('button.remove');
    expect(onRemoveButtonClick).not.toHaveBeenCalled();
    removeButton.simulate('click');
    expect(onRemoveButtonClick).toHaveBeenCalledTimes(1);
    expect(onRemoveButtonClick).toHaveBeenLastCalledWith('PASS');
  });

  it('calls mover on move button click', () => {
    const onRemoveButtonClick = (): null => null;
    const onMoveButtonClick = jest.fn();

    const output = mount(
      <CityMeta
        onMoveButtonClick={onMoveButtonClick}
        onRemoveButtonClick={onRemoveButtonClick}
        name="PASS"
        distance={10}
      />,
    );
    const moveButton = output.find('button.move');
    expect(onMoveButtonClick).not.toHaveBeenCalled();
    moveButton.simulate('click');
    expect(onMoveButtonClick).toHaveBeenCalledTimes(1);
    expect(onMoveButtonClick).toHaveBeenLastCalledWith('PASS');
  });
});
