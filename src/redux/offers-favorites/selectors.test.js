import {
  getFavoriteOffers
} from "./selectors.js";

const mockState = {
  OFFERS_FAVORITES: {
    favorites: [
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
      }
    ]
  }
};


describe(`Favorite offers reducer selectors test`, () => {
  it(`Get Favorite Offers selector return correct offers`, () => {
    expect(getFavoriteOffers(mockState)).toEqual(mockState.OFFERS_FAVORITES.favorites);
  });
});

