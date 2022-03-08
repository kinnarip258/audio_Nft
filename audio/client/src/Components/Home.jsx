import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {playList} from '../Actions/actions';

const Home = () => {

  const dispatch = useDispatch();

  const Playlist = useSelector(state => state.Playlist);
  
  useEffect(() => {
    dispatch(playList())
  }, [dispatch])

  return (
    <>
      <div className='header_div'>
        <h1>Home</h1>
      </div>
      <div>
        {
          Playlist && Playlist.map(ele => {
            return(
              <>
                <div className='mainBlog'>
                  <img src={ele.NFT.coverImage} alt='Cover Image' />
                  <p>{ele.NFT.title}</p>
                  <p>By {ele.username}</p>
                </div>
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default Home;