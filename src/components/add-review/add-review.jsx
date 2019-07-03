import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

class AddReview extends React.PureComponent {

  render() {
    const movie = this.props.movie;

    if (!movie) {
      return null;
    }

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/film/${movie.id}`} className="breadcrumbs__link">{movie.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">{this.props.userBlock}</div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={movie.posterImage} alt={movie.name} width="218" height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form className="add-review__form" onSubmit={(ev) => this.props.handleFormSubmit(ev) }>
            <div className="rating">
              <div className="rating__stars">
                <input onChange={(ev) => this.props.validate(ev.target.form)} className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input onChange={(ev) => this.props.validate(ev.target.form)} className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input onChange={(ev) => this.props.validate(ev.target.form)} className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input onChange={(ev) => this.props.validate(ev.target.form)} className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input onChange={(ev) => this.props.validate(ev.target.form)} className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" onChange={(ev) => this.props.validate(ev.target.form)} required name="review-text" id="review-text" placeholder="Review text" />
              <div className="add-review__submit">
                <button className="add-review__btn" disabled={!this.props.isValid} type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  userBlock: PropTypes.object,
  validate: PropTypes.func,
  handleFormSubmit: PropTypes.func,
  movie: PropTypes.object,
  isValid: PropTypes.bool
};

export default AddReview;
