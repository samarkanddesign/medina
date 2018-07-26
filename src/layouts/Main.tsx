import * as React from 'react';
import styled from 'react-emotion';
import * as logo from '../samarkand-logo-250.svg';
import { pallette, spacing } from '../components/style';
import LogoutButton from '../components/LogoutButton';
import { Link } from 'react-router-dom';
interface Props {}

const StyledHeader = styled('header')`
  background: ${pallette.goodfriends.darkbrown};
  padding: ${spacing.cat};
  color: #fff;
  display: flex;
  a {
    color: #fff;
  }
`;

const Header = () => (
  <StyledHeader className="App-header">
    <img src={logo} style={{ width: '50px', height: '50px' }} />

    <ul>
      <li>
        <Link to="/products">Products</Link>
      </li>
    </ul>

    <LogoutButton />
  </StyledHeader>
);

interface Props {
  children: React.ReactNode;
}

export const Main = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Main;
