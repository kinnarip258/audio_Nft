//========================== Import Modules Start ===========================

import React, { useEffect } from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changePassword } from '../Actions/actions';
import {useHistory} from 'react-router-dom';
toast.configure();
//========================== Import Modules End =============================

//============================= Login Component Start =============================

const ChangePassword = () => {

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  const history = useHistory();

  const Toggle = useSelector(state => state.Toggle);

  //============================= UseFormik =============================
  const formik = useFormik({
      //============================= Initial Values =============================
      initialValues: {
        newPassword:"", oldPassword:"", confirmPassword:"" 
      },
      validationSchema: Yup.object().shape({
        newPassword: Yup.string()
          .min(8, 'Too Short!')
          .required('Required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ), 
        oldPassword: Yup.string()
          .min(8, 'Too Short!')
          .required('Required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ), 
        confirmPassword: Yup.string()
          .min(8, 'Too Short!')
          .required('Required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),  
      }),
      onSubmit: (values) => {
        if(values.newPassword !== values.confirmPassword){
          toast.warning("New Password And Confirm Password Not Match", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 })
        }
        else{
          dispatch(changePassword(values))
        }
      }
  })

  useEffect(() => {
    if(Toggle === true){
      history.push('/profile')
    }
  }, [Toggle])
  return (
    <div>
        <div class="login-page">
            <div className="header_div">
              <h1>Change Password</h1>
            </div> 
            <div class="form">
              <form class="login-form" onSubmit={formik.handleSubmit}>

              <input {...formik.getFieldProps("oldPassword")} value={formik.values.oldPassword}  name="oldPassword" type="password" placeholder="oldPassword"/>
              {formik.errors.oldPassword && formik.touched.oldPassword ? (
                <div className = "error">{formik.errors.oldPassword}</div>
              ) : null}

              <input {...formik.getFieldProps("newPassword")} value={formik.values.newPassword}  name="newPassword" type="password" placeholder="newPassword"/>
              {formik.errors.newPassword && formik.touched.newPassword ? (
                <div className = "error">{formik.errors.newPassword}</div>
              ) : null}
              
              <input {...formik.getFieldProps("confirmPassword")} value={formik.values.confirmPassword}  name="confirmPassword" type="password" placeholder="confirmPassword"/>
              {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                <div className = "error">{formik.errors.confirmPassword}</div>
              ) : null}
              <button type="submit">Submit</button>
              </form>
            
            </div>
        </div>
    </div>
  )
}

//============================= Login Component End =============================

//============================= Export Default Start =============================

export default ChangePassword;

//============================= Export Default End =============================