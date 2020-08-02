import * as React from "react";
import {mount} from "enzyme";
import withToggle from "./with-toggle";
import {Sorting} from "../../types/types";

const mockComponent = (props: MockComponent) => {
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

interface MockComponent {
  handleChangeToggleClick: () => void;
}

const props = {
  activeSortingType: Sorting.DEFAULT,
  onSortingListItemClick: jest.fn(),
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
