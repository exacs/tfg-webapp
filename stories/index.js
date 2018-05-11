import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RangeSelector from '../app/components/range-selector';
import YearSelector from '../app/components/year-selector';

class YearSelectorWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedYear: 2010,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedYear) {
    this.setState({ selectedYear });
  }

  render() {
    return (
      <YearSelector
        min={2010}
        max={2017}
        selected={this.state.selectedYear}
        onSelect={this.handleChange}
      />
    );
  }
}


storiesOf('RangeSelector', module)
  .add('default', () => (
    <RangeSelector
      onChange={action('Changed')}
    />
  ));

storiesOf('YearSelector', module)
  .add('default', () => (
    <YearSelector
      min={2010}
      max={2017}
      onSelect={action('new year selected')}
    />
  ))
  .add('wrapped', () => (
    <YearSelectorWrapper />
  ));
