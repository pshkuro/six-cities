export const getRandomArrayItem = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomIntegerRoundingNumber = (min, max, n) => {
  return (Math.random() * (max - min)).toFixed(n);
};


