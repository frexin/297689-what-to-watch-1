import React from "react";
import moment from "moment";
import PropTypes from "prop-types";

const MovieTabReviews = (props) => {

  const reviews = props.reviews;

  return (
    <div className="movie-card__reviews movie-card__row">
      {reviews.map((review) => {
        return (
          <div className="review" key={`item-${review.id}`}>
            <blockquote className="review__quote">
              <p className="review__text">{review.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{review.user.name}</cite>
                <time className="review__date" dateTime={review.date}>{moment(review.date).format(`MMMM Do, YYYY`)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{review.rating}</div>
          </div>
        );
      })}
    </div>
  );
};

MovieTabReviews.propTypes = {
  reviews: PropTypes.array.isRequired
};

export default MovieTabReviews;
