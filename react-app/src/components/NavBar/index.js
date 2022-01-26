
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreatePost from '../CreatePost';
import { getCategories } from '../../store/category';
import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const categories = useSelector(state => Object.values(state.categories));
  const [createButtonPopup, setCreateButtonPopup] = useState(false);
  const [profilePopup, setProfilePopup] = useState(false);

  console.log("THIS IS THE CATEGORIES => ", categories);

  const handleCreate = event => {
    event.preventDefault();

    setCreateButtonPopup(true);
  }

  const handleProfile = event => {
    event.preventDefault();

    setProfilePopup(!profilePopup);
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
          {profilePopup && (
            <div class="profile-dropdown-div">
              <div>
                <NavLink to='/login' exact={true} activeClassName='active' className="nav-link">
                  Login
                </NavLink>
              </div>
              <div>
                <NavLink to='/sign-up' exact={true} activeClassName='active' className="nav-link">
                  Sign Up
                </NavLink>
              </div>
              <div>
                <NavLink to='/users' exact={true} activeClassName='active' className="nav-link">
                  Users
                </NavLink>
              </div>
              <div>
                <button className='create-post-button' onClick={handleCreate}>Create Post</button>
              </div>
              {user && (
                <div>
                  <LogoutButton />
                </div>
              )}
            </div>)}
      </div>
      <nav>
        <div className="categories-container">
          {categories?.map(category => (
            <NavLink to={`/${category.name.split(' ').length > 1 ? 'tm' : category.name.toLowerCase()}`} className="category-text">{category.name}</NavLink>
          ))}
        </div>
      </nav>
      {createButtonPopup && (
        <CreatePost trigger={createButtonPopup} setTrigger={setCreateButtonPopup} />
      )}
    </div>
  );
}

export default NavBar;
