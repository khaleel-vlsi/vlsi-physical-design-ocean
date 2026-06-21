import{f as e,l as t,r as n}from"./index-Gzl8Ab92.js";var r=e(t(),1),i=[{id:`fc_script_1`,part:1,toolName:`FC Tool`,index:1,title:`Count the Number of Used Library Cells in a Design`,objective:`<span >This script reports the count of each library cell that is actually instantiated in the current design. Unused library cells are automatically ignored.</span>`,code:`foreach_in_collection lib_cell [get_lib_cells] {
set cell_count [sizeof_collection \\
[get_cells -physical_context \\
-filter "ref_name == [get_attribute $lib_cell name]"]]
if {$cell_count > 0} {
puts "[get_object_name $lib_cell] : Count = $cell_count"
}
}`,explanations:[{step:`Line 1`,code:`foreach_in_collection lib_cell [get_lib_cells]`,explanation:`<ul class="list-disc pl-5 my-2"><li>get_lib_cells\xA0returns all library (master) cells available in the loaded technology library.</li><li>foreach_in_collection\xA0iterates through each library cell one by one.</li></ul>`},{step:`Line 2`,code:`set cell_count [sizeof_collection ...]`,explanation:`<ul class="list-disc pl-5 my-2"><li>get_attribute $lib_cell name\xA0gets the current library cell name.</li><li>get_cells -physical_context\xA0retrieves all cell instances from the physical database.</li><li>ref_name\xA0compares each instance's reference library cell with the current library cell.</li><li>sizeof_collection\xA0counts the matching instances.</li></ul>`},{step:`Line 3`,code:`if {$cell_count > 0}`,explanation:`<p class="my-1"><span >Checks whether the library cell is used in the design. If the count is zero, it is skipped.</span></p>`},{step:`Line 4`,code:`puts "[get_object_name $lib_cell] : Count = $cell_count"`,explanation:`<p class="my-1"><span >Prints the library cell name and its usage count.</span></p><p class="my-1"><span >Example Output</span></p><p class="my-1"><span >BUF_X1   : Count = 45</span></p><p class="my-1"><span >INV_X2   : Count = 120</span></p><p class="my-1"><span >DFF_X1   : Count = 350</span></p>`}],flow:[`Get Library Cells`,`Read One Library Cell`,`Find Matching Design Instances`,`Count Instances`,`Count > 0 ?`,`Print Result`],why:[`Uses optimized database filtering.`,`Avoids nested loops.`,`Faster for large SoC designs.`,`Commonly used in ICC2 and Fusion Compiler.`],applications:[`Library usage report`,`Cell utilization analysis`,`ECO verification`,`Design statistics`,`Area and power estimation`],questions:[{question:`Q1. What is the difference between get_lib_cells\xA0and get_cells?`,answer:`<ul class="list-disc pl-5 my-2"><li>get_lib_cells\xA0returns library definitions.</li><li>get_cells\xA0returns instantiated cells in the design.</li></ul>`},{question:`Q2. Why is ref_name\xA0used?`,answer:`<ul class="list-disc pl-5 my-2"><li>It identifies the library cell from which an instance is created.</li></ul>`},{question:`Q3. Why use sizeof_collection\xA0instead of llength?`,answer:`<ul class="list-disc pl-5 my-2"><li>Synopsys commands return collection objects, which are counted using sizeof_collection.</li></ul>`},{question:`Q4. Why use -physical_context?`,answer:`<ul class="list-disc pl-5 my-2"><li>It queries the physical implementation database instead of only the logical database.</li></ul>`}],recommendation:`<span >This is the preferred industrial method because it is simple, efficient, scalable, and widely used in PD/STA automation scripts.</span>`,extraContext:[{title:`Script Explanation`,html:``}]},{id:`fc_script_2`,part:1,toolName:`FC Tool`,index:2,title:`Print Nets with High Fanout`,objective:`<span >This script finds all nets whose fanout is greater than or equal to a specified threshold (16 in this example) and prints the net name along with its fanout count.</span>`,code:`foreach_in_collection net [get_nets -physical_context] {
set fanout_count [sizeof_collection \\
[get_pins -physical_context \\
-of_objects $net \\
-filter "direction == in"]]
if {$fanout_count >= 16} {
puts "[get_object_name $net] : Fanout = $fanout_count"
}
}`,explanations:[{step:`Line 1`,code:`foreach_in_collection net [get_nets -physical_context]`,explanation:`<ul class="list-disc pl-5 my-2"><li>get_nets\xA0returns all nets available in the current design.</li><li>foreach_in_collection\xA0processes one net at a time.</li><li>-physical_context\xA0queries the physical implementation database.</li></ul>`},{step:`Line 2`,code:`set fanout_count [sizeof_collection ...]`,explanation:`<ul class="list-disc pl-5 my-2"><li>get_pins -of_objects $net\xA0gets all pins connected to the current net.</li><li>-filter "direction == in"\xA0selects only the input (load) pins.</li><li>sizeof_collection\xA0counts the number of input pins, which is the fanout.</li></ul>`},{step:`Line 3`,code:`if {$fanout_count >= 16}`,explanation:`<p class="my-1"><span >Checks whether the fanout is greater than or equal to the specified threshold. Only high-fanout nets are reported.</span></p>`},{step:`Line 4`,code:`puts "[get_object_name $net] : Fanout = $fanout_count"`,explanation:`<p class="my-1"><span >Prints the net name and its fanout count.</span></p><p class="my-1"><span >Example Output</span></p><p class="my-1"><span >NET_A : Fanout = 18</span></p><p class="my-1"><span >NET_B : Fanout = 25</span></p><p class="my-1"><span >NET_C : Fanout = 40</span></p>`}],flow:[`Get All Nets`,`Read One Net`,`Get Connected Pins`,`Filter Input Pins`,`Count Input Pins`,`Fanout ≥ 16 ?`,`Print Result`],why:[],applications:[`High fanout net analysis`,`Buffer insertion planning`,`CTS optimization`,`Timing analysis`,`Congestion analysis`,`ECO verification`],questions:[{question:`Q1. What is fanout?`,answer:`<ul class="list-disc pl-5 my-2"><li>Fanout is the number of input (load) pins driven by a single output pin.</li></ul>`},{question:`Q2. Why count only input pins?`,answer:`<ul class="list-disc pl-5 my-2"><li>Because fanout is defined by the number of loads, not the driver.</li></ul>`},{question:`Q3. Why use direction == in?`,answer:`<ul class="list-disc pl-5 my-2"><li>To exclude the driver pin and count only receiving pins.</li></ul>`},{question:`Q4. Why use sizeof_collection?`,answer:`<ul class="list-disc pl-5 my-2"><li>Because Synopsys commands return collection objects, not TCL lists.</li></ul>`},{question:`Q5. Why use -physical_context?`,answer:`<ul class="list-disc pl-5 my-2"><li>To access the physical implementation database used in Physical Design.</li></ul>`}],recommendation:`<span >This is the preferred industrial approach because it uses optimized database queries, is efficient for large designs, and is widely used in PD, STA, CTS, and ECO automation.</span>`,extraContext:[{title:`Script Explanation`,html:``},{title:`What is Fanout?`,html:`<p class="my-1"><span >Fanout is the number of load (input) pins driven by a single output pin.</span></p><p class="my-1"><span >Example:</span></p><p class="my-1"><span >Driver</span></p><p class="my-1"><span >  │</span></p><p class="my-1"><span >  ├── Load 1</span></p><p class="my-1"><span >  ├── Load 2</span></p><p class="my-1"><span >  ├── Load 3</span></p><p class="my-1"><span >  └── Load 4</span></p><p class="my-1"><span >Fanout = 4</span></p>`}]},{id:`fc_script_3`,part:1,toolName:`FC Tool`,index:3,title:`Find the Most Used and Least Used Library Cells`,objective:`<span >This script identifies the most frequently used library cell in the design and also prints the library cells that are used only once.</span>`,code:`set max_count 0
set most_used_cell ""
foreach_in_collection lib_cell [get_lib_cells] {
set cell_count [sizeof_collection \\
[get_cells -physical_context \\
-filter "ref_name == [get_attribute $lib_cell name]"]]
if {$cell_count > 0} {
if {$cell_count == 1} {
puts "[get_object_name $lib_cell] : Count = $cell_count"
}
if {$cell_count > $max_count} {
set most_used_cell [get_object_name $lib_cell]
set max_count $cell_count
}
}
}
puts "Most Used Library Cell : $most_used_cell"
puts "Usage Count \xA0 \xA0 \xA0 \xA0 \xA0 \xA0: $max_count"`,explanations:[{step:`Line 1`,code:`foreach_in_collection lib_cell [get_lib_cells]`,explanation:`<ul class="list-disc pl-5 my-2"><li>Retrieves all library cells from the loaded technology library.</li><li>Processes one library cell at a time.</li></ul>`},{step:`Line 2`,code:`set cell_count [sizeof_collection ...]`,explanation:`<ul class="list-disc pl-5 my-2"><li>Finds all design instances whose ref_name\xA0matches the current library cell.</li><li>Counts the number of matching instances.</li></ul>`},{step:`Line 3`,code:`if {$cell_count > 0}`,explanation:`<p class="my-1"><span >Processes only library cells that are actually used in the design.</span></p>`},{step:`Line 4`,code:`if {$cell_count == 1}`,explanation:`<p class="my-1"><span >Prints the library cells that appear only once in the design.</span></p>`},{step:`Line 5`,code:`if {$cell_count > $max_count}`,explanation:`<p class="my-1"><span >Compares the current usage count with the highest count found so far.</span></p><p class="my-1"><span >If the current count is greater:</span></p><ul class="list-disc pl-5 my-2"><li>Update max_count.</li><li>Store the corresponding library cell name.</li></ul>`}],flow:[`Get All Library Cells`,`Find Instance Count`,`Count > 0 ?`,`Count == 1 ?`,`Print Least Used Cell`,`Compare with Maximum Count`,`Update Maximum`,`Print Most Used Cell`],why:[],applications:[`Library usage analysis`,`Design statistics`,`Cell optimization`,`ECO analysis`,`Area and power optimization`,`Library migration verification`],questions:[{question:`Q1. Why is max_count\xA0initialized to 0?`,answer:`<ul class="list-disc pl-5 my-2"><li>To ensure the first used library cell becomes the initial maximum.</li></ul>`},{question:`Q2. Why check cell_count > 0?`,answer:`<ul class="list-disc pl-5 my-2"><li>To ignore unused library cells.</li></ul>`},{question:`Q3. Why print cells with cell_count == 1?`,answer:`<ul class="list-disc pl-5 my-2"><li>These are the least-used library cells (used only once), which may be useful for optimization or analysis.</li></ul>`},{question:`Q4. How is the most used library cell identified?`,answer:`<ul class="list-disc pl-5 my-2"><li>By continuously comparing each library cell's count with the current maximum and updating it when a larger value is found.</li></ul>`},{question:`Q5. Can this script be modified to find the Top 10 most used library cells?`,answer:`<ul class="list-disc pl-5 my-2"><li>Yes. Store the cell names and counts in a list or dictionary, sort them by count in descending order, and print the top entries.</li></ul>`}],recommendation:`<span >This is an efficient approach because it uses optimized database filtering (</span><span >ref_name</span><span >) instead of nested loops. It is suitable for library usage reports, design analysis, and PD/STA automation scripts.</span>
<span ></span>`,extraContext:[{title:`Script Explanation`,html:``},{title:`Variable Initialization`,html:`<p class="my-1"><span >set max_count 0</span></p><p class="my-1"><span >set most_used_cell ""</span></p><ul class="list-disc pl-5 my-2"><li>max_count\xA0stores the highest usage count found so far.</li><li>most_used_cell\xA0stores the name of the library cell with the highest usage.</li></ul>`},{title:`Final Output`,html:`<p class="my-1"><span >puts "Most Used Library Cell : $most_used_cell"</span></p><p class="my-1"><span >puts "Usage Count : $max_count"</span></p><p class="my-1"><span >Prints the most frequently used library cell and its total instance count.</span></p><p class="my-1"><span >Example Output</span></p><p class="my-1"><span >BUF_X1 : Count = 1</span></p><p class="my-1"><span >AOI21_X2 : Count = 1</span></p><p class="my-1"><span >DFF_X1 : Count = 1</span></p><p class="my-1"><span >Most Used Library Cell : INV_X1</span></p><p class="my-1"><span >Usage Count            : 1542</span></p>`}]},{id:`fc_script_4`,part:1,toolName:`FC Tool`,index:4,title:`Display Timing Path Details`,objective:`<span >This script displays the following setup timing path information:</span>
<span >Startpoint</span><span >Endpoint</span><span >Setup Slack</span><span >Number of Logic Levels</span>`,code:`set attributes [list startpoint endpoint slack logic_levels]
foreach attribute $attributes {
set value [get_attribute [get_timing_paths] $attribute]
if {$attribute == "startpoint" || $attribute == "endpoint"} {
puts "$attribute : [get_object_name $value]"
} else {
puts "$attribute : $value"
}
}`,explanations:[{step:`Line 1`,code:`set attributes [list startpoint endpoint slack logic_levels]`,explanation:`<p class="my-1"><span >Creates a list of timing path attributes to retrieve.</span></p>`},{step:`Line 2`,code:`foreach attribute $attributes`,explanation:`<p class="my-1"><span >Loops through each attribute one by one.</span></p>`},{step:`Line 3`,code:`set value [get_attribute [get_timing_paths] $attribute]`,explanation:`<p class="my-1"><span >Retrieves the value of the selected attribute from the timing path.</span></p>`},{step:`Line 4`,code:`if {$attribute == "startpoint" || $attribute == "endpoint"}`,explanation:`<p class="my-1"><span >Checks whether the attribute is an object (startpoint or endpoint) or a numeric value (slack or logic levels).</span></p>`},{step:`Line 5`,code:`puts "$attribute : [get_object_name $value]"`,explanation:`<p class="my-1"><span >Prints the object name for the startpoint and endpoint.</span></p>`},{step:`Line 6`,code:`puts "$attribute : $value"`,explanation:`<p class="my-1"><span >Prints the numeric values for slack and logic levels.</span></p>`}],flow:[],why:[],applications:[`Setup timing analysis`,`Timing path debugging`,`STA report automation`],questions:[{question:`Q1. What does get_timing_paths\xA0return?`,answer:`<ul class="list-disc pl-5 my-2"><li>It returns timing path objects from the STA database.</li></ul>`},{question:`Q2. Why is get_object_name\xA0used only for startpoint and endpoint?`,answer:`<ul class="list-disc pl-5 my-2"><li>Because they are design objects, whereas slack and logic levels are numeric values.</li></ul>`},{question:`Q3. What does negative slack indicate?`,answer:`<ul class="list-disc pl-5 my-2"><li>It indicates a setup timing violation.</li></ul>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:`<p class="my-1"><span >startpoint   : FF1/Q</span></p><p class="my-1"><span >endpoint     : FF2/D</span></p><p class="my-1"><span >slack        : -0.120</span></p><p class="my-1"><span >logic_levels : 8</span></p>`}]},{id:`fc_script_5`,part:1,toolName:`FC Tool`,index:5,title:`Update Timing Constraints for All Scenarios`,objective:`<span >This script iterates through all timing scenarios, removes existing timing constraints (input delay and clock uncertainty), and performs a full timing update.</span>`,code:`foreach_in_collection scenario [all_scenarios] {
current_scenario $scenario
remove_input_delay [get_ports <clock_port>]
remove_clock_uncertainty [get_clocks <clock_name>]
}
update_timing -full`,explanations:[{step:`Line 1`,code:`foreach_in_collection scenario [all_scenarios]`,explanation:`<p class="my-1"><span >Loops through all timing scenarios (MMMC scenarios).</span></p>`},{step:`Line 2`,code:`current_scenario $scenario`,explanation:`<p class="my-1"><span >Sets the current scenario so that all subsequent commands are applied to that scenario.</span></p>`},{step:`Line 3`,code:`remove_input_delay [get_ports <clock_port>]`,explanation:`<p class="my-1"><span >Removes the existing input delay constraint from the specified input port.</span></p>`},{step:`Line 4`,code:`remove_clock_uncertainty [get_clocks <clock_name>]`,explanation:`<p class="my-1"><span >Removes the clock uncertainty value from the specified clock.</span></p>`},{step:`Line 5`,code:`update_timing -full`,explanation:`<p class="my-1"><span >Performs a full timing analysis after updating the timing constraints.</span></p>`}],flow:[],why:[],applications:[`MMMC timing analysis`,`Constraint modification`,`SDC updates`,`Timing re-analysis`],questions:[{question:`Q1. Why is current_scenario\xA0used?`,answer:`<ul class="list-disc pl-5 my-2"><li>To apply timing constraints to the selected scenario.</li></ul>`},{question:`Q2. Why use update_timing -full?`,answer:`<ul class="list-disc pl-5 my-2"><li>To recalculate timing after modifying constraints.</li></ul>`},{question:`Q3. What is clock uncertainty?`,answer:`<ul class="list-disc pl-5 my-2"><li>It represents clock variation due to skew and jitter and is considered during STA.</li></ul>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``}]},{id:`fc_script_6`,part:1,toolName:`FC Tool`,index:6,title:`Rename Combinational Cells Based on Input Port`,objective:`<span >This script identifies the longest timing path starting from each input port and renames the combinational cells on that path using the corresponding input port name.</span>`,code:`# Get all input ports
set ports [get_object_name [get_ports *]]
foreach port $ports {
# Get endpoints of timing paths from the current port
set endpoints [get_object_name \\
[get_attribute [get_timing_paths -from $port -max_paths 100] endpoint]]
set max_logic_level 0
set longest_endpoint ""
# Find the longest timing path
foreach endpoint $endpoints {
set points [get_object_name \\
[get_attribute [get_timing_paths -from $port -to $endpoint] points]]
set logic_level [llength $points]
if {$logic_level > $max_logic_level} {
set max_logic_level $logic_level
set longest_endpoint $endpoint
}
}
# Get all points from the longest timing path
set points [get_object_name \\
[get_attribute \\
[get_timing_paths -from $port -to $longest_endpoint] points]]
# Get input pins on the timing path
set input_pins [get_object_name \\
[get_pins $points -filter "pin_direction == in"]]
# Get only combinational cells
set cells [get_object_name \\
[get_cells -of_objects [get_pins $input_pins] \\
-filter "is_sequential == false"]]
# Rename the cells
set index 0
foreach cell $cells {
set new_name "\${port}_\${index}"
set_attribute [get_cells $cell] name $new_name
incr index
}
}`,explanations:[{step:`Step 1`,code:``,explanation:`<p class="my-1"><span >Get all input ports in the design.</span></p>`},{step:`Step 2`,code:``,explanation:`<p class="my-1"><span >For each input port, collect the timing path endpoints.</span></p>`},{step:`Step 3`,code:``,explanation:`<p class="my-1"><span >Calculate the logic depth of each timing path and identify the longest timing path.</span></p>`},{step:`Step 4`,code:``,explanation:`<p class="my-1"><span >Retrieve all points (pins/cells) on the longest timing path.</span></p>`},{step:`Step 5`,code:``,explanation:`<p class="my-1"><span >Filter only input pins, then retrieve only combinational cells by excluding sequential cells.</span></p>`},{step:`Step 6`,code:``,explanation:`<p class="my-1"><span >Rename each combinational cell using the input port name followed by an index.</span></p>`}],flow:[],why:[],applications:[`Debugging timing paths`,`Cell identification`,`Timing path visualization`,`ECO and automation scripts`],questions:[{question:`Q1. Why is llength\xA0used?`,answer:`<ul class="list-disc pl-5 my-2"><li>To determine the number of points (logic depth) in a timing path.</li></ul>`},{question:`Q2. Why filter is_sequential == false?`,answer:`<ul class="list-disc pl-5 my-2"><li>To select only combinational cells and exclude flip-flops/latches.</li></ul>`},{question:`Q3. Why rename cells?`,answer:`<ul class="list-disc pl-5 my-2"><li>To make cells on a critical timing path easier to identify during debugging and analysis.</li></ul>`}],recommendation:`<span >This script modifies the design database by renaming cells. In production environments, avoid changing instance names unless it is part of an approved ECO or automation flow. A safer approach is to generate a report or assign a custom user attribute instead of renaming instances.</span>`,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:`<p class="my-1"><span >&lt;input_port&gt;_0</span></p><p class="my-1"><span >&lt;input_port&gt;_1</span></p><p class="my-1"><span >&lt;input_port&gt;_2</span></p><p class="my-1"><span >&lt;input_port&gt;_3</span></p>`}]},{id:`fc_script_7`,part:1,toolName:`FC Tool`,index:7,title:`Generate Port Slack Report`,objective:`<span >This script generates a report containing the port name and its corresponding timing slack for all ports in the design.</span>`,code:`# Open report file
set fh [open "port_slack_report.rpt" w]
# Get all ports
set ports [get_object_name [get_ports *]]
# Print report header
puts $fh "Port Name\\t\\tSlack"
# Loop through all ports
foreach port $ports {
# Get timing slack for the current port
set slack [get_attribute \\
[get_timing_paths -through [get_ports $port]] slack]
# Write to report
puts $fh "$port\\t\\t$slack"
}
# Close report file
close $fh`,explanations:[{step:`Line 1`,code:`set fh [open "port_slack_report.rpt" w]`,explanation:`<p class="my-1"><span >Creates a report file in write mode.</span></p>`},{step:`Line 2`,code:`set ports [get_object_name [get_ports *]]`,explanation:`<p class="my-1"><span >Retrieves all ports available in the design.</span></p>`},{step:`Line 3`,code:`puts $fh "Port Name\\t\\tSlack"`,explanation:`<p class="my-1"><span >Prints the report header.</span></p>`},{step:`Line 4`,code:`foreach port $ports`,explanation:`<p class="my-1"><span >Loops through each port one by one.</span></p>`},{step:`Line 5`,code:`set slack [get_attribute [get_timing_paths -through [get_ports $port]] slack]`,explanation:`<p class="my-1"><span >Retrieves the timing slack of the current port.</span></p>`},{step:`Line 6`,code:`puts $fh "$port\\t\\t$slack"`,explanation:`<p class="my-1"><span >Writes the port name and slack value into the report.</span></p>`},{step:`Line 7`,code:`close $fh`,explanation:`<p class="my-1"><span >Closes the report file.</span></p>`}],flow:[],why:[],applications:[`<span >- Port timing analysis</span>`,`<span >- Timing report generation</span>`,`<span >- Setup/Hold debugging</span>`,`<span >- STA automation</span>`],questions:[{question:"Q1. Why is `open` used?",answer:`<p class="my-1"><span >- To create a report file for storing the output.</span></p>`},{question:"Q2. Why use `get_timing_paths -through`?",answer:`<p class="my-1"><span >- To retrieve timing paths passing through the specified port.</span></p>`},{question:"Q3. Why is `close` required?",answer:`<p class="my-1"><span >- To save all data and properly close the report file.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Port Name              Slack</span></p><p class="my-1"><span >--------------------------------</span></p><p class="my-1"><span >PORT_A                 0.125</span></p><p class="my-1"><span >PORT_B                -0.084</span></p><p class="my-1"><span >PORT_C                 0.450</span></p><p class="my-1"><span >PORT_D                 0.230</span></p><p class="my-1"><span >```</span></p>'}]},{id:`fc_script_8`,part:1,toolName:`FC Tool`,index:8,title:`Route Nets Up to Two Logic Levels from Selected Ports`,objective:`<span >This script identifies nets connected within the first two logic levels from selected input ports, removes their existing routing, and prepares them for rerouting with a specified routing rule.</span>`,code:`# Define the target ports
set target_ports {<port_pattern1> <port_pattern2> <port_pattern3>}
set final_nets {}
foreach port_pattern $target_ports {
set ports [get_object_name [get_ports $port_pattern]]
foreach port $ports {
# Get first-level combinational cells
set level1_cells [get_object_name \\
[get_cells -of_objects \\
[all_fanout -flat -levels 1 -from [get_ports $port]]]]
# Get nets connected to those cells
set nets [get_object_name \\
[get_nets -of_objects [get_cells $level1_cells]]]
# Select first two nets
set net1 [lindex $nets 0]
set net2 [lindex $nets 1]
# Remove existing routing
remove_shapes -force [get_shapes -of_objects [get_nets $net1]]
remove_shapes -force [get_shapes -of_objects [get_nets $net2]]
# Store nets
lappend final_nets $net1 $net2
}
}
# Remove duplicate nets
set net_list [lsort -unique $final_nets]
# (Optional) Apply routing rule
#create_routing_rule <routing_rule>
#set_routing_rule -rule <routing_rule> \\
# \xA0 \xA0-min_routing_layer <min_layer> \\
# \xA0 \xA0-max_routing_layer <max_layer> \\
# \xA0 \xA0[get_nets $net_list]
# Route selected nets
#route_eco -nets $net_list
#set_dont_touch [get_nets $net_list] true`,explanations:[{step:`Line 1`,code:`set target_ports {...}`,explanation:`<p class="my-1"><span >Defines the list of target ports or port patterns.</span></p>`},{step:`Line 2`,code:`foreach port_pattern $target_ports`,explanation:`<p class="my-1"><span >Loops through each port pattern.</span></p>`},{step:`Line 3`,code:`get_ports`,explanation:`<p class="my-1"><span >Retrieves all ports matching the specified pattern.</span></p>`},{step:`Line 4`,code:`all_fanout -flat -levels 1`,explanation:`<p class="my-1"><span >Finds cells connected within the first logic level from the port.</span></p>`},{step:`Line 5`,code:`get_nets -of_objects`,explanation:`<p class="my-1"><span >Retrieves the nets connected to those cells.</span></p>`},{step:`Line 6`,code:`remove_shapes`,explanation:`<p class="my-1"><span >Deletes the existing routing shapes of the selected nets.</span></p>`},{step:`Line 7`,code:`lsort -unique`,explanation:`<p class="my-1"><span >Removes duplicate net names.</span></p>`},{step:`Line 8`,code:`route_eco`,explanation:`<p class="my-1"><span >(Optional) Re-routes the selected nets using ECO routing.</span></p>`}],flow:[],why:[],applications:[`<span >- ECO routing</span>`,`<span >- Partial net rerouting</span>`,`<span >- Routing cleanup</span>`,`<span >- Congestion fixing</span>`,`<span >- Custom routing rule application</span>`],questions:[],recommendation:``,extraContext:[{title:`Script Explanation`,html:``}]},{id:`fc_script_9`,part:1,toolName:`FC Tool`,index:9,title:`Generate Port Timing Summary Report`,objective:`<span >This script generates a report for all input and output ports by extracting important timing information such as input/output delay, delay at the port, data arrival time, and actual delay.</span>`,code:`# Open report file
set fh [open "port_timing_summary.rpt" w]
# Get all ports
set ports [get_object_name [get_ports *]]
# Header flag
set header_written 0
foreach port $ports {
# Get port direction
set direction [get_attribute [get_ports $port] direction]
if {$direction == "out"} {
# Output port timing information
set data_arrival_time [get_attribute \\
[get_timing_paths -to $port] arrival]
set output_delay [get_attribute \\
[get_timing_paths -to $port] output_delay]
set actual_delay [expr {$data_arrival_time - $output_delay}]
if {!$header_written} {
puts $fh "Port Name\\tOutput Delay\\tData Arrival\\tActual Delay"
set header_written 1
}
puts $fh "$port\\t$output_delay\\t$data_arrival_time\\t$actual_delay"
} elseif {$direction == "in"} {
# Input port timing information
set data_arrival_time [get_attribute \\
[get_timing_paths -from $port] arrival]
set input_delay [get_attribute \\
[get_timing_paths -from $port] input_delay]
set actual_delay [expr {$data_arrival_time - $input_delay}]
if {!$header_written} {
puts $fh "Port Name\\tInput Delay\\tData Arrival\\tActual Delay"
set header_written 1
}
puts $fh "$port\\t$input_delay\\t$data_arrival_time\\t$actual_delay"
}
}
close $fh
puts "Report generated successfully."`,explanations:[{step:`Line 1`,code:`open`,explanation:`<p class="my-1"><span >Creates the report file.</span></p>`},{step:`Line 2`,code:`get_ports *`,explanation:`<p class="my-1"><span >Retrieves all ports in the design.</span></p>`},{step:`Line 3`,code:`get_attribute direction`,explanation:`<p class="my-1"><span >Checks whether the port is an input or output.</span></p>`},{step:`Line 4`,code:`get_timing_paths`,explanation:`<p class="my-1"><span >Retrieves the timing path associated with the port.</span></p>`},{step:`Line 5`,code:`get_attribute`,explanation:`<p class="my-1"><span >Extracts timing attributes such as arrival time and input/output delay.</span></p>`},{step:`Line 6`,code:`expr`,explanation:`<p class="my-1"><span >Calculates the actual delay.</span></p>`},{step:`Line 7`,code:`puts`,explanation:`<p class="my-1"><span >Writes the timing information into the report.</span></p>`},{step:`Line 8`,code:`close`,explanation:`<p class="my-1"><span >Closes the report file.</span></p>`}],flow:[],why:[],applications:[`<span >- Port timing analysis</span>`,`<span >- STA report generation</span>`,`<span >- Input/Output delay verification</span>`,`<span >- Timing debugging</span>`],questions:[],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Port Name      Delay      Arrival Time    Actual Delay</span></p><p class="my-1"><span >------------------------------------------------------</span></p><p class="my-1"><span >IN_A           0.350      0.890           0.540</span></p><p class="my-1"><span >IN_B           0.420      1.050           0.630</span></p><p class="my-1"><span >OUT_A          0.280      0.760           0.480</span></p><p class="my-1"><span >```</span></p>'}]},{id:`fc_script_10`,part:1,toolName:`FC Tool`,index:10,title:`Apply Non-Default Routing (NDR) to Selected Nets`,objective:`<span >This script identifies nets connected to the selected ports and applies a Non-Default Routing (NDR) rule by specifying routing layers and routing constraints.</span>`,code:`# Get nets connected to the selected ports
set nets [get_object_name \\
[get_nets -of_objects \\
[all_fanout -flat -from [get_ports <port_pattern>]]]]
# Apply NDR to the selected nets
set_routing_rule \\
-clear_rule \\
<routing_rule_name> \\
-min_routing_layer <min_layer> \\
-max_routing_layer <max_layer> \\
-min_layer_mode allow_pin_connection \\
-max_layer_mode allow_pin_connection \\
[get_nets $nets]`,explanations:[{step:`Line 1`,code:`all_fanout -flat -from`,explanation:`<p class="my-1"><span >Finds all fanout paths starting from the specified port(s).</span></p>`},{step:`Line 2`,code:`get_nets -of_objects`,explanation:`<p class="my-1"><span >Retrieves all nets connected to the fanout paths.</span></p>`},{step:`Line 3`,code:`set_routing_rule`,explanation:`<p class="my-1"><span >Applies the specified Non-Default Routing (NDR) rule to the selected nets.</span></p>`},{step:`Line 4`,code:`-clear_rule`,explanation:`<p class="my-1"><span >Removes any existing routing rule before applying the new one.</span></p>`},{step:`Line 5`,code:`-min_routing_layer
-max_routing_layer`,explanation:`<p class="my-1"><span >Specifies the minimum and maximum routing layers for the selected nets.</span></p>`},{step:`Line 6`,code:`allow_pin_connection`,explanation:`<p class="my-1"><span >Allows routing to connect directly to pins even if they are outside the specified routing layer range.</span></p>`}],flow:[],why:[],applications:[`<span >- Apply NDR to critical nets</span>`,`<span >- Improve timing on critical paths</span>`,`<span >- Reduce crosstalk and noise</span>`,`<span >- ECO routing</span>`,`<span >- Signal Integrity (SI) optimization</span>`],questions:[],recommendation:``,extraContext:[{title:`Script Explanation`,html:``}]},{id:`fc_script_11`,part:1,toolName:`FC Tool`,index:11,title:`Manual Routing of Selected Fanout Nets Using Routing Rule`,objective:`<span >This script identifies the first-level fanout cells connected to a specified input port, collects selected nets associated with those cells, applies a custom routing rule, and performs ECO routing. It is commonly used for manual routing control, signal integrity improvement, and critical-net routing optimization.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Collect target ports
set ports [get_object_name [get_ports <port_name_pattern>]]
# Initialize net collection list
set selected_nets {}
foreach port $ports {
# Get first-level fanout cells from the port
set level1_cells [get_object_name \\
[get_cells -of_objects \\
[all_fanout -flat -levels 1 -from [get_ports $port]]]]
# Get nets connected to those cells
set nets [get_object_name \\
[get_nets -of_objects [get_cells $level1_cells]]]
# Collect first two nets (example selection)
if {[llength $nets] >= 2} {
lappend selected_nets \\
[lindex $nets 0] \\
[lindex $nets 1]
}
}
# Remove duplicate nets
set net_list [lsort -unique $selected_nets]
# Display selected nets
puts $net_list
# Create custom routing rule
create_routing_rule <routing_rule_name> \\
-default_reference_rule
# Apply routing layer constraints
set_routing_rule \\
-rule <routing_rule_name> \\
-min_routing_layer <routing_layer_min> \\
-max_routing_layer <routing_layer_max> \\
[get_nets $net_list]
# ECO route selected nets
route_eco -nets $net_list
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Collect ports matching the specified port pattern.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Initialize an empty list to store selected nets.</span></p>`},{step:`Line 6`,code:``,explanation:`<p class="my-1"><span >Loop through each target port.</span></p>`},{step:`Line 9`,code:``,explanation:`<p class="my-1"><span >Find first-level fanout cells connected to the port.</span></p>`},{step:`Line 14`,code:``,explanation:`<p class="my-1"><span >Extract nets connected to those fanout cells.</span></p>`},{step:`Line 18`,code:``,explanation:`<p class="my-1"><span >Check whether at least two nets are available.</span></p>`},{step:`Line 19-21`,code:``,explanation:`<p class="my-1"><span >Store the first two nets in the collection list.</span></p>`},{step:`Line 26`,code:``,explanation:`<p class="my-1"><span >Remove duplicate net entries.</span></p>`},{step:`Line 29`,code:``,explanation:`<p class="my-1"><span >Print the final net list.</span></p>`},{step:`Line 32`,code:``,explanation:`<p class="my-1"><span >Create a custom routing rule.</span></p>`},{step:`Line 36`,code:``,explanation:`<p class="my-1"><span >Apply routing layer constraints to selected nets.</span></p>`},{step:`Line 42`,code:``,explanation:`<p class="my-1"><span >Perform ECO routing on the selected nets.</span></p>`}],flow:[],why:[],applications:[`<span >• Critical signal manual routing</span>`,`<span >• Signal Integrity (SI) improvement</span>`,`<span >• ECO routing of selected nets</span>`,`<span >• NDR and routing-rule based optimization</span>`,`<span >• High-speed path routing control</span>`,`<span >• Congestion-aware manual routing</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why is all_fanout -levels 1 used in this script?</span></p><p class="my-1"><span >Answer: To identify only the immediate fanout cells connected to a port.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >Why is lsort -unique applied before routing?</span></p><p class="my-1"><span >Answer: To remove duplicate nets and avoid redundant routing operations.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why are custom routing rules applied to selected nets?</span></p><p class="my-1"><span >Answer: To control routing resources and improve timing, SI, or reliability.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >net_101</span></p><p class="my-1"><span >net_205</span></p><p class="my-1"><span >net_310</span></p><p class="my-1"><span >net_412</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_12`,part:1,toolName:`FC Tool`,index:12,title:`Create Hard Bounds for Register-to-Output Timing Paths`,objective:`<span >This script identifies the endpoint register driving selected output ports, extracts the register dimensions and output port location, and creates hard placement bounds around the registers. Such bounds are commonly used to control placement near output interfaces and improve Reg-to-Out timing closure.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Collect target output ports
set ports [get_object_name [get_ports <output_port_pattern>]]
# Counter for unique bound names
set bound_index 1
foreach port $ports {
# Find endpoint sequential cell driving the output path
set register_name [get_object_name \\
[get_cells -of_objects \\
[get_object_name \\
[get_attribute \\
[get_timing_paths -to $port] points]] \\
-filter "is_sequential == true"]]
# Skip if register is not found
if {$register_name == ""} {
continue
}
# Get register dimensions
set cell_width \xA0[get_attribute [get_flat_cells $register_name] width]
set cell_height [get_attribute [get_flat_cells $register_name] height]
# Get output port boundary coordinates
set bbox [get_attribute [get_ports $port] bbox]
set lower_left \xA0[lindex $bbox 0]
set llx [lindex $lower_left 0]
set lly [lindex $lower_left 1]
# Alternate bound offset to avoid overlap
if {[expr {$bound_index % 2}] == 0} {
set llx [expr {$llx + 10}]
set urx [expr {$llx + $cell_width + 2}]
set ury [expr {$lly + $cell_height + 2}]
} else {
set llx [expr {$llx + 5}]
set urx [expr {$llx + $cell_width + 2}]
set ury [expr {$lly + $cell_height + 2}]
}
# Create hard placement bound
create_bound \\
-type hard \\
[get_flat_cells $register_name] \\
-boundary [list [list [list $llx $lly] [list $urx $ury]]] \\
-name port_bound_$bound_index
incr bound_index
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Collect all target output ports.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Initialize a counter for unique bound names.</span></p>`},{step:`Line 6`,code:``,explanation:`<p class="my-1"><span >Loop through each output port.</span></p>`},{step:`Line 9`,code:``,explanation:`<p class="my-1"><span >Find the sequential endpoint register associated with the timing path.</span></p>`},{step:`Line 18`,code:``,explanation:`<p class="my-1"><span >Skip the port if no register is found.</span></p>`},{step:`Line 23-24`,code:``,explanation:`<p class="my-1"><span >Extract register width and height.</span></p>`},{step:`Line 27`,code:``,explanation:`<p class="my-1"><span >Read output port coordinates.</span></p>`},{step:`Line 30-32`,code:``,explanation:`<p class="my-1"><span >Extract lower-left coordinates from the bounding box.</span></p>`},{step:`Line 35`,code:``,explanation:`<p class="my-1"><span >Apply alternate offsets for adjacent bounds.</span></p>`},{step:`Line 38-39`,code:``,explanation:`<p class="my-1"><span >Calculate upper-right X and Y coordinates.</span></p>`},{step:`Line 48`,code:``,explanation:`<p class="my-1"><span >Create a hard placement bound around the register.</span></p>`},{step:`Line 54`,code:``,explanation:`<p class="my-1"><span >Increment the bound counter.</span></p>`}],flow:[],why:[],applications:[`<span >• Reg-to-Out timing optimization</span>`,`<span >• Interface register clustering</span>`,`<span >• Output path timing closure</span>`,`<span >• Placement control near IO boundaries</span>`,`<span >• ECO placement guidance</span>`,`<span >• Physical implementation floorplan refinement</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why are hard bounds used around registers?</span></p><p class="my-1"><span >Answer: To restrict placement within a specified physical region.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >Why is get_timing_paths used instead of connectivity commands?</span></p><p class="my-1"><span >Answer: To identify registers participating in actual timing paths.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >How can hard bounds help timing closure?</span></p><p class="my-1"><span >Answer: They reduce physical distance between timing-critical objects and their endpoints.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``}]},{id:`fc_script_13`,part:1,toolName:`FC Tool`,index:13,title:`Remove Existing Buffers and Insert Repeaters on Port Fanout Nets`,objective:`<span >This script identifies timing paths originating from selected ports, removes existing non-sequential buffering cells on those paths, and inserts new repeaters on the associated nets. It is commonly used during ECO implementation to clean up buffering structures and improve transition, capacitance, and timing on critical paths.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Collect target ports
set ports [get_object_name [get_ports <port_name_pattern>]]
foreach port $ports {
# Get timing path endpoints driven by the port
set end_points [get_object_name \\
[get_attribute \\
[get_timing_paths \\
-from [get_ports $port] \\
-max_paths 10000] endpoint]]
foreach end_point $end_points {
# Get timing points on the path
set points [get_object_name \\
[get_attribute \\
[get_timing_paths \\
-from $port \\
-to $end_point] points]]
# Collect input pins from timing points
set input_pins [get_object_name \\
[get_pins $points \\
-filter "pin_direction == in"]]
# Identify combinational cells only
set cells [get_object_name \\
[get_cells -of_objects \\
[get_pins $input_pins] \\
-filter "is_sequential == false"]]
# Remove existing buffers/inverters
if {[sizeof_collection [get_cells $cells -quiet]] > 0} {
remove_buffers $cells
}
}
# Insert new repeaters on port fanout net
add_buffer_on_route \\
-first_distance 30 \\
-repeater_distance 80 \\
[get_nets -of_objects [get_ports $port]] \\
-lib_cell <buffer_cell_name> \\
-net_prefix \${port}_net \\
-cell_prefix \${port}_buf
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Collect target ports matching the specified pattern.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Loop through each port.</span></p>`},{step:`Line 7`,code:``,explanation:`<p class="my-1"><span >Extract endpoint objects from timing paths.</span></p>`},{step:`Line 13`,code:``,explanation:`<p class="my-1"><span >Loop through every endpoint.</span></p>`},{step:`Line 16`,code:``,explanation:`<p class="my-1"><span >Collect timing points between startpoint and endpoint.</span></p>`},{step:`Line 23`,code:``,explanation:`<p class="my-1"><span >Extract input pins from timing points.</span></p>`},{step:`Line 28`,code:``,explanation:`<p class="my-1"><span >Identify combinational cells on the path.</span></p>`},{step:`Line 34`,code:``,explanation:`<p class="my-1"><span >Remove existing buffers and inverters.</span></p>`},{step:`Line 40`,code:``,explanation:`<p class="my-1"><span >Insert repeaters on the port net.</span></p>`},{step:`Line 41`,code:``,explanation:`<p class="my-1"><span >Specify first buffer insertion distance.</span></p>`},{step:`Line 42`,code:``,explanation:`<p class="my-1"><span >Specify spacing between repeaters.</span></p>`},{step:`Line 44`,code:``,explanation:`<p class="my-1"><span >Select a buffer library cell.</span></p>`},{step:`Line 45-46`,code:``,explanation:`<p class="my-1"><span >Define naming convention for inserted nets and cells.</span></p>`}],flow:[],why:[],applications:[`<span >• ECO timing optimization</span>`,`<span >• Transition violation fixing</span>`,`<span >• Max capacitance fixing</span>`,`<span >• Buffer structure cleanup</span>`,`<span >• Repeater insertion automation</span>`,`<span >• Critical path optimization</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why are sequential cells excluded before buffer removal?</span></p><p class="my-1"><span >Answer: Sequential cells must be preserved because they are functional elements of the design.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >What is the purpose of add_buffer_on_route?</span></p><p class="my-1"><span >Answer: It inserts repeaters along routed nets to improve timing and signal integrity.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why remove old buffers before inserting new ones?</span></p><p class="my-1"><span >Answer: To avoid redundant buffering and create an optimized buffer structure.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``}]},{id:`fc_script_14`,part:1,toolName:`FC Tool`,index:14,title:`Extract Selected Cells and Nets to a TCL File`,objective:`<span >This script captures the currently selected objects in the GUI, extracts the associated cells and nets, and writes them into a reusable TCL file. It is commonly used for ECO debugging, manual routing, violation analysis, and creating reusable object lists.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Get currently selected objects
set selected_objects [get_object_name [get_selection]]
# Extract nets from selection
set nets [get_object_name [get_nets $selected_objects]]
# Extract cells from selection
set cells [get_object_name [get_cells $selected_objects]]
# Open output TCL file
set file_handle [open "selected_objects.tcl" w]
# Write net list
puts $file_handle "set net_list [list $nets]"
# Write cell list
puts $file_handle "set cell_list [list $cells]"
# Close file
close $file_handle
puts "TCL file generated successfully."
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Collect all currently selected objects from the GUI.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Extract net names associated with the selection.</span></p>`},{step:`Line 7`,code:``,explanation:`<p class="my-1"><span >Extract cell names associated with the selection.</span></p>`},{step:`Line 10`,code:``,explanation:`<p class="my-1"><span >Open a TCL file for writing.</span></p>`},{step:`Line 13`,code:``,explanation:`<p class="my-1"><span >Store the net list in the output file.</span></p>`},{step:`Line 16`,code:``,explanation:`<p class="my-1"><span >Store the cell list in the output file.</span></p>`},{step:`Line 19`,code:``,explanation:`<p class="my-1"><span >Close the file handle.</span></p>`},{step:`Line 21`,code:``,explanation:`<p class="my-1"><span >Display completion message.</span></p>`}],flow:[],why:[],applications:[`<span >• ECO debugging</span>`,`<span >• Manual routing automation</span>`,`<span >• Violation analysis</span>`,`<span >• Capturing GUI selections</span>`,`<span >• Reusable TCL object generation</span>`,`<span >• Physical Design debug workflows</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why is get_selection useful in Physical Design?</span></p><p class="my-1"><span >Answer: It allows scripts to operate directly on objects selected in the GUI.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >Why save cells and nets into a TCL file?</span></p><p class="my-1"><span >Answer: To reuse the same object list in future automation or ECO tasks.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >What is the advantage of using list while writing objects to a file?</span></p><p class="my-1"><span >Answer: It preserves TCL list formatting and prevents parsing issues.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >Generated file: `selected_objects.tcl`</span></p><p class="my-1"><span >```tcl</span></p><p class="my-1"><span >set net_list {&lt;net_name1&gt; &lt;net_name2&gt; &lt;net_name3&gt;}</span></p><p class="my-1"><span >set cell_list {&lt;cell_name1&gt; &lt;cell_name2&gt; &lt;cell_name3&gt;}</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_15`,part:1,toolName:`FC Tool`,index:15,title:`Generate Bound Details Report`,objective:`<span >This script extracts information about all placement bounds in the design and writes the details into a report file. It is useful for floorplan validation, placement constraint review, ECO analysis, and debugging bound-related issues.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Open report file
set report_file [open "bounds_details.rpt" w]
# Get all bounds in the design
set bounds [get_object_name [get_bounds]]
# Report header
puts $report_file "BOUND_NAME\\tBOUND_TYPE\\tBOUND_BOX\\tASSOCIATED_CELLS"
foreach bound $bounds {
# Get bound attributes
set bound_name \xA0[get_attribute [get_bounds $bound] name]
set bound_bbox \xA0[get_attribute [get_bounds $bound] bbox]
set bound_type \xA0[get_attribute [get_bounds $bound] type]
# Get cells associated with the bound
set bound_cells [get_object_name \\
[get_attribute [get_bounds $bound] cells]]
# Write details to report
puts $report_file \\
"$bound_name\\t$bound_type\\t$bound_bbox\\t$bound_cells"
}
# Close report file
close $report_file
puts "Bound details successfully written to bounds_details.rpt"
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Open the report file for writing.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Collect all bounds present in the design.</span></p>`},{step:`Line 7`,code:``,explanation:`<p class="my-1"><span >Write report column headers.</span></p>`},{step:`Line 9`,code:``,explanation:`<p class="my-1"><span >Loop through each bound.</span></p>`},{step:`Line 12`,code:``,explanation:`<p class="my-1"><span >Extract the bound name.</span></p>`},{step:`Line 13`,code:``,explanation:`<p class="my-1"><span >Extract the bound coordinates (bounding box).</span></p>`},{step:`Line 14`,code:``,explanation:`<p class="my-1"><span >Extract the bound type.</span></p>`},{step:`Line 17`,code:``,explanation:`<p class="my-1"><span >Collect cells associated with the bound.</span></p>`},{step:`Line 21`,code:``,explanation:`<p class="my-1"><span >Write all information into the report.</span></p>`},{step:`Line 26`,code:``,explanation:`<p class="my-1"><span >Close the report file.</span></p>`},{step:`Line 28`,code:``,explanation:`<p class="my-1"><span >Print completion message.</span></p>`}],flow:[],why:[],applications:[`<span >• Floorplan constraint verification</span>`,`<span >• Placement bound debugging</span>`,`<span >• Hard/Soft bound auditing</span>`,`<span >• ECO implementation review</span>`,`<span >• Placement constraint documentation</span>`,`<span >• Physical Design signoff checks</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >What is the purpose of get_bounds?</span></p><p class="my-1"><span >Answer: It retrieves all placement bounds defined in the design.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >What information is typically stored in a placement bound?</span></p><p class="my-1"><span >Answer: Bound name, type, coordinates, and associated cells.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why generate a bound report?</span></p><p class="my-1"><span >Answer: To verify placement constraints and debug floorplan-related issues.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >BOUND_NAME      BOUND_TYPE      BOUND_BOX                    ASSOCIATED_CELLS</span></p><p class="my-1"><span >bound_1         hard            {{100 200} {150 250}}       {cell_A cell_B}</span></p><p class="my-1"><span >bound_2         soft            {{300 400} {350 450}}       {cell_C cell_D}</span></p><p class="my-1"><span >bound_3         hard            {{500 600} {560 660}}       {cell_E}</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_16`,part:1,toolName:`FC Tool`,index:16,title:`Generate Macro Details Report`,objective:`<span >This script identifies all hard macros in the design and generates a report containing the macro reference name, number of instances, width, and height. It is useful for macro inventory, floorplanning, and design analysis.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Open report file
set report_file [open "macro_details_report.rpt" w]
# Get unique hard macro reference names
set macro_refs [lsort -unique \\
[get_attribute \\
[get_cells -hierarchical -filter "is_hard_macro == true"] \\
ref_name]]
# Print report header
puts $report_file "Macro_Ref_Name\\tCount\\tWidth\\tHeight"
# Loop through each macro type
foreach macro_ref $macro_refs {
# Get all macro instances of the current type
set macro_cells [get_cells -hierarchical \\
-filter "ref_name == $macro_ref"]
# Count macro instances
set macro_count [sizeof_collection $macro_cells]
# Get macro width
set macro_width [lindex \\
[lsort -unique [get_attribute $macro_cells width]] 0]
# Get macro height
set macro_height [lindex \\
[lsort -unique [get_attribute $macro_cells height]] 0]
# Write report
puts $report_file \\
"$macro_ref\\t$macro_count\\t$macro_width\\t$macro_height"
}
# Close report file
close $report_file
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Creates a report file to store macro information.</span></p>`},{step:`Line 2`,code:``,explanation:`<p class="my-1"><span >Finds all unique hard macro reference names in the design.</span></p>`},{step:`Line 3`,code:``,explanation:`<p class="my-1"><span >Prints the report header.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Loops through each macro reference.</span></p>`},{step:`Line 5`,code:``,explanation:`<p class="my-1"><span >Retrieves all instances of the current macro.</span></p>`},{step:`Line 6`,code:``,explanation:`<p class="my-1"><span >Counts how many times the macro is instantiated.</span></p>`},{step:`Line 7`,code:``,explanation:`<p class="my-1"><span >Retrieves the macro width.</span></p>`},{step:`Line 8`,code:``,explanation:`<p class="my-1"><span >Retrieves the macro height.</span></p>`},{step:`Line 9`,code:``,explanation:`<p class="my-1"><span >Writes the macro details into the report.</span></p>`},{step:`Line 10`,code:``,explanation:`<p class="my-1"><span >Closes the report file.</span></p>`}],flow:[],why:[],applications:[`<span >- Macro inventory report</span>`,`<span >- Floorplanning verification</span>`,`<span >- Macro utilization analysis</span>`,`<span >- Design documentation</span>`,`<span >- Physical Design automation</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Macro_Ref_Name      Count   Width    Height</span></p><p class="my-1"><span >------------------------------------------------</span></p><p class="my-1"><span >MACRO_A              4      120.00   80.00</span></p><p class="my-1"><span >MACRO_B              2      150.00   95.00</span></p><p class="my-1"><span >MACRO_C              1      200.00   120.00</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_17`,part:1,toolName:`FC Tool`,index:17,title:`Find the Most Frequently Used Reference Cell in the Design`,objective:`<span >This script identifies the reference cell that is instantiated the highest number of times in the design and reports its library name along with the total instance count.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Get all standard cell reference names
set ref_cells [lsort -unique \\
[get_attribute \\
[get_cells -hierarchical -filter "is_hard_macro == false"] \\
ref_name]]
# Initialize variables
set max_count 0
set most_used_ref_cell ""
set library_name ""
# Loop through each reference cell
foreach ref_cell $ref_cells {
# Count the number of instances
set cell_count [sizeof_collection \\
[get_cells -hierarchical \\
-filter "ref_name == $ref_cell"]]
# Update if current cell has the highest count
if {$cell_count > $max_count} {
set max_count $cell_count
set most_used_ref_cell $ref_cell
# Get library name
set library_name [lindex \\
[get_attribute \\
[get_cells -filter "ref_name == $ref_cell"] \\
ref_lib_name] 0]
}
}
# Print the result
puts "Most Used Reference Cell : $most_used_ref_cell"
puts "Library Name \xA0 \xA0 \xA0 \xA0 \xA0 \xA0: $library_name"
puts "Instance Count \xA0 \xA0 \xA0 \xA0 \xA0: $max_count"
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Retrieves all unique standard cell reference names from the design.</span></p>`},{step:`Line 2`,code:``,explanation:`<p class="my-1"><span >Initializes variables to track the most frequently used reference cell.</span></p>`},{step:`Line 3`,code:``,explanation:`<p class="my-1"><span >Loops through each reference cell type.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Counts the number of instances for the current reference cell.</span></p>`},{step:`Line 5`,code:``,explanation:`<p class="my-1"><span >Compares the count with the current maximum and updates the values if a higher count is found.</span></p>`},{step:`Line 6`,code:``,explanation:`<p class="my-1"><span >Retrieves the library name of the most frequently used reference cell.</span></p>`},{step:`Line 7`,code:``,explanation:`<p class="my-1"><span >Prints the reference cell name, library name, and total instance count.</span></p>`}],flow:[],why:[],applications:[`<span >- Standard cell utilization analysis</span>`,`<span >- Library usage statistics</span>`,`<span >- Design optimization</span>`,`<span >- ECO planning</span>`,`<span >- Physical Design reporting</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Most Used Reference Cell : BUF_X1</span></p><p class="my-1"><span >Library Name            : std_cell_library</span></p><p class="my-1"><span >Instance Count          : 15872</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_18`,part:1,toolName:`FC Tool`,index:18,title:`Find Standard Cells Having More Than a Specified Number of Pins`,objective:`<span >This script identifies all standard cells whose total number of pins is greater than a specified threshold (15 in this example) and prints the cell name along with its pin count.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Define pin count threshold
set pin_threshold 15
# Get all standard cells
set standard_cells [get_cells -hierarchical \\
-filter "is_hard_macro == false"]
# Flag to check whether any matching cells are found
set found 0
# Loop through each standard cell
foreach_in_collection cell $standard_cells {
# Get cell name
set cell_name [get_object_name $cell]
# Count the number of pins
set pin_count [sizeof_collection \\
[get_pins -of_objects $cell]]
# Check if pin count exceeds the threshold
if {$pin_count > $pin_threshold} {
puts "Cell: $cell_name \xA0 \xA0Pin Count: $pin_count"
incr found
}
}
# Print message if no matching cells are found
if {$found == 0} {
puts "No standard cell has more than $pin_threshold pins."
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Defines the minimum pin count threshold.</span></p>`},{step:`Line 2`,code:``,explanation:`<p class="my-1"><span >Retrieves all standard cells, excluding hard macros.</span></p>`},{step:`Line 3`,code:``,explanation:`<p class="my-1"><span >Initializes a flag to track matching cells.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Loops through each standard cell.</span></p>`},{step:`Line 5`,code:``,explanation:`<p class="my-1"><span >Counts the total number of pins for the current cell.</span></p>`},{step:`Line 6`,code:``,explanation:`<p class="my-1"><span >Prints the cell name and pin count if it exceeds the threshold.</span></p>`},{step:`Line 7`,code:``,explanation:`<p class="my-1"><span >Displays a message if no cells satisfy the condition.</span></p>`}],flow:[],why:[],applications:[`<span >- Standard cell library analysis</span>`,`<span >- Cell complexity identification</span>`,`<span >- Library quality checks</span>`,`<span >- Physical Design automation</span>`,`<span >- Design reporting</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Cell: DFF_X4         Pin Count: 18</span></p><p class="my-1"><span >Cell: AOI222_X2      Pin Count: 16</span></p><p class="my-1"><span >Cell: SDFFRQ_X8      Pin Count: 22</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_19`,part:1,toolName:`FC Tool`,index:19,title:`Find the Widest Cell in the Design`,objective:`<span >Find the standard cell with the maximum width in the design.</span>
<span >---</span>`,code:`set max_cell ""
set max_width 0
foreach_in_collection cell [get_cells -hierarchical -filter "is_hard_macro == false"] {
set cell_width [get_attribute $cell width]
if {$cell_width > $max_width} {
set max_width $cell_width
set max_cell [get_object_name $cell]
}
}
puts "Widest cell is $max_cell and its width is $max_width"
\`\`\`
---`,explanations:[{step:`Line 1`,code:`set max_cell ""
set max_width 0`,explanation:`<p class="my-1"><span >Stores the widest cell name and its width.</span></p>`},{step:`Line 2`,code:`foreach_in_collection cell [get_cells -hierarchical -filter "is_hard_macro == false"] {`,explanation:`<p class="my-1"><span >Loops through all standard cells in the design.</span></p>`},{step:`Line 3`,code:`set cell_width [get_attribute $cell width]`,explanation:`<p class="my-1"><span >Gets the width of the current cell.</span></p>`},{step:`Line 4`,code:`if {$cell_width > $max_width} {`,explanation:`<p class="my-1"><span >Checks whether the current cell is wider than the previous widest cell.</span></p>`},{step:`Line 5`,code:`set max_width $cell_width
set max_cell [get_object_name $cell]`,explanation:`<p class="my-1"><span >Updates the widest cell information.</span></p>`},{step:`Line 6`,code:`puts "Widest cell is $max_cell and its width is $max_width"`,explanation:`<p class="my-1"><span >Prints the widest cell and its width.</span></p>`}],flow:["```",`Get All Standard Cells`,`│`,`▼`,`Read Cell Width`,`│`,`▼`,`Compare with Maximum Width`,`│`,`▼`,`Update if Larger`,`│`,`▼`,`Print Widest Cell`,"```",`---`],why:[],applications:[],questions:[],recommendation:``,extraContext:[{title:`Simple Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Widest cell is BUF_X32 and its width is 8.64</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >---</span></p>'}]},{id:`fc_script_20`,part:1,toolName:`FC Tool`,index:20,title:`Generate Metal Layer Properties Report`,objective:`<span >Print the properties of all routing metal layers (width, pitch, spacing, direction, area) into a report file.</span>
<span >---</span>`,code:`set fp [open "metal_layer_report.txt" w]
set layers [get_layers -filter "is_routing_layer == true"]
puts $fp "Layer\\tPitch\\tMin_Spacing\\tMin_Width\\tDirection\\tMin_Area"
foreach_in_collection layer $layers {
set layer_name \xA0 [get_attribute $layer name]
set pitch \xA0 \xA0 \xA0 \xA0[get_attribute $layer pitch]
set min_spacing \xA0[get_attribute $layer min_spacing]
set min_width \xA0 \xA0[get_attribute $layer min_width]
set direction \xA0 \xA0[get_attribute $layer routing_direction]
set min_area \xA0 \xA0 [get_attribute $layer min_area]
puts $fp "$layer_name\\t$pitch\\t$min_spacing\\t$min_width\\t$direction\\t$min_area"
}
close $fp
puts "Metal layer report generated successfully."
\`\`\`
---`,explanations:[{step:`Line 1`,code:`set fp [open "metal_layer_report.txt" w]`,explanation:`<p class="my-1"><span >Creates a report file.</span></p>`},{step:`Line 2`,code:`set layers [get_layers -filter "is_routing_layer == true"]`,explanation:`<p class="my-1"><span >Gets all routing metal layers.</span></p>`},{step:`Line 3`,code:`foreach_in_collection layer $layers`,explanation:`<p class="my-1"><span >Loops through every routing layer.</span></p>`},{step:`Line 4`,code:`get_attribute`,explanation:`<p class="my-1"><span >Reads properties like:</span></p><p class="my-1"><span >- Layer Name</span></p><p class="my-1"><span >- Pitch</span></p><p class="my-1"><span >- Minimum Spacing</span></p><p class="my-1"><span >- Minimum Width</span></p><p class="my-1"><span >- Routing Direction</span></p><p class="my-1"><span >- Minimum Area</span></p>`},{step:`Line 5`,code:`puts $fp ...`,explanation:`<p class="my-1"><span >Writes all properties into the report.</span></p>`},{step:`Line 6`,code:`close $fp`,explanation:`<p class="my-1"><span >Closes the report file.</span></p>`}],flow:["```",`Get Routing Layers`,`│`,`▼`,`Read Layer Properties`,`│`,`▼`,`Write to Report File`,`│`,`▼`,`Close File`,"```",`---`],why:[],applications:[],questions:[],recommendation:``,extraContext:[{title:`Simple Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Layer   Pitch   Min_Spacing   Min_Width   Direction   Min_Area</span></p><p class="my-1"><span >M1      0.08    0.04          0.04        Horizontal  0.0016</span></p><p class="my-1"><span >M2      0.08    0.04          0.04        Vertical    0.0016</span></p><p class="my-1"><span >M3      0.12    0.06          0.06        Horizontal  0.0036</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >---</span></p>'}]},{id:`fc_script_21`,part:1,toolName:`FC Tool`,index:21,title:`Report Port Slack and First Net Length`,objective:`<span >This script collects a set of input/output ports, extracts the first connected net length and timing slack for each port, and writes the information into a report file. It is useful for timing correlation, long-net analysis, port optimization, and routing debug.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Open report file
set report_file [open "port_net_length_report.txt" w]
# Collect target ports
set ports [get_object_name [get_ports <port_pattern>]]
foreach port $ports {
# Get first connected net length
set net_length \\
[get_attribute \\
[get_nets $port] \\
dr_length]
# Get worst slack associated with the port
set slack \\
[get_attribute \\
[get_timing_paths \\
-from [get_ports $port]] \\
slack]
# Write report
puts $report_file \\
"$port\\t$slack\\t$net_length"
}
# Close report file
close $report_file
puts "Port slack and net length report generated successfully."
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Open the report file for writing.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Collect the target ports.</span></p>`},{step:`Line 8`,code:``,explanation:`<p class="my-1"><span >Loop through each port.</span></p>`},{step:`Line 11`,code:``,explanation:`<p class="my-1"><span >Extract the routed net length connected to the port.</span></p>`},{step:`Line 16`,code:``,explanation:`<p class="my-1"><span >Extract timing slack associated with the port.</span></p>`},{step:`Line 22`,code:``,explanation:`<p class="my-1"><span >Write port name, slack, and net length into the report.</span></p>`},{step:`Line 27`,code:``,explanation:`<p class="my-1"><span >Close the report file.</span></p>`},{step:`Line 29`,code:``,explanation:`<p class="my-1"><span >Print completion message.</span></p>`}],flow:[],why:[],applications:[`<span >• Port timing analysis</span>`,`<span >• Long-net identification</span>`,`<span >• Routing optimization</span>`,`<span >• Timing closure debugging</span>`,`<span >• IO path correlation</span>`,`<span >• ECO investigation</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why correlate slack with net length?</span></p><p class="my-1"><span >Answer: Long nets often contribute to delay, transition degradation, and timing violations.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >What does dr_length represent?</span></p><p class="my-1"><span >Answer: It represents the routed physical length of a net.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why generate a port-level timing report?</span></p><p class="my-1"><span >Answer: It helps identify ports affected by excessive routing delay and poor timing.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >&lt;port_name_1&gt;    0.125    45.32</span></p><p class="my-1"><span >&lt;port_name_2&gt;   -0.018    72.41</span></p><p class="my-1"><span >&lt;port_name_3&gt;    0.356    28.77</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >Where:</span></p><p class="my-1"><span >- Column 1 → Port Name</span></p><p class="my-1"><span >- Column 2 → Slack (ns)</span></p><p class="my-1"><span >- Column 3 → Net Length (microns)</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_22`,part:1,toolName:`FC Tool`,index:22,title:`Generate Data Transition, Fanout, Slack, and Routing Layer Report`,objective:`<span >This script analyzes a list of nets and generates a detailed report containing driver information, reference cell type, fanout count, slack, and routing layer details. It is commonly used for transition debugging, fanout analysis, timing optimization, and routing investigation.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Remove old report if it exists
file delete -force tran_detail_info.rpt
# Initialize header flag
set header_written 0
# Net list to analyze
set nets [get_object_name [get_nets]]
foreach net $nets {
# Get driver cell
set driver_cell \\
[get_object_name \\
[get_cells -of_objects \\
[get_pins -of_objects [get_nets $net] \\
-filter "pin_direction == out"]]]
# Get driver reference cell
set reference_cell \\
[get_attribute \\
[get_cells $driver_cell] \\
ref_name]
# Calculate fanout
set fanout_count \\
[expr {[sizeof_collection [all_connected [get_nets $net]]] - 1}]
# Get routing information
set routing_layer \\
[get_attribute \\
[get_nets $net] \\
route_data_string]
# Skip clock nets
if {![get_attribute [get_nets $net] is_clock_network]} {
# Get worst slack through the net
set slack \\
[get_attribute \\
[get_timing_paths -through [get_nets $net]] \\
slack]
# Write report header
if {!$header_written} {
set report_file [open "tran_detail_info.rpt" w]
puts $report_file \\
"NET\\tDRIVER\\tREF_CELL\\tFANOUT\\tSLACK\\tROUTING_LAYER"
set header_written 1
}
# Write report data
puts $report_file \\
"$net\\t$driver_cell\\t$reference_cell\\t$fanout_count\\t$slack\\t$routing_layer"
} else {
puts "Skipping clock net: $net"
}
}
# Close report file
if {$header_written} {
close $report_file
}
puts "Transition detail report generated successfully."
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Delete any existing report file.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Initialize report header control.</span></p>`},{step:`Line 7`,code:``,explanation:`<p class="my-1"><span >Collect all nets for analysis.</span></p>`},{step:`Line 11`,code:``,explanation:`<p class="my-1"><span >Identify the driver cell of the net.</span></p>`},{step:`Line 19`,code:``,explanation:`<p class="my-1"><span >Extract the reference cell name.</span></p>`},{step:`Line 24`,code:``,explanation:`<p class="my-1"><span >Calculate net fanout.</span></p>`},{step:`Line 29`,code:``,explanation:`<p class="my-1"><span >Extract routing layer information.</span></p>`},{step:`Line 34`,code:``,explanation:`<p class="my-1"><span >Exclude clock nets from analysis.</span></p>`},{step:`Line 39`,code:``,explanation:`<p class="my-1"><span >Collect worst slack through the net.</span></p>`},{step:`Line 46`,code:``,explanation:`<p class="my-1"><span >Write report header once.</span></p>`},{step:`Line 56`,code:``,explanation:`<p class="my-1"><span >Write net details into the report.</span></p>`},{step:`Line 68`,code:``,explanation:`<p class="my-1"><span >Close the report file.</span></p>`}],flow:[],why:[],applications:[`<span >• Transition violation analysis</span>`,`<span >• High fanout net investigation</span>`,`<span >• Routing congestion debugging</span>`,`<span >• Timing path optimization</span>`,`<span >• ECO candidate identification</span>`,`<span >• Physical Design signoff checks</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why are clock nets excluded from this report?</span></p><p class="my-1"><span >Answer: Clock nets require separate CTS-specific analysis and can skew transition statistics.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >Why is fanout important in timing analysis?</span></p><p class="my-1"><span >Answer: High fanout increases load, transition, and delay, potentially causing timing violations.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >What is the benefit of reporting routing layers?</span></p><p class="my-1"><span >Answer: It helps correlate timing issues with routing resources and layer usage.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >NET            DRIVER_CELL      REF_CELL      FANOUT    SLACK     ROUTING_LAYER</span></p><p class="my-1"><span >&lt;net_name_1&gt;   &lt;instance_1&gt;     BUF_X4        12        0.125     M3 M4 M5</span></p><p class="my-1"><span >&lt;net_name_2&gt;   &lt;instance_2&gt;     INV_X2        18       -0.042     M4 M5 M6</span></p><p class="my-1"><span >&lt;net_name_3&gt;   &lt;instance_3&gt;     NAND2_X1      6         0.089     M2 M3</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_23`,part:1,toolName:`FC Tool`,index:23,title:`Clock Gating Cell Slack Check`,objective:`<span >This script analyzes the fanout endpoints driven by a clock gating cell and reports the timing slack associated with those endpoints. It is useful for CTS debugging, clock quality analysis, and identifying timing-critical registers driven by clock gating logic.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Procedure to report timing slack of endpoints driven by a clock gating cell
proc report_clock_gating_slack {clock_gating_cell} {
# Get all endpoint cells driven by the clock gating cell
set endpoint_cells [all_fanout \\
-from $clock_gating_cell \\
-only_cells \\
-flat \\
-endpoints_only]
foreach_in_collection endpoint_cell $endpoint_cells {
set endpoint_name [get_object_name $endpoint_cell]
# Get worst setup path ending at this endpoint
set setup_path [get_timing_paths \\
-to $endpoint_cell \\
-max_paths 1]
# Get worst launch path starting from this endpoint
set launch_path [get_timing_paths \\
-from $endpoint_cell \\
-max_paths 1]
set setup_slack \xA0[get_attribute $setup_path slack]
set launch_slack [get_attribute $launch_path slack]
puts "$endpoint_name : Launch_Slack = $launch_slack , Setup_Slack = $setup_slack"
}
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Creates a reusable procedure.</span></p>`},{step:`Line 4-8`,code:``,explanation:`<p class="my-1"><span >Collects all endpoint cells driven by the clock gating cell.</span></p>`},{step:`Line 10`,code:``,explanation:`<p class="my-1"><span >Loops through each endpoint.</span></p>`},{step:`Line 12`,code:``,explanation:`<p class="my-1"><span >Gets endpoint cell name.</span></p>`},{step:`Line 15-18`,code:``,explanation:`<p class="my-1"><span >Extracts worst timing path ending at the endpoint.</span></p>`},{step:`Line 21-24`,code:``,explanation:`<p class="my-1"><span >Extracts worst timing path starting from the endpoint.</span></p>`},{step:`Line 26-27`,code:``,explanation:`<p class="my-1"><span >Reads slack values.</span></p>`},{step:`Line 29`,code:``,explanation:`<p class="my-1"><span >Prints endpoint name along with launch and setup slack.</span></p>`}],flow:[],why:[],applications:[`<span >• Clock gating timing analysis</span>`,`<span >• CTS quality verification</span>`,`<span >• Debugging clock-gating induced timing issues</span>`,`<span >• Endpoint slack screening</span>`,`<span >• Timing closure support</span>`,`<span >• Clock network health analysis</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1: Why check slack around clock gating cells?`,answer:`<p class="my-1"><span >To identify timing issues introduced by gated clock structures.</span></p>`},{question:"Q2: What does `all_fanout -endpoints_only` return?",answer:`<p class="my-1"><span >All endpoint cells reachable from the specified source.</span></p>`},{question:`Q3: Why collect both launch and setup slack?`,answer:`<p class="my-1"><span >To understand timing quality from both source and destination perspectives.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >&lt;endpoint_cell_1&gt; : Launch_Slack = 0.145 , Setup_Slack = 0.382</span></p><p class="my-1"><span >&lt;endpoint_cell_2&gt; : Launch_Slack = -0.012 , Setup_Slack = 0.218</span></p><p class="my-1"><span >&lt;endpoint_cell_3&gt; : Launch_Slack = 0.081 , Setup_Slack = 0.427</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_24`,part:1,toolName:`FC Tool`,index:24,title:`DRC Floating Shape Identification and Removal Preparation`,objective:`<span >This script extracts DRC error bounding boxes, searches for floating routing shapes within those regions, and generates a list of candidate shapes for cleanup. It is commonly used during routing closure and DRC fixing activities.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Open output file
set report_file [open "floating_shapes.rpt" w]
# Collect DRC error bounding boxes
set error_bboxes [get_attribute \\
[get_drc_errors -error_data <drc_error_file>] \\
bbox]
foreach bbox $error_bboxes {
# Extract coordinates
set llx [lindex $bbox 0 0]
set lly [lindex $bbox 0 1]
set urx [lindex $bbox 1 0]
set ury [lindex $bbox 1 1]
# Create search boundary
set search_bbox [list "$llx $lly" "$urx $ury"]
# Find shapes inside DRC region
set shapes [get_object_name \\
[get_shapes \\
[get_objects_by_location \\
-classes {shape} \\
-within $search_bbox] \\
-filter "net_type == ground && layer_name == <routing_layer>"]]
# Write shapes to report
puts $report_file $shapes
}
close $report_file
puts "Floating shape report generated successfully."
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Opens report file for writing.</span></p>`},{step:`Line 4-6`,code:``,explanation:`<p class="my-1"><span >Collects DRC violation bounding boxes.</span></p>`},{step:`Line 8`,code:``,explanation:`<p class="my-1"><span >Loops through each DRC violation.</span></p>`},{step:`Line 11-14`,code:``,explanation:`<p class="my-1"><span >Extracts lower-left and upper-right coordinates.</span></p>`},{step:`Line 17`,code:``,explanation:`<p class="my-1"><span >Creates search boundary box.</span></p>`},{step:`Line 20-25`,code:``,explanation:`<p class="my-1"><span >Finds routing shapes located inside the violation area.</span></p>`},{step:`Line 28`,code:``,explanation:`<p class="my-1"><span >Writes shape information into report.</span></p>`},{step:`Line 31`,code:``,explanation:`<p class="my-1"><span >Closes report file.</span></p>`},{step:`Line 33`,code:``,explanation:`<p class="my-1"><span >Prints completion message.</span></p>`}],flow:[],why:[],applications:[`<span >• Floating metal cleanup</span>`,`<span >• DRC violation debugging</span>`,`<span >• Routing closure automation</span>`,`<span >• Shape identification around violation regions</span>`,`<span >• ECO routing verification</span>`,`<span >• Physical verification support</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1: What is a floating shape in Physical Design?`,answer:`<p class="my-1"><span >A routing shape that is not electrically connected to the intended net.</span></p>`},{question:`Q2: Why use DRC bounding boxes for shape analysis?`,answer:`<p class="my-1"><span >It limits the search area to the exact violation region.</span></p>`},{question:"Q3: What is the purpose of `get_objects_by_location`?",answer:`<p class="my-1"><span >It retrieves design objects present within a specified physical area.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >&lt;shape_id_001&gt;</span></p><p class="my-1"><span >&lt;shape_id_002&gt;</span></p><p class="my-1"><span >&lt;shape_id_003&gt;</span></p><p class="my-1"><span >&lt;shape_id_004&gt;</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`fc_script_25`,part:1,toolName:`FC Tool`,index:25,title:`Generate Path Margin Constraints Based on Port Slack`,objective:`<span >This script analyzes specified ports, checks their timing slack, and automatically generates path margin constraints for ports that meet the slack criteria. It helps create path margin commands for timing budgeting and ECO planning.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Open output file
set report_file [open "path_margin_output.txt" w]
# Define target ports
set port_list [get_object_name [get_ports <port_pattern>*]]
foreach port $port_list {
set direction [get_attribute [get_ports $port] direction]
if {$direction eq "in"} {
set slack [get_attribute \\
[get_timing_paths -from [get_ports $port] -max_paths 1] \\
slack]
if {$slack > -10.0} {
puts $report_file \\
"set_path_margin 30 -from [get_ports $port]"
}
} elseif {$direction eq "out"} {
set slack [get_attribute \\
[get_timing_paths -to [get_ports $port] -max_paths 1] \\
slack]
if {$slack > -10.0} {
puts $report_file \\
"set_path_margin 30 -to [get_ports $port]"
}
} else {
puts "Skipping invalid port: $port"
}
}
close $report_file
puts "Path margin constraint file generated successfully."
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Opens output report file.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Collects ports matching the required pattern.</span></p>`},{step:`Line 6`,code:``,explanation:`<p class="my-1"><span >Iterates through each port.</span></p>`},{step:`Line 8`,code:``,explanation:`<p class="my-1"><span >Gets port direction.</span></p>`},{step:`Line 12-15`,code:``,explanation:`<p class="my-1"><span >Checks slack for input port paths.</span></p>`},{step:`Line 17-19`,code:``,explanation:`<p class="my-1"><span >Writes path margin command for qualifying input ports.</span></p>`},{step:`Line 23-26`,code:``,explanation:`<p class="my-1"><span >Checks slack for output port paths.</span></p>`},{step:`Line 28-30`,code:``,explanation:`<p class="my-1"><span >Writes path margin command for qualifying output ports.</span></p>`},{step:`Line 34`,code:``,explanation:`<p class="my-1"><span >Handles invalid objects.</span></p>`},{step:`Line 38`,code:``,explanation:`<p class="my-1"><span >Closes report file.</span></p>`},{step:`Line 40`,code:``,explanation:`<p class="my-1"><span >Prints completion message.</span></p>`}],flow:[],why:[],applications:[`<span >• Timing budgeting</span>`,`<span >• ECO preparation</span>`,`<span >• Path margin generation</span>`,`<span >• STA constraint automation</span>`,`<span >• MMMC scenario tuning</span>`,`<span >• Timing closure support</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1: What is path margin used for?`,answer:`<p class="my-1"><span >Path margin artificially tightens timing requirements for robustness and budgeting.</span></p>`},{question:`Q2: Why check slack before applying path margin?`,answer:`<p class="my-1"><span >To avoid creating unrealistic timing constraints on already critical paths.</span></p>`},{question:"Q3: What is the difference between `-from` and `-to` path margins?",answer:'<p class="my-1"><span >`-from` applies on launch-side paths, while `-to` applies on capture-side paths.</span></p><p class="my-1"><span >INNOVUS SCRIPT</span></p>'}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```tcl</span></p><p class="my-1"><span >set_path_margin 30 -from &lt;input_port_1&gt;</span></p><p class="my-1"><span >set_path_margin 30 -from &lt;input_port_2&gt;</span></p><p class="my-1"><span >set_path_margin 30 -to &lt;output_port_1&gt;</span></p><p class="my-1"><span >set_path_margin 30 -to &lt;output_port_2&gt;</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`innovus_script_1`,part:2,toolName:`INNOVUS Tool`,index:1,title:`Automated Hold Violation Fixing Using Bottleneck Analysis`,objective:`<span >This script performs automated hold fixing by identifying bottleneck points from a timing debug report, analyzing violating paths through those bottlenecks, and inserting delay cells or buffers based on hold slack severity. It is typically used during ECO timing closure to resolve hold violations while minimizing setup timing impact.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Load timing debug report
load_timing_debug_report timing_debug_report.mtarpt
# Generate bottleneck analysis report
analyze_paths_by_bottleneck \\
-max_slack 0 \\
-category 5 \\
> bottleneck_report.txt
# Open bottleneck report
set file_handle [open "bottleneck_report.txt" r]
while {[gets $file_handle line] >= 0} {
# Extract bottleneck object
set bottleneck_name [lindex $line 4]
# Remove bottleneck prefix
set bottleneck_point \\
[string map {"BOT_" ""} $bottleneck_name]
# Iterative hold fixing loop
for {set iteration 0} {$iteration < 100} {incr iteration} {
# Get worst violating startpoint
set startpoint_obj \\
[get_property \\
[report_timing \\
-collection \\
-early \\
-max_paths 1 \\
-max_slack 0 \\
-through $bottleneck_point] \\
startpoint]
set startpoint \\
[get_object_name $startpoint_obj]
# Convert clock pin to launch pin if required
set launch_pin \\
[string map {"CK" "Q"} $startpoint]
# Get hold slack
set hold_slack \\
[get_property \\
[report_timing \\
-collection \\
-early \\
-max_paths 1 \\
-max_slack 0 \\
-through $bottleneck_point] \\
slack]
# Get setup slack
set setup_slack \\
[get_property \\
[report_timing \\
-collection \\
-max_paths 1 \\
-through $bottleneck_point] \\
slack]
# Stop fixing if setup becomes negative
if {$setup_slack <= 0} {
break
}
# Severe hold violation
if {$hold_slack <= -0.050} {
add_repeater -term $launch_pin \\
-cell <buffer_cell>
add_repeater -term $launch_pin \\
-cell <delay_cell>
add_repeater -term $launch_pin \\
-cell <buffer_cell>
# Moderate hold violation
} elseif {$hold_slack <= -0.002} {
add_repeater -term $launch_pin \\
-cell <delay_cell>
} else {
puts "Hold violation fixed on $launch_pin"
break
}
}
}
close $file_handle
# Regenerate timing database
report_timing \\
-machine_readable \\
-early \\
-max_paths 10000 \\
-max_slack 0.75 \\
-path_exceptions all \\
> timing_debug_report.mtarpt
# Reload updated timing report
load_timing_debug_report timing_debug_report.mtarpt
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Load the machine-readable timing report.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Generate bottleneck analysis for violating paths.</span></p>`},{step:`Line 10`,code:``,explanation:`<p class="my-1"><span >Open the bottleneck report.</span></p>`},{step:`Line 14`,code:``,explanation:`<p class="my-1"><span >Read bottleneck entries one by one.</span></p>`},{step:`Line 18`,code:``,explanation:`<p class="my-1"><span >Remove the bottleneck prefix from the object name.</span></p>`},{step:`Line 23`,code:``,explanation:`<p class="my-1"><span >Start iterative hold-fixing loop.</span></p>`},{step:`Line 27`,code:``,explanation:`<p class="my-1"><span >Find the worst violating path through the bottleneck.</span></p>`},{step:`Line 39`,code:``,explanation:`<p class="my-1"><span >Convert clock pin reference to launch pin.</span></p>`},{step:`Line 43`,code:``,explanation:`<p class="my-1"><span >Extract hold slack.</span></p>`},{step:`Line 53`,code:``,explanation:`<p class="my-1"><span >Extract setup slack.</span></p>`},{step:`Line 63`,code:``,explanation:`<p class="my-1"><span >Prevent setup timing degradation.</span></p>`},{step:`Line 68`,code:``,explanation:`<p class="my-1"><span >Insert multiple delay elements for severe violations.</span></p>`},{step:`Line 78`,code:``,explanation:`<p class="my-1"><span >Insert a single delay element for moderate violations.</span></p>`},{step:`Line 84`,code:``,explanation:`<p class="my-1"><span >Exit when violation is fixed.</span></p>`},{step:`Line 93`,code:``,explanation:`<p class="my-1"><span >Close report file.</span></p>`},{step:`Line 96`,code:``,explanation:`<p class="my-1"><span >Generate updated timing report.</span></p>`},{step:`Line 105`,code:``,explanation:`<p class="my-1"><span >Reload timing database.</span></p>`}],flow:[],why:[],applications:[`<span >• Automated hold fixing</span>`,`<span >• ECO timing closure</span>`,`<span >• Bottleneck-based optimization</span>`,`<span >• Delay cell insertion automation</span>`,`<span >• Large-scale hold violation cleanup</span>`,`<span >• MCMM timing convergence</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why is bottleneck analysis useful for hold fixing?</span></p><p class="my-1"><span >Answer: It identifies common timing points affecting multiple violating paths, enabling efficient fixes.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >Why check setup slack before adding delay cells?</span></p><p class="my-1"><span >Answer: Excessive delay insertion can create setup violations.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why use add_repeater for hold fixing?</span></p><p class="my-1"><span >Answer: Buffers and delay cells increase data path delay, helping eliminate hold violations.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``}]},{id:`innovus_script_2`,part:2,toolName:`INNOVUS Tool`,index:2,title:`Apply False Paths on Clock Gating Cells`,objective:`<span >This script identifies clock gating cells in the design and applies false path constraints to prevent unnecessary timing analysis through clock gating logic. It is commonly used in STA constraint cleanup and clock network timing optimization.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Get all clock gating cells
set clock_gating_cells \\
[get_cells -hierarchical \\
-filter "is_clock_gating_check == true"]
foreach cell $clock_gating_cells {
# Verify cell is combinational
set is_combinational \\
[get_property $cell is_combinational]
if {$is_combinational} {
# Apply false path to clock gating cell
set_false_path -to $cell
} else {
puts "[get_object_name $cell] is not a valid clock gating cell"
}
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Collect all clock gating cells in the design.</span></p>`},{step:`Line 5`,code:``,explanation:`<p class="my-1"><span >Loop through each clock gating cell.</span></p>`},{step:`Line 9`,code:``,explanation:`<p class="my-1"><span >Check whether the cell is combinational.</span></p>`},{step:`Line 13`,code:``,explanation:`<p class="my-1"><span >Apply a false path constraint to the cell.</span></p>`},{step:`Line 17`,code:``,explanation:`<p class="my-1"><span >Print a message if the object is not eligible.</span></p>`}],flow:[],why:[],applications:[`<span >• Clock gating STA setup</span>`,`<span >• Constraint development</span>`,`<span >• Clock network optimization</span>`,`<span >• Timing exception management</span>`,`<span >• MMMC constraint validation</span>`,`<span >• Signoff STA preparation</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why are false paths applied on clock gating logic?</span></p><p class="my-1"><span >Answer: To prevent non-functional timing paths from affecting STA results.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >What is the purpose of is_clock_gating_check?</span></p><p class="my-1"><span >Answer: It identifies cells participating in clock gating checks.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why verify is_combinational before applying false paths?</span></p><p class="my-1"><span >Answer: Clock gating logic is typically combinational and sequential cells should not be constrained this way.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Clock gating false paths applied successfully.</span></p><p class="my-1"><span >OR</span></p><p class="my-1"><span >&lt;cell_name&gt; is not a valid clock gating cell</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`innovus_script_3`,part:2,toolName:`INNOVUS Tool`,index:3,title:`Automated Hold Violation Fixing Based on Endpoint Analysis`,objective:`<span >This script identifies hold-violating endpoints, evaluates both hold and setup slack for each endpoint, and automatically inserts delay cells or buffers near the sink pin. It is commonly used during ECO timing closure to resolve endpoint-based hold violations while protecting setup timing.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Multiple optimization iterations
for {set iteration 1} {$iteration <= 10} {incr iteration} {
# Collect violating endpoints
set endpoints \\
[get_object_name \\
[get_property \\
[report_timing \\
-collection \\
-early \\
-max_slack 0 \\
-max_paths 1000000] \\
endpoint]]
foreach endpoint $endpoints {
# Get hold slack
set hold_slack \\
[get_property \\
[report_timing \\
-collection \\
-early \\
-to $endpoint] \\
slack]
# Get setup slack
set setup_slack \\
[get_property \\
[report_timing \\
-collection \\
-to $endpoint] \\
slack]
# Fix only when hold violates and setup is clean
if {$hold_slack < 0 && $setup_slack > 0} {
# Severe hold violation
if {$hold_slack >= -1.295 && $hold_slack <= -0.020} {
add_repeater \\
-term $endpoint \\
-cell <buffer_cell_small> \\
-relativeDistToSink 1
add_repeater \\
-term $endpoint \\
-cell <delay_cell_large> \\
-relativeDistToSink 1
add_repeater \\
-term $endpoint \\
-cell <buffer_cell_small> \\
-relativeDistToSink 1
# Mild hold violation
} elseif {$hold_slack > -0.020 && $hold_slack < 0} {
add_repeater \\
-term $endpoint \\
-cell <buffer_cell_medium> \\
-relativeDistToSink 1
} else {
puts "No hold violation found on $endpoint"
}
}
}
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Start iterative hold-fixing loop.</span></p>`},{step:`Line 5`,code:``,explanation:`<p class="my-1"><span >Collect all hold-violating endpoints.</span></p>`},{step:`Line 14`,code:``,explanation:`<p class="my-1"><span >Loop through each endpoint.</span></p>`},{step:`Line 17`,code:``,explanation:`<p class="my-1"><span >Extract hold slack for the endpoint.</span></p>`},{step:`Line 25`,code:``,explanation:`<p class="my-1"><span >Extract setup slack for the endpoint.</span></p>`},{step:`Line 33`,code:``,explanation:`<p class="my-1"><span >Ensure hold violation exists and setup timing is positive.</span></p>`},{step:`Line 38`,code:``,explanation:`<p class="my-1"><span >Identify severe hold violations.</span></p>`},{step:`Line 40-50`,code:``,explanation:`<p class="my-1"><span >Insert buffer-delay-buffer structure near the sink.</span></p>`},{step:`Line 54`,code:``,explanation:`<p class="my-1"><span >Identify mild hold violations.</span></p>`},{step:`Line 57`,code:``,explanation:`<p class="my-1"><span >Insert a smaller delay element near the sink.</span></p>`},{step:`Line 63`,code:``,explanation:`<p class="my-1"><span >Print message when no violation exists.</span></p>`}],flow:[],why:[],applications:[`<span >• Endpoint-based hold fixing</span>`,`<span >• ECO timing closure</span>`,`<span >• Automated delay insertion</span>`,`<span >• Hold optimization near sinks</span>`,`<span >• MCMM timing convergence</span>`,`<span >• Late-stage signoff timing fixes</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why is -relativeDistToSink 1 used during hold fixing?</span></p><p class="my-1"><span >Answer: It places delay cells close to the endpoint where hold impact is most effective.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >Why check setup slack before inserting delay cells?</span></p><p class="my-1"><span >Answer: Delay insertion can degrade setup timing and create new setup violations.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why perform multiple iterations for hold fixing?</span></p><p class="my-1"><span >Answer: One delay insertion can change timing characteristics of other paths, requiring re-analysis.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Iteration 1:</span></p><p class="my-1"><span >Added delay cells on violating endpoints</span></p><p class="my-1"><span >Iteration 2:</span></p><p class="my-1"><span >Remaining hold violations reduced</span></p><p class="my-1"><span >Iteration 3:</span></p><p class="my-1"><span >All targeted hold violations fixed</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`innovus_script_4`,part:2,toolName:`INNOVUS Tool`,index:4,title:`Automatic Multicycle Path Constraint Generation Between Different Clocks`,objective:`<span >This script analyzes all clock pairs in the design, compares their clock periods, checks whether timing paths exist between them, and automatically applies setup and hold multicycle path constraints. It is useful for STA constraint generation in designs containing multiple asynchronous or frequency-related clock domains.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Collect all clocks
set clocks [get_object_name [get_clocks]]
foreach source_clock $clocks {
set source_period \\
[get_property [get_clocks $source_clock] period]
foreach destination_clock $clocks {
# Skip self-comparison
if {$source_clock eq $destination_clock} {
continue
}
set destination_period \\
[get_property [get_clocks $destination_clock] period]
# Validate clock periods
if {![string is double -strict $source_period] ||
![string is double -strict $destination_period]} {
puts "Invalid clock period detected"
continue
}
# Check whether timing paths exist
set timing_paths \\
[get_property \\
[report_timing \\
-collection \\
-clock_from $source_clock \\
-clock_to $destination_clock] \\
slack]
if {[llength $timing_paths] == 0} {
puts "No timing path exists between \\
$source_clock and $destination_clock"
continue
}
# Source clock slower than destination clock
if {$source_period > $destination_period} {
set setup_multiplier \\
[expr {int($source_period / $destination_period)}]
set hold_multiplier \\
[expr {$setup_multiplier - 1}]
set_multicycle_path \\
-from [get_clocks $source_clock] \\
-to \xA0 [get_clocks $destination_clock] \\
-setup $setup_multiplier \\
-end
set_multicycle_path \\
-from [get_clocks $source_clock] \\
-to \xA0 [get_clocks $destination_clock] \\
-hold $hold_multiplier \\
-end
puts "Applied MCP between \\
$source_clock and $destination_clock \\
(Setup=$setup_multiplier Hold=$hold_multiplier End)"
# Source clock faster than destination clock
} elseif {$source_period < $destination_period} {
set setup_multiplier \\
[expr {int($destination_period / $source_period)}]
set hold_multiplier \\
[expr {$setup_multiplier - 1}]
set_multicycle_path \\
-from [get_clocks $source_clock] \\
-to \xA0 [get_clocks $destination_clock] \\
-setup $setup_multiplier \\
-start
set_multicycle_path \\
-from [get_clocks $source_clock] \\
-to \xA0 [get_clocks $destination_clock] \\
-hold $hold_multiplier \\
-start
puts "Applied MCP between \\
$source_clock and $destination_clock \\
(Setup=$setup_multiplier Hold=$hold_multiplier Start)"
}
}
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Collect all clocks in the design.</span></p>`},{step:`Line 5`,code:``,explanation:`<p class="my-1"><span >Loop through source clocks.</span></p>`},{step:`Line 10`,code:``,explanation:`<p class="my-1"><span >Loop through destination clocks.</span></p>`},{step:`Line 13`,code:``,explanation:`<p class="my-1"><span >Skip comparison with the same clock.</span></p>`},{step:`Line 19`,code:``,explanation:`<p class="my-1"><span >Read destination clock period.</span></p>`},{step:`Line 23`,code:``,explanation:`<p class="my-1"><span >Validate clock period values.</span></p>`},{step:`Line 31`,code:``,explanation:`<p class="my-1"><span >Check whether timing paths exist between clock domains.</span></p>`},{step:`Line 42`,code:``,explanation:`<p class="my-1"><span >Handle slower-to-faster clock crossings.</span></p>`},{step:`Line 46`,code:``,explanation:`<p class="my-1"><span >Calculate setup multicycle value.</span></p>`},{step:`Line 50`,code:``,explanation:`<p class="my-1"><span >Calculate hold multicycle value.</span></p>`},{step:`Line 53`,code:``,explanation:`<p class="my-1"><span >Apply setup multicycle constraint using endpoint reference.</span></p>`},{step:`Line 60`,code:``,explanation:`<p class="my-1"><span >Apply hold multicycle constraint.</span></p>`},{step:`Line 71`,code:``,explanation:`<p class="my-1"><span >Handle faster-to-slower clock crossings.</span></p>`},{step:`Line 75`,code:``,explanation:`<p class="my-1"><span >Calculate setup multicycle value.</span></p>`},{step:`Line 79`,code:``,explanation:`<p class="my-1"><span >Calculate hold multicycle value.</span></p>`},{step:`Line 82`,code:``,explanation:`<p class="my-1"><span >Apply setup multicycle constraint using launch reference.</span></p>`},{step:`Line 89`,code:``,explanation:`<p class="my-1"><span >Apply hold multicycle constraint.</span></p>`}],flow:[],why:[],applications:[`<span >• Multicycle path automation</span>`,`<span >• MMMC constraint generation</span>`,`<span >• Multi-clock STA setup</span>`,`<span >• Cross-domain timing analysis</span>`,`<span >• Constraint validation and cleanup</span>`,`<span >• Signoff STA preparation</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why is hold MCP usually equal to setup MCP minus one?</span></p><p class="my-1"><span >Answer: To maintain proper hold checking after setup multicycle relaxation.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >When should -start be used in a multicycle constraint?</span></p><p class="my-1"><span >Answer: When the launch clock is faster than the capture clock.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why verify timing paths before applying MCP constraints?</span></p><p class="my-1"><span >Answer: Applying MCP on non-existent paths creates unnecessary and incorrect constraints.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Applied MCP between CLK_A and CLK_B</span></p><p class="my-1"><span >(Setup=4 Hold=3 End)</span></p><p class="my-1"><span >Applied MCP between CLK_C and CLK_D</span></p><p class="my-1"><span >(Setup=2 Hold=1 Start)</span></p><p class="my-1"><span >No timing path exists between CLK_E and CLK_F</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`innovus_script_5`,part:2,toolName:`INNOVUS Tool`,index:5,title:`Flip-Flop Bypass Using Net Reconnection`,objective:`<span >This script bypasses a selected flip-flop by disconnecting its input/output connectivity and directly connecting the launch register output to the capture logic input. It is commonly used during ECO implementation, logic simplification, timing experiments, and functional debug activities.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Target flip-flop to be bypassed
set target_flop <flip_flop_instance>
# Identify launch register driving the target flop
set launch_register \\
[get_object_name \\
[get_cells -of_objects \\
[get_property \\
[report_timing \\
-path_group <path_group_name> \\
-to "$target_flop/D" \\
-collection] \\
startpoint]]]
# Get launch register output net
set launch_net \\
[get_object_name \\
[get_nets -of_objects \\
[get_pins -of_objects $launch_register \\
-filter "direction == out"]]]
# Disconnect launch register output
detachTerm $launch_register Q $launch_net
# Identify capture register driven by target flop
set capture_register \\
[get_object_name \\
[get_cells -of_objects \\
[get_property \\
[report_timing \\
-path_group <path_group_name> \\
-from "$target_flop/CK" \\
-collection] \\
endpoint]]]
# Get capture register input net
set capture_net \\
[get_object_name \\
[get_nets -of_objects "$capture_register/D"]]
# Find driver cell of capture net
set driver_cell \\
[get_object_name \\
[get_cells -of_objects \\
[get_pins -of_objects $capture_net \\
-filter "direction == out"]]]
# Disconnect existing driver
detachTerm $driver_cell Y $capture_net
# Connect launch register directly to capture net
attachTerm $launch_register Q $capture_net
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Specify the flip-flop instance to be bypassed.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Identify the launch register driving the target flop.</span></p>`},{step:`Line 15`,code:``,explanation:`<p class="my-1"><span >Extract the output net of the launch register.</span></p>`},{step:`Line 22`,code:``,explanation:`<p class="my-1"><span >Disconnect the launch register output from its current net.</span></p>`},{step:`Line 25`,code:``,explanation:`<p class="my-1"><span >Identify the capture register receiving data through the target flop.</span></p>`},{step:`Line 36`,code:``,explanation:`<p class="my-1"><span >Get the capture register input net.</span></p>`},{step:`Line 41`,code:``,explanation:`<p class="my-1"><span >Identify the existing driver of the capture net.</span></p>`},{step:`Line 49`,code:``,explanation:`<p class="my-1"><span >Disconnect the existing driver.</span></p>`},{step:`Line 52`,code:``,explanation:`<p class="my-1"><span >Reconnect the launch register output directly to the capture net.</span></p>`}],flow:[],why:[],applications:[`<span >• ECO implementation</span>`,`<span >• Logic simplification</span>`,`<span >• Timing path experimentation</span>`,`<span >• Register removal ECOs</span>`,`<span >• Functional debug</span>`,`<span >• Netlist connectivity modification</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why would a flip-flop be bypassed during an ECO?</span></p><p class="my-1"><span >Answer: To remove an unnecessary pipeline stage or simplify a timing path.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >What is the purpose of detachTerm?</span></p><p class="my-1"><span >Answer: It disconnects a pin from its associated net.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >What is the purpose of attachTerm?</span></p><p class="my-1"><span >Answer: It creates a new logical connection between a pin and a net.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``}]},{id:`innovus_script_6`,part:2,toolName:`INNOVUS Tool`,index:6,title:`Generate Clock Skew Histogram Report`,objective:`<span >This script collects clock skew values for all sequential cells, stores the skew data into a report file, and categorizes the skew values into predefined ranges. It is commonly used for CTS quality analysis, clock-tree debugging, skew distribution studies, and signoff timing assessment.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Open skew report file
set report_file [open "skew_report.txt" w]
# Collect sequential cells
set registers \\
[get_object_name \\
[get_cells -hierarchical \\
-filter "is_sequential == true"]]
# Store skew values
set skew_values {}
foreach register $registers {
set skew \\
[get_property \\
[report_timing \\
-to $register \\
-collection] \\
skew]
lappend skew_values $skew
}
# Write skew values to file
puts $report_file $skew_values
close $report_file
# Initialize histogram bins
set skew_gt_100ps \xA0 \xA0 \xA00
set skew_70_100ps \xA0 \xA0 \xA00
set skew_40_70ps \xA0 \xA0 \xA0 0
set skew_0_40ps \xA0 \xA0 \xA0 \xA00
set skew_neg20_0ps \xA0 \xA0 0
set skew_neg50_neg20ps 0
set skew_neg100_neg50ps 0
set skew_outliers \xA0 \xA0 \xA00
# Categorize skew values
foreach skew $skew_values {
if {$skew < 0.300 && $skew >= 0.100} {
incr skew_gt_100ps
} elseif {$skew < 0.100 && $skew >= 0.070} {
incr skew_70_100ps
} elseif {$skew < 0.070 && $skew >= 0.040} {
incr skew_40_70ps
} elseif {$skew < 0.040 && $skew >= 0.000} {
incr skew_0_40ps
} elseif {$skew < 0.000 && $skew >= -0.020} {
incr skew_neg20_0ps
} elseif {$skew < -0.020 && $skew >= -0.050} {
incr skew_neg50_neg20ps
} elseif {$skew < -0.050 && $skew >= -0.100} {
incr skew_neg100_neg50ps
} else {
incr skew_outliers
}
}
# Print histogram summary
puts "100ps to 300ps \xA0 : $skew_gt_100ps"
puts "70ps \xA0to 100ps \xA0 : $skew_70_100ps"
puts "40ps \xA0to 70ps \xA0 \xA0: $skew_40_70ps"
puts "0ps \xA0 to 40ps \xA0 \xA0: $skew_0_40ps"
puts "-20ps to 0ps \xA0 \xA0 : $skew_neg20_0ps"
puts "-50ps to -20ps \xA0 : $skew_neg50_neg20ps"
puts "-100ps to -50ps \xA0: $skew_neg100_neg50ps"
puts "Outliers \xA0 \xA0 \xA0 \xA0 : $skew_outliers"
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Open the skew report file.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Collect all sequential cells.</span></p>`},{step:`Line 10`,code:``,explanation:`<p class="my-1"><span >Initialize skew storage list.</span></p>`},{step:`Line 14`,code:``,explanation:`<p class="my-1"><span >Loop through each register.</span></p>`},{step:`Line 17`,code:``,explanation:`<p class="my-1"><span >Extract skew value from timing report.</span></p>`},{step:`Line 22`,code:``,explanation:`<p class="my-1"><span >Store skew value in a list.</span></p>`},{step:`Line 26`,code:``,explanation:`<p class="my-1"><span >Write skew values into the report file.</span></p>`},{step:`Line 30`,code:``,explanation:`<p class="my-1"><span >Initialize histogram counters.</span></p>`},{step:`Line 41`,code:``,explanation:`<p class="my-1"><span >Start skew classification.</span></p>`},{step:`Line 43-67`,code:``,explanation:`<p class="my-1"><span >Group skew values into predefined ranges.</span></p>`},{step:`Line 72`,code:``,explanation:`<p class="my-1"><span >Print histogram summary.</span></p>`}],flow:[],why:[],applications:[`<span >• CTS quality analysis</span>`,`<span >• Clock skew distribution reporting</span>`,`<span >• Signoff timing assessment</span>`,`<span >• Clock tree optimization</span>`,`<span >• Skew hotspot identification</span>`,`<span >• CTS debugging and validation</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why is clock skew histogram analysis important after CTS?</span></p><p class="my-1"><span >Answer: It helps identify skew distribution and clock tree quality across the design.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >What does negative skew indicate?</span></p><p class="my-1"><span >Answer: The capture clock arrives earlier than the launch clock.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why categorize skew into ranges instead of reporting individual values?</span></p><p class="my-1"><span >Answer: Histogram bins provide a quick statistical view of overall CTS performance.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >100ps to 300ps   : 125</span></p><p class="my-1"><span >70ps  to 100ps   : 342</span></p><p class="my-1"><span >40ps  to 70ps    : 1150</span></p><p class="my-1"><span >0ps   to 40ps    : 7842</span></p><p class="my-1"><span >-20ps to 0ps     : 630</span></p><p class="my-1"><span >-50ps to -20ps   : 95</span></p><p class="my-1"><span >-100ps to -50ps  : 12</span></p><p class="my-1"><span >Outliers         : 3</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]},{id:`innovus_script_7`,part:2,toolName:`INNOVUS Tool`,index:7,title:`Identify Long Nets and Insert Antenna Protection Diodes`,objective:`<span >This script calculates routed net lengths using Innovus database commands, identifies nets exceeding a specified length threshold, and automatically inserts antenna protection diodes on connected pins. It is useful for antenna prevention, long-net analysis, routing quality checks, and post-route ECO automation.</span>
<span >------------------------------------------------------------------------------</span>`,code:`# Define net length threshold (microns)
set length_threshold 50
# Collect all nets
set nets [get_object_name [get_nets]]
foreach net $nets {
# Get wire segment lengths
set wire_lengths \\
[dbGet \\
[dbGet -p top.nets.name $net].wires.length]
# Calculate total routed length
set total_length 0
foreach segment_length $wire_lengths {
set total_length \\
[expr {$total_length + $segment_length}]
}
# Process long nets
if {$total_length >= $length_threshold} {
puts "Net: $net"
puts "Total Length: $total_length microns"
# Get connected instances
set instances \\
[dbGet \\
[dbGet -p top.nets.name $net].instTerms.inst.name]
# Get connected pins
set pins \\
[dbGet \\
[dbGet -p top.nets.name $net].instTerms.cellTerm.name]
# Insert antenna diodes
foreach instance $instances {
foreach pin $pins {
attachDiode \\
-diodeCell <antenna_diode_cell> \\
-pin $instance $pin
}
}
puts "Antenna diode inserted on $net"
}
}
\`\`\`
------------------------------------------------------------------------------`,explanations:[{step:`Line 1`,code:``,explanation:`<p class="my-1"><span >Define the net length threshold.</span></p>`},{step:`Line 4`,code:``,explanation:`<p class="my-1"><span >Collect all nets in the design.</span></p>`},{step:`Line 8`,code:``,explanation:`<p class="my-1"><span >Get routed wire segment lengths for the net.</span></p>`},{step:`Line 15`,code:``,explanation:`<p class="my-1"><span >Initialize total length calculation.</span></p>`},{step:`Line 17`,code:``,explanation:`<p class="my-1"><span >Accumulate all wire segment lengths.</span></p>`},{step:`Line 23`,code:``,explanation:`<p class="my-1"><span >Check whether the net exceeds the threshold.</span></p>`},{step:`Line 29`,code:``,explanation:`<p class="my-1"><span >Collect connected instances.</span></p>`},{step:`Line 35`,code:``,explanation:`<p class="my-1"><span >Collect connected pins.</span></p>`},{step:`Line 41`,code:``,explanation:`<p class="my-1"><span >Loop through connected instances.</span></p>`},{step:`Line 43`,code:``,explanation:`<p class="my-1"><span >Loop through connected pins.</span></p>`},{step:`Line 45`,code:``,explanation:`<p class="my-1"><span >Insert antenna protection diode.</span></p>`},{step:`Line 50`,code:``,explanation:`<p class="my-1"><span >Print confirmation message.</span></p>`}],flow:[],why:[],applications:[`<span >• Antenna violation prevention</span>`,`<span >• Long-net identification</span>`,`<span >• Routing quality analysis</span>`,`<span >• Post-route ECO automation</span>`,`<span >• Physical verification preparation</span>`,`<span >• Signal integrity improvement</span>`,`<span >------------------------------------------------------------------------------</span>`],questions:[{question:`Q1:`,answer:`<p class="my-1"><span >Why are antenna diodes inserted on long nets?</span></p><p class="my-1"><span >Answer: To protect gate oxide from charge accumulation during fabrication.</span></p>`},{question:`Q2:`,answer:`<p class="my-1"><span >What does dbGet retrieve in Innovus?</span></p><p class="my-1"><span >Answer: It accesses physical database information such as nets, instances, routing, and geometry.</span></p>`},{question:`Q3:`,answer:`<p class="my-1"><span >Why calculate total routed length instead of using a single wire segment?</span></p><p class="my-1"><span >Answer: A net can contain multiple routed segments, and total length determines its actual routing impact.</span></p>`}],recommendation:``,extraContext:[{title:`Script Explanation`,html:``},{title:`Example Output`,html:'<p class="my-1"><span >```text</span></p><p class="my-1"><span >Net: &lt;net_name_1&gt;</span></p><p class="my-1"><span >Total Length: 82.4 microns</span></p><p class="my-1"><span >Antenna diode inserted on &lt;net_name_1&gt;</span></p><p class="my-1"><span >Net: &lt;net_name_2&gt;</span></p><p class="my-1"><span >Total Length: 65.7 microns</span></p><p class="my-1"><span >Antenna diode inserted on &lt;net_name_2&gt;</span></p><p class="my-1"><span >```</span></p><p class="my-1"><span >------------------------------------------------------------------------------</span></p>'}]}],a={moduleLayout:`_moduleLayout_vey8f_4`,header:`_header_vey8f_22`,title:`_title_vey8f_27`,subtitle:`_subtitle_vey8f_38`,topicsNav:`_topicsNav_vey8f_46`,navSectionsWrapper:`_navSectionsWrapper_vey8f_58`,navSection:`_navSection_vey8f_58`,navTitle:`_navTitle_vey8f_72`,navButtonsGrid:`_navButtonsGrid_vey8f_81`,topicNavBtn:`_topicNavBtn_vey8f_88`,seeMoreBtn:`_seeMoreBtn_vey8f_112`,mainContent:`_mainContent_vey8f_132`,contentCard:`_contentCard_vey8f_139`,cardHeader:`_cardHeader_vey8f_157`,partBadge:`_partBadge_vey8f_164`,h2:`_h2_vey8f_175`,h3:`_h3_vey8f_183`,detailSection:`_detailSection_vey8f_191`,objectiveCallout:`_objectiveCallout_vey8f_196`,objectiveTitle:`_objectiveTitle_vey8f_210`,terminal:`_terminal_vey8f_223`,terminalHeader:`_terminalHeader_vey8f_231`,terminalDots:`_terminalDots_vey8f_240`,terminalDot:`_terminalDot_vey8f_240`,dotRed:`_dotRed_vey8f_251`,dotYellow:`_dotYellow_vey8f_252`,dotGreen:`_dotGreen_vey8f_253`,terminalTitle:`_terminalTitle_vey8f_255`,copyBtn:`_copyBtn_vey8f_261`,codeBox:`_codeBox_vey8f_278`,lineNumbers:`_lineNumbers_vey8f_305`,lineNumber:`_lineNumber_vey8f_305`,codeScrollContainer:`_codeScrollContainer_vey8f_323`,codeContent:`_codeContent_vey8f_343`,explanationList:`_explanationList_vey8f_351`,expStepCard:`_expStepCard_vey8f_357`,expStepTitle:`_expStepTitle_vey8f_371`,expStepCode:`_expStepCode_vey8f_383`,expStepText:`_expStepText_vey8f_396`,flowContainer:`_flowContainer_vey8f_412`,flowNode:`_flowNode_vey8f_420`,flowArrow:`_flowArrow_vey8f_433`,whyAppsGrid:`_whyAppsGrid_vey8f_440`,bulletList:`_bulletList_vey8f_447`,qnaList:`_qnaList_vey8f_460`,qnaItem:`_qnaItem_vey8f_466`,qnaItemActive:`_qnaItemActive_vey8f_474`,qnaHeader:`_qnaHeader_vey8f_478`,qnaIcon:`_qnaIcon_vey8f_497`,qnaBody:`_qnaBody_vey8f_506`,recommendationBox:`_recommendationBox_vey8f_525`,recommendationTitle:`_recommendationTitle_vey8f_539`,extraContextContainer:`_extraContextContainer_vey8f_550`,extraSection:`_extraSection_vey8f_556`,extraTitle:`_extraTitle_vey8f_563`,extraHtml:`_extraHtml_vey8f_570`,divider:`_divider_vey8f_585`,toast:`_toast_vey8f_593`,slideUp:`_slideUp_vey8f_1`,fadeOut:`_fadeOut_vey8f_1`},o=n(),s=()=>{let[e,t]=(0,r.useState)(!1),[n,s]=(0,r.useState)(!1),[c,l]=(0,r.useState)({}),u=i.filter(e=>e.part===1).map(e=>({id:e.id,text:`Script ${e.index}: ${e.title}`})),d=i.filter(e=>e.part===2).map(e=>({id:e.id,text:`Script ${e.index}: ${e.title}`})),f=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},p=e=>{e.preventDefault()},m=e=>{l(t=>({...t,[e]:!t[e]}))};return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:p,children:[(0,o.jsxs)(`div`,{className:a.header,children:[(0,o.jsx)(`h1`,{className:a.title,children:`Module 58 - Industrial TCL Scripts`}),(0,o.jsx)(`p`,{className:a.subtitle,children:`Production-grade automation suite for physical design (PnR) and timing closure (STA). Explore script objectives, explanations, execution flows, and interview questions.`})]}),(0,o.jsx)(`div`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:`FC Tool TCL Scripts (Part 1)`}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(e?u:u.slice(0,8)).map(e=>(0,o.jsx)(`button`,{onClick:()=>f(e.id),className:a.topicNavBtn,children:e.text},e.id))}),u.length>8&&(0,o.jsx)(`button`,{onClick:()=>t(!e),className:a.seeMoreBtn,children:e?`See Less`:`See More (+${u.length-8})`})]}),(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:`INNOVUS Tool TCL Scripts (Part 2)`}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(n?d:d.slice(0,8)).map(e=>(0,o.jsx)(`button`,{onClick:()=>f(e.id),className:a.topicNavBtn,children:e.text},e.id))}),d.length>8&&(0,o.jsx)(`button`,{onClick:()=>s(!n),className:a.seeMoreBtn,children:n?`See Less`:`See More (+${d.length-8})`})]})]})}),(0,o.jsx)(`div`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`div`,{id:e.id,className:a.contentCard,children:[(0,o.jsxs)(`div`,{className:a.cardHeader,children:[(0,o.jsxs)(`span`,{className:a.partBadge,children:[e.toolName,` - Script `,e.index]}),(0,o.jsx)(`h2`,{className:a.h2,children:e.title})]}),(0,o.jsx)(`hr`,{className:a.divider}),e.objective&&(0,o.jsxs)(`div`,{className:a.objectiveCallout,children:[(0,o.jsxs)(`div`,{className:a.objectiveTitle,children:[(0,o.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`circle`,{cx:`12`,cy:`12`,r:`10`}),(0,o.jsx)(`line`,{x1:`12`,y1:`16`,x2:`12`,y2:`12`}),(0,o.jsx)(`line`,{x1:`12`,y1:`8`,x2:`12.01`,y2:`8`})]}),`Objective`]}),(0,o.jsx)(`div`,{dangerouslySetInnerHTML:{__html:e.objective}})]}),(0,o.jsxs)(`div`,{className:a.terminal,children:[(0,o.jsxs)(`div`,{className:a.terminalHeader,children:[(0,o.jsxs)(`div`,{className:a.terminalDots,children:[(0,o.jsx)(`span`,{className:`${a.terminalDot} ${a.dotRed}`}),(0,o.jsx)(`span`,{className:`${a.terminalDot} ${a.dotYellow}`}),(0,o.jsx)(`span`,{className:`${a.terminalDot} ${a.dotGreen}`})]}),(0,o.jsx)(`span`,{className:a.terminalTitle,children:e.id.startsWith(`fc`)?`fc_script_${e.index}.tcl`:`innovus_script_${e.index}.tcl`})]}),(0,o.jsxs)(`pre`,{className:a.codeBox,children:[(0,o.jsx)(`span`,{className:a.lineNumbers,children:e.code.split(`
`).map((e,t)=>(0,o.jsx)(`span`,{className:a.lineNumber,children:t+1},t))}),(0,o.jsx)(`div`,{className:a.codeScrollContainer,children:(0,o.jsx)(`code`,{className:a.codeContent,children:e.code})})]})]}),e.explanations&&e.explanations.length>0&&(0,o.jsxs)(`div`,{className:a.detailSection,children:[(0,o.jsx)(`h3`,{className:a.h3,children:`Script Explanation`}),(0,o.jsx)(`div`,{className:a.explanationList,children:e.explanations.map((e,t)=>(0,o.jsxs)(`div`,{className:a.expStepCard,children:[(0,o.jsx)(`div`,{className:a.expStepTitle,children:e.step}),e.code&&(0,o.jsx)(`div`,{className:a.expStepCode,children:e.code}),(0,o.jsx)(`div`,{className:a.expStepText,dangerouslySetInnerHTML:{__html:e.explanation}})]},t))})]}),e.flow&&e.flow.length>0&&(0,o.jsxs)(`div`,{className:a.detailSection,children:[(0,o.jsx)(`h3`,{className:a.h3,children:`Execution Flow`}),(0,o.jsx)(`div`,{className:a.flowContainer,children:e.flow.map((t,n)=>(0,o.jsxs)(r.Fragment,{children:[(0,o.jsx)(`div`,{className:a.flowNode,children:t}),n<e.flow.length-1&&(0,o.jsx)(`div`,{className:a.flowArrow,children:`↓`})]},n))})]}),(e.why&&e.why.length>0||e.applications&&e.applications.length>0)&&(0,o.jsx)(`div`,{className:a.detailSection,children:(0,o.jsxs)(`div`,{className:a.whyAppsGrid,children:[e.why&&e.why.length>0&&(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h3`,{className:a.h3,children:`Why This Script?`}),(0,o.jsx)(`ul`,{className:a.bulletList,children:e.why.map((e,t)=>(0,o.jsx)(`li`,{dangerouslySetInnerHTML:{__html:e}},t))})]}),e.applications&&e.applications.length>0&&(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`h3`,{className:a.h3,children:`Applications`}),(0,o.jsx)(`ul`,{className:a.bulletList,children:e.applications.map((e,t)=>(0,o.jsx)(`li`,{dangerouslySetInnerHTML:{__html:e}},t))})]})]})}),e.questions&&e.questions.length>0&&(0,o.jsxs)(`div`,{className:a.detailSection,children:[(0,o.jsx)(`h3`,{className:a.h3,children:`Interview Questions`}),(0,o.jsx)(`div`,{className:a.qnaList,children:e.questions.map((t,n)=>{let r=`${e.id}_qna_${n}`,i=!!c[r];return(0,o.jsxs)(`div`,{className:`${a.qnaItem} ${i?a.qnaItemActive:``}`,children:[(0,o.jsxs)(`button`,{className:a.qnaHeader,onClick:()=>m(r),children:[(0,o.jsx)(`span`,{children:t.question}),(0,o.jsx)(`span`,{className:a.qnaIcon,children:(0,o.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,o.jsx)(`polyline`,{points:`6 9 12 15 18 9`})})})]}),i&&(0,o.jsx)(`div`,{className:a.qnaBody,dangerouslySetInnerHTML:{__html:t.answer}})]},n)})})]}),e.recommendation&&(0,o.jsxs)(`div`,{className:a.recommendationBox,children:[(0,o.jsxs)(`div`,{className:a.recommendationTitle,children:[(0,o.jsxs)(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.5`,strokeLinecap:`round`,strokeLinejoin:`round`,children:[(0,o.jsx)(`path`,{d:`M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z`}),(0,o.jsx)(`line`,{x1:`12`,y1:`9`,x2:`12`,y2:`13`}),(0,o.jsx)(`line`,{x1:`12`,y1:`17`,x2:`12.01`,y2:`17`})]}),`Industry Recommendation`]}),(0,o.jsx)(`div`,{dangerouslySetInnerHTML:{__html:e.recommendation}})]}),e.extraContext&&e.extraContext.map((e,t)=>(0,o.jsxs)(`div`,{className:a.extraSection,children:[(0,o.jsx)(`h3`,{className:a.extraTitle,children:e.title}),(0,o.jsx)(`div`,{className:a.extraHtml,dangerouslySetInnerHTML:{__html:e.html}})]},t))]},e.id))})]})};export{s as default};