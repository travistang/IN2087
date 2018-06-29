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

        searchResults:[],
        isOffers:true,
        firstDropDownSelected:"Offers",
        firstDropDownSecond:"Wants",
        secondDropDownSelected:"All"
    }

  constructor(props) {
    super(props);
    this.firstDropDown=this.firstDropDown(this);

  }

  handleInputChange=()=>{
        this.setState({
            query:this.search.value
        }),()=>{
           // if(this.props.isForWant){searchResults:data.data}
            //if(==offers){search user offers}
        }

      this.props.setQuery(this.search.value)


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


    firstDropDown(){
        if(!this.state.isOffers)
        {
            this.setState({
                firstDropDownSelected:"Wants",
                firstDropDownSecond:"Offers",
                isOffers:false

            });

            console.log("isOffers");
            console.log(this.state.firstDropDownSelected);


        }
        else {

            console.log("!isOffers");
            console.log(this.state.firstDropDownSelected);
            this.state.firstDropDownSelected="Offers";
            this.setState({firstDropDownSecond:"Wants"});
            this.setState({isOffers:true})
        }
    }

    secondDropDown()
    {
        this.setState({SecondDropDownSecond:"All"});
    }



  /*getWoOItems() {
      return (
        <NavDropdown onClick={() => this.props.users?"":<Redirect to='/login'/>} eventKey={1} title="Wants" id="basic-nav-dropdown">
          <MenuItem eventKey={1.1} href="/offers">Offers</MenuItem>
          <MenuItem divider />
          <MenuItem id="firstTwo" eventKey={1.2} href="/wants" onclick={document.getElementById(firstTwo).innerHTML }> Wants </MenuItem>
        </NavDropdown>
      )
  }
  getOffersItem() {
      return (
        <NavDropdown onClick={() => this.props.users?"":<Redirect to='/login'/>} eventKey={2} title="Offers" id="basic-nav-dropdown">
          <MenuItem eventKey={2.1} href="/me/offers">Me</MenuItem>
          <MenuItem divider />
          <MenuItem disabled> You have no groups </MenuItem>
        </NavDropdown>
      )
  }*/
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
                //TODO change this to select box
                <NavDropdown id="firstDropDownTitle" title={this.state.firstDropDownSelected}>
                    <MenuItem id="firstDropDownItem" onSelect={this.firstDropDown}>{this.state.firstDropDownSecond}</MenuItem>

                </NavDropdown>
                <NavDropdown id="secondDropDownTitle" title="All">
                    <MenuItem id="secondDropDownItem1" onSelect={this.secondDropDown}>My Groups</MenuItem>
                    <MenuItem id="secondDropDownItem2" onSelect={this.secondDropDown}>My own</MenuItem>
                </NavDropdown>
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
