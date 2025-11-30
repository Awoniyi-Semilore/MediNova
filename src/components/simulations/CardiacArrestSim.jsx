import React, { useState, useEffect } from 'react';

// === CRITICAL: VIDEO URL CHECK ===
// This URL MUST be correct and the video MUST be publicly embeddable on Vimeo.
// Note: I have kept your provided URL.
const SIM_VIDEO_URL = "https://player.vimeo.com/video/1141231294"; 

// Renamed prop from 'onNavigate' to 'onVideoEnd' to reflect its purpose in this context
const CardiacArrestSim = ({ onVideoEnd }) => {
    const [videoError, setVideoError] = useState(false);
    const [videoFinished, setVideoFinished] = useState(false);

    // This function is called by the button to proceed to the main simulation
    const startSimulation = () => {
        onVideoEnd();
    };

    // Use a timer to presume the video is finished after a set duration
    useEffect(() => {
        // IMPORTANT: Adjust this duration (in seconds) to match your video's actual length!
        const videoDurationGuessSeconds = 60; // 60 seconds

        if (!videoError) {
            const timer = setTimeout(() => {
                setVideoFinished(true);
            }, videoDurationGuessSeconds * 1000); 

            return () => clearTimeout(timer);
        }
    }, [videoError]);

    // Note: Checking for iframe load error is unreliable, this is mostly a placeholder/visual cue
    const handleVideoError = () => {
        // setVideoError(true); // Uncomment if you want to aggressively catch load issues
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 space-y-4">
                <h1 className="text-3xl font-bold text-indigo-700 text-center">
                    Simulation 1: Cardiac Arrest Recognition - Video Brief
                </h1>

                {videoError && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
                        <strong>Embed Error!</strong> The video link is broken or restricted. Please ensure the 
                        <code className="text-sm font-mono bg-gray-200 p-1 rounded">SIM_VIDEO_URL</code> 
                        is set to the correct public Vimeo embed URL and that your Vimeo privacy settings allow embedding.
                    </div>
                )}

                {/* Responsive Iframe Container (for Vimeo) */}
                <div className="relative w-full overflow-hidden rounded-lg shadow-xl" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                    <iframe
                        // Autoplay is requested here
                        src={`${SIM_VIDEO_URL}?autoplay=1&loop=0&byline=0&title=0&portrait=0`} 
                        allow="autoplay; fullscreen; picture-in-picture"
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        frameBorder="0"
                        allowFullScreen
                        title="Simulation Introduction Video"
                        onLoad={handleVideoError}
                    ></iframe>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={startSimulation}
                        className={`px-6 py-2 font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105 ${
                            videoFinished || videoError ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-red-500 text-white opacity-70 cursor-not-allowed'
                        }`}
                        disabled={!videoFinished && !videoError}
                    >
                        {videoError ? 'Start Simulation Anyway' : 'Continue to Simulation'} &rarr;
                    </button>
                </div>

                {!videoFinished && !videoError && (
                    <p className="text-center text-sm text-gray-500">
                        (The button will activate automatically after the estimated video duration, or if there is an embed error.)
                    </p>
                )}
            </div>
        </div>
    );
};

// Exporting the component with the original name for the import
export default CardiacArrestSim;