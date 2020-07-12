import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const getOffers = (state) => {
  return state[NameSpace.OFFERS_DATA].offers;
};

const getActiveCity = (state) => {
  return state[NameSpace.PAGE].city;
};

export const getCityOffers = createSelector(
    getOffers,
    getActiveCity,
    (offers, city) => {
      let cityOffers;
      if (offers) {
        if (city) {
          cityOffers = offers.find((offer) => offer.city === city);
        } else {
          cityOffers = offers.find((offer) => offer.city === offers[0].city);
        }
      } else {
        cityOffers = null;
      }
      return cityOffers;
    }
);

export const getNearOffers = (state) => {
  return state[NameSpace.OFFERS_DATA].nearOffers;
};

export const getCities = createSelector(
    getOffers,
    (offers) => {
      return offers.map((offer) => offer.city);
    }
);

export const getError = (state) => {
  return state[NameSpace.OFFERS_DATA].error;
};
