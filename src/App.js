import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

import Discover from './components/main/Discover';
import Movies from './components/main/Movies';
import Tvshows from './components/main/Tvshows';
import People from './components/main/People';
import MainPage from './components/main/MainPage';
import LoginPage from './components/main/LoginPage';
import SignupPage from './components/main/SignupPage';




import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

render() {
  return (
    <Router>
      <div className="App">
        <Header />
          <Switch>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route exact path="/movies/:sort/:page" component={Movies}></Route>
            <Route exact path="/tvshows/:sort" component={Tvshows}></Route>
            <Route exact path="/people/:page" component={People}></Route>
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

export default App;
