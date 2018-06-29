import React from 'react';
import { Router, Route, Link,BrowserRouter} from 'react-router-dom'
import { Redirect } from 'react-router'
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react';
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
        offers:[],
        query:'',
    };

    this.setQuery=this.setQuery.bind(this);

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


  setQuery(q){

      this.setState({
          query:q

      });
      console.log("URL: ");
      this.getWants();
      console.log("this.state.query: ");
      console.log(this.state.query);
      console.log("this.state.wants: ");
      console.log(this.state.wants);
  }



    componentWillMount(){
        this.getWants();

        //this.getOffers();
    };

   getWants()
   {
       this.getWantsP().then((data) => {
           this.setState({
               wants: [...data],
           });


       }).catch((e) => {
           console.error(e);
       });



   };


    getWantsP() {

       console.log(`${apiURL}/wats/?search=${this.state.query}`);
       return new Promise((res,rej)=>{
          Http.get2(`${apiURL}/wants/?search=${this.state.query}`,function(data){
              res(data);
          })

       })

    };

    componentDidMount(){
        this.getWants();

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
              data={this.state.wants}
              setQuery = {this.setQuery}
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
