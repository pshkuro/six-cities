import {getRandomArrayItem, getRandomIntegerNumber, getRandomIntegerRoundingNumber} from "../utils/common.js";

const OFFERS_NUMBER = 4;
const OfferInfo = {
  PICTURE: [`img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`],
  DESCRIPTION: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
  TYPE: [`Apartment`, `Room`, `House`, `Hotel`],
};

const generateOffer = () => {
  return {
    picture: getRandomArrayItem(OfferInfo.PICTURE),
    premium: getRandomIntegerNumber(0, 2),
    cost: getRandomIntegerNumber(50, 999),
    description: getRandomArrayItem(OfferInfo.DESCRIPTION),
    type: getRandomArrayItem(OfferInfo.TYPE),
    rating: getRandomIntegerRoundingNumber(0, 5, 0),
  };
};

const generateOffers = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateOffer);
};

export const offers = generateOffers(OFFERS_NUMBER);


