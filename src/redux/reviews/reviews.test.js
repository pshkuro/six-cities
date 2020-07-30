import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {reducer, ActionCreator, ActionType, Operation} from "./reviews";
import {noop} from "../../utils/common";


const api = createAPI(noop);

const initialState = {
  reviews: null,
};

const reviews = [
  {
    comment: `Cool`,
    date: `12 April`,
    rating: 5,
    id: 124,
    user: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Peter`,
      isPro: false,
      id: 12,
    }
  },
  {
    comment: `beautiful`,
    date: `12 April`,
    rating: 5,
    id: 12334,
    user: {
      avatar: `img/avatar-angelina.jpg`,
      name: `Peter`,
      isPro: true,
      id: 1442,
    },
  }
];

const mockReviews = [
  {
    comment: `Cool`,
    date: `12 April`,
    rating: 5,
    id: 124,
    user: {
      "avatar_url": `img/avatar-angelina.jpg`,
      "name": `Peter`,
      "is_pro": false,
      "id": 12,
    }
  },
  {
    comment: `beautiful`,
    date: `12 April`,
    rating: 5,
    id: 12334,
    user: {
      "avatar_url": `img/avatar-angelina.jpg`,
      "name": `Peter`,
      "is_pro": true,
      "id": 1442,
    },
  }
];

describe(`Reviews reducer work correctly`, () => {
  it(`Reviews reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`Reviews reducer change reviews by recieve value`, () => {
    expect(reducer(initialState, {
      type: ActionType.GET_OFFERS_REVIEWS,
      reviews: mockReviews,
    })).toEqual(Object.assign(initialState, {
      reviews: mockReviews,
    }));
  });
});

describe(`Reviews action creators work correctly`, () => {
  it(`Action creators of get reviews returns correct action`, () => {
    expect(ActionCreator.getOffersReviews(mockReviews)).toEqual({
      type: ActionType.GET_OFFERS_REVIEWS,
      reviews: mockReviews,
    });
  });
});

describe(`Reviews operation work correctly`, () => {
  it(`Should make a correct API call to /comments`, () => {
    const apiMock = new MockAdapter(api);
    const mockId = 6;
    const dispatch = jest.fn();
    const getOfferReviews = Operation.getReviews(mockId);

    apiMock
      .onGet(`/comments/${mockId}`)
      .reply(200, mockReviews, {});

    return getOfferReviews(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: ActionType.GET_OFFERS_REVIEWS,
          reviews,
        });
      });
  });

  it(`Should make a correct API/post to /comments`, () => {
    const mockReview = [
      {
        comment: `papa@mail.ru`,
        date: `12 April`,
        rating: 6,
        id: 124,
        user: {
          "avatar_url": `img/avatar-angelina.jpg`,
          "name": `Peter`,
          "is_pro": false,
          "id": 12,
        }
      }
    ];

    const storeReviews = [
      {
        comment: `papa@mail.ru`,
        date: `12 April`,
        rating: 6,
        id: 124,
        user: {
          avatar: `img/avatar-angelina.jpg`,
          name: `Peter`,
          isPro: false,
          id: 12,
        }
      }];
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const onSuccessMock = jest.fn();
    const onErrorMock = jest.fn();
    const mockId = 6;
    const review = Operation.addReview({
      comment: `papa@mail.ru`,
      rating: 6,
    }, mockId, onSuccessMock, onErrorMock);

    apiMock
    .onPost(`/comments/${mockId}`)
    .reply(204, mockReview);

    return review(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch.mock.calls[0][0]).toEqual({type: ActionType.GET_OFFERS_REVIEWS, reviews: storeReviews});
      });
  });


});
