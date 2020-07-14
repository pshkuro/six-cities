import NameSpace from "../name-space.js";

export const getReviews = (state) => {
  return state[NameSpace.REVIEWS].reviews;
};
