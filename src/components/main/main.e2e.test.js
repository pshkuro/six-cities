import React from "react";
import {mount} from "enzyme";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import CitiesNoPlaces from "../cities-no-places/cities-no-places.jsx";

const mockOffers = {
  offers: [
    {
      city: `Paris`,
      cityCoordinates: {
        coordinates: [52.3909553943508, 4.85309666406198],
        zoom: 12,
      },
      offers: [
        {
          previewImage: `img/apartment-01.jpg`,
          pictures: [`img/apartment-01.jpg`],
          title: `good rererer`,
          description: [`Wood and stone place`],
          premium: false,
          favourite: true,
          type: `Apartment`,
          rating: 1.8,
          bedrooms: 5,
          guests: 1,
          cost: 120,
          conveniences: [`Cool vary cool place`],
          coordinates: [52.3909553943508, 4.85309666406198],
          owner: {
            avatar: `img/avatar-angelina.jpg`,
            name: `Lolo`,
            pro: true,
            id: 12,
          },
          id: 89089,
        }, {
          previewImage: `img/apartment-01.jpg`,
          pictures: [`img/apartment-01.jpg`],
          title: `good rererer`,
          description: [`Wood and stone place`],
          premium: false,
          favourite: true,
          type: `Apartment`,
          rating: 6,
          bedrooms: 1,
          guests: 1,
          cost: 12000,
          conveniences: [`Cool vary cool place`],
          coordinates: [52.3909553943508, 4.85309666406198],
          owner: {
            avatar: `img/avatar-angelina.jpg`,
            name: `Lolo`,
            pro: true,
            id: 10,
          },
          id: 89,
        }, {
          previewImage: `img/apartment-07.jpg`,
          pictures: [`img/apartment-02.jpg`],
          title: `good rererer`,
          description: [`Wood and stone place`],
          premium: false,
          favourite: true,
          type: `Apartment`,
          rating: 1.8,
          bedrooms: 5,
          guests: 1,
          cost: 120,
          conveniences: [`Cool vary cool place`],
          coordinates: [52.3909553943508, 4.85309666406198],
          owner: {
            avatar: `img/avatar-angelina.jpg`,
            name: `Lolo`,
            pro: true,
            id: 12,
          },
          id: 8989,
        }],
    },
    {
      city: `Cologne`,
      cityCoordinates: {
        coordinates: [52.3909553943508, 4.85309666406198],
        zoom: 12,
      },
      offers: [
        {
          previewImage: `img/apartment-01.jpg`,
          pictures: [`img/apartment-01.jpg`],
          title: `good rererer`,
          description: [`Wood and stone place`],
          premium: false,
          favourite: true,
          type: `Apartment`,
          rating: 1.8,
          bedrooms: 5,
          guests: 1,
          cost: 120,
          conveniences: [`Cool vary cool place`],
          coordinates: [52.3909553943508, 4.85309666406198],
          owner: {
            avatar: `img/avatar-angelina.jpg`,
            name: `Lolo`,
            pro: true,
            id: 12,
          },
          id: 8989,
        }, {
          previewImage: `img/apartment-01.jpg`,
          pictures: [`img/apartment-01.jpg`],
          title: `good rererer`,
          description: [`Wood and stone place`],
          premium: false,
          favourite: true,
          type: `Apartment`,
          rating: 6,
          bedrooms: 1,
          guests: 1,
          cost: 12000,
          conveniences: [`Cool vary cool place`],
          coordinates: [52.3909553943508, 4.85309666406198],
          owner: {
            avatar: `img/avatar-angelina.jpg`,
            name: `Lolo`,
            pro: true,
            id: 10,
          },
          id: 89,
        }, {
          previewImage: `img/apartment-07.jpg`,
          pictures: [`img/apartment-02.jpg`],
          title: `good rererer`,
          description: [`Wood and stone place`],
          premium: false,
          favourite: true,
          type: `Apartment`,
          rating: 1.8,
          bedrooms: 5,
          guests: 1,
          cost: 120,
          conveniences: [`Cool vary cool place`],
          coordinates: [52.3909553943508, 4.85309666406198],
          owner: {
            avatar: `img/avatar-angelina.jpg`,
            name: `Lolo`,
            pro: true,
            id: 12,
          },
          id: 8989,
        }],
    },
  ]
};

const mockStore = configureStore([]);


describe(`Main tests`, () => {
  // Когда будет приходить с сервера не забыть переписать компонент и тест, будет не пустой Offers,
  // его вообще не будет
  it(`When no office show CitiesNoPlaces component`, () => {
    const store = mockStore({
      PAGE: {
        city: `Moscow`,
      },
      OFFERS_DATA: mockOffers,
    });

    const noOffers = {
      city: `Paris`,
      coordinates: [[52.3909553943508, 4.85309666406198]],
      offers: [],
    };

    const main = mount(
        <Provider store = {store}>
          <Main offers={noOffers}/>
        </Provider>
    );

    const offersPlacesContainer = main.find(`.cities__places-container`);

    expect(main.contains(offersPlacesContainer)).toBe(false);
    expect(main.contains(CitiesNoPlaces)).toBe(true);

  });

});
