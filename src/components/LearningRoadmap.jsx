import React from 'react';
import styles from './LearningRoadmap.module.css';

// Sample roadmap steps; can be expanded later
const steps = [
  { title: 'Basics', description: 'Fundamentals of electronics, digital logic, and VLSI concepts.' },
  { title: 'Intermediate', description: 'RTL coding, synthesis, and timing analysis.' },
  { title: 'Advanced', description: 'Physical synthesis, placement, routing, and sign‑off.' },
  { title: 'Interview Prep', description: 'Core interview questions, scripting, and industry workflows.' },
];

const LearningRoadmap = () => (
  <section className={styles.roadmapSection} id="learning-roadmap">
    <h2 className={styles.heading}>Learning Path Roadmap</h2>
    <div className={styles.stepsContainer}>
      {steps.map((step, idx) => (
        <div key={idx} className={styles.stepCard}>
          <div className={styles.stepNumber}>Step {idx + 1}</div>
          <h3 className={styles.stepTitle}>{step.title}</h3>
          <p className={styles.stepDesc}>{step.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default LearningRoadmap;
