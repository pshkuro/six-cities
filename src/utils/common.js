export const getRandomArrayItem = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));

};


export const getRandomCountRandomArrayItem = (array, count) => {
  const shuffleArr = shuffleArray(array);

  const maxRandomCount = count ? count : shuffleArr.length;

  const randomLength = getRandomIntegerNumber(1, maxRandomCount);
  return shuffleArr.slice(0, randomLength);
};


export const shuffleArray = (arr) => {
  let j = 0;
  let temp = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};


