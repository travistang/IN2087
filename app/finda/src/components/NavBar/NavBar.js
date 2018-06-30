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
import {Redirect} from 'react-router'
import Auth from '../../providers/auth'
import './NavBar.css'


export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
  }
  barRightItems() {
    if(Auth.getInstance().isLoggedIn()) {
      return (this.props.user?(
          <NavItem>
            <Image className="Thumbnail" src="https://react-bootstrap.github.io/thumbnail.png" circle />
            <Link to="/me">{this.props.user.username}</Link>
            <Button className="NavButton" onClick={this.props.logout}> Logout</Button>
          </NavItem>
        ): null
      )
    } else {
      return (
        <Navbar.Text>
          Please <Navbar.Link className="Login" href="/login"> login</Navbar.Link> or <Navbar.Link className="Register" href="/register"> Register </Navbar.Link>
        </Navbar.Text>
      )
    }
  }
  getWantsItem() {
    if(!this.props.user) return (
      <NavDropdown onClick={() => <Redirect to='/login' />} eventKey={1} title="Wants" id="basic-nav-dropdown" />
    )
    else return (
    <NavDropdown eventKey={1} title="Wants" id="basic-nav-dropdown">
      <MenuItem eventKey={1.1} href="/me/wants">Me</MenuItem>
      <MenuItem divider />
      {
        (this.props.user.groups.length)?
          this.props.user.groups.map(
            group => <MenuItem href={`/group/${encodeURIComponent(group.groupname)}/wants`}>{group.groupname}</MenuItem>
          ):
          (<MenuItem disabled> You have no groups </MenuItem>)

      }
    </NavDropdown>
    )
  }
  getOffersItem() {
    if(!this.props.user) return (
      <NavDropdown onClick={() => <Redirect to='/login' />} eventKey={1} title="Offers" id="basic-nav-dropdown" />
    )
      return (
        <NavDropdown onClick={() => this.props.users?"":<Redirect to='/login'/>} eventKey={2} title="Offers" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1} href="/me/offers">Me</MenuItem>
          <MenuItem divider />
          {
            (this.props.user.groups.length)?
              this.props.user.groups.map(
                group => <MenuItem href={`/group/${encodeURIComponent(group.groupname)}/offers`}>{group.groupname}</MenuItem>
              ):
              (<MenuItem disabled> You have no groups </MenuItem>)

          }
        </NavDropdown>
      )
  }
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">FindA</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {this.getWantsItem()}
            {this.getOffersItem()}
            <NavItem eventKey={3}> Categories</NavItem>
          </Nav>
          <Nav className="NavRight" pullRight>
            {this.barRightItems()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
