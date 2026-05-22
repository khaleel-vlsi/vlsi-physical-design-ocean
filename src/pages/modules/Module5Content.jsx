import React, { useEffect, useState } from 'react';
import AdUnit from '../../components/AdUnit';
import styles from './Module5Content.module.css';

const Module5Content = () => {
  const [showAllTopics, setShowAllTopics] = useState(false);

  useEffect(() => {
    // Robust MathJax trigger
    const triggerMathJax = () => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    };

    triggerMathJax();
    // Second pass after a short delay for late-rendering elements
    const timer = setTimeout(triggerMathJax, 1000);
    return () => clearTimeout(timer);
  }, []);

  const headings = [
    { id: 'h.m8ku8drh5kvu', text: 'Introduction to RTL, Digital Design & VLSI Context' },
    { id: 'h.dtzc9gb860b9', text: '1. What is Digital Design? (Very First Concept)' },
    { id: 'h.yg8oodia7a46', text: '2. What is VLSI and Where RTL Fits?' },
    { id: 'h.ip9pcnlrjz36', text: '3. What is RTL (Register Transfer Level)?' },
    { id: 'h.o5xoutsz8m1s', text: '4. Why RTL is Needed (Very Important for Students)' },
    { id: 'h.j63doko7jmix', text: '5. Why Verilog/SystemVerilog for RTL?' },
    { id: 'h.kdgyqyhbwtw1', text: '6. Hardware Thinking vs Software Thinking' },
    { id: 'h.v6d5jczb7jbb', text: '7. What is a Register?' },
    { id: 'h.kld5mmyyfobn', text: '8. Combinational vs Sequential Logic (Foundation)' },
    { id: 'h.e8domf7xsr9j', text: '9. RTL Coding Styles (Overview – Will Deep Dive Later)' },
    { id: 'h.basb23g7ng2d', text: '10. What You Will Learn in This RTL Course (Assurance)' },
    { id: 'h.1aelv9p80tv', text: 'Class 1 Summary (For Students)' },
    { id: 'h.njxwurwyf05a', text: 'RTL DESIGN – CLASS 2' },
    { id: 'h.74z8h25uqs77', text: 'Verilog Basics | Module Structure | RTL Building Blocks' },
    { id: 'h.gcd7elyg9uz9', text: '1. What is Verilog? (Clear Definition)' },
    { id: 'h.by9uomhkolfl', text: '2. Structure of a Verilog Design' },
    { id: 'h.28zi514h50fk', text: '3. Verilog Module Syntax (Very Important)' },
    { id: 'h.vfonlj9bg2x7', text: '4. Ports in Verilog (Inputs & Outputs)' },
    { id: 'h.7ac2qyp719q2', text: '5. Data Types in Verilog (Critical for Beginners)' },
    { id: 'h.h53gftomvfpb', text: '6. Continuous Assignment (assign)' },
    { id: 'h.m7s84vd7flgd', text: '7. Always Block (Core of RTL)' },
    { id: 'h.tphwepprqgeo', text: '8. Combinational Always Block' },
    { id: 'h.eynqwsayztpp', text: '9. Sequential Always Block (Clocked Logic)' },
    { id: 'h.ev0lblh6csk3', text: '10. Blocking vs Non-Blocking Assignment (Very Important)' },
    { id: 'h.pu2ztucqcif3', text: '11. Reset in Sequential Logic' },
    { id: 'h.pjulptur55v0', text: '12. Simulation vs Synthesis (Must Understand)' },
    { id: 'h.21sqxksvnkwx', text: '13. First RTL Design Flow' },
    { id: 'h.zhvjobk4l0nf', text: 'Class 2 Summary' },
    { id: 'h.fl09j03kkj5e', text: 'Combinational Circuits using Verilog RTL' },
    { id: 'h.grmpxcwlnp8b', text: '1. What is a Combinational Circuit?' },
    { id: 'h.pawyfl1nsuij', text: '2. Coding Styles in RTL (VERY IMPORTANT)' },
    { id: 'h.5b0fxle2bli3', text: '3. HALF ADDER' },
    { id: 'h.gbk4rktroep', text: '4. FULL ADDER' },
    { id: 'h.fl15ufrachmh', text: '5. 2:1 MULTIPLEXER' },
    { id: 'h.panu9x409qtz', text: '6. DECODER (2:4 Decoder)' },
    { id: 'h.s7o2ryhunl90', text: '7. ENCODER (4:2 Encoder)' },
    { id: 'h.nz3bzpa11mpc', text: '8. MAGNITUDE COMPARATOR (1-bit)' },
    { id: 'h.k7f99k1zgxap', text: 'CLASS 3 SUMMARY' },
    { id: 'h.ujnh3scnlwyr', text: 'Sequential Circuits using Verilog RTL (Beginner → Industry Ready)' },
    { id: 'h.ku6i0wse76xc', text: '1. What is a Sequential Circuit?' },
    { id: 'h.j69kgrpxuhwo', text: '2. Clock – Heart of Sequential Logic' },
    { id: 'h.cp5vbp3i5za3', text: '3. Latch vs Flip-Flop (VERY IMPORTANT)' },
    { id: 'h.kef2f4arjyfj', text: '4. SR LATCH (Basic Memory)' },
    { id: 'h.89xrltbetqei', text: '5. D LATCH' },
    { id: 'h.ufga5pqft041', text: '6. FLIP-FLOPS (MAIN FOCUS)' },
    { id: 'h.7xtitp339ff9', text: '6.1 D Flip-Flop (MOST IMPORTANT)' },
    { id: 'h.wrf933hqwr1k', text: '7. Reset in Flip-Flops' },
    { id: 'h.932k1m91xlyc', text: '7.1 Asynchronous Reset' },
    { id: 'h.aiceqi2h8tei', text: '7.2 Synchronous Reset' },
    { id: 'h.wwn0tnupcvy', text: '8. JK Flip-Flop' },
    { id: 'h.mh26rtnzw0qq', text: '9. T Flip-Flop' },
    { id: 'h.v1s209fav56d', text: '10. SR Flip-Flop (Clocked)' },
    { id: 'h.57pao5qlbeid', text: '11. Registers (Multiple Flip-Flops)' },
    { id: 'h.z5wq1pcf6y8h', text: '12. Blocking vs Non-Blocking (INTERVIEW MUST)' },
    { id: 'h.vce6qcmaaduv', text: 'CLASS 4 SUMMARY' },
    { id: 'h.docwik11gder', text: 'Counters & Shift Registers using Verilog RTL' },
    { id: 'h.ttcz8i9akla6', text: '1. What is a Counter?' },
    { id: 'h.yzoi8bf1lsii', text: '2. Types of Counters' },
    { id: 'h.x0j3qka560h1', text: '3. 4-Bit UP Counter' },
    { id: 'h.ai0bpmdgloa3', text: '4. 4-Bit DOWN Counter' },
    { id: 'h.dk7fyyk8cq7v', text: '5. UP-DOWN Counter' },
    { id: 'h.nv4nt99uavkh', text: '6. MOD-N Counter (Example: MOD-10)' },
    { id: 'h.d4khyohb3lpl', text: '7. Ring Counter' },
    { id: 'h.g3gtmua08hf3', text: '8. Johnson Counter' },
    { id: 'h.1o3l2dq8fx73', text: '9. Shift Registers' },
    { id: 'h.c9bzsrisxr69', text: '10. Types of Shift Registers' },
    { id: 'h.xsnm65g01esi', text: '11. SISO Shift Register' },
    { id: 'h.d5tp8vgiayke', text: '12. SIPO Shift Register' },
    { id: 'h.5zhioigd56h', text: '13. PISO Shift Register' },
    { id: 'h.1alrzkml0az3', text: '14. PIPO Shift Register' },
    { id: 'h.go2goy8tiytg', text: 'CLASS 5 SUMMARY' },
    { id: 'h.j7sbf6ivilhx', text: 'RTL DESIGN – CLASS 6' },
    { id: 'h.ar85nikvs3ko', text: 'Finite State Machines (FSM) – COMPLETE BEGINNER TO INDUSTRY LEVEL' },
    { id: 'h.pcn3jwldyuik', text: '1. What is an FSM?' },
    { id: 'h.aek0kf35o7oz', text: '2. Why FSM is Important in Industry?' },
    { id: 'h.welnei2ekw7q', text: '3. FSM Basic Blocks' },
    { id: 'h.5tl26fd6xcgk', text: '4. Types of FSM' },
    { id: 'h.z82hwl6pi3r4', text: '5. FSM Design Steps (VERY IMPORTANT)' },
    { id: 'h.ot0ilbrtvuik', text: '6. Example 1: Simple FSM (2-State Switch)' },
    { id: 'h.9ueyuqfku256', text: '7. RTL Coding Style for FSM (STANDARD STYLE)' },
    { id: 'h.90zjvrib1vaz', text: '8. FSM RTL Code (Moore FSM)' },
    { id: 'h.gqbl9nq4x5rx', text: '9. Example 2: Traffic Light Controller (Moore FSM)' },
    { id: 'h.owjzb5juxqzz', text: '10. RTL Code: Traffic Light FSM' },
    { id: 'h.iy2e057402dr', text: '11. Mealy FSM Example (Sequence Detector – 101)' },
    { id: 'h.nbplqlj3i6ng', text: '12. Common FSM Mistakes (INTERVIEW)' },
    { id: 'h.nzyt06qme14', text: '13. FSM Coding Best Practices' },
    { id: 'h.k57zp0y97kha', text: 'CLASS 6 SUMMARY' },
    { id: 'h.cl6g3fhue60d', text: 'RTL DESIGN – CLASS 7' },
    { id: 'h.qtj0zu56ydyq', text: 'RTL Coding Guidelines, Simulation vs Synthesis & Timing-Safe Coding' },
    { id: 'h.nze0exmez4aj', text: '1. Why RTL Coding Guidelines are IMPORTANT?' },
    { id: 'h.5xf4uxszs519', text: '2. Simulation vs Synthesis (MOST CONFUSING FOR BEGINNERS)' },
    { id: 'h.z2ogiqjkj1is', text: '3. Blocking vs Non-Blocking Assignments' },
    { id: 'h.mlgc481ezmg3', text: '4. Latch vs Flip-Flop (VERY IMPORTANT)' },
    { id: 'h.xys8vqed6yer', text: '5. How Latches are Accidentally Created' },
    { id: 'h.d64ka975nyv1', text: '6. Reset Types in RTL' },
    { id: 'h.9hb5kdm45d9r', text: '7. Clock Gating (POWER SAVING CONCEPT)' },
    { id: 'h.5mtyo5tgxwb0', text: '8. Combinational Logic Coding Rules' },
    { id: 'h.3iwx19t1c23n', text: '9. Sequential Logic Coding Rules' },
    { id: 'h.49149b85lwbb', text: '10. Sensitivity List (Beginner Mistake)' },
    { id: 'h.btvb425qwuxx', text: '11. Timing Concepts (Beginner Level)' },
    { id: 'h.5cnct2cqy8jw', text: '12. Interview-Level RTL Rules' },
    { id: 'h.gcvzrtohbmqf', text: 'CLASS 7 SUMMARY' },
    { id: 'h.yd8z7yy78qsc', text: 'RTL DESIGN – CLASS 8' },
    { id: 'h.ahz53vwmle3l', text: 'Combinational Circuits using RTL (Behavioral, Dataflow & Structural)' },
    { id: 'h.nynen1usla3u', text: '1. What is a Combinational Circuit?' },
    { id: 'h.ei86jsb0t6yk', text: '2. RTL Coding Styles (VERY IMPORTANT)' },
    { id: 'h.1zu9hgk9f7fe', text: '3.1 Half Adder – Dataflow Style' },
    { id: 'h.ika7ygbivx63', text: '3.2 Half Adder – Behavioral Style' },
    { id: 'h.qenlq1ibylcq', text: '3.3 Half Adder – Structural Style' },
    { id: 'h.178u2wt7jhkh', text: '4. FULL ADDER' },
    { id: 'h.n54rbeevwjwa', text: '4.1 Full Adder – Dataflow' },
    { id: 'h.wrxcz47qu3by', text: '4.2 Full Adder – Behavioral' },
    { id: 'h.99tow8xlraln', text: '4.3 Full Adder – Structural (Using Half Adders)' },
    { id: 'h.awset360nj2n', text: '5.1 4-bit Ripple Carry Adder – Behavioral' },
    { id: 'h.ocze3fwv2cuc', text: '6. MULTIPLEXER (2:1 MUX)' },
    { id: 'h.mfyv30bgwd9u', text: '6.1 MUX – Dataflow' },
    { id: 'h.wsr9amdffsc6', text: '6.2 MUX – Behavioral' },
    { id: 'h.gqc7qdhf40i8', text: '6.3 MUX – Structural' },
    { id: 'h.ysfajy26bm1v', text: '7. DECODER (2:4)' },
    { id: 'h.vft2g1udicp9', text: '7.1 Decoder – Behavioral' },
    { id: 'h.vd9h57hx4384', text: '8. ENCODER (4:2)' },
    { id: 'h.lmf00d52via6', text: '9. MAGNITUDE COMPARATOR (1-bit)' },
    { id: 'h.bgwazv3mzszm', text: 'CLASS 8 SUMMARY' },
    { id: 'h.gxzzoe45h6nl', text: 'SEQUENTIAL CIRCUITS USING RTL (COMPLETE BEGINNER → INDUSTRY LEVEL)' },
    { id: 'h.645zqs8cjx2m', text: '1. What is a Sequential Circuit?' },
    { id: 'h.ths4iydznicg', text: '2. Memory Element in RTL' },
    { id: 'h.doaoze9eao0o', text: '3. Why Non-Blocking Assignment (<=)?' },
    { id: 'h.1kz5d0hdmgqa', text: '4. LATCH vs FLIP-FLOP (RTL VIEW)' },
    { id: 'h.cbsn3z4k2qsg', text: '5. SR FLIP-FLOP (RTL)' },
    { id: 'h.p901zeuhell8', text: '6. D FLIP-FLOP (MOST IMPORTANT)' },
    { id: 'h.2toe1qe3jcfv', text: '7. JK FLIP-FLOP' },
    { id: 'h.4pr7nxker4ow', text: '8. T FLIP-FLOP' },
    { id: 'h.zdho7ehcj6l6', text: '9. REGISTER (4-BIT)' },
    { id: 'h.gv5cf3tvtouh', text: '10. SHIFT REGISTER' },
    { id: 'h.jkfkg4sijxpz', text: '11. COUNTERS' },
    { id: 'h.42ktxoahj9j', text: '11.1 UP COUNTER (4-BIT)' },
    { id: 'h.e37t61ddr08n', text: '11.2 DOWN COUNTER' },
    { id: 'h.6qjwtghlse2m', text: '12. SYNCHRONOUS vs ASYNCHRONOUS RESET' },
    { id: 'h.bb6570cpz9b7', text: '13. COMMON RTL INTERVIEW RULES' },
    { id: 'h.f97ulygud4kd', text: 'CLASS 9 COMPLETE' },
    { id: 'h.o9sljihxwii3', text: 'FINITE STATE MACHINES (FSM) + REAL RTL MINI PROJECTS' },
    { id: 'h.ckyeg4yifwxk', text: '1. What is an FSM (Finite State Machine)?' },
    { id: 'h.hmaqu1ed0a7z', text: '2. Types of FSM' },
    { id: 'h.pjrd6b3klhbd', text: '3. FSM DESIGN FLOW (VERY IMPORTANT)' },
    { id: 'h.xrl30jhyza64', text: '4. FSM EXAMPLE 1 – SIMPLE TOGGLE FSM' },
    { id: 'h.knc2xu28la08', text: '5. FSM EXAMPLE 2 – SEQUENCE DETECTOR (101)' },
    { id: 'h.r4l91u18cto3', text: '6. FSM EXAMPLE 3 – TRAFFIC LIGHT CONTROLLER' },
    { id: 'h.9lfypk7qxvhz', text: '7. RTL MINI PROJECT 1 – HALF ADDER' },
    { id: 'h.9j4jm1yn8x6b', text: '8. RTL MINI PROJECT 2 – FULL ADDER' },
    { id: 'h.hsd3p9px0de', text: '9. Behavioral vs Structural vs Dataflow (RECAP)' },
    { id: 'h.4pah85notdaa', text: '10. INDUSTRY CODING RULES (VERY IMPORTANT)' },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.moduleLayout}>
      <div className={styles.topicsNav}>
        <h2 className={styles.navTitle}>Topics Covered</h2>
        <div className={styles.navButtonsGrid}>
          {(showAllTopics ? headings : headings.slice(0, 9)).map((heading) => (
            <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
              {heading.text}
            </button>
          ))}
        </div>
        {headings.length > 9 && (
          <button 
            onClick={() => setShowAllTopics(!showAllTopics)} 
            className={styles.seeMoreBtn}
          >
            {showAllTopics ? 'See Less' : `See ${headings.length - 9} More Topics`}
          </button>
        )}
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentCard}>
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 1</span>` }} />
          <h2 id="h.m8ku8drh5kvu" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Introduction to RTL, Digital Design &amp; VLSI Context</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.dtzc9gb860b9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is Digital Design? (Very First Concept)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>In digital design, we design </span><span class="c19">hardware circuits</span><span> that work using </span><span class="c19">binary values</span><span class="c1">:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Logic </span><span class="c19">0</span><span class="c1"> → LOW (0V)<br></span></li><li class="c5 li-bullet-0"><span>Logic </span><span class="c19">1</span><span class="c1"> → HIGH (e.g., 1V / 5V)<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">These circuits are made using:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Logic gates<br></span></li><li class="c5 li-bullet-0"><span class="c1">Flip-flops<br></span></li><li class="c5 li-bullet-0"><span class="c1">Registers<br></span></li><li class="c5 li-bullet-0"><span class="c1">Counters<br></span></li><li class="c5 li-bullet-0"><span class="c1">State machines<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">All processors, memories, SoCs, and chips are built from these blocks.</span>` }} />
          <h3 id="h.le6zfynua27l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Real-world example</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Calculator<br></span></li><li class="c5 li-bullet-0"><span class="c1">Mobile processor<br></span></li><li class="c5 li-bullet-0"><span class="c1">Washing machine controller<br></span></li><li class="c5 li-bullet-0"><span class="c1">Traffic light controller<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> All of them internally use </span><span class="c19">digital circuits</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_13.png" alt="Digital Design Fundamental Concepts and Binary Signal Logic" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.yg8oodia7a46" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. What is VLSI and Where RTL Fits?</span>` }} />
          <h3 id="h.9si9ykr4i3tn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">VLSI (Very Large Scale Integration)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>VLSI means </span><span class="c19">putting millions or billions of transistors on a single chip</span><span class="c1">.</span>` }} />
          <h3 id="h.f4pzqxm016nh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Typical VLSI Design Flow:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Specification<br></span></li><li class="c5 li-bullet-0"><span class="c8">RTL Design<br></span></li><li class="c5 li-bullet-0"><span class="c1">Functional Verification<br></span></li><li class="c5 li-bullet-0"><span class="c1">Logic Synthesis<br></span></li><li class="c5 li-bullet-0"><span class="c1">Physical Design (Floorplan, Placement, Routing)<br></span></li><li class="c5 li-bullet-0"><span class="c1">Timing Closure<br></span></li><li class="c5 li-bullet-0"><span class="c1">Fabrication<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">RTL is the FIRST HARDWARE IMPLEMENTATION STEP</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_9.png" alt="VLSI Design Flow Diagram showing RTL Design Stage" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ip9pcnlrjz36" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. What is RTL (Register Transfer Level)?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>RTL describes </span><span class="c19">how data moves between registers on a clock edge</span><span class="c1">.</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">In simple words:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>RTL tells </span><span class="c19">what operation happens</span><span> and </span><span class="c8">when it happens with respect to clock</span>` }} />
          <h3 id="h.gpe5rnk8k3ov" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example in plain English:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">“At every rising edge of clock, add A and B and store the result in register C”</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>That sentence itself is </span><span class="c19">RTL thinking</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.je4wqb2a170x" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Key words in RTL:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Register<br></span></li><li class="c5 li-bullet-0"><span class="c1">Clock<br></span></li><li class="c5 li-bullet-0"><span class="c1">Transfer<br></span></li><li class="c5 li-bullet-0"><span class="c1">Combinational logic between registers<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_14.png" alt="RTL (Register Transfer Level) Data Movement between Registers Diagram" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.o5xoutsz8m1s" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. Why RTL is Needed (Very Important for Students)</span>` }} />
          <h3 id="h.3n3tthl9admy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Question:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Why not directly design transistor-level circuits?</span>` }} />
          <h3 id="h.tq6kckgyfqb4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Answer:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Because:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Too complex<br></span></li><li class="c5 li-bullet-0"><span class="c1">Time-consuming<br></span></li><li class="c5 li-bullet-0"><span class="c1">Error-prone<br></span></li><li class="c5 li-bullet-0"><span class="c1">Not reusable<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">RTL provides:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">Abstraction<br></span></li><li class="c5 li-bullet-0"><span class="c8">Speed<br></span></li><li class="c5 li-bullet-0"><span class="c8">Reusability<br></span></li><li class="c5 li-bullet-0"><span class="c8">Technology independence<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> RTL code works for 28nm, 7nm, 5nm without change.</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.j63doko7jmix" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. Why Verilog/SystemVerilog for RTL?</span>` }} />
          <h3 id="h.sn1amfm37acp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Verilog is:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>A </span><span class="c8">Hardware Description Language (HDL)<br></span></li><li class="c5 li-bullet-0"><span>Used to describe </span><span class="c8">hardware behavior and structure<br></span></li>` }} />
          <h3 id="h.94y83g6ji4zb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Why NOT C / C++ / Python?</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c23" colspan="1" rowspan="1"><p class="c43"><span class="c19">Software Language</span></p></td><td class="c22" colspan="1" rowspan="1"><p class="c43"><span class="c19">HDL (Verilog)</span></p></td></tr><tr class="c3"><td class="c23" colspan="1" rowspan="1"><p class="c6"><span class="c1">Executes line by line</span></p></td><td class="c22" colspan="1" rowspan="1"><p class="c6"><span>Executes </span><span class="c19">parallel</span></p></td></tr><tr class="c3"><td class="c23" colspan="1" rowspan="1"><p class="c6"><span class="c1">Describes algorithm</span></p></td><td class="c22" colspan="1" rowspan="1"><p class="c6"><span>Describes </span><span class="c19">hardware</span></p></td></tr><tr class="c3"><td class="c23" colspan="1" rowspan="1"><p class="c6"><span class="c1">No clock concept</span></p></td><td class="c22" colspan="1" rowspan="1"><p class="c6"><span class="c1">Clock-based</span></p></td></tr><tr class="c3"><td class="c23" colspan="1" rowspan="1"><p class="c6"><span class="c1">One CPU</span></p></td><td class="c22" colspan="1" rowspan="1"><p class="c6"><span class="c1">Millions of gates</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.mlpezhilyhnj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example Difference</span>` }} />
          <h4 id="h.886hfy5sgchu" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c8">C Code (Sequential)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">a = b + c;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">d = a + e;</span>` }} />
          <h4 id="h.fs5igi6tkr7h" className={styles.h4} dangerouslySetInnerHTML={{ __html: `<span class="c8">Verilog (Parallel)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign a = b + c;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign d = a + e;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> In hardware, </span><span class="c19">both run at the same time</span><span class="c1">.</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_4.png" alt="Comparison between Software Execution and Hardware Parallel Execution" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.kdgyqyhbwtw1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. Hardware Thinking vs Software Thinking</span>` }} />
          <h3 id="h.yr17t1akia73" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Software thinking:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">One instruction after another<br></span></li><li class="c5 li-bullet-0"><span class="c1">Single execution path<br></span></li>` }} />
          <h3 id="h.a1x2j3642cn9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Hardware thinking:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Everything happens </span><span class="c8">at the same time<br></span></li><li class="c5 li-bullet-0"><span class="c1">Clock controls state updates<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> This is the </span><span class="c8">biggest mental shift for students</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.v6d5jczb7jbb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. What is a Register?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c19">register</span><span class="c1">:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Stores </span><span class="c8">1 or more bits<br></span></li><li class="c5 li-bullet-0"><span>Updates only on </span><span class="c8">clock edge<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Example:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">D Flip-Flop stores 1 bit<br></span></li><li class="c5 li-bullet-0"><span class="c1">Register stores multiple bits<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_3.png" alt="Digital Register Structure and Clock Driven Storage Concept" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.kld5mmyyfobn" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. Combinational vs Sequential Logic (Foundation)</span>` }} />
          <h3 id="h.4418dfhlvarw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Combinational Logic</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Output depends ONLY on present input<br></span></li><li class="c5 li-bullet-0"><span class="c1">No memory<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Examples:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Adder<br></span></li><li class="c5 li-bullet-0"><span class="c1">MUX<br></span></li><li class="c5 li-bullet-0"><span class="c1">Decoder<br></span></li>` }} />
          <h3 id="h.ssxv2jvfnuff" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Sequential Logic</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Output depends on:<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c6 c18 li-bullet-0"><span class="c1">Present input<br></span></li><li class="c6 c18 li-bullet-0"><span class="c1">Previous output (state)<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Has memory<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Examples:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Flip-flops<br></span></li><li class="c5 li-bullet-0"><span class="c1">Counters<br></span></li><li class="c5 li-bullet-0"><span class="c1">FSM<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_10.png" alt="Comparison Diagram of Combinational Logic vs Sequential Logic Circuits" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.e8domf7xsr9j" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. RTL Coding Styles (Overview – Will Deep Dive Later)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>RTL can be written in </span><span class="c19">three styles</span><span class="c1">:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">Behavioral<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c6 c18 li-bullet-0"><span class="c1">What the circuit does<br></span></li>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">Dataflow<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c6 c18 li-bullet-0"><span class="c1">Boolean equations<br></span></li>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">Structural<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c6 c18 li-bullet-0"><span class="c1">Gate-level connection<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Same circuit → different RTL styles</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.basb23g7ng2d" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. What You Will Learn in This RTL Course (Assurance)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">By the end, students will:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Write </span><span class="c8">clean synthesizable RTL<br></span></li><li class="c5 li-bullet-0"><span>Understand </span><span class="c8">combinational &amp; sequential circuits<br></span></li><li class="c5 li-bullet-0"><span>Code </span><span class="c8">half adder → FSM<br></span></li><li class="c5 li-bullet-0"><span>Understand </span><span class="c8">why PD engineers care about RTL<br></span></li><li class="c5 li-bullet-0"><span>Avoid </span><span class="c8">common RTL mistakes<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.1aelv9p80tv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Class 1 Summary (For Students)</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>RTL is </span><span class="c8">heart of digital design<br></span></li><li class="c5 li-bullet-0"><span>Verilog is used to describe </span><span class="c8">hardware<br></span></li><li class="c5 li-bullet-0"><span class="c1">Hardware ≠ software<br></span></li><li class="c5 li-bullet-0"><span>Everything is </span><span class="c8">clock-driven<br></span></li><li class="c5 li-bullet-0"><span class="c1">This foundation is mandatory before PD</span></li>` }} />
          <hr className={styles.divider} />
          <h1 id="h.njxwurwyf05a" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 2</span>` }} />
          <h2 id="h.74z8h25uqs77" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Verilog Basics | Module Structure | RTL Building Blocks</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c78">Level: Beginner<br></span><span>  </span><span class="c63">Goal: Student should confidently write and read basic RTL code</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.gcd7elyg9uz9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is Verilog? (Clear Definition)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c19">Verilog</span><span> is a </span><span class="c19">Hardware Description Language (HDL)</span><span class="c1"> used to:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Describe </span><span class="c8">digital hardware<br></span></li><li class="c5 li-bullet-0"><span>Model </span><span class="c8">combinational and sequential circuits<br></span></li><li class="c5 li-bullet-0"><span class="c1">Simulate and synthesize real silicon hardware<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Verilog does </span><span class="c19">NOT</span><span> describe software<br>  Verilog describes </span><span class="c8">how hardware behaves and connects</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_7.png" alt="Verilog HDL Role in Modeling Digital Hardware" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.by9uomhkolfl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Structure of a Verilog Design</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Every Verilog design is built using </span><span class="c8">MODULES</span>` }} />
          <h3 id="h.7unb29hsygz9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Real-life analogy:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">Module = Black box<br></span></li><li class="c5 li-bullet-0"><span class="c1">Inputs → Processing → Outputs<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.28zi514h50fk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. Verilog Module Syntax (Very Important)</span>` }} />
          <h3 id="h.fkdz81fv79u9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">General Syntax:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module module_name (port_list);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    // declarations</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    // logic</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.7oa8dgrhitrm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example: Simple AND gate</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module and_gate (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input  a,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input  b,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output y</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    assign y = a &amp; b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <h3 id="h.5yutjf3jbe4n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Explanation:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c9">module and_gate</span><span class="c1"> → Name of the hardware block<br></span></li><li class="c5 li-bullet-0"><span class="c9">input a, b</span><span class="c1"> → Input pins<br></span></li><li class="c5 li-bullet-0"><span class="c9">output y</span><span class="c1"> → Output pin<br></span></li><li class="c5 li-bullet-0"><span class="c9">assign</span><span class="c1"> → Continuous assignment (combinational logic)<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_6.png" alt="Verilog Module Syntax Structure and Port Declaration Diagram" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.vfonlj9bg2x7" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. Ports in Verilog (Inputs &amp; Outputs)</span>` }} />
          <h3 id="h.4899wulk93eg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Types of Ports:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c0">input<br></span></li><li class="c5 li-bullet-0"><span class="c0">output<br></span></li><li class="c5 li-bullet-0"><span class="c9">inout</span><span class="c1"> (used rarely in RTL)<br></span></li>` }} />
          <h3 id="h.xnb23tt5t38h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">input  clk;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">input  rst;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">output out;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Inputs </span><span class="c19">drive</span><span> the module<br>  Outputs are </span><span class="c8">driven by the module</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.7ac2qyp719q2" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. Data Types in Verilog (Critical for Beginners)</span>` }} />
          <h3 id="h.zgofqnnzuzpz" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Main Data Types:</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c55" colspan="1" rowspan="1"><p class="c7"><span class="c19">Type</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c7"><span class="c19">Meaning</span></p></td></tr><tr class="c3"><td class="c55" colspan="1" rowspan="1"><p class="c2"><span class="c9">wire</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c2"><span class="c1">Used for combinational connections</span></p></td></tr><tr class="c3"><td class="c55" colspan="1" rowspan="1"><p class="c2"><span class="c9">reg</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c2"><span class="c1">Used to store values (inside always block)</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.3dwfq22tt5hs" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">5.1 </span><span class="c62 c51 c19">wire</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Represents </span><span class="c8">physical wire<br></span></li><li class="c5 li-bullet-0"><span class="c1">Cannot store value<br></span></li><li class="c5 li-bullet-0"><span>Used with </span><span class="c0">assign<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">wire sum;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign sum = a ^ b;</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.sad1eriet4ys" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">5.2 </span><span class="c51 c19 c62">reg</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Represents </span><span class="c8">storage<br></span></li><li class="c5 li-bullet-0"><span>Used inside </span><span class="c9">always</span><span class="c1"> blocks<br></span></li><li class="c5 li-bullet-0"><span class="c1">Holds value until changed<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">reg q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c19">reg does NOT mean register always<br></span><span class="c1">  Depends on how it is coded</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_8.png" alt="Verilog Data Types Comparison: wire vs reg" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.h53gftomvfpb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">6. Continuous Assignment (</span><span class="c52 c19 c61">assign</span><span class="c13">)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Used for </span><span class="c8">combinational logic</span>` }} />
          <h3 id="h.bt555aqxsnk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Syntax:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign output = expression;</span>` }} />
          <h3 id="h.bkgclu1x17g6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign y = (a &amp; b) | c;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Executes </span><span class="c19">continuously<br></span><span>  Hardware equivalent: </span><span class="c8">logic gates</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.m7s84vd7flgd" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. Always Block (Core of RTL)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Used for:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Sequential logic<br></span></li><li class="c5 li-bullet-0"><span class="c1">Complex combinational logic<br></span></li>` }} />
          <h3 id="h.3ugnozarikzd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Syntax:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(sensitivity_list)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    // statements</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.tphwepprqgeo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. Combinational Always Block</span>` }} />
          <h3 id="h.tl2agb2nniz7" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Sensitivity List:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*)</span>` }} />
          <h3 id="h.stnpi0qwlbxt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example: 2:1 MUX</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module mux2 (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input b,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input sel,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg y</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (sel)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        y = b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        y = a;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c9">@(*)</span><span> → All inputs automatically included<br>  Use </span><span class="c19">blocking assignment (</span><span class="c19 c52">=</span><span class="c8">)</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_11.png" alt="2:1 Multiplexer (MUX) Logic Circuit and RTL Implementation" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.eynqwsayztpp" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. Sequential Always Block (Clocked Logic)</span>` }} />
          <h3 id="h.6xr8ava13fdl" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Syntax:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">or</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(negedge clk)</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.zc0oyd9nur8f" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example: D Flip-Flop</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module dff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input d,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Use </span><span class="c19">non-blocking assignment (</span><span class="c52 c19">&lt;=</span><span class="c19">)<br></span><span>  Represents </span><span class="c8">flip-flop</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_1.png" alt="D Flip-Flop Circuit Diagram and Sequential Logic Symbol" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ev0lblh6csk3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. Blocking vs Non-Blocking Assignment (Very Important)</span>` }} />
          <h3 id="h.ldi5p7pr3d2t" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">Blocking (</span><span class="c51 c19">=</span><span class="c15">):</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Used in </span><span class="c8">combinational<br></span></li><li class="c5 li-bullet-0"><span class="c1">Executes line by line<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">a = b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">c = a;</span>` }} />
          <h3 id="h.hjr70k8hgcnn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">Non-blocking (</span><span class="c19 c51">&lt;=</span><span class="c15">):</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Used in </span><span class="c8">sequential<br></span></li><li class="c5 li-bullet-0"><span class="c1">Executes in parallel<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">a &lt;= b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">c &lt;= a;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c19">Golden Rule</span><span class="c1">:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Combinational → </span><span class="c0">=<br></span></li><li class="c5 li-bullet-0"><span>Sequential → </span><span class="c0">&lt;=<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.pu2ztucqcif3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11. Reset in Sequential Logic</span>` }} />
          <h3 id="h.e1mwr9t5g85k" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Asynchronous Reset</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk or posedge rst)</span>` }} />
          <h3 id="h.jumindmlwvo5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk or posedge rst) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 1'b0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_12.png" alt="Asynchronous Reset Logic in Sequential Digital Circuits" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.pjulptur55v0" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">12. Simulation vs Synthesis (Must Understand)</span>` }} />
          <h3 id="h.pnzdp3ejf7v8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Simulation:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Verifies </span><span class="c8">logic correctness<br></span></li><li class="c5 li-bullet-0"><span class="c1">Uses testbench<br></span></li><li class="c5 li-bullet-0"><span class="c1">No real hardware<br></span></li>` }} />
          <h3 id="h.btu4f55o0x6o" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Synthesis:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Converts RTL → </span><span class="c8">gates<br></span></li><li class="c5 li-bullet-0"><span class="c1">Used for chip fabrication<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Some code </span><span class="c8">simulates but does NOT synthesize</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.21sqxksvnkwx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">13. First RTL Design Flow</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Write RTL<br></span></li><li class="c5 li-bullet-0"><span class="c1">Compile<br></span></li><li class="c5 li-bullet-0"><span class="c1">Simulate<br></span></li><li class="c5 li-bullet-0"><span class="c1">Debug<br></span></li><li class="c5 li-bullet-0"><span class="c1">Synthesize<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.zhvjobk4l0nf" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Class 2 Summary</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ What is Verilog<br> ✔ Module structure<br> ✔ Inputs / Outputs<br> ✔ wire vs reg<br> ✔ assign<br> ✔ always block<br> ✔ combinational vs sequential<br> ✔ blocking vs non-blocking</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 3</span>` }} />
          <h2 id="h.fl09j03kkj5e" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Combinational Circuits using Verilog RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Beginner Level<br>  Goal: Student must be able to </span><span class="c19">write, read, and understand RTL code</span><span class="c1"> for all basic combinational circuits<br>  Coding Styles Covered:<br> ✔ Behavioral<br> ✔ Dataflow<br> ✔ Structural</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.grmpxcwlnp8b" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is a Combinational Circuit?</span>` }} />
          <h3 id="h.oc08h8kudwkj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Definition:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c19">combinational circuit</span><span class="c1"> is a digital circuit where:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Output depends </span><span class="c8">ONLY on present inputs<br></span></li><li class="c5 li-bullet-0"><span class="c1">No memory<br></span></li><li class="c5 li-bullet-0"><span class="c1">No clock<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Example: Adder, MUX, Decoder, Encoder</span>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_2.png" alt="Combinational Circuit Fundamentals and Input-Output Relationship" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.pawyfl1nsuij" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Coding Styles in RTL (VERY IMPORTANT)</span>` }} />
          <h3 id="h.omxlgdymfnp0" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">1️⃣ Behavioral Style</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Uses </span><span class="c0">always @(*)<br></span></li><li class="c5 li-bullet-0"><span class="c1">High-level logic (if, case)<br></span></li>` }} />
          <h3 id="h.geh147shvk1e" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">2️⃣ Dataflow Style</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Uses </span><span class="c0">assign<br></span></li><li class="c5 li-bullet-0"><span class="c1">Boolean equations<br></span></li>` }} />
          <h3 id="h.45werr2oj1pu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">3️⃣ Structural Style</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Gate-level modeling<br></span></li><li class="c5 li-bullet-0"><span class="c1">Uses AND, OR, XOR modules<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Industry uses all three</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.5b0fxle2bli3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. HALF ADDER</span>` }} />
          <h3 id="h.u69u8b6eoubi" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Adds </span><span class="c8">two 1-bit numbers</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">A</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c7"><span class="c19">B</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c7"><span class="c19">Sum</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c19">Carry</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td></tr></tbody>` }} />
          </div>
          <h3 id="h.3q2am411640v" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Boolean Expressions:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Sum = A ⊕ B<br></span></li><li class="c5 li-bullet-0"><span class="c1">Carry = A · B<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.imageContainer}>
            <img loading="lazy" src="/assets/modules/module5/image_5.png" alt="Half Adder Logic Gate Diagram and Truth Table" className={styles.contentImage} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.wf9p9s4cj26i" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">3.1 Half Adder – Dataflow Style</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module half_adder_df (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input b,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output sum,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output carry</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign sum   = a ^ b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign carry = a &amp; b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.p91m6pqc3oje" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">3.2 Half Adder – Behavioral Style</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module half_adder_beh (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input b,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg sum,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg carry</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    sum   = a ^ b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    carry = a &amp; b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.a269w2scrbo6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">3.3 Half Adder – Structural Style</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module half_adder_struct (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input b,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output sum,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output carry</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">xor (sum, a, b);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">and (carry, a, b);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Structural = Gate-level</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.gbk4rktroep" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. FULL ADDER</span>` }} />
          <h3 id="h.ws65hpam38zu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Adds </span><span class="c19">3 bits</span><span class="c1"> → A, B, Cin</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">A</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c7"><span class="c19">B</span></p></td><td class="c77" colspan="1" rowspan="1"><p class="c7"><span class="c19">Cin</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c7"><span class="c19">Sum</span></p></td><td class="c75" colspan="1" rowspan="1"><p class="c7"><span class="c19">Cout</span></p></td></tr></tbody>` }} />
          </div>
          <h3 id="h.m1nrvzew5w7q" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Boolean Expressions:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Sum = A ⊕ B ⊕ Cin<br></span></li><li class="c5 li-bullet-0"><span class="c1">Cout = AB + BCin + ACin<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.itvd4ont96s2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">4.1 Full Adder – Dataflow</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module full_adder_df (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a, b, cin,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output sum, cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign sum  = a ^ b ^ cin;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign cout = (a &amp; b) | (b &amp; cin) | (a &amp; cin);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.8cdfb58eiog1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">4.2 Full Adder – Behavioral</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module full_adder_beh (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a, b, cin,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg sum, cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    sum  = a ^ b ^ cin;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    cout = (a &amp; b) | (b &amp; cin) | (a &amp; cin);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.2dc1xceb2aaq" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">4.3 Full Adder – Structural (Using Half Adders)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module full_adder_struct (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a, b, cin,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output sum, cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">wire s1, c1, c2;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">half_adder_df ha1 (a, b, s1, c1);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">half_adder_df ha2 (s1, cin, sum, c2);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign cout = c1 | c2;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">This is VERY important for interviews</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.fl15ufrachmh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. 2:1 MULTIPLEXER</span>` }} />
          <h3 id="h.p2z5qpd42y86" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Selects </span><span class="c19">one input</span><span> based on </span><span class="c0">sel</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c19">Sel</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">Y</span></p></td></tr><tr class="c3"><td class="c37" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">A</span></p></td></tr><tr class="c3"><td class="c37" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">B</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.chv8w1u2poyt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">5.1 MUX – Dataflow</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign y = sel ? b : a;</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.7y1r3ecppcnn" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">5.2 MUX – Behavioral</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (sel)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        y = b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        y = a;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.panu9x409qtz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. DECODER (2:4 Decoder)</span>` }} />
          <h3 id="h.bj9p2g9z7z74" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Converts binary input → one-hot output</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c19">A1</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c19">A0</span></p></td><td class="c76" colspan="1" rowspan="1"><p class="c7"><span class="c19">Y3 Y2 Y1 Y0</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.wn0g4fzdnq89" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Decoder RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module decoder_2x4 (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a1, a0,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ y</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    y = 4'b0000;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case ({a1,a0})</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b00: y = 4'b0001;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b01: y = 4'b0010;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b10: y = 4'b0100;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b11: y = 4'b1000;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.s7o2ryhunl90" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. ENCODER (4:2 Encoder)</span>` }} />
          <h3 id="h.az0zitjg0yat" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Reverse of decoder</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.57ihxz6ch929" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Encoder RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module encoder_4x2 (</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 3:0 $$ y,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 1:0 $$ a</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (y)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b0001: a = 2'b00;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b0010: a = 2'b01;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b0100: a = 2'b10;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b1000: a = 2'b11;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        default: a = 2'b00;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.nz3bzpa11mpc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. MAGNITUDE COMPARATOR (1-bit)</span>` }} />
          <h3 id="h.adv2bjho89zw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Outputs:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">G → A &gt; B<br></span></li><li class="c5 li-bullet-0"><span class="c1">E → A == B<br></span></li><li class="c5 li-bullet-0"><span class="c1">L → A &lt; B<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.wbqvy2f4syk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Comparator RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module comparator_1bit (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input a, b,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output g, e, l</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign g = a &amp; ~b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign e = ~(a ^ b);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign l = ~a &amp; b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.k7f99k1zgxap" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">CLASS 3 SUMMARY</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Combinational logic<br> ✔ 3 RTL coding styles<br> ✔ Half Adder<br> ✔ Full Adder<br> ✔ MUX<br> ✔ Decoder<br> ✔ Encoder<br> ✔ Comparator</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 4</span>` }} />
          <h2 id="h.ujnh3scnlwyr" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Sequential Circuits using Verilog RTL (Beginner → Industry Ready)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Level: Beginner<br>  Goal: Student must </span><span class="c19">clearly understand memory, clock, flip-flops, and RTL coding<br></span><span class="c1">  Focus:<br> ✔ What makes sequential different<br> ✔ All latches &amp; flip-flops<br> ✔ Proper RTL coding style (industry standard)<br> ✔ Reset concepts<br> ✔ Examples with explanation</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ku6i0wse76xc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is a Sequential Circuit?</span>` }} />
          <h3 id="h.frp3wa6adz6n" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Definition:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c19">sequential circuit</span><span class="c1"> is a digital circuit where:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Output depends on<br>  </span><span class="c19">Present input<br></span><span>  </span><span class="c8">Previous output (memory)<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Memory is stored using </span><span class="c8">latches and flip-flops</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.rhr1jn113p7x" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Key Difference</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c70" colspan="1" rowspan="1"><p class="c7"><span class="c19">Feature</span></p></td><td class="c54" colspan="1" rowspan="1"><p class="c7"><span class="c19">Combinational</span></p></td><td class="c45" colspan="1" rowspan="1"><p class="c7"><span class="c19">Sequential</span></p></td></tr><tr class="c35"><td class="c70" colspan="1" rowspan="1"><p class="c2"><span class="c1">Memory</span></p></td><td class="c54" colspan="1" rowspan="1"><p class="c2"><span class="c1"> No</span></p></td><td class="c45" colspan="1" rowspan="1"><p class="c2"><span class="c1"> Yes</span></p></td></tr><tr class="c35"><td class="c70" colspan="1" rowspan="1"><p class="c2"><span class="c1">Clock</span></p></td><td class="c54" colspan="1" rowspan="1"><p class="c2"><span class="c1"> No</span></p></td><td class="c45" colspan="1" rowspan="1"><p class="c2"><span class="c1"> Yes</span></p></td></tr><tr class="c35"><td class="c70" colspan="1" rowspan="1"><p class="c2"><span class="c1">Depends on past</span></p></td><td class="c54" colspan="1" rowspan="1"><p class="c2"><span class="c1"> No</span></p></td><td class="c45" colspan="1" rowspan="1"><p class="c2"><span class="c1"> Yes</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.j69kgrpxuhwo" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Clock – Heart of Sequential Logic</span>` }} />
          <h3 id="h.9w1z1ixv28cj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">What is a Clock?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">A periodic signal (0 → 1 → 0)<br></span></li><li class="c5 li-bullet-0"><span>Controls </span><span class="c8">when data is stored<br></span></li>` }} />
          <h3 id="h.9f1b6ajhuby6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Types:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Positive edge (</span><span class="c9">posedge</span><span class="c1">)<br></span></li><li class="c5 li-bullet-0"><span>Negative edge (</span><span class="c9">negedge</span><span class="c1">)<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Flip-flops work only on clock edge</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.cp5vbp3i5za3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. Latch vs Flip-Flop (VERY IMPORTANT)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c44" colspan="1" rowspan="1"><p class="c7"><span class="c19">Feature</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c19">Latch</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c19">Flip-Flop</span></p></td></tr><tr class="c3"><td class="c44" colspan="1" rowspan="1"><p class="c2"><span class="c1">Trigger</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c2"><span class="c1">Level</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c2"><span class="c1">Edge</span></p></td></tr><tr class="c3"><td class="c44" colspan="1" rowspan="1"><p class="c2"><span class="c1">Clock</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c2"><span class="c1">Enable</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c2"><span class="c1">Clock</span></p></td></tr><tr class="c35"><td class="c44" colspan="1" rowspan="1"><p class="c2"><span class="c1">Safe for RTL</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c2 c4"><span class="c1"></span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c2 c4"><span class="c1"></span></p></td></tr></tbody>` }} />
          </div>
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Industry uses Flip-Flops, not latches</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.kef2f4arjyfj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. SR LATCH (Basic Memory)</span>` }} />
          <h3 id="h.m6oqs0m4l30l" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Stores 1 bit<br></span></li><li class="c5 li-bullet-0"><span>Controlled by </span><span class="c19">S (Set)</span><span> and </span><span class="c8">R (Reset)<br></span></li>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c7"><span class="c19">S</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">R</span></p></td><td class="c11" colspan="1" rowspan="1"><p class="c7"><span class="c19">Q</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c11" colspan="1" rowspan="1"><p class="c2"><span class="c1">Hold</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c11" colspan="1" rowspan="1"><p class="c2"><span class="c1">Set</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c11" colspan="1" rowspan="1"><p class="c2"><span class="c1">Reset</span></p></td></tr><tr class="c35"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c11" colspan="1" rowspan="1"><p class="c2"><span class="c1"> Invalid</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.o471vs9se893" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">SR Latch RTL (Behavioral)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module sr_latch (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input s, r,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (s &amp;&amp; !r)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q = 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else if (!s &amp;&amp; r)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q = 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Avoid latch usage in real RTL</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.89xrltbetqei" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. D LATCH</span>` }} />
          <h3 id="h.si5o519s7m74" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Why D Latch?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Removes invalid condition<br></span></li><li class="c5 li-bullet-0"><span>Single input </span><span class="c0">D<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.37rsmofktr7y" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">D Latch RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module d_latch (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input d, en,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (en)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q = d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Still </span><span class="c19">level sensitive</span><span class="c1"> → not preferred</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ufga5pqft041" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. FLIP-FLOPS (MAIN FOCUS)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.7xtitp339ff9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6.1 D Flip-Flop (MOST IMPORTANT)</span>` }} />
          <h3 id="h.mjs5ekf4hli6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Stores data </span><span class="c8">only on clock edge<br></span></li>` }} />
          <h3 id="h.z0hfbirakj4w" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Equation:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Q(t+1) = D</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.7fg88zpgmhyw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">D Flip-Flop RTL (Industry Standard)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module d_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input d,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c9">&lt;=</span><span> is </span><span class="c19">non-blocking assignment</span><span class="c1"> (mandatory)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.wrf933hqwr1k" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. Reset in Flip-Flops</span>` }} />
          <h3 id="h.rwkwi3ez1s7z" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Why Reset?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">To initialize registers<br></span></li><li class="c5 li-bullet-0"><span>Prevent unknown (</span><span class="c9">X</span><span class="c1">) values<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.932k1m91xlyc" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7.1 Asynchronous Reset</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk or posedge rst) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>✔ Reset works </span><span class="c8">immediately</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.aiceqi2h8tei" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7.2 Synchronous Reset</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Reset only on clock edge</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Industry prefers synchronous reset</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.wwn0tnupcvy" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. JK Flip-Flop</span>` }} />
          <h3 id="h.7zi81x7sm0ks" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">No invalid state<br></span></li><li class="c5 li-bullet-0"><span class="c1">Toggle when J = K = 1<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.p3tc6d1td2xu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">JK Flip-Flop RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module jk_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk, j, k,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case ({j,k})</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b00: q &lt;= q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b01: q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b10: q &lt;= 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b11: q &lt;= ~q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.mh26rtnzw0qq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. T Flip-Flop</span>` }} />
          <h3 id="h.udvpc7czmlm4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Toggle when T = 1<br></span></li>` }} />
          <h3 id="h.tomjeuri7ozj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Equation:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Q(t+1) = Q ⊕ T</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.mjx4dciizl7m" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">T Flip-Flop RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module t_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk, t,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (t)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= ~q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c8">counters</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.v1s209fav56d" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. SR Flip-Flop (Clocked)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module sr_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk, s, r,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (s &amp;&amp; !r)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else if (!s &amp;&amp; r)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.57pao5qlbeid" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11. Registers (Multiple Flip-Flops)</span>` }} />
          <h3 id="h.9mzuhap1c0pb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example: 4-bit Register</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module register_4bit (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 3:0 $$ d,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Registers are everywhere in chips</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.z5wq1pcf6y8h" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">12. Blocking vs Non-Blocking (INTERVIEW MUST)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c31" colspan="1" rowspan="1"><p class="c7"><span class="c19">Type</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c19">Symbol</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c7"><span class="c19">Used in</span></p></td></tr><tr class="c3"><td class="c31" colspan="1" rowspan="1"><p class="c2"><span class="c1">Blocking</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c9">=</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c2"><span class="c1">Combinational</span></p></td></tr><tr class="c3"><td class="c31" colspan="1" rowspan="1"><p class="c2"><span class="c1">Non-Blocking</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c9">&lt;=</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c2"><span class="c1">Sequential</span></p></td></tr></tbody>` }} />
          </div>
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Wrong:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">q = d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Correct:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">q &lt;= d;</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.vce6qcmaaduv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">CLASS 4 SUMMARY</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Sequential logic concept<br> ✔ Clock &amp; memory<br> ✔ Latches vs flip-flops<br> ✔ D, JK, T, SR flip-flops<br> ✔ Reset types<br> ✔ Industry RTL style</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 5</span>` }} />
          <h2 id="h.docwik11gder" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Counters &amp; Shift Registers using Verilog RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c63">(All Sequential Circuits – Industry + Interview Ready)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ttcz8i9akla6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is a Counter?</span>` }} />
          <h3 id="h.frc9x055kw8p" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Definition</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c19">counter</span><span> is a </span><span class="c19">sequential circuit</span><span class="c1"> that:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Counts clock pulses<br></span></li><li class="c5 li-bullet-0"><span class="c1">Changes output in a fixed sequence<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Counters are built using </span><span class="c8">flip-flops</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.yzoi8bf1lsii" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Types of Counters</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c26" colspan="1" rowspan="1"><p class="c7"><span class="c19">Type</span></p></td><td class="c20" colspan="1" rowspan="1"><p class="c7"><span class="c19">Description</span></p></td></tr><tr class="c3"><td class="c26" colspan="1" rowspan="1"><p class="c2"><span class="c1">Up Counter</span></p></td><td class="c20" colspan="1" rowspan="1"><p class="c2"><span class="c1">Counts 0 → 15</span></p></td></tr><tr class="c3"><td class="c26" colspan="1" rowspan="1"><p class="c2"><span class="c1">Down Counter</span></p></td><td class="c20" colspan="1" rowspan="1"><p class="c2"><span class="c1">Counts 15 → 0</span></p></td></tr><tr class="c3"><td class="c26" colspan="1" rowspan="1"><p class="c2"><span class="c1">Up-Down Counter</span></p></td><td class="c20" colspan="1" rowspan="1"><p class="c2"><span class="c1">Both directions</span></p></td></tr><tr class="c3"><td class="c26" colspan="1" rowspan="1"><p class="c2"><span class="c1">Mod-N Counter</span></p></td><td class="c20" colspan="1" rowspan="1"><p class="c2"><span class="c1">Counts 0 → N-1</span></p></td></tr><tr class="c3"><td class="c26" colspan="1" rowspan="1"><p class="c2"><span class="c1">Ring Counter</span></p></td><td class="c20" colspan="1" rowspan="1"><p class="c2"><span class="c1">Single 1 circulates</span></p></td></tr><tr class="c3"><td class="c26" colspan="1" rowspan="1"><p class="c2"><span class="c1">Johnson Counter</span></p></td><td class="c20" colspan="1" rowspan="1"><p class="c2"><span class="c1">Twisted ring</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.x0j3qka560h1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. 4-Bit UP Counter</span>` }} />
          <h3 id="h.hbk4cpkkhaj2" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Truth Example</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">0000 → 0001 → 0010 → 0011 → ... → 1111</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.mz8pzwfgrk37" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code (Behavioral)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module up_counter (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ count</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= 4'b0000;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= count + 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <h3 id="h.d5u2itaiwvh3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Explanation</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">On reset → counter = 0<br></span></li><li class="c5 li-bullet-0"><span class="c1">Every clock → increment<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ai0bpmdgloa3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. 4-Bit DOWN Counter</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module down_counter (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ count</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= 4'b1111;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= count - 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c8">timers</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.dk7fyyk8cq7v" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. UP-DOWN Counter</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module up_down_counter (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input mode,      // 1 = up, 0 = down</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ count</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else if (mode)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= count + 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= count - 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.nv4nt99uavkh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. MOD-N Counter (Example: MOD-10)</span>` }} />
          <h3 id="h.6jbllgosg169" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Why Mod Counter?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Used in:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Digital clocks<br></span></li><li class="c5 li-bullet-0"><span class="c1">Frequency division<br></span></li>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module mod10_counter (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ count</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst || count == 9)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= count + 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.d4khyohb3lpl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. Ring Counter</span>` }} />
          <h3 id="h.4lrqhe2n34o8" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Definition</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Only </span><span class="c8">one bit = 1<br></span></li><li class="c5 li-bullet-0"><span class="c1">Rotates each clock<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">0001 → 0010 → 0100 → 1000 → 0001</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module ring_counter (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 4'b0001;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= {q$$ 2:0 $$, q$$ 3 $$};</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Used in </span><span class="c8">FSM, control units</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.g3gtmua08hf3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. Johnson Counter</span>` }} />
          <h3 id="h.kcmv7ji5mfsh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Definition</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Inverted feedback<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">0000 → 1000 → 1100 → 1110 → 1111 → 0111 → ...</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module johnson_counter (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= {~q$$ 0 $$, q$$ 3:1 $$};</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.1o3l2dq8fx73" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. Shift Registers</span>` }} />
          <h3 id="h.6idky6x252sb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">What is a Shift Register?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Stores data<br></span></li><li class="c5 li-bullet-0"><span class="c1">Shifts left or right<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.c9bzsrisxr69" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. Types of Shift Registers</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c30" colspan="1" rowspan="1"><p class="c7"><span class="c19">Type</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c7"><span class="c19">Meaning</span></p></td></tr><tr class="c3"><td class="c30" colspan="1" rowspan="1"><p class="c2"><span class="c1">SISO</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c2"><span class="c1">Serial In Serial Out</span></p></td></tr><tr class="c3"><td class="c30" colspan="1" rowspan="1"><p class="c2"><span class="c1">SIPO</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c2"><span class="c1">Serial In Parallel Out</span></p></td></tr><tr class="c3"><td class="c30" colspan="1" rowspan="1"><p class="c2"><span class="c1">PISO</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c2"><span class="c1">Parallel In Serial Out</span></p></td></tr><tr class="c3"><td class="c30" colspan="1" rowspan="1"><p class="c2"><span class="c1">PIPO</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c2"><span class="c1">Parallel In Parallel Out</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.xsnm65g01esi" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11. SISO Shift Register</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module siso (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input din,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg dout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">reg $$ 3:0 $$ shift;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    shift &lt;= {shift$$ 2:0 $$, din};</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    dout &lt;= shift$$ 3 $$;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.d5tp8vgiayke" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">12. SIPO Shift Register</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module sipo (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input din,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    q &lt;= {q$$ 2:0 $$, din};</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.5zhioigd56h" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">13. PISO Shift Register</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module piso (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input load,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 3:0 $$ din,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg dout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">reg $$ 3:0 $$ temp;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (load)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        temp &lt;= din;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else begin</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">        dout &lt;= temp$$ 0 $$;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        temp &lt;= temp &gt;&gt; 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.1alrzkml0az3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">14. PIPO Shift Register</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module pipo (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 3:0 $$ din,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    q &lt;= din;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.go2goy8tiytg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">CLASS 5 SUMMARY</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ All counter types<br> ✔ Ring &amp; Johnson counters<br> ✔ Shift register types<br> ✔ Clean RTL coding<br> ✔ Reset handling</span>` }} />
          <h1 id="h.j7sbf6ivilhx" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 6</span>` }} />
          <h2 id="h.ar85nikvs3ko" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c61 c19">Finite State Machines (FSM) – COMPLETE BEGINNER TO INDUSTRY LEVEL</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.pcn3jwldyuik" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is an FSM?</span>` }} />
          <h3 id="h.68a1g1gikpdt" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Definition</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c19">Finite State Machine (FSM)</span><span> is a </span><span class="c19">sequential circuit</span><span class="c1"> that:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Has a </span><span class="c8">finite number of states<br></span></li><li class="c5 li-bullet-0"><span class="c1">Changes state based on:<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c6 c18 li-bullet-0"><span class="c1">Present state<br></span></li><li class="c6 c18 li-bullet-0"><span class="c1">Input<br></span></li><li class="c6 c18 li-bullet-0"><span class="c1">Clock<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> FSM = </span><span class="c8">Control Logic of SOC</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.aek0kf35o7oz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Why FSM is Important in Industry?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">FSM is used in:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Traffic light controllers<br></span></li><li class="c5 li-bullet-0"><span class="c1">USB controllers<br></span></li><li class="c5 li-bullet-0"><span class="c1">Memory controllers<br></span></li><li class="c5 li-bullet-0"><span class="c1">Cache controllers<br></span></li><li class="c5 li-bullet-0"><span class="c1">Handshake logic<br></span></li><li class="c5 li-bullet-0"><span class="c1">Protocols (I2C, SPI, AXI)<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">90% of control logic = FSM</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.welnei2ekw7q" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. FSM Basic Blocks</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">+------------------+</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">|  State Register  | ← Clock</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">+------------------+</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">         |</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">         v</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">+------------------+</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">| Next State Logic |</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">+------------------+</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">         |</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">         v</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">+------------------+</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">|  Output Logic    |</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">+------------------+</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.5tl26fd6xcgk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. Types of FSM</span>` }} />
          <h3 id="h.sn50fdrkdd2h" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">1️⃣ Moore Machine</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Output depends </span><span class="c8">only on state<br></span></li>` }} />
          <h3 id="h.5r887s540zla" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">2️⃣ Mealy Machine</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Output depends on </span><span class="c8">state + input<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c66" colspan="1" rowspan="1"><p class="c7"><span class="c19">Feature</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c19">Moore</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c7"><span class="c19">Mealy</span></p></td></tr><tr class="c3"><td class="c66" colspan="1" rowspan="1"><p class="c2"><span class="c1">Output change</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">On clock</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c2"><span class="c1">Immediately</span></p></td></tr><tr class="c3"><td class="c66" colspan="1" rowspan="1"><p class="c2"><span class="c1">Speed</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">Slower</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c2"><span class="c1">Faster</span></p></td></tr><tr class="c3"><td class="c66" colspan="1" rowspan="1"><p class="c2"><span class="c1">Glitches</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">No</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c2"><span class="c1">Possible</span></p></td></tr><tr class="c3"><td class="c66" colspan="1" rowspan="1"><p class="c2"><span class="c1">Industry use</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">More</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c2"><span class="c1">Less</span></p></td></tr></tbody>` }} />
          </div>
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Moore FSM is preferred in RTL design</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.z82hwl6pi3r4" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. FSM Design Steps (VERY IMPORTANT)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Every FSM in industry follows these steps:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Problem statement<br></span></li><li class="c5 li-bullet-0"><span class="c1">State diagram<br></span></li><li class="c5 li-bullet-0"><span class="c1">State table<br></span></li><li class="c5 li-bullet-0"><span class="c1">State encoding<br></span></li><li class="c5 li-bullet-0"><span class="c1">RTL coding<br></span></li><li class="c5 li-bullet-0"><span class="c1">Simulation<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ot0ilbrtvuik" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. Example 1: Simple FSM (2-State Switch)</span>` }} />
          <h3 id="h.l583ebk8eo72" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Problem</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Input = </span><span class="c0">sw<br></span></li><li class="c5 li-bullet-0"><span>Output = </span><span class="c0">led<br></span></li><li class="c5 li-bullet-0"><span class="c1">Toggle LED when switch = 1<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.tjpa6do8t9ox" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">State Diagram</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">OFF ----sw=1----&gt; ON</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">ON  ----sw=1----&gt; OFF</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.9ueyuqfku256" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. RTL Coding Style for FSM (STANDARD STYLE)</span>` }} />
          <h3 id="h.xonytxomlfyo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Three Always Blocks (Industry Standard)</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">State register<br></span></li><li class="c5 li-bullet-0"><span class="c1">Next state logic<br></span></li><li class="c5 li-bullet-0"><span class="c1">Output logic<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.90zjvrib1vaz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. FSM RTL Code (Moore FSM)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module simple_fsm (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input sw,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg led</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">typedef enum logic $$ 0:0 $$ {OFF, ON} state_t;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">state_t present_state, next_state;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">/* State Register */</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        present_state &lt;= OFF;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        present_state &lt;= next_state;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">/* Next State Logic */</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (present_state)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        OFF: if (sw) next_state = ON;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">             else    next_state = OFF;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        ON:  if (sw) next_state = OFF;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">             else    next_state = ON;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">/* Output Logic */</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (present_state)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        OFF: led = 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        ON : led = 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.gqbl9nq4x5rx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. Example 2: Traffic Light Controller (Moore FSM)</span>` }} />
          <h3 id="h.fr8dpgw9bswv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">States</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">RED<br></span></li><li class="c5 li-bullet-0"><span class="c1">YELLOW<br></span></li><li class="c5 li-bullet-0"><span class="c1">GREEN<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.wtxbemb6xrxr" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">State Flow</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">RED → GREEN → YELLOW → RED</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.owjzb5juxqzz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. RTL Code: Traffic Light FSM</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module traffic_light (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg red,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg yellow,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg green</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">typedef enum logic $$ 1:0 $$ {RED, GREEN, YELLOW} state_t;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">state_t ps, ns;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">/* State Register */</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        ps &lt;= RED;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        ps &lt;= ns;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">/* Next State Logic */</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (ps)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        RED    : ns = GREEN;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        GREEN  : ns = YELLOW;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        YELLOW : ns = RED;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        default: ns = RED;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">/* Output Logic */</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    red = 0; yellow = 0; green = 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (ps)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        RED    : red = 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        GREEN  : green = 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        YELLOW : yellow = 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.iy2e057402dr" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11. Mealy FSM Example (Sequence Detector – 101)</span>` }} />
          <h3 id="h.1urz3b8s7akc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Output becomes HIGH immediately</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module seq_101 (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input in,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg out</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">typedef enum logic $$ 1:0 $$ {S0, S1, S2} state_t;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">state_t ps, ns;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst) ps &lt;= S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else ps &lt;= ns;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    out = 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (ps)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S0: ns = in ? S1 : S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S1: ns = in ? S1 : S2;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S2: begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">                if (in) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">                    ns = S1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">                    out = 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">                end else ns = S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">            end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.nbplqlj3i6ng" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">12. Common FSM Mistakes (INTERVIEW)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Missing default case<br>  Latch inference<br>  Mixing blocking &amp; non-blocking<br>  No reset<br>  Output in wrong always block</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.nzyt06qme14" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">13. FSM Coding Best Practices</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>✔ Use </span><span class="c9">typedef enum<br></span><span class="c1"> ✔ Separate always blocks<br> ✔ Use non-blocking for registers<br> ✔ Default assignments<br> ✔ Reset logic mandatory</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.k57zp0y97kha" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">CLASS 6 SUMMARY</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ FSM fundamentals<br> ✔ Moore &amp; Mealy<br> ✔ Industry coding style<br> ✔ Traffic light example<br> ✔ Sequence detector</span>` }} />
          <h1 id="h.cl6g3fhue60d" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 7</span>` }} />
          <h2 id="h.qtj0zu56ydyq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">RTL Coding Guidelines, Simulation vs Synthesis &amp; Timing-Safe Coding</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c63">(This class is CRITICAL for interviews + real project success)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.nze0exmez4aj" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. Why RTL Coding Guidelines are IMPORTANT?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>RTL code is written </span><span class="c19">once</span><span class="c1">, but it is:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Simulated<br></span></li><li class="c5 li-bullet-0"><span class="c1">Synthesized<br></span></li><li class="c5 li-bullet-0"><span class="c1">Timed<br></span></li><li class="c5 li-bullet-0"><span class="c1">Placed &amp; Routed<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Bad RTL = Timing failure, latch inference, wrong silicon</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.5xf4uxszs519" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Simulation vs Synthesis (MOST CONFUSING FOR BEGINNERS)</span>` }} />
          <h3 id="h.v2x2obffzw27" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Simulation</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Software behavior check<br></span></li><li class="c5 li-bullet-0"><span class="c1">Uses event-based execution<br></span></li><li class="c5 li-bullet-0"><span>Accepts </span><span class="c8">any logical code<br></span></li>` }} />
          <h3 id="h.fied92vejith" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Synthesis</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Converts RTL → Gates<br></span></li><li class="c5 li-bullet-0"><span class="c1">Hardware realization<br></span></li><li class="c5 li-bullet-0"><span class="c8">Only synthesizable constructs allowed<br></span></li>` }} />
          <hr className={styles.divider} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c19">Feature</span></p></td><td class="c73" colspan="1" rowspan="1"><p class="c7"><span class="c19">Simulation</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c7"><span class="c19">Synthesis</span></p></td></tr><tr class="c3"><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">Purpose</span></p></td><td class="c73" colspan="1" rowspan="1"><p class="c2"><span class="c1">Verify logic</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c2"><span class="c1">Build hardware</span></p></td></tr><tr class="c3"><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">Executes</span></p></td><td class="c73" colspan="1" rowspan="1"><p class="c2"><span class="c1">Sequentially</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c2"><span class="c1">Parallel hardware</span></p></td></tr><tr class="c35"><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">Delays</span></p></td><td class="c73" colspan="1" rowspan="1"><p class="c2"><span class="c9">#10</span><span class="c1"> allowed</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c2"><span class="c1"> Not allowed</span></p></td></tr><tr class="c3"><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">Loops</span></p></td><td class="c73" colspan="1" rowspan="1"><p class="c2"><span class="c1">Any</span></p></td><td class="c65" colspan="1" rowspan="1"><p class="c2"><span class="c1">Must be bounded</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.q4c627ioi3vb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Wrong (Simulation only)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">#10 a = b;</span>` }} />
          <h3 id="h.vhswzsuw0tmd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Correct (Synthesizable)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    a &lt;= b;</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.z2ogiqjkj1is" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. Blocking vs Non-Blocking Assignments</span>` }} />
          <h3 id="h.a47ragi8ugwa" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c24 c19">Blocking (</span><span class="c51 c19">=</span><span class="c15">)</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Executes </span><span class="c8">line by line<br></span></li><li class="c5 li-bullet-0"><span>Used for </span><span class="c8">combinational logic<br></span></li>` }} />
          <h3 id="h.u9q3ldq9fuzg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c19 c24">Non-Blocking (</span><span class="c51 c19">&lt;=</span><span class="c15">)</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Executes </span><span class="c8">in parallel<br></span></li><li class="c5 li-bullet-0"><span>Used for </span><span class="c8">sequential logic<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.g2fl8wmgvop5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Wrong Coding</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    a = b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    c = a;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <h3 id="h.5o1bmzup4zru" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Correct Coding</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    a &lt;= b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    c &lt;= a;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.hihba2krp8cc" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Rule (INTERVIEW QUESTION)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c19">Sequential → Non-blocking<br></span><span>  </span><span class="c8">Combinational → Blocking</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.mlgc481ezmg3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. Latch vs Flip-Flop (VERY IMPORTANT)</span>` }} />
          <h3 id="h.drp2qi2c0pbp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Latch</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Level sensitive<br></span></li><li class="c5 li-bullet-0"><span class="c1">Enable based<br></span></li><li class="c5 li-bullet-0"><span class="c1">Unintentional → BAD<br></span></li>` }} />
          <h3 id="h.4gnpnbaqnfc9" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Flip-Flop</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Edge triggered<br></span></li><li class="c5 li-bullet-0"><span class="c1">Clock based<br></span></li><li class="c5 li-bullet-0"><span class="c1">Preferred<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.feaara16a4dy" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Latch Inference (BAD)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (en)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q = d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>➡ When </span><span class="c9">en=0</span><span>, </span><span class="c8">q holds value → latch inferred</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.jf6gjgq9ziwj" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Flip-Flop Coding</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (en)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.xys8vqed6yer" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. How Latches are Accidentally Created</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Missing </span><span class="c9">else<br></span><span>  Incomplete </span><span class="c9">case<br></span><span class="c1">  No default assignment</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.e5z02sv2xk1a" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Wrong</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (a)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        y = b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <h3 id="h.501k6r3npytv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Correct</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    y = 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (a)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        y = b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.d64ka975nyv1" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. Reset Types in RTL</span>` }} />
          <h3 id="h.pj3i84ou80ac" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">1️⃣ Synchronous Reset</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Works with clock<br></span></li><li class="c5 li-bullet-0"><span class="c1">Preferred for timing<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.35397wdm5lrs" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">2️⃣ Asynchronous Reset</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Immediate reset<br></span></li><li class="c5 li-bullet-0"><span class="c1">Used for power-on<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk or negedge rst_n) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (!rst_n)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.9hb5kdm45d9r" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. Clock Gating (POWER SAVING CONCEPT)</span>` }} />
          <h3 id="h.1h9jpcfpazsf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Why?</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Reduce dynamic power<br></span></li><li class="c5 li-bullet-0"><span class="c1">Used in SOCs<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.epbjrmm1cqcg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Wrong (Manual gating)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk &amp; en)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> This causes </span><span class="c8">clock glitches</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.rntzvllbvd6y" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Correct (Enable based)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (en)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Clock gating is done by </span><span class="c19">tools</span><span class="c1">, not RTL designer</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.5mtyo5tgxwb0" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. Combinational Logic Coding Rules</span>` }} />
          <h3 id="h.tr3gfv4w4f3d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Correct Template</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    y = 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (sel)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b00: y = a;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b01: y = b;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b10: y = c;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b11: y = d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Default assignment<br> ✔ Full coverage</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.3iwx19t1c23n" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. Sequential Logic Coding Rules</span>` }} />
          <h3 id="h.pyva8ypyll7d" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Correct Template</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        q &lt;= d;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Non-blocking<br> ✔ Reset included</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.49149b85lwbb" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. Sensitivity List (Beginner Mistake)</span>` }} />
          <h3 id="h.29hplxdfkkxw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Wrong</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(a)</span>` }} />
          <h3 id="h.35mnjrk2esvk" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Correct</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Avoid missing signals</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.btvb425qwuxx" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11. Timing Concepts (Beginner Level)</span>` }} />
          <h3 id="h.grwij9di6qux" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Setup Time</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Data stable </span><span class="c8">before clock<br></span></li>` }} />
          <h3 id="h.rhp8mlfnenqw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Hold Time</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Data stable </span><span class="c8">after clock<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">Bad RTL → setup/hold violations</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.5cnct2cqy8jw" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">12. Interview-Level RTL Rules</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>✔ One clock per always block<br> ✔ No delays </span><span class="c9">#<br></span><span class="c1"> ✔ No initial block (except testbench)<br> ✔ Avoid combinational loops<br> ✔ Use parameters</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.gcvzrtohbmqf" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">CLASS 7 SUMMARY</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Simulation vs Synthesis<br> ✔ Blocking vs Non-blocking<br> ✔ Latch avoidance<br> ✔ Reset handling<br> ✔ Timing-safe RTL</span>` }} />
          <h1 id="h.yd8z7yy78qsc" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 8</span>` }} />
          <h2 id="h.ahz53vwmle3l" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">Combinational Circuits using RTL (Behavioral, Dataflow &amp; Structural)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c19">This class is the FOUNDATION of RTL<br></span><span>  Every VLSI student </span><span class="c8">must know these circuits in RTL</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.nynen1usla3u" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is a Combinational Circuit?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c19">combinational circuit</span><span class="c1">:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Output depends </span><span class="c8">only on present inputs<br></span></li><li class="c5 li-bullet-0"><span class="c1">No memory<br></span></li><li class="c5 li-bullet-0"><span class="c1">No clock<br></span></li>` }} />
          <h3 id="h.o4qovdcogcu1" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Examples:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Adder<br></span></li><li class="c5 li-bullet-0"><span class="c1">Subtractor<br></span></li><li class="c5 li-bullet-0"><span class="c1">MUX<br></span></li><li class="c5 li-bullet-0"><span class="c1">Decoder<br></span></li><li class="c5 li-bullet-0"><span class="c1">Encoder<br></span></li><li class="c5 li-bullet-0"><span class="c1">Comparator<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ei86jsb0t6yk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. RTL Coding Styles (VERY IMPORTANT)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>There are </span><span class="c19">3 ways</span><span class="c1"> to write RTL code:</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c7"><span class="c19">Style</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c7"><span class="c19">Description</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c7"><span class="c19">Usage</span></p></td></tr><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c2"><span class="c1">Behavioral</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c2"><span class="c1">Uses always block</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c2"><span class="c1">Most common</span></p></td></tr><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c2"><span class="c1">Dataflow</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c2"><span class="c1">Uses assign statement</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c2"><span class="c1">Simple logic</span></p></td></tr><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c2"><span class="c1">Structural</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c2"><span class="c1">Uses gates/modules</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c2"><span class="c1">Low-level</span></p></td></tr></tbody>` }} />
          </div>
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">All three generate same hardware</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">3. HALF ADDER</span>` }} />
          <h3 id="h.op9hadfprm5f" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Adds </span><span class="c8">two 1-bit numbers</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">A</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c7"><span class="c19">B</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c7"><span class="c19">Sum</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c19">Carry</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td></tr><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td></tr></tbody>` }} />
          </div>
          <h3 id="h.z3bkryob0lhp" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Equations</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Sum   = A ^ B</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Carry = A &amp; B</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.1zu9hgk9f7fe" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3.1 Half Adder – Dataflow Style</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module half_adder_df (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output Sum, Carry</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign Sum   = A ^ B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign Carry = A &amp; B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ika7ygbivx63" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3.2 Half Adder – Behavioral Style</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module half_adder_beh (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Sum, Carry</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Sum   = A ^ B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Carry = A &amp; B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.qenlq1ibylcq" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3.3 Half Adder – Structural Style</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module half_adder_str (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output Sum, Carry</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">xor (Sum, A, B);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">and (Carry, A, B);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.178u2wt7jhkh" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">4. FULL ADDER</span>` }} />
          <h3 id="h.z8rd2td1vh5p" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Adds </span><span class="c19">3 inputs</span><span class="c1">: A, B, Cin</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">A</span></p></td><td class="c58" colspan="1" rowspan="1"><p class="c7"><span class="c19">B</span></p></td><td class="c77" colspan="1" rowspan="1"><p class="c7"><span class="c19">Cin</span></p></td><td class="c17" colspan="1" rowspan="1"><p class="c7"><span class="c19">Sum</span></p></td><td class="c75" colspan="1" rowspan="1"><p class="c7"><span class="c19">Cout</span></p></td></tr></tbody>` }} />
          </div>
          <h3 id="h.1h1d2zdd3c2i" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Equations</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Sum  = A ^ B ^ Cin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Cout = (A&amp;B) | (B&amp;Cin) | (A&amp;Cin)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.n54rbeevwjwa" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4.1 Full Adder – Dataflow</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module full_adder_df (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B, Cin,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output Sum, Cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign Sum  = A ^ B ^ Cin;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign Cout = (A &amp; B) | (B &amp; Cin) | (A &amp; Cin);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.wrxcz47qu3by" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4.2 Full Adder – Behavioral</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module full_adder_beh (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B, Cin,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Sum, Cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Sum  = A ^ B ^ Cin;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Cout = (A &amp; B) | (B &amp; Cin) | (A &amp; Cin);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.99tow8xlraln" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4.3 Full Adder – Structural (Using Half Adders)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module full_adder_str (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B, Cin,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output Sum, Cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">wire s1, c1, c2;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">xor (s1, A, B);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">and (c1, A, B);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">xor (Sum, s1, Cin);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">and (c2, s1, Cin);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">or  (Cout, c1, c2);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">5. RIPPLE CARRY ADDER (4-bit)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Multiple full adders connected in series</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.awset360nj2n" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5.1 4-bit Ripple Carry Adder – Behavioral</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module rca_4bit (</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 3:0 $$ A, B,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input Cin,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output $$ 3:0 $$ Sum,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output Cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign {Cout, Sum} = A + B + Cin;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ Best synthesizable<br> ✔ Industry preferred</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.ocze3fwv2cuc" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">6. MULTIPLEXER (2:1 MUX)</span>` }} />
          <h3 id="h.9zpsrekxpot6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>Selects </span><span class="c8">one input based on select line</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c7"><span class="c19">S</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">Y</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">A</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">B</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.mfyv30bgwd9u" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6.1 MUX – Dataflow</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module mux2_df (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B, S,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output Y</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign Y = S ? B : A;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.wsr9amdffsc6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6.2 MUX – Behavioral</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module mux2_beh (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B, S,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Y</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (S)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Y = B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Y = A;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.gqc7qdhf40i8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6.3 MUX – Structural</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module mux2_str (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B, S,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output Y</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">wire sbar, w1, w2;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">not (sbar, S);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">and (w1, A, sbar);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">and (w2, B, S);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">or  (Y, w1, w2);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.ysfajy26bm1v" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">7. DECODER (2:4)</span>` }} />
          <h3 id="h.xpjwt2rlw6hd" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">One output HIGH based on input</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.vft2g1udicp9" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7.1 Decoder – Behavioral</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module decoder2to4 (</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 1:0 $$ A,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ Y</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Y = 4'b0000;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (A)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b00: Y = 4'b0001;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b01: Y = 4'b0010;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b10: Y = 4'b0100;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b11: Y = 4'b1000;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.vd9h57hx4384" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">8. ENCODER (4:2)</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module encoder4to2 (</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 3:0 $$ Y,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 1:0 $$ A</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (Y)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b0001: A = 2'b00;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b0010: A = 2'b01;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b0100: A = 2'b10;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        4'b1000: A = 2'b11;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        default: A = 2'b00;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h1 id="h.lmf00d52via6" className={styles.h1} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">9. MAGNITUDE COMPARATOR (1-bit)</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module comparator_1bit (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output A_gt_B, A_eq_B, A_lt_B</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign A_gt_B = A &amp; ~B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign A_eq_B = ~(A ^ B);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign A_lt_B = ~A &amp; B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.bgwazv3mzszm" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">CLASS 8 SUMMARY</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>✔ Half Adder<br> ✔ Full Adder<br> ✔ Ripple Carry Adder<br> ✔ MUX<br> ✔ Decoder<br> ✔ Encoder<br> ✔ Comparator<br> ✔ All </span><span class="c8">3 RTL styles</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c28 c19">RTL DESIGN – CLASS 9</span>` }} />
          <h2 id="h.gxzzoe45h6nl" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">SEQUENTIAL CIRCUITS USING RTL (COMPLETE BEGINNER → INDUSTRY LEVEL)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.645zqs8cjx2m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is a Sequential Circuit?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>A </span><span class="c19">sequential circuit</span><span class="c1"> is a digital circuit where:</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Output depends on</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">Present inputs<br></span></li><li class="c5 li-bullet-0"><span class="c8">Previous output (stored state)<br></span></li>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> Memory is required<br>  </span><span class="c8">Clock signal is mandatory</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.f269fjkprts4" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">🔁 Difference Recap</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c46" colspan="1" rowspan="1"><p class="c7"><span class="c19">Combinational</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c7"><span class="c19">Sequential</span></p></td></tr><tr class="c3"><td class="c46" colspan="1" rowspan="1"><p class="c2"><span class="c1">No memory</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c2"><span class="c1">Has memory</span></p></td></tr><tr class="c3"><td class="c46" colspan="1" rowspan="1"><p class="c2"><span class="c1">No clock</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c2"><span class="c1">Clock required</span></p></td></tr><tr class="c3"><td class="c46" colspan="1" rowspan="1"><p class="c2"><span class="c1">Depends only on inputs</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c2"><span class="c1">Depends on inputs + past</span></p></td></tr><tr class="c3"><td class="c46" colspan="1" rowspan="1"><p class="c2"><span class="c1">Example: Adder</span></p></td><td class="c42" colspan="1" rowspan="1"><p class="c2"><span class="c1">Example: Flip-Flop</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.ths4iydznicg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Memory Element in RTL</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Memory is implemented using:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">Latch<br></span></li><li class="c5 li-bullet-0"><span class="c8">Flip-Flop<br></span></li>` }} />
          <h3 id="h.13g2r7jh60w6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">In RTL:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c8">always block<br></span></li><li class="c5 li-bullet-0"><span class="c8">posedge / negedge clock<br></span></li><li class="c5 li-bullet-0"><span class="c8">non-blocking assignment (&lt;=)<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.doaoze9eao0o" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. Why Non-Blocking Assignment (&lt;=)?</span>` }} />
          <h3 id="h.1jysqjudrg5m" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Wrong for Sequential</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Q = D;</span>` }} />
          <h3 id="h.vyn0mv9n607" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> Correct for Sequential</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Q &lt;= D;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Ensures:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Proper clocked behavior<br></span></li><li class="c5 li-bullet-0"><span class="c1">No race conditions<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.1kz5d0hdmgqa" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. LATCH vs FLIP-FLOP (RTL VIEW)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c14" colspan="1" rowspan="1"><p class="c7"><span class="c19">Latch</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c7"><span class="c19">Flip-Flop</span></p></td></tr><tr class="c3"><td class="c14" colspan="1" rowspan="1"><p class="c2"><span class="c1">Level sensitive</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c2"><span class="c1">Edge sensitive</span></p></td></tr><tr class="c3"><td class="c14" colspan="1" rowspan="1"><p class="c2"><span class="c1">No clock edge</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c2"><span class="c1">Clock edge</span></p></td></tr><tr class="c3"><td class="c14" colspan="1" rowspan="1"><p class="c2"><span class="c1">Unsafe for RTL</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c2"><span class="c1">Preferred in RTL</span></p></td></tr></tbody>` }} />
          </div>
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c19">Industry Rule:<br></span><span class="c1">  Avoid latches<br>  Use flip-flops only</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.cbsn3z4k2qsg" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. SR FLIP-FLOP (RTL)</span>` }} />
          <h3 id="h.60gio2w2hurb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">S = Set<br></span></li><li class="c5 li-bullet-0"><span class="c1">R = Reset<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.q9u16lbbt44m" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Truth Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c7"><span class="c19">S</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">R</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c19">Q(next)</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c1">Hold</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td></tr><tr class="c3"><td class="c48" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c1">Invalid</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.tacp8bqemsd6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code (Behavioral)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module sr_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input S, R,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (S &amp;&amp; !R)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Q &lt;= 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else if (!S &amp;&amp; R)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else if (!S &amp;&amp; !R)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Q &lt;= Q;   // hold</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c9">S=R=1</span><span class="c1"> is avoided</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.p901zeuhell8" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. D FLIP-FLOP (MOST IMPORTANT)</span>` }} />
          <h3 id="h.alknhswb03mw" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Why D FF is MOST USED?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>✔ No invalid state<br> ✔ Simple<br> ✔ Safe<br> ✔ Used in </span><span class="c8">registers, pipelines</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.a9g8ccxoiy4s" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">Q(next) = D</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.maoghqngx2eo" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL – D Flip-Flop</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module d_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input D,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Q &lt;= D;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.zbhsvun4cq3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">D FF with Reset (Industry Standard)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module d_ff_reset (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input D,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Q &lt;= D;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.2toe1qe3jcfv" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. JK FLIP-FLOP</span>` }} />
          <h3 id="h.imigpyifagz5" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c29" colspan="1" rowspan="1"><p class="c7"><span class="c19">J</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c7"><span class="c19">K</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c7"><span class="c19">Action</span></p></td></tr><tr class="c3"><td class="c29" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c2"><span class="c1">Hold</span></p></td></tr><tr class="c3"><td class="c29" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c2"><span class="c1">Reset</span></p></td></tr><tr class="c3"><td class="c29" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c2"><span class="c1">Set</span></p></td></tr><tr class="c3"><td class="c29" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c39" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c2"><span class="c1">Toggle</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.n3voqqui04wf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module jk_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input J, K,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case ({J,K})</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b00: Q &lt;= Q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b01: Q &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b10: Q &lt;= 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        2'b11: Q &lt;= ~Q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.4pr7nxker4ow" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. T FLIP-FLOP</span>` }} />
          <h3 id="h.7xi5p6w1disb" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Function:</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c58" colspan="1" rowspan="1"><p class="c7"><span class="c19">T</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c19">Q(next)</span></p></td></tr><tr class="c3"><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">0</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c1">Hold</span></p></td></tr><tr class="c3"><td class="c58" colspan="1" rowspan="1"><p class="c2"><span class="c1">1</span></p></td><td class="c27" colspan="1" rowspan="1"><p class="c2"><span class="c1">Toggle</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h3 id="h.eskuigjvjq17" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module t_ff (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input T,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg Q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (T)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Q &lt;= ~Q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        Q &lt;= Q;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.zdho7ehcj6l6" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. REGISTER (4-BIT)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1"> Register = Collection of flip-flops</span>` }} />
          <hr className={styles.divider} />
          <h3 id="h.kfdwnow8ezf" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module reg_4bit (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input $$ 3:0 $$ D,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ Q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Q &lt;= D;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.gv5cf3tvtouh" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. SHIFT REGISTER</span>` }} />
          <h3 id="h.6fo40huv8n5f" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Types:</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">SISO<br></span></li><li class="c5 li-bullet-0"><span class="c1">SIPO<br></span></li><li class="c5 li-bullet-0"><span class="c1">PISO<br></span></li><li class="c5 li-bullet-0"><span class="c1">PIPO<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.81xr2q4skbzv" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Example: 4-bit Shift Right Register</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module shift_reg (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input D,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ Q</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    Q &lt;= {D, Q$$ 3:1 $$};</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.jkfkg4sijxpz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11. COUNTERS</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.42ktxoahj9j" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11.1 UP COUNTER (4-BIT)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module up_counter (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 3:0 $$ count</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        count &lt;= count + 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.e37t61ddr08n" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">11.2 DOWN COUNTER</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">count &lt;= count - 1;</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.6qjwtghlse2m" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">12. SYNCHRONOUS vs ASYNCHRONOUS RESET</span>` }} />
          <h3 id="h.vsm06yqdxf7b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Synchronous Reset</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk)</span>` }} />
          <h3 id="h.pgyp19ywpyhu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Asynchronous Reset</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk or posedge rst)</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.bb6570cpz9b7" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">13. COMMON RTL INTERVIEW RULES</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>  Use </span><span class="c9">always @(posedge clk)<br></span><span>  Use </span><span class="c9">&lt;=</span><span> for sequential<br>  Never mix blocking and non-blocking<br>  Avoid latches<br>  Avoid delays </span><span class="c0">#10</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.f97ulygud4kd" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">CLASS 9 COMPLETE</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ All Flip-Flops<br> ✔ Registers<br> ✔ Counters<br> ✔ Shift Registers<br> ✔ Industry RTL Rules</span>` }} />
          <hr className={styles.divider} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c19 c28">RTL DESIGN – CLASS 10</span>` }} />
          <h2 id="h.o9sljihxwii3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">FINITE STATE MACHINES (FSM) + REAL RTL MINI PROJECTS</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>This class is </span><span class="c19">EXTREMELY IMPORTANT</span><span> for<br>  </span><span class="c19">RTL Design<br></span><span>  </span><span class="c19">Physical Design<br></span><span>  </span><span class="c19">Interviews<br></span><span>  </span><span class="c8">Industry projects</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.ckyeg4yifwxk" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">1. What is an FSM (Finite State Machine)?</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>An </span><span class="c19">FSM</span><span> is a </span><span class="c19">sequential circuit</span><span class="c1"> that:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Has </span><span class="c8">finite number of states<br></span></li><li class="c5 li-bullet-0"><span>Changes state on </span><span class="c8">clock edge<br></span></li><li class="c5 li-bullet-0"><span class="c1">Output depends on:<br></span></li>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c6 c18 li-bullet-0"><span class="c1">Present state<br></span></li><li class="c6 c18 li-bullet-0"><span class="c1">Inputs<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.si0ap4eteku6" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15"> FSM Components</span>` }} />
          <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c19">State Register</span><span class="c1"> (Flip-Flops)<br></span></li><li class="c5 li-bullet-0"><span class="c8">Next State Logic<br></span></li><li class="c5 li-bullet-0"><span class="c8">Output Logic<br></span></li><li class="c5 li-bullet-0"><span class="c8">Clock + Reset<br></span></li>` }} />
          <hr className={styles.divider} />
          <h2 id="h.hmaqu1ed0a7z" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">2. Types of FSM</span>` }} />
          <h3 id="h.f18kv9visxq3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">🔹 Moore Machine</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Output depends </span><span class="c8">only on state<br></span></li>` }} />
          <h3 id="h.v5cqscdeusjm" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">🔹 Mealy Machine</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Output depends on </span><span class="c8">state + input<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.bxm0t3fflfg" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Comparison Table</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c19">Feature</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c19">Moore</span></p></td><td class="c68" colspan="1" rowspan="1"><p class="c7"><span class="c19">Mealy</span></p></td></tr><tr class="c3"><td class="c16" colspan="1" rowspan="1"><p class="c2"><span class="c1">Output depends on</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">State</span></p></td><td class="c68" colspan="1" rowspan="1"><p class="c2"><span class="c1">State + Input</span></p></td></tr><tr class="c3"><td class="c16" colspan="1" rowspan="1"><p class="c2"><span class="c1">Output changes</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">On clock</span></p></td><td class="c68" colspan="1" rowspan="1"><p class="c2"><span class="c1">Immediately</span></p></td></tr><tr class="c3"><td class="c16" colspan="1" rowspan="1"><p class="c2"><span class="c1">Safe</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">Yes</span></p></td><td class="c68" colspan="1" rowspan="1"><p class="c2"><span class="c1">Risky</span></p></td></tr><tr class="c3"><td class="c16" colspan="1" rowspan="1"><p class="c2"><span class="c1">Industry usage</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c2"><span class="c1">HIGH</span></p></td><td class="c68" colspan="1" rowspan="1"><p class="c2"><span class="c1">MEDIUM</span></p></td></tr></tbody>` }} />
          </div>
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span> </span><span class="c8">Industry prefers MOORE FSM</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.pjrd6b3klhbd" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">3. FSM DESIGN FLOW (VERY IMPORTANT)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span>1️⃣ Write </span><span class="c19">Problem Statement<br></span><span> 2️⃣ Draw </span><span class="c19">State Diagram<br></span><span> 3️⃣ Create </span><span class="c19">State Table<br></span><span> 4️⃣ Assign </span><span class="c19">Binary Encoding<br></span><span> 5️⃣ Write </span><span class="c19">RTL Code<br></span><span class="c1"> 6️⃣ Simulate<br> 7️⃣ Synthesize</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.xrl30jhyza64" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">4. FSM EXAMPLE 1 – SIMPLE TOGGLE FSM</span>` }} />
          <h3 id="h.imkw85gi7ndu" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Problem:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">Output toggles every clock<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.80hgl4789rox" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">State Diagram</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">S0 → Q=0<br></span></li><li class="c5 li-bullet-0"><span class="c1">S1 → Q=1<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.jdivul64i17s" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code (Moore FSM)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module toggle_fsm (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg out</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">typedef enum logic $$ 0:0 $$ {S0, S1} state_t;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">state_t state, next_state;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        state &lt;= S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        state &lt;= next_state;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (state)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S0: next_state = S1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S1: next_state = S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (state)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S0: out = 0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S1: out = 1;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.knc2xu28la08" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">5. FSM EXAMPLE 2 – SEQUENCE DETECTOR (101)</span>` }} />
          <h3 id="h.x8wlh68lcpla" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Problem:</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span>Detect input sequence </span><span class="c8">101<br></span></li><li class="c5 li-bullet-0"><span class="c1">Output = 1 when detected<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.t6hsso7kb4rl" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">States</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">S0 → Start<br></span></li><li class="c5 li-bullet-0"><span class="c1">S1 → Got 1<br></span></li><li class="c5 li-bullet-0"><span class="c1">S2 → Got 10<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.pfzev3ph2952" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module seq_101 (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input in,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg out</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">typedef enum logic $$ 1:0 $$ {S0, S1, S2} state_t;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">state_t state, next;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        state &lt;= S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        state &lt;= next;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (state)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S0: next = in ? S1 : S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S1: next = in ? S1 : S2;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        S2: next = in ? S1 : S0;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    out = (state == S2 &amp;&amp; in);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.r4l91u18cto3" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">6. FSM EXAMPLE 3 – TRAFFIC LIGHT CONTROLLER</span>` }} />
          <h3 id="h.4ymczdyy92n3" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">States</span>` }} />
          <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 li-bullet-0"><span class="c1">RED<br></span></li><li class="c5 li-bullet-0"><span class="c1">GREEN<br></span></li><li class="c5 li-bullet-0"><span class="c1">YELLOW<br></span></li>` }} />
          <hr className={styles.divider} />
          <h3 id="h.e36pumj4ulrh" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">RTL Code</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module traffic_fsm (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input clk,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input rst,</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output reg $$ 2:0 $$ light</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.mathFormula} dangerouslySetInnerHTML={{ __html: `<span class="c0">typedef enum logic $$ 1:0 $$ {RED, GREEN, YELLOW} state_t;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">state_t state, next;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(posedge clk) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    if (rst)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        state &lt;= RED;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    else</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        state &lt;= next;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (state)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        RED: next = GREEN;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        GREEN: next = YELLOW;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        YELLOW: next = RED;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">always @(*) begin</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    case (state)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        RED: light = 3'b100;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        GREEN: light = 3'b010;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">        YELLOW: light = 3'b001;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    endcase</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">end</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.9lfypk7qxvhz" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">7. RTL MINI PROJECT 1 – HALF ADDER</span>` }} />
          <h3 id="h.uuw9ktd8q7b" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Behavioral</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module half_adder (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output SUM, CARRY</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign SUM = A ^ B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign CARRY = A &amp; B;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.9j4jm1yn8x6b" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">8. RTL MINI PROJECT 2 – FULL ADDER</span>` }} />
          <h3 id="h.obx1vn5mhu0k" className={styles.h3} dangerouslySetInnerHTML={{ __html: `<span class="c15">Dataflow</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">module full_adder (</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    input A, B, Cin,</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">    output SUM, Cout</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign SUM = A ^ B ^ Cin;</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">assign Cout = (A &amp; B) | (B &amp; Cin) | (A &amp; Cin);</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c0">endmodule</span>` }} />
          <hr className={styles.divider} />
          <h2 id="h.hsd3p9px0de" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">9. Behavioral vs Structural vs Dataflow (RECAP)</span>` }} />
          <div className={styles.tableContainer}>
            <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c7"><span class="c19">Style</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c7"><span class="c19">Used For</span></p></td></tr><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c2"><span class="c1">Behavioral</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c2"><span class="c1">FSM, Counters</span></p></td></tr><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c2"><span class="c1">Dataflow</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c2"><span class="c1">Combinational</span></p></td></tr><tr class="c3"><td class="c41" colspan="1" rowspan="1"><p class="c2"><span class="c1">Structural</span></p></td><td class="c72" colspan="1" rowspan="1"><p class="c2"><span class="c1">Gate-level</span></p></td></tr></tbody>` }} />
          </div>
          <hr className={styles.divider} />
          <h2 id="h.4pah85notdaa" className={styles.h2} dangerouslySetInnerHTML={{ __html: `<span class="c13">10. INDUSTRY CODING RULES (VERY IMPORTANT)</span>` }} />
          <p className={styles.paragraph} dangerouslySetInnerHTML={{ __html: `<span class="c1">✔ One always block = one purpose<br> ✔ FSM → 3 always blocks<br> ✔ Use parameters / enum<br> ✔ Reset mandatory<br> ✔ No delays<br> ✔ No latches</span>` }} />
          <AdUnit slotId="slot_module5content" />
        </div>
      </div>
    </div>
  );
};

export default Module5Content;

