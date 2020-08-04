import * as React from "react";
import {Review} from "../../types/types";
import ReviewItem from "../review-item/review-item";
import ReviewForm from "../review-form/review-form";
import withReviewForm from "../../hocs/with-review-form/with-review-form";

interface Props {
  reviews: Array<Review>;
  offerId: number;
}

const ReviewFormWrapped = withReviewForm(ReviewForm);

export default function ReviewsList({reviews, offerId}: Props): JSX.Element {
  const sortedReviews = reviews && reviews.slice().sort(
      (a: Review, b: Review) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
  const reviewsNumber = !reviews || reviews.length === 0 ? 0 : reviews.length;
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsNumber}</span></h2>
      <ul className="reviews__list">

        {sortedReviews && sortedReviews.map((review: Review): JSX.Element => {
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


