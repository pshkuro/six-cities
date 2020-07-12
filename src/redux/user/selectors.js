import NameSpace from "../name-space.js";

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getProfile = (state) => {
  return state[NameSpace.USER].profile;
};

