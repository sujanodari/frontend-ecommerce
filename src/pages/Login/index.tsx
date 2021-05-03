import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { Typography, Grid, Link, Paper } from '@material-ui/core';
import { useMutation, useQuery, ApolloError } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';

import { LOGIN_MUTATION, AUTHENTICATED_USER } from '../../gql/auth';
import { ILoginData } from '../../interfaces/IAuth';
import routes from '../../config/routes';
import { authenticatedUserVar } from '../../reactiveVariables';
import constants from '../../config/constants';

interface IProps {}

const Login = (props: IProps) => {
  const history = useHistory();

  const { data: authData } = useQuery(AUTHENTICATED_USER);

  if (authData?.AuthenticatedUser?.isLoggedIn) {
    history.push(routes.dashboard);
  }

  const [loginData, setLoginData] = useState<ILoginData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [error, setError] = useState<String>('');

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      if (
        data?.Login?.accessToken &&
        (data?.Login?.role === constants.roles.admin)
      ) {
        authenticatedUserVar({
          accessToken: data.Login.accessToken,
          isLoggedIn: true,
          user: {
            _id: data.Login._id,
            role: data.Login.role,
          },
        });
        setLoginData({ email: '', password: '' });
        history.push(routes.dashboard);
      } else {
        setError('Invalid login credentials.');
      }
    },
    onError(error: ApolloError) {
      console.log(error)
      if (error.message === 'Failed to fetch') {
        setError('Server Error');
      } else {
        setError(error.message);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    let user = { ...loginData, [name]: value };
    setLoginData(user);
    if (error) {
      setError('');
    }
  };

  const userLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: { loginInput: loginData },
    });
  };

  const forgetPassword = () => {
    history.push(routes.forgetPassword);
  };

  let handleMouseUpPasswordHide = () => setShowPassword(!showPassword);
  let handleMouseDownPasswordShow = () => setShowPassword(!showPassword);

  return (
    <Container className="main-container">
        <CssBaseline />
        <div className="paper">
          <Typography component="h1" variant="h5" className="login-title">
            Sign In
          </Typography>
          <form onSubmit={userLogin} className="form-margin">
            {error ? (
              <Alert className="form-margin" severity="error">
                {error}
              </Alert>
            ) : null}
            <TextField
              className="form-margin"
              required
              fullWidth
              variant="outlined"
              value={loginData.email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              className="form-margin"
              required
              fullWidth
              variant="outlined"
              name="password"
              label="Password"
              value={loginData.password}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    color="inherit"
                    aria-label="toggle password visibility"
                    onMouseUp={handleMouseUpPasswordHide}
                    onMouseDown={handleMouseDownPasswordShow}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </InputAdornment>
                ),
              }}
            />
            <Button className="login-button form-margin" type="submit" fullWidth variant="contained">
              Sign In
            </Button>
          </form>
          <Grid container className="forgot-password form-margin">
            <Grid item xs>
              <Link onClick={forgetPassword}>Forgot password?</Link>
            </Grid>
          </Grid>
        </div>
    </Container>
  );
};

export default Login;
