import {parse} from "../../api/parser.js";
import {nearOffers} from "../../mocks/near-offers.js";


const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  LOAD_ERROR: `LOAD_ERROR`,
};

const initialState = {
  offers: null,
  cities: null,
  error: false,
  nearOffers,
};

const ActionCreator = {
  getOffers: (offers) => {
    return ({
      type: ActionType.GET_OFFERS,
      availableOffers: offers,
    });
  },

  offersLoadError: () => {
    return ({
      type: ActionType.LOAD_ERROR,
      error: true,
    });
  }
};


const Operation = {
  getOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`)
      .then((response) => response.data.reduce((offers, offer) => {
        if (offers.has(offer.city.name)) {
          offers.get(offer.city.name).offers.push(offer);
        } else {
          offers.set(offer.city.name, {
            city: offer.city.name,
            cityCoordinates: {
              coordinates: [offer.city.location.latitude, offer.city.location.longitude],
              zoom: offer.city.location.zoom,
            },
            offers: [offer]
          });
        }
        return offers;
      }, new Map()))
      .then((data) => {
        return Array.from(data.values()).map((offer) => (Object.assign(offer, {offers: offer.offers.map(parse)})));
      })
      .then((data) => {
        dispatch(ActionCreator.getOffers(data));
      })
      .catch(() => {
        dispatch(ActionCreator.offersLoadError());
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

    case ActionType.LOAD_ERROR:
      const {error} = action;
      return Object.assign({}, state, {
        error,
      });
  }

  return state;
};

export {reducer, ActionType, Operation, ActionCreator};


