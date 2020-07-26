import * as React from "react";

export default function withToggle(Component) {
  return class WithToggle extends React.PureComponent {
    constructor(props) {
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


    _handleChangeToggleClick() {
      this.setState((prevState) => ({
        isActive: !prevState.isActive,
      }));
    }
  };
}
