import React, {cloneElement} from "react";
import {mount} from "enzyme";
import Main from "./main.jsx";
import PlaceCard from "../place-card/place-card.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Map from "../map/map.jsx";
import CitiesNoPlaces from "../cities-no-places/cities-no-places.jsx";
import PlaceList from "../places-list/place-list.jsx";

const SortingType = {
  DEFAULT: `popular`,
  TO_HIGHT: `to-high`,
  TO_LAW: `to-low`,
  TOP_RATED: `top-rated`,
};

function getSortedOffers(sortingType, offers) {
  switch (sortingType) {
    case SortingType.TO_HIGHT:
      return offers.slice().sort((a, b) => a.cost - b.cost);

    case SortingType.TO_LAW:
      return offers.slice().sort((a, b) => b.cost - a.cost);

    case SortingType.TOP_RATED:
      return offers.slice().sort((a, b) => b.rating - a.rating);

    default:
      return offers;
  }
}

const props = {
  offers: {
    city: `Paris`,
    cityCoordinates: [52.3909553943508, 4.85309666406198],
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
        reviwes: [{id: 12}, {id: 11}],
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
        reviwes: [{id: 2}, {id: 9}],
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
        reviwes: [{id: 90}, {id: 56}],
      }],
  },
  onAdvertCardTitleClick: jest.fn(),
};

const mockStore = configureStore([]);


describe(`Main tests`, () => {
  it(`Hovering PlaceCard callback get the same active offer that go in map`, () => {
    const store = mockStore({
      cities: [`Moscow`, `Colo`],
      city: `Moscow`,
    });

    const main = mount(
        <Provider store={store}>
          <Main {...props}/>
        </Provider>
    );

    const placeCard = main.find(PlaceCard).first();
    const placeCardOffer = placeCard.props().offer;

    placeCard.simulate(`mouseEnter`, {preventDefault() {}});

    const mainComponent = main.find(Main);
    const activeOffer = mainComponent.state().activeOffer;

    expect(activeOffer).toEqual(placeCardOffer);

    const map = main.find(Map);
    const mapActivePin = map.props().pins.find((pin) => pin.isActive);
    const mapActivePinCoordinates = mapActivePin.coordinates;

    expect(activeOffer.coordinates).toBe(mapActivePinCoordinates);
  });

  it(`Mouseout on PlaceCard put null active offer in state`, () => {
    const store = mockStore({
      cities: [`Moscow`, `Colo`],
      city: `Moscow`,
    });

    const main = mount(
        <Provider store = {store}>
          <Main {...props}/>
        </Provider>
    );

    const placeCard = main.find(PlaceCard).first();
    placeCard.simulate(`mouseEnter`, {preventDefault() {}});
    placeCard.simulate(`mouseLeave`, {preventDefault() {}});

    const mainComponent = main.find(Main);
    const activeOffer = mainComponent.state().activeOffer;

    expect(activeOffer).toBe(null);

  });

  // Когда будет приходить с сервера не забыть переписать компонент и тест, будет не пустой Offers,
  // его вообще не будет
  it(`When no office show CitiesNoPlaces component`, () => {
    const store = mockStore({
      cities: [`Moscow`, `Colo`],
      city: `Moscow`,
    });

    const noOffers = {
      city: `Paris`,
      coordinates: [[52.3909553943508, 4.85309666406198]],
      offers: [],
    };

    const main = mount(
        <Provider store = {store}>
          <Main offers={noOffers}/>
        </Provider>
    );

    const offersPlacesContainer = main.find(`.cities__places-container`);

    expect(main.contains(offersPlacesContainer)).toBe(false);
    expect(main.contains(CitiesNoPlaces)).toBe(true);

  });

  it(`Main sorted offers right when user choose sort type`, () => {
    const store = mockStore({
      cities: [`Moscow`, `Colo`],
      city: `Moscow`,
    });

    const main = mount(
        <Provider store = {store}>
          <Main {...props}/>
        </Provider>
    );

    const placesSortingTitle = main.find(`.places__sorting-type`);
    placesSortingTitle.simulate(`click`, {
      nativeEvent: {
        stopImmediatePropagation() {}
      }
    });
    const placesSortingListItem = main.find(`.places__option`).last();
    placesSortingListItem.simulate(`click`);

    const mainComponent = main.find(Main);
    const sortingType = mainComponent.state().sortingType;
    expect(sortingType).toBe(SortingType.TOP_RATED);

    const sortedOffers = getSortedOffers(sortingType, mainComponent.props().offers.offers);
    const placeList = mainComponent.find(PlaceList);
    expect(placeList.props().offers).toEqual(sortedOffers);
  });

  it(`Sorting Type change on default when offers props change`, () => {
    const store = mockStore({
      cities: [`Moscow`, `Colo`],
      city: `Moscow`,
    });

    const newOffers = {
      city: `Paris`,
      coordinates: [[52.3909553943508, 4.85309666406198]],
      offers: [],
    };

    const main = mount(
        <Provider store = {store}>
          <Main {...props}/>
        </Provider>
    );

    const mainComponent = main.find(Main);
    const placesSortingTitle = mainComponent.find(`.places__sorting-type`);
    placesSortingTitle.simulate(`click`, {
      nativeEvent: {
        stopImmediatePropagation() {}
      }
    });
    const placesSortingListItem = mainComponent.find(`.places__option`).last();
    placesSortingListItem.simulate(`click`);

    main.setProps({children: cloneElement(main.props().children, {offers: newOffers})});
    expect(mainComponent.state().sortingType).toBe(SortingType.DEFAULT);

  });

  it(`GetSotredOffers fn sorted correctly depends on sort type`, () => {
    const store = mockStore({
      cities: [`Moscow`, `Colo`],
      city: `Moscow`,
    });

    const main = mount(
        <Provider store = {store}>
          <Main {...props}/>
        </Provider>
    );

    const mainComponent = main.find(Main);
    const sortedOffers = mainComponent.instance()._getSortedOffers(SortingType.TOP_RATED, props.offers.offers);

    const topRatedOffers = props.offers.offers.slice().sort((a, b) => b.rating - a.rating);
    expect(sortedOffers).toEqual(topRatedOffers);
  });


});
