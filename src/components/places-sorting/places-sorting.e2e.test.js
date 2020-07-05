import React from "react";
import {shallow} from "enzyme";
import PlacesSorting from "./places-sorting.jsx";


const props = {
  onSortingListItemClick: jest.fn(),
  activeSortingType: `top-rated`,
};


describe(`PlaceSorting tests`, () => {
  it(`Click on places sorting should open and close sorting list`, () => {

    const placeSorting = shallow(
        <PlacesSorting {...props}/>
    );

    const placeSortingTitle = placeSorting.find(`.places__sorting-type`);
    placeSortingTitle.simulate(`click`, {
      nativeEvent: {
        stopImmediatePropagation() {}
      }
    });

    expect(placeSorting.state().isActive).toBe(true);

    placeSortingTitle.simulate(`click`, {
      nativeEvent: {
        stopImmediatePropagation() {}
      }
    });

    expect(placeSorting.state().isActive).toBe(false);
  });

  it(`Click on document shoul close places sorting`, () => {
    const placeSorting = shallow(
        <PlacesSorting {...props}/>
    );

    const placeSortingTitle = placeSorting.find(`.places__sorting-type`);
    placeSortingTitle.simulate(`click`, {
      nativeEvent: {
        stopImmediatePropagation() {}
      }
    });

    const placeSortingListItem = placeSorting.find(`.places__option`).last();
    placeSortingListItem.simulate(`click`, {
      nativeEvent: {
        stopImmediatePropagation() {}
      }
    });

    expect(placeSorting.state().isActive).toBe(false);
  });
});
