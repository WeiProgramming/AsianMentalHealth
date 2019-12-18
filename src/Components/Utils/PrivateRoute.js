import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';

/* Params Components, Props and the signedIn condition from redux */

const PrivateRoute = ({component: Component, isSignedIn: isSignedIn, ...rest}) => {
    return <Route {...rest} render={(props) => (
        isSignedIn
            ? <Component {...props}/>
            : <Redirect to={ROUTES.SIGN_IN} />
    )} />
}

export default PrivateRoute;