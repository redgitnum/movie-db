import React from 'react';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';

import Discover from './components/main/Discover';
import Movies from './components/main/Movies';
import Tvshows from './components/main/Tvshows';
import People from './components/main/People';
import MainPage from './components/main/MainPage';
import LoginPage from './components/main/LoginPage';
import SignupPage from './components/main/SignupPage';
import SearchResults from './components/main/SearchResults';

import MovieDetails from './components/main/Details/MovieDetails';
import TvDetails from './components/main/Details/TvDetails';
import PeopleDetails from './components/main/Details/PeopleDetails';
import AccountPage from './components/main/AccountPage';

import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const mapStateToProps = state => state;


class App extends React.Component {
render() {
    return (
    <Router>
      <div className="App">
        <Header />
          <Switch>
            <Route exact path="/discover/:type/:page" component={Discover}></Route>
            <Route exact path="/movies/:sort/:page" component={Movies}></Route>
            <Route exact path="/tvshows/:sort/:page" component={Tvshows}></Route>
            <Route exact path="/people/:page" component={People}></Route>
            <Route exact path="/search/:query" component={SearchResults}></Route>
            <Route exact path="/details/movie/:id" component={MovieDetails}></Route>
            <Route exact path="/details/tv/:id" component={TvDetails}></Route>
            <Route exact path="/details/person/:id" component={PeopleDetails}></Route>
            <Route exact path="/account" component={AccountPage}></Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/">
              <MainPage />
            </Route>
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}
  
}

export default connect(mapStateToProps)(App);