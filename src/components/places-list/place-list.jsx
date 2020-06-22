import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";


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
        {offers.map((offer) => (
          <PlaceCard
            offer={offer}
            onAdvertCardTitleClick={onAdvertCardTitleClick}
            onAdvertCardMouseOver={this._handleAdvertCardMouseOver}
            key={offer.id}/>
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

