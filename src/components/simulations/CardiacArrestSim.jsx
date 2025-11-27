import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react'
import { auth } from './firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import Landing from './components/Landing'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Home from './components/Home'
import RespiratorySimulation from './components/simulations/RespiratorySimulation'
import CardiacSimulation from './components/simulations/CardiacSimulation'
import CardiacRhythmSimulation from './components/simulations/CardiacRhythmSimulation'
import CardiacAsystoleSimulation from './components/simulations/CardiacAsystoleSimulation'
import CardiacDocumentation from './components/simulations/CardiacDocumentation' // <-- NOW EXPLICITLY DEFINED
import RhythmDocumentation from './components/simulations/RhythmDocumentation'
import PostArrestDocumentation from './components/simulations/PostArrestDocumentation'
import './App.css'


// === FINAL VIDEO URL ===
// The Vimeo embed URL based on the ID provided by the user.
const SIM_VIDEO_URL = "https://player.vimeo.com/video/1141231294"; 

const CardiacArrestSim = ({ onNavigate }) => {
    const [showVideo, setShowVideo] = useState(true);
    const [videoError, setVideoError] = useState(false);
    
    // State to manage when the video is presumed finished
    const [videoFinished, setVideoFinished] = useState(false);

    const startSimulation = () => {
        setShowVideo(false);
    };

    // Note: Iframes don't directly report errors like a <video> tag does, 
    // but the error message helps the user know if the URL is bad.
    const handleVideoError = () => {
        setVideoError(true);
    };

    // Use a timer to suggest the video is finished (Vimeo doesn't give a simple 'onEnded' event to React)
    // IMPORTANT: You might need to adjust the duration here (in seconds) to match your video's actual length.
    useEffect(() => {
        const videoDurationGuessSeconds = 60; // Assumed duration (e.g., 60 seconds)
        
        if (showVideo && !videoError) {
            const timer = setTimeout(() => {
                setVideoFinished(true);
            }, videoDurationGuessSeconds * 1000); 
            
            return () => clearTimeout(timer);
        }
    }, [showVideo, videoError]);


    if (showVideo) {
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
                    
                    {/* Responsive Iframe Container (for Vimeo/YouTube) */}
                    <div className="relative w-full overflow-hidden rounded-lg shadow-xl" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                        <iframe
                            // Added parameters for cleaner playback: autoplay, no loop, no user profile, no title, no portrait.
                            src={`${SIM_VIDEO_URL}?autoplay=1&loop=0&byline=0&title=0&portrait=0`} 
                            allow="autoplay; fullscreen; picture-in-picture"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            frameBorder="0"
                            allowFullScreen
                            title="Simulation Introduction Video"
                            onLoad={handleVideoError} // Check if the iframe loads (not a perfect error check, but better than nothing)
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
                            {videoError ? 'Start Simulation Anyway' : 'Skip/Continue to Simulation'} &rarr;
                        </button>
                    </div>
                    
                    {!videoFinished && !videoError && (
                        <p className="text-center text-sm text-gray-500">
                            (Button will activate after the estimated video duration or if you manually click skip.)
                        </p>
                    )}
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