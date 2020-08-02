import * as React from "react";
import * as renderer from "react-test-renderer";
import PlacesSorting from "./places-sorting";
import {Sorting} from "../../types/types";

const props = {
  activeClass: `places__options--opened`,
  onSortingListItemClick: jest.fn(),
  activeSortingType: Sorting.DEFAULT,
  handleChangeToggleClick: jest.fn(),
};

it(`Render PlaceSorting`, () => {


  const tree = renderer
    .create(
        <PlacesSorting {...props}/>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
