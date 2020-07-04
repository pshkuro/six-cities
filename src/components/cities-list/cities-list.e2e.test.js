import React from "react";
import {shallow} from "enzyme";
import {CitiesList} from "./cities-list.jsx";

const props = {
  cities: [`Paris`, `Moscow`, `Amsterdam`, `Honkong`],
  city: `Moscow`,
  onChooseCityClick: jest.fn(),
};

it(`CitiesList city click get right city name`, () => {
  const citiesList = shallow(
      <CitiesList {...props}/>
  );

  const city = citiesList.find(`.locations__item`).first();
  city.simulate(`click`);

  expect(props.onChooseCityClick).toHaveBeenCalledTimes(1);
  expect(props.onChooseCityClick.mock.calls[0][0]).toEqual(props.cities[0]);
});
