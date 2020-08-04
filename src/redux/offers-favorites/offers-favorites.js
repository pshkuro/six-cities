import {ActionCreator as DataOffersActionCreator} from "../offers-data/offers-data";
import {getFavorites, setFavorite} from "../../api/clients";
import {parseHotel} from "../mapping/hotel-parser";
import {parseHotels} from "../mapping/hotels-parser";
import {updateOffer} from "../mapping/update-offer";

const ActionType = {
  GET_FAVORITES: `GET_FAVORITES`,
  REMOVE_FROM_FAVORITES: `REMOVE_FROM_FAVORITES`,
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

  removeFromFavorite: (favoriteOffers) => {
    return {
      type: ActionType.REMOVE_FROM_FAVORITES,
      favoriteOffers,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_FAVORITES:
      return Object.assign({}, state, {
        favorites: action.favorites,
      });

    case ActionType.REMOVE_FROM_FAVORITES:
      const {favoriteOffers} = action;
      return Object.assign({}, state, {
        favorites: favoriteOffers,
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
        throw err;
      });
  },


  setFavorite: (id, status) => (dispatch, getState, api) => {
    const state = getState();
    const cities = state.OFFERS_DATA.offers;
    const nearCities = state.OFFERS_DATA.nearOffers;
    const favoriteCities = state.OFFERS_FAVORITES.favorites;

    return setFavorite(api, id, status)
      .then((response) => parseHotel(response.data))
      .then((offer) => {
        const newCities = updateOffer(cities, id, offer);
        dispatch(DataOffersActionCreator.setOffers(newCities));

        if (nearCities) {
          const newNearOffers = updateOffer(nearCities, id, offer);
          dispatch(DataOffersActionCreator.setNearOffers(newNearOffers));
        }

        if (favoriteCities) {
          const newFavoriteCities = updateOffer(favoriteCities, id, null);
          dispatch(ActionCreator.removeFromFavorite(newFavoriteCities));
        }
      })
      .catch((err) => {
        throw err;
      });
  }
};

export {reducer, ActionType, Operation, ActionCreator};
