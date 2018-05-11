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
        map: this.state.data
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255, 255, 255, 0.85)'
      },
      colorAxis: {
        min: 0,
        max: 1,
        stops: [[0, '#F1EEF6'], [1, '#500007'], [2, '#ff0000']],
        labels: {
          format: '{value}%'
        }
      },
      series: [
        {
          allAreas: true,
        },
        {
          mapData: this.state.data,
          allAreas: false,
          name: 'Country',
          data: [
            ['no', 1],
            ['se', 1],
            ['dk', 1],
            ['fi', 1]
          ],

        },
        {
          mapData: this.state.data,
          allAreas: false,
          name: 'Country2',
          data: [
            ['es', 2],
            ['jp', 2],
          ],

        }
      ],
    }

    console.log(options.chart.map === null);

    return (
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'mapChart'}
        options={options}
      />
    );
  }
}


const options = {
  title: {
    text: 'Highlightmaps basic demo'
  },

  colorAxis: {
    min: 0
  },

  series: [{
    data: [],
    name: 'Random data',
    states: {
      hover: {
        color: '#BADA55'
      }
    },
    dataLabels: {
      enabled: true,
      format: '{point.name}'
    }
  }]
}

