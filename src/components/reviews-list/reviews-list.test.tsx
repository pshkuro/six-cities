import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewsList from "./reviews-list";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const props = {
  reviews: [
    {
      comment: `Cool`,
      date: `12 April`,
      rating: 5,
      id: 124,
      user: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Peter`,
        isPro: false,
        userId: 12,
      }
    },
    {
      comment: `beautiful`,
      date: `12 April`,
      rating: 5,
      id: 12334,
      user: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Peter`,
        isPro: true,
        userId: 1442,
      },
    }
  ],
  offerId: 1,
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
        <ReviewsList {...props} />,
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
