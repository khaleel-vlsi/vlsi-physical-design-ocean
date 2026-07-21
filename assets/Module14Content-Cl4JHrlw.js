import{p as e,r as t,u as n}from"./index-D__pXiQ_.js";var r=e(n(),1),i=[{id:`ch_0_placement`,title:`Placement`,html:`<p class="c8">In this stage, all the standard cells are placed in the design. The size, shape, and macro placement are already defined during the floorplanning stage. Placement is driven by different criteria such as timing-driven placement, congestion-driven placement, and power optimization. The quality of placement has a significant impact on timing and routing convergence in later stages of the design flow.</p>
<p class="c8">The different tasks involved in placement are listed below:</p>
<ol class="c9 lst-kix_cfx36uvpindz-0 start" start="1"><li class="c3 c10 li-bullet-0">Pre-placement<br /></li><li class="c3 c10 li-bullet-0">Initial placement (Coarse placement)<br /></li><li class="c3 c10 li-bullet-0">Legalization<br /></li><li class="c3 c10 li-bullet-0">Removing existing buffer trees<br /></li><li class="c3 c10 li-bullet-0">High Fan-out Net Synthesis (HFNS)<br /></li><li class="c3 c10 li-bullet-0">Iterations of timing and power optimizations, including cell sizing, cell moving, net splitting, gate cloning, buffer insertion, and area recovery<br /></li><li class="c3 c10 li-bullet-0">Area recovery<br /></li><li class="c3 c10 li-bullet-0">Scan-chain re-ordering<br /></li></ol>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.l6ecef54onx">Goals of Placement</h3>
<p class="c8">The main objectives of placement are as follows:</p>
<ol class="c9 lst-kix_cwr8n8kd29i-0 start" start="1"><li class="c3 c10 li-bullet-0">Optimize timing, power, and area of the design.<br /></li><li class="c3 c10 li-bullet-0">Achieve a routable design with minimal global and local congestion.<br /></li><li class="c3 c10 li-bullet-0">Avoid or minimize cell density, pin density, and congestion hot-spots.<br /></li><li class="c3 c10 li-bullet-0">Ensure minimal timing-related DRC violations.</li></ol>
<p class="c0"></p>`},{id:`ch_10_magnet_placement`,title:`Magnet Placement`,html:`<p class="c8">Magnet placement is a specialized placement technique used to improve congestion in complex floorplans or to enhance timing in the design. In this approach, certain fixed objects are specified as magnets, and the ICC tool moves the standard cells connected to these objects closer to them.</p>
<p class="c8">You can specify the following as magnet objects:</p>
<ul class="c9 lst-kix_pi46y2rmtvlj-0 start"><li class="c3 c10 li-bullet-0">Fixed macro cells,<br /></li><li class="c3 c10 li-bullet-0">A pin of a fixed macro cell, or<br /></li><li class="c3 c10 li-bullet-0">An I/O pin.<br /></li></ul>
<p class="c8">For best results, magnet placement should be performed before standard cells are placed in the design.</p>
<p class="c8">To perform magnet placement, the magnet_placement command is used along with the specification of magnet objects and any required options. The general syntax is:</p>
<p class="c4">icc_shell&gt; magnet_placement [options] magnet_objects  </p>
<p class="c0"></p>
<p class="c8">To control whether the tool should pull cells toward the magnet objects, the variable magnet_placement_fanout_limit can be set. This variable defines the maximum allowable fanout for a net to be considered for magnet placement.</p>
<p class="c8">If the fanout of a net exceeds the specified limit, the magnet_placement command will not pull the cells of that net toward the magnet objects. The default value of this limit is 1000.</p>
<p class="c8">By default, magnet placement allows cells to overlap with each other. To prevent overlapping, the variable magnet_placement_disable_overlap can be set to true instead of its default value false.</p>
<p class="c8">To obtain a list of cells that are eligible to be moved using magnet placement, the get_magnet_cells command can be used with appropriate options. The syntax is:</p>
<p class="c4">icc_shell&gt; get_magnet_cells [options] magnet_list  </p>
<p class="c0"></p>
<p class="c8">This command returns a collection of cells that can be affected by magnet placement based on the specified magnets.</p>
<p class="c0"></p>`},{id:`ch_26_bounds`,title:`Bounds`,html:`<p class="c8">A placement bound is a constraint that controls the placement of groups of leaf cells and hierarchical cells. It allows designers to group related cells together and minimize wire length. Bounds help in placing cells at the most appropriate physical location in the layout to improve timing and routability.</p>
<p class="c8">Many industries use placement bounds because they can significantly help in reducing timing violations. However, several scenarios must be carefully considered before creating a bound. If the necessary conditions are not satisfied, bounds can negatively impact other design objectives and may even worsen timing instead of improving it.</p>
<p class="c8">Before creating a bound, the timing margin must be analyzed. If timing can be improved using other techniques such as buffer insertion, cell sizing, or macro adjustment, those methods should be tried first. Bounds should be considered as a later-stage optimization, as they may consume more runtime and affect overall placement flexibility.</p>
<p class="c8">The main objective of placement bounds is to minimize the delay of extremely timing-critical paths in the design.</p>
<p class="c8">There are two main types of bounds:</p>
<ol class="c9 lst-kix_uu8hr9cjbe6l-0 start" start="1"><li class="c3 c10 li-bullet-0">Move Bounds<br /></li><li class="c3 c10 li-bullet-0">Group Bounds<br /></li></ol>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.flaqnt24ndtu">1. Move Bounds</h3>
<p class="c8">Move bounds restrict the placement of selected cells to a specific region in the design area.</p>
<h4 class="c34" id="h.ip34wtx9pw6k">i. Soft Move Bound</h4>
<p class="c8">In a soft move bound, the tool tries to place the specified cells within the defined region, but there is no strict guarantee that all cells will remain inside the bound.</p>
<p class="c8">Example command:</p>
<p class="c4">create_bound -name b0 -type soft -boundary {10 10 20 20} instance_1  </p>
<p class="c0"></p>
<h4 class="c34" id="h.aqrygwv34t8p">ii. Hard Move Bound</h4>
<p class="c8">In a hard move bound, the tool must place the specified cells strictly within the defined region. It acts as a strong constraint on placement.</p>
<p class="c8">Example command:</p>
<p class="c4">create_bound -name b1 -type hard -boundary {10 10 20 20} instance_2  </p>
<p class="c0"></p>
<h4 class="c34" id="h.svzhndycet1n">iii. Exclusive Move Bound</h4>
<p class="c8">In an exclusive move bound, the tool tries to place the specified group of cells within a floating region, but there is no absolute guarantee that they will stay inside. However, no other cells are allowed inside this bound.</p>
<p class="c8">Example command:</p>
<p class="c4">create_bound -name b2 -exclusive -boundary {10 10 20 20} instance_1  </p>
<p class="c0"></p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.8al9x4wpblgr">2. Group Bounds</h3>
<p class="c8">Group bounds are floating region constraints. Cells inside a group bound are placed within a specified area, but the exact coordinates of the bound are not fixed. Instead, the placer optimizes their position dynamically during placement.</p>
<hr>
<p class="c0"></p>`},{id:`ch_58_bound_creation`,title:`Bound Creation`,html:`<p class="c8">To create a bound, the create_bounds command is used. This command allows region-based placement constraints for coarse placement. Once a bound is created, it does not need to be recreated when the design is reloaded.</p>
<p class="c8">Common options of the create_bounds command are:</p>
<p class="c4">create_bounds </p>
<p class="c4">    -name bound_name  </p>
<p class="c4">    -coordinate {llx lly urx ury}  </p>
<p class="c4">    -dimension {width height}  </p>
<p class="c4">    -effort low | medium | high | ultra  </p>
<p class="c4">    -type soft | hard  </p>
<p class="c4">    -exclusive  </p>
<p class="c4">    -color range_0_to_63  </p>
<p class="c4">    -cycle_color  </p>
<p class="c4">    object_list  </p>
<p class="c0"></p>
<hr>
<p class="c0"></p>`},{id:`ch_74_cells_to_include_in_a_bound`,title:`Cells to Include in a Bound`,html:`<p class="c8">Generally, cells that lie on the Worst Negative Slack (WNS) paths of the design are considered for bounds. These are the most timing-critical paths.</p>
<p class="c8">There may be more than one bound in a design, depending on the number of critical paths violating timing. After identifying these paths, the startpoint and endpoint of each path are analyzed.</p>
<p class="c8">Only those cells from the startpoint and endpoint are considered for the bound that will not degrade their own timing. If a cell becomes a new startpoint after being included in a bound, its own endpoint timing must be checked.</p>
<p class="c8">If the slack of this new path is positive and has sufficient margin, then the cell can be included in the bound. Otherwise, it should not be included.<br /><br /><img alt="" src="/assets/modules/module14/image14.png" title="" class="native-img"></p>
<hr>
`},{id:`ch_81_example_of_bound_creation`,title:`Example of Bound Creation`,html:`<p class="c4">create_bounds -name "temp" -coordinate {100 100 200 200} INST_1  </p>
<p class="c0"></p>
<p class="c8">This command creates a bound named "temp" and restricts the placement of INST_1 within a rectangular region defined by coordinates {100 100 200 200}, where:</p>
<ul class="c9 lst-kix_on7m8hlwt98h-0 start"><li class="c3 c10 li-bullet-0">Lower-left corner = (100, 100)<br /></li><li class="c3 c10 li-bullet-0">Upper-right corner = (200, 200)<br /></li></ul>
<p class="c8">If the -coordinate option is used, the tool creates a move bound.</p>
<p class="c8">If the -dimension option is used, the tool creates a group bound with a bounding box of specified width and height.</p>
<p class="c8">If neither option is used, the tool automatically creates a group bound and determines its size internally. In this case, the -effort option must be specified to control how strongly cells are pulled together.</p>
<hr>
<p class="c0"></p>`},{id:`ch_91_bound_types_and_their_behavior`,title:`Bound Types and Their Behavior`,html:`<ul class="c9 lst-kix_9qfytqoxtzq7-0 start"><li class="c3 c10 li-bullet-0">Soft bound (default): The tool attempts to place cells inside the bound, but does not guarantee it.<br /></li><li class="c3 c10 li-bullet-0">Hard bound: Forces specified cells inside the bound, even if it negatively impacts timing or routability. Other cells may still enter the bound.<br /></li><li class="c3 c10 li-bullet-0">Exclusive bound: Only the specified cells are allowed inside the bound; all other cells must remain outside.<br /></li></ul>
<p class="c8">The -color option assigns a visual color to the bound (0 to 63). The default is no color. The -cycle_color option allows the tool to automatically assign a color.</p>
<hr>
<p class="c0"></p>`},{id:`ch_98_location_of_the_bound`,title:`Location of the Bound`,html:`<p class="c8">Finding the exact optimal location of a bound may require multiple iterations. The bound is initially placed in a reasonable location based on timing analysis, and then adjusted slightly while observing changes in timing.</p>
<p class="c8">Once timing improves and meets requirements, the bound position is finalized. The slack of input-to-register and register-to-output paths must also be checked to ensure overall timing balance.</p>
<p class="c8"><img alt="" src="/assets/modules/module14/image11.png" title="" class="native-img"></p>
<hr>
<p class="c0"></p>`},{id:`ch_104_size_of_the_bound`,title:`Size of the Bound`,html:`<p class="c8">To determine the size of a bound, first identify the cells that need to be included. Then calculate the total area of these cells using tool reports or specific area calculation commands.</p>
<p class="c8">The bound size should be slightly larger than the total area of the selected cells to allow placement flexibility. If sufficient slack margin is not available in the preceding and succeeding paths, a larger bound may be needed to avoid excessive wire stretching.</p>
<p class="c8"><img alt="" src="/assets/modules/module14/image2.png" title="" class="native-img"></p>
<hr>
<p class="c0"></p>`},{id:`ch_110_reasons_for_cells_being_placed_apart`,title:`Reasons for Cells Being Placed Apart`,html:`<ol class="c9 lst-kix_rlepg7qi1ad9-0 start" start="1"><li class="c3 c10 li-bullet-0">Floorplan Constraints<br /> Macros may have been placed apart due to port communication, macro-to-macro communication, or specific design constraints. As a result, their connected registers also appear spaced apart during placement.<br /></li><li class="c3 c10 li-bullet-0">Tight Timing Constraints<br /> Certain constraints in the SDC file, such as multicycle paths or uncertainty margins, can force registers to be placed farther apart. The placement tool tries to satisfy these constraints while optimizing timing.<br /></li></ol>
<hr>
<p class="c0"></p>`},{id:`ch_116_use_of_bounds_during_placement`,title:`Use of Bounds During Placement`,html:`<p class="c8">Bounds help in reducing critical path delays when necessary. However, they should be used only after trying other optimization techniques such as floorplan changes and macro repositioning.</p>
<p class="c8">Bounds mainly help in:</p>
<ul class="c9 lst-kix_1v4glstzxnv6-0 start"><li class="c3 c10 li-bullet-0">Reducing wire length<br /></li><li class="c3 c10 li-bullet-0">Grouping related cells<br /></li><li class="c3 c10 li-bullet-0">Improving timing of critical paths<br /></li></ul>
<hr>
<p class="c0"></p>`},{id:`ch_122_additional_commands_related_to_bounds`,title:`Additional Commands Related to Bounds`,html:`<ol class="c9 lst-kix_cqiinedarzxg-0 start" start="1"><li class="c3 c10 li-bullet-0">update_bounds<br /> Updates an existing move bound by adding or removing objects.<br /></li><li class="c3 c10 li-bullet-0">report_bounds<br /> Reports all bounds created using create_bounds. Bounds from PDEF files are not included.<br /></li><li class="c3 c10 li-bullet-0">get_bounds<br /> Returns a collection of bounds that match specified criteria.<br /></li><li class="c3 c10 li-bullet-0">remove_bounds<br /> Removes bound constraints from the current design.<br /></li></ol>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>`},{id:`ch_135_timing_analysis_group_paths`,title:`Timing Analysis – Group Paths`,html:`<p class="c8">As the name indicates, a path group is a collection of timing paths that are treated together during optimization. The main reason for grouping paths is to guide the effort of the synthesis and optimization engines more effectively.</p>
<p class="c8">For example, if all timing paths are kept in a single group, the synthesis tool will focus most of its effort on optimizing only the worst timing violators. Once the worst path is fixed, the tool moves to the next worst violator and so on.</p>
<p class="c8">However, during initial timing analysis, you may identify some paths that require architectural changes (for example, replacing a cascade of adders or multipliers with pipelined logic). In such cases, you do not want the synthesis engine to spend excessive time optimizing these paths. Therefore, these paths should be placed in a separate path group with a lower priority. Similarly, paths with moderate violations can also be grouped separately so that they are not ignored due to focus on highly critical paths.</p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.q3qik6x71pk3">Benefit of Separate Path Groups for I/O Logic Paths</h3>
<p class="c8">Path groups form the foundation of optimization in synthesis and Place-and-Route (PnR) tools. More realistic and well-defined path groups make it easier for the tool to achieve optimal results in terms of timing, power, and area.</p>
<p class="c8">Most of the time, I/O timing constraints are budgeted and may not be very accurate. They may also belong to different clock domains or have unclear clock relationships. If I/O paths are kept in the same group as internal core paths, they may negatively impact overall Quality of Results (QoR).</p>
<p class="c8">During optimization, the tool always focuses on the most critical path in a group. If an I/O path becomes the most critical path, the tool may focus primarily on optimizing that path, while internal core paths remain suboptimal. This can lead to poor overall design quality.</p>
<p class="c8">Design Compiler always tries to reduce the delay of the most critical path in a path group. As optimization progresses, the identity of the most critical path may change. Once the initial worst path is improved, the tool shifts its focus to the next most critical path in the same group.</p>
<p class="c8">If a design has complex clocking, multiple clock domains, or complex timing constraints, it is highly recommended to create separate path groups. This allows the tool to focus optimization on specific critical regions of the design.</p>
<p class="c8">Path groups are created using the group_path command. This command allows designers to:</p>
<ul class="c9 lst-kix_9kscip9v61oq-0 start"><li class="c3 c10 li-bullet-0">Control optimization of specific paths<br /></li><li class="c3 c10 li-bullet-0">Optimize near-critical paths<br /></li><li class="c3 c10 li-bullet-0">Optimize all paths in a group</li></ul>
<p class="c8"><img alt="" src="/assets/modules/module14/image5.png" title="" class="native-img"></p>
<p class="c8">m is the number of path groups. </p>
<p class="c8">n is the number of paths in the critical range in the path group. </p>
<p class="c8">vij is a violator within the critical range of the i th path group. </p>
<p class="c8">wi is the weight assigned to the i th path group.</p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.bc467pxwmdii">Critical Range in Path Groups</h3>
<p class="c8">When a critical range is added to a path group, the optimization focus shifts from only the worst negative slack to a range of critical paths. This is known as critical range negative slack optimization.</p>
<p class="c8">Instead of optimizing only the single worst path, the tool considers all paths within a specified delay margin from the worst violator. This margin is called the critical range.</p>
<p class="c8">For example, if the critical range is 2.0 ns and the worst path delay is 10.0 ns, then Design Compiler will optimize all paths with delays between 8.0 ns and 10.0 ns.</p>
<p class="c8">The critical negative slack is defined as the sum of negative slack values of all paths within the critical range. If the critical range is large enough to include all violating paths, then critical negative slack becomes equal to total negative slack.</p>
<p class="c8">For each path within the critical range, Design Compiler calculates delay violation as:<br /><img alt="" src="/assets/modules/module14/image12.png" title="" class="native-img"></p>
<p class="c8">Using a large critical range can increase runtime significantly. Therefore, it is recommended to use critical range only in the final implementation phase and keep it within reasonable limits. A general guideline is to keep the critical range within 10% of the clock period.</p>
<p class="c8">Critical range can be specified using either:</p>
<ul class="c9 lst-kix_x5ut8p5uourt-0 start"><li class="c3 c10 li-bullet-0">The -critical_range option in the group_path command, or<br /></li><li class="c3 c10 li-bullet-0">The set_critical_range command<br /></li></ul>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.u8f778e4s15g">Examples of Path Group Creation</h3>
<p class="c8">Example 1:<br /> The following command groups all endpoints clocked by CLK1A or CLK1B into a new group named group1 with a weight of 2.0.</p>
<p class="c4">group_path -name group1 -weight 2.0 -to {CLK1A CLK1B}</p>
<p class="c0"></p>
<p class="c8">Example 2:<br /> The following command groups paths that start at A1, pass through either B1 or B2, then pass through either C1 or C2, and finally end at D1 into a group named group3.</p>
<p class="c4">group_path -name group3 -from A1 -through {B1 B2} -through {C1 C2} -to D1</p>
<p class="c0"></p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.8d0wdg2zmtls">How Does the Tool Reduce Delay Internally?</h3>
<p class="c8">When a path is given higher priority or weight, the tool places more optimization effort on that path.</p>
<p class="c8">Internally, the tool may:</p>
<ul class="c9 lst-kix_ujnq0tklvi9a-0 start"><li class="c3 c10 li-bullet-0">Insert additional buffers along the critical path<br /></li><li class="c3 c10 li-bullet-0">Resize gates to increase drive strength<br /></li><li class="c3 c10 li-bullet-0">Modify placement to reduce wire length<br /></li><li class="c3 c10 li-bullet-0">Perform net splitting or gate cloning<br /></li></ul>
<p class="c8">By doing this, the tool reduces the delay of the most critical paths and improves overall timing convergence.</p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>`},{id:`ch_216_congestion_analysis`,title:`Congestion Analysis`,html:`<p class="c8">Congestion in VLSI physical design occurs when the number of routing tracks available in a given region is less than the number of routing tracks required by the nets passing through that region. In such cases, the area is considered congested.</p>
<p class="c8">As technology scales down and millions of transistors are packed into a smaller chip area, circuit density increases significantly, which naturally leads to higher routing congestion. Intuitively, congestion means that too many nets are trying to pass through a small local region, leading to detours, increased wire length, or even unroutable nets during detailed routing.</p>
<p class="c8">Congestion in general refers to routing congestion, which is defined as the difference between routing demand and routing supply. A routing track is a routing resource that spans across the core area.</p>
<hr>
<p class="c0"></p>`},{id:`ch_222_placement_congestion_vs_routing_congesti`,title:`Placement Congestion vs Routing Congestion`,html:`<h3 class="c16" id="h.uh6fdw316rd">Placement Congestion</h3>
<p class="c8">Placement congestion occurs due to overlapping of standard cells and is more accurately referred to as overlapping rather than congestion. This issue is resolved by aligning cells to the placement grid during legalization.</p>
<p class="c8">In recent years, several congestion estimation and removal techniques have been developed. These techniques are broadly categorized into:</p>
<ul class="c9 lst-kix_x0lcmc5boh5g-0 start"><li class="c3 c10 li-bullet-0">Congestion estimation and removal during global routing, and<br /></li><li class="c3 c10 li-bullet-0">Congestion estimation and removal during placement.<br /></li></ul>
<p class="c8">To estimate congestion, the tool performs initial or global routing, and congestion reports are generated after each routing stage. These reports show the difference between routing demand and routing supply in each region.</p>
<p class="c8">Overflow is calculated as:</p>
<p class="c4">Overflow=Routing Demand−Routing Supply\\text{Overflow} = \\text{Routing Demand} - \\text{Routing Supply}Overflow=Routing Demand−Routing Supply</p>
<p class="c8">If routing demand is less than or equal to supply, overflow is considered 0%.</p>
<p class="c8">Typically, the initial target utilization starts around 65% to 70%.</p>
<p class="c8">Example: In a 2D congestion map, if 7 routes pass through an edge of a Global Routing Cell (GRC) but only 3 routing tracks are available, then overflow is 4.</p>
<hr>
<p class="c0"></p>`},{id:`ch_235_causes_of_routing_congestion`,title:`Causes of Routing Congestion`,html:`<ol class="c9 lst-kix_mja971dkc2k0-0 start" start="1"><li class="c3 c10 li-bullet-0">Missing placement blockages<br /></li><li class="c3 c10 li-bullet-0">Inefficient floorplan<br /></li><li class="c3 c10 li-bullet-0">Improper macro placement and macro channel planning (for example, placing macros in the middle of the floorplan)<br /></li><li class="c3 c10 li-bullet-0">Floorplanning macros without sufficient routing space between them<br /></li><li class="c3 c10 li-bullet-0">High local cell density<br /></li><li class="c3 c10 li-bullet-0">Excessive use of AOI/OAI cells<br /></li><li class="c3 c10 li-bullet-0">Placement of standard cells too close to macros<br /></li><li class="c3 c10 li-bullet-0">High pin density on one side of the block<br /></li><li class="c3 c10 li-bullet-0">Too many buffers added for optimization<br /></li><li class="c3 c10 li-bullet-0">Lack of proper logic optimization<br /></li><li class="c3 c10 li-bullet-0">Very robust (dense) power network<br /></li><li class="c3 c10 li-bullet-0">High via density due to dense power mesh<br /></li><li class="c3 c10 li-bullet-0">Crisscross alignment of I/O pins<br /></li><li class="c3 c10 li-bullet-0">Improper module splitting<br /></li></ol>
<hr>
<p class="c0"></p>`},{id:`ch_241_congestion_fixes`,title:`Congestion Fixes`,html:`<ol class="c9 lst-kix_tutze8umrh5s-0 start" start="1"><li class="c3 c10 li-bullet-0">Add placement blockages in channels and around macro corners<br /></li><li class="c3 c10 li-bullet-0">Review and optimize macro placement<br /></li><li class="c3 c10 li-bullet-0">Reduce local cell density using density screens<br /></li><li class="c3 c10 li-bullet-0">Reorder scan chains to reduce congestion<br /></li><li class="c3 c10 li-bullet-0">Use congestion-driven placement with higher effort<br /></li><li class="c3 c10 li-bullet-0">Iterate placement and routing until congestion improves<br /></li><li class="c3 c10 li-bullet-0">Apply density screens to limit standard cell density in high congestion areas<br /></li></ol>
<p class="c8">Routing congestion occurs when too many routes need to pass through an area with insufficient routing tracks. It is broadly classified into:</p>
<ul class="c9 lst-kix_2l9om4t3m809-0 start"><li class="c3 c10 li-bullet-0">Global congestion<br /></li><li class="c3 c10 li-bullet-0">Local congestion<br /></li></ul>
<hr>
<p class="c0"></p>`},{id:`ch_247_global_congestion`,title:`Global Congestion`,html:`<p class="c8">Global congestion occurs when a large number of chip-level or inter-block wires need to pass through a particular region of the chip.</p>
<hr>
<p class="c0"></p>`},{id:`ch_255_local_congestion`,title:`Local Congestion`,html:`<p class="c8">Local congestion occurs when macros or routing blockages are placed too close to each other, leaving insufficient space for routing connections between them.<br /><img alt="" src="/assets/modules/module14/image16.png" title="" class="native-img"></p>
<hr>
<p class="c0"></p>`},{id:`ch_259_global_routing_cells_grcs_`,title:`Global Routing Cells (GRCs)`,html:`<p class="c8">Global routing is a coarse-grained routing stage that divides the design into small rectangular regions called Global Routing Cells (GRCs). It determines tile-to-tile paths for nets without assigning exact metal tracks.</p>
<p class="c8">By default, the width of a GRC is equal to the height of a standard cell row and is aligned with placement rows.</p>
<p class="c8">Routing capacity in each GRC depends on:</p>
<ul class="c9 lst-kix_o5y13dwzqt8k-0 start"><li class="c3 c10 li-bullet-0">Blockages<br /></li><li class="c3 c10 li-bullet-0">Pins<br /></li><li class="c3 c10 li-bullet-0">Available routing tracks<br /></li></ul>
<p class="c8">The tool calculates routing demand in each GRC and reports overflow.</p>
<p class="c8">Global routing consists of two main stages:</p>
<ol class="c9 lst-kix_jw5rqgd8xu0b-0 start" start="1"><li class="c3 c10 li-bullet-0">Initial Routing Stage – Unconnected nets are routed, and overflow is calculated for each GRC.<br /></li><li class="c3 c10 li-bullet-0">Rerouting Stage – Nets in congested GRCs are ripped up and rerouted to reduce overflow.<br /></li></ol>
<p class="c8">After each stage, design statistics, wire length, and via count are reported.</p>
<p class="c8">There are three types of global routing:</p>
<ol class="c9 lst-kix_uzk31ngo5nn2-0 start" start="1"><li class="c3 c10 li-bullet-0">Time-Driven Global Routing – Net delays are considered before routing.<br /></li><li class="c3 c10 li-bullet-0">Crosstalk-Driven Global Routing – Avoids long parallel routes that may cause crosstalk.<br /></li><li class="c3 c10 li-bullet-0">Incremental Global Routing – Uses existing routing information for further refinement.<br /></li></ol>
<p class="c3"><img alt="" src="/assets/modules/module14/image4.png" title="" class="native-img"></p>
<hr>
`},{id:`ch_273_track_assignment`,title:`Track Assignment`,html:`<p class="c8">Track assignment assigns actual routing tracks to each global route. It performs:</p>
<ol class="c9 lst-kix_no6zjd4l86w4-0 start" start="1"><li class="c3 c10 li-bullet-0">Assignment of tracks in horizontal and vertical partitions.<br /></li><li class="c3 c10 li-bullet-0">Rerouting of overlapping wires.<br /></li><li class="c3 c10 li-bullet-0">Replacement of global routes with actual metal layers.<br /></li></ol>
<p class="c8">Although all nets are routed at this stage, many DRC, signal integrity, and timing violations may exist, which are resolved in detailed routing.</p>
<hr>
<p class="c0"></p>`},{id:`ch_279_detailed_routing`,title:`Detailed Routing`,html:`<p class="c8">Detailed routing uses the global routing plan and track assignment to create actual metal connections between pins.</p>
<p class="c8">The router divides the design into smaller regions called Switch Boxes (Sboxes), which are usually based on GRC boundaries. For example, a 3×3 Sbox covers 9 GRCs.</p>
<p class="c8">The main goal of detailed routing is to complete all interconnects without leaving shorts, spacing violations, or unconnected nets.</p>
<hr>
<p class="c0"></p>`},{id:`ch_285_congestion_reduction_techniques`,title:`Congestion Reduction Techniques`,html:`<h3 class="c16" id="h.oyj5p3kdhc4e">Reasons for Congestion</h3>
<ol class="c9 lst-kix_d1th9tltlqlx-0 start" start="1"><li class="c3 c10 li-bullet-0">High standard cell density in small areas<br /></li><li class="c3 c10 li-bullet-0">High standard cell density near macro edges<br /></li><li class="c3 c10 li-bullet-0">High pin density in M2/M3 layers due to AOI, OAI, and flip-flops<br /></li><li class="c3 c10 li-bullet-0">Rectilinear block shape<br /></li><li class="c3 c10 li-bullet-0">Poor floorplan or inappropriate block dimensions<br /></li></ol>
<h3 class="c16" id="h.dnmm1em96tr9">Congestion Reduction Techniques</h3>
<ol class="c9 lst-kix_uppiey1azbz2-0 start" start="1"><li class="c3 c10 li-bullet-0">First analyze the root cause before enabling high-effort congestion options, as they may increase runtime and degrade timing.<br /></li><li class="c3 c10 li-bullet-0">If congestion is due to high cell density, apply partial blockages in that region.<br /></li></ol>
<ul class="c9 lst-kix_uppiey1azbz2-1 start"><li class="c8 c10 c21 li-bullet-0">Example: If congestion utilization is 80%, apply a partial blockage with 60% density.<br /></li></ul>
<ol class="c9 lst-kix_uppiey1azbz2-0" start="3"><li class="c3 c10 li-bullet-0">If congestion is near macro areas, apply 5–10 microns of soft or hard blockage (preferably 5 microns hard + 5 microns soft). This allows critical cells to move into soft blockage if needed.<br /></li><li class="c3 c10 li-bullet-0">If congestion is in M2/M3 layers, apply cell padding to high-pin-count cells such as AOI, OAI, or full adders.<br /></li><li class="c3 c10 li-bullet-0">If congestion is due to rectilinear block shapes, apply partial blockages accordingly.\\</li></ol>
<p class="c3"><img alt="" src="/assets/modules/module14/image10.png" title="" class="native-img"><br /></p>
<p class="c8"><img alt="" src="/assets/modules/module14/image16.png" title="" class="native-img"></p>
<hr>
<p class="c0"></p>`},{id:`ch_296_summary_of_congestion_fixes`,title:`Summary of Congestion Fixes`,html:`<ol class="c9 lst-kix_i5bnzmcchxhg-0 start" start="1"><li class="c3 c10 li-bullet-0">Add placement blockages in channels and around macro corners<br /></li><li class="c3 c10 li-bullet-0">Review macro placement<br /></li><li class="c3 c10 li-bullet-0">Reduce local cell density using density screens<br /></li><li class="c3 c10 li-bullet-0">Reorder scan chains<br /></li><li class="c3 c10 li-bullet-0">Use congestion-driven placement with high effort<br /></li><li class="c3 c10 li-bullet-0">Iterate until acceptable congestion levels are achieved<br /></li><li class="c3 c10 li-bullet-0">Apply density screens in high pin-density areas<br /></li><li class="c3 c10 li-bullet-0">Recognize that routing congestion occurs when too many routes pass through limited tracks</li></ol>
<p class="c8">Cell Padding</p>
<p class="c8">Cell padding refers to placement clearance applied to standard cells in Place-and-Route (PnR) tools. This technique is typically used to ease placement congestion or to reserve additional space for future use in later stages of the design flow.</p>
<p class="c8">For example, designers often apply cell padding to buffers and inverters used in Clock Tree Synthesis (CTS) so that space is reserved for inserting decoupling capacitor (DECAP) cells near them after CTS.</p>
<p class="c8">Cell padding introduces hard constraints to placement. These constraints are respected by cell legalization, CTS, and timing optimization unless the padding is explicitly removed after placement. Cell padding can also be used to reserve space for routing in congested regions.</p>
<p class="c8">In SOC Encounter, the command specifyCellPad is used to define cell padding. This command adds padding to the right side of selected library cells during placement.</p>
<p class="c8">The padding is specified as a multiple of the Metal2 pitch. For example, if a factor of 2 is used, the tool ensures an additional clearance of two times the Metal2 pitch on the right side of the specified cells.</p>
<hr>
<p class="c3 c18"></p>`},{id:`ch_306_macro_padding_placement_halo_`,title:`Macro Padding (Placement Halo)`,html:`<p class="c8">Macro padding, also known as placement halo, is a placement blockage region created around the boundary of macros. This ensures that no standard cells are placed too close to macro pins, providing additional space for routing macro-to-core connections.</p>
<p class="c8">Macro padding also helps avoid short circuits or interference between macro cells and standard cells in the core region.</p>
<h3 class="c13" id="h.v7eju15onsi6">Halo Space Calculation</h3>
<p class="c8">The halo space around a macro is calculated using the following formula:</p>
<p class="c3">Halo Space=(Number of pins×Pitch of lowest metal layer)(Total number of metal layers/2)\\text{Halo Space} = \\frac{(\\text{Number of pins} \\times \\text{Pitch of lowest metal layer})}{(\\text{Total number of metal layers} / 2)}Halo Space=(Total number of metal layers/2)(Number of pins×Pitch of lowest metal layer)​</p>
<p class="c8">Why divide by 2?<br /> Because the total number of metal layers includes both horizontal and vertical routing layers, and typically half of them are used for each direction.</p>
<p class="c8">Note: It is recommended to provide slightly more halo space than the calculated value to ensure better routability and avoid congestion.</p>
<hr>
<p class="c3 c18"></p>`},{id:`ch_316_instance_padding`,title:`Instance Padding`,html:`<p class="c8">Instance padding is a clearance or spacing applied to a specific individual cell instance in the design, rather than to an entire cell type in the library.</p>
<p class="c8">Unlike cell padding, which applies to all instances of a particular standard cell (for example, all BUFX2 or all INVX4 cells), instance padding is applied selectively to chosen instances that require additional spacing.</p>
<p class="c8">Instance padding is commonly used when:</p>
<ul class="c9 lst-kix_5cc5amb1ezx4-0 start"><li class="c3 c10 li-bullet-0">A particular cell is in a highly congested region.<br /></li><li class="c3 c10 li-bullet-0">A critical timing path cell needs additional routing space.<br /></li><li class="c3 c10 li-bullet-0">A specific buffer or inverter requires space for future decap insertion.<br /></li><li class="c3 c10 li-bullet-0">A cell is near a macro, blockage, or sensitive region.<br /></li></ul>
<p class="c8">Instance padding provides localized control over placement without affecting the entire design or all copies of a cell type.</p>
<hr>
<p class="c3 c18"></p>`},{id:`ch_324_difference_between_cell_padding_and_inst`,title:`Difference Between Cell Padding and Instance Padding`,html:`<table class="c24"><tbody><tr class="c12"><td class="c26" colspan="1" rowspan="1"><p class="c31 c33">Feature</p></td><td class="c30" colspan="1" rowspan="1"><p class="c31 c33">Cell Padding</p></td><td class="c19" colspan="1" rowspan="1"><p class="c31 c33">Instance Padding</p></td></tr><tr class="c20"><td class="c26" colspan="1" rowspan="1"><p class="c3">Scope</p></td><td class="c30" colspan="1" rowspan="1"><p class="c3">Applies to all instances of a selected cell type</p></td><td class="c19" colspan="1" rowspan="1"><p class="c3">Applies to a specific selected instance</p></td></tr><tr class="c12"><td class="c26" colspan="1" rowspan="1"><p class="c3">Control</p></td><td class="c30" colspan="1" rowspan="1"><p class="c3">Global for that cell type</p></td><td class="c19" colspan="1" rowspan="1"><p class="c3">Local and selective</p></td></tr><tr class="c20"><td class="c26" colspan="1" rowspan="1"><p class="c3">Use case</p></td><td class="c30" colspan="1" rowspan="1"><p class="c3">Used when many similar cells need spacing (e.g., all CTS buffers)</p></td><td class="c19" colspan="1" rowspan="1"><p class="c3">Used when only a few cells need spacing</p></td></tr><tr class="c20"><td class="c26" colspan="1" rowspan="1"><p class="c3">Impact on placement</p></td><td class="c30" colspan="1" rowspan="1"><p class="c3">Affects overall placement density</p></td><td class="c19" colspan="1" rowspan="1"><p class="c3">Minimal impact on overall placement</p></td></tr><tr class="c12"><td class="c26" colspan="1" rowspan="1"><p class="c3">Flexibility</p></td><td class="c30" colspan="1" rowspan="1"><p class="c3">Less flexible</p></td><td class="c19" colspan="1" rowspan="1"><p class="c3">More flexible and precise</p></td></tr><tr class="c20"><td class="c26" colspan="1" rowspan="1"><p class="c3">Example</p></td><td class="c30" colspan="1" rowspan="1"><p class="c3">Padding applied to all BUFX16 cells</p></td><td class="c19" colspan="1" rowspan="1"><p class="c3">Padding applied only to BUFX16/U123 instance</p></td></tr></tbody></table>
<hr>
<p class="c3 c18"></p>
<h3 class="c13" id="h.yzlydciiuws">Summary in Simple Words</h3>
<ul class="c9 lst-kix_casz11v3nfcg-0 start"><li class="c3 c10 li-bullet-0">Cell Padding = Generic padding for a cell type.<br /></li><li class="c3 c10 li-bullet-0">Instance Padding = Special padding for a particular cell instance.</li></ul>
<p class="c31"><img alt="" src="/assets/modules/module14/image8.png" title="" class="native-img"></p>`},{id:`ch_331_scan_chain_reordering`,title:`Scan Chain Reordering`,html:`<p class="c8">Scan chain reordering is the process of reconnecting and rearranging the order of flip-flops in scan chains after placement to optimize routing, timing, and congestion.</p>
<p class="c8">During logic synthesis or DFT insertion (for example, using Synopsys DFT Compiler), scan chains are connected in a logical sequence without considering physical location. As a result, the initial scan chain ordering may be suboptimal for routing in the placed design.</p>
<p class="c8">Therefore, scan chain reordering is performed after standard cell placement so that the scan chain routing becomes more optimal with respect to physical location, timing, and congestion.</p>
<p class="c8">Based on timing and congestion analysis, the placement tool or DFT tool intelligently reorders the scan connections while maintaining the same number of flip-flops in each scan chain. This ensures that testability is not compromised.</p>
<p class="c8">During placement optimization, if scan chains are temporarily detached, the original chain ordering may get disrupted. In such cases, scan reordering is necessary to restore and optimize the scan chain structure for better physical design quality.</p>
<hr>
<p class="c8 c18"></p>`},{id:`ch_339_why_scan_chain_reordering_is_important`,title:`Why Scan Chain Reordering is Important`,html:`<p class="c8">Scan chain reordering is performed for the following key reasons:</p>
<ol class="c9 lst-kix_huu1ta2y4djz-0 start" start="1"><li class="c3 c10 li-bullet-0">Reduce Routing Congestion<br /></li></ol>
<ul class="c9 lst-kix_huu1ta2y4djz-1 start"><li class="c8 c10 c21 li-bullet-0">Shorter and more localized scan routes reduce congestion, especially in dense regions.<br /></li></ul>
<ol class="c9 lst-kix_huu1ta2y4djz-0" start="2"><li class="c3 c10 li-bullet-0">Improve Timing of Scan Paths<br /></li></ol>
<ul class="c9 lst-kix_huu1ta2y4djz-1 start"><li class="c8 c10 c21 li-bullet-0">Reordering minimizes long scan connections, reducing delay in scan paths.<br /></li></ul>
<ol class="c9 lst-kix_huu1ta2y4djz-0" start="3"><li class="c3 c10 li-bullet-0">Reduce Wire Length<br /></li></ol>
<ul class="c9 lst-kix_huu1ta2y4djz-1 start"><li class="c8 c10 c21 li-bullet-0">Reordering ensures that physically closer flip-flops are connected together, minimizing total scan wire length.<br /></li></ul>
<ol class="c9 lst-kix_huu1ta2y4djz-0" start="4"><li class="c3 c10 li-bullet-0">Reduce Crosstalk and Noise<br /></li></ol>
<ul class="c9 lst-kix_huu1ta2y4djz-1 start"><li class="c8 c10 c21 li-bullet-0">Shorter and cleaner routing helps in reducing coupling noise in scan nets.<br /></li></ul>
<ol class="c9 lst-kix_huu1ta2y4djz-0" start="5"><li class="c3 c10 li-bullet-0">Improve Power and Signal Integrity<br /></li></ol>
<ul class="c9 lst-kix_huu1ta2y4djz-1 start"><li class="c8 c10 c21 li-bullet-0">Optimized scan routing reduces unnecessary switching and improves overall signal integrity.<br /></li></ul>
<hr>
<p class="c8 c18"></p>`},{id:`ch_353_when_scan_chain_reordering_is_performed`,title:`When Scan Chain Reordering is Performed`,html:`<p class="c8">Scan chain reordering is typically done at the following stages:</p>
<ul class="c9 lst-kix_v1wpbi3onkgc-0 start"><li class="c3 c10 li-bullet-0">After standard cell placement<br /></li><li class="c3 c10 li-bullet-0">Before Clock Tree Synthesis (CTS)<br /></li><li class="c3 c10 li-bullet-0">Before detailed routing<br /></li></ul>
<p class="c8">This ensures that scan chains are physically optimized before final routing.</p>
<hr>
<p class="c8 c18"></p>`},{id:`ch_359_how_scan_chain_reordering_works_tool_per`,title:`How Scan Chain Reordering Works (Tool Perspective)`,html:`<p class="c8">The tool analyzes:</p>
<ul class="c9 lst-kix_rd77tw8qit8d-0 start"><li class="c3 c10 li-bullet-0">Physical location of flip-flops<br /></li><li class="c3 c10 li-bullet-0">Congestion maps<br /></li><li class="c3 c10 li-bullet-0">Timing slack<br /></li><li class="c3 c10 li-bullet-0">Routing resources<br /></li></ul>
<p class="c8">Based on this, it:</p>
<ul class="c9 lst-kix_px0qhxqw5r6g-0 start"><li class="c3 c10 li-bullet-0">Breaks the existing scan chain connections if needed<br /></li><li class="c3 c10 li-bullet-0">Reconnects flip-flops in a new order that minimizes routing distance<br /></li><li class="c3 c10 li-bullet-0">Preserves the total number of flip-flops per scan chain<br /></li></ul>
<hr>
<p class="c8 c18"></p>`},{id:`ch_366_additional_important_points`,title:`Additional Important Points`,html:`<ul class="c9 lst-kix_6v5e7i2zad14-0 start"><li class="c3 c10 li-bullet-0">Scan chain reordering does not change functionality of the design.<br /></li><li class="c3 c10 li-bullet-0">It only changes the physical ordering of scan connections.<br /></li><li class="c3 c10 li-bullet-0">It helps in achieving cleaner routing during detailed routing.<br /></li><li class="c3 c10 li-bullet-0">It reduces the risk of DRC violations related to scan nets.<br /></li><li class="c3 c10 li-bullet-0">It can significantly reduce total scan wire length and via count.<br /></li><li class="c3 c10 li-bullet-0">It is especially useful in large SoC designs with thousands of flip-flops.<br /></li><li class="c3 c10 li-bullet-0">Scan reordering must be followed by scan chain verification to ensure no breaks in the chain.</li></ul>
<p class="c8"><br />Logical Netlist : this will present in synthesis </p>
<p class="c4"><img alt="" src="/assets/modules/module14/image3.png" title="" class="native-img"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c0"></p>
<p class="c4">Physical Sythesis Netlist: Before Reordering : after placing cells </p>
<p class="c4"><img alt="" src="/assets/modules/module14/image1.png" title="" class="native-img"></p>
<p class="c4">Physical Netlist is reordered based on placement: Reordered scan chain requires much less routing resources in the example design.</p>
<p class="c0"></p>
<p class="c4"><img alt="" src="/assets/modules/module14/image7.png" title="" class="native-img"></p>
<hr>
<p class="c0"></p>`},{id:`ch_380_congestion_effect_of_scan_chain_reorderi`,title:`Congestion Effect of Scan Chain Reordering`,html:`<p class="c8">During placement optimization, the original scan chain connections may become difficult to route due to local or global congestion in the design. In such cases, the tool automatically reorders the scan chain connections to reduce routing congestion.</p>
<p class="c8">By reordering the scan chain, the tool attempts to connect physically closer flip-flops, thereby reducing long detours, congestion hot spots, and routing complexity in dense regions of the layout.</p>
<hr>
<p class="c0"></p>`},{id:`ch_385_timing_effect_of_scan_chain_reordering`,title:`Timing Effect of Scan Chain Reordering`,html:`<p class="c8">In some cases, scan chain reordering may introduce or worsen hold time violations in the scan path. This happens because the physical distance between connected flip-flops may change, affecting timing characteristics.</p>
<p class="c8">To resolve these hold time issues, buffers may need to be inserted into the scan path. This additional buffering helps meet timing requirements but may slightly increase scan path delay or area.</p>
<p class="c8">Due to these timing adjustments, the tool may not always be able to maintain the exact original scan chain length (in terms of delay or buffering), although the number of flip-flops in the chain remains unchanged.</p>
<p class="c8">Scan chain reordering cannot swap or mix flip-flops from different clock domains. Each scan chain must remain within its original clock domain to preserve functional correctness and test integrity.</p>
<hr>
<p class="c0"></p>`},{id:`ch_392_impact_on_atpg_patterns`,title:`Impact on ATPG Patterns`,html:`<p class="c8">Because of scan chain reordering, the scan chain structure generated earlier may no longer be valid. However, this is not a major issue because ATPG (Automatic Test Pattern Generation) can be performed again using the updated netlist with the new scan chain ordering.</p>
<p class="c8">By regenerating test patterns after scan reordering, complete test coverage can still be maintained without any functional loss.</p>
<hr>
<p class="c8 c18"></p>`},{id:`ch_398_placement_density_and_placement_checks`,title:`Placement Density and Placement Checks`,html:`<p class="c8">In any physical design flow, Placement and Routing are the two primary and most critical stages. To achieve better Quality of Results (QoR) in routing, engineers must first analyze and optimize placement density.</p>
<p class="c8">As technology nodes continue to shrink, it has been observed that initial placement utilization is becoming lower and lower in order to make designs routable. Therefore, placement density analysis plays a crucial role in achieving better routing results with fewer iterations.</p>
<p class="c8">Performing placement density checks early in the design helps identify potential congestion issues and allows designers to take corrective actions before detailed routing.</p>
<hr>
<p class="c8 c18"></p>`},{id:`ch_404_placement_checks`,title:`Placement Checks`,html:`<h3 class="c16" id="h.r0j01rgbn3d">1. Legality of Cell Placement</h3>
<p class="c8">This involves checking whether all cells are legally placed according to placement grid, site rows, blockages, and design constraints. Any overlap, off-grid placement, or placement inside blockages must be corrected during legalization.</p>
<hr>
<p class="c8 c18"></p>
<h3 class="c16" id="h.xf0dw4d709zu">2. Timing Checks</h3>
<p class="c8">Timing must be analyzed at:</p>
<ul class="c9 lst-kix_39z0cvwnehq7-0 start"><li class="c3 c10 li-bullet-0">Module level<br /></li><li class="c3 c10 li-bullet-0">Path-by-path level<br /></li></ul>
<p class="c8">This ensures that placement does not degrade timing performance and that critical paths are properly optimized.</p>
<hr>
<p class="c8 c18"></p>
<h3 class="c16" id="h.9sal2eu9l13m">3. Congestion Analysis</h3>
<p class="c8">Congestion is defined as:</p>
<p class="c8"><img alt="" src="/assets/modules/module14/image6.png" title="" class="native-img"></p>
<p class="c8">To reduce congestion, the following must be controlled:</p>
<ul class="c9 lst-kix_dti1mm52yca-0 start"><li class="c3 c10 li-bullet-0">Cell density<br /></li><li class="c3 c10 li-bullet-0">Pin density<br /></li><li class="c3 c10 li-bullet-0">Criss-cross routing due to improper cell placement<br /></li></ul>
<p class="c8">Congestion management techniques include:</p>
<ul class="c9 lst-kix_t3ac6glqv27y-0 start"><li class="c3 c10 li-bullet-0">Soft, partial, and hard blockages<br /></li><li class="c3 c10 li-bullet-0">Region-based constraints<br /></li><li class="c3 c10 li-bullet-0">Power domain fences<br /></li><li class="c3 c10 li-bullet-0">Keep-out margins<br /></li></ul>
<hr>
<p class="c8 c18"></p>
<h3 class="c16" id="h.861pqojh5a0y">4. Density Analysis</h3>
<p class="c8">Density is analyzed in two major aspects:</p>
<p class="c8">i. Pin Density<br /> ii. Cell Density</p>
<h4 class="c34" id="h.hsnyheq4mcec">Condition 1: High Pin Density but Acceptable Cell Density</h4>
<p class="c8">In this case, routing congestion is mainly due to high pin density. Partial blockages or cell padding can be used to spread out cells.</p>
<h4 class="c34" id="h.w6lolbll6k38">Condition 2: High Cell Density but Acceptable Pin Density</h4>
<p class="c8">In this case, placement density screens or partial blockages are used to reduce local cell density.</p>
<p class="c8">If both pin density and cell density are high, a combination of soft, partial, and hard blockages may be required.</p>
<hr>
<p class="c8 c18"></p>`},{id:`ch_434_pin_density`,title:`Pin Density`,html:`<p class="c8">High-pin-density cells are difficult to route when placed too close together. To improve routability and reduce congestion, the following variables can be set before running compile_ultra:</p>
<h3 class="c16" id="h.pnxb8qn9avgm">Enable High Pin Density Cell Spreading</h3>
<p class="c8">dc_shell&gt; set_app_var compile_high_pin_density_cell_spreading true</p>
<p class="c8 c18"></p>
<p class="c8">This variable is false by default. When enabled, the tool spreads out high pin-density cells during placement.</p>
<h3 class="c16" id="h.dbypln1p6wcc">Set Pin Density Threshold</h3>
<p class="c8">dc_shell&gt; set_app_var compile_high_pin_density_cell_spreading_threshold 0.75</p>
<p class="c8 c18"></p>
<p class="c8">Cells with pin density exceeding this threshold will be spread apart.</p>
<p class="c8">If this threshold is not specified, the default value is 0.9.</p>
<p class="c8">Pin density can also be reduced using:</p>
<ul class="c9 lst-kix_6to7x4usgy8t-0 start"><li class="c3 c10 li-bullet-0">Partial blockages<br /></li><li class="c3 c10 li-bullet-0">Cell padding<br /></li></ul>
<p class="c8">(Refer to the earlier section on Cell Padding for details.)</p>
<hr>
<p class="c8 c18"></p>`},{id:`ch_450_cell_density`,title:`Cell Density`,html:`<p class="c8">For designs that are not primarily focused on congestion removal, coarse placement mode allows cells to clump together instead of being evenly distributed. This can improve wire length QoR for low-utilization designs.</p>
<p class="c8">To control how tightly cells are allowed to clump, use:</p>
<p class="c8">dc_shell-topo&gt; set_app_var placer_max_cell_density_threshold 0.7</p>
<p class="c8 c18"></p>
<p class="c8">This value should be above the overall utilization but below 1.0.</p>
<p class="c8">Example:<br /> If global utilization is 50% (0.5), a reasonable threshold is between 0.5 and 1.0 (e.g., 0.7).</p>
<h3 class="c16" id="h.2tsau3w6pq9a">Tool Default Behavior (If Not Set by User)</h3>
<p class="c8">If this variable is not set, the tool automatically assigns a value based on utilization:</p>
<table class="c24"><tbody><tr class="c12"><td class="c32" colspan="1" rowspan="1"><p class="c31">Utilization</p></td><td class="c39" colspan="1" rowspan="1"><p class="c31">Threshold During Compile</p></td><td class="c29" colspan="1" rowspan="1"><p class="c31">Threshold During Incremental Compile</p></td></tr><tr class="c12"><td class="c32" colspan="1" rowspan="1"><p class="c8">&lt; 40%</p></td><td class="c39" colspan="1" rowspan="1"><p class="c8">0.7</p></td><td class="c29" colspan="1" rowspan="1"><p class="c8">0.7</p></td></tr><tr class="c12"><td class="c32" colspan="1" rowspan="1"><p class="c8">40% – 60%</p></td><td class="c39" colspan="1" rowspan="1"><p class="c8">0.6</p></td><td class="c29" colspan="1" rowspan="1"><p class="c8">0.7</p></td></tr><tr class="c12"><td class="c32" colspan="1" rowspan="1"><p class="c8">60% – 65%</p></td><td class="c39" colspan="1" rowspan="1"><p class="c8">-1 (default)</p></td><td class="c29" colspan="1" rowspan="1"><p class="c8">0.7</p></td></tr><tr class="c12"><td class="c32" colspan="1" rowspan="1"><p class="c8">&gt; 65%</p></td><td class="c39" colspan="1" rowspan="1"><p class="c8">-1 (default)</p></td><td class="c29" colspan="1" rowspan="1"><p class="c8">-1 (default)</p></td></tr></tbody></table>
<p class="c8">After compile completes, the tool restores the variable to its default value (-1).</p>
<p class="c8">This variable is not automatically transferred to IC Compiler, so it must be set consistently in both Design Compiler and IC Compiler.</p>
<p class="c8">If the user sets a value lower than 0.5 for a low-utilization design, the tool will still honor it but will issue a warning.</p>
<p class="c8"><img alt="" src="/assets/modules/module14/image15.png" title="" class="native-img"></p>
<p class="c0"></p>
<hr>
<p class="c4">Post-Placement Checks</p>
<p class="c8">After placement, several checks are performed to ensure that the design is legal, timing-clean, and ready for further optimization and routing. These checks help in identifying placement-related issues early in the flow.</p>
<hr>
<p class="c0"></p>`},{id:`ch_470_1_cell_legality`,title:`1. Cell Legality`,html:`<h3 class="c16" id="h.g0w8ilmavq49">Legalization</h3>
<p class="c8">During legalization, the placement tool moves cells to legal locations on the placement grid and removes any cell overlaps. These movements are typically small but can change the length of interconnects between cells, which may introduce new timing violations.</p>
<p class="c8">Such violations are usually fixed using incremental optimization techniques, such as resizing driving cells, inserting buffers, or slight cell movement.</p>
<p class="c8">Placement constraints guide the tool during placement, optimization, and legalization to minimize congestion and timing violations. These constraints include:</p>
<ul class="c9 lst-kix_1vh5jgqvq73y-0 start"><li class="c3 c10 li-bullet-0">Placement blockages<br /></li><li class="c3 c10 li-bullet-0">Placement bounds<br /></li><li class="c3 c10 li-bullet-0">Density constraints<br /></li><li class="c3 c10 li-bullet-0">Cell spacing constraints<br /></li></ul>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.a4dzsllhnea8">check_legality</h3>
<p class="c8">The check_legality command is used to verify cell placement legality. It reports violations related to:</p>
<ul class="c9 lst-kix_hxneax6615q7-0 start"><li class="c3 c10 li-bullet-0">Cell overlaps<br /></li><li class="c3 c10 li-bullet-0">Incorrect cell orientation<br /></li><li class="c3 c10 li-bullet-0">Off-grid placement<br /></li></ul>
<p class="c8">This ensures that all cells are placed in valid legal positions before proceeding further.</p>
<hr>
<p class="c0"></p>`},{id:`ch_484_2_timing_qor_quality_of_results_`,title:`2. Timing QoR (Quality of Results)`,html:`<p class="c8">At the placement stage, we have information about the physical locations of cells but not the exact routing connections between them. Since different metal layers have different resistance and capacitance characteristics, our timing estimation based purely on placement may be inaccurate.</p>
<p class="c8">To reduce this uncertainty, we perform a fast approximate routing, known as Trial Route or Early Global Route, to get more realistic timing estimates before final routing.</p>
<hr>
<p class="c0"></p>`},{id:`ch_489_early_global_route_trial_route_`,title:`Early Global Route (Trial Route)`,html:`<p class="c8">Trial routing is a fast signal routing step used primarily for:</p>
<ul class="c9 lst-kix_1asxj42iur8k-0 start"><li class="c3 c10 li-bullet-0">Parasitic extraction<br /></li><li class="c3 c10 li-bullet-0">Timing analysis<br /></li><li class="c3 c10 li-bullet-0">Congestion analysis<br /></li></ul>
<p class="c8">Trial route:</p>
<ul class="c9 lst-kix_uizkirpl120-0 start"><li class="c3 c10 li-bullet-0">Is not DRC or LVS clean<br /></li><li class="c3 c10 li-bullet-0">Does not fix detailed routing violations<br /></li><li class="c3 c10 li-bullet-0">Provides a good prediction of congestion<br /></li><li class="c3 c10 li-bullet-0">Helps physical synthesis use more accurate parasitic data during timing optimization<br /></li></ul>
<p class="c8">By running trial route, the tool extracts RC values that are closer to real routing conditions, allowing better timing estimation.</p>
<p class="c8">The tool also provides statistics about routing track usage, which helps in congestion analysis.</p>
<p class="c8">At this stage, timing analysis is performed mainly for setup timing, since the clock is still ideal and Clock Tree Synthesis (CTS) has not yet been done.</p>
<hr>
<p class="c0"></p>`},{id:`ch_499_steps_for_timing_analysis_after_placemen`,title:`Steps for Timing Analysis After Placement`,html:`<h3 class="c16" id="h.53y7fa6m311f">Step 1: Overall QoR Analysis</h3>
<p class="c8">Check the report_qor or timing report for overall timing violations across all active corners and path groups. This provides a high-level view of design health.</p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.dy38qzf1bv32">Step 2: Investigate Worst Violating Paths</h3>
<p class="c8">Identify the most violating paths in the placement database and highlight them in the P&amp;R GUI.</p>
<p class="c8">If the startpoint and endpoint of a critical path are far apart, it usually indicates poor floorplanning or macro placement. In such cases, adjusting floorplan or macro placement may significantly improve timing.</p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.i6gfzjh3o90t">Step 3: Investigate SDC Constraints</h3>
<p class="c8">If start and endpoint proximity is not the issue, the root cause may lie in SDC constraints such as:</p>
<ul class="c9 lst-kix_chbv8kr3baob-0 start"><li class="c3 c10 li-bullet-0">Incorrect clock definitions<br /></li><li class="c3 c10 li-bullet-0">Missing or wrong input/output delays<br /></li><li class="c3 c10 li-bullet-0">Incorrect multicycle or false path definitions<br /></li></ul>
<p class="c8">At this stage, SDC should be reviewed and corrected if necessary.</p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.uck1cqmw601u">Step 4: Acceptable Timing Before Placement Exit</h3>
<p class="c8">Before exiting placement stage, ensure that timing violations are within a reasonable and expected range. If violations are too high, further placement optimization is required before moving to CTS.</p>
<hr>
<p class="c0"></p>`},{id:`ch_519_important_reports_and_commands`,title:`Important Reports and Commands`,html:`<h3 class="c16" id="h.ak6wgnc009c1">check_timing</h3>
<p class="c8">Checks for constraint issues such as:</p>
<ul class="c9 lst-kix_qg0mrklzz3qv-0 start"><li class="c3 c10 li-bullet-0">Undefined clocks<br /></li><li class="c3 c10 li-bullet-0">Missing input arrival times<br /></li><li class="c3 c10 li-bullet-0">Missing output constraints<br /></li></ul>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.2oj15o2ww7l5">report_qor</h3>
<p class="c8">Reports:</p>
<ul class="c9 lst-kix_lgywgu1a3al5-0 start"><li class="c3 c10 li-bullet-0">Timing performance of each path group<br /></li><li class="c3 c10 li-bullet-0">Cell count and area statistics<br /></li><li class="c3 c10 li-bullet-0">Combinational, non-combinational, and total area<br /></li><li class="c3 c10 li-bullet-0">Static power<br /></li><li class="c3 c10 li-bullet-0">Design rule violations<br /></li><li class="c3 c10 li-bullet-0">Compile-time details<br /></li></ul>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.za8kw2migom4">report_constraint</h3>
<p class="c8">Indicates whether the design meets constraints related to:</p>
<ul class="c9 lst-kix_r4beiceztq4j-0 start"><li class="c3 c10 li-bullet-0">Timing<br /></li><li class="c3 c10 li-bullet-0">Area<br /></li><li class="c3 c10 li-bullet-0">Power<br /></li><li class="c3 c10 li-bullet-0">Design rules<br /></li></ul>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.5wv51sk845c3">report_timing</h3>
<p class="c8">Provides detailed timing information for worst-slack paths, including:</p>
<ul class="c9 lst-kix_hqd5mcslyzd5-0 start"><li class="c3 c10 li-bullet-0">Delay breakdown<br /></li><li class="c3 c10 li-bullet-0">Slack values<br /></li><li class="c3 c10 li-bullet-0">Path points (cell by cell)<br /></li></ul>
<p class="c8">This report is very useful for debugging timing violations and deciding corrective actions.</p>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.a9tpjcjn3vt5">check_mv_design</h3>
<p class="c8">Verifies:</p>
<ul class="c9 lst-kix_r3ruvqhqbx2f-0 start"><li class="c3 c10 li-bullet-0">Multivoltage constraints<br /></li><li class="c3 c10 li-bullet-0">Electrical isolation requirements<br /></li><li class="c3 c10 li-bullet-0">Power domain connection rules<br /></li></ul>
<hr>
<p class="c0"></p>
<h3 class="c16" id="h.e4m57dv1ww61">report_clock_timing</h3>
<p class="c8">Reports:</p>
<ul class="c9 lst-kix_xojrqif1l510-0 start"><li class="c3 c10 li-bullet-0">Clock latency<br /></li><li class="c3 c10 li-bullet-0">Clock transition time<br /></li><li class="c3 c10 li-bullet-0">Clock skew<br /></li></ul>
<p class="c8">at specified clock pins of sequential elements in the design.</p>
<p class="c8 c18"></p>
<p class="c8 c18"></p>
<p class="c31">PLACEMENT SCRIPT</p>
<p class="c8 c18"></p>
<p class="c8"><img alt="" src="/assets/modules/module14/image13.png" title="" class="native-img"></p>
<p class="c8 c18"></p>
<p class="c8"><img alt="" src="/assets/modules/module14/image9.png" title="" class="native-img"></p>
<p class="c0"></p>`}],a={moduleLayout:`_moduleLayout_rwarx_4`,header:`_header_rwarx_20`,title:`_title_rwarx_22`,subtitle:`_subtitle_rwarx_33`,topicsNav:`_topicsNav_rwarx_41`,navSectionsWrapper:`_navSectionsWrapper_rwarx_54`,slideDown:`_slideDown_rwarx_1`,navSection:`_navSection_rwarx_54`,navTitle:`_navTitle_rwarx_64`,navButtonsGrid:`_navButtonsGrid_rwarx_74`,topicNavBtn:`_topicNavBtn_rwarx_76`,toggleWrapper:`_toggleWrapper_rwarx_101`,toggleBtn:`_toggleBtn_rwarx_103`,toggleIcon:`_toggleIcon_rwarx_129`,toggleCount:`_toggleCount_rwarx_131`,mainContent:`_mainContent_rwarx_140`,contentCard:`_contentCard_rwarx_142`,chapterTitle:`_chapterTitle_rwarx_156`,chapterBody:`_chapterBody_rwarx_167`},o=t(),s=6,c=()=>{let[e,t]=(0,r.useState)(!1),[n,c]=(0,r.useState)(!1),[l,u]=(0,r.useState)(!1),d=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},f=e=>e.preventDefault(),p=i.slice(0,15),m=i.slice(15,30),h=i.slice(30),g=(e,t,n,r)=>(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:r}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(t?e:e.slice(0,s)).map(e=>(0,o.jsx)(`button`,{onClick:()=>d(e.id),className:a.topicNavBtn,title:e.title,children:e.title},e.id))}),e.length>s&&(0,o.jsx)(`div`,{className:a.toggleWrapper,children:(0,o.jsx)(`button`,{className:a.toggleBtn,onClick:()=>n(!t),children:t?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▲`}),` See Less`]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▼`}),` See More `,(0,o.jsxs)(`span`,{className:a.toggleCount,children:[`+`,e.length-s]})]})})})]});return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:f,onContextMenu:f,onSelectStart:f,onDragStart:f,children:[(0,o.jsxs)(`div`,{className:a.header,children:[(0,o.jsx)(`h1`,{className:a.title,children:`Module 14 - Placement`}),(0,o.jsx)(`p`,{className:a.subtitle,children:`Master cell placement fundamentals including pre-placement, coarse and detailed placement, legalization, magnet placement, bounds, congestion analysis & reduction, scan chain reordering, and placement checks.`})]}),(0,o.jsx)(`section`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[g(p,e,t,`Placement & Bounds`),g(m,n,c,`Congestion Analysis`),g(h,l,u,`Scan Chain, Density & Checks`)]})}),(0,o.jsx)(`main`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`article`,{id:e.id,className:a.contentCard,children:[(0,o.jsx)(`h2`,{className:a.chapterTitle,children:e.title}),(0,o.jsx)(`div`,{className:a.chapterBody,dangerouslySetInnerHTML:{__html:e.html}})]},e.id))})]})};export{c as default};