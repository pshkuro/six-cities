import * as React from "react";
import * as renderer from "react-test-renderer";
import {BrowserRouter} from "react-router-dom";
import {PlaceScreen} from "./place-screen";
import {AuthorizationStatus} from "../../types/types";

const props = [
  {
    children: <div className="children-component" />,
    color: `gray`,
    type: `main`,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    profile: {
      email: `pipa`,
    }
  },
  {
    children: <div className="children-component" />,
    type: `details`,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
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
