import React, {Fragment} from "react";
import PropTypes from "prop-types";

const Tabs = (props) => {
  const TabComponent = props.components[props.selectedIndex];

  return (
    <Fragment>
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={`movie-nav__item ${props.selectedIndex === 0 ? `movie-nav__item--active` : ``}`}>
            <a href="#" onClick={(ev) => props.selectTab(0, ev)} className="movie-nav__link">Overview</a>
          </li>
          <li className={`movie-nav__item ${props.selectedIndex === 1 ? `movie-nav__item--active` : ``}`}>
            <a href="#" onClick={(ev) => props.selectTab(1, ev)} className="movie-nav__link">Details</a>
          </li>
          <li className={`movie-nav__item ${props.selectedIndex === 2 ? `movie-nav__item--active` : ``}`}>
            <a href="#" onClick={(ev) => props.selectTab(2, ev)} className="movie-nav__link">Reviews</a>
          </li>
        </ul>
      </nav>
      <TabComponent {...props} />
    </Fragment>
  );
};

Tabs.propTypes = {
  components: PropTypes.array.isRequired,
  selectedIndex: PropTypes.number,
  selectTab: PropTypes.func
};

export default Tabs;
