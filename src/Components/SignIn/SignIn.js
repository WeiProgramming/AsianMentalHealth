import React, {Component} from 'react';
import {Card, CardActions, CardContent, Typography, TextField, Button} from '@material-ui/core';
import './SignIn.css';

const INITIAL_STATE = {
    email: '',
    password: ''
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }
    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    render() {
        const {email, password} = this.state;
        let isInvalid = email === '' || password === '';
        console.log(isInvalid);
        return (
            <div className="signin-container">
                <Card style={{padding: '3%', width: '40%'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Sign In
                        </Typography>
                        <hr/>
                        <form>
                            <Typography style={{marginBottom: '2%'}}>
                                <TextField onChange={this.onChange} label="email" name="email" variant="outlined" className="text-input"/>
                            </Typography>
                            <Typography style={{marginBottom: '2%'}}>
                                <TextField onChange={this.onChange} label="password" name="password" variant="outlined" className="text-input"/>
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

export default SignIn;