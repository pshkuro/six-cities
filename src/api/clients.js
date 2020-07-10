export const getHotels = (api) => api.get(`/hotels`);
export const getAuthorizationStatus = (api) => api.get(`/login`);
export const postUserAuthorizationInfo = (api, data) => api.post(`/login`, {
  email: data.login,
  password: data.password,
});
