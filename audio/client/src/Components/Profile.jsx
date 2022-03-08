import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { adminProfile } from '../Actions/actions';


const Profile = () => {

  const User = useSelector(state => state.User);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminProfile());
  }, [dispatch])
  return (
    <>
      <div className='header_div'>
        <h1>Profile</h1>
      </div>
      {
        User && (
          <>
            <div className='main_div'>
              <div className='profile'>
                <label>FirstName</label>
                <p>{User.firstName}</p>
                <label>LastName</label>
                <p>{User.lastName}</p>
                <label>Email</label>
                <p>{User.email}</p>
                <label>Username</label>
                <p>{User.username}</p>

                <button>Edit</button>
              </div>
            </div>
          </>
        )
      }
    </>
  )
}

export default Profile