import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { adminProfile, editAdmin } from '../Actions/actions';
import {useFormik} from "formik";
import * as Yup from 'yup';

const Profile = () => {

  const User = useSelector(state => state.User);
  const Toggle = useSelector(state => state.Toggle);

  const [edit, setEdit] = useState(false);
  
  const dispatch = useDispatch();

    //============================= UseFormik =============================
    const formik = useFormik({
      //============================= Initial Values =============================
      initialValues: {
        firstName:"", lastName:"", username:"", 
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
        username: Yup.string()
          .min(3, 'Too Short!')
          .max(30, 'Too Long!')
          .required('Required'), 
      }),
      onSubmit: (values) => {
        dispatch(editAdmin(values));
        setEdit(false);
      }
    })

  useEffect(() => {
    dispatch(adminProfile());
  }, [dispatch, Toggle]);

  useEffect(() => {
    if(edit === true){
      formik.setValues({firstName: User.firstName, lastName: User.lastName, username: User.username})
    }
  }, [edit])
  return (
    <>
      <div className='header_div'>
        <h1>Profile</h1>
      </div>
      {
        User && (
          <>
            <div className='main_div'>
              <form className='profile' onSubmit={formik.handleSubmit}>
                <label>FirstName</label>
                {
                  edit ? null : <p>{User.firstName}</p>
                }
                {
                  edit ? (
                    <>
                      <input type='text' {...formik.getFieldProps("firstName")} value={formik.values.firstName}  name="firstName" placeholder="firstName"/>
                    </>
                  ) : null
                }
                {formik.errors.firstName && formik.touched.firstName ? (
                  <div className = "error">{formik.errors.firstName}</div>
                ) : null}
                <label>LastName</label>
                {
                  edit ? null : <p>{User.lastName}</p>
                }
                
                {
                  edit ? (
                    <>
                      <input type='text' {...formik.getFieldProps("lastName")} value={formik.values.lastName}  name="lastName" placeholder="lastName"/>
                    </>
                  ) : null
                }
                {formik.errors.lastName && formik.touched.lastName ? (
                  <div className = "error">{formik.errors.lastName}</div>
                ) : null}
                <label>Email</label>
                <p>{User.email}</p>
              
                <label>Username</label>
                {
                  edit ? null : <p>{User.username}</p>
                }
                {
                  edit ? (
                    <>
                      <input type='text' {...formik.getFieldProps("username")} value={formik.values.username}  name="username" placeholder="username"/>
                    </>
                  ) : null
                }
                {formik.errors.username && formik.touched.username ? (
                  <div className = "error">{formik.errors.username}</div>
                ) : null}
                {edit ? null : <button onClick={() => setEdit(true)}>Edit</button>}
                {edit ? <button type='submit'> Update </button> : null}

              </form>
            </div>
          </>
        )
      }
    </>
  )
}

export default Profile