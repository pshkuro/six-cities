export const getHotels = (api) => api.get(`/hotels`);
export const getAuthorizationStatus = (api) => api.get(`/login`);
export const postUserAuthorizationInfo = (api, data) => api.post(`/login`, {
  email: data.login,
  password: data.password,
});

export const postNewReview = (api, data, id) => api.post(`/comments/${id}`, {
  comment: data.comment,
  rating: data.rating,
});
export const getReviews = (api, id) => api.get(`/comments/${id}`);

export const getFavorites = (api) => api.get(`/favorite`);
export const setFavorite = (api, id, status) => api.post(`/favorite/${id}/${status}`);
