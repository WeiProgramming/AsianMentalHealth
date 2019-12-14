import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import LandingPage from './Components/Landing/Landing';
import Navigation from './Components/Navigation/Navigation';
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import * as ROUTES from './Constants/routes';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Redux/root-reducer';
import Firebase from "./Constants/firebase";
import {firebaseConfig} from "./configuration";


function App() {
    const store = createStore(rootReducer);

  return (
      <Provider store={store}>
      <Router>
            <Navigation/>
          <div>
            <Switch>
                <Route exact path={ROUTES.HOME} component={LandingPage}/>
                <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
                <Route exact path={ROUTES.SIGN_IN} component={SignIn}/>
            </Switch>
          </div>
      </Router>
      </Provider>
  );
}

export default App;
