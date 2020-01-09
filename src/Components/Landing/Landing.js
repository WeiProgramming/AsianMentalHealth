import React, {Component} from 'react';
import './Landing.css';
import {Link} from 'react-router-dom';
import {Button, Card, Typography, CardContent, Grid, Paper, Container} from '@material-ui/core';
import * as ROUTES from '../../Constants/routes';
import {connect} from 'react-redux';
import {updateNumberOfUsers, updateLatestHappinessPosts, updateLatestTroublesPosts} from "../../Redux/Public/actions";
import {Utils} from "../Utils/Utils";

class LandingPage extends Component {
    componentDidMount() {
        this.listener = this.props.fireBase.users().on('value',users => {
            if(!users) {
                return;
            }
            const usersObject = users.val();
            if(!usersObject) {
                return;
            }
            const usersList = Object.keys(usersObject).map(key => {
                return {
                    ...usersObject[key],
                    uid: key
                }
            });
            this.props.dispatch(updateNumberOfUsers(usersList));
        });
        this.props.fireBase.posts('happiness').limitToLast(3).on('value', posts => {
            const postsObject = posts.val();
            if(!postsObject) {
                return;
            }
            const postsList = Object.keys(postsObject).map( key => {
                return {
                    ...postsObject[key],
                    happinessPostKey: key
                }
            });
            this.props.dispatch(updateLatestHappinessPosts(postsList));
        });
        this.props.fireBase.posts('troubles').limitToLast(3).on('value', posts => {
            const postsObject = posts.val();
            if(!postsObject) {
                return;
            }
            const postsList = Object.keys(postsObject).map( key => {
                return {
                    ...postsObject[key],
                    troublesPostKey: key
                }
            });
            this.props.dispatch(updateLatestTroublesPosts(postsList));
        });
    }
    componentWillUnmount() {
        this.listener();
    }
    handleOnClick = () => {
        this.props.history.push(ROUTES.SIGN_IN);
    }
    render() {
        const {numUsers, happinessPosts, troublesPosts} = this.props;
        return (
            <div>
                {/*Landing Section*/}
                <div className="landing">
                    <div className="landing-description">
                        <h1>Mental Health</h1>
                        <Button onClick={this.handleOnClick} variant="contained" color="primary">Sign In Smile and Thrive</Button>
                        <small>Click <Link to={ROUTES.SIGN_UP}>here</Link> to register</small>
                        <h4>There is currently {numUsers} users signed up!</h4>
                    </div>
                    <Card className="quote-card">
                        <CardContent>
                            <h2>There's no reason to be alone</h2>
                            <p>There's beauty in the air with each and everyone of us,
                                share your pain or happiness, take my hand let's experience this
                                together
                            </p>
                            <small>You're not alone, we all struggle but let's get through this together</small>
                        </CardContent>
                    </Card>
                </div>
                {/*About us*/}
                <div className="details-section">
                    <Container fixed>
                        <Grid container spacing={2}>
                            <Grid item sm={6}>Test</Grid>
                            <Grid item sm={6}>
                                <Card>
                                    <CardContent>
                                        <img className="img-fluid" src={require('../../assets/public/images/dogs.jpeg')}/>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={6}>
                                <Card>
                                    <CardContent>
                                        <img className="img-fluid" src={require('../../assets/public/images/man-stressed.jpeg')}/>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item sm={6}>Test</Grid>
                        </Grid>
                    </Container>
                </div>
                {/* Latest Posts*/}
                <div className="latest-posts">
                    <Container fixed>
                        <div className="text-center">
                            <h2>Latest Posts</h2>
                            <small>Posted by members of this site</small>
                        </div>
                        <div className="latest-post-container">
                            <h5>Happiness</h5>
                            <Grid container spacing={3}>
                                {happinessPosts ? happinessPosts.map( post => {
                                    return (
                                        <Grid item sm={4} key={post.happinessPostKey}>
                                            <Card>
                                                <CardContent>
                                                    <h3>{post.subject}</h3>
                                                    <p>{Utils.truncate(post.message)}</p>
                                                    <small>Posted by: {post.username}</small>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                }) : <p>loading...</p>}
                            </Grid>
                        </div>
                        <div className="latest-post-container">
                            <h5>Troubles</h5>
                            <Grid container spacing={3}>
                                {troublesPosts ? troublesPosts.map( post => {
                                    return (
                                        <Grid item sm={4} key={post.troublesPostKey}>
                                            <Card>
                                                <CardContent>
                                                    <h3>{post.subject}</h3>
                                                    <p>{Utils.truncate(post.message)}</p>
                                                    <small>Posted by: {post.username}</small>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                }) : <p>Loading...</p>}
                            </Grid>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        numUsers: state.public.numUsers,
        happinessPosts: state.public.happinessPosts,
        troublesPosts: state.public.troublesPosts,
        fireBase: state.fireBase.fireBase
    }
}

export default connect(mapStateToProps)(LandingPage);