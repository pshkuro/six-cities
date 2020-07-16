import {parseHotel} from "../mapping/hotel-parser.js";
import {parseHotels} from "../mapping/hotels-pareser.js";
import {nearOffers} from "../../mocks/near-offers.js";
import {getHotels} from "../../api/clients.js";
import produce from 'immer';

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  LOAD_ERROR: `LOAD_ERROR`,
  SET_FAVORITE_OFFER: `SET_FAVORITE_OFFER`,
};

const initialState = {
  offers: null,
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
  },

  setFavoriteOffer: (offer) => {
    return ({
      type: ActionType.SET_FAVORITE_OFFER,
      offer,
    });
  }
};


const Operation = {
  getOffers: () => (dispatch, getState, api) => {
    return getHotels(api)
      .then((response) => parseHotels(response.data))
      .then((data) => {
        return Array.from(data.values()).map((offer) => (Object.assign(offer, {offers: offer.offers.map(parseHotel)})));
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

    case ActionType.SET_FAVORITE_OFFER:
      return produce(state, (draftState) => {
        draftState.offers.forEach((city) => {
          const cityOffer = city.offers.find((offer) => offer.id === action.offer.id);
          if (cityOffer) {
            cityOffer.favourite = !action.offer.favourite;
          }
        });
      });
  }

  return state;
};

export {reducer, ActionType, Operation, ActionCreator};


