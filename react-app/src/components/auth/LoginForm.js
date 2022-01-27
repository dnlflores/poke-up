import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import { useEffect } from 'react';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('nav-bar').setAttribute('hidden', true);
  }, [])

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    document.getElementById('nav-bar').removeAttribute('hidden');
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleDemo = event => {
    dispatch(login("demo@pokeup.com", "password"));
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-form-container">
    <h2 className="background-title login-back">PokéUp</h2>
    <h2 className="site-title login-front">
      <NavLink to='/' exact={true} activeClassName='active' className="nav-link">
        PokéUp
      </NavLink>
    </h2>
      <form onSubmit={onLogin} className='login-form'>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='login-email-div'>
          <label htmlFor='email' className="login-email-label">Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className='login-email-input'
          />
        </div>
        <div className='login-password-div'>
          <label htmlFor='password' className='login-password-label'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className='login-password-input'
          />
          <div className='login-buttons'>
            <button type='submit' className="button-default">Login</button>
            <button className='button-default' onClick={handleDemo}>Demo</button>
          </div>
        </div>
      </form>
      <img src="https://pokeup.s3.us-west-1.amazonaws.com/kindpng_5867842.png" alt="pikachu-ash" className="pikachu-ash-login"></img>
      <img src="https://pokeup.s3.us-west-1.amazonaws.com/pinpng.com-mew-png-3188496.png" alt="mew" className="mew-login"></img>
      <div className='background-red'></div>
      <label className='signup-link'>Need an account? <NavLink to="/sign-up" activeClassName='active' exact={true}>Sign up here!</NavLink></label>
    </div>
  );
};

export default LoginForm;
