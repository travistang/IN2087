import React from 'react';
import { Router, Route, Link,BrowserRouter} from 'react-router-dom'
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

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <NavBar username="Hello World!"/>
            <Grid className="Section">
              <Row>
                  <Ads/>

                <Col md={6} lg={6}>
                  <Row style={{height:"100vh",marginBottom:8}}>
                    {ContentRoutes.map(route =>
                      <Route path={route.path}
                        render={() => <route.component {...route.params} />}
                      >
                      </Route>
                    )}
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
