import {
  AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import User from '../../models/User';
import { RootState } from '../../store/rootReducer';
import { logoutUser } from '../../store/User/dispatchers';

import styles from './Header.module.css';

/** Main header of the app. */
const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const onMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseClick = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.header}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={styles.title}>
            SW Films
          </Typography>
          {user && (
            <div className={styles.navigation}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onMenuClick}
                color="inherit"
              >
                {user.picture && <Avatar alt={user.name} src={user.picture} />}
                {!user.picture && <AccountCircle />}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={onCloseClick}
              >
                <MenuItem onClick={onCloseClick}>
                  <b>Name:&nbsp;</b>
                  {user.name}
                </MenuItem>
                <MenuItem onClick={onCloseClick}>
                  <b>Email:&nbsp;</b>
                  {user.email}
                </MenuItem>
              </Menu>
              <Button color="inherit" type="button" onClick={onLogoutClick}>
                Logout
              </Button>
            </div>
          )}
          {!user && (
            <div>
              <Button color="inherit" type="button">
                <Link color="inherit" to="/auth" className={styles.link}>
                  Login
                </Link>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>

  );
};

export default Header;
