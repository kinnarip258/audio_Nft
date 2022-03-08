import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {deleteGenres, getAllGenres} from '../Actions/actions';
import Pagination from '@mui/material/Pagination';
import {NavLink} from 'react-router-dom';

const Genres = () => {

  const dispatch = useDispatch();

  const Genres = useSelector(state => state.Genres);
  const GenresPage = useSelector(state => state.GenresPage);
  const User = useSelector(state => state.User);
  const Toggle = useSelector(state => state.Toggle);
  const [pageNumber, setPageNumber] = useState(1);


  const handleDelete = (id) => {
    dispatch(deleteGenres(id))
  }

  useEffect(() => {
    dispatch(getAllGenres(pageNumber))
  }, [dispatch, pageNumber, Toggle]);
  
  return (
    <>
    <div className='header_div'>
      <h1>Genres</h1>
    </div>
    <div >
      {
        Genres && Genres.map(genres => {
          return(
            <>
              <div className='genres'>
                <h1>{genres.title}</h1>
                <p>{genres.description}</p>

                {
                  User.role === "Admin" ? (
                    <>
                      <NavLink to='/dashboard'><button>Edit</button></NavLink>
                      <button onClick={() => handleDelete(genres._id)}>Delete</button>
                    </>
                  ) : null
                }
              </div>
            </>
          )
        })
      }
    </div>
    <div className="pagination2">
      <Pagination count={GenresPage} variant="outlined" color="secondary" onChange={(e, value) =>  {
        setPageNumber(value) }}/>  
    </div>
    
    </>

  )
}

export default Genres