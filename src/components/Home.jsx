import React from 'react';

const Home = ({ onNavigate }) => {
    // Mock user information for a friendly welcome
    const userName = "Nurse"; 

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <header className="w-full max-w-4xl py-6 border-b border-indigo-200">
                <h1 className="text-4xl font-bold text-indigo-800 text-center">MediNova Simulation Platform</h1>
            </header>

            <main className="w-full max-w-4xl mt-10 p-8 bg-white rounded-xl shadow-2xl space-y-8">
                <h2 className="text-3xl font-semibold text-gray-700 text-center">
                    Welcome back, {userName}!
                </h2>

                <p className="text-lg text-gray-600 text-center">
                    Select a training scenario below to begin your medical simulation practice.
                </p>

                {/* Simulation Link Block - This is the component you need to click to see the video */}
                <div className="border-4 border-indigo-300 rounded-lg p-6 hover:shadow-xl transition duration-300 transform hover:scale-[1.02] cursor-pointer"
                     onClick={() => onNavigate('simulation1')}>
                    
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-indigo-600">
                                Simulation 1: Cardiac Arrest Recognition
                            </h3>
                            <p className="text-md text-gray-500 mt-1">
                                A video briefing on the scenario is ready. You may skip the video if you feel prepared.
                            </p>
                        </div>
                        
                        <button
                            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition"
                        >
                            Skip Video & Start Simulation &rarr;
                        </button>
                    </div>
                </div>

                {/* Placeholder for other Simulations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h4 className="font-semibold text-gray-700">Respiratory Simulation</h4>
                        <p className="text-sm text-gray-500">Practice airway management and ventilation.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <h4 className="font-semibold text-gray-700">Rhythm Analysis</h4>
                        <p className="text-sm text-gray-500">Identify and treat common ECG rhythms.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;