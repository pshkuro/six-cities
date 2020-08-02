import {
  getCityOffers,
  getNearOffers,
  getCities,
  getError,
  getPropertyOffer
} from "./selectors";

const mockState = {
  PAGE: {
    city: `Paris`,
  },
  OFFERS_DATA: {
    offers: [
      {
        city: `Paris`,
        cityCoordinates: {
          coordinates: [52.3909553943508, 4.85309666406198],
          zoom: 12,
        },
        offers: [
          {
            previewImage: `img/apartment-01.jpg`,
            pictures: [`img/apartment-01.jpg`],
            title: `good rererer`,
            description: [`Wood and stone place`],
            premium: false,
            favourite: true,
            type: `Apartment`,
            rating: 1.8,
            bedrooms: 5,
            guests: 1,
            cost: 120,
            conveniences: [`Cool vary cool place`],
            coordinates: [52.3909553943508, 4.85309666406198],
            owner: {
              avatar: `img/avatar-angelina.jpg`,
              name: `Lolo`,
              pro: true,
              id: 12,
            },
            id: 8989,
          }],
      },
      {
        city: `Amsterdam`,
        cityCoordinates: {
          coordinates: [52.3909553943508, 4.85309666406198],
          zoom: 12,
        },
        offers: [
          {
            previewImage: `img/apartment-01.jpg`,
            pictures: [`img/apartment-01.jpg`],
            title: `good rererer`,
            description: [`Wood and stone place`],
            premium: false,
            favourite: true,
            type: `Apartment`,
            rating: 1.8,
            bedrooms: 5,
            guests: 1,
            cost: 120,
            conveniences: [`Cool vary cool place`],
            coordinates: [52.3909553943508, 4.85309666406198],
            owner: {
              avatar: `img/avatar-angelina.jpg`,
              name: `Lolo`,
              pro: true,
              id: 12,
            },
            id: 8989,
          }],
      }
    ],
    cities: [`Paris`, `Amsterdam`],
    nearOffers: [
      {
        previewImage: `img/apartment-01.jpg`,
        pictures: [`img/apartment-01.jpg`],
        title: `good rererer`,
        description: [`Wood and stone place`],
        premium: false,
        type: `Apartment`,
        rating: 1.8,
        bedrooms: 5,
        guests: 1,
        cost: 120,
        conveniences: [`Cool vary cool place`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Lolo`,
          pro: true,
          id: 12,
        },
        id: 112},
      {
        pictures: [`img/apartment-01.jpg`],
        title: `good rererer`,
        description: [`Wood and stone place`],
        premium: false,
        type: `Apartment`,
        rating: 1.8,
        bedrooms: 5,
        guests: 1,
        cost: 120,
        conveniences: [`Cool vary cool place`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Lolo`,
          pro: true,
        },
        id: 12},
    ],
    error: false,
  }};

describe(`Offers data selectors tests`, () => {
  it(`Get city offers offers data selector return correct offers`, () => {
    const cityOffers = {
      city: `Paris`,
      cityCoordinates: {
        coordinates: [52.3909553943508, 4.85309666406198],
        zoom: 12,
      },
      offers: [
        {
          previewImage: `img/apartment-01.jpg`,
          pictures: [`img/apartment-01.jpg`],
          title: `good rererer`,
          description: [`Wood and stone place`],
          premium: false,
          favourite: true,
          type: `Apartment`,
          rating: 1.8,
          bedrooms: 5,
          guests: 1,
          cost: 120,
          conveniences: [`Cool vary cool place`],
          coordinates: [52.3909553943508, 4.85309666406198],
          owner: {
            avatar: `img/avatar-angelina.jpg`,
            name: `Lolo`,
            pro: true,
            id: 12,
          },
          id: 8989,
        }],
    };

    expect(getCityOffers(mockState)).toEqual(cityOffers);
  });

  it(`Get city offers offers data selector return correct offers when active city null`, () => {
    expect(getCityOffers(Object.assign(mockState, {PAGE: {city: null}}))).toEqual(mockState.OFFERS_DATA.offers[0]);
  });


  it(`Get near offers data offers return correct near offers`, () => {
    expect(getNearOffers(mockState)).toEqual(mockState.OFFERS_DATA.nearOffers);
  });

  it(`Get cities offers data selector return correct cities`, () => {
    const mockCities = [`Paris`, `Amsterdam`];
    expect(getCities(mockState)).toEqual(mockCities);
  });

  it(`Get error offers data selector return correct error`, () => {
    expect(getError(mockState)).toEqual(false);
  });

  it(`Get property offer data selector return correct error`, () => {
    const mockOffer = {
      previewImage: `img/apartment-01.jpg`,
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
      favourite: true,
      type: `Apartment`,
      rating: 1.8,
      bedrooms: 5,
      guests: 1,
      cost: 120,
      conveniences: [`Cool vary cool place`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Lolo`,
        pro: true,
        id: 12,
      },
      id: 8989,
    };
    expect(getPropertyOffer(mockState, 8989)).toEqual(mockOffer);
  });
});

