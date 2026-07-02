export const EXPERIENCE_LEVELS = [
  { id: 'fresher', name: 'Fresher', yearsRange: '0', description: 'Recent graduate' },
  { id: 'intern', name: 'Intern', yearsRange: '0', description: 'Current intern' },
  { id: '0_1', name: '0-1 Years', yearsRange: '0-1', description: 'Entry level' },
  { id: '1_3', name: '1-3 Years', yearsRange: '1-3', description: 'Junior Engineer' },
  { id: '3_5', name: '3-5 Years', yearsRange: '3-5', description: 'Mid-level Engineer' },
  { id: '5_10', name: '5-10 Years', yearsRange: '5-10', description: 'Senior Engineer' },
  { id: '10_plus', name: '10+ Years', yearsRange: '10+', description: 'Staff/Principal' },
  { id: 'manager', name: 'Manager', yearsRange: '8+', description: 'Engineering Manager' },
  { id: 'lead', name: 'Lead Engineer', yearsRange: '7+', description: 'Tech Lead' },
  { id: 'principal', name: 'Principal Engineer', yearsRange: '12+', description: 'Principal' },
  { id: 'architect', name: 'Architect', yearsRange: '15+', description: 'System Architect' }
];

export const DOMAINS = [
  {
    id: 'physical_design',
    name: 'Physical Design',
    category: 'vlsi',
    description: 'ASIC/SOC physical implementation from Netlist to GDSII.',
    defaultSkills: ['fp_floorplan', 'pl_placement', 'cts_synthesis', 'rt_global', 'sta_setup_hold', 'pa_ir_drop', 'pv_drc', 'tool_innovus', 'tool_icc2', 'lang_tcl'],
    keywords: ['pnr', 'floorplan', 'placement', 'cts', 'routing', 'timing closure', 'physical design', 'innovus', 'icc2', 'gdsii'],
    sampleObjective: 'Results-driven Physical Design Engineer seeking to leverage expertise in netlist-to-GDSII flow, timing closure, and physical verification to deliver high-performance ASICs at advanced technology nodes.',
    sampleSummary: 'Experienced Physical Design Engineer with a strong track record of successful tapeouts in sub-7nm nodes. Proficient in complete PnR flow including floorplanning, placement, CTS, routing, and timing closure. Adept at resolving complex congestion and timing issues to achieve optimal PPA.',
    actionVerbs: ['Architected', 'Floorplanned', 'Optimized', 'Routed', 'Resolved', 'Implemented', 'Synthesized', 'Achieved']
  },
  {
    id: 'sta',
    name: 'Static Timing Analysis (STA)',
    category: 'vlsi',
    description: 'Timing signoff, constraints management, and ECO implementation.',
    defaultSkills: ['sta_setup_hold', 'sta_mcmm', 'sta_ocv', 'sta_eco', 'sta_constraints', 'tool_pt', 'tool_tempus', 'lang_tcl'],
    keywords: ['sta', 'timing analysis', 'primetime', 'tempus', 'mcmm', 'ocv', 'setup', 'hold', 'sdc', 'eco'],
    sampleObjective: 'Detail-oriented STA Engineer aiming to contribute expertise in timing signoff, constraint development, and multi-corner multi-mode (MCMM) analysis to ensure first-pass silicon success.',
    sampleSummary: 'Specialized Static Timing Analysis (STA) Engineer with extensive experience in signoff at advanced nodes. Expert in developing complex SDC constraints, performing MCMM analysis, and implementing timing ECOs to fix setup, hold, and transition violations.',
    actionVerbs: ['Analyzed', 'Constrained', 'Signed-off', 'Fixed', 'Correlated', 'Validated', 'Automated']
  },
  {
    id: 'dft',
    name: 'Design for Testability (DFT)',
    category: 'vlsi',
    description: 'Scan insertion, ATPG, BIST, and test coverage optimization.',
    defaultSkills: ['dft_scan', 'dft_atpg', 'dft_bist', 'dft_jtag', 'dft_compression', 'tool_tessent', 'lang_tcl'],
    keywords: ['dft', 'scan', 'atpg', 'bist', 'mbist', 'jtag', 'fault coverage', 'tessent', 'testability'],
    sampleObjective: 'Innovative DFT Engineer seeking to apply deep knowledge of scan architectures, ATPG, and BIST to maximize fault coverage and reduce test costs for complex SOCs.',
    sampleSummary: 'Dedicated DFT Engineer with proven experience in implementing comprehensive test architectures. Skilled in scan insertion, compression, memory BIST, and boundary scan. Strong background in achieving >99% fault coverage while meeting strict area and timing overhead constraints.',
    actionVerbs: ['Inserted', 'Generated', 'Diagnosed', 'Covered', 'Reduced', 'Integrated', 'Tested']
  },
  {
    id: 'rtl_design',
    name: 'RTL Design',
    category: 'vlsi',
    description: 'Digital logic design, microarchitecture, and HDL coding.',
    defaultSkills: ['lang_verilog', 'lang_sv', 'lang_vhdl', 'syn_logic', 'fmt_upf', 'fv_cdc', 'tool_dc'],
    keywords: ['rtl', 'verilog', 'systemverilog', 'microarchitecture', 'logic design', 'synthesis', 'cdc', 'lint'],
    sampleObjective: 'Passionate RTL Design Engineer seeking to design robust, low-power digital microarchitectures and implement scalable logic solutions for next-generation semiconductor products.',
    sampleSummary: 'Accomplished RTL Designer experienced in developing complex digital IPs from concept to silicon. Proficient in Verilog/SystemVerilog, microarchitecture definition, state machine design, and ensuring CDC/RDC compliance. Track record of delivering highly optimized, power-efficient logic designs.',
    actionVerbs: ['Designed', 'Coded', 'Architected', 'Synthesized', 'Simulated', 'Linted', 'Microarchitected']
  },
  {
    id: 'design_verification',
    name: 'Design Verification',
    category: 'vlsi',
    description: 'Pre-silicon functional verification using UVM/OVM.',
    defaultSkills: ['lang_sv', 'lang_c', 'tool_questa', 'tool_vcs', 'lang_python', 'lang_tcl'],
    keywords: ['dv', 'verification', 'uvm', 'systemverilog', 'coverage', 'testbench', 'vcs', 'questa', 'assertions'],
    sampleObjective: 'Detail-oriented Verification Engineer aiming to utilize strong UVM and SystemVerilog skills to develop rigorous verification environments and achieve 100% functional coverage.',
    sampleSummary: 'Expert Design Verification Engineer with deep knowledge of UVM methodologies. Proven ability to build scalable, reusable testbenches from scratch. Experienced in developing comprehensive test plans, writing constrained random tests, and driving coverage closure for complex SoCs.',
    actionVerbs: ['Verified', 'Tested', 'Covered', 'Debugged', 'Modeled', 'Asserted', 'Scripted']
  },
  {
    id: 'analog_layout',
    name: 'Analog Layout',
    category: 'vlsi',
    description: 'Custom full-custom analog and mixed-signal layout.',
    defaultSkills: ['tool_virtuoso', 'pv_drc', 'pv_lvs', 'pv_erc', 'pv_antenna', 'tool_calibre'],
    keywords: ['analog layout', 'virtuoso', 'custom layout', 'matching', 'shielding', 'drc', 'lvs', 'calibre'],
    sampleObjective: 'Precision-focused Analog Layout Engineer seeking to deliver highly matched, noise-immune custom layouts for high-speed and low-power mixed-signal ICs.',
    sampleSummary: 'Skilled Analog Layout Engineer with expertise in sub-micron FinFET technologies. Deep understanding of layout-dependent effects (LDE), common centroid matching, and shielding techniques. Proficient in Cadence Virtuoso and Mentor Calibre for flawless DRC/LVS/ERC signoff.',
    actionVerbs: ['Drafted', 'Matched', 'Shielded', 'Routed', 'Extracted', 'Signed-off', 'Customized']
  },
  {
    id: 'physical_verification_signoff',
    name: 'Physical Verification (PV)',
    category: 'vlsi',
    description: 'DRC, LVS, ERC, and tapeout signoff.',
    defaultSkills: ['pv_drc', 'pv_lvs', 'pv_erc', 'pv_antenna', 'pv_density', 'tool_calibre', 'tool_icv', 'lang_tcl'],
    keywords: ['pv', 'physical verification', 'drc', 'lvs', 'erc', 'calibre', 'ic validator', 'tapeout', 'signoff'],
    sampleObjective: 'Meticulous Physical Verification Engineer dedicated to ensuring zero-defect tapeouts through rigorous DRC, LVS, and DFM checks at advanced technology nodes.',
    sampleSummary: 'Experienced Physical Verification signoff specialist. Proven expertise in running and debugging complex Calibre/ICV rule decks for DRC, LVS, and Antenna checks. Adept at driving rapid convergence of physical errors and implementing optimal metal fill strategies for manufacturing yield.',
    actionVerbs: ['Verified', 'Checked', 'Cleared', 'Fixed', 'Debugged', 'Filled', 'Signed-off']
  },
  {
    id: 'synthesis',
    name: 'Synthesis',
    category: 'vlsi',
    description: 'RTL to gate-level synthesis and optimization.',
    defaultSkills: ['syn_logic', 'syn_optimization', 'tool_dc', 'tool_genus', 'fmt_upf', 'sta_setup_hold'],
    keywords: ['synthesis', 'design compiler', 'genus', 'rtl2gate', 'datapath', 'retiming', 'area optimization'],
    sampleObjective: 'Results-oriented Synthesis Engineer seeking to optimize complex RTL designs for the best Power, Performance, and Area (PPA) metrics.',
    sampleSummary: 'Specialized Synthesis Engineer with a strong background in transforming complex RTL into highly optimized gate-level netlists. Expert in Synopsys Design Compiler and Cadence Genus. Proven ability to push the boundaries of area and timing optimization through advanced datapath structuring and retiming.',
    actionVerbs: ['Synthesized', 'Optimized', 'Mapped', 'Compiled', 'Retimed', 'Structured']
  },
  {
    id: 'software_engineering',
    name: 'Software Engineering',
    category: 'software',
    description: 'General software development, frontend, backend, or full-stack.',
    defaultSkills: ['lang_python', 'lang_c', 'soft_git', 'soft_linux', 'soft_ci_cd'],
    keywords: ['software', 'developer', 'engineer', 'frontend', 'backend', 'full-stack', 'api'],
    sampleObjective: 'Innovative Software Engineer seeking to leverage strong programming skills to build scalable, highly-available applications.',
    sampleSummary: 'Versatile Software Engineer with experience across the full stack. Adept at writing clean, maintainable code and developing robust architectures. Passionate about solving complex problems and delivering high-quality software products.',
    actionVerbs: ['Developed', 'Engineered', 'Programmed', 'Deployed', 'Architected', 'Refactored', 'Optimized']
  },
  {
    id: 'embedded_systems',
    name: 'Embedded Systems',
    category: 'engineering',
    description: 'Firmware, microcontrollers, and hardware/software co-design.',
    defaultSkills: ['eng_embedded', 'lang_c', 'lang_python', 'eng_fpga', 'soft_linux'],
    keywords: ['embedded', 'firmware', 'rtos', 'microcontroller', 'arm', 'c', 'c++'],
    sampleObjective: 'Dedicated Embedded Systems Engineer aiming to design robust, resource-efficient firmware for next-generation IoT and consumer electronics.',
    sampleSummary: 'Experienced Embedded Engineer skilled in C/C++ programming for constrained environments. Proficient with ARM Cortex architectures, RTOS, and low-level driver development. Proven ability to bridge the gap between hardware and software to deliver reliable systems.',
    actionVerbs: ['Programmed', 'Interfaced', 'Debugged', 'Ported', 'Configured', 'Optimized']
  }
];

export function getDomainById(id) {
  return DOMAINS.find(d => d.id === id) || DOMAINS[0];
}

export function getDomainsByCategory(category) {
  return DOMAINS.filter(d => d.category === category);
}

export function getExperienceLevelById(id) {
  return EXPERIENCE_LEVELS.find(e => e.id === id) || EXPERIENCE_LEVELS[0];
}
