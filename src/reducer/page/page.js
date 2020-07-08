import {PageType} from "../../constants/page.js";
const initialState = {
  city: null,
  step: PageType.MAIN,
  propertyOffer: null,
  activeOffer: null,
};

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  CHOOSE_CITY: `CHOOSE_CITY`,
  CHANGE_PAGE_TYPE: `CHANGE_PAGE_TYPE`,
  MAKE_OFFER_ACTIVE: `MAKE_OFFER_ACTIVE`,
  MAKE_OFFER_INACTIVE: `MAKE_CARD_INACTIVE`,
};

const ActionCreator = {
  chooseCity: (activeCity) => {
    return (
      {
        type: ActionType.CHOOSE_CITY,
        city: activeCity,
      }
    );
  },

  changePageType: (offer) => {
    return (
      {
        type: ActionType.CHANGE_PAGE_TYPE,
        step: PageType.DETAILS,
        propertyOffer: offer,
      }
    );
  },

  makeOfferCardActive: (offer) => {
    return (
      {
        type: ActionType.MAKE_OFFER_ACTIVE,
        activeOffer: offer,
      }
    );
  },

  makeOfferInactive: () => {
    return (
      {
        type: ActionType.MAKE_OFFER_INACTIVE,
        activeOffer: null,
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
      const {step, propertyOffer} = action;
      return Object.assign({}, state, {
        step,
        propertyOffer,
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

export {reducer, ActionType, ActionCreator};
