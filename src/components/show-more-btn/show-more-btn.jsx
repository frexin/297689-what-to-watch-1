import React from "react";
import PropTypes from "prop-types";

const ShowMoreBtn = (props) => {

  if (!props.showBtn) {
    return false;
  }

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={props.onLoadMore}>Show more</button>
    </div>
  );
};

ShowMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  showBtn: PropTypes.bool.isRequired
};

export default ShowMoreBtn;
