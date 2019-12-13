import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, TextField, Button} from '@material-ui/core';

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

    render() {
        const {username, email, password, confirmPassword} = this.state;
        let isInvalid = username === '' || email === '' || (password && confirmPassword) === '' || (password !== confirmPassword);
        console.log(isInvalid);
        return (
            <div className="signup-container">
                <Card style={{padding: '3%', width: '40%'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Sign Up
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

                </Card>
            </div>
        )
    }
}

export default SignUp;