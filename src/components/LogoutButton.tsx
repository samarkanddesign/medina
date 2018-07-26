import * as React from 'react';
import { TextButton } from './Button';
import { Dispatch } from 'redux';
import { Action } from '../store/reducers';
import { UnsetToken } from '../store/reducers/auth';
import { connect } from 'react-redux';

interface DispatchMappedToProps {
  logout: () => void;
}

type Props = DispatchMappedToProps;

const LogoutButton = ({ logout }: Props) => {
  return <TextButton onClick={logout}>🚶‍♂️</TextButton>;
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
