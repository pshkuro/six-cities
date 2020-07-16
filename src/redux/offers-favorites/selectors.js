import NameSpace from "../name-space.js";

export const getFavoriteOffers = (state) => {
  return state[NameSpace.OFFERS_FAVORITES].favorites;
};
