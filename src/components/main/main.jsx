import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceList from "../places-list/place-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import {CardClasses} from "../../constants/page.js";
import CitiesNoPlaces from "../cities-no-places/cities-no-places.jsx";
import PlacesSorting from "../places-sorting/places-sorting.jsx";
import {SortingType} from "../../constants/page.js";

export default class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null,
      sortingType: SortingType.DEFAULT,
    };

    this._handleAdvertCardMouseOver = this._handleAdvertCardMouseOver.bind(this);
    this._handleAdvertCardMouseOut = this._handleAdvertCardMouseOut.bind(this);
    this._handleSortingListItemClick = this._handleSortingListItemClick.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (this.props.offers !== prevProps.offers) {
      this.setState({sortingType: SortingType.DEFAULT});
    }
  }

  render() {
    const {offers, onAdvertCardTitleClick} = this.props;
    const {offers: cityOffers, cityCoordinates, city} = offers;

    const pins = cityOffers.length !== 0 ? cityOffers.map((offer) => ({
      coordinates: offer.coordinates,
      isActive: offer === this.state.activeOffer,
    })) : null;

    const sortedOffers = this._getSortedOffers(this.state.sortingType, cityOffers);

    const noPlacesMainClass = cityOffers.length === 0 ? `page__main--index-empty` : null;

    return (
      <main className={`page__main page__main--index ${noPlacesMainClass}`}>
        <h1 className="visually-hidden">Cities</h1>
        {<CitiesList/>}
        <div className="cities">
          {cityOffers.length === 0 && <CitiesNoPlaces city={city}/>}
          {cityOffers.length !== 0 &&
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {city}</b>
              {<PlacesSorting
                activeSortingType={this.state.sortingType}
                onSortingListItemClick={this._handleSortingListItemClick}/>}
              {<PlaceList
                classes= {CardClasses.MAIN}
                offers={sortedOffers}
                onAdvertCardTitleClick={onAdvertCardTitleClick}
                onAdvertCardMouseOver={this._handleAdvertCardMouseOver}
                onAdvertCardMouseOut={this._handleAdvertCardMouseOut}/>}
            </section>
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

  _handleAdvertCardMouseOver(card) {
    this.setState({activeOffer: card});
  }

  _handleAdvertCardMouseOut() {
    this.setState({activeOffer: null});
  }

  _handleSortingListItemClick(sortingType) {
    this.setState({sortingType});
  }

  _getSortedOffers(sortingType, offers) {
    switch (sortingType) {
      case SortingType.TO_HIGHT:
        return offers.slice().sort((a, b) => b.cost - a.cost);

      case SortingType.TO_LAW:
        return offers.slice().sort((a, b) => a.cost - b.cost);

      case SortingType.TOP_RATED:
        return offers.slice().sort((a, b) => b.rating - a.rating);

      default:
        return offers;
    }
  }
}

Main.propTypes = {
  offers: PropTypes.object,
  onAdvertCardTitleClick: PropTypes.func,
  city: PropTypes.string,
  cityCoordinates: PropTypes.arrayOf(PropTypes.number),
};


