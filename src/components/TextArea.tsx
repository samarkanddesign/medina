import { StyledInput } from './Input';

import * as React from 'react';
import { prop, compose } from 'ramda';

const StyledTextArea = StyledInput.withComponent('textarea');

interface Props {
  label: string;
  value: string;
  type?: 'text';
  onChange: (value: string) => void;
}

export const TextArea = ({ label, value, onChange }: Props) => {
  return (
    <div>
      <label>
        {label}
        <StyledTextArea
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

export default TextArea;
