//Importing React Lib
import React, {Component} from "react";
import {NavLink} from "react-router-dom";

//Importing components from Bootstrap Lib
import {Row, Col, Modal, OverlayTrigger, Button} from 'react-bootstrap';

const API_WALL = 'http://localhost:8000/wall/';

class Post extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            showModal: false,
            intervalId: ''
        };
    }

    modalInteration(e) {
        this.setState({showModal: !(this.state.showModal)});
        if (e !== undefined) {
            e.preventDefault();
            var element = e.target;

            setTimeout(function () {
                if (document.getElementsByClassName('modal').length > 0) {
                    document.getElementById('modalProfileTitle').firstChild.innerText = element.dataset.name;
                    document.getElementById('personName').innerText = element.dataset.name;
                    document.getElementById('personUsername').innerText = element.dataset.username;
                    document.getElementById('personEmail').innerText = element.dataset.email;
                    document.getElementById('personIcon').innerText = (element.dataset.name).slice(0, 1);
                }
            }, 500, element);
        }
    }

    getPosts(component) {
        fetch(API_WALL, {mode: 'cors'})
            .then(results => {
                return results.json();
            }).then(data => {
            if (data.length > 0) {
                let postsC = data.map((post) => {
                    let options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    };
                    const date = new Date(post.post_date);
                    let formattedDate = date.toLocaleDateString("en-US", options);

                    let content = '';
                    if (post.content.length < 128) {
                        return (
                            <Col md={12} xs={12} className="wall-post mb-10">
                                <div className="card">
                                    <Col md={12} xs={12}>
                                        <p className="post-initial">
                                            <span>{(post.user.first_name).slice(0, 1)}</span></p>
                                        <a data-name={post.user.first_name + ' ' + post.user.last_name}
                                           data-username={post.user.username} data-email={post.user.email}
                                           href='javascript: void(0)' onClick={e => component.modalInteration(e)}
                                           className="pl-10 pos-a fw-6">{post.user.first_name + ' ' + post.user.last_name}</a>
                                        <span className="post-date">{formattedDate}</span>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <h3>{post.content}</h3>
                                    </Col>
                                </div>
                            </Col>
                        );
                    } else {
                        return (
                            <Col md={12} xs={12} className="wall-post mb-10">
                                <div className="card">
                                    <Col md={12} xs={12}>
                                        <p className="post-initial">
                                            <span>{(post.user.first_name).slice(0, 1)}</span></p>
                                        <a data-name={post.user.first_name + ' ' + post.user.last_name}
                                           data-username={post.user.username} data-email={post.user.email}
                                           href='javascript: void(0)' onClick={e => component.modalInteration(e)}
                                           className="pl-10 pos-a fw-6">{post.user.first_name + ' ' + post.user.last_name}</a>
                                        <span className="post-date">{formattedDate}</span>
                                    </Col>
                                    <Col md={12} xs={12}>
                                        <h4>{post.content}</h4>
                                    </Col>
                                </div>
                            </Col>
                        );
                    }
                });

                component.setState({posts: postsC});
            } else {
                let postsC = [
                    (
                        <Col md={12} xs={12} className="wall-post mb-10">
                            <h4 className='text-center'>Oops, there aren't posts yet! Try log in and do the the first!</h4>
                        </Col>
                    )
                ];

                component.setState({posts: postsC});
            }
        })
    }

    componentDidMount() {
        this.getPosts(this);
        let component = this;
        this.setState({intervalId: setInterval(this.getPosts, 2000, component)});
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    render() {
        return (
            <Row className="mb-10 pr-30">
                <Modal show={this.state.showModal} onHide={e => this.modalInteration(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title id="modalProfileTitle"><span></span>'s profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="profile-img-text"><span id="personIcon"></span></p>
                        <p><b>Full name: </b><span id="personName"></span></p>
                        <p><b>Username: </b><span id="personUsername"></span></p>
                        <p><b>Email: </b><span id="personEmail"></span></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={e => this.modalInteration(e)}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {this.state.posts}
            </Row>
        )
    }
}

export default Post;