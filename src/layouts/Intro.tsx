import * as React from 'react';
import styled from 'react-emotion';
import { pallette, spacing, boxShadow } from '../components/style';

interface Props {
  children: React.ReactNode;
}

const Wrapper = styled('main')`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${pallette.goodfriends.darkbrown};
  padding: ${spacing.goat};
`;

const FormBox = styled('div')`
  background: #fff;
  padding: ${spacing.lion};
  width: 21rem;
  max-width: 100%;
  box-shadow: ${boxShadow};
`;

export const Intro = ({ children }: Props) => {
  return (
    <Wrapper>
      <FormBox>{children}</FormBox>
    </Wrapper>
  );
};

export default Intro;
