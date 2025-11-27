import React, { useState } from 'react';
// Removing imports that caused "Could not resolve" errors. 
// We must assume the 'auth' object and signOut function are passed as props 
// or are available from a higher-level context, or we must use placeholders 
// if they are not explicitly defined in the surrounding context.

// For the purpose of getting this component running, we will use mock/placeholder logic
// for external dependencies like Firebase and the ConfirmPopup.
// Assuming 'auth' and 'signOut' are available if the user had them previously.
// const auth = { /* placeholder */ }; 
// const signOut = async () => console.log("Mock sign out successful.");

// --- Inline ConfirmPopup Component ---
const ConfirmPopup = ({ show, title, message, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-center space-y-4">
        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">{title}</h3>
        <p className="text-gray-600">{message}</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
// -------------------------------------


const Home = ({ onNavigate, user, auth, signOut }) => { // Including auth and signOut in props for robustness
  const [showConfirm, setShowConfirm] = useState(false)

  // Use the provided sign out function (must be passed from parent)
  const handleLogout = async () => {
    try {
      // Check if the signOut function is available
      if (typeof signOut === 'function') {
        await signOut(auth); // Assuming auth is also passed
      } else {
        console.warn('Firebase signOut function is not available. Using mock logout.');
      }
      
      // Navigate to the login/landing page regardless of Firebase status
      if (onNavigate) {
          onNavigate('landing');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback navigation
      if (onNavigate) {
          onNavigate('landing');
      }
    }
  }

  // Logic for the Logo Click confirmation
  const handleLogoClick = () => {
    // Navigate straight to home view, removing the redundant confirmation step
    if (onNavigate) {
        onNavigate('home');
    }
  }

  // Handlers for the now inlined ConfirmPopup (used for leaving a simulation)
  const handleConfirmHome = () => {
    setShowConfirm(false)
    if (onNavigate) onNavigate('home')
  }

  const handleCancelHome = () => {
    setShowConfirm(false)
  }

  // Function to navigate to simulations (e.g., 'cardiac-simulation' or 'respiratory-simulation')
  const navigateToSimulation = (viewName) => {
    if (onNavigate) {
      // For Cardiac, we want to go to the video first (which is 'simulation1')
      if (viewName === 'cardiac-simulation') {
          onNavigate('simulation1'); 
      } else {
          onNavigate(viewName);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col items-center">
      
      {/* ConfirmPopup is now INLINE for robustness, waiting for the user to implement the logic for showing it. */}
      {/* Current logic for ConfirmPopup: when the user is in a simulation and clicks the logo, they are asked to confirm exit. */}
      <ConfirmPopup 
        show={showConfirm}
        title="Leave Simulation?"
        message="Are you sure you want to go back to home? Your progress in the current simulation will be saved."
        onConfirm={handleConfirmHome}
        onCancel={handleCancelHome}
      />
      
      {/* Header (Styled with Tailwind for professionalism) */}
      <header className="w-full max-w-5xl py-4 sm:py-6 bg-white shadow-md rounded-b-xl border-b-4 border-indigo-500 mb-8">
        <div className="flex justify-between items-center px-4 sm:px-6">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="text-3xl font-extrabold text-indigo-700">⚕️</div>
            <h1 className="text-2xl font-extrabold text-gray-800 hidden sm:block">MediNova</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm sm:text-base text-gray-600">
              Welcome, <span className="font-semibold text-indigo-600">{user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Medic'}!</span>
            </div>
            <button 
              className="px-3 py-1 sm:px-4 sm:py-2 bg-red-500 text-white text-sm font-semibold rounded-full shadow-md hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl p-6 sm:p-8 bg-white rounded-xl shadow-2xl space-y-8">
        <section className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Emergency Medicine Training Center</h2>
          <p className="text-lg text-gray-500 mt-2">Practice real medical scenarios in a safe, interactive environment</p>
        </section>

        {/* Scenarios Header */}
        <div className="border-b pb-4">
          <h3 className="text-2xl font-semibold text-gray-700">Choose Your Training Scenario</h3>
          <p className="text-md text-gray-500">Select an emergency scenario to test your medical response skills</p>
        </div>

        {/* Emergency Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Cardiac Emergency (Now linked to 'simulation1' view for the video) */}
          <div 
            className="p-6 rounded-xl shadow-lg border-t-8 border-red-600 bg-red-50 hover:shadow-xl transition transform hover:scale-[1.01] cursor-pointer"
            onClick={() => navigateToSimulation('cardiac-simulation')}
          >
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-red-700 bg-red-200 px-3 py-1 rounded-full">URGENT CARE</span>
                <span className="text-3xl">🫀</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800">Code Blue: Cardiac Arrest</h4>
            <p className="text-gray-600 mt-1 mb-3 text-sm">
              Manage VF/Pulseless VT following ACLS protocols. **Starts with Video Briefing.**
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Rhythm Recognition, CPR Monitoring, Defibrillation</p>
              <p>⏱️ 15-20 min | 🎯 Advanced</p>
            </div>
            <button className="mt-4 w-full py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition">
              Start Simulation
            </button>
          </div>

          {/* Respiratory Emergency */}
          <div 
            className="p-6 rounded-xl shadow-lg border-t-8 border-sky-600 bg-sky-50 hover:shadow-xl transition transform hover:scale-[1.01] cursor-pointer"
            onClick={() => navigateToSimulation('respiratory-simulation')}
          >
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-sky-700 bg-sky-200 px-3 py-1 rounded-full">CRITICAL CARE</span>
                <span className="text-3xl">💨</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800">Pediatric Respiratory Crisis</h4>
            <p className="text-gray-600 mt-1 mb-3 text-sm">
              Manage severe respiratory distress in a 4-year-old patient.
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Airway Assessment, Oxygen Therapy, Family Communication</p>
              <p>⏱️ 10-15 min | 🎯 Intermediate</p>
            </div>
            <button className="mt-4 w-full py-2 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition">
              Start Simulation
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home;