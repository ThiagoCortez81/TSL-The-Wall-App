//Importing React Lib
import React, {Component} from "react";
import PropTypes from 'prop-types';

//Importing components from Bootstrap Lib
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import App from "../../App";

//Importing DOM router
import {Redirect} from 'react-router-dom'

const API_WALL = 'http://localhost:8000/wall/';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            first_name: '',
            last_name: '',
            email: '',
            redirect: false
        };
    }

    handle_login = (e, data) => {
        e.preventDefault();

        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => {
                if (json.username !== undefined)
                    alert('The username field may not be blank');
                else if (json.password !== undefined)
                    alert('The password field may not be blank');
                else if (json.non_field_errors)
                    alert(json.non_field_errors);
                else {
                    this.setState({
                        logged_in: true,
                        username: json.user.username,
                        redirect: true
                    });
                    localStorage.setItem('token', json.token);
                    localStorage.setItem('first_name', json.user.first_name);
                    localStorage.setItem('last_name', json.user.last_name);

                    this.props.history.push('/');
                }
            });
    };

    handle_change = e => {
        const name = e.target.id;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = {...prevstate};
            newState[name] = value;
            return newState;
        });
    };

    handle_signup = (e, data) => {
        e.preventDefault();

        if (data.first_name !== '') {
            if (data.last_name !== '') {
                if (data.email !== '') {
                    if (data.username !== '') {
                        if (data.password !== '') {
                            if (data.password === data.confirm_password) {
                                fetch('http://localhost:8000/core/users/', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(data)
                                })
                                    .then(res => res.json())
                                    .then(json => {
                                        if (json.username !== data.username) {
                                            alert(json.username);
                                        } else {
                                            for (var i = 0; i < document.getElementsByTagName('input').length; i++){
                                                document.getElementsByTagName('input')[i].value = ''
                                            }

                                            alert('You are successfully signed up, thank you!')
                                        }
                                    });
                            } else {
                                alert('The passwords does not are equals.');
                            }
                        } else {
                            alert('You need to set a password to your account.');
                        }
                    } else {
                        alert('You need to set a username to your account.');
                    }
                } else {
                    alert('You need to set a email to your account.');
                }
            } else {
                alert('You need to set a last name to your account.');
            }
        } else {
            alert('You need to set a first name to your account.');
        }

    };

    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={4} mdOffset={4}>
                        <form className="loginForm" onSubmit={event => this.handle_login(event, this.state)}>
                            <h2 className="text-center">Please, log in</h2>
                            <div className="form-group">
                                <FormControl id="username" placeholder="Username" onChange={this.handle_change}/>
                            </div>
                            <div className="form-group">
                                <FormControl type="password" id="password" placeholder="Password"
                                             onChange={this.handle_change}/>
                            </div>
                            <div className="form-group text-center">
                                <Button type="submit" bsStyle="success">Log in</Button>
                            </div>
                        </form>
                    </Col>
                    <Col md={6} mdOffset={3}>
                        <hr className="bg-primary mt-0 mb-0"/>
                        <h5 className="text-center mb-0">or</h5>
                    </Col>
                    <Col md={4} mdOffset={4}>
                        <form className="authForm" onSubmit={event => this.handle_signup(event, this.state)}>
                            <h2 className="text-center">Register</h2>
                            <div className="form-group">
                                <FormControl id="first_name" placeholder="First Name" onChange={this.handle_change}/>
                            </div>
                            <div className="form-group">
                                <FormControl id="last_name" placeholder="Last Name" onChange={this.handle_change}/>
                            </div>
                            <div className="form-group">
                                <FormControl type="email" id="email" placeholder="Email" onChange={this.handle_change}/>
                            </div>
                            <div className="form-group">
                                <FormControl id="username" placeholder="Username" onChange={this.handle_change}/>
                            </div>
                            <Col md={6} className="form-group pl-0">
                                <FormControl type="password" id="password" placeholder="Password"
                                             onChange={this.handle_change}/>
                            </Col>
                            <Col md={6} className="form-group pr-0">
                                <FormControl type="password" id="confirm_password" placeholder="Confirm password"
                                             onChange={this.handle_change}/>
                            </Col>
                            <div className="form-group text-center">
                                <Button type="submit" bsStyle="success">Register</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Auth;