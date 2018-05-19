import React from 'react';
import Table from './maps/table';
import Cloropeth from './maps/cloropeth';

import groupBy from 'lodash/fp/groupBy';
import flatten from 'lodash/fp/flatten';

function transform(movements) {
  const vectorsToAmounts = ({origin, destination, amount}) => [
    {country: origin, amount: -amount},
    {country: destination, amount: amount}
  ];

  const groupByCountry = amounts => groupBy('country')(flatten(amounts));
  const sumAmounts = amounts => Object.keys(amounts).map(key => ({
    country: key,
    amount: amounts[key].reduce((acc, cur) => acc + cur.amount, 0)
  }))

  const countries = sumAmounts(groupByCountry(movements.map(vectorsToAmounts)));

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
      view: 'table'
    }
  }

  render() {
    const series = transform(this.props.movements);
    const ViewComponent = views[this.state.view];

    return (
      <ViewComponent
        series={series}
      />
    );
  }
}


export default Map;
