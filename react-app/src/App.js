import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import HomePage from './components/HomePage';
import ListsPage from './components/ListsPage';
import PostPage from './components/PostPage';
import PotionsPage from './components/PotionsPage';
import PokemonPage from './components/PokemonPage';
import PokeballsPage from './components/PokeballsPage';
import ClothingPage from './components/ClothingPage';
import TMPage from './components/TMPage';
import BerriesPage from './components/BerriesPage';
import ListPostPage from './components/ListPostPage';
import { authenticate } from './store/session';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
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
          <HomePage />
        </Route>
        <Route path='/potions' exact={true}>
          <PotionsPage />
        </Route>
        <Route path='/pokémon' exact={true}>
          <PokemonPage />
        </Route>
        <Route path='/clothing' exact={true}>
          <ClothingPage />
        </Route>
        <Route path='/tm' exact={true}>
          <TMPage />
        </Route>
        <Route path='/pokéballs' exact={true}>
          <PokeballsPage />
        </Route>
        <Route path='/berries' exact={true}>
          <BerriesPage />
        </Route>
        <Route path='/posts/:id' exact={true}>
          <PostPage />
        </Route>
        <ProtectedRoute path='/lists/:id' exact={true} >
          <ListPostPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/lists' exact={true} >
          <ListsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
      </Switch>
      <div className="about-links">
          <a href="https://github.com/dnlflores"><FontAwesomeIcon icon={faGithub} size="2x" spin /></a>
          <a href="https://www.linkedin.com/in/daniel-flores-764a0b21b/"><FontAwesomeIcon icon={faLinkedin} size="2x" spin /></a>
      </div>
    </BrowserRouter>
  );
}

export default App;
