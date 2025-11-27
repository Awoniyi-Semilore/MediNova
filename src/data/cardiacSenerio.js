export const cardiacScenario = {
    start: {
        title: "Initial Presentation: Code Blue",
        text: "You arrive in the patient's room. The patient is unresponsive, apneic, and without a palpable pulse. The monitor shows organized electrical activity at 55 bpm, but no pulse. This is Pulseless Electrical Activity (PEA). Start ACLS protocol.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "1. Start CPR (Chest Compressions)", next: "cpr_started" },
            { text: "2. Check for H's and T's", next: "check_hts_early" },
            { text: "3. Administer Epinephrine 1 mg IV", next: "initial_epi" },
        ]
    },
    
    // --- CPR Initiation ---
    cpr_started: {
        title: "Action: Starting High-Quality CPR",
        text: "You initiate high-quality chest compressions and ventilations (30:2 ratio). The team is now prepared for the next steps. What is your priority after confirming PEA?",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Administer Epinephrine 1 mg IV/IO", next: "first_epi" },
            { text: "Reversible Causes (H's and T's)", next: "check_hts" },
            { text: "Perform immediate defibrillation", next: "defib_wrong_rhythm" },
        ]
    },

    // --- First Epinephrine Dose ---
    first_epi: {
        title: "Action: Epinephrine Administered",
        text: "Epinephrine 1 mg IV/IO has been administered. CPR continues. This is the 3-minute check. What do you do now?",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Check pulse and rhythm (3-minute pulse check)", next: "pulse_check_1" },
            { text: "Search for H's and T's (Reversible Causes)", next: "check_hts" },
            { text: "Prepare second dose of Epinephrine (4-minute mark)", next: "wrong_timing" },
        ]
    },

    // --- First Pulse Check ---
    pulse_check_1: {
        title: "Rhythm Check: Still PEA",
        text: "Pulse check confirms no palpable pulse. The monitor still shows PEA. CPR quality is good. Based on the 2-minute cycle, what's next?",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Administer second dose of Epinephrine 1 mg IV/IO (Correct)", next: "second_epi" },
            { text: "Give Amiodarone", next: "amio_wrong_rhythm" },
            { text: "Check for tension pneumothorax (H's and T's)", next: "tension_pneumo" },
        ]
    },

    // --- Second Epinephrine Dose ---
    second_epi: {
        title: "Action: Second Epinephrine Dose",
        text: "Epinephrine 1 mg IV/IO is administered. The second dose is timed correctly (4 minutes into the code). CPR continues. What reversible cause do you want to explore now?",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Check blood sugar for Hypoglycemia (H)", next: "check_hypoglycemia" },
            { text: "Administer Sodium Bicarbonate", next: "sodium_bicarb_premature" },
            { text: "Administer fluids for Hypovolemia (H)", next: "admin_fluids" },
        ]
    },

    // --- Hypoglycemia Check ---
    check_hypoglycemia: {
        title: "Reversible Cause: Hypoglycemia",
        text: "Point-of-care blood sugar is 120 mg/dL (normal). CPR continues. It's time for the 6-minute pulse/rhythm check.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Check pulse and rhythm (6-minute pulse check)", next: "pulse_check_2" },
            { text: "Give calcium chloride for Hyperkalemia", next: "hyperkalemia_unconfirmed" },
            { text: "Administer Furosemide", next: "furosemide_wrong_setting" },
        ]
    },

    // --- Second Pulse Check ---
    pulse_check_2: {
        title: "Rhythm Check: Sinus Tachycardia!",
        text: "Pulse check is now positive! Radial pulse is palpable at 90 bpm, strong and regular. BP is 90/60 mmHg. You have achieved **ROSC (Return of Spontaneous Circulation)**.",
        type: "outcome_positive",
        choices: [
            { text: "Post-Cardiac Arrest Care: Assess airway and breathing", next: "rosc_success" },
        ]
    },
    
    // --- Hypovolemia Intervention ---
    admin_fluids: {
        title: "Intervention: Fluid Bolus for Suspected Hypovolemia",
        text: "You administer 500 mL of normal saline. CPR continues. It's time for the 6-minute pulse/rhythm check.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Check pulse and rhythm (6-minute pulse check)", next: "pulse_check_2" }, // Leads to success
            { text: "Search for Cardiac Tamponade (T)", next: "tamponade_check" },
        ]
    },


    // --- Incorrect Actions/Detours ---
    check_hts_early: {
        title: "Priority Error: H's and T's before Compressions",
        text: "While searching for H's and T's is important, the patient needs oxygen delivery immediately. The primary action for any pulseless patient is high-quality chest compressions. You wasted critical time.",
        type: "decision",
        status: {
            rhythm: 'Asystole',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '40%', // Worsening O2
        },
        choices: [
            { text: "Return to Protocol: Start CPR immediately", next: "cpr_started" },
            { text: "End simulation due to poor outcome", next: "outcome_fail_time" },
        ]
    },
    initial_epi: {
        title: "Priority Error: Epinephrine Before Compressions",
        text: "Epinephrine is given during CPR to augment perfusion, not start it. The most critical intervention is high-quality CPR to circulate existing blood. You delayed life-saving compressions.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '50%', // Worsening O2
        },
        choices: [
            { text: "Return to Protocol: Start CPR immediately", next: "cpr_started" },
            { text: "End simulation due to poor outcome", next: "outcome_fail_time" },
        ]
    },
    defib_wrong_rhythm: {
        title: "Action Error: Defibrillation in PEA/Asystole",
        text: "Defibrillation is used for shockable rhythms (VF/pVT). PEA is a non-shockable rhythm. Defibrillating this patient is ineffective and delays appropriate pharmacologic and cause-specific treatment.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Continue CPR and search for H's and T's", next: "check_hts" },
        ]
    },
    wrong_timing: {
        title: "Timing Error: Skipping Pulse Check",
        text: "ACLS protocols dictate a pulse/rhythm check every 2 minutes (or 5 cycles of CPR). Skipping the check means you could miss Return of Spontaneous Circulation (ROSC). You must stop and check now.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Perform the mandatory 3-minute pulse check", next: "pulse_check_1" },
        ]
    },
    amio_wrong_rhythm: {
        title: "Drug Error: Amiodarone in PEA",
        text: "Amiodarone is an antiarrhythmic drug used for refractory VF/pVT (shockable rhythms), not PEA/Asystole. Giving it now is inappropriate and delays cause investigation. Continue CPR.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Focus on H's and T's and next dose of Epinephrine", next: "second_epi" },
        ]
    },
    tension_pneumo: {
        title: "H&T Intervention: Tension Pneumothorax",
        text: "You suspect tension pneumothorax based on patient history. You perform needle decompression. The patient's O2 saturation slightly improves, but no ROSC yet.",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '75%', // Slight improvement
        },
        choices: [
            { text: "Continue CPR and prepare for the 6-minute pulse check", next: "pulse_check_2" },
        ]
    },
    
    // --- Generic H&T Check ---
    check_hts: {
        title: "Reversible Causes (H's and T's)",
        text: "You are actively thinking about Hypovolemia, Hypoxia, Hydrogen ion (Acidosis), Hypo/Hyperkalemia, Hypothermia, Tamponade, Toxins, Thrombosis (Coronary/Pulmonary). What is the most likely cause to correct next?",
        type: "decision",
        status: {
            rhythm: 'PEA (55 bpm)',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '60%',
        },
        choices: [
            { text: "Administer fluids for Hypovolemia (H)", next: "admin_fluids" },
            { text: "Check for tension pneumothorax (T)", next: "tension_pneumo" },
            { text: "Check blood sugar for Hypoglycemia (H)", next: "check_hypoglycemia" },
        ]
    },

    // --- Outcomes ---
    rosc_success: {
        title: "SUCCESS: Post-Cardiac Arrest Care",
        text: "Congratulations! You successfully managed the Code Blue and achieved ROSC. Your immediate priority is now optimizing ventilation, circulation, and temperature management.",
        type: "outcome_positive",
        choices: [
            { text: "End Simulation (Review Log)", next: "end_success" },
        ]
    },
    outcome_fail_time: {
        title: "FAILED: Critical Time Loss",
        text: "Due to delays in initiating high-quality CPR or administering epinephrine, the patient's condition has deteriorated beyond recovery. Time of death declared. Review your log for critical errors in timing and priority.",
        type: "end",
        status: {
            rhythm: 'Asystole',
            pulse: 'Absent',
            rr: '0',
            bp: '0/0',
            o2: '0%', 
        },
    },
    end_success: {
        title: "Simulation Complete: Excellent Outcome",
        text: "This scenario emphasized the importance of high-quality CPR, timely epinephrine administration, and rapid identification of the reversible cause (Hypovolemia).",
        type: "end",
        status: {
            rhythm: 'Sinus Rhythm',
            pulse: 'Present (90 bpm)',
            rr: '18',
            bp: '90/60',
            o2: '98%',
        },
    }
};