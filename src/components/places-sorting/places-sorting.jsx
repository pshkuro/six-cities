import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortingType} from "../../constants/page.js";


const options = [
  {
    label: `Popular`,
    value: `popular`,
    active: true
  },
  {
    label: `Price: low to high`,
    value: `to-high`,
    active: false
  },
  {
    label: `Price: high to low`,
    value: `to-low`,
    active: false
  },
  {
    label: `Top rated first`,
    value: `top-rated`,
    active: false
  },
];

export default class PlacesSorting extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };

    this._handleClosePlaceSorting = this._handleClosePlaceSorting.bind(this);
    this._changeSortingState = this._changeSortingState.bind(this);
    this._handlePlaceSortingTitleClick = this._handlePlaceSortingTitleClick.bind(this);
  }


  render() {
    const {onSortingListItemClick, activeSortingType} = this.props;
    const activeSortingListItem = options.find((option) => option.value === activeSortingType);

    const sortingListOpenedClass = `places__options--opened`;
    const isPlaceSortingActive = this.state.isActive && sortingListOpenedClass;

    const activeSortingListItemClass = `places__option--active`;
    const isSortingListItemActive = (option) => option === activeSortingListItem && activeSortingListItemClass;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span
          className="places__sorting-type"
          onClick={this._handlePlaceSortingTitleClick}
          tabIndex="0">
          {activeSortingListItem.label}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${isPlaceSortingActive}`}>
          {options.map((option) => {
            const handlePlaceSortingListItemClick = () => {
              return ((activeOption) => {
                onSortingListItemClick(activeOption.value);
                if (this.state.isActive) {
                  this._handleClosePlaceSorting();
                }
              })(option);
            };

            return (
              <li
                onClick={handlePlaceSortingListItemClick}
                className={`places__option ${isSortingListItemActive(option)}`}
                key={option.value}
                tabIndex="0"
              >{option.label}</li>);
          })}
        </ul>
      </form>
    );
  }

  _changeSortingState() {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  }

  _handleClosePlaceSorting() {
    this.setState({isActive: false});
  }

  _handlePlaceSortingTitleClick(evt) {
    evt.nativeEvent.stopImmediatePropagation();
    this._changeSortingState();
  }
}

PlacesSorting.propTypes = {
  onSortingListItemClick: PropTypes.func.isRequired,
  activeSortingType: PropTypes.oneOf(
      [SortingType.DEFAULT, SortingType.TOP_RATED, SortingType.TO_HIGHT, SortingType.TO_LAW]),
};


