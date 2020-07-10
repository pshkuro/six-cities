import {getAuthorizationStatus, postUserAuthorizationInfo} from "../../api/clients.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  profile: null,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  GET_PROFILE: `GET_PROFILE`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status,
    };
  },

  getProfile: (profile) => {
    return {
      type: ActionType.GET_PROFILE,
      profile,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.status,
      });

    case ActionType.GET_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return getAuthorizationStatus(api)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return postUserAuthorizationInfo(api, authData)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.getProfile(response.data));
      });
  },
};


export {
  ActionCreator,
  ActionType,
  reducer,
  Operation,
  AuthorizationStatus
};

