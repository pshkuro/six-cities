export const parseReview = (data) => {
  const {
    comment,
    date,
    rating,
    id,
    user: {
      avatar_url: avatar,
      is_pro: isPro,
      name,
      id: userId,
    },
  } = data;

  return ({
    comment,
    date,
    rating,
    id,
    user: {
      avatar,
      isPro,
      name,
      id: userId,
    }
  });
};
