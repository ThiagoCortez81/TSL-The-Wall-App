//Importing React Lib
import React, {Component} from 'react'

//Importing components from Bootstrap Lib
import {Row, Col, FormControl, Button} from 'react-bootstrap'

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            email: '',
            redirect: false
        };
    }

    handle_save_data = (e, data) => {
        if (data.first_name !== '') {
            if (data.last_name !== '') {
                if (data.email !== '') {
                    if (data.username !== '') {
                        if (data.password !== '') {
                            if (data.password !== data.confirm_password) {
                                alert('The passwords doesn\'t match!');
                                return false;
                            }
                        }
                        e.preventDefault();

                        fetch('http://localhost:8000/core/current_user/', {
                            headers: {
                                Authorization: `JWT ${localStorage.getItem('token')}`
                            }
                        })
                            .then(res => res.json())
                            .then(json => {
                                var id_current_user = json.id;

                                var url = 'http://localhost:8000/users/' + id_current_user + '/';
                                if (data.password !== '') {
                                    url = 'http://localhost:8000/super/users/' + id_current_user + '/';
                                }

                                fetch(url, {
                                    headers: {
                                        'Authorization': `JWT ${localStorage.getItem('token')}`,
                                        'Content-Type': 'application/json'
                                    },
                                    method: 'PUT',
                                    body: JSON.stringify(data)
                                }).then(res => res.json())
                                    .then(json => {
                                        alert('Saved successfully!');
                                    });
                            });
                    } else {
                        alert('The field Username couldn\'t be empty!');
                    }
                } else {
                    alert('The field Email couldn\'t be empty!');
                }
            } else {
                alert('The field Last Name couldn\'t be empty!');
            }
        } else {
            alert('The field First Name couldn\'t be empty!');
        }
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

    componentDidMount() {
        fetch('http://localhost:8000/core/current_user/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(json => {
                if (!json.detail) {
                    document.getElementById('initial_img').innerHTML = (json.first_name).slice(0, 1);
                    document.getElementById('first_name').value = json.first_name;
                    document.getElementById('last_name').value = json.last_name;
                    document.getElementById('email').value = json.email;
                    document.getElementById('username').value = json.username;
                    this.setState({
                        username: json.username,
                        first_name: json.first_name,
                        last_name: json.last_name,
                        email: json.email
                    });
                } else {
                    alert("Oops, looks like you're not logged-in!");
                    this.props.history.push('/auth');
                }
            });
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={6} mdOffset={3} className="form-group text-center">
                        <p className="profile-img-text"><span id="initial_img"></span></p>
                    </Col>
                    <Col md={6} mdOffset={3} className="form-group">
                        <FormControl id="first_name" placeholder="First Name"
                                     onChange={this.handle_change}/>
                    </Col>
                    <Col md={6} mdOffset={3} className="form-group">
                        <FormControl id="last_name" placeholder="Last Name" onChange={this.handle_change}/>
                    </Col>
                    <Col md={6} mdOffset={3} className="form-group">
                        <FormControl type="email" id="email" placeholder="Email"
                                     onChange={this.handle_change}/>
                    </Col>
                    <Col md={6} mdOffset={3} className="form-group">
                        <FormControl id="username" placeholder="Username" onChange={this.handle_change}/>
                    </Col>
                    <Col md={3} mdOffset={3} className="form-group">
                        <FormControl type="password" id="password" placeholder="Password"
                                     onChange={this.handle_change}/>
                    </Col>
                    <Col md={3} className="form-group">
                        <FormControl type="password" id="confirm_password" placeholder="Confirm password"
                                     onChange={this.handle_change}/>
                    </Col>
                    <Col md={6} mdOffset={3} className="form-group text-center">
                        <Button type="submit" bsStyle="success" className="float-right"
                                onClick={e => this.handle_save_data(e, this.state)}>Save
                            Changes</Button>
                    </Col>
                </Row>
            </div>
        )
    }
    ;
}

export default Profile;