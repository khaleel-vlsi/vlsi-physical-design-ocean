export const SKILL_CATEGORIES = [
  {
    id: 'floorplanning',
    name: 'Floorplanning',
    skills: [
      { id: 'fp_floorplan', name: 'Floorplanning', keywords: ['macro placement', 'die size', 'aspect ratio'] },
      { id: 'fp_pin_placement', name: 'Pin Placement', keywords: ['io planning', 'bump planning'] },
      { id: 'fp_power_planning', name: 'Power Planning', keywords: ['pg grid', 'power mesh', 'rings', 'stripes'] },
      { id: 'fp_partitioning', name: 'Partitioning', keywords: ['hierarchical design', 'block level'] },
    ]
  },
  {
    id: 'placement',
    name: 'Placement',
    skills: [
      { id: 'pl_placement', name: 'Placement', keywords: ['cell placement', 'standard cell'] },
      { id: 'pl_congestion', name: 'Congestion Driven Placement', keywords: ['congestion relief', 'cell spreading'] },
      { id: 'pl_timing', name: 'Timing Driven Placement', keywords: ['tdf', 'path grouping'] },
      { id: 'pl_legalization', name: 'Legalization', keywords: ['overlap removal'] },
      { id: 'pl_scan_reorder', name: 'Scan Chain Reordering', keywords: ['dft', 'scan def'] },
    ]
  },
  {
    id: 'cts',
    name: 'Clock Tree Synthesis (CTS)',
    skills: [
      { id: 'cts_synthesis', name: 'Clock Tree Synthesis', keywords: ['cts', 'clock routing'] },
      { id: 'cts_skew', name: 'Clock Skew Optimization', keywords: ['useful skew', 'local skew', 'global skew'] },
      { id: 'cts_latency', name: 'Insertion Delay/Latency', keywords: ['clock latency', 'source latency'] },
      { id: 'cts_gating', name: 'Clock Gating', keywords: ['icg', 'power reduction'] },
      { id: 'cts_mesh', name: 'Clock Mesh/H-Tree', keywords: ['multisource cts', 'advanced clocking'] },
      { id: 'cts_ndr', name: 'Non-Default Rules (NDR)', keywords: ['shielding', 'double width', 'double spacing'] },
    ]
  },
  {
    id: 'routing',
    name: 'Routing',
    skills: [
      { id: 'rt_global', name: 'Global Routing', keywords: ['gcell', 'congestion map'] },
      { id: 'rt_detail', name: 'Detail Routing', keywords: ['track assignment', 'drc'] },
      { id: 'rt_crosstalk', name: 'Crosstalk Avoidance', keywords: ['si', 'signal integrity', 'spacing'] },
      { id: 'rt_antenna', name: 'Antenna Effect Fix', keywords: ['antenna diodes', 'layer hopping'] },
      { id: 'rt_dfm', name: 'Design for Manufacturing (DFM)', keywords: ['wire spreading', 'wire widening'] },
    ]
  },
  {
    id: 'sta',
    name: 'Static Timing Analysis (STA)',
    skills: [
      { id: 'sta_setup_hold', name: 'Setup & Hold Analysis', keywords: ['timing closure', 'slack'] },
      { id: 'sta_mcmm', name: 'MCMM Analysis', keywords: ['multi-corner multi-mode', 'scenarios'] },
      { id: 'sta_ocv', name: 'OCV/AOCV/POCV', keywords: ['on-chip variation', 'derating'] },
      { id: 'sta_eco', name: 'Timing ECO', keywords: ['engineering change order', 'sizing', 'buffer insertion'] },
      { id: 'sta_constraints', name: 'SDC Constraints', keywords: ['synopsys design constraints', 'exceptions', 'false path', 'multicycle'] },
      { id: 'sta_crpr', name: 'CRPR/CPPR', keywords: ['clock reconvergence pessimism removal'] },
    ]
  },
  {
    id: 'dft',
    name: 'Design for Testability (DFT)',
    skills: [
      { id: 'dft_scan', name: 'Scan Insertion', keywords: ['scan chains', 'testability'] },
      { id: 'dft_atpg', name: 'ATPG', keywords: ['automatic test pattern generation', 'fault coverage'] },
      { id: 'dft_bist', name: 'BIST (MBIST/LBIST)', keywords: ['built-in self test', 'memory test'] },
      { id: 'dft_jtag', name: 'JTAG / Boundary Scan', keywords: ['ieee 1149.1'] },
      { id: 'dft_compression', name: 'Test Compression', keywords: ['scan compression'] },
    ]
  },
  {
    id: 'physical_verification',
    name: 'Physical Verification',
    skills: [
      { id: 'pv_drc', name: 'DRC', keywords: ['design rule check', 'runset'] },
      { id: 'pv_lvs', name: 'LVS', keywords: ['layout versus schematic', 'extraction'] },
      { id: 'pv_erc', name: 'ERC', keywords: ['electrical rule check'] },
      { id: 'pv_antenna', name: 'Antenna Checks', keywords: ['process antenna'] },
      { id: 'pv_density', name: 'Density/Metal Fill', keywords: ['dummy fill', 'cmp'] },
    ]
  },
  {
    id: 'power_analysis',
    name: 'Power Analysis (IR/EM)',
    skills: [
      { id: 'pa_ir_drop', name: 'IR Drop Analysis', keywords: ['static ir', 'dynamic ir', 'voltage drop'] },
      { id: 'pa_em', name: 'Electromigration (EM)', keywords: ['current density', 'wire reliability'] },
      { id: 'pa_low_power', name: 'Low Power Design', keywords: ['power gating', 'multi-vt', 'dvfs', 'clock gating'] },
      { id: 'pa_power_domains', name: 'Multiple Power Domains', keywords: ['level shifters', 'isolation cells', 'retention registers'] },
    ]
  },
  {
    id: 'synthesis',
    name: 'Logic Synthesis',
    skills: [
      { id: 'syn_logic', name: 'Logic Synthesis', keywords: ['rtl to gate', 'mapping'] },
      { id: 'syn_optimization', name: 'Area & Power Optimization', keywords: ['datapath', 'resource sharing'] },
      { id: 'syn_retiming', name: 'Retiming', keywords: ['register retiming', 'pipelining'] },
    ]
  },
  {
    id: 'formal_verification',
    name: 'Formal Verification',
    skills: [
      { id: 'fv_lec', name: 'Logic Equivalence Checking (LEC)', keywords: ['conformal', 'formality', 'rtl vs netlist'] },
      { id: 'fv_cdc', name: 'Clock Domain Crossing (CDC)', keywords: ['synchronizers', 'meta-stability'] },
      { id: 'fv_rdc', name: 'Reset Domain Crossing (RDC)', keywords: ['reset synchronization'] },
    ]
  },
  {
    id: 'eda_cadence',
    name: 'EDA Tools (Cadence)',
    skills: [
      { id: 'tool_innovus', name: 'Innovus', keywords: ['pnr', 'implementation'] },
      { id: 'tool_genus', name: 'Genus', keywords: ['synthesis'] },
      { id: 'tool_tempus', name: 'Tempus', keywords: ['sta', 'timing'] },
      { id: 'tool_voltus', name: 'Voltus', keywords: ['power', 'ir', 'em'] },
      { id: 'tool_conformal', name: 'Conformal', keywords: ['lec', 'formal'] },
      { id: 'tool_virtuoso', name: 'Virtuoso', keywords: ['custom layout', 'analog'] },
      { id: 'tool_pegasus', name: 'Pegasus', keywords: ['drc', 'lvs', 'signoff'] },
    ]
  },
  {
    id: 'eda_synopsys',
    name: 'EDA Tools (Synopsys)',
    skills: [
      { id: 'tool_icc2', name: 'ICC2 / Fusion Compiler', keywords: ['pnr', 'implementation'] },
      { id: 'tool_dc', name: 'Design Compiler', keywords: ['synthesis'] },
      { id: 'tool_pt', name: 'PrimeTime', keywords: ['sta', 'timing', 'signoff'] },
      { id: 'tool_starrc', name: 'StarRC', keywords: ['extraction', 'parasitic'] },
      { id: 'tool_icv', name: 'IC Validator', keywords: ['drc', 'lvs', 'signoff'] },
      { id: 'tool_formality', name: 'Formality', keywords: ['lec', 'formal'] },
    ]
  },
  {
    id: 'eda_mentor',
    name: 'EDA Tools (Siemens/Mentor)',
    skills: [
      { id: 'tool_calibre', name: 'Calibre', keywords: ['drc', 'lvs', 'perc', 'signoff'] },
      { id: 'tool_tessent', name: 'Tessent', keywords: ['dft', 'bist', 'atpg'] },
      { id: 'tool_questa', name: 'Questa', keywords: ['simulation', 'verification'] },
    ]
  },
  {
    id: 'eda_ansys',
    name: 'EDA Tools (Ansys)',
    skills: [
      { id: 'tool_redhawk', name: 'RedHawk', keywords: ['power', 'ir', 'em', 'signoff'] },
      { id: 'tool_totem', name: 'Totem', keywords: ['custom power', 'analog'] },
      { id: 'tool_pathfinder', name: 'PathFinder', keywords: ['esd'] },
    ]
  },
  {
    id: 'programming',
    name: 'Programming & Scripting',
    skills: [
      { id: 'lang_tcl', name: 'TCL', keywords: ['tool command language', 'scripting', 'automation'] },
      { id: 'lang_python', name: 'Python', keywords: ['data analysis', 'scripting'] },
      { id: 'lang_perl', name: 'Perl', keywords: ['text processing', 'regex'] },
      { id: 'lang_shell', name: 'Shell / Bash', keywords: ['linux', 'unix', 'automation'] },
      { id: 'lang_c', name: 'C/C++', keywords: ['system programming', 'algorithms'] },
      { id: 'lang_sv', name: 'SystemVerilog', keywords: ['rtl', 'verification', 'uvm'] },
      { id: 'lang_verilog', name: 'Verilog', keywords: ['rtl', 'hdl'] },
      { id: 'lang_vhdl', name: 'VHDL', keywords: ['rtl', 'hdl'] },
    ]
  },
  {
    id: 'formats',
    name: 'Formats & Standards',
    skills: [
      { id: 'fmt_upf', name: 'UPF / CPF', keywords: ['unified power format', 'low power'] },
      { id: 'fmt_sdc', name: 'SDC', keywords: ['synopsys design constraints'] },
      { id: 'fmt_lefdef', name: 'LEF / DEF', keywords: ['library exchange format', 'design exchange format'] },
      { id: 'fmt_gds', name: 'GDSII / OASIS', keywords: ['tapeout', 'layout'] },
      { id: 'fmt_liberty', name: 'Liberty (.lib)', keywords: ['timing library', 'power library'] },
      { id: 'fmt_spef', name: 'SPEF', keywords: ['standard parasitic exchange format'] },
    ]
  },
  {
    id: 'general_engineering',
    name: 'General Engineering',
    skills: [
      { id: 'eng_embedded', name: 'Embedded Systems', keywords: ['microcontrollers', 'firmware'] },
      { id: 'eng_fpga', name: 'FPGA Design', keywords: ['xilinx', 'intel', 'vivado', 'quartus'] },
      { id: 'eng_pcb', name: 'PCB Design', keywords: ['altium', 'allegro', 'board design'] },
      { id: 'eng_matlab', name: 'MATLAB / Simulink', keywords: ['modeling', 'simulation'] },
      { id: 'eng_dsp', name: 'Digital Signal Processing', keywords: ['dsp', 'filters'] },
    ]
  },
  {
    id: 'software',
    name: 'Software & Tools',
    skills: [
      { id: 'soft_git', name: 'Git', keywords: ['version control', 'github', 'bitbucket'] },
      { id: 'soft_linux', name: 'Linux/Unix', keywords: ['os', 'command line'] },
      { id: 'soft_ci_cd', name: 'CI/CD', keywords: ['jenkins', 'automation'] },
      { id: 'soft_agile', name: 'Agile / Scrum', keywords: ['jira', 'project management'] },
    ]
  },
  {
    id: 'soft_skills',
    name: 'Soft Skills',
    skills: [
      { id: 'ss_communication', name: 'Communication', keywords: ['written', 'verbal'] },
      { id: 'ss_problem_solving', name: 'Problem Solving', keywords: ['analytical', 'troubleshooting'] },
      { id: 'ss_teamwork', name: 'Teamwork', keywords: ['collaboration', 'cross-functional'] },
      { id: 'ss_time_management', name: 'Time Management', keywords: ['prioritization', 'deadlines'] },
      { id: 'ss_leadership', name: 'Leadership', keywords: ['mentoring', 'team lead'] },
    ]
  }
];

// Helper to flatten skills
const ALL_SKILLS = SKILL_CATEGORIES.reduce((acc, cat) => [...acc, ...cat.skills.map(s => ({ ...s, categoryId: cat.id }))], []);

/**
 * Filter skills by query
 */
export function searchSkills(query) {
  if (!query) return ALL_SKILLS;
  const lowerQuery = query.toLowerCase();
  
  return ALL_SKILLS.filter(skill => 
    skill.name.toLowerCase().includes(lowerQuery) || 
    skill.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(categoryId) {
  const category = SKILL_CATEGORIES.find(c => c.id === categoryId);
  return category ? category.skills : [];
}

/**
 * Get skills for a specific domain based on keywords
 */
export function getSkillsByDomain(domainKeywords = []) {
  if (!domainKeywords.length) return ALL_SKILLS.slice(0, 50); // Return top 50 default
  
  const lowerKeywords = domainKeywords.map(k => k.toLowerCase());
  
  // Score skills based on keyword match
  const scoredSkills = ALL_SKILLS.map(skill => {
    let score = 0;
    const lowerName = skill.name.toLowerCase();
    
    // Direct name match
    if (lowerKeywords.some(k => lowerName.includes(k))) score += 10;
    
    // Keyword match
    skill.keywords.forEach(kw => {
      if (lowerKeywords.some(k => kw.toLowerCase().includes(k))) score += 5;
    });
    
    return { ...skill, score };
  });
  
  // Return skills with score > 0, sorted by score
  return scoredSkills
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ score, ...skill }) => skill);
}
