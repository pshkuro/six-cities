import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";


export default function PlaceList({
  offers,
  classes
}) {

  return (
    <div className={`${classes.cards}list places__list tabs__content`}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          classes={classes}/>
      ))}
    </div>
  );


}

PlaceList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
};

