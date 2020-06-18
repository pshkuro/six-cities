import {mount} from "enzyme";
import Main from "./main.jsx";
import React from "react";

const props = {
  offers: [
    {
      picture: `img/apartment-02.jpg`,
      premium: true,
      cost: 1245,
      description: `Dodo`,
      type: `Apartment`,
      rating: 2.4,
      id: 868686,
    }, {
      picture: `img/apartment-02.jpg`,
      premium: false,
      cost: 45045,
      description: `Cool`,
      type: `Hotel`,
      rating: 4,
      id: 40404,
    }, {
      picture: `img/apartment-01.jpg`,
      premium: false,
      cost: 56045,
      description: `Good hotel`,
      type: `Apartment`,
      rating: 5,
      id: 1212,
    }],
  onAdvertCardTitleClick: jest.fn(),
};


describe(`AdvertCard`, () => {
  it(`Advert card titles should be clicked`, () => {

    const mainComponent = mount(
        <Main {...props}/>
    );

    const advertCardTitles = mainComponent.find(`.place-card__name`);
    advertCardTitles.forEach((advertCardTitle) => advertCardTitle.simulate(`click`, {preventDefault() {}}));

    expect(props.onAdvertCardTitleClick).toHaveBeenCalledTimes(advertCardTitles.length);

  });
});
