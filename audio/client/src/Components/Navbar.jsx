//========================== Import Modules Start ===========================

import React from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

//========================== Import Modules End =============================

//============================= Navbar Component Start =============================

const Navbar = () => {

    const cookie = Cookies.get('audioNft'); 
  
    const LoginState = useSelector(state => state.LoginState);

    const User = useSelector(state => state.User);

    const Loading = useSelector(state => state.Loading);

    return (
        <>
            <div className="nav_div" >

                <NavLink to = '/' className='links'> Home </NavLink>

                {
                    User.length === 0 && LoginState === true && cookie === undefined && (
                        <>
                            <NavLink to = '/signUp' className='links'> SignUp </NavLink>
                            <NavLink to = '/signIn' className='links'> SignIn  </NavLink> 
                            
                        </>
                    )
                }

                <NavLink to = '/artists' className='links'> Artists  </NavLink>
                <NavLink to = '/genres' className='links'> Genres  </NavLink>

                {
                    User.role === "Admin" ? (
                        <>
                            <NavLink to = '/profile' className='links'> Profile  </NavLink> 
                            <NavLink to = '/createGenres' className='links' > Create Genres </NavLink> 
                            <NavLink to = '/changePassword' className='links'> ChangePassword  </NavLink>
                        </>
                    ) : null
                }
                {
                    User.role === 'Artist' ? (
                    <>
                        <NavLink to = '/createNft' className='links'> CreateNft  </NavLink> 
                    </>
                    ) : null
                }

                {
                    cookie !== undefined && (
                        <>
                        <NavLink to = '/dashboard' className='links'> Dashboard  </NavLink>
                        
                        {
                            Loading ? null : <NavLink to = '/logout' className='links'> Logout </NavLink>
                        } 
                            
                        </>
                    )
                }  

                {
                    cookie !== undefined && (
                        <>
                            <div className='Nav_User'>
                                <p>{`Sign In as ${User.username}`}</p>
                            </div>
                        </>
                    )
                }              
                <hr/>
            </div>  
        </>
    )
}

//============================= Navbar Component End =============================

//============================= Export Default Start =============================

export default Navbar;

//============================= Export Default End =============================
