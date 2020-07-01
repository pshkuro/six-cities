import {reducer, ActionCreator, ActionType} from "./reducer.js";
import {PageType} from "../constants/page";
import {offers} from "../mocks/offers.js";
import {nearOffers} from "../mocks/near-offers.js";


const initialState = Object.assign(
    offers.find((offer) => offer.city === `Paris`),
    {
      cities: [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`],
      step: PageType.MAIN,
      activeOffer: null,
      nearOffers,
    });


describe(`Reducer tests`, () => {

  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });


  it(`The reducer change city to new one`, () => {
    expect(reducer(initialState, {
      type: ActionType.CHOOSE_CITY,
      city: `Brussels`,
      offers: offers.find((offer) => offer.city === `Brussels`).offers,
    })).toEqual(Object.assign(initialState, {
      city: `Brussels`,
      offers: offers.find((offer) => offer.city === `Brussels`).offers,
    }));
  });

  it(`The reducer changePageType to new page`, () => {
    expect(reducer(initialState, {
      type: ActionType.CHANGE_PAGE_TYPE,
      step: PageType.DETAILS,
      activeOffer: {
        pictures: [`img/apartment-05.jpg`],
        premium: true,
        cost: 11,
        description: [`Good apartment`],
        type: `Apartment`,
        rating: 2,
        title: `Place cool`,
        bedrooms: 1,
        guests: 1,
        conveniences: [`Beautiful`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Clara`,
          pro: false,
        },
        id: 909,
        reviwes: [{id: 1}, {id: 5}],

      },
    })).toEqual(Object.assign(initialState, {
      step: PageType.DETAILS,
      activeOffer: {
        pictures: [`img/apartment-05.jpg`],
        premium: true,
        cost: 11,
        description: [`Good apartment`],
        type: `Apartment`,
        rating: 2,
        title: `Place cool`,
        bedrooms: 1,
        guests: 1,
        conveniences: [`Beautiful`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Clara`,
          pro: false,
        },
        id: 909,
        reviwes: [{id: 1}, {id: 5}],

      },
    }));
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creators of choose city returns correct action`, () => {
    const activeCity = `Hamburg`;
    expect(ActionCreator.chooseCity(activeCity)).toEqual({
      type: ActionType.CHOOSE_CITY,
      city: activeCity,
      offers: offers.find((offer) => offer.city === activeCity).offers,
    });
  });

  it(`Action creators of change page typre returns correct action`, () => {
    const activeOffer = {
      pictures: [`img/apartment-05.jpg`],
      premium: true,
      cost: 11,
      description: [`Good apartment`],
      type: `Apartment`,
      rating: 2,
      title: `Place cool`,
      bedrooms: 1,
      guests: 1,
      conveniences: [`Beautiful`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 909,
      reviwes: [{id: 1}, {id: 5}],

    };

    expect(ActionCreator.changePageType(activeOffer)).toEqual({
      type: ActionType.CHANGE_PAGE_TYPE,
      step: PageType.DETAILS,
      activeOffer,
    });
  });
});

