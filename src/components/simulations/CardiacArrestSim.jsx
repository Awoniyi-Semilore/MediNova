import React, { useState, useEffect } from 'react';

// IMPORTANT: Replace this placeholder URL with the actual URL of your hosted video file.
// Remember, GitHub is not ideal for video hosting; use YouTube, Vimeo, or a CDN.
const SIM_VIDEO_URL = "https://your-hosted-video-platform.com/path/to/sim_intro.mp4";

const CardiacArrestSim = ({ onNavigate }) => {
    const [showVideo, setShowVideo] = useState(true);
    const [videoError, setVideoError] = useState(false);

    const startSimulation = () => {
        setShowVideo(false);
    };

    const handleVideoError = (e) => {
        console.error("Video load failed:", e.target.error);
        setVideoError(true);
        // Do NOT automatically start the simulation on error, 
        // give the user a chance to read the error message and press the button.
    };

    if (showVideo) {
        return (
            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-6 space-y-4">
                    <h1 className="text-3xl font-bold text-indigo-700 text-center">
                        Simulation 1: Cardiac Arrest Recognition - Video Brief
                    </h1>
                    
                    {videoError && (
                        <div className="p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-center">
                            <strong>Video Error!</strong> The video could not be loaded. Please ensure the 
                            <code className="text-sm font-mono bg-gray-200 p-1 rounded">SIM_VIDEO_URL</code> 
                            is correct and try to start the simulation manually.
                        </div>
                    )}
                    
                    {/* Responsive Video Container */}
                    <div className="relative w-full overflow-hidden rounded-lg shadow-xl">
                        <video 
                            src={SIM_VIDEO_URL} 
                            controls 
                            autoPlay 
                            className="w-full h-auto"
                            onEnded={startSimulation} // Automatically start the sim when video finishes
                            onError={handleVideoError} // Use the new error handler
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={startSimulation}
                            className={`px-6 py-2 font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105 ${
                                videoError ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                            }`}
                        >
                            {videoError ? 'Start Simulation Anyway' : 'Skip Video and Start Simulation'} &rarr;
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // --- Start of the actual Simulation content (when showVideo is false) ---
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex justify-between items-center pb-4 border-b-2 border-indigo-200">
                <h1 className="text-4xl font-bold text-indigo-800">Cardiac Arrest Simulation 1</h1>
                <button 
                    onClick={() => onNavigate('home')}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                >
                    End Simulation
                </button>
            </header>
            
            <main className="mt-6">
                <p className="text-lg">
                    **SCENARIO:** You are the primary nurse responding to a collapse in the waiting room.
                </p>
                {/* Add your full simulation content, logic, and interaction controls here. 
                    This is where the user will check for pulse, call the code, and start CPR.
                */}
                <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                    <h2 className="text-2xl font-semibold mb-3">Patient Status (Monitor Display)</h2>
                    <p>Patient appears unresponsive. What is your first action?</p>
                    {/* Placeholder for simulation controls */}
                    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Check Responsiveness (Shake & Shout)
                    </button>
                </div>

                <button 
                    onClick={() => onNavigate('doc1')}
                    className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition"
                >
                    [DEV ONLY] Go to Review Documentation &rarr;
                </button>
            </main>
        </div>
    );
};

export default CardiacArrestSim;