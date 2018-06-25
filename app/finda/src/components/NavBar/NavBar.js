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
    state={
        query:'',
        searchResults:[]
    }

  constructor(props) {
    super(props)
  }

  handleInputChange=()=>{
        this.setState({
            query:this.search.value
        }),()=>{
           // if(this.props.isForWant){searchResults:data.data}
            //if(==offers){search user offers}
        }
  }
  barRightItems() {
    if(Auth.getInstance().isLoggedIn()) {
      return (this.props.user?(
          <NavItem>
            <Image className="Thumbnail" src="https://react-bootstrap.github.io/thumbnail.png" circle />
            {this.props.user.username}
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
      return (
        <NavDropdown onClick={() => this.props.users?"":<Redirect to='/login'/>} eventKey={1} title="Wants" id="basic-nav-dropdown">
          <MenuItem eventKey={1.1} href="/me/wants">Me</MenuItem>
          <MenuItem divider />
          <MenuItem disabled> You have no groups </MenuItem>
        </NavDropdown>
      )
  }
  getOffersItem() {
      return (
        <NavDropdown eventKey={2} title="Offers" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1}>Me</MenuItem>
          <MenuItem divider />
          <MenuItem disabled> You have no groups </MenuItem>
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
          <input
            placeholder="Search for:"
            ref={input=>this.search=input}
            onChange={this.handleInputChange}
            />
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
