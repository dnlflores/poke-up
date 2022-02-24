import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = props => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    props.setTrigger(false);
    await dispatch(logout());
    history.push("/login");
  };

  return <button onClick={onLogout} className="logout-button button-default">Logout</button>;
};

export default LogoutButton;
