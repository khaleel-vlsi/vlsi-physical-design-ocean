const fs = require('fs');

const file = 'src/data/module18Data.js';
let content = fs.readFileSync(file, 'utf8');

const replacement1 = `<pre class="ecoCodeBlock"><code># Resize an existing cell instance to a stronger drive strength
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

## ICC place &amp; route of the ECO cells

# Legalize placement after adding/moving ECO cells (align to rows, remove overlaps)
legalize_placement
# Use: Make placement legal before routing; required after any placement changes

# ECO routing: reroute only modified nets first (then others if needed)
route_zrt_eco -utilize_dangling_wires true -reroute modified_nets_first_then_others
# Use: Perform incremental ECO routing while preserving existing routing as much as possible
# -utilize_dangling_wires true helps reuse existing partial wires/stubs during ECO routing
</code></pre>`.replace(/\n/g, '\\n').replace(/"/g, '\\"');


const replacement2 = `<pre class="ecoCodeBlock"><code># Enable freeze silicon ECO mode (restricts changes; preserves silicon/fabric intent)
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
</code></pre>`.replace(/\n/g, '\\n').replace(/"/g, '\\"');

// Block 1
const start1 = '<p class=\\"c2\\"># Resize an existing cell instance to a stronger drive strength<\\/p>';
const end1 = '<p class=\\"c2\\"># -utilize_dangling_wires true helps reuse existing partial wires\\/stubs during ECO routing<\\/p>\\n<p class=\\"c2 c18\\"><\\/p>';
const idx1Start = content.indexOf(start1);
const idx1End = content.indexOf(end1) + end1.length;
if(idx1Start !== -1 && idx1End > idx1Start) {
  content = content.substring(0, idx1Start) + replacement1 + content.substring(idx1End);
}

// Block 2
const start2 = '<p class=\\"c2\\"># Enable freeze silicon ECO mode (restricts changes; preserves silicon\\/fabric intent)<\\/p>';
const end2 = '<p class=\\"c2\\"># Use: Incremental routing for ECO nets with minimum impact on the rest of the design<\\/p>\\n<p class=\\"c2 c18\\"><\\/p>';
const idx2Start = content.indexOf(start2);
const idx2End = content.indexOf(end2) + end2.length;
if(idx2Start !== -1 && idx2End > idx2Start) {
  content = content.substring(0, idx2Start) + replacement2 + content.substring(idx2End);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Replaced successfully. Check positions:', idx1Start, idx2Start);
