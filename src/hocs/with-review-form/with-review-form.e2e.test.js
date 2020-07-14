import React from "react";
// import MockAdapter from "axios-mock-adapter";
// import {createAPI} from "../../api/api.js";
import PropTypes from "prop-types";
import {mount} from "enzyme";
import withReviewForm from "./with-review-form.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import thunk from 'redux-thunk';

const mockComponent = (props) => {
  const {
    onFormSubmit,
    onFieldChange,
    commentValue,
  } = props;

  return (
    <form
      className="reviews__form form"
      onSubmit={(evt) => onFormSubmit(evt)}>
      <textarea
        className="reviews__textarea form__textarea"
        onChange={(evt) => onFieldChange(evt)}
        value={commentValue}
      ></textarea>
    </form>
  );
};

mockComponent.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  commentValue: PropTypes.string.isRequired,
};

const props = {
  offerId: 4,
  commentValue: `popa`,
  onFieldChange: jest.fn((x) => x),
  onFormSubmit: jest.fn((x) => x),
};

const initialState = {
  ratingValue: ``,
  commentValue: ``,
  isSending: false,
  isReviewInfoCorrect: false,
  isError: false,
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe(`With-review-form Hoc tests`, () => {
  it(`Field change should change hoc state`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`,
      },
      REVIEWS: {
        onReviewFormSubmit: jest.fn(),
      }
    });

    const ComponentWrapped = withReviewForm(mockComponent);

    const handleFieldChangeSpy = jest.spyOn(ComponentWrapped.WrappedComponent.prototype, `_handleFieldChange`);
    const checkReviewInfoCorrectSpy = jest.spyOn(ComponentWrapped.WrappedComponent.prototype, `_checkReviewInfoCorrect`);

    const wrapped = mount(
        <Provider store={store}>
          <ComponentWrapped {...props} />
        </Provider>
    );

    const evt = {};
    const commentField = wrapped.find(`.reviews__textarea`);

    commentField.simulate(`change`, evt);

    expect(handleFieldChangeSpy).toHaveBeenCalledTimes(1);
    expect(checkReviewInfoCorrectSpy).toHaveBeenCalledTimes(1);


  });

  it(`CheckReviewInfoCorrect method should return correct false value`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`,
      },
      REVIEWS: {
        onReviewFormSubmit: jest.fn(),
      }
    });

    const ComponentWrapped = withReviewForm(mockComponent);
    const wrapped = mount(
        <Provider store={store}>
          <ComponentWrapped {...props} />
        </Provider>
    );

    const withReviewFormComponent = wrapped.children().children();
    withReviewFormComponent.setState(Object.assign(initialState, {
      ratingValue: ``,
      commentValue: ``,
    }));

    expect(withReviewFormComponent.state().isReviewInfoCorrect).toBe(false);
  });

  it(`CheckReviewInfoCorrect method should return correct true value`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`,
      },
      REVIEWS: {
        onReviewFormSubmit: jest.fn(),
      }
    });

    const ComponentWrapped = withReviewForm(mockComponent);
    const wrapped = mount(
        <Provider store={store}>
          <ComponentWrapped {...props} />
        </Provider>
    );

    const withReviewFormComponent = wrapped.children().children();
    withReviewFormComponent.setState(Object.assign(initialState, {
      commentValue: `Ghgdshgfshfghdsgf sdjfhsdjfhhfd sdjfsdjfgsdjgfsd shdfsdgfhjdgfhjgf sdjgfjdshgfhjsdgjhsgf sdhfsdhfgjhsgf`,
      ratingValue: 5,
    }));

    const evt = {};
    const commentField = wrapped.find(`.reviews__textarea`);
    commentField.simulate(`change`, evt);

    expect(withReviewFormComponent.state().isReviewInfoCorrect).toBe(true);
  });

  it(`Success form info post should callback`, () => {
    const store = mockStore({
      USER: {
        authorizationStatus: `NO_AUTH`,
      },
      REVIEWS: {
        onReviewFormSubmit: jest.fn(),
      }
    });

    const ComponentWrapped = withReviewForm(mockComponent);
    const handleReviewFormSubmitSpy = jest.spyOn(ComponentWrapped.WrappedComponent.prototype, `_handleFormSubmit`);
    ComponentWrapped.WrappedComponent.prototype._addNewReview = jest.fn();

    const wrapped = mount(
        <Provider store={store}>
          <ComponentWrapped {...props} />
        </Provider>
    );
    const withReviewFormComponent = wrapped.children().children();
    withReviewFormComponent.setState(Object.assign(initialState, {
      isReviewInfoCorrect: true,
      commentValue: `Ghgdshgfshfghdsgf sdjfhsdjfhhfd sdjfsdjfgsdjgfsd shdfsdgfhjdgfhjgf sdjgfjdshgfhjsdgjhsgf sdhfsdhfgjhsgf`,
      ratingValue: 5,
    }));

    const formSubmit = wrapped.find(`.reviews__form`);
    formSubmit.simulate(`submit`, {
      preventDefault: () => {}
    });

    expect(handleReviewFormSubmitSpy).toHaveBeenCalledTimes(1);
    expect(ComponentWrapped.WrappedComponent.prototype._addNewReview).toHaveBeenCalledTimes(1);
  });

  // it(`Success form info post should to reset to initial state`, () => {
  //   const store = mockStore({
  //     USER: {
  //       authorizationStatus: `AUTH`,
  //     },
  //     REVIEWS: {
  //       onReviewFormSubmit: jest.fn(),
  //     }
  //   });

  //   const mockReview = [
  //     {
  //       comment: `Ghgdshgfshfghdsgf sdjfhsdjfhhfd sdjfsdjfgsdjgfsd shdfsdgfhjdgfhjgf sdjgfjdshgfhjsdgjhsgf sdhfsdhfgjhsgf`,
  //       date: `12 April`,
  //       rating: 5,
  //       id: 124,
  //       user: {
  //         "avatar_url": `img/avatar-angelina.jpg`,
  //         "name": `Peter`,
  //         "is_pro": false,
  //         "id": 12,
  //       }
  //     }
  //   ];

  //   const api = createAPI(() => {});
  //   const apiMock = new MockAdapter(api);
  //   const mockId = 6;

  //   const ComponentWrapped = withReviewForm(mockComponent);

  //   const wrapped = mount(
  //       <Provider store={store}>
  //         <ComponentWrapped {...props} />
  //       </Provider>
  //   );

  //   const successFormSubmitSpy = jest.spyOn(ComponentWrapped.WrappedComponent.prototype, `_onSuccessFormSubmit`);
  //   const withReviewFormComponent = wrapped.children().children();
  //   withReviewFormComponent.setState(Object.assign(initialState, {
  //     isReviewInfoCorrect: true,
  //     commentValue: `Ghgdshgfshfghdsgf sdjfhsdjfhhfd sdjfsdjfgsdjgfsd shdfsdgfhjdgfhjgf sdjgfjdshgfhjsdgjhsgf sdhfsdhfgjhsgf`,
  //     ratingValue: 5,
  //   }));

  //   const formSubmit = wrapped.find(`.reviews__form`);
  //   formSubmit.simulate(`submit`, {
  //     preventDefault: () => {}
  //   });

  //   apiMock
  //   .onPost(`/comments/${mockId}`)
  //   .reply(204, mockReview);

  //   expect(successFormSubmitSpy).toHaveBeenCalledTimes(1);
  // });


});
