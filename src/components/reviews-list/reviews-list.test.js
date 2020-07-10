import React from "react";
import renderer from "react-test-renderer";
import ReviewsList from "./reviews-list.jsx";

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
  authorizationStatus: `AUTH`,
};

it(`ReviewsList Render`, () => {
  const tree = renderer
  .create(
      <ReviewsList {...props} />
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
