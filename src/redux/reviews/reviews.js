import {postNewReview, getReviews} from "../../api/clients.js";
import {parseReview} from "../mapping/review-parser.js";

const initialState = {
  reviews: null,
};

const ActionType = {
  GET_OFFERS_REVIEWS: `GET_OFFERS_REVIEWS`,
  // ADD_NEW_REVIEW: `ADD_NEW_REVIEW`,
};

const ActionCreator = {
  getOffersReviews: (reviews) => {
    return {
      type: ActionType.GET_OFFERS_REVIEWS,
      reviews,
    };
  },

  // addNewReview: (reviews) => {
  //   return {
  //     type: ActionType.ADD_NEW_REVIEW,
  //     reviews,
  //   };
  // },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ActionType.addNewReview:
    //   return Object.assign({}, state, {
    //     review: action.review,
    //   });

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
  addReview: (data, id) => (dispatch, getState, api) => {
    return postNewReview(api, data, id)
    .then((response) => parseReview(response.data))
      .then((reviews) => {
        dispatch(ActionCreator.getOffersReviews(reviews));
      })
      .catch((err) => {
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
