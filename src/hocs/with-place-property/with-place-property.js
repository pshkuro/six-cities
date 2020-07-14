import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Operation as ReviewsOperation} from "../../redux/reviews/reviews.js";
import {getNearOffers} from "../../redux/offers-data/selectors.js";
// import { getPropertyOffer } from "../../redux/page/selectors.js";
// import { getPropertyOffer } from "../../redux/page/selectors";

export default function withPlaceProperty(Component) {
  class WithPlaceProperty extends PureComponent {


    render() {
      const {offer, nearOffers, getPropertyOffer} = this.props;
      const reviews = getPropertyOfferReviews(this.props.match.params.id);

      return (
        <Component
          offer={offer}
          nearOffers={nearOffers}/>
      );
    }
  }

  const mapStateToProps = (state) => ({
    authorizationStatus: getPropertyOffer(state, id),
    nearOffers: getNearOffers(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    getPropertyOffer(offerId) {
      dispatch(ReviewsOperation.getReviews(offerId));
    },
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithPlaceProperty);
}
