import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item.jsx";

const props = {
  review: {
    comment: `Cool`,
    date: `12 April`,
    rating: 5,
    id: 124,
    user: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Peter`,
      isPro: false,
      id: 12,
    }
  }
};

it(`ReviewItem render`, () => {
  const tree = renderer
  .create(
      <ReviewItem {...props}/>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
