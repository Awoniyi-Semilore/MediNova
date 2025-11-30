import React, { useRef } from 'react';

// IMPORTANT: This component assumes that the videoSource prop passed to it 
// is the correct URL where the browser can access the video file.

const VideoPlayer = ({ videoSource, onVideoEnd }) => {
    const videoRef = useRef(null);

    // This function handles the video ending
    const handleVideoEnded = () => {
        onVideoEnd();
    };

    // This function handles the manual 'Skip' button
    const handleSkip = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        onVideoEnd();
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 space-y-4">
                <h1 className="text-3xl font-bold text-indigo-700 text-center">
                    Simulation 1: Cardiac Arrest Recognition - Video Brief
                </h1>

                {/* Video Container */}
                <div className="relative w-full overflow-hidden rounded-lg shadow-xl" style={{ paddingTop: '56.25%' }}> 
                    <video
                        ref={videoRef}
                        src={videoSource}
                        onEnded={handleVideoEnded}
                        controls // Show standard video controls (play, pause, volume)
                        autoPlay // Attempt to autoplay (browser permission permitting)
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        // Note: The M2TS format is highly unreliable in a browser. 
                        // You should convert 'Cardiac Arrest.m2ts' to a standard format like .mp4, .webm, or .ogg.
                    >
                        Your browser does not support the video tag. Please check the video format or path.
                    </video>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSkip}
                        className="px-6 py-2 font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105 bg-red-600 hover:bg-red-700 text-white"
                    >
                        Skip Video &rarr;
                    </button>
                </div>

                <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-center text-sm">
                    <strong>Note:</strong> The video file extension <code>.m2ts</code> is not reliably supported by web browsers. If the video does not play, please **convert your "Cardiac Arrest.m2ts" file to a widely supported format like `.mp4`** and update the file on your server.
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;