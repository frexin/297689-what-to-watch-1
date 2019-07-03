import React from "react";
import PropTypes from "prop-types";

import withActiveItem from "../../hocs/with-active-item";
import MoviesList from "../movies-list/movies-list.jsx";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data";

const WrappedMovies = withActiveItem(MoviesList);

class Favorites extends React.Component {

  componentDidMount() {
    this.props.onComponentReady();
  }

  render() {
    return (
      <div className="page-content">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>
          <h1 className="page-title user-page__title">My list</h1>

          <div className="user-block">{this.props.userBlock}</div>
        </header>
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <WrappedMovies onLoadMore={() => {}} hasMoreMovies={false} movies={this.props.favMoviesList} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  favMoviesList: state.favMoviesList ? state.favMoviesList : []
});

const mapDispatchToProps = (dispatch) => {
  return {
    onComponentReady: () => {
      dispatch(Operation.loadFavMovies());
    },
  };
};

Favorites.propTypes = {
  userBlock: PropTypes.object,
  onComponentReady: PropTypes.func,
  favMoviesList: PropTypes.array,
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
