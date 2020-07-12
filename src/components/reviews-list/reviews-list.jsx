import React from "react";
import PropTypes from "prop-types";
import ReviewItem from "../review-item/review-item.jsx";
import ReviewForm from "../review-form/review-form.jsx";
import withReviewForm from "../../hocs/with-review-form/with-review-form.js";

const ReviewFormWrapped = withReviewForm(ReviewForm);

export default function ReviewsList({reviews, offerId}) {
  const sortedReviews = reviews && reviews.slice().sort((a, b) => new Date(b) - new Date(a));
  const reviewsNumber = !reviews || (reviews && reviews.length === 0) ? 0 : reviews.length;
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsNumber}</span></h2>
      <ul className="reviews__list">

        {sortedReviews && sortedReviews.map((review) => {
          return <ReviewItem
            review={review}
            key={review.id}/>;
        })}

        <ReviewFormWrapped
          offerId={offerId}
        />
      </ul>

    </section>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.array,
  offerId: PropTypes.number,
};


