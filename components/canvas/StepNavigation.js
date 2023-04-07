// components/canvas/StepNavigation.js
import React, { useState, useEffect } from 'react';

const StepNavigation = ({ stepIndex }) => {
  const [steps, setSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const scrollToStep = (index) => {
    const target = document.querySelector(`#step-${index}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const pageBreaks = document.querySelectorAll('.page-break');
    setSteps(Array.from(pageBreaks, (_, index) => `Étape ${index + 1}`));

    const handleScroll = () => {
      let newIndex = 0;
      pageBreaks.forEach((pageBreak, index) => {
        if (pageBreak.getBoundingClientRect().top <= window.innerHeight / 2) {
          newIndex = index;
        }
      });

      setActiveStep(newIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerStyles = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const buttonStyles = {
    position: 'fixed',
    left: '24px',
    padding: '12px 24px',
    fontSize: '12px',
    fontWeight: 'bold',
    background: '#173541',
    borderRadius: '5px',
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const breadcrumbStyles = {
    position: 'fixed',
    top: '50%',
    left: '24px',
    zIndex: 10,
    padding: '12px 24px',
    borderRadius: '5px',
    background: 'white',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyles}>
      <button
        style={buttonStyles}
        onClick={() => {
          window.scrollBy({
            top: window.innerHeight,
            behavior: 'smooth',
          });
        }}
      >
        Voir l'étape suivante
      </button>
      <div style={breadcrumbStyles}>
        <ul>
          {steps.map((step, index) => (
            <li key={step}>
              <button
                style={{
                  background: activeStep === index ? '#E95459' : 'transparent',
                  color: activeStep === index ? 'white' : 'black',
                  cursor: 'pointer',
                }}
                onClick={() => scrollToStep(index)}
              >
                {step}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepNavigation;
