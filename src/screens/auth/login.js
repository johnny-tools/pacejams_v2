import React from 'react';
import Header from '../../components/Header';
import { loginEndpoint } from '../../features/searchapi/spotifyUserAuth';
import './login.css';

export default function Login() {
  return (
    <div>
      <Header />
      <div className='login-page'>
        <img
          src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png'
          alt='logo-spotify'
          className='logo'
        />
        <a href={loginEndpoint}>
          <div className='login-btn'>LOG IN</div>
        </a>
      </div>
    </div>
  );
}
