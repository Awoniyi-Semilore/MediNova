import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously, createUserWithEmailAndPassword, signInWithCustomToken } from 'firebase/auth';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';

// NOTE: The external import for cardiacScenario has been removed to fix the build error.
// The cardiacScenario object is now defined directly below.

// --- Cardiac Simulation Scenario Data (Merged to fix import error) ---

const cardiacScenario = {
    // --- Starting Point ---
    start: {
        title: "Initial Assessment: Pulseless Electrical Activity (PEA)",
        text: "You respond to a Code Blue in the ICU. The patient, Mr. Smith (65M), is unresponsive and apneic. The monitor shows a narrow-complex rhythm, but palpation confirms no pulse. Time: 0:00. CPR has been initiated by the primary nurse.",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent (No palpable pulse)',
            rr: '0 (Apneic)',
            bp: '0/0',
            o2: '60% (Pre-intubation)',
        },
        choices: [
            { text: "Continue High-Quality CPR and administer Epinephrine 1 mg IV/IO (Step 1)", next: 'epinephrine_1' },
            { text: "Check pulse and rhythm immediately (Stop CPR)", next: 'check_too_early' },
            { text: "Defibrillate the patient immediately (Avoided in PEA/Asystole)", next: 'defib_inappropriate' },
        ]
    },

    // --- ACLS Flow ---
    
    // Step 1: Epinephrine
    epinephrine_1: {
        title: "Epinephrine 1 mg Administered",
        text: "You confirm high-quality CPR is ongoing and administered the first dose of Epinephrine 1 mg IV push. You must now look for reversible causes (H's and T's).",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0 (Intubate/Ventilate)',
            bp: '0/0',
            o2: '99% (Ventilating with 100% O2)',
        },
        choices: [
            { text: "Check patient for signs of Hypovolemia and Hypoxia (The H's)", next: 'hs_and_ts' },
            { text: "Continue CPR for 2 minutes and prepare for rhythm check", next: 'cpr_round_1_end' },
            { text: "Administer a second dose of Epinephrine immediately", next: 'epinephrine_too_fast' },
        ]
    },

    // Step 2: H's and T's
    hs_and_ts: {
        title: "Identifying Reversible Causes (H's and T's)",
        text: "The patient's initial history suggests a recent acute GI bleed (potential for Hypovolemia). Lung sounds are clear bilaterally (ruling out Tension Pneumothorax). The code cart thermometer shows the patient is normothermic (ruling out Hypothermia).",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Prioritize Hypovolemia: Administer 1 L of normal saline (crystalloid bolus)", next: 'fluid_bolus' },
            { text: "Prioritize Hypoxia: Confirm ET tube placement and ventilation is optimized", next: 'optimise_ventilation' },
            { text: "Assume Myocardial Infarction: Administer aspirin and load with heparin", next: 'inappropriate_med' },
        ]
    },

    // Step 3a: Fluid Bolus
    fluid_bolus: {
        title: "Intervention: Fluid Bolus Administered",
        text: "You administered 1000mL of Normal Saline. The team confirms the 2-minute CPR cycle is ending. Prepare for rhythm check.",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Stop CPR and perform a rhythm/pulse check", next: 'rhythm_check_1' },
            { text: "Administer the second dose of Epinephrine now (before rhythm check)", next: 'epinephrine_too_fast' },
        ]
    },

    // Step 3b: Optimized Ventilation (Alternative)
    optimise_ventilation: {
        title: "Intervention: Ventilation Optimized",
        text: "You confirm ET tube is secure and O2 is 100%. The team confirms the 2-minute CPR cycle is ending. Prepare for rhythm check.",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Stop CPR and perform a rhythm/pulse check", next: 'rhythm_check_1' },
        ]
    },

    // --- Rhythm Check 1 ---
    rhythm_check_1: {
        title: "Rhythm Check 1 (2:00 mark)",
        text: "Monitor: The rhythm remains Pulseless Electrical Activity (PEA). Pulse: Still absent. Continue CPR.",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Administer Epinephrine 1 mg IV/IO (2nd dose)", next: 'epinephrine_2' },
            { text: "Check pulse and rhythm again (Too frequent check)", next: 'check_too_frequent' },
        ]
    },

    // Step 4: Epinephrine 2
    epinephrine_2: {
        title: "Epinephrine 1 mg Administered (2nd dose)",
        text: "You administered the second dose of Epinephrine. The next check is at the 4:00 mark. Continue CPR and search for any T's (Toxins, Thrombosis, Tamponade).",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Order bedside ultrasound (POCUS) for cardiac tamponade or pulmonary embolism", next: 'pocus_check' },
            { text: "Continue CPR for 2 minutes and wait for the next rhythm check", next: 'cpr_round_2_end' },
        ]
    },

    // Step 5: POCUS
    pocus_check: {
        title: "Bedside Ultrasound (POCUS)",
        text: "POCUS shows a small, non-collapsible left ventricle with no fluid in the pericardial sac. Findings are consistent with severe hypovolemia, not tamponade or significant clot burden. Continue CPR; the 4:00 mark is approaching.",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Stop CPR and perform a rhythm/pulse check (4:00 mark)", next: 'rhythm_check_2' },
            { text: "Administer another fluid bolus immediately to treat hypovolemia", next: 'fluid_bolus_2' },
        ]
    },
    
    // --- Rhythm Check 2 ---
    rhythm_check_2: {
        title: "Rhythm Check 2 (4:00 mark)",
        text: "Monitor: The rhythm has changed to Ventricular Fibrillation (VF). Pulse: Still absent. This is a shockable rhythm!",
        status: {
            rhythm: 'Ventricular Fibrillation (VF)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Deliver 200J (Biphasic) Shock immediately and resume CPR", next: 'shock_1' },
            { text: "Administer Amiodarone 300 mg before shocking", next: 'med_before_shock' },
            { text: "Continue CPR without defibrillation", next: 'cpr_round_3_end' },
        ]
    },

    // --- Shockable Flow ---

    // Step 6: Shock 1
    shock_1: {
        title: "Intervention: Defibrillation (Shock 1)",
        text: "The patient was shocked at 200J. You immediately resumed high-quality CPR. The next rhythm check is at the 6:00 mark. Prepare the first dose of anti-arrhythmic.",
        status: {
            rhythm: 'Post-Shock VF/Pulse Check Imminent',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Administer Amiodarone 300 mg IV/IO and continue CPR", next: 'amiodarone_1' },
            { text: "Administer Epinephrine 1 mg IV/IO (3rd dose) and continue CPR", next: 'epinephrine_too_early' },
        ]
    },

    // Step 7: Amiodarone
    amiodarone_1: {
        title: "Amiodarone 300 mg Administered",
        text: "Amiodarone 300 mg IV/IO was administered. The 2-minute CPR cycle is ending. Prepare for rhythm check.",
        status: {
            rhythm: 'VF',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Stop CPR and perform a rhythm/pulse check (6:00 mark)", next: 'rhythm_check_3' },
        ]
    },

    // --- Rhythm Check 3 (ROSC/Termination Point) ---
    rhythm_check_3: {
        title: "Rhythm Check 3 (6:00 mark)",
        text: "Monitor: The rhythm has converted to Sinus Tachycardia at 110 bpm. Pulse: Palpable, faint, but present (80 bpm). ROSC has been achieved! The patient is post-ROSC care.",
        type: 'outcome_positive', // Triggers status change to stable vitals in App.jsx
        choices: [
            { text: "Begin Post-Cardiac Arrest Care Protocol (Successful Outcome)", next: 'success_end' },
        ]
    },


    // --- Incorrect Paths / Fails ---

    check_too_early: {
        title: "Critical Error: Premature Rhythm Check",
        text: "Stopping CPR before the 2-minute mark (or Epinephrine dose) drastically reduces coronary perfusion pressure. You must restart high-quality CPR immediately.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },
    defib_inappropriate: {
        title: "Critical Error: Defibrillation in PEA/Asystole",
        text: "PEA/Asystole are non-shockable rhythms. Defibrillating wastes time and energy. You must follow the PEA algorithm (CPR and Epinephrine).",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },
    epinephrine_too_fast: {
        title: "Incorrect Timing: Epinephrine Frequency",
        text: "Epinephrine is given every 3-5 minutes. Giving it too soon breaks the rhythm of CPR cycles and provides no extra benefit. Resume high-quality CPR until the next check.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },
    inappropriate_med: {
        title: "Incorrect Intervention: Treating Unknowns",
        text: "Administering drugs like Aspirin/Heparin without clear evidence of a Thrombus delays essential care (CPR, Epinephrine, H's & T's). Resume ACLS protocol.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },
    check_too_frequent: {
        title: "Critical Error: Checking Pulse Too Frequently",
        text: "Stopping CPR every few seconds to check the pulse interrupts perfusion. You must ensure at least 2 minutes of CPR between checks.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },
    med_before_shock: {
        title: "Critical Error: Drug Before First Shock (VF)",
        text: "In VF/VT, immediate defibrillation is the priority. Drugs (Amiodarone/Lidocaine) are secondary. Administer drug only after the first unsuccessful shock.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },
    epinephrine_too_early: {
        title: "Critical Error: Epinephrine vs. Shock",
        text: "For VF, the primary cycle is Shock-CPR-Shock-Drug. Epinephrine is due *after* the second shock if VF persists. Amiodarone is needed now.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },
    fluid_bolus_2: {
        title: "Minor Error: Delaying Rhythm Check",
        text: "While treating hypovolemia is important, you cannot delay the scheduled rhythm check (4:00 mark) to deliver more fluid. Proceed with the check immediately.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    },


    // --- Successful Outcomes ---
    success_end: {
        title: "Simulation Concluded: Return of Spontaneous Circulation (ROSC)",
        text: "Congratulations! You successfully followed the ACLS algorithm, identified the reversible cause (Hypovolemia), and achieved ROSC after defibrillation.",
        type: 'outcome_positive',
        choices: [
            { text: "Review Simulation Log and Results", next: 'start' }
        ]
    },
    cpr_round_1_end: {
        title: "Rhythm Check 1 (2:00 mark)",
        text: "Monitor: The rhythm remains Pulseless Electrical Activity (PEA). Pulse: Still absent. Continue CPR.",
        status: {
            rhythm: 'PEA (Narrow Complex)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Administer Epinephrine 1 mg IV/IO (2nd dose)", next: 'epinephrine_2' },
            { text: "Search for H's and T's", next: 'hs_and_ts' },
        ]
    },
    cpr_round_2_end: {
        title: "Rhythm Check 2 (4:00 mark)",
        text: "Monitor: The rhythm has changed to Ventricular Fibrillation (VF). Pulse: Still absent. This is a shockable rhythm!",
        status: {
            rhythm: 'Ventricular Fibrillation (VF)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '99%',
        },
        choices: [
            { text: "Deliver 200J (Biphasic) Shock immediately and resume CPR", next: 'shock_1' },
            { text: "Continue CPR without defibrillation", next: 'cpr_round_3_end' },
        ]
    },
    cpr_round_3_end: {
        title: "Simulation Terminated: Unsuccessful",
        text: "The patient remained in a lethal rhythm. After 8 minutes of non-defibrillation/inappropriate interventions, the attempt is terminated. Critical step missed: Defibrillation of VF.",
        type: 'end',
        choices: [
            { text: "Restart Simulation", next: 'start' }
        ]
    }
};

// --- Configuration and Initialization ---

// Global variables provided by the environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'medinova-default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Firebase App initialization
let firebaseApp, db, auth;
if (Object.keys(firebaseConfig).length > 0) {
    firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp);
    auth = getAuth(firebaseApp);
}

// Default initial patient status for PEA
const INITIAL_STATUS = cardiacScenario.start.status;

// --- Utility Functions ---

// Function to handle sign-in via token or anonymously
async function initializeAuth() {
    if (!auth) return;
    try {
        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
        } else {
            await signInAnonymously(auth); 
        }
    } catch (error) {
        console.error("Firebase Auth failed:", error);
    }
}

// --- Main Application Component ---
const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    // View state controls the current "page": 'landing', 'auth', 'dashboard', 'simulation_cardiac'
    const [view, setView] = useState('landing'); 

    // --- Simulation State (Cardiac) ---
    const [currentStepId, setCurrentStepId] = useState('start');
    const [patientStatus, setPatientStatus] = useState(INITIAL_STATUS);
    const [simulationHistory, setSimulationHistory] = useState([]);

    // --- Authentication and Setup Effect ---
    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        let isMounted = true;

        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!isMounted) return;

            if (currentUser) {
                setUser(currentUser);
                setUserId(currentUser.uid);
                // Redirect authenticated users from landing/auth to dashboard
                if (view === 'landing' || view === 'auth') {
                    setView('dashboard');
                }
            } else {
                setUser(null);
                setUserId(null);
                // Attempt anonymous sign-in only once on initial load if not authenticated
                if (loading) {
                    await initializeAuth(); 
                }
            }
            if (isMounted) setLoading(false);
        });

        // Cleanup the listener
        return () => { 
            isMounted = false;
            unsubscribe();
        };
    }, [loading, view]); 

    // --- Data Persistence (Load Cardiac Simulation History) ---
    useEffect(() => {
        // Only run if we are authenticated AND on the cardiac simulation screen (or transitioning to it)
        if (!db || !userId || view !== 'simulation_cardiac') return;

        // Path: /artifacts/{appId}/users/{userId}/simulations/cardiac_pea
        const docRef = doc(db, `artifacts/${appId}/users/${userId}/simulations/cardiac_pea`);

        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                // Load existing state if available
                setCurrentStepId(data.currentStepId || 'start');
                setPatientStatus(data.patientStatus || INITIAL_STATUS);
                setSimulationHistory(data.history || []);
            } else {
                // If no document exists, set initial state and save to Firestore
                setCurrentStepId('start');
                setPatientStatus(INITIAL_STATUS);
                setSimulationHistory([]);
                setDoc(docRef, { currentStepId: 'start', patientStatus: INITIAL_STATUS, history: [] }, { merge: true });
            }
        }, (error) => {
            console.error("Error listening to Firestore for simulation state:", error);
        });

        return () => unsubscribe();
    }, [userId, view]);

    // --- Simulation Logic (Cardiac) ---

    const currentStep = useMemo(() => cardiacScenario[currentStepId], [currentStepId]);

    const handleChoice = useCallback(async (choice, index) => {
        if (!db || !userId || !currentStep || currentStep.type === 'end') return;

        const nextStepId = choice.next;
        const nextStep = cardiacScenario[nextStepId];

        const newHistory = [...simulationHistory, { 
            stepId: currentStepId, 
            choiceText: choice.text, 
            timestamp: new Date().toISOString(),
            choiceIndex: index
        }];

        let newStatus = patientStatus;
        
        // Update status based on the scenario step
        if (nextStep && nextStep.status) {
            newStatus = { ...patientStatus, ...nextStep.status };
        } else if (nextStep && nextStep.type === 'outcome_positive') {
             // ROSC achieved: set stable vital signs
            newStatus = { 
                rhythm: 'Sinus Rhythm',
                pulse: 'Present (90 bpm)',
                rr: '18',
                bp: '90/60',
                o2: '98%',
            };
        }

        // 1. Update local state
        setCurrentStepId(nextStepId);
        setPatientStatus(newStatus);
        setSimulationHistory(newHistory);

        // 2. Persist to Firestore
        try {
            const docRef = doc(db, `artifacts/${appId}/users/${userId}/simulations/cardiac_pea`);
            await setDoc(docRef, {
                currentStepId: nextStepId,
                patientStatus: newStatus,
                history: newHistory,
            }, { merge: true });
        } catch (e) {
            console.error("Error saving simulation state:", e);
        }

    }, [currentStepId, simulationHistory, patientStatus, userId, db]);

    const resetCardiacSimulation = () => {
        setCurrentStepId('start');
        setPatientStatus(INITIAL_STATUS);
        setSimulationHistory([]);
        // The next Firestore save will happen automatically on the next change or reload
    };


    // --- UI Components ---

    const Header = () => (
        <header className="bg-white border-b border-gray-100 p-4 shadow-sm flex justify-between items-center fixed top-0 w-full z-10">
            <h1 className="text-2xl font-extrabold tracking-tight text-cyan-600 cursor-pointer transition duration-300 hover:text-fuchsia-600" onClick={() => setView('dashboard')}>MediNova</h1>
            <div className="flex items-center space-x-4">
                {userId && <span className="text-sm text-gray-500 hidden sm:inline">User ID: <span className="font-mono text-xs text-fuchsia-600">{userId}</span></span>}
                <button
                    onClick={() => {
                        if (auth) signOut(auth);
                        setUser(null);
                        setUserId(null);
                        setView('landing');
                    }}
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-1 px-3 rounded-full transition duration-200 shadow-md text-sm"
                >
                    {user ? 'Logout' : 'Connect'}
                </button>
            </div>
        </header>
    );

    const LandingPage = () => (
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 bg-gray-50 text-gray-800">
            <div className="max-w-4xl w-full text-center p-8">
                <h2 className="text-6xl font-extrabold text-cyan-700 animate-fadeIn">
                    High-Fidelity Clinical Simulations
                </h2>
                <p className="mt-4 text-xl text-gray-600">
                    Master critical emergency protocols for healthcare professionals and students.
                </p>

                {/* Video Placeholder */}
                <div className="mt-10 p-4 bg-gray-200 rounded-xl shadow-lg border-2 border-fuchsia-300">
                    <div className="h-64 flex items-center justify-center bg-gray-300 rounded-lg">
                        <span className="text-xl text-gray-600">
                            Video Introduction Placeholder (Cardiac Arrest & Peds Distress)
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Your teammate's video will appear here!
                    </p>
                </div>

                <div className="mt-12 flex space-x-6 justify-center">
                    <button
                        onClick={() => setView('auth')}
                        className="flex items-center justify-center w-48 py-4 bg-cyan-600 hover:bg-cyan-700 text-white text-lg font-bold rounded-full shadow-xl transform transition duration-300 hover:scale-105"
                    >
                        Login / Sign Up
                    </button>
                </div>
            </div>
        </div>
    );

    const AuthPage = () => {
        const [isSigningUp, setIsSigningUp] = useState(false);
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const [message, setMessage] = useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setMessage('');
            if (!auth) {
                setError("Firebase configuration is missing.");
                return;
            }

            try {
                if (isSigningUp) {
                    await createUserWithEmailAndPassword(auth, email, password);
                    setMessage("Account created successfully! Redirecting to Dashboard...");
                } else {
                    await signInWithEmailAndPassword(auth, email, password);
                    setMessage("Login successful! Redirecting to Dashboard...");
                }
                // Auth listener will handle setting the user and view
            } catch (err) {
                console.error(err);
                setError(err.message.replace('Firebase: Error (auth/', '').replace(').', '').replace('-', ' '));
            }
        };

        return (
            <div className="flex items-center justify-center min-h-screen pt-20 bg-gray-50">
                <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-2xl border-t-8 border-cyan-500">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        {isSigningUp ? 'Create Your Account' : 'Welcome Back'}
                    </h2>
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={() => { setIsSigningUp(false); setError(''); setMessage(''); }}
                            className={`px-4 py-2 text-sm font-semibold rounded-l-lg transition ${
                                !isSigningUp ? 'bg-fuchsia-500 text-white shadow-md' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setIsSigningUp(true); setError(''); setMessage(''); }}
                            className={`px-4 py-2 text-sm font-semibold rounded-r-lg transition ${
                                isSigningUp ? 'bg-fuchsia-500 text-white shadow-md' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
                                placeholder="••••••••"
                            />
                        </div>
                        
                        {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg shadow-sm border border-red-200">{error}</div>}
                        {message && <div className="p-3 text-sm text-green-700 bg-green-100 rounded-lg shadow-sm border border-green-200">{message}</div>}

                        <button
                            type="submit"
                            className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg shadow-lg transform transition duration-300 hover:scale-[1.01]"
                        >
                            {isSigningUp ? 'Sign Up' : 'Log In'}
                        </button>

                        <button
                            type="button"
                            onClick={() => initializeAuth()}
                            className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg text-sm transition mt-2"
                        >
                            Continue Anonymously
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    const Dashboard = () => (
        <div className="flex flex-col items-center min-h-screen pt-24 pb-8 bg-gray-50">
            <h2 className="text-5xl font-extrabold text-gray-900 text-center mb-12">
                Choose Your Simulation
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full px-4">
                {/* 1. Cardiac Arrest Simulation */}
                <div className="bg-white border-t-8 border-cyan-500 rounded-xl shadow-2xl p-6 transition duration-300 hover:shadow-cyan-300/50 hover:scale-[1.01] flex flex-col">
                    <div className="flex items-center space-x-3 mb-4">
                        {/* Heart Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        <h3 className="text-3xl font-bold text-gray-800">Code Blue: ACLS</h3>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">
                        Manage an adult cardiac arrest scenario (PEA, Asystole) following Advanced Cardiac Life Support (ACLS) protocols.
                    </p>
                    <ul className="text-sm list-disc list-inside text-gray-500 space-y-1 mb-6">
                        <li>Protocol: ACLS (Adult)</li>
                        <li>Focus: H's and T's, Epinephrine, CPR quality</li>
                        <li>Status: <span className={simulationHistory.length > 0 ? 'text-green-500 font-semibold' : 'text-fuchsia-500 font-semibold'}>{simulationHistory.length > 0 ? 'In Progress' : 'New'}</span></li>
                    </ul>
                    <button
                        onClick={() => setView('simulation_cardiac')}
                        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-lg shadow-lg"
                    >
                        Start Cardiac Arrest Simulation
                    </button>
                </div>

                {/* 2. Pediatric Respiratory Distress Simulation (Placeholder) */}
                <div className="bg-white border-t-8 border-fuchsia-500 rounded-xl shadow-2xl p-6 transition duration-300 hover:shadow-fuchsia-300/50 hover:scale-[1.01] flex flex-col">
                    <div className="flex items-center space-x-3 mb-4">
                        {/* Child/Peds Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-fuchsia-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="7" r="4"/><path d="M12 21v-2m-3-6h6M12 15a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4z"/></svg>
                        <h3 className="text-3xl font-bold text-gray-800">Peds: Respiratory Distress</h3>
                    </div>
                    <p className="text-gray-600 mb-6 flex-grow">
                        A critical Pediatric Advanced Life Support (PALS) scenario focusing on rapid assessment and intervention for a child with severe breathing difficulty.
                    </p>
                    <ul className="text-sm list-disc list-inside text-gray-500 space-y-1 mb-6">
                        <li>Protocol: PALS (Pediatric)</li>
                        <li>Focus: Airway management, respiratory support, drug calculation</li>
                        <li>Status: <span className="text-gray-500 font-semibold">Coming Soon</span></li>
                    </ul>
                    <button
                        disabled 
                        className="w-full bg-gray-400 text-white font-bold py-4 rounded-lg shadow-lg cursor-not-allowed"
                    >
                        Coming Soon (PALS)
                    </button>
                </div>
            </div>
            
            <div className="mt-12 text-center text-sm text-gray-500">
                <p>All progress is saved automatically to Firestore. Your unique ID is: <span className="font-mono text-cyan-600">{userId}</span></p>
            </div>
        </div>
    );

    // --- Simulation UI (Cardiac) ---

    const PatientStatusBoard = ({ status }) => (
        <div className="bg-white border-4 border-fuchsia-500 rounded-xl p-4 shadow-2xl text-gray-800 text-sm font-mono w-full max-w-sm mx-auto">
            <h2 className="text-xl font-bold text-center mb-3 text-cyan-600">CARDIAC MONITOR</h2>
            <div className="space-y-2">
                <StatusItem label="Rhythm" value={status.rhythm} color={status.rhythm.includes('PEA') || status.rhythm.includes('Asystole') || status.rhythm.includes('Fibrillation') ? 'text-fuchsia-500' : 'text-green-500'} />
                <StatusItem label="Pulse" value={status.pulse} color={status.pulse.includes('Absent') ? 'text-fuchsia-500' : 'text-green-500'} />
                <StatusItem label="BP (mmHg)" value={status.bp} color={status.bp === '0/0' ? 'text-fuchsia-500' : 'text-cyan-500'} />
                <StatusItem label="O₂ Sat (%)" value={status.o2} color={status.o2.includes('60') ? 'text-fuchsia-500' : 'text-green-500'} />
                <StatusItem label="Respirations" value={status.rr} color={status.rr === '0' ? 'text-fuchsia-500' : 'text-cyan-500'} />
            </div>
        </div>
    );

    const StatusItem = ({ label, value, color }) => (
        <div className="flex justify-between border-b border-gray-100 py-1">
            <span className="text-gray-500">{label}:</span>
            <span className={`font-semibold ${color}`}>{value}</span>
        </div>
    );

    const SimulationScreen = () => {
        if (!currentStep) return <div className="text-center text-gray-500">Loading scenario...</div>;

        const isEnd = currentStep.type === 'end';
        const isPositiveOutcome = currentStep.type === 'outcome_positive';

        return (
            <div className="flex flex-col md:flex-row h-full w-full max-w-7xl mx-auto pt-4">
                {/* Left Panel: Status Board and Log */}
                <div className="w-full md:w-1/3 p-4">
                    <PatientStatusBoard status={patientStatus} />
                    <div className="mt-8 p-4 bg-white rounded-xl shadow-lg border-t-4 border-cyan-500">
                        <h3 className="text-lg font-semibold text-gray-700 mb-3 border-b pb-2">Simulation Log</h3>
                        <div className="space-y-2 max-h-80 overflow-y-auto text-xs text-gray-600">
                            {[...simulationHistory].reverse().map((item, index) => (
                                <div key={index} className="border-l-2 border-fuchsia-300 pl-3">
                                    <p className="font-medium text-gray-800">{cardiacScenario[item.stepId]?.title || 'Action Taken'}</p>
                                    <p className="italic text-gray-500">→ {item.choiceText}</p>
                                </div>
                            ))}
                            {simulationHistory.length === 0 && <p className="italic">Simulation started.</p>}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Dialogue and Decisions */}
                <div className="w-full md:w-2/3 md:pl-6 flex flex-col p-4">
                    <div className={`p-6 rounded-xl shadow-xl transition-all duration-500 ${isPositiveOutcome ? 'bg-green-100 border-4 border-green-500' : 'bg-white border border-gray-200'}`}>
                        <h2 className="text-3xl font-extrabold mb-4 text-gray-800">{currentStep.title || "Code Blue Protocol"}</h2>
                        <p className={`text-lg leading-relaxed ${isPositiveOutcome ? 'text-green-800 font-semibold' : 'text-gray-700'}`}>
                            {currentStep.text}
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        {currentStep.choices && currentStep.choices.map((choice, index) => (
                            <button
                                key={index}
                                onClick={() => handleChoice(choice, index)}
                                className="w-full text-left bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition duration-200 transform hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-cyan-400 focus:ring-opacity-50"
                                disabled={isEnd}
                            >
                                {choice.text}
                            </button>
                        ))}

                        {isEnd && (
                            <div className="flex space-x-4 mt-6">
                                <button
                                    onClick={() => resetCardiacSimulation()}
                                    className="flex-1 text-center bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl"
                                >
                                    Restart Simulation
                                </button>
                                <button
                                    onClick={() => setView('dashboard')}
                                    className="flex-1 text-center bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };


    // --- Main Render ---

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Initializing Application...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header visible on all screens except landing/auth */}
            {view !== 'landing' && view !== 'auth' && <Header />}
            
            <main className={view !== 'landing' && view !== 'auth' ? "p-4 md:p-8" : ""}>
                {/* Routing Logic based on 'view' state */}
                {view === 'landing' && <LandingPage />}
                {view === 'auth' && <AuthPage />}
                {view === 'dashboard' && <Dashboard />}
                {view === 'simulation_cardiac' && <SimulationScreen />}
            </main>
            
            {/* Custom Styles for Animation and Font - Removed non-standard attributes to fix warnings */}
            <style key="global-styles" dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                body {
                    font-family: 'Inter', sans-serif;
                    background-color: #f7f9fb;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.8s ease-out;
                }
            `}} />
        </div>
    );
};

export default App;