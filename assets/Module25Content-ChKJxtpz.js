import{p as e,r as t,u as n}from"./index-NCnSfpxo.js";var r=e(n(),1),i=[{id:`ch_intro`,title:`Introduction`,html:`<pre class="commandBox"><code>STEP BY STEP PNR EXECUTION IN ICC2 TOOL

################################################################################
# ICC2 FULL STEP-BY-STEP FLOW (STUDENT FRIENDLY)
# Goal: From Netlist + Tech/Ref libs + MMMC  --&gt; Floorplan --&gt; PG --&gt; Place --&gt; CTS
#       --&gt; Route --&gt; Outputs (DEF/GDS/Netlist/SDC/SPEF)
################################################################################
</code></pre>`},{id:`ch_1`,title:`(0) BASIC SETUP (EDIT ONCE)`,html:`<pre class="commandBox"><code>############################
# (0) BASIC SETUP (EDIT ONCE)
############################
# Project folders (keep everything local / portable)
set PROJ_DIR        "."
set IN_DIR          "$PROJ_DIR/INPUT"
set LIB_DIR         "$PROJ_DIR/LIB"
set SDC_DIR         "$PROJ_DIR/SDC"
set MMMC_DIR        "$PROJ_DIR/MMMC"
set OUT_DIR         "$PROJ_DIR/OUTPUT"
set RPT_DIR         "$PROJ_DIR/REPORTS"
set SAVE_DIR        "$PROJ_DIR/SAVE"

# Create output folders (safe even if already exists)
file mkdir $OUT_DIR
file mkdir $RPT_DIR
file mkdir $SAVE_DIR

# Top module name (VERY IMPORTANT)
set TOP             "top_module_name"

# Inputs (edit filenames)
set NETLIST         "$IN_DIR/\${TOP}.v"
set SDC_FILE        "$SDC_DIR/\${TOP}.sdc"            ;# if single SDC
set MMMC_FILE       "$MMMC_DIR/view_definition.tcl"  ;# if MMMC flow
set DEF_IN          ""                               ;# optional: "$IN_DIR/\${TOP}.def"

# Tech + Reference libs (examples; replace with your libs)
# TECH FILE can be .tf (Synopsys techfile) or tech LEF flow depending on kit.
set TECH_FILE       "$LIB_DIR/tech/tech.tf"

# Reference libs (NDM) - put all your stdcell + macro NDM here
# Example: set REF_LIBS [list "$LIB_DIR/ndm/stdcell.ndm" "$LIB_DIR/ndm/macro.ndm"]
set REF_LIBS        [list \\
"$LIB_DIR/ndm/stdcell.ndm" \\
"$LIB_DIR/ndm/macro.ndm" \\
]

# Optional: if you have TLU+/QRC files for parasitics
# set TLU_MAX "$LIB_DIR/tluplus/max.tluplus"
# set TLU_MIN "$LIB_DIR/tluplus/min.tluplus"
# set MAPFILE "$LIB_DIR/tluplus/tluplus.map"
</code></pre>`},{id:`ch_2`,title:`(1) CREATE / OPEN DESIGN LIBRARY`,html:`<pre class="commandBox"><code>################################################################################
# (1) CREATE / OPEN DESIGN LIBRARY
# Theory:
# - create_lib creates ICC2 database container (like "project database").
# - -ref_libs links technology stdcell/macro NDM libraries.
################################################################################
create_lib -technology $TECH_FILE -ref_libs $REF_LIBS "\${TOP}_lib"
open_lib "\${TOP}_lib"
</code></pre>`},{id:`ch_3`,title:`(2) READ DESIGN (NETLIST) + CREATE BLOCK`,html:`<pre class="commandBox"><code>################################################################################
# (2) READ DESIGN (NETLIST) + CREATE BLOCK
# Theory:
# - read_verilog loads your synthesized netlist.
# - link_block resolves cell references using reference libs.
# - A "block" is ICC2 implementation database for your top design.
################################################################################
read_verilog $NETLIST

# Create a block if not exists, then open it
# (Some setups use "create_block" explicitly. If your flow already has block, skip.)
if { [llength [get_blocks -quiet $TOP]] == 0 } {
create_block $TOP
}
open_block $TOP

# Link the design (must be done after netlist read)
link_block
</code></pre>`},{id:`ch_4`,title:`(3) MMMC / SCENARIOS (TIMING SETUP)`,html:`<pre class="commandBox"><code>################################################################################
# (3) MMMC / SCENARIOS (TIMING SETUP)
# Theory:
# - MMMC = Multi-Mode Multi-Corner.
# - Scenarios define setup/hold analysis corners + constraints.
################################################################################
# Option A: MMMC file (recommended)
if { [file exists $MMMC_FILE] } {
source $MMMC_FILE
}

# Option B: Single SDC (basic)
# If you don’t have MMMC, at least read one SDC:
if { [file exists $SDC_FILE] } {
read_sdc $SDC_FILE
}
</code></pre>`},{id:`ch_5`,title:`(4) EARLY SANITY CHECKS (BEFORE FLOORPLAN)`,html:`<pre class="commandBox"><code>################################################################################
# (4) EARLY SANITY CHECKS (BEFORE FLOORPLAN)
# Theory:
# - Always check timing/constraints early to catch missing clocks/resets/etc.
################################################################################
check_design   &gt; "$RPT_DIR/00_check_design.rpt"
check_timing   &gt; "$RPT_DIR/00_check_timing.rpt"
report_clocks  &gt; "$RPT_DIR/00_report_clocks.rpt"

# Save snapshot
save_block -as "00_after_link"
</code></pre>`},{id:`ch_6`,title:`(5) ROUTING DIRECTION SETUP (OPTIONAL BUT COMMON)`,html:`<pre class="commandBox"><code>################################################################################
# (5) ROUTING DIRECTION SETUP (OPTIONAL BUT COMMON)
# Theory:
# - Many techs have preferred routing directions.
# - Example: M1 horizontal, M2 vertical, etc.
################################################################################
# Example (edit layers based on your tech)
# set_attribute [get_layers {M1 M3 M5 M7 M9}] routing_direction horizontal
# set_attribute [get_layers {M2 M4 M6 M8}]   routing_direction vertical

# You can report layer directions
# report_layers &gt; "$RPT_DIR/01_layers.rpt"

save_block -as "01_layers_done"
</code></pre>`},{id:`ch_7`,title:`(6) FLOORPLAN (DIE/CORE)`,html:`<pre class="commandBox"><code>################################################################################
# (6) FLOORPLAN (DIE/CORE)
# Theory:
# - Floorplan decides die size, core size, utilization, offsets.
# - Good starting core utilization: 0.60 to 0.70 (NOT 0.90 for students).
################################################################################
# Example floorplan (EDIT numbers)
# -core_utilization 0.65 means 65% area filled by standard cells target
# -core_offset sets margin from die boundary
initialize_floorplan \\
-core_utilization 0.65 \\
-core_offset {5 5 5 5} \\
-shape R

# (Optional) If you have DEF from top-level / scanDEF etc.
# if { $DEF_IN ne "" } {
#   read_def $DEF_IN
# }

save_block -as "02_floorplan_done"
</code></pre>`},{id:`ch_8`,title:`(7) PIN PLACEMENT (I/O PLANNING)`,html:`<pre class="commandBox"><code>################################################################################
# (7) PIN PLACEMENT (I/O PLANNING)
# Theory:
# - Place ports/pins on boundary.
# - Methods:
#   (1) create_pin_guide + place_pins
#   (2) place_pins with constraints
################################################################################
# Basic example:
# create_pin_guide -boundary { {x1 y1} {x2 y2} } -name IOPIN_GUIDE
# place_pins -ports [all_inputs]
# place_pins -ports [all_outputs]

# Always check pin legality
check_pin_placement &gt; "$RPT_DIR/03_check_pin_placement.rpt"

save_block -as "03_pins_done"
</code></pre>`},{id:`ch_9`,title:`(8) MACRO PLACEMENT + KEEPOUT (IF MACROS EXIST)`,html:`<pre class="commandBox"><code>################################################################################
# (8) MACRO PLACEMENT + KEEPOUT (IF MACROS EXIST)
# Theory:
# - Macros must be placed (manual/auto).
# - Keepout margins avoid stdcells too close to macros.
################################################################################
# Auto macro placement (optional)
# set_app_options -name plan.macro_place_only -value true
# create_placement -floorplan
# set_app_options -name plan.macro_place_only -value false

# Example keepout around hard macros
# create_keepout_margin &lt;macro_cell_or_inst&gt; -type hard -outer {2 2 2 2}

# Example placement blockage (soft/partial/hard)
# create_placement_blockage -type soft -boundary {{x1 y1} {x2 y2}}

save_block -as "04_macros_done"
</code></pre>`},{id:`ch_10`,title:`(9) BOUNDARY CELLS / ENDCAPS / TAPCELLS (PHYSICAL CELLS)`,html:`<pre class="commandBox"><code>################################################################################
# (9) BOUNDARY CELLS / ENDCAPS / TAPCELLS (PHYSICAL CELLS)
# Theory:
# - Boundary/endcap cells protect well edges & DRC at boundary.
# - Tapcells prevent latch-up (substrate/well tie).
################################################################################
# Example:
# compile_boundary_cells
# create_tap_cells -distance 30 -pattern stagger -prefix TAP

save_block -as "05_phys_cells_done"
</code></pre>`},{id:`ch_11`,title:`(10) POWER PLANNING (PG)`,html:`<pre class="commandBox"><code>################################################################################
# (10) POWER PLANNING (PG)
# Theory:
# - Define power/ground nets, connect them to VDD/VSS pins.
# - Build rails + mesh + straps + vias, then check connectivity/DRC.
################################################################################
# Create PG nets (edit names)
set PWR_NET "VDD"
set GND_NET "VSS"

# Create nets (safe if already exists)
if { [llength [get_nets -quiet $PWR_NET]] == 0 } { create_net $PWR_NET }
if { [llength [get_nets -quiet $GND_NET]] == 0 } { create_net $GND_NET }

# Global PG connect (connect stdcell pg pins to nets)
# (Pin names depend on library: VDD/VSS or VPWR/VGND)
connect_pg_net -net $PWR_NET [get_pins -physical_context */VDD]
connect_pg_net -net $GND_NET [get_pins -physical_context */VSS]

# Disable via creation during PG route (optional)
# set_app_options -name plan.pgroute.disable_via_creation -value true

# Stdcell rails on M1 example
# create_pg_std_cell_conn_pattern rail_pat -layers {M1} -rail_width 0.15
# set_pg_strategy M1_rails -core -pattern {{name: rail_pat}{nets: {$PWR_NET $GND_NET}}}

# PG mesh example (edit widths/pitch/offset per tech)
# create_pg_mesh_pattern m56_mesh -layers {
#   {{vertical_layer: M5}{width: 0.6}{pitch: 10.0}{offset: 2.0}}
#   {{horizontal_layer: M6}{width: 0.6}{pitch: 10.0}{offset: 2.0}}
# }
# set_pg_strategy PG_mesh -core -pattern {{name: m56_mesh}{nets: {$PWR_NET $GND_NET}}}

# Compile PG
# compile_pg -strategies {M1_rails PG_mesh}

# PG checks
# check_pg_drc         &gt; "$RPT_DIR/06_pg_drc.rpt"
# check_pg_connectivity &gt; "$RPT_DIR/06_pg_connectivity.rpt"
# check_pg_missing_vias &gt; "$RPT_DIR/06_pg_missing_vias.rpt"

save_block -as "06_pg_done"
</code></pre>`},{id:`ch_12`,title:`(11) PLACEMENT (PLACE_OPT FLOW)`,html:`<pre class="commandBox"><code>################################################################################
# (11) PLACEMENT (PLACE_OPT FLOW)
# Theory:
# - Placement puts stdcells in rows + optimizes timing/DRV gradually.
# - Typical: place_opt in steps (initial_place -&gt; initial_drc -&gt; initial_opto -&gt; final_place).
################################################################################
# Activate scenarios for placement stage (example)
# set_scenario_status -setup true -hold false [get_scenarios *setup*]

# Common useful placement app options (example)
# set_app_options -name place.coarse.continue_on_missing_scandef -value true
# set_app_options -name opt.timing.effort -value high

# Run placement optimization
# place_opt -from initial_place -to final_place

# Legalize after placement
legalize_placement

# Reconnect PG (safe habit after major steps)
connect_pg_net -net $PWR_NET [get_pins -physical_context */VDD]
connect_pg_net -net $GND_NET [get_pins -physical_context */VSS]

# Reports
report_qor         &gt; "$RPT_DIR/07_place_qor.rpt"
report_timing      &gt; "$RPT_DIR/07_place_timing.rpt"
report_congestion  &gt; "$RPT_DIR/07_place_congestion.rpt"
check_legality     &gt; "$RPT_DIR/07_place_legality.rpt"

save_block -as "07_place_done"
</code></pre>`},{id:`ch_13`,title:`(12) CTS (CLOCK TREE SYNTHESIS)`,html:`<pre class="commandBox"><code>################################################################################
# (12) CTS (CLOCK TREE SYNTHESIS)
# Theory:
# - Builds clock buffers/inverters, balances skew/latency.
# - clock_opt does CTS (build_clock) and then routes clocks (route_clock).
################################################################################
# CTS settings examples (edit to your library clock cells)
# set_clock_tree_options -target_skew 0.10 -clocks [get_clocks clk]

# Remove uncertainty if already applied earlier (optional)
# remove_clock_uncertainty [get_clocks clk]

# Apply new uncertainty (example – adjust!)
# set_clock_uncertainty 0.05 -setup [get_clocks clk]
# set_clock_uncertainty 0.015 -hold  [get_clocks clk]

# Run CTS
clock_opt -from build_clock -to route_clock

# CTS checks/reports
report_clock_timing &gt; "$RPT_DIR/08_cts_clock_timing.rpt"
report_timing       &gt; "$RPT_DIR/08_cts_timing.rpt"
check_legality      &gt; "$RPT_DIR/08_cts_legality.rpt"

save_block -as "08_cts_done"
</code></pre>`},{id:`ch_14`,title:`(13) POST-CTS OPTIMIZATION`,html:`<pre class="commandBox"><code>################################################################################
# (13) POST-CTS OPTIMIZATION
# Theory:
# - Fix hold/setup/DRV after CTS.
################################################################################
# Propagate clocks (good for accurate timing)
set_propagated_clock [all_clocks]

# Post-CTS optimization (tool will fix setup/hold/DRV)
# clock_opt -from final_opto -to final_opto

report_qor     &gt; "$RPT_DIR/09_postcts_qor.rpt"
report_timing  &gt; "$RPT_DIR/09_postcts_timing.rpt"

save_block -as "09_postcts_done"
</code></pre>`},{id:`ch_15`,title:`(14) ROUTING (GLOBAL + DETAIL)`,html:`<pre class="commandBox"><code>################################################################################
# (14) ROUTING (GLOBAL + DETAIL)
# Theory:
# - route_auto performs routing.
# - You can enable SI/crosstalk-driven routing using app options.
################################################################################
# Enable SI analysis during timing (optional)
# set_app_options -name time.si_enable_analysis -value true
# set_app_options -name route.global.timing_driven -value true
# set_app_options -name route.detail.timing_driven -value true
# set_app_options -name route.global.crosstalk_driven -value true
# set_app_options -name route.track.crosstalk_driven -value true

# Run routing
route_auto

# Route checks
check_routes  &gt; "$RPT_DIR/10_route_check_routes.rpt"
check_lvs     &gt; "$RPT_DIR/10_route_lvs.rpt"

report_congestion &gt; "$RPT_DIR/10_route_congestion.rpt"
report_timing     &gt; "$RPT_DIR/10_route_timing.rpt"

save_block -as "10_route_done"
</code></pre>`},{id:`ch_16`,title:`(15) POST-ROUTE OPTIMIZATION + EXTRACTION`,html:`<pre class="commandBox"><code>################################################################################
# (15) POST-ROUTE OPTIMIZATION + EXTRACTION
# Theory:
# - Fix remaining setup/hold/DRV after routing.
# - Extract RC and write SPEF for signoff STA (Tempus/PrimeTime).
################################################################################
# Post route optimize
# route_opt

# Extract parasitics (actual commands depend on your extraction setup)
# write_parasitics -output "$OUT_DIR/\${TOP}.spef" -format spef

save_block -as "11_postroute_done"
</code></pre>`},{id:`ch_17`,title:`(16) FINAL OUTPUTS (HANDOFF)`,html:`<pre class="commandBox"><code>################################################################################
# (16) FINAL OUTPUTS (HANDOFF)
# Theory:
# - Write final DEF/GDS/NETLIST/SDC for signoff, LVS, STA, GLS, etc.
################################################################################
# write_def     -output "$OUT_DIR/\${TOP}.def"
# write_verilog -output "$OUT_DIR/\${TOP}_pnr.v"
# write_sdc     -output "$OUT_DIR/\${TOP}_pnr.sdc"

# GDS stream-out depends on your tech mapping file (layer map)
# write_gds -output "$OUT_DIR/\${TOP}.gds" -map_file "$LIB_DIR/tech/gds.map"

# Final reports
report_qor        &gt; "$RPT_DIR/99_final_qor.rpt"
report_timing     &gt; "$RPT_DIR/99_final_timing.rpt"
report_clock_timing &gt; "$RPT_DIR/99_final_clock_timing.rpt"

# Final save
save_block -as "99_final"

puts "INFO: ICC2 FLOW COMPLETED SUCCESSFULLY"
################################################################################</code></pre>`},{id:`ch_18`,title:`(14B) POST ROUTE (POST-ROUTE SETTINGS + ROUTE_OPT ITERATIONS)`,html:`<pre class="commandBox"><code>################################################################################
# (14B) POST ROUTE (POST-ROUTE SETTINGS + ROUTE_OPT ITERATIONS)
################################################################################

# (Already from your flow)
check_lvs -open_reporting detailed -max_errors 0 &gt; LVS.rpt

#################################
# POST ROUTE: Enable SI + Driven Routing Options
#################################
set_app_options -name time.si_enable_analysis -value true
set_app_options -name route.detail.timing_driven -value true
set_app_options -name route.global.timing_driven -value true
set_app_options -name route.global.crosstalk_driven -value true
set_app_options -name route.track.crosstalk_driven -value true

#################################
# POST ROUTE: Set clock uncertainty (exactly as your screenshot)
#################################
set_clock_uncertainty [expr {2.2*0.12}] -scenarios [get_scenarios ] -setup [get_clocks clk]
set_clock_uncertainty 0.05 -scenarios [get_scenarios *setup* ] -hold [get_clocks clk]
set_clock_uncertainty 0.015 -scenarios [get_scenarios *hold* ] -hold [get_clocks clk]

#################################
# ROUTE_OPT : 1st Iteration
#################################
route_opt   #first iteration
save_block -as route_opt1

#################################
# If timing is bad then (CCD-based route_opt)
#################################
report_app_options *route**ccd**
set_app_options -name route_opt.flow.enable_ccd -value true
route_opt   #secon iteration
save_block -as route_opt2   #optimization based on design qor

#################################
# If timing is good after first iteration route_opt (run incremental detail route)
#################################
report_app_options *drc**effort*
set_app_options -name route.detail.drc_convergence_effort_level -value high
route_detail -incremental

#################################
# Checks after route_opt (exactly as screenshot)
#################################

# 1) Timing reports
report_qor
report_constraint
report_timing
analyze_design_violations

# 2) Physical reports
report_utilizatin
report_design
report_routes
check_lvs

#################################
# Proceeding for signoff (criteria notes from your screenshot)
#################################
# For setup:
#   WNS &lt; -50ps  # if your not use LVT cells in design
#   WNS &lt; -20ps  # if your use LVT in design
#   TNS &lt; -5ns
#
# For hold:
#   &lt; 80% core utilization
#   routing DRC &lt;250 and shorts &lt;20
#
# If your design qualify above requirement then proced for signoff
################################################################################


</code></pre>`}],a={moduleLayout:`_moduleLayout_n3yev_4`,topicsNav:`_topicsNav_n3yev_16`,navSectionsWrapper:`_navSectionsWrapper_n3yev_28`,navSection:`_navSection_n3yev_28`,navButtonsGrid:`_navButtonsGrid_n3yev_43`,navTitle:`_navTitle_n3yev_50`,topicNavBtn:`_topicNavBtn_n3yev_59`,seeMoreBtn:`_seeMoreBtn_n3yev_83`,mainContent:`_mainContent_n3yev_97`,contentCard:`_contentCard_n3yev_101`,h1:`_h1_n3yev_115`,h2:`_h2_n3yev_127`,h3:`_h3_n3yev_137`,paragraph:`_paragraph_n3yev_145`,chapterBody:`_chapterBody_n3yev_153`,list:`_list_n3yev_170`,imageContainer:`_imageContainer_n3yev_181`,contentImage:`_contentImage_n3yev_190`,tableContainer:`_tableContainer_n3yev_197`,contentTable:`_contentTable_n3yev_204`,divider:`_divider_n3yev_222`},o=t(),s=6,c=()=>{let[e,t]=(0,r.useState)(!1),[n,c]=(0,r.useState)(!1),[l,u]=(0,r.useState)(!1),d=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},f=e=>e.preventDefault(),p=i.slice(0,7),m=i.slice(7,15),h=i.slice(15),g=(e,t,n,r)=>(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:r}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(t?e:e.slice(0,Math.min(s,e.length))).map(e=>(0,o.jsx)(`button`,{onClick:()=>d(e.id),className:a.topicNavBtn,title:e.title,children:e.title},e.id))}),e.length>s&&(0,o.jsx)(`button`,{className:a.seeMoreBtn,onClick:()=>n(!t),children:t?`See Less`:`See More (+${e.length-s})`})]});return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:f,onContextMenu:f,onSelectStart:f,onDragStart:f,children:[(0,o.jsx)(`div`,{style:{marginBottom:`2.5rem`,textAlign:`center`},children:(0,o.jsx)(`h1`,{className:a.h1,children:`Module 25 - Step-By-Step PnR Execution in ICC2`})}),(0,o.jsx)(`section`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[g(p,e,t,`Setup & Floorplan`),g(m,n,c,`Place, CTS & Route`),g(h,l,u,`Post-Route & Handoff`)]})}),(0,o.jsx)(`main`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`article`,{id:e.id,className:a.contentCard,children:[(0,o.jsx)(`h2`,{className:a.h2,children:e.title}),(0,o.jsx)(`div`,{className:a.chapterBody,dangerouslySetInnerHTML:{__html:e.html}})]},e.id))})]})};export{c as default};