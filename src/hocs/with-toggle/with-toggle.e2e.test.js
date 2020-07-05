import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";
import withToggle from "./with-toggle.js";

const mockComponent = (props) => {
  const {handleChangeToggleClick} = props;
  return (
    <div>
      <ul>
        <li
          className="places__option"
          onClick={handleChangeToggleClick}/>
      </ul>
    </div>
  );
};

mockComponent.propTypes = {
  handleChangeToggleClick: PropTypes.func.isRequired,
};

const props = {
  handleChangeToggleClick: jest.fn(),
};

describe(`withToggle Hoc tests`, () => {
  it(`Click on toggle item change toggle state`, () => {
    const PlaceListWrapped = withToggle(mockComponent);

    const wrappedComponent = mount(
        <PlaceListWrapped {...props} />
    );

    const listItem = wrappedComponent.find(`.places__option`);
    listItem.simulate(`click`);

    expect(wrappedComponent.state().isActive).toBe(true);

  });
});
