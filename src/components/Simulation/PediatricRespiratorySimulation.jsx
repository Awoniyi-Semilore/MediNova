import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Simulation1 from './Simulation1';
import Popup from '../UI/Popup';

function PediatricRespiratorySimulation({ navigateTo }) {
  const [currentStep, setCurrentStep] = useState('video');
  const [simulation1Completed, setSimulation1Completed] = useState(false);

  // Using cardiac video as placeholder - replace with pediatric video when available
  const vimeoUrl = "https://player.vimeo.com/video/1141231294?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1";

  const handleVideoEnd = () => {
    setCurrentStep('storyline');
  };

  const handleSkip = () => {
    setCurrentStep('storyline');
  };

  const handleSimulation1Complete = (success) => {
    if (success) {
      setSimulation1Completed(true);
      setCurrentStep('success');
    } else {
      setCurrentStep('fail');
    }
  };

  const handleRetry = () => {
    setCurrentStep('simulation1');
  };

  const handleContinue = () => {
    navigateTo('pediatric-documentation');
  };

  if (currentStep === 'video') {
    return (
      <VideoPlayer 
        vimeoUrl={vimeoUrl}
        onVideoEnd={handleVideoEnd}
        onSkip={handleSkip}
      />
    );
  }

  if (currentStep === 'storyline') {
    return (
      <Popup
        type="info"
        title="Scenario: Pediatric Respiratory Emergency"
        message="4-year-old female, Emma, brought to ER by parents. Child is crying weakly, struggling to speak in full sentences, using accessory muscles to breathe. Parents report she's been 'breathing funny' for past 2 hours."
        onConfirm={() => setCurrentStep('simulation1')}
      />
    );
  }

  if (currentStep === 'simulation1') {
    return (
      <Simulation1 
        scenario="pediatric"
        onComplete={handleSimulation1Complete}
      />
    );
  }

  if (currentStep === 'success') {
    return (
      <Popup
        type="success"
        title="Excellent Assessment!"
        message="You correctly identified severe respiratory distress and initiated appropriate pediatric emergency protocols. The child is now stabilized with proper oxygenation."
        onConfirm={handleContinue}
      />
    );
  }

  if (currentStep === 'fail') {
    return (
      <Popup
        type="error"
        title="Respiratory Support Needed"
        message="The child's respiratory status is deteriorating. Immediate respiratory support and reassessment are required."
        onConfirm={handleRetry}
        showCancel={false}
      />
    );
  }
}

export default PediatricRespiratorySimulation;