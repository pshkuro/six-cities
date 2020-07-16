import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {PlaceScreen} from "./place-screen.jsx";


const props = [
  {
    children: <div className="children-component" />,
    color: `gray`,
    type: `main`,
    authorizationStatus: `NO_AUTH`,
    profile: {
      email: `pipa`,
    }
  },
  {
    children: <div className="children-component" />,
    type: `details`,
    authorizationStatus: `NO_AUTH`,
    profile: {
      email: `pipa`,
    }
  },
];

describe(`PlaceScreen render correctly`, () => {
  it(`with Main`, () => {
    const tree = renderer
    .create(
        <BrowserRouter>
          <PlaceScreen
            {...props[0]}/>
        </BrowserRouter>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with Place Property`, () => {
    const tree = renderer
    .create(
        <BrowserRouter>
          <PlaceScreen
            {...props[1]}/>
        </BrowserRouter>
    )
    .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
