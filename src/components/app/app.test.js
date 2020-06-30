import React from "react";
import renderer from "react-test-renderer";
import {App} from "./app.jsx";

const props = {
  offers: [
    {
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
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
      },
      id: 8989,
      reviwes: [{}, {}],
    }, {
      pictures: [`img/apartment-02.jpg`],
      premium: true,
      cost: 400,
      description: [`Wood and stone place`],
      type: `Hotel`,
      rating: 4,
      title: `Place cool`,
      bedrooms: 2,
      guests: 10,
      conveniences: [`Beautiful`, `Cize`, `Olo`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 1212,
      reviwes: [{}, {}],
    }, {
      pictures: [`img/apartment-01.jpg`],
      premium: true,
      cost: 5000,
      description: [`Good hotel`],
      type: `Apartment`,
      rating: 1,
      title: `Place cool`,
      bedrooms: 1,
      guests: 15,
      conveniences: [`Beautiful`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Clara`,
        pro: false,
      },
      id: 1012,
      reviwes: [{}, {}],
    }],
  nearOffers: [
    {
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
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
      },
      id: 112},
    {
      pictures: [`img/apartment-01.jpg`],
      title: `good rererer`,
      description: [`Wood and stone place`],
      premium: false,
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
      },
      id: 12},
  ]
};

it(`Render App`, () => {
  const tree = renderer
  .create(
      <App {...props}/>,
      {
        createNodeMock: () => {
          return document.createElement(`div`);
        }
      }
  )
  .toJSON();

  expect(tree).toMatchSnapshot();
});
