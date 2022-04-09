import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout, login } from '../../store/session';
import './SideBar.css';

export default function SideBar(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const onLogout = async (e) => {
        e.preventDefault();
        props.setTrigger(false);
        await dispatch(logout());
    };

    const handleDemo = async e => {
        e.preventDefault();
        await dispatch(login("demo@pokeup.com", "password"));
        document.getElementById('nav-bar').removeAttribute('hidden');
    }

    return (
        <>
            <div className="mobile-sidebar-background" onClick={() => props.setTrigger(false)} style={props.trigger ? { transform: 'translateX(100vw)' } : {}}></div>
            <div className="mobile-sidebar" style={props.trigger ? { transform: 'translateX(100vw)' } : {}}>
            {props.currentUser && (
                    <div className="sidebar-buttons-div">
                        <NavLink to='/chats' exact={true} activeClassName='active' className="nav-link" onClick={() => props.setTrigger(false)}>
                            <button className="button-pokeball nav-buttons">
                                Inbox
                            </button>
                        </NavLink>
                        <NavLink to='/lists' exact={true} activeClassName='active' className="nav-link" onClick={() => props.setTrigger(false)}>
                            <button className="button-pokeball nav-buttons">
                                Lists
                            </button>
                        </NavLink>
                    </div>
                )}
                <NavLink to='/' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                    Home
                </NavLink>
                <NavLink to='/potions' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                    Potions
                </NavLink>
                <NavLink to='/pokémon' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                    Pokémon
                </NavLink>
                <NavLink to='/clothing' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                    Clothing
                </NavLink>
                <NavLink to='/tm' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                    TM
                </NavLink>
                <NavLink to='/pokéballs' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                    Pokéballs
                </NavLink>
                <NavLink to='/berries' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                    Berries
                </NavLink>
                {!props.currentUser && (
                    <div className="mobile-sidebar-user">
                        <div className="mobile-sidebar-bottom">
                            <NavLink to='/login' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                                Login!
                            </NavLink>
                            <NavLink to='/sign-up' exact={true} onClick={() => props.setTrigger(false)} className="mobile-category-text">
                                Sign Up!
                            </NavLink>
                        </div>
                        <button className='button-default' onClick={handleDemo}>Demo</button>
                    </div>
                )}
                {props.currentUser && (
                    <div className="mobile-sidebar-profile">
                        <NavLink to={`/users/${props.currentUser?.id}`} onClick={() => props.setTrigger(false)}>
                            <img
                                className="nav-avatar"
                                src={props.currentUser.profile_pic_url}
                                alt="user-profile"
                            />
                        </NavLink>
                        <label className="username-sidebar">
                            <NavLink to={`/users/${props.currentUser?.id}`} onClick={() => props.setTrigger(false)}>{props.currentUser.username}</NavLink>
                        </label>
                        <label className="dropdown-email">{props.currentUser.email}</label>
                        <button className="button-default" onClick={onLogout}>Log Out</button>
                    </div>
                )}
            </div>
        </>
    );
}