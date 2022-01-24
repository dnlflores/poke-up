
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreatePost from '../CreatePost';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  const [createButtonPopup, setCreateButtonPopup] = useState(false);

  const handleCreate = event => {
    event.preventDefault();

    setCreateButtonPopup(true);
  }

  return (
    <div className="nav-bar-div">
      <h2 className="site-title">PokéUp</h2>
      <nav>
        <div>
          <NavLink to='/' exact={true} activeClassName='active' className="nav-link">
            Home
          </NavLink>
        </div>
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
      </nav>
      {createButtonPopup && (
        <CreatePost trigger={createButtonPopup} setTrigger={setCreateButtonPopup} />
      )}
    </div>
  );
}

export default NavBar;
