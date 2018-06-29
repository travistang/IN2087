import React from 'react';
import { Router, Route, Link,BrowserRouter} from 'react-router-dom'
import { Redirect } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import Ads from './components/Ads/Ads'
import RegisterLoginForm from './components/RegisterLoginForm/RegisterLoginForm'
import ItemsListPage from './components/ItemsListPage/ItemsListPage'
import logo from './logo.svg';
import './App.css';
import ContentRoutes from "./routes"
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'
import { ToastContainer } from "react-toastr";
import Toaster from './providers/toaster'
import Auth from './providers/auth'
import Me from './providers/me'
import MeComponent from './components/Me/Me'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.auth = Auth.getInstance()
    this.me = Me.getInstance()
    this.state = {
      user: null
    }

    this.routeParams = {
      "/login": {
        onSuccess: this.updateUser.bind(this)
      },
      "/register": {
        onSuccess: this.updateUser.bind(this)
      },
      "/me/wants": {
        user: this.state.user
      },
      "/me/offers": {
        user: this.state.user
      }
    }

    this.logout = this.logout.bind(this)
    // get user info first
    this.updateUser()
  }
  logout() {
    // remove token
    this.auth.logout()
    // remove user object
    this.setState(Object.assign({},this.state,{user: null}))
    return <Redirect to='/home' />
  }
  updateUser() {
    this.me.getUser()
      .then(user => {
        this.setState(Object.assign({},this.state,{user}))
      })
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <ToastContainer
              ref={ref => Toaster.getInstance().setRef(ref)}
              className="toast-top-right"
            />

            <NavBar
              user={this.state.user}
              logout={this.logout}
            />
            <Grid className="Section">
              <Row>
                  <Ads/>

                <Col md={6} lg={6}>
                  <Row style={{height:"100vh",marginBottom:8}}>
                    <Route
                      path="/login"
                      exact={true}
                      render={() => <RegisterLoginForm isregister={false} onSuccess={this.updateUser.bind(this)} />}
                    />
                    <Route
                      path="/register"
                      exact={true}
                      render={() => <RegisterLoginForm isregister={true} onSuccess={this.updateUser.bind(this)} />}
                    />
                    <Route
                      path="/me"
                      exact={true}
                      render={() => <MeComponent isMe={true} user={this.state.user} />}
                    />
                    <Route
                      path="/me/wants"
                      exact={true}
                      render={() => <ItemsListPage isMe={true} isForWant={true} user={this.state.user} />}
                    />
                    <Route
                      path="/me/offers"
                      exact={true}
                      render={() => <ItemsListPage isMe={true} isForWant={false} user={this.state.user} />}
                    />

                  </Row>
                </Col>

                  <Ads/>
              </Row>
            </Grid>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
