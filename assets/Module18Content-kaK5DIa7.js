import{f as e,l as t,r as n}from"./index-Znu_fck2.js";var r=e(t(),1),i=[{id:`ch_0_eco_engineering_change_order_complete_le`,title:`ECO (Engineering Change Order) – Complete Lecture-Style Explanation`,html:``},{id:`ch_1_what_is_eco_`,title:`What is ECO?`,html:`<p class="c5">Engineering Change Order (ECO) in VLSI is the practice of introducing logic directly into the gate-level netlist and layout corresponding to a change that happens in the RTL. This is done due to design mistakes, bug fixes, or a change request from the customer.</p>
<p class="c5">ECO in VLSI is used to accommodate last-minute design revisions. ECO is widely used in the industry since it saves money, time, and mask cost. When we talk about ECOs in VLSI, we are referring to ECOs in the layout (Physical Design ECO).</p>
<p class="c5">So, on the gate-level netlist, you usually start with an ECO. Before passing it to the layout, the designer must:</p>
<ul class="c6 lst-kix_pw0n18h6zi3b-0 start"><li class="c5 c11 li-bullet-0">Alter the gate-level netlist<br /></li><li class="c5 c11 li-bullet-0">Make identical changes in RTL<br /></li><li class="c5 c11 li-bullet-0">Pass all formal and functional verification<br /></li></ul>
<p class="c5">Before you start changing your layout, make sure the ECO in VLSI physical design passes formal equivalence checking (LEC) and functional verification.</p>
<hr>
<p class="c2 c18"></p>`},{id:`ch_9_flow_of_eco_in_vlsi`,title:`Flow of ECO in VLSI`,html:`<p class="c5">The tapeout is the final stage of the physical design process. It provides great mental relief to the whole project team. Tapeout refers to the process of transferring a clean layout file in the form of GDSII/OASIS to the foundry for fabrication after passing all of the foundry’s tests.</p>
<p class="c5">However, before tapeout, there are several signoffs:</p>
<ul class="c6 lst-kix_get5yfxqchwq-0 start"><li class="c5 c11 li-bullet-0">Physical Signoff (DRC, LVS, Antenna, Density, etc.)<br /></li><li class="c5 c11 li-bullet-0">Timing Signoff (STA)<br /></li><li class="c5 c11 li-bullet-0">Power &amp; IR Signoff<br /></li></ul>
<p class="c5">The ECO phase comes into role when most of these are closed but some final issues remain. Compared to a full-chip respin, ECO is preferred because it saves:</p>
<ul class="c6 lst-kix_a42papw8ri8s-0 start"><li class="c5 c11 li-bullet-0">Time<br /></li><li class="c5 c11 li-bullet-0">Cost<br /></li><li class="c5 c11 li-bullet-0">Mask re-generation effort<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_17_the_eco_phase_in_vlsi`,title:`The ECO Phase in VLSI`,html:`<p class="c5">ECO in VLSI refers to the phase of the physical design stage when engineers seal all of the signoff checks that were left open during the PnR stage.</p>
<p class="c5">Typically:</p>
<ul class="c6 lst-kix_klkuixo8404a-0 start"><li class="c5 c11 li-bullet-0">Timing, DRC, and IR are mostly closable in PnR<br /></li><li class="c5 c11 li-bullet-0">Final fine-tuning is done in ECO<br /></li></ul>
<p class="c5">Before entering ECO stage, engineers must have:</p>
<ul class="c6 lst-kix_fvyrysevo5vf-0 start"><li class="c5 c11 li-bullet-0">Stable timing reports<br /></li><li class="c5 c11 li-bullet-0">Clean DRC/LVS except a few known issues<br /></li><li class="c5 c11 li-bullet-0">Confidence that all open issues can be fixed via ECO<br /></li></ul>
<p class="c5">During ECO, engineers:</p>
<ul class="c6 lst-kix_sge4e810bfu-0 start"><li class="c5 c11 li-bullet-0">Analyze each open issue<br /></li><li class="c5 c11 li-bullet-0">Generate ECO files<br /></li><li class="c5 c11 li-bullet-0">Apply ECO changes in PnR tool<br /></li><li class="c5 c11 li-bullet-0">Re-run signoff checks<br /></li><li class="c5 c11 li-bullet-0">Iterate until closure<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_27_the_eco_cycle_and_its_functionality`,title:`The ECO Cycle and its Functionality`,html:`<p class="c5">Engineers perform analysis for each open issue using signoff tools such as:</p>
<ul class="c6 lst-kix_ukqczvyg4v8n-0 start"><li class="c5 c11 li-bullet-0">PrimeTime (Timing)<br /></li><li class="c5 c11 li-bullet-0">Calibre/ICV (DRC/LVS)<br /></li><li class="c5 c11 li-bullet-0">RedHawk/Voltus (IR Drop)<br /></li></ul>
<p class="c5">For each issue:</p>
<ol class="c6 lst-kix_miffzax588g5-0 start" start="1"><li class="c5 c11 li-bullet-0">They analyze the root cause<br /></li><li class="c5 c11 li-bullet-0">Create an ECO file describing the fix<br /></li><li class="c5 c11 li-bullet-0">Apply the ECO in PnR database<br /></li><li class="c5 c11 li-bullet-0">Save the updated database<br /></li><li class="c5 c11 li-bullet-0">Move to the next issue<br /></li></ol>
<p class="c5">This cycle repeats until all violations are closed.</p>
<hr>
<p class="c2 c18"></p>`},{id:`ch_35_unconstrained_eco_all_layer_eco`,title:`Unconstrained ECO / All Layer ECO`,html:`<p class="c5">An All-Layer ECO is typically done before mask generation. There is no restriction on layout changes.</p>
<p class="c5">You need a robust ECO flow before tapeout. ECOs can be done at:</p>
<ul class="c6 lst-kix_ujo6icei795j-0 start"><li class="c5 c11 li-bullet-0">Post-Placement<br /></li><li class="c5 c11 li-bullet-0">Post-CTS<br /></li><li class="c5 c11 li-bullet-0">Post-Route<br /></li></ul>
<h3 class="c4" id="h.9qzbleb9oi2i">ECOs are used to:</h3>
<h3 class="c4" id="h.486l4cb2chj0">1. Fix Timing Violations</h3>
<p class="c5">There may be constraints that were missed on specific nets. An ECO can:</p>
<ul class="c6 lst-kix_hrtwbh7pe3o-0 start"><li class="c5 c11 li-bullet-0">Add buffers<br /></li><li class="c5 c11 li-bullet-0">Add delays<br /></li><li class="c5 c11 li-bullet-0">Resize gates<br /></li><li class="c5 c11 li-bullet-0">Modify routing<br /> to control timing behavior.<br /></li></ul>
<h3 class="c4" id="h.gy93n2rbrpca">2. Fixing Bugs</h3>
<p class="c5">Last-minute bugs are common. If a bug can be fixed via ECO, engineers prefer it rather than:</p>
<ul class="c6 lst-kix_rcfbiwmqgpmr-0 start"><li class="c5 c11 li-bullet-0">Re-running full synthesis<br /></li><li class="c5 c11 li-bullet-0">Re-running full PnR<br /></li></ul>
<p class="c5">This is especially true for large designs with long runtimes.</p>
<h3 class="c4" id="h.s239968pxufv">3. Adding Functionality</h3>
<p class="c5">Not very common post-signoff, but small feature additions can be done using ECO rather than redoing the design.</p>
<hr>
<p class="c2 c18"></p>`},{id:`ch_51_stages_of_unconstrained_eco`,title:`Stages of Unconstrained ECO`,html:`<h3 class="c4" id="h.fx14dcaau58a">1. Adding/Deleting Cells</h3>
<ul class="c6 lst-kix_1gawdrt4o4qm-0 start"><li class="c5 c11 li-bullet-0">No restriction on adding cells except design/layout constraints<br /></li><li class="c5 c11 li-bullet-0">Typical cells added:<br /></li></ul>
<ul class="c6 lst-kix_1gawdrt4o4qm-1 start"><li class="c5 c13 li-bullet-0">Buffers<br /></li><li class="c5 c13 li-bullet-0">Inverters<br /></li><li class="c5 c13 li-bullet-0">NAND/NOR gates<br /></li><li class="c5 c13 li-bullet-0">Tie-high / Tie-low cells<br /></li><li class="c5 c13 li-bullet-0">Decap cells<br /></li></ul>
<h3 class="c4" id="h.bjyco42z9w9">2. Updating the Connections</h3>
<ul class="c6 lst-kix_m0aqtplzf2yq-0 start"><li class="c5 c11 li-bullet-0">Update net connections for:<br /></li></ul>
<ul class="c6 lst-kix_m0aqtplzf2yq-1 start"><li class="c5 c13 li-bullet-0">Existing cells<br /></li><li class="c5 c13 li-bullet-0">Newly added cells<br /></li></ul>
<h3 class="c4" id="h.dtqkjpikj052">3. Placement</h3>
<p class="c5">Tools can automatically place ECO instances, but:<br /> 👉 Best practice: Manual placement is preferred for critical paths.</p>
<h3 class="c4" id="h.r0em2prudiz3">4. Routing</h3>
<p class="c5">Modern tools can:</p>
<ul class="c6 lst-kix_stv7gscaxgqb-0 start"><li class="c5 c11 li-bullet-0">Automatically identify changed nets<br /></li><li class="c5 c11 li-bullet-0">Re-route only modified portions<br /></li><li class="c5 c11 li-bullet-0">Preserve existing routing as much as possible<br /></li></ul>
<p class="c5">Even though unconstrained ECO is usually done before tapeout, it can also be done after tapeout. There is no mask cost saving in that case, but the design cycle is shorter if changes are minimal.</p>
<hr>
<p class="c2 c18"></p>`},{id:`ch_66_additional_important_points_you_should_i`,title:`Additional Important Points (You Should Include in Notes / Interviews) ✅`,html:``},{id:`ch_67_types_of_eco_in_vlsi`,title:`Types of ECO in VLSI`,html:`<h3 class="c4" id="h.9j6bdpfo2g0x">1. Functional ECO</h3>
<ul class="c6 lst-kix_8lh19ikqhegp-0 start"><li class="c5 c11 li-bullet-0">Changes logic functionality<br /></li><li class="c5 c11 li-bullet-0">Usually requires RTL update + formal verification<br /></li></ul>
<h3 class="c4" id="h.vh8iq5x3llr9">2. Timing ECO</h3>
<ul class="c6 lst-kix_hn2razj8rwmv-0 start"><li class="c5 c11 li-bullet-0">No functional change<br /></li><li class="c5 c11 li-bullet-0">Only timing optimization (buffers, resizing, etc.)<br /></li></ul>
<h3 class="c4" id="h.os02dkzg9yz">3. Metal-Only ECO (Constrained ECO)</h3>
<ul class="c6 lst-kix_m9gw5kf1xe4t-0 start"><li class="c5 c11 li-bullet-0">Changes only metal layers<br /></li><li class="c5 c11 li-bullet-0">No new cells added<br /></li><li class="c5 c11 li-bullet-0">Used after mask generation (cheaper fix)<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_76_eco_file_formats`,title:`ECO File Formats`,html:`<p class="c5">Common ECO representations:</p>
<ul class="c6 lst-kix_2uua7wnekh08-0 start"><li class="c5 c11 li-bullet-0">ECO Netlist<br /></li><li class="c5 c11 li-bullet-0">ECO DEF<br /></li><li class="c5 c11 li-bullet-0">ECO TCL script<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_82_eco_best_practices`,title:`ECO Best Practices`,html:`<ul class="c6 lst-kix_9tt8m1ykxgab-0 start"><li class="c5 c11 li-bullet-0">Always update RTL along with gate-level ECO<br /></li><li class="c5 c11 li-bullet-0">Run Formal Verification after ECO<br /></li><li class="c5 c11 li-bullet-0">Minimize number of added cells<br /></li><li class="c5 c11 li-bullet-0">Prefer buffer insertion over major logic changes<br /></li><li class="c5 c11 li-bullet-0">Keep changes local<br /></li><li class="c5 c11 li-bullet-0">Avoid disturbing already closed timing paths<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_86_when_is_eco_not_recommended_`,title:`When is ECO NOT recommended?`,html:`<p class="c5">ECO should not be used when:</p>
<ul class="c6 lst-kix_8rdlwgwc41kt-0 start"><li class="c5 c11 li-bullet-0">Many logic changes are required<br /></li><li class="c5 c11 li-bullet-0">Major architectural change is needed<br /></li><li class="c5 c11 li-bullet-0">More than ~5–10% of design is affected<br /></li></ul>
<p class="c5">In such cases, full re-spin is better.</p>
<p class="c2 c18"></p>
<p class="c2 c18"></p>
<p class="c2"><img alt="" src="/assets/modules/module18/image9.png" title="" class="native-img"></p>
<p class="c2 c18"></p>`},{id:`ch_94_example_scripts_for_ic_compiler_icc_icc2`,title:`Example Scripts for IC Compiler (ICC/ICC2) ECO`,html:`<p class="c5">ECOs can be done either:</p>
<ol class="c6 lst-kix_9s1k35sfh1ba-0 start" start="1"><li class="c5 c11 li-bullet-0">Using database commands (directly editing the PnR database), or<br /></li><li class="c5 c11 li-bullet-0">Using a modified netlist (often called an ECO netlist)<br /></li></ol>
<p class="c5">Because ECO modifies the database, always save your clean baseline design database before starting ECO, so you can roll back if needed.</p>
<hr>
<p class="c2 c18"></p>`},{id:`ch_100_1_all_metal_layer_eco_using_database_com`,title:`1) All Metal Layer ECO using Database Commands`,html:`<h3 class="c4" id="h.354ff3caqh4o">ECO Commands (with short comments)</h3>
<pre class="ecoCodeBlock"><code># Resize an existing cell instance to a stronger drive strength
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
</code></pre>
<p class="c5">Key Notes (added):</p>
<ul class="c6 lst-kix_c90hfxjgrue4-0 start"><li class="c5 c11 li-bullet-0">This flow is often called unconstrained/all-layer ECO because placement and routing changes are allowed.<br /></li><li class="c5 c11 li-bullet-0">Good practice: after routing, run incremental DRC + timing (especially HOLD).<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_140_2_metal_mask_eco_using_verilog_freeze_si`,title:`2) Metal Mask ECO using Verilog (Freeze Silicon ECO)`,html:`<p class="c5">A metal mask ECO is typically done when you want to limit the change impact. You can control freeze-silicon mode using set_freeze_silicon_eco.</p>
<h3 class="c4" id="h.bl4eyfuhq3uj">Commands (with short comments)</h3>
<pre class="ecoCodeBlock"><code># Enable freeze silicon ECO mode (restricts changes; preserves silicon/fabric intent)
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
</code></pre>
<p class="c5">Key Notes (added):</p>
<ul class="c6 lst-kix_v87gydxmcux-0 start"><li class="c5 c11 li-bullet-0">Freeze-silicon ECO is used to minimize physical changes and reduce risk near tapeout.<br /></li><li class="c5 c11 li-bullet-0">Typical checks after this:<br /></li></ul>
<ul class="c6 lst-kix_v87gydxmcux-1 start"><li class="c5 c13 li-bullet-0">report_timing (focus on HOLD)<br /></li><li class="c5 c13 li-bullet-0">incremental DRC<br /></li><li class="c5 c13 li-bullet-0">LVS impact check (if required by flow)</li></ul>
<p class="c2 c18"></p>
<p class="c2 c18"></p>
<p class="c2 c18"></p>
<p class="c2 c18"></p>`},{id:`ch_168_physical_verification_enhanced_notes_`,title:`PHYSICAL VERIFICATION (Enhanced Notes)`,html:`<p class="c5">After routing, your layout is complete. Now a number of checks are performed to verify that the drawn layout works as intended.</p>`},{id:`ch_170_physical_verification_includes_three_maj`,title:`Physical Verification includes three major checks`,html:`<ol class="c6 lst-kix_qw8ilsvi3pzu-0 start" start="1"><li class="c5 c11 li-bullet-0">DRC (Design Rule Check)<br /></li><li class="c5 c11 li-bullet-0">LVS (Layout vs Schematic)<br /></li><li class="c5 c11 li-bullet-0">Antenna &amp; ERC (Electrical Rule Check)<br /> (Along with Formal/Equivalence Checking and Timing Analysis)<br /></li></ol>
<hr>
<p class="c2 c18"></p>`},{id:`ch_174_1_drc_design_rule_check_enhanced_points`,title:`1. DRC (Design Rule Check) — Enhanced Points`,html:`<p class="c5">DRC checks determine if the layout satisfies a set of rules required for manufacturing. These rules come from the foundry PDK (process design kit).</p>
<h3 class="c4" id="h.tqfxivomri9w">Additional Important Points to Add:</h3>
<p class="c5">✅ Purpose of DRC</p>
<ul class="c6 lst-kix_iguj3t42vjmg-0 start"><li class="c5 c11 li-bullet-0">Ensures manufacturability of the chip<br /></li><li class="c5 c11 li-bullet-0">Prevents yield loss due to fabrication issues<br /></li><li class="c5 c11 li-bullet-0">Avoids short circuits and opens in silicon<br /></li><li class="c5 c11 li-bullet-0">Ensures correct lithography and etching compatibility<br /></li></ul>
<p class="c5">✅ Common DRC Checks include:</p>
<ul class="c6 lst-kix_24gsgke44mqw-0 start"><li class="c5 c11 li-bullet-0">Minimum metal width violation<br /></li><li class="c5 c11 li-bullet-0">Minimum metal spacing violation<br /></li><li class="c5 c11 li-bullet-0">Minimum via size and spacing<br /></li><li class="c5 c11 li-bullet-0">Via enclosure rules<br /></li><li class="c5 c11 li-bullet-0">Metal density rules (dummy fill requirement)<br /></li><li class="c5 c11 li-bullet-0">Slotting rules for wide metal<br /></li><li class="c5 c11 li-bullet-0">Layer-to-layer spacing violations<br /></li><li class="c5 c11 li-bullet-0">End-of-line spacing rules<br /></li><li class="c5 c11 li-bullet-0">Corner rounding issues in advanced nodes<br /><img alt="" src="/assets/modules/module18/image8.png" title="" class="native-img"><br /><br /><img alt="" src="/assets/modules/module18/image2.png" title="" class="native-img"><br /><br /><img alt="" src="/assets/modules/module18/image7.png" title="" class="native-img"><br /><br /><img alt="" src="/assets/modules/module18/image4.png" title="" class="native-img"><br /></li></ul>
<p class="c5 c18"></p>
<p class="c5">✅ DRC Signoff Importance</p>
<ul class="c6 lst-kix_p6no4520g53d-0 start"><li class="c5 c11 li-bullet-0">DRC must be 100% clean before tapeout<br /></li><li class="c5 c11 li-bullet-0">Even one critical DRC violation can cause chip failure<br /></li><li class="c5 c11 li-bullet-0">DRC is performed using tools like:<br /></li></ul>
<ul class="c6 lst-kix_p6no4520g53d-1 start"><li class="c5 c13 li-bullet-0">Calibre (Siemens)<br /></li><li class="c5 c13 li-bullet-0">Hercules (Synopsys)<br /></li><li class="c5 c13 li-bullet-0">Assura (Cadence)<br /></li></ul>
<p class="c5">✅ GDSII as Input</p>
<ul class="c6 lst-kix_i31xzzh08y3a-0 start"><li class="c5 c11 li-bullet-0">DRC tools take GDSII/OASIS as input<br /></li><li class="c5 c11 li-bullet-0">They compare layout geometries against foundry rules<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_189_2_lvs_layout_vs_schematic_enhanced_point`,title:`2. LVS (Layout vs Schematic) — Enhanced Points`,html:`<p class="c5">LVS verifies that the physical layout matches the intended circuit connectivity.</p>
<h3 class="c4" id="h.4vlbcfvfujil">Additional Important LVS Points:</h3>
<p class="c5">✅ Main Objectives of LVS</p>
<ul class="c6 lst-kix_va0s54bcygz9-0 start"><li class="c5 c11 li-bullet-0">Ensures that layout matches the schematic/netlist<br /></li><li class="c5 c11 li-bullet-0">Confirms that all transistors and connections are correct<br /></li><li class="c5 c11 li-bullet-0">Detects unintended shorts or opens<br /></li><li class="c5 c11 li-bullet-0">Ensures functional correctness at the physical level<br /></li></ul>
<p class="c5">✅ How LVS Works</p>
<ul class="c6 lst-kix_p7hxzuyjst7i-0 start"><li class="c5 c11 li-bullet-0">Tool extracts a layout netlist from GDS<br /></li><li class="c5 c11 li-bullet-0">Compares it with schematic or post-layout netlist<br /></li><li class="c5 c11 li-bullet-0">Reports mismatches if any<br /></li></ul>
<p class="c5">✅ Common LVS Errors (Expanded)</p>
<ul class="c6 lst-kix_qe45xoeagyr6-0 start"><li class="c5 c11 li-bullet-0">Shorts: Two different nets wrongly connected<br /><br /><img alt="" src="/assets/modules/module18/image6.png" title="" class="native-img"></li><li class="c5 c11 li-bullet-0">Opens: Missing connections in a net<br /></li><li class="c5 c11 li-bullet-0">Device mismatch:<br /></li></ul>
<ul class="c6 lst-kix_qe45xoeagyr6-1 start"><li class="c5 c13 li-bullet-0">Different transistor sizes<br /></li><li class="c5 c13 li-bullet-0">Wrong gate type (NAND vs NOR etc.)<br /></li></ul>
<ul class="c6 lst-kix_qe45xoeagyr6-0"><li class="c5 c11 li-bullet-0">Pin mismatch: Missing or incorrect pin connections<br /></li><li class="c5 c11 li-bullet-0">Parameter mismatch:<br /></li></ul>
<ul class="c6 lst-kix_qe45xoeagyr6-1 start"><li class="c5 c13 li-bullet-0">Resistor value mismatch<br /></li><li class="c5 c13 li-bullet-0">Capacitor value mismatch<br /></li><li class="c5 c13 li-bullet-0">Incorrect transistor W/L ratio<br /></li></ul>
<p class="c5">✅ LVS &amp; Formal Verification Difference</p>
<ul class="c6 lst-kix_oplsht3dwjgo-0 start"><li class="c5 c11 li-bullet-0">Formal verification → compares pre-layout vs post-layout netlist<br /></li><li class="c5 c11 li-bullet-0">LVS → compares layout vs netlist (physical correctness)<br /></li></ul>
<p class="c5">✅ LVS must be 100% clean before tapeout<br /><br /><img alt="" src="/assets/modules/module18/image3.png" title="" class="native-img"></p>
<hr>
<p class="c2 c18"></p>`},{id:`ch_206_3_antenna_effect_enhanced_explanation_po`,title:`3. Antenna Effect — Enhanced Explanation & Points`,html:`<p class="c5">Antenna effect (also called Plasma Induced Gate Oxide Damage) occurs during fabrication, especially during plasma etching.<br /><br /><img alt="" src="/assets/modules/module18/image10.png" title="" class="native-img"></p>
<h3 class="c4" id="h.80vh8owyi9rm">Why Antenna Effect Occurs</h3>
<ul class="c6 lst-kix_kcer40e55z1m-0 start"><li class="c5 c11 li-bullet-0">Large metal wires collect charge during etching<br /></li><li class="c5 c11 li-bullet-0">This charge can discharge through the thin gate oxide<br /></li><li class="c5 c11 li-bullet-0">This may damage or degrade the MOS gate oxide<br /></li></ul>
<h3 class="c4" id="h.r67zippw6j8o">Additional Important Points:</h3>
<p class="c5">✅ Effects of Antenna Violation</p>
<ul class="c6 lst-kix_yuu89vwr4lyl-0 start"><li class="c5 c11 li-bullet-0">Gate oxide breakdown<br /></li><li class="c5 c11 li-bullet-0">Increased gate leakage<br /></li><li class="c5 c11 li-bullet-0">Shift in threshold voltage (Vth)<br /></li><li class="c5 c11 li-bullet-0">Reduced device reliability and lifetime<br /></li></ul>
<p class="c5">✅ Antenna Rule</p>
<ul class="c6 lst-kix_l9tsm49cjgyd-0 start"><li class="c5 c11 li-bullet-0">Foundry defines a maximum allowable antenna ratio<br /></li><li class="c5 c11 li-bullet-0">Antenna Ratio = (Metal Area Connected to Gate) / (Gate Area)<br /></li><li class="c5 c11 li-bullet-0">If exceeded → Antenna Violation<br /></li></ul>
<h3 class="c4" id="h.v43kcff4lnm6">Antenna Fixes (Expanded)</h3>
<ol class="c6 lst-kix_qyta2pxiwnv9-0 start" start="1"><li class="c5 c11 li-bullet-0">Metal Jumper Insertion<br /></li></ol>
<ul class="c6 lst-kix_qyta2pxiwnv9-1 start"><li class="c5 c13 li-bullet-0">Break long metal segments<br /></li><li class="c5 c13 li-bullet-0">Route using upper metal layers<br /></li></ul>
<ol class="c6 lst-kix_qyta2pxiwnv9-0" start="2"><li class="c5 c11 li-bullet-0">Antenna Diode Insertion<br /></li></ol>
<ul class="c6 lst-kix_qyta2pxiwnv9-1 start"><li class="c5 c13 li-bullet-0">Connect a reverse-biased diode near the gate<br /></li><li class="c5 c13 li-bullet-0">Provides a discharge path for excess charge<br /></li></ul>
<ol class="c6 lst-kix_qyta2pxiwnv9-0" start="3"><li class="c5 c11 li-bullet-0">Routing Strategy Change<br /></li></ol>
<ul class="c6 lst-kix_qyta2pxiwnv9-1 start"><li class="c5 c13 li-bullet-0">Avoid long metal segments connected directly to gate<br /></li></ul>
<ol class="c6 lst-kix_qyta2pxiwnv9-0" start="4"><li class="c5 c11 li-bullet-0">Buffer Insertion<br /></li></ol>
<ul class="c6 lst-kix_qyta2pxiwnv9-1 start"><li class="c5 c13 li-bullet-0">Break large metal areas into smaller segments<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_226_4_erc_electrical_rule_check_enhanced_poi`,title:`4. ERC (Electrical Rule Check) — Enhanced Points`,html:`<p class="c5">ERC ensures that all electrical connections in the design are safe and valid.</p>
<h3 class="c4" id="h.rnkr5huh23v5">Important ERC Checks</h3>
<p class="c5">✅ Floating Gate Check</p>
<ul class="c6 lst-kix_hutduergeuqa-0 start"><li class="c5 c11 li-bullet-0">If a transistor gate is unconnected → dangerous<br /></li><li class="c5 c11 li-bullet-0">Can cause leakage and unpredictable behavior<br /></li></ul>
<p class="c5">✅ Power/Ground Connection Check</p>
<ul class="c6 lst-kix_e9dfuljw4027-0 start"><li class="c5 c11 li-bullet-0">Every NWELL must connect to VDD<br /></li><li class="c5 c11 li-bullet-0">Every PSUB must connect to VSS<br /></li><li class="c5 c11 li-bullet-0">Missing power tie → ERC violation<br /></li></ul>
<p class="c5">✅ Shorted Power Rails</p>
<ul class="c6 lst-kix_xexdx0bmr1se-0 start"><li class="c5 c11 li-bullet-0">VDD shorted to VSS → catastrophic failure<br /></li></ul>
<p class="c5">✅ Unconnected Pins</p>
<ul class="c6 lst-kix_pyr4mcv62fv9-0 start"><li class="c5 c11 li-bullet-0">Input/output pins without proper geometry flagged<br /></li></ul>
<p class="c5">✅ Latch-up Prevention</p>
<ul class="c6 lst-kix_h1ko59y06l9r-0 start"><li class="c5 c11 li-bullet-0">Ensures proper well-tap placement<br /></li><li class="c5 c11 li-bullet-0">Checks for proper substrate and well connections<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_242_5_equivalence_checking_extra_important_p`,title:`5. Equivalence Checking (Extra Important Point to Add)`,html:`<ul class="c6 lst-kix_xef2f1pqhzut-0 start"><li class="c5 c11 li-bullet-0">Compares pre-layout netlist vs post-layout netlist<br /></li><li class="c5 c11 li-bullet-0">Ensures functionality is unchanged after PnR<br /></li><li class="c5 c11 li-bullet-0">Tools used:<br /></li></ul>
<ul class="c6 lst-kix_xef2f1pqhzut-1 start"><li class="c5 c13 li-bullet-0">Synopsys Formality<br /></li><li class="c5 c13 li-bullet-0">Cadence Conformal<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_247_6_timing_analysis_extra_important_point_`,title:`6. Timing Analysis (Extra Important Point to Add)`,html:`<p class="c5">After LVS/DRC clean:</p>
<ul class="c6 lst-kix_jmo57ci9xjeo-0 start"><li class="c5 c11 li-bullet-0">Perform STA with extracted parasitics (SPEF)<br /></li><li class="c5 c11 li-bullet-0">Check:<br /></li></ul>
<ul class="c6 lst-kix_jmo57ci9xjeo-1 start"><li class="c5 c13 li-bullet-0">Setup timing<br /></li><li class="c5 c13 li-bullet-0">Hold timing<br /></li><li class="c5 c13 li-bullet-0">Clock skew<br /></li><li class="c5 c13 li-bullet-0">Transition violations<br /></li><li class="c5 c13 li-bullet-0">Maximum capacitance violations<br /></li></ul>
<hr>
<p class="c2 c18"></p>`},{id:`ch_253_final_summary_for_your_notes_`,title:`Final Summary (For Your Notes)`,html:`<table class="c27"><tbody><tr class="c24"><td class="c9" colspan="1" rowspan="1"><p class="c21">Check</p></td><td class="c10" colspan="1" rowspan="1"><p class="c21">Purpose</p></td></tr><tr class="c24"><td class="c9" colspan="1" rowspan="1"><p class="c2">DRC</p></td><td class="c10" colspan="1" rowspan="1"><p class="c2">Manufacturability of layout</p></td></tr><tr class="c24"><td class="c9" colspan="1" rowspan="1"><p class="c2">LVS</p></td><td class="c10" colspan="1" rowspan="1"><p class="c2">Functional correctness of layout</p></td></tr><tr class="c24"><td class="c9" colspan="1" rowspan="1"><p class="c2">Antenna</p></td><td class="c10" colspan="1" rowspan="1"><p class="c2">Prevent gate oxide damage</p></td></tr><tr class="c24"><td class="c9" colspan="1" rowspan="1"><p class="c2">ERC</p></td><td class="c10" colspan="1" rowspan="1"><p class="c2">Electrical safety of design</p></td></tr><tr class="c24"><td class="c9" colspan="1" rowspan="1"><p class="c2">Formal</p></td><td class="c10" colspan="1" rowspan="1"><p class="c2">Logical equivalence</p></td></tr><tr class="c24"><td class="c9" colspan="1" rowspan="1"><p class="c2">STA</p></td><td class="c10" colspan="1" rowspan="1"><p class="c2">Timing correctness</p></td></tr></tbody></table>
<p class="c2 c18"></p>
<p class="c2 c18"></p>
<p class="c2 c18"></p>`}],a={moduleLayout:`_moduleLayout_1gsui_4`,header:`_header_1gsui_20`,title:`_title_1gsui_22`,subtitle:`_subtitle_1gsui_33`,topicsNav:`_topicsNav_1gsui_41`,navSectionsWrapper:`_navSectionsWrapper_1gsui_54`,slideDown:`_slideDown_1gsui_1`,navSection:`_navSection_1gsui_54`,navTitle:`_navTitle_1gsui_64`,navButtonsGrid:`_navButtonsGrid_1gsui_74`,topicNavBtn:`_topicNavBtn_1gsui_76`,toggleWrapper:`_toggleWrapper_1gsui_101`,toggleBtn:`_toggleBtn_1gsui_103`,toggleIcon:`_toggleIcon_1gsui_129`,toggleCount:`_toggleCount_1gsui_131`,mainContent:`_mainContent_1gsui_140`,contentCard:`_contentCard_1gsui_142`,chapterTitle:`_chapterTitle_1gsui_156`,chapterBody:`_chapterBody_1gsui_167`},o=n(),s=6,c=()=>{let[e,t]=(0,r.useState)(!1),[n,c]=(0,r.useState)(!1),[l,u]=(0,r.useState)(!1),d=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},f=e=>e.preventDefault(),p=i.slice(0,12),m=i.slice(12,15),h=i.slice(15),g=(e,t,n,r)=>(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:r}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(t?e:e.slice(0,Math.min(s,e.length))).map(e=>(0,o.jsx)(`button`,{onClick:()=>d(e.id),className:a.topicNavBtn,title:e.title,children:e.title},e.id))}),e.length>s&&(0,o.jsx)(`div`,{className:a.toggleWrapper,children:(0,o.jsx)(`button`,{className:a.toggleBtn,onClick:()=>n(!t),children:t?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▲`}),` See Less`]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▼`}),` See More `,(0,o.jsxs)(`span`,{className:a.toggleCount,children:[`+`,e.length-s]})]})})})]});return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:f,onContextMenu:f,onSelectStart:f,onDragStart:f,children:[(0,o.jsxs)(`div`,{className:a.header,children:[(0,o.jsx)(`h1`,{className:a.title,children:`Module 18 - PV and Signoff`}),(0,o.jsx)(`p`,{className:a.subtitle,children:`Engineering Change Order (ECO) workflows, script implementations for ICC2, and comprehensive Physical Verification including DRC, LVS, Antenna, and ERC checks.`})]}),(0,o.jsx)(`section`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[g(p,e,t,`ECO Fundamentals`),g(m,n,c,`ECO Scripts`),g(h,l,u,`Physical Verification`)]})}),(0,o.jsx)(`main`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`article`,{id:e.id,className:a.contentCard,children:[(0,o.jsx)(`h2`,{className:a.chapterTitle,children:e.title}),(0,o.jsx)(`div`,{className:a.chapterBody,dangerouslySetInnerHTML:{__html:e.html}})]},e.id))})]})};export{c as default};