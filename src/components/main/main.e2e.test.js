import {mount} from "enzyme";
import Main from "./main.jsx";
import React from "react";

const props = {
  offers: [
    {
      pictures: [`img/apartment-02.jpg`],
      premium: true,
      cost: 1245,
      description: [`Dodo`],
      type: `Apartment`,
      rating: 2.4,
      title: `Place cool`,
      bedrooms: 2,
      guests: 10,
      conveniences: [`Beautiful`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 868686,
    }, {
      pictures: [`img/apartment-02.jpg`],
      premium: false,
      cost: 45045,
      description: [`Cool`],
      type: `Hotel`,
      rating: 4,
      title: `Seaview amazing`,
      bedrooms: 0,
      guests: 4,
      conveniences: [`Beautiful`],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Ella`,
        pro: true,
      },
      id: 40404,
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
