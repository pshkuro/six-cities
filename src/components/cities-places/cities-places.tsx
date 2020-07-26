import * as React from "react";
import {CardClasses} from "../../constants/page";
import PlacesSorting from "../places-sorting/places-sorting";
import PlaceList from "../places-list/place-list";
// import {SortingType} from "../../constants/page";
import withToggle from "../../hocs/with-toggle/with-toggle";

const PlacesSortingWrapped = withToggle(PlacesSorting);

export default function CitiesPlaces(props) {
  const {
    city,
    offers: sortedOffers,
    activeSortingType,
    onSortingListItemClick
  } = props;

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{sortedOffers.length} places to stay in {city}</b>
      {<PlacesSortingWrapped
        activeSortingType={activeSortingType}
        onSortingListItemClick={onSortingListItemClick}/>}
      {<PlaceList
        classes= {CardClasses.MAIN}
        offers={sortedOffers}
      />}
    </section>
  );
}

// CitiesPlaces.propTypes = {
//   onAdvertCardTitleClick: PropTypes.func,
//   city: PropTypes.string,
//   offers: PropTypes.arrayOf(PropTypes.object),
//   activeSortingType: PropTypes.oneOf(
//       [SortingType.DEFAULT, SortingType.TOP_RATED, SortingType.TO_HIGHT, SortingType.TO_LAW]),
//   onSortingListItemClick: PropTypes.func.isRequired,
// };
