import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';
import fetch from 'isomorphic-fetch';

import Map from './map';
import RangeSelector from './range-selector';
import OptionGroup from './option-group';

const Container = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
`;

const Main = styled.main`
  position: relative;
  flex: 1 1 auto;
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
      dimension: 'country',
      year: 2016,
      data: []
    }

    this.fetchData = this.fetchData.bind(this);
  }

  handleChangeDimension(dimension) {
    this.setState({ dimension });
  }

  handleChangeDate(year) {
    this.setState({ year }, this.fetchData);
  }

  fetchData() {
    fetch(`/query?year=${this.state.year}`)
      .then(response => response.json())
      .then(data => this.setState({ data }))
      .catch(e => {console.log(e)});
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Container>
        <Main>
          <Map series={this.state.data} />
          <Floater>
            <RangeSelector
              onChange={(selected) => this.handleChangeDate(selected)}
            />
          </Floater>
        </Main>
        <Aside>
          <OptionGroup
            name='dimension'
            options={[
              { text: 'Country', value: 'country' },
              // { text: 'Supranational organization', value: 'supra'}
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
