import * as React from 'react';
import styled from 'react-emotion';
import { Option } from 'catling';

interface Props {
  inputKey: number | string;
  onChange: (file: Option<File>) => void;
  uploading: boolean;
}

const DragArea = styled('div')`
  border: 1px dashed #777;
  height: 250px;
  width: 100%;
  position: relative;
`;

const StyledInput = styled('input')`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  cursor: pointer;
`;

export const FileInput = ({ onChange, inputKey, uploading }: Props) => {
  return (
    <DragArea>
      <StyledInput
        type="file"
        key={inputKey}
        onChange={e => {
          onChange(
            Option(e.target.files).flatMap(files => Option(files.item(0))),
          );
        }}
      />
      {uploading && <p>Uploading...</p>}
    </DragArea>
  );
};

export default FileInput;
