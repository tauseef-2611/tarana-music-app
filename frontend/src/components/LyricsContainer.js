// src/components/LyricsContainer.js

import React from 'react';

const LyricsContainer = ({ musicDetails }) => {
  return (
    <div className="lyrics hidden">
      <h5 id="player-title">{musicDetails.Title}</h5>
      <pre id="player-description" style={{ whiteSpace: 'pre-wrap' }}>
        {musicDetails.Lyrics}
      </pre>
    </div>
  );
};

export default LyricsContainer;
