import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceList from "../places-list/place-list.jsx";
import CitiesList from "../cities-list/cities-list.jsx";
import Map from "../map/map.jsx";
import {CardClasses} from "../../constants/page.js";
import CitiesNoPlaces from "../cities-no-places/cities-no-places.jsx";
import {connect} from "react-redux";

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeOffer: null,
    };

    this._handleAdvertCardMouseOver = this._handleAdvertCardMouseOver.bind(this);
    this._handleAdvertCardMouseOut = this._handleAdvertCardMouseOut.bind(this);

  }

  render() {
    const {offers, onAdvertCardTitleClick, city} = this.props;

    const pins = offers ? offers.map((offer) => ({
      coordinates: offer.coordinates,
      isActive: offer === this.state.activeOffer,
    })) : null;

    return (
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        {<CitiesList/>}
        <div className="cities">
          {!offers && <CitiesNoPlaces/>}
          {offers &&
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
                {/* <select className="places__sorting-type" id="places-sorting">
                  <option className="places__option" value="popular" selected="">Popular</option>
                  <option className="places__option" value="to-high">Price: low to high</option>
                  <option className="places__option" value="to-low">Price: high to low</option>
                  <option className="places__option" value="top-rated">Top rated first</option>
                </select> */}
              </form>
              {<PlaceList
                classes= {CardClasses.MAIN}
                offers={offers}
                onAdvertCardTitleClick={onAdvertCardTitleClick}
                onAdvertCardMouseOver={this._handleAdvertCardMouseOver}
                onAdvertCardMouseOut={this._handleAdvertCardMouseOut}/>}
            </section>
            <div className="cities__right-section">
              {<Map
                pins={pins}
                cityCoordinates={[52.38333, 4.9]}
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
}

Main.propTypes = {
  offers: PropTypes.array,
  onAdvertCardTitleClick: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

export default connect(mapStateToProps)(Main);
export {Main};

