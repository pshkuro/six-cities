import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, ActionCreator, Operation} from "./data.js";

const initialState = {
  nearOffers: null,
  offers: null,
  cities: null,
};

const api = createAPI(() => {});

describe(`Actions to get data work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      nearOffers: null,
      offers: null,
    });
  });

  it(`The reducer get offers when page mount`, () => {
    expect(reducer(initialState, {
      type: ActionType.GET_OFFERS,
      availableOffers: offers.find((offer) => offer.city === `Paris`),
    })).toEqual(Object.assign(initialState, {
      offers: offers.find((offer) => offer.city === `Paris`),
    }));
  });

  it(`Action creators of get offers returns correct action`, () => {
    expect(ActionCreator.getOffers()).toEqual({
      type: ActionType.GET_OFFERS,
      availableOffers: offers.find((offer) => offer.city === `Paris`),
    });
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /questions`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.getOffers();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return offersLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_OFFERS,
          availableOffers: [{fake: true}],
        });
      });
  });
});
