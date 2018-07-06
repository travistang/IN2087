import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image,
  Button,
  FormGroup,
  FormControl,
  Form,
  InputGroup,
  DropdownButton,
  Grid,Row,Col
} from 'react-bootstrap'
import {Redirect} from 'react-router'
import Auth from '../../providers/auth'
import SearchBar from '../SearchBar/SearchBar'
import './NavBar.css'

export default class NavBar extends React.Component {
  constructor(props) {
    super(props)
    // listen for changes in route so that the navbar's layout can change accordingly
    this.shouldShowSearch = !(['','/','/home'].some(p => window.location.pathname == p))
  }
  barRightItems() {
    if(Auth.getInstance().isLoggedIn())
    {
      return (this.props.user?(
        <NavItem pullRight href="/me">
              Hello, {this.props.user.username}
        </NavItem>
        ): null
      )
    } else
    {
      return (
        <Navbar.Text pullRight>
          Please <Navbar.Link className="Login" href="/login"> login</Navbar.Link> or <Navbar.Link className="Register" href="/register"> Register </Navbar.Link>
        </Navbar.Text>
      )
    }
  }
  getWantsItem() {
    if(!this.props.user) return (
      null
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
      null
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
  getCategoriesItem() {
    if(!this.props.user) return null
    return (<NavItem eventKey={3}> Categories</NavItem>)
  }
  getMessageItem() {
    if(!this.props.user) return null
    return <NavItem eventKey={3} href="/messages"> Messages </NavItem>
  }
  logoutButton() {
    if(!this.props.user) return null
    return (
      <NavItem pullRight onClick={this.props.logout}>
        Logout
      </NavItem>

    )
  }
  onSearchResult(result) {

  }
  getSearchForm() {
    return (
        <Navbar.Form>
          <SearchBar onSearchResult={this.onSearchResult.bind(this)} />
        </Navbar.Form>
    )
  }
  userItems() {
    if(this.shouldShowSearch)
    return (
      <Navbar.Collapse>
        <Nav pullRight>
        {this.getWantsItem()}
        {this.getOffersItem()}
        {this.getMessageItem()}
        </Nav>
      </Navbar.Collapse>

    )
    return (
      <Nav>
      {this.getWantsItem()}
      {this.getOffersItem()}
      {this.getMessageItem()}
      </Nav>

    )
  }
  render() {
    return (
      <Navbar staticTop={true}  fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">FindA</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        {
          this.shouldShowSearch && (
            <Nav>
                {this.shouldShowSearch && this.getSearchForm()}
            </Nav>
          )
        }

        <Navbar.Collapse>
          {!this.shouldShowSearch && this.userItems()}
          <Nav pullRight>
            {this.barRightItems()}
            {this.logoutButton()}
          </Nav>
        </Navbar.Collapse>
        {this.shouldShowSearch && this.userItems()}
      </Navbar>
    )
  }
}
