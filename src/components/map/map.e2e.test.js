import React from "react";
import {mount} from "enzyme";
import Map from "./map.jsx";

const props = {
  pins: [{
    coordinates: [1212, 454545],
    isActive: false
  },
  {
    coordinates: [1212, 454545],
    isActive: true
  }],
  cityCoordinates: {
    coordinates: [52.3909553943508, 4.85309666406198],
    zoom: 12,
  },
  classes: {
    card: `cities__place-`,
    wrapper: `cities`,
    cards: `cities__places-`,
    map: `cities`,
  }
};

describe(`Map tests`, () => {
  // Удалила этот метод удалить тест?
  // it(`Ref delete after unmount element`, () => {
  //   const map = mount(
  //       <Map {...props}/>,
  //       {
  //         createNodeMock: () => {
  //           return document.createElement(`div`);
  //         }
  //       }
  //   );

  //   const {_mapRef} = map.instance();
  //   map.instance().componentWillUnmount();
  //   expect(_mapRef.current).toBe(null);

  // });

  it(`Map work correctly after new city coordinates`, () => {
    const map = mount(
        <Map {...props}/>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    jest.spyOn(map.instance(), `_cleanMap`);
    map.setProps(Object.assign(props, {cityCoordinates: {
      coordinates: [12.3434333, 1.1],
      zoom: 1,
    }}));
    expect(map.instance()._cleanMap).toHaveBeenCalledTimes(1);

  });

  it(`Map work correctly after new pins`, () => {
    const newPins = {
      pins: [{
        coordinates: [565656212, 4545585545],
        isActive: false
      }]
    };

    const map = mount(
        <Map {...props}/>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          }
        }
    );

    jest.spyOn(map.instance(), `_cleanPins`);
    map.setProps(Object.assign(props, newPins));
    expect(map.instance()._cleanPins).toHaveBeenCalledTimes(1);

  });


});
