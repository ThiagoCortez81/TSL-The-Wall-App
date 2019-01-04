//Importing React Lib
import React from 'react'
//Importing components from Boostrap Lib
import {Navbar, NavItem, Nav, NavDropdown, MenuItem, Row} from 'react-bootstrap'
//Importing DOM router
import {NavLink} from 'react-router-dom'

const Header = () => (
        <Navbar className="bg-primary">
            <Navbar.Header>
                <Navbar.Brand>
                    <NavLink to="/">The Wall</NavLink>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav className="float-right">
                <li>
                    <NavLink to="/" className="">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/profile">My profile</NavLink>
                </li>
            </Nav>
        </Navbar>
);

export default Header;