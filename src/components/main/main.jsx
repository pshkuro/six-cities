import React from "react";
import PropTypes from "prop-types";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import {CardClasses} from "../../constants/page.js";
import CitiesNoPlaces from "../cities-no-places/cities-no-places.jsx";
import CitiesPlaces from "../cities-places/cities-places.jsx";
import withSorting from "../../hocs/with-sorting/with-sorting.js";

const CitiesPlacesWrapped = withSorting(CitiesPlaces);


export default function Main({offers, activeOffer, onAdvertCardTitleClick}) {
  const {offers: cityOffers, cityCoordinates, city} = offers;

  const pins = cityOffers.length !== 0 ? cityOffers.map((offer) => ({
    coordinates: offer.coordinates,
    isActive: offer === activeOffer,
  })) : null;

  const noPlacesMainClass = cityOffers.length === 0 ? `page__main--index-empty` : null;

  return (
    <main className={`page__main page__main--index ${noPlacesMainClass}`}>
      <h1 className="visually-hidden">Cities</h1>
      {<CitiesList/>}
      <div className="cities">
        {cityOffers.length === 0 && <CitiesNoPlaces city={city}/>}
        {cityOffers.length !== 0 &&
          <div className="cities__places-container container">
            <CitiesPlacesWrapped
              offers={cityOffers}
              onAdvertCardTitleClick={onAdvertCardTitleClick}/>

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


Main.propTypes = {
  offers: PropTypes.object,
  city: PropTypes.string,
  cityCoordinates: PropTypes.arrayOf(PropTypes.number),
  activeOffer: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(null)]),
  onAdvertCardTitleClick: PropTypes.func,
};


