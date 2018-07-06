import * as React from 'react';
import styled, { css } from 'react-emotion';

export const baseInputStyle = css`
  display: block;
  width: 100%;
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

export const StyledInput = styled('input')`
  ${baseInputStyle};
`;

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, ref, ...inputProps }: Props) => {
  return (
    <div>
      <label>
        {label}

        <StyledInput {...inputProps} />
      </label>
    </div>
  );
};

export default Input;
