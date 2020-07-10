import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.PAGE;

export const getPropertyOffer = (state) => {
  return state[NAME_SPACE].propertyOffer;
};

export const getPageStep = (state) => {
  return state[NAME_SPACE].step;
};

export const getActiveOffer = (state) => {
  return state[NAME_SPACE].activeOffer;
};

export const getActiveCity = (state) => {
  return state[NAME_SPACE].city;
};


