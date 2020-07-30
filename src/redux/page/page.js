const initialState = {
  city: null,
  activeOffer: null,
};

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  CHOOSE_CITY: `CHOOSE_CITY`,
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
