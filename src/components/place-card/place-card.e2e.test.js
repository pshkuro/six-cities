import React from "react";
import {mount} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import {PlaceCard} from "./place-card.jsx";
import {AuthorizationStatus} from "../../constants/page.js";


const props = {
  offer: {
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
  },
  onAdvertCardMouseOver: jest.fn((x) => x),
  onAdvertCardMouseOut: jest.fn(),
  classes: {
    card: `cities__place-`,
    wrapper: `cities`,
    cards: `cities__places-`,
    map: `cities`,
  },
  setFavorite: jest.fn((z) => z),
  removeFromFavorite: jest.fn((z) => z),
  authorizationStatus: `AUTH`,
};


describe(`PlaceCard tests`, () => {
  it(`Hovering PlaceCard get to callback info about itself`, () => {
    const placeCard = mount(
        <BrowserRouter>
          <PlaceCard {...props}/>
        </BrowserRouter>
    );

    placeCard.simulate(`mouseEnter`);

    expect(props.onAdvertCardMouseOver).toHaveBeenCalledTimes(1);
    expect(props.onAdvertCardMouseOver.mock.results[0].value).toMatchObject(props.offer);
  });

  it(`Click on favorite button should to callback`, () => {
    const placeCard = mount(
        <BrowserRouter>
          <PlaceCard {...props}
            authorizationStatus={AuthorizationStatus.AUTH}/>
        </BrowserRouter>
    );

    const favoriteButton = placeCard.find(`.place-card__bookmark-button`).first();
    favoriteButton.simulate(`click`);

    expect(props.setFavorite).toHaveBeenCalledTimes(1);
    expect(props.setFavorite).toHaveBeenCalledWith(props.offer.id, 0, props.offer);
  });
});
