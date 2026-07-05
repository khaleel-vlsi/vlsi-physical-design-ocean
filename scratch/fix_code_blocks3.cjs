const fs = require('fs');
const file = 'src/data/module18Data.js';
let content = fs.readFileSync(file, 'utf8');

// Parse the array
const dataStr = content.replace('export const MODULE18_CHAPTERS = ', '').replace(/;\s*$/, '');
const data = JSON.parse(dataStr);

const rep1 = `<pre class="ecoCodeBlock"><code># Resize an existing cell instance to a stronger drive strength
size_cell {u_i2c_slave/U3_ICC_cts} stdlib/BUFX8
# Use: Fix setup/transition/cap/fanout issues by upsizing a buffer

# Insert a buffer on the specified pin/net (creates a new buffer instance in the path)
insert_buffer {ck_rst_gen/U29/Y} {stdlib/BUFX2}
# Use: Fix timing (setup/hold), improve slew, isolate loads, reduce fanout

# Create a new cell instance in the design database (here: antenna diode cell)
create_cell {xlm48901/eco_diode_1} {ANTENNA5}
# Use: Add ECO cells such as diode, buffer, inverter, tie, spare gates

# Set the physical location (origin) of the new ECO cell instance
set_attribute [get_cells -all {xlm48901/eco_diode_1}] origin "2519.127 0.000"
# Use: Place the ECO cell at a chosen coordinate (manual ECO placement)

# Connect a net to a pin of the ECO cell (connect enable net to diode pin A)
connect_net {xlm48901/adc_l_enable} {xlm48901/eco_diode_1/A}
# Use: Update connectivity (net-to-pin connection) for ECO logic/fixes

## ICC place & route of the ECO cells

# Legalize placement after adding/moving ECO cells (align to rows, remove overlaps)
legalize_placement
# Use: Make placement legal before routing; required after any placement changes

# ECO routing: reroute only modified nets first (then others if needed)
route_zrt_eco -utilize_dangling_wires true -reroute modified_nets_first_then_others
# Use: Perform incremental ECO routing while preserving existing routing as much as possible
# -utilize_dangling_wires true helps reuse existing partial wires/stubs during ECO routing
</code></pre>`;

const rep2 = `<pre class="ecoCodeBlock"><code># Enable freeze silicon ECO mode (restricts changes; preserves silicon/fabric intent)
set_freeze_silicon_eco
# Use: Turn ON freeze-silicon behavior for metal-mask ECO style updates

# Report current freeze-silicon ECO status/settings
set_freeze_silicon_eco -report
# Use: Confirm whether freeze mode is enabled and what restrictions are active

# Apply ECO changes using a Verilog ECO file (eco.v)
eco_netlist -by_verilog_file {./eco.v} -preserve_routing -freeze_silicon
# Use: Implement ECO described in Verilog (add/remove gates/nets logically)
# -preserve_routing keeps existing routing as much as possible
# -freeze_silicon enforces minimal disturbance / constrained ECO behavior

# ECO route to connect modified nets, prioritizing changed nets first
route_zrt_eco -utilize_dangling_wires true -reroute modified_nets_first_then_others
# Use: Incremental routing for ECO nets with minimum impact on the rest of the design
</code></pre>`;

let replacedCount = 0;

data.forEach(ch => {
  if (ch.title.includes('1) All Metal Layer ECO')) {
    const start = '<p class="c2"># Resize an existing cell instance to a stronger drive strength</p>';
    const end = '<p class="c2"># -utilize_dangling_wires true helps reuse existing partial wires/stubs during ECO routing</p>\n<p class="c2 c18"></p>';
    const idx1 = ch.html.indexOf(start);
    const idx2 = ch.html.indexOf(end) + end.length;
    if(idx1 !== -1) {
      ch.html = ch.html.substring(0, idx1) + rep1 + ch.html.substring(idx2);
      replacedCount++;
    }
  }

  if (ch.title.includes('2) Metal Mask ECO')) {
    const start = '<p class="c2"># Enable freeze silicon ECO mode (restricts changes; preserves silicon/fabric intent)</p>';
    const end = '<p class="c2"># Use: Incremental routing for ECO nets with minimum impact on the rest of the design</p>\n<p class="c2 c18"></p>';
    const idx1 = ch.html.indexOf(start);
    const idx2 = ch.html.indexOf(end) + end.length;
    if(idx1 !== -1) {
      ch.html = ch.html.substring(0, idx1) + rep2 + ch.html.substring(idx2);
      replacedCount++;
    }
  }
});

const outputData = `export const MODULE18_CHAPTERS = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync(file, outputData, 'utf8');
console.log('Replaced count:', replacedCount);
