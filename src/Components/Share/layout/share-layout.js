import React, {Component} from 'react';
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom";
import './public-layout.css';
import {Happiness, Troubles, Post} from "../pages/index";
import Profile from "../../Profile/Profile";
import * as ROUTES from "../../../Constants/routes";

class ShareLayout extends Component  {
    render() {
        return (
            <div style={{paddingTop: '60px', paddingLeft:'2%', paddingRight:'2%', paddingBottom: '2%'}}>
                    <Switch>
                        <Route exact component={Happiness} path={`${this.props.match.path}/happiness`}/>
                        <Route exact component={Troubles} path={`${this.props.match.path}/troubles`}/>
                        <Route exact path={`${this.props.match.path}${ROUTES.PROFILE}`} component={Profile} />
                        <Route exact path={`${this.props.match.path}/:postType/posts/:postId`} component={Post} />
                        <Route exact path={`${this.props.match.path}/:postType/posts/:postId`} component={Post} />
                    </Switch>
            </div>
        )
    }
}

export default ShareLayout;