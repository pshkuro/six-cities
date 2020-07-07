import {offers} from "../mocks/offers";
import {PageType} from "../constants/page.js";
import {nearOffers} from "../mocks/near-offers.js";
import {ActionType} from "./actions/actions.js";


const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

const cities = offers.map((offer) => offer.city);

const initialState = {
  city: City.PARIS,
  cities,
  step: PageType.MAIN,
  propertyOffer: null,
  nearOffers,
  offers: null,
  activeOffer: null,
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
      const {step, propertyOffer} = action;
      return Object.assign({}, state, {
        step,
        propertyOffer,
      });

    case ActionType.GET_OFFERS:
      const {availableOffers} = action;
      return Object.assign({}, state, {
        offers: availableOffers,
      });

    case ActionType.MAKE_OFFER_ACTIVE:
      const {activeOffer} = action;
      return Object.assign({}, state, {
        activeOffer,
      });

    case ActionType.MAKE_OFFER_INACTIVE:
      const {activeOffer: inactiveOffer} = action;
      return Object.assign({}, state, {
        activeOffer: inactiveOffer,
      });
  }

  return state;
};

export {reducer};
