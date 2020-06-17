import {mount} from "enzyme";
import Main from "./main.jsx";
import React from "react";

const offers = [
  {
    picture: `img/apartment-02.jpg`,
    premium: true,
    cost: 1245,
    description: `Dodo`,
    type: `Apartment`,
    rating: 2.4,
  }, {
    picture: `img/apartment-02.jpg`,
    premium: false,
    cost: 45045,
    description: `Cool`,
    type: `Hotel`,
    rating: 4,
  }, {
    picture: `img/apartment-01.jpg`,
    premium: false,
    cost: 56045,
    description: `Good hotel`,
    type: `Apartment`,
    rating: 5,
  }];

describe(`AdvertCard`, () => {
  it(`Advert card titles should be clicked`, () => {
    const onAdvertCardTitleMockClick = jest.fn();

    const mainComponent = mount(
        <Main offers={offers}
          onAdvertCardTitleClick={onAdvertCardTitleMockClick}
        />
    );

    const advertCardTitles = mainComponent.find(`.place-card__name`);
    advertCardTitles.forEach((advertCardTitle) => advertCardTitle.simulate(`click`, {preventDefault() {}}));

    expect(onAdvertCardTitleMockClick).toHaveBeenCalledTimes(advertCardTitles.length);

  });
});
