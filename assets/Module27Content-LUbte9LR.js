import{p as e,r as t,u as n}from"./index-FBBPBtxQ.js";var r=e(n(),1),i=[{id:`ch_intro`,title:`Introduction`,html:`<pre class="commandBox"><code>STEP BY STEP EXECUTION OF  PHYSICAL SYNTHESIS & PNR FLOW IN FC

project/
├─ rtl/                 (RTL files: .v)
├─ constraints/          (SDC / MCMM TCL)
├─ tech/
│   ├─ ndm/              (FC reference libs: *.ndm)
│   └─ (optional LEF/tech files if needed)
├─ scripts/
│   ├─ pg.tcl
│   ├─ cts_clock_uncertainty.tcl
│   └─ fc_flow.tcl
├─ reports/
└─ outputs/

###############################################################################
# [BLUE] FC SHELL FLOW (Beginner-Friendly + Same Commands)
# Purpose: RTL -&gt; Synthesis -&gt; Floorplan -&gt; Place -&gt; CTS -&gt; Route -&gt; Outputs
# NOTE: Commands are kept exactly as your script; only paths are made local.
###############################################################################
</code></pre>`},{id:`ch_1`,title:`1) CREATE WORK LIB`,html:`<pre class="commandBox"><code>############################
# [BLUE] 1) CREATE WORK LIB
# Theory: FC needs a design library (NDR/NDM based) to store the database.
############################
create_lib -technology ./tech/tech.tf \\
-ref_libs { \\
./tech/ndm/stdcell_rvt.ndm \\
./tech/ndm/stdcell_hvt.ndm \\
./tech/ndm/stdcell_lvt.ndm \\
./tech/ndm/io.ndm \\
} rp_top_fc.ndm

</code></pre>`},{id:`ch_2`,title:`2) READ RTL + ELABORATE`,html:`<pre class="commandBox"><code>############################
# [BLUE] 2) READ RTL + ELABORATE
# Theory: analyze reads RTL, elaborate builds hierarchy, set_top_module sets top.
############################
save_lib
analyze -autoread -recursive -top rp_top_top ./rtl
elaborate rp_top_top
set_top_module rp_top_top

</code></pre>`},{id:`ch_3`,title:`3) ROUTING DIRECTION (Optional preference)`,html:`<pre class="commandBox"><code>############################
# [BLUE] 3) ROUTING DIRECTION (Optional preference)
############################
set_attribute [get_layers {M1 M3 M5 M7 M9}] routing_direction horizontal
set_attribute [get_layers {M2 M4 M6 M8}] routing_direction vertical
get_attribute [get_layers M*] routing_direction

</code></pre>`},{id:`ch_4`,title:`4) LOAD MMMC / CONSTRAINTS`,html:`<pre class="commandBox"><code>############################
# [BLUE] 4) LOAD MMMC / CONSTRAINTS
# Theory: MMMC contains clocks, IO delays, mode/corner definitions, etc.
############################
source ./constraints/MMMC.tcl
set_svf rp_fc.svf

</code></pre>`},{id:`ch_5`,title:`5) SYNTHESIS / LOGIC OPT`,html:`<pre class="commandBox"><code>############################
# [GREEN] 5) SYNTHESIS / LOGIC OPT
############################
all_fanin -to [all_registers -clock_pins] -flat -startpoints_only
create_clock -period 2.5 [get_ports clk]

check_timing

set_input_delay  -clock clk 1.5 [get_ports [remove_from_collection [all_inputs] clk]]
set_output_delay -clock clk 1.5 [get_ports [all_outputs]]

check_timing

set_clock_uncertainty -setup 0.5   [get_clock clk]
set_clock_uncertainty -hold  0.375 [get_clock clk]

filter_collection [all_fanin  -to   [all_outputs]] "port_direction == in"
filter_collection [all_fanout -from [all_inputs ]] "port_direction == out"

create_clock -name vir -period 2.5
set_input_delay  0.875 -clock vir [get_ports {jtag_en scan_en}]
set_output_delay 0.875 -clock vir [get_ports {spi_miso jtag_tdo dmux3 dmux_0_2_out_en}]

compile_fusion -to logic_opt
report_timing
compile
report_timing

save_block -as synthesis

</code></pre>`},{id:`ch_6`,title:`6) FLOOR PLANNING`,html:`<pre class="commandBox"><code>###############################################################################
# [ORANGE] 6) FLOOR PLANNING
# Theory: Define die/core, place pins, create boundary cells, create PG nets.
###############################################################################
start_gui

initialize_floorplan -control_type die -core_utilization 0.65 -core_offset {1.4 0.9}

create_pin_guide -boundary {{257.5956 703.6150} {487.3050 683.1300}} -name inputs  [get_ports [all_inputs]]
place_pins -ports [get_ports [all_inputs]]

create_pin_guide -boundary {{679.7650 671.3350} {700.8700 495.6350}} -name outputs [get_ports [all_outputs]]
place_pins -ports [get_ports [all_outputs]]

check_pin_placement -shorts true -ports [get_ports *]

## Macro placement + keepout (your comment preserved)
get_lib_cells *BOUNDARY*
set_boundary_cell_rules -left_boundary_cell  tcbn28hpcplusbwp40p140hvt/BOUNDARY_LEFTBWP40P140 \\
-right_boundary_cell tcbn28hpcplusbwp40p140hvt/BOUNDARY_RIGHTBWP40P140
compile_boundary_cells
check_boundary_cells

create_net -power  v08
create_net -ground vss
create_port -port_type power  -direction in v08
create_port -port_type ground -direction in vss

connect_pg_net -net v08 [get_ports v08]
connect_pg_net -net vss [get_ports vss]
connect_pg_net -net v08 [get_pins -physical_context */VDD]
connect_pg_net -net vss [get_pins -physical_context */VSS]

save_block -as before_pg_script
source ./scripts/pg.tcl
check_pg_missing_vias
check_pg_drc
check_pg_connectivity
save_block -as after_pg_script

get_lib_cells *TAP*
create_tap_cells -lib_cell tcbn28hpcplusbwp40p140hvt/TAPCELLBWP40P140 -pattern stagger -distance 30 -skip_fixed_cells -no_1x
add_spare_cells -cell_name spare -lib_cell [get_lib_cells */BUFDF8D*] -num_instances 3

save_block -as floorplan
write_def floorplan.def

</code></pre>`},{id:`ch_7`,title:`7) PLACEMENT`,html:`<pre class="commandBox"><code>###############################################################################
# [PURPLE] 7) PLACEMENT
# Theory: Place cells, buffer insertion, legalization, reporting.
###############################################################################
set_scenario_status -setup true -hold false [get_scenarios *setup*]
set_lib_cell_purpose -include none [get_lib_cells */D24* */D20* */D18* */CK*]
report_app_options *missing*scan*def*
set_app_options -name place.coarse.continue_on_missing_scandef -value true

report_app_options *opt*instance*prefix*
set_app_options -name opt.common.user_instance_name_prefix -value PNR_PLACE_OPT

get_lib_cells *BUFDF8*
add_buffer -lib_cell tcbn28hpcplusbwp40p140hvt/BUFDF8BWP40P140HVT [remove_from_collection [all_inputs] [get_clocks]]
add_buffer -lib_cell tcbn28hpcplusbwp40p140hvt/BUFDF8BWP40P140HVT [remove_from_collection [all_inputs] {scan_mode jtag_tck jtag_tms jtag_tdi}]
add_buffer -lib_cell tcbn28hpcplusbwp40p140hvt/BUFDF8BWP40P140HVT [all_outputs]

set_dont_touch *eco*
magnet_placement [get_cells *eco*] -mark_fixed
set_placement_status legalize_only [get_cells *eco*]
legalize_placement

report_app_options *place*filler*size*
set_app_options -name place.rules.min_vt_filler_size -value 2
report_app_options *significant*digits*
set_app_options -name shell.common.report_default_significant_digits -value 5

save_block -as before_place_opt
compile_fusion -from initial_place -to final_opto

connect_pg_net -net v08 [get_pins -physical_context */VDD]
connect_pg_net -net vss [get_pins -physical_context */VSS]

report_timing
report_qor
report_constraints
report_constraints -all_violators
report_congestion
analyze_design_violations

save_block -as after_place_opt

</code></pre>`},{id:`ch_8`,title:`8) CTS`,html:`<pre class="commandBox"><code>###############################################################################
# [RED] 8) CTS
# Theory: Build clock tree, fix skew/latency, improve setup/hold.
###############################################################################
set_scenario_status -setup true -hold true [get_scenarios *]

set_ref_libs -add ./tech/ndm/stdcell_hvt.ndm

set_lib_cell_purpose -include cts [get_lib_cells {*/CKBD4*LVT* */CKBD6*LVT* */CKBD8*LVT* */CKBD12*LVT* */CKBD16*LVT* */CKND4*LVT* */CKND6*LVT* */CKND8*LVT* */CKND12*LVT* */CKND16*LVT*}]

create_routing_rule -multiplier_width 2 -multiplier_spacing 2 cts_2w2s
create_routing_rule -multiplier_width 1 -multiplier_spacing 2 cts_1w2s

set_clock_routing_rules -rules cts_2w2s -net_type root     -min_routing_layer M4 -max_routing_layer M7
set_clock_routing_rules -rules cts_2w2s -net_type internal -min_routing_layer M4 -max_routing_layer M7
set_clock_routing_rules -rules cts_1w2s -net_type sink     -min_routing_layer M4 -max_routing_layer M7

source ./scripts/cts_clock_uncertainty_script.tcl

report_app_options *instance*prefix*
set_app_options -name cts.common.user_instance_name_prefix -value PNR_CTS

clock_opt -from build_clock -to route_clock
set_lib_cell_purpose -include hold [get_lib_cells */*DEL*]
clock_opt -from final_opto -to final_opto

connect_pg_net -net v08 [get_pins -physical_context */VDD]
connect_pg_net -net vss [get_pins -physical_context */VSS]

report_timing
report_timing -delay_type min
report_clock_qor
report_qor
report_constraints
report_constraints -all_violators
analyze_design_violations
report_utilization
report_utilization -of_objects [get_voltage_areas]
check_clock_trees
report_clock_timing -type interclock_skew
report_global_timing

</code></pre>`},{id:`ch_9`,title:`9) ROUTING`,html:`<pre class="commandBox"><code>###############################################################################
# [TEAL] 9) ROUTING
# Theory: Global + detail routing, SI/crosstalk driven timing closure.
###############################################################################
report_app_options *si*analysis*
set_app_options -name time.si_enable_analysis -value true

report_app_options *global*timing*
set_app_options -name route.global.timing_driven -value true
report_app_options *detail*timing*
set_app_options -name route.detail.timing_driven -value true

report_app_options *crosstalk*
set_app_options -name route.global.crosstalk_driven -value true
set_app_options -name route.track.crosstalk_driven  -value true
report_app_options *route*enable*ccd*
set_app_options -name route_opt.flow.enable_ccd -value true

route_auto
route_opt

connect_pg_net -net v08 [get_pins -physical_context */VDD]
connect_pg_net -net vss [get_pins -physical_context */VSS]

check_routes
check_lvs -max_errors 0

report_qor
report_qor -summary
report_constraints

</code></pre>`},{id:`ch_10`,title:`10) FINAL FILLERS + OUTPUTS (kept commented like your script)`,html:`<pre class="commandBox"><code>###############################################################################
# [GRAY] 10) FINAL FILLERS + OUTPUTS (kept commented like your script)
###############################################################################
set_placement_spacing_label -side both -lib_cells [get_lib_cells */*BWP*] -name ALL_STD_CELLS
set_placement_spacing_rule {1 1} -labels {ALL_STD_CELLS ALL_STD_CELLS}

legalize_placement

create_stdcell_fillers -lib_cells [get_lib_cells */DCAP*]
remove_stdcell_fillers -with_violation
create_stdcell_fillers -lib_cells [get_lib_cells */FILL*]

#write_def rp_def.def
#write_gds rp_gds.gds
#write_parasitics -output rp_spef.spef
#write_verilog -hierarchy all rp_pnr.v
#write_sdc -output rp_sdc.sdc

</code></pre>`}],a={moduleLayout:`_moduleLayout_1o3nx_4`,topicsNav:`_topicsNav_1o3nx_16`,navSectionsWrapper:`_navSectionsWrapper_1o3nx_28`,navSection:`_navSection_1o3nx_28`,navButtonsGrid:`_navButtonsGrid_1o3nx_43`,navTitle:`_navTitle_1o3nx_50`,topicNavBtn:`_topicNavBtn_1o3nx_59`,seeMoreBtn:`_seeMoreBtn_1o3nx_83`,mainContent:`_mainContent_1o3nx_97`,contentCard:`_contentCard_1o3nx_101`,h1:`_h1_1o3nx_115`,h2:`_h2_1o3nx_127`,h3:`_h3_1o3nx_137`,paragraph:`_paragraph_1o3nx_145`,chapterBody:`_chapterBody_1o3nx_153`,list:`_list_1o3nx_168`,imageContainer:`_imageContainer_1o3nx_179`,contentImage:`_contentImage_1o3nx_188`,tableContainer:`_tableContainer_1o3nx_195`,contentTable:`_contentTable_1o3nx_202`,divider:`_divider_1o3nx_220`},o=t(),s=6,c=()=>{let[e,t]=(0,r.useState)(!1),[n,c]=(0,r.useState)(!1),[l,u]=(0,r.useState)(!1),d=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},f=e=>e.preventDefault(),p=i.slice(0,6),m=i.slice(6,9),h=i.slice(9),g=(e,t,n,r)=>(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:r}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(t?e:e.slice(0,Math.min(s,e.length))).map(e=>(0,o.jsx)(`button`,{onClick:()=>d(e.id),className:a.topicNavBtn,title:e.title,children:e.title},e.id))}),e.length>s&&(0,o.jsx)(`button`,{className:a.seeMoreBtn,onClick:()=>n(!t),children:t?`See Less`:`See More (+${e.length-s})`})]});return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:f,onContextMenu:f,onSelectStart:f,onDragStart:f,children:[(0,o.jsx)(`div`,{style:{marginBottom:`2.5rem`,textAlign:`center`},children:(0,o.jsx)(`h1`,{className:a.h1,children:`Module 27 - Physical Synthesis and PnR Flow in FC`})}),(0,o.jsx)(`section`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[g(p,e,t,`Setup & Synthesis`),g(m,n,c,`Floorplan, Place, CTS`),g(h,l,u,`Route & Handoff`)]})}),(0,o.jsx)(`main`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`article`,{id:e.id,className:a.contentCard,children:[(0,o.jsx)(`h2`,{className:a.h2,children:e.title}),(0,o.jsx)(`div`,{className:a.chapterBody,dangerouslySetInnerHTML:{__html:e.html}})]},e.id))})]})};export{c as default};