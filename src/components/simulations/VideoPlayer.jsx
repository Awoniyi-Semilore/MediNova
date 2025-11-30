import React, { useState } from 'react';

const VideoPlayer = ({ videoSource, onVideoEnd }) => {
    const [videoError, setVideoError] = useState(false);
    const [videoFinished, setVideoFinished] = useState(false);

    // Check if the source is a Vimeo URL
    const isVimeoLink = videoSource.includes('vimeo.com');
    
    // Extract Vimeo video ID from URL
    const getVimeoId = (url) => {
        const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-9]+)/);
        return match ? match[1] : null;
    };

    const vimeoId = isVimeoLink ? getVimeoId(videoSource) : null;

    const handleSkip = () => {
        onVideoEnd();
    };

    // For Vimeo, we can't easily detect when the video ends, 
    // so we'll rely on the skip button or a timer
    React.useEffect(() => {
        if (isVimeoLink && !videoError) {
            // Set a timer to auto-advance after estimated video duration
            const timer = setTimeout(() => {
                setVideoFinished(true);
            }, 60000); // 60 seconds - adjust based on your video length
            
            return () => clearTimeout(timer);
        }
    }, [isVimeoLink, videoError]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 space-y-4">
                <h1 className="text-3xl font-bold text-indigo-700 text-center">
                    Simulation 1: Cardiac Arrest Recognition - Video Brief
                </h1>

                {/* Video Container */}
                <div className="relative w-full overflow-hidden rounded-lg shadow-xl" style={{ paddingTop: '56.25%' }}>
                    {isVimeoLink && vimeoId ? (
                        <iframe
                            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title="Simulation Introduction Video"
                            onError={() => setVideoError(true)}
                        ></iframe>
                    ) : (
                        // Fallback for local videos
                        <video
                            src={videoSource}
                            onEnded={onVideoEnd}
                            controls
                            autoPlay
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            onError={() => setVideoError(true)}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={handleSkip}
                        className={`px-6 py-2 font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105 ${
                            videoFinished || videoError ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                    >
                        {videoError ? 'Continue Anyway' : 'Skip Video'} &rarr;
                    </button>
                </div>

                {!videoFinished && !videoError && isVimeoLink && (
                    <div className="p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg text-center text-sm">
                        <strong>Video Playing:</strong> The button will activate automatically after the estimated video duration, or you can skip anytime.
                    </div>
                )}

                {videoError && (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm">
                        <strong>Video Error:</strong> There was a problem loading the video. You can continue to the simulation.
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoPlayer;