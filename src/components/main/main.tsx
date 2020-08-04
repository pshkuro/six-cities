import * as React from "react";
import {CardClasses} from "../../constants/page";
import CitiesList from "../cities-list/cities-list";
import CitiesNoPlaces from "../cities-no-places/cities-no-places";
import CitiesPlaces from "../cities-places/cities-places";
import {CityOffers, Offer} from "../../types/types";
import Map from "../map/map";
import withSorting from "../../hocs/with-sorting/with-sorting";

interface Props {
  offers: CityOffers;
  activeOffer: Offer;
}

const CitiesPlacesWrapped = withSorting(CitiesPlaces);


export default function Main({offers, activeOffer}: Props): JSX.Element {
  const {offers: cityOffers, cityCoordinates, city} = offers;

  const isOffersEmpty = !cityOffers || cityOffers.length === 0;
  const pins = !isOffersEmpty ? cityOffers.map((offer: Offer) => ({
    coordinates: offer.coordinates,
    isActive: offer === activeOffer,
  })) : null;

  const noPlacesMainClass = isOffersEmpty ? `page__main--index-empty` : null;

  return (
    <main className={`page__main page__main--index ${noPlacesMainClass}`}>
      <h1 className="visually-hidden">Cities</h1>
      {<CitiesList/>}
      <div className="cities">
        {isOffersEmpty && <CitiesNoPlaces city={city}/>}
        {!isOffersEmpty &&
          <div className="cities__places-container container">
            <CitiesPlacesWrapped
              offers={cityOffers}
              city={city}/>

            <div className="cities__right-section">
              {<Map
                pins={pins}
                cityCoordinates={cityCoordinates}
                classes={CardClasses.MAIN}/>}
            </div>
          </div>}
      </div>
    </main>
  );
}


