import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Main from '../components/Main';
import NavBar from '../components/Navbar';
import SecondPage from '../components/SecondPage';
import Third from '../components/Third';
class Routers extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <NavBar/>
                <Switch>
                    
                    <Route path = '/geyser' component = {SecondPage}/>
                    <Route path = '/dashboard' component = {Third}/>
                    <Route path = '/' component = {Main}/>
                    <Redirect to = '/'/>
                </Switch>
            </div>
          );
    }
}
 
export default Routers;