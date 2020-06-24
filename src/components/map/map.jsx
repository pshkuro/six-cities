import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {createRef} from "react";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = createRef();
  }

  componentDidMount() {
    const {offers, city} = this.props;
    const zoom = 12;

    // Pin Icon
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    // const activeIcon = leaflet.icon({
    //   iconUrl: `img/pin-active.svg`,
    //   iconSize: [30, 30]
    // });

    // Initialize map and focused on the city
    const map = leaflet.map(this._mapRef.current, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });

    map.setView(city, zoom);

    // Connect map layer
    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
  .addTo(map);


    // Render all offers from props
    offers.forEach((offer) => {
      leaflet.marker(offer.coordinates, {icon}).addTo(map);
    });

  }

  componentWillUnmount() {
    this._mapRef.current.remove();
  }

  render() {
    return (
      <section className="cities__map map" ref={this._mapRef}>
        <div id="map"></div>
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  city: PropTypes.arrayOf(PropTypes.number).isRequired,
};


