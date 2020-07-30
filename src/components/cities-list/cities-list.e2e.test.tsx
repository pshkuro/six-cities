import * as React from "react";
import {shallow, mount} from "enzyme";
import {CitiesList} from "./cities-list";
import {mapDispatchToProps} from "./cities-list";

const props = {
  city: `Moscow`,
  onChooseCityClick: jest.fn(),
  cities: [`Paris`, `Moscow`],
  setDefaultCity: jest.fn(),
};


describe(`CitiesList Component work test`, () => {
  it(`CitiesList city click get right city name`, () => {
    const citiesList = shallow(
        <CitiesList {...props}/>
    );

    const city = citiesList.find(`.locations__item`).first();
    city.simulate(`click`);

    expect(props.onChooseCityClick).toHaveBeenCalledTimes(1);
    expect(props.onChooseCityClick.mock.calls[0][0]).toEqual(`Paris`);
  });
});

describe(`Cities list dispatch actions tests`, () => {
  const dispatch = jest.fn();

  it(`Click on city should to dispatch action with choosed city`, () => {
    const citiesList = mount(
        <CitiesList {...props}/>
    );

    const city = citiesList.find(`.locations__item`).first();
    city.simulate(`click`);

    mapDispatchToProps(dispatch).onChooseCityClick(`Paris`);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: `CHOOSE_CITY`,
      city: `Paris`,
    });

  });

  it(`Mounted dispatch default city if it null`, () => {
    mount(
        <CitiesList {...props}
          city={null}/>
    );

    mapDispatchToProps(dispatch).setDefaultCity(props.cities[0]);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: `CHOOSE_CITY`,
      city: `Paris`,
    });

  });


});
