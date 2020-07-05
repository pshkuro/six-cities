import React from "react";
import {shallow} from "enzyme";
import PlacesSorting from "./places-sorting.jsx";


const props = {
  onSortingListItemClick: jest.fn((x) => x),
  activeSortingType: `top-rated`,
  handleChangeToggleClick: jest.fn(),
  activeClass: `places__options--opened`,
};


describe(`PlaceSorting tests`, () => {
  it(`Click on places sorting should open and close sorting list`, () => {

    const placeSorting = shallow(
        <PlacesSorting {...props}/>
    );

    const placeSortingTitle = placeSorting.find(`.places__option`).last();
    placeSortingTitle.simulate(`click`);

    expect(props.handleChangeToggleClick).toHaveBeenCalledTimes(1);
  });

  it(`Click on document should close places sorting`, () => {
    const placeSorting = shallow(
        <PlacesSorting {...props}/>
    );

    const placeSortingListItem = placeSorting.find(`.places__option`).last();
    placeSortingListItem.simulate(`click`);

    expect(props.handleChangeToggleClick).toHaveBeenCalled();

  });

  it(`Click on list item should to callback with list value`, () => {
    const placeSorting = shallow(
        <PlacesSorting {...props}/>
    );

    const placeSortingListItem = placeSorting.find(`.places__option`).last();
    placeSortingListItem.simulate(`click`);

    expect(props.onSortingListItemClick.mock.calls[0][0]).toBe(`top-rated`);

  });
});
