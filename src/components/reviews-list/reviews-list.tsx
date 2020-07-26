import * as React from "react";
import ReviewItem from "../review-item/review-item";
import ReviewForm from "../review-form/review-form";
import withReviewForm from "../../hocs/with-review-form/with-review-form";

const ReviewFormWrapped = withReviewForm(ReviewForm);

export default function ReviewsList({reviews, offerId}) {
  const sortedReviews = reviews && reviews.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
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

// ReviewsList.propTypes = {
//   reviews: PropTypes.array,
//   offerId: PropTypes.number,
// };


