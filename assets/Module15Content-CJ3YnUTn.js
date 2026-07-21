import{p as e,r as t,u as n}from"./index-BxfU5AUR.js";var r=e(n(),1),i=[{id:`ch_0_goals_of_clock_tree_synthesis_cts_`,title:`Goals of Clock Tree Synthesis (CTS)`,html:`<p class="c10">The main problem statement of Clock Tree Synthesis (CTS) is: given a clock source, a set of clock sinks, and their interconnections, determine a clock distribution solution that satisfies all CTS objectives.</p>
<p class="c10">The primary goals of CTS are:</p>
<ol class="c7 lst-kix_umf71ll00dky-0 start" start="1"><li class="c5 li-bullet-0">Minimize clock insertion delay<br /></li><li class="c5 li-bullet-0">Minimize clock skew<br /></li><li class="c5 li-bullet-0">Meet clock tree DRC constraints, such as:<br /></li></ol>
<ul class="c7 lst-kix_umf71ll00dky-1 start"><li class="c9 li-bullet-0">Maximum fanout<br /></li><li class="c9 li-bullet-0">Maximum transition (slew)<br /></li><li class="c9 li-bullet-0">Maximum capacitance<br /></li></ul>
<p class="c10">These goals ensure that the clock reaches all sequential elements with acceptable delay, minimal variation, and without violating electrical or physical design rules.</p>
<hr>
<p class="c6"></p>`},{id:`ch_8_types_of_clock_trees`,title:`Types of Clock Trees`,html:`<p class="c10">Before CTS, the clock is treated as ideal, meaning all registers are assumed to receive the clock from a single point with zero delay and zero skew. However, this is not practical in real silicon.</p>
<p class="c10">In a real implementation, distributing a single ideal clock directly to all registers would result in:</p>
<ul class="c7 lst-kix_2k1flptbhhqu-0 start"><li class="c5 li-bullet-0">Very large net lengths<br /></li><li class="c5 li-bullet-0">High insertion delay<br /></li><li class="c5 li-bullet-0">Poor signal integrity<br /></li><li class="c5 li-bullet-0">Excessive power consumption<br /></li><li class="c5 li-bullet-0">Fanout violations<br /></li></ul>
<p class="c10">Therefore, in actual designs, buffers are inserted along the clock path to control fanout, reduce delay, improve signal quality, and optimize power.</p>
<p class="c10">Broadly, clock distribution networks can be classified into three types:</p>
<hr>
<p class="c6"></p>
<h3 class="c19" id="h.4p0zsd8lt28x">1. Clock Tree</h3>
<p class="c10">In this approach, the clock network is built as a hierarchical branching structure, which resembles a tree.</p>
<p class="c10">An ideal clock tree is often represented as an H-tree, where the clock is symmetrically distributed. However, in practice, we construct a realistic clock tree and then optimize skew based on design requirements.</p>
<p class="c10">Due to the inherent structure of a clock tree, sinks that are connected to the same buffer or branch tend to have lower skew, since they are physically closer and share similar clock paths.</p>
<p class="c10">This approach balances insertion delay, skew, power, and area effectively for most designs.</p>
<hr>
<p class="c6"></p>
<h3 class="c19" id="h.ttoqzxvaud5v">2. Clock Mesh / Clock Grid / Multisource Clock Tree</h3>
<p class="c10">In this approach, instead of a branching tree, a grid or mesh of clock signals is created across the chip. The clock is tapped from this grid wherever needed.</p>
<p class="c10">Advantages:</p>
<ul class="c7 lst-kix_obaakqvux7tl-0 start"><li class="c5 li-bullet-0">Lower insertion delay compared to a pure tree<br /></li><li class="c5 li-bullet-0">Very low skew across the chip<br /></li><li class="c5 li-bullet-0">More uniform clock distribution<br /></li></ul>
<p class="c10">Disadvantages:</p>
<ul class="c7 lst-kix_o56lc043hedy-0 start"><li class="c5 li-bullet-0">Significantly higher power consumption<br /></li><li class="c5 li-bullet-0">Increased routing area<br /></li><li class="c5 li-bullet-0">Higher metal usage<br /></li></ul>
<p class="c10">This approach is typically used in very high-performance designs where skew control is more critical than power.</p>
<hr>
<p class="c6"></p>
<h3 class="c19" id="h.ec6fswpbwsmy">3. Clock Spine</h3>
<p class="c10">In the clock spine approach, a thick vertical metal line (spine) is used as the main clock backbone. All further clock routing branches off from this central spine.</p>
<p class="c10">While this simplifies clock distribution, it introduces higher skew as we move farther away from the spine. Therefore, this approach is less commonly used in modern high-performance designs compared to tree or mesh structures.</p>
<p class="c6"></p>
<p class="c15">The image below shows a schematic comparison of a clock tree and a clock mesh</p>
<p class="c15"><img alt="" src="/assets/modules/module15/image3.png" title="" class="native-img"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>`},{id:`ch_42_clock_tree_references`,title:`Clock Tree References`,html:`<p class="c10">A Clock Tree Reference contains all the buffers and inverters available in the technology library (Liberty file) that can be used for building the clock tree.</p>
<p class="c10">IC Compiler (ICC) uses four separate clock tree reference lists:</p>
<ol class="c7 lst-kix_lbhnyq8aib0h-0 start" start="1"><li class="c5 li-bullet-0">One for Clock Tree Synthesis (CTS)<br /></li><li class="c5 li-bullet-0">One for Boundary Cell Insertion<br /></li><li class="c5 li-bullet-0">One for Sizing<br /></li><li class="c5 li-bullet-0">One for Delay Insertion<br /></li></ol>
<p class="c10">These separate reference lists allow the tool to use different sets of cells for different stages of clock optimization and implementation.</p>
<hr>
<p class="c6"></p>`},{id:`ch_49_clock_skew_groups`,title:`Clock Skew Groups`,html:`<p class="c10">A Clock Skew Group is a subset of a clock tree in which skew balancing or skew analysis is performed. This means that an endpoint (sink) is balanced only with respect to other endpoints in its own skew group.</p>
<p class="c10">By default, all clock sinks belong to a single skew group. However, skew groups can be explicitly defined by the designer, and a single endpoint or sink can belong to multiple skew groups if required.</p>
<p class="c10">Skew grouping is useful when different parts of the design have different timing requirements or when certain sinks must be balanced separately.</p>
<hr>
<p class="c6"></p>`},{id:`ch_55_interclock_delay_balancing`,title:`Interclock Delay Balancing`,html:`<p class="c10">Interclock delay balancing is the process of balancing skew between different clock trees, either as part of the clock optimization process or as a standalone step.</p>
<p class="c10">By default, interclock delay balancing uses the integrated clock global router to estimate wire delay and capacitance. This provides better correlation with post-route timing compared to purely ideal or estimated models.</p>
<p class="c10">This technique is important when multiple clocks interact in the design and relative skew between them must be controlled.</p>
<hr>
<p class="c6"></p>`},{id:`ch_61_analyzing_the_clock_tree`,title:`Analyzing the Clock Tree`,html:`<p class="c10">After CTS, the following checks and analyses should be performed to ensure a high-quality clock network:</p>
<ol class="c7 lst-kix_1jptqlv26yku-0 start" start="1"><li class="c5 li-bullet-0">Report Timing (both Setup and Hold)<br /> Verify that timing requirements are met across all corners and path groups.<br /></li><li class="c5 li-bullet-0">Check Clock Grouping (if timing is not met)<br /> If timing is failing, verify whether clocks should be grouped and balanced together.<br /></li><li class="c5 li-bullet-0">Report Insertion Delay and Skew<br /> Ensure that insertion delay and skew meet the defined targets.<br /></li><li class="c5 li-bullet-0">Report DRC Targets<br /> Check clock tree constraints such as:<br /></li></ol>
<ul class="c7 lst-kix_1jptqlv26yku-1 start"><li class="c9 li-bullet-0">Maximum fanout<br /></li><li class="c9 li-bullet-0">Maximum capacitance<br /></li><li class="c9 li-bullet-0">Maximum transition (slew)<br /></li></ul>
<ol class="c7 lst-kix_1jptqlv26yku-0" start="5"><li class="c5 li-bullet-0">Verify Clock Sink Reachability<br /> Ensure that all intended leaf cells (clock sinks) are properly reached by the clock tree.<br /></li><li class="c5 li-bullet-0">Check Clock Tree Exceptions<br /> Confirm that clock exceptions (false paths, multicycle paths, etc.) are not mistakenly included in the clock tree.<br /></li><li class="c5 li-bullet-0">Report Pre-existing Clock Cells<br /> Identify and analyze pre-existing cells such as clock gating cells in the clock network.<br /></li><li class="c5 li-bullet-0">Perform Quality-of-Results (QoR) Analysis<br /> Evaluate overall clock tree quality in terms of timing, power, area, and routability.<br /></li><li class="c5 li-bullet-0">Check Clock Tree Convergence<br /> Verify whether the clock tree has properly converged with itself or with another clock tree (if interclock balancing is used).<br /></li><li class="c5 li-bullet-0">Check Interclock Timing Relationship<br /> Ensure that timing relationships between different clock trees are correctly balanced.<br /></li><li class="c5 li-bullet-0">Check Design Rule Constraints (DRC)<br /> Verify that the clock tree meets all physical design rule constraints.<br /></li><li class="c5 li-bullet-0">Check Routing Constraints<br /> Ensure that the clock routing follows metal layer usage, shielding, spacing, and preferred direction rules.<br /></li><li class="c5 li-bullet-0">Report Power and Area<br /> Analyze clock power consumption and area overhead introduced by the clock tree.</li></ol>
<p class="c6"></p>
<hr>
<p class="c6"></p>`},{id:`ch_69_useful_skew`,title:`Useful Skew`,html:`<p class="c10">In traditional clock tree design, the objective is to achieve zero skew or balanced skew, meaning that all clock sinks receive the clock edge at the same time (or as close as physically possible). This is done by keeping the clock insertion delay to each register equal.</p>
<p class="c10">With zero skew, the clock design becomes independent of the data path design. The designer ensures that all sequential elements receive the clock within an acceptable variation, and timing closure depends only on whether the data paths can meet setup and hold requirements within the clock period.</p>
<p class="c10">However, achieving perfect zero skew in large and complex designs can be expensive in terms of power, area, and routing complexity. In some cases, deliberately introducing skew can actually help meet timing with lower cost. When intentional clock skew is introduced to improve timing, it is called useful skew.</p>
<p class="c10">Modern Place-and-Route (PnR) tools can enable useful skew as an optimization option during CTS and later stages. This allows the tool to adjust the clock arrival times at different registers to help meet timing while still staying within acceptable margins.<br /><br /></p>
<hr>
<p class="c6"></p>`},{id:`ch_76_example_of_useful_skew_to_fix_setup_viol`,title:`Example of Useful Skew to Fix Setup Violation`,html:`<p class="c10">Consider a design with zero skew but having a setup timing violation.</p>
<p class="c10">Assume:</p>
<ul class="c7 lst-kix_eywpl91jcq82-0 start"><li class="c5 li-bullet-0">Clock period = 10 ns<br /></li><li class="c5 li-bullet-0">Clock insertion delay to each register = 2 ns<br /></li><li class="c5 li-bullet-0">Setup time of flip-flops = 0 ns (for simplicity)<br /></li><li class="c5 li-bullet-0">Path1 combinational delay = 11 ns<br /></li><li class="c5 li-bullet-0">Path2 combinational delay = 5 ns</li></ul>
<p class="c10"><img alt="" src="/assets/modules/module15/image5.png" title="" class="native-img"><br /></p>
<h3 class="c19 c32" id="h.582l0jri634h"></h3>
<h3 class="c19" id="h.4wwzdn1316pp">Case 1: Zero Skew (No Useful Skew)</h3>
<p class="c10">Setup requirement for Path1 is:</p>
<p class="c15">Clock delay to FF1 + Path1 delay &lt; Clock delay to FF2 + Clock period  </p>
<p class="c15">2 ns + 11 ns &lt; 2 ns + 10 ns  </p>
<p class="c15">13 ns &lt; 12 ns   → Timing Violation  </p>
<p class="c6"></p>
<p class="c10">Thus, Path1 fails setup timing.</p>
<p class="c10">If we keep the clock network unchanged, we would need to reduce the combinational delay of Path1 by optimization (buffering, resizing, etc.).</p>
<p class="c10">Now check Path2 timing:</p>
<p class="c15">2 ns + 5 ns &lt; 2 ns + 10 ns  </p>
<p class="c15">7 ns &lt; 12 ns  → Pass (with large margin)</p>
<p class="c6"></p>
<p class="c10">Path2 has plenty of timing slack, meaning we are not fully utilizing the available cycle time. Ideally, we would like to borrow some time from Path2 to help Path1 without violating any other paths.</p>
<hr>
<p class="c6"></p>
<h3 class="c19" id="h.gn4hmfx6yg8g">Case 2: Introducing Useful Skew</h3>
<p class="c10">Now, introduce intentional skew by increasing the clock arrival time at FF2 by 2 ns (from 2 ns to 4 ns), while keeping FF1 at 2 ns.<br /><br /><img alt="" src="/assets/modules/module15/image4.png" title="" class="native-img"></p>
<p class="c10">Now Path1 setup becomes:</p>
<p class="c15">2 ns + 11 ns &lt; 4 ns + 10 ns  </p>
<p class="c15">13 ns &lt; 14 ns  → Pass  </p>
<p class="c6"></p>
<p class="c10">Path1 now meets timing due to useful skew.</p>
<p class="c10">However, we must recheck Path2:</p>
<p class="c15">4 ns + 5 ns &lt; 2 ns + 10 ns  </p>
<p class="c15">9 ns &lt; 12 ns  → Still Pass  </p>
<p class="c6"></p>
<p class="c10">Path2 still meets timing, although with reduced margin.</p>
<p class="c10">Now there is a 2 ns clock skew between FF1 and FF2, but overall timing is improved without heavy data-path optimization.</p>
<hr>
<p class="c6"></p>`},{id:`ch_112_conclusion`,title:`Conclusion`,html:`<p class="c10">When useful skew is enabled, PnR tools can intentionally adjust clock arrival times to different registers to improve setup timing with minimal changes to the data path. This can lead to better QoR with lower power, area, and runtime cost compared to strict zero-skew design.</p>
<hr>
<p class="c15">Concurrent Clock and Data Optimization (CCopt)</p>
<p class="c10">In the traditional backend ASIC design flow, Clock Tree Synthesis (CTS) is performed only after floorplanning, placement, and placement/physical optimization are completed. This means that data path optimization and clock tree construction are treated as largely separate sequential steps.</p>
<p class="c10">Concurrent Clock and Data Optimization (CCopt) takes a fundamentally different approach. In CCopt, there is no separate placement or physical optimization step after placement. Instead, physical optimization is merged directly with CTS to form a single integrated step called CCopt.</p>
<p class="c10">In the traditional CTS approach, the primary objective is to minimize clock skew as much as possible while meeting basic clock tree DRC constraints and then fix remaining timing violations through data path optimization.</p>
<p class="c10">In contrast, CCopt directly targets timing closure rather than focusing only on skew minimization. This is possible because CCopt has simultaneous control over all key variables that affect timing, including:</p>
<ul class="c7 lst-kix_v42dv0wbtkk7-0 start"><li class="c5 li-bullet-0">Data path delay,<br /></li><li class="c5 li-bullet-0">Launch clock latency, and<br /></li><li class="c5 li-bullet-0">Capture clock latency.<br /></li></ul>
<p class="c10">In CCopt, the tool first builds a clock tree that satisfies all clock DRC requirements (such as fanout, transition, and capacitance limits). After that, instead of performing extensive data path optimization alone, the tool uses useful skew as a primary mechanism to resolve remaining timing violations.</p>
<p class="c10">Thus, CCopt intelligently balances both clock and data paths together to achieve better timing convergence with potentially lower power, area, and runtime overhead compared to the traditional flow.</p>
<p class="c10">The figure below (to be added by you) illustrates the difference between the traditional ASIC design flow and the CCopt-based flow, clearly showing how placement optimization and CTS are merged in the CCopt approach.</p>
<p class="c15"><img alt="" src="/assets/modules/module15/image2.png" title="" class="native-img"></p>
<p class="c15"><img alt="" src="/assets/modules/module15/image7.png" title="" class="native-img"><br /><br />Clock Routing</p>
<p class="c10">Clock routes are extremely critical in any physical design because any issue in clock routing can cause glitches, slow transitions, excessive skew, noise, or signal integrity problems, which may ultimately affect the functionality and performance of the chip.</p>
<p class="c10">Therefore, clock nets are routed before the detailed routing of data nets. This stage is known as Clock Routing. Clock routing ensures that the clock network meets all electrical, timing, and physical constraints with high reliability.</p>
<h3 class="c19" id="h.opw93nt8xcya">Steps in Clock Routing</h3>
<p class="c10">Clock routing generally follows these steps:</p>
<ol class="c7 lst-kix_kkmhv9mxxbrb-0 start" start="1"><li class="c5 li-bullet-0">Specifying NDR (Non-Default Rules)<br /> Clock routing follows special routing rules known as Non-Default Rules (NDR). These rules are different from regular signal routing rules and are specifically defined for clock nets.<br /></li><li class="c5 li-bullet-0">Shielding Requirement<br /> Unlike regular data paths, clock paths require shielding to reduce crosstalk and noise. NDR rules include shielding requirements, and clock trees are assigned these rules by default.<br /><br /> In shielding, ground (GND) and VDD lines are routed alongside the clock signal to protect it from external noise and to prevent it from affecting neighboring signals. The figure below (to be added by you) shows how VDD and GND shield the clock signal.<br /></li><li class="c5 li-bullet-0">Specifying Routing Layers<br /> The routing layers for clock nets can be explicitly specified by the designer. If no specific layers are mentioned, the tool may route the clock on any suitable metal layer based on congestion and DRC rules.<br /><br /><img alt="" src="/assets/modules/module15/image1.png" title="" class="native-img"><br /></li></ol>
<hr>
<p class="c6"></p>`},{id:`ch_133_additional_important_points_on_clock_rou`,title:`Additional Important Points on Clock Routing`,html:``},{id:`ch_134_4_use_of_higher_metal_layers`,title:`4. Use of Higher Metal Layers`,html:`<p class="c10">Clock routing is typically done on higher metal layers because:</p>
<ul class="c7 lst-kix_97ugifnhmc7l-0 start"><li class="c5 li-bullet-0">They have lower resistance and capacitance.<br /></li><li class="c5 li-bullet-0">They provide better signal integrity.<br /></li><li class="c5 li-bullet-0">They reduce RC delay and improve clock quality.<br /></li></ul>
<h3 class="c19" id="h.h76ipolhamj6">5. Wider Wire Widths</h3>
<p class="c10">Clock routes generally use wider metal widths compared to data nets to:</p>
<ul class="c7 lst-kix_xtfbssgjpix9-0 start"><li class="c5 li-bullet-0">Reduce resistance<br /></li><li class="c5 li-bullet-0">Minimize voltage drop (IR drop)<br /></li><li class="c5 li-bullet-0">Improve transition time and signal strength<br /></li></ul>
<h3 class="c19" id="h.g4aw604fr4va">6. Dedicated Routing Tracks</h3>
<p class="c10">Clock nets are often assigned dedicated routing tracks to avoid interference from data nets and reduce congestion.</p>
<h3 class="c19" id="h.v3jkz3msiuyw">7. Minimizing Crosstalk and Noise</h3>
<p class="c10">Clock routing is carefully planned to avoid running parallel to high-switching data nets for long distances, as this can introduce noise and jitter.</p>
<h3 class="c19" id="h.vngslg51xt2o">8. Skew Control During Routing</h3>
<p class="c10">Clock routing must maintain skew targets achieved during CTS. Any deviation in routing may introduce additional skew.</p>
<h3 class="c19" id="h.lrxyd4x9nbk3">9. Matching Length and Topology</h3>
<p class="c10">Clock routes are often length-matched and follow a balanced topology to maintain uniform delay across different clock paths.</p>
<h3 class="c19" id="h.jel6l89cmp0z">10. Avoiding Sharp Corners and Detours</h3>
<p class="c10">Clock routing should avoid unnecessary detours, sharp bends, or jogs, as these can increase parasitic capacitance and delay.</p>
<h3 class="c19" id="h.7woqz9nzvmbm">11. Clock Tree Verification After Routing</h3>
<p class="c10">After clock routing, the following must be checked:</p>
<ul class="c7 lst-kix_tokmd1au0s0c-0 start"><li class="c5 li-bullet-0">Clock insertion delay<br /></li><li class="c5 li-bullet-0">Clock skew<br /></li><li class="c5 li-bullet-0">Slew (transition)<br /></li><li class="c5 li-bullet-0">Fanout<br /></li><li class="c5 li-bullet-0">Capacitance<br /></li><li class="c5 li-bullet-0">DRC compliance<br /></li></ul>
<h3 class="c19" id="h.wwcdxxwac60q">12. Impact on Power</h3>
<p class="c10">Since the clock is the most frequently switching signal, its routing significantly impacts dynamic power consumption. Proper routing helps reduce unnecessary power dissipation.</p>
<hr>
<p class="c6"></p>`},{id:`ch_157_io_latency_update_after_cts_`,title:`IO Latency Update (After CTS)`,html:`<p class="c10">To model a possible register driving the input port of the design, we use the set_input_delay command. This informs the tool to optimize the data path while considering the specified input arrival delay, similar to how real flip-flops would drive the input. A similar concept applies to output ports using set_output_delay.</p>
<p class="c10">After Clock Tree Synthesis (CTS), different flip-flops in the design may experience different clock insertion delays, resulting in clock skew between them. This skew changes the effective time available for data to meet setup and hold requirements at input and output ports.</p>
<p class="c10">A positive clock skew at the input port helps setup timing but makes hold timing worse. Conversely, at the output port, positive skew harms setup timing but helps hold timing. Because of this, input and output delays must be updated after CTS to reflect the actual clock behavior.</p>
<p class="c10">A common approach is to take the average insertion delay of all flip-flops in the relevant path and use this as the new latency value at the I/O ports. This provides a more realistic timing model for post-CTS analysis.</p>
<hr>
<p class="c10 c25"></p>`},{id:`ch_167_checks_after_cts`,title:`Checks After CTS`,html:`<p class="c10">After completing Clock Tree Synthesis, the following checks should be performed:</p>
<ol class="c7 lst-kix_y1nsqzvq5n33-0 start" start="1"><li class="c5 li-bullet-0">Latency Report<br /></li></ol>
<ul class="c7 lst-kix_y1nsqzvq5n33-1 start"><li class="c9 li-bullet-0">Verify that clock skew is within acceptable limits.<br /></li><li class="c9 li-bullet-0">Check whether clock insertion delay is reasonably balanced across sinks.<br /></li></ul>
<ol class="c7 lst-kix_y1nsqzvq5n33-0" start="2"><li class="c5 li-bullet-0">QoR Report<br /></li></ol>
<ul class="c7 lst-kix_y1nsqzvq5n33-1 start"><li class="c9 li-bullet-0">Confirm that overall timing is met, with special attention to hold violations, which often appear after CTS.<br /></li></ul>
<ol class="c7 lst-kix_y1nsqzvq5n33-0" start="3"><li class="c5 li-bullet-0">Utilization Report<br /></li></ol>
<ul class="c7 lst-kix_y1nsqzvq5n33-1 start"><li class="c9 li-bullet-0">Ensure that standard cell utilization remains within an optimal range and has not become too dense or too sparse.<br /></li></ul>
<ol class="c7 lst-kix_y1nsqzvq5n33-0" start="4"><li class="c5 li-bullet-0">Global Route Congestion Check<br /></li></ol>
<ul class="c7 lst-kix_y1nsqzvq5n33-1 start"><li class="c9 li-bullet-0">Analyze congestion maps to ensure that CTS did not introduce severe routing congestion.<br /></li></ul>
<ol class="c7 lst-kix_y1nsqzvq5n33-0" start="5"><li class="c5 li-bullet-0">Placement Legality Check<br /></li></ol>
<ul class="c7 lst-kix_y1nsqzvq5n33-1 start"><li class="c9 li-bullet-0">Verify that no cells are overlapping, off-grid, or illegally placed after CTS buffer insertion.<br /></li></ul>
<ol class="c7 lst-kix_y1nsqzvq5n33-0" start="6"><li class="c5 li-bullet-0">Constraint Consistency Check<br /></li></ol>
<ul class="c7 lst-kix_y1nsqzvq5n33-1 start"><li class="c9 li-bullet-0">Confirm that any timing violations are genuinely related to design performance and not due to missing or incorrect constraints.<br /></li><li class="c9 li-bullet-0">Specifically check whether:<br /></li></ul>
<ul class="c7 lst-kix_y1nsqzvq5n33-2 start"><li class="c10 c22 li-bullet-0">False paths are properly defined,<br /></li><li class="c10 c22 li-bullet-0">Asynchronous paths are correctly constrained,<br /></li><li class="c10 c22 li-bullet-0">Half-cycle paths are specified where applicable, and<br /></li><li class="c10 c22 li-bullet-0">Multi-cycle paths are correctly modeled in the SDC.<br /></li></ul>
<p class="c10">Only after all these checks are satisfactory should the design move forward to detailed routing.</p>
<hr>
<p class="c10 c25"></p>`},{id:`ch_185_clock_endpoint_types`,title:`Clock Endpoint Types`,html:`<p class="c10">During Clock Tree Synthesis (CTS), the tool identifies two types of clock endpoints in the design based on how they should be treated for timing and optimization:</p>
<ol class="c7 lst-kix_35p5jm8tbr6v-0 start" start="1"><li class="c5 li-bullet-0">Sink Pins (Balancing Pins)<br /></li><li class="c5 li-bullet-0">Ignore Pins<br /></li></ol>
<p class="c10">These classifications help the tool correctly balance the clock tree while still respecting design rule constraints.</p>
<hr>
<p class="c10 c25"></p>
<h3 class="c19" id="h.1sklgashtppd">1. Sink Pins (Balancing Pins)</h3>
<p class="c10">Sink pins are clock endpoints that are actively considered for delay balancing during CTS.</p>
<p class="c10">The tool assigns an insertion delay of zero to all sink pins and uses this reference value while performing delay balancing across the clock tree.</p>
<p class="c10">During CTS, sink pins are used in calculations and optimizations related to:</p>
<ul class="c7 lst-kix_whdtifdxdz9i-0 start"><li class="c5 li-bullet-0">Clock tree timing (insertion delay and skew), and<br /></li><li class="c5 li-bullet-0">Design Rule Constraints (DRC), such as fanout, transition, and capacitance.<br /></li></ul>
<p class="c10">In other words, sink pins are fully included in both timing optimization and DRC fixing.</p>
<p class="c10">Sink pins include:</p>
<ul class="c7 lst-kix_ec9pql6cjkux-0 start"><li class="c5 li-bullet-0">Clock pin of a sequential cell (for example, the CLK pin of a flip-flop or latch), or<br /></li><li class="c5 li-bullet-0">Clock pin of a macro cell that receives the clock.<br /></li></ul>
<p class="c10">These pins represent the true endpoints that the clock tree must balance.</p>
<hr>
<p class="c10 c25"></p>
<h3 class="c19" id="h.ylm9e6n5ca0">2. Ignore Pins</h3>
<p class="c10">Ignore pins are also clock endpoints, but they are excluded from clock tree timing calculations and skew optimization.</p>
<p class="c10">The tool considers ignore pins only for design rule constraint (DRC) fixing, such as fanout, transition, or capacitance violations.</p>
<p class="c10">During CTS, the tool isolates ignore pins from the main clock tree by inserting a guide buffer before the pin. Beyond this buffer, the tool does not perform any skew or insertion delay optimization for these pins, although it still fixes any DRC violations if needed.</p>
<p class="c10">This means ignore pins are connected to the clock network for electrical correctness but are not part of timing balancing.</p>
<p class="c10">Ignore pins include:</p>
<ul class="c7 lst-kix_fqfucfqffded-0 start"><li class="c5 li-bullet-0">Source pins of clock trees that lie in the fanout of another clock,<br /></li><li class="c5 li-bullet-0">Non-clock input pins of sequential cells, and<br /></li><li class="c5 li-bullet-0">Output ports of the design that are driven by a clock signal.<br /></li></ul>
<hr>
<p class="c10 c25"></p>
<h3 class="c19" id="h.3if63i80xh1b">Summary (Tool Perspective)</h3>
<table class="c35"><tbody><tr class="c18"><td class="c21" colspan="1" rowspan="1"><p class="c0">Endpoint Type</p></td><td class="c20" colspan="1" rowspan="1"><p class="c0">Used for Skew &amp; Insertion Delay</p></td><td class="c17" colspan="1" rowspan="1"><p class="c0">Used for DRC Fixing</p></td><td class="c23" colspan="1" rowspan="1"><p class="c0">Included in Timing Balancing</p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c10">Sink Pins</p></td><td class="c20" colspan="1" rowspan="1"><p class="c10">Yes</p></td><td class="c17" colspan="1" rowspan="1"><p class="c10">Yes</p></td><td class="c23" colspan="1" rowspan="1"><p class="c10">Yes</p></td></tr><tr class="c31"><td class="c21" colspan="1" rowspan="1"><p class="c10">Ignore Pins</p></td><td class="c20" colspan="1" rowspan="1"><p class="c10">No</p></td><td class="c17" colspan="1" rowspan="1"><p class="c10">Yes</p></td><td class="c23" colspan="1" rowspan="1"><p class="c10">No</p></td></tr></tbody></table>
<p class="c10 c25"></p>
<p class="c10 c25"></p>`},{id:`ch_215_cts_icc2_command_flow_with_short_comment`,title:`CTS / ICC2 Command Flow – With Short Comments`,html:`<hr>
<p class="c6"></p>
<p class="c10">#start GUI<br /> icc_shell&gt; start_gui<br />  Launches the ICC2 graphical user interface.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report max transition constraints<br /> icc_shell&gt; report_constraint -max_transition -verbose<br />  Reports all max transition (slew) constraint violations in the design.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report timing with transition through a specific pin<br /> icc_shell&gt; report_timing -thr &lt;instance_name&gt;/&lt;pin_name&gt;<br />  Shows timing path details passing through a specific pin.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report timing from register clock to D of next flip-flop<br /> icc_shell&gt; report_timing -to &lt;instance1_name&gt;/&lt;pin_name&gt; -from &lt;instance2_name&gt;/clk<br />  Reports timing between two sequential elements (clock-to-data path).</p>
<hr>
<p class="c6"></p>
<p class="c10">#see complete clock path<br /> icc_shell&gt; report_timing -to &lt;pin_name&gt; -path_type full_clock_expanded -delay max<br />  Displays the full expanded clock path with detailed delay.</p>
<hr>
<p class="c6"></p>
<p class="c10">#highlight path in GUI<br /> icc_shell&gt; change_selection [get_timing_paths -to &lt;instance_name&gt;/&lt;pin&gt;]<br />  Highlights the worst timing path in the GUI.</p>
<hr>
<p class="c6"></p>
<p class="c10">#see clock tree information<br /> icc_shell&gt; report_clock_tree<br />  Reports clock tree structure, levels, buffers, and sinks.</p>
<hr>
<p class="c6"></p>
<p class="c10">#shows the worst path timing with the given clock<br /> icc_shell&gt; report_timing -group &lt;group_name&gt;<br />  Reports worst timing paths for a specific clock group.</p>
<hr>
<p class="c6"></p>
<p class="c10">#prints only endpoints<br /> icc_shell&gt; report_timing -to readary -path_type short -max_paths 5<br />  Lists only endpoint summary of worst 5 paths.</p>
<hr>
<p class="c6"></p>
<p class="c10">#summary of all<br /> icc_shell&gt; report_qor<br />  Gives overall Quality of Results (timing, power, area, DRC, etc.).</p>
<hr>
<p class="c6"></p>
<p class="c10">#insert buffer (data path)<br /> icc_shell&gt; insert_buffer &lt;instance_name&gt;/d -lib_cell &lt;lib_name&gt;<br />  Manually inserts a buffer on a data pin.</p>
<hr>
<p class="c6"></p>
<p class="c10">#insert clock inverters<br /> icc_shell&gt; insert_buffer &lt;instance_name&gt;/&lt;clk pin&gt; -lib_cell &lt;lib inverter&gt; -inverter_pair<br />  Inserts a balanced inverter pair in the clock path.</p>
<hr>
<p class="c6"></p>
<p class="c10">#legalize placement incrementally<br /> icc_shell&gt; legalize_placement -incremental<br />  Fixes overlaps and aligns cells to placement grid.</p>
<hr>
<p class="c6"></p>
<p class="c10">#list the library cells<br /> icc_shell&gt; get_lib_cell<br />  Lists all available standard cells in the library.</p>
<hr>
<p class="c6"></p>
<p class="c10">#set false path<br /> icc_shell&gt; set_false_path -from &lt;instance1_name&gt;/&lt;pin_name&gt; -to &lt;instance2_name&gt;/&lt;pin_name&gt;<br />  Marks a path as false so it is ignored in timing.</p>
<hr>
<p class="c6"></p>
<p class="c10">#list all sequential cells matching name<br /> &gt; get_cells *&lt;name&gt;* -filter "is_sequential==true"<br />  Finds all sequential elements matching a pattern.</p>
<hr>
<p class="c6"></p>
<p class="c10">#finding size of collection<br /> &gt; sizeof_collections [get_cells *&lt;name&gt;* -filter "is_sequential==true"]<br />  Counts number of matching cells.</p>
<hr>
<p class="c6"></p>
<p class="c10">#show the terminal names<br /> &gt; get_terminals *&lt;name&gt;*<br />  Lists terminals (pins) matching a pattern.</p>
<hr>
<p class="c6"></p>
<p class="c10">#check direction of port<br /> &gt; get_attribute [get_ports &lt;port_name&gt;] direction<br />  Shows whether port is input/output/inout.</p>
<hr>
<p class="c6"></p>
<p class="c10">#check if constant value is driven on a pin<br /> &gt; get_attribute [get_pins &lt;instance_name&gt;/&lt;pin&gt;] constant_value<br />  Checks if pin is tied to constant 0 or 1.</p>
<hr>
<p class="c6"></p>
<p class="c10">#get standard cells with XNOR in clock path<br /> &gt; filter_collection [all_fanout -clock_tree -only_cells -flat -levels 1000000] "ref_name=~*xnor*"<br />  Finds XNOR/XOR cells in clock fanout.</p>
<hr>
<p class="c6"></p>
<p class="c10">#list of all cells from previous flip-flop<br /> &gt; lsort -uniq [get_attribute [all_fanin -to &lt;instance_name&gt; -flat -only_cells] ref_name]<br />  Lists unique cell types in fan-in cone.</p>
<hr>
<p class="c6"></p>
<p class="c10">#get exceptions for a cell<br /> &gt; get_exceptions -from &lt;instance_name&gt;<br />  Lists timing exceptions applied to this instance.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report exceptions<br /> &gt; report_exceptions<br />  Displays all timing exceptions in the design.</p>
<hr>
<p class="c6"></p>
<p class="c10">#list attributes related to net<br /> &gt; list_attributes -class net -application<br />  Lists all net attributes available in ICC2.</p>
<hr>
<p class="c6"></p>
<p class="c10">#filter collections based on attribute<br /> &gt; filter_collection [get_flat_cells *] "size_only==true &amp;&amp; full_name=~*&lt;name&gt;*"<br />  Filters cells based on attribute and name.</p>
<hr>
<p class="c6"></p>
<p class="c10">#filter fanout nets based on names<br /> &gt; filter_collection [all_fanout -from &lt;instance_name&gt;/pin] "full_name=~*&lt;name1&gt;* || full_name=~*&lt;name2&gt;*"<br />  Filters specific fanout nets.</p>
<hr>
<p class="c6"></p>
<p class="c10">#set don’t touch on nets except specific pins<br /> &gt; set_dont_touch [get_nets-of_objects [get_pins-of_objects [get_cells *&lt;instance_name&gt;*] -filter "name!=&lt;pin1&gt; &amp;&amp; name!=&lt;pin2&gt;"] -filter "full_name=~*&lt;net_name1&gt;* || full_name=~*&lt;net_name2&gt;*]<br />  Prevents tool from modifying selected nets.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report name rules<br /> &gt; report_name_rules<br />  Shows current naming rule definitions.</p>
<hr>
<p class="c6"></p>
<p class="c10">#define lower-case naming rule<br /> &gt; define_name_rules LC_ONLY -allowed "a-z 0-9"<br />  Restricts names to lowercase letters and numbers.</p>
<hr>
<p class="c6"></p>
<p class="c10">#define renaming rule<br /> &gt; define_name_rules my_map_rule -map {{"first","second_renamed"}}<br />  Creates mapping rule for renaming.</p>
<hr>
<p class="c6"></p>
<p class="c10">#apply renaming rule<br /> &gt; change_names -rules my_map_rule<br />  Applies renaming rule to design.</p>
<hr>
<p class="c6"></p>
<p class="c10">#rename instances<br /> &gt; set_attribute -objects [get_cells {{instance[1]_abcd}}] -name name -value instance_1_abcd<br />  Renames a specific cell instance.</p>
<hr>
<p class="c6"></p>
<p class="c10">#stop propagating clock<br /> &gt; set_clock_sense -logical_stop_propagation &lt;instance_name&gt;/clk<br />  Stops clock propagation beyond this pin.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report clock gating checks<br /> &gt; report_clock_gating_check<br />  Checks correctness of clock gating cells.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report all min delay violations<br /> &gt; report_constraints -min_delay -all_violators -scenarios &lt;scenario name&gt;<br />  Lists all hold violations.</p>
<hr>
<p class="c6"></p>
<p class="c10">#check if clock is associated with a pin<br /> &gt; get_attribute [get_pins &lt;instance_name&gt;/&lt;pin_name&gt;] clocks<br />  Shows which clock drives the pin.</p>
<hr>
<p class="c6"></p>
<p class="c10">#replace a cell with another library cell<br /> &gt; change_link [get_cell &lt;instance_name&gt;] &lt;lib_cell&gt;<br />  Replaces a cell with a different size/type.</p>
<hr>
<p class="c6"></p>
<p class="c10">#unfix objects so they can move<br /> &gt; set_fixed_objects [get_cells &lt;instance_name&gt;*] -unfix<br />  Allows cells to move during legalization.</p>
<hr>
<p class="c6"></p>
<p class="c10">#get bounding box lower-left x<br /> &gt; get_attribute [gs] bbox_llx<br />  Returns lower-left x-coordinate of selection.</p>
<hr>
<p class="c6"></p>
<p class="c10">#get application options (hold related)<br /> &gt; get_app_options "hold*"<br />  Lists all hold-related tool options.</p>
<hr>
<p class="c6"></p>
<p class="c10">#set high effort for hold fixing after CTS</p>
<p class="c15">&gt; set_app_options -name clock_opt.hold.effort -value high  </p>
<p class="c15">&gt; set_app_options -name refine_opt.hold.effort -value high  </p>
<p class="c6"></p>
<p class="c10"> Enables aggressive hold fixing.</p>
<hr>
<p class="c6"></p>
<p class="c10">#find procedure source<br /> &gt; get_proc_source &lt;proc_name&gt;<br />  Displays source of a Tcl procedure.</p>
<hr>
<p class="c6"></p>
<p class="c10">#max transition violations report<br /> &gt; report_constraints -all_violators -max_transition &gt; transition.txt<br />  Dumps all max transition violations to file.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report corners<br /> &gt; report_corners<br />  Lists all PVT corners in the design.</p>
<hr>
<p class="c6"></p>
<p class="c10">#report timing derate<br /> &gt; report_timing_derate<br />  Shows RC derate settings for current corner.</p>
<hr>
<p class="c6"></p>
<p class="c10">#set routing layer range for nets<br /> &gt; set_routing_rule -min_routing_layer &lt;min_metal&gt; -max_routing_layer &lt;max_metal&gt; {net1 net2}<br />  Restricts routing layers for specific nets.</p>
<hr>
<p class="c6"></p>
<p class="c10">#set clock balance points<br /> &gt; set_clock_balance_points -consider_for_balancing true -balance_points "inst1/clk inst2/clk"<br />  Forces clock balancing between selected sinks.</p>
<p class="c6"></p>
<p class="c6"></p>`},{id:`ch_366_post_cts_optimization`,title:`Post CTS Optimization`,html:`<p class="c10">After Clock Tree Synthesis (CTS), further optimization is required to improve timing, power, area, and signal integrity before proceeding to detailed routing. This stage is called Post-CTS Optimization.</p>
<h3 class="c19" id="h.hw2mfuh9n95n">Objectives of Post-CTS Optimization</h3>
<ol class="c7 lst-kix_6u8my58s9n2r-0 start" start="1"><li class="c5 li-bullet-0">Optimization with Useful Skew<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Intentional clock skew is introduced to improve setup timing where possible.<br /></li><li class="c9 li-bullet-0">The tool adjusts launch and capture clock latencies to help critical paths.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="2"><li class="c5 li-bullet-0">Optimization with Total Negative Slack (TNS)<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Focus is not only on Worst Negative Slack (WNS) but also on reducing overall TNS.<br /></li><li class="c9 li-bullet-0">The tool tries to minimize total timing violations across all paths.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="3"><li class="c5 li-bullet-0">Fine Grid Spacing<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Placement is refined on a finer grid to improve timing and reduce congestion.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="4"><li class="c5 li-bullet-0">Post CTS Optimization Techniques<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Data path optimization with clock-aware placement.<br /></li><li class="c9 li-bullet-0">Small cell movements and resizing for better timing.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="5"><li class="c5 li-bullet-0">Shielding<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Critical clock nets are shielded with VDD/GND to reduce noise and crosstalk.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="6"><li class="c5 li-bullet-0">Sizing<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Upsizing or downsizing of cells based on timing and power needs.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="7"><li class="c5 li-bullet-0">Buffer Re-location<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Moving clock or data buffers to better physical locations for timing improvement.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="8"><li class="c5 li-bullet-0">Level Adjustment<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Adjusting the number of buffer stages in the clock tree for better balance.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="9"><li class="c5 li-bullet-0">Optimize the Design for Hold Time<br /></li></ol>
<ul class="c7 lst-kix_6u8my58s9n2r-1 start"><li class="c9 li-bullet-0">Special focus on fixing hold violations after CTS.<br /></li></ul>
<ol class="c7 lst-kix_6u8my58s9n2r-0" start="10"><li class="c5 li-bullet-0">Hold Violations should be fixed first in Best Corner and then in Worst Corner<br /></li></ol>
<ul class="c7 lst-kix_uv9o6ti90k75-0 start"><li class="c5 li-bullet-0">Best corner: Lower delays → more prone to hold violations.<br /></li><li class="c5 li-bullet-0">Worst corner: Higher delays → more prone to setup violations.<br /></li></ul>
<ol class="c7 lst-kix_gjguvjnx1hfg-0 start" start="11"><li class="c5 li-bullet-0">Area Optimizations<br /></li></ol>
<ul class="c7 lst-kix_hho3b4l6vb72-0 start"><li class="c5 li-bullet-0">Removal of unnecessary buffers and resizing of cells to reduce area.<br /></li></ul>
<hr>
<p class="c6"></p>`},{id:`ch_393_cts_output_reports`,title:`CTS Output Reports`,html:`<p class="c10">After CTS, the following outputs should be reviewed:</p>
<ol class="c7 lst-kix_dkzaaqkrrvc8-0 start" start="1"><li class="c5 li-bullet-0">Timing Report<br /></li></ol>
<ul class="c7 lst-kix_dkzaaqkrrvc8-1 start"><li class="c9 li-bullet-0">Shows setup and hold timing status.<br /></li></ul>
<ol class="c7 lst-kix_dkzaaqkrrvc8-0" start="2"><li class="c5 li-bullet-0">Congestion Report<br /></li></ol>
<ul class="c7 lst-kix_dkzaaqkrrvc8-1 start"><li class="c9 li-bullet-0">Indicates routing congestion introduced due to CTS buffers.<br /></li></ul>
<ol class="c7 lst-kix_dkzaaqkrrvc8-0" start="3"><li class="c5 li-bullet-0">Skew Report<br /></li></ol>
<ul class="c7 lst-kix_dkzaaqkrrvc8-1 start"><li class="c9 li-bullet-0">Shows clock skew across different sinks.<br /></li></ul>
<ol class="c7 lst-kix_dkzaaqkrrvc8-0" start="4"><li class="c5 li-bullet-0">Insertion Delay Report<br /></li></ol>
<ul class="c7 lst-kix_dkzaaqkrrvc8-1 start"><li class="c9 li-bullet-0">Reports clock latency from source to sinks.<br /></li></ul>
<ol class="c7 lst-kix_dkzaaqkrrvc8-0" start="5"><li class="c5 li-bullet-0">CTS DEF File<br /></li></ol>
<ul class="c7 lst-kix_dkzaaqkrrvc8-1 start"><li class="c9 li-bullet-0">Contains final clock tree structure (buffer locations, routing, etc.).<br /></li></ul>
<hr>
<p class="c6"></p>`},{id:`ch_407_ways_to_fix_hold_violation`,title:`Ways to Fix Hold Violation`,html:`<p class="c10">Hold violation occurs when data arrives too early compared to the clock. To fix this, we must increase data path delay.</p>
<h3 class="c19" id="h.fmdtw1ptneyo">Your points (kept as-is):</h3>
<ol class="c7 lst-kix_ygxyxjqofq14-0 start" start="1"><li class="c5 li-bullet-0">Increase the drive strength of data-path logic gates.<br /></li><li class="c5 li-bullet-0">Use data-path cells with higher threshold voltages.<br /></li><li class="c5 li-bullet-0">Buffer insertion/removal in the data path.<br /></li><li class="c5 li-bullet-0">Route the net using higher metal layers.<br /></li><li class="c5 li-bullet-0">Increase the clk→Q delay of the launching flip-flop.<br /></li></ol>
<hr>
<p class="c6"></p>`},{id:`ch_413_additional_important_ways_to_fix_hold_vi`,title:`Additional Important Ways to Fix Hold Violations`,html:`<ol class="c7 lst-kix_atfkswf9mkli-0 start" start="6"><li class="c5 li-bullet-0">Add Delay Cells (Inverters/Small Buffers) in Data Path<br /></li></ol>
<ul class="c7 lst-kix_atfkswf9mkli-1 start"><li class="c9 li-bullet-0">Common technique used by PnR tools automatically.<br /></li></ul>
<ol class="c7 lst-kix_atfkswf9mkli-0" start="7"><li class="c5 li-bullet-0">Increase Wire Length (Serpentine Routing)<br /></li></ol>
<ul class="c7 lst-kix_atfkswf9mkli-1 start"><li class="c9 li-bullet-0">Adding controlled routing detours to increase delay.<br /></li></ul>
<ol class="c7 lst-kix_atfkswf9mkli-0" start="8"><li class="c5 li-bullet-0">Reduce Clock Tree Aggressiveness<br /></li></ol>
<ul class="c7 lst-kix_atfkswf9mkli-1 start"><li class="c9 li-bullet-0">Slightly increase clock latency on capture side if allowed.<br /></li></ul>
<ol class="c7 lst-kix_atfkswf9mkli-0" start="9"><li class="c5 li-bullet-0">Change Clock Buffer Strength<br /></li></ol>
<ul class="c7 lst-kix_atfkswf9mkli-1 start"><li class="c9 li-bullet-0">Using slower clock buffers at certain stages.<br /></li></ul>
<ol class="c7 lst-kix_atfkswf9mkli-0" start="10"><li class="c5 li-bullet-0">Modify Launch or Capture Clock Latency Constraints<br /></li></ol>
<ul class="c7 lst-kix_9orklfsqmxfl-0 start"><li class="c5 li-bullet-0">Adjust clock uncertainty or insertion delay models.<br /></li></ul>
<ol class="c7 lst-kix_7dx0wqvvgqbe-0 start" start="11"><li class="c5 li-bullet-0">Adjust Placement of Critical Cells<br /></li></ol>
<ul class="c7 lst-kix_qts9ysqbbb24-0 start"><li class="c5 li-bullet-0">Move launching and capturing flops farther apart physically.<br /></li></ul>
<ol class="c7 lst-kix_i28l975c2jwf-0 start" start="12"><li class="c5 li-bullet-0">Relax Timing Constraints (if architecturally allowed)<br /></li></ol>
<ul class="c7 lst-kix_lzfplrivyo0m-0 start"><li class="c5 li-bullet-0">Modify multi-cycle or false path constraints if applicable.</li></ul>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c6"></p>
<p class="c29">CTS SCRIPT</p>
<p class="c6"></p>
<p class="c15"><img alt="" src="/assets/modules/module15/image8.png" title="" class="native-img"><br /><br /><img alt="" src="/assets/modules/module15/image6.png" title="" class="native-img"></p>
<p class="c6"></p>
<p class="c6"></p>`}],a={moduleLayout:`_moduleLayout_1xme6_4`,header:`_header_1xme6_20`,title:`_title_1xme6_22`,subtitle:`_subtitle_1xme6_33`,topicsNav:`_topicsNav_1xme6_41`,navSectionsWrapper:`_navSectionsWrapper_1xme6_54`,slideDown:`_slideDown_1xme6_1`,navSection:`_navSection_1xme6_54`,navTitle:`_navTitle_1xme6_64`,navButtonsGrid:`_navButtonsGrid_1xme6_74`,topicNavBtn:`_topicNavBtn_1xme6_76`,toggleWrapper:`_toggleWrapper_1xme6_101`,toggleBtn:`_toggleBtn_1xme6_103`,toggleIcon:`_toggleIcon_1xme6_128`,toggleCount:`_toggleCount_1xme6_130`,mainContent:`_mainContent_1xme6_139`,contentCard:`_contentCard_1xme6_141`,chapterTitle:`_chapterTitle_1xme6_155`,chapterBody:`_chapterBody_1xme6_166`},o=t(),s=6,c=()=>{let[e,t]=(0,r.useState)(!1),[n,c]=(0,r.useState)(!1),[l,u]=(0,r.useState)(!1),d=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},f=e=>e.preventDefault(),p=i.slice(0,7),m=i.slice(7,14),h=i.slice(14),g=(e,t,n,r)=>(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:r}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(t?e:e.slice(0,s)).map(e=>(0,o.jsx)(`button`,{onClick:()=>d(e.id),className:a.topicNavBtn,title:e.title,children:e.title},e.id))}),e.length>s&&(0,o.jsx)(`div`,{className:a.toggleWrapper,children:(0,o.jsx)(`button`,{className:a.toggleBtn,onClick:()=>n(!t),children:t?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▲`}),` See Less`]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▼`}),` See More `,(0,o.jsxs)(`span`,{className:a.toggleCount,children:[`+`,e.length-s]})]})})})]});return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:f,onContextMenu:f,onSelectStart:f,onDragStart:f,children:[(0,o.jsxs)(`div`,{className:a.header,children:[(0,o.jsx)(`h1`,{className:a.title,children:`Module 15 - Clock Tree Synthesis (CTS)`}),(0,o.jsx)(`p`,{className:a.subtitle,children:`Master clock tree synthesis including goals, clock tree types, skew groups, useful skew, clock routing techniques, post-CTS optimization, output reports, and hold violation fixes.`})]}),(0,o.jsx)(`section`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[g(p,e,t,`CTS Goals & Clock Trees`),g(m,n,c,`Skew, Routing & Latency`),g(h,l,u,`Post-CTS & Hold Fix`)]})}),(0,o.jsx)(`main`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`article`,{id:e.id,className:a.contentCard,children:[(0,o.jsx)(`h2`,{className:a.chapterTitle,children:e.title}),(0,o.jsx)(`div`,{className:a.chapterBody,dangerouslySetInnerHTML:{__html:e.html}})]},e.id))})]})};export{c as default};