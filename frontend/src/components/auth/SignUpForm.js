import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        document.getElementById('nav-bar').setAttribute('style', 'display: none');
        document.getElementById('about-links').setAttribute('style', 'display: none');
        document.getElementById('root').setAttribute('style', 'position: static');
    }, [])

    const onSignUp = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data);
                setShowErrors(true);
            } else document.getElementById('nav-bar').removeAttribute('hidden');
        } else {
            errors.push('Passwords must match.')
            setShowErrors(true);
        }
    };

    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <div className='signup-form-container'>
            <h2 className="background-title login-back">PokéUp</h2>
            <h2 className="site-title login-front">
                <NavLink to='/' exact={true} activeClassName='active' className="nav-link" onClick={event => document.getElementById('nav-bar').removeAttribute('hidden')}>
                    PokéUp
                </NavLink>
            </h2>
            <form onSubmit={onSignUp} className='signup-form'>
                {showErrors > 0 && (
                    <div className="errors-container login-signup">
                        {errors.length > 0 && errors.map(err => (
                            <label className="display-errors" key={err}>{err}</label>
                        ))}
                        <button className="button-default" onClick={event => setShowErrors(false)}>Ok!</button>
                    </div>
                )}
                <div className="signup-username-div">
                    <label className='signup-username-label'>User Name</label>
                    <input
                        type='text'
                        name='username'
                        onChange={updateUsername}
                        value={username}
                        className='signup-username-input'
                        placeholder='Username'
                    ></input>
                </div>
                <div className="signup-email-div">
                    <label className="signup-email-label">Email</label>
                    <input
                        type='text'
                        name='email'
                        onChange={updateEmail}
                        value={email}
                        className="signup-email-input"
                        placeholder='Email'
                    ></input>
                </div>
                <div className="signup-password-div">
                    <label className="signup-password-label">Password</label>
                    <input
                        type='password'
                        name='password'
                        onChange={updatePassword}
                        value={password}
                        className="signup-password-input"
                        placeholder='Password'
                    ></input>
                </div>
                <div className="signup-repeat-password-div">
                    <label className="signup-repeat-password-label">Confirm Password</label>
                    <input
                        type='password'
                        name='repeat_password'
                        onChange={updateRepeatPassword}
                        value={repeatPassword}
                        required={true}
                        className="signup-repeat-password-input"
                        placeholder='Confirm Password'
                    ></input>
                </div>
                <button type='submit' className="button-default">Sign Up!</button>
            </form>
            <div className='background-red'></div>
            <img src="https://pokeup.s3.us-west-1.amazonaws.com/ash-char-pika.png" alt="ash-pika-char" className='ash-pika-char-pic'></img>
            <img src="https://pokeup.s3.us-west-1.amazonaws.com/Pokemon-Darkrai-PNG-File.png" alt="darkrai" className='darkrai-pic'></img>
            <label className='login-link'>Have an account? <NavLink to="/login">Log In Here!</NavLink></label>
        </div>
    );
};

export default SignUpForm;
