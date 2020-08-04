import {getHotels, getNearOffers} from "../../api/clients";
import {parseHotel} from "../mapping/hotel-parser";
import {parseHotels} from "../mapping/hotels-parser";

const ActionType = {
  GET_OFFERS: `GET_OFFERS`,
  LOAD_ERROR: `LOAD_ERROR`,
  SET_OFFERS: `SET_OFFERS`,
  GET_NEAR_OFFERS: `GET_NEAR_OFFERS`,
  SET_NEAR_OFFERS: `SET_NEAR_OFFERS`,
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

  setOffers: (offers) => {
    return ({
      type: ActionType.SET_OFFERS,
      offers,
    });
  },

  offersLoadError: () => {
    return ({
      type: ActionType.LOAD_ERROR,
      error: true,
    });
  },

  getNearOffer: (nearOffers) => {
    return ({
      type: ActionType.GET_NEAR_OFFERS,
      nearOffers,
    });
  },

  setNearOffers: (nearOffers) => {
    return ({
      type: ActionType.SET_NEAR_OFFERS,
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

    case ActionType.SET_OFFERS:
      const {offers} = action;
      return Object.assign({}, state, {
        offers,
      });

    case ActionType.LOAD_ERROR:
      const {error} = action;
      return Object.assign({}, state, {
        error,
      });

    case ActionType.GET_NEAR_OFFERS:
      const {nearOffers} = action;
      return Object.assign({}, state, {
        nearOffers: Array(nearOffers),
      });

    case ActionType.SET_NEAR_OFFERS:
      const {nearOffers: nearFavoriteOffers} = action;
      return Object.assign({}, state, {
        nearOffers: nearFavoriteOffers,
      });

  }

  return state;
};

export {reducer, ActionType, Operation, ActionCreator};


