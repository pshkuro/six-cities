const Timeout = {
  SHAKE_ANIMATION: 600,
};

// Эффект `покачивание головой при неудачной отправке/удалении коммента`
export const shake = (element) => {
  element.classList.add(`shake`);

  setTimeout(() => {
    element.classList.remove(`shake`);
  }, Timeout.SHAKE_ANIMATION);
};


