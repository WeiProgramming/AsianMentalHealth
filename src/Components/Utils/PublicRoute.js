import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';


const PublicRoute = ({component: Component, isSignedIn: isSignedIn, ...rest}) => {
    return <Route {...rest} render={(props) => (
            !isSignedIn
                ? <Component {...props}/>
                : <Redirect to={`${ROUTES.SHARED}/happiness`}/>
        )}/>
}

export default PublicRoute;