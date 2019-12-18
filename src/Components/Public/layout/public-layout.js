import React, {Component} from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import * as ROUTES from "../../../Constants/routes";
import SignIn from "../../SignIn/SignIn";
import SignUp from "../../SignUp/SignUp";
import LandingPage from "../../Landing/Landing";

class PublicLayout extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path={ROUTES.HOME} component={LandingPage}/>
                    <Route exact path={ROUTES.SIGN_UP} component={SignUp}/>
                    <Route exact path={ROUTES.SIGN_IN} component={SignIn}/>
                </Switch>
            </div>
        )
    }
}

export default PublicLayout;