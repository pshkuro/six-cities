import React from "react";
import {shallow} from "enzyme";
import {PlaceScreen} from "./place-screen.jsx";
import {PageType} from "../../constants/page.js";


const props = [
  {
    children: <div className="children-component" />,
    color: `gray`,
    type: PageType.MAIN,
    authorizationStatus: `NO_AUTH`,
    onPageHeaderSignInClick: jest.fn((x) => x),
    onHeaderLogoClick: jest.fn((x) => x),
    profile: {
      email: `pipa`,
    }
  },
  {
    children: <div className="children-component" />,
    type: PageType.DETAILS,
    authorizationStatus: `NO_AUTH`,
    onPageHeaderSignInClick: jest.fn((x) => x),
    onHeaderLogoClick: jest.fn((x) => x),
    profile: {
      email: `pipa`,
    }
  },
];

describe(`Place Screen tests`, () => {
  it(`Click on header logo should to callback`, () => {
    const mockProps = props[1];
    const placeScreen = shallow(
        <PlaceScreen {...mockProps}/>
    );

    const headerLogo = placeScreen.find(`.header__logo`);
    headerLogo.simulate(`click`);

    expect(mockProps.onHeaderLogoClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onHeaderLogoClick.mock.calls[0][0]).toBe(`main`);
  });

  it(`Click on Sign In link should to callback`, () => {
    const mockProps = props[0];
    const placeScreen = shallow(
        <PlaceScreen {...mockProps}/>
    );

    const signIn = placeScreen.find(`.header__login`);
    signIn.simulate(`click`);

    expect(mockProps.onPageHeaderSignInClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onPageHeaderSignInClick.mock.calls[0][0]).toBe(`sign-in`);
  });
});
