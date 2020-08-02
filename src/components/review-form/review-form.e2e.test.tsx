import * as React from "react";
import {shallow} from "enzyme";
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

describe(`ReviewForm tests`, () => {
  it(`On change comment fields should to callback correctly value`, () => {
    const reviewForm = shallow(
        <ReviewForm {...props} />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    const commentField = reviewForm.find(`.reviews__textarea`);

    const evt = {};
    commentField.simulate(`change`, evt);
    expect(props.onFieldChange).toHaveBeenCalledTimes(1);
    expect(props.onFieldChange.mock.calls[0][0]).toEqual(evt);
  });

  it(`On change rating fields should to callback correctly value`, () => {
    const reviewForm = shallow(
        <ReviewForm {...props} />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    const ratingField = reviewForm.find(`.form__rating-input`).first();

    const evt = {};
    ratingField.simulate(`change`, evt);
    expect(props.onFieldChange).toHaveBeenCalled();
    expect(props.onFieldChange.mock.calls[0][0]).toEqual(evt);
  });

  it(`Form submit should callback`, () => {
    const reviewForm = shallow(
        <ReviewForm {...props} />,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );


    reviewForm.simulate(`submit`);
    expect(props.onFormSubmit).toHaveBeenCalledTimes(1);
  });

});
