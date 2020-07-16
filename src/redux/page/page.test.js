import {reducer, ActionType, ActionCreator} from "./page.js";


const initialState = {
  city: `Paris`,
  activeOffer: null,
};


describe(`Page Reducer tests`, () => {

  it(`The reducer change city to new one`, () => {
    expect(reducer(initialState, {
      type: ActionType.CHOOSE_CITY,
      city: `Brussels`,
    })).toEqual(Object.assign(initialState, {
      city: `Brussels`,
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

describe(`Page reducer action creators work correctly`, () => {
  it(`Action creators of choose city returns correct action`, () => {
    const activeCity = `Hamburg`;
    expect(ActionCreator.chooseCity(activeCity)).toEqual({
      type: ActionType.CHOOSE_CITY,
      city: activeCity,
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
