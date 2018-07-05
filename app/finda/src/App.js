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
import GroupComponent from './components/Group/Group'
import MessageComponent from './components/Message/Message'
import ConversationPage from './components/Conversation/Conversation'
import ItemListPage from './components/ItemsListPage/ItemsListPage'

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
      "me/wants": {
        user: this.state.user
      },
      "me/offers": {
        user: this.state.user
      },
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
        if(user && user.error) {
          this.logout()
          return
        }
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
                    {ContentRoutes.map(route =>
                      <Route path={route.path}
                        exact={true}
                        render={() => <route.component {...route.params} {...this.routeParams[route.path]} />}
                      >
                      </Route>
                    )}
                    <Route
                      path="/me"
                      exact={true}
                      render={() => <MeComponent isMe={true} user={this.state.user} />}
                    />

                    <Route
                      path="/group/:groupname"
                      exact={true}
                      render={(props) => <GroupComponent {...props} user={this.state.user}/>}
                    />
                    <Route
                      path="/group/:groupname/wants"
                      exact={true}
                      render={(props) => <ItemListPage {...props} isGroup={true} isForWant={true} user={this.state.user}/>}
                    />
                    <Route
                      path="/group/:groupname/offers"
                      exact={true}
                      render={(props) => <ItemListPage {...props} isGroup={true} isForWant={false} user={this.state.user}/>}
                    />
                    <Route
                      path="/user/:username"
                      exact={true}
                      render={(props) => <MeComponent {...props} isMe={false} user={this.state.user} />}
                    />
                    <Route
                      path="/me/wants"
                      exact={true}
                      render={(props) => <ItemListPage {...props} user={this.state.user} isMe={true} isForWant={true} />}
                    />
                    <Route
                      path="/me/offers"
                      exact={true}
                      render={(props) => <ItemListPage {...props} user={this.state.user} isMe={true} isForWant={false} />}
                    />
                    <Route
                      path="/me/groups"
                      exact={true}
                      render={(props) => <ItemListPage {...props} user={this.state.user} isMe={true} isForGroup={true} />}
                    />
                    <Route
                      path="/messages"
                      exact={true}
                      render={(props) => <MessageComponent {...props} user={this.state.user} />}
                    />
                    <Route
                      path="/messages/:userId"
                      exact={true}
                      render={(props) => <ConversationPage {...props} user={this.state.user} />}
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
