import React, { Component } from 'react';
import { Router, Route, Link,BrowserRouter} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Ads from './components/Ads/Ads'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <NavBar username="Hello World!"/>
            <section className="Section">
              <div class="row" >
                <Ads/>
                <div class="col" style={{marginLeft:16,marginRight:16}}>
                  <div class="row" style={{marginBottom:8}}>

                      <Route path="/me" component={Ads}>
                      </Route>

                  </div>
                </div>
                <Ads/>
              </div>
            </section>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
