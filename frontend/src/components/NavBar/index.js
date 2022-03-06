
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
  const [userDrop, setUserDrop] = useState(false);
  const [createButtonPopup, setCreateButtonPopup] = useState(false);

  const handleProfile = event => {
    event.preventDefault();

    setUserDrop(!userDrop);
  };

  const handleCreate = event => {
      event.preventDefault();

      setUserDrop(false);
      setCreateButtonPopup(true);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="nav-bar-div" id="nav-bar">
    {userDrop && (
      <>
        <div className="user-drop-background" onClick={event => setUserDrop(false)} />
        <div className="user-dropdown">
          <div className="user-info">
            {user && (
              <div>
                <div className="upper-dropdown">
                  
                  <NavLink to={`/users/${user?.id}`}>
                    <img
                      className="nav-avatar"
                      src={user.profile_pic_url}
                      alt="user-profile"
                      onClick={event => setUserDrop(false)}
                    />
                  </NavLink>
                  <label className="dropdown-username" onClick={event => setUserDrop(false)}>
                    <NavLink to={`/users/${user?.id}`}>{user.username}</NavLink>
                  </label>
                </div>
                <div className="lower-dropdown">
                  <label className="dropdown-email">{user.email}</label>
                </div>
              </div>
            )}
          </div>
          <LogoutButton trigger={userDrop} setTrigger={setUserDrop}/>
        </div>
      </>
    )}
      <div className='upper-nav-div'>
        <h2 className="background-title">PokéUp</h2>
        <h2 className="site-title">
          <NavLink to='/' exact={true} activeClassName='active' className="nav-link">
            PokéUp
          </NavLink>
        </h2>
        {user && (
          <div className="nav-buttons-div">
            <NavLink to='/chats' exact={true} activeClassName='active' className="nav-link">
              <button className="button-pokeball nav-buttons">
                Inbox
              </button>
            </NavLink>
            <NavLink to='/lists' exact={true} activeClassName='active' className="nav-link">
              <button className="button-pokeball nav-buttons">
                Lists
              </button>
            </NavLink>
            <button onClick={handleProfile} className='button-pokeball nav-buttons'>
              Profile
            </button>
            <button className="create-button button-pokeball" id="create-post-button" onClick={handleCreate}>
              Create Post!
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
            <NavLink key={category.id} to={`/${category.name.split(' ').length > 1 ? 'tm' : category.name.toLowerCase()}`} className="category-text">{category.name}</NavLink>
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
