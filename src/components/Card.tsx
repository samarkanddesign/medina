import styled from 'react-emotion';
import { boxShadow } from './style';

export const Card = styled('div')`
  background: #fff;
  border-radius: 4px;
  box-shadow: ${boxShadow};
  padding: 1rem;
`;

export default Card;
