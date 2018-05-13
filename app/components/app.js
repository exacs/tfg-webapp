import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

import Map from './map';
import RangeSelector from './range-selector';

const Container = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
`;

const Floater = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

const d1 = [
  ['es', 10000]
];

const d2 = [
  ['fr', -1000],
  ['ma', 1000],
  ['se', 15000]
]

const data = [d1, d2];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0
    }
  }

  handleChangeDate() {
    this.setState(prevState => ({id: prevState.id + 1 }));
  }

  render() {
    const selectedData = data[this.state.id % data.length];
    return (
      <Container>
        <Map series={selectedData} />
        <Floater>
          <RangeSelector onChange={() => this.handleChangeDate()} />
        </Floater>
      </Container>
    );
  }
}

export default hot(module)(App);
