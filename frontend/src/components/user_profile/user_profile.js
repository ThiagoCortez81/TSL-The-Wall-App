//Importing React Lib
import React, {Component} from 'react'

//Importing components from Bootstrap Lib
import {Row, Col} from 'react-bootstrap'

//Importing user profile photo
import {NavLink} from "react-router-dom";

class UserProfile extends Component {
    handle_logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        this.setState({logged_in: false, username: ''});
    };

    render() {
        if (localStorage.getItem('token') && localStorage.getItem('first_name') != 'undefined') {
            return (
                <div className="card wall-post">
                    <Col md={12} className="p-0 bg-white">
                        <Col md={12} className="p-0 bg-white text-center">
                            <p className="profile-img-text"><span>{(localStorage.getItem('first_name')).slice(0,1)}</span></p>
                            <h4 className="fw-6">{localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name')}</h4>
                            <p><NavLink to="/profile" >My profile</NavLink></p>
                            <p><a href="#" onClick={this.handle_logout}>Log out</a></p>
                        </Col>
                    </Col>


                </div>
            );
        } else {
            return (
                <div className="card wall-post">
                    <Col md={12} className="p-0 bg-white">
                        <Col md={12} className="p-0 bg-white text-center">
                            <h4 className="fw-6">Please, log in</h4>
                            <p><NavLink to="/auth">Log in</NavLink></p>
                        </Col>
                    </Col>
                </div>
            );
        }
    };
}

export default UserProfile;