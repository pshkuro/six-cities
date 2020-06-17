import {shallow} from "enzyme";
import PlaceCard from "./place-card.jsx";
import React from "react";

const offer = {
  picture: `img/apartment-05.jpg`,
  premium: true,
  cost: 10,
  description: `Good apartment`,
  type: `Apartment`,
  rating: 5,
};

it(`Hovering PlaceCard get to callback info about itself`, () => {
  const onAdvertCardMouseOver = jest.fn((x) => x);

  const placeCard = shallow(
      <PlaceCard
        offer={offer}
        onAdvertCardTitleClick={() => {}}
        onAdvertCardMouseOver={onAdvertCardMouseOver}
      />
  );

  placeCard.simulate(`mouseover`);

  expect(onAdvertCardMouseOver).toHaveBeenCalledTimes(1);
  expect(onAdvertCardMouseOver.mock.results[0].value).toMatchObject(offer);
});
