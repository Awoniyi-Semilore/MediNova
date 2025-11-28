import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
// Removed: import { HeartPulse, LogOut, FileText, Lungs } from 'lucide-react';

// --- Inline SVG Icons ---

const LogOutIcon = ({ size = 16, className = 'mr-1' }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
);

const HeartPulseIcon = ({ size = 30, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        <path d="M3.23 15.65A10.87 10.87 0 0 1 12 20.55V14h4.5a3.5 3.5 0 1 1 0 7H21"/>
    </svg>
);

const LungsIcon = ({ size = 30, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M14 16h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2z"/>
        <path d="M10 14h4"/>
        <path d="M12 10v4"/>
        <path d="M20 10v4a8 8 0 0 1-8 8v0a8 8 0 0 1-8-8v-4"/>
        <path d="M10 3.6c.92-.81 2.5-.81 3.42 0A2 2 0 0 1 14 5v2.85a.73.73 0 0 0 0 .3c.92.81 2.5.81 3.42 0A2 2 0 0 0 18 5v2.85a.73.73 0 0 0 0 .3c.92.81 2.5.81 3.42 0"/>
        <path d="M4 7.85a.73.73 0 0 0 0-.3c-.92-.81-2.5-.81-3.42 0A2 2 0 0 0 0 5v2.85a.73.73 0 0 0 0 .3c-.92.81-2.5.81-3.42 0"/>
    </svg>
);

// FileTextIcon is now unused but kept for completeness, 
// though it will be removed in the final render logic.
const FileTextIcon = ({ size = 30, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="M10 9H8"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
    </svg>
);

// --- Home Component ---

const Home = ({ user, onNavigate }) => {
    
    // Function to handle sign out
    const handleSignOut = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // User ID display for collaborative context
    const displayUserId = user?.uid || "Guest (Not Authenticated)";

    // Simulation Card Component
    const SimulationCard = ({ title, description, icon: Icon, color, route }) => (
        <div 
            className={`bg-white p-6 rounded-xl shadow-lg border-l-8 border-${color}-500 transition duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer`}
            onClick={() => onNavigate(route)}
        >
            <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
                    {/* Using the passed Icon component */}
                    <Icon size={30} /> 
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <header className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    {/* Using the inline SVG */}
                    <HeartPulseIcon className="text-red-500 mr-2" size={30} /> 
                    MediNova Training Dashboard
                </h1>
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600 hidden sm:block">
                        User ID: <span className="font-mono text-xs bg-gray-200 p-1 rounded">{displayUserId}</span>
                    </span>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-150 shadow-md"
                    >
                        {/* Using the inline SVG */}
                        <LogOutIcon size={16} className="mr-1" /> Log Out
                    </button>
                </div>
            </header>

            <main>
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Simulation Modules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Cardiac Arrest Recognition & Management Flow Start (Links to Video Briefing) */}
                    <SimulationCard
                        title="Cardiac Arrest (ACLS)"
                        description="Identify and manage a patient in pulseless cardiac arrest (PEA/Asystole and VF/pVT)."
                        icon={HeartPulseIcon} // Icon used
                        color="red"
                        route="cardiac-video-briefing" 
                    />
                    
                    {/* Respiratory Simulation */}
                    <SimulationCard
                        title="Respiratory Failure"
                        description="Assess and manage acute respiratory distress and failure scenarios."
                        icon={LungsIcon} // Icon used
                        color="blue"
                        route="respiratory-simulation"
                    />

                    {/* Documentation Review (Previously here, now removed) */}
                </div>
            </main>
        </div>
    );
};

export default Home;