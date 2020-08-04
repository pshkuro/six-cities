import * as React from "react";
import {Offer} from "../../types/types";
import {SortingType} from "../../constants/page";

interface Props {
  offers: Array<Offer>;
  city: string;
}

interface State {
  sortingType: string;
}

export default function withSorting(Component) {
  class WithSorting extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        sortingType: SortingType.DEFAULT,
      };

      this._handleSortingListItemClick = this._handleSortingListItemClick.bind(this);
    }

    componentDidUpdate(prevProps) {
      if (this.props.city !== prevProps.city) {
        this.setState({sortingType: SortingType.DEFAULT});
      }
    }

    private _handleSortingListItemClick(sortingType: string) {
      this.setState({sortingType});
    }

    private _getSortedOffers(sortingType: string, offers: Array<Offer>) {
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

  }

  return WithSorting;
}
