import * as React from "react";
import PlaceCard from "../place-card/place-card";
import {Offer, Classes} from "../../types/types";

interface Props {
  offers: Array<Offer>;
  classes: Classes;
}

export default function PlaceList({offers, classes}: Props): JSX.Element {

  return (
    <div className={`${classes.cards}list places__list tabs__content`}>
      {offers && offers.map((offer) => (
        <PlaceCard
          offer={offer}
          key={offer.id}
          classes={classes}/>
      ))}
    </div>
  );


}


