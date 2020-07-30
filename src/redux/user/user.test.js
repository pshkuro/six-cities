import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api/api";
import {reducer, ActionCreator, ActionType, Operation} from "./user";
import {AuthorizationStatus} from "../../constants/page";
import {noop} from "../../utils/common";

const api = createAPI(noop);

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  profile: null,
};

describe(`User reducer work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(reducer(undefined, {})).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      profile: null,
    });
  });

  it(`Reducer should change authorizationStatus by a given value`, () => {
    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.AUTH,
    });

    expect(reducer({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    }, {
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.NO_AUTH,
    })).toEqual({
      authorizationStatus: AuthorizationStatus.NO_AUTH,
    });
  });

  it(`Reducer should get propfile info`, () => {
    expect(reducer(initialState, {
      type: ActionType.GET_PROFILE,
      profile: {
        email: `papa@mail.ru`,
        password: `dhjdf`,
      },
    })).toEqual(Object.assign(initialState, {
      profile: {
        email: `papa@mail.ru`,
        password: `dhjdf`,
      },
    }));
  });
});

describe(`User Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      status: AuthorizationStatus.AUTH,
    });
  });

  it(`Action creator for post user info returns correct action`, () => {
    const userInfo = {
      email: `sd`,
      name: `pokw`,
    };
    expect(ActionCreator.getProfile(userInfo)).toEqual({
      type: ActionType.GET_PROFILE,
      profile: userInfo,
    });
  });
});

describe(`User operation work correctly`, () => {
  it(`Should make a correct API call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuth = Operation.checkAuth();

    apiMock
      .onGet(`/login`)
      .reply(200, {});

    return checkAuth(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({type: ActionType.REQUIRED_AUTHORIZATION, status: `AUTH`});
      });
  });

  it(`Should make a correct API post to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login({
      email: `papa@mail.ru`,
      password: `dhjdf`,
    });

    apiMock
      .onPost(`/login`)
      .reply(204, {
        email: `papa@mail.ru`,
        password: `dhjdf`,
      });

    return login(dispatch, noop, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch.mock.calls[0][0]).toEqual({type: ActionType.REQUIRED_AUTHORIZATION, status: `AUTH`});
        expect(dispatch.mock.calls[1][0]).toEqual({type: ActionType.GET_PROFILE, profile: {
          email: `papa@mail.ru`,
          password: `dhjdf`,
        }});
      });
  });
});
