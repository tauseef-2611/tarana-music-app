import React from 'react';
import GetMusicByCategory from './GetMusicByCategory';
import RecentlyAddedCarousel from './RecentlyAddedCarousel';
import './style.css';
import MusicSearch from './MusicSearch';
import Categories from './Categories';
import PLayListItem from './PlayListItem';
import Poets from './Poets';
import Artist from './Artist';

function Explore() {
  return (
    <div> 
        <Categories />
        
        <Poets/>
        <Artist/>
        <PLayListItem/>
        <div className='space'
        style={{height:'200px'}}
        ></div>
    </div>
  )
}

export default Explore