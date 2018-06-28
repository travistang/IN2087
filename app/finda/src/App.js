import React from 'react';
import { Router, Route, Link,BrowserRouter} from 'react-router-dom'
import { Redirect } from 'react-router'
import NavBar from './components/NavBar/NavBar'
import Ads from './components/Ads/Ads'
import logo from './logo.svg';
import './App.css';
import ContentRoutes from "./routes"
import {apiURL} from "./config"
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'
import { ToastContainer } from "react-toastr";
import Toaster from './providers/toaster';
import Auth from './providers/auth';
import Me from './providers/me';
import MeComponent from './components/Me/Me';
import Http from './providers/http';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.auth = Auth.getInstance();
    this.me = Me.getInstance();
    this.state = {
      user: null,
        wants:[],
        offers:[]
    };

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
      }
    };
    this.logout = this.logout.bind(this);
    // get user info first
    this.updateUser();
  };



    componentWillMount(){
        this.getWants();
        console.log("Wants");
        console.log(this.state.wants);
        console.log("Offers");
        console.log(this.state.offers);
        //this.getOffers();
    };

   getWants()
   {
       this.getWantsP().then((data) => {
           this.setState({
               wants: [...data],
           });
           console.log("Data: ");
           console.log([...data]);
           console.log("");
           console.log("wantsThenINteresting: ");
           console.log(this.state.wants);
       }).catch((e) => {
           console.error(e);
       });
       console.log("");
       console.log("Wants: ");
       console.log(this.state.wants);


   };


    getWantsP()
    {


        let a=new Promise((resolve, reject) => {
            Http.get2(`${apiURL}/wants/`, function(data) {
                resolve(data);
            });
        });
        //console.log(`${apiURL}/wants`);

        return a;
    };

    componentDidMount(){
        this.getWants();
        console.log("didMount");
        console.log(this.state.wants);
    };





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
                    {ContentRoutes.map(route =>
                      <Route path={route.path}
                        render={() => <route.component {...route.params} {...this.routeParams[route.path]} />}
                      >
                      </Route>
                    )}
                    <Route
                      path="/me"
                      exact={true}
                      render={() => <MeComponent isMe={true} user={this.state.user} />}
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
