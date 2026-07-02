export const MODULE21_QUESTIONS = [
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q1",
    "question": "What are the goals of Synthesis ?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">    There are Mainly three goals of synthesis without changing the functionality</p><ol class=\"c20 lst-kix_list_41-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Reduce the area (chip cost reduce)</li><li class=\"c4 li-bullet-0\">Increase performance </li><li class=\"c4 li-bullet-0\">Reduce the power</li></ol><p class=\"c8 c10 c24\"></p><p class=\"c8 c10 c24\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q2",
    "question": "What are the Tech dependent inputs in PNR",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">    There are three main tech depended inputs </p><ol class=\"c20 lst-kix_list_47-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Physical libraries    → format is .lef       ---&gt; given by vendors</li><li class=\"c5 c16 li-bullet-0\">Technology file       → format is .tf         ---&gt; given by fabrication peoples</li><li class=\"c5 c16 li-bullet-0\">TLU+ file                → format is .TLUP  ---&gt; given by fabrication people</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q3",
    "question": "What are the Design dependent inputs in PNR",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">    There are six main design depended inputs </p><ol class=\"c20 lst-kix_list_15-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Logical libraries                     —&gt; format is .lib      ---&gt; given by Vendors</li><li class=\"c5 c16 li-bullet-0\">Netlist                                   ---&gt; format is .v         —&gt; given by Synthesis People</li><li class=\"c5 c16 li-bullet-0\">Synopsys Design Constraints ---&gt; format is .SDC   ---&gt; given by Synthesis People</li><li class=\"c5 c16 li-bullet-0\">MMMC                                 ---&gt; format is .tcl      ---&gt; given by Top level</li><li class=\"c5 c16 li-bullet-0\">UPF                                     ---&gt; format is .upf     ---&gt; given by Top level</li><li class=\"c5 c16 li-bullet-0\">SCAN DEF                            ---&gt; format is .def     ---&gt; given by Synthesis People</li></ol><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q4",
    "question": "What are the types of cells in PNR",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">    There are Four types of PNR cells </p><ol class=\"c20 lst-kix_list_24-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Std cells</li><li class=\"c5 c16 li-bullet-0\">Hard macro</li><li class=\"c5 c16 li-bullet-0\">IO pads</li><li class=\"c5 c16 li-bullet-0\">Physical cells (end cap, welltap, tiecells, Decap cells, Filler cells)</li></ol><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q5",
    "question": "What are the types of IO pads",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_35-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Signal pad </li><li class=\"c4 li-bullet-0\">Power / ground pads</li><li class=\"c4 li-bullet-0\">Filler pads</li><li class=\"c4 li-bullet-0\">Corner pads</li><li class=\"c4 li-bullet-0\">Bond pads</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q6",
    "question": "What is the functionality of IO pads",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">   The purpose of IO pad is Electrostatic discharge and level shifting</p><ol class=\"c20 lst-kix_list_33-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Electro Static Discharge (ESD) is sudden flow of static electricity between two electrically charged objects for a very short duration of time. </li><li class=\"c4 li-bullet-0\">A level shifter is an interfacing circuit which can interface low core voltage to high input- output voltage</li></ol><p class=\"c8 c10 c24\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q7",
    "question": "What is the use of Bound pad",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">A Bound pad is used to connect the circuit on a die to a pin on a packaged chip</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q8",
    "question": "How tool differentiate the stdcell, IOpad and Macro",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Tool understand the stdcell, IOpad and Macro by using class</p><ol class=\"c20 lst-kix_list_14-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Std cells class CORE</li><li class=\"c4 li-bullet-0\">IO pad class PAD</li><li class=\"c4 li-bullet-0\">Hard Macro class BLOCK</li></ol><p class=\"c8 c10 c24\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q9",
    "question": "What is difference between soft and hard macro",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8 c10\"></p><p class=\"c8\">Hard Macro:</p><ol class=\"c20 lst-kix_list_18-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Its examples like SRAM memory Analog Macro like PLL, Digital to Analog, Analog to Digital converters etc</li><li class=\"c4 li-bullet-0\">No change in height and width, No optimization even we cant see internel logic</li><li class=\"c4 li-bullet-0\">Physical info available</li></ol><p class=\"c8 c10 c24\"></p><p class=\"c8\">Soft Macro:</p><ol class=\"c20 lst-kix_list_21-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Soft macro available either netlist or rtl</li><li class=\"c4 li-bullet-0\">We can change the height and width </li><li class=\"c4 li-bullet-0\">No physical info</li><li class=\"c4 li-bullet-0\">Flexible change dimensions</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q10",
    "question": "How tool calculate the rectilinear blocks area",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_57-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Tool calculate the rectangle area by Lower left  and Upper right coordinates</li><li class=\"c4 li-bullet-0\">Tool calculate the rectilinear blocks area by converting diffrent small rectangles then apply same startergy Lower left  and Upper right coordinates to calculate area</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q11",
    "question": "Can we rotated the Macro in 90 or 270 degrees",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Above 90 nm we can rotate  the macro. But in the lower node we can’t because of poly orientation restriction.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q12",
    "question": "Assume you have three types of block 7, 9, 12 Metal layers in 28 nm Technology  which having more performance and why",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">12 Metal layers Design having more Metal  width so  power planning and clock tree have less IR drop compared to 7, 9 Metal layers so 12 having more performance.</p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q13",
    "question": "Which inputs files having resistance and capacitance values",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_28-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Interconnect technology format ITF file or TLU+ file and Technology file</li><li class=\"c4 li-bullet-0\">in Technology file resistance and capacitance values are available but those are not accurate compared to ITF file </li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q14",
    "question": "We have different RC corners im i right, why we have different RC corners",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">While etching the metal we have small variations in higher technology but it has too much impact on lower technology nodes so that's why ITF  file considering encountering etching we have Cbest, Cworst, RCbest, RCworst, Typical RC corners.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q15",
    "question": "How multi cut via increase the performance and yeild.",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_58-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Multi cut via having less IR drop because parallel resistance decreased so performance increased. </li><li class=\"c4 li-bullet-0\">If any one of the via fails then also connection will be present because of the other via but single cut via fails then the net will be disconnected and it will cause chip failure.</li></ol><p class=\"c8 c10 c24\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q16",
    "question": "In which stage normal flop converted into scan flop",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">In synthesis stage we can convert the normal flop to scan flop when we are setting DFT</p><p class=\"c8\">Command : compile -scan [in design compiler tool]</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q17",
    "question": "what is difference between normal flop and scan flop",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Scan flop having  two more  inputs scan input [SI] and scan enable [SE] by using this only we can give the DFT  test vector and test the design [normal flop + mux]</p><p class=\"c8\">Note: refer the below image more understanding</p><p class=\"c8\"><img alt=\"\" src=\"/assets/modules/module21/image3.jpg\" title=\"\" class=\"native-img\" width=\"346.00px\" height=\"278.00px\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q18",
    "question": "what is scan chain where we are used it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Scan chain means the flop Q pin directly connected to other flop SI pin this can be enable by scan enable SE pin this is used for DFT testing </p><p class=\"c8\">Note: refer the below image more understanding</p><p class=\"c8 c10\"></p><p class=\"c8\"><img alt=\"\" src=\"/assets/modules/module21/image5.jpg\" title=\"\" class=\"native-img\" width=\"483.00px\" height=\"237.00px\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q19",
    "question": "what is the formula for core, die and std cell utilization",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8 c10\"></p><p class=\"c8\">Core utilization = {std cell area + Macro area } / Total Core area </p><p class=\"c8\"> </p><p class=\"c8\">Die utilization = {std cell area + Macro area + IO area  } / Total Die area</p><p class=\"c8 c10\"></p><p class=\"c8\">Std cell utilization = Area of std cell / {Core area - Macro area} </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Inputs & Setup",
    "subCategory": "Setup & Inputs Q&A",
    "questionNumber": "Q20",
    "question": "what is the formula for channel spacing",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8 c10\"></p><p class=\"c8\">Spacing = {no.of pins X pitch of the higher metal layer } / {available metal layer / 2}</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q21",
    "question": "How cell driving strength increase",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">The driving strength of the cells increase fingering  </p><p class=\"c8 c10\"></p><p class=\"c8\">  Let us understand fingering by comparing it with a real life scenario. Let us say you have a tap which draws out water. How can you make the tap pull out more water?? It is by increasing the diameter of the tap. More is the diameter more is the current that goes out </p><p class=\"c8 c10\"></p><p class=\"c8\">Increasing the diameter of the tap is analogous to increasing the height or length of the transistor region so as to deliver more current.</p><p class=\"c8 c10\"></p><p class=\"c8\">                     Now i give a constraint that you cannot increase the diameter of the pipe to draw out more water. So what do you do to get more water???. Simple. Put more pipes in parallel so as to increase the water flow.</p><p class=\"c8 c10\"></p><p class=\"c8\">  This is exactly what we are doing in fingering. We keep the transistor of fixed size so that the height remains constant but then we put more transistors in parallel so as to deliver more current to the load.</p><p class=\"c8 c10\"></p><p class=\"c8\">                       In this case we join the sources and drains in chained fashion so that they act like taps in parallel. In general when we say 2x and 4x drive strength buffers what exactly it means is that it could deliver 8 times more current than the normal 1x buffer by employing 8 fingers or even more.</p><p class=\"c8 c10\"></p><p class=\"c8\"> Another advantage of fingering is that resistance reduces drastically by fingering. Let us say you have a resistance of R from the given figure. Now when fingering is done, all these resistances come in parallel hence, the resistance reduces by a factor of N. This is another remarkable advantage of doing fingering.</p><p class=\"c8 c10\"></p><p class=\"c8\"><img alt=\"\" src=\"/assets/modules/module21/image4.jpg\" title=\"\" class=\"native-img\" width=\"320.00px\" height=\"232.00px\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q22",
    "question": "How Fabrication peoples created  different types of Vt cells like HVT, LVT and SVT ect",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">There are two techniques to create the different  vt cells </p><ol class=\"c20 lst-kix_list_53-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">If gate oxide thickness increase the cell act like HVT if gate oxide thickness decrease the cell act as like LVT based on gate oxide thickness they will create different vt cells</li><li class=\"c4 li-bullet-0\">Based on Doping concentration also they will created different vt cells if Doping concentration is high at diffusion the cell vt decreased {acts like LVT} if Doping concentration low at diffusion the cell vt increased {acts like HVT}</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q23",
    "question": "what is clock gating why we are using clock gating what are the types of clock gating",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Clock gating is a power-saving feature in semiconductor microelectronics that enables switching off circuits. Many electronic devices use clock gating to turn off buses, controllers, bridges and parts of processors, to reduce dynamic power consumption.</p><p class=\"c8 c10\"></p><p class=\"c8\">There are two types of clock gating styles available. They are: </p><p class=\"c8\">1) Latch-based clock gating </p><p class=\"c8\">2) Latch-free clock gating. </p><p class=\"c8 c10\"></p><p class=\"c8\">Latch free clock gating or AND, OR based clock gating : The latch-free clock gating style uses a simple AND or OR gate (depending on the edge on which flip-flops are triggered). Here if the enable signal goes inactive in between the clock pulse or if it multiple times then gated clock output either can terminate prematurely or generate multiple clock pulses. This restriction makes the latch-free clock gating style inappropriate for our single-clock flip-flop based design.</p><p class=\"c8 c10\"></p><p class=\"c8\"><img alt=\"\" src=\"/assets/modules/module21/image7.jpg\" title=\"\" class=\"native-img\" width=\"624.00px\" height=\"390.67px\"></p><p class=\"c8 c10\"></p><p class=\"c8\">Latch based clock gating : The latch-based clock gating style adds a level-sensitive latch to the design to hold the enable signal from the active edge of the clock until the inactive edge of the clock. Since the latch captures the state of the enable signal and holds it until the complete clock pulse has been generated, the enable signal need only be stable around the rising edge of the clock, just as in the traditional ungated design style</p><p class=\"c8 c10\"></p><p class=\"c8\"><img alt=\"\" src=\"/assets/modules/module21/image6.jpg\" title=\"\" class=\"native-img\" width=\"574.52px\" height=\"218.39px\"></p><p class=\"c8 c10\"></p><p class=\"c8\">Specific clock gating cells are required in the library to be utilized by the synthesis tools. Availability of clock gating cells and automatic insertion by the EDA tools makes it a simpler method of low power technique. Advantage of this method is that clock gating does not require modifications to RTL description.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q24",
    "question": "What is difference between AND,OR and ICG based clock Gating",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">AND,OR based clock gating produce the glitch but ICG based clock gating not produce the glitch  for more information check above answer</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q25",
    "question": "What is pad limited and Core limited  Design how to overcome it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Pad limited Design : A pad limited design is when the die size is determined by the number of pads rather than by the size of the core. It occurs in cases when the number of pads is relatively high and therefore requires more silicon space</p><p class=\"c8 c10\"></p><p class=\"c8\"><img alt=\"\" src=\"/assets/modules/module21/image9.jpg\" title=\"\" class=\"native-img\" width=\"573.50px\" height=\"164.27px\"></p><p class=\"c8\">To improve core utilization in pad limited die, we used IO staggering.</p><p class=\"c8 c10\"></p><p class=\"c8\">Core limited Design : The area of the Die is decided based on core logic</p><p class=\"c8\">Note:  pad limited and Core limited terms related to chip level not block level.</p><p class=\"c8\">For understanding please refer to the image below.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q26",
    "question": "What is difference between IO PADS and IO PINS",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">IO PADS related to chip level it have both Electrostatic Discharge(ESD) and level shifting but IO PINS related to block level  doesn't have this thing that's why we are using  level shifter cells in block level</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q27",
    "question": "What is difference between IO PIN and terminal",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">There is no difference, physical representation of the pin we call the terminal.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q28",
    "question": "What are the ways to place IO pins in design",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">In ICC2 tool we can place IO pins in three ways </p><ol class=\"c20 lst-kix_list_25-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Using pin guide → create_pin_guid and place_pin -self is the command</li><li class=\"c4 li-bullet-0\">Using block pin constraint → set_block_pin_constraints, set_individual_pin_constraints and place_pin -self is the command </li><li class=\"c4 li-bullet-0\">Using DEF file from full chip → jest source the or read the def file </li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q29",
    "question": "what are the guidelines for pin placement",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_43-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">The pins that are planned to place on top and bottom boundary need to be in vertical metal layers</li><li class=\"c4 li-bullet-0\">The pins that are planned to place on left and right boundary need to be in horizontal layers </li><li class=\"c4 li-bullet-0\">The terminal has to be aligned to the track</li><li class=\"c4 li-bullet-0\">Use pin depth as minimum length to avoid min area violation</li><li class=\"c4 li-bullet-0\">The terminal doesn't cross the offset region</li><li class=\"c4 li-bullet-0\">If you have sufficient track area, try to place with interleaving to overcome congestion </li></ol><p class=\"c8 c10 c24\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q30",
    "question": "Why we need MMMC file",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">MMMC analysis is very important to perform, so that the IC can work on different modes of PVT (Process, Voltage, and Temperature). The variations in PVT can insert extra delay in the circuits and due to this delay timing constraints may not be met. Thus the IC must be robustly checked for every process corners</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q31",
    "question": "In which input file having high fanout information",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">No input  file have high fanout information that's why we need to constrain  max_fanout </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q32",
    "question": "In which file noise margin information contains?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Timing library contains noise margin information</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q33",
    "question": "In which file cross talk information contains?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">SPEF file have cross talk information</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q34",
    "question": "what are the Macro guidelines to place in the floor plan?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_40-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Macro should not be place center of core region it should place boundary of core region</li><li class=\"c4 li-bullet-0\">Macro pins need to facing towards std cell region</li><li class=\"c4 li-bullet-0\">Macro channel has to be create when placing multiple macros next to each other</li><li class=\"c4 li-bullet-0\">Need to avoid criss cross connection</li><li class=\"c4 li-bullet-0\">Place the macro which are interact with IO pins those macro near to IO pins</li><li class=\"c4 li-bullet-0\">Macro placement should not block the accessibility of IO pins</li><li class=\"c4 li-bullet-0\">Try to place Macro belongs to same hierarchy as a group do not split the group as it may lead to timing issues  due to std cell separation</li><li class=\"c4 li-bullet-0\">Std cell region need to continuous / avoid trap pocket</li></ol></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q35",
    "question": "what are the types of blockage we used and why?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Blockages used in Physical Design mainly for two purposes, Placement and Routing.</p><p class=\"c8 c10\"></p><p class=\"c8\">Placement Blockages: There are mainly three types.</p><ol class=\"c20 lst-kix_list_5-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Hard Blockage- No cell is allowed to be placed in a specified region.</li><li class=\"c4 li-bullet-0\">Soft Blockage- Only buffers/inverters needed for optimization are allowed to be placed in specified regions.</li><li class=\"c4 li-bullet-0\">Partial Blockage- Any type of cells are allowed to place but only for defined areas of specific regions. (like 60% of specified area)</li></ol><p class=\"c8 c10\"></p><p class=\"c8\">Routing Blockages: There are mainly two types.</p><p class=\"c8\">Hard Blockage- Any type of net is not allowed to route in specified regions.</p><p class=\"c8\">Signal Blockage- Any type of data and clock signal net is not allowed to route in a specified region, but power net is allowed to route.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q36",
    "question": "what is keepout margin or halo?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Keep-out margin: it is a region around the boundary of fixed cells or macro  in a block in which no other cells are placed. The width of the keep-out margin on each side of the fixed cell or macro  can be the same or different.</p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q37",
    "question": "what is the difference between keepout margin and blockage?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">There is no difference between keepout margin and blockage. Both are same but the only difference is keepout margin move along with the std cell or macro but blockage will  not move along with the std cell or macro.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q38",
    "question": "After loading Design what are the sanity checks we have to do and what do you observe from that?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Check_design -all → it gives all design related information</p><p class=\"c8\">Check_timing → any constraint related and timing related warning and errors it gives</p><p class=\"c8\">Few more commands like check_netlist, check_lib.</p><p class=\"c8\">Note : above all commands related to ICC2 tool</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q39",
    "question": "why we are using Boundary or End cap cells . if we place this cells after placement what happened",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c8\">The end cap cells are called a physical-only cells are placed in the design because of the following reasons:</p><ol class=\"c20 lst-kix_list_42-0 start\" start=\"1\"><li class=\"c9 c8 c24 li-bullet-0\">To reduce well proximity effect {WPE means vt variation of cell because of n well not present in either of side}</li><li class=\"c9 c8 c24 li-bullet-0\">To protect the gate of a standard cell placed near the boundary from damage during manufacturing.</li><li class=\"c9 c8 c24 li-bullet-0\">To avoid the base layer DRC and terminate the Nwell continuity  (Nwell and Implant layer) at the boundary.</li><li class=\"c9 c8 c24 li-bullet-0\">To make the proper alignment with the other block.</li><li class=\"c9 c8 c24 li-bullet-0\">Some standard cell libraries have end cap cells which serve as de-cap cells also.</li></ol><p class=\"c9 c8\">If we place end cap cell after std cell placement there is no use because already std cell will site near to boundary </p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q40",
    "question": "Why do we use Well Tap and Tie cells if we are not using  what will  happen?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_61-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Well tap cells (or Tap cells) are used to prevent the latch-up issue in the CMOS design. Well tap cells connect the Nwell to VDD and p-substrate to VSS in order to prevent the latch-up issue. There is no logical function in a well tap cell rather than proving a taping to N-well and p-substrate therefore a well tap cell is called a physical-only cell.</li><li class=\"c4 li-bullet-0\">The tie cell is a standard cell, designed specially to provide the high or low signal to the input (gate terminal) of any logic gate. The high/low signal can not be applied directly to the gate of any transistors because of some limitations of transistors, especially in the lower node.In the lower technology node, the gate oxide under the poly gate is a very thin and the most sensitive part of the transistor. We need to take special care of this thin gate oxide while fabrication (associated issue is antenna effect) as well as in operation too. It has been observed that if the polysilicon gate connects directly to VDD or VSS for a constant high/low input signal, and in case any surge/glitch arises in the supply voltage it results in damage of sensitive gate oxide. To avoid the damages mentioned above, we avoid the direct connection from VDD or VSS to the input of any logic gates. A tie cell is used to connect the input of any logic to the VDD or VSS.</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q41",
    "question": "How can you estimate the power for your design?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Power Calculations</p><p class=\"c8\">         </p><p class=\"c8\">   Number Of The Core Power Pad Required For Each Side Of Chip=(Total Core Power)/{(Number Of Side)*(Core Voltage)*Maximum Allowable Current For a I/O Pad)}</p><p class=\"c41 c10\"></p><p class=\"c8\"> Core Current(mA)=(CORE Power)/(Core Voltage )</p><p class=\"c10 c41\"></p><p class=\"c8\"> Core P/G Ring Width=(Total Core Current)/{(N0.Of.Sides)*(Maximum Current Density Of The Metal Layer Used For Pg Ring)}</p><p class=\"c8\">                     </p><p class=\"c8\">Total Current =Total Power Consumption Of Chip(P)/Voltage(V)</p><p class=\"c8\">        </p><p class=\"c8\"> No.Of Power Pads(Npads) = Itotal/Ip</p><p class=\"c41 c10\"></p><p class=\"c8\"> No.Of Power Pins=Itotal/Ip</p><p class=\"c8\">                 </p><p class=\"c8\">      Where,</p><p class=\"c8\">       Itotal =TOTAL Current</p><p class=\"c8\">       Ip Obtained From Io Library Specification.</p><p class=\"c8\">                        </p><p class=\"c8\"> Total Power=Static Power+Dynamic Power</p><p class=\"c8\">                       =Leakage Power+[Internal Power+Ext Switching Power]</p><p class=\"c8\">                       =Leakage Power+[{Short Ckt+Int Power}]+Ext Switching Power]</p><p class=\"c8\">                       =Leakage Power+[{(Vdd*Isc)+(C*V*V*F)+(1/2*C*V*V*F)]</p><p class=\"c8\">Note : some cases we are neglected int power </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q42",
    "question": "What are the goals of Power plan",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Power planning is typically part of the floorplanning stage, in which a power grid network is created to distribute the power uniformly to each part of the chip.</p><p class=\"c8\">• Power planning means to provide power to the every macros and standard cells and all other cells are present in the design.</p><p class=\"c8\">• Power planning is also called Pre-routing as the Power Network Synthesis (PNS) is done before actual signal routing and clock routing.</p><p class=\"c8\">Power ring is designed around the core.</p><p class=\"c8\">• Power rings contain both VDD and VSS rings. After the ring is placed a power is designed such that power reaches all the cells easily, power mesh is nothing but horizontal and vertical lines on the chip.</p><p class=\"c8\">During power planning, the VDD and VSS rails also have to be defined.</p><p class=\"c8\">Objective of power planning is to meet the IR drop budget.</p><p class=\"c8\">• Power planning involves- calculating number of power pins required, number of rings and straps, width of rings and straps and IR drop.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q43",
    "question": "what are the techniques used to reduce IR drop?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Method to reduce the voltage IR drop </p><ol class=\"c20 lst-kix_list_29-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Reducing the wire resistance. </li><li class=\"c4 li-bullet-0\">Increase the number of Vdd and Vss pads in the chip to reduce the current consumption for each pair of Vdd and Vss pads. </li><li class=\"c4 li-bullet-0\">Reducing the current consumption (Iavg) of logic gates.</li><li class=\"c4 li-bullet-0\">Add de-cap cells near ir prone cells (it will provide constant supply).</li><li class=\"c4 li-bullet-0\">Move the particular cells near to stripe about some microns.(3 to 5 microns)</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q44",
    "question": "what is formula for dynamic and static power",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\"> Total Power=Static Power+Dynamic Power</p><p class=\"c8\">  Static Power = Vleakage * Ileakage</p><p class=\"c8\">  Dynamic Power  = Short Ckt + Ext Switching Power </p><p class=\"c8\">  Short Ckt  = Vdd*Isc    </p><p class=\"c8\">  Ext Switching Power = 1/2*C*V*V*F  </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q45",
    "question": "What is difference between flip chip and wire bound design",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c8\">Flip chip means “flipped over the circuit board” facing downward. Instead of facing the upside. So flip chips allow for a large number of <a class=\"c32\" href=\"https://www.google.com/url?q=https://siliconvlsi.com/how-to-calculate-interconnect-wire-resistance/&amp;sa=D&amp;source=editors&amp;ust=1782057176153203&amp;usg=AOvVaw1JTEsAWan59Qtsv_gOrGHM\">interconnects</a> with shorter distances than wire, which greatly reduces the distance and area. The process of attaching a semiconductor die to a substrate or carrier with the bond pad facing down is referred to as a flip chip.</p><p class=\"c9 c8\">On the die bond pad, there is a conductive bump that is used to make the electrical connection. The stand-off space between the die and substrate is normally filled with a non-conductive adhesive known as underfill once the die is connected. Between the die and carrier, the underfill relieves tension, increases robustness, and shields the component from any moisture <a class=\"c32\" href=\"https://www.google.com/url?q=https://en.wikipedia.org/wiki/Infiltration&amp;sa=D&amp;source=editors&amp;ust=1782057176154415&amp;usg=AOvVaw031yecLPCasIdWnGlVO4ft\">infiltration</a>.</p><p class=\"c8\">Comparing flip-chip bonding to other connectivity techniques can provide a variety of benefits. Since the entire region of the die can be used for connections, flip chip bonding can increase the number of I/Os. The speed of a device can be increased since the connectivity paths are shorter than they would be with wire bonds. Additionally, the removal of wire bond loops results in a reduced form factor. </p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q46",
    "question": "Why are we using Decap cells and filler cells?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">De-Cap cells are basically a charge storing device made of the capacitors and used to support the instant current requirement in the power delivery network. There are various reasons for the instant large current requirement in the circuit and if there are no adequate measures taken to handle this requirement, power droop or ground bounce may occur. These power droop or ground bounce will affect the constant power supply and ultimately the delay of standard cells may get affected. To support the power delivery network from such sudden power requirements, Decap cells are inserted throughout the design     </p><p class=\"c8\"> </p><p class=\"c8\">Filler cells primarily are non-functional cells used to continue the VDD and VSS rails. Filler cells are used to establish the continuity of the N- well and the implant layers on the standard cell rows. The use of Filler Cells is to reduce the DRC Violations created by the base(N-Well, PPlus &amp; NPlus) layers.     </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q47",
    "question": "What are the Floor plan  sanity checks?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_26-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">check _pin_placement → check ports are a line with track  or not and also is any missing pins, pin shorts, technology spacing problems</li><li class=\"c4 li-bullet-0\">check_boundary_cells → any boundary cell related violation</li><li class=\"c4 li-bullet-0\">check_pg_drc → check for spacing , width and via enclosure related violations on power and ground nets</li><li class=\"c4 li-bullet-0\">check_pg_missing_vias → to report missing vias at insertion point</li><li class=\"c4 li-bullet-0\">check_pg-connectivity → to report shorts and opens related to planets</li></ol><p class=\"c8\">Note: above commands related to ICC2 tool </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q48",
    "question": "can we do macro placement after power plan?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">No we can't because its created drc violations related to power plan </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q49",
    "question": "can we do a power plan after routing?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">No, because if you preserve the top metal layer for the powerplan also if it is too congested then there is a chance proper vias are not to be dropped. It causes more IR drop not only this if you do not preserve the top metals then may see more congestion. </p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q50",
    "question": "What is Spare cells? Why are we using Spare cells?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Spare cells generally consist of a group of standard cells mainly inverter, buffer, nand, nor, and, or, exor, mux, flip flops and maybe some specially designed configurable spare cells. Ideally, spare cells do not perform any logical operation in the design and act as a filler cell only.</p><p class=\"c8 c10\"></p><p class=\"c8\">The inputs of spare cells are tied either VDD or VSS through the tie cell and the output is left floating. Input can not be left floating as a floating input will be prone to get affected by noise and this could result in unnecessary switching in spare cells which leads to extra power dissipation.</p><p class=\"c8 c10\"></p><p class=\"c8\">Spare cells reduce the violation or enable us to modify/improve the functionality of a chip with minimal changes in the mask. We can use already placed spare cells from the nearby location and just need to modify the metal interconnect. There is no need to make any changes in the base layers. Using metal ECO we can modify the interconnect metal connection and make use of spare cells. We only need to change some metal masks, not the base layer masks.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q51",
    "question": "In which  stage we define spare cells?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Mostly spare cells are defined in the floor plan stage only in some cases we can define in the routing stage also.</p><p class=\"c8\">  </p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q52",
    "question": "What is the difference between Spare cells in floor plan and routing stage?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">If you define Spare cells in floor plan that will be in clustered /group format and if flop is present in Spare cells it clock pin  would be balanced in cts stage </p><p class=\"c8 c10\"></p><p class=\"c8\">If you define Spare cell in routing it will not be clustered format and its flop clock pin also not balanced, that is the reason we preferred to place Spare cells in the floor plan stage. </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Floorplan & Powerplan",
    "subCategory": "Floorplanning & Powerplanning Q&A",
    "questionNumber": "Q53",
    "question": "what are the ways to place std cells in the core region?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">In ICC2 there are two ways to place std cells in core reason one is create_floor plan command it just place the std cell in core reason no legalize and no optimize the other is place_opt command it optimize as well as legalize also</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q54",
    "question": "what are the five stages of place_opt command and explain",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">The five stages of place_opt commands is</p><ol class=\"c20 lst-kix_list_6-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">initial_place</li><li class=\"c4 li-bullet-0\">initial_drc</li><li class=\"c4 li-bullet-0\">initial_opto</li><li class=\"c4 li-bullet-0\">final_place</li><li class=\"c4 li-bullet-0\">final_opto</li></ol><p class=\"c8 c10\"></p><p class=\"c8\">Initial_place do cores placement of cells, cells are not legally placed and there can be overlap and it doesn't have any optimization of cells</p><p class=\"c8\">Initial_drc  do high fanout net synthesis HFNS → tool address max tran and max cap on high fanout nets all high fanout nets all are buffered</p><p class=\"c8\">initial_opto this is the first stage of optimization to improve timing QOR fix setup, Max tran and Max cap fixes on all nets</p><p class=\"c8\">final_place do legalize the placement of all cells {no overlap,}</p><p class=\"c8\">final_opto do the incremental optimization to fix the left over new violation</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q55",
    "question": "What is global routing? Why are we doing global routing?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_38-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Whole region is divided in to an array  of rectangular subregion called GRC cell or bin  each of which may accommodated tens of routing tracks in each GRC cells </li><li class=\"c4 li-bullet-0\">Global routing is preferred to estimating the interconnect parasitics and Routing congestion MAP</li><li class=\"c4 li-bullet-0\">Height of GRC cells is 2 times of std cells row height </li><li class=\"c4 li-bullet-0\">Each GRC having horizontal and vertical tracks </li><li class=\"c4 li-bullet-0\">If demand is more than the  supply or capacity its called overflow</li><li class=\"c4 li-bullet-0\">If demand is less than the supply or capacity its called underflow</li><li class=\"c4 li-bullet-0\">Overflow cause the congestion</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q56",
    "question": "what are the goals of placement?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">There are mainly three goals of placement </p><ol class=\"c20 lst-kix_list_54-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Timing aware</li><li class=\"c4 li-bullet-0\">Routing aware</li><li class=\"c4 li-bullet-0\">Power aware</li></ol><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q57",
    "question": "what are the goals of floor plan?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c25 c46\">Objectives of Floorplan</p><ul class=\"c20 lst-kix_list_55-0 start\"><li class=\"c27 c4 li-bullet-0\">minimize the area.</li><li class=\"c27 c4 li-bullet-0\">minimize the Timing.</li><li class=\"c27 c4 li-bullet-0\">Reduce the wire length.</li><li class=\"c27 c4 li-bullet-0\">Making routing easy.</li><li class=\"c27 c4 li-bullet-0\">Reduce IR drop.</li></ul></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q58",
    "question": "What are the reason for congestion how to fix the congestion",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_20-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Pin density  : in a small area having more pins are called pin density this pin dencity create congestion to fix congestion due to pin density apply cell padding or keepout margin </li><li class=\"c4 li-bullet-0\">Insufficient macro channel spacing : because of it cause congestion to fix this increase the channel spacing</li><li class=\"c4 li-bullet-0\">Rectilinear block corner : this one also create congestion to fix the create placement blockage</li><li class=\"c4 li-bullet-0\">At macro corners: this one also create the congestion to overcome this create placement blockage</li></ol></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q59",
    "question": "How can you control the std cell placement?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_32-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Magnetic placement : pulling the std cell logic towards the fixed object (eg: IO ports and macro pins can be assumed as fixed object ) command : magnetic_placement </li><li class=\"c4 li-bullet-0\">Bounds or place bounds { in innovus regions } : crate the bound related logic with  or without coordinates  command : create_bound</li><li class=\"c4 li-bullet-0\">Placement blockage</li></ol><p class=\"c8 c10 c24\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q60",
    "question": "What are the types of bounds?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">There are two types of bounds move bound and group bound</p><p class=\"c8\">Move bounds means with definite  coordinate if we created bound that's we called move bounds this are three types</p><ol class=\"c20 lst-kix_list_56-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Soft move bound : In optimization some cells are go out from the bound to meet timing QOR other logic cell comes and site in that bound</li><li class=\"c4 li-bullet-0\">Hard move  bound : The cells should not move out and other cells are allowed in that bound</li><li class=\"c4 li-bullet-0\">Exclusiv move e bound : The cells not move out and other cells not allowed in that bound</li></ol><p class=\"c8\">Group bounds means without any location and  coordinations group bounds are two types  soft and hard group bounds</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q61",
    "question": "If timing is bad in your design after placement stage then what kind of technique do you use to overcome?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">The timing will be bad in placement stage because of two reason </p><ol class=\"c20 lst-kix_list_23-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Bad placement : if timing violation comes because of bad macro placement change the macro placement </li><li class=\"c4 li-bullet-0\">Too many buffers are added : then check any constraint related problem </li></ol><p class=\"c8\">To fix timing violations in placement stage </p><ol class=\"c20 lst-kix_list_60-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Change the placement timing effort to high</li><li class=\"c4 li-bullet-0\">Create group paths and give weightage to high frequency clock</li><li class=\"c4 li-bullet-0\">Create a bounds if the violation are not fix by above solution</li></ol><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q62",
    "question": "Can we do optimization in the placement stage without cell swapping, upsizing and  adding buffers?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">No without swapping upsizing and  adding buffers we can't to optimization we can reduce net length but that's not impact much </p><p class=\"c8 c10\"></p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q63",
    "question": "Why are we checking the setup only in the placement stage? Why are we not checking hold ?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">    Before cts we don't know the  skew tool is working on local skew which impacts timing. The local skew depends on launch and capture delay; this delay depends on placement of the flop. If skew is more positive, good for setup but bad for hold timing. For ideal clock  skew is zero it is pessimistic for setup timing analysis not for hold time analysis that's why we check only  setup in placement stage.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q64",
    "question": "Why are we doing IO buffering if we are not doing IO buffering what happened?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">To maintain good transition in our block we will  do IO buffering if we are not do IO buffering the chase of bad transition it impact the cell delays cause the setup timing violations </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q65",
    "question": "What is the pipeline concept we are using?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">If more logic is there between into reg or reg to out there is difficult to meet timing then we add the register to meet timing</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q66",
    "question": "What is a congestion hotspot?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">Any region with too many GRC overflows  that region we called the congestion hotspot.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q67",
    "question": "What are the sanity checks you did in the placement stage and why?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">report_timing → check setup timing</p><p class=\"c8\">report_qor → check setup, max tran , max cap in different scenario</p><p class=\"c8\">Analyze_design_violation → To clearly check max tran , max cap</p><p class=\"c8\">Report_congestion  → to check congestion in design</p><p class=\"c8\">Report_utilization → how much core utilized in placement we can observe</p><p class=\"c8\">Report_desgn → complete design related information will report</p><p class=\"c8\">Check_legality → what ever placed cells are legally placed or not we have to check </p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q68",
    "question": "why we have to do a scan chain reorder in the placement stage if not what happened?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_7-0 start\" start=\"1\"><li class=\"c4 li-bullet-0\">Scan stitching will happened during synthesis stage based on the connectivity of flop </li><li class=\"c4 li-bullet-0\">But during the actual placement the flop may not be placed close to each other. Due to this there are chances of increase in overall routing length of scan chain related nets.</li><li class=\"c4 li-bullet-0\">This may lead to congestion in routing critical design</li><li class=\"c4 li-bullet-0\">To improve routability, we can enable scan reordering which will try to reduce route length as the reordering of scan chain will be based on physical location of flops (NOTE:To enable scan reordering SCAN DEF is must)</li></ol></div>"
  },
  {
    "category": "Placement",
    "subCategory": "Placement Optimization Q&A",
    "questionNumber": "Q69",
    "question": "You don't have any pin & cell density and macro placement also  good still your getting congestion what would be the reason?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">If above mentioned all are clean still your getting congestion means the maximum signal routing will set less layer (example your design have 9 metal layers but if maximum routing layer set as 3 then you definitely see congestion) </p><p class=\"c8 c10\"></p><p class=\"c8\">To overcome this change maximum routing layer (ICC2 command : set_ignor_layer)</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q70",
    "question": "What are the types of CTS",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">There are two types of CTS one is balanced CTS  and unbalanced CTS again balanced CTS is two types OCV aware CTS and without OCV CTS again OCV aware CTS is two types H tree and clock spine</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q71",
    "question": "Why we are building CTS after placement only?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">To build CTS we need fixed flop location to get fixed flop location after placement only during placement also flops are moved to final place only those are fixed that is the main reason we are building CTS after placement only.</p><p class=\"c8 c10\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q72",
    "question": "What is the difference between CPPR and CRPR?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">CPPR is caused mainly by OCV fluctuations, whereas CRPR is an architectural artifact.Many times your chip is overdesigned due to undue pessimism in timing calculations. Pessimism in timing analysis makes it difficult for designs to close timing and it is imperative that analysis is not overly pessimistic. There is a clock path related to pessimism observed in timing calculated in on-chip-variation mode, and EDA tools have the capability to automatically remove the pessimism while analysis.</p><p class=\"c5\"><img alt=\"\" src=\"/assets/modules/module21/image8.png\" title=\"\" class=\"native-img\" width=\"587.50px\" height=\"270.21px\"></p><p class=\"c1\"></p><p class=\"c5\">Common Path Pessimism Removal (CPPR) A timing path consists of launch and capture paths. The launch path has further components – the launch clock path and the data path.In the below circuit snippet, the launch path is c1-&gt;c2-&gt;c3 -&gt; CP-to-Q of FF1 -&gt; c5 -&gt; FF2/DThe capture path is c1-&gt;c2-&gt;c4-&gt;FF2/CP late and early derates are set for cells and nets while doing timing analysis in on-chip-variation mode. For setup analysis, STA tool does late check for launch clock path and the data path, and early check for the capture clock path. However, part of both capture and launch clock paths are the same, till node n1. In the image given, numbers in red denote the max delays(late delay numbers) and numbers in green are min delays(early delay numbers). Let us assume the net delays are included in the numbers.</p><p class=\"c5\">For setup analysis, the launch clock path delay is:<br />`c1-&gt;c2-&gt;c3 -&gt;FF1/CP`<br />`1ns+1ns+1ns+ = 3ns`<br />The capture clock path delay is<br />`c1-&gt;c2-&gt;c4-&gt;FF2/CP`<br />`0.8ns+0.8ns+0.8ns = 2.4ns`</p><p class=\"c1\"></p><p class=\"c5\">However, part of the clock paths is common, till node n1. It is not realistic that these have two different delays for the same analysis. Using the late and early timing numbers for the common path creates unwanted pessimism in timing analysis leading to difficulties in timing closure or overdesign. Hence removal of this pessimism is necessary.<br />For the example noted above we can see a “CPPR adjustment” of 0.4, i.e. the skew between the clock paths will be 0.2ns, instead of 0.6ns.<br />`+ CPPR Adjustment 0.4`</p><p class=\"c1\"></p><p class=\"c5\">Different PD and STA tools have various attributes to selectively enable clock path pessimism removal.</p><p class=\"c5\"><img alt=\"\" src=\"/assets/modules/module21/image10.png\" title=\"\" class=\"native-img\" width=\"502.50px\" height=\"219.73px\"></p><p class=\"c5\">Clock Reconvergence Pessimism some case clocks reconverge after taking different paths. In the circuit given below, the clock splits into two different combinational logic before converging through mux m1.The worst case analysis will have the launch clock path through c3-&gt;c4-&gt;m1 whereas the capture clock path through c1-&gt;m1-&gt;c5. This is a possible scenario since the launch and capture are with respect to different clock edges and the mux select could change. In that case, only common path pessimism should be removed. i.e the common elements in the clock paths shouldn’t have different timing numbers. However, if this is not a possibility by design, reconvergence pessimism should be also removed so as to avoid the over design. In hold check, since the timing check is at the same clock edge, this pessimism should always be removed in the analysis.The clock convergent point in m1/Y.<br />Launch clock till convergence:<br />`c3-&gt;c4-&gt;m1 `<br />`1ns+1ns+1ns = 3ns`</p><p class=\"c5\">Capture clock till m1/Y:<br />`c1-&gt;m1`<br />`0.8ns+0.8ns = 1.6ns`</p><p class=\"c5\">Clock reconvergence pessimism: 1.4ns</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q73",
    "question": "On which bases you will say your skew is good?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">My skew will good or bad i will decided based on the my clock period (mostly we consider less than 10% clock period value  is a good skew )</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q74",
    "question": "Consider you have two designs one have more skew and less latency one have less skew and more latency which one you consider and why?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">To answer this kind of questions we need to consider design characteristics like design is timing critical or power critical</p><p class=\"c9 c1\"></p><p class=\"c9 c5\">If design is timing critical then we consider bad skew with good latency we can't meet the timing in this condition i will choose the design with good skew with bad latency </p><p class=\"c9 c1\"></p><p class=\"c9 c5\">If design is power critical then we consider good skew with bad latency then my power consumption is too high i can't meet power requirement in this condition i will choose the design with bad skew but good latency </p><p class=\"c9 c1\"></p><p class=\"c9 c5\">Generally this kind of question they will ask for how your critical thinking you're thinking in all scenarios are not they check that's it.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q75",
    "question": "My skew is Zero is good or bad ?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">If my skew is zero good with respect to timing point of view but bad with respect to power point of view because all flops switch at a time my dynamic power consumption is too high it may damage the power routing also thats the main reason we are not going with zero skew we have to maintain some target.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q76",
    "question": "what are the types of skews and tool is work on which skew?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Skew means the delta difference between clock arriving  latencies of two flops there are two types of skew local and global skew</p><p class=\"c9 c5\">Local skew : The delta difference between clock arriving  latencies of capture and launch flop is called local skew tool work on local skew</p><p class=\"c9 c5\">Global skew: The delta difference between clock arriving  latencies of maximum path in design to the minimum path in design is called global skew</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q77",
    "question": "Consider I have two designs, one has more latency one has less latency which one you choose and why?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Less latency design, I will choose because based on latency only my buffers levels are added if latency high means too many buffers added in  my design for those buffer power consumption and area also high so we have to consider less latency design only.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q78",
    "question": "On which reference cts will be built?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Based on sink pin the clock will be build there are three types of pins </p><p class=\"c9 c5\">Sink pin : all flop or macro cp pins are sink pins here clock propagation stop and consider for balancing</p><p class=\"c9 c5\">Through pin : This is  flop cp pin only but Q pin is connected to other flop cp pin not consider for balancing or combinational cell output is connected to cp pin also comes under  through pin.</p><p class=\"c9 c5\">Ignore pin: D pin, Reset and set pins are comes under ignore pins  not consider for balancing.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q79",
    "question": "If im not define clock can my CTS build or not?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Yes CTS will build  tool will consider default frequency and it will build but it should not meet timing with actual frequency.</p><p class=\"c9 c5\">We are defining clock  in design to consider this based on build the clock it is like more pessimistic if we are define also it build but we can't guarantee it will work.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q80",
    "question": "What is inter clock balancing",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">If a clock group is balancing with another clock group if a timing path is present in between them then we call interclock balancing.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q81",
    "question": "What is useful skew how it is help for timing",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_3-0 start\" start=\"1\"><li class=\"c9 c5 c24 li-bullet-0\">Using Skew to address setup or hold violation is called the useful skew means we are playing with launch or capture clock path to meet timing</li><li class=\"c9 c5 c24 li-bullet-0\">With respect to start point the positive slack is more then only we introduce value this all process tool do automatically by using CCD/CCOPT (concurrent clock optimization ) it automatic algorithm</li></ol><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q82",
    "question": "Flop having setup and hold value im i right are those values constant or it can change",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">No those values are not constant those are depend on data and clock transition for better understanding refer  below image</p><p class=\"c9 c5\"><img alt=\"\" src=\"/assets/modules/module21/image1.png\" title=\"\" class=\"native-img\" width=\"195.50px\" height=\"150.03px\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q83",
    "question": "Are the flop setup and hold values negative",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c21 c5\">Setup and Hold times in digital circuit design are typically specified as non-negative values. The setup time refers to the minimum amount of time before the clock edge at which the input data must be stable and available for the correct operation of the circuit. The hold time refers to the minimum amount of time after the clock edge during which the input data must remain stable.</p><p class=\"c21 c5\">However, in some cases, you may encounter negative setup or hold times. This can happen due to a variety of reasons, such as:</p><ol class=\"c20 lst-kix_list_11-0 start\" start=\"1\"><li class=\"c21 c5 c24 li-bullet-0\">Clock Skew: Clock skew refers to the variation in arrival times of the clock signal at different parts of the circuit. If the clock signal arrives earlier at a particular flip-flop compared to the arrival time at the data input, it can result in a negative setup time. Similarly, if the clock signal arrives late at the flip-flop compared to the arrival time at the data input, it can result in a negative hold time.</li><li class=\"c21 c5 c24 li-bullet-0\">Process Variations: Process variations in semiconductor manufacturing can cause variations in the electrical properties of transistors and interconnects. These variations can lead to negative setup and hold times in some cases.</li><li class=\"c21 c5 c24 li-bullet-0\">Timing Analysis Methodology: Some timing analysis methodologies or tools may allow for negative setup and hold times to be specified. This can be useful in certain situations where specific timing constraints need to be met, such as in certain high-speed designs.</li></ol><p class=\"c21 c5\">Negative setup and hold times are not common in most digital circuit designs and are typically avoided. They can introduce additional challenges in timing analysis and make the design more sensitive to variations. Designers strive to ensure positive setup and hold times to ensure reliable and robust circuit operation.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q84",
    "question": "What is difference between normal buffer and clock buffer",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c21 c5\">In digital circuit design, both normal buffers and clock buffers are used to amplify and shape signals. However, they serve different purposes and have specific characteristics related to their usage.</p><ol class=\"c20 lst-kix_list_51-0 start\" start=\"1\"><li class=\"c21 c5 c24 li-bullet-0\">Normal Buffer: A normal buffer, also known as a data buffer or signal buffer, is used to amplify and buffer a general data signal. It is typically used to drive signals over longer distances, improve signal integrity, and isolate the source from the load. Normal buffers are used for non-clock signals in the circuit, such as data inputs, control signals, or any other signals that need to be propagated through the circuit.</li><li class=\"c21 c5 c24 li-bullet-0\">Clock Buffer: A clock buffer, as the name suggests, is specifically designed to handle clock signals. Clocks are critical for synchronization in digital systems, and clock buffers are used to distribute clock signals throughout the circuit. They ensure that the clock signal maintains its integrity and has consistent characteristics across different parts of the design. Clock buffers are optimized for low skew, low jitter, and fast rise/fall times to ensure accurate clock propagation and synchronization.</li></ol><p class=\"c21 c5\">The key differences between normal buffers and clock buffers can be summarized as follows:</p><ul class=\"c20 lst-kix_list_39-0 start\"><li class=\"c21 c5 c24 li-bullet-0\">Purpose: Normal buffers are used for general data signals, while clock buffers are specifically designed for clock signals.</li><li class=\"c21 c5 c24 li-bullet-0\">Signal Characteristics: Clock buffers are designed to minimize skew, jitter, and provide fast edges to maintain the integrity and synchronization of clock signals. Normal buffers do not have the same stringent requirements.</li><li class=\"c21 c5 c24 li-bullet-0\">Timing Considerations: Clock buffers play a crucial role in meeting setup and hold time requirements in synchronous digital systems. They are carefully placed and sized to ensure proper clock distribution and synchronization. Normal buffers do not have the same timing considerations.</li><li class=\"c21 c5 c24 li-bullet-0\">Design Optimization: Clock buffers are often optimized for low power consumption, low noise, and high performance to meet the stringent requirements of clock distribution. Normal buffers may prioritize other design considerations.</li></ul><p class=\"c21 c5\">It's important to note that while normal buffers and clock buffers have different design considerations, they can both be implemented using similar circuit topologies (e.gCMOS inverters) with appropriate sizing(clock buffer PMOS width is 2.5 times high compared to normal buffer) and optimization for their specific purposes.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q85",
    "question": "For CTS building which one you choose clock buffer or clock inverter",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c21 c5\">In clock tree synthesis (CTS) in VLSI design, the choice between using clock buffers or clock inverters depends on several factors, including the design specifications, timing requirements, power considerations, and the specific CTS methodology being employed. Both clock buffers and clock inverters can be used in CTS, and the selection depends on the design goals and constraints.</p><p class=\"c5 c21\">Clock Buffers: Clock buffers are commonly used in CTS for clock distribution. They are designed to provide low skew, low jitter, and fast rise/fall times, which are essential for maintaining the integrity and synchronization of clock signals. Clock buffers help to amplify the clock signal and drive it to multiple clock sinks (flip-flops) in the design. They are typically used in clock trees where the goal is to minimize clock skew and ensure reliable clock distribution.    </p><p class=\"c21 c5\">Clock Inverters: Clock inverters, as the name suggests, invert the clock signal. In certain CTS methodologies, clock inverters can be used for balancing the clock tree and achieving better clock skew control. By strategically placing clock inverters, the path lengths of different branches of the clock tree can be adjusted to reduce clock skew. Clock inverters are used to equalize the delay of different branches and ensure that the clock signal arrives at the flip-flops with minimal skew.</p><p class=\"c21 c5\">The choice between clock buffers and clock inverters in CTS depends on various considerations, such as:</p><ol class=\"c20 lst-kix_list_19-0 start\" start=\"1\"><li class=\"c21 c5 c24 li-bullet-0\">Clock Skew Control: If minimizing clock skew is a critical objective, clock inverters may be used strategically to balance the clock tree and equalize path lengths.</li><li class=\"c21 c5 c24 li-bullet-0\">Design Constraints: The specific design constraints, such as power consumption, area, and timing requirements, may influence the choice of clock buffers or clock inverters.</li><li class=\"c21 c5 c24 li-bullet-0\">CTS Methodology: Different CTS methodologies may have different recommendations or preferences for using clock buffers or clock inverters. The chosen methodology and associated tools may guide the decision-making process.</li></ol><p class=\"c21 c5\">It's worth noting that in many CTS implementations, a combination of clock buffers and clock inverters may be used to optimize the clock tree and achieve the desired objectives. The selection of clock buffers, clock inverters, or a combination thereof should be made based on careful analysis of the design requirements, timing constraints, and the specific CTS methodology being employed.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q86",
    "question": "What is CTS SPEC file what it contain",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c21 c5\">In VLSI design, a CTS (Clock Tree Synthesis) SPEC file, also known as a CTS constraints file, is a file that contains the specifications and constraints for performing clock tree synthesis. It provides important information to the CTS tool regarding the desired characteristics and requirements of the clock tree.</p><p class=\"c21 c5\">The CTS SPEC file typically includes the following information:</p><ol class=\"c20 lst-kix_list_16-0 start\" start=\"1\"><li class=\"c21 c5 c24 li-bullet-0\">Clock Netlist: The CTS SPEC file includes the netlist or connectivity information related to the clock network. It specifies the clock source(s), clock sinks (typically flip-flops), and the interconnections between them.</li><li class=\"c21 c5 c24 li-bullet-0\">Clock Constraints: The file contains clock-related constraints, such as the desired clock frequency, clock waveform specifications (rise/fall times, duty cycle), and any other timing requirements specific to the clock network.</li><li class=\"c21 c5 c24 li-bullet-0\">Clock Tree Topology: The CTS SPEC file provides information about the desired clock tree topology, including the number of levels, the types of buffers or inverters to be used, and their placement locations.</li><li class=\"c21 c5 c24 li-bullet-0\">Buffer Sizing and Placement Constraints: It includes constraints related to buffer sizing, placement locations, and any specific rules or guidelines for buffer insertion in the clock tree.</li><li class=\"c21 c5 c24 li-bullet-0\">Clock Skew and Jitter Constraints: The file may specify constraints related to allowable clock skew (the variation in arrival times of the clock signal at different points in the clock tree) and clock jitter (the variation in the timing of clock edges).</li><li class=\"c21 c5 c24 li-bullet-0\">Power and Area Constraints: The CTS SPEC file may include constraints related to power consumption and area utilization of the clock tree. This information helps guide the optimization process during clock tree synthesis.</li><li class=\"c21 c5 c24 li-bullet-0\">Miscellaneous Constraints: Any additional constraints or guidelines specific to the clock tree synthesis process may be included in the CTS SPEC file.</li></ol><p class=\"c21 c5\">The CTS SPEC file serves as input to the CTS tool, which uses this information to perform the clock tree synthesis process. The tool analyzes the input specifications, optimizes the clock tree topology, inserts buffers or inverters, and performs various optimizations to meet the specified constraints and requirements.</p><p class=\"c21 c5\">The specific format and syntax of the CTS SPEC file may vary depending on the CTS tool and methodology used in the design flow. The tool's documentation or user guide typically provides information on the required format and the available options for creating the CTS SPEC file.</p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q87",
    "question": "If skew is bad how you can overcome",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c21 c5\">When the arrival times of the clock signal vary at different points in a circuit, it is called clock skew, which is generally undesirable in VLSI design. To overcome or minimize clock skew, there are a few approaches:</p><ol class=\"c20 lst-kix_list_1-0 start\" start=\"1\"><li class=\"c21 c5 c24 li-bullet-0\">Balancing the Clock Paths: By adjusting the delays in different branches of the clock network, such as using buffers or inverters strategically, the path lengths can be equalized. This helps ensure that the clock signal reaches various parts of the circuit at similar times, reducing clock skew.</li><li class=\"c21 c5 c24 li-bullet-0\">Adding Buffers: Placing buffers at specific locations along the clock paths can amplify the clock signal and control its arrival time. This helps in reducing clock skew by making the clock signal more consistent across the circuit.</li><li class=\"c21 c5 c24 li-bullet-0\">Considering Skew in Placement: During the physical design phase, careful placement of circuit elements, such as flip-flops or clock sinks, can help minimize clock skew. By considering the clock network structure and arranging these elements close to each other, the impact of delays and variations can be reduced.</li><li class=\"c21 c5 c24 li-bullet-0\">Skew-Aware Routing: Similar to placement, routing techniques can be employed that take clock skew constraints into account. By optimizing the paths that the clock signals take, the effects of delays and variations can be minimized, resulting in lower clock skew.</li><li class=\"c21 c5 c24 li-bullet-0\">Compensation Techniques: In some cases, additional circuitry, like delay elements or phase-locked loops (PLLs), can be used to actively adjust the clock arrival times and compensate for skew. These techniques can be effective but may introduce complexity and increased power consumption.</li><li class=\"c21 c5 c24 li-bullet-0\">Optimizing Clock Distribution: Improving the clock distribution network itself, such as using efficient metal layers, reducing parasitic capacitance, and carefully routing the clock signals, can help reduce clock skew. These optimizations aim to minimize delays and variations in the clock paths.</li></ol><p class=\"c21 c5\">It's important to note that completely eliminating clock skew may not always be possible, especially in complex designs. The goal is to minimize skew to an acceptable level that meets the design requirements. The specific techniques used will depend on the design constraints, available resources, and the trade-offs between performance, power, and size.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q88",
    "question": "If latency is bad how you can overcome",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c21 c5\">When latency, which is the delay in signal propagation, is considered undesirable in VLSI design, there are several ways to overcome or reduce it:</p><ol class=\"c20 lst-kix_list_17-0 start\" start=\"1\"><li class=\"c21 c5 c24 li-bullet-0\">Pipeline Design: Breaking down complex operations into smaller stages or steps helps reduce latency. Each step can be executed concurrently, allowing multiple operations to be processed simultaneously.</li><li class=\"c21 c5 c24 li-bullet-0\">Parallel Processing: Using multiple processing units or functional units in parallel can reduce latency. This means that different parts of the data are processed simultaneously, speeding up computations.</li><li class=\"c21 c5 c24 li-bullet-0\">Optimized Circuit Design: Careful design techniques, such as optimizing gate-level implementations and minimizing long interconnects, can help reduce latency. These optimizations focus on improving the speed and efficiency of individual logic gates and connections.</li><li class=\"c21 c5 c24 li-bullet-0\">Increasing Clock Frequency: Raising the clock frequency can potentially reduce latency by allowing circuits to operate at higher speeds. However, there are limitations due to power consumption and timing constraints that need to be considered.</li><li class=\"c21 c5 c24 li-bullet-0\">Memory Hierarchy and Caching: Implementing memory hierarchy and caching techniques can improve latency in accessing data. Frequently used data is stored in faster and closer memory levels, reducing the time required for data retrieval.</li><li class=\"c21 c5 c24 li-bullet-0\">Algorithmic Optimization: Analyzing and optimizing algorithms used in the design can reduce latency. More efficient algorithms or algorithmic improvements can decrease the number of computational steps or simplify operations, leading to lower latency.</li><li class=\"c21 c5 c24 li-bullet-0\">Balancing Trade-offs: Consider the trade-offs between latency, area utilization, and power consumption. Reducing latency may require additional hardware, which can increase area usage and power consumption. Finding the right balance is important.</li></ol><p class=\"c21 c5\">It's important to note that reducing latency often involves a combination of these approaches. The specific techniques used depend on the design requirements, constraints, and the trade-offs between performance, power, area, and timing considerations.</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q89",
    "question": "How Skew effect on setup and hold time",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_13-0 start\" start=\"1\"><li class=\"c9 c5 c24 li-bullet-0\">Positive skew  means capture delay is more compared to launch it helps the setup time but violated the hold time </li><li class=\"c9 c5 c24 li-bullet-0\">Negative skew means launch delay is more compared to capture it helps the hold time but violated the setup time</li></ol></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q90",
    "question": "Why we are using NDR in CTS",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">NDR means Non Default Rule in this we used double width and double spacing</p><ol class=\"c20 lst-kix_list_31-0 start\" start=\"1\"><li class=\"c9 c5 c24 li-bullet-0\">Double spacing used for reduce coupling capacitance because of that cross talk will be reduce</li><li class=\"c9 c5 c24 li-bullet-0\">Double width used for to overcome electro migration </li></ol></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q91",
    "question": "You have nine metal layers in your design which metal layer you preferred for CTS and why",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Top two metal layers preferred for power after that means 6 and 7 metal layer i preferred for CTS routing because clock is very important in timing analysis i have to ensure that my net delay should be less then only i will meet the timing</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q92",
    "question": "what are the default clock skew groups in design",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Tool created default clock skew group for every master clock if you want to overwrite that create_clock_skew_group is a ICC2 command</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q93",
    "question": "Explain clock_opt command",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Clock_opt command have three stages </p><p class=\"c9 c5\">Build_clock → it add the clock buffers based on flop location </p><p class=\"c9 c5\">Route_clock → it route the clock buffers</p><p class=\"c9 c5\">Final_opt → optimize the clock tree</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q94",
    "question": "If clock is not propagate what happened in CTS",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">If clock is not propagated then the io latencies are consider zero so what ever optimization done that not effective optimization</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q95",
    "question": "What are the sanity check you did after CTS",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">report_timing → check setup timing</p><p class=\"c8\">report_qor → check setup, max tran , max cap in different scenario</p><p class=\"c8\">Analyze_design_violation → To clearly check max tran , max cap</p><p class=\"c8\">Report_congestion  → to check congestion in design</p><p class=\"c8\">Report_utilization → how much core utilized in placement we can observe</p><p class=\"c8\">Report_desgn → complete design related information will report</p><p class=\"c8\">Check_legality → what ever placed cells are legally placed or not we have to check </p><p class=\"c9 c5\">Report_clock_qor → for know clock tree related violation</p><p class=\"c9 c5\">Report_clock_timing → for report either skew or latency there is a option like -type by using this we will report</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q96",
    "question": "What is clock mesh were we used it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">How we do power mesh same like we create mesh for clock it is used to minimize the skew for high frequency design </p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q97",
    "question": "What is multi source CTS why we used it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">We are creating multiple source point in design for cts to minimize the clock latency</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "CTS",
    "subCategory": "Clock Tree Synthesis Q&A",
    "questionNumber": "Q98",
    "question": "What is clock gating check",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c47 c5\">The purpose of clock gating checks is to verify that clock gating cells are properly inserted, connected, and functioning as intended in a design. Clock gating checks help identify issues such as:</p><p class=\"c47 c5\">Missing Clock Gating Cells: Ensuring that clock gating cells are properly inserted where needed to optimize power consumption.</p><ul class=\"c20 lst-kix_list_22-0 start\"><li class=\"c47 c5 c24 li-bullet-0\">Incorrect Connectivity: Verifying that the clock gating cells are correctly connected to the control signals and that they effectively disable or enable clocks as required.</li><li class=\"c47 c5 c24 li-bullet-0\">Timing Violations: Checking for any timing violations that may arise due to improper clock gating, such as glitches or excessive delay in enabling/disabling clocks.</li><li class=\"c47 c5 c24 li-bullet-0\">Functional Integrity: Confirming that the clock gating logic does not introduce functional errors or unintended behavior in the circuit.</li></ul><p class=\"c5 c47\">Clock gating checks are an essential part of the verification process in VLSI design, particularly when power consumption and performance are critical concerns. By ensuring the correct implementation of clock gating, designers can achieve a balance between power efficiency and maintaining the desired functionality of the integrated circuit.</p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q99",
    "question": "What is antenna effect how to reduce",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">The charge accumulated on metal shape during CMP (chemical mechanical polishing) step of fabrication can damage the gate oxide which will lead to chip failure</p><p class=\"c9 c5\">Fixing1 : layer hoping or layer jumping </p><p class=\"c9 c5\">Fixing 2 : Antenna diode</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q100",
    "question": "What is antenna ratio where this information present",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Tool know antenna effect based on antenna ratio this information present in LEF file</p><p class=\"c9 c5\">Antenna ratio = metal shape area / gate area</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q101",
    "question": "what are the sanity checks you did in routing stage",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c8\">report_timing → check setup timing</p><p class=\"c8\">report_qor → check setup, max tran , max cap in different scenario</p><p class=\"c8\">Analyze_design_violation → To clearly check max tran , max cap</p><p class=\"c8\">Report_congestion  → to check congestion in design</p><p class=\"c8\">Report_utilization → how much core utilized in placement we can observe</p><p class=\"c8\">Report_desgn → complete design related information will report</p><p class=\"c8\">Check_legality → what ever placed cells are legally placed or not we have to check </p><p class=\"c9 c5\">Report_clock_qor → for know clock tree related violation</p><p class=\"c9 c5\">Report_clock_timing → for report either skew or latency there is a option like -type by using this we will report</p><p class=\"c9 c5\">Report_routes → To report routing related warnings and errors </p><p class=\"c9 c5\">Check_lvs → To reports opens and shorts in design</p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q102",
    "question": "What are the types of routing",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">There are three types of routing power routing,clock tree routing and signal routing</p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p><p class=\"c9 c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q103",
    "question": "How many phases of routing will be done?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">Routing will don in three phases </p><p class=\"c9 c5\">Global routing or Trail route</p><p class=\"c9 c5\">Track assignment</p><p class=\"c9 c5\">Detail routing</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q104",
    "question": "What is detour how its effect timing",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Due to the GRC overflow tool creating a long net for routing due to long net RC parameters affecting the signal is called Detour.</p><p class=\"c5\">Due to Detour net delay increase and it created setup violation </p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q105",
    "question": "What is area recovery and leakage recovery",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Area Recovery: If any timing path having more positive slack margin then cells can be downsize to recovery some area</p><p class=\"c1\"></p><p class=\"c5\">Leakage Recovery: parallel  few cells in timing paths with positive slack can be swapped to svt/hvt cells to reduce leakage power.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Routing",
    "subCategory": "Routing & Congestion Q&A",
    "questionNumber": "Q106",
    "question": "What are the types of functional ECO and why we are doing it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">There are two types of functional eco Pre mask and post mask ECO</p><p class=\"c1\"></p><p class=\"c5\">Pre mask ECO : In this case we can change the base layers and add the cells to build a logic and change the routing to achieve timing as well as adding a new logic to design</p><p class=\"c1\"></p><p class=\"c5\">Post mask ECO: This is used mostly for fixing the timing violation after base layer fabricated then by using spare cells and metal connection change we can fix the violation in this case we can't touch the base layer we can't add the any cells to the design</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q107",
    "question": "What are the Inputs required for STA",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_45-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Netlist</li><li class=\"c5 c16 li-bullet-0\">MMMC </li><li class=\"c5 c16 li-bullet-0\">SPEF file</li><li class=\"c5 c16 li-bullet-0\">SDC</li><li class=\"c5 c16 li-bullet-0\">TLUplus file</li><li class=\"c5 c16 li-bullet-0\">Lib file</li></ol><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q108",
    "question": "What is the order of timing fixing",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">The order of timing fixing is </p><ol class=\"c20 lst-kix_list_4-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Max cap</li><li class=\"c5 c16 li-bullet-0\">Max tran</li><li class=\"c5 c16 li-bullet-0\">Max fanout</li><li class=\"c5 c16 li-bullet-0\">Setup</li><li class=\"c5 c16 li-bullet-0\">Data to Data check</li><li class=\"c5 c16 li-bullet-0\">Recovery</li><li class=\"c5 c16 li-bullet-0\">Hold </li><li class=\"c5 c16 li-bullet-0\">Clock gating check</li><li class=\"c5 c16 li-bullet-0\">Removal</li><li class=\"c5 c16 li-bullet-0\">Noise  or glitch fixing</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q109",
    "question": "How to fix Max cap",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_10-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">If long nets is there add buffers</li><li class=\"c5 c16 li-bullet-0\">If weak driver is there upsize the cell</li><li class=\"c5 c16 li-bullet-0\">If high fanout is there split the fanout</li></ol><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q110",
    "question": "How to fix Max Tran",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_10-0\" start=\"4\"><li class=\"c5 c16 li-bullet-0\">If long nets is there add buffers</li><li class=\"c5 c16 li-bullet-0\">If weak driver is there upsize the cell</li><li class=\"c5 c16 li-bullet-0\">If high fanout is there split the fanout</li></ol><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q111",
    "question": "How to fix Max fanout",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Most of the fanouts are fixed in placement stage in that high fanout net synthesis stage all fanouts are fixed if any few fanout violations is there split the fanout if too many fanout violations is there go back to placement stage </p><p class=\"c1\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q112",
    "question": "How to fix Setup violation?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">The setup violation comes because of data path have more delay we have to reduce data path delay by difference ways</p><ol class=\"c20 lst-kix_list_49-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Remove redundant buffer or extra buffer</li><li class=\"c5 c16 li-bullet-0\">Increase drive strength of cells in data paths</li><li class=\"c5 c16 li-bullet-0\">Swap hvt/svt cells to lvt</li><li class=\"c5 c16 li-bullet-0\">Delay the clock capture path</li><li class=\"c5 c16 li-bullet-0\">Reduce net delay by routing in high metal layer (set_routing_rules)</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q113",
    "question": "How to fix data to data check violation",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Data to Data check is done in between  two data signals arrival at a time  mostly  this is happened in between  set and reset signals of flop at this condition we have to be delay any of the signal with respect to other signal otherwise both will apply at a time it goes to metal stable state</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q114",
    "question": "How to fix Recovery check violation",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">It's like a  setup check </p><ol class=\"c20 lst-kix_list_49-0\" start=\"6\"><li class=\"c5 c16 li-bullet-0\">Remove redundant buffer or extra buffer</li><li class=\"c5 c16 li-bullet-0\">Increase drive strength of cells in data paths</li><li class=\"c5 c16 li-bullet-0\">Swap hvt/svt cells to lvt</li><li class=\"c5 c16 li-bullet-0\">Delay the clock capture path</li><li class=\"c5 c16 li-bullet-0\">Reduce net delay by routing in high metal layer (set_routing_rules)</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q115",
    "question": "How to fix Hold violation",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Hold violation occurs because of data path having less delay so to overcome this we have to add delay in data path</p><ol class=\"c20 lst-kix_list_2-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Add delay buffers</li><li class=\"c5 c16 li-bullet-0\">Decrease drive strength of cells in data paths</li><li class=\"c5 c16 li-bullet-0\">Swap lvt/svt cells to hvt</li><li class=\"c5 c16 li-bullet-0\">Delay the clock launch path</li><li class=\"c5 c16 li-bullet-0\">increase net delay by routing in low metal layer (set_routing_rules)</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q116",
    "question": "How to fix Removal violation",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Removal check is like hold check</p><ol class=\"c20 lst-kix_list_2-0\" start=\"6\"><li class=\"c5 c16 li-bullet-0\">Add delay buffers</li><li class=\"c5 c16 li-bullet-0\">Decrease drive strength of cells in data paths</li><li class=\"c5 c16 li-bullet-0\">Swap lvt/svt cells to hvt</li><li class=\"c5 c16 li-bullet-0\">Delay the clock launch path</li><li class=\"c5 c16 li-bullet-0\">increase net delay by routing in low metal layer (set_routing_rules)</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q117",
    "question": "How to fix Crosstalk and noise",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_34-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Upsize the driver of victim nets </li><li class=\"c5 c16 li-bullet-0\">Downsize the driver of aggressor nets</li><li class=\"c5 c16 li-bullet-0\">Increase Spacing between aggressor and victim nets</li><li class=\"c5 c16 li-bullet-0\">Adding buffers on long nets</li><li class=\"c5 c16 li-bullet-0\">Shielding  the net with ground.</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q118",
    "question": "How to fix clock gating check",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Clock gating check done between enable signal and clock signal</p><p class=\"c5\">There are two types of clock gating checks inferred:</p><p class=\"c5\">• Active-high clock gating check: Occurs when the gating cell has an</p><p class=\"c5 c44\">and or a nand function.</p><p class=\"c5\">• Active-low clock gating check: Occurs when the gating cell has an or</p><p class=\"c5\">or a nor function. (for more information refer J.Bhasker book)</p><p class=\"c1\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q119",
    "question": "How to fix antenna violation",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">There are two ways to fix antenna violation </p><ol class=\"c20 lst-kix_list_59-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Adding antenna diode in reverse bias</li><li class=\"c5 c16 li-bullet-0\">Layer hoping or layer jumping</li></ol><p class=\"c1\"></p></div>"
  },
  {
    "category": "STA & ECO",
    "subCategory": "STA & Timing Closure Q&A",
    "questionNumber": "Q120",
    "question": "what is positive and negative cross talk",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Positive crosstalk: The aggressor net has a rising transition at the same time when the victim net has a falling transition. The aggressor net switching in the opposite direction increases delay for the victim. The positive crosstalk impacts the driving cell as well as the net interconnect. The delay for both gets increased because charge required for the coupling capacitance is more.For more understanding refer below image.</p><p class=\"c5\"><img alt=\"\" src=\"/assets/modules/module21/image2.jpg\" title=\"\" class=\"native-img\" width=\"326.48px\" height=\"170.76px\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c5\">Negative crosstalk: The aggressor net is rising transition at the same time as the victim net. The aggressor net switching in the same direction decreases delay of the victim. The negative crosstalk impacts the driving cell as well as the net interconnect - the delay for both gets decreased because charge required for the coupling capacitance is less.For more understand refer below image</p><p class=\"c1\"></p><p class=\"c5 c24\"><img alt=\"\" src=\"/assets/modules/module21/image11.jpg\" title=\"\" class=\"native-img\" width=\"431.50px\" height=\"223.94px\"></p><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q121",
    "question": "What is LVS check",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Layout Versus Schematic (LVS) checking compares the extracted netlist from the layout to the original schematic netlist to determine if they match. The comparison check is considered clean if all the devices and nets of the schematic match the devices and the nets of the layout. Optionally, the device properties can also be compared to determine if they match within a certain tolerance. When properties are compared, all the properties must match as well to achieve a clean comparison.For more understand refer below image</p><p class=\"c5 c24\"><img alt=\"\" src=\"/assets/modules/module21/image12.png\" title=\"\" class=\"native-img\" width=\"344.50px\" height=\"240.11px\"></p><p class=\"c1 c24\"></p><p class=\"c5 c24\">The LVS check reports this</p><p class=\"c28 c25\">Extraction Errors</p><ul class=\"c20 lst-kix_list_50-0 start\"><li class=\"c5 c16 c25 li-bullet-0\">Text short and open</li><li class=\"c5 c16 c25 li-bullet-0\">Device extraction error</li><li class=\"c5 c16 c25 li-bullet-0\">Missing device terminal</li><li class=\"c5 c16 c25 li-bullet-0\">Extra device terminal</li><li class=\"c5 c16 c25 li-bullet-0\">Unused text</li><li class=\"c16 c25 c28 li-bullet-0\">Duplicate structure placement</li></ul><p class=\"c28 c25\">Compare Errors</p><ul class=\"c20 lst-kix_list_46-0 start\"><li class=\"c5 c16 c25 li-bullet-0\">Unmatched nets in the layout/schematic</li><li class=\"c5 c16 c25 li-bullet-0\">Unmatched devices in the layout/schematic</li><li class=\"c5 c16 c25 li-bullet-0\">Property errors</li><li class=\"c5 c16 c25 li-bullet-0\">Port swap errors</li></ul><p class=\"c1 c24\"></p><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q122",
    "question": "What is ERC check",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c9 c5\">ERC, Electrical rule check strongly verifies electrical properties of the layout. usually violations includes</p><ol class=\"c20 lst-kix_list_36-0 start\" start=\"1\"><li class=\"c27 c28 c43 c25 li-bullet-0\">Floating devices, gates, pins and nets</li><li class=\"c27 c28 c43 c25 li-bullet-0\">Connecting high voltages to the thin gates</li><li class=\"c27 c28 c25 c43 li-bullet-0\">Floating wells</li><li class=\"c27 c28 c43 c25 li-bullet-0\">Allowed series pass gates</li><li class=\"c27 c28 c43 c25 li-bullet-0\">Minimum n-well widths</li></ol></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q123",
    "question": "What is LEC check",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Logical equivalent check don in between golden and revised netlist LEC can be run in multiple stages </p><p class=\"c5\">STAGE                        GOLDEN                                        REVISED</p><p class=\"c5\">Synthesis                        RTL                                                gate level netlist</p><p class=\"c5\">PNR                                Synthesis Netlist                                Post routed netlist</p><p class=\"c5\">ECO                                synthesis Netlist                                ECO Netlist</p><p class=\"c5\">Tapout                        synthesis Netlist                                Tapout netlist        </p><p class=\"c1\"></p><p class=\"c5\">Note: if functional change happens in any stage then synthesis netlist is no more golden then ECO netlist becomes golden.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q124",
    "question": "What is BEC check",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Bolean equivalent check it is another name of LEC check</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q125",
    "question": "How to overcome shorts and opens in your design",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">In ICC2 there are few shortcuts for fixing shorts and opens </p><p class=\"c5\">Shift+L → split the net</p><p class=\"c5\">Shift+W → stretch and connect</p><p class=\"c5\">shift+R → custom router</p><p class=\"c5\">S → Stretch</p><p class=\"c5\">M → move</p><p class=\"c5\">Shift+C → To automatically insert the via</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q126",
    "question": "what is sequential merging",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Sequential merging is when the synthesis tool merges two or more flops into one because they have the exact same function. Sequential constant is when the synthesis tool optimizes away flops that are always tied to 1'b1 or 1'b0.</p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q127",
    "question": "What is combinational merging?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Combinational merging is when the synthesis tool merges two or more combinational cells  into one because they have the exact same function. Like one AND gate and NOT gate connected back to back then we can replace those cells with NAND gate this is called the combinational merging.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q128",
    "question": "What is SVF file where we used SVF file",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">svf - Automated setup file. This file helps Formality process design changes caused by other tools used in the design flow. Formality uses this file to assist the compare point matching and verification process. This information facilitates alignment of compare points in the designs that you are verifying.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q129",
    "question": "If LVS clean means we can guarantee our design functionality",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">If a user removes a net based on that netlist only LVS checks happen so it is almost the same. That's why if LVS passes also we are not guaranteed design functionality.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q130",
    "question": "How to fix IR drop",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ul class=\"c20 lst-kix_list_27-0 start\"><li class=\"c5 c16 c25 li-bullet-0\">Use the proper width of Metal according to current density.</li><li class=\"c5 c16 c25 li-bullet-0\">Use more parallel metal wire strips</li><li class=\"c5 c16 c25 li-bullet-0\">Spread the logic if hotspots are in congested areas.</li><li class=\"c5 c16 c25 li-bullet-0\">Add more proper vias </li><li class=\"c5 c16 c25 li-bullet-0\">Use proper CTS structure.</li><li class=\"c5 c16 c25 li-bullet-0\">Add buffers if the run length of the wire is too long.</li><li class=\"c5 c16 c25 li-bullet-0\">Avoid the jogs in metals</li><li class=\"c5 c16 c25 li-bullet-0\">Using clock gating techniques</li></ul><p class=\"c1\"></p></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q131",
    "question": "How to fix EM",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ul class=\"c20 lst-kix_list_8-0 start\"><li class=\"c27 c5 c16 c25 li-bullet-0\">Increase the metal width to reduce the current density</li><li class=\"c27 c5 c16 c25 li-bullet-0\">Reduce the frequency</li><li class=\"c5 c16 c25 c27 li-bullet-0\">Lower the supply voltage</li><li class=\"c27 c5 c16 c25 li-bullet-0\">Keep the wire length sort</li><li class=\"c27 c5 c16 c25 li-bullet-0\">Reduce the buffer size in clock lines</li></ul></div>"
  },
  {
    "category": "Physical Verification",
    "subCategory": "Physical Verification Q&A",
    "questionNumber": "Q132",
    "question": "How LEC work",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c27 c5 c25\">LEC works in two stages one is Mapping and another one is comparing, first it maps the names of golden and revised netlist, later it compares the logic with respect to flop D pin fan in for golden and received netlist if it is passed then we guarantee our functionality is correct.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q133",
    "question": "What are the ways to reduce the Dynamic power consumption",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_30-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Clock gating</li><li class=\"c5 c16 li-bullet-0\">Multi voltage design</li><li class=\"c5 c16 li-bullet-0\">Switching ON/OFF power domains</li></ol><p class=\"c1\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q134",
    "question": "What is isolation cells and what are the types of isolation cells",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">The isolation cells will be used in a design, a signal is passed from ON/OFF domain to always on domain when domain OFF there is no signal will be passed from ON/OFF domain to always ON domain then the chance of data missing and the cell will be go into the metal stability state to overcome this condition we used Isolation cells.Isolation cells are three types </p><ol class=\"c20 lst-kix_list_48-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Constant 1 (OR based isolation cells)</li><li class=\"c5 c16 li-bullet-0\">Constant 0 (AND based Isolation cells)</li><li class=\"c5 c16 li-bullet-0\">Most recent value (Latch based isolation cells)</li></ol><p class=\"c1 c24\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q135",
    "question": "Isolation cell information present in which file",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Isolation cell information present in UPF or CPF file</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q136",
    "question": "What is power switch why we used power switch what are the types of power switches",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Power switches are used for turn ON or OFF the power supply for ON/OFF domain.We used power switches for low power designs.There are two types of power switches Header stitches and   Footer switches</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q137",
    "question": "What is  Level Shifter why we used it?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Level Shifters (LS) are special standard cells used in Multi Voltage designs to convert one voltage level to another. As Multi Voltage designs have more than one voltage domain, level shifters are used for all the signals crossing from one voltage domain to another voltage domain.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q138",
    "question": "What is Enable Level Shifter?",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">It is combination of Level Shifter and Isolation cell</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q139",
    "question": "What Information UPF/CPF file contains",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_9-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Power domains and its definition</li><li class=\"c5 c16 li-bullet-0\">Power nets and its definition</li><li class=\"c5 c16 li-bullet-0\">Associated supply nets for ON/OFF and always ON power domains</li><li class=\"c5 c16 li-bullet-0\">Power stitches information</li><li class=\"c5 c16 li-bullet-0\">Isolation cell information</li><li class=\"c5 c16 li-bullet-0\">Level shifter information</li></ol></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q140",
    "question": "What is always ON buffer where we used it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">When a always on signal passing through a switchable domain then due to long net they may signal get weak and transition will increase to overcome this we used always ON buffer in Switchable domain it have two power supplies</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q141",
    "question": "What is the Purpose of Double Patterning",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_52-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">To increase the routing resources in lower metal layers</li><li class=\"c5 c16 li-bullet-0\">There will be two masks used for better etching of the metal.</li></ol><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q142",
    "question": "What is min Vt violation how to overcome it.",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Vt Spacing or width should be minimum in lower technology nodes such as 7 or 5-nm technologies that may LVT min Vt violation or SVT min Vt  violation will be present when swapping cells from LVT to SVT or vice versa. To overcome this do legality placement in lower node technology(it will add the filler cell regarding that min Vt violation)</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q143",
    "question": "How we can analyze clock tree and skew in placement stage only",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\"> Update_io_latency is the command in ICC2. By using this command we can estimate how our clock tree is going to build in the placement stage.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q144",
    "question": "What we did in physical verification stage",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">In the physical verification stage we check our design having DRC,LVS,Antenna and ERC related violations. If violations are present then we try to fix those violations.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q145",
    "question": "How we get full GDS",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">PNR GDS (only metal and std cell placement information present) does not have base layer information we are getting a std cell GDS and Macro GDS from foundry   by adding PNR and std + Macro GDS generated Merged GDS this Merged GDS we add Fill only GDS which contain Dummy metal filler then our Full GDS developed.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q146",
    "question": "What is power gating where we used it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">Power gating is a cell which is used to  shut down the power of a block it is used to reduce the static power.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q147",
    "question": "How to reduce static power in Design",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_12-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Multi voltage design</li><li class=\"c5 c16 li-bullet-0\">Minimize the usage of LVT cells</li><li class=\"c5 c16 li-bullet-0\">Power gating</li></ol><p class=\"c1 c24\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q148",
    "question": "What is difference between DRC and DRV",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_44-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">DRC are related to physical violation like minimum spacing, width, pitch, cut rules shorts and opens this all are comes under DRC</li><li class=\"c5 c16 li-bullet-0\">DRV are related to Timing violation like Max transition and Max capacitance etc.</li></ol><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q149",
    "question": "can you plz explain timing ECO flow",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\"><img alt=\"\" src=\"/assets/modules/module21/image13.png\" title=\"\" class=\"native-img\" width=\"504.50px\" height=\"437.93px\"></p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q150",
    "question": "What is empty module why we used it",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><p class=\"c5\">If the RTL module definitions don't have any logical content such as wire, inputs, or outputs, then such modules are called empty modules. Used to Add the logic in future stages.</p><p class=\"c1\"></p></div>"
  },
  {
    "category": "Low Power & UPF",
    "subCategory": "Low Power & UPF Q&A",
    "questionNumber": "Q151",
    "question": "Why CMOS technology not allowed Floating inputs and Multi driven inputs",
    "answer": "<div style=\"line-height: 1.6; color: #bdc1c6;\"><ol class=\"c20 lst-kix_list_37-0 start\" start=\"1\"><li class=\"c5 c16 li-bullet-0\">Floating inputs are not allowed in CMOS technology because if floating input beside if any net passed because of it a floating input gate a meta stability value neither zero nor one then the PMOS and NMOS both are ON at a time the result chip failure</li><li class=\"c5 c16 li-bullet-0\">In CMOS technology Multi driven inputs are not allowed because if a net driven by a two drivers which may generated different signal like 0 and 1 then the cells doesn't know which input it will take because of this the cell goes to metastability state then the PMOS and NMOS both are ON at a time the result chip failure.</li></ol></div>"
  }
];
