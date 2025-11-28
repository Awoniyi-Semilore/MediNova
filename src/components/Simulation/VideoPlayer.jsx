import React from 'react';

function VideoPlayer({ vimeoUrl, onVideoEnd, onSkip }) {
  return (
    <div className="video-container">
      <div className="video-header">
        <button className="skip-btn" onClick={onSkip}>
          Skip to Content
        </button>
      </div>
      
      <div className="video-wrapper">
        <div style={{padding:'56.25% 0 0 0', position:'relative'}}>
          <iframe 
            src={vimeoUrl} 
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            style={{position:'absolute', top:0, left:0, width:'100%', height:'100%'}}
            title="Simulation Video"
            onEnded={onVideoEnd}
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </div>
  );
}

export default VideoPlayer;