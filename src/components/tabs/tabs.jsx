import React, {Fragment} from "react";
import PropTypes from "prop-types";

class Tabs extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0
    };

    this.selectTab = this.selectTab.bind(this);
  }

  selectTab(index, ev) {
    ev.preventDefault();
    this.setState({selectedIndex: index});
  }

  render() {
    const TabComponent = this.props.components[this.state.selectedIndex];

    return (
        <Fragment>
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className={`movie-nav__item ${this.state.selectedIndex === 0 ? `movie-nav__item--active` : ``}`}>
              <a href="#" onClick={(ev) => this.selectTab(0, ev)} className="movie-nav__link">Overview</a>
            </li>
            <li className={`movie-nav__item ${this.state.selectedIndex === 1 ? `movie-nav__item--active` : ``}`}>
              <a href="#" onClick={(ev) => this.selectTab(1, ev)} className="movie-nav__link">Details</a>
            </li>
            <li className={`movie-nav__item ${this.state.selectedIndex === 2 ? `movie-nav__item--active` : ``}`}>
              <a href="#" onClick={(ev) => this.selectTab(2, ev)} className="movie-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>
        <TabComponent {...this.props} />
        </Fragment>
    );
  }
}

export default Tabs;
