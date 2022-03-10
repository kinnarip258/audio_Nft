//========================== Import Modules Start ===========================

import {SignIn_User, Logout_User, Loading, SignUp_User, Get_All_Artists, Get_All_Genres, Admin_Profile, Change_Password, Edit_Admin,Edit_Genres, Delete_Genres, Create_Genres, Create_Nft, Loading_Error, Upload_AudioFile, Upload_CoverImg, PlayList, Get_Count_ArtistGenres, Edit_Artist} from "./actionTypes";
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

//========================== Import Modules End =============================

//============================= Actions =============================

//============================= Register User Action Start =============================

export const signUpUser = (values, genres) => {

    return (dispatch) => {

        Axios.post(`/signUp`, {values,genres})
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: SignUp_User})
        })
        .catch(err => {
            console.log(err);
            toast.error("Email Or Username Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================

//============================= Login Action Start =============================

export const signInUser = (values) => {

    return (dispatch) => {
        Axios.post(`/signIn`, values)
        .then((res) => {
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

//============================= Get All Artists Action Start =============================

export const getAllArtists = (Page,Search) => {

    return (dispatch) => {

        Axios.get(`/getAllArtists/?Page=${Page}&Search=${Search}`)
        .then((res) => {
            dispatch({type: Get_All_Artists, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Get All Genres Action Start =============================

export const getAllGenres = (Page, Search) => {

    return (dispatch) => {

        Axios.get(`/getAllGenres/?Page=${Page}&Search=${Search}`)
        .then((res) => {
            dispatch({type: Get_All_Genres, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Admin Profile Action Start =============================

export const adminProfile = () => {

    return (dispatch) => {

        Axios.get(`/adminProfile`)
        .then((res) => {
            dispatch({type: Admin_Profile, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Change Password Action Start =============================

export const changePassword = (values) => {

    return (dispatch) => {

        Axios.post(`/changePassword`, values)
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Change_Password})
        })
        .catch(err => {
            toast.error("Old Password Is Not Correct", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================

//============================= Edit Admin Action Start =============================

export const editAdmin = (values) => {

    return (dispatch) => {

        Axios.put(`/editAdmin`, values)
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Edit_Admin})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Edit Artist Action Start =============================

export const editArtist = (values,selectGenres, id) => {

    return (dispatch) => {

        Axios.put(`/editArtist/?Id=${id}`, {values,selectGenres})
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Edit_Artist})
        })
        .catch(err => {
            toast.error("Artist already exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================


//============================= Edit Genres Action Start =============================

export const editGenres = (values, id) => {

    return (dispatch) => {

        Axios.put(`/editGenres/?Id=${id}`, values)
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Edit_Genres})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Delete Genres Action Start =============================

export const deleteGenres = (id) => {

    return (dispatch) => {

        Axios.delete(`/deleteGenres/?Id=${id}`)
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Delete_Genres})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Create Genres Action Start =============================

export const createGenres = (values) => {

    return (dispatch) => {

        Axios.post(`/createGenres`, values)
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Create_Genres})
        })
        .catch(err => {
            toast.error("Genres Is Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
    }
}

//============================= End =============================

//============================= CreateNft Action Start =============================

export const createNft = (userId, values, AudioFile, CoverImg) => {

    return (dispatch) => {

        Axios.post(`/createNft/?Id=${userId}`, {values, AudioFile, CoverImg})
        .then((res) => {
            toast.success(`${res.data.msg}`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            dispatch({type: Create_Nft})
        })
        .catch(err => {
            dispatch({type: Loading_Error})
            
            toast.error("Nft Title Is Already Exist!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            
        })
    }
}

//============================= End =============================


//============================= Upload Cover Image Action Start =============================

export const uploadCoverImg = (values) => {

    return (dispatch) => {

        Axios.post(`/uploadImg`, values)
        .then((res) => {
            dispatch({type: Upload_CoverImg, payload: res.data})
        })
        .catch(error => {
            dispatch({type: Loading_Error});

            toast.error("File Is Not An Image file!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            
        })
    }
}

//============================= End =============================

//============================= Upload Audio File Action Start =============================

export const uploadAudioFile = (values) => {

    return (dispatch) => {

        Axios.post(`/uploadAudioFile`, values)
        .then((res) => {
            dispatch({type: Upload_AudioFile, payload: res.data})
        })
        .catch(err => {
            dispatch({type: Loading_Error})

            toast.error("File Is Not An Audio file!", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
            
        })
    }
}

//============================= End =============================

//============================= PlayList Action Start =============================

export const playList = () => {

    return (dispatch) => {
        Axios.get(`/playList`)
        .then((res) => {
            dispatch({type: PlayList, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Get Count of Artist and Genres Action Start =============================

export const getCountArtistGenres = () => {

    return (dispatch) => {
        Axios.get(`/getCountArtistGenres`)
        .then((res) => {
            dispatch({type: Get_Count_ArtistGenres, payload: res.data})
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================

//============================= Logout Action Start =============================

export const logout = () => {

    return (dispatch) => {
        Axios.get(`/logout`)
        .then(() => {
            dispatch({type: Logout_User})
            toast.success(`Logout Successfully!`, { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//============================= End =============================


//============================= Loading Action Start =============================

export const loading = () => {

    return (dispatch) => {
        dispatch({type: Loading});
    }
}

//============================= End =============================
