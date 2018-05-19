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
        {
          series.map(row =>
            <tr key={row[0]}>
              <td>{row.country}</td>
              <TdNumber>{row.amount.toLocaleString()}</TdNumber>
            </tr>
          )
        }
      </table>
    );
  }
}

export default Table;
