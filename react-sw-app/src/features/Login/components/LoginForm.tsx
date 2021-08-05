import {
  Button, ButtonGroup, Paper,
} from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../store/User/dispatchers';

import styles from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const onLoginClick = () => {
    dispatch(loginUser());
  };

  return (
    <div className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="contained"
        >
          <Button type="button" className={styles.button} onClick={onLoginClick}>Login with Google</Button>
          <Button type="button"><Link to="/" color="inherit" className={styles.link}>Back to the main</Link></Button>
        </ButtonGroup>
      </Paper>
    </div>

  );
};

export default LoginForm;
