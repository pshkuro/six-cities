import {getFavorites, setFavorite} from "../../api/clients";
import {parseHotel} from "../mapping/hotel-parser.js";
import {parseHotels} from "../mapping/hotels-pareser.js";


const ActionType = {
  GET_FAVORITES: `GET_FAVORITES`,
};

const initialState = {
  favorites: null,
};

const ActionCreator = {
  getFavoritesOffers: (favorites) => {
    return {
      type: ActionType.GET_FAVORITES,
      favorites,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.favorites,
      });
  }

  return state;
};

const Operation = {
  getFavorites: () => (dispatch, getState, api) => {
    return getFavorites(api)
      .then((response) => parseHotels(response.data))
      .then((data) => {
        return Array.from(data.values()).map((offer) => (Object.assign(offer, {offers: offer.offers.map(parseHotel)})));
      })
      .then((data) => {
        dispatch(ActionCreator.getFavoritesOffers(data));
      })
      .catch((err) => {
        throw err; // Обработать перед защитой
      });
  },

  setFavorite: (id, status) => (dispatch, getState, api) => {
    return setFavorite(api, id, status)
    .then((response) => parseHotels([response.data]))
      .then((data) => {
        return Array.from(data.values()).map((offer) => (Object.assign(offer, {offers: offer.offers.map(parseHotel)})));
      })
      .then((data) => {
        dispatch(ActionCreator.getFavoritesOffers(data));
      })
      .catch((err) => {
        throw err; // Обработать перед защитой
      });
  }
};

export {reducer, ActionType, Operation, ActionCreator};
