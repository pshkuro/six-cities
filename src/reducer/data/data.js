import {City} from "../../constants/page.js";
// import {nearOffers} from "../../mocks/near-offers.js";
// import {offers} from "../../mocks/offers";

// const cities = offers.map((offer) => offer.city);

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
};

const initialState = {
  offers: null,
  nearOffers: null,
};

const ActionCreator = {
  getOffers: (offers) => {
    return ({
      type: ActionType.GET_OFFERS,
      availableOffers: offers.filter((offer) => offer.city.name === City.PARIS),
    });
  }
};

const Operation = {
  getOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        dispatch(ActionCreator.getOffers(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_OFFERS:
      const {availableOffers} = action;
      return Object.assign({}, state, {
        offers: availableOffers,
      });
  }

  return state;
};

export {reducer, ActionType, Operation, ActionCreator};


