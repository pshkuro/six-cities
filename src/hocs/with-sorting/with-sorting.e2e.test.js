import React from "react";
import PropTypes from "prop-types";
import {mount} from "enzyme";
import withSorting from "../with-sorting/with-sorting.js";

const SortingType = {
  DEFAULT: `popular`,
  TO_HIGHT: `to-high`,
  TO_LAW: `to-low`,
  TOP_RATED: `top-rated`,
};

const mockComponent = (props) => {
  const {onSortingListItemClick, offers} = props;
  return (
    <div>
      <ul>
        <li
          className="places__option"
          value="top-rated"
          onClick={() => onSortingListItemClick(`top-rated`)}/>
      </ul>
      <div
        offers={offers}>
      </div>
    </div>
  );
};

mockComponent.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  onSortingListItemClick: PropTypes.func,
};

const props = {
  onAdvertCardTitleClick: jest.fn(),
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
    }],
  onSortingListItemClick: jest.fn((x) => x),
};


describe(`withSorting Hoc test`, () => {

  it(`GetSotredOffers fn sorted correctly depends on sort type`, () => {

    const ComponentWrapped = withSorting(mockComponent);
    const wrapped = mount(
        <ComponentWrapped {...props}/>
    );

    const component = wrapped.find(ComponentWrapped);

    const sortedOffers = component.instance()._getSortedOffers(SortingType.TO_HIGHT, props.offers);
    const toHightOffers = props.offers.slice().sort((a, b) => a.cost - b.cost);
    expect(sortedOffers).toEqual(toHightOffers);

    const sortedLawOffers = component.instance()._getSortedOffers(SortingType.TO_LAW, props.offers);
    const toLawOffers = props.offers.slice().sort((a, b) => b.cost - a.cost);
    expect(sortedLawOffers).toEqual(toLawOffers);
  });

  it(`With sorting Hoc sorted offers right when user choose sort type`, () => {
    const ComponentWrapped = withSorting(mockComponent);

    const wrapped = mount(
        <ComponentWrapped {...props}/>
    );

    const component = wrapped.find(ComponentWrapped);
    const placesSortingListItem = component.find(`.places__option`).last();
    placesSortingListItem.simulate(`click`);

    const sortingType = component.state().sortingType;
    expect(sortingType).toBe(SortingType.TOP_RATED);
  });

  it(`Sorting Type change on default when offers props change`, () => {
    const newOffers = [{
      pictures: [``],
      title: `sdsd`,
      description: [`pikachu`],
      premium: true,
      type: `Apartment`,
      rating: 5,
      bedrooms: 0,
      guests: 1,
      cost: 12000,
      conveniences: [`Cool varwewwey cool place`],
      coordinates: [52.3909553943508, 4.85309666406198],
      owner: {
        avatar: `img/avatar-angelina.jpg`,
        name: `Lolo`,
        pro: true,
      },
      id: 8989,
      reviwes: [{id: 12}, {id: 11}],
    }];

    const ComponentWrapped = withSorting(mockComponent);

    const wrapped = mount(
        <ComponentWrapped {...props}/>
    );

    const component = wrapped.find(ComponentWrapped);
    const placesSortingListItem = component.find(`.places__option`).last();
    placesSortingListItem.simulate(`click`);

    wrapped.setProps(Object.assign(props, {offers: newOffers}));
    expect(component.state().sortingType).toBe(SortingType.DEFAULT);

  });

});


