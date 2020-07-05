import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {SortingType} from "../../constants/page.js";

export default function withSorting(Component) {
  class WithSorting extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        sortingType: SortingType.DEFAULT,
      };

      this._handleSortingListItemClick = this._handleSortingListItemClick.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (this.props.offers !== prevProps.offers) {
        this.setState({sortingType: SortingType.DEFAULT});
      }
    }

    render() {
      const {offers} = this.props;

      const sortedOffers = this._getSortedOffers(this.state.sortingType, offers);

      return (
        <Component
          {...this.props}
          offers={sortedOffers}
          activeSortingType={this.state.sortingType}
          onSortingListItemClick={this._handleSortingListItemClick}
        />
      );
    }

    _handleSortingListItemClick(sortingType) {
      this.setState({sortingType});
    }

    _getSortedOffers(sortingType, offers) {
      switch (sortingType) {
        case SortingType.TO_HIGHT:
          return offers.slice().sort((a, b) => a.cost - b.cost);

        case SortingType.TO_LAW:
          return offers.slice().sort((a, b) => b.cost - a.cost);

        case SortingType.TOP_RATED:
          return offers.slice().sort((a, b) => b.rating - a.rating);

        default:
          return offers;
      }
    }
  }

  WithSorting.propTypes = {
    offers: PropTypes.arrayOf(PropTypes.object),
  };

  return WithSorting;
}
