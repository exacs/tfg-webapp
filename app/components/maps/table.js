import React from 'react';
import styled from 'styled-components';

const TdNumber = styled.td`
  text-align: right;
`;

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const series = this.props.series;
    return (
      <table>
        <tbody>
          {
            this.props.selectedCountry && (
              <tr>
                <td colspan={2} onClick={() => this.props.onSelect(null)}>
                  <div>Selected country: {this.props.selectedCountry}</div>
                </td>
              </tr>
            )
          }
          {
            series.map(row =>
              <tr key={row.country} onClick={() => this.props.onSelect(row.country)}>
                <td>{row.country}</td>
                <TdNumber>{row.amount.toLocaleString()}</TdNumber>
              </tr>
            )
          }
        </tbody>
      </table>
    );
  }
}

export default Table;
