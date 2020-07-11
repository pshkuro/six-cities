import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const props = {
  reviews: [
    {
      avatar: `img/avatar-angelina.jpg`,
      name: `Peter`,
      stars: 5,
      description: [`Cool`],
      date: `12 April`,
      id: 124,
    },
    {
      avatar: `img/avatar-angelina.jpg`,
      name: `Alonso`,
      stars: 1,
      description: [`Cool`],
      date: `10 Februry`,
      id: 14,
    }
  ],
};

const mockStore = configureStore([]);

it(`ReviewsList Render`, () => {
  const store = mockStore({
    USER: {
      authorizationStatus: `NO_AUTH`
    },
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <ReviewsList {...props} />
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
