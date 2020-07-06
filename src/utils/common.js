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


export const shuffleArray = (array) => {
  let j; let x; let i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

export function convertDateToMonthDayFormat(date) {
  if (!Intl || !Intl.DateTimeFormat) {
    return date.toString();
  }
  const formatter = new Intl.DateTimeFormat(`en-US`, {
    month: `long`,
    day: `numeric`
  });

  return formatter.format(date);
}

