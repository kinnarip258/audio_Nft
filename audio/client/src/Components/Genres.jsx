import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {deleteGenres, getAllGenres} from '../Actions/actions';
import Pagination from '@mui/material/Pagination';
import {NavLink} from 'react-router-dom';
import debounce from "lodash.debounce";

const Genres = () => {

  const dispatch = useDispatch();

  const Genres = useSelector(state => state.Genres);
  const GenresPage = useSelector(state => state.GenresPage);
  const User = useSelector(state => state.User);
  const Toggle = useSelector(state => state.Toggle);

  //============================= UseStates =============================
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);


  //============================= Handle Search =============================
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  //============================= Optimise Search Employee =============================
  const optimiseVersion = debounce(handleSearch, [500])

  
  const handleDelete = (id) => {
    dispatch(deleteGenres(id))
  }

  useEffect(() => {
    dispatch(getAllGenres(pageNumber, search))
  }, [dispatch, pageNumber, Toggle, search]);
 
  return (
    <>
    <div className='header_div'>
      <h1>Genres</h1>
    </div>
    <div className='search'>
      <input name='search' placeholder='Search Genres...' onKeyUp={optimiseVersion}/>
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
                      <NavLink to={`/EditGenres/:?id=${genres._id}`}><button>Edit</button></NavLink>
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
      <Pagination count={GenresPage} variant="outlined" color="primary" onChange={(e, value) =>  {
        setPageNumber(value) }}/>  
    </div>
    
    </>

  )
}

export default Genres