import React from 'react';

class RangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      min: 2007,
      max: 2018
    }

    this.handleChangeMin = this.handleChangeMin.bind(this);
    this.handleChangeMax = this.handleChangeMax.bind(this);
  }

  handleChangeMin(event) {
    this.setState({ min: event.target.value }, () => {
      this.props.onChange(this.state);
    });
  }

  handleChangeMax(event) {
    this.setState({ max: event.target.value }, () => {
      this.props.onChange(this.state);
    });
  }

  render() {
    return (
      <div>
        <input type='text' onChange={this.handleChangeMin} />
        <input type='text' onChange={this.handleChangeMax} />
      </div>
    );
  }
}

export default RangeSelector;
