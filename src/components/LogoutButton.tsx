import * as React from 'react';
import { Button } from './Button';
import { Dispatch } from 'redux';
import { Action } from '../store/reducers';
import { UnsetToken } from '../store/reducers/auth';
import { connect } from 'react-redux';

interface DispatchMappedToProps {
  logout: () => void;
}

type Props = DispatchMappedToProps;

const LogoutButton = ({ logout }: Props) => {
  return <Button onClick={logout}>🚶‍♂️</Button>;
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  logout: () => dispatch(UnsetToken()),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(LogoutButton);
