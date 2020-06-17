import PlaceCard from "../place-card/place-card.jsx";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";


export default class PlaceList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeComponent: 0,
    };
  }

  render() {
    const {offers, onAdvertCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, i) => (
          <PlaceCard
            offer={offer}
            onAdvertCardTitleClick={onAdvertCardTitleClick}
            key={`${i}-${offer.description}`}/>
        ))}
      </div>
    );
  }
}

PlaceList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdvertCardTitleClick: PropTypes.func.isRequired,
};

