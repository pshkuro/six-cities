import {postNewReview, getReviews} from "../../api/clients";
import {parseReview} from "../mapping/review-parser";

const initialState = {
  reviews: null,
};

const ActionType = {
  GET_OFFERS_REVIEWS: `GET_OFFERS_REVIEWS`,
};

const ActionCreator = {
  getOffersReviews: (reviews) => {
    return {
      type: ActionType.GET_OFFERS_REVIEWS,
      reviews,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_OFFERS_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.reviews,
      });
  }

  return state;
};

const parseReviews = (data) => {
  return data.map((review) => parseReview(review));
};

const Operation = {
  addReview: (data, id, onSuccess, onError) => (dispatch, getState, api) => {
    return postNewReview(api, data, id)
    .then((response) => parseReviews(response.data))
      .then((reviews) => {
        dispatch(ActionCreator.getOffersReviews(reviews));
        onSuccess();
      })
      .catch((err) => {
        onError();
        throw err;
      });
  },

  getReviews: (id) => (dispatch, getState, api) => {
    return getReviews(api, id)
    .then((response) => parseReviews(response.data))
      .then((reviews) => {
        dispatch(ActionCreator.getOffersReviews(reviews));
      })
      .catch((err) => {
        throw err;
      });
  },
};

export {
  ActionCreator,
  ActionType,
  reducer,
  Operation,
};
