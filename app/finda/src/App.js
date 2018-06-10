import React from 'react';
import { Router, Route, Link,BrowserRouter} from 'react-router-dom'
import { Redirect } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import Ads from './components/Ads/Ads'
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
    }

    this.logout = this.logout.bind(this)
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
      .then(user => this.setState(Object.assign({},this.state,{user})))
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
              user={this.me.user}
              logout={this.logout}
            />
            <Grid className="Section">
              <Row>
                  <Ads/>

                <Col md={6} lg={6}>
                  <Row style={{height:"100vh",marginBottom:8}}>
                    {ContentRoutes.map(route =>
                      <Route path={route.path}
                        render={() => <route.component {...route.params} {...this.routeParams[route.path]} />}
                      >
                      </Route>
                    )}
                    <Route
                      path="/me"
                      render={() => <MeComponent user={this.me.user} />}
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
