import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';

const Ul = styled.ul`
  list-style: none;
  padding: 12px;
  margin: 0;
  display: flex;
  justify-content: center;
  background: rgba(0,0,0,0.5);
`;

const Li = styled.li`
  border-bottom: 3px rgba(255,255,255,${props => props.highlighted ? '1' : '0.5'}) solid;
  margin: 0 4px;
  color: rgba(255,255,255,${props => props.highlighted ? '1' : '0'});
  cursor: pointer;

  :hover {
    color: #fff;
    border-bottom-color: rgba(255,255,255,1);
  }
`;

const YearSelector = ({min, max, selected, onSelect}) => {
  const options = range(min, max+1);
  return (
    <Ul>
      {
        options.map(option => (
          <Li
            highlighted={option === selected}
            onClick={() => onSelect(option)}
          >
            {option}
          </Li>
        ))
      }
    </Ul>
  );
}

export default YearSelector;
