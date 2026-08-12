import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudyMaterials.module.css'; // Reusing the premium grid styling
import SEO from '../components/SEO';
import StructuredData from '../components/StructuredData';
import AdUnit from '../components/AdUnit';
import { useAuth } from '../context/AuthContext';

const Icon = ({ path }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    {path}
  </svg>
);

const LockedIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />} />;
const UnlockedIcon = () => <Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />} />;

// An interview/chat icon
const InterviewIcon = <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />;

const interviewModules = [
  { id: 19, title: 'Core Interview Questions', desc: 'Fundamental physical design and VLSI questions.', icon: InterviewIcon },
  { id: 20, title: 'Interview Questions (RTL, Synth, DFT, STA)', desc: 'Front-end and timing analysis interview preparation.', icon: InterviewIcon },
  { id: 21, title: 'Physical Design (PNR) Interview Questions', desc: 'Core PNR concepts, setup/hold fixes, and implementation.', icon: InterviewIcon },
  { id: 22, title: 'Physical Verification & Signoff Interview Questions', desc: 'DRC, LVS, and tapeout stage questions.', icon: InterviewIcon },
  { id: 34, title: 'All VLSI Questions and Answers', desc: 'Comprehensive master list of all VLSI topics.', icon: InterviewIcon },
  { id: 35, title: 'Viva Questions on Synthesis', desc: 'Quick-fire viva questions on logic synthesis.', icon: InterviewIcon },
  { id: 49, title: 'Digital Logic & Design Interview Preparation', desc: 'Digital electronics and logic design fundamentals.', icon: InterviewIcon }
];

const sampleFaqs = [
  {
    id: 'faq-1',
    question: 'What is the primary objective of Floorplanning in VLSI Physical Design?',
    answer: 'Floorplanning is the initial phase of physical implementation where die size, core boundary, I/O pad placement, macro placement, and power grid network (PGN) architecture are defined. The goal is to minimize total die area, prevent routing congestion, reduce total wire length, and optimize timing paths before standard cell placement. Proper macro placement with adequate halo spacing prevents macro blockage and thermal hotspots.',
    linkText: 'Explore Floorplanning & PnR Flow in Platform Flow Graph →',
    linkUrl: '/platform-flow'
  },
  {
    id: 'faq-2',
    question: 'What is the difference between Global Placement and Detailed Placement?',
    answer: 'Global Placement positions standard cells across the die area to minimize overall wirelength and path delays without strictly enforcing non-overlapping cell grid boundaries. Detailed Placement follows Global Placement and legalizes cell positions by placing them strictly into standard cell rows, eliminating cell overlaps while minimizing total displacement and wirelength penalty.',
    linkText: 'Learn more about Placement in Module 6 (Logical Synthesis & Netlists) →',
    linkUrl: '/modules/6'
  },
  {
    id: 'faq-3',
    question: 'Why is Clock Tree Synthesis (CTS) necessary, and what is the difference between clock latency and clock skew?',
    answer: 'CTS builds a balanced buffer tree network from the clock source (PLL) to all sequential flip-flop clock pins to ensure synchronous timing across the chip. Clock Latency is the total insertion delay from clock source to a specific flip-flop pin. Clock Skew is the maximum difference in clock arrival times between two communicating flip-flops. Minimizing clock skew prevents setup and hold timing violations.',
    linkText: 'Review Digital Logic & Flip-Flop Concepts in Module 3 →',
    linkUrl: '/modules/3'
  },
  {
    id: 'faq-4',
    question: 'How do you resolve a Setup timing violation versus a Hold timing violation?',
    answer: 'Setup timing violations occur when data arrives too late at the capture flip-flop before the active clock edge. Setup issues are fixed by swapping to high-speed low-VT (LVT) cells, upsizing buffers, reducing routing wirelength, or restructuring logic. Hold timing violations occur when data changes too quickly before the hold window closes. Hold violations are independent of clock period and are fixed by inserting delay buffers or delay cells along the data path.',
    linkText: 'Study CMOS Switching & Timing in Module 2 →',
    linkUrl: '/modules/2'
  },
  {
    id: 'faq-5',
    question: 'What are the key stages of Routing in ASIC physical design?',
    answer: 'Routing connects standard cell pins and macro terminals using metal layers according to the netlist. It consists of Global Routing (which assigns nets to 3D global routing grids/tracks to estimate congestion) and Detailed Routing (which places actual metal tracks and vias while adhering to foundry Design Rule Manual DRM rules).',
    linkText: 'Understand ASIC Physical Design Stages in Platform Flow →',
    linkUrl: '/platform-flow'
  },
  {
    id: 'faq-6',
    question: 'What is the difference between Design Rule Checking (DRC) and Layout Versus Schematic (LVS)?',
    answer: 'DRC verifies that physical layout metal widths, spacing, enclosure, and via dimensions comply with foundry manufacturing rules to prevent open circuits or short circuits. LVS compares the extracted physical layout netlist against the original schematic/gate-level netlist to confirm structural and electrical equivalence.',
    linkText: 'Review Electronics Fundamentals in Module 1 →',
    linkUrl: '/modules/1'
  },
  {
    id: 'faq-7',
    question: 'What happens during Logic Synthesis when converting Verilog RTL to a Gate-Level Netlist?',
    answer: 'Logic Synthesis reads high-level Verilog/VHDL RTL, parses language constructs into generic boolean logic (GTECH), applies timing constraints (SDC), and maps the design onto target technology standard cells from target technology libraries. It optimizes for area, power, and delay while generating a gate-level netlist and SDC constraints for PnR.',
    linkText: 'Master Logic Synthesis in Module 6 →',
    linkUrl: '/modules/6'
  },
  {
    id: 'faq-8',
    question: 'Why is TCL scripting essential for physical design engineers working with Innovus and ICC2?',
    answer: 'Tool Command Language (TCL) is the standard scripting language across electronic design automation (EDA) tools like Synopsys ICC2, Cadence Innovus, PrimeTime, and Design Compiler. Physical design engineers use TCL to automate design imports, customize placement and routing commands, extract custom timing reports, query netlist attributes via dbGet or get_attribute, and execute unattended batch flows.',
    linkText: 'Learn Linux & Basic TCL Scripting in Module 4 →',
    linkUrl: '/modules/4'
  },
  {
    id: 'faq-9',
    question: 'What is Scan Insertion and why is it performed during front-end/physical design?',
    answer: 'Scan Insertion converts standard sequential flip-flops into scan flip-flops connected into serial shift chains. This allows Automatic Test Pattern Generation (ATPG) tools to shift test vectors into internal registers during post-silicon manufacturing test, detecting stuck-at faults and transition faults before chip packaging.',
    linkText: 'Study Design For Testability (DFT) in Module 7 →',
    linkUrl: '/modules/7'
  },
  {
    id: 'faq-10',
    question: 'What is the Short-Channel Effect (SCE) in sub-micron MOSFETs and how does it impact physical design?',
    answer: 'As MOSFET channel length shrinks in sub-nanometer nodes, the drain voltage exerts greater control over the channel, causing threshold voltage roll-off, Drain-Induced Barrier Lowering (DIBL), subthreshold leakage power increase, and mobility degradation. Physical design mitigates SCE through multi-VT cell selection, FinFET/GAA architecture library adoption, and careful power domain management.',
    linkText: 'Explore MOSFET & CMOS Theory in Module 2 →',
    linkUrl: '/modules/2'
  }
];

const Interview = () => {
  const { hasPremiumAccess } = useAuth() || {};
  const courseValid = hasPremiumAccess;

  // Track expanded accordion indices (first item open by default)
  const [openItems, setOpenItems] = React.useState({ 0: true });

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sampleFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className={styles.container}>
      <SEO 
        title="Physical Design Interview Preparation" 
        description="Comprehensive list of VLSI Physical Design interview questions and answers, covering STA, CTS, synthesis, and physical verification."
        url="/interview"
        keywords={["vlsi interview questions", "physical design interview", "sta interview questions", "asic interview preparation"]}
        structuredData={
          <StructuredData 
            breadcrumb={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://vlsiphysicaldesignocean.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Interview Preparation",
                  "item": "https://vlsiphysicaldesignocean.com/interview"
                }
              ]
            }}
            faq={faqSchema}
          />
        }
      />
      <div className={styles.header}>
        <div className={styles.preTitle}>CAREER PREPARATION</div>
        <h1 className={styles.mainTitle}>INTERVIEW QUESTIONS</h1>
        <p className={styles.description}>Prepare for top semiconductor industry interviews with 500+ real, company-specific questions covering the entire RTL-to-GDSII flow.</p>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />} /></span>
            7 Interview Modules
          </div>
          <div className={styles.statPill} style={{ marginLeft: '15px' }}>
            <span className={styles.statIcon}><Icon path={<path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />} /></span>
            Placement Support
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {interviewModules.map((mod) => {
          const targetUrl = `/paid-modules/module/${mod.id}`;
          return (
            <Link key={mod.id} to={targetUrl} className={styles.cardLink}>
              <div className={styles.cardWrapper}>
                <div className={styles.cardInner}>
                  <div className={styles.badgeRow}>
                    <div className={styles.moduleBadge}>MODULE {mod.id}</div>
                    <div className={`${styles.accessIcon} ${courseValid ? styles.unlocked : styles.locked}`}>
                      {courseValid ? <UnlockedIcon /> : <LockedIcon />}
                    </div>
                  </div>
                  <div className={styles.iconBox}>
                    <Icon path={mod.icon} />
                  </div>
                  <h3>{mod.title}</h3>
                  <p>{mod.desc}</p>
                  <div className={styles.cardAccent}></div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Free Sample Interview Questions Accordion Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqTitle}>Free VLSI Physical Design Interview Questions</h2>
          <p className={styles.faqSubtitle}>
            Test your knowledge with these sample core ASIC physical design, STA, CTS, and physical verification interview questions. The full library of 500+ company-specific interview questions is available in the course modules above.
          </p>
        </div>

        <div className={styles.faqList}>
          {sampleFaqs.map((faq, index) => {
            const isOpen = !!openItems[index];
            return (
              <div key={faq.id} className={styles.faqItem}>
                <button
                  type="button"
                  className={styles.faqQuestionBtn}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${faq.id}`}
                >
                  <h3 className={styles.faqQuestionText}>{faq.question}</h3>
                  <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}>
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-ans-${faq.id}`} className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                    {faq.linkUrl && (
                      <Link to={faq.linkUrl} className={styles.faqLink}>
                        {faq.linkText}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <AdUnit slotId="slot_interview_bottom" />
    </div>
  );
};

export default Interview;
