import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image,
  Button
} from 'react-bootstrap'
import './NavBar.css'

const barRightItems = function(props) {
  if(props.user) {
    return (
      <NavItem>
        <Image src="https://react-bootstrap.github.io/thumbnail.png" circle />
        {props.user.username}
      </NavItem>
    )
  } else {
    return (
      <Navbar.Text>
        Please <Navbar.Link className="Login" href="/login"> login</Navbar.Link> or <Navbar.Link className="Register" href="/register"> Register </Navbar.Link>
      </Navbar.Text>
    )
  }
}

export default function(props) {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#brand">FindA</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={1} title="Wants" id="basic-nav-dropdown">
            <MenuItem eventKey={1.1}>Me</MenuItem>
            <MenuItem divider />
            <MenuItem disabled> You have no groups </MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={2} title="Offers" id="basic-nav-dropdown">
            <MenuItem eventKey={2.1}>Me</MenuItem>
            <MenuItem divider />
            <MenuItem disabled> You have no groups </MenuItem>
          </NavDropdown>
          <NavItem eventKey={3}> Categories</NavItem>
        </Nav>

        <Nav pullRight>
          {barRightItems(props)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
