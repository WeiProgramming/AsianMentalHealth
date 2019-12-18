import React, {Component} from 'react';
import {Card, CardContent, Typography, TextField, Button} from '@material-ui/core';
import './SignIn.css';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
import {connect} from 'react-redux';


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
    }

    onClick = () => {
        this.props.fireBase.doSignInWithEmailAndPassword(this.state.email, this.state.password).then(authUser => {
            this.props.history.push(`${ROUTES.SHARED}/happiness`);
        }).catch(error => {
            this.setState({...INITIAL_STATE});
        })
    }

    render() {
        const {email, password} = this.state;
        let isInvalid = email === '' || password === '';
        console.log('invalid form', isInvalid);
        return (
            <div className="signin-container">
                <Card style={{padding: '3%', width: '40%'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Sign In
                        </Typography>
                        <hr/>
                        <form>
                            <Typography component={'div'} variant={'body2'} style={{marginBottom: '2%'}}>
                                <TextField onChange={this.onChange} label="email" name="email" variant="outlined" className="text-input"/>
                            </Typography>
                            <Typography component={'div'} variant={'body2'} style={{marginBottom: '2%'}}>
                                <TextField onChange={this.onChange} label="password" name="password" variant="outlined" className="text-input"/>
                            </Typography>

                            <Button variant="outlined" color="primary" disabled={isInvalid} onClick={this.onClick}>
                                Sign In
                            </Button>
                        </form>
                        <hr/>
                        <small>No account? Sign up <Link to={ROUTES.SIGN_UP}>here</Link></small>
                    </CardContent>

                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fireBase: state.fireBase.fireBase
    }
}

export default connect(mapStateToProps)(SignIn);