//========================== Import Modules Start ===========================

import React, { useEffect } from 'react'
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
import createGenres from '../Components/CreateGenres';
import ArtistPage from '../Components/ArtistPage';
import {useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import ProtectedRoute from '../Components/ProtectedRoute'
import { adminProfile } from '../Actions/actions';
import CreateNft from '../Components/CreateNft';
import EditArtist from '../Components/EditArtist';
//========================== Import Modules End =============================

//============================= Routes Component Start =============================

const Routes = () => {

  const cookie = Cookies.get('audioNft'); 
  const User = useSelector(state => state.User);
  const LoginState = useSelector(state => state.LoginState);
  
  const dispatch = useDispatch();
 
  useEffect(() => {
    if(cookie !== undefined){
      dispatch(adminProfile())
    }
  }, [cookie, dispatch]);
  
  return (
    <div>
        <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route exact path = '/artists' component = {Artists} />
            <Route exact path = '/genres' component = {Genres} />
            <Route exact path = '/artist/:id' component = {ArtistPage} />
      
            <ProtectedRoute exact path = '/logout' component = {Logout} authStatus = {cookie}/> 
            <ProtectedRoute exact path = '/createNft' component = {CreateNft} authStatus = {cookie}/>
            <ProtectedRoute exact path = '/EditArtist/:id' component={EditArtist} authStatus = {cookie}/>   
            <ProtectedRoute exact path = '/dashboard' component = {Dashboard} authStatus = {cookie}/> 
            <ProtectedRoute exact path = '/EditGenres/:id' component={createGenres} authStatus = {cookie}/>
            <ProtectedRoute exact path = '/changePassword' component = {ChangePassword} authStatus = {cookie}/>
            <ProtectedRoute exact path = '/profile' component = {Profile} authStatus = {cookie}/>
            <ProtectedRoute exact path = '/createGenres' component={createGenres} authStatus = {cookie}/>
            
            {
              cookie === undefined && LoginState === true ? (
                <>
                  <Route exact path = '/signUp' component = {SignUp} />
                  <Route exact path = '/signIn' component = {SignIn} />  
                </>
              ) : <Redirect to= '/' />
            } 
        </Switch>
    </div>
  )
}

export default Routes