import PlaceCard from "../place-card/place-card.jsx";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";


export default class PlaceList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null,
    };

    this._handleAdvertCardMouseOver = this._handleAdvertCardMouseOver.bind(this);
  }

  render() {
    const {offers, onAdvertCardTitleClick} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer, i) => (
          <PlaceCard
            offer={offer}
            onAdvertCardTitleClick={onAdvertCardTitleClick}
            onAdvertCardMouseOver={this._handleAdvertCardMouseOver}
            key={`${i}-${offer.description}`}/>
        ))}
      </div>
    );
  }

  _handleAdvertCardMouseOver(card) {
    this.setState({activeCard: card});
  }
}

PlaceList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdvertCardTitleClick: PropTypes.func.isRequired,
};

