import {
  AppBar, Avatar, Button, IconButton, Menu, MenuItem, Toolbar, Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { loginUser, logoutUser } from '../../store/User/dispatchers';

import styles from './Header.module.css';

/** Main header of the app. */
const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  /**
   * Open Menu.
   * @param event User's mouse event.
   */
  const onMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /** Close menu handler. */
  const onCloseClick = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  /** Logout user handler. */
  const onLogoutClick = () => {
    dispatch(logoutUser());
  };

  /** Login user handler. */
  const onLoginClick = () => {
    dispatch(loginUser());
  };

  return (
    <div className={styles.header}>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          <Typography variant="h5" className={styles.title}>
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
              <Button color="inherit" type="button" onClick={onLoginClick}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>

  );
};

export default Header;
