import * as React from "react";
import * as renderer from "react-test-renderer";
import ReviewForm from "./review-form";
import {AuthorizationStatus} from "../../types/types";

const props = {
  authorizationStatus: AuthorizationStatus.AUTH,
  onFormSubmit: jest.fn(),
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
