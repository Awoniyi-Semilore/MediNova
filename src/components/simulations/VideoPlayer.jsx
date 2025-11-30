import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoSource, onVideoEnd }) => {
    const [videoError, setVideoError] = useState(false);

    // Extract Vimeo video ID from URL
    const getVimeoId = (url) => {
        const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
        return match ? match[1] : null;
    };

    const vimeoId = getVimeoId(videoSource);

    const handleSkip = () => {
        onVideoEnd();
    };

    // Load Vimeo API script
    useEffect(() => {
        if (!vimeoId) {
            setVideoError(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://player.vimeo.com/api/player.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [vimeoId]);

    if (!vimeoId) {
        return (
            <div className="video-player-container">
                <div className="video-player-card">
                    <div className="video-error-message">
                        Invalid Vimeo URL provided.
                    </div>
                    <div className="video-player-actions">
                        <button
                            onClick={handleSkip}
                            className="start-simulation-btn"
                        >
                            Start Simulation &rarr;
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="video-player-container">
            <div className="video-player-card">
                <div className="video-player-header">
                    <h1>Simulation Briefing Video</h1>
                    <p>Watch the scenario briefing video to understand the situation</p>
                </div>
                
                <div className="video-player-content">
                    {/* Vimeo Video Container */}
                    <div className="video-wrapper">
                        <iframe 
                            src={`https://player.vimeo.com/video/${vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1`}
                            frameBorder="0" 
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin"
                            title="Cardiac Arrest"
                            onError={() => setVideoError(true)}
                        ></iframe>
                    </div>
                </div>

                <div className="video-player-actions">
                    <button
                        onClick={handleSkip}
                        className="start-simulation-btn"
                    >
                        Start Simulation &rarr;
                    </button>
                </div>

                {videoError && (
                    <div className="video-error-message">
                        <strong>Video Error:</strong> There was a problem loading the video. You can start the simulation anyway.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;