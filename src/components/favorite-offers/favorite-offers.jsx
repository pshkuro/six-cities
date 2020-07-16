import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Operation} from "../../redux/offers-favorites/offers-favotites.js";
import {getFavoriteOffers} from "../../redux/offers-favorites/selectors.js";


export class FavoriteOffers extends PureComponent {
  componentDidMount() {
    const {getFavoritesCityOffers} = this.props;
    getFavoritesCityOffers();
  }

  render() {
    const {favoriteOffers} = this.props;
    return (
      <div>{favoriteOffers && favoriteOffers.length === 0 ? `NO FAVORITES` : `MY FAVORITES`}</div>
    );
  }
}

FavoriteOffers.propTypes = {
  getFavoritesCityOffers: PropTypes.func.isRequired,
  favoriteOffers: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(null)])
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  getFavoritesCityOffers() {
    dispatch(Operation.getFavorites());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteOffers);


