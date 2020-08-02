import * as React from "react";
import {CardClasses} from "../../constants/page";
import PlacesSorting from "../places-sorting/places-sorting";
import PlaceList from "../places-list/place-list";
import withToggle from "../../hocs/with-toggle/with-toggle";
import {Offer, Sorting} from "../../types/types";


interface Props {
  city: string;
  offers: Array<Offer>;
  activeSortingType: Sorting;
  onSortingListItemClick: () => void;
}

const PlacesSortingWrapped = withToggle(PlacesSorting);

export default function CitiesPlaces(props: Props): JSX.Element {
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

