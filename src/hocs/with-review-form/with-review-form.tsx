import * as React from "react";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../types/types";
import {getAuthorizationStatus} from "../../redux/user/selectors";
import {Operation} from "../../redux/reviews/reviews";


const CorrectReviewValue = {
  COMMENT: {
    minLength: 50,
    maxLength: 300,
  },

  RATING: {
    minStars: 1,
    maxStars: 5,
  }
};

interface State {
  ratingValue: string;
  commentValue: string;
  isSending: boolean;
  isReviewInfoCorrect: boolean;
  isError: boolean;
}

interface ReviewValue {
  comment: string;
  rating: string;
}

interface Props {
  authorizationStatus: AuthorizationStatus;
  onReviewFormSubmit: (reviewData: ReviewValue, id: number, onSuccess: () => void, onError: () => void) => void;
  offerId: number;
}


export default function withReviewForm(Component) {

  class WithReviewForm extends React.PureComponent<Props, State> {
    private _baseState: State;

    constructor(props) {
      super(props);

      this.state = {
        ratingValue: ``,
        commentValue: ``,
        isSending: false,
        isReviewInfoCorrect: false,
        isError: false,
      };

      this._baseState = this.state;

      this._handleFieldChange = this._handleFieldChange.bind(this);
      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._checkReviewInfoCorrect = this._checkReviewInfoCorrect.bind(this);
      this._addNewReview = this._addNewReview.bind(this);
      this._onSuccessFormSubmit = this._onSuccessFormSubmit.bind(this);
      this._onErrorFormSubmit = this._onErrorFormSubmit.bind(this);
    }

    private _checkReviewInfoCorrect() {
      const isCommentCorrectLenght =
      this.state.commentValue.length >= CorrectReviewValue.COMMENT.minLength
      && this.state.commentValue.length <= CorrectReviewValue.COMMENT.maxLength
        ? true : false;
      const rating = Number(this.state.ratingValue);
      const isRatingCorrect =
      rating >= CorrectReviewValue.RATING.minStars &&
      rating <= CorrectReviewValue.RATING.maxStars ? true : false;

      return isCommentCorrectLenght && isRatingCorrect ?
        this.setState({isReviewInfoCorrect: true}) :
        this.setState({isReviewInfoCorrect: false});
    }

    private _onSuccessFormSubmit() {
      this.setState(this._baseState);
    }

    private _onErrorFormSubmit() {
      this.setState({
        isSending: false,
        isError: true
      });
    }

    private _addNewReview() {
      const {onReviewFormSubmit, offerId} = this.props;
      this.setState({isSending: true});
      onReviewFormSubmit(
          {
            comment: this.state.commentValue,
            rating: this.state.ratingValue,
          },
          offerId,
          this._onSuccessFormSubmit,
          this._onErrorFormSubmit);

    }

    private _handleFormSubmit(evt: React.FormEvent<HTMLFormElement>) {
      evt.preventDefault();
      this.setState({
        isError: false,
      });

      return this.state.isReviewInfoCorrect ? this._addNewReview() : null;
    }

    private _handleFieldChange(evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
      const fieldName = evt.target.name;
      this.setState({
        [`${fieldName}Value`]: evt.target.value,
      } as unknown as State, () => this._checkReviewInfoCorrect());
    }

    render() {
      const {authorizationStatus} = this.props;
      return (
        <Component
          isReviewInfoCorrect={this.state.isReviewInfoCorrect}
          authorizationStatus={authorizationStatus}
          onFormSubmit={this._handleFormSubmit}
          onFieldChange={this._handleFieldChange}
          commentValue={this.state.commentValue}
          ratingValue={this.state.ratingValue}
          isSending={this.state.isSending}
          isError={this.state.isError}/>
      );
    }
  }


  const mapStateToProps = (state) => ({
    authorizationStatus: getAuthorizationStatus(state),
  });

  const mapDispatchToProps = (dispatch) => ({
    onReviewFormSubmit(reviewData, id, onSuccess, onError) {
      dispatch(Operation.addReview(reviewData, id, onSuccess, onError));
    }
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithReviewForm);

}


