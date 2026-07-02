import { createClient } from '@supabase/supabase-js';
import WebSocket from 'ws';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.SUPABASE_URL || "https://ygcvcyoynmyrplwrpisd.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY is missing. Exiting.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  global: { fetch: fetch },
  auth: { persistSession: false },
  realtime: { transport: WebSocket }
});

const TARGET_COMPANIES = [
  // EDA Companies
  { name: "Synopsys", domain: "EDA", logoColor: "#5B2C6F" },
  { name: "Cadence", domain: "EDA", logoColor: "#E74C3C" },
  { name: "Siemens EDA", domain: "EDA", logoColor: "#009999" },
  { name: "Ansys", domain: "EDA", logoColor: "#F39C12" },
  { name: "Keysight Technologies", domain: "EDA", logoColor: "#E74C3C" },
  { name: "Silvaco", domain: "EDA", logoColor: "#2980B9" },
  { name: "Primarius Technologies", domain: "EDA", logoColor: "#34495E" },
  
  // CPU, GPU & AI
  { name: "Intel", domain: "CPU/GPU/AI", logoColor: "#0068B5" },
  { name: "NVIDIA", domain: "CPU/GPU/AI", logoColor: "#76B900" },
  { name: "AMD", domain: "CPU/GPU/AI", logoColor: "#ED1C24" },
  { name: "Apple", domain: "CPU/GPU/AI", logoColor: "#555555" },
  { name: "Qualcomm", domain: "CPU/GPU/AI", logoColor: "#3253DC" },
  { name: "Broadcom", domain: "CPU/GPU/AI", logoColor: "#CC092F" },
  { name: "Marvell", domain: "CPU/GPU/AI", logoColor: "#EA1C24" },
  { name: "Arm", domain: "CPU/GPU/AI", logoColor: "#0091BD" },
  { name: "Ampere Computing", domain: "CPU/GPU/AI", logoColor: "#E63E30" },
  { name: "Tenstorrent", domain: "CPU/GPU/AI", logoColor: "#222222" },
  { name: "Cerebras Systems", domain: "CPU/GPU/AI", logoColor: "#D0333A" },
  { name: "Graphcore", domain: "CPU/GPU/AI", logoColor: "#F58220" },
  { name: "Groq", domain: "CPU/GPU/AI", logoColor: "#E84E1B" },
  { name: "SiFive", domain: "CPU/GPU/AI", logoColor: "#F9A825" },
  { name: "Esperanto Technologies", domain: "CPU/GPU/AI", logoColor: "#2E86C1" },

  // Semiconductor
  { name: "Texas Instruments", domain: "Semiconductor", logoColor: "#CC0000" },
  { name: "Micron Technology", domain: "Semiconductor", logoColor: "#0055A5" },
  { name: "Analog Devices", domain: "Semiconductor", logoColor: "#33CCCC" },
  { name: "Infineon Technologies", domain: "Semiconductor", logoColor: "#800080" },
  { name: "NXP Semiconductors", domain: "Semiconductor", logoColor: "#FFB600" },
  { name: "STMicroelectronics", domain: "Semiconductor", logoColor: "#03234B" },
  { name: "Renesas Electronics", domain: "Semiconductor", logoColor: "#2460A7" },
  { name: "onsemi", domain: "Semiconductor", logoColor: "#FF6600" },
  { name: "ROHM Semiconductor", domain: "Semiconductor", logoColor: "#00479D" },
  { name: "Microchip Technology", domain: "Semiconductor", logoColor: "#E2231A" },
  { name: "Skyworks Solutions", domain: "Semiconductor", logoColor: "#00539B" },
  { name: "Qorvo", domain: "Semiconductor", logoColor: "#0085CA" },
  { name: "Wolfspeed", domain: "Semiconductor", logoColor: "#003A70" },
  { name: "OmniVision", domain: "Semiconductor", logoColor: "#00A1DF" },
  { name: "Realtek Semiconductor", domain: "Semiconductor", logoColor: "#0055A4" },
  { name: "MediaTek", domain: "Semiconductor", logoColor: "#F37021" },
  { name: "UNISOC", domain: "Semiconductor", logoColor: "#E60012" },
  { name: "Himax Technologies", domain: "Semiconductor", logoColor: "#003E7E" },
  { name: "Novatek", domain: "Semiconductor", logoColor: "#005AAA" },

  // Foundries
  { name: "TSMC", domain: "Foundries", logoColor: "#CC0000" },
  { name: "Samsung Electronics", domain: "Foundries", logoColor: "#1428A0" },
  { name: "GlobalFoundries", domain: "Foundries", logoColor: "#F37021" },
  { name: "UMC", domain: "Foundries", logoColor: "#00A9E0" },
  { name: "SMIC", domain: "Foundries", logoColor: "#003A79" },
  { name: "Tower Semiconductor", domain: "Foundries", logoColor: "#0054A6" },
  { name: "VIS", domain: "Foundries", logoColor: "#1D2A5B" },
  { name: "PSMC", domain: "Foundries", logoColor: "#0062A8" },

  // Memory
  { name: "Micron", domain: "Memory", logoColor: "#0055A5" },
  { name: "Samsung", domain: "Memory", logoColor: "#1428A0" },
  { name: "SK hynix", domain: "Memory", logoColor: "#E60012" },
  { name: "Western Digital", domain: "Memory", logoColor: "#005A9C" },
  { name: "Kioxia", domain: "Memory", logoColor: "#0093D0" },

  // Networking Silicon
  { name: "Cisco", domain: "Networking Silicon", logoColor: "#049FD9" },
  { name: "Juniper", domain: "Networking Silicon", logoColor: "#7CB82F" },
  { name: "Credo", domain: "Networking Silicon", logoColor: "#00539B" },
  { name: "Astera Labs", domain: "Networking Silicon", logoColor: "#005EB8" },

  // Automotive Semiconductor
  { name: "Bosch", domain: "Automotive", logoColor: "#E20015" },
  { name: "Continental", domain: "Automotive", logoColor: "#FFA500" },
  { name: "Mobileye", domain: "Automotive", logoColor: "#000000" },
  { name: "Aptiv", domain: "Automotive", logoColor: "#E35205" },

  // Cloud & Hyperscaler
  { name: "Google", domain: "Hyperscalers", logoColor: "#4285F4" },
  { name: "Amazon", domain: "Hyperscalers", logoColor: "#FF9900" },
  { name: "Microsoft", domain: "Hyperscalers", logoColor: "#00A4EF" },
  { name: "Meta", domain: "Hyperscalers", logoColor: "#0668E1" },
  { name: "Tesla", domain: "Hyperscalers", logoColor: "#E31937" },
  { name: "Oracle", domain: "Hyperscalers", logoColor: "#F80000" },
  { name: "Alibaba", domain: "Hyperscalers", logoColor: "#FF6A00" },
  { name: "ByteDance", domain: "Hyperscalers", logoColor: "#3EE2D5" },

  // FPGA
  { name: "Xilinx", domain: "FPGA", logoColor: "#E21836" },
  { name: "Altera", domain: "FPGA", logoColor: "#0068B5" },
  { name: "Lattice", domain: "FPGA", logoColor: "#0068A5" },
  { name: "QuickLogic", domain: "FPGA", logoColor: "#ED1C24" },

  // Indian Semiconductor
  { name: "Tata Electronics", domain: "Indian Semi", logoColor: "#005096" },
  { name: "Tata Elxsi", domain: "Indian Semi", logoColor: "#005096" },
  { name: "Sankalp Semiconductor", domain: "Indian Semi", logoColor: "#00A1DF" },
  { name: "Saankhya Labs", domain: "Indian Semi", logoColor: "#ED1C24" },
  { name: "Signalchip", domain: "Indian Semi", logoColor: "#222222" },
  { name: "Steradian", domain: "Indian Semi", logoColor: "#F37021" },
  { name: "InCore", domain: "Indian Semi", logoColor: "#005AAA" },
  { name: "Mindgrove", domain: "Indian Semi", logoColor: "#800080" },
  { name: "MosChip", domain: "Indian Semi", logoColor: "#03234B" },
  { name: "HCLTech", domain: "Indian Semi", logoColor: "#0068B5" },
  { name: "Wipro", domain: "Indian Semi", logoColor: "#FF0000" },
  { name: "TCS", domain: "Indian Semi", logoColor: "#0000FF" },
  { name: "Tech Mahindra", domain: "Indian Semi", logoColor: "#E31837" },
  { name: "LTIMindtree", domain: "Indian Semi", logoColor: "#004B87" },
  { name: "Cyient", domain: "Indian Semi", logoColor: "#F37021" },
  { name: "Quest Global", domain: "Indian Semi", logoColor: "#132340" },
  { name: "Capgemini Engineering", domain: "Indian Semi", logoColor: "#0070AD" },
  { name: "VVDN Technologies", domain: "Indian Semi", logoColor: "#00A1DF" },

  // Startups
  { name: "Rivos", domain: "Startups", logoColor: "#222222" },
  { name: "Ventana", domain: "Startups", logoColor: "#E84E1B" },
  { name: "Lightmatter", domain: "Startups", logoColor: "#0091BD" },
  { name: "d-Matrix", domain: "Startups", logoColor: "#F58220" },
  { name: "Celestial AI", domain: "Startups", logoColor: "#6B2C91" },
  { name: "Axelera AI", domain: "Startups", logoColor: "#2980B9" },
  { name: "Mythic", domain: "Startups", logoColor: "#E74C3C" },
  { name: "Untether AI", domain: "Startups", logoColor: "#16A085" },
  { name: "EnCharge AI", domain: "Startups", logoColor: "#E67E22" },
  { name: "EdgeCortix", domain: "Startups", logoColor: "#273746" }
];

async function seedDatabase() {
  console.log(`🚀 Seeding ${TARGET_COMPANIES.length} mock jobs to Supabase to pre-populate UI...`);
  
  const mockJobs = TARGET_COMPANIES.map((company, index) => {
    const isRemote = Math.random() > 0.7;
    return {
      id: `seed-${company.name.replace(/[^a-zA-Z0-9]/g, '')}-${index}`,
      job_id: `REQ-${Math.floor(Math.random() * 10000)}`,
      company: company.name,
      domain: company.domain,
      logo_color: `linear-gradient(135deg, ${company.logoColor} 0%, #111 100%)`,
      title: "Physical Design Engineer (Placeholder)",
      experience: Math.random() > 0.8 ? "Freshers" : "Experienced",
      exp_range: Math.random() > 0.5 ? "3-5 Years" : "5-10 Years",
      location: isRemote ? "Remote" : "Bengaluru, India",
      type: isRemote ? "Remote" : "Onsite",
      skills: ["Innovus", "PrimeTime", "ICC2"],
      tools: ["Innovus", "Calibre"],
      date: new Date().toISOString().split('T')[0],
      description: `This is a pre-populated placeholder role for ${company.name}. The live scraper will automatically fetch real jobs for this company and update this record during the next 24-hour cycle.`,
      apply_url: `https://careers.${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      match_score: Math.floor(Math.random() * 15) + 80,
      source: 'seed_script',
      is_active: true
    };
  });

  const chunkSize = 20;
  for (let i = 0; i < mockJobs.length; i += chunkSize) {
    const chunk = mockJobs.slice(i, i + chunkSize);
    const { error } = await supabase
      .from('physical_design_jobs')
      .upsert(chunk, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Error pushing chunk ${Math.floor(i / chunkSize) + 1}:`, error.message);
    } else {
      console.log(`✅ Successfully pushed chunk ${Math.floor(i / chunkSize) + 1}`);
    }
  }
  
  console.log("🎉 Seeding complete.");
}

seedDatabase();
