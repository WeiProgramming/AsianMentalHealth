import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, TextField, Button} from '@material-ui/core';
import {connect} from 'react-redux';
import {updateNumber} from "../../Redux/Test/actions";

import './SignUp.css';

const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }
    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    onClick = (event) => {
        this.props.dispatch(updateNumber());
    }

    render() {
        const {username, email, password, confirmPassword} = this.state;
        const {number} = this.props;
        let isInvalid = username === '' || email === '' || (password && confirmPassword) === '' || (password !== confirmPassword);
        console.log(isInvalid);
        return (
            <div className="signup-container">
                <Card style={{padding: '3%', width: '40%'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Sign Up <p>{number}</p>
                        </Typography>
                        <hr/>
                        <form>
                        <Typography style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} name="username" label="username" variant="outlined" className="text-input"/>
                        </Typography>
                        <Typography style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} label="email" name="email" variant="outlined" className="text-input"/>
                        </Typography>
                        <Typography style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} label="password" name="password" variant="outlined" className="text-input"/>
                        </Typography>
                        <Typography style={{marginBottom: '2%'}}>
                            <TextField onChange={this.onChange} label="confirm password" name="confirmPassword" variant="outlined" className="text-input"/>
                        </Typography>

                            <Button variant="outlined" color="primary" disabled={isInvalid}>
                                Sign up
                            </Button>
                        </form>
                    </CardContent>
                    <Button variant="outlined" color="primary" onClick={this.onClick}>
                        Test
                    </Button>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        number: state.number.number
    }
}

export default connect(mapStateToProps)(SignUp);