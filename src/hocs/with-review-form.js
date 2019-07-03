import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator, Operation} from "../reducer/data";
import {compose} from 'recompose';

const withReviewForm = (Wrapped) => {
  class WithReviewForm extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        valid: false
      };

      this.validate = this.validate.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const movieId = parseInt(this.props.match.params.id, 10);

      if (prevProps.movies !== this.props.movies) {
        this.props.onComponentLoaded(movieId);
      }
    }

    static getFormValues(form) {
      const collection = form.elements;
      const rating = collection.namedItem(`rating`).value;
      const comment = collection.namedItem(`review-text`).value;

      return {rating, comment};
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
      return (<Wrapped handleFormSubmit={this.handleFormSubmit} validate={this.validate} isValid={this.state.valid} {...this.props} />);
    }

  }

  return WithReviewForm;
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  movie: state.currentMovie,
  movies: state.moviesList,
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
