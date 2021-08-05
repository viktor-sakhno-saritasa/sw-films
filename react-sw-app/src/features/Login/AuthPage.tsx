import { Container } from '@material-ui/core';
import React from 'react';
import LoginForm from './components/LoginForm';

export const AuthPage = () => (
  <Container maxWidth="sm">
    <LoginForm />
  </Container>
);
