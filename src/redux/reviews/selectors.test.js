import {
  getReviews
} from "./selectors.js";

const mockState = {
  REVIEWS: {
    reviews: {},
  }
};

describe(`Reviews reducer selectors tests`, () => {
  it(`GetReviews selector return correct reviews`, () =>{
    expect(getReviews(mockState)).toEqual(mockState.REVIEWS.reviews);
  });
});
