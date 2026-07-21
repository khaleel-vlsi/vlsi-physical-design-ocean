export const paidModulesData = [
  {
    id: 9,
    title: "Static Timing Analysis - 1",
    description: "Advanced STA concepts and timing analysis",
    topics: [
      "What is Static Timing Analysis (STA)?",
      "Need of STA in VLSI Design Flow",
      "Difference Between STA vs DTA",
      "Timing Path Concepts (Startpoint & Endpoint)",
      "Setup Time & Hold Time Basics",
      "Clock Concepts & Terminologies",
      "Clock Latency, Skew & Uncertainty",
      "Timing Parameters (Arrival, Required, Slack)",
      "Propagation Delay vs Contamination Delay",
      "Introduction to Timing Libraries (.lib)",
      "Important Timing Parameters in .lib",
      "Load Capacitance & Slew Concepts",
      "Introduction to SDC Constraints",
      "Basic SDC Commands Overview",
      "create_clock Command",
      "set_input_delay & set_output_delay",
      "set_clock_uncertainty Command",
      "set_false_path & set_multicycle_path Basics",
      "Introduction to Timing Reports"
    ],
    iframeLink: "https://docs.google.com/document/d/1xTcYp9W6-CvLwJVySzj_GMOhnYGhRvBoNuu9qD3FATM/preview",
    isLockedTemporarily: true,
    lockMessage: "This content will unlock automatically 30 days after your course purchase.",
    unlockDays: 30
  },
  {
    id: 10,
    title: "Static Timing Analysis - 2",
    description: "Timing path analysis and optimization",
    topics: [
      "Understanding STA Report Structure",
      "Timing Path Analysis Step by Step",
      "Reading Setup Violation Reports",
      "Reading Hold Violation Reports",
      "Clock Path vs Data Path Analysis",
      "Common Causes of Setup Violations",
      "Common Causes of Hold Violations",
      "Fixing Setup Violations Techniques",
      "Fixing Hold Violations Techniques",
      "Buffer Insertion Methods",
      "Gate Sizing Techniques",
      "Useful Skew Concepts",
      "Path Restructuring Techniques",
      "Clock Optimization Concepts",
      "Timing ECO Fix Strategies",
      "Fanout & Transition Violations Fix",
      "Timing Debug Methodology"
    ],
    iframeLink: "https://drive.google.com/file/d/1JHFPur99l3N3R8Z24dw3PZg2_A0PeDwW/preview"
  },
  {
    id: 11,
    title: "Static Timing Analysis - 3",
    description: "Deep dive into advanced STA scenarios",
    topics: [
      "On Chip Variation (OCV) Concepts",
      "AOCV & POCV Models",
      "Timing Derates & Variation Effects",
      "CRPR (Clock Reconvergence Pessimism Removal)",
      "Multi-Corner Multi-Mode (MCMM) Analysis",
      "Cross Talk & Noise Impact on Timing",
      "Timing Closure Challenges",
      "False Path Debugging",
      "Multi-Cycle Path Issues",
      "CDC Timing Problems",
      "Clock Gating Timing Challenges",
      "Hierarchical Timing Issues",
      "Real Chip Timing Closure Strategies",
      "Signoff Timing Analysis Flow",
      "Industry Debug Case Studies"
    ],
    iframeLink: "https://drive.google.com/file/d/1KcQFeCaRy8crBtvH06bV15d3Y6TFsboB/preview"
  },
  {
    id: 12,
    title: "PNR Inputs & Sanity Checks",
    description: "Preparing and verifying inputs for Place & Route",
    topics: [
      "Introduction to Physical Design Flow",
      "Overview of Place & Route (PnR) Stages",
      "Understanding PNR Input Files",
      "Netlist (.v / .v.gz) File Structure",
      "Library Files (.lib) Usage",
      "LEF File Types (Technology LEF & Cell LEF)",
      "DEF File Basics",
      "Timing Constraint Files (.sdc)",
      "RC Corner & Tech File Setup",
      "Multi-Corner Multi-Mode (MCMM) Concepts",
      "Design Import Flow in PnR Tools",
      "Linking Libraries & Design Setup",
      "Verifying Library Consistency",
      "Sanity Checks for Input Files",
      "Checking Missing Cells & References",
      "Verifying Power & Ground Connectivity",
      "Clock Definition Validation",
      "Checking Timing Constraints Consistency",
      "Design Rule Sanity Checks",
      "Technology File Compatibility Checks",
      "Logical vs Physical Consistency Checks",
      "Design Setup Verification Reports",
      "Common Input Setup Errors in Industry",
      "Debugging Missing Library Issues",
      "Best Practices for Clean Design Setup"
    ],
    iframeLink: "https://docs.google.com/document/d/16jMmSegTd9aC7X08Fk_oUF0KRfIL_Br8X5INmly60kE/preview"
  },
  {
    id: 13,
    title: "FloorPlan & PowerPlan",
    description: "Core and die area planning, power grid design",
    topics: [
      "Introduction to Floorplanning in PnR Flow",
      "Role of Floorplanning in Timing & Congestion",
      "Understanding Design Inputs for Floorplan",
      "Netlist, LEF, DEF & Technology Files",
      "Standard Cell vs Macro Concepts",
      "Core Area Calculation Methods",
      "Utilization & Density Concepts",
      "Aspect Ratio Selection Strategies",
      "IO Pin Placement Methodologies",
      "Macro Placement Guidelines",
      "Halo & Channel Spacing Concepts",
      "Macro Orientation Rules",
      "Blockages (Placement & Routing)",
      "Keep-Out Regions",
      "Feedthrough Planning",
      "Power Planning Concepts",
      "Power Ring Creation",
      "Power Stripe Planning",
      "IR Drop & EM Awareness",
      "Well Tap & End Cap Placement",
      "Decap Cell Insertion",
      "Floorplan Congestion Estimation",
      "Timing Impact of Floorplan",
      "Clock Planning Considerations",
      "Floorplan Verification Checks",
      "Floorplan Quality Metrics",
      "Common Floorplanning Mistakes",
      "Industry Best Practices",
      "Complete Floorplanning Flow Script"
    ],
    iframeLink: "https://docs.google.com/document/d/1dxmfvA-EgeuzKH3vvGMOFqnYp5cL2N1IIRHv0a0pGas/preview"
  },
  {
    id: 14,
    title: "Placement",
    description: "Standard cell placement and optimization",
    topics: [
      "Introduction to Placement in PnR Flow",
      "Objectives of Placement (Timing, Congestion, Power)",
      "Placement Inputs & Prerequisites",
      "Standard Cell Placement Concepts",
      "Global Placement vs Detailed Placement",
      "Placement Legalization Process",
      "Density Control Techniques",
      "Placement Utilization Impact",
      "Timing Driven Placement Concepts",
      "Congestion Driven Placement Techniques",
      "Understanding place_opt Command Flow",
      "Stages Inside place_opt (Initial, Timing, Congestion)",
      "Cell Spreading Techniques",
      "White Space Optimization",
      "Placement Blockages Handling",
      "Soft vs Hard Blockages",
      "Bound Creation Concepts",
      "Region Constraints for Placement",
      "Magnetic Placement Concept",
      "Macro Proximity Optimization",
      "Critical Cell Placement Techniques",
      "IO Buffer Insertion Concepts",
      "Feedthrough Buffer Placement",
      "High Fanout Net Optimization",
      "Path Grouping Concepts",
      "Critical Path Weightage Assignment",
      "Slack Based Optimization Strategies",
      "Placement Timing Optimization Flow",
      "Clock Path Awareness During Placement",
      "Transition & Capacitance Violation Fix",
      "Congestion Estimation Methods",
      "Hotspot Detection Techniques",
      "Congestion Avoidance Strategies",
      "Buffer Insertion During Placement",
      "Gate Sizing During Placement",
      "Placement QoR Metrics",
      "Common Placement Issues in Industry",
      "Placement Debug Methodology",
      "Best Practices for Timing Closure"
    ],
    iframeLink: "https://docs.google.com/document/d/1WCIQNyoHvQBk2C5Ou8mpOwLlmf2K2J6s6-WFdqf-QDM/preview"
  },
  {
    id: 15,
    title: "Clock Tree Synthesis - 1",
    description: "Building the clock tree network",
    topics: [
      "CTS role in Timing Closure (why CTS is needed)",
      "Pre-CTS vs Post-CTS timing differences",
      "Clock definitions review (create_clock, generated clocks)",
      "Clock latency types: source latency vs network latency",
      "Clock skew basics: global skew, local skew, target skew",
      "Clock uncertainty: jitter, variation, margin concepts",
      "Clock tree objectives: skew, latency, slew, power, noise",
      "Clock topology options: H-tree / spine / mesh (conceptual)",
      "Clock tree elements: buffers, inverters, integrated clock gates (ICG)",
      "Clock gating awareness: ICG placement considerations, enable timing",
      "Clock tree constraints: max transition (slew), max capacitance, max fanout",
      "Clock concurrent optimization idea (clock + timing together)"
    ],
    iframeLink: "https://docs.google.com/document/d/1inE3RfuPl1CzJvqyTyypUHLT1PgwWhEKFGATi8GS1Y4/preview"
  },
  {
    id: 16,
    title: "Clock Tree Synthesis - 2",
    description: "CTS optimization and balancing",
    topics: [
      "Post-CTS timing update: new clock latencies and new path slacks",
      "Setup vs Hold behavior after CTS (why hold can change significantly)",
      "Useful Skew: concept, when it helps, when it hurts",
      "Useful skew vs uncertainty margin understanding",
      "Hold fixing after CTS: delay cell insertion, buffer/inverter, route detours (concept)",
      "Setup fixing after CTS: sizing/buffering, restructuring, placement tweaks (concept)",
      "Clock re-balance / CTS refinement strategies",
      "Clock tree power optimization (buffer count, depth, sizing, gating impact)",
      "Post-CTS congestion impact and mitigation (clock routes + signal routes)"
    ],
    iframeLink: "https://docs.google.com/document/d/1iLXzo9X4eoqnUhPMp7vHIqpU4wI49U7ZcupCP4gDbaY/preview?rm=minimal"
  },
  {
    id: 17,
    title: "Routing",
    description: "Global and detail routing methodologies",
    topics: [
      "Routing Stages: Global Routing vs Detailed Routing",
      "Routing Inputs, Design Rules & Layer Constraints",
      "Clock vs Signal Net Routing Strategies",
      "Congestion Handling During Routing",
      "Parasitic Extraction & SPEF Concepts",
      "Post-Route Timing Analysis Flow",
      "Crosstalk & Signal Integrity Effects",
      "Antenna Violations & Fix Techniques",
      "DRC Violations & Post-Route ECO Fix",
      "Final Timing Closure & Signoff Checks"
    ],
    iframeLink: "https://docs.google.com/document/d/1in7zkzyIV6wMSEBgyFvnavXYYkTC9jrDXBFR9sSJc6w/preview"
  },
  {
    id: 18,
    title: "Physical Verification & Signoff",
    description: "DRC, LVS, Antenna, and final signoff checks",
    topics: [
      "Introduction to Physical Verification Flow",
      "Design Rule Check (DRC) Concepts",
      "Layout vs Schematic (LVS) Basics",
      "Electrical Rule Check (ERC) Overview",
      "Antenna Rule Verification",
      "Density & Metal Fill Concepts",
      "IR Drop Signoff Basics",
      "Electromigration (EM) Signoff Concepts",
      "Final Timing Signoff Flow (MCMM)",
      "GDSII Generation & Tapeout Preparation"
    ],
    iframeLink: "https://docs.google.com/document/d/1cd8ZxLvUYmM5Q1pmIZLfDyYDz0y0Q98SL7x65LF2J7A/preview"
  },
  {
    id: 19,
    title: "Core Interview Questions (Electronics, CMOS, Digital, Linux, TCL)",
    description: "Master VLSI physical design interviews with our comprehensive database of 350+ core Q&As.",
    topics: [
      "Part 1: Basic Electronics (50 Q&As on Resistance, Capacitance, RC Delay, EM)",
      "Part 2: MOSFET & CMOS (100 Q&As on Short Channel Effects, Inverter, VTC)",
      "Part 3: Digital Electronics (100 Q&As on Logic Gates, Sequential/Combinational, Setup/Hold)",
      "Part 4: Linux Commands (50 Q&As on Shell Commands, File Permissions, Environment Variables)",
      "Part 5: TCL Scripting (50 Q&As on PnR Automation, Arrays, String Parsing)",
      "Complete interview-level problem solving and timing waveform analysis"
    ],
    iframeLink: "https://docs.google.com/document/d/1LUQpwCQWWxKVxmqBEYYezOL1XQ8wi4G2naDie48a-Qw/preview"
  },
  {
    id: 20,
    title: "Interview Questions (RTL, Synth, DFT, STA)",
    description: "Cross-domain interview preparation",
    topics: [
      "RTL Coding Interview Questions (Combinational & Sequential)",
      "Blocking vs Non-Blocking Deep Interview Scenarios",
      "FSM Interview Problems",
      "Synthesis Flow Based Interview Questions",
      "Timing Constraint Based Questions (SDC)",
      "DFT & Scan Chain Interview Questions",
      "STA Basic & Advanced Concept Questions",
      "Setup & Hold Based Problem Solving",
      "Constraint Debugging Questions",
      "Real-Time Industry Scenario Questions"
    ],
    iframeLink: "https://docs.google.com/document/d/1wjEy3TAZBVqO2GtUOXLg7qaItbPj0OiebaldlNBrWeA/preview"
  },
  {
    id: 21,
    title: "Physical Design (PNR) Interview Questions",
    description: "In-depth PNR specific questions",
    topics: [
      "Floorplanning Interview Questions",
      "Placement Optimization Questions",
      "CTS Debug & Skew Based Questions",
      "Routing & Congestion Based Scenarios",
      "Antenna Violation Interview Questions",
      "DRC & LVS Based Questions",
      "ECO Based Real Interview Problems",
      "Timing Closure Debug Questions",
      "MCMM Based Interview Scenarios",
      "Full Chip Closure Experience Questions"
    ],
    iframeLink: "https://docs.google.com/document/d/1E68tkz-dCE8iKxci4vRy8fL5mb73cDrm/preview"
  },
  {
    id: 22,
    title: "Physical Verification & Signoff Interview Questions",
    description: "PV and signoff interview preparation",
    topics: [
      "DRC & LVS Interview Questions",
      "Antenna Rule Questions",
      "IR Drop & EM Based Interview Questions",
      "Signoff Timing Analysis Questions",
      "Extraction & SPEF Related Questions",
      "Noise & Crosstalk Based Scenarios",
      "Signoff Flow Explanation Questions",
      "Tapeout Readiness Questions",
      "Tool-Based Practical Interview Scenarios",
      "Real Industry Debug Case Questions"
    ],
    iframeLink: "https://drive.google.com/file/d/17YXMQ_bmMmNydZuWRPfi0d6QyrDFjs73/preview"
  },
  {
    id: 23,
    title: "Certification",
    description: "Certification process and guidelines",
    topics: [
      "Certification Eligibility Criteria",
      "Module Completion Requirements",
      "Final Assessment Structure",
      "Practical Assignment Evaluation",
      "Timing & PNR Case Study Assessment",
      "Mock Interview Performance Criteria",
      "Certification Grading Method",
      "Industry-Level Evaluation Standards",
      "Certificate Issuance Process",
      "Using Certification in Resume & LinkedIn"
    ],
    iframeLink: null,
    isLockedTemporarily: true,
    lockMessage: "⚠️ Future addition - will add based on our development plan.",
    isFutureAddition: true,
    unlockDays: 90
  },
  {
    id: 24,
    title: "Resume Templates for Freshers & Experienced",
    description: "Industry-standard resume formats (Future addition - will add based on our development plan)",
    topics: [
      "Resume Structure for Freshers (Physical Design)",
      "Resume Structure for Experienced Engineers",
      "Project Description Writing Method",
      "How to Write Floorplan / Placement Experience",
      "How to Mention CTS & Routing Work",
      "Timing Closure Experience Formatting",
      "Tool Knowledge Section Optimization",
      "Key Skills & Keywords for Recruiter Search",
      "Common Resume Mistakes in VLSI",
      "Professional Resume Templates (Editable Format)"
    ],
    iframeLink: null,
    isResumeBuilder: false,
    isLockedTemporarily: true,
    lockMessage: "⚠️ Future addition - will add based on our development plan.",
    isFutureAddition: true,
    unlockDays: 30
  },
  {
    id: 25,
    title: "Complete PNR Execution In ICC2",
    description: "Tool-specific PNR execution flows in IC Compiler II",
    topics: [
      "Step by step PNR execution in ICC2"
    ],
    iframeLink: "https://docs.google.com/document/d/1vt4pOe5o4QJ2BTzI6fq0nty6Pl0AU0xrRWzpgQoKBBU/preview?rm=minimal"
  },
  {
    id: 26,
    title: "Complete PNR Execution In Innovus",
    description: "Tool-specific PNR execution flows in Innovus",
    topics: [
      "Step by step PNR execution in Innovus"
    ],
    iframeLink: "https://docs.google.com/document/d/1zCGYpGVIsV1zKtTfnTYaGas8Tp4uADs_sTbjLez5x2U/preview?rm=minimal"
  },
  {
    id: 27,
    title: "Complete PNR Execution In FC",
    description: "Tool-specific PNR execution flows in Fusion Compiler",
    topics: [
      "Step by step PNR execution in FC"
    ],
    iframeLink: "https://docs.google.com/document/d/1sYTWS3hAxpbajc6lXAAAx2z9H7nLHB9N-N36dlhgHqs/preview?rm=minimal"
  },
  {
    id: 28,
    title: "Timing Analysis User Guide",
    description: "Detailed study guides and documentation for Timing Analysis User Guide",
    topics: [
      "Timing Analysis User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1kblXPkqhvGsxyejuDGEas-aOOYliG5Ii/preview"
  },
  {
    id: 29,
    title: "Tempus User Guide",
    description: "Detailed study guides and documentation for Tempus User Guide",
    topics: [
      "Tempus User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1xzHzq9rxCObl3V1e1uJ3tdq0INs2FcNc/preview"
  },
  {
    id: 30,
    title: "Syn2PNR Flow Guide",
    description: "Detailed study guides and documentation for Syn2PNR Flow Guide",
    topics: [
      "Syn2PNR Flow Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/12598w4bVe4t_c04_Qw6aPK3P3uAxLk7D/preview"
  },
  {
    id: 31,
    title: "ICC Student Guide",
    description: "Detailed study guides and documentation for ICC Student Guide",
    topics: [
      "ICC Student Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1WvWSx5hrpqTvTkbQtTJudvHS3kBfnAMz/preview"
  },
  {
    id: 32,
    title: "Star RC User Guide",
    description: "Detailed study guides and documentation for Star RC User Guide",
    topics: [
      "Star RC User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1cnf-UBepYXZE-6b7u3cx-WUb2261VDBN/preview"
  },
  {
    id: 33,
    title: "Voltus IC Power Integrity Solution User Guide",
    description: "Detailed study guides and documentation for Voltus IC Power Integrity Solution User Guide",
    topics: [
      "Voltus IC Power Integrity Solution User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1jsBTzxO9PirpjK5BAuaCoTLgpUeoWznv/preview"
  },
  {
    id: 34,
    title: "All VLSI Questions and Answers",
    description: "Detailed study guides and documentation for All VLSI Questions and Answers",
    topics: [
      "All VLSI Questions and Answers"
    ],
    iframeLink: "https://drive.google.com/file/d/12Ee4gV08PXdGF5M-cdaDbhBOF3FetWb_/preview"
  },
  {
    id: 35,
    title: "Viva Questions on Synthesis",
    description: "Detailed study guides and documentation for Viva Questions on Synthesis",
    topics: [
      "Viva Questions on Synthesis"
    ],
    iframeLink: "https://drive.google.com/file/d/1_x579JKYUqskH23H-eWuxEymN00kNtcP/preview"
  },
  {
    id: 36,
    title: "PrimeTime Student Guide (2018 Version)",
    description: "Detailed study guides and documentation for PrimeTime Student Guide (2018 Version)",
    topics: [
      "PrimeTime Student Guide (2018 Version)"
    ],
    iframeLink: "https://drive.google.com/file/d/1sIDMCcsk9Wkpy6KWaQTrSVnLVd4mGihW/preview"
  },
  {
    id: 37,
    title: "PrimeTime Crosstalk Analysis Guide",
    description: "Detailed study guides and documentation for PrimeTime Crosstalk Analysis Guide",
    topics: [
      "PrimeTime Crosstalk Analysis Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1RRGWxY4Z_BTer4pLCB0eR9vELKZlVCAl/preview"
  },
  {
    id: 38,
    title: "PrimeTime Tool User Guide",
    description: "Detailed study guides and documentation for PrimeTime Tool User Guide",
    topics: [
      "PrimeTime Tool User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/12Hpwh99ZH8Lw6uFHJiDK83g18Ivkj0Bb/preview"
  },
  {
    id: 39,
    title: "PNR Notes & Best Practices",
    description: "Detailed study guides and documentation for PNR Notes & Best Practices",
    topics: [
      "PNR Notes & Best Practices"
    ],
    iframeLink: "https://drive.google.com/file/d/1ZjDIazBWHn6rjvUKxRkilBGYCkBMuuO0/preview"
  },
  {
    id: 40,
    title: "PNR Debug & Fixes Guide",
    description: "Detailed study guides and documentation for PNR Debug & Fixes Guide",
    topics: [
      "PNR Debug & Fixes Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1YrxPy5eu7ItBsroN6jhb3QNHyttKWas9/preview"
  },
  {
    id: 41,
    title: "Block Implementation Lab Guide",
    description: "Detailed study guides and documentation for Block Implementation Lab Guide",
    topics: [
      "Block Implementation Lab Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1PYPdzJq2hrfq6jQHYV0_-SK09jQpm2hm/preview"
  },
  {
    id: 42,
    title: "Khaleel PNR Lab Practice Guide",
    description: "Detailed study guides and documentation for Khaleel PNR Lab Practice Guide",
    topics: [
      "Khaleel PNR Lab Practice Guide"
    ],
    iframeLink: "https://docs.google.com/document/d/1WrbpV4OhSvXLlmTDn1KN7Hl7D85znipO/preview?rm=minimal"
  },
  {
    id: 43,
    title: "Complete Physical Design Flow Documentation",
    description: "Detailed study guides and documentation for Complete Physical Design Flow Documentation",
    topics: [
      "Complete Physical Design Flow Documentation"
    ],
    iframeLink: "https://drive.google.com/file/d/1PzMPS_uLuzs6wQGsWoNmxpEO2imut_kx/preview"
  },
  {
    id: 44,
    title: "Innovus TCR Reference Guide",
    description: "Detailed study guides and documentation for Innovus TCR Reference Guide",
    topics: [
      "Innovus TCR Reference Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/15dsogkIzY01L47jqxQwQ2JvRx9uKolJM/preview"
  },
  {
    id: 45,
    title: "ICC2 Tool User Guide",
    description: "Detailed study guides and documentation for ICC2 Tool User Guide",
    topics: [
      "ICC2 Tool User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1SfGX-Rr2OpsgBZnY7O3NFFZVYS4dB71h/preview"
  },
  {
    id: 46,
    title: "Genus Synthesis Tool User Guide",
    description: "Detailed study guides and documentation for Genus Synthesis Tool User Guide",
    topics: [
      "Genus Synthesis Tool User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1uE9Iw5OtzOTYuy02P5aFNfBsR6Qw7JXa/preview"
  },
  {
    id: 47,
    title: "Fusion Compiler User Guide",
    description: "Detailed study guides and documentation for Fusion Compiler User Guide",
    topics: [
      "Fusion Compiler User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1o13t-yskE3usFZR3r1XdMYd7_WqABU1H/preview"
  },
  {
    id: 48,
    title: "Formality User Guide",
    description: "Detailed study guides and documentation for Formality User Guide",
    topics: [
      "Formality User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1VO6ySVQLmroZkdR0HxX03fE5SvAgjn26/preview"
  },
  {
    id: 49,
    title: "Digital Logic & Design Interview Preparation",
    description: "Detailed study guides and documentation for Digital Logic & Design Interview Preparation",
    topics: [
      "Digital Logic & Design Interview Preparation"
    ],
    iframeLink: "https://drive.google.com/file/d/1T_DDYWdB5uBi5xXf9M38b1ByVIty-wwo/preview"
  },
  {
    id: 50,
    title: "Design Compiler (DC) Tool User Guide",
    description: "Detailed study guides and documentation for Design Compiler (DC) Tool User Guide",
    topics: [
      "Design Compiler (DC) Tool User Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1o8tnTRq4nlhLHO51ILdACIAMDue2hvTS/preview"
  },
  {
    id: 51,
    title: "DB Get Useful Commands Reference",
    description: "Detailed study guides and documentation for DB Get Useful Commands Reference",
    topics: [
      "DB Get Useful Commands Reference"
    ],
    iframeLink: "https://drive.google.com/file/d/1hFrNQJQbXDIZXxKygC4amRwgNkQjftJ7/preview"
  },
  {
    id: 52,
    title: "ICC2 Flow Implementation Guide",
    description: "Detailed study guides and documentation for ICC2 Flow Implementation Guide",
    topics: [
      "ICC2 Flow Implementation Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/14EbRhUeEoecwO-yNnAALIb2Qnrgl-WTZ/preview"
  },
  {
    id: 53,
    title: "Complete Synthesis Flow Documentation",
    description: "Detailed study guides and documentation for Complete Synthesis Flow Documentation",
    topics: [
      "Complete Synthesis Flow Documentation"
    ],
    iframeLink: "https://drive.google.com/file/d/1U560RNjag6xRKu-edCU3plRO60PfqHgb/preview"
  },
  {
    id: 54,
    title: "Block-Level Implementation Workshop Guide",
    description: "Detailed study guides and documentation for Block-Level Implementation Workshop Guide",
    topics: [
      "Block-Level Implementation Workshop Guide"
    ],
    iframeLink: "https://drive.google.com/file/d/1PYPdzJq2hrfq6jQHYV0_-SK09jQpm2hm/preview"
  },
  {
    id: 55,
    title: "Basic GVIM Commands for Faster Workflow",
    description: "Detailed study guides and documentation for Basic GVIM Commands for Faster Workflow",
    topics: [
      "Basic GVIM Commands for Faster Workflow"
    ],
    iframeLink: "https://docs.google.com/document/d/1jQg5akNXkkvYkOagwIqslDFsB7r23YJ4/preview?rm=minimal"
  },
  {
    id: 56,
    title: "Application Options & Attributes Reference",
    description: "Detailed study guides and documentation for Application Options & Attributes Reference",
    topics: [
      "Application Options & Attributes Reference"
    ],
    iframeLink: "https://drive.google.com/file/d/1FuuzI_t0KFksDnSxItqojjGvD4rC5-ce/preview"
  },
  {
    id: 57,
    title: "Innovus User Guide (Full Version)",
    description: "Detailed study guides and documentation for Innovus User Guide (Full Version)",
    topics: [
      "Innovus User Guide (Full Version)"
    ],
    iframeLink: "https://drive.google.com/file/d/1aK8S74YkFDlIeujQ7qqXDqTHfLi8O6u3/preview"
  },
  {
    id: 58,
    title: "Industrial TCL Scripts",
    description: "Production-grade automation suite for physical design (PnR) and timing closure (STA).",
    topics: [
      "Introduction to Industrial TCL Scripting",
      "dbGet & Tool Database Querying Examples",
      "Automating Timing ECOs & Buffer Insertion",
      "Congestion-Aware Routing & Constraints Setup",
      "Custom Report Generation & Log Parsing Scripts",
      "Synthesis and PnR Run Script Templates"
    ],
    iframeLink: "https://docs.google.com/document/d/13BnBj6PUUzn7JUsuG0Lp0szcWqOI1mAdtnYcaPX-XHc/preview",
    isLockedTemporarily: false
  },
  {
    id: 59,
    title: "Ocean Physical Design Job Finder",
    description: "Premium real-time job aggregator and tool-matching engine continuously tracking 100+ semiconductor careers pages.",
    topics: [
      "Automated Careers Scraper Engine",
      "Confidence Match Score & Keyword Extraction",
      "Unified Global Job Listings Feed",
      "Crawl Logs & Sync Control Panel",
      "Admin Threshold & Keyword Controls",
      "Email, Web Push, and Telegram Alerts"
    ],
    iframeLink: null,
    isLockedTemporarily: false
  }
];