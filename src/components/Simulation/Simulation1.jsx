import React, { useState } from 'react';
import Popup from '../UI/Popup';

function Simulation1({ scenario, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const cardiacQuestions = [
    {
      question: "You approach Mr. Johnson. What's your FIRST immediate action?",
      options: [
        "Check pedal pulses",
        "Assess responsiveness & check breathing",
        "Check IV fluids",
        "Take blood pressure"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! First priority is to assess responsiveness and check for breathing - this follows the CAB (Circulation, Airway, Breathing) approach for unresponsive patients.",
        incorrect: "Incorrect. In an unresponsive patient, always assess responsiveness and breathing first before other assessments."
      }
    },
    {
      question: "Mr. Johnson is unresponsive and not breathing normally. What's your next critical step?",
      options: [
        "Administer oxygen via nasal cannula",
        "Check carotid pulse for no more than 10 seconds",
        "Start an IV line immediately",
        "Call the patient's family"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! Check for a carotid pulse briefly (no more than 10 seconds) to confirm cardiac arrest.",
        incorrect: "Incorrect. After confirming unresponsiveness and abnormal breathing, immediately check for a pulse to confirm cardiac arrest."
      }
    },
    {
      question: "You cannot feel a carotid pulse. What is the definitive action?",
      options: [
        "Run to get the physician",
        "Activate emergency response system/call Code Blue",
        "Begin chest compressions immediately",
        "Prepare emergency medications"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! Immediately activate emergency response system while beginning CPR. Early activation saves crucial minutes.",
        incorrect: "Incorrect. For confirmed cardiac arrest (no pulse), immediately activate emergency response and begin CPR."
      }
    },
    {
      question: "While starting CPR, what's the correct compression-to-breath ratio?",
      options: [
        "15 compressions : 2 breaths",
        "30 compressions : 2 breaths", 
        "5 compressions : 1 breath",
        "Continuous compressions only"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! 30:2 ratio is standard for adult CPR by healthcare providers.",
        incorrect: "Incorrect. The current guideline is 30 compressions to 2 breaths for adult CPR."
      }
    },
    {
      question: "The AED arrives. What's your immediate action?",
      options: [
        "Continue CPR while physician applies pads",
        "Stop CPR, apply AED pads, and follow voice prompts",
        "Check blood pressure first",
        "Administer epinephrine immediately"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! Stop CPR briefly to apply AED pads and follow prompts. Minimize interruptions.",
        incorrect: "Incorrect. For AED use, stop CPR briefly to apply pads and analyze rhythm as directed."
      }
    }
  ];

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === cardiacQuestions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Show feedback popup
    if (currentQuestion < cardiacQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions completed
      const passed = score >= 3; // Need at least 60% to pass
      onComplete(passed);
    }
  };

  return (
    <div className="simulation-container">
      <div className="question-progress">
        Question {currentQuestion + 1} of {cardiacQuestions.length}
      </div>
      
      <div className="question-card">
        <h3>{cardiacQuestions[currentQuestion].question}</h3>
        
        <div className="options-grid">
          {cardiacQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Simulation1;