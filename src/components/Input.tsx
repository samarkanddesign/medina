import * as React from 'react';
import { prop, compose } from 'ramda';
import styled from 'react-emotion';

export const StyledInput = styled('input')`
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  padding: 0.5rem;
  background: hsl(22, 12%, 98%);
  &:hover {
    background: hsl(22, 12%, 95%);
  }
  &:focus {
    background: hsl(22, 12%, 93%);
  }
`;

interface Props {
  label: string;
  value: string;
  type?: 'text';
  onChange: (value: string) => void;
}

export const Input = ({ value, label, type = 'text', onChange }: Props) => {
  return (
    <div>
      <label>
        {label}
        <StyledInput
          type={type}
          value={value}
          onChange={compose(
            onChange,
            prop('value'),
            prop('target'),
          )}
        />
      </label>
    </div>
  );
};

export default Input;
