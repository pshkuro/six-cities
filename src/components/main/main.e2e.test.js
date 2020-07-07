import React from "react";
import {mount} from "enzyme";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import CitiesNoPlaces from "../cities-no-places/cities-no-places.jsx";


const mockStore = configureStore([]);


describe(`Main tests`, () => {
  // Когда будет приходить с сервера не забыть переписать компонент и тест, будет не пустой Offers,
  // его вообще не будет
  it(`When no office show CitiesNoPlaces component`, () => {
    const store = mockStore({
      cities: [`Moscow`, `Colo`],
      city: `Moscow`,
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
