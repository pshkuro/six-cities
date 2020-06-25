import React from "react";
import PropTypes from "prop-types";
import PlaceCard from "../place-card/place-card.jsx";


export default function PlaceList({offers, onAdvertCardTitleClick, onAdvertCardMouseOver, onAdvertCardMouseOut, classes}) {

  return (
    <div className={`${classes.cards}list places__list tabs__content`}>
      {offers.map((offer) => (
        <PlaceCard
          offer={offer}
          onAdvertCardTitleClick={onAdvertCardTitleClick && onAdvertCardTitleClick}
          onAdvertCardMouseOver={onAdvertCardMouseOver && onAdvertCardMouseOver}
          onAdvertCardMouseOut={onAdvertCardMouseOut && onAdvertCardMouseOut}
          key={offer.id}
          classes={classes}/>
      ))}
    </div>
  );


}

PlaceList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdvertCardTitleClick: PropTypes.func,
  onAdvertCardMouseOver: PropTypes.func,
  onAdvertCardMouseOut: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

