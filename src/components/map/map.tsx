import * as React from "react";
import {createRef} from "react";
import * as leaflet from "leaflet";
import {
  tileLayer,
  Map as LeafletMap,
  Icon,
} from "leaflet";
import {CityCoordinates, Classes} from "../../types/types";

interface Pin {
    coordinates: number[];
    isActive: boolean;
}

interface Props {
  pins: Array<Pin>;
  cityCoordinates: CityCoordinates;
  classes: Classes;
}


export default class Map extends React.PureComponent<Props, {}> {
  private _mapRef: React.RefObject<HTMLDivElement>;
  private _map = LeafletMap;
  private _pinIcon = Icon;
  private _activePinIcon = Icon;
  private _pins = tileLayer;


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

  private _createMap() {
    const {cityCoordinates: city} = this.props;
    const {coordinates, zoom} = city;

    return leaflet.map(this._mapRef.current, {
      center: coordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
  }

  private _setView() {
    const {cityCoordinates: city} = this.props;
    const {coordinates, zoom} = city;
    this._map.setView(coordinates, zoom);
  }

  private _connectLayer() {
    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this._map);
  }

  private _getPinIcon(isActive = false) {
    return leaflet.icon({
      iconUrl: isActive ? `/img/pin-active.svg` : `/img/pin.svg`,
      iconSize: [30, 30]
    });
  }

  private _addPins() {
    const {pins} = this.props;
    this._pins.addTo(this._map);

    pins.forEach((pin) => {
      leaflet.marker(pin.coordinates, {
        icon: pin.isActive ? this._activePinIcon : this._pinIcon,
      }).addTo(this._pins);
    });

  }

  private _cleanPins() {
    this._pins.clearLayers();
  }

  private _cleanMap() {
    this._cleanPins();
    this._map.eachLayer((layer: tileLayer) => {
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


