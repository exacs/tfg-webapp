import React from 'react';
import styled from 'styled-components';
import YearSelector from './year-selector';

class RangeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 2017
    }

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(option) {
    this.setState({selected: option}, () => {
      const selected = this.state.selected;

      const start = new Date(`${selected}-01-01T00:00:00`);
      const end = new Date(`${selected}-12-31T23:59:59`);

      this.props.onChange(selected);
    });
  }

  render() {
    return (
      <YearSelector
        min={2007}
        max={2017}
        selected={this.state.selected}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default RangeSelector;
