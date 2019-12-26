import React, {Component} from 'react';
import './Landing.css';
import {Button, Card, Typography, CardContent, Grid, Paper, Container} from '@material-ui/core';
import * as ROUTES from '../../Constants/routes';
import {connect} from 'react-redux';
import {updateNumberOfUsers, updateLatestPosts} from "../../Redux/Public/actions";

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
                    ...postsObject[key]
                }
            });
            this.props.dispatch(updateLatestPosts(postsList));
        });
    }
    componentWillUnmount() {
        this.listener();
    }
    handleOnClick = () => {
        this.props.history.push(ROUTES.SIGN_UP);
    }
    render() {
        const {numUsers, posts} = this.props;
        return (
            <div>
            <div className="landing">
                <div className="landing-description">
                    <h1>Asian Mental Health</h1>
                    <small>You're not alone, we all struggle but let's get through this together</small>
                <hr/>
                    <Button onClick={this.handleOnClick} variant="contained" color="primary">Join Us Smile and Thrive</Button>
                    <h4>There is currently {numUsers} users signed up!</h4>

                </div>
                <Card className="quote-card">
                    <CardContent>
                        <Typography color="textSecondary">
                            "Character cannot be developed in ease and quiet. Only through experience of trial and suffering can the soul be strengthened, ambition inspired, and success achieved." — Helen Keller
                        </Typography>
                    </CardContent>
                </Card>
            </div>
                <div className="latest-posts">
                    <Container fixed>
                    <h3>Latest Posts</h3>
                        <h5>Happiness</h5>
                        <Grid container spacing={3}>
                            {posts ? posts.map( post => {
                                return (
                                    <Grid item sm={4}>
                                        <Paper>
                                            <h3>{post.subject}</h3>
                                            <p>{post.message}</p>
                                        </Paper>
                                    </Grid>
                                )
                            }) : <p>loading...</p>}
                        </Grid>
                        <h5>Troubles</h5>
                        <Grid container spacing={3}>
                            <Grid item sm={4}>
                                <Paper>sm=4</Paper>
                            </Grid>
                            <Grid item sm={4}>
                                <Paper>sm=4</Paper>
                            </Grid>
                            <Grid item sm={4}>
                                <Paper>sm=4</Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        numUsers: state.public.numUsers,
        posts: state.public.posts,
        fireBase: state.fireBase.fireBase
    }
}

export default connect(mapStateToProps)(LandingPage);