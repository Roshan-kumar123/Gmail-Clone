import React from 'react';
import './Login.css';
import GmailLogin from '../img/gmail-login-logo.webp';
import { Button } from '@material-ui/core';
import { auth, provider } from '../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../redux/features/userSlice';

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const signInAnonymous = () => {
    auth
      .signInAnonymously()
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={'login'}>
      <div className='login-container'>
        <img src={GmailLogin} alt='loginLogo' />
        <Button
          className={'signIn-button'}
          variant='contained'
          color='primary'
          onClick={signIn}
        >
          google Sign In
        </Button>
        <Button variant='contained' color='primary' onClick={signInAnonymous}>
          Anonymous Sign In
        </Button>
      </div>
    </div>
  );
};

export default Login;
