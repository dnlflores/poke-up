import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './components/HomePage';
import ListsPage from './components/ListsPage';
import PostPage from './components/PostPage';
import ListPostPage from './components/ListPostPage';
import PageNotFound from './components/PageNotFound';
import ProfilePage from './components/ProfilePage';
import { authenticate } from './store/session';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from 'react-redux';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector(state => Object.values(state.posts));
  const potionPosts = posts?.filter(post => +post.category_id === 1);
  const pokemonPosts = posts?.filter(post => +post.category_id === 2);
  const clothingPosts = posts?.filter(post => +post.category_id === 3);
  const tmPosts = posts?.filter(post => +post.category_id === 4);
  const pokeballPosts = posts?.filter(post => +post.category_id === 5);
  const berryPosts = posts?.filter(post => +post.category_id === 6);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true}>
          <HomePage posts={posts}/>
        </Route>
        <Route path='/potions' exact={true}>
          <HomePage posts={potionPosts}/>
        </Route>
        <Route path='/pokémon' exact={true}>
          <HomePage posts={pokemonPosts}/>
        </Route>
        <Route path='/clothing' exact={true}>
          <HomePage posts={clothingPosts}/>
        </Route>
        <Route path='/tm' exact={true}>
          <HomePage posts={tmPosts} />
        </Route>
        <Route path='/pokéballs' exact={true}>
          <HomePage posts={pokeballPosts}/>
        </Route>
        <Route path='/berries' exact={true}>
          <HomePage posts={berryPosts}/>
        </Route>
        <Route path='/posts/:id' exact={true}>
          <PostPage />
        </Route>
        <Route path='/users/:userId' exact={true}>
          <ProfilePage />
        </Route>
        <ProtectedRoute path='/lists/:id' exact={true} >
          <ListPostPage />
        </ProtectedRoute>
        <ProtectedRoute path='/lists' exact={true} >
          <ListsPage />
        </ProtectedRoute>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <div className="about-links" id="about-links">
        <a href="https://github.com/dnlflores" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} size="2x" spin /></a>
        <a href="https://www.linkedin.com/in/daniel-flores-764a0b21b/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} size="2x" spin /></a>
      </div>
    </BrowserRouter>
  );
}

export default App;
