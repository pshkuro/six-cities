// Функция генерации случ эл заданного массива
export const getRandomArrayItem = (arr) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

// Генерация случ числа от мин до макс
export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// Генерация случайного числа от мин до макс с округлением до n после запятой
export const getRandomIntegerRoundingNumber = (min, max, n) => {
  return (Math.random() * (max - min)).toFixed(n);
};


