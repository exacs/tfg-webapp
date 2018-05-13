import React from 'react'
import Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import HighchartsReact from 'highcharts-react-official';
import fetch from 'isomorphic-fetch';
import mapData from './map-data';

HC_map(Highcharts);

export default class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    fetch('https://code.highcharts.com/mapdata/custom/world-lowres.geo.json')
      .then(r => r.json())
      .then(data => {this.setState({ data })})
  }

  render() {
    const options = {
      title: {text: this.state.data === null ? 'Loading...' : 'World map'},
      chart: {
        map: this.state.data,
        height: '800px'
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)'
      },
      colorAxis: {
        min: -30000,
        max: 30000,
        stops: [
          [0.0, '#cc0000'],
          [0.5, '#cccccc'],
          [1.0, '#0000cc']
        ],
        labels: {
          format: '{value}'
        }
      },
      series: [
        {
          allAreas: true,
        },
        {
          mapData: this.state.data,
          allAreas: false,
          name: 'Country2',
          data: this.props.series
        }
      ],
    }

    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={options}
      />
    );
  }
}
