import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getAllArtists} from '../Actions/actions';
import queryString from "query-string";
import {NavLink} from 'react-router-dom';

const ArtistPage = () => {

  const dispatch = useDispatch();

  const Artists = useSelector(state => state.Artists);
  const User = useSelector(state => state.User);

  //============================= Get Edited User Id =============================
  const {id} = queryString.parse(window.location.search);

  useEffect(() => {
    dispatch(getAllArtists(""))
  },[dispatch]);

  return (
    <>
        <div className='header_div'>
            <h1>ArtistPage</h1>
        </div>
        <div className='main_div'>
          {
            Artists && Artists.map(artist => {
              return(
                <>
                  {
                    artist._id === id ? (
                      <>
                      <div className='profile'>
                        <label>Username</label>
                        <p>{artist.username}</p>
                        <label>Bio</label>
                        <p>{artist.bio}</p>
                        <label>PlayList</label>
                        {
                          artist.NFT.map((file) => {
                            return (
                              <>
                                <div className='playListCard'>
                                  <img src={file.coverImage} alt="Cover Image" />
                                  <h6>{file.title}</h6>
                                  <h6>{file.description}</h6>
                                </div>
                              </>
                            )
                          })
                        }
                        {
                          User.role === "Artist" && User._id === artist._id ? (
                            <>
                              <NavLink to={`/EditArtist/:?id=${artist._id}`}><button>Edit</button></NavLink>
                            </>
                          ) : null
                        }
                      </div>
                      </>
                    ) : null
                  }
                </>
              )
            })
          }
      </div>
    </>
  )
}

export default ArtistPage;