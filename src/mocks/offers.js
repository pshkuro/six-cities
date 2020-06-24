import {getRandomArrayItem, getRandomIntegerNumber, getRandomCountRandomArrayItem, shuffleArray} from "../utils/common.js";

const OFFERS_NUMBER = 4;
const OfferInfo = {
  PICTURES: [`img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/room.jpg`],
  TITLE: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
  TYPE: [`Apartment`, `Room`, `House`, `Hotel`],
  DESCRIPTION: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
  CONVENIENCES: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
  COORDINATES: [[52.3909553943508, 4.85309666406198], [52.369553943508, 4.85309666406198],
    [52.3909553943508, 4.929309666406198], [52.3809553943508, 4.939309666406198]],
  OWNER_NAME: [`Karl`, `Peter`, `Stas`, `Kolya`, `Andrew`, `Ann`, `Lia`],
  OWNER_PICTURE: [`img/avatar-angelina.jpg`, `img/avatar-max.jpg`],

};

const generateOffer = (index) => {
  return {
    pictures: shuffleArray([...OfferInfo.PICTURES]),
    title: getRandomArrayItem(OfferInfo.TITLE),
    description: OfferInfo.DESCRIPTION,
    premium: Boolean(getRandomIntegerNumber(0, 2)),
    type: getRandomArrayItem(OfferInfo.TYPE),
    rating: getRandomIntegerNumber(0, 5),
    bedrooms: getRandomIntegerNumber(0, 5),
    guests: getRandomIntegerNumber(0, 10),
    cost: getRandomIntegerNumber(50, 999),
    conveniences: getRandomCountRandomArrayItem(OfferInfo.CONVENIENCES),
    coordinates: OfferInfo.COORDINATES[index],
    owner: {
      avatar: getRandomArrayItem(OfferInfo.OWNER_PICTURE),
      name: getRandomArrayItem(OfferInfo.OWNER_NAME),
      pro: Boolean(getRandomIntegerNumber(0, 2)),
    },
    id: Math.random(),
  };
};

const generateOffers = (count) => {
  return new Array(count)
  .fill(``)
  .map((item, index) => generateOffer(index));
};

export const offers = generateOffers(OFFERS_NUMBER);


