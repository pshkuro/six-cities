import {offers} from "../mocks/offers";

const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};


const initialState = offers.find((offer) => offer.city === City.AMSTERDAM);


const ActionType = {
  CHOOSE_CITY: `CHOOSE_CITY`,
};

const ActionCreator = {
  chooseCity: () => ({
    type: ActionType.CHOOSE_CITY,
    city: initialState.city,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHOOSE_CITY:
      return Object.assign({}, state);
  }

  return state;
};

export {ActionCreator, reducer};
