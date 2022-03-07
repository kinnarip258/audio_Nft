//========================== Import Modules Start ===========================

import {SignIn_User, SignUp_Toggle, Logout_User, Loading, Sign, SignUp_User} from "./actionTypes";
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

//========================== Import Modules End =============================

//============================= Actions =============================

//============================= Register User Action Start =============================

export const signUpUser = (values) => {

    return (dispatch) => {

        Axios.post(`/signUp`, values)
        .then(() => {
            dispatch({type: SignUp_User})
        })
        .catch(err => {
            console.log(err);
            toast.error("Email Or Username Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================

//============================= Register Toggle Action Start =============================
export const signUpToggle = () => {

    return (dispatch) => {
        dispatch({type: SignUp_Toggle})        
    }
}
//============================= End =============================

//============================= Login Action Start =============================

export const signInUser = (values) => {

    return (dispatch) => {
        Axios.post(`/signIn`, values)
        .then((res) => {
            console.log(res.data.msg);
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: SignIn_User})
        })
        .catch(err => {
            console.log(err);
            toast.error("Invalid Credentials!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        })
    }
}

//============================= End =============================

//============================= Logout Action Start =============================

export const logout = () => {

    return (dispatch) => {
        Axios.get(`/logout`)
        .then((res) => {
            dispatch({type: Logout_User})
            toast.success(`Logout Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================


//============================= Logout Action Start =============================

export const loading = () => {

    return (dispatch) => {
        dispatch({type: Loading});
    }
}

//============================= End =============================
