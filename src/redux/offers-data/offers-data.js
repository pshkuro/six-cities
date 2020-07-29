import {getHotels, getNearOffers} from "../../api/clients";
import {parseHotel} from "../mapping/hotel-parser";
import {parseHotels} from "../mapping/hotels-pareser";
import produce from 'immer';

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  LOAD_ERROR: `LOAD_ERROR`,
  SET_FAVORITE_OFFER: `SET_FAVORITE_OFFER`,
  GET_NEAR_OFFERS: `GET_NEAR_OFFERS`,
};

const initialState = {
  offers: null,
  error: false,
  nearOffers: null,
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
  },

  getNearOffer: (nearOffers) => {
    return ({
      type: ActionType.GET_NEAR_OFFERS,
      nearOffers,
    });
  },
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

  getNearOffers: (id) => (dispatch, getState, api) => {
    return getNearOffers(api, id)
    .then((response) => parseHotels(response.data))
      .then((data) => {
        return Array.from(data.values()).map((offer) => (Object.assign(offer, {offers: offer.offers.map(parseHotel)})));
      })
      .then((data) => {
        dispatch(ActionCreator.getNearOffer(data[0]));
      })
      .catch(() => {
        dispatch(ActionCreator.offersLoadError());
      });

  }

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

    case ActionType.GET_NEAR_OFFERS:
      const {nearOffers} = action;
      return Object.assign({}, state, {
        nearOffers,
      });
  }

  return state;
};

export {reducer, ActionType, Operation, ActionCreator};


