import { baseInputStyle } from './Input';

import * as React from 'react';
import styled from 'react-emotion';

const StyledTextArea = styled('textarea')`
  ${baseInputStyle};
  font-family: inherit;
  max-width: 100%;
`;

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = ({ label, name, value, onChange, onBlur }: Props) => {
  return (
    <div>
      <label>
        {label}
        <StyledTextArea
          value={value}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

export default TextArea;
