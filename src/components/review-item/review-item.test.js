import React from "react";
import renderer from "react-test-renderer";
import ReviewItem from "./review-item.jsx";

const props = {
  review: {
    avatar: `img/avatar-angelina.jpg`,
    name: `Peter`,
    stars: 5,
    description: [`Cool`],
    date: `12 April`,
    id: 124,
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
