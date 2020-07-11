export const getHotels = (api) => api.get(`/hotels`);
export const getAuthorizationStatus = (api) => api.get(`/login`);
export const postUserAuthorizationInfo = (api, data) => api.post(`/login`, {
  email: data.login,
  password: data.password,
});

export const postNewReview = (api, data, id) => api.post(`/comments/${id}`, data);
export const getReviews = (api, id) => api.get(`/comments/${id}`);
