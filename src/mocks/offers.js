import {getRandomArrayItem, getRandomIntegerNumber, getRandomCountRandomArrayItem, shuffleArray} from "../utils/common.js";

const OFFERS_NUMBER = 4;
const OfferInfo = {
  PICTURES: [`img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/room.jpg`],
  TITLE: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
  TYPE: [`Apartment`, `Room`, `House`, `Hotel`],
  DESCRIPTION: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
  COMFORT: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
  OWNER_NAME: [`Karl`, `Peter`, `Stas`, `Kolya`, `Andrew`, `Ann`, `Lia`],
  OWNER_PICTURE: [`img/avatar-angelina.jpg`, `img/avatar-max.jpg`],

};

const generateOffer = () => {
  return {
    pictures: shuffleArray(OfferInfo.PICTURES),
    title: getRandomArrayItem(OfferInfo.TITLE),
    description: OfferInfo.DESCRIPTION,
    premium: Boolean(getRandomIntegerNumber(0, 2)),
    type: getRandomArrayItem(OfferInfo.TYPE),
    rating: getRandomIntegerNumber(0, 5),
    bedrooms: getRandomIntegerNumber(0, 5),
    guests: getRandomIntegerNumber(0, 10),
    cost: getRandomIntegerNumber(50, 999),
    comfort: getRandomCountRandomArrayItem(OfferInfo.COMFORT),
    owner: {
      picture: getRandomArrayItem(OfferInfo.OWNER_PICTURE),
      name: getRandomArrayItem(OfferInfo.OWNER_NAME),
      super: Boolean(getRandomIntegerNumber(0, 2)),
    },
    id: Math.random(),
  };
};

const generateOffers = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateOffer);
};

export const offers = generateOffers(OFFERS_NUMBER);


