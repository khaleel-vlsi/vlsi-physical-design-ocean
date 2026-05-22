import React, { useState } from 'react';
import styles from './Interview.module.css';
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';

const interviewQuestions = [
  {
    question: "What is setup time and hold time? How do you fix setup and hold violations?",
    answer: "Setup time is the minimum amount of time the data must be stable before the active clock edge. Hold time is the minimum amount of time the data must be stable after the active clock edge.\n\nTo fix setup violations: Upsize data path cells, use LVT cells, optimize routing, or decrease clock frequency.\nTo fix hold violations: Add buffers/delays in the data path, downsize data path cells, or use HVT cells."
  },
  {
    question: "Explain the difference between a wireload model and extracted parasitics.",
    answer: "A wireload model (WLM) is an estimation of interconnect RC delay based on the fanout of a net and the size of the block, used primarily during logical synthesis before physical placement is known. Extracted parasitics (SPEF) are accurate resistance and capacitance values extracted from the actual physical routed wires during physical design."
  },
  {
    question: "What is Clock Tree Synthesis (CTS) and what are its main goals?",
    answer: "CTS is the process of building a clock distribution network to deliver the clock signal to all sequential elements in the design. Its main goals are to achieve zero or minimal clock skew, minimize insertion delay (latency), and meet maximum transition/capacitance constraints while using minimal power and routing resources."
  },
  {
    question: "What is Antenna Effect in VLSI and how is it prevented?",
    answer: "The Antenna Effect occurs during plasma etching when exposed metal wires act like antennas, collecting charge that can exceed the breakdown voltage of the thin gate oxide connected to the wire, destroying the transistor.\n\nPrevention methods: Use metal jumping (routing to a higher metal layer and back down), or insert reverse-biased diodes near the gate."
  }
];

const Interview = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": interviewQuestions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <div className={styles.interviewContainer}>
      <SEO 
        title="Physical Design Interview Q&A" 
        description="Comprehensive list of VLSI Physical Design interview questions and answers, covering STA, CTS, synthesis, and physical verification."
        url="/interview"
        keywords={["vlsi interview questions", "physical design interview", "sta interview questions", "asic interview preparation"]}
        structuredData={<StructuredData faq={faqSchema} />}
      />

      <header className={styles.header}>
        <h1>Physical Design Interview Q&A</h1>
        <p>Prepare for your core VLSI industry interviews with these frequently asked questions.</p>
      </header>

      <section className={styles.qaSection}>
        {interviewQuestions.map((item, idx) => (
          <div 
            key={idx} 
            className={`${styles.qaCard} ${openIdx === idx ? styles.active : ''}`}
          >
            <button className={styles.questionBtn} onClick={() => toggleAccordion(idx)}>
              <span className={styles.questionText}>{item.question}</span>
              <span className={styles.icon}>{openIdx === idx ? '−' : '+'}</span>
            </button>
            {openIdx === idx && (
              <div className={styles.answerBox}>
                <p className={styles.importantPoint}>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className={styles.ctaSection}>
        <h2>Want more detailed interview preparation?</h2>
        <p>Join our Placement Support Program to get 1-on-1 mock interviews and career guidance.</p>
        <a href="https://chat.whatsapp.com/JhqVGJIRr6ZLwpzFsNBL5J" target="_blank" rel="noreferrer" className={styles.ctaBtn}>
          JOIN PLACEMENT SUPPORT
        </a>
      </section>
    </div>
  );
};

export default Interview;
