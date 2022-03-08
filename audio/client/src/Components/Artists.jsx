import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllArtists} from '../Actions/actions';
import Pagination from '@mui/material/Pagination';

const Artists = () => {

  const dispatch = useDispatch();

  const Artists = useSelector(state => state.Artists);

  const ArtistPage = useSelector(state => state.ArtistPage);

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(getAllArtists(pageNumber))
  }, [dispatch, pageNumber]);
  
  return (
    <>
      <div className='header_div'>
        <h1>Artists</h1>
      </div>
      <div >
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
                </div>
              </>
            )
          })
        }
      </div>
      <div className="pagination2">
      <Pagination count={ArtistPage} variant="outlined" color="secondary" onChange={(e, value) =>  {
        setPageNumber(value) }}/>  
    </div>
    </>
  )
}

export default Artists