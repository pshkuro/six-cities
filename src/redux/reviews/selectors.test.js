import {
  getReviews
} from "./selectors";

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
