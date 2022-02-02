import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = props => {
  const dispatch = useDispatch()

  const onLogout = async (e) => {
    props.setTrigger(false);
    await dispatch(logout());
  };

  return <button onClick={onLogout} className="logout-button button-default">Logout</button>;
};

export default LogoutButton;
