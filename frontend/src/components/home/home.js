//Importing React Lib
import React from "react";

//Importing components from Bootstrap Lib
import {Row, Col} from 'react-bootstrap';

//Importing POST template
// import  from "./collapsible";
//Importing POST template
import Post from "../post/post";
import UserProfile from "../user_profile/user_profile";
import MakePost from "../post/makePost";

const Home = ( posts ) => (
    <div className="container">
        <Row>
            <Col md={3}>
                <UserProfile/>
            </Col>
            <Col md={9}>
                { (localStorage.getItem('token') && localStorage.getItem('first_name') != 'undefined') ? <MakePost/> : '' }
                <Post/>
            </Col>
        </Row>
    </div>
);

export default Home;