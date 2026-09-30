import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// In-Memory Project & Job Database
const projects = [
  {
    id: 'proj-101',
    name: 'riscv_32i_core_pnr',
    targetTechnology: '45nm PDK',
    status: 'Ready',
    createdAt: new Date().toISOString(),
    files: [
      { name: 'riscv_top.v', size: '45 KB', type: 'verilog' },
      { name: 'constraints.sdc', size: '12 KB', type: 'sdc' },
      { name: 'sky130_fd_sc_hd.lef', size: '1.2 MB', type: 'lef' }
    ]
  }
];

const activeJobs = new Map();

// 1. SSO Token Exchange & Provisioning
app.post('/api/v1/auth/sso-validate', (req, res) => {
  const { ssoToken } = req.body;
  if (!ssoToken) {
    return res.status(400).json({ error: 'SSO Token required' });
  }
  return res.json({
    status: 'success',
    labSessionId: 'lab-sess-' + Date.now(),
    user: { id: 'usr-sub-99', name: 'Enrolled Engineer', tier: 'Paid Premium' }
  });
});

// 2. Projects Endpoints
app.get('/api/v1/projects/list', (req, res) => {
  res.json({ projects });
});

app.post('/api/v1/projects/create', (req, res) => {
  const { name, targetTechnology } = req.body;
  const newProj = {
    id: 'proj-' + Date.now(),
    name: name || 'untitled_pnr_design',
    targetTechnology: targetTechnology || '45nm PDK',
    status: 'Created',
    createdAt: new Date().toISOString(),
    files: [
      { name: 'top_design.v', size: '15 KB', type: 'verilog' },
      { name: 'clock_constraints.sdc', size: '4 KB', type: 'sdc' }
    ]
  };
  projects.push(newProj);
  res.json({ status: 'success', project: newProj });
});

// 3. Job Execution Controller
app.post('/api/v1/jobs/start', (req, res) => {
  const { projectId, step } = req.body;
  const jobId = 'job-' + Date.now();
  
  const job = {
    jobId,
    projectId,
    step: step || 'Floorplan',
    status: 'Running',
    startTime: new Date().toISOString(),
    logs: []
  };

  activeJobs.set(jobId, job);
  res.json({ status: 'queued', jobId, message: `Job ${step} started on Linux runner.` });
});

app.post('/api/v1/jobs/:jobId/stop', (req, res) => {
  const { jobId } = req.params;
  if (activeJobs.has(jobId)) {
    const job = activeJobs.get(jobId);
    job.status = 'Aborted';
    return res.json({ status: 'success', message: `Job ${jobId} terminated.` });
  }
  res.status(404).json({ error: 'Job not found' });
});

app.get('/api/v1/jobs/:jobId/status', (req, res) => {
  const { jobId } = req.params;
  const job = activeJobs.get(jobId);
  if (job) {
    res.json(job);
  } else {
    res.json({ jobId, status: 'Completed', progress: 100 });
  }
});

// 3. Dynamic Stage-Specific Report Engine
const STAGE_REPORTS = {
  'Floorplanning': {
    summary: {
      wns: 'N/A (Pre-Place)',
      tns: '0.000 ns',
      power: '8.4 mW (Est)',
      utilization: '68.0%',
      drcViolations: '0 Violations'
    },
    timingReport: `===================================================================
                     FLOORPLANNING & POWER GRID REPORT
===================================================================
Design: riscv_32i_core | Tech: 45nm CMOS | Die Size: 110.0um x 110.0um
Core Boundary: 100.0um x 100.0um | Target Utilization: 68.0%

Macro Placement Status:
- SRAM_CACHE_A (x: 75um, y: 75um, orient: R0) -> PLACED (LEF/DEF)
- SRAM_CACHE_B (x: 305um, y: 75um, orient: MY) -> PLACED (LEF/DEF)

Power Ring & Mesh Configuration:
- VDD Ring Width: 2.0um | Spacing: 1.0um | Metal 4 & Metal 5
- VSS Ring Width: 2.0um | Spacing: 1.0um | Metal 4 & Metal 5
- IR Drop Estimate: 8.4 mV (0.76% VDD) -> PASS

I/O Pins Placed: 64 Pins (Metal 3 Pads)
Floorplan DRC Checks: 0 VIOLATIONS
===================================================================`
  },
  'Placement': {
    summary: {
      wns: '-0.045 ns (Pre-CTS)',
      tns: '-0.120 ns',
      power: '11.8 mW',
      utilization: '70.2%',
      drcViolations: '0 Violations'
    },
    timingReport: `===================================================================
                     GLOBAL & DETAILED PLACEMENT REPORT
===================================================================
Total Standard Cell Count: 4,280 Instances
Total Cell Area: 6,820.4 um² | Placement Density: 70.2%

Cell Distribution:
- Combinational Gates (NAND/NOR/INV): 3,120 cells
- Sequential Gates (Flip-Flops/Latches): 1,160 cells

Placement Congestion Summary:
- H-Congestion Max: 45.2% | V-Congestion Max: 38.6%
- Total Routing Overflow: 0.00% (NO CONGESTION HOTSPOTS)

Estimated Pre-CTS WNS: -0.045 ns | TNS: -0.120 ns
Placement Status: COMPLETED CLEAN
===================================================================`
  },
  'Clock Tree Synthesis (CTS)': {
    summary: {
      wns: '+0.005 ns (MET)',
      tns: '0.000 ns',
      power: '13.4 mW',
      utilization: '71.0%',
      drcViolations: '0 Violations'
    },
    timingReport: `===================================================================
                     CLOCK TREE SYNTHESIS (CTS) REPORT
===================================================================
Clock Root Pin: clk_in (500 MHz / 2.0ns period)
Clock Tree Depth: 6 Levels | Total Clock Buffers: 142 Instances

Clock Tree Performance Metrics:
- Target Skew: 40.0 ps | Achieved Max Skew: 38.4 ps (MET)
- Max Latency (Insertion Delay): 245.2 ps
- Min Latency (Insertion Delay): 206.8 ps
- Clock Network Power: 3.82 mW (26.9% of Total Power)

Post-CTS Timing Summary:
- Setup WNS: +0.005 ns (MET)
- Hold WNS:  +0.012 ns (MET)
Clock Tree Status: SYNTHESIZED & OPTIMIZED
===================================================================`
  },
  'Detailed Routing': {
    summary: {
      wns: '+0.015 ns (MET)',
      tns: '0.000 ns',
      power: '13.9 mW',
      utilization: '71.2%',
      drcViolations: '0 Violations'
    },
    timingReport: `===================================================================
                   GLOBAL & DETAILED ROUTING REPORT
===================================================================
Routing Layer Assignment: Metal 1 through Metal 5
Total Routed Nets: 4,512 Nets | Total Wire Length: 18,420.5 um

Layer Utilization & Track Summary:
- Metal 1 (H-Tracks): 82.4% Track Usage
- Metal 2 (V-Tracks): 76.1% Track Usage
- Metal 3 (H-Tracks): 44.8% Track Usage
- Metal 4 (V-Tracks): 28.2% Track Usage
- Via Count: 14,280 Vias (Via12: 8,400, Via23: 4,100, Via34: 1,780)

Physical Verification Check:
- DRC Open/Shorts: 0 VIOLATIONS
- Process Antenna Violations: 0 VIOLATIONS
Routing Status: ROUTED CLEAN
===================================================================`
  },
  'STA Signoff': {
    summary: {
      wns: '+0.018 ns (MET)',
      tns: '0.000 ns',
      power: '14.2 mW',
      utilization: '71.2%',
      drcViolations: '0 Violations'
    },
    timingReport: `===================================================================
                     FINAL STA SIGNOFF & GDSII REPORT
===================================================================
Design: riscv_32i_core | Corner: Fast-Fast (FF) / 1.1V / -40C
Signoff Tool Engine: PrimeTime / Tempus Signoff STA

Path Delay Analysis (Top 3 Paths):
Start Point        End Point           Slack (ns)   Status
-------------------------------------------------------------------
reg_pc_q[3]        reg_alu_res[31]     +0.018 ns    MET
reg_mem_addr[0]    data_cache[12]      +0.042 ns    MET
reg_status_flag    int_ctrl[2]         +0.089 ns    MET
-------------------------------------------------------------------
Setup Timing (WNS): +0.018 ns (MET)
Hold Timing  (WNS): +0.024 ns (MET)
Total Negative Slack (TNS): 0.000 ns

Full Chip Power Summary:
- Internal Dynamic Power:  8.94 mW
- Switching Net Power:     4.12 mW
- Leakage Power:           1.14 mW
- Total Power Consumption: 14.20 mW

Final Status: TAPEOUT READY (GDSII & DEF Generated)
===================================================================`
  }
};

app.get('/api/v1/jobs/:jobId/reports', (req, res) => {
  const step = req.query.step || 'STA Signoff';
  const report = STAGE_REPORTS[step] || STAGE_REPORTS['STA Signoff'];
  res.json(report);
});

// 4. WebSocket Streaming for Real-Time Execution Logs
wss.on('connection', (ws, req) => {
  const urlParams = new URLSearchParams(req.url.replace('/?', ''));
  const step = urlParams.get('step') || 'PnR Flow';

  ws.send(JSON.stringify({ type: 'sys', text: `[SYSTEM] Connected to EDA Linux Execution Runner Pool.` }));
  ws.send(JSON.stringify({ type: 'log', text: `[EDA-RUNNER] Spawning isolated container runner for step: ${step}...` }));

  const logSequence = [
    `[INFO] Loading technology LEF & LIB rules (45nm node)...`,
    `[INFO] Reading design netlist: riscv_top.v`,
    `[INFO] Applying SDC constraints: clock period = 2.0ns (500MHz)`,
    `[RUNNER] Executing ${step} process...`,
    `[EDA-ENGINE] Initializing core utilization @ 68.0%...`,
    `[EDA-ENGINE] Placing macro blocks & standard cell rows...`,
    `[EDA-ENGINE] Synthesizing Clock Tree (CTS) - Target Skew < 40ps...`,
    `[EDA-ENGINE] Routing power supply rails (VDD/VSS grid)...`,
    `[EDA-ENGINE] Running global and detailed routing...`,
    `[EDA-ENGINE] Running DRC / LVS layout verification...`,
    `[SUCCESS] ${step} Completed with 0 DRC violations. WNS: +0.018ns.`
  ];

  let index = 0;
  const interval = setInterval(() => {
    if (index < logSequence.length) {
      ws.send(JSON.stringify({ type: 'log', text: logSequence[index] }));
      index++;
    } else {
      ws.send(JSON.stringify({ type: 'done', text: `[SYSTEM] Job ${step} finished successfully.` }));
      clearInterval(interval);
    }
  }, 700);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Standalone Cloud PnR Lab Engine running on http://localhost:${PORT}`);
});
