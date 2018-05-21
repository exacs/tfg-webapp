import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  overflow: auto;
  height: 100%;
`;

const Table = styled.table`
  margin: 48px auto;
`;

const Th = styled.th`
  padding: 4px 8px;
  text-align: ${props => props.number ? 'right' : 'left'}
`;

const Td = styled.td`
  padding: 4px 8px;
  text-align: ${props => props.number ? 'right' : 'left'}
`;

class TableMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const series = this.props.series;
    return (
      <Container>
        <Table>
          <thead>
            <tr>
              <Th>Code</Th>
              <Th>Country Name</Th>
              <Th number>Amount</Th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.selectedCountry && (
                <tr>
                  <Td colspan={2} onClick={() => this.props.onSelect(null)}>
                    <div>Selected country: {this.props.selectedCountry}</div>
                  </Td>
                </tr>
              )
            }
                {
                  series.map(row =>
                    <tr key={row.code} onClick={() => this.props.onSelect(row.code)}>
                      <Td>{row.code}</Td>
                      <Td>{row.name}</Td>
                      <Td number>{row.amount.toLocaleString()}</Td>
                    </tr>
                  )
                }
          </tbody>
        </Table>
      </Container>
    );
  }
}

export default TableMap;
