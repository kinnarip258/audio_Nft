//========================== Import Modules Start ===========================

import { SignIn_User, Logout_User, Loading, SignUp_User, Get_All_Artists, Get_All_Genres, Admin_Profile, Change_Password, Edit_Admin, Edit_Genres, Delete_Genres, Create_Genres, Create_Nft, Upload_CoverImg, Upload_AudioFile, Loading_Error, PlayList, Get_Count_ArtistGenres, Edit_Artist } from "../Actions/actionTypes";

//========================== Import Modules End =============================

const initialState = { 
    LoginState : true,
    Toggle: false,
    Loading: false,
    Artists : [],
    Genres : [],
    User: [],
    ArtistPage:"",
    GenresPage: "",
    Nft: [],
    AudioFile:[],
    CoverImg:[],
    Playlist: [],
    ArtistCount: "",
    GenresCount: ""
}

const Reducer = (state = initialState, action) => {
    switch(action.type){
        case SignUp_User:

            return{
                ...state,
                Toggle: true, 
            }

        case SignIn_User:

            return{
                ...state,
                LoginState : false,                     
            }

        case Get_All_Artists: 
            return {
                ...state,
                Artists: action.payload.artists,
                ArtistPage: action.payload.totalPage,
                Toggle:false
            }
        
        case Get_All_Genres: 
            return {
                ...state,
                Genres: action.payload.genres,
                GenresPage: action.payload.totalPage,
                Toggle: false
            }

        case Admin_Profile: 
            return {
                ...state,
                User: action.payload,
                Toggle: false,
                CoverImg: [],
                AudioFile: []
            }

        case Change_Password: 
            return {
                ...state,
                Toggle: true
            }
        
        case Edit_Admin: 
            return {
                ...state,
                Toggle: true,
                User: action.payload
            }

        case Edit_Artist:
            return {
                ...state,
                Toggle: true,
                User: action.payload
            }
        case Edit_Genres: 
            return {
                ...state,
                Toggle: true
            }

        case Delete_Genres: 
            return {
                ...state,
                Toggle: true
            }

        case Create_Genres: 
            return {
                ...state,
                Toggle: true
            }

        case Create_Nft:
            return {
                ...state,
                Loading: false,
                Toggle:true,
                CoverImg: [],
                AudioFile: []
            }
        
        case Upload_CoverImg: 
            return {
                ...state,
                CoverImg: action.payload
            }
        
        case Upload_AudioFile:
           
            return {
                ...state,
                AudioFile: action.payload
            }

        case Logout_User :

            return {
                ...state,
                LoginState : true,
                Toggle: false,
                Artists : [],
                Genres : [],
                User: [],
            }
        
        case Get_Count_ArtistGenres:
            return {
                ...state,
                ArtistCount: action.payload.ArtistCount,
                GenresCount: action.payload.GenresCount
            }
            
        case Loading: 
            return {
                ...state,
                Loading: true
            }
          
        case Loading_Error:
            return{
                ...state,
                Loading: false
            }

        case PlayList: 
            return {
                ...state,
                Toggle: false,
                Playlist: action.payload
            }
        default: 
            return state
    }
}

export default Reducer;