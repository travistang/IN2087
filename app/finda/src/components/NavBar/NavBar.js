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
  DropdownButton,
} from 'react-bootstrap'
import {Redirect} from 'react-router'
import Auth from '../../providers/auth'
import './NavBar.css'


export default class NavBar extends React.Component {
    state={

        searchResults:[],
        isOffers:this.props.isOffers,
        firstDropDownSelected:"Offers",
        firstDropDownSecond:"Wants",
        secondDropDownSelected:"All"
    }

  constructor(props) {
    super(props);
  }

  handleInputChange=()=>{
        this.setState({
            query:this.search.value
        },this.props.setQuery(this.search.value))

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



  firstDropD(){

return(
  <NavDropdown id="firstDropDownTitle" title={this.state.firstDropDownSelected} >
  <MenuItem eventKey={11} id="firstDropDownItem" >{this.state.firstDropDownSecond}</MenuItem>
      </NavDropdown>
  )
  }







  handleNavbarSelect(evt, evtK)
  {
      console.log("onSelect");
      console.log(this.state.isOffers);
      if(evt==11)
      {
          if(!this.state.isOffers)
          {
              this.setState({
                  firstDropDownSelected:"Wants",
                  firstDropDownSecond:"Offers",
                  isOffers:true

              },this.props.setIsOffers(this.state.isOffers));
          }
          else {


              this.setState({
                firstDropDownSelected:"Offers",
                firstDropDownSecond:"Wants",
                isOffers:false
                },this.props.setIsOffers(this.state.isOffers));
          }
      }
      if(evt==21){
          this.props.setCategory("");
      }
      if(evt==22){
          this.props.setCategory("Things");
      }
      if(evt==23){
          this.props.setCategory("Courses");
      }
      if(evt==24){
          this.props.setCategory("People");
      }
      if(evt==25){
          this.props.setCategory("Groups");
      }



  }
  render() {
    return (
      <Navbar inverse collapseOnSelect onSelect={this.handleNavbarSelect.bind(this)} >
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
          <Nav >

            {this.firstDropD()}


                <NavDropdown id="Category" title={`In Category: ${this.props.category}`}>
                    <MenuItem id="All" eventKey={21}>All</MenuItem>
                    <MenuItem id="Things" eventKey={22}>Things</MenuItem>
                    <MenuItem id="CourseSlots" eventKey={23}>Courses</MenuItem>
                    <MenuItem id="People" eventKey={24}>People</MenuItem>
                    <MenuItem id="Groups" eventKey={25}>Groups</MenuItem>

                </NavDropdown>

          </Nav>
          <Nav className="NavRight" pullRight>
            {this.barRightItems()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }


}
