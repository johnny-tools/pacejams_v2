import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/sidebar/sidebar';
import { setClientToken } from '../../features/searchapi/spotifyUserAuth';
import Login from '../auth/login';
import SearchTempoNew from '../../features/searchapi/SearchTempoNew';
import GetStarted from '../GetStarted';
import Player from '../player/player';
import './home.css';

export default function Home() {
  const [token, setToken] = useState('');
  const [desiredTracks, setDesiredTracks] = useState([]);

  const updateDesiredTracks = (tracks) => {
    setDesiredTracks(tracks);
  };

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    const hash = window.location.hash;
    window.location.hash = '';
    if (!token && hash) {
      const _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <div>
      <Login />
    </div>
  ) : (
    <Router>
      <div className='main-body'>
        <Sidebar />
        <Routes>
          {/* <Route
            path='/SearchTempo'
            element={
              <SearchTempoNew updateDesiredTracks={updateDesiredTracks} />
            }
          /> */}
          <Route path='/' element={<GetStarted updateDesiredTracks={updateDesiredTracks} />} />
          <Route
            path='/player'
            element={<Player desiredTracks={desiredTracks} />}
          />
          
        </Routes>
      </div>
    </Router>
  );
}