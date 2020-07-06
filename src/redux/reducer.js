import {offers} from "../mocks/offers";
import {PageType} from ".././constants/page.js";
import {nearOffers} from "../mocks/near-offers.js";


const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

const cities = offers.map((offer) => offer.city);
const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  CHOOSE_CITY: `CHOOSE_CITY`,
  CHANGE_PAGE_TYPE: `CHANGE_PAGE_TYPE`,
};

const initialState = {
  city: City.PARIS,
  cities,
  step: PageType.MAIN,
  activeOffer: null,
  nearOffers,
  offers: null,
};

const ActionCreator = {
  getOffers: () => {
    return ({
      type: ActionType.GET_OFFERS,
      availableOffers: offers.find((offer) => offer.city === City.PARIS),
    });
  },

  chooseCity: (activeCity) => {
    return (
      {
        type: ActionType.CHOOSE_CITY,
        city: activeCity,
        get offers() {
          return offers.find((offer) => offer.city === this.city);
        }
      }
    );
  },

  changePageType: (offer) => {
    return (
      {
        type: ActionType.CHANGE_PAGE_TYPE,
        step: PageType.DETAILS,
        activeOffer: offer,
      }
    );
  },

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_CITY:
      const {city, offers: filteredOffers} = action;
      return Object.assign({}, state, {
        city,
        offers: filteredOffers,
      });

    case ActionType.CHANGE_PAGE_TYPE:
      const {step, activeOffer} = action;
      return Object.assign({}, state, {
        step,
        activeOffer,
      });

    case ActionType.GET_OFFERS:
      const {availableOffers} = action;
      return Object.assign({}, state, {
        offers: availableOffers,
      });
  }

  return state;
};

export {ActionCreator, ActionType, reducer};
