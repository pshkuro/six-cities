import {offers} from "../../mocks/offers.js";
import {PageType, City} from "../../constants/page.js";


const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  CHOOSE_CITY: `CHOOSE_CITY`,
  CHANGE_PAGE_TYPE: `CHANGE_PAGE_TYPE`,
  MAKE_OFFER_ACTIVE: `MAKE_OFFER_ACTIVE`,
  MAKE_OFFER_INACTIVE: `MAKE_CARD_INACTIVE`,
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

export {ActionType, ActionCreator};
