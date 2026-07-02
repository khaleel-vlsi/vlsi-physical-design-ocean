/**
 * Generates highly realistic VLSI semiconductor resumes for testing.
 */

export const generateMockResume = (type = 'fresher') => {
  const base = {
    personal: {
      name: `Test ${type} User`,
      email: `test.${type}@example.com`,
      phone: '+1 234 567 8900',
      location: 'San Jose, CA',
      linkedin: 'linkedin.com/in/testuser'
    },
    objective: {
      objective: 'To leverage my expertise in physical design and STA to deliver high-performance, low-power semiconductor chips.'
    },
    experience: { items: [] },
    education: { items: [] },
    projects: { items: [] },
    skills: { text: '' },
    training: { items: [] },
    declaration: {
      text: 'I declare that the information is true to the best of my knowledge.',
      place: 'San Jose',
      date: new Date().toLocaleDateString()
    }
  };

  if (type === 'extreme') {
    // Generate 10 Experiences
    for (let i = 0; i < 10; i++) {
      base.experience.items.push({
        id: `exp-${i}`,
        role: `Senior PD Engineer Level ${i}`,
        company: `SemiCorp ${i}`,
        description: `• Spearheaded the tapeout of a 5nm AI accelerator.\n• Optimized block level floorplanning resulting in 15% better routability.\n• Managed a team of ${i} junior engineers.`
      });
    }
    // Generate 20 Projects
    for (let i = 0; i < 20; i++) {
      base.projects.items.push({
        id: `proj-${i}`,
        title: `7nm GPU Block Implementation ${i}`,
        role: 'Lead Physical Design',
        tools: 'Innovus, PrimeTime, Calibre',
        techNode: '7nm',
        instanceCount: '2.5M',
        macroCount: '40',
        frequency: '2.2 GHz',
        clockCount: '5',
        metalLayers: '9M',
        challenges: 'Severe congestion near macro channels and tight setup timing on critical paths.',
        description: `• Floorplanned ${i} blocks.\n• Achieved zero DRC/LVS errors.\n• Fixed hold violations using targeted buffering.`
      });
    }
    base.skills.text = Array.from({length: 100}, (_, i) => `Skill${i}`).join(', ');
  } else if (type === 'experienced') {
    base.experience.items.push({
      id: 'exp-1',
      role: 'Senior Physical Design Engineer',
      company: 'Intel Corporation',
      description: '• Owned block-level implementation of CPU execution units at 3nm.\n• Implemented floorplanning and power grid routing.\n• Resolved routing congestion and timing closure issues.'
    }, {
      id: 'exp-2',
      role: 'Physical Design Engineer',
      company: 'AMD',
      description: '• Completed PnR flow for multiple IP blocks at 7nm.\n• Cleaned DRC and LVS checks for tapeout delivery.'
    });
    base.education.items.push({
      id: 'edu-1',
      degree: 'B.Tech Electronics & Communication',
      institution: 'NIT Trichy',
      year: '2020'
    });
    base.projects.items.push({
      id: 'proj-1',
      title: '3nm CPU Core Block PnR',
      role: 'Block Owner',
      tools: 'Innovus, PrimeTime',
      techNode: '3nm',
      description: '• Handled full block implementation with tight area and routing constraints.'
    });
    base.skills.text = 'Innovus, PrimeTime, ICC2, Calibre, Tempus, Floorplanning, CTS, Routing, STA';
  } else {
    // Normal Fresher
    base.education.items.push({
      id: 'edu-1',
      degree: 'M.Tech VLSI Design',
      institution: 'Top Tech University',
      year: '2025'
    });
    base.projects.items.push({
      id: 'proj-1',
      title: 'UART Controller Physical Design',
      role: 'Student',
      tools: 'Innovus',
      techNode: '28nm',
      description: '• Completed flow from RTL to GDSII.\n• Met all timing constraints.'
    });
    base.skills.text = 'Verilog, SystemVerilog, TCL, Python, Innovus, PrimeTime, Design Compiler';
  }

  return base;
};
