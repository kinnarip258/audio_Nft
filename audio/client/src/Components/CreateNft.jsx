import React, { useState , useEffect} from 'react'
import {useFormik} from "formik";
import * as Yup from 'yup';
import { useDispatch, useSelector} from 'react-redux';
import {createNft, loading, uploadAudioFile, uploadCoverImg} from '../Actions/actions';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {useHistory} from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const CreateNft = () => {

    //============================= dispatch Api Request =============================
    const dispatch = useDispatch();

    const history = useHistory();


    const User = useSelector(state => state.User);
    const AudioFile = useSelector(state => state.AudioFile);
    const CoverImg = useSelector(state => state.CoverImg);
    const Toggle = useSelector(state => state.Toggle);
    const Loading = useSelector(state => state.Loading);
   
    const [values, setValues] = useState('');
    const [audio, setAudio] = useState('');
    const [image, setImage] = useState('');

    const userId = User._id;

    //============================= UseFormik =============================
    const formik = useFormik({
      //============================= Initial Values =============================
      initialValues: {
        title:"", description:"" , price:""
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
        price: Yup.string()
            .min(5, 'Too Short!')
            .max(255, 'Too Long!')
            .required('Required'),
      }),
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append('audio', audio[0]);
        setValues(values);
        dispatch(loading());
        dispatch(uploadAudioFile(formData));
      }
    })

    useEffect(() => {
      if(AudioFile.length !== 0) {
        console.log("run");
        const formData = new FormData();
        formData.append('image', image[0]);
        dispatch(uploadCoverImg(formData));
      }   
    },[AudioFile]);

    useEffect(() => {
      if(AudioFile.length !== 0 && CoverImg.length !== 0){
        dispatch(createNft(userId, values, AudioFile, CoverImg));
        setValues('')
      }
    }, [AudioFile, CoverImg]);

    useEffect(() => {
      if(Toggle === true){
        history.push('/dashboard');
      }
    })
  return (
    <>
        {
          Loading ? (<> 
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box></>) : null
        }
        <div class="login-page">
            <div className="header_div">
              <h1>Create NFT</h1>
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
                <br/>
                <br/>
              <label>CoverImage</label>
              <input  name="coverImg" type="file" placeholder="coverImg" onChange={(e) => setImage(e.target.files)}/>
              {formik.errors.coverImg && formik.touched.coverImg ? (
                <div className = "error">{formik.errors.coverImg}</div>
              ) : null}

              <label>AudioFile</label>
              <input name="audioFile" type="file" placeholder="audioFile" onChange = {(e) => setAudio(e.target.files)} />
              {formik.errors.audioFile && formik.touched.audioFile ? (
                <div className = "error">{formik.errors.audioFile}</div>
              ) : null}

              <input {...formik.getFieldProps("price")} value={formik.values.price}  name="price" type="number" placeholder="price"/>
              {formik.errors.price && formik.touched.price ? (
                <div className = "error">{formik.errors.price}</div>
              ) : null}
              
              {
                Loading ? null : <button type="submit">Submit</button>
              }
              </form>
            </div>
        </div>
    </>
  )
}

export default CreateNft;