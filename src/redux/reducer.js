import {offers} from "../mocks/offers";

const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

const cities = offers.map((offer) => offer.city);
const ActionType = {
  CHOOSE_CITY: `CHOOSE_CITY`,
};

const initialState = Object.assign(
    offers.find((offer) => offer.city === City.PARIS),
    {
      cities,
    });

const ActionCreator = {
  chooseCity: (activeCity) => {
    return (
      {
        type: ActionType.CHOOSE_CITY,
        city: activeCity,
        get offers() {
          return offers.find((offer) => offer.city === this.city).offers;
        }
      }
    );
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_CITY:
      const {city, offers: filteredOffers} = action;
      return Object.assign({}, state, {
        city,
        offers: filteredOffers,
      });
  }

  return state;
};

export {ActionCreator, reducer};
