import React from 'react';
import styled from 'styled-components';

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Li = styled.li`
`;

const OptionGroup = ({name, options, selected, onChange}) => (
  <Ul>
    {
      options.map(option => (
        <Li key={option.value}>
          <label>
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={option.value === selected}
              onChange={() => onChange(option.value)}
            />
            <span>{option.text}</span>
          </label>
        </Li>
      ))
    }
  </Ul>
)

export default OptionGroup;
