import * as React from 'react';
import { Formik } from 'formik';
import { LoginMutation, LOGIN } from '../graphql/mutations';
import Input from '../components/Input';

interface Props {}

// interface LoginForm {
//   email: string;
//   password: string;
// }

export const LoginPage = ({  }: Props) => {
  return (
    <section>
      <h1>Login</h1>

      <LoginMutation mutation={LOGIN}>
        {getSession => {
          return (
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={values => {
                getSession({ variables: values }).then(console.log);
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

export default LoginPage;
