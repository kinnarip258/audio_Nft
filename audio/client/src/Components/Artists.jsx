import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllArtists} from '../Actions/actions';
import Pagination from '@mui/material/Pagination';
import {NavLink} from 'react-router-dom';
import debounce from "lodash.debounce";

const Artists = () => {

  const dispatch = useDispatch();

  const Artists = useSelector(state => state.Artists);
  const User = useSelector(state => state.User);
  const ArtistPage = useSelector(state => state.ArtistPage);

  //============================= UseStates =============================
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  //============================= Handle Search =============================
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  //============================= Optimise Search Employee =============================
  const optimiseVersion = debounce(handleSearch, [500])


  useEffect(() => {
    dispatch(getAllArtists(pageNumber, search))
  }, [dispatch, pageNumber, search]);
  
  return (
    <>
      <div className='header_div'>
        <h1>Artists</h1>
      </div>

      <div className='search'>
        <input name='search' placeholder='Search Artists...' onKeyUp={optimiseVersion}/>
      </div>
      <div>
        {
          Artists && Artists.map(artist => {
            return(
              <>
                  <div className="artist">
                    <label>Username</label>
                    <p>{artist.username}</p>
                    <label>Bio</label>
                    <p>{artist.bio}</p>
                    <label>Genres</label>
                    <div>
                    {
                      artist.genres.map((genres) => {
                        return(
                          <>
                          <td>{genres}</td>
                          </>
                        )
                      })
                    }
                    </div>
                    <div><NavLink to={`/artist/:?id=${artist._id}`}>view Profile</NavLink></div>
                    {
                      User.role === "Artist" && User._id === artist._id ? (
                        <>
                          <NavLink to={`/EditArtist/:?id=${artist._id}`}><button>Edit</button></NavLink>
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
      <Pagination count={ArtistPage} variant="outlined" color="primary" onChange={(e, value) =>  {
        setPageNumber(value) }}/>  
    </div>
    </>
  )
}

export default Artists