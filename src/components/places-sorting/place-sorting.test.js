import React from "react";
import renderer from "react-test-renderer";
import PlacesSorting from "./places-sorting.jsx";

const props = {
  onSortingListItemClick: jest.fn(),
  activeSortingType: `top-rated`,
  handleChangeToggleClick: jest.fn(),
  activeClass: `places__options--opened`,
};

it(`Render PlaceSorting`, () => {


  const tree = renderer
    .create(
        <PlacesSorting {...props}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
