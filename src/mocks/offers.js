import {getRandomArrayItem, getRandomIntegerNumber, getRandomCountRandomArrayItem, shuffleArray} from "../utils/common.js";

const OfferInfo = {
  PICTURES: [`img/apartment-01.jpg`, `img/apartment-02.jpg`, `img/apartment-03.jpg`, `img/room.jpg`],
  TITLE: [`Beautiful & luxurious apartment at great location`, `Wood and stone place`, `Beautyful seaview`, `Fantastic house with swimming pull`],
  TYPE: [`Apartment`, `Room`, `House`, `Hotel`],
  DESCRIPTION: [`A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.`,
    `An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.`],
  CONVENIENCES: [`Wifi`, `Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`, `Towels`, `Baby seat`, `Cabel TV`],
  OWNER_NAME: [`Karl`, `Peter`, `Stas`, `Kolya`, `Andrew`, `Ann`, `Lia`],
  OWNER_PICTURE: [`img/avatar-angelina.jpg`, `img/avatar-max.jpg`],
};

const coordinates = {
  'Paris': [[48.851609, 2.314442], [48.864883, 2.343624],
    [48.866909, 2.346542], [48.867688, 2.280761],
    [48.892023, 2.364682], [48.886097, 2.307680],
    [48.888016, 2.305416], [48.858833, 2.355327]],
  'Cologne': [[50.965270, 6.948829], [50.978483, 6.964052],
    [50.990235, 6.978461], [50.954571, 6.996346],
    [50.939316, 6.946421], [50.901387, 6.969509],
    [50.925428, 6.983285], [50.930283, 6.987652]],
  'Brussels': [[50.848126, 4.357320], [50.856254, 4.379164],
    [50.865044, 4.354906], [50.836602, 4.395547],
    [50.852888, 4.372609], [50.867110, 4.348523],
    [50.837368, 4.346420], [50.847340, 4.364895]],
  'Amsterdam': [[52.3909553943508, 4.85309666406198], [52.369553943508, 4.85309666406198],
    [52.3909553943508, 4.929309666406198], [52.3809553943508, 4.939309666406198],
    [52.3609553943508, 4.939309666406198], [52.3509553943508, 4.939309666406198],
    [52.3609553943508, 4.929309666406198], [52.3509553943508, 4.919309666406198]],
  'Hamburg': [[53.530500, 9.979116], [53.526021, 10.044519],
    [53.561349, 9.940986], [53.535578, 10.043831],
    [53.589226, 10.040378], [53.596358, 10.078047],
    [53.541883, 10.041633], [53.546224, 10.025744]],
  'Dusseldorf': [[51.241810, 6.781039], [51.244854, 6.744498],
    [51.246627, 6.777189], [51.254202, 6.750732],
    [51.272397, 6.785484], [51.234041, 6.780731],
    [51.217062, 6.764445], [51.261374, 6.733503]],
};

const CITIES = [
  {
    city: `Paris`,
    cityCoordinates: [48.8534100, 2.3488000],
  },
  {
    city: `Cologne`,
    cityCoordinates: [50.9333300, 6.9500000],
  },
  {
    city: `Brussels`,
    cityCoordinates: [50.8504500, 4.3487800],
  },
  {
    city: `Amsterdam`,
    cityCoordinates: [52.38333, 4.9],
  },
  {
    city: `Hamburg`,
    cityCoordinates: [53.5753200, 10.0153400],
  },
  {
    city: `Dusseldorf`,
    cityCoordinates: [51.2217200, 6.7761600],
  },
];


const generateReview = () => {
  return {
    avatar: getRandomArrayItem(OfferInfo.OWNER_PICTURE),
    name: getRandomArrayItem(OfferInfo.OWNER_NAME),
    stars: getRandomIntegerNumber(0, 5),
    description: OfferInfo.DESCRIPTION,
    date: new Date().toString(),
    id: Math.random(),
  };
};

const generateOffer = (index, city) => {
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
    coordinates: coordinates[city][index],
    owner: {
      avatar: getRandomArrayItem(OfferInfo.OWNER_PICTURE),
      name: getRandomArrayItem(OfferInfo.OWNER_NAME),
      pro: Boolean(getRandomIntegerNumber(0, 2)),
    },
    id: Math.random(),
    reviwes: generateReviews(),
  };
};

const generateReviews = () => {
  const count = getRandomIntegerNumber(1, 5);

  return new Array(count)
  .fill(``)
  .map(() => generateReview());
};

const generateOffers = (count, city) => {
  return new Array(count)
  .fill(``)
  .map((item, index) => generateOffer(index, city));
};

export const offers = CITIES.map((city) => {
  return (Object.assign(city, {
    offers: generateOffers(getRandomIntegerNumber(0, 3), city.city),
  }));
});

