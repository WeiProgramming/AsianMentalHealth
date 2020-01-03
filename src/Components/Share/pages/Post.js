import React, {Component} from 'react';
import {connect} from 'react-redux';

const INITIAL_STATE = {
    message: {}
}

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }
    componentDidMount() {
        const {postId} = this.props.match.params;
        this.props.fireBase.post(postId, 'happiness')
            .once('value')
            .then( snapshot => {
                this.setState({message: snapshot.val()});
            });
    }

    render() {
        const {message} = this.state;
        return (
            <div>
            <h1>
                {message.subject}
            </h1>
                <p>{message.message}</p>
                <small>by: {message.username}</small>
            </div>
        )
    }
};

const matchStateToProps = (state) => {
    return {
        fireBase: state.fireBase.fireBase
    }
}

export default connect(matchStateToProps)(Post);