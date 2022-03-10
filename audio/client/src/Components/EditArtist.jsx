//========================== Import Modules Start ===========================

import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Checkbox from "./Checkbox";
import * as Yup from 'yup';
import {useHistory} from "react-router-dom";
import { editArtist, getAllGenres} from "../Actions/actions";
import queryString from "query-string";

//========================== Import Modules End =============================

//============================= Register Component Start =============================

const EditArtist = () => {

        
    //============================= Navigate the Page =============================
    const history = useHistory();
    
    //============================= dispatch Api Request =============================
    const dispatch = useDispatch();

    //============================= Redux States =============================
    const Toggle = useSelector(state => state.Toggle);
    const User = useSelector(state => state.User);
    const Genres = useSelector(state => state.Genres);
   
    //============================= useStates =============================
    const [selectGenres, setSelectGenres] = useState([]);
   
    //============================= Get Edited User Id =============================
    const {id} = queryString.parse(window.location.search);

    //============================= Store Edite Employee Data =============================
    const [editedObject,setEditedObject] = useState([]);

    const handleClick = (e) => {
        const { id, checked } = e.target;
        setSelectGenres([...selectGenres, id]);
        if (!checked) {
          setSelectGenres(selectGenres.filter((item) => item !== id));
        }
    };
    //============================= UseFormik =============================
    const formik = useFormik({
        //============================= Initial Values =============================
        initialValues: {
          firstName:"", lastName:"", email:"", bio:"", username:"", password:"" , cpassword:""
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string()
              .min(3, 'Too Short!')
              .max(15, 'Too Long!')
              .required('Required'),
            lastName: Yup.string()
              .min(3, 'Too Short!')
              .max(15, 'Too Long!')
              .required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            bio: Yup.string()
              .min(10, 'Too Short!')
              .max(500, 'Too Long!')
              .required('Required'),
            username: Yup.string()
              .min(3, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required'), 
        }),
        onSubmit: (values) => {
            dispatch(editArtist(values, selectGenres, id))
        }
    })

    useEffect(() => {
        if(Toggle === true){   
            //============================= Navigate to profile =============================
            history.push('/artists');
            formik.handleReset();
        }
    }, [Toggle, dispatch])

    useEffect(() => {
        dispatch(getAllGenres("", ""))
    }, [dispatch]);

    //============================= UseEffect For Get EditUser Data =============================
  useEffect(() => {
    if(id){
        //============================= Set Edited User Data =============================
        setEditedObject(User);
        setSelectGenres(User.genres)
    }
  },[id, User]);

  //============================= Set Edited User Data to InitialValues =============================
  useEffect(() => {
    if(id && editedObject) {
        //setvalues
        formik.setValues(editedObject)
    }
  },[editedObject]);
    return (
        <>
            <div className="Loading">
            </div>
            <div class="login-page">
                <div className="header_div">
                    <h1> Edit Artist</h1>
                </div>
        
                <div class="form">
                    <form class="login-form" onSubmit={formik.handleSubmit}>
                    
                    <input {...formik.getFieldProps("firstName")} value={formik.values.firstName}  name="firstName"  type="text" placeholder="firstName"/>
                    {formik.errors.firstName && formik.touched.firstName ? (
                        <div className = "error">{formik.errors.firstName}</div>
                    ) : null}

                    <input {...formik.getFieldProps("lastName")} value={formik.values.lastName}  name="lastName"  type="text" placeholder="lastName"/>
                    {formik.errors.lastName && formik.touched.lastName ? (
                        <div className = "error">{formik.errors.lastName}</div>
                    ) : null}
                    
                    <input {...formik.getFieldProps("email")} value={formik.values.email}  name="email"  type="email" placeholder="Email"/>
                    {formik.errors.email && formik.touched.email ? (
                        <div className = "error">{formik.errors.email}</div>
                    ) : null}
                    
                    <TextareaAutosize
                        maxRows={5}
                        aria-label="maximum height"
                        placeholder="Bio ..."
                        style={{ width: 350 , height: 100, marginBottom: 5}}
                        {...formik.getFieldProps("bio")} value={formik.values.bio}  name="bio"
                    />
                    {formik.errors.bio && formik.touched.bio ? (
                        <div className = "error">{formik.errors.bio}</div>
                    ) : null}

                    <h2>Genres</h2>
                    {
                        Genres && selectGenres !== undefined && Genres.map(ele => {
                            return(
                                <>
                                    <label>{ele.title}</label>
                                    <div className="CheckBox">
                                        <Checkbox 
                                        type='checkbox' 
                                        id={ele.title} 
                                        name={ele.title}
                                        handleClick = {handleClick} 
                                        isChecked={selectGenres.includes(ele.title)}
                                        />
                                    </div>
                                    
                                </>
                            )
                        })
                    }
                    <input {...formik.getFieldProps("username")} value={formik.values.username}  name="username"  type="text" placeholder="Username"/>
                    {formik.errors.username && formik.touched.username ? (
                        <div className = "error">{formik.errors.username}</div>
                    ) : null}
                    
                    <button type="submit"> Update </button>
                    </form>
                            
                </div>
            </div>
        </>
    )
}

//============================= register Component End =============================

//============================= Export Default Start =============================

export default EditArtist;

//============================= Export Default End =============================