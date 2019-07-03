import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator, Operation} from "../reducer/reducer";
import {compose} from 'recompose';

const withReviewForm = (Wrapped) => {
  class WithReviewForm extends React.PureComponent {
    static getFormValues(form) {
      const collection = form.elements;
      const rating = collection.namedItem(`rating`).value;
      const comment = collection.namedItem(`review-text`).value;

      return {rating, comment};
    }

    constructor(props) {
      super(props);

      this.state = {
        valid: false
      };

      this.validate = this.validate.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
      const movieId = parseInt(this.props.match.params.id, 10);

      if (prevProps.movies !== this.props.movies) {
        this.props.onComponentLoaded(movieId);
      }
    }

    validate(form) {
      let result = false;
      const {rating, comment} = WithReviewForm.getFormValues(form);

      if (rating && (comment.length > 50 && comment.length < 400)) {
        result = true;
      }

      this.setState({valid: result});

      return result;
    }

    handleFormSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const {rating, comment} = WithReviewForm.getFormValues(form);

      if (this.validate(form)) {
        this.props.onSubmit(this.props.movie.id, rating, comment);
        this.props.history.push(`/film/${this.props.movie.id}`);
      }
    }

    render() {
      return (<Wrapped onFormSubmit={this.handleFormSubmit} validate={this.validate} isValid={this.state.valid} {...this.props} />);
    }

  }

  WithReviewForm.propTypes = {
    movie: PropTypes.object,
    movies: PropTypes.array,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string
      })
    }),
    onComponentLoaded: PropTypes.func,
    onSubmit: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func
    }),
  };

  return WithReviewForm;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movie: state.currentMovie,
  movies: state.moviesList
});

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentLoaded: (movieId) => {
      dispatch(ActionCreator.loadMovie(movieId));
    },
    onSubmit: (filmId, rating, comment) => {
      dispatch(Operation.addReview(filmId, rating, comment));
    }
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withReviewForm);
