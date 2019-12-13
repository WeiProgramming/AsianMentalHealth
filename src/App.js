import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LandingPage from './Components/Landing/Landing';
import Navigation from './Components/Navigation/Navigation';
import SignUp from './Components/SignUp/SignUp';
import * as ROUTES from './Constants/routes';

function App() {
  return (
      <Router>
            <Navigation/>
          <div>
            <Switch>
                <Route exact path={ROUTES.HOME} component={LandingPage}/>
                <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
            </Switch>
          </div>
      </Router>
  );
}

export default App;
