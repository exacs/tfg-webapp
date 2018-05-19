import React from 'react';
import Table from './maps/table';
import Cloropeth from './maps/cloropeth';

import groupBy from 'lodash/fp/groupBy';
import flatten from 'lodash/fp/flatten';

function transform(movements, country) {
  const vectorsToAmounts = ({origin, destination, amount}) => [
    {country: origin, amount: -amount},
    {country: destination, amount: amount}
  ];

  const groupByCountry = amounts => groupBy('country')(flatten(amounts));
  const sumAmounts = amounts => Object.keys(amounts).map(key => ({
    country: key,
    amount: amounts[key].reduce((acc, cur) => acc + cur.amount, 0)
  }))

  const filteredMovements =
    country ?
    movements.filter(m => m.origin === country || m.destination === country) :
    movements;

  const countries = sumAmounts(groupByCountry(filteredMovements.map(vectorsToAmounts)));

  return countries;
}

const views = {
  table: Table,
  cloropeth: Cloropeth
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'cloropeth',
      country: null,
    }
  }

  selectCountry(country) {
    this.setState({country});
  }

  render() {
    const filter = this.props.filter;
    const countries = this.props.countries;
    const getCountry = (code) => countries.filter(c => c.country === code)[0] || {gdp: 0};

    let movements;

    if (filter === 'poor-to-rich') {
      movements = this
        .props.movements
        .filter(mov => getCountry(mov.origin).gdp < 100000)
        .filter(mov => getCountry(mov.destination).gdp > 1000000)
    } else {
      movements = this.props.movements;
    }

    console.log(`We have ${movements.length} movements`);
    const series = transform(movements, this.state.country);
    const ViewComponent = views[this.state.view];

    return (
      <ViewComponent
        series={series}
        selectedCountry={this.state.country}
        onSelect={country => this.selectCountry(country)}
      />
    );
  }
}


export default Map;
