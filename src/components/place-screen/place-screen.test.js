import React from "react";
import renderer from "react-test-renderer";
import PlaceScreen from "./place-screen.jsx";
import {PageType} from "../../constants/page.js";

const props = [
  {
    children: <div className="children-component" />,
    color: `gray`,
    type: PageType.MAIN,
    authorizationStatus: `NO_AUTH`,
  },
  {
    children: <div className="children-component" />,
    type: PageType.DETAILS,
    authorizationStatus: `NO_AUTH`,
  },
];

describe(`PlaceScreen render correctly`, () => {
  it(`with Main`, () => {
    const tree = renderer
    .create(
        <PlaceScreen
          {...props[0]}/>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with Place Property`, () => {
    const tree = renderer
    .create(
        <PlaceScreen
          {...props[1]}/>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
