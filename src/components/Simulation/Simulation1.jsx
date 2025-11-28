import React, { useState } from 'react';
import Popup from '../UI/Popup';

function Simulation1({ scenario, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);

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
    }
  ];

  const pediatricQuestions = [
    {
      question: "You approach 4-year-old Emma. What's your FIRST assessment approach?",
      options: [
        "Immediate vital signs",
        "Pediatric Assessment Triangle (PAT) from doorway",
        "Auscultate lung sounds",
        "Check oxygen saturation"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! Pediatric Assessment Triangle provides rapid global assessment of appearance, work of breathing, and circulation without distressing the child.",
        incorrect: "Incorrect. In pediatric patients, start with Pediatric Assessment Triangle from doorway to quickly identify critically ill children."
      }
    },
    {
      question: "Emma shows nasal flaring and intercostal retractions. What do these indicate?",
      options: [
        "Normal pediatric breathing",
        "Increased work of breathing",
        "Cardiac compromise", 
        "Neurological issue"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! Nasal flaring and retractions indicate increased work of breathing and respiratory distress in pediatric patients.",
        incorrect: "Incorrect. These are classic signs of respiratory distress and increased work of breathing in children."
      }
    },
    {
      question: "Emma's oxygen saturation is 88% on room air. What's your priority intervention?",
      options: [
        "Wait for physician orders",
        "Administer supplemental oxygen immediately",
        "Start an IV line",
        "Get chest X-ray"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! Oxygen saturation below 90% requires immediate supplemental oxygen administration while preparing for further assessment.",
        incorrect: "Incorrect. Oxygen saturation below 90% is an emergency requiring immediate oxygen therapy without waiting for orders."
      }
    },
    {
      question: "Emma develops stridor. What does this indicate?",
      options: [
        "Lower airway obstruction",
        "Upper airway obstruction",
        "Cardiac issue",
        "Normal pediatric sound"
      ],
      correct: 1,
      feedback: {
        correct: "Correct! Stridor indicates upper airway obstruction, which can be life-threatening in pediatric patients.",
        incorrect: "Incorrect. Stridor is a sign of upper airway obstruction, which requires immediate attention in children."
      }
    },
    {
      question: "What's the appropriate oxygen delivery method for a conscious 4-year-old?",
      options: [
        "Non-rebreather mask at 15L",
        "Nasal cannula at 2L",
        "Simple face mask",
        "Blow-by oxygen or pediatric non-rebreather"
      ],
      correct: 3,
      feedback: {
        correct: "Correct! Blow-by oxygen or pediatric non-rebreather mask is less frightening for young children and provides adequate oxygenation.",
        incorrect: "Incorrect. For conscious pediatric patients, use less intimidating methods like blow-by oxygen to avoid increasing anxiety."
      }
    }
  ];

  const questions = scenario === 'cardiac' ? cardiacQuestions : pediatricQuestions;

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === questions[currentQuestion].correct;
    setLastAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions completed
      const passed = score >= Math.floor(questions.length * 0.7); // Need 70% to pass
      onComplete(passed);
    }
  };

  if (showFeedback) {
    return (
      <Popup
        type={lastAnswerCorrect ? 'success' : 'error'}
        title={lastAnswerCorrect ? 'Correct!' : 'Incorrect'}
        message={questions[currentQuestion].feedback[lastAnswerCorrect ? 'correct' : 'incorrect']}
        onConfirm={handleContinue}
        showCancel={false}
      />
    );
  }

  return (
    <div className="simulation-container">
      <div className="question-progress">
        Question {currentQuestion + 1} of {questions.length}
        {scenario === 'pediatric' && ' - Pediatric Respiratory'}
      </div>
      
      <div className="question-card">
        <h3>{questions[currentQuestion].question}</h3>
        
        <div className="options-grid">
          {questions[currentQuestion].options.map((option, index) => (
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