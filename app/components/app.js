import React from 'react';
import styled from 'styled-components';
import { hot } from 'react-hot-loader';

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
      dimension: 'country',
      id: 0
    }
  }

  handleChangeDimension(dimension) {
    this.setState({ dimension });
  }

  handleChangeDate() {
    this.setState(prevState => ({id: prevState.id + 1 }));
  }

  render() {
    const selectedData = data[this.state.id % data.length];
    return (
      <Container>
        <Main>
          <Map series={selectedData} />
          <Floater>
            <RangeSelector onChange={() => this.handleChangeDate()} />
          </Floater>
        </Main>
        <Aside>
          <OptionGroup
            name='dimension'
            options={[
              { text: 'Country', value: 'country' },
              { text: 'Supranational organization', value: 'supra'}
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
