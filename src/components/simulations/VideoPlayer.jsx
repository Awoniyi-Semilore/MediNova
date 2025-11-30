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
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 space-y-4">
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                        Invalid Vimeo URL provided.
                    </div>
                    <button
                        onClick={handleSkip}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Start Simulation &rarr;
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 space-y-4">
                <h1 className="text-3xl font-bold text-indigo-700 text-center">
                    Simulation Briefing Video
                </h1>

                <p className="text-center text-gray-600">
                    Watch the scenario briefing video to understand the situation.
                </p>

                {/* Vimeo Video Container */}
                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                    <iframe 
                        src={`https://player.vimeo.com/video/${vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1`}
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        title="Cardiac Arrest"
                        onError={() => setVideoError(true)}
                    ></iframe>
                </div>

                <div className="flex justify-center space-x-4">
                    <button
                        onClick={handleSkip}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                    >
                        Start Simulation &rarr;
                    </button>
                </div>

                {videoError && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm">
                        <strong>Video Error:</strong> There was a problem loading the video. You can start the simulation anyway.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;