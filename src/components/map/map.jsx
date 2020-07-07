import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {createRef} from "react";


export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._map = null;
    this._pinIcon = this._getPinIcon();
    this._activePinIcon = this._getPinIcon(true);
    this._mapRef = createRef();
    this._pins = leaflet.layerGroup();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cityCoordinates.coordinates !== prevProps.cityCoordinates.coordinates) {
      this._cleanMap();
      this._setView();
      this._connectLayer();
      this._addPins();
    } else if (this.props.pins !== prevProps.pins) {
      this._cleanPins();
      this._addPins();
    }
  }

  componentDidMount() {
    this._map = this._createMap();
    this._setView();
    this._connectLayer();
    this._addPins();

  }

  componentWillUnmount() {
    this._mapRef.current = null;
  }

  _createMap() {
    const {cityCoordinates: city} = this.props;
    const {coordinates, zoom} = city;

    return leaflet.map(this._mapRef.current, {
      center: coordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
  }

  _setView() {
    const {cityCoordinates: city} = this.props;
    const {coordinates, zoom} = city;
    this._map.setView(coordinates, zoom);
  }

  _connectLayer() {
    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
  }

  _getPinIcon(isActive = false) {
    return leaflet.icon({
      iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
      iconSize: [30, 30]
    });
  }

  _addPins() {
    const {pins} = this.props;
    this._pins.addTo(this._map);

    pins.forEach((pin) => {
      leaflet.marker(pin.coordinates, {
        icon: pin.isActive ? this._activePinIcon : this._pinIcon,
      }).addTo(this._pins);
    });

  }

  _cleanPins() {
    this._pins.clearLayers();
  }

  _cleanMap() {
    this._cleanPins();
    this._map.eachLayer((layer) => {
      layer.remove();
    });
  }


  render() {
    const {classes} = this.props;
    return (
      <section className={`${classes.map}__map map`} ref={this._mapRef}>
        <div id="map"></div>
      </section>
    );
  }
}

Map.propTypes = {
  pins: PropTypes.arrayOf(PropTypes.object).isRequired,
  cityCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  classes: PropTypes.object.isRequired,
};


