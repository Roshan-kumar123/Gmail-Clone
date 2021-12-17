import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { IconButton, Avatar } from '@material-ui/core';
import { Button } from '@material-ui/core';

import './Header.css';
import GmailLogo from '../../img/gmail-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/features/userSlice';
import { auth } from '../../firebase';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className={'header'}>
      <div className={'header-left'}>
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img src={GmailLogo} alt='GmailLogo' />
      </div>

      <div className={'header-middle'}>
        <SearchIcon />
        <input type='text' placeholder='Search mail' />
        <ArrowDropDownIcon />
      </div>

      <div className={'header-right'}>
        <IconButton>
          <AppsIcon />
        </IconButton>
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <Avatar className={'avatar'} src={user?.photoUrl} />
        <Button variant='outlined' color='secondary' onClick={signOut}>
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Header;
