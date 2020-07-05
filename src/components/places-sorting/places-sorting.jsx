import React from "react";
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

export default function PlacesSorting(props) {
  const {onSortingListItemClick,
    activeSortingType,
    handleChangeToggleClick,
    activeClass
  } = props;

  const activeSortingListItem = options.find((option) => option.value === activeSortingType);

  const activeSortingListItemClass = `places__option--active`;
  const isSortingListItemActive = (option) => option === activeSortingListItem && activeSortingListItemClass;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={handleChangeToggleClick}
        tabIndex="0">
        {activeSortingListItem.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${activeClass}`}>
        {options.map((option) => {
          const handlePlaceSortingListItemClick = () => {
            return ((activeOption) => {
              onSortingListItemClick(activeOption.value);
              handleChangeToggleClick();
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

PlacesSorting.propTypes = {
  onSortingListItemClick: PropTypes.func.isRequired,
  activeSortingType: PropTypes.oneOf(
      [SortingType.DEFAULT, SortingType.TOP_RATED, SortingType.TO_HIGHT, SortingType.TO_LAW]),
  handleChangeToggleClick: PropTypes.func.isRequired,
  activeClass: PropTypes.string.isRequired,
};


