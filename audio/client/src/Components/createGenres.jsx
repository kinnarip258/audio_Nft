//========================== Import Modules Start ===========================

import React from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import { useDispatch} from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';

//========================== Import Modules End =============================

//============================= Login Component Start =============================

const CreateGenres = () => {

  //============================= dispatch Api Request =============================
  const dispatch = useDispatch();

  //============================= UseFormik =============================
  const formik = useFormik({
      //============================= Initial Values =============================
      initialValues: {
        title:"", description:"" 
      },
      validationSchema: Yup.object().shape({
        title: Yup.string()
          .min(2, 'Too Short!')
          .max(100, 'Too Long!')
          .required('Required'), 
        description: Yup.string()
          .min(5, 'Too Short!')
          .max(255, 'Too Long!')
          .required('Required'),  
      }),
      onSubmit: (values) => {
        
      }
  })
  return (
    <div>
        <div class="login-page">
            <div className="header_div">
              <h1>Login Form</h1>
            </div> 
            <div class="form">
              <form class="login-form" onSubmit={formik.handleSubmit}>

              <input {...formik.getFieldProps("title")} value={formik.values.title}  name="title" type="text" placeholder="title"/>
              {formik.errors.title && formik.touched.title ? (
                <div className = "error">{formik.errors.title}</div>
              ) : null}

              <TextareaAutosize
                maxRows={5}
                aria-label="maximum height"
                placeholder="description"
                style={{ width: 350 }}
                {...formik.getFieldProps("description")} value={formik.values.description}  name="description"
              />
              
              {formik.errors.description && formik.touched.description ? (
                <div className = "error">{formik.errors.description}</div>
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

export default CreateGenres;

//============================= Export Default End =============================