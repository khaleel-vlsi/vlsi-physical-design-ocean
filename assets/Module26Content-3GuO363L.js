import{p as e,r as t,u as n}from"./index-zsu2i3ao.js";var r=e(n(),1),i=[{id:`ch_intro`,title:`Introduction`,html:`<pre class="commandBox"><code>STEP BY STEP EXECUTION OF PNR IN INNOVUS TOOL

PD_Project/
├─ inputs/        (netlist, sdc, view_definition.tcl, def)
├─ libs/
│   ├─ lef/
│   ├─ lib/
│   ├─ capTable/
│   └─ qrc/
├─ DBS/           (Innovus saveDesign)
├─ LEC/           (saveNetlist)
├─ RPT/           (reports)
├─ eco/           (eco spef/netlist)
├─ finaleco/      (final outputs)
├─ STA3/          (false_path, etc.)
└─ streamOut.map

############################################################################################
# [BLUE] INNOVUS + TEMPUS MASTER FLOW (Student-Friendly)
# [BLUE] Rule: No command missing from original text.
# [BLUE] Change done: Industrial absolute paths -&gt; normal local relative paths.
############################################################################################

</code></pre>`},{id:`ch_1`,title:`0) LOAD DESIGN in INNOVUS (Basic Variables)`,html:`<pre class="commandBox"><code>############################################################################################
# [BLUE] 0) LOAD DESIGN in INNOVUS (Basic Variables)
############################################################################################
##########To Load Design file in innovus tool###########################################################################################################################
#setDistributeHost -local
#setMultiCpuUsage -localCpu 1
#set init_layout_view {}

set init_verilog ./inputs/dma_mac_m.v
set init_mmmc_file ./inputs/view_definition.tcl

</code></pre>`},{id:`ch_2`,title:`1) MMMC VIEW DEFINITION (RC corners + library sets + constraint modes + views)`,html:`<pre class="commandBox"><code>############################################################################################
# [ORANGE] 1) MMMC VIEW DEFINITION (RC corners + library sets + constraint modes + views)
# Theory:
# - RC Corner: parasitics model at temperature (cap/res factors)
# - Library Set: list of .lib timing models
# - Delay Corner: (RC + libs) combined
# - Constraint Mode: SDC set
# - Analysis View: (constraint mode + delay corner) used for setup/hold
############################################################################################

#example of view defination
create_rc_corner -name rc_max \\
-cap_table ./libs/capTable/gpdk045.extended.CapTbl \\
-T 125 \\
-qx_tech_file ./libs/qrc/qrcTechFile \\
-preRoute_res 0.95 \\
-preRoute_cap 1.09 \\
-preRoute_clkcap 1.10 \\
-postRoute_res 1.27 \\
-postRoute_cap 1.09 \\
-postRoute_clkcap 1.05 \\
-postRoute_xcap 1.03

create_rc_corner -name rc_min \\
-cap_table ./libs/capTable/gpdk045.extended.CapTbl \\
-T \\
-40 \\
-preRoute_res 1.00 \\
-preRoute_cap 1.00 \\
-postRoute_res 1.00 \\
-postRoute_cap 1.00 \\
-postRoute_xcap 1.00

create_library_set -name slow_libs \\
-timing [list ./libs/lib/slow_vdd1v0_basicCells.lib ./libs/lib/slow_vdd1v0_basicCells_lvt.lib \\
./libs/lib/slow_vdd1v0_basicCells_hvt.lib ./libs/lib/ram/RAM2P_1024x32.lib \\
./libs/lib/ram/RAM2P_128x16.lib \\
./libs/lib/ram/RAM_4096x32.lib]

create_library_set -name fast_libs \\
-timing [list ./libs/lib/fast_vdd1v0_basicCells.lib ./libs/lib/fast_vdd1v0_basicCells_lvt.lib \\
./libs/lib/fast_vdd1v0_basicCells_hvt.lib ./libs/lib/ram/RAM2P_1024x32.lib \\
./libs/lib/ram/RAM2P_128x16.lib \\
./libs/lib/ram/RAM_4096x32.lib]

create_delay_corner -name slow_max -library_set slow_libs -rc_corner rc_max
create_delay_corner -name fast_min -library_set fast_libs -rc_corner rc_min

create_constraint_mode -name setup_func_mode \\
-sdc_files [list ./inputs/rc.dma_mac_m.sdc]

create_constraint_mode -name hold_func_mode \\
-sdc_files [list ./inputs/rc.dma_mac_m.sdc]

create_analysis_view -name hold_func \\
-constraint_mode hold_func_mode \\
-delay_corner fast_min

create_analysis_view -name setup_func \\
-constraint_mode setup_func_mode \\
-delay_corner slow_max

set_analysis_view -setup [list setup_func] -hold [list hold_func]

########view defination end###########################

</code></pre>`},{id:`ch_3`,title:`2) EXTRA EXAMPLES (BCWC / OCV)  (Keep as reference)`,html:`<pre class="commandBox"><code>############################################################################################
# [ORANGE] 2) EXTRA EXAMPLES (BCWC / OCV)  (Keep as reference)
############################################################################################
#for best case wrost case:
create_delay_corner -name slow_max -library_set slow_libs -rc_corner rc_max
create_delay_corner -name fast_min -library_set fast_libs -rc_corner rc_min

#for ocv enable:
create_delay_corner -name slow_max \\
-rc_corner rc_max \\
-late_library_set slow_libs \\
-early_library_set fast_libs

create_delay_corner -name fast_min \\
-rc_corner rc_min \\
-late_library_set slow_libs \\
-early_library_set fast_libs

#any one of the above can be define in view defination file

</code></pre>`},{id:`ch_4`,title:`3) LEF + TOP + PWR/GND + INIT DESIGN`,html:`<pre class="commandBox"><code>############################################################################################
# [GREEN] 3) LEF + TOP + PWR/GND + INIT DESIGN
############################################################################################
set init_lef_file {./libs/lef/gsclib045_tech.lef ./libs/lef/gsclib045_macro.lef ./libs/lef/gsclib045_multibitsDFF.lef ./libs/lef/gsclib045_hvt_macro.lef ./libs/lef/gsclib045_lvt_macro.lef ./libs/lef/RAM2P_1024X32.lef ./libs/lef/RAM2P_128X16.lef ./libs/lef/RAM_4096X32.lef}
set init_top_cell dma_mac
set init_gnd_net dgnd
set init_pwr_net 1_Vdd

#init_design

</code></pre>`},{id:`ch_5`,title:`4) OCV DERATES (Early/Late on data/clock + cell/net) + ROUTE LAYER LIMIT`,html:`<pre class="commandBox"><code>############################################################################################
# [GREEN] 4) OCV DERATES (Early/Late on data/clock + cell/net) + ROUTE LAYER LIMIT
############################################################################################
#all_delay_corners
set_timing_derate -data -cell_delay -early -delay_corner slow_max 0.97
set_timing_derate -clock -cell_delay -early -delay_corner slow_max 0.97
set_timing_derate -data -cell_delay -late -delay_corner slow_max 1.03
set_timing_derate -clock -cell_delay -late -delay_corner slow_max 1.03
set_timing_derate -data -net_delay -early -delay_corner slow_max 0.97
set_timing_derate -clock -net_delay -early -delay_corner slow_max 0.97
set_timing_derate -data -net_delay -late -delay_corner slow_max 1.03
set_timing_derate -clock -net_delay -late -delay_corner slow_max 1.03
set_timing_derate -data -cell_delay -early -delay_corner fast_min 0.95
set_timing_derate -clock -cell_delay -early -delay_corner fast_min 0.95
set_timing_derate -data -cell_delay -late -delay_corner fast_min 1.05
set_timing_derate -clock -cell_delay -late -delay_corner fast_min 1.05
set_timing_derate -data -net_delay -early -delay_corner fast_min 0.95
set_timing_derate -clock -net_delay -early -delay_corner fast_min 0.95
set_timing_derate -data -net_delay -late -delay_corner fast_min 1.05
set_timing_derate -clock -net_delay -late -delay_corner fast_min 1.05

setMaxRouteLayer 7

#setDesignMode -process 45
#timeDesign -preplace -prefix preplace -outDir RPT
#checkDesign -all
#check_timing
#saveDesign DBS/init.enc -compress
#saveNetlist DBS/LEC/init.v.gz

</code></pre>`},{id:`ch_6`,title:`5) PROPERTIES / ATTRIBUTES QUICK COMMANDS (Reference)`,html:`<pre class="commandBox"><code>############################################################################################
# [PURPLE] 5) PROPERTIES / ATTRIBUTES QUICK COMMANDS (Reference)
############################################################################################
########################################################################################################################################################################
#this are like attributes we can set or reset or report
list_property -type cell
report_property
get_property
define_property
get_property
list_property
report_property
reset_property
set_property

</code></pre>`},{id:`ch_7`,title:`6) DBGET CHEAT-SHEET (Reference for exploring database)`,html:`<pre class="commandBox"><code>############################################################################################
# [PURPLE] 6) DBGET CHEAT-SHEET (Reference for exploring database)
############################################################################################
#some dbGet commands also there to find the property of objects#########################################################################################################
#List all unplaced instances in the design
dbGet [dbGet -p top.insts.pStatus unplaced].name
#List all placed instances in the design
dbGet [dbGet -p top.insts.pStatus placed].name
#List all fixed instances in the design
dbGet [dbGet -p top.insts.pStatus fixed].name
#List the metal layers on which the I/O pins of the block reside [i/o pins metal name]
dbGet top.terms.pins.allShapes.layer.name
#List the non default rules (NDR) in the design
dbGet head.rules.name
#List the NDRs applied on a specified net
dbGet [dbGet -p top.nets.name netName].rule.name
#List net names with specific max or min voltage
dbGet [dbGet top.nets.maxVoltage value p].name
dbGet [dbGet top.nets.minVoltage value p].name
#Get the placement status of an instance
dbGet [dbGetInstByName instName].pStatus
#To avoid splitting of a specified multibit flop, during multibit Optimization
#dbSet [dbGetInstByName &lt;flop_name&gt;].dontSplitMultibit 1
#To avoid merging of a specified multibit flop, during multibit Optimization
#dbSet [dbGetInstByName &lt;flop_name&gt;].dontMergeMultibit 1
#Get the coordinates of a rectangular routing blockage
dbGet top.fplan.rBlkgs.shapes.rect
#Get the coordinates of a rectilinear routing blockage
dbGet top.fplan.rBlkgs.shapes.poly
#List all cell types used in the design
dbGet -u top.insts.cell.name
#Note: The "-u" parameter filters out the duplicate objects.

# Get the size of block placement halos
dbGet [dbGet -p2 top.insts.cell.subClass block*].pHaloTop
dbGet [dbGet -p2 top.insts.cell.subClass block*].pHaloBot
# Explore your design with these useful single-line dbGet scripts in Innovus
dbGet [dbGet -p2 top.insts.cell.subClass block*].pHaloLeft
dbGet [dbGet -p2 top.insts.cell.subClass block*].pHaloRight

# Get the size and top/bottom layers of block routing halos
dbGet [dbGet -p2 top.insts.cell.subClass block*].rHaloSideSize
dbGet [dbGet -p2 top.insts.cell.subClass block*].rHaloBotLayer.name
dbGet [dbGet -p2 top.insts.cell.subClass block*].rHaloTopLayer.name

#Ensure all your tiehi/tielo connections have tie cells (and are not connected to a rail instead)
dbGet top.insts.instTerms.isTieHi 1
dbGet top.insts.instTerms.isTieLo 1
#The previous commands should return "0x0" if all connections have tie cells. If "1s" are returned, use the following commands to find the terms that still need a tie cell:
dbGet [dbGet -p top.insts.instTerms.isTieHi 1].name
dbGet [dbGet -p top.insts.instTerms.isTieLo 1].name

# Get all instTerm names that are tied to tieLo cells
dbGet [dbGet -p [dbGet -p2 top.insts.cell.subClass coreTieLo].instTerms.net.allTerms.isInput 1].name

#Change the routing status of a net (for example, from FIXED to ROUTED)
dbSet [dbGet -p top.nets.name netName].wires.status route

# Get the status of the design
dbGet top.statusIoPlaced
dbGet top.statusPlaced
dbGet top.statusClockSynthesized
dbGet top.statusRouted
dbGet top.statusRCExtracted
dbGet top.statusPowerAnalyzed

# List the layers used in a net
dbGet [dbGet -p top.nets.name netName].wires.layer.name

#Selecting Shield Nets of a net
dbSelectObj [dbget [dbget -p [dbGet -p top.nets.name $net].shieldNets.name GND].sWires.shieldNet.name $net -p2]
#NOTE: $net is the net for which you want to select the shield.

#Find all instances of a certain cell type
dbGet [dbGet -p2 top.insts.cell.name cellName].name

#Determine the size of a cell in the library, but not necessarily in the current design
#dbGet [dbGetCellByName cellName].size

#List the nets marked in the db as clock net
dbGet [dbGet -p top.nets.isClock 1].name
#Note: Before running the previous command, build a timing graph using the timeDesign command.

#Set all instances with a particular pattern in the name to fixed status
dbSet [dbGet p top.insts.name *clk*].pStatus fixed

#Get top and bottom routing layers for a route_type
dbGet [dbGet -p head.routeTypes.name routeTypeName].topPreferredLayer.num
dbGet [dbGet -p head.routeTypes.name routeTypeName].bottomPreferredLayer.num

#Get database units
dbGet head.dbUnits

#Get the manufacturing grid
dbGet head.mfgGrid

#Get physical only cells such as filler cell, end cap cell, and so on
dbGet [dbGet -p top.insts.isPhysOnly 1].name

#Report Dont Touch instances:
dbGet [dbGet -p top.insts.dontTouch true].name

#Report Dont Use cells in the database
dbGet [dbGet -p head.libCells.dontUse 1].name

#Report JTag elements:
dbGet [dbGet -p top.insts.isJtagElem 1].name

#Report spare instances:
dbGet [dbGet -p top.insts.isSpareGate 1].name

#Filter all PG pins with direction bidi of a specific instance
dbGet [dbGet -p [dbGet -p top.insts.name instName].pgCellTerms.inOutDir bidi].name


# Get PG pins connections of a specific instance
proc getInstPGConnect {c} {
set inst [dbget -p top.insts.name $c]
puts "PG connection of instance $c:"
foreach PGT [dbget $inst.pgCellTerms.name] {
puts "\\tPin : $PGT --&gt; Net: [dbget [dbPGTermNet [dbGetPGTermByName $inst $PGT]].name]" }
}


#Get class and subClass of a cell
dbGet [dbGetCellByName cellName].baseClass
dbGet [dbGetCellByName cellName].subClass

#Selecting all Macros/Blocks of a particular module (or Hierarchical instance)
selectInst [dbGet [dbGet top.hInst.allTreeInsts.cell.baseClass block - p2].name &lt;specify_module_name&gt; ]

#Get all the sequential cells of a particular module
#selectModule &lt;module_name&gt;
dbGet [dbGet selected.insts.cell.isSequential 1 -p2].name

#Get the instname / cellname of the driver driving a specific net
set netName netName
set inst [dbGet [dbGet -p [dbGet -p top.nets.name $netName].allTerms.isOutput 1].inst]
Puts "Net: $netName, driving inst name: [dbGet $inst.name], driving cell name: [dbGet $inst.cell.name]"

#List all layers for the pin of a cell
dbGet [dbGet - p selected.cell.terms.name pinName].pins.allShapes.layer.extName

#Report points of the polygon that forms the die area
dbShape -output polygon [dbGet top.fPlan.boxes]

#Get Verilog module ports
dbGet [ dbGet -p1 top.hInst.allTreeInsts.name $moduleInstName].hInstTerms.hTerm.name

#To query top level term pin coordinates and layer number
lindex [dbGet [dbGet top.hinst.hinstTerms.term.name &lt;pin_name&gt; - p].pins.allShapes.shapes.rect] 0
dbGet [dbGet top.hinst.hinstTerms.term.name &lt;pin_name&gt; - p].pins.allShapes.layer.num


#Query max_cap for a list of cells
cellPtrList [dbGet -p head.allCells.n ame BUF*]
foreach cellPtr $cellPtrList {puts "[dbGet $cellPtr.name] [dbFTermMaxCap [dbGet -p $cellPtr.terms.name termName] 1]"}

#Find all instances with a specify property name "myProp" (string property type) and value "xyzzy"
set inst_ptrs [dbGet -p top.insts.props {.name == "myProp" && .value == "xyzzy"]
Puts "Instances with property myProp and value xyzzy: [dbGet $inst_ptrs.name]"


#Find non-clock ports in a design
dbGet [dbGet -p [dbGet -p2 top.terms.net.isClock 0].isInput 1].name

#To get information on all tech sites in the design
dbGet head.sites.name
dbGet head.sites.size
dbIsTechSiteVDDOnBottom [dbGet head.sites.name &lt;name&gt; -p]

</code></pre>`},{id:`ch_8`,title:`7) LOAD-DESIGN SANITY NOTES (kept as comments, original text preserved)`,html:`<pre class="commandBox"><code>############################################################################################
# [PURPLE] 7) LOAD-DESIGN SANITY NOTES (kept as comments, original text preserved)
############################################################################################
#Identify and report physical only types of cells (well tap, tie hi/lo, filler, endcap/decap)
#You can query the subclass for a cell to check whether it is welltap, tiehigh, tielow or end cap:
#dbGet [dbGet -p head.libCells.subClass &lt;subClassName&gt;].name

#For example, to get names of well tap cells (specified as CLASS CORE WELLTAP  in LEF), you can use:
#dbGet [dbGet -p head.libCells.subClass coreWellTap].name

#Similarly, to get names of tie high / tie low cells:
#dbGet [dbGet -p head.libCells.subClass coreTieHigh].name
#OR
#dbGet [dbGet -p head.libCells.subClass coreTieLow].name

#To report endcap cells:
#dbGet [dbGet -p head.libCells.subclass coreEndCap*].name

#Similarly filler cells:
#dbGet [dbGet -p head.libCells.subClass coreSpacer].name

</code></pre>`},{id:`ch_9`,title:`8) METAL DIRECTION + TRACKS + MACROS + KEEPOUT + PG PINS (Original kept)`,html:`<pre class="commandBox"><code>############################################################################################
# [GREEN] 8) METAL DIRECTION + TRACKS + MACROS + KEEPOUT + PG PINS (Original kept)
############################################################################################
#To know metal direction
dbGet head.layers.direction
dbGet top.fplan.tracks.layers.name #design metal name

#To know how many macreos in design
#sizeof_collection [get_cells -hierarchical * -filter "is_black_box==true"] --&gt; gives how many macros in the design.

#To create keepout margin
addHaloToBlock 10 20 10 20 xy_inst


#To create power and ground pins
#for creating PG pins:

#left
createPGPin -geom Metal7 {0.0 134.9} {2.0 136.9} -net pwr PgPin_pwr
createPGPin -geom Metal7 {0.0 138.9} {2.0 140.9} -net pwr PgPin_gnd

#right
createPGPin -geom Metal7 {198.4 134.9} {200.4 136.9} -net pwr PgPin_pwr
createPGPin -geom Metal7 {198.4 138.9} {200.4 140.9} -net pwr PgPin_gnd

#top
createPGPin -geom Metal7 {100.2 267.9} {102.2 269.8} -net pwr PgPin_pwr
createPGPin -geom Metal7 {104.2 267.9} {106.2 269.8} -net pwr PgPin_gnd

#bottom
createPGPin -geom Metal7 {104.2 0.0} {106.2 2.0} -net pwr PgPin_pwr
createPGPin -geom Metal7 {108.2 0.0} {110.2 2.0} -net pwr PgPin_gnd


#To create power rings
ddRing -nets {gnd pwd} -type core_rings -follow core -layer {top Metal7 bottom Metal7 left Metal6 right Metal6} -width {top 1.8 bottom 1.8 left 1.8 right 1.8} -spacing {top 1.8 bottom 1.8 left 1.8 right 1.8} -offset {top 1.8 bottom 1.8 left 1.8 right 1.8} -center 0 -extend_corner {} -threshold 0 -jog_distance 0 -snap_wire_center_to_grid None

#To create power Stripes
addStripe -nets {pwd gnd} -layer Metal6 -direction vertical -width 1.8 -spacing 1.8 -set_to_set_distance 100 -start_from left -switch_layer_over_obs false -max_same_layer_jog_length 2 -padcore_ring_top_layer_limit Metal11 -padcore_ring_bottom_layer_limit Metal1 -block_ring_top_layer_limit Metal11 -block_ring_bottom_layer_limit Metal1 -use_wire_group 0 -snap_wire_center_to_grid None -skip_via_on_pin {  standardcell } -skip_via_on_wire_shape {  noshape }

addStripe -nets {pwd gnd} -layer Metal6 -direction vertical -width 1.8 -spacing 1.8 -set_to_set_distance 40 -start_from left -switch_layer_over_obs false -max_same_layer_jog_length 2 -padcore_ring_top_layer_limit Metal11 -padcore_ring_bottom_layer_limit Metal1 -block_ring_top_layer_limit Metal11 -block_ring_bottom_layer_limit Metal1 -use_wire_group 0 -snap_wire_center_to_grid None -skip_via_on_pin {  standardcell } -skip_via_on_wire_shape {  noshape }


##create placement blockage manually or coomand
#To create partial blockage
createPlaceBlockage -type soft -box {3442.3600 3739.2000 3511.6500 5716.6300} -name softBlockage2
{hard | soft | partial | macroOnly}

#then cut the rows by using  "cutRow" command
#then add endcap cells
addEndCap -prefix ENDCAP  -preCap FILL1 -postCap FILL1
#then add welltap cells
addWellTap -cell FILL1 -cellInterval 40 -prefix WELLTAP -checkerBoard
#then add spare cell
createSpareModule -moduleName Sparemodul -cell {DFFQX1 NAND2X1 BUFX4 CLKBUFX4 NOR3X1} -tie TIELO -useCellAsPrefix
placeSpareModule -moduleName Sparemodul -stepx 50 -stepy 50 -prefix SPARE

#global connection
globalNetConnect pwd -type pgpin -pin VDD
globalNetConnect gnd -type pgpin -pin VSS

#sroute
#setSrouteMode -corePinTarget none --&gt; To stop the routing upto core boundary
#sroute -nets {pwd gnd} --&gt; to do sroute

#sanity checks
#verify_drc  --&gt; To check pg drc's
#verifyPowerVia --&gt; any pg missing vias
#verifyConnectivity --&gt;To check is all net connect with pg or not
#checkFPlan --&gt; it should be clean
#checkDesign -all --&gt; it should be clean (check why warnings and errors will be)
#verifyGeometry
#checkPinAssignment" --&gt; if any illegal do "legalizePin
#checkNetlist
#report_clocks
#check_timing
#"#save design with name init.enc --&gt; "saveDesign ./DBS?init.enc


</code></pre>`},{id:`ch_10`,title:`9) PLACEMENT SECTION (Original commands preserved + paths cleaned)`,html:`<pre class="commandBox"><code>############################################################################################
# [BLUE] 9) PLACEMENT SECTION (Original commands preserved + paths cleaned)
############################################################################################
######################################################################plaement##########################################################################################
#To read def
defIn ./inputs/pico_scandef
place_opt_design -out_dir RPT -prefix place
all_constraint_modes -active
set_interactive_constraint_modes [all_constraint_modes -active]

#To set max fanout
setOptMode -fixFanoutLoad true
current_design
set_max_fanout 15 [current_design ]

#To add tie cells
addTieHiLo -cell {TIEHI TIELO}
addTieHiLo -cell "TIEHI TIELO"
addTieHiLo -cell "TIEHI" -prefix tiehi
addTieHiLo -cell "TIELO" -prefix tielo

setTieHiLoMode -maxFanout 15 -maxDistance 20 -cell {TIEHI TIELO}
globalNetConnect pwr -type tiehi
globalNetConnect gnd -type tielo

#to scan reorder
scanReorder -allowSwapping true -clkAware true

place_opt_design -out_dir RPT -prefix place
saveDesign DBS/place.enc -compress
saveNetlist DBS/LEC/place.v.gz

#To do IO buffering
attachIOBuffer -in CLKBUFX2 -excludeClockNet [this command will put in innovus shell]

#in placement stage we can enable app option by given "setPlaceMode" command and diffrence switches

#To create partial blockage
createPlaceBlockage -type soft -box {3442.3600 3739.2000 3511.6500 5716.6300} -name softBlockage2
{hard | soft | partial | macroOnly}

#cell pading
setPlaceMode -place_global_module_padding ABC 1.5 for cell padding
specifyInstPad U27316 -left 2  (or right)
or
specifyCellPad
reportInstPad
deleteInstPad
deleteAllcellPad

#TO do magnetic placement
place_connected -attractor RAM1 -level 1

#Note if you want to create bound we should go back to floor plan and create bound there only then run placement
#To create bounds
#soft bound
#The following command creates a guide for hierarchical instance MEM_DSCAN:
createGuide MEM_DSCAN 3478.8000 9012.0000 6498.0000 143087.2000
#exclusive bound
createFence SH17 100 100 4898 4898
#hard bound
createRegion SH17 100 100 4900 4900
#To delete all bounds
unplaceGuide MEM_DSCAN

#sanity checks
reportCongestion -overflow ( to see the congestion)
report_timing -path_type full_clock  for setup violation checking
timeDesign -preCts  (setup)
verifyTiecells
reportDensityMap
reportPinDensityMap
checkFPlan -reportUtil

#for DRV violations check:
report_constraint -all_violators
report_constraint -drv_violation_type max_fanout
report_constraint -drv_violation_type max_fanout -all_violators
report_clocks
#note:check log file before proceding for next stage


</code></pre>`},{id:`ch_11`,title:`10) CTS SECTION (CCOpt Properties + checks)`,html:`<pre class="commandBox"><code>############################################################################################
# [RED] 10) CTS SECTION (CCOpt Properties + checks)
############################################################################################
#################################################################CTS####################################################################################################
#we have to write cts spef file
set_ccopt_property inverter_cells {CLKINVX1 CLKINVX2 CLKINVX4 CLKINVX8 CLKINVX12 CLKINVX16 CLKINVX20}
set_ccopt_property delay_cells {DLY1X1 DLY1X4 DLY2X1 DLY2X4 DLY3X1 DLY3X4 DLY4X1 DLY4X4}
set_ccopt_property buffer_cells {CLKBUFX2 CLKBUFX4 CLKBUFX6 CLKBUFX8 CLKBUFX12 CLKBUFX16 CLKBUFX20}
set_ccopt_property target_max_trans 200ps
set_ccopt_property target_skew 100ps
set_ccopt_property target_max_capacitance 1000
set_ccopt_property -max_fanout 15
set_ccopt_property merge_clock_logic true
set_ccopt_property merge_clock_gates true

#then we have to create NDR rule for cts routing
#after we have to update cts run script

#sanity checks
report_timing
report_clock_timing -type skew/latency
timeDesign -postCTS
reportCongestion -overflow
reportDensityMap
reportPinDensityMap
checkFPlan -reportUtil
#note:check log file before proceding for next stage


</code></pre>`},{id:`ch_12`,title:`11) POST-CTS OPT`,html:`<pre class="commandBox"><code>############################################################################################
# [RED] 11) POST-CTS OPT
############################################################################################
####################################################################Post CTS############################################################################################
set_clock_latency -source -early -min -rise 0.2 [get_ports $x] -clock $x
all_constraint_modes -active
set_interactive_constraint_modes [all_constraint_modes -active]
set_propagated_clock [all_clocks ]
optDesign -postCTS -setup -drv -hold -outDir RPT -prefix postcts_hold

#sanity_check
report_clock_timing -type summary
report_clock_timing -type skew/latency
timeDesign -postCTS -drvReports
timeDesign -postCTS -hold
timeDesign -postCTS -setup
report_ccopt_clock_trees  (for reporting slew is have or not)
report_ccopt_clock_trees -file clock_trees.rpt  (saves the report)
report_ccopt_skew_groups  (it checks skew present or not)
report_ccopt_skew_groups -file skew_groups.rpt (save the report)
reportCongestion -overflow
reportDensityMap
reportPinDensityMap
checkFPlan -reportUtil


</code></pre>`},{id:`ch_13`,title:`12) ROUTING + POST ROUTE OPT`,html:`<pre class="commandBox"><code>############################################################################################
# [TEAL] 12) ROUTING + POST ROUTE OPT
############################################################################################
##################################################################Routing###############################################################################################
setAnalysisMode -analysisType bcwc -cppr both --&gt; with derate values
all_constraint_modes -active
setDelayCalMode -siAware true -engine aae
routeDesign
setExtractRCMode -engine postRoute -effortLevel low

#sanity checks
report_clock_timing -type summary
report_clock_timing -type skew/latency
timeDesign -postRoute -drvReports
timeDesign -postRoute -hold
timeDesign -postRoute -setup
checkFPlan -reportUtil
verifyConnectivity
verify_drc


##################################################################Post Route###########################################################################################s
setDelayCalMode -siAware false
optDesign -postRoute -setup -hold -drv -outDir RPT -prefix postroute

#sanity checks
report_clock_timing -type summary
report_clock_timing -type skew/latency
timeDesign -postRoute -drvReports
timeDesign -postRoute -hold
timeDesign -postRoute -setup
checkFPlan -reportUtil
verifyConnectivity
verify_drc


</code></pre>`},{id:`ch_14`,title:`13) PRE-MASK / POST-MASK ECO COMMANDS (Functional ECO)`,html:`<pre class="commandBox"><code>############################################################################################
# [PURPLE] 13) PRE-MASK / POST-MASK ECO COMMANDS (Functional ECO)
############################################################################################
##################################################################Pre and Post mask#####################################################################################
#we call its functional eco to add extra logic to netlist there are two types pre and post
#pre mask means we can change the base layers also mostly after post route we did
#pre mask fixes
#they will be provided netlist based on we can write pre mask commands
#add required nets with unic name
addNet eco_1_net
addNet eco_2_net
addNet eco_3_net
addNet eco_4_net

#addcells with cell name and give the unic instance name by user
addInst -cell AND2XL -inst g1eco1

attachTerm g1eco1 A eco_3_net
attachTerm g1eco1 B n_4876
attachTerm g1eco1 Y eco_4_net

#already have cell( MXI2XL g183885) we cut the connection and make new connctions
detachTerm g183885 A n_4876
attachTerm g183885 A eco_4_net

addInst -cell NAND2XL -inst g12eco2
attachTerm g12eco2 Y eco_1_net
attachTerm g12eco2 A n_4878
attachTerm g12eco2 B n_4881

addInst -cell DFFQX1 -inst picorv32_core_mem_do_rinst_reg_1
attachTerm  picorv32_core_mem_do_rinst_reg_1 CK wb_clk_i
attachTerm  picorv32_core_mem_do_rinst_reg_1 D eco_2_net
attachTerm  picorv32_core_mem_do_rinst_reg_1 Q eco_3_net

addInst -cell INVXL -inst g13eco3
attachTerm g13eco3 A eco_1_net
attachTerm g13eco3 Y eco_2_net

#after this do ecoPlace and ecoRoute verify_drc verify_connectivity verifyGeometry if all are clean then cells are placed perfectly
#then save design saveDesign DBS/pico_pre_mask_competed.enc


#post mask do  after signoff  when base layer is fabricated time by using spare cells and metal layer
addNet PMecoNet1_1
addNet PMecoNet1
addNet PMecoNet2

attachTerm SPARE_spr_14/NAND2X1_spr_gate4 A FE_DBTN17_picorv32_core_cpu_state_5
attachTerm SPARE_spr_14/NAND2X1_spr_gate4 B n_4870
attachTerm SPARE_spr_14/NAND2X1_spr_gate4 Y PMecoNet1_1

attachTerm SPARE_spr_15/NAND2X1_spr_gate4 A PMecoNet1_1
attachTerm SPARE_spr_15/NAND2X1_spr_gate4 B PMecoNet1_1
attachTerm SPARE_spr_15/NAND2X1_spr_gate4 Y PMecoNet1

detachTerm g183805 B FE_OFN480_FE_DBTN17_picorv32_core_cpu_state_5
attachTerm g183805 B PMecoNet1

attachTerm SPARE_spr_8/NAND2X1_spr_gate4 A n_4874
attachTerm SPARE_spr_8/NAND2X1_spr_gate4 B n_4874
attachTerm SPARE_spr_8/NAND2X1_spr_gate4 Y PMecoNet2

detachTerm picorv32_core_mem_do_rdata_reg D n_4879
attachTerm picorv32_core_mem_do_rdata_reg D PMecoNet2


</code></pre>`},{id:`ch_15`,title:`14) SAVE POST-ROUTE DB + NETLIST + SPEF (Paths cleaned)`,html:`<pre class="commandBox"><code>############################################################################################
# [GREEN] 14) SAVE POST-ROUTE DB + NETLIST + SPEF (Paths cleaned)
############################################################################################
##################################################################Save Post route database#############################################################################
addFiller -cell FILL1 -prefix FILLER
setExtractRCMode -engine postRoute -effortLevel low -coupled true
extractRC

rcOut -rc_corner rc_max -spef ./eco/dma_tso_setup_rc_max_ite20.spef
rcOut -rc_corner rc_min -spef ./eco/dma_tso_setup_rc_min_ite20.spef

saveNetlist -excludeLeafCell ./eco/dma_tso_setup_netlist_ite20.v
deleteFiller -prefix FILLER
saveDesign DBS/dma_tso_setup_ite20.enc
#after saving data base move to tempus


</code></pre>`},{id:`ch_16`,title:`15) TEMPUS FLOW (Paths cleaned, commands preserved)`,html:`<pre class="commandBox"><code>############################################################################################
# [BLUE] 15) TEMPUS FLOW (Paths cleaned, commands preserved)
############################################################################################
##################################################################Tempus flow###########################################################################################
read_view_definition ./inputs/view_definition.tcl

read_verilog  ./eco/dma_tso_setup_netlist_ite20.v

set_top_module dma_mac -ignore_undefined_cell

read_spef -rc_corner rc_max  ./eco/dma_tso_setup_rc_max_ite20.spef
read_spef -rc_corner rc_min  ./eco/dma_tso_setup_rc_min_ite20.spef

report_annotated_parasitics

set_dont_use [get_lib_cells *LVT*] false
set_dont_use [get_lib_cells *HVT*] false

set_interactive_constraint_modes [all_constraint_modes -active]

set_propagated_clock [all_clocks ]

#derates apply with 10%
set_timing_derate -delay_corner slow_max -early 0.90 -late 1.10
set_timing_derate -delay_corner fast_min -early 0.90 -late 1.10

#cppr enable
setAnalysisMode -analysisType bcwc -cppr both
#set_analysis_mode -analysisType onChipVariation -cppr both

#To enable crosstalk
set_delay_cal_mode -SIAware true
set_si_mode -enable_overshoot_undershoot_glitch true

update_timing
report_noise -failure -overshoot_undershoot -txtfile overshoot_undershoot.txt

set_si_mode -enable_glitch_propagation true

#for delta delay
set_si_mode -separate_delta_delay_on_data true
set_si_mode -delta_delay_annotation_mode lumpedOnNet

update_glitch
report_noise -txtfile glitch.txt

set_global report_timing_format {instance arc cell net delay  slew incr_delay arrival required fanout retime_incr_delay power_domain}

report_clocks
report_clock_timing -type skew

group_path -name reg2reg -from [all_registers] -to [all_registers]
group_path -name in2reg -from [all_inputs] -to [all_registers]
group_path -name reg2out -from [all_registers] -to [all_outputs]
group_path -name in2out -from [all_inputs ] -to [all_outputs]

# -------------or--------------------------
createBasicPathGroups -expanded

source ./STA3/false_path

</code></pre>`},{id:`ch_17`,title:`16) MANUAL FIX GUIDES (kept as-is, student notes)`,html:`<pre class="commandBox"><code>############################################################################################
# [PURPLE] 16) MANUAL FIX GUIDES (kept as-is, student notes)
############################################################################################
#order for fixing violations
#first fanout then max tran , max cap then setup, recovery  and hold removel ,data to data, clock gating  then noise or SI

#####################################################################To Fix manually Max Fanout ##################################################################################
#there is no command for fanout fixing then go with manually
addInst -cell BUFX4 -inst abc
addNet n1
attachTerm abc Y n1
attachTerm abc A wb_rst_i
get_lib_cells *BUF* FOR (showing buffers in lib)
detachTerm g135086 A wb_rst_i
attachTerm g135086 A n1

##################################################################### To Fix Max CAP and TRAN ############################################################################
report_constraint -all_violators  -drv_violation_type max_transition &gt; drv.rpt
changecell -inst name -upsize or down size  (for removing max_trans violation and using this command we can change cell also)
add_repeators -cell CLKBUFX2 -term -term picorv32_core_cpuregs_reg_2_16/SI (in terms give the pin name)

##################################################################### To Fix SETUP and RECOVERY#################################################################################
report_timing -from [all_registers ] -to [all_registers ] -path_type full_clock -max_paths 10000 -max_slack 0 &gt; all_setup.rpt
#for showing path base analysis (pba):
report_timing -retime_mode  exhaustive -retime path_slew_propagation
#check cppr is enable or not and si also
change_cell -inst inst_name -upsize (upsizing the cell command in tempus)
change_cell -inst inst_name -cell cell_name (vt swapping command in tempus)
add_repeater -term term_name -cell BUFX2 (adding buffer in tempus)

###################################################################### To FixHold and Removel##################################################################################
report_timing -from [all_registers ] -to [all_registers ] -path_type full_clock -max_paths 10000 -max_slack 0 -early &gt; all_hold.rpt
#for showing path base analysis (pba):
report_timing -retime_mode  exhaustive -retime path_slew_propagation  -early
#go with bottle neck concept to fix hold
add_repeater -term term_name -cell DLYX2 (adding delay cell to D pin)

###################################################################### To Fix Noise or SI ################################################################################
change_cell -inst inst_name -upsize (upsizing the cell command in tempus)
change_cell -inst inst_name -cell cell_name (vt swapping command in tempus)
add_repeater -term term_name -cell BUFX2

#for shielding: in innovus
setAttribute -net FE_PHN2189_picorv32_core_n_33736 -shield_net dgnd (shield for two side)
globalDetailRoute
reportShield
setAttribute -net FE_OFN110_n_1106 -shield_side one_side -shield_net gnd (for shielding one side)

</code></pre>`},{id:`ch_18`,title:`17) TSO AUTO FIX NOTES (kept)`,html:`<pre class="commandBox"><code>############################################################################################
# [PURPLE] 17) TSO AUTO FIX NOTES (kept)
############################################################################################
#note dont fix all violation at atime fix few violation and then write_eco -formate innovus -output eco.tcl then run in innovus then do ecoPlace and ecoRoute again save the data base its a cycle process untill all violation are fixing
#we can go with auto matic vioalation fixing for that we need TSO liecence's
#initialize with tempus -tso then load data and then fallow below steps

#for drv fix
set_eco_opt_mode -save_eco_opt_db my_db_drv_1
write_eco_opt_db
set_eco_opt_mode -load_eco_opt_db my_db_drv_1
eco_opt_design -drv

#for fixing setup
set_eco_opt_mode -save_eco_opt_db my_db_setup_1
write_eco_opt_db
set_eco_opt_mode -load_eco_opt_db my_db_setup_1
eco_opt_design -setup

#for fixing hold
set_eco_opt_mode -save_eco_opt_db my_db_hold_1
write_eco_opt_db
set_eco_opt_mode -load_eco_opt_db my_db_hold_1
eco_opt_design -hold

</code></pre>`},{id:`ch_19`,title:`18) ANTENNA FIX + METAL FILL (kept)`,html:`<pre class="commandBox"><code>############################################################################################
# [RED] 18) ANTENNA FIX + METAL FILL (kept)
############################################################################################
######################################################################### To Fix antenna violation:######################################################################
#antenna fixing in innovus
#antenna violation fixing:
verifyProcessAntenna
get_lib_cells */BUF* -take one buffer and go to design browser take instance of that
get_lib_cells */ANTENNA*
attachDiode -diodeCell ANTENNA -pin FE_PDC3278_n_3237 A -prefix antenna_diode

########################################################################## TO Add Metal Fill #############################################################################
## For adding decap cells:
addDeCapCellCandidates DECAP2 5
addDeCapCellCandidates DECAP3 8
addDeCapCellCandidates DECAP4 10
addDeCapCellCandidates DECAP5 12

addDeCap -totCap 1000 -cells DECAP2 DECAP3 DECAP4 DECAP5 -prefix DECAPCELL

## For adding filler :
addFiller -cell FILL1 -prefix FILLER

setMetalFill -layer METAL1 -windowSize 200 200 -windowStep 100 100
addMetalFill -net {gnd} -layer {1 2 3 4 5 6 7}
addMetalFill -timingAware sta  -net {gnd} -layer {1 2 3 4 5 6 7}

setMetalFill -layer {METAL2 METAL3 METAL4 METAL5 METAL6 METAL7} -iterationName step1 -gapSpacing 0.140 -minWidth 0.08 -decrement 0.050 -minLength 2 -maxWidth 5 -maxLength 20 -activeSpacing 0.8  -windowSize 50 50 -windowStep 25 25 -minDensity 15  -maxDensity 80 -preferredDensity 35 -diagOffset 1 1

setMetalFill -layer {METAL1} -iterationName step1 -gapSpacing 0.140 -minWidth 0.06 -decrement 0.050 -minLength 2 -maxWidth 5 -maxLength 20 -activeSpacing 0.8  -windowSize 50 50 -windowStep 25 25 -minDensity 15  -maxDensity 80 -preferredDensity 35 -diagOffset 1 1

#fordeleting metal fills
deleteMetalFill

# note: after adding metal fill check the timing in tempus if any timing violations are there again fix them with spare cells


###########################
#after all fixes we have to do sanity checks
checkFPlan -reportUtil
verifyConnectivity
verify_drc
verifyGeometry
verifyProcessAntenna


</code></pre>`},{id:`ch_20`,title:`19) SAVING FINAL REPORTS / OUTPUTS (kept, paths made local)`,html:`<pre class="commandBox"><code>############################################################################################
# [GREEN] 19) SAVING FINAL REPORTS / OUTPUTS (kept, paths made local)
############################################################################################
########################################################## saving final reports####################################################################################

saveNetlist -excludeLeafCell ./finaleco/pico.v

extractRC

rcOut -rc_corner rc_cbest -spef ./finaleco/pico_rc_cbest.spef
rcOut -rc_corner rc_cworst -spef ./finaleco/pico_rc_cworst.spef

saveNetlist -includePowerGround ./finaleco/pico_power.v

saveNetlist -includePhysicalCell {DECAP2 DECAP3 DECAP4 DECAP5} ./finaleco/physicalcells.v

defOut ./finaleco/pico_scandef

write_sdf -max_view func_max -min_view func_min -recompute_parallel_arcs ./finaleco/pico.sdf --&gt; in tempus we can write sdf File For gate level simulation (gls)

setStreamOutMode -virtualConnection false

streamOut dmamac.gds -mapFile streamOut.map -libName DesignLib -units 2000 -mode ALL



</code></pre>`}],a={moduleLayout:`_moduleLayout_1fjif_4`,topicsNav:`_topicsNav_1fjif_16`,navSectionsWrapper:`_navSectionsWrapper_1fjif_28`,navSection:`_navSection_1fjif_28`,navButtonsGrid:`_navButtonsGrid_1fjif_43`,navTitle:`_navTitle_1fjif_50`,topicNavBtn:`_topicNavBtn_1fjif_59`,seeMoreBtn:`_seeMoreBtn_1fjif_83`,mainContent:`_mainContent_1fjif_97`,contentCard:`_contentCard_1fjif_101`,h1:`_h1_1fjif_115`,h2:`_h2_1fjif_127`,h3:`_h3_1fjif_137`,paragraph:`_paragraph_1fjif_145`,chapterBody:`_chapterBody_1fjif_153`,list:`_list_1fjif_168`,imageContainer:`_imageContainer_1fjif_179`,contentImage:`_contentImage_1fjif_188`,tableContainer:`_tableContainer_1fjif_195`,contentTable:`_contentTable_1fjif_202`,divider:`_divider_1fjif_220`},o=t(),s=6,c=()=>{let[e,t]=(0,r.useState)(!1),[n,c]=(0,r.useState)(!1),[l,u]=(0,r.useState)(!1),d=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},f=e=>e.preventDefault(),p=i.slice(0,8),m=i.slice(8,15),h=i.slice(15),g=(e,t,n,r)=>(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:r}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(t?e:e.slice(0,Math.min(s,e.length))).map(e=>(0,o.jsx)(`button`,{onClick:()=>d(e.id),className:a.topicNavBtn,title:e.title,children:e.title},e.id))}),e.length>s&&(0,o.jsx)(`button`,{className:a.seeMoreBtn,onClick:()=>n(!t),children:t?`See Less`:`See More (+${e.length-s})`})]});return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:f,onContextMenu:f,onSelectStart:f,onDragStart:f,children:[(0,o.jsx)(`div`,{style:{marginBottom:`2.5rem`,textAlign:`center`},children:(0,o.jsx)(`h1`,{className:a.h1,children:`Module 26 - Step-By-Step Execution of PnR in Innovus`})}),(0,o.jsx)(`section`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[g(p,e,t,`Setup & Init`),g(m,n,c,`Place, CTS & Route`),g(h,l,u,`Tempus & Fixes`)]})}),(0,o.jsx)(`main`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`article`,{id:e.id,className:a.contentCard,children:[(0,o.jsx)(`h2`,{className:a.h2,children:e.title}),(0,o.jsx)(`div`,{className:a.chapterBody,dangerouslySetInnerHTML:{__html:e.html}})]},e.id))})]})};export{c as default};