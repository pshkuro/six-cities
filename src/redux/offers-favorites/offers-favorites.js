import {getFavorites, setFavorite} from "../../api/clients";
import {parseHotel} from "../mapping/hotel-parser.js";
import {parseHotels} from "../mapping/hotels-pareser.js";
import {produce} from 'immer';

const ActionType = {
  GET_FAVORITES: `GET_FAVORITES`,
  REMOVE_FROM_FAVORITE: `REMOVE_FROM_FAVORITE`,
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

  removeFromFavorite: (id) => {
    return {
      type: ActionType.REMOVE_FROM_FAVORITE,
      id,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.favorites,
      });

    case ActionType.REMOVE_FROM_FAVORITE:
      return produce(state, (draftState) => {
        draftState.favorites.forEach((city, index) => {
          const offers = city.offers;
          const offerIndex = offers.findIndex((offer) => offer.id === action.id);

          if (offerIndex !== -1) {
            offers.splice(offerIndex, 1);

            if (offers.length === 0) {
              draftState.favorites.splice(index, 1);
            }
          }
        });
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
      .catch((err) => {
        throw err; // Обработать перед защитой
      });
  }
};

export {reducer, ActionType, Operation, ActionCreator};
