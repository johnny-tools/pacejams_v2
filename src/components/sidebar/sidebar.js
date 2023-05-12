import React, { useState, useEffect } from 'react';
import './sidebar.css';
import SidebarButton from './sidebarButton';
import { MdFavorite, MdSpaceDashboard } from 'react-icons/md';
import { FaGripfire, FaPlay, FaSignOutAlt } from 'react-icons/fa';
import { IoLibrary } from 'react-icons/io5';
import apiClient from '../../features/searchapi/spotifyUserAuth';

export default function Sidebar() {
  const [image, setImage] = useState(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU'
  );
  useEffect(() => {
    apiClient.get('me').then((response) => {
      // console.log(response);
      setImage(response.data.images[0].url);
    });
  }, []);
  return (
    <div className='sidebar-container'>
      <img src={image} className='profile-img' alt='profile' />
      <div>
        <SidebarButton title='PACE' to='/getstarted' icon={<FaGripfire />} />
        <SidebarButton title='JAMS' to='/' icon={<MdSpaceDashboard />} />
        <SidebarButton title='PLAYER' to='/player' icon={<FaPlay />} />
        <SidebarButton
          title='MyPlaylists'
          to='/myPlaylists'
          icon={<IoLibrary />}
        />
      </div>
      <SidebarButton title='Sign Out' to='' icon={<FaSignOutAlt />} />
    </div>
  );
}
