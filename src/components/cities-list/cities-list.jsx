import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../redux/actions/actions.js";
import {getActiveCity} from "../../reducer/page/selectors.js";
import {getCities} from "../../reducer/data/selectors.js";


function CitiesList({city: activeCity, onChooseCityClick, cities}) {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">

          {cities.map((city) => {
            const onClick = () => onChooseCityClick(city);
            return (
              <li
                className="locations__item"
                key={city}
                onClick={onClick}>
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

CitiesList.propTypes = {
  city: PropTypes.string.isRequired,
  onChooseCityClick: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  city: getActiveCity(state),
  cities: getCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onChooseCityClick(city) {
    dispatch(ActionCreator.chooseCity(city));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
export {CitiesList};


