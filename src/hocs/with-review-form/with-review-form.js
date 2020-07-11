import React, {PureComponent} from "react";

export default function withReviewForm(Component) {

  return class WithReviewForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        ratingValue: ``,
        commentValue: ``,
        isSending: false,
      };

      this._handleFieldChange = this._handleFieldChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _handleFormSubmit(evt) {
      evt.preventDefault();
      this.setState({isSending: true});
    }

    _handleFieldChange(evt) {
      const fieldName = evt.target.name;
      this.setState({
        [`${fieldName}Value`]: evt.target.value,
      });
    }

    render() {
      return (
        <Component
          onFormSubmit={this._handleFormSubmit}
          onFieldChange={this._handleFieldChange}/>
      );
    }

  };
}
