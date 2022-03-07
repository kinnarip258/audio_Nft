//========================== Import Modules Start ===========================

import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import Home from '../Components/Home';
import Dashboard from '../Components/Dashboard';
import Artists from '../Components/Artists';
import ChangePassword from '../Components/ChangePassword';
import Genres from '../Components/Genres';
import Logout from '../Components/Logout';
import Profile from '../Components/Profile';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import createGenres from '../Components/createGenres';

//========================== Import Modules End =============================

//============================= Routes Component Start =============================

const Routes = () => {

  return (
    <div>
        <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route exact path = '/signUp' component = {SignUp} />
            <Route exact path = '/signIn' component = {SignIn} />
            <Route exact path = '/dashboard' component = {Dashboard} /> 
            <Route exact path = '/artists' component = {Artists} />
            <Route exact path = '/changePassword' component = {ChangePassword} />
            <Route exact path = '/genres' component = {Genres} />  
            <Route exact path = '/logout' component = {Logout} /> 
            <Route exact path = '/profile' component = {Profile} />
            <Route exact path = '/createGenres' component={createGenres} />
        </Switch>
    </div>
  )
}

export default Routes