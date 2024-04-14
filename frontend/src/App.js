// src/App.js

import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import RecentlyAddedCarousel from './components/RecentlyAddedCarousel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './components/style.css';
import Logo from './logo-top.png';
import Home from './components/Home';
import GetMusicByCategory from './components/GetMusicByCategory';
import BottomNavigation from './components/BottomNavigation';
import MusicSearch from './components/MusicSearch';
import Categories from './components/Categories';
import Explore from './components/Explore';
import { useParams } from 'react-router-dom';
import GetMusicByPlaylist from './components/GetMusicByPlaylist';
import GetMusicByPoet from './components/GetMusicByPoet';
import GetMusicByArtist from './components/GetMusicByArtist';


function App() {
  return (
    <div className="main">
      <Router>
      <header>
          <div className="options">
            <button><i className="fas fa-bars"></i></button>
          </div>
          <div className="logo">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="search">
            <button><i className="fas fa-search"></i></button>
          </div>
        </header>
        
        
        <Routes>
          <Route path="/musicplayer/:id" element={<MusicPlayer />} />
          <Route
            path="/category/:category"
            element={<GetMusicByCategory />}
          />
          <Route
            path="/poet/:poet"
            element={<GetMusicByPoet />}
          />
          <Route
            path="/artist/:artist"
            element={<GetMusicByArtist />}
          />
          <Route path="/search/:term" element={<MusicSearch />} />
          <Route path="/" element={<Home />} />
          <Route path="/recentlyadded" element={<RecentlyAddedCarousel />} />
          {/* <Route path="/playlistplayer/:id" element={<PPlayer />} /> */}
          <Route
            path="/playlist/:id"
            element={<GetMusicByPlaylist/>}
          />
          <Route path="/search" element={<MusicSearch />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>

        <BottomNavigation/>
      </Router>
    </div>
  );
}

export default App;
