import React from "react";
import PropTypes from 'prop-types';

const withActiveItem = (Wrapped) => {
  class WithActiveItem extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: props.activeItem || null
      };

      this.handleActiveItem = this.handleActiveItem.bind(this);
    }

    handleActiveItem(item) {
      this.setState({activeItem: item});

      if (this.props.onSelect) {
        this.props.onSelect(item);
      }
    }

    render() {
      return (<Wrapped activeItem={this.state.activeItem} onSelect={this.handleActiveItem} {...this.props} />);
    }
  }

  WithActiveItem.propTypes = {
    activeItem: PropTypes.string,
    onSelect: PropTypes.func
  };

  return WithActiveItem;
};

export default withActiveItem;
