import React from "react";
import renderer from "react-test-renderer";
import ReviewForm from "./review-form.jsx";


const props = {
  authorizationStatus: `AUTH`,
  onFormSubmit: jest.fn((x) => x),
  onFieldChange: jest.fn((x) => x),
  commentValue: ``,
  ratingValue: ``,
  isReviewInfoCorrect: false,
  isSending: false,
  isError: false,
};

it(`ReviewForm Render`, () => {
  const tree = renderer
  .create(
      <ReviewForm {...props} />,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
