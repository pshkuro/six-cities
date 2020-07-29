import * as React from "react";
import {Sorting} from "../../types/types";

interface State {
  isActive: boolean;
}

interface Props {
  activeSortingType: Sorting;
  onSortingListItemClick: () => void;
}

export default function withToggle(Component) {
  return class WithToggle extends React.PureComponent<Props, State> {
    private _activeClass: string;

    constructor(props: Props) {
      super(props);

      this.state = {
        isActive: false,
      };

      this._handleChangeToggleClick = this._handleChangeToggleClick.bind(this);
      this._activeClass = `places__options--opened`;
    }

    render() {
      const isPlaceSortingActive = this.state.isActive ? this._activeClass : ``;

      return (
        <Component
          {...this.props}
          handleChangeToggleClick={this._handleChangeToggleClick}
          activeClass={isPlaceSortingActive}
        />
      );
    }


    private _handleChangeToggleClick() {
      this.setState((prevState) => ({
        isActive: !prevState.isActive,
      }));
    }
  };
}
