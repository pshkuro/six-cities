import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.PAGE;

export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};

export const getActiveCity = (state) => {
  return state[NAME_SPACE].city;
};


