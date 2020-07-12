import {
  getAuthorizationStatus,
  getProfile
} from "./selectors.js";

const mockState = {
  USER: {
    authorizationStatus: `AUTH`,
    profile: {},
  }
};

describe(`User reducer selector tests`, () => {
  it(`Get authorization selector return correct value`, () => {
    expect(getAuthorizationStatus(mockState)).toEqual(`AUTH`);
  });

  it(`Get profile selector return correct value`, () => {
    expect(getProfile(mockState)).toEqual(mockState.USER.profile);
  });
});
