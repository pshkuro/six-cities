import * as React from "react";
import {Sorting} from "../../types/types";


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

interface Option {
  label: string;
  value: string;
  active: boolean;
}

interface Props {
  activeClass: string;
  onSortingListItemClick: (value: string) => void;
  activeSortingType: Sorting;
  handleChangeToggleClick: () => void;
}


export default function PlacesSorting(props: Props): JSX.Element {
  const {onSortingListItemClick,
    activeSortingType,
    handleChangeToggleClick,
    activeClass
  } = props;

  const activeSortingListItem = options.find((option) => option.value === activeSortingType);

  const activeSortingListItemClass = `places__option--active`;
  const isSortingListItemActive = (option: Option) => option === activeSortingListItem && activeSortingListItemClass;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={handleChangeToggleClick}
        tabIndex={0}>
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
              value={option.value}
              tabIndex={0}
            >{option.label}</li>);
        })}
      </ul>
    </form>
  );
}


