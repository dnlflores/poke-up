
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { getCategories } from '../../store/category';
import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const categories = useSelector(state => Object.values(state.categories));
  const [userDrop, setUserDrop] = useState(false);

  const handleProfile = event => {
    event.preventDefault();

    // setProfilePopup(!profilePopup);
    setUserDrop(!userDrop);
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  return (
    <div className="nav-bar-div">
      <div className='upper-nav-div'>
        <h2 className="background-title">PokéUp</h2>
        <h2 className="site-title">
          <NavLink to='/' exact={true} activeClassName='active' className="nav-link">
            PokéUp
          </NavLink>
        </h2>
        {user && (
          <div className="nav-buttons-div">
            <button className='button-pokeball nav-buttons'>
              Selling
            </button>
              <NavLink to='/lists' exact={true} activeClassName='active' className="nav-link">
                <button className="button-pokeball nav-buttons">
                  Lists
                </button>
              </NavLink>
            <button onClick={handleProfile} className='button-pokeball nav-buttons'>
              Profile
            </button>
          </div>
        )}
        {!user && (
          <div className="nav-buttons-div">
            <NavLink to='/login' exact={true} activeClassName='active'>
              <button className="button-pokeball nav-buttons login-button">Login!</button>
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              <button className="button-pokeball nav-buttons signup-button">Sign Up!</button>
            </NavLink>
          </div>
        )}
      </div>
      <nav>
        <div className="categories-container">
          {categories?.map(category => (
            <NavLink to={`/${category.name.split(' ').length > 1 ? 'tm' : category.name.toLowerCase()}`} className="category-text">{category.name}</NavLink>
          ))}
        </div>
      </nav>
      {userDrop && (
        <div className="user-dropdown">
          <div className="user-info">
            {user && (
              <div>
                <div className="upper-dropdown">
                  <img
                    className="nav-avatar"
                    src={user.profile_pic_url}
                    alt="user-profile"
                  />
                  <label className="dropdown-username">{user.username}</label>
                </div>
                <div className="lower-dropdown">
                  <label className="dropdown-email">{user.email}</label>
                </div>
              </div>
            )}
          </div>
          <LogoutButton trigger={userDrop} setTrigger={setUserDrop}/>
        </div>
      )}
    </div>
  );
}

export default NavBar;
