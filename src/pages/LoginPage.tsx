import * as React from 'react';
import { Formik } from 'formik';
import { LoginMutation, LOGIN } from '../graphql/mutations';
import Input from '../components/Input';
import { Dispatch } from '../../node_modules/redux';
import { Action } from '../store/reducers';
import { SetToken } from '../store/reducers/auth';
import { connect } from 'react-redux';

interface DispatchMappedToProps {
  setToken: (token: string) => void;
}

type Props = DispatchMappedToProps;

// interface LoginForm {
//   email: string;
//   password: string;
// }

export const LoginPage = ({ setToken }: Props) => {
  return (
    <section>
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

                    <button type="submit">Login</button>
                  </form>
                );
              }}
            </Formik>
          );
        }}
      </LoginMutation>
    </section>
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
