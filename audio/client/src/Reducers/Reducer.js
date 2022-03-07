//========================== Import Modules Start ===========================

import { SignIn_User, SignUp_Toggle, Logout_User, Loading, SignUp_User } from "../Actions/actionTypes";

//========================== Import Modules End =============================

const initialState = { 
    LoginState : true,
    Toggle: false,
    Loading: false
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case SignUp_User:

            return{
                ...state,
                Toggle: true, 
            }

        case SignUp_Toggle: 

            return{
                ...state,
                Toggle: false,
            }

        case SignIn_User:

            return{
                ...state,
                LoginState : false
            }

        case Logout_User :

            return {
                ...state,
                LoginState : true,
                Toggle: false,
            }
         
        case Loading: 
            return {
                ...state,
                Loading: true
            }
        default: 
            return state
    }
}

export default Reducer;