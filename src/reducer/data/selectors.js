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
    (offers, city) => {
      return offers ? offers.find((offer) => offer.city === city) : null;
    }
);

export const getNearOffers = (state) => {
  return state[NameSpace.DATA].nearOffers;
};

export const getCities = createSelector(
    getOffers,
    (offers) => {
      return offers.map((offer) => offer.city);
    }
);
