import React, {PureComponent} from "react";
import PlaceCard from "../place-card/place-card.jsx";


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
