//Importing React Lib
import React, {Component} from "react";

//Importing components from Bootstrap Lib
import {Row, Col, FormControl, Button} from 'react-bootstrap';
import App from "../../App";

const API_WALL = 'http://localhost:8000/wall/';

class MakePost extends Component {
    postToWall = () => {
        fetch('http://localhost:8000/core/current_user/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(json => {
                const user_id = json.id;
                if (user_id !== '') {
                    const postEl = document.getElementById('newPostContent');
                    const post = postEl.value;

                    if (post !== '') {
                        const data = {
                            content: post,
                            post_date: new Date(),
                            user: user_id
                        };

                        fetch('http://localhost:8000/wall/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                            .then(res => res.json())
                            .then(json => {
                                postEl.value = '';
                            });
                    } else {
                        alert('Please, provide some text to share!');
                    }
                } else {
                    alert('Please, log in to continue!');
                }
            });
    }

    render() {
        return (
            <Row className="mb-10 pr-30">
                <Col md={12} xs={12} className="wall-post">
                    <div className="card">
                        <Col md={12} xs={12}>
                            Make a post
                            <FormControl id="newPostContent" componentClass="textarea"
                                         placeholder={'What you want to share, ' + localStorage.getItem('first_name') + '?'}
                                         className="mb-10"/>
                            <Button bsStyle="success" className="fw-6 float-right" onClick={e => this.postToWall()}>Post to
                                wall</Button>
                        </Col>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default MakePost;