import React, {useEffect, Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Navigation from './Components/Navigation/Navigation';
import * as ROUTES from './Constants/routes';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './Redux/root-reducer';
import ShareLayout from "./Components/Share/layout/share-layout";
import PublicLayout from './Components/Public/layout/public-layout';
import {connect} from 'react-redux';
import {checkAuthState} from "./Redux/Firebase/actions";
import PrivateRoute from "./Components/Utils/PrivateRoute";
import PublicRoute from "./Components/Utils/PublicRoute";

const store = createStore(rootReducer);

class BaseApp extends Component {
    componentDidMount() {
        this.authFirebaseListener = this.props.fireBase.auth.onAuthStateChanged(authUser => {
            console.log('oasc', authUser);
            this.props.dispatch(checkAuthState(authUser));
            authUser ? console.log('signed in', authUser) : console.log('user not signed in');
        })
    }
    componentWillUnmount() {
        this.authFirebaseListener && this.authFirebaseListener();
    }
    render() {
        const {isSignedIn} = this.props;
        return (
            <Router>
                <div>
                    <Navigation/>
                    <Switch>
                        <PrivateRoute isSignedIn={isSignedIn} path={ROUTES.SHARED} component={ShareLayout} />
                        <PublicRoute isSignedIn={isSignedIn} component={PublicLayout}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fireBase: state.fireBase.fireBase,
        authUser: state.fireBase.authUser,
        isSignedIn: state.fireBase.isSignedIn
    }
}

const ConnectApp = connect(mapStateToProps)(BaseApp)


function App() {

  return (
      <Provider store={store}>
        <ConnectApp/>
      </Provider>
  );
}

export default App;
