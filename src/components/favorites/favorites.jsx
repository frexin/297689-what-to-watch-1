import React from "react";
import PropTypes from "prop-types";

import withActiveItem from "../../hocs/with-active-item";
import MoviesList from "../movies-list/movies-list.jsx";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data";

const WrappedMovies = withActiveItem(MoviesList);

class Favorites extends React.PureComponent {

  componentDidMount() {
    this.props.onComponentReady();
  }

  render() {
    return (
      <div className="page-content">
        {this.props.userBlock}
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <WrappedMovies onLoadMore={() => {}} hasMoreMovies={false} movies={this.props.favMoviesList} />
        </section>
        {this.props.footer}
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
  footer: PropTypes.object,
  onComponentReady: PropTypes.func,
  favMoviesList: PropTypes.array,
};

export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
