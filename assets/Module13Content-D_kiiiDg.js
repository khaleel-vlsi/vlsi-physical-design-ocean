import{p as e,r as t,u as n}from"./index-BxfU5AUR.js";var r=e(n(),1),i=[{id:`ch_0_floorplan_and_powerplan`,title:`FLOORPLAN AND POWERPLAN`,html:``},{id:`ch_1_partitioning`,title:`Partitioning`,html:`<h3 class="c15" id="h.mhka622y2dsk">Introduction</h3>
<p class="c2">The size of VLSI designs has increased dramatically and now includes systems with hundreds of millions of transistors. Due to this enormous complexity, it is extremely difficult to design, simulate, and optimize the entire system as a single unit.</p>
<p class="c2">To handle this complexity, designers follow a divide-and-conquer strategy, which relies on partitioning. Partitioning decomposes a large system into smaller, manageable subsystems, forming a hierarchical tree structure.</p>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.rrjvakx1vwtn">What is Partitioning?</h3>
<p class="c2">Partitioning is a technique used to divide a circuit or system into a collection of smaller components.</p>
<p class="c2">It serves two important purposes:</p>
<ul class="c5 lst-kix_xwi7ma2msquj-0 start"><li class="c2 c13 li-bullet-0">As a design task, it helps break a large system into pieces that can be implemented as separate interacting components.</li><li class="c2 c13 li-bullet-0">As an algorithmic method, it helps solve complex combinatorial optimization problems, such as those found in logic synthesis and layout synthesis.</li></ul>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.j8sv0hs4ktav">Partitioning in Multi-Chip Modules (MCMs)</h3>
<p class="c2">Multi-Chip Modules (MCMs) have been developed as an alternative to conventional printed circuit boards to achieve:</p>
<ul class="c5 lst-kix_j9ncomnp0px2-0 start"><li class="c2 c13 li-bullet-0">Higher packing density</li><li class="c2 c13 li-bullet-0">Reduced signal delay</li><li class="c2 c13 li-bullet-0">Lower heat dissipation</li></ul>
<p class="c2">To achieve these goals and to explore more design alternatives than a human designer can, automatic partitioning is required.</p>
<p class="c2">If the chips are already allocated (i.e., a set of system components is predefined), the partitioning task becomes similar to FPGA array partitioning. However, in many cases, it is beneficial to first search for an optimal system-level partitioning. The final allocation and partitioning can then be selected from the set of solutions found.</p>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.yquipyneigs7">Relationship Between Partitioning and Floorplanning</h3>
<p class="c2">The floorplanning problem is a well-known problem in layout design literature and is traditionally treated as a pure layout problem. However, partitioning and floorplanning are closely interrelated.</p>
<p class="c2">Traditionally:</p>
<ul class="c5 lst-kix_sd8d2dlj31ow-0 start"><li class="c2 c13 li-bullet-0">Partitioning defines the blocks of the system</li><li class="c2 c13 li-bullet-0">Floorplanning determines:</li></ul>
<ul class="c5 lst-kix_sd8d2dlj31ow-1 start"><li class="c2 c12 li-bullet-0">Relative block positions</li><li class="c2 c12 li-bullet-0">Block sizes</li><li class="c2 c12 li-bullet-0">Aspect ratios</li><li class="c2 c12 li-bullet-0">Pin positions</li></ul>
<p class="c2">The goal is to optimize silicon area while satisfying timing constraints.</p>
<p class="c2"> The quality of floorplanning strongly depends on the quality of partitioning.</p>
<p class="c2">Floorplanning is difficult because:</p>
<ul class="c5 lst-kix_4gb6z6gwv97q-0 start"><li class="c2 c13 li-bullet-0">Some parts of the circuit may not be fully specified</li><li class="c2 c13 li-bullet-0">Accurate estimation of block parameters is required</li></ul>
<p class="c2">As systems grow larger, floorplanning has gained significant importance, and all major CAD vendors now provide powerful floorplanning tools.</p>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.z8za6kqfo0la">Hardware / Software Partitioning</h3>
<p class="c2">Microelectronic systems typically consist of:</p>
<ul class="c5 lst-kix_t2s4j47m7hiz-0 start"><li class="c2 c13 li-bullet-0">Application-specific hardware components</li><li class="c2 c13 li-bullet-0">Programmable software components</li></ul>
<p class="c2">Examples include:</p>
<ul class="c5 lst-kix_akt175rcl99a-0 start"><li class="c2 c13 li-bullet-0">ASICs</li><li class="c2 c13 li-bullet-0">Custom processors</li><li class="c2 c13 li-bullet-0">Standard processors</li><li class="c2 c13 li-bullet-0">Memories</li></ul>
<p class="c2">Software components:</p>
<ul class="c5 lst-kix_8ctr142q3daa-0 start"><li class="c2 c13 li-bullet-0">More flexible</li><li class="c2 c13 li-bullet-0">Easier to develop</li><li class="c2 c13 li-bullet-0">Lower development cost and time</li></ul>
<p class="c2">Hardware components:</p>
<ul class="c5 lst-kix_sq5ld9cm6ezm-0 start"><li class="c2 c13 li-bullet-0">Provide higher performance</li><li class="c2 c13 li-bullet-0">Incur higher cost</li></ul>
<p class="c2">The system designer aims to partition the system into hardware and software components such that:</p>
<ul class="c5 lst-kix_qz8n9sma1dni-0 start"><li class="c2 c13 li-bullet-0">All performance constraints are met</li><li class="c2 c13 li-bullet-0">Hardware usage is minimized</li></ul>
<p class="c2">This results in a constrained optimization problem, which is a key challenge in hardware/software co-design.</p>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.yy0d2f2677qo">Partitioning in DSP and Multiprocessor Systems</h3>
<p class="c2">Partitioning digital signal processing (DSP) algorithms across multiprocessor systems is particularly challenging due to numerous constraints.</p>
<p class="c2">Key aspects:</p>
<ul class="c5 lst-kix_uwtiu14rj360-0 start"><li class="c2 c13 li-bullet-0">Functional specifications are represented using signal flow graphs</li><li class="c2 c13 li-bullet-0">These graphs are mapped onto a network of processors</li></ul>
<p class="c2">This process must be fully automated to quickly explore:</p>
<ul class="c5 lst-kix_i6tsa0td5daq-0 start"><li class="c2 c13 li-bullet-0">Different architectures</li><li class="c2 c13 li-bullet-0">Multiple solution alternatives</li></ul>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.ld4h47ff2zy0">Partitioning for Parallel Simulation</h3>
<p class="c2">In VLSI design, logic simulation is one of the most heavily used tools. However, as circuit complexity increases:</p>
<ul class="c5 lst-kix_hoalyu2xtrgp-0 start"><li class="c2 c13 li-bullet-0">Simulation consumes large amounts of computing time</li><li class="c2 c13 li-bullet-0">Memory requirements grow significantly</li></ul>
<p class="c2">To overcome these bottlenecks:</p>
<ul class="c5 lst-kix_8x225uyj85m1-0 start"><li class="c2 c13 li-bullet-0">Parallel computer architectures and workstation networks are used</li><li class="c2 c13 li-bullet-0">The circuit is partitioned so that:</li></ul>
<ul class="c5 lst-kix_8x225uyj85m1-1 start"><li class="c2 c12 li-bullet-0">Communication overhead is minimized</li><li class="c2 c12 li-bullet-0">Simulation load is evenly distributed</li></ul>
<p class="c2">Parallel simulation is another application of the divide-and-conquer strategy.</p>
<p class="c2">To avoid idle processors, dynamic load balancing is required, which means:</p>
<ul class="c5 lst-kix_vehburtx6ya6-0 start"><li class="c2 c13 li-bullet-0">Partitioning must be updated over time</li></ul>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.t8x8jrxw20ox">Divide-and-Conquer Paradigm in Partitioning</h3>
<p class="c2">The divide-and-conquer approach works as follows:</p>
<ol class="c5 lst-kix_wh0wanr1gt6u-0 start" start="1"><li class="c2 c13 li-bullet-0">The problem is recursively partitioned (top-down) into smaller sub-problems</li><li class="c2 c13 li-bullet-0">Partitioning continues until sub-problems are small enough to be solved directly</li><li class="c2 c13 li-bullet-0">Solutions are combined hierarchically</li></ol>
<p class="c2">Although this often produces suboptimal solutions at higher levels, it is highly effective in practice.</p>
<p class="c2">A famous example is the min-cut placement method in layout synthesis.</p>
<p class="c2">Partitioning is applied recursively to the circuit netlist to generate a hierarchical slicing structure, which can then be interpreted as a floorplan for chip assembly.</p>
<p class="c2">Benefits include:</p>
<ul class="c5 lst-kix_yr9pr9mqscrr-0 start"><li class="c2 c13 li-bullet-0">Reduced problem size</li><li class="c2 c13 li-bullet-0">Improved solution quality</li><li class="c2 c13 li-bullet-0">Reduced wiring congestion</li><li class="c2 c13 li-bullet-0">Minimization of cut nets between partitions</li></ul>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.yewcvhrv52r3">Mathematical Representation of Partitioning</h3>
<p class="c2">Most partitioning problems are mathematically modeled using graphs.</p>
<p class="c2">Examples:</p>
<ul class="c5 lst-kix_fbzw7irz8ct9-0 start"><li class="c2 c13 li-bullet-0">Hardware description languages → Signal flow graphs</li></ul>
<hr>
<p class="c2 c25"></p>`},{id:`ch_81_need_for_partitioning`,title:`Need for Partitioning`,html:`<p class="c2">A good partitioning strategy can:</p>
<ul class="c5 lst-kix_uq77yfi2u5y5-0 start"><li class="c2 c13 li-bullet-0">Reduce production cost</li><li class="c2 c13 li-bullet-0">Improve system performance</li></ul>
<p class="c2">With advances in fabrication technology:</p>
<ul class="c5 lst-kix_3p5b6a2w1p3r-0 start"><li class="c2 c13 li-bullet-0">Cost per transistor decreases</li><li class="c2 c13 li-bullet-0">Cost of input/output pads remains nearly constant</li></ul>
<p class="c2">Therefore:</p>
<ul class="c5 lst-kix_ez9896blws92-0 start"><li class="c2 c13 li-bullet-0">The interface size between partitions (e.g., between chips) contributes significantly to manufacturing cost</li><li class="c2 c13 li-bullet-0">Partitioning quality has a strong impact on overall cost</li></ul>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.u3l5vtljnzwo">Partitioning in Physical Design Flow</h3>
<p class="c2">Partitioning is the process of dividing the chip into smaller blocks, mainly to:</p>
<ul class="c5 lst-kix_8fi41aduyflz-0 start"><li class="c2 c13 li-bullet-0">Separate functional blocks</li><li class="c2 c13 li-bullet-0">Simplify placement and routing</li></ul>
<p class="c2">Partitioning can be performed during the RTL design phase, where:</p>
<ul class="c5 lst-kix_qr9mgl4nvmz3-0 start"><li class="c2 c13 li-bullet-0">The design is divided into sub-blocks</li><li class="c2 c13 li-bullet-0">Each module is designed independently</li><li class="c2 c13 li-bullet-0">All modules are connected in a TOP LEVEL module</li></ul>
<p class="c2">This type of partitioning is known as Logical Partitioning and is considered the first step of the physical design cycle.</p>
<hr>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image3.png" title="" class="native-img"></p>
<p class="c2 c25"></p>
<p class="c2">Partitioning at different levels</p>
<p class="c2"><img alt="" src="/assets/modules/module13/image35.png" title="" class="native-img"></p>`},{id:`ch_102_rules_of_partitioning`,title:`Rules of Partitioning`,html:`<h3 class="c15" id="h.w49s9q4bkv9r">1. Interconnections Between Partitions</h3>
<ul class="c5 lst-kix_3ul93pxbze1f-0 start"><li class="c2 c13 li-bullet-0">Reducing interconnections reduces the delay.</li><li class="c2 c13 li-bullet-0">Fewer interconnections simplify the interfaces between partitions.</li><li class="c2 c13 li-bullet-0">This makes independent design and fabrication of each partition easier.</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.h4nei9wemb1t">2. Delay Due to Partitioning</h3>
<ul class="c5 lst-kix_l5tiuufhdzqw-0 start"><li class="c2 c13 li-bullet-0">Partitioning a circuit can introduce additional delay.</li><li class="c2 c13 li-bullet-0">A critical path may pass between multiple partitions several times.</li><li class="c2 c13 li-bullet-0">Each crossing between partitions can increase overall timing delay.</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.2oejpqj0u4q5">3. Number of Terminals</h3>
<ul class="c5 lst-kix_x97nesfcgm3o-0 start"><li class="c2 c13 li-bullet-0">The number of nets required to connect a sub-circuit to other sub-circuits should not exceed the terminal count of that sub-circuit.</li><li class="c2 c13 li-bullet-0">Excessive terminals make routing and interfacing complex.</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.qadsr7evxgp4">4. Number of Partitions</h3>
<ul class="c5 lst-kix_ldzot0jjqp9t-0 start"><li class="c2 c13 li-bullet-0">A large number of partitions can simplify the design of individual blocks.</li><li class="c2 c13 li-bullet-0">However, more partitions may:</li></ul>
<ul class="c5 lst-kix_ldzot0jjqp9t-1 start"><li class="c2 c12 li-bullet-0">Increase fabrication cost</li><li class="c2 c12 li-bullet-0">Increase the number of interconnections</li></ul>
<ul class="c5 lst-kix_ldzot0jjqp9t-0"><li class="c2 c13 li-bullet-0">An optimal balance is required between design simplicity and system cost</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.oodtolbvvr2l">Key Takeaway</h3>
<ul class="c5 lst-kix_ac0dzhyi79h1-0 start"><li class="c2 c13 li-bullet-0">Effective partitioning aims to:</li></ul>
<ul class="c5 lst-kix_ac0dzhyi79h1-1 start"><li class="c2 c12 li-bullet-0">Minimize interconnections</li><li class="c2 c12 li-bullet-0">Control delay on critical paths</li><li class="c2 c12 li-bullet-0">Limit terminal count</li><li class="c2 c12 li-bullet-0">Avoid excessive partitioning</li></ul>
<p class="c10"></p>
<p class="c24">Partitioning example </p>
<p class="c10"></p>
<p class="c24"><img alt="" src="/assets/modules/module13/image15.png" title="" class="native-img"></p>
<p class="c24"><img alt="" src="/assets/modules/module13/image34.png" title="" class="native-img"></p>`},{id:`ch_129_benefits_of_tool_based_partitioning`,title:`Benefits of Tool-Based Partitioning`,html:`<p class="c2">Tool-based partitioning plays a critical role in handling large and complex VLSI designs. The key benefits are explained below in a clear, student-friendly manner.</p>
<h3 class="c15" id="h.hjuljv6vw01g">1. Optimal Partitioning Scheme</h3>
<ul class="c5 lst-kix_enp40h330jmn-0 start"><li class="c2 c13 li-bullet-0">Automatically identifies an optimal partitioning strategy for a given design.</li><li class="c2 c13 li-bullet-0">Ensures that each block can be implemented and verified independently, reducing overall design complexity.</li></ul>
<h3 class="c15" id="h.h0j1cd4abl2d">2. Balanced Partition Sizes</h3>
<ul class="c5 lst-kix_80bh2egpgt3k-0 start"><li class="c2 c13 li-bullet-0">Ensures that partitions are balanced based on:</li></ul>
<ul class="c5 lst-kix_80bh2egpgt3k-1 start"><li class="c2 c12 li-bullet-0">Area, or</li><li class="c2 c12 li-bullet-0">Instance (cell) count</li></ul>
<ul class="c5 lst-kix_80bh2egpgt3k-0"><li class="c2 c13 li-bullet-0">Balanced partitions help achieve better placement, routing, and timing convergence.</li></ul>
<h3 class="c15" id="h.79p3yc7oqru7">3. Reduced Top-Level Interconnections</h3>
<ul class="c5 lst-kix_kxzw28tothgf-0 start"><li class="c2 c13 li-bullet-0">Minimizes the number of top-level nets connecting:</li></ul>
<ul class="c5 lst-kix_kxzw28tothgf-1 start"><li class="c2 c12 li-bullet-0">One block to another block</li><li class="c2 c12 li-bullet-0">Block I/O ports to other block I/O ports</li></ul>
<ul class="c5 lst-kix_kxzw28tothgf-0"><li class="c2 c13 li-bullet-0">Fewer interconnections lead to:</li></ul>
<ul class="c5 lst-kix_kxzw28tothgf-1 start"><li class="c2 c12 li-bullet-0">Reduced routing congestion</li><li class="c2 c12 li-bullet-0">Lower delay</li><li class="c2 c12 li-bullet-0">Easier block integration at the top level</li></ul>
<h3 class="c15" id="h.9fs4s4n92wj8">4. Functional Integrity</h3>
<ul class="c5 lst-kix_n1rtgxqryd52-0 start"><li class="c2 c13 li-bullet-0">Partitions the netlist without changing the functionality of the design.</li><li class="c2 c13 li-bullet-0">Ensures that logical behavior remains exactly the same before and after partitioning.</li></ul>
<hr>
<p class="c10"></p>
<p class="c2">Key Takeaway for Students:<br />Tool-based partitioning helps manage large designs efficiently by balancing block sizes, reducing interconnect complexity, and maintaining functional correctness—making physical design more predictable and scalable.</p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c37"><img alt="" src="/assets/modules/module13/image31.png" title="" class="native-img"></p>
<p class="c37 c25"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_157_full_chip_partitioning`,title:`Full Chip Partitioning`,html:`<h3 class="c15" id="h.az8tlhtckli8">Concept Overview</h3>
<p class="c2">Full chip partitioning is the process of dividing an entire System-on-Chip (SoC) into multiple functional blocks so that each block can be designed, verified, and optimized efficiently.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.53ln1nro7n91">Blocks Involved in Full Chip Partitioning</h3>
<p class="c2">The figure illustrates partitioning of the following major categories of blocks:</p>
<h4 class="c33" id="h.gyojii930gje">1. Analog Blocks</h4>
<ul class="c5 lst-kix_hr6d8f24ms9o-0 start"><li class="c2 c13 li-bullet-0">Examples include:</li></ul>
<ul class="c5 lst-kix_hr6d8f24ms9o-1 start"><li class="c2 c12 li-bullet-0">Phase Locked Loops (PLLs)</li><li class="c2 c12 li-bullet-0">Oscillators</li><li class="c2 c12 li-bullet-0">Low Dropout Regulators (LDOs)</li></ul>
<ul class="c5 lst-kix_hr6d8f24ms9o-0"><li class="c2 c13 li-bullet-0">These blocks are typically sensitive to noise and require special placement and isolation.</li></ul>
<h4 class="c33" id="h.o2bu3duyz8q">2. Digital Blocks</h4>
<ul class="c5 lst-kix_w92b0kmgndvo-0 start"><li class="c2 c13 li-bullet-0">Examples include:</li></ul>
<ul class="c5 lst-kix_w92b0kmgndvo-1 start"><li class="c2 c12 li-bullet-0">Processor cores</li><li class="c2 c12 li-bullet-0">Control logic</li></ul>
<ul class="c5 lst-kix_w92b0kmgndvo-0"><li class="c2 c13 li-bullet-0">These blocks occupy a significant portion of the chip area and are timing critical.</li></ul>
<h4 class="c33" id="h.36d1c68cvoxy">3. Memory Blocks</h4>
<ul class="c5 lst-kix_wki9nufgg5oc-0 start"><li class="c2 c13 li-bullet-0">Examples include:</li></ul>
<ul class="c5 lst-kix_wki9nufgg5oc-1 start"><li class="c2 c12 li-bullet-0">ROM</li><li class="c2 c12 li-bullet-0">FLASH</li></ul>
<ul class="c5 lst-kix_wki9nufgg5oc-0"><li class="c2 c13 li-bullet-0">Memory blocks are usually hard macros with fixed dimensions and pin locations.</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.bhyct4so7l54">Inter-Block Communication</h3>
<ul class="c5 lst-kix_t8zj7tb2jnj4-0 start"><li class="c2 c13 li-bullet-0">Communication between different blocks is carried out using the AXI protocol.</li><li class="c2 c13 li-bullet-0">AXI provides:</li></ul>
<ul class="c5 lst-kix_t8zj7tb2jnj4-1 start"><li class="c2 c12 li-bullet-0">High-speed data transfer</li><li class="c2 c12 li-bullet-0">Standardized interfaces</li><li class="c2 c12 li-bullet-0">Scalability across multiple blocks</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.w12vvylaqlyn">Partition Representation</h3>
<ul class="c5 lst-kix_ufhyad8kn8y4-0 start"><li class="c2 c13 li-bullet-0">The partitions are highlighted in shaded pale-yellow color in the figure.</li><li class="c2 c13 li-bullet-0">Each shaded region represents a separate functional partition of the full chip.</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.unfujg1lkts1">Key Advantages of Full Chip Partitioning</h3>
<ul class="c5 lst-kix_80pevgqc69k5-0 start"><li class="c2 c13 li-bullet-0">Enables parallel development of different blocks</li><li class="c2 c13 li-bullet-0">Improves manageability of large SoC designs</li><li class="c2 c13 li-bullet-0">Simplifies floorplanning, placement, and routing</li><li class="c2 c13 li-bullet-0">Enhances timing closure and power optimization</li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.xk3m39kfx1qg">Student Takeaway</h3>
<p class="c2">Full chip partitioning is essential for modern SoC designs, where analog, digital, and memory blocks must coexist while meeting performance, power, and area constraints.</p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c24"><img alt="" src="/assets/modules/module13/image21.png" title="" class="native-img"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_207_floorplanning`,title:`Floorplanning`,html:`<p class="c2">Floorplanning is the process of placing blocks and macros within the chip or core area. It defines the routing spaces between these blocks and determines the overall die size.<br /> During floorplanning, routing tracks are planned for standard cell placement. This stage also includes power planning, where power and ground (P/G) connections are created, along with I/O placement, which is finalized at this stage.</p>
<hr>
<p class="c10"></p>`},{id:`ch_211_goals_of_floorplanning`,title:`Goals of Floorplanning`,html:`<p class="c2">A good floorplan should satisfy the following objectives:</p>
<ol class="c5 lst-kix_tmypm2nosot3-0 start" start="1"><li class="c2 c13 li-bullet-0">Minimize total chip area by efficient utilization of available space.<br /></li><li class="c2 c13 li-bullet-0">Simplify routing, ensuring congestion-free interconnections.<br /></li><li class="c2 c13 li-bullet-0">Reduce IR drop across the design by proper power distribution.<br /></li><li class="c2 c13 li-bullet-0">Minimize signal delays to improve overall design performance.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_216_importing_the_design`,title:`Importing the Design`,html:`<p class="c2">The following input files are required to be loaded into the Place and Route (PnR) tool:</p>
<ol class="c5 lst-kix_y9h9k26n2g2t-0 start" start="1"><li class="c2 c13 li-bullet-0">Netlist (.v)<br /></li><li class="c2 c13 li-bullet-0">Physical libraries (.lef)<br /></li><li class="c2 c13 li-bullet-0">Timing libraries (.lib)<br /></li><li class="c2 c13 li-bullet-0">Technology files<br /></li><li class="c2 c13 li-bullet-0">Timing and design constraints (.sdc)<br /></li><li class="c2 c13 li-bullet-0">I/O information file (optional)<br /></li><li class="c2 c13 li-bullet-0">Macro placement file (optional)<br /></li><li class="c2 c13 li-bullet-0">Power specification file (optional)</li></ol>
<p class="c10"></p>
<p class="c10"></p>
<p class="c2">SANITY CHECKS</p>
<p class="c2">Sanity checks are performed to verify the correctness and quality of the design before proceeding to the next stages of physical design.</p>
<p class="c2">Purpose of Sanity Checks</p>
<ol class="c5 lst-kix_gnyugsqoyzy9-0 start" start="1"><li class="c2 c13 li-bullet-0">Checks the quality of the netlist in terms of timing.<br /></li><li class="c2 c13 li-bullet-0">Checks the issues related to Library files, Timing constraints, IOs and optimization directives.<br /></li></ol>
<p class="c2">Netlist Sanity Checks</p>
<p class="c2">Netlist sanity checks are as follows:</p>
<ol class="c5 lst-kix_6nspxosrx6jp-0 start" start="3"><li class="c2 c13 li-bullet-0">Floating and unconstrained pins.<br /></li><li class="c2 c13 li-bullet-0">Un-driven input (i/p) ports and un-loaded output (o/p) ports.<br /></li><li class="c2 c13 li-bullet-0">Pin direction mismatches and multiple drivers, etc.<br /></li><li class="c2 c13 li-bullet-0">Issues like unconnected or wrongly connected Tie-High or Tie-Low pins and power pins may arise.<br /></li></ol>
<p class="c2">Common Sanity Check Commands</p>
<ol class="c5 lst-kix_c6ew43qb6j2o-0 start" start="7"><li class="c2 c13 li-bullet-0">check_design<br /></li><li class="c2 c13 li-bullet-0">check_library<br /></li></ol>
<p class="c2 c25"></p>
<hr>
<p class="c10"></p>
<p class="c2">OUTPUT OF FLOORPLAN</p>
<p class="c2">The floorplan stage produces the following outputs:</p>
<ol class="c5 lst-kix_ajez5xtndrkz-0 start" start="1"><li class="c2 c13 li-bullet-0">Area of the die/block is determined.<br /></li><li class="c2 c13 li-bullet-0">I/O pads are placed.<br /></li><li class="c2 c13 li-bullet-0">Macros are placed.<br /></li><li class="c2 c13 li-bullet-0">Power grid is designed.<br /></li><li class="c2 c13 li-bullet-0">Pre-routing for power is carried out.<br /></li><li class="c2 c13 li-bullet-0">Areas for the placement of standard cells are determined.<br /></li></ol>
<hr>
<p class="c10"></p>
<p class="c2 c25"></p>
<p class="c2">TERMS</p>
<p class="c2">1. Macro<br /> A macro is a special memory element used to store data efficiently and occupies less space on the chip.</p>
<p class="c2">2. Hard Macro<br /> In a hard macro, the circuit is fixed. The type of gates used is not known, and only timing information is available, not the functional details.</p>
<p class="c2">3. Soft Macro<br /> In a soft macro, the circuit is not fixed. The types of gates used are known, and both timing and functional information are available.</p>
<p class="c2">4. Core<br /> The core is the inner block of the chip which contains standard cells and macros.</p>
<p class="c2">5. Die<br /> The die is the outer region around the core where the I/O pads are placed.</p>
<p class="c2">6. Halo<br /> Halo is also called the keep-out margin. It is the region around the boundary of fixed macros where no other macros or standard cells are allowed to be placed. If the macro is moved, the halo also moves alon</p>
<p class="c2">with it.</p>
<p class="c40"><br /><img alt="" src="/assets/modules/module13/image8.png" title="" class="native-img"></p>
<p class="c2">7. Blockage<br /> Blockage can be specified for any part of the design. If the block is moved, the blockage does not move.</p>
<p class="c2">8. Placement Blockage<br /> Placement blockage prevents the tool from placing cells in a specific region.</p>
<p class="c2">9. Fly-lines<br /> Fly-lines are virtual connections between macros and between macros and I/O pads. They help in understanding the logical connections among macros and I/O pads.<br /><br /><img alt="" src="/assets/modules/module13/image29.png" title="" class="native-img"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2">TYPES OF FLOORPLAN</p>
<p class="c2">Floorplans can be classified based on how the blocks/macros are placed with respect to routing channels.</p>
<ol class="c5 lst-kix_yy2tjdk5mow4-0 start" start="1"><li class="c2 c13 li-bullet-0">Abutted Floorplan<br /></li></ol>
<ul class="c5 lst-kix_yy2tjdk5mow4-1 start"><li class="c2 c12 li-bullet-0">Channel-less placement of the blocks.<br /></li><li class="c2 c12 li-bullet-0">Blocks are placed adjacent to each other without leaving routing channels in between.<br /></li></ul>
<ol class="c5 lst-kix_yy2tjdk5mow4-0" start="2"><li class="c2 c13 li-bullet-0">Non-Abutted Floorplan<br /></li></ol>
<ul class="c5 lst-kix_yy2tjdk5mow4-1 start"><li class="c2 c12 li-bullet-0">Channel-based placement of the blocks.<br /></li><li class="c2 c12 li-bullet-0">Dedicated routing channels are left between blocks to simplify routing.<br /></li></ul>
<ol class="c5 lst-kix_yy2tjdk5mow4-0" start="3"><li class="c2 c13 li-bullet-0">Partially Abutted and Mixed Floorplan<br /></li></ol>
<ul class="c5 lst-kix_yy2tjdk5mow4-1 start"><li class="c2 c12 li-bullet-0">Narrow channel placement of the blocks.<br /></li><li class="c2 c12 li-bullet-0">Mixed floorplan contains a combination of:<br /></li></ul>
<ul class="c5 lst-kix_yy2tjdk5mow4-2 start"><li class="c2 c29 li-bullet-0">Abutted blocks<br /></li><li class="c2 c29 li-bullet-0">Non-abutted blocks<br /></li><li class="c2 c29 li-bullet-0">Partially abutted blocks<br /></li></ul>
<p class="c2"><img alt="" src="/assets/modules/module13/image48.png" title="" class="native-img"></p>
<p class="c2 c25"></p>
<p class="c2">Steps of Floorplan</p>
<ol class="c5 lst-kix_hb02t46bq5x8-0 start" start="1"><li class="c2 c13 li-bullet-0">Specify the size and shape of the block<br /></li><li class="c2 c13 li-bullet-0">Create voltage areas<br /></li><li class="c2 c13 li-bullet-0">IO placement<br /></li><li class="c2 c13 li-bullet-0">Create standard cell rows<br /></li><li class="c2 c13 li-bullet-0">Perform macro placement<br /></li><li class="c2 c13 li-bullet-0">Add routing and placement blockages<br /></li><li class="c2 c13 li-bullet-0">Add power switches (daisy chain)<br /></li><li class="c2 c13 li-bullet-0">Create the power mesh<br /></li><li class="c2 c13 li-bullet-0">Add boundary cells<br /></li><li class="c2 c13 li-bullet-0">Add physical cells (well tap, end cap, etc.)<br /></li><li class="c2 c13 li-bullet-0">Place and qualify push-down cells<br /></li><li class="c2 c13 li-bullet-0">Create bounds / plan groups / density screens</li></ol>
<p class="c10"></p>
<p class="c10"></p>
<p class="c2">IO Placement</p>
<ol class="c5 lst-kix_sikw9f4ptqwx-0 start" start="1"><li class="c2 c13 li-bullet-0">At the chip level, we consider IO pads, whereas at the block level we consider IO pins.<br /></li><li class="c2 c13 li-bullet-0">A pin is a logical entity that belongs to a port.<br /></li><li class="c2 c13 li-bullet-0">A port is a physical entity, and it has only one pin associated with it.<br /></li><li class="c2 c13 li-bullet-0">The netlist contains pins, whereas the layout contains ports.<br /></li><li class="c2 c13 li-bullet-0">A port that is not placed is not represented in the layout.<br /></li><li class="c2 c13 li-bullet-0">Different types of IOs:<br /> i. Signal pads / pins<br /> ii. Core power pads / pins<br /> iii. IO power pads / pins<br /> iv. Corner pads – these do not have any logic but provide IO pad ring connectivity<br /> v. Filler pads – these fill the gaps that arise between IO pads to maintain ring connectivity<br /></li><li class="c2 c13 li-bullet-0">IO pads enable the design to operate at different voltages with the help of level shifters:<br /> – Pre-drivers operate at core voltage<br /> – Post-drivers operate at IO voltage<br /></li><li class="c2 c13 li-bullet-0">The number of core power pads required is deduced by design requirements.<br /><img alt="" src="/assets/modules/module13/image47.png" title="" class="native-img"></li><li class="c2 c13 li-bullet-0">There shall be one core GND pad along with every core power pad.<br /></li><li class="c2 c13 li-bullet-0">The number of IO pads needed is given by a thumb rule:<br /> – One pair of IO power pads for every 4 to 6 signal pads.</li></ol>
<p class="c10"></p>`},{id:`ch_275_macro_placement_lecture_explanation`,title:`Macro Placement – Lecture Explanation`,html:`<p class="c2">Now let us understand Macro Placement, which is a very critical step in floorplanning.<br /> Wrong macro placement can lead to routing congestion, IR drop issues, timing violations, and poor performance.</p>
<p class="c2">So we follow certain guidelines while placing macros.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.v91ddnmx29i0">1. Place macros around the chip boundary</h3>
<p class="c2">In general, hard macros should be placed near the core boundary rather than inside the core.</p>
<p class="c2">Why?<br /> If macros are placed inside the core:</p>
<ul class="c5 lst-kix_u69637q0853t-0 start"><li class="c2 c13 li-bullet-0">Routing has to detour around large macro blocks<br /></li><li class="c2 c13 li-bullet-0">Congestion increases<br /></li><li class="c2 c13 li-bullet-0">Power delivery becomes difficult<br /></li></ul>
<p class="c2">By placing macros near the boundary:</p>
<ul class="c5 lst-kix_177qgv6rxami-0 start"><li class="c2 c13 li-bullet-0">Power can be easily supplied<br /></li><li class="c2 c13 li-bullet-0">IR drop is reduced<br /></li><li class="c2 c13 li-bullet-0">Routing inside the core becomes cleaner<br /></li></ul>
<p class="c2">This is especially important for high-power-consuming macros.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.s3r2w6xyy30t">2. Consider connections between fixed cells (Fly-lines analysis)</h3>
<p class="c2">Before fixing a macro position, we must analyze its connections.</p>
<p class="c2">Some connections are already fixed:</p>
<ul class="c5 lst-kix_y0dydt8ji94j-0 start"><li class="c2 c13 li-bullet-0">Connections between I/O pads and macros<br /></li><li class="c2 c13 li-bullet-0">Connections between pre-placed macros<br /></li></ul>
<p class="c2">These logical connections are visualized using fly-lines.</p>
<p class="c2">Fly-lines help us:</p>
<ul class="c5 lst-kix_7w18g7qm9opm-0 start"><li class="c2 c13 li-bullet-0">Understand connectivity<br /></li><li class="c2 c13 li-bullet-0">Avoid long interconnects<br /></li><li class="c2 c13 li-bullet-0">Reduce unnecessary routing detours<br /></li></ul>
<p class="c2">So macro placement should always be done after fly-line analysis.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.uhr5kbmbwksm">3. Macro alignment and orientation</h3>
<p class="c2">Macros are not always placed in their default orientation.</p>
<p class="c2">They can be:</p>
<ul class="c5 lst-kix_oyfj9pd0iog-0 start"><li class="c2 c13 li-bullet-0">Rotated<br /></li><li class="c2 c13 li-bullet-0">Mirrored<br /></li><li class="c2 c13 li-bullet-0">Flipped<br /></li></ul>
<p class="c2">The goal is to:</p>
<ul class="c5 lst-kix_j7sn1htew5b0-0 start"><li class="c2 c13 li-bullet-0">Minimize distance between macro pins<br /></li><li class="c2 c13 li-bullet-0">Reduce wire length<br /></li><li class="c2 c13 li-bullet-0">Simplify routing<br /></li></ul>
<p class="c2">Proper alignment and orientation directly improve timing and routability.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.ksjxqumoo5a9">4. Provide sufficient spacing around macros</h3>
<p class="c2">Macros block routing resources.</p>
<p class="c2">So we must reserve enough space around macros for:</p>
<ul class="c5 lst-kix_ca0r2nlm1n13-0 start"><li class="c2 c13 li-bullet-0">Signal routing<br /></li><li class="c2 c13 li-bullet-0">Power grid routing<br /></li></ul>
<p class="c2">If spacing is insufficient:</p>
<ul class="c5 lst-kix_olh8tzrs38kr-0 start"><li class="c2 c13 li-bullet-0">Routing congestion increases<br /></li><li class="c2 c13 li-bullet-0">DRC violations occur<br /></li></ul>
<p class="c2">Hence, routing resource estimation is very important during macro placement.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.uyk3bcftgsfp">5. Reserve space for the power grid</h3>
<p class="c2">Macros consume power, and the power grid requirement depends on power consumption.</p>
<p class="c2">If power consumption is high:</p>
<ul class="c5 lst-kix_xvq0cuki9iat-0 start"><li class="c2 c13 li-bullet-0">More power straps are required<br /></li><li class="c2 c13 li-bullet-0">Wider power routes are needed<br /></li></ul>
<p class="c2">So during macro placement:</p>
<ul class="c5 lst-kix_yyavwnvmeze8-0 start"><li class="c2 c13 li-bullet-0">Power requirement must be estimated<br /></li><li class="c2 c13 li-bullet-0">Enough space must be reserved for the power grid<br /></li></ul>
<p class="c2">This helps avoid IR drop and EM issues later.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.ld2ge8corip5">6. Avoid criss-cross connections between macros</h3>
<p class="c2">Criss-cross connections:</p>
<ul class="c5 lst-kix_vg3s8aio6ffp-0 start"><li class="c2 c13 li-bullet-0">Increase routing complexity<br /></li><li class="c2 c13 li-bullet-0">Create congestion<br /></li><li class="c2 c13 li-bullet-0">Degrade timing<br /></li></ul>
<p class="c2">Macros should be placed such that:</p>
<ul class="c5 lst-kix_1i8he8r3ys9h-0 start"><li class="c2 c13 li-bullet-0">Connections are straight<br /></li><li class="c2 c13 li-bullet-0">Routing paths are clean and direct<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.qm1kkcf0ph7c">7. Group macros based on hierarchy</h3>
<p class="c2">Macros belonging to the same hierarchy usually communicate more.</p>
<p class="c2">So they should be:</p>
<ul class="c5 lst-kix_ya6v8pmqq7oj-0 start"><li class="c2 c13 li-bullet-0">Placed close to each other<br /></li><li class="c2 c13 li-bullet-0">Grouped logically<br /></li></ul>
<p class="c2">This reduces:</p>
<ul class="c5 lst-kix_vpidzwqhnz5o-0 start"><li class="c2 c13 li-bullet-0">Interconnect length<br /></li><li class="c2 c13 li-bullet-0">Timing delay<br /></li><li class="c2 c13 li-bullet-0">Power consumption<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.yaxaknpijzxg">8. Provide proper blockages</h3>
<p class="c2">Finally, placement and routing blockages must be defined:</p>
<ul class="c5 lst-kix_bvprxqg2o3w-0 start"><li class="c2 c13 li-bullet-0">To prevent standard cells near macros<br /></li><li class="c2 c13 li-bullet-0">To protect routing channels<br /></li><li class="c2 c13 li-bullet-0">To control tool behavior<br /></li></ul>
<p class="c2">Blockages ensure that:</p>
<ul class="c5 lst-kix_phnh5ewn77dp-0 start"><li class="c2 c13 li-bullet-0">Macro integrity is maintained</li></ul>
<p class="c2">9. Place the macros close to the IO pins,if it interacts with specific IOs</p>
<p class="c2"><img alt="" src="/assets/modules/module13/image26.png" title="" class="native-img"></p>`},{id:`ch_348_types_of_blockages_lecture_explanation`,title:`Types of Blockages – Lecture Explanation`,html:`<p class="c2">Now let us understand Blockages, which play a very important role during floorplanning and placement.<br /> Blockages control where the tool is allowed to place cells and how routing resources are utilized.</p>
<p class="c2">There are three main types of blockages used in Physical Design.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.paw46ze8zakb">1. Soft Blockage</h3>
<p class="c2">A Soft Blockage restricts the placement of standard cells inside the blockage region.</p>
<p class="c2">However:</p>
<ul class="c5 lst-kix_7j33whc4tqm1-0 start"><li class="c2 c13 li-bullet-0">Buffers are allowed to be placed during optimization<br /></li><li class="c2 c13 li-bullet-0">This helps the tool fix timing violations without completely blocking the area<br /></li></ul>
<p class="c2">Soft blockages are mainly used:</p>
<ul class="c5 lst-kix_28cew6ni5968-0 start"><li class="c2 c13 li-bullet-0">Near macros<br /></li><li class="c2 c13 li-bullet-0">In congestion-prone regions<br /></li><li class="c2 c13 li-bullet-0">Where limited optimization flexibility is required<br /></li></ul>
<p class="c2">So, soft blockages provide controlled placement, not a complete restriction.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.qkz9ou6ku6ka">2. Hard Blockage</h3>
<p class="c2">A Hard Blockage is very strict.</p>
<p class="c2">Inside a hard blockage:</p>
<ul class="c5 lst-kix_7sk5wl6xhvkp-0 start"><li class="c2 c13 li-bullet-0">Standard cells are not allowed<br /></li><li class="c2 c13 li-bullet-0">Buffers are also not allowed<br /></li></ul>
<p class="c2">This type of blockage is used when:</p>
<ul class="c5 lst-kix_l88a7dtr8h41-0 start"><li class="c2 c13 li-bullet-0">The region must be kept completely free<br /></li><li class="c2 c13 li-bullet-0">Routing channels or macro protection is required<br /></li><li class="c2 c13 li-bullet-0">No placement should happen under any condition<br /></li></ul>
<p class="c2">Hard blockages give maximum control, but zero flexibility for optimization.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.9nmicqo8p2s6">3. Partial Blockage</h3>
<p class="c2">A Partial Blockage allows the designer to customize how much area is blocked.</p>
<p class="c2">For example:</p>
<ul class="c5 lst-kix_xh8uvgpnkmd4-0 start"><li class="c2 c13 li-bullet-0">If 50% blockage is specified<br /></li></ul>
<ul class="c5 lst-kix_xh8uvgpnkmd4-1 start"><li class="c2 c12 li-bullet-0">50% of the area is blocked for placement<br /></li><li class="c2 c12 li-bullet-0">Remaining 50% is available for optimization<br /></li></ul>
<p class="c2">Partial blockages are useful when:</p>
<ul class="c5 lst-kix_76adx8tju0hu-0 start"><li class="c2 c13 li-bullet-0">Some placement density is acceptable<br /></li><li class="c2 c13 li-bullet-0">Congestion needs to be controlled<br /></li><li class="c2 c13 li-bullet-0">Optimization flexibility is still required<br /></li></ul>
<p class="c2">This gives a balance between routability and optimization.</p>
<hr>
<p class="c10"></p>`},{id:`ch_381_spacing_between_macros`,title:`Spacing Between Macros`,html:`<p class="c2">Now let us discuss macro-to-macro spacing, which is extremely important for routing and power planning.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.lmzc1pw7h05y">Pin-side and Non-pin-side spacing</h3>
<ul class="c5 lst-kix_qo7753567gc9-0 start"><li class="c2 c13 li-bullet-0">Pin sides of macros require more spacing<br /></li><li class="c2 c13 li-bullet-0">Non-pin sides require minimal spacing<br /></li></ul>
<p class="c2">Reason:</p>
<ul class="c5 lst-kix_l9qrmvgwmq83-0 start"><li class="c2 c13 li-bullet-0">Pin sides need routing resources<br /></li><li class="c2 c13 li-bullet-0">Power and signal connections originate from pins<br /></li></ul>
<p class="c2">Improper spacing can cause:</p>
<ul class="c5 lst-kix_z78briu7eu0b-0 start"><li class="c2 c13 li-bullet-0">Routing congestion<br /></li><li class="c2 c13 li-bullet-0">Timing issues<br /></li><li class="c2 c13 li-bullet-0">DRC violations<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.cwl7aftsma7s">Channel Spacing Formula Between Macros</h3>
<p class="c2">The spacing between macros (on pin sides) is calculated using the following relation:</p>
<p class="c2">Channel spacing between macros =<br /> (Number of pins × Metal pitch) / (Available routing layers / Total routing layers)</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.jb3knnkduchy">Important Note on Pitch Selection</h3>
<p class="c2">The pitch considered is always taken from the topmost metal layer where pins exist.</p>
<p class="c2">For example:</p>
<ul class="c5 lst-kix_9hgjy9qzab2v-0 start"><li class="c2 c13 li-bullet-0">Macro A pins are on Metal 2<br /></li><li class="c2 c13 li-bullet-0">Macro B pins are on Metal 4<br /></li></ul>
<p class="c2">Then:</p>
<ul class="c5 lst-kix_4hno3fnikw63-0 start"><li class="c2 c13 li-bullet-0">The Metal 4 pitch is considered for spacing calculation<br /></li></ul>
<p class="c2">This ensures:</p>
<ul class="c5 lst-kix_3pcagn3wkvgu-0 start"><li class="c2 c13 li-bullet-0">Enough routing tracks are available<br /></li><li class="c2 c13 li-bullet-0">Higher metal layer routing is accommodated properly<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_408_summary_for_students_`,title:`Summary (for students)`,html:`<ul class="c5 lst-kix_vmdqc9651qqv-0 start"><li class="c2 c13 li-bullet-0">Soft blockage → restricts standard cells, allows buffers<br /></li><li class="c2 c13 li-bullet-0">Hard blockage → restricts both standard cells and buffers<br /></li><li class="c2 c13 li-bullet-0">Partial blockage → designer-controlled blockage percentage<br /></li><li class="c2 c13 li-bullet-0">Macro spacing depends on:<br /></li></ul>
<ul class="c5 lst-kix_vmdqc9651qqv-1 start"><li class="c2 c12 li-bullet-0">Number of pins<br /></li><li class="c2 c12 li-bullet-0">Metal pitch<br /></li><li class="c2 c12 li-bullet-0">Available routing layers<br /></li></ul>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_417_post_macro_placement_considerations`,title:`Post Macro Placement Considerations`,html:`<p class="c2">After completing macro placement, there are a few very important steps that must be followed before moving to the next stage of Physical Design.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.8ktkf0rjjmja">1. Fixing the Macros</h3>
<p class="c2">Once macros are placed:</p>
<ul class="c5 lst-kix_iz6ynpsgshcv-0 start"><li class="c2 c13 li-bullet-0">They are fixed at their respective locations<br /></li><li class="c2 c13 li-bullet-0">This ensures that macros do not move during later optimization stages<br /></li></ul>
<p class="c2">Fixing macros is critical because:</p>
<ul class="c5 lst-kix_q2sbsdi51ghr-0 start"><li class="c2 c13 li-bullet-0">Macros are large blocks<br /></li><li class="c2 c13 li-bullet-0">Any movement later can cause massive routing and timing issues<br /></li></ul>
<p class="c2">So, macro fixing provides layout stability.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.qb92rfhyvvkq">2. Minimizing Open Areas</h3>
<p class="c2">Open or unused regions inside the core should be:</p>
<ul class="c5 lst-kix_bo37li6mr10i-0 start"><li class="c2 c13 li-bullet-0">Reduced to the minimum possible<br /></li><li class="c2 c13 li-bullet-0">Kept only where routing resources are intentionally reserved<br /></li></ul>
<p class="c2">If large open areas exist:</p>
<ul class="c5 lst-kix_4j1yo0cqez3-0 start"><li class="c2 c13 li-bullet-0">Routing becomes inefficient<br /></li><li class="c2 c13 li-bullet-0">Placement density becomes unbalanced<br /></li></ul>
<p class="c2">If required, this can be improved by:</p>
<ul class="c5 lst-kix_fgzmc76wj8gg-0 start"><li class="c2 c13 li-bullet-0">Trying different Aspect Ratios of the core or block<br /></li></ul>
<p class="c2">A better aspect ratio leads to:</p>
<ul class="c5 lst-kix_wpltw2iusmzk-0 start"><li class="c2 c13 li-bullet-0">Better utilization<br /></li><li class="c2 c13 li-bullet-0">Easier routing<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.a1g54aexjq96">3. Budgeting Space for Power Network</h3>
<p class="c2">Adequate space must be reserved for the power network during floorplanning.</p>
<p class="c2">If power planning space is underestimated:</p>
<ul class="c5 lst-kix_2fhq1rle6gtr-0 start"><li class="c2 c13 li-bullet-0">Power straps may overlap signal routes<br /></li><li class="c2 c13 li-bullet-0">Severe routing congestion may occur in later stages<br /></li></ul>
<p class="c2">Therefore:</p>
<ul class="c5 lst-kix_32tyomkgd5ek-0 start"><li class="c2 c13 li-bullet-0">Power requirements must be estimated early<br /></li><li class="c2 c13 li-bullet-0">Power grid space must be allocated accordingly<br /></li></ul>
<p class="c2">This step is crucial for:</p>
<ul class="c5 lst-kix_xpq51d50jcrc-0 start"><li class="c2 c13 li-bullet-0">IR drop control<br /></li><li class="c2 c13 li-bullet-0">Reliable power delivery<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.g2m4bk3v9e3e">4. Moving to Power Planning</h3>
<p class="c2">Once:</p>
<ul class="c5 lst-kix_pxrnyqqezuvj-0 start"><li class="c2 c13 li-bullet-0">Macros are fixed<br /></li><li class="c2 c13 li-bullet-0">Open spaces are controlled<br /></li><li class="c2 c13 li-bullet-0">Power grid space is reserved<br /></li></ul>
<p class="c2">The next logical step in the flow is:</p>
<p class="c2">➡️ Power Planning</p>
<p class="c2">Power planning defines:</p>
<ul class="c5 lst-kix_2fri5g928gi2-0 start"><li class="c2 c13 li-bullet-0">How VDD and VSS are distributed<br /></li><li class="c2 c13 li-bullet-0">The strength of the power grid<br /></li><li class="c2 c13 li-bullet-0">Overall power integrity of the design<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.lc5hu8g068i5">Lecture Takeaway (for students)</h3>
<ul class="c5 lst-kix_sbp0xe63xwia-0 start"><li class="c2 c13 li-bullet-0">Always fix macros after placement<br /></li><li class="c2 c13 li-bullet-0">Avoid unnecessary open areas<br /></li><li class="c2 c13 li-bullet-0">Reserve sufficient space for power grid<br /></li><li class="c2 c13 li-bullet-0">Only then proceed to power planning<br /></li></ul>`},{id:`ch_461_floorplan_control_parameters`,title:`Floorplan Control Parameters`,html:`<p class="c2">Before placement begins, we must understand that standard cells can be blocked as per design requirements using blockages.<br /> Now let us discuss the key floorplan control parameters that directly impact routability, timing, and utilization.</p>
<hr>
<p class="c10"></p>`},{id:`ch_465_1_aspect_ratio_ar_`,title:`1. Aspect Ratio (AR)`,html:`<p class="c2">The Aspect Ratio defines the shape of the chip or block.</p>
<h3 class="c15" id="h.oux6ns7m9ikf">Definition</h3>
<p class="c2">Aspect Ratio is defined as the ratio of height to width of the block.</p>
<ul class="c5 lst-kix_6xjkzuxg5tp6-0 start"><li class="c2 c13 li-bullet-0">AR = H / W<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.g05c92lps6h5">Why Aspect Ratio is Important</h3>
<ul class="c5 lst-kix_87vzeqqpaq6e-0 start"><li class="c2 c13 li-bullet-0">Width and height determine the available routing resources<br /></li><li class="c2 c13 li-bullet-0">Routing resources are divided into:<br /></li></ul>
<ul class="c5 lst-kix_87vzeqqpaq6e-1 start"><li class="c2 c12 li-bullet-0">Horizontal routing resources<br /></li><li class="c2 c12 li-bullet-0">Vertical routing resources<br /></li></ul>
<p class="c2">So, aspect ratio directly affects:</p>
<ul class="c5 lst-kix_yfczbr8cy2z1-0 start"><li class="c2 c13 li-bullet-0">Routing congestion<br /></li><li class="c2 c13 li-bullet-0">Timing closure<br /></li><li class="c2 c13 li-bullet-0">Placement quality<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.6su4o8dm7rjl">Aspect Ratio Interpretation</h3>
<ul class="c5 lst-kix_xbhv7iffviv6-0 start"><li class="c2 c13 li-bullet-0">If AR &gt; 1<br /> → Block is rectangular (Height &gt; Width)<br /></li><li class="c2 c13 li-bullet-0">If AR &lt; 1<br /> → Block shape is more square<br /></li></ul>
<p class="c2">A balanced aspect ratio helps:</p>
<ul class="c5 lst-kix_gv6agkxdof4s-0 start"><li class="c2 c13 li-bullet-0">Even distribution of routing tracks<br /></li><li class="c2 c13 li-bullet-0">Better congestion control<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.ds6we9dhxgzn">Full Chip Aspect Ratio Limit</h3>
<ul class="c5 lst-kix_2i9acgn6qq66-0 start"><li class="c2 c13 li-bullet-0">For full-chip designs, the maximum recommended AR is 1.25<br /></li><li class="c2 c13 li-bullet-0">Very high or very low AR values can cause:<br /></li></ul>
<ul class="c5 lst-kix_2i9acgn6qq66-1 start"><li class="c2 c12 li-bullet-0">Routing imbalance<br /></li><li class="c2 c12 li-bullet-0">Timing issues<br /></li><li class="c2 c12 li-bullet-0">Power grid complexity<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.ngfjiep0e55x">Routing Resource View</h3>
<ul class="c5 lst-kix_k7ii7bhqsqat-0 start"><li class="c2 c13 li-bullet-0">Horizontal Routing Resource depends on block width<br /></li><li class="c2 c13 li-bullet-0">Vertical Routing Resource depends on block height<br /></li></ul>
<p class="c2">So choosing the correct aspect ratio ensures:</p>
<ul class="c5 lst-kix_79ugrisxy7pp-0 start"><li class="c2 c13 li-bullet-0">Balanced horizontal and vertical routing capacity<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_496_2_core_utilization`,title:`2. Core Utilization`,html:`<p class="c2">Now let us understand Core Utilization, another very important floorplan parameter.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.ccoh6nbtyxju">Definition</h3>
<p class="c2">Core Utilization is the percentage of core area used for cell placement.</p>
<p class="c2">It includes:</p>
<ul class="c5 lst-kix_412n0aw1jrjg-0 start"><li class="c2 c13 li-bullet-0">Standard cell area<br /></li><li class="c2 c13 li-bullet-0">Macro area<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.sdo4yauzc8nk">Example Explanation</h3>
<p class="c2">If core utilization = 0.7:</p>
<ul class="c5 lst-kix_nxkqelerl5fn-0 start"><li class="c2 c13 li-bullet-0">70% of the core area is used for cell placement<br /></li><li class="c2 c13 li-bullet-0">30% of the core area is reserved for:<br /></li></ul>
<ul class="c5 lst-kix_nxkqelerl5fn-1 start"><li class="c2 c12 li-bullet-0">Routing<br /></li><li class="c2 c12 li-bullet-0">Buffers<br /></li><li class="c2 c12 li-bullet-0">Optimization<br /></li><li class="c2 c12 li-bullet-0">Clock tree insertion<br /></li></ul>
<p class="c2">Higher utilization:</p>
<ul class="c5 lst-kix_sadwm0wwy9qx-0 start"><li class="c2 c13 li-bullet-0">Less routing space<br /></li><li class="c2 c13 li-bullet-0">Higher congestion risk<br /></li></ul>
<p class="c2">Lower utilization:</p>
<ul class="c5 lst-kix_i4ukns2p07wk-0 start"><li class="c2 c13 li-bullet-0">Easier routing<br /></li><li class="c2 c13 li-bullet-0">More area overhead<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.1o0metz6gha4">Core Utilization Formula</h3>
<p class="c2">Core Utilization (%) =<br /> (Total Standard Cell Area + Total Macro Area) × 100 / Total Core Area</p>
<hr>
<p class="c10"></p>`},{id:`ch_520_lecture_takeaway_important_for_students_`,title:`Lecture Takeaway (Important for Students & Interviews)`,html:`<ul class="c5 lst-kix_lrmziurqpp7a-0 start"><li class="c2 c13 li-bullet-0">Aspect Ratio controls shape and routing balance<br /></li><li class="c2 c13 li-bullet-0">Core Utilization controls density and routability<br /></li><li class="c2 c13 li-bullet-0">Wrong AR or high utilization can lead to:<br /></li></ul>
<ul class="c5 lst-kix_lrmziurqpp7a-1 start"><li class="c2 c12 li-bullet-0">Routing congestion<br /></li><li class="c2 c12 li-bullet-0">Timing violations<br /></li><li class="c2 c12 li-bullet-0">IR drop issues<br /></li></ul>
<p class="c2">Both parameters must be chosen carefully during floorplanning.</p>
<p class="c10"></p>
<p class="c24"><img alt="" src="/assets/modules/module13/image5.png" title="" class="native-img"></p>
<p class="c10"></p>`},{id:`ch_527_3_manufacturing_grid`,title:`3. Manufacturing Grid`,html:`<p class="c2">The manufacturing grid represents the smallest geometry that can be manufactured by the foundry.<br /> It is also referred to as the minimum resolution of the technology process.</p>
<h3 class="c15" id="h.om051god48i5">Key Points</h3>
<ul class="c5 lst-kix_7s87snmf5pbi-0 start"><li class="c2 c13 li-bullet-0">All geometries drawn during Physical Design must be snapped to the manufacturing grid<br /></li><li class="c2 c13 li-bullet-0">Any shape not aligned to this grid:<br /></li></ul>
<ul class="c5 lst-kix_7s87snmf5pbi-1 start"><li class="c2 c12 li-bullet-0">Cannot be fabricated correctly<br /></li><li class="c2 c12 li-bullet-0">May lead to DRC violations<br /></li></ul>
<p class="c2">So, the manufacturing grid ensures manufacturability and accuracy of the layout.</p>
<hr>
<p class="c10"></p>`},{id:`ch_535_4_standard_cell_site_unit_tile_`,title:`4. Standard Cell Site (Unit Tile)`,html:`<p class="c2">A standard cell site, also called a unit tile, defines the minimum area that a standard cell can occupy.</p>
<h3 class="c15" id="h.jhllueo9c9y3">Key Characteristics</h3>
<ul class="c5 lst-kix_l7s3dg2w21m-0 start"><li class="c2 c13 li-bullet-0">The height of the site is equal to the height of a standard cell<br /></li><li class="c2 c13 li-bullet-0">The width of the site is as small as a filler cell<br /></li><li class="c2 c13 li-bullet-0">All standard cells must be placed as multiples of the unit tile<br /></li></ul>
<p class="c2">This ensures:</p>
<ul class="c5 lst-kix_vf8liqy99jbi-0 start"><li class="c2 c13 li-bullet-0">Proper alignment<br /></li><li class="c2 c13 li-bullet-0">Legal placement<br /></li><li class="c2 c13 li-bullet-0">Uniform row structure<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_543_5_standard_cell_rows`,title:`5. Standard Cell Rows`,html:`<p class="c2">Standard cell rows are formed by placing standard cell sites side by side.</p>
<h3 class="c15" id="h.r5808unwfkuo">Key Points</h3>
<ul class="c5 lst-kix_e874m4cjp7rf-0 start"><li class="c2 c13 li-bullet-0">Standard cells are placed only on these rows<br /></li><li class="c2 c13 li-bullet-0">Slanting lines on the sides of rows indicate the cell orientation<br /></li><li class="c2 c13 li-bullet-0">Orientation is important for:<br /></li></ul>
<ul class="c5 lst-kix_e874m4cjp7rf-1 start"><li class="c2 c12 li-bullet-0">Power rail alignment<br /></li><li class="c2 c12 li-bullet-0">Correct VDD and VSS connections<br /></li></ul>
<h3 class="c15" id="h.nu787iyamdk">Row Configurations</h3>
<ul class="c5 lst-kix_ublpbzmt7wwi-0 start"><li class="c2 c13 li-bullet-0">Different row configurations are used to:<br /></li></ul>
<ul class="c5 lst-kix_ublpbzmt7wwi-1 start"><li class="c2 c12 li-bullet-0">Align power rails<br /></li><li class="c2 c12 li-bullet-0">Support flipping and mirroring of cells</li></ul>
<p class="c2"><img alt="" src="/assets/modules/module13/image41.png" title="" class="native-img"></p>
<p class="c2 c25"></p>
<hr>
<p class="c10"></p>`},{id:`ch_555_6_track`,title:`6. Track`,html:`<p class="c2">A track is a virtual line used by the PnR tool for routing metal wires.</p>
<h3 class="c15" id="h.p6m230c2sopw">Key Points</h3>
<ul class="c5 lst-kix_wm6u4awg30zz-0 start"><li class="c2 c13 li-bullet-0">Tracks guide the router where metal wires can be placed<br /></li><li class="c2 c13 li-bullet-0">Track spacing depends on:<br /></li></ul>
<ul class="c5 lst-kix_wm6u4awg30zz-1 start"><li class="c2 c12 li-bullet-0">Metal pitch<br /></li><li class="c2 c12 li-bullet-0">Design rules<br /></li></ul>
<p class="c2">Tracks help the tool perform legal and efficient routing.</p>
<hr>
<p class="c10"></p>`},{id:`ch_563_7_placement_grid`,title:`7. Placement Grid`,html:`<p class="c2">The placement grid is formed using standard cell rows composed of sites.</p>
<h3 class="c15" id="h.f7910ahwoqyo">Important Points</h3>
<ul class="c5 lst-kix_l6tia9snyg4m-0 start"><li class="c2 c13 li-bullet-0">Placement grid is a multiple of the manufacturing grid<br /></li><li class="c2 c13 li-bullet-0">All standard cells must be placed on the placement grid<br /></li><li class="c2 c13 li-bullet-0">Ensures:<br /></li></ul>
<ul class="c5 lst-kix_l6tia9snyg4m-1 start"><li class="c2 c12 li-bullet-0">Legal placement<br /></li><li class="c2 c12 li-bullet-0">DRC-clean layout<br /></li><li class="c2 c12 li-bullet-0">Proper power rail alignment<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_570_8_routing_blockage`,title:`8. Routing Blockage`,html:`<p class="c2">A routing blockage restricts the router from placing metal wires in a specified region.</p>
<h3 class="c15" id="h.ysvvkm51aw60">Usage</h3>
<ul class="c5 lst-kix_4qoehvxkytrc-0 start"><li class="c2 c13 li-bullet-0">Protect sensitive areas<br /></li><li class="c2 c13 li-bullet-0">Reserve space for power routing<br /></li><li class="c2 c13 li-bullet-0">Control routing congestion<br /></li></ul>
<p class="c2">Routing blockages give designers better control over routing behavior.</p>
<hr>
<p class="c10"></p>`},{id:`ch_577_9_core_to_pad_io_spacing`,title:`9. Core to Pad / IO Spacing`,html:`<p class="c2">Core-to-IO spacing defines the clearance between the core and the IO pads.</p>
<h3 class="c15" id="h.97z0f52lge76">Purpose</h3>
<ul class="c5 lst-kix_gxdgblnecmjs-0 start"><li class="c2 c13 li-bullet-0">Used for:<br /></li></ul>
<ul class="c5 lst-kix_gxdgblnecmjs-1 start"><li class="c2 c12 li-bullet-0">Placing IO cells<br /></li><li class="c2 c12 li-bullet-0">Creating the power ring<br /></li></ul>
<ul class="c5 lst-kix_gxdgblnecmjs-0"><li class="c2 c13 li-bullet-0">Provides sufficient space for:<br /></li></ul>
<ul class="c5 lst-kix_gxdgblnecmjs-1 start"><li class="c2 c12 li-bullet-0">Power distribution<br /></li><li class="c2 c12 li-bullet-0">Signal routing<br /></li><li class="c2 c12 li-bullet-0">ESD protection<br /></li></ul>
<p class="c2">Proper core-to-IO spacing is essential for:</p>
<ul class="c5 lst-kix_5p7zhrpj6mcc-0 start"><li class="c2 c13 li-bullet-0">Reliable power delivery<br /></li><li class="c2 c13 li-bullet-0">Clean IO routing<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_588_lecture_takeaway_important_for_students_`,title:`Lecture Takeaway (Important for Students & Interviews)`,html:`<ul class="c5 lst-kix_6yri88njdt4b-0 start"><li class="c2 c13 li-bullet-0">Manufacturing grid ensures fabrication accuracy<br /></li><li class="c2 c13 li-bullet-0">Unit tile defines minimum placement granularity<br /></li><li class="c2 c13 li-bullet-0">Rows and placement grid ensure legal cell placement<br /></li><li class="c2 c13 li-bullet-0">Tracks guide routing<br /></li><li class="c2 c13 li-bullet-0">Blockages and IO spacing provide layout control<br /></li></ul>
<p class="c2 c23"><img alt="" src="/assets/modules/module13/image33.png" title="" class="native-img"></p>
<p class="c2 c23 c25"></p>
<h3 class="c15" id="h.6bf05v8iebvz">Issues Arising Due to Poor Floorplanning</h3>
<ol class="c5 lst-kix_878fkc92331g-0 start" start="1"><li class="c2 c13 li-bullet-0">Routing Congestion Near Macros<br /> Insufficient placement blockages around macro pins and corners lead to heavy routing congestion in those regions.<br /><img alt="" src="/assets/modules/module13/image13.png" title="" class="native-img"></li><li class="c2 c13 li-bullet-0">Congestion in Narrow Channels<br /> Placement of standard cells within narrow channels restricts routing resources, resulting in severe congestion.<br /></li><li class="c2 c13 li-bullet-0">Timing Violations Due to Macro Separation<br /> Macros belonging to the same logical partition, when placed far apart, increase interconnect delay and cause timing violations.</li></ol>
<p class="c2 c23"><img alt="" src="/assets/modules/module13/image32.png" title="" class="native-img"></p>
<h3 class="c15" id="h.o2krc3tjhqn8">How to Qualify a Floorplan</h3>
<ol class="c5 lst-kix_g4o184xzguv4-0 start" start="1"><li class="c2 c13 li-bullet-0">Power and Ground Connectivity<br /> Ensure that proper P/G connections are synthesized for all macros and pre-placed cells.<br /></li><li class="c2 c13 li-bullet-0">Macro Placement Strategy<br /> Place macros along the chip boundary to minimize IR-drop effects, especially for high-power-consuming macros.<br /></li><li class="c2 c13 li-bullet-0">Blockage Cleanup<br /> Remove all unnecessary placement and routing blockages that may cause artificial congestion.<br /></li><li class="c2 c13 li-bullet-0">Channel Spacing Verification<br /> Maintain adequate channel spacing between macros and between macros and the chip boundary.<br /> This spacing allows buffer insertion during optimization and helps reduce routing congestion.<br /></li></ol>
<p class="c2 c25"></p>
<h3 class="c15" id="h.60nt6rigjkv3">Creating Voltage Areas</h3>
<p class="c2">A voltage area is a defined placement region in the floorplan that contains one or more logic partitions operating at the same supply voltage.<br /> All standard cells belonging to a particular logic partition are associated with its voltage area and are restricted to be placed only within that area.</p>
<p class="c2">In some designs, we may have logically nested voltage areas. However, it is important to understand that physical floorplans do not support physically nested voltage areas.<br /> Therefore, when logical nesting is required, the physical implementation must use disjoint rectangular or rectilinear shapes, ensuring that:</p>
<ul class="c5 lst-kix_fv9ihvqfudi-0 start"><li class="c2 c13 li-bullet-0">No voltage area physically overlaps another<br /></li><li class="c2 c13 li-bullet-0">No voltage area is embedded inside another<br /></li></ul>
<p class="c2">Physical Compiler performs voltage consistency checks by comparing the operating voltage of each module with the voltage specified for the voltage area. This ensures that all modules inside a voltage area operate at the correct voltage level.</p>
<p class="c2">Voltage areas can be:</p>
<ul class="c5 lst-kix_imwxytc7mld6-0 start"><li class="c2 c13 li-bullet-0">Manually defined by the designer, or<br /></li><li class="c2 c13 li-bullet-0">Automatically derived by Physical Compiler based on row types and site types<br /></li></ul>
<p class="c2">Both rectangular and rectilinear voltage areas are supported.<br /> A voltage area may consist of multiple disjoint rectangular or rectilinear shapes, but this practice is not recommended unless it is required for logically nested voltage areas, as disjoint structures can negatively impact Quality of Results (QoR).</p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_608_technology_node`,title:`Technology Node`,html:`<p class="c2">The technology node—also known as process node or process technology—refers to a specific semiconductor manufacturing process along with its associated design rules.<br /> Each technology node represents a generation of semiconductor technology, and different nodes typically introduce new circuit architectures, device structures, and performance characteristics.</p>
<p class="c2">In general, smaller technology nodes imply smaller feature sizes, which enable:</p>
<ul class="c5 lst-kix_c4ygs6hqwt6-0 start"><li class="c2 c13 li-bullet-0">Smaller transistors<br /></li><li class="c2 c13 li-bullet-0">Higher operating speed<br /></li><li class="c2 c13 li-bullet-0">Lower power consumption<br /></li><li class="c2 c13 li-bullet-0">Increased transistor density<br /></li></ul>
<hr>
<p class="c2 c25"></p>`},{id:`ch_614_historical_meaning_of_technology_node`,title:`Historical Meaning of Technology Node`,html:`<p class="c2">Historically, the process node number directly represented a physical dimension of the transistor, most commonly:</p>
<ul class="c5 lst-kix_bkhycea5cwzk-0 start"><li class="c2 c13 li-bullet-0">Gate length (Lg), or<br /></li><li class="c2 c13 li-bullet-0">Metal 1 half-pitch<br /></li></ul>
<p class="c2">For example:</p>
<ul class="c5 lst-kix_3ln7rt89lofw-0 start"><li class="c2 c13 li-bullet-0">Intel’s 0.5 µm process had a gate length of approximately 0.5 µm<br /></li><li class="c2 c13 li-bullet-0">This interpretation held true from the 1960s through the late 1990s<br /></li></ul>
<p class="c2">Up to the 0.25 µm node (1997), the process node roughly matched the minimum feature size.<br /> After this point, gate length scaling became more aggressive, and the node number no longer directly represented the actual gate length.</p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_622_loss_of_physical_meaning_in_modern_nodes`,title:`Loss of Physical Meaning in Modern Nodes`,html:`<p class="c2">With advanced nodes such as 22 nm, 16 nm, 14 nm, 10 nm, and below, the node number no longer corresponds to any exact physical dimension, such as:</p>
<ul class="c5 lst-kix_7meojy1hv1id-0 start"><li class="c2 c13 li-bullet-0">Gate length<br /></li><li class="c2 c13 li-bullet-0">Metal pitch<br /></li></ul>
<p class="c2">Instead, the node name now refers to a specific generation of manufacturing technology defined by the foundry.</p>
<p class="c2">Since around 2017, node naming has become largely marketing-driven, and:</p>
<ul class="c5 lst-kix_actk33v0bx1i-0 start"><li class="c2 c13 li-bullet-0">Different foundries use the same node name for different transistor densities<br /></li><li class="c2 c13 li-bullet-0">Direct comparisons between foundries are no longer straightforward<br /></li></ul>
<p class="c2">For example:</p>
<ul class="c5 lst-kix_swkj4qb25xvr-0 start"><li class="c2 c13 li-bullet-0">Intel 10 nm is comparable to TSMC/Samsung 7 nm<br /></li><li class="c2 c13 li-bullet-0">Intel 7 nm is comparable to TSMC 5 nm<br /></li></ul>
<hr>
<p class="c2 c25"></p>`},{id:`ch_632_moore_s_law_and_node_scaling`,title:`Moore’s Law and Node Scaling`,html:`<p class="c2">The fundamental driver behind technology node scaling is Moore’s Law, which predicts:</p>
<p class="c2 c32">A doubling of transistor density approximately every 18–24 months.</p>
<p class="c2">To achieve this density doubling:</p>
<ul class="c5 lst-kix_ngutgz6sncca-0 start"><li class="c2 c13 li-bullet-0">Contacted Poly Pitch (CPP) scales by ~0.7×<br /></li><li class="c2 c13 li-bullet-0">Minimum Metal Pitch (MMP) scales by ~0.7×<br /></li></ul>
<p class="c2">This results in:</p>
<p class="c2">0.7×0.7≈0.50.7 \\times 0.7 \\approx 0.50.7×0.7≈0.5</p>
<p class="c2">Which corresponds to half the area per transistor.</p>
<p class="c2">Over time, node naming became a self-fulfilling convention aligned with Moore’s Law rather than a strict physical metric.<br /><br /><img alt="" src="/assets/modules/module13/image7.png" title="" class="native-img"></p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_643_role_of_itrs`,title:`Role of ITRS`,html:`<p class="c2">The International Technology Roadmap for Semiconductors (ITRS) was introduced to:</p>
<ul class="c5 lst-kix_o3l58bl865pa-0 start"><li class="c2 c13 li-bullet-0">Provide guidance and standardization across the semiconductor industry<br /></li><li class="c2 c13 li-bullet-0">Define scaling targets for different technologies<br /></li></ul>
<p class="c2">Traditionally, ITRS defined the process node as:</p>
<p class="c2 c32">The smallest half-pitch of contacted Metal 1 lines allowed by the fabrication process</p>
<p class="c2">By 2006, as microprocessors began driving scaling more than DRAM, ITRS:</p>
<ul class="c5 lst-kix_h4mbix7cu1lh-0 start"><li class="c2 c13 li-bullet-0">Replaced the single “process node” metric<br /></li><li class="c2 c13 li-bullet-0">Introduced separate scaling indicators for:<br /></li></ul>
<ul class="c5 lst-kix_h4mbix7cu1lh-1 start"><li class="c2 c12 li-bullet-0">Flash<br /></li><li class="c2 c12 li-bullet-0">DRAM<br /></li><li class="c2 c12 li-bullet-0">MPU / ASIC<br /></li></ul>
<hr>
<p class="c2 c25"></p>`},{id:`ch_653_gate_length_scaling_limitations`,title:`Gate Length Scaling Limitations`,html:`<p class="c2">At the 45 nm node, Intel achieved a gate length of approximately 25 nm using planar transistors.<br /> Beyond this point:</p>
<ul class="c5 lst-kix_gnxkmzs5ksh8-0 start"><li class="c2 c13 li-bullet-0">Further gate length scaling caused short-channel effects<br /></li><li class="c2 c13 li-bullet-0">Performance and reliability degraded<br /></li></ul>
<p class="c2">As a result:</p>
<ul class="c5 lst-kix_rrmusv5sg7td-0 start"><li class="c2 c13 li-bullet-0">Gate length scaling stalled<br /></li><li class="c2 c13 li-bullet-0">At 32 nm and beyond, gate length was actually increased, even though other dimensions continued to shrink<br /></li></ul>
<hr>
<p class="c2 c25"></p>`},{id:`ch_660_introduction_of_finfet_technology`,title:`Introduction of FinFET Technology`,html:`<p class="c2">To overcome planar transistor limitations, FinFET technology was introduced at 22 nm.</p>
<p class="c2">Key characteristics:</p>
<ul class="c5 lst-kix_ilf6l73gw9na-0 start"><li class="c2 c13 li-bullet-0">Transistor channel is formed using vertical fins<br /></li><li class="c2 c13 li-bullet-0">Effective channel width is given by:<br /></li></ul>
<p class="c2">Weff=2×Hfin+WfinW_{eff} = 2 \\times H_{fin} + W_{fin}Weff​=2×Hfin​+Wfin​</p>
<p class="c2">With FinFETs:</p>
<ul class="c5 lst-kix_luj2ox4tvdme-0 start"><li class="c2 c13 li-bullet-0">Transistor density continued to increase<br /></li><li class="c2 c13 li-bullet-0">Gate length remained relatively constant<br /></li><li class="c2 c13 li-bullet-0">Traditional node naming lost its physical relevance<br /></li></ul>
<hr>
<p class="c2 c25"></p>`},{id:`ch_669_half_node_concept`,title:`Half Node Concept`,html:`<p class="c2">The concept of a half node originated in the 1990s.</p>
<ul class="c5 lst-kix_fu44d3c6jo1l-0 start"><li class="c2 c13 li-bullet-0">A full node shrink targeted a 0.7× linear scaling<br /></li></ul>
<ul class="c5 lst-kix_fu44d3c6jo1l-1 start"><li class="c2 c12 li-bullet-0">Example: 130 nm → 90 nm<br /></li></ul>
<ul class="c5 lst-kix_fu44d3c6jo1l-0"><li class="c2 c13 li-bullet-0">A half node shrink targeted a 0.9× linear scaling<br /></li></ul>
<p class="c2">Foundries designed:</p>
<ul class="c5 lst-kix_o9h1le8kw0a7-0 start"><li class="c2 c13 li-bullet-0">Standard cells<br /></li><li class="c2 c13 li-bullet-0">Design rules<br /></li></ul>
<p class="c2">with the expectation that a half node shrink would follow after ~18 months.<br /> With proper planning, designs could transition smoothly with minimal redesign, except for areas like packaging.</p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_679_decline_in_leading_edge_foundries`,title:`Decline in Leading-Edge Foundries`,html:`<p class="c2">As technology scaling became more complex and expensive:</p>
<ul class="c5 lst-kix_1ge2wg4cvss3-0 start"><li class="c2 c13 li-bullet-0">Capital requirements increased dramatically<br /></li><li class="c2 c13 li-bullet-0">Technical challenges multiplied<br /></li></ul>
<p class="c2">This led to a steady reduction in the number of companies capable of advanced-node fabrication.</p>
<p class="c2">As of 2020, only three companies remained capable of producing cutting-edge logic nodes:</p>
<ul class="c5 lst-kix_c3t1kos7ne3y-0 start"><li class="c2 c13 li-bullet-0">Intel<br /></li><li class="c2 c13 li-bullet-0">Samsung<br /></li><li class="c2 c13 li-bullet-0">TSMC<br /></li></ul>`},{id:`ch_686_mmmc_multi_mode_multi_corner_`,title:`MMMC (Multi-Mode Multi-Corner)`,html:`<h3 class="c15" id="h.ky8c1xguubdt">Background: Technology Node and Variability</h3>
<p class="c2">The technology node—also referred to as process node or process technology—defines a specific semiconductor manufacturing process along with its associated design rules.<br /> Different technology nodes typically represent different generations of integrated circuits, often introducing new device structures and architectures.</p>
<p class="c2">As the technology node shrinks:</p>
<ul class="c5 lst-kix_a8k1g0hahel1-0 start"><li class="c2 c13 li-bullet-0">Feature sizes become smaller<br /></li><li class="c2 c13 li-bullet-0">Transistors become faster<br /></li><li class="c2 c13 li-bullet-0">Power consumption reduces<br /></li><li class="c2 c13 li-bullet-0">Transistor density increases<br /></li></ul>
<p class="c2">Historically, the process node name directly represented physical dimensions of the transistor, such as:</p>
<ul class="c5 lst-kix_v4nfarxgs3r3-0 start"><li class="c2 c13 li-bullet-0">Gate length<br /></li><li class="c2 c13 li-bullet-0">Metal-1 (M1) half-pitch<br /></li></ul>
<p class="c2">However, in modern nodes like 22 nm, 16 nm, 14 nm, and 10 nm, the node name no longer corresponds to any actual physical dimension. Instead, it refers only to a generation of technology defined by the foundry.</p>
<p class="c2">Since around 2017, node naming has largely become marketing-driven, and comparisons between foundries are no longer one-to-one.<br /> For example:</p>
<ul class="c5 lst-kix_ogh3j91ayc81-0 start"><li class="c2 c13 li-bullet-0">Intel 10 nm is comparable to TSMC/Samsung 7 nm<br /></li><li class="c2 c13 li-bullet-0">Intel 7 nm is comparable to TSMC 5 nm<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.mlyq24ku7qzw">Need for MMMC at Advanced Nodes</h3>
<p class="c2">At advanced technology nodes, process variability has become a major challenge for designers.<br /> Variations arise due to:</p>
<ul class="c5 lst-kix_ikbh3popkzcy-0 start"><li class="c2 c13 li-bullet-0">Manufacturing process variations<br /></li><li class="c2 c13 li-bullet-0">Voltage fluctuations<br /></li><li class="c2 c13 li-bullet-0">Temperature changes<br /></li></ul>
<p class="c2">To ensure correct functionality under all conditions, designs must be verified across:</p>
<ul class="c5 lst-kix_dzi08ww5y9o2-0 start"><li class="c2 c13 li-bullet-0">Multiple modes (functional, scan, low-power, test, etc.)<br /></li><li class="c2 c13 li-bullet-0">Multiple corners (process, voltage, temperature variations)<br /></li></ul>
<p class="c2">This dramatically increases the number of timing scenarios that must be analyzed.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.7selnj24fa0i">Limitations of Traditional Flow</h3>
<p class="c2">In traditional physical design tools:</p>
<ul class="c5 lst-kix_d0bruhtorl7n-0 start"><li class="c2 c13 li-bullet-0">Each mode/corner combination requires a separate abstraction model<br /></li><li class="c2 c13 li-bullet-0">Timing, signal integrity, power, and manufacturability must be closed independently for each scenario<br /></li></ul>
<p class="c2">Due to tool limitations, a common workaround is:</p>
<ul class="c5 lst-kix_g21w8smbxaaz-0 start"><li class="c2 c13 li-bullet-0">Running fewer mode/corner scenarios<br /></li><li class="c2 c13 li-bullet-0">Adding extra timing margins to compensate<br /></li></ul>
<p class="c2">However, this approach leads to:</p>
<ul class="c5 lst-kix_8ht3li2flhrm-0 start"><li class="c2 c13 li-bullet-0">Increased die size<br /></li><li class="c2 c13 li-bullet-0">Higher power consumption<br /></li><li class="c2 c13 li-bullet-0">Longer time-to-market<br /></li><li class="c2 c13 li-bullet-0">Reduced product competitiveness<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.s0x45wkdxevu">What is MMMC?</h3>
<p class="c2">Multi-Mode Multi-Corner (MMMC) refers to the capability of a physical design tool to:</p>
<p class="c2 c32">Simultaneously optimize all design metrics across all modes and corners</p>
<p class="c2">Instead of handling each scenario independently, MMMC enables concurrent optimization, ensuring that:</p>
<ul class="c5 lst-kix_z867fqkslltw-0 start"><li class="c2 c13 li-bullet-0">Timing<br /></li><li class="c2 c13 li-bullet-0">Power<br /></li><li class="c2 c13 li-bullet-0">Signal integrity<br /></li><li class="c2 c13 li-bullet-0">Manufacturability<br /></li></ul>
<p class="c2">are all met together, across all operating conditions.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.bbv33smxntpu">Virtual Timing Graph Concept</h3>
<p class="c2">MMMC is implemented using a data structure known as a Virtual Timing Graph.</p>
<ul class="c5 lst-kix_wgyo7drjels0-0 start"><li class="c2 c13 li-bullet-0">For each mode/corner scenario, a virtual timing graph is created<br /></li><li class="c2 c13 li-bullet-0">These graphs are then merged and stored as a single vector-based timing tree<br /></li><li class="c2 c13 li-bullet-0">This unified structure captures timing information for:<br /></li></ul>
<ul class="c5 lst-kix_wgyo7drjels0-1 start"><li class="c2 c12 li-bullet-0">An unlimited number of mode/corner combinations<br /></li><li class="c2 c12 li-bullet-0">All critical paths simultaneously<br /></li></ul>
<p class="c2">This allows the tool to:</p>
<ul class="c5 lst-kix_55qdrhjeg3uw-0 start"><li class="c2 c13 li-bullet-0">Identify worst-case paths across scenarios<br /></li><li class="c2 c13 li-bullet-0">Perform global optimization instead of local fixes<br /></li><li class="c2 c13 li-bullet-0">Achieve faster and more accurate timing closure<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.qbga3l8ws88w">Benefits of MMMC</h3>
<p class="c2">Using MMMC provides:</p>
<ul class="c5 lst-kix_qsjuvdtujod6-0 start"><li class="c2 c13 li-bullet-0">Accurate worst-case timing analysis<br /></li><li class="c2 c13 li-bullet-0">Reduced over-design and margins<br /></li><li class="c2 c13 li-bullet-0">Lower power consumption<br /></li><li class="c2 c13 li-bullet-0">Smaller die size<br /></li><li class="c2 c13 li-bullet-0">Faster time-to-market<br /></li><li class="c2 c13 li-bullet-0">Better overall QoR (Quality of Results)<br /></li></ul>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_737_modal_analysis_mode_based_timing_analysi`,title:`Modal Analysis (Mode-Based Timing Analysis)`,html:`<h3 class="c15" id="h.z9y3q8b1s0f7">Why Mode Analysis Is Required</h3>
<p class="c2">Modern VLSI designs are highly complex SoCs, where a single chip performs multiple functions at different points in time.<br /> This means the same hardware blocks inside the chip may behave differently under different usage scenarios, also called modes.</p>
<p class="c2">In other words:</p>
<ul class="c5 lst-kix_dtsjewrvgoao-0 start"><li class="c2 c13 li-bullet-0">A portion of the design may have one requirement in one mode<br /></li><li class="c2 c13 li-bullet-0">The same portion may have a different requirement in another mode<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.pxc3s47da93s">Real-Life Example: Video Entertainment Device</h3>
<p class="c2">Consider a device in the video entertainment domain.</p>
<ul class="c5 lst-kix_8kimqajh5y8i-0 start"><li class="c2 c13 li-bullet-0">When the user is watching video:<br /></li></ul>
<ul class="c5 lst-kix_8kimqajh5y8i-1 start"><li class="c2 c12 li-bullet-0">User experience is critical<br /></li><li class="c2 c12 li-bullet-0">High performance is required<br /></li><li class="c2 c12 li-bullet-0">Timing constraints are tight<br /></li></ul>
<ul class="c5 lst-kix_8kimqajh5y8i-0"><li class="c2 c13 li-bullet-0">When the user is not watching video:<br /></li></ul>
<ul class="c5 lst-kix_8kimqajh5y8i-1 start"><li class="c2 c12 li-bullet-0">Performance is not critical<br /></li><li class="c2 c12 li-bullet-0">Power saving becomes more important<br /></li><li class="c2 c12 li-bullet-0">Frequency can be scaled down<br /></li></ul>
<p class="c2">Thus, parts of the same chip have changing requirements, depending on:</p>
<ul class="c5 lst-kix_krjzcje5jhru-0 start"><li class="c2 c13 li-bullet-0">What the device is doing<br /></li><li class="c2 c13 li-bullet-0">Which mode it is currently operating in<br /></li></ul>
<p class="c2">Each part of the design must meet the requirements of all modes it participates in.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.fpexhiw6ynr4">Simplified Design Scenario</h3>
<p class="c2">Let us assume:</p>
<ul class="c5 lst-kix_ci366pm253wh-0 start"><li class="c2 c13 li-bullet-0">The device has two modes:<br /></li></ul>
<ul class="c5 lst-kix_ci366pm253wh-1 start"><li class="c2 c12 li-bullet-0">M1<br /></li><li class="c2 c12 li-bullet-0">M2<br /></li></ul>
<ul class="c5 lst-kix_ci366pm253wh-0"><li class="c2 c13 li-bullet-0">The design contains two blocks:<br /></li></ul>
<ul class="c5 lst-kix_ci366pm253wh-1 start"><li class="c2 c12 li-bullet-0">P1<br /></li><li class="c2 c12 li-bullet-0">P2<br /></li></ul>
<p class="c2">The timing requirements of P1 and P2 change depending on whether the device is in M1 or M2.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.ehdlb5c0egs">Timing Requirement Implication</h3>
<ul class="c5 lst-kix_elydkw5u5tmt-0 start"><li class="c2 c13 li-bullet-0">P1 must meet the timing requirements of both M1 and M2<br /></li><li class="c2 c13 li-bullet-0">Therefore, P1 must be designed for the most restrictive requirement<br /></li><li class="c2 c13 li-bullet-0">Similarly, P2 must also meet the most restrictive requirement among M1 and M2<br /></li></ul>
<p class="c2">However, an important observation is:</p>
<ul class="c5 lst-kix_bh6f2h5umg2g-0 start"><li class="c2 c13 li-bullet-0">P1 and P2 always operate in the same mode<br /></li><li class="c2 c13 li-bullet-0">There is no situation where:<br /></li></ul>
<ul class="c5 lst-kix_bh6f2h5umg2g-1 start"><li class="c2 c12 li-bullet-0">P1 operates in M1<br /></li><li class="c2 c12 li-bullet-0">P2 operates in M2<br /></li></ul>
<p class="c2">The entire chip switches modes together.</p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image2.png" title="" class="native-img"></p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.b9bvafz49usb">Functional Mode vs Scan Mode Example</h3>
<p class="c2">Consider the design shown in the figure (conceptual):</p>
<ul class="c5 lst-kix_o5gv7xaep268-0 start"><li class="c2 c13 li-bullet-0">Solid lines → Functional paths<br /></li><li class="c2 c13 li-bullet-0">Dotted lines → Scan paths<br /></li></ul>
<p class="c2">The same clock port (CLK) is used for:</p>
<ul class="c5 lst-kix_1zudiq7wwc33-0 start"><li class="c2 c13 li-bullet-0">SystemClock during functional mode<br /></li><li class="c2 c13 li-bullet-0">TestClock during scan mode<br /></li></ul>
<p class="c2">Clock characteristics:</p>
<ul class="c5 lst-kix_vv4hdbjbulgm-0 start"><li class="c2 c13 li-bullet-0">SystemClock:<br /></li></ul>
<ul class="c5 lst-kix_vv4hdbjbulgm-1 start"><li class="c2 c12 li-bullet-0">High frequency<br /></li><li class="c2 c12 li-bullet-0">Example: 10 ns period<br /></li></ul>
<ul class="c5 lst-kix_vv4hdbjbulgm-0"><li class="c2 c13 li-bullet-0">TestClock:<br /></li></ul>
<ul class="c5 lst-kix_vv4hdbjbulgm-1 start"><li class="c2 c12 li-bullet-0">Lower frequency<br /></li><li class="c2 c12 li-bullet-0">Example: 40 ns period<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.tl45sr542o9o">Path Analysis</h3>
<ul class="c5 lst-kix_cre7n21zvtt8-0 start"><li class="c2 c13 li-bullet-0">F1 → F3<br /></li></ul>
<ul class="c5 lst-kix_cre7n21zvtt8-1 start"><li class="c2 c12 li-bullet-0">Functional path<br /></li><li class="c2 c12 li-bullet-0">Must meet 10 ns timing<br /></li><li class="c2 c12 li-bullet-0">Active during functional mode<br /></li></ul>
<ul class="c5 lst-kix_cre7n21zvtt8-0"><li class="c2 c13 li-bullet-0">F1 → F2 / SI<br /></li></ul>
<ul class="c5 lst-kix_cre7n21zvtt8-1 start"><li class="c2 c12 li-bullet-0">Scan path<br /></li><li class="c2 c12 li-bullet-0">Must meet 40 ns timing<br /></li><li class="c2 c12 li-bullet-0">Active during scan mode<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.33h01z97ujv3">Problem Without Mode Definition</h3>
<p class="c2">Since both clocks originate from the same CLK port:</p>
<ul class="c5 lst-kix_d15jccekcuyr-0 start"><li class="c2 c13 li-bullet-0">Both SystemClock and TestClock are declared at the same location<br /></li></ul>
<p class="c2">During timing analysis:</p>
<ul class="c5 lst-kix_xchzyypt1qz2-0 start"><li class="c2 c13 li-bullet-0">Every path is analyzed against both clocks<br /></li><li class="c2 c13 li-bullet-0">As a result:<br /></li></ul>
<ul class="c5 lst-kix_xchzyypt1qz2-1 start"><li class="c2 c12 li-bullet-0">Path F1 → F2 is also analyzed with SystemClock (10 ns)<br /></li></ul>
<p class="c2">This is over-constraining the design:</p>
<ul class="c5 lst-kix_8o67sjppijf7-0 start"><li class="c2 c13 li-bullet-0">For scan, 40 ns is sufficient<br /></li><li class="c2 c13 li-bullet-0">Forcing it to meet 10 ns is unnecessary<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.3xpx2hy8fpsa">Key Observation</h3>
<p class="c2">At any given time:</p>
<ul class="c5 lst-kix_qb9bs9lxhh1a-0 start"><li class="c2 c13 li-bullet-0">The device operates in only one mode<br /></li></ul>
<ul class="c5 lst-kix_qb9bs9lxhh1a-1 start"><li class="c2 c12 li-bullet-0">Either functional mode<br /></li><li class="c2 c12 li-bullet-0">Or scan mode<br /></li></ul>
<p class="c2">So:</p>
<ul class="c5 lst-kix_91lxxj1w73ei-0 start"><li class="c2 c13 li-bullet-0">When in functional mode → scan paths are irrelevant<br /></li><li class="c2 c13 li-bullet-0">When in scan mode → functional paths are irrelevant<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.g84eyo8x0keg">Solution: Mode-Based Timing Analysis</h3>
<p class="c2">To solve this, we define separate modes:</p>
<h4 class="c33" id="h.gnkf8f49kq7x">Functional Mode</h4>
<ul class="c5 lst-kix_oe2frs2ayhtj-0 start"><li class="c2 c13 li-bullet-0">Analyzes:<br /></li></ul>
<ul class="c5 lst-kix_oe2frs2ayhtj-1 start"><li class="c2 c12 li-bullet-0">F1 → F3<br /></li><li class="c2 c12 li-bullet-0">F2 → F3<br /></li></ul>
<ul class="c5 lst-kix_oe2frs2ayhtj-0"><li class="c2 c13 li-bullet-0">Uses:<br /></li></ul>
<ul class="c5 lst-kix_oe2frs2ayhtj-1 start"><li class="c2 c12 li-bullet-0">SystemClock<br /></li></ul>
<h4 class="c33" id="h.fblwrq6r1k64">Scan Mode</h4>
<ul class="c5 lst-kix_21knjpihhapq-0 start"><li class="c2 c13 li-bullet-0">Analyzes:<br /></li></ul>
<ul class="c5 lst-kix_21knjpihhapq-1 start"><li class="c2 c12 li-bullet-0">F1 → F2<br /></li></ul>
<ul class="c5 lst-kix_21knjpihhapq-0"><li class="c2 c13 li-bullet-0">Uses:<br /></li></ul>
<ul class="c5 lst-kix_21knjpihhapq-1 start"><li class="c2 c12 li-bullet-0">TestClock<br /></li></ul>
<p class="c2">This ensures:</p>
<ul class="c5 lst-kix_jmj8g2alux7r-0 start"><li class="c2 c13 li-bullet-0">Each path is checked only in the mode where it is active<br /></li><li class="c2 c13 li-bullet-0">No unnecessary over-constraint<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.1pi3jskgdam2">Writing Constraints for Modes</h3>
<p class="c2">There are two approaches:</p>
<ol class="c5 lst-kix_277sgar0620w-0 start" start="1"><li class="c2 c13 li-bullet-0">Write separate constraint sets for each mode<br /></li><li class="c2 c13 li-bullet-0">Write a combined constraint file covering multiple modes<br /></li></ol>
<p class="c2">In practice:</p>
<ul class="c5 lst-kix_akyebpfdqsd6-0 start"><li class="c2 c13 li-bullet-0">Front-end / RTL designers prefer mode-wise constraints<br /></li><li class="c2 c13 li-bullet-0">This aligns naturally with how functionality is described in RTL<br /></li><li class="c2 c13 li-bullet-0">Functional modes are easier to reason about during design<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.sz81flpjye9q">Summary</h3>
<ul class="c5 lst-kix_rmxr6nhrtrec-0 start"><li class="c2 c13 li-bullet-0">Modal analysis is essential for accurate timing closure<br /></li><li class="c2 c13 li-bullet-0">Different modes impose different timing requirements<br /></li><li class="c2 c13 li-bullet-0">Over-constraining paths leads to:<br /></li></ul>
<ul class="c5 lst-kix_rmxr6nhrtrec-1 start"><li class="c2 c12 li-bullet-0">Larger area<br /></li><li class="c2 c12 li-bullet-0">Higher power<br /></li><li class="c2 c12 li-bullet-0">Longer closure time<br /></li></ul>
<ul class="c5 lst-kix_rmxr6nhrtrec-0"><li class="c2 c13 li-bullet-0">Mode-based analysis ensures:<br /></li></ul>
<ul class="c5 lst-kix_rmxr6nhrtrec-1 start"><li class="c2 c12 li-bullet-0">Correct constraints<br /></li><li class="c2 c12 li-bullet-0">Realistic timing checks<br /></li><li class="c2 c12 li-bullet-0">Better QoR<br /></li></ul>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_848_setting_mode_in_sdc_using_set_case_analy`,title:`Setting Mode in SDC (Using set_case_analysis)`,html:`<h3 class="c15" id="h.5t8xfz7wlkkp">Introduction</h3>
<p class="c2">When an SDC file represents a single mode, certain signals in the design take fixed values that uniquely define that mode of operation.<br /> To model this behavior during timing analysis, we use the set_case_analysis command.</p>
<p class="c2">This command allows us to force specific pins or ports to constant values, thereby enabling or disabling certain timing paths based on the selected mode.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.9nz85jmud8mm">set_case_analysis Command</h3>
<h4 class="c33" id="h.by00roktlil8">Syntax</h4>
<p class="c24">set_case_analysis value port_pin_list</p>
<p class="c10"></p>
<p class="c2">Where:</p>
<ul class="c5 lst-kix_f0jwdk85crvu-0 start"><li class="c2 c13 li-bullet-0">value can be:<br /></li></ul>
<ul class="c5 lst-kix_f0jwdk85crvu-1 start"><li class="c2 c12 li-bullet-0">0<br /></li><li class="c2 c12 li-bullet-0">1<br /></li><li class="c2 c12 li-bullet-0">rising<br /></li><li class="c2 c12 li-bullet-0">falling<br /></li></ul>
<ul class="c5 lst-kix_f0jwdk85crvu-0"><li class="c2 c13 li-bullet-0">port_pin_list specifies the ports or pins to be constrained<br /></li></ul>
<h4 class="c33" id="h.q8z4q42w92gq">Purpose</h4>
<p class="c2">This command tells the timing tool:</p>
<p class="c2 c32">“For the current analysis, assume this object is always at the specified value or transition.”<br /><br /><br /><img alt="" src="/assets/modules/module13/image11.png" title="" class="native-img"></p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.nei2c2diku2e">Mode Definition Using set_case_analysis</h3>
<ul class="c5 lst-kix_qhenqp9aj9k7-0 start"><li class="c2 c13 li-bullet-0">In some designs, a single set_case_analysis command may be enough to put the device into a specific mode.<br /></li><li class="c2 c13 li-bullet-0">In more complex designs, multiple set_case_analysis commands may be required to fully define a mode.<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.v37f1pp0hiv2">Functional Mode Analysis Example</h3>
<p class="c2">Assume the circuit shown is the same as Figure 2.</p>
<h4 class="c33" id="h.hg2zjui9se40">Clock Definition</h4>
<p class="c2">For functional mode, the clock is defined as:</p>
<p class="c24">create_clock -name SysClk -period 10 [get_ports CLK]</p>
<p class="c10"></p>
<h4 class="c33" id="h.592ljc1t3de9">Case Analysis</h4>
<p class="c24">set_case_analysis 0 [get_ports SE]</p>
<p class="c10"></p>
<h4 class="c33" id="h.p68fymotsl69">Explanation</h4>
<ul class="c5 lst-kix_9wo74tixcfn1-0 start"><li class="c2 c13 li-bullet-0">The flop model specifies:<br /></li></ul>
<ul class="c5 lst-kix_9wo74tixcfn1-1 start"><li class="c2 c12 li-bullet-0">When SE = 0, only the D pin is sampled<br /></li><li class="c2 c12 li-bullet-0">The SI pin is inactive<br /></li></ul>
<ul class="c5 lst-kix_9wo74tixcfn1-0"><li class="c2 c13 li-bullet-0">Therefore:<br /></li></ul>
<ul class="c5 lst-kix_9wo74tixcfn1-1 start"><li class="c2 c12 li-bullet-0">Paths reaching SI are not analyzed<br /></li><li class="c2 c12 li-bullet-0">Paths reaching D are analyzed<br /></li></ul>
<p class="c2">As a result:</p>
<ul class="c5 lst-kix_ga1hv3ypnsvc-0 start"><li class="c2 c13 li-bullet-0">Path F1 → F2 is not analyzed, since it reaches the SI pin of F2<br /></li><li class="c2 c13 li-bullet-0">Functional paths are timed correctly under 10 ns clock<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.imjhr9yj65ez">Scan Mode Analysis Example</h3>
<p class="c2">For scan mode, the constraints change.</p>
<h4 class="c33" id="h.6tnml88a30su">Clock Definition</h4>
<p class="c24">create_clock -name TstClk -period 40 [get_ports CLK]</p>
<p class="c10"></p>
<h4 class="c33" id="h.pj5q01e4fftm">Case Analysis</h4>
<p class="c24">set_case_analysis 1 [get_ports SE]</p>
<p class="c10"></p>
<h4 class="c33" id="h.m1hjbkck8uc">Explanation</h4>
<ul class="c5 lst-kix_93mza441ner-0 start"><li class="c2 c13 li-bullet-0">When SE = 1, the flop model allows:<br /></li></ul>
<ul class="c5 lst-kix_93mza441ner-1 start"><li class="c2 c12 li-bullet-0">Sampling through the SI pin<br /></li><li class="c2 c12 li-bullet-0">The D pin is ignored<br /></li></ul>
<ul class="c5 lst-kix_93mza441ner-0"><li class="c2 c13 li-bullet-0">Therefore:<br /></li></ul>
<ul class="c5 lst-kix_93mza441ner-1 start"><li class="c2 c12 li-bullet-0">Paths to SI are analyzed<br /></li><li class="c2 c12 li-bullet-0">Paths to D are not analyzed<br /></li></ul>
<p class="c2">As a result:</p>
<ul class="c5 lst-kix_5q1u98sdx1wf-0 start"><li class="c2 c13 li-bullet-0">Path F1 → F2 is analyzed<br /></li><li class="c2 c13 li-bullet-0">Path F2 → F3 through the SI pin is also analyzed<br /></li><li class="c2 c13 li-bullet-0">Scan paths are checked using the 40 ns TestClock<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.mwk4vdd4sg3x">Mode Selection Using Configuration Registers</h3>
<p class="c2">Consider a block with multiple operating modes, controlled by an 8-bit configuration register.</p>
<p class="c2">To force a specific mode, all relevant register bits must be set correctly.</p>
<h4 class="c33" id="h.gdnh7iia6v3e">Example Constraints</h4>
<p class="c24">set_case_analysis 0 [get_pins config_reg[0]/Q]</p>
<p class="c24">set_case_analysis 1 [get_pins config_reg[1]/Q]</p>
<p class="c24">set_case_analysis 1 [get_pins config_reg[2]/Q]</p>
<p class="c24">set_case_analysis 0 [get_pins config_reg[3]/Q]</p>
<p class="c24">set_case_analysis 1 [get_pins config_reg[4]/Q]</p>
<p class="c24">set_case_analysis 0 [get_pins config_reg[5]/Q]</p>
<p class="c24">set_case_analysis 1 [get_pins config_reg[6]/Q]</p>
<p class="c24">set_case_analysis 0 [get_pins config_reg[7]/Q]</p>
<p class="c10"></p>
<p class="c2">This combination of values uniquely places the device into the desired mode of operation.<br /><br /><img alt="" src="/assets/modules/module13/image4.png" title="" class="native-img"></p>
<h3 class="c15" id="h.bcxtdjjboe8q">Steps to Decide set_case_analysis Values</h3>
<ol class="c5 lst-kix_zfcmgc2uns7-0 start" start="1"><li class="c2 c13 li-bullet-0">Decide which mode you want to analyze<br /></li><li class="c2 c13 li-bullet-0">Identify the control pins or configuration registers affecting that mode<br /></li><li class="c2 c13 li-bullet-0">Apply values to those pins/register outputs that activate the selected mode<br /></li></ol>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.al152sfllywv">Where set_case_analysis Is Typically Applied</h3>
<ul class="c5 lst-kix_vmm1l6qmejhk-0 start"><li class="c2 c13 li-bullet-0">Usually applied on:<br /></li></ul>
<ul class="c5 lst-kix_vmm1l6qmejhk-1 start"><li class="c2 c12 li-bullet-0">Top-level ports<br /></li><li class="c2 c12 li-bullet-0">Register output pins (Q pins)<br /></li></ul>
<ul class="c5 lst-kix_vmm1l6qmejhk-0"><li class="c2 c13 li-bullet-0">Although the syntax allows application on any pin, best practice is:<br /></li></ul>
<ul class="c5 lst-kix_vmm1l6qmejhk-1 start"><li class="c2 c12 li-bullet-0">Use it on ports and configuration registers only<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.xs9orlwmxve3">Effect of set_case_analysis on Timing Analysis</h3>
<p class="c2">set_case_analysis prevents certain paths from participating in timing analysis in multiple ways:</p>
<ol class="c5 lst-kix_ojcdhq3zrxg5-0 start" start="1"><li class="c2 c13 li-bullet-0">Constant pins do not generate transitions<br /></li><li class="c2 c13 li-bullet-0">Constant values propagate through the logic<br /></li><li class="c2 c13 li-bullet-0">Propagated constants disable dependent logic paths<br /></li><li class="c2 c13 li-bullet-0">Inactive paths are removed from timing consideration<br /></li></ol>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.7m8i775ano6c">Path Disabling Example (Conceptual)</h3>
<p class="c2">Assume the following constraint:</p>
<p class="c24">set_case_analysis 0 [get_ports P1]</p>
<p class="c10"></p>
<h4 class="c33" id="h.ws0mgf4phy1v">Effects:</h4>
<ul class="c5 lst-kix_90bjij20t4uu-0 start"><li class="c2 c13 li-bullet-0">Pin I1/A is held at constant 0<br /></li></ul>
<ul class="c5 lst-kix_90bjij20t4uu-1 start"><li class="c2 c12 li-bullet-0">No transitions originate from this pin<br /></li></ul>
<ul class="c5 lst-kix_90bjij20t4uu-0"><li class="c2 c13 li-bullet-0">Any transition on I1/B will not reach the output of gate I1<br /></li><li class="c2 c13 li-bullet-0">The constant 0 propagates to:<br /></li></ul>
<ul class="c5 lst-kix_90bjij20t4uu-1 start"><li class="c2 c12 li-bullet-0">Output of the AND gate<br /></li><li class="c2 c12 li-bullet-0">Select (Sel) pin of the MUX<br /></li></ul>
<p class="c2">Because:</p>
<ul class="c5 lst-kix_2bd1abs93ew6-0 start"><li class="c2 c13 li-bullet-0">MUX Sel = 0<br /></li></ul>
<ul class="c5 lst-kix_2bd1abs93ew6-1 start"><li class="c2 c12 li-bullet-0">Paths through D1 are disabled<br /></li><li class="c2 c12 li-bullet-0">Only paths through D0 → output are timed<br /></li></ul>
<p class="c2">Thus:</p>
<ul class="c5 lst-kix_isf6ufb0j1w5-0 start"><li class="c2 c13 li-bullet-0">Paths involving I1/A, I1/B, and MUX D1 are excluded<br /></li><li class="c2 c13 li-bullet-0">Only valid functional paths are analyzed<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.xcksk46w6rgx">Summary</h3>
<ul class="c5 lst-kix_am0lq752n8lu-0 start"><li class="c2 c13 li-bullet-0">set_case_analysis is essential for mode-based timing analysis<br /></li><li class="c2 c13 li-bullet-0">It allows:<br /></li></ul>
<ul class="c5 lst-kix_am0lq752n8lu-1 start"><li class="c2 c12 li-bullet-0">Accurate modeling of functional and test modes<br /></li><li class="c2 c12 li-bullet-0">Elimination of over-constrained paths<br /></li></ul>
<ul class="c5 lst-kix_am0lq752n8lu-0"><li class="c2 c13 li-bullet-0">Proper mode setting:<br /></li></ul>
<ul class="c5 lst-kix_am0lq752n8lu-1 start"><li class="c2 c12 li-bullet-0">Improves QoR<br /></li><li class="c2 c12 li-bullet-0">Reduces timing noise<br /></li><li class="c2 c12 li-bullet-0">Speeds up timing closure<br /></li></ul>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_965_corners_in_static_timing_analysis_sta_`,title:`Corners in Static Timing Analysis (STA)`,html:`<h3 class="c15" id="h.9vqf2euydeb4">Introduction</h3>
<p class="c2">A modern chip does not operate in a single condition.<br /> Instead, it supports multiple operational modes and must function correctly across various environmental and manufacturing variations.<br /> To ensure correctness, Static Timing Analysis (STA) must be performed across all such conditions.</p>
<p class="c2">These conditions are represented using modes and corners.</p>
<hr>
<p class="c10"></p>`},{id:`ch_971_operational_modes`,title:`Operational Modes`,html:`<p class="c2">A chip can operate in several modes, such as:</p>
<ul class="c5 lst-kix_ny777p821foa-0 start"><li class="c2 c13 li-bullet-0">Functional mode with fast clock<br /> (Example: high-end graphics or performance mode)<br /></li><li class="c2 c13 li-bullet-0">Functional mode with slow clock<br /> (Normal or power-optimized operation)<br /></li><li class="c2 c13 li-bullet-0">Test mode<br /></li><li class="c2 c13 li-bullet-0">Sleep mode for power saving<br /></li><li class="c2 c13 li-bullet-0">Debug mode for diagnostics (in some designs)<br /></li></ul>
<p class="c2">Each mode has different clock definitions, constraints, and timing requirements.</p>
<hr>
<p class="c10"></p>`},{id:`ch_977_pvt_corners`,title:`PVT Corners`,html:`<p class="c2">In addition to modes, STA must also consider PVT (Process, Voltage, Temperature) variations.</p>
<h3 class="c15" id="h.385cxddnkww">Common PVT Corners</h3>
<ol class="c5 lst-kix_7s0cc4eudfil-0 start" start="1"><li class="c2 c13 li-bullet-0">Worst Case (WC)<br /></li></ol>
<ul class="c5 lst-kix_7s0cc4eudfil-1 start"><li class="c2 c12 li-bullet-0">Slow process<br /></li><li class="c2 c12 li-bullet-0">Low voltage<br /></li><li class="c2 c12 li-bullet-0">High temperature<br /> → Maximum delay, worst timing condition<br /></li></ul>
<ol class="c5 lst-kix_7s0cc4eudfil-0" start="2"><li class="c2 c13 li-bullet-0">Best Case (BC)<br /></li></ol>
<ul class="c5 lst-kix_7s0cc4eudfil-1 start"><li class="c2 c12 li-bullet-0">Fast process<br /></li><li class="c2 c12 li-bullet-0">High voltage<br /></li><li class="c2 c12 li-bullet-0">Low temperature<br /> → Minimum delay, hold-critical condition<br /></li></ul>
<ol class="c5 lst-kix_7s0cc4eudfil-0" start="3"><li class="c2 c13 li-bullet-0">Typical Case (TC)<br /></li></ol>
<ul class="c5 lst-kix_7s0cc4eudfil-1 start"><li class="c2 c12 li-bullet-0">Typical process<br /></li><li class="c2 c12 li-bullet-0">Nominal voltage<br /></li><li class="c2 c12 li-bullet-0">Nominal temperature<br /> → Average operating condition<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_988_explosion_of_analysis_scenarios`,title:`Explosion of Analysis Scenarios`,html:`<p class="c2">Consider:</p>
<ul class="c5 lst-kix_rrapsfwwsz6h-0 start"><li class="c2 c13 li-bullet-0">6 operational modes<br /></li><li class="c2 c13 li-bullet-0">3 PVT corners<br /></li></ul>
<p class="c2">Total STA scenarios:</p>
<p class="c24">6 modes × 3 corners = 18 scenarios</p>
<p class="c10"></p>
<p class="c2">When Signal Integrity (SI) is also considered:</p>
<ul class="c5 lst-kix_al7dlio4z8ey-0 start"><li class="c2 c13 li-bullet-0">Different interconnect parasitic corners must be analyzed<br /></li><li class="c2 c13 li-bullet-0">This adds another dimension to the analysis<br /></li></ul>
<p class="c2"> As a result:</p>
<ul class="c5 lst-kix_e2q7cbek64e0-0 start"><li class="c2 c13 li-bullet-0">Timing closure becomes extremely complex<br /></li><li class="c2 c13 li-bullet-0">Iterations become painful and time-consuming<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_1000_multimode_multicorner_mmmc_analysis`,title:`Multimode–Multicorner (MMMC) Analysis`,html:`<p class="c2">This type of analysis is called:</p>
<h3 class="c15" id="h.yy6l1yxb2vt6">MMMC (Multi-Mode Multi-Corner) Analysis</h3>
<p class="c2">In MMMC:</p>
<ul class="c5 lst-kix_dlspg58iqirb-0 start"><li class="c2 c13 li-bullet-0">STA and implementation tools consume constraints for all modes and corners<br /></li><li class="c2 c13 li-bullet-0">A unified optimization is performed to satisfy all scenarios simultaneously<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_1007_challenges_with_mmmc`,title:`Challenges with MMMC`,html:`<p class="c2">Although MMMC is powerful, it has limitations:</p>
<ol class="c5 lst-kix_qsr4ok36753j-0 start" start="1"><li class="c2 c13 li-bullet-0">Very high runtime<br /></li><li class="c2 c13 li-bullet-0">Tools may not converge in reasonable time<br /></li><li class="c2 c13 li-bullet-0">Most tools do not report envelope constraints<br /></li></ol>
<ul class="c5 lst-kix_qsr4ok36753j-1 start"><li class="c2 c12 li-bullet-0">Designers cannot verify whether all modes/corners were truly covered<br /></li></ul>
<ol class="c5 lst-kix_qsr4ok36753j-0" start="4"><li class="c2 c13 li-bullet-0">Debugging becomes difficult<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1014_mode_merge_technique`,title:`Mode Merge Technique`,html:`<p class="c2">To overcome MMMC complexity, designers often use Mode Merge.</p>
<h3 class="c15" id="h.pi0ytwh2q04">What is Mode Merge?</h3>
<ul class="c5 lst-kix_9q7kvx24i3mi-0 start"><li class="c2 c13 li-bullet-0">Constraints of multiple operational modes are combined into a single constraint set<br /></li><li class="c2 c13 li-bullet-0">The resulting constraint represents a hypothetical super-mode<br /></li><li class="c2 c13 li-bullet-0">This mode models the union of all modes<br /></li></ul>
<h3 class="c15" id="h.9lgd0vyqd22r">Benefits of Mode Merge</h3>
<ul class="c5 lst-kix_kgihtvlc5ot5-0 start"><li class="c2 c13 li-bullet-0">Faster timing closure<br /></li><li class="c2 c13 li-bullet-0">Fewer implementation iterations<br /></li><li class="c2 c13 li-bullet-0">Pessimistic but safe timing model<br /></li><li class="c2 c13 li-bullet-0">Saves design and runtime cycles<br /></li></ul>
<p class="c2">Instead of meeting timing for each mode independently,<br /> meeting timing for the merged mode ensures correctness for all modes.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1023_operating_conditions`,title:`Operating Conditions`,html:`<p class="c2">Between process, voltage, and temperature, there can be many combinations.</p>
<h3 class="c15" id="h.cj44fiaf1nt0">How Operating Conditions Are Defined</h3>
<ul class="c5 lst-kix_i48iqz83np9h-0 start"><li class="c2 c13 li-bullet-0">SDC itself does not provide commands to define:<br /></li></ul>
<ul class="c5 lst-kix_i48iqz83np9h-1 start"><li class="c2 c12 li-bullet-0">Voltage<br /></li><li class="c2 c12 li-bullet-0">Temperature<br /></li><li class="c2 c12 li-bullet-0">Process<br /></li></ul>
<ul class="c5 lst-kix_i48iqz83np9h-0"><li class="c2 c13 li-bullet-0">These are specified using tool-specific commands<br /></li></ul>
<p class="c2">A common approach is to define Operating Conditions, where:</p>
<ul class="c5 lst-kix_zhae8yz5wve8-0 start"><li class="c2 c13 li-bullet-0">Each operating condition represents a specific PVT combination<br /></li><li class="c2 c13 li-bullet-0">Libraries reference these conditions<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_1033_operating_condition_naming_convention`,title:`Operating Condition Naming Convention`,html:`<p class="c2">A commonly used naming format is:</p>
<p class="c24">&lt;speed&gt;_&lt;application&gt;</p>
<p class="c10"></p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.p69e7cgg0xan">Speed Categories</h3>
<ol class="c5 lst-kix_a8atjic84jxh-0 start" start="1"><li class="c2 c13 li-bullet-0">Best Case<br /></li></ol>
<ul class="c5 lst-kix_a8atjic84jxh-1 start"><li class="c2 c12 li-bullet-0">Fast transistors<br /></li><li class="c2 c12 li-bullet-0">Low temperature<br /></li><li class="c2 c12 li-bullet-0">High voltage<br /></li></ul>
<ol class="c5 lst-kix_a8atjic84jxh-0" start="2"><li class="c2 c13 li-bullet-0">Typical Case<br /></li></ol>
<ul class="c5 lst-kix_a8atjic84jxh-1 start"><li class="c2 c12 li-bullet-0">Average operating conditions<br /></li></ul>
<ol class="c5 lst-kix_a8atjic84jxh-0" start="3"><li class="c2 c13 li-bullet-0">Worst Case<br /></li></ol>
<ul class="c5 lst-kix_a8atjic84jxh-1 start"><li class="c2 c12 li-bullet-0">Slow transistors<br /></li><li class="c2 c12 li-bullet-0">High temperature<br /></li><li class="c2 c12 li-bullet-0">Low voltage<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.sagui8bzevko">Application Categories</h3>
<ol class="c5 lst-kix_jkjdp0vha3p4-0 start" start="1"><li class="c2 c13 li-bullet-0">Commercial<br /></li></ol>
<ul class="c5 lst-kix_jkjdp0vha3p4-1 start"><li class="c2 c12 li-bullet-0">Very low voltage swing<br /></li><li class="c2 c12 li-bullet-0">Normal consumer environment<br /></li></ul>
<ol class="c5 lst-kix_jkjdp0vha3p4-0" start="2"><li class="c2 c13 li-bullet-0">Industrial<br /></li></ol>
<ul class="c5 lst-kix_jkjdp0vha3p4-1 start"><li class="c2 c12 li-bullet-0">Slightly higher voltage and temperature range<br /></li></ul>
<ol class="c5 lst-kix_jkjdp0vha3p4-0" start="3"><li class="c2 c13 li-bullet-0">Military<br /></li></ol>
<ul class="c5 lst-kix_jkjdp0vha3p4-1 start"><li class="c2 c12 li-bullet-0">Extremely wide voltage and temperature range<br /></li><li class="c2 c12 li-bullet-0">Harsh operating conditions<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_1057_summary`,title:`Summary`,html:`<ul class="c5 lst-kix_kcn8rr3gywrj-0 start"><li class="c2 c13 li-bullet-0">Modern STA must consider:<br /></li></ul>
<ul class="c5 lst-kix_kcn8rr3gywrj-1 start"><li class="c2 c12 li-bullet-0">Multiple modes<br /></li><li class="c2 c12 li-bullet-0">Multiple PVT corners<br /></li></ul>
<ul class="c5 lst-kix_kcn8rr3gywrj-0"><li class="c2 c13 li-bullet-0">MMMC analysis handles this complexity but is runtime intensive<br /></li><li class="c2 c13 li-bullet-0">Mode merge is a practical technique to simplify closure<br /></li><li class="c2 c13 li-bullet-0">Operating conditions abstract PVT combinations using library definitions<br /></li></ul>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<h3 class="c15" id="h.b55i0zmjrzsc">Example: Multi-Mode Multi-Corner (MMMC) Analysis</h3>
<p class="c2">Multi-Mode Multi-Corner (MMMC) analysis refers to performing Static Timing Analysis (STA) across multiple operating modes, PVT corners, and parasitic interconnect corners simultaneously.</p>
<h4 class="c33" id="h.spq8vcr9pern">Design Scenario</h4>
<p class="c2">Consider a Design Under Analysis (DUA) with the following characteristics:</p>
<p class="c2">Operating Modes (4):</p>
<ul class="c5 lst-kix_hezqexr32lhx-0 start"><li class="c2 c13 li-bullet-0">Normal<br /></li><li class="c2 c13 li-bullet-0">Sleep<br /></li><li class="c2 c13 li-bullet-0">Scan Shift<br /></li><li class="c2 c13 li-bullet-0">JTAG<br /></li></ul>
<p class="c2">PVT Corners (3):</p>
<ul class="c5 lst-kix_q531k053egpy-0 start"><li class="c2 c13 li-bullet-0">WCS (Worst Case Slow)<br /></li><li class="c2 c13 li-bullet-0">BCF (Best Case Fast)<br /></li><li class="c2 c13 li-bullet-0">WCL (Worst Case Low voltage)<br /></li></ul>
<p class="c2">Parasitic Interconnect Corners (3):</p>
<ul class="c5 lst-kix_7gh16ya2baej-0 start"><li class="c2 c13 li-bullet-0">Typical<br /></li><li class="c2 c13 li-bullet-0">Min C<br /></li><li class="c2 c13 li-bullet-0">Min RC<br /></li></ul>
<p class="c2">By combining these dimensions, the design potentially needs to be analyzed across:</p>
<p class="c2">4 modes × 3 PVT corners × 3 parasitic corners = 36 scenarios</p>
<p class="c2">Each scenario represents a unique condition under which timing checks such as setup, hold, slew, and clock-gating checks must be verified.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.e4e89yejnwkr">Scenario Reduction Strategy</h3>
<p class="c2">Running STA for all 36 scenarios simultaneously can be prohibitively expensive in terms of runtime, especially for large designs. In practice:</p>
<ul class="c5 lst-kix_yqeescfrmk7x-0 start"><li class="c2 c13 li-bullet-0">Some scenarios may be redundant, as they are already covered within other scenarios.<br /></li><li class="c2 c13 li-bullet-0">Certain scenarios may be irrelevant for specific design requirements.<br /></li></ul>
<p class="c2">For example:</p>
<ul class="c5 lst-kix_mdz82babmygo-0 start"><li class="c2 c13 li-bullet-0">Scenarios 4, 6, 7, and 9 may be deemed unnecessary and skipped.<br /></li><li class="c2 c13 li-bullet-0">Test modes such as Scan Shift or JTAG may not be required in some corners (for example, scenario 5).<br /></li><li class="c2 c13 li-bullet-0">Only Normal and Sleep modes might be analyzed in specific corners where test modes are not timing-critical.<br /></li></ul>
<p class="c2">STA can therefore be performed:</p>
<ul class="c5 lst-kix_8q1fpyuwti9g-0 start"><li class="c2 c13 li-bullet-0">On a single selected scenario, or<br /></li><li class="c2 c13 li-bullet-0">On multiple scenarios concurrently, if the tool supports MMMC capability.<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.drwrpx7eu4oi">Role of MMMC in Physical Design</h3>
<p class="c2">During the physical design flow, the MMMC file plays a critical role by defining:</p>
<ul class="c5 lst-kix_9w7qkd2gl6l9-0 start"><li class="c2 c13 li-bullet-0">All required operating modes<br /></li><li class="c2 c13 li-bullet-0">Relevant PVT corners<br /></li><li class="c2 c13 li-bullet-0">Parasitic conditions<br /></li></ul>
<p class="c2">This allows the design to be analyzed and optimized under realistic and worst-case conditions.</p>
<p class="c2">VLSI designs can operate in multiple modes (functional, test, low-power, etc.), and each mode may behave differently across process, voltage, and temperature variations. Therefore, it is essential to ensure that the design remains stable and timing-clean across all relevant PVT corners.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.7i94ne14sg80">Tool Perspective</h3>
<p class="c2">Physical design tools such as Cadence Innovus and Synopsys ICC2 use the MMMC file as a central input to:</p>
<ul class="c5 lst-kix_miebq7rkhpc-0 start"><li class="c2 c13 li-bullet-0">Capture all analysis scenarios<br /></li><li class="c2 c13 li-bullet-0">Drive timing, power, and signal integrity optimization<br /></li><li class="c2 c13 li-bullet-0">Ensure signoff-quality results<br /></li></ul>
<p class="c2">In summary, MMMC enables a robust, scalable, and realistic analysis framework, ensuring that the final silicon functions correctly across all intended operating conditions.</p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_1101_scenarios_in_mmmc`,title:`Scenarios in MMMC`,html:`<h3 class="c15" id="h.rcc5mmlyc8c7">What is a Scenario?</h3>
<p class="c2">A scenario is a specific combination of:</p>
<ul class="c5 lst-kix_atc1ker5ee8d-0 start"><li class="c2 c13 li-bullet-0">Operating mode (functional, scan, etc.)<br /></li><li class="c2 c13 li-bullet-0">Timing corner, which includes:<br /></li></ul>
<ul class="c5 lst-kix_atc1ker5ee8d-1 start"><li class="c2 c12 li-bullet-0">PVT corner (Process, Voltage, Temperature)<br /></li><li class="c2 c12 li-bullet-0">RC corner (parasitic interconnect conditions)<br /></li></ul>
<p class="c2">Scenarios are created to model the worst-case and best-case conditions for setup and hold timing analysis. Each scenario is typically given a meaningful name so it can be easily referenced during analysis and optimization.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1109_scenario_support_in_pnr_tools`,title:`Scenario Support in PnR Tools`,html:`<p class="c2">Modern Place and Route (PnR) tools support concurrent multi-mode multi-corner (MMMC) analysis and optimization.</p>
<p class="c2">In Synopsys IC Compiler / ICC2, scenarios are explicitly created to describe:</p>
<ul class="c5 lst-kix_qh5pyyyiqnto-0 start"><li class="c2 c13 li-bullet-0">The mode of operation (via constraints)<br /></li><li class="c2 c13 li-bullet-0">The timing corner (via libraries and operating conditions)<br /></li><li class="c2 c13 li-bullet-0">The RC parasitic environment (via TLUPlus files)<br /></li><li class="c2 c13 li-bullet-0">Optional derating factors<br /></li></ul>
<p class="c2">Each scenario fully defines how the design should be analyzed under a specific operating condition.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1116_scenario_creation_flow_in_icc2`,title:`Scenario Creation Flow in ICC2`,html:`<h3 class="c15" id="h.957qnfyknr0">1. Mode Definition</h3>
<p class="c2">Modes define how the design operates (functional, scan, etc.).</p>
<p class="c24">create_mode &lt;func | scan&gt;</p>
<p class="c10"></p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.2j3e44tag02k">2. Corner Definition</h3>
<h4 class="c33" id="h.7sikktgyktj3">PVT Corner Creation</h4>
<p class="c2">PVT corners define process, voltage, and temperature conditions.</p>
<p class="c24">create_corner &lt;corner_name&gt;</p>
<p class="c24">set_process &lt;value&gt;</p>
<p class="c24">set_voltage &lt;value&gt;</p>
<p class="c24">set_temperature &lt;value&gt;</p>
<p class="c10"></p>
<p class="c2 c32">Based on these values, the tool automatically selects the appropriate operating<br /> conditions from the .lib files.</p>
<hr>
<p class="c10"></p>
<h4 class="c33" id="h.jpg6u0kuh5sd">RC Corner Definition (Parasitics)</h4>
<p class="c2">RC corners model interconnect resistance and capacitance and are specified using<br /> TLUPlus files.</p>
<p class="c24">read_parasitic_tech -name &lt;rc_corner_name&gt; &lt;path_to_TLUPlus_files&gt;</p>
<p class="c10"></p>
<hr>
<p class="c10"></p>
<h4 class="c33" id="h.fff50jrptaz5">Merging PVT and RC Corners</h4>
<p class="c2">To create a complete timing corner, the PVT corner is merged with the RC corner.</p>
<p class="c24">set_parasitic_tech -corner &lt;pvt_corner_name&gt; -rc_corner &lt;rc_corner_name&gt;</p>
<p class="c10"></p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.fhwwibxm6enp">3. Scenario Creation (Mode + Corner)</h3>
<p class="c2">Once modes and corners are defined, they are combined to create a scenario.</p>
<p class="c24">create_scenario -mode &lt;func | scan&gt; -corner &lt;corner_name&gt;</p>
<p class="c10"></p>
<p class="c2 c32">Typically, separate scenarios are created for setup and hold analysis.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1153_scenario_status_control_setup_vs_hold_`,title:`Scenario Status Control (Setup vs Hold)`,html:`<p class="c2">By default, the tool checks both setup and hold timing for all scenarios.<br /> To reduce runtime, timing checks can be selectively enabled or disabled per scenario.</p>
<h3 class="c15" id="h.j5ew1ud0szvr">Enable Only Setup Check</h3>
<p class="c24">set_scenario_status -setup true -hold false [get_scenarios &lt;setup_scenario_name&gt;]</p>
<p class="c10"></p>
<h3 class="c15" id="h.ah91hk5kqwni">Enable Only Hold Check</h3>
<p class="c24">set_scenario_status -setup false -hold true [get_scenarios &lt;hold_scenario_name&gt;]</p>
<p class="c10"></p>
<p class="c2">This selective control allows designers to focus on critical timing paths while improving overall runtime efficiency.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1164_summary`,title:`Summary`,html:`<ul class="c5 lst-kix_k4w1e2drioy7-0 start"><li class="c2 c13 li-bullet-0">A scenario = Mode + PVT corner + RC corner<br /></li><li class="c2 c13 li-bullet-0">Scenarios enable accurate modeling of real silicon behavior<br /></li><li class="c2 c13 li-bullet-0">ICC2 supports concurrent MMMC optimization<br /></li><li class="c2 c13 li-bullet-0">Setup and hold checks can be controlled per scenario to manage runtime<br /></li><li class="c2 c13 li-bullet-0">Proper scenario definition is essential for robust timing closure and signoff</li></ul>
<p class="c2 c23 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c2 c25"></p>`},{id:`ch_1178_ic_compiler_ii_lecture_notes_clean_forma`,title:`IC Compiler II – Lecture Notes (Clean Format)`,html:``},{id:`ch_1179_1_introduction_to_ic_compiler_ii`,title:`1. Introduction to IC Compiler II`,html:`<p class="c2">IC Compiler II (ICC II) is a complete netlist-to-GDSII implementation system designed for modern, large-scale integrated circuit (IC) designs. It provides a comprehensive solution covering the entire physical design flow, including early design exploration and prototyping, detailed design planning, block implementation, chip assembly, and sign-off driven design closure.</p>
<p class="c2">The foundation, architecture, and implementation of IC Compiler II are based on novel, patented technologies. The software has been developed using modern object-oriented programming languages and tools, ensuring flexibility, scalability, and efficiency in handling complex designs.</p>
<p class="c2">IC Compiler II is marketed alongside the original IC Compiler and is intended to provide designers of complex ICs, across all process nodes, with up to a ten-fold improvement in design throughput. This significant enhancement in productivity is not achieved through a single feature; rather, it results from a combination of multiple advanced technologies and architectural innovations.</p>
<p class="c2">Traditional physical design tools typically achieve only incremental improvements by refining existing architectures. In contrast, IC Compiler II introduces a fundamentally new approach based on:</p>
<ul class="c5 lst-kix_dv6uqdwtyss0-0 start"><li class="c2 c13 li-bullet-0">A new hierarchical infrastructure enabling massive parallelism<br /></li><li class="c2 c13 li-bullet-0">A highly compact multi-corner and multi-mode (MCMM) architecture<br /></li><li class="c2 c13 li-bullet-0">Next-generation design planning capabilities<br /></li><li class="c2 c13 li-bullet-0">New global, analytical, and scalable optimization techniques<br /></li><li class="c2 c13 li-bullet-0">Advanced global optimization approaches to clock synthesis<br /></li></ul>
<p class="c2">Additionally, IC Compiler II seamlessly integrates into existing design flows by supporting industry-standard interfaces and file formats.</p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1188_2_ic_compiler_ii_infrastructure_and_data`,title:`2. IC Compiler II Infrastructure and Data Model`,html:`<p class="c2">IC Compiler II’s infrastructure is specifically designed to handle increasingly large and complex designs. It utilizes a highly scalable data model that provides high capacity, efficient engine performance, and extensive parallel processing capabilities.<br /><br /><img alt="" src="/assets/modules/module13/image30.png" title="" class="native-img"></p>
<h3 class="c15" id="h.yava161cjaqp">Main Characteristics of IC Compiler II Infrastructure</h3>
<ol class="c5 lst-kix_7czig7ovsxuc-0 start" start="1"><li class="c2 c13 li-bullet-0">Object orientation<br /> Enables flexibility in adding new objects to the system and provides instant access to all objects and their attributes.<br /></li><li class="c2 c13 li-bullet-0">Linearly scalable data access and modification<br /> Supports complete parallelism for all engines and ensures efficient data handling even for very large designs.<br /></li><li class="c2 c13 li-bullet-0">Native modeling of multi-level physical hierarchy<br /> Supports multiply-instantiated blocks and enables efficient and transparent hierarchical implementation of very large designs.<br /></li><li class="c2 c13 li-bullet-0">Native modeling of high-level objects<br /> Supports voltage areas, power domains, and route corridors, allowing optimization within and across these objects.<br /></li><li class="c2 c13 li-bullet-0">Modeling of design state<br /> Enables compact snapshot creation of both design data and state, allowing fast, reliable, and lossless transfer between designers.<br /></li><li class="c2 c13 li-bullet-0">Change manager<br /> Monitors all changes in design data and provides robust and efficient notification for incremental analysis.<br /></li><li class="c2 c13 li-bullet-0">Flexible architecture for advanced technology rules<br /> Supports the growing number of complex fabrication rules in advanced technology nodes.<br /></li><li class="c2 c13 li-bullet-0">Compact modeling of modes and corners (MCMM)<br /> Enables efficient analysis and optimization across multiple modes and corners and supports a much larger set of mode/corner combinations throughout the design flow.</li></ol>
<p class="c2 c23"><br /><img alt="" src="/assets/modules/module13/image16.png" title="" class="native-img"></p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1195_3_simplified_view_of_the_tool_architectu`,title:`3. Simplified View of the Tool Architecture`,html:`<p class="c2">IC Compiler II includes a powerful library manager, which generates a common reference library integrating physical, logical, and timing data into a compact, high-performance database.</p>
<h3 class="c15" id="h.23b0qtvo5k97">Key Library Concepts</h3>
<ol class="c5 lst-kix_t0khclxrdmao-0 start" start="1"><li class="c2 c13 li-bullet-0">Aggregate libraries<br /> These combine multiple reference libraries into a single organized structure and present them to the tool in a well-defined search order.<br /></li><li class="c2 c13 li-bullet-0">Sparse/shared design and reference libraries<br /> These are managed similarly to distributed software development systems and enable collaborative design among large teams of designers.<br /></li><li class="c2 c13 li-bullet-0">Multi-level transparent hierarchy<br /> This allows optimization across hierarchical boundaries, where all levels of hierarchy are visible in a single pass. It eliminates the need to load the entire design into memory and enables access and manipulation of objects at any hierarchy level in the context of the top-level design.<br /></li></ol>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1201_4_ic_compiler_ii_timing_engine`,title:`4. IC Compiler II Timing Engine`,html:`<p class="c2">IC Compiler II includes an advanced timing engine with the following capabilities:</p>
<ol class="c5 lst-kix_ixn5ym7sggn-0 start" start="1"><li class="c2 c13 li-bullet-0">Designed for modern designs with multiple modes and corners.<br /></li><li class="c2 c13 li-bullet-0">Uses a single cross-flow implementation timer throughout placement, clock synthesis, and routing.<br /></li><li class="c2 c13 li-bullet-0">Supports very fast, incremental timing updates.<br /></li><li class="c2 c13 li-bullet-0">Highly correlated with PrimeTime, reducing sign-off surprises and minimizing ECO iterations.<br /></li><li class="c2 c13 li-bullet-0">Supports hyper-threading for fine-grain parallelism across multiple processor cores.<br /></li></ol>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1208_5_design_planning_in_ic_compiler_ii`,title:`5. Design Planning in IC Compiler II`,html:`<p class="c2">Modern physical design engineers spend a significant portion of their schedule on floorplanning, as it greatly influences final Quality of Results (QoR). However, floorplanning is becoming increasingly challenging due to rapidly growing design sizes, incomplete data in early stages, complex design styles, and tight time-to-market constraints.</p>
<p class="c2">IC Compiler II introduces advanced design planning techniques that overcome traditional limitations by using adaptive abstraction and parallel computing methods. It does not require loading the entire design into memory and performs global floorplan optimization rather than dividing the design into artificial partitions.</p>
<p class="c2">IC Compiler II’s design planning algorithms are more than ten times faster than traditional methods, as validated by early customers.</p>
<p class="c2"><img alt="" src="/assets/modules/module13/image23.png" title="" class="native-img"></p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1215_6_handling_incomplete_data_in_early_desi`,title:`6. Handling Incomplete Data in Early Design Stages`,html:`<p class="c2">IC Compiler II includes built-in techniques to manage incomplete and mismatched data during early design exploration. It provides fast congestion estimation, timing estimation, and real-time data-flow analysis with user feedback.</p>
<p class="c2">Using these capabilities, ICC II can analyze and optimize designs with over 500 million instances and provide meaningful feedback to RTL designers within hours, compared to several days traditionally.</p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1221_7_data_flow_aware_design_planning`,title:`7. Data-Flow Aware Design Planning`,html:`<p class="c2">IC Compiler II’s design planning is data-flow aware, meaning macro placement and block placement are optimized in the context of overall data movement. This captures user intent more accurately and produces higher-quality floorplans.</p>
<p class="c2">(You can add your diagram here.)</p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1226_8_handling_repeated_blocks_in_hierarchic`,title:`8. Handling Repeated Blocks in Hierarchical Designs`,html:`<p class="c2">In large hierarchical designs, repeated blocks are very common. IC Compiler II optimizes such designs globally rather than treating each block independently.</p>
<p class="c2">Engines such as block placement, macro placement, global routing, pin assignment, optimization, and budgeting are all aware of repeated block constraints. The tool automatically derives the symmetry and orientation of repeated blocks and produces floorplans with optimal data flow.</p>
<p class="c2">IC Compiler II supports all major design styles, including channeled, abutted, narrow channeled, black box, top-down, and bottom-up. It also provides full support for UPF throughout the design flow.</p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image14.png" title="" class="native-img"></p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1234_9_physical_synthesis_and_optimization`,title:`9. Physical Synthesis and Optimization`,html:`<p class="c2">As designs become larger and more complex, optimization becomes a major bottleneck. Traditional approaches rely on localized, iterative optimization of critical paths, which is no longer sufficient.</p>
<h3 class="c15" id="h.rioltmh7k89t">IC Compiler II Optimization Strategies</h3>
<ol class="c5 lst-kix_xsgx6yu50ch1-0 start" start="1"><li class="c2 c13 li-bullet-0">Global optimization<br /> Optimizes large portions of logic simultaneously and avoids local minima.<br /></li><li class="c2 c13 li-bullet-0">Analytical optimization<br /> Uses fast, parallel numerical solvers.<br /></li><li class="c2 c13 li-bullet-0">Multi-mode, multi-corner optimization<br /> Optimizes across all modes and corners simultaneously, reducing runtime and improving convergence.<br /></li><li class="c2 c13 li-bullet-0">Early interconnect modeling<br /> Uses Zroute global routing engine to provide accurate congestion, layer, and topology modeling earlier in the flow.<br /></li><li class="c2 c13 li-bullet-0">Highly scalable parallel optimization<br /> Works efficiently on both single-core and multi-core systems.<br /></li><li class="c2 c13 li-bullet-0">Concurrent optimization of multiple metrics<br /> Optimizes timing (setup and hold), power, congestion, DRCs, and area simultaneously.<br /></li><li class="c2 c13 li-bullet-0">Concurrent placement, buffering, sizing, and routing optimization<br /> Ensures best possible QoR with fast turnaround time.</li></ol>
<p class="c2 c23"><img alt="" src="/assets/modules/module13/image24.png" title="" class="native-img"></p>
<p class="c2 c23"><img alt="" src="/assets/modules/module13/image9.png" title="" class="native-img"></p>
<p class="c2">10. Clock Synthesis and Optimization</p>
<p class="c2">Clock synthesis is one of the most challenging aspects of modern physical design due to increasing number of sequential elements, multiple clocks, stringent skew requirements, process variations, and power constraints.</p>
<p class="c2">IC Compiler II formulates clock synthesis as a network flow problem and solves it using a patented algorithm.</p>
<h3 class="c15" id="h.wlgd2lvvvkjq">Main Characteristics of ICC II Clock Synthesis</h3>
<ol class="c5 lst-kix_f8ue5bfldjx7-0 start" start="1"><li class="c2 c13 li-bullet-0">Handles all clocks across all modes and corners simultaneously.<br /></li><li class="c2 c13 li-bullet-0">Maximizes path sharing to reduce on-chip variation effects.<br /></li><li class="c2 c13 li-bullet-0">Optimizes clock gate insertion and minimizes buffer usage.<br /></li><li class="c2 c13 li-bullet-0">Automatically generates clock exceptions.<br /></li><li class="c2 c13 li-bullet-0">Optimizes clock feedthrough across voltage areas.<br /></li><li class="c2 c13 li-bullet-0">Uses Zroute for clock routing to maintain skew and timing correlation.<br /></li><li class="c2 c13 li-bullet-0">Provides clock debugging using abstract clock graphs.<br /></li></ol>
<p class="c2">IC Compiler II supports both clock tree synthesis (CTS) and clock mesh synthesis and allows hybrid clock structures for high-speed and low-power designs.<br /><br /><img alt="" src="/assets/modules/module13/image44.png" title="" class="native-img"></p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1248_11_concurrent_clock_data_and_placement_o`,title:`11. Concurrent Clock, Data, and Placement Optimization`,html:`<p class="c2">IC Compiler II integrates clock synthesis with data-path optimization and placement. Clock skew adjustment and data-path synthesis are optimized together, improving both WNS and TNS simultaneously.</p>
<p class="c2">This approach delivers more than five times speedup in clock synthesis, better timing, and lower power consumption, as demonstrated in multiple production tape-outs.</p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image42.png" title="" class="native-img"></p>
<hr>
<p class="c2 c25"></p>
<p class="c2">12. NDM (New Data Model)</p>
<p class="c2">NDMs are reference libraries required by the Place and Route (PnR) tool for design implementation. They are created using a standalone tool called Library Manager.</p>
<h3 class="c15" id="h.gfvz9buppno0">Inputs for NDM Creation</h3>
<p class="c2">NDMs are created by merging data from the following sources:</p>
<ol class="c5 lst-kix_fn1ib9xdn6cx-0 start" start="1"><li class="c2 c13 li-bullet-0">Logic libraries (.lib or .db files)<br /> Contain logic, timing, and power information.<br /></li><li class="c2 c13 li-bullet-0">Physical libraries (LEF and GDS files)<br /> Contain physical shape and layout data.<br /></li><li class="c2 c13 li-bullet-0">Technology file<br /> Contains layer information and routing rules (optional at NDM creation stage).<br /></li><li class="c2 c13 li-bullet-0">TLU Plus files<br /> Contain RC data and are optional at NDM creation stage.<br /></li></ol>
<p class="c2">Once NDM is created, the original source files are no longer required.</p>
<h3 class="c15" id="h.a7y4rjheep6m">Different Views in NDM</h3>
<p class="c2">NDMs contain multiple views, including:</p>
<ul class="c5 lst-kix_vpq76d5agi6a-0 start"><li class="c2 c13 li-bullet-0">Timing view (default)<br /></li><li class="c2 c13 li-bullet-0">Frame view (default)<br /></li><li class="c2 c13 li-bullet-0">Design view (must be explicitly enabled)<br /></li><li class="c2 c13 li-bullet-0">Layout view (must be explicitly enabled)<br /></li></ul>
<p class="c2 c23"><img alt="" src="/assets/modules/module13/image46.png" title="" class="native-img"></p>`},{id:`ch_1265_input_and_output_pads`,title:`Input and Output Pads`,html:`<h3 class="c2" id="h.p8x9ueh79mt4">Input/Output circuits, commonly referred to as I/O Pads, are intermediate interface structures that connect internal signals from the core of an integrated circuit to the external pins of the chip package. They serve as a bridge between the internal digital logic of the chip and the outside world, ensuring proper signal transmission and voltage compatibility between the chip and external devices.</h3>
<h3 class="c2" id="h.p8x9ueh79mt4-1">Typically, I/O pads are organized in a rectangular arrangement around the periphery of the chip, which is known as the Pad Frame. This structured placement helps in systematic routing, signal integrity management, and efficient packaging of the chip.</h3>
<h3 class="c2" id="h.p8x9ueh79mt4-2">The spacing between adjacent input/output pads is defined as the Pad Pitch. Pad pitch is an important design parameter, as it influences routing density, signal integrity, and compatibility with the package design.</h3>
<h3 class="c2" id="h.p8x9ueh79mt4-3">Each I/O pad contains pins on all the metal layers used in the design to provide easy access during routing. The number of metal layers available for these connections depends on the fabrication technology being used, with advanced nodes supporting a larger number of metal layers.</h3>
<h3 class="c2" id="h.p8x9ueh79mt4-4">Multiple power pads are often included in the pad frame to distribute power more effectively across the chip and reduce power noise, voltage drop, and electromigration issues. This ensures stable power delivery to the core and I/O circuitry.</h3>
<h3 class="c2" id="h.14djwttbkrhb">These I/O pads consist of additional logic components such as level shifters and buffers. Level shifters are used to convert signal voltages between different voltage domains, while buffers are used to control and adjust the drive strength of input and output signals. This helps in strengthening weak signals, maintaining signal integrity, and ensuring reliable communication between the chip and external systems.</h3>
<h3 class="c15 c35" id="h.n4jl0eb963z6"></h3>
<p class="c10"></p>
<p class="c24"><img alt="" src="/assets/modules/module13/image39.png" title="" class="native-img"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_1287_bonding_pad`,title:`Bonding Pad`,html:`<p class="c2">A bonding pad is a designated metal area on the chip to which a bond wire is soldered during the packaging process. This bond wire physically connects the bonding pad on the silicon die to the corresponding pin of the chip package, thereby providing electrical connectivity between the internal circuitry and the external environment.</p>
<p class="c2">To protect the internal circuitry from electrostatic discharge (ESD), each bonding pad is associated with ESD protection circuitry. This typically consists of a pair of large PMOS and NMOS transistors configured in a reverse-biased diode structure. This structure safely diverts high-voltage ESD events away from sensitive internal circuits, preventing permanent damage to the chip.</p>
<p class="c2">In addition to the bonding pad and ESD protection, there is also driving and logic circuitry associated with each pad. A specific area on the chip is allocated for this circuitry, which includes buffers, level shifters, and control logic responsible for signal driving, reception, and voltage compatibility.</p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image43.png" title="" class="native-img"></p>
<hr>
<p class="c10"></p>`},{id:`ch_1295_implementation_guidelines_for_i_o_and_po`,title:`Implementation Guidelines for I/O and Power Pads`,html:`<p class="c2">The following guidelines should be followed during pad placement and floorplanning to ensure reliable operation, signal integrity, and power stability:</p>
<ol class="c5 lst-kix_op86gbs2q24u-0 start" start="1"><li class="c2 c13 li-bullet-0">Isolation of sensitive inputs<br /> Sensitive asynchronous inputs such as Clock or Bidirectional pins should be isolated from other switching pads by placing Power or Ground pads between them. This reduces noise coupling and signal interference.<br /></li><li class="c2 c13 li-bullet-0">Grouping of Bidirectional Pads<br /> Bidirectional pads should be grouped together in such a way that all of them operate in either input or output mode at the same time. This simplifies control and reduces signal contention issues.<br /></li><li class="c2 c13 li-bullet-0">Avoid continuous placement of simultaneous switching pads<br /> Pads that switch simultaneously should not be placed consecutively, as this can cause excessive noise, crosstalk, and power supply disturbances.<br /></li><li class="c2 c13 li-bullet-0">Extra pad rule for additional pins<br /></li></ol>
<ul class="c5 lst-kix_op86gbs2q24u-1 start"><li class="c2 c12 li-bullet-0">For 2 extra pins, add 1 extra pad on 2 sides of the chip.<br /></li><li class="c2 c12 li-bullet-0">For 4 extra pins, add 1 extra pad on each side of the chip.<br /></li></ul>
<ol class="c5 lst-kix_op86gbs2q24u-0" start="5"><li class="c2 c13 li-bullet-0">Even distribution of power supply pads<br /> Power supply pads must be evenly distributed around the pad frame to ensure uniform power delivery and minimize IR drop across the chip.<br /></li><li class="c2 c13 li-bullet-0">Calculation of required Power Pads<br /> The number of power pads required in a design is calculated based on:<br /></li></ol>
<ul class="c5 lst-kix_op86gbs2q24u-1 start"><li class="c2 c12 li-bullet-0">Power consumption of I/O signal pads<br /></li><li class="c2 c12 li-bullet-0">Core power requirement<br /></li><li class="c2 c12 li-bullet-0">Acceptable IR drop limit<br /></li></ul>
<ol class="c5 lst-kix_op86gbs2q24u-0" start="7"><li class="c2 c13 li-bullet-0">Thumb rule for I/O Power Pads<br /> As a general guideline, one pair of power pads (VDD and VSS) should be used for every 4 to 6 signal pads in the design.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1304_calculation_of_core_power_pads`,title:`Calculation of Core Power Pads`,html:`<p class="c2">The number of core power pads required per side of the chip can be estimated using the following formula:</p>
<p class="c2">Pads per side =</p>
<p class="c2"><img alt="" src="/assets/modules/module13/image1.png" title="" class="native-img"></p>
<p class="c24">Total Core PowerNumber of sides×Vworst×Maximum Allowable Current of a Pad\\frac{\\text{Total Core Power}}{\\text{Number of sides} \\times V_{worst} \\times \\text{Maximum Allowable Current of a Pad}}Number of sides×Vworst​×Maximum Allowable Current of a PadTotal Core Power​</p>
<p class="c2">Where:</p>
<ul class="c5 lst-kix_1tt3naza0580-0 start"><li class="c2 c13 li-bullet-0">Total Core Power = Total power consumed by the core logic<br /></li><li class="c2 c13 li-bullet-0">Number of sides = Usually 4 (for rectangular chip)<br /></li><li class="c2 c13 li-bullet-0">Vworst = Worst-case supply voltage<br /></li><li class="c2 c13 li-bullet-0">Maximum allowable current per pad = Current carrying capacity of a single power pad<br /></li></ul>
<p class="c2">This formula ensures that sufficient power pads are allocated to safely and reliably supply power to the core without exceeding pad current limits or causing excessive voltage drop.</p>
<p class="c10"></p>
<p class="c2"><br />Pad Limited Design</p>
<p class="c2">A Pad Limited Design is a type of integrated circuit design in which the overall die size is primarily determined by the area required for the input/output (I/O) pads rather than by the core logic. In such designs, the number of I/O pads is more or the pads are larger in size, depending on the technology used.</p>
<p class="c2">Since the pad area occupies a significant portion of the chip periphery, it limits further reduction of die size even if the core logic is relatively small. Therefore, the pad area becomes the main limiting factor in deciding the die dimensions.</p>
<p class="c2">Pad limited designs pose several challenges for design implementation, especially for backend designers, when die area is a constraint. These challenges include routing congestion near the pad ring, difficulty in floorplanning, and increased interconnect length.</p>
<p class="c2">The solution to overcome these limitations is to use advanced techniques such as Flip Chip packaging or Staggered I/O placement. These techniques help in better utilization of die area and provide more flexibility in routing and placement.</p>
<hr>
<p class="c2 c25"></p>`},{id:`ch_1320_core_limited_design`,title:`Core Limited Design`,html:`<p class="c2">A Core Limited Design is a type of integrated circuit design in which the size of the die is primarily determined by the area occupied by the core logic rather than by the I/O pads. In these designs, the number of I/O pads is comparatively lesser.</p>
<p class="c2">Since the core area dominates, the pad frame does not significantly influence the overall die size. This type of design usually occurs when the design contains a large number of macros such as memory blocks or large IPs, or when the design has a large amount of standard-cell logic.</p>
<p class="c2">In core limited designs, Inline I/Os are typically used. In this approach, the I/O pads are placed along the periphery of the core, which helps in efficient routing between the core and the pad ring.</p>
<p class="c2 c25"></p>
<p class="c10"></p>
<p class="c37"><img alt="" src="/assets/modules/module13/image12.png" title="" class="native-img"></p>`},{id:`ch_1327_36_1_macros`,title:`36.1 Macros`,html:`<p class="c2">Macros are reusable pieces of logic blocks that can be used in a design. A macro refers to a design that has already undergone the complete flow from RTL to Place and Route (PNR). These can include memory blocks, Phase-Locked Loops (PLL), RAM, and analog designs.</p>
<p class="c2">There are three types of macros:</p>
<ol class="c5 lst-kix_jcv73n2hkak9-0 start" start="1"><li class="c2 c13 li-bullet-0">Hard Macros<br /></li><li class="c2 c13 li-bullet-0">Firm Macros<br /></li><li class="c2 c13 li-bullet-0">Soft Macros<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1333_36_2_hard_macros`,title:`36.2 Hard Macros`,html:`<p class="c2">Hard Macros are defined in LEF or GDSII files. A hard macro always comes in the form of hardware Intellectual Property (IP), for example, memories. These are very similar to block-level designs that have already been optimized for PPA (Power, Performance, and Area) and are silicon tested and proven.</p>
<p class="c2">While placing hard macros, we do not have control to modify anything inside the macro. The only control available to the designer is to change its position and orientation in the layout.</p>
<p class="c2">Before using hard macros in a design, it is important to understand their features and characteristics. Along with power, area, and timing, we must also be aware of pin properties such as synchronous pins, I/O standards, voltage levels, and other related attributes.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1339_36_3_firm_macros`,title:`36.3 Firm Macros`,html:`<p class="c2">Firm Macros are defined inside the netlist. They are flexible and portable in handling compared to hard macros. These macros can be further optimized for PPA (Power, Performance, and Area) during the physical design flow.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1343_36_4_soft_macros`,title:`36.4 Soft Macros`,html:`<p class="c2">Soft Macros are defined using synthesizable RTL code. At the RTL stage, the design is not dependent on any specific fabrication technology. Therefore, soft macros are manufacturing process independent.</p>
<p class="c2">Soft macros are more flexible compared to hard and firm macros because they can be modified and optimized according to design requirements. However, they carry a greater risk from an IP security perspective, as the RTL source code is more exposed and less secure.</p>
<p class="c2">Soft macros are editable and can contain standard cells, hard macros, or even other soft macros within them.</p>
<p class="c24"><img alt="" src="/assets/modules/module13/image10.png" title="" class="native-img"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_1353_design_issues_with_hard_macros`,title:`Design Issues with Hard Macros`,html:`<p class="c2">In a typical design flow, the macro developer delivers the GDSII file along with a complete set of models to the silicon vendor. Silicon vendors such as NXP, MosChip, einfochips, and others are responsible for performing the physical design of the chip, including the integration of hard macros into the overall design. After completion of the physical design, they provide timing and functional models of the hard macros to the chip designer. The chip designer then uses these models while designing and verifying the rest of the chip.</p>
<p class="c2">The importance of hard macros is very high in modern integrated circuit design. Due to this reason, macro providers do not want chip designers to have access to the RTL source code of the macro. The macro provider’s intention is to protect their intellectual property and prevent any possibility of the user modifying or reverse engineering the macro.</p>
<p class="c2">Unlike soft macros, hard macros provide the opportunity to include full custom design blocks in a reusable form. Memory blocks are the most common and natural candidates for full-custom implementation. Full custom macros, or full custom components within macros, must be supported either by physical design tools or by repeating the manual design, placement, and routing process.</p>
<p class="c2">Good interface design is extremely critical for producing high-quality and easy-to-integrate hard macros. Poor interface design can lead to integration difficulties, timing mismatches, and increased design effort.</p>
<p class="c2">Registering inputs and outputs of hard macros can help eliminate several difficult issues related to IP security, manufacturing testing, and timing modeling. Registered interfaces make timing more predictable and improve overall design robustness.</p>
<p class="c2">A tradeoff must be made when selecting the drive strength of interface signals. Using too strong a drive strength results in unnecessary power consumption and increased area. On the other hand, using too small a drive strength can lead to unacceptable signal delays and timing violations. Therefore, an optimal balance must be achieved.</p>
<p class="c2">Built-in self-test (BIST) for hard macros is generally not very feasible. Instead, test structures must be explicitly built into each hard macro. The hard macro developer must choose between different testing approaches such as full scan, logic BIST, or application of parallel test vectors through boundary scan or by multiplexing signals to the chip pins.</p>
<p class="c2">Among these methods, full scan provides very high test coverage and is the preferred testing methodology for hard macros, provided that the associated delay and area overhead remain within acceptable design constraints.</p>
<p class="c10"></p>
<p class="c24"><img alt="" src="/assets/modules/module13/image6.png" title="" class="native-img"></p>
<p class="c10"></p>
<hr>
<p class="c10"></p>`},{id:`ch_1367_macro_placement_guidelines`,title:`Macro Placement Guidelines`,html:`<p class="c2">The following guidelines should be carefully followed during macro placement to ensure better routability, reduced congestion, improved timing, and optimal floorplan quality:</p>
<ol class="c5 lst-kix_ngh6dyih2tw3-0 start" start="1"><li class="c2 c13 li-bullet-0">Macros should be placed at the periphery of the block.<br /></li><li class="c2 c13 li-bullet-0">Interacting macros should be placed near each other, which is also known as logical grouping.<br /></li><li class="c2 c13 li-bullet-0">Macros should be placed by considering channel optimization to avoid criss-cross placement of macros. Placement should be done in proper multiple tracks so that macros can be routed properly.<br /></li><li class="c2 c13 li-bullet-0">Avoid placement of macros or macro stacks near the ports in order to avoid congestion in later stages of physical design.<br /></li><li class="c2 c13 li-bullet-0">Placement of macros should be done in such a way that macro pins face towards the core to avoid routing detours.<br /></li><li class="c2 c13 li-bullet-0">Macros should be placed in simple rectangular shapes to avoid unnecessary area loss.<br /></li><li class="c2 c13 li-bullet-0">After macro placement, halos should be placed around the macros to avoid congestion in their surrounding regions.<br /></li><li class="c2 c13 li-bullet-0">Try to place hard blockages or partial blockages in the areas where there are gaps between macros.<br /></li><li class="c2 c13 li-bullet-0">Try to avoid notches while placing macros.<br /></li><li class="c2 c13 li-bullet-0">There should be a minimum gap maintained between adjacent macros.<br /></li><li class="c2 c13 li-bullet-0">Sufficient channels should be allowed for routing pins and for buffer insertion, which helps during timing optimization when required buffers are added.<br /></li><li class="c2 c13 li-bullet-0">Check for all macros to ensure that they are within the correct power domain fence.<br /></li></ol>
<p class="c2">NOTE: Before macro placement, fly lines should be analyzed, as they provide guidance for proper macro placement based on connectivity.</p>
<ol class="c5 lst-kix_qu9ua3snbw85-0 start" start="13"><li class="c2 c13 li-bullet-0">Maintain sufficient channel width between macros, where channel width is calculated as:<br /> Channel width = (Number of pins × Pitch) / Number of layers (either horizontal or vertical).<br /></li><li class="c2 c13 li-bullet-0">Avoid notches while placing macros; if any notches are present, hard blockages should be used in that area.<br /></li><li class="c2 c13 li-bullet-0">Avoid crisscross connections while placing macros.<br /></li><li class="c2 c13 li-bullet-0">Maintain a keep-out margin around all four sides of macros so that no standard cells are placed near macro pins. This helps in reducing congestion.<br /></li><li class="c2 c13 li-bullet-0">Place placement blockages at the corners of the macro.<br /></li><li class="c2 c13 li-bullet-0">For the pin side of macros, maintain larger separation, and for the non-pin side, macros can be abutted along with their halos to save area. The halos of two macros can touch each other so that no standard cells are placed between them.<br /></li><li class="c2 c13 li-bullet-0">Between two macros, at least one pair of power straps (power and ground) should be present.<br /></li><li class="c2 c13 li-bullet-0">Sensitive blocks such as PLL, ADC, and DAC should be placed far away from high-frequency blocks and high-frequency I/Os.<br /></li><li class="c2 c13 li-bullet-0">Ensure that macro alignment and orientation are correct and that all macro pins are located along the edges.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1374_38_1_blockages`,title:`38.1 Blockages`,html:`<p class="c2">Placement blockages prevent the placement engine from placing standard cells at specific locations in the design. Routing blockages block routing resources on one or more metal layers, and they can be created at any point in the design flow.</p>
<p class="c2">Generally, placement blockages are created during the floorplanning stage, while routing blockages are created before running any routers. Blockages act as guidelines for the placement of standard cells. They do not force the tool to place cells in a particular region, but they restrict the tool from placing cells in the blocked areas. This applies to both placement and routing blockages.</p>
<p class="c2">During the Clock Tree Synthesis (CTS) process, a large number of buffers and inverters are inserted to balance clock skew. Blockages are used at this stage to reserve space for these buffers and inverters.</p>
<p class="c2">Placement blockages are used to:</p>
<ol class="c5 lst-kix_kdfx3qq6r55q-0 start" start="1"><li class="c2 c13 li-bullet-0">Define standard cell and macro areas.<br /></li><li class="c2 c13 li-bullet-0">Reserve channels for buffer insertion.<br /></li><li class="c2 c13 li-bullet-0">Prevent cells from being placed at or near macros.<br /></li><li class="c2 c13 li-bullet-0">Prevent congestion near macros.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1382_soft_blockage_non_buffer_blockage_`,title:`Soft Blockage (Non-buffer blockage)`,html:`<p class="c2">In this type of blockage, only buffers are allowed to be placed, while standard cells are not permitted. This type of blockage is mainly used to reserve space for future buffer insertion without completely restricting the region.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1386_hard_blockage_standard_cell_blockage_`,title:`Hard Blockage (Standard-cell blockage)`,html:`<p class="c2">In this type of blockage, placement of all standard cells and buffers is completely blocked. Standard-cell blockages are mostly used to:</p>
<ol class="c5 lst-kix_jjdxit9re191-0 start" start="1"><li class="c2 c13 li-bullet-0">Avoid routing congestion at macro corners.<br /></li><li class="c2 c13 li-bullet-0">Restrict standard cells to specific regions in the design.<br /></li><li class="c2 c13 li-bullet-0">Control power rail generation near macro cells.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1391_partial_blockages`,title:`Partial Blockages`,html:`<p class="c2">By default, a placement blockage has a blockage factor of 100%, meaning no cells can be placed in that area. However, partial blockages provide flexibility by allowing a lower blockage factor.</p>
<p class="c2">To reduce placement density in a particular region without completely blocking it, the blockage factor of an existing blockage can be reduced instead of using a full 100% blockage. This helps in better control over cell density while maintaining some placement flexibility.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1396_keep_out_margin_halo_`,title:`Keep-out Margin (Halo)`,html:`<p class="c2">A halo, also known as keep-out margin, is the region around the boundary of fixed macros in which no other macros or standard cells are allowed to be placed. However, buffers and inverters are permitted within this region.</p>
<p class="c2">A pictorial representation of the halo is typically shown in a figure, where the halo surrounds the macro boundary. Halos of adjacent macros can overlap, and the size of the halo determines the default top-level channel width between macros.</p>
<p class="c2">The main purpose of the halo is to prevent placement of cells too close to macro pins, which helps in reducing congestion and improving routability. If a macro is moved to a different location, its associated halo also moves along with it.</p>
<p class="c24"><img alt="" src="/assets/modules/module13/image19.png" title="" class="native-img"></p>
<p class="c10"></p>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_1406_boundary_cells_end_cap_cells_`,title:`Boundary Cells (End-cap Cells)`,html:`<p class="c2">Before placing the standard cells, boundary cells can be added to the block. Boundary cells consist of end-cap cells, which are added to the ends of the standard cell rows and around the boundaries of objects such as the core area, hard macros, blockages, and voltage areas, and corner cells, which fill the empty space between horizontal and vertical end-cap cells (as shown in Figure 1).</p>
<p class="c2">End-cap cells are typically non-logic cells, such as decoupling capacitors for the power rail. Since the physical design tool allows any standard cell to be used as an end-cap cell, it is important to ensure that only suitable and purpose-built end-cap cells are specified for this function.</p>
<p class="c2">Boundary cells include both end-cap cells placed on the left, right, top, and bottom boundaries, as well as inside and outside corner cells.</p>
<p class="c2">To clearly define the end of a standard cell row and the edges of the core or macro boundaries, end-cap cells are placed at the ends of rows. This prevents physical damage to the cells at row boundaries and avoids incorrect laser exposure during manufacturing, ensuring proper fabrication.</p>
<p class="c2">Boundary cells also help protect the design from external electrical interference and unwanted signal coupling.</p>
<p class="c2">These cells ensure that no gaps occur between the well and implant layers, thereby preventing potential Design Rule Check (DRC) violations.</p>
<p class="c2">When boundary cells are inserted at the ends of placement rows, they ensure that the wells and implant layers are properly closed and DRC-clean. This allows the next adjacent block or macro to abut without any fabrication or layout issues.</p>
<p class="c24"><img alt="" src="/assets/modules/module13/image37.png" title="" class="native-img"></p>
<p class="c24">Layout of End-cap / Boundary Cell</p>
<p class="c2">A boundary cell is a physical-only cell, meaning it has no logical function and is therefore not part of the netlist.</p>
<p class="c2">Boundary cells mainly consist of:</p>
<ul class="c5 lst-kix_8t9n2o3h3mr1-0 start"><li class="c2 c13 li-bullet-0">N-well layer<br /></li><li class="c2 c13 li-bullet-0">Implant layers<br /></li><li class="c2 c13 li-bullet-0">Dummy poly layer<br /></li><li class="c2 c13 li-bullet-0">Metal power rails<br /></li></ul>
<p class="c2">This structure is illustrated in Figure 2, which shows the physical composition of a typical boundary cell.<br /><br /><img alt="" src="/assets/modules/module13/image20.png" title="" class="native-img"></p>
<hr>
<p class="c10"></p>`},{id:`ch_1422_how_to_place_boundary_cells`,title:`How to Place Boundary Cells`,html:`<p class="c2">Boundary cells are placed immediately after macro placement and site row creation.</p>
<p class="c2">Since boundary cells are inserted before standard cell placement, they are referred to as pre-placed cells.</p>
<p class="c2">End-cap cells can be added either through the graphical user interface (GUI) of the physical design tool or by using specific tool commands in the placement flow.</p>`},{id:`ch_1426_power_dissipation_sources`,title:`Power Dissipation – Sources`,html:`<p class="c2">The power consumed in a VLSI circuit can be broadly classified into two types:</p>
<ul class="c5 lst-kix_1b5dmijbggnx-0 start"><li class="c2 c13 li-bullet-0">Static power dissipation<br /></li><li class="c2 c13 li-bullet-0">Dynamic power dissipation<br /></li></ul>
<h3 class="c15" id="h.ikme72c03gp3">1. Static Power</h3>
<p class="c2">Static power is the power consumed when there is no circuit activity, or in other words, when the circuit is in a quiescent (idle) state.</p>
<p class="c2">Even when the clock is stopped and the input signals are not changing, the circuit continues to consume some amount of power as long as the supply voltage is present. This power consumption is referred to as static power dissipation.</p>
<p class="c2">Static power is mainly due to leakage currents that flow when the transistor is in the off-state. There are several types of leakage currents in a transistor; however, the two most common types are usually highlighted in standard explanations.</p>
<p class="c2">Reverse-bias leakage current flows when the junction diodes inside the transistor are reverse biased. This leakage occurs across the source-body and drain-body junctions.</p>
<p class="c2">Similarly, sub-threshold leakage current flows from drain to source through the channel when the gate-to-source voltage (VGS) is less than or equal to the threshold voltage (Vth). Even though the transistor is considered off, a small current still flows due to weak inversion.</p>
<p class="c2">Typically, the leakage power dissipation in a transistor is inversely proportional to its threshold voltage. This means that as the threshold voltage decreases, the leakage power increases, and vice versa.</p>
<p class="c2"><img alt="" src="/assets/modules/module13/image27.png" title="" class="native-img"></p>
<h3 class="c15" id="h.v9jv6e643dg3">2. Dynamic Power</h3>
<p class="c2">Dynamic power is the power consumed when the circuit is in active operation, which means that the supply voltage is applied, the clock is running, and the input signals are changing.</p>
<p class="c2">Dynamic power dissipation mainly occurs due to dynamic currents, which include capacitance (switching) currents and short-circuit currents. These are described below.</p>
<hr>
<p class="c10"></p>
<h4 class="c33" id="h.u0ti0mq45mkm">Switching Power Dissipation</h4>
<p class="c2">Switching power dissipation occurs due to the charging and discharging of the total load capacitance, which includes the output capacitance of the gate as well as other parasitic capacitances associated with the interconnects and connected devices.</p>
<p class="c2">At a high level, the switching power dissipation can be expressed using the following equation:</p>
<p class="c2">Pswitch = α · (Vdd)² · CL · f</p>
<p class="c2">where,<br /> α = switching activity factor<br /> Vdd = supply voltage<br /> CL = total load capacitance<br /> f = frequency of operation</p>
<p class="c2">All the parameters in this equation are generally straightforward except the switching activity factor (α).</p>
<p class="c2">Switching activity represents how often a signal transitions between 0 and 1. The output of a circuit does not change in every clock cycle; rather, it changes depending on the functionality of the circuit and the input patterns. Therefore, switching activity is defined as the probability of a signal making a transition during a clock cycle.</p>
<p class="c2">Note:</p>
<ul class="c5 lst-kix_n69r4wtz7v6g-0 start"><li class="c2 c13 li-bullet-0">If the signal is a clock, then α = 1, because the clock toggles every cycle.<br /></li><li class="c2 c13 li-bullet-0">If the signal switches only once per clock cycle, then α = 0.5.</li></ul>
<p class="c10"></p>
<p class="c10"></p>
<h4 class="c33" id="h.at7njp7383jm">Short-Circuit Power Dissipation</h4>
<p class="c2">Short-circuit power dissipation occurs when both the pull-up network (PMOS) and pull-down network (NMOS) are simultaneously turned ON for a brief period during a signal transition.</p>
<p class="c2">When the input signal changes slowly (i.e., has a large transition time or poor slew), there exists a certain duration during which some of the transistors in both the pull-up and pull-down networks conduct at the same time. This creates a direct current path from VDD to GND, resulting in short-circuit current flow and, consequently, power dissipation.</p>
<p class="c2">To understand this concept, consider a simple CMOS inverter, as shown in the figure below. During the input transition intervals between time t₁ and t₂, and again between time t₃ and t₄, both transistors Q1 (PMOS) and Q2 (NMOS) are turned ON simultaneously due to the finite slew of the input signal. During these intervals, a direct current flows from VDD to ground, leading to short-circuit power dissipation.</p>
<p class="c2">This type of power dissipation becomes more significant when input transitions are slow or when the driving strength of the previous stage is weak.</p>
<p class="c24"><img alt="" src="/assets/modules/module13/image22.png" title="" class="native-img"></p>
<p class="c24">Minimizing Power Dissipation with Low Power Design</p>
<p class="c2">Some of the ways in which low power design can be implemented are discussed below.</p>
<h3 class="c15" id="h.h2xk1snqo80r">Reduce Supply Voltage</h3>
<p class="c2">Reducing the supply voltage is one of the most effective ways to reduce power consumption. Without requiring any special technologies or circuits, reducing the supply voltage by a factor of two can result in approximately a four-fold reduction in power consumption.</p>
<p class="c2">However, reducing the supply voltage also reduces performance because it slows down circuit operation. This performance degradation can be partially avoided by scaling down the threshold voltage of the transistors.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.eorvmi3oeab3">Physical Capacitance</h3>
<p class="c2">The dynamic power consumption of a circuit is directly proportional to the physical capacitance being switched. Therefore, in addition to reducing supply voltage, reducing load capacitance is another effective way to lower power dissipation.</p>
<p class="c2">This can be achieved by optimizing interconnect length, reducing fanout, and using smaller or optimized devices where possible.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.1ezpjucnqdrw">Design Process</h3>
<p class="c2">Low-power VLSI design can be achieved through optimization at multiple levels of the design process. This includes improvements starting from system-level and algorithmic-level design, all the way down to circuit-level and layout-level optimizations.</p>
<p class="c2">Power-efficient architectures, low-power coding styles, and optimized physical design techniques all contribute to overall power reduction.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1478_power_planning`,title:`Power Planning`,html:`<p class="c2">Power planning includes power network routing and power network analysis, and it is essential for creating a design with good power integrity.</p>
<p class="c2">A robust power and ground (PG) grid reduces IR drop and electromigration by providing an adequate number of power and ground pads and metal rails.</p>
<p class="c2">Power planning also helps in evaluating how much routing resource is consumed by power nets and how the power network impacts overall signal routability.</p>
<p class="c2">During power planning, we must ensure that IR drop remains within the specified budget and electromigration violations are avoided.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1485_ir_drop`,title:`IR Drop`,html:`<p class="c2">Voltage drop occurs in a metal wire due to its resistance, and this phenomenon is known as IR drop.</p>
<p class="c2">In a chip, the power supply is distributed uniformly across multiple metal layers, but these metal layers have finite resistance. When current flows through these metal layers, some voltage is dropped across the resistance of the metal.</p>
<p class="c2">Due to IR drop, the effective supply voltage at certain locations in the chip decreases, which increases signal delay and can lead to timing violations. It can also increase noise and degrade overall performance.</p>
<p class="c2">The acceptable value of IR drop is decided at the beginning of the project and is used to determine the derate value for timing analysis. If the actual IR drop exceeds the acceptable limit, the derate value must be adjusted. Without this correction, timing calculations may become overly optimistic.</p>
<p class="c2">For example, if a design operates at 1.2 V and the acceptable IR drop limit is ±0.4 V, then the voltage across VDD and VSS must remain between 0.8 V and 1.6 V. If the voltage stays within this range, timing and functionality are not affected.</p>
<p class="c2">Since power routes carry large amounts of current, IR drop is a major concern for these nets. Therefore, higher metal layers are typically used for power routing because they are thicker and have lower resistance.</p>
<p class="c2">For instance, if a project uses 15 metal layers, the top two or three layers are usually reserved for top-level routing, and metal layers such as M11 and M12 are often used specifically for power planning.</p>
<p class="c2">There are two types of IR drop:</p>
<ol class="c5 lst-kix_i3104iczngsf-0 start" start="1"><li class="c2 c13 li-bullet-0">Static IR drop<br /></li><li class="c2 c13 li-bullet-0">Dynamic IR drop<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1497_static_ir_drop`,title:`Static IR Drop`,html:`<p class="c2">Static IR drop is independent of cell switching activity. It depends only on the resistance of the metal and the steady-state current.</p>
<p class="c2">Methods to reduce static IR drop include:</p>
<ol class="c5 lst-kix_s7uetlb1swrv-0 start" start="1"><li class="c2 c13 li-bullet-0">Using higher metal layers if available.<br /></li><li class="c2 c13 li-bullet-0">Increasing the width of power straps.<br /></li><li class="c2 c13 li-bullet-0">Increasing the number of parallel power wires.<br /></li><li class="c2 c13 li-bullet-0">Checking for missing vias and adding additional vias where required.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1503_dynamic_ir_drop`,title:`Dynamic IR Drop`,html:`<p class="c2">Dynamic IR drop occurs due to switching activity of cells. When a cell switches at the active edge of the clock, it requires a large amount of current. However, due to IR drop, sufficient voltage may not reach the cell, which can cause timing failures or even metastability.</p>
<p class="c2">Methods to improve dynamic IR drop include:</p>
<ol class="c5 lst-kix_95ncjz2a353-0 start" start="1"><li class="c2 c13 li-bullet-0">Inserting decoupling capacitor (decap) cells.<br /></li><li class="c2 c13 li-bullet-0">Increasing the number of power straps.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1509_electromigration_em_`,title:`Electromigration (EM)`,html:`<p class="c2">Electromigration occurs when a high current density flows through metal layers, causing metal atoms to be displaced from their original positions. This can lead to open circuits or short circuits over time.</p>
<p class="c2">Higher temperatures accelerate electromigration because increased thermal energy causes more metal ions to move.</p>
<p class="c2">In older technology nodes, electromigration was mainly a concern for power and clock nets. However, in modern advanced nodes, even signal nets may experience electromigration due to higher current densities.</p>
<p class="c2">Clock nets are especially prone to electromigration because they have high switching activity. For this reason, designers often avoid using very high drive strength clock buffers when building the clock tree.</p>
<p class="c2">Methods to mitigate electromigration include:</p>
<ol class="c5 lst-kix_eno1f3tyc4aj-0 start" start="1"><li class="c2 c13 li-bullet-0">Increasing the width of the wire.<br /></li><li class="c2 c13 li-bullet-0">Inserting buffers to distribute current.<br /></li><li class="c2 c13 li-bullet-0">Downsizing the driver to reduce current demand.<br /></li><li class="c2 c13 li-bullet-0">Routing the net on higher metal layers.<br /></li><li class="c2 c13 li-bullet-0">Adding more vias to reduce current density per via.<br /></li><li class="c2 c13 li-bullet-0">Keeping wire lengths as short as possible.<br /></li></ol>
<p class="c24"><img alt="" src="/assets/modules/module13/image25.png" title="" class="native-img"></p>
<p class="c10"></p>
<hr>
<p class="c24">Power Routing (Pre-Routing)</p>
<p class="c2">Power routing, also known as Pre-Routing, is performed to connect power to the chip while considering critical issues such as electromigration (EM) and IR drop.</p>
<p class="c2">Pre-routing includes the creation of Power Rings, Power Stripes/Mesh/Grid, and Standard Cell Power Rails. Power planning also includes the insertion of power vias to ensure proper electrical connectivity.</p>
<p class="c2">Power rings are established through I/O cell abutment and through I/O filler cells. Power trunks are constructed between the core power ring and the power pads to ensure reliable power delivery from the periphery to the core.</p>
<h3 class="c15" id="h.j8pe12tgguj">Technical information required for Power Planning</h3>
<p class="c2">The following information is required for effective power planning:</p>
<ul class="c5 lst-kix_w4tz45po9ms4-0 start"><li class="c2 c13 li-bullet-0">Total dynamic power information, which is obtained from the compiler.<br /></li><li class="c2 c13 li-bullet-0">Technology file, which provides the maximum allowable current density (JMAX).<br /></li><li class="c2 c13 li-bullet-0">LEF file, which provides metal layer width information.<br /></li><li class="c2 c13 li-bullet-0">Technology library, which provides core voltage levels.<br /></li><li class="c2 c13 li-bullet-0">Definition of levels of power distribution.<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_1528_rings`,title:`Rings`,html:`<p class="c2">VDD and VSS power rings are formed around the core and around macros to provide a stable and uniform power supply structure. These rings serve as primary power distribution paths at the top level of the design.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1532_stripes`,title:`Stripes`,html:`<p class="c2">Power stripes carry VDD and VSS around the chip and distribute power from the rings across the design.</p>
<p class="c2">Power stripes are created within the core area to tap power from the core rings and deliver it to different regions of the core.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1537_rails_special_route_`,title:`Rails (Special Route)`,html:`<p class="c2">Power rails connect VDD and VSS to the standard cells. Standard cell rails are created to tap power from the power stripes and distribute it to individual standard cells in each row.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1541_power_ground_pins_and_power_vias`,title:`Power/Ground Pins and Power Vias`,html:`<p class="c2">Power vias are inserted between:</p>
<ul class="c5 lst-kix_s1uzse6f4h80-0 start"><li class="c2 c13 li-bullet-0">Power ring and power grid,<br /></li><li class="c2 c13 li-bullet-0">Power grid and standard cell rails, and<br /></li><li class="c2 c13 li-bullet-0">Vertical grid and horizontal grid.<br /></li></ul>
<p class="c2">These vias ensure proper vertical connectivity between different metal layers in the power network.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1547_trunks`,title:`Trunks`,html:`<p class="c2">Power trunks connect the core power ring to the power pads located at the chip periphery. These trunks act as major power highways that bring power from external supply pads to the internal power distribution network.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1551_power_planning_involves`,title:`Power Planning Involves`,html:`<p class="c2">Power planning involves the following key steps:</p>
<ol class="c5 lst-kix_d7mf7wghkr97-0 start" start="1"><li class="c2 c13 li-bullet-0">Calculating the number of power pins required.<br /></li><li class="c2 c13 li-bullet-0">Determining the number of power rings and stripes.<br /></li><li class="c2 c13 li-bullet-0">Deciding the width of power rings and stripes.<br /></li><li class="c2 c13 li-bullet-0">Analyzing and controlling IR drop.<br /></li></ol>
<p class="c2">These calculations depend on:</p>
<ul class="c5 lst-kix_63o8bhyougkn-0 start"><li class="c2 c13 li-bullet-0">Total power consumed by the chip,<br /></li><li class="c2 c13 li-bullet-0">Total current drawn,<br /></li><li class="c2 c13 li-bullet-0">Current rating of power pads (A/m),<br /></li><li class="c2 c13 li-bullet-0">Current rating of metal layers, and<br /></li><li class="c2 c13 li-bullet-0">Percentage of current flowing through different metal layers.<br /></li></ul>
<p class="c2 c23"><img alt="" src="/assets/modules/module13/image45.png" title="" class="native-img"></p>
<hr>
<p class="c10"></p>`},{id:`ch_1559_inputs_of_power_planning`,title:`Inputs of Power Planning`,html:`<p class="c2">The following inputs are required for power planning:</p>
<ol class="c5 lst-kix_2kawxbbsh9ye-0 start" start="1"><li class="c2 c13 li-bullet-0">Netlist (.v file)<br /></li><li class="c2 c13 li-bullet-0">SDC (timing constraints)<br /></li><li class="c2 c13 li-bullet-0">Physical and logical libraries (.lef and .lib files)<br /></li><li class="c2 c13 li-bullet-0">TLU+ files (RC modeling)<br /></li><li class="c2 c13 li-bullet-0">UPF (Unified Power Format)<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1564_power_planning_management_core_cell_powe`,title:`Power Planning Management – Core Cell Power Management`,html:`<p class="c2">In core power management:</p>
<ol class="c5 lst-kix_lkve3iqqjvaj-0 start" start="1"><li class="c2 c13 li-bullet-0">Power rings are formed around the core.<br /></li><li class="c2 c13 li-bullet-0">If any macro or IP is power critical, a separate power ring is created specifically for that macro or IP.<br /></li><li class="c2 c13 li-bullet-0">The number of power straps is determined based on the power requirement of the design.<br /></li></ol>
<hr>
<p class="c10"></p>`},{id:`ch_1570_i_o_cell_power_management`,title:`I/O Cell Power Management`,html:`<p class="c2">In I/O cell power management, power rings are formed around the I/O cells, and power trunks are created between the core power rings and the power pads.</p>
<hr>
<p class="c10"></p>`},{id:`ch_1574_ideal_power_distribution_network`,title:`Ideal Power Distribution Network`,html:`<p class="c2">An ideal power distribution network should have the following properties:</p>
<ol class="c5 lst-kix_2f7eqt92nnmq-0 start" start="1"><li class="c2 c13 li-bullet-0">Maintain a stable voltage with minimal noise.<br /></li><li class="c2 c13 li-bullet-0">Avoid wear-out due to electromigration and self-heating.<br /></li><li class="c2 c13 li-bullet-0">Consume minimal chip area and routing resources.<br /></li><li class="c2 c13 li-bullet-0">Be easy to layout and implement.<br /></li></ol>
<p class="c2">In practice, real power networks must balance these competing requirements while meeting noise and reliability targets. The typical noise goal is ±10% of the nominal supply voltage.</p>
<p class="c2">For example, if the nominal supply voltage VDD = 1.0 V, the actual supply should remain within the range of 0.9 V to 1.1 V.</p>
<p class="c2">The two fundamental sources of power supply noise are:</p>
<ul class="c5 lst-kix_4u4lzw527132-0 start"><li class="c2 c13 li-bullet-0">IR drop, and<br /></li><li class="c2 c13 li-bullet-0">L di/dt noise.<br /></li></ul>
<hr>
<p class="c10"></p>`},{id:`ch_1583_flow_to_create_a_power_plan_tool_perspec`,title:`Flow to Create a Power Plan (Tool Perspective)`,html:`<h3 class="c15" id="h.v4sscgxpks2n">1. Creating and Connecting Power Nets</h3>
<p class="c2">To begin pattern-based power planning, power and ground nets must be defined and connected to the corresponding pins in the design. If UPF is used to describe the power network, this step can be skipped.</p>
<p class="c2">Commands:</p>
<ul class="c5 lst-kix_8jkxcsajxf4j-0 start"><li class="c2 c13 li-bullet-0">create_net<br /></li><li class="c2 c13 li-bullet-0">connect_pg_net<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.7weff5zfc1ti">2. Creating Power and Ground Ring Patterns</h3>
<p class="c2">The ring pattern specifies:</p>
<ul class="c5 lst-kix_pvuejjahcitz-0 start"><li class="c2 c13 li-bullet-0">Horizontal and vertical metal layers,<br /></li><li class="c2 c13 li-bullet-0">Ring width,<br /></li><li class="c2 c13 li-bullet-0">Spacing values,<br /></li><li class="c2 c13 li-bullet-0">Vias, and<br /></li><li class="c2 c13 li-bullet-0">Corner bridging.<br /></li></ul>
<p class="c2">These rings can be created around the core, macros, power regions, or specified polygons.</p>
<p class="c2">Command:</p>
<ul class="c5 lst-kix_j2zo23duv8xe-0 start"><li class="c2 c13 li-bullet-0">create_pg_ring_pattern<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.lirka2a6w56m">3. Creating Power and Ground Mesh Patterns</h3>
<p class="c2">The mesh pattern defines:</p>
<ul class="c5 lst-kix_4l3xryr095sx-0 start"><li class="c2 c13 li-bullet-0">Horizontal and vertical metal layers,<br /></li><li class="c2 c13 li-bullet-0">Metal width,<br /></li><li class="c2 c13 li-bullet-0">Metal spacing,<br /></li><li class="c2 c13 li-bullet-0">Metal pitch,<br /></li><li class="c2 c13 li-bullet-0">Vias, and<br /></li><li class="c2 c13 li-bullet-0">Wire trimming.<br /></li></ul>
<p class="c2">Command:</p>
<ul class="c5 lst-kix_o0mtektvwvvc-0 start"><li class="c2 c13 li-bullet-0">create_pg_mesh_pattern<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15 c35" id="h.1h2xwh8shg8s"></h3>
<h3 class="c15" id="h.eamxtvi8nd3z">4. Creating Power and Ground Standard Cell Rails</h3>
<p class="c2">The standard cell rail pattern specifies:</p>
<ul class="c5 lst-kix_y2ptpehy7phf-0 start"><li class="c2 c13 li-bullet-0">Metal layers,<br /></li><li class="c2 c13 li-bullet-0">Rail width, and<br /></li><li class="c2 c13 li-bullet-0">Rail offset.<br /></li></ul>
<p class="c2">These rails are used to connect power to standard cell rows.</p>
<p class="c2">Command:</p>
<ul class="c5 lst-kix_uw9olh8lg4so-0 start"><li class="c2 c13 li-bullet-0">create_pg_std_cell_conn_pattern<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15 c35" id="h.3atctogk3y68"></h3>
<h3 class="c15" id="h.i8iqmyoub1l">5. Setting the Power Plan Strategy</h3>
<p class="c2">After defining ring, mesh, macro connections, and standard cell rail patterns, these patterns are associated with power plan regions using the set_pg_strategy command.</p>
<p class="c2">This command also defines:</p>
<ul class="c5 lst-kix_oaasrr2dgch4-0 start"><li class="c2 c13 li-bullet-0">Pattern offset,<br /></li><li class="c2 c13 li-bullet-0">Extension beyond region boundaries, and<br /></li><li class="c2 c13 li-bullet-0">Routing blockages where patterns should not be created.<br /></li></ul>
<p class="c2">Command:</p>
<ul class="c5 lst-kix_p7sduph1o9r8-0 start"><li class="c2 c13 li-bullet-0">set_pg_strategy<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.p0l6zgv5wu4e">6. Instantiating the Power Plan</h3>
<p class="c2">The create_pg_*_pattern and set_pg_strategy commands only define the power plan but do not physically create power straps or rails.</p>
<p class="c2">To instantiate the power plan, the compile_pg command is used with the -strategies option, specifying the strategy name.</p>
<p class="c2">Command:</p>
<ul class="c5 lst-kix_mvn688dpvccz-0 start"><li class="c2 c13 li-bullet-0">compile_pg -strategies<br /></li></ul>
<p class="c10"></p>
<hr>
<p class="c10"></p>`},{id:`ch_1631_well_tap_cells`,title:`Well Tap Cells`,html:`<p class="c2">Well tap cells (or Tap cells) are used to prevent the latch-up issue in CMOS designs. Well tap cells connect the N-well to VDD and the P-substrate to VSS in order to prevent latch-up.</p>
<p class="c2">A well tap cell does not have any logical function; its only purpose is to provide proper tapping to the N-well and P-substrate. Therefore, a well tap cell is referred to as a physical-only cell. In this section, we discuss the structure of a well tap cell, the need for well tap cells, and their placement in the physical design flow.</p>
<p class="c2">Well tap cells have only two electrical connections:</p>
<ol class="c5 lst-kix_tsfji7sci5pc-0 start" start="1"><li class="c2 c13 li-bullet-0">N-well connected to the power supply (VDD).<br /></li><li class="c2 c13 li-bullet-0">P-substrate connected to ground (VSS).<br /></li></ol>
<p class="c2">A typical layout structure of a well tap cell is shown in Figure 1. Since a well tap cell has no input or output pins, it is classified as a physical-only cell and is not part of the functional netlist.</p>
<p class="c2 c25"></p>
<p class="c40"><img alt="" src="/assets/modules/module13/image28.png" title="" class="native-img"></p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.tp35h7h92j89">Evolution from Traditional Standard Cells to Tapless Cells</h3>
<p class="c2">In earlier technology nodes, there was no concept of a separate well tap cell. Standard cells were designed in such a way that each standard cell included internal connections from N-well to VDD and P-substrate to VSS.</p>
<p class="c2">However, this type of standard cell design consumed more silicon area. To reduce area overhead, the concept of tapless standard cells was introduced. In a tapless cell, there is no internal well tapping inside the standard cell. Instead, well tapping is provided by a separate dedicated standard cell known as a well tap cell.</p>
<p class="c2">Therefore, well tap cells are part of a tapless standard cell library. Figure 2 shows the structural difference between a traditional standard cell and a tapless standard cell.</p>
<p class="c2 c25"></p>
<p class="c40"><img alt="" src="/assets/modules/module13/image18.png" title="" class="native-img"></p>
<p class="c2">Requirement and Placement of Well Tap Cells</p>
<p class="c2">Well tap cells are required to prevent latch-up issues in the design.</p>
<p class="c2">Well tap cells are placed after macro placement and power rail creation, which is known as the pre-placement stage. They are inserted at regular intervals in each standard cell row.</p>
<p class="c2">The maximum allowable distance between two well tap cells is determined by the DRC rules of the specific technology library being used. A typical placement pattern of well tap cells is shown in the figure.</p>
<p class="c2">Well tap cells are generally placed in straight vertical columns in alternate rows, forming a checkerboard pattern. This pattern provides maximum coverage for well tapping and effective latch-up prevention.</p>
<p class="c2">If a macro blocks the path of a vertical well tap column, the placement of that column is shifted alongside the macro, as shown in the figure.</p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image40.png" title="" class="native-img"></p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.cheum4l3fxko">Tool Commands for Well Tap Placement</h3>
<p class="c2">This placement is performed using Place-and-Route (PnR) tool commands. The commands for Innovus and ICC tools are as follows:</p>
<h4 class="c33" id="h.uwqa2jqkjzvi">For Innovus Tool:</h4>
<p class="c24">set_well_tap_mode -rule &lt;&gt; -bottom_tap_cell &lt;cellName&gt; -top_cell_name &lt;cellName&gt;</p>
<p class="c24">addWellTap -cell &lt;cellName&gt; -cellInterval &lt;maxGap&gt; -prefix &lt;prefixName&gt; -checkerBoard -fixedGap</p>
<p class="c24">verifyWellTap -report &lt;reportName&gt;</p>
<p class="c10"></p>
<p class="c2">For more details, refer to the Innovus User Guide (UG).</p>
<h4 class="c33" id="h.a0eogdgpwftz">For ICC Tool:</h4>
<p class="c24">add_tap_cell_array -ignore_soft_blockage true \\</p>
<p class="c24">-master_cell_name $tapCell \\</p>
<p class="c24">-distance $tapPitch \\</p>
<p class="c24">-connect_power_name VDD \\</p>
<p class="c24">-connect_ground_name VSS \\</p>
<p class="c24">-respect_keepout \\</p>
<p class="c24">-pattern stagger_every_other_row \\</p>
<p class="c24">-tap_cell_identifier WELLTAP</p>
<p class="c10"></p>
<hr>
<p class="c10"></p>
<p class="c10"></p>`},{id:`ch_1678_inserting_tap_cells`,title:`Inserting Tap Cells`,html:`<p class="c2">A tap cell is a special non-logic cell that contains a well tie, a substrate tie, or both. These cells are inserted into standard cell rows to prevent latch-up in CMOS designs. Tap cells are typically required when most or all of the standard cells in the library do not include built-in substrate or well taps.</p>
<p class="c2">In general, the technology design rules specify the maximum allowable distance between any transistor in a standard cell and the nearest well or substrate tie. This ensures proper electrical stability and prevents latch-up.</p>
<p class="c2">To insert tap cells into the design, the create_tap_cells command is used. While using this command, the designer must specify:</p>
<ul class="c5 lst-kix_rk51e159d754-0 start"><li class="c2 c13 li-bullet-0">The name of the library cell to be used as the tap cell (using the -lib_cell option), and<br /></li><li class="c2 c13 li-bullet-0">The maximum allowable distance (in microns) between two tap cells (using the -distance option).<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.3wqwoc75mshx">Tap Cells in Digital Libraries and Tapless Cells</h3>
<p class="c2">In traditional digital standard cell libraries, most cells include internal well and substrate taps, as shown in the typical layout of a standard cell. However, it is not necessary for every CMOS device to have its own tap.</p>
<p class="c2">Theoretically, only one VDD tap per N-well (per standard cell row) and a single substrate connection to VSS are sufficient. By removing individual well ties from every standard cell, significant silicon area can be saved.</p>
<p class="c2">This led to the development of tapless libraries, where standard cells do not contain built-in well or substrate taps. Instead, a separate dedicated cell called a Well Tap Cell is provided, which contains only the N-well to VDD and P-substrate to VSS connections.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.nldlghszuth1">Need for Regular Tap Cell Placement</h3>
<p class="c2">Although a single N-well or substrate tap per row is theoretically sufficient, in practice this is not safe. Having only one tap per row can result in high well and substrate resistance, which may increase the risk of latch-up.</p>
<p class="c2">Therefore, design rules typically require that a tap cell must be placed within a specified maximum distance from every transistor in the row. This ensures proper biasing of the wells and substrates throughout the design.</p>
<p class="c2">To satisfy these rules, tap cells are commonly placed in a checkerboard pattern across alternate rows, which provides uniform and adequate well and substrate tapping coverage across the entire layout. A typical checkerboard placement of tap cells is illustrated in the figure (to be added by you).</p>`},{id:`ch_1695_blockages`,title:`Blockages`,html:`<p class="c2">Blockages are specific regions in the layout where the placement of cells is prevented or restricted. These act as guidelines for placing standard cells in the design.</p>
<p class="c2">Blockages do not instruct the placement tool to place standard cells in a particular area; instead, they prevent the placement tool from placing standard cells in specified locations. In this way, blockages serve as constraints or guidelines for the placement tool.</p>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.elk6upcrttt4">Types of Blockages</h3>
<p class="c2">Blockages are classified into the following types:</p>
<ol class="c5 lst-kix_x7zx53g7a2g6-0 start" start="1"><li class="c2 c13 li-bullet-0">Soft (Only-Buffer) Blockage<br /></li><li class="c2 c13 li-bullet-0">Hard (Standard Cell) Blockage<br /></li><li class="c2 c13 li-bullet-0">Partial Blockage<br /></li><li class="c2 c13 li-bullet-0">Placement Blockage<br /></li><li class="c2 c13 li-bullet-0">Routing Blockage<br /></li></ol>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.v6nadn5was4w">Soft Blockage</h3>
<p class="c2">A soft blockage specifies a region where only buffers are allowed to be placed. This means that standard cells cannot be placed in this region.</p>
<p class="c2">Soft blockage prevents the placement tool from placing non-buffer cells, such as standard cells, in the specified area while still allowing buffer insertion if required.</p>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.h2nsnpgkx7i2">Hard Blockage</h3>
<p class="c2">A hard blockage specifies a region where placement of all standard cells and buffers is completely prohibited. It prevents the placement tool from placing any standard cells or buffers in this region.</p>
<p class="c2">Hard blockages are mostly used to:</p>
<ol class="c5 lst-kix_kt03oluvuhts-0 start" start="1"><li class="c2 c13 li-bullet-0">Restrict standard cells to certain regions in the design.<br /></li><li class="c2 c13 li-bullet-0">Avoid routing congestion at macro corners.<br /></li><li class="c2 c13 li-bullet-0">Control power rail generation near macro corners.<br /></li></ol>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.5zpf88ge74pf">Partial Blockage</h3>
<p class="c2">By default, the blockage factor of any blockage is 100%, meaning no cells can be placed in that region. However, partial blockages provide flexibility by allowing a certain percentage of the area to remain available for placement.</p>
<p class="c2">To reduce placement density in a specific region without completely blocking it, the blockage factor of an existing blockage can be reduced to a flexible value instead of keeping it at 100%.</p>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.g1v39msz5bd7">Placement Blockage</h3>
<p class="c2">Placement blockages prevent the placement tool from placing cells in specific regions of the design. These blockages are typically created during the floorplanning stage.</p>
<p class="c2">Placement blockages are used to:</p>
<ol class="c5 lst-kix_y3wg1y8tdq5p-0 start" start="1"><li class="c2 c13 li-bullet-0">Reserve channels for buffer insertion.<br /></li><li class="c2 c13 li-bullet-0">Prevent cells from being placed too close to macros.<br /></li><li class="c2 c13 li-bullet-0">Prevent congestion near macros.<br /></li></ol>
<hr>
<p class="c2 c25"></p>
<h3 class="c15" id="h.cd8wb1ujvaln">Routing Blockage</h3>
<p class="c2">Routing blockages restrict routing resources on one or more metal layers. They can be created at any stage of the design flow, depending on routing requirements or congestion issues.</p>
<hr>
<p class="c2 c25"></p>
<p class="c2">Floorplan Checks</p>
<p class="c2">Floorplan checks are performed in the physical design flow to ensure that the power network, connectivity, and boundary cell placement are correct and free from violations before proceeding to detailed placement and routing. The following commands are commonly used for floorplan verification.</p>
<h3 class="c15" id="h.wrp7p9ycsg8k">1. check_pg_drc</h3>
<p class="c2">The check_pg_drc command is used to check the DRC compliance of routing objects related to the power and ground network. For a given power or ground net, this command checks for DRC violations with respect to the following objects:</p>
<ul class="c5 lst-kix_8ykfimi1mxni-0 start"><li class="c2 c13 li-bullet-0">Pins of nets of any type, including pins that are unassigned.<br /></li><li class="c2 c13 li-bullet-0">Routing blockages and keepouts that may restrict power and ground routing.<br /></li><li class="c2 c13 li-bullet-0">Metal and via routing shapes that are not assigned to any net.<br /></li><li class="c2 c13 li-bullet-0">Routing objects associated with other power or ground nets that are not connected to the current net being evaluated.<br /></li><li class="c2 c13 li-bullet-0">Routing objects of clock nets that may interfere with power routing.<br /></li></ul>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.85ei256742ko">2. check_pg_connectivity</h3>
<p class="c2">The check_pg_connectivity command is used to perform a detailed connectivity check of the power network.</p>
<p class="c2">This command ensures that every block, macro, pad, and standard cell is properly connected to the power and ground network as required by the design and UPF specification.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.4gfo7mdsw5a3">3. check_pg_missing_vias</h3>
<p class="c2">The check_pg_missing_vias command checks for missing vias within the power and ground network.</p>
<p class="c2">It specifically detects missing vias between overlapping regions of different metal layers where vertical connectivity is required. The error information generated by this command can be viewed in the error browser or written to an external file for further analysis.</p>
<hr>
<p class="c10"></p>
<h3 class="c15" id="h.nb2e8f9ngw9m">4. check_boundary_cells</h3>
<p class="c2">The check_boundary_cells command is used to verify boundary cell placement based on the rules defined using the set_boundary_cell_rules command.</p>
<p class="c2">After inserting boundary cells using the compile_boundary_cells command, their placement must be verified using check_boundary_cells. To generate an error data file that can be viewed in the error browser, the -error_view option can be used.</p>
<p class="c2">For details on using the error browser, refer to the IC Compiler II Graphical User Interface User Guide.</p>
<p class="c2">This command checks for the following boundary cell placement issues:</p>
<ol class="c5 lst-kix_6yflg7u0rof-0 start" start="1"><li class="c2 c13 li-bullet-0">Missing boundary or corner cells.<br /></li><li class="c2 c13 li-bullet-0">Incorrect boundary or corner cells.<br /></li><li class="c2 c13 li-bullet-0">Incorrect orientation of boundary cells.<br /></li><li class="c2 c13 li-bullet-0">Short rows and incomplete edges.</li></ol>
<p class="c2 c25"></p>
<p class="c2 c25"></p>
<p class="c37">FLOORPLAN &amp; POWERPLAN SCRIPT</p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image38.png" title="" class="native-img"><br /><br /><img alt="" src="/assets/modules/module13/image36.png" title="" class="native-img"></p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image17.png" title="" class="native-img"></p>
<p class="c2 c25"></p>
<p class="c2"><img alt="" src="/assets/modules/module13/image49.png" title="" class="native-img"></p>
<p class="c10"></p>
<p class="c10"></p>`}],a={moduleLayout:`_moduleLayout_19fqd_4`,header:`_header_19fqd_20`,title:`_title_19fqd_25`,subtitle:`_subtitle_19fqd_36`,topicsNav:`_topicsNav_19fqd_45`,navSectionsWrapper:`_navSectionsWrapper_19fqd_58`,slideDown:`_slideDown_19fqd_1`,navSection:`_navSection_19fqd_58`,navTitle:`_navTitle_19fqd_73`,navButtonsGrid:`_navButtonsGrid_19fqd_83`,topicNavBtn:`_topicNavBtn_19fqd_90`,toggleWrapper:`_toggleWrapper_19fqd_116`,toggleBtn:`_toggleBtn_19fqd_122`,toggleIcon:`_toggleIcon_19fqd_150`,toggleCount:`_toggleCount_19fqd_156`,mainContent:`_mainContent_19fqd_167`,contentCard:`_contentCard_19fqd_173`,chapterTitle:`_chapterTitle_19fqd_189`,chapterBody:`_chapterBody_19fqd_200`},o=t(),s=6,c=()=>{let[e,t]=(0,r.useState)(!1),[n,c]=(0,r.useState)(!1),[l,u]=(0,r.useState)(!1),d=e=>{let t=document.getElementById(e);if(t){let e=document.body.getBoundingClientRect().top,n=t.getBoundingClientRect().top-e-100;window.scrollTo({top:n,behavior:`smooth`})}},f=e=>{e.preventDefault()},p=i.slice(0,34),m=i.slice(34,68),h=i.slice(68),g=(e,t,n,r)=>(0,o.jsxs)(`div`,{className:a.navSection,children:[(0,o.jsx)(`h2`,{className:a.navTitle,children:r}),(0,o.jsx)(`div`,{className:a.navButtonsGrid,children:(t?e:e.slice(0,s)).map(e=>(0,o.jsx)(`button`,{onClick:()=>d(e.id),className:a.topicNavBtn,title:e.title,children:e.title},e.id))}),e.length>s&&(0,o.jsx)(`div`,{className:a.toggleWrapper,children:(0,o.jsx)(`button`,{className:a.toggleBtn,onClick:()=>n(!t),children:t?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▲`}),` See Less`]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`span`,{className:a.toggleIcon,children:`▼`}),` See More `,(0,o.jsxs)(`span`,{className:a.toggleCount,children:[`+`,e.length-s]})]})})})]});return(0,o.jsxs)(`div`,{className:a.moduleLayout,onCopy:f,onContextMenu:f,onSelectStart:f,onDragStart:f,children:[(0,o.jsxs)(`div`,{className:a.header,children:[(0,o.jsx)(`h1`,{className:a.title,children:`Module 13 - Floorplan & Power Plan`}),(0,o.jsx)(`p`,{className:a.subtitle,children:`Master floorplanning fundamentals, power planning strategies, MMMC analysis, IC Compiler II architecture, macro placement, blockages, I/O pads, and power grid design.`})]}),(0,o.jsx)(`section`,{className:a.topicsNav,children:(0,o.jsxs)(`div`,{className:a.navSectionsWrapper,children:[g(p,e,t,`Floorplan Concepts`),g(m,n,c,`Power Planning`),g(h,l,u,`MMMC, ICC2 & IO`)]})}),(0,o.jsx)(`main`,{className:a.mainContent,children:i.map(e=>(0,o.jsxs)(`article`,{id:e.id,className:a.contentCard,children:[(0,o.jsx)(`h2`,{className:a.chapterTitle,children:e.title}),(0,o.jsx)(`div`,{className:a.chapterBody,dangerouslySetInnerHTML:{__html:e.html}})]},e.id))})]})};export{c as default};