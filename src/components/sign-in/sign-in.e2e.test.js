import React from "react";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import {SignIn} from "./sign-in.jsx";
import {City, PageType} from "../../constants/page.js";

const props = {
  onSignInFormSubmit: jest.fn((x) => x),
  onLocationSignInPageClick: jest.fn((x) => x),
};

describe(`Sign-In tests`, () => {
  it(`Post form should to callback`, () => {
    const signIn = mount(
        <BrowserRouter>
          <SignIn {...props}/>
        </BrowserRouter>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    const mockUserInfo = {
      login: ``,
      password: ``,
    };

    const signInForm = signIn.find(`.login__form`);
    signInForm.simulate(`submit`, {
      preventDefault: () => {}
    });

    expect(props.onSignInFormSubmit).toHaveBeenCalledTimes(1);
    expect(props.onSignInFormSubmit.mock.calls[0][0]).toEqual(mockUserInfo);
  });

  // it(`Click on location city should to callback`, () => {
  //   const signIn = mount(
  //       <BrowserRouter>
  //         <SignIn {...props}/>
  //       </BrowserRouter>,
  //       {
  //         createNodeMock: () => {
  //           return document.createElement(`div`);
  //         }
  //       }
  //   );

  //   const locationButton = signIn.find(`.locations__item`);
  //   locationButton.simulate(`click`, {
  //     preventDefault: () => {}
  //   });

  //   expect(props.onLocationSignInPageClick).toHaveBeenCalledTimes(1);
  //   expect(props.onLocationSignInPageClick.mock.calls[0][0]).toBe(PageType.MAIN);
  //   expect(props.onLocationSignInPageClick.mock.calls[0][1]).toBe(City.AMSTERDAM);
  // });


});
