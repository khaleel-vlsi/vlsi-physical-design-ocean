import React from 'react';
import './stepper.css';

/** Simple animated stepper */
export const Stepper = ({ steps, current }) => {
  return (
    <div className="stepper">
      {steps.map((label, idx) => (
        <div
          key={idx}
          className={`step ${idx === current ? 'active' : idx < current ? 'completed' : ''}`}
        >
          <div className="circle">{idx + 1}</div>
          <div className="label">{label}</div>
        </div>
      ))}
    </div>
  );
};
