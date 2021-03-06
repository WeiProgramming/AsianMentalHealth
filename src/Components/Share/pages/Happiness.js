import React, {Component} from 'react';
import {TextField, Button, Card, CardContent, CardActions, Container, Grid, Paper} from '@material-ui/core';
import {connect} from 'react-redux';
import {updateLatestHappinessPosts} from "../../../Redux/Public/actions";
import * as ROUTES from '../../../Constants/routes';
import {Link} from 'react-router-dom';
import {Utils} from "../../Utils/Utils";


const INITIAL_FORM = {
    subject: '',
    message: '',
    username: ''
}

class Happiness extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_FORM, notFound: false};
    }
    componentDidMount() {
        console.log('authuser', this.props.authUser);
        this.props.fireBase.user(this.props.authUser.uid).once('value').then( snapshot => {
            this.setState({username: snapshot.val().username});
        });
        this.props.fireBase.posts('happiness').on('value', posts => {
            const postsObject = posts ? posts.val() : null;
            if(!postsObject) {
                this.setState({notFound: true});
                return;
            }
            const postsList = Object.keys(postsObject).map( key => {
                return {
                    ...postsObject[key],
                    key: key
                }
            });
            this.props.dispatch(updateLatestHappinessPosts(postsList));
        });
    }
    onPress = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }
    onClick = (event) => {
        this.props.fireBase.posts('happiness').push(
            {
                subject: this.state.subject,
                message: this.state.message,
                username: this.state.username,
                uid: this.props.authUser.uid
            }
        );
        event.preventDefault();
    }
    navigateToPost = (key) => {
        this.props.history.push(`${ROUTES.SHARED}/happiness/${key}`);
    }
    render() {
        const {happinessPosts} = this.props;
        const {notFound} = this.state;
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Container>
                            <h3>Happy Board</h3>
                            <Paper style={{height: '80vh', padding: '2%'}}>
                                <Grid container spacing={4}>
                                    {
                                        (happinessPosts && !notFound) ? happinessPosts.map(post => {
                                                return (
                                                    <Grid item xs={3} key={post.key}>
                                                        <Card>
                                                            <CardContent>
                                                                <h3>{post.subject}</h3>
                                                                <p>{Utils.truncate(post.message)}</p>
                                                                <p>By: {post.username}</p>
                                                            </CardContent>
                                                            <CardActions>
                                                                <Button variant="outlined" color="primary">
                                                                    <Link to={`${ROUTES.SHARED}/happiness/posts/${post.key}`} style={{textDecoration: 'none'}}>
                                                                        Read More
                                                                    </Link>
                                                                </Button>
                                                            </CardActions>
                                                        </Card>
                                                    </Grid>
                                                )
                                            })
                                            : <p>No Posts</p>
                                    }
                                </Grid>
                            </Paper>
                        </Container>
                    </Grid>
                    <Grid item xs={3}>
                        <h3>What makes you happy</h3>
                        <small>Do anything special today?</small>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField onChange={this.onPress} style={{width: "100%"}} id="subject" label="Subject" variant="outlined"/>
                            </div>
                            <div>
                                <TextField  onChange={this.onPress} style={{width: "100%"}} id="message" label="Message" multiline rows="4" variant="outlined"/>
                            </div>
                            <Button onClick={this.onClick} variant="outlined" color="primary">Post</Button>
                        </form>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return {
        fireBase: state.fireBase.fireBase,
        authUser: state.fireBase.authUser,
        happinessPosts: state.public.happinessPosts
    }
}
export default connect(mapStateToProps)(Happiness);