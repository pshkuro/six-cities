import {
  getActiveOffer,
  getActiveCity
} from "./selectors";

const mockState = {
  PAGE: {
    city: `Paris`,
    step: `detail`,
    propertyOffer: {
      pictures: [`img/apartment-05.jpg`],
      premium: true,
      cost: 11,
      description: [`Good apartment`],
      type: `Apartment`,
      rating: 2,
      title: `Place cool`,
      bedrooms: 1,
      guests: 1,
      conveniences: [`Beautiful`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 909,
    },
    activeOffer: {
      pictures: [`img/apartment-05.jpg`],
      premium: true,
      cost: 11,
      description: [`Good apartment`],
      type: `Apartment`,
      rating: 2,
      title: `Place cool`,
      bedrooms: 1,
      guests: 1,
      conveniences: [`Beautiful`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 909,
    },
  }
};

describe(`Page reducer selectors tests`, () => {
  it(`Get active offer selector return correct offer`, () => {
    expect(getActiveOffer(mockState)).toEqual(mockState.PAGE.activeOffer);
  });

  it(`Get active city selector return correct offer`, () => {
    expect(getActiveCity(mockState)).toEqual(`Paris`);
  });
});
