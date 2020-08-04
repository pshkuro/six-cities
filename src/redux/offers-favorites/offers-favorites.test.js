import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {reducer, ActionType, ActionCreator, Operation} from "./offers-favorites";
import {noop} from "../../utils/common";


const initialState = {
  favorites: null,
};

const api = createAPI(noop);

const mockFavorites = [{
  "city": {
    "name": `Amsterdam`,
    "location": {
      "latitude": 52.37454,
      "longitude": 4.897976,
      "zoom": 13
    }
  },
  "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
  "images": [
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`
  ],
  "title": `The house among olive `,
  "is_favorite": false,
  "is_premium": false,
  "rating": 4.1,
  "type": `room`,
  "bedrooms": 1,
  "max_adults": 2,
  "price": 170,
  "goods": [
    `Breakfast`,
    `Washer`,
    `Baby seat`,
    `Air conditioning`,
    `Dishwasher`,
    `Fridge`,
    `Laptop friendly workspace`,
    `Towels`
  ],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`,
  "location": {
    "latitude": 52.364540000000005,
    "longitude": 4.9019759999999994,
    "zoom": 16
  },
  "id": 1
},
{
  "city": {
    "name": `Brussels`,
    "location": {
      "latitude": 50.846557,
      "longitude": 4.351697,
      "zoom": 13
    }
  },
  "preview_image": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
  "images": [
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/19.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`,
    `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`
  ],
  "title": `Penthouse, 4-5 rooms + 5 balconies`,
  "is_favorite": false,
  "is_premium": true,
  "rating": 2.8,
  "type": `room`,
  "bedrooms": 1,
  "max_adults": 3,
  "price": 170,
  "goods": [
    `Washer`,
    `Air conditioning`,
    `Towels`,
    `Breakfast`,
    `Baby seat`,
    `Fridge`,
    `Laptop friendly workspace`
  ],
  "host": {
    "id": 25,
    "name": `Angelina`,
    "is_pro": true,
    "avatar_url": `img/avatar-angelina.jpg`
  },
  "description": `Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.`,
  "location": {
    "latitude": 50.862556999999995,
    "longitude": 4.375697,
    "zoom": 16
  },
  "id": 2
}];

const citiesFavoriteOffers = [
  {"city": `Amsterdam`,
    "cityCoordinates":
    {"coordinates": [52.37454, 4.897976], "zoom": 13},
    "offers": [
      {"bedrooms": 1,
        "conveniences": [`Breakfast`, `Washer`, `Baby seat`, `Air conditioning`, `Dishwasher`, `Fridge`, `Laptop friendly workspace`, `Towels`],
        "coordinates": [52.364540000000005, 4.9019759999999994],
        "cost": 170,
        "description": [`This is a place for dreamers to reset, reflect, and create. Designed with a 'slow' pace in mind, our hope is that you enjoy every part of your stay; from making local coffee by drip in the morning, choosing the perfect record to put on as the sun sets.`],
        "guests": 2,
        "id": 1,
        "owner":
      {"avatar": `img/avatar-angelina.jpg`,
        "name": `Angelina`,
        "pro": true,
        "id": 25},
        "pictures": [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/2.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/15.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/20.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/16.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`], "previewImage": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`,
        "premium": false,
        "favourite": false,
        "rating": 4.1,
        "title": `The house among olive `, "type": `room`}]},
  {"city": `Brussels`,
    "cityCoordinates": {"coordinates": [50.846557, 4.351697], "zoom": 13},
    "offers": [{"bedrooms": 1, "conveniences": [`Washer`, `Air conditioning`, `Towels`, `Breakfast`, `Baby seat`, `Fridge`, `Laptop friendly workspace`],
      "coordinates": [50.862556999999995, 4.375697], "cost": 170,
      "description": [`Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.`], "guests": 3, "id": 2, "owner": {"avatar": `img/avatar-angelina.jpg`, "name": `Angelina`, "pro": true, "id": 25}, "pictures": [`https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/17.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/18.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/13.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/12.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/1.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/14.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/6.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/8.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/19.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/11.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/7.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/4.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/3.jpg`, `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/10.jpg`], "previewImage": `https://htmlacademy-react-3.appspot.com/six-cities/static/hotel/9.jpg`,
      "premium": true, "favourite": false,
      "rating": 2.8, "title": `Penthouse, 4-5 rooms + 5 balconies`, "type": `room`}]}
];

const favorites = [
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
      }, {
        previewImage: `img/apartment-01.jpg`,
        pictures: [`img/apartment-01.jpg`],
        title: `good rererer`,
        description: [`Wood and stone place`],
        premium: false,
        favourite: true,
        type: `Apartment`,
        rating: 6,
        bedrooms: 1,
        guests: 1,
        cost: 12000,
        conveniences: [`Cool vary cool place`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Lolo`,
          pro: true,
          id: 10,
        },
        id: 89,
      }, {
        previewImage: `img/apartment-07.jpg`,
        pictures: [`img/apartment-02.jpg`],
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
        id: 88989,
      }],
  },
  {
    city: `Cologne`,
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
        id: 89989,
      }, {
        previewImage: `img/apartment-01.jpg`,
        pictures: [`img/apartment-01.jpg`],
        title: `good rererer`,
        description: [`Wood and stone place`],
        premium: false,
        favourite: true,
        type: `Apartment`,
        rating: 6,
        bedrooms: 1,
        guests: 1,
        cost: 12000,
        conveniences: [`Cool vary cool place`],
        coordinates: [52.3909553943508, 4.85309666406198],
        owner: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Lolo`,
          pro: true,
          id: 10,
        },
        id: 8009,
      }, {
        previewImage: `img/apartment-07.jpg`,
        pictures: [`img/apartment-02.jpg`],
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
        id: 89887689,
      }],
  },
];

const mockState = {
  favorites,
};


describe(`Offers favorite reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`The reducer get favorite offers when favorite page mount`, () => {
    expect(reducer(initialState, {
      type: ActionType.GET_FAVORITES,
      favorites,
    })).toEqual(Object.assign(initialState, {
      favorites,
    }));
  });

  it(`The reducer remove favorite when user unfavorite offer`, () => {
    const favoritesWithoutUnfavoriteOffer = [
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
            rating: 6,
            bedrooms: 1,
            guests: 1,
            cost: 12000,
            conveniences: [`Cool vary cool place`],
            coordinates: [52.3909553943508, 4.85309666406198],
            owner: {
              avatar: `img/avatar-angelina.jpg`,
              name: `Lolo`,
              pro: true,
              id: 10,
            },
            id: 89,
          }, {
            previewImage: `img/apartment-07.jpg`,
            pictures: [`img/apartment-02.jpg`],
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
            id: 88989,
          }],
      },
      {
        city: `Cologne`,
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
            id: 89989,
          }, {
            previewImage: `img/apartment-01.jpg`,
            pictures: [`img/apartment-01.jpg`],
            title: `good rererer`,
            description: [`Wood and stone place`],
            premium: false,
            favourite: true,
            type: `Apartment`,
            rating: 6,
            bedrooms: 1,
            guests: 1,
            cost: 12000,
            conveniences: [`Cool vary cool place`],
            coordinates: [52.3909553943508, 4.85309666406198],
            owner: {
              avatar: `img/avatar-angelina.jpg`,
              name: `Lolo`,
              pro: true,
              id: 10,
            },
            id: 8009,
          }, {
            previewImage: `img/apartment-07.jpg`,
            pictures: [`img/apartment-02.jpg`],
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
            id: 89887689,
          }],
      },
    ];

    expect(reducer(mockState, {
      type: ActionType.REMOVE_FROM_FAVORITES,
      favoriteOffers: favoritesWithoutUnfavoriteOffer,
    })).toEqual(Object.assign(mockState, {
      favorites: favoritesWithoutUnfavoriteOffer,
    }));
  });

  it(`Should make a correct API call to /favorites`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.getFavorites();

    apiMock
      .onGet(`/favorite`)
      .reply(200, mockFavorites, {});

    return offersLoader(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.GET_FAVORITES,
          favorites: citiesFavoriteOffers,
        });
      });
  });
});

describe(`Offers favorites reducer actions work correctly`, () => {
  it(`Action creators of get favorite offers returns correct action`, () => {
    expect(ActionCreator.getFavoritesOffers(favorites)).toEqual({
      type: ActionType.GET_FAVORITES,
      favorites,
    });
  });

  it(`Action creators of remove from favorite offers work correctly`, () => {
    expect(ActionCreator.removeFromFavorite(favorites)).toEqual({
      type: ActionType.REMOVE_FROM_FAVORITES,
      favoriteOffers: favorites,
    });
  });
});

