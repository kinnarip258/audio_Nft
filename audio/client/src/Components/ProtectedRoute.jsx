//========================== Import Modules Start ===========================

import React from 'react'
import {Route, Redirect} from 'react-router-dom';

//========================== Import Modules End =============================

//============================= Protected Route Component Start =============================

const ProtectedRoute = ({authStatus, component: Component, ...rest}) => { 
    
    return (
        <>  
            <Route {...rest} render= {(props) => {
                if(authStatus !== undefined){
                    return <Component {...props}/>;
                }
                else{
                    return <Redirect to='/'/>
                }
            }}/>   
        </>
    )     
}

//============================= Protected Route Component End =============================

//============================= Export Default Start =============================

export default ProtectedRoute;

//============================= Export Default End =============================
