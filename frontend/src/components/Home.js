import React from 'react';
import GetMusicByCategory from './GetMusicByCategory';
import RecentlyAddedCarousel from './RecentlyAddedCarousel';
import './style.css';
import MusicSearch from './MusicSearch';
import MostPlayed from './MostPlayed';

function Home() {
  return (
    <div> 
        <RecentlyAddedCarousel />
        <MostPlayed />
             {/* <GetMusicByCategory category="Arabic Nasheed" /> */}
             {/* <MusicSearch /> */}
    </div>
  )
}

export default Home