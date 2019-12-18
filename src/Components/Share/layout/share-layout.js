import React, {Component} from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import {Happiness, Troubles} from "../pages/index";
import Profile from "../../Profile/Profile";
import * as ROUTES from "../../../Constants/routes";

class ShareLayout extends Component  {
    render() {
        return (
            <div style={{paddingTop: '60px', paddingLeft:'2%', paddingRight:'2%'}}>
                    <Switch>
                        <Route component={Happiness} path={`${this.props.match.path}/happiness`}/>
                        <Route component={Troubles} path={`${this.props.match.path}/troubles`}/>
                        <Route path={`${this.props.match.path}${ROUTES.PROFILE}`} component={Profile} />
                    </Switch>
            </div>
        )
    }
}

export default ShareLayout;