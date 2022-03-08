//========================== Import Modules Start ===========================

import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Checkbox from "./Checkbox";
import * as Yup from 'yup';
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signUpToggle, signUpUser } from "../Actions/actions";
toast.configure();

//========================== Import Modules End =============================

//============================= Register Component Start =============================

const SignUp = () => {

        
    //============================= Navigate the Page =============================
    const history = useHistory();
    
    //============================= dispatch Api Request =============================
    const dispatch = useDispatch();

    //============================= Redux States =============================
    const Toggle = useSelector(state => state.Toggle);
    const Loading = useSelector(state => state.Loading);
    
    const [genres, setGenres] = useState([]);
    
    const handleClick = (e) => {
        const { id, checked } = e.target;
        setGenres([...genres, id]);
        if (!checked) {
          setGenres(genres.filter((item) => item !== id));
        }
    };
    //============================= UseFormik =============================
    const formik = useFormik({
        //============================= Initial Values =============================
        initialValues: {
          firstName:"", lastName:"", email:"", bio:"", username:"", password:"" , cpassword:"", role:""
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
            role: Yup.string().required('Required'),
            bio: Yup.string()
              .min(10, 'Too Short!')
              .max(500, 'Too Long!')
              .required('Required'),
            username: Yup.string()
              .min(3, 'Too Short!')
              .max(30, 'Too Long!')
              .required('Required'), 
            password: Yup.string()
              .min(8, 'Too Short!')
              .required('Required')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),  
            cpassword: Yup.string()
              .min(8, 'Too Short!')
              .required('Required')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ), 
        }),
        onSubmit: (values) => {
            
            if(values.password !== values.cpassword){
                toast.warning("Password Not Match")
            }
            else{
                dispatch(signUpUser(values, genres))
            }
        }
    })

    useEffect(() => {
        if(Toggle === true){   
            //============================= Navigate to profile =============================
            history.push('/signIn');
            dispatch(signUpToggle());
            formik.handleReset();
        }
    }, [Toggle, dispatch])


    return (
        <>
            <div className="Loading">
            {
                Loading ? <h1>Loading....</h1> : null
            }
            </div>
            <div class="login-page">
                <div className="header_div">
                    <h1> Artist Form</h1>
                </div>
        
                <div class="form">
                    <form class="login-form" onSubmit={formik.handleSubmit}>

                    <select {...formik.getFieldProps("role")} value={formik.values.role}  name="role">
                        <option>Select Role...</option>
                        <option value={"Artist"}>Artist</option>
                    </select>
                    {formik.errors.role && formik.touched.role ? (
                        <div className = "error">{formik.errors.role}</div>
                    ) : null}
                    
                    <input {...formik.getFieldProps("firstName")} value={formik.values.firstName}  name="firstName"  type="text" placeholder="firstName"/>
                    {formik.errors.firstName && formik.touched.firstName ? (
                        <div className = "error">{formik.errors.firstName}</div>
                    ) : null}

                    <input {...formik.getFieldProps("lastName")} value={formik.values.nalastNameme}  name="lastName"  type="text" placeholder="lastName"/>
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
                        style={{ width: 350 }}
                        {...formik.getFieldProps("bio")} value={formik.values.bio}  name="bio"
                    />
                    {formik.errors.bio && formik.touched.bio ? (
                        <div className = "error">{formik.errors.bio}</div>
                    ) : null}

                    <h2>Genres</h2>
                    <label>rock</label><Checkbox type='checkbox' id={"rock"} handleClick = {handleClick} isChecked={genres.includes('rock')}/>
                    <label>R & B</label><Checkbox type='checkbox' id={"R & B"} handleClick = {handleClick} isChecked={genres.includes('R & B')}/> 
                    <label>country</label><Checkbox type='checkbox' id={"country"} handleClick = {handleClick} isChecked={genres.includes('country')}/> 
                    <label>hip-hop</label><Checkbox type='checkbox' id={"hip-hop"} handleClick = {handleClick} isChecked={genres.includes('hip-hop')}/>  
                    <label>jazz</label><Checkbox type='checkbox' id={"jazz"} handleClick = {handleClick} isChecked={genres.includes('jazz')}/> 
                    <label>soulMusic</label><Checkbox type='checkbox' id={"soul music"} handleClick = {handleClick} isChecked={genres.includes('soul music')}/> 
                    <label>danceMusic</label><Checkbox type='checkbox' id={"dance music"} handleClick = {handleClick} isChecked={genres.includes('dance music')}/> 
                    <label>pop</label><Checkbox type='checkbox' id={"pop"} handleClick = {handleClick} isChecked={genres.includes('pop')}/> 

                    <input {...formik.getFieldProps("username")} value={formik.values.username}  name="username"  type="text" placeholder="Username"/>
                    {formik.errors.username && formik.touched.username ? (
                        <div className = "error">{formik.errors.username}</div>
                    ) : null}
                    
                    <input {...formik.getFieldProps("password")} value={formik.values.password}  name="password"  type="password" placeholder="password"/>
                    {formik.errors.password && formik.touched.password ? (
                        <div className = "error">{formik.errors.password}</div>
                    ) : null}
                    
                    <input {...formik.getFieldProps("cpassword")} value={formik.values.cpassword}  name="cpassword"  type="password" placeholder="Confirm Password"/>
                    {formik.errors.cpassword && formik.touched.cpassword ? (
                        <div className = "error">{formik.errors.cpassword}</div>
                    ) : null}

                    {Loading ? null : <button type="submit"> Submit </button>}
                    </form>
                    
                    <p class="message">Already registered? <a href="/signIn">Sign In</a></p>
                            
                </div>
            </div>
        </>
    )
}

//============================= register Component End =============================

//============================= Export Default Start =============================

export default SignUp;

//============================= Export Default End =============================