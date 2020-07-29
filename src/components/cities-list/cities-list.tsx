import * as React from "react";
import {connect} from "react-redux";
import {PureComponent} from "react";
import {ActionCreator} from "../../redux/page/page";
import {getActiveCity} from "../../redux/page/selectors";
import {getCities} from "../../redux/offers-data/selectors";

interface Props {
  city: string;
  cities: Array<string>;
  setDefaultCity: (city: string) => void;
  onChooseCityClick: (city: string) => void;
}


class CitiesList extends React.PureComponent<Props, {}> {
  componentDidMount() {
    const {city: activeCity, cities, setDefaultCity} = this.props;
    return activeCity === null && setDefaultCity(cities[0]);
  }

  render() {
    const {city: activeCity, onChooseCityClick, cities} = this.props;
    return (
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => {
              const handleChooseCityClick = () => onChooseCityClick(city);
              return (
                <li
                  className="locations__item"
                  key={city}
                  onClick={handleChooseCityClick}>
                  <a
                    className={`locations__item-link tabs__item  ${city === activeCity ? `tabs__item--active` : ``}`}
                    href="#">
                    <span>{city}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  city: getActiveCity(state),
  cities: getCities(state),
});

export const mapDispatchToProps = (dispatch) => ({
  onChooseCityClick(city) {
    dispatch(ActionCreator.chooseCity(city));
  },

  setDefaultCity(city) {
    dispatch(ActionCreator.chooseCity(city));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
export {CitiesList};


