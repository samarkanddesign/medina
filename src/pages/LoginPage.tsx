import * as React from 'react';
import { Formik } from 'formik';
import { LoginMutation, LOGIN } from '../graphql/mutations';
import Input from '../components/Input';
import { Dispatch } from '../../node_modules/redux';
import { Action } from '../store/reducers';
import { SetToken } from '../store/reducers/auth';
import { connect } from 'react-redux';
import EnsureGuest from '../components/EnsureGuest';
import Intro from '../layouts/Intro';
import Vspace from '../components/Vspace';
import { Button } from '../components/Button';

interface DispatchMappedToProps {
  setToken: (token: string) => void;
}

type Props = DispatchMappedToProps;

export const LoginPage = ({ setToken }: Props) => {
  return (
    <EnsureGuest>
      <Intro>
        <h1>Login</h1>

        <LoginMutation mutation={LOGIN}>
          {getSession => {
            return (
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={values => {
                  getSession({ variables: values })
                    .then(data => {
                      console.log(data);
                      if (data && data.data && data.data.login) {
                        setToken(data.data.login.jwt);
                      }
                    })
                    .catch(alert);
                }}
              >
                {({ handleSubmit, handleBlur, handleChange, values }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <Vspace>
                        <Input
                          label="Email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />

                        <Input
                          label="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="password"
                        />

                        <Button isFullWidth type="submit">
                          Login
                        </Button>
                      </Vspace>
                    </form>
                  );
                }}
              </Formik>
            );
          }}
        </LoginMutation>
      </Intro>
    </EnsureGuest>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<Action>,
): DispatchMappedToProps => ({
  setToken: token => dispatch(SetToken(token)),
});

export default connect(
  () => ({}),
  mapDispatchToProps,
)(LoginPage);
