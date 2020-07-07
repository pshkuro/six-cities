import {reducer} from "./reducer.js";
import {ActionCreator, ActionType} from "./actions/actions.js";
import {PageType} from "../constants/page";
import {offers} from "../mocks/offers.js";
import {nearOffers} from "../mocks/near-offers.js";


const initialState = {
  city: `Paris`,
  cities: [`Paris`, `Cologne`, `Brussels`, `Amsterdam`, `Hamburg`, `Dusseldorf`],
  step: PageType.MAIN,
  propertyOffer: null,
  nearOffers,
  offers: null,
  activeOffer: null,
};


describe(`Reducer tests`, () => {

  it(`The reducer change city to new one`, () => {
    expect(reducer(initialState, {
      type: ActionType.CHOOSE_CITY,
      city: `Brussels`,
      offers: offers.find((offer) => offer.city === `Brussels`),
    })).toEqual(Object.assign(initialState, {
      city: `Brussels`,
      offers: offers.find((offer) => offer.city === `Brussels`),
    }));
  });

  it(`The reducer changePageType to new page`, () => {
    expect(reducer(initialState, {
      type: ActionType.CHANGE_PAGE_TYPE,
      step: PageType.DETAILS,
      propertyOffer: {
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
      propertyOffer: {
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

  it(`The reducer change active offer from null to object`, () => {
    expect(reducer(initialState, {
      type: ActionType.MAKE_OFFER_ACTIVE,
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

  it(`The reducer change active offer to null`, () => {
    expect(reducer(initialState, {
      type: ActionType.MAKE_OFFER_ACTIVE,
      activeOffer: null,
    })).toEqual(Object.assign(initialState, {
      activeOffer: null,
    }));
  });

});

describe(`Action creators work correctly`, () => {
  it(`Action creators of choose city returns correct action`, () => {
    const activeCity = `Hamburg`;
    expect(ActionCreator.chooseCity(activeCity)).toEqual({
      type: ActionType.CHOOSE_CITY,
      city: activeCity,
      offers: offers.find((offer) => offer.city === activeCity),
    });
  });

  it(`Action creators of change page type returns correct action`, () => {
    const propertyOffer = {
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

    expect(ActionCreator.changePageType(propertyOffer)).toEqual({
      type: ActionType.CHANGE_PAGE_TYPE,
      step: PageType.DETAILS,
      propertyOffer,
    });
  });

  it(`Action creators of make offer active return correct action`, () => {
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

    expect(ActionCreator.makeOfferCardActive(activeOffer)).toEqual({
      type: ActionType.MAKE_OFFER_ACTIVE,
      activeOffer,
    });
  });

  it(`Action creators of make offer inactive return correct action`, () => {
    expect(ActionCreator.makeOfferInactive()).toEqual({
      type: ActionType.MAKE_OFFER_INACTIVE,
      activeOffer: null,
    });
  });
});
