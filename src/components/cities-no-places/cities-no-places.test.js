import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import CitiesNoPlaces from "./cities-no-places.jsx";

const props = {
  city: `Moscow`,
};

const mockStore = configureStore([]);

it(`CitiesNoPlaces render`, () => {
  const store = mockStore({
    cities: [`Moscow`, `Colo`],
    city: `Moscow`,
  });

  const tree = renderer
  .create(
      <Provider store={store}>
        <CitiesNoPlaces {...props}/>
      </Provider>
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
