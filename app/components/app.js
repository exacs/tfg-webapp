import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import fetch from 'isomorphic-fetch';

import Map from './map';
import RangeSelector from './range-selector';
import OptionGroup from './option-group';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const Main = styled.main`
  position: relative;
  height: 100%;
  flex: 1 1 auto;
`;

const MapContainer = styled.div`
  height: 100%;
`;

const Aside = styled.aside`
  width: 300px;
  flex: 0 0 auto;
`;

const Floater = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: 'all',
      dimension: 'country',
      year: 2016,
      data: []
    }

    this.fetchData = this.fetchData.bind(this);
  }

  handleChangeDimension(dimension) {
    this.setState({ dimension });
  }

  handleChangeFilter(filter) {
    this.setState({ filter }, this.fetchData);
  }

  handleChangeDate(year) {
    this.setState({ year }, this.fetchData);
  }

  fetchData() {
    fetch(`/query?year=${this.state.year}&filter=${this.state.filter}`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(e => {console.log(e)});

    fetch(`/countries`)
      .then(response => response.json())
      .then(countries => this.setState({ countries }))
      .catch(e => {console.log(e)});
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Container>
        <Main>
          <MapContainer>
            <Map
              filter={this.state.filter}
              movements={this.state.data}
              countries={this.state.countries}
            />
          </MapContainer>
          <Floater>
            <RangeSelector
              onChange={(selected) => this.handleChangeDate(selected)}
            />
          </Floater>
        </Main>
        <Aside>
          <h2>Choose a filter</h2>
          <OptionGroup
            name='filter'
            options={[
              { text: 'All', value: 'all' },
              { text: 'From non-free to free country', value: 'free_country' },
              { text: 'From poor to rich', value: 'gdp_capita' },
              { text: 'From low HDI to high HDI', value: 'hdi' }
            ]}
            selected={this.state.filter}
            onChange={(filter) => this.handleChangeFilter(filter)}
          />
          <hr />
          <OptionGroup
            name='dimension'
            options={[
              { text: 'Country', value: 'country' },
            ]}
            selected={this.state.dimension}
            onChange={(dimension) => this.handleChangeDimension(dimension)}
          />
        </Aside>
      </Container>
    );
  }
}

export default hot(module)(App);
