import React, {Component} from 'react';
import {TextField, Button, Card, CardContent, Container, Grid} from '@material-ui/core';
import {connect} from 'react-redux';
import {updateLatestPosts} from "../../../Redux/Public/actions";

const INITIAL_FORM = {
    subject: '',
    message: '',
}

class Happiness extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_FORM};
    }
    componentDidMount() {
        console.log('authuser', this.props.authUser);
        this.props.fireBase.posts('happiness').on('value', posts => {
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
    onPress = (event) => {
        this.setState({[event.target.id]: event.target.value});
    }
    onClick = (event) => {
        this.props.fireBase.posts('happiness').push(
            {
                subject: this.state.subject,
                message: this.state.message,
                uid: this.props.authUser.uid
            }
        );
        event.preventDefault();
    }
    render() {
        const {posts} = this.props;
        return (
            <div>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField onChange={this.onPress} style={{width: "100%"}} id="subject" label="Subject" variant="outlined"/>
                    </div>
                    <div>
                        <TextField  onChange={this.onPress} style={{width: "100%"}} id="message" label="Message" multiline rows="4" variant="outlined"/>
                    </div>
                    <button onClick={this.onClick}>Test</button>
                </form>
                <Container>
                    <Grid container spacing={4}>
                        {
                            posts ? posts.map(post => {
                                return (
                                    <Grid item xs={3}>
                                        <Card>
                                            <CardContent>
                                                <h3>{post.subject}</h3>
                                                <p>{post.message}</p>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                )
                            })
                            : (<p>Loading...</p>)
                        }
                    </Grid>
                </Container>
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    return {
        fireBase: state.fireBase.fireBase,
        authUser: state.fireBase.authUser,
        posts: state.public.posts
    }
}
export default connect(mapStateToProps)(Happiness);