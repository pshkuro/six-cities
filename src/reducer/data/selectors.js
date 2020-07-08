import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

const getActiveCity = (state) => {
  return state[NameSpace.PAGE].city;
};

export const getCityOffers = createSelector(
    getOffers,
    getActiveCity,
    (resultOne, resultTwo) => {
      return resultOne ? resultOne.find((offer) => offer.city === resultTwo) : null;
    }
);

export const getNearOffers = (state) => {
  return state[NameSpace.DATA].nearOffers;
};
