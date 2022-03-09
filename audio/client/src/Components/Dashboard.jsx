import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {getCountArtistGenres} from '../Actions/actions';


const Dashboard = () => {

  const dispatch = useDispatch();

  const ArtistCount = useSelector(state => state.ArtistCount);
  const GenresCount = useSelector(state => state.GenresCount);

  useEffect(() => {
    dispatch(getCountArtistGenres());
  }, [dispatch]);

  return (
    <>
      <div className='main_div'>
        <h1>Dashboard</h1>
      </div>
      <div className='mainCard'>
          <div className='countCard'>
            <h1>Artist</h1>
            <h3>{ArtistCount}</h3>
          </div>
          <div className='countCard'>
            <h1>Genres</h1>
            <h3>{GenresCount}</h3>
          </div>
      </div>
    </>
  )
}

export default Dashboard