
import React, { useState } from 'react';
import AdUnit from '../../components/AdUnit';
import styles from './Module6Content.module.css';

const Module6Content = () => {
  const [showAllIntro, setShowAllIntro] = useState(false);
  const [showAllDC, setShowAllDC] = useState(false);
  const [showAllGenus, setShowAllGenus] = useState(false);

  const introHeadings = [
  {
    "id": "h.h2cgzqenuno7",
    "text": "TOPIC 1: WHAT IS SYNTHESIS (DEEP, FROM ZERO)"
  },
  {
    "id": "h.wingvyc6q50i",
    "text": "1. Why do we need synthesis at all?"
  },
  {
    "id": "h.cu3btduiykgm",
    "text": "2. SIMPLE & INDUSTRY-CORRECT DEFINITION"
  },
  {
    "id": "h.h2dnb1ezaajq",
    "text": "3. What synthesis is NOT (important clarity)"
  },
  {
    "id": "h.h2t817175kx8",
    "text": "4. Real-life analogy (VERY IMPORTANT FOR STUDENTS)"
  },
  {
    "id": "h.vuo8y8gggd6l",
    "text": "RTL = Recipe"
  },
  {
    "id": "h.mi5gc7wwkh7j",
    "text": "Synthesis = Chef"
  },
  {
    "id": "h.ybeq2modzfrn",
    "text": "Gates = Ingredients"
  },
  {
    "id": "h.kwupvhi7yo44",
    "text": "5. What exactly goes INTO synthesis?"
  },
  {
    "id": "h.rk9iwp5o84o5",
    "text": "6. What exactly comes OUT of synthesis?"
  },
  {
    "id": "h.na8uubo7o7me",
    "text": "7. What happens INSIDE synthesis (conceptual, not headlines)"
  },
  {
    "id": "h.d6dbptj0atln",
    "text": "1. Understand logic"
  },
  {
    "id": "h.ux9rrjqxkpfb",
    "text": "2. Optimize logic"
  },
  {
    "id": "h.fbr39qj520er",
    "text": "3. Map logic"
  },
  {
    "id": "h.z0kqfxlsqqx7",
    "text": "8. Very small RTL → synthesis example (CLEAR)"
  },
  {
    "id": "h.9liokinlcggh",
    "text": "RTL:"
  },
  {
    "id": "h.1u7fokctx90a",
    "text": "Library has:"
  },
  {
    "id": "h.otpimaov6adu",
    "text": "Constraint:"
  },
  {
    "id": "h.qzgsg5npvfnf",
    "text": "9. Why synthesis optimization is REQUIRED"
  },
  {
    "id": "h.u0pjla1cg9nb",
    "text": "11. Student takeaway (CRITICAL)"
  },
  {
    "id": "h.cf1qrhv1meug",
    "text": "TOPIC 2: TYPES OF SYNTHESIS (FROM ZERO, VERY CLEAR)"
  },
  {
    "id": "h.pags1i7mndoa",
    "text": "1. Why do we need “types” of synthesis?"
  },
  {
    "id": "h.5xh7lbabcoa4",
    "text": "2. Main Types of Synthesis (Industry View)"
  },
  {
    "id": "h.u979mkpm5aj2",
    "text": "3. Logical Synthesis (MOST IMPORTANT FOR BEGINNERS)"
  },
  {
    "id": "h.j4esktty56pw",
    "text": "What Logical Synthesis means (CLEAR definition)"
  },
  {
    "id": "h.nzc9is775wj2",
    "text": "What logical synthesis KNOWS:"
  },
  {
    "id": "h.yo2xiacdan8m",
    "text": "What logical synthesis DOES NOT know:"
  },
  {
    "id": "h.pe86hdq7vmk7",
    "text": "4. What exactly happens in Logical Synthesis (INSIDE TOOL)"
  },
  {
    "id": "h.7f1qm0ugmhvb",
    "text": "STEP 1: RTL is read"
  },
  {
    "id": "h.qa7z4ljff2a7",
    "text": "STEP 2: Boolean equation is created"
  },
  {
    "id": "h.5lpe5broz3y9",
    "text": "STEP 3: Optimization happens"
  },
  {
    "id": "h.rut4n8pe6lbc",
    "text": "STEP 4: Mapping happens"
  },
  {
    "id": "h.grpsxtujricx",
    "text": "5. Example (VERY IMPORTANT)"
  },
  {
    "id": "h.aziaonz2uaa",
    "text": "RTL:"
  },
  {
    "id": "h.aatsf6o29h49",
    "text": "What student wrote:"
  },
  {
    "id": "h.gb4swksksomw",
    "text": "What synthesis does:"
  },
  {
    "id": "h.139vuh8ai34k",
    "text": "6. Why Logical Synthesis is REQUIRED"
  },
  {
    "id": "h.lnex976mp8p3",
    "text": "7. Advantages of Logical Synthesis"
  },
  {
    "id": "h.weckgsihnqw3",
    "text": "8. Disadvantages of Logical Synthesis (VERY IMPORTANT)"
  },
  {
    "id": "h.dp5cjsy4ihf8",
    "text": "9. Physical Synthesis (HIGH-LEVEL, not deep yet)"
  },
  {
    "id": "h.xh66jkfahxos",
    "text": "Simple definition:"
  },
  {
    "id": "h.um0ltxrsolp8",
    "text": "Comparison Table (Student Friendly)"
  },
  {
    "id": "h.4s2jjbax1qju",
    "text": "1.2. Student Conclusion (VERY IMPORTANT)"
  },
  {
    "id": "h.k39uqpi48av0",
    "text": "TOPIC 3: TRANSLATION IN LOGICAL SYNTHESIS (FROM ZERO)"
  },
  {
    "id": "h.2iwczqvlj0ok",
    "text": "1. What is Translation? (Very clear definition)"
  },
  {
    "id": "h.b3aoag13q1sm",
    "text": "2. In which stage of synthesis does Translation happen?"
  },
  {
    "id": "h.4bsgwhm5bs1m",
    "text": "Logical Synthesis Flow (high level):"
  },
  {
    "id": "h.tbyro5qenhe5",
    "text": "3. Why Translation is required?"
  },
  {
    "id": "h.qg2c1gu590v",
    "text": "4. What exactly happens during Translation? (Internals)"
  },
  {
    "id": "h.62hgfpgfgvnz",
    "text": "5. Simple Example (VERY IMPORTANT)"
  },
  {
    "id": "h.7eehm6js3d2q",
    "text": "RTL Code:"
  },
  {
    "id": "h.905d8dko0ig2",
    "text": "After Translation (Conceptual):"
  },
  {
    "id": "h.coasll6utayt",
    "text": "6. Commands related to Translation (Industry tools)"
  },
  {
    "id": "h.aowvkxx4sy3t",
    "text": "In Synopsys Design Compiler (example):"
  },
  {
    "id": "h.pgs9fe7v5367",
    "text": "9. Student-Level Summary"
  },
  {
    "id": "h.u10dfe1abzcz",
    "text": "TOPIC 4: OPTIMIZATION IN LOGICAL SYNTHESIS (FROM ZERO)"
  },
  {
    "id": "h.7e3wo2rcewh7",
    "text": "1. What is Optimization? (Clear & Practical Definition)"
  },
  {
    "id": "h.6cwr2z38p5gu",
    "text": "2. Why Optimization is Needed? (Real-life example)"
  },
  {
    "id": "h.725xonbbcgoe",
    "text": "3. When does Optimization happen in synthesis?"
  },
  {
    "id": "h.intr1ffgcurb",
    "text": "4. Types of Optimization (VERY IMPORTANT)"
  },
  {
    "id": "h.a1juqv2r9em2",
    "text": "1. Timing Optimization"
  },
  {
    "id": "h.xdoaxvw4abox",
    "text": "2. Area Optimization"
  },
  {
    "id": "h.hv79wnecnmu1",
    "text": "3. Power Optimization"
  },
  {
    "id": "h.e8616lhm3pqi",
    "text": "5. Example: Timing Optimization (Clear)"
  },
  {
    "id": "h.b8wrdbaawvw0",
    "text": "RTL:"
  },
  {
    "id": "h.qfda424j8u33",
    "text": "6. Optimization Techniques (What tool actually does)"
  },
  {
    "id": "h.1qkf2sxx8wrk",
    "text": "7. Optimization is Constraint Driven (Very Important)"
  },
  {
    "id": "h.y98hdh6a2t8v",
    "text": "8. What Optimization is NOT"
  },
  {
    "id": "h.w8p5h11taoy4",
    "text": "9. Commands Related to Optimization"
  },
  {
    "id": "h.q9nxk2wwoynn",
    "text": "1.1. Student-Level Summary"
  },
  {
    "id": "h.flce0gc6b72z",
    "text": "TOPIC 5: MAPPING (TECHNOLOGY MAPPING)"
  },
  {
    "id": "h.yeiyyb92zke9",
    "text": "1. What is Mapping? (Best Beginner Definition)"
  },
  {
    "id": "h.3yg7l8dl1xgy",
    "text": "2. Why Mapping is Needed? (Very Important Question)"
  },
  {
    "id": "h.jq3kmtrf452g",
    "text": "RTL says:"
  },
  {
    "id": "h.s3jsgcl5tp7g",
    "text": "3. Where Mapping Happens in Synthesis Flow?"
  },
  {
    "id": "h.yn6dt95ckma4",
    "text": "4. What Does Tool Use for Mapping?"
  },
  {
    "id": "h.hld36vjqf80r",
    "text": "Standard Cell Library (.lib)"
  },
  {
    "id": "h.pnzzjqm4w1vt",
    "text": "5. Simple Mapping Example (Clear)"
  },
  {
    "id": "h.v00if3vtqpf3",
    "text": "RTL:"
  },
  {
    "id": "h.uf3r53grgo26",
    "text": "Tool Decision:"
  },
  {
    "id": "h.gm1nv6rt21qm",
    "text": "6. Mapping is Constraint Driven (Again!)"
  },
  {
    "id": "h.kd1sn2lazzlj",
    "text": "Example:"
  },
  {
    "id": "h.cbwxhxrhg4nj",
    "text": "7. What Exactly Happens During Mapping?"
  },
  {
    "id": "h.we3e7lxxbexf",
    "text": "8. Commands Related to Mapping"
  },
  {
    "id": "h.66rwfrpyxsrw",
    "text": "9. Gate-Level Netlist After Mapping"
  },
  {
    "id": "h.ms8iih2g8q6a",
    "text": "1.1. Student Summary"
  },
  {
    "id": "h.3ad5ir8t4to7",
    "text": "TOPIC 6: RTL vs GATE-LEVEL NETLIST"
  },
  {
    "id": "h.wl0bush7fwsm",
    "text": "& Why RTL is NOT Used as PNR Input"
  },
  {
    "id": "h.lczt8pirsxdt",
    "text": "1. What is RTL? (Quick Recall – in Simple English)"
  },
  {
    "id": "h.bpfu7acikb6p",
    "text": "2. What is Gate-Level Netlist?"
  },
  {
    "id": "h.pkvzescfv19p",
    "text": "3. Key Differences (STUDENT MUST MEMORIZE)"
  },
  {
    "id": "h.oxhqxgtyvuqy",
    "text": "4. Why RTL Cannot Be Used for PNR? (Very Important)"
  },
  {
    "id": "h.igoqw8md69ig",
    "text": "PNR needs:"
  },
  {
    "id": "h.alwurhdldir5",
    "text": "RTL does NOT have:"
  },
  {
    "id": "h.u3dir7xf4zkk",
    "text": "5. Real-Life Example (BEST FOR STUDENTS)"
  },
  {
    "id": "h.xtblwfi254h3",
    "text": "6. What Exactly PNR Expects as Input?"
  },
  {
    "id": "h.qz6mphbymgcw",
    "text": "7. Example Comparison (Clear)"
  },
  {
    "id": "h.yvd12h4t4zbr",
    "text": "RTL:"
  },
  {
    "id": "h.n4g510lp9qrg",
    "text": "Gate-level:"
  },
  {
    "id": "h.utnlm3wmm1p7",
    "text": "9. Student Conclusion"
  },
  {
    "id": "h.u6uslf5p5c2k",
    "text": "TOPIC 7: INPUTS OF LOGICAL SYNTHESIS"
  },
  {
    "id": "h.evbwilb1alet",
    "text": "1. What Are the Inputs of Logical Synthesis?"
  },
  {
    "id": "h.o6zvede10egu",
    "text": "2. Input-1: RTL (Register Transfer Level)"
  },
  {
    "id": "h.dz7qztxtww0r",
    "text": "What is RTL input?"
  },
  {
    "id": "h.1jwgceen0ei6",
    "text": "Example RTL:"
  },
  {
    "id": "h.k1u1pwvbv1mo",
    "text": "What information RTL provides?"
  },
  {
    "id": "h.7t63yn6ajlea",
    "text": "Commands to read RTL (Synopsys DC example):"
  },
  {
    "id": "h.r56ge5bm1m1u",
    "text": "3. Input-2: Technology Library (.lib)"
  },
  {
    "id": "h.vdb6pgkuvflv",
    "text": "What is .lib file?"
  },
  {
    "id": "h.8qdtsmiseq3u",
    "text": "What .lib contains (CRITICAL):"
  },
  {
    "id": "h.iz8yk76hll8j",
    "text": "Example Cell in .lib:"
  },
  {
    "id": "h.urdebh4qcab7",
    "text": "Why .lib is mandatory?"
  },
  {
    "id": "h.5nw2s1qn8j1",
    "text": "Command to read library:"
  },
  {
    "id": "h.xzh9gw6p3w7x",
    "text": "4. Input-3: Timing Constraints (.sdc)"
  },
  {
    "id": "h.kt1z13o01ip7",
    "text": "What is SDC?"
  },
  {
    "id": "h.d1sgww10di53",
    "text": "What SDC defines:"
  },
  {
    "id": "h.fqs73ic714hr",
    "text": "Example SDC:"
  },
  {
    "id": "h.i70sbnt0hdjv",
    "text": "Input delay example:"
  },
  {
    "id": "h.wy6lx5mzs9c7",
    "text": "Why SDC is required?"
  },
  {
    "id": "h.wwjtdx2fnxri",
    "text": "5. What Happens If Inputs Are Wrong?"
  },
  {
    "id": "h.yuh6f5bvpb36",
    "text": "6. Complete Input Flow (Student Friendly)"
  },
  {
    "id": "h.rp7hdbv5bcfk",
    "text": "7. Student Conclusion"
  },
  {
    "id": "h.riaawckn7jqe",
    "text": "What Exactly Happens in Logical Synthesis – FLOW DIAGRAM EXPLANATION"
  },
  {
    "id": "h.vy2lbmu68gmd",
    "text": "1. First: Why a “flow diagram” is needed"
  },
  {
    "id": "h.5v0gtupgizze",
    "text": "2. Complete Logical Synthesis Flow (High-Level)"
  },
  {
    "id": "h.p43kkuvc1jlb",
    "text": "3. Block-1: RTL Code (Input Stage)"
  },
  {
    "id": "h.co3ydl7tpvrk",
    "text": "What is given to the tool?"
  },
  {
    "id": "h.rnmozenvez97",
    "text": "4. Block-2: RTL Analysis (Syntax + Semantic Check)"
  },
  {
    "id": "h.uudylv3513w0",
    "text": "What happens internally?"
  },
  {
    "id": "h.vvj8noo4duc2",
    "text": "5. Block-3: Elaboration (Hierarchy Construction)"
  },
  {
    "id": "h.4pjh672uyp03",
    "text": "This is the MOST misunderstood stage"
  },
  {
    "id": "h.819akqwgtefj",
    "text": "What elaboration really does:"
  },
  {
    "id": "h.tw44u2vehmkv",
    "text": "6. Block-4: Generic Logic Creation (Abstract Logic)"
  },
  {
    "id": "h.6v5hsfke6sk7",
    "text": "7. Block-5: Design Optimization (Pre-Mapping)"
  },
  {
    "id": "h.hnl9j7tfy28",
    "text": "What optimization means here:"
  },
  {
    "id": "h.sw6wj1kid4vy",
    "text": "Types of optimization here:"
  },
  {
    "id": "h.570narnzkvbp",
    "text": "8. Block-6: Technology Mapping (Gate Selection)"
  },
  {
    "id": "h.okjweivx7gwq",
    "text": "9. Block-7: Constraint-Driven Optimization (Post-Mapping)"
  },
  {
    "id": "h.2w3cr8lpo7d",
    "text": "Block-8: Final Output Generation"
  },
  {
    "id": "h.8g1sqsjwlntt",
    "text": "Main outputs:"
  },
  {
    "id": "h.6y2gpsv9f67n",
    "text": "1.1. Very Important Student Note"
  },
  {
    "id": "h.w2jqb643p8kc",
    "text": "Logical synthesis flow is:"
  },
  {
    "id": "h.xmp0fty30n4b",
    "text": "1.2. Summary (Must remember)"
  },
  {
    "id": "h.atcz12f2rp9r",
    "text": "CONCLUSION (Lecture Style)"
  },
  {
    "id": "h.x17jpytcnqy",
    "text": "Logical Synthesis – Advantages and Disadvantages (Industry Perspective)"
  },
  {
    "id": "h.6kkb9xyto8sj",
    "text": "1. Why we even need Logical Synthesis (Context)"
  },
  {
    "id": "h.h15ucoc0o74f",
    "text": "2. Advantages of Logical Synthesis (With Explanation)"
  },
  {
    "id": "h.g7b7ha6xrn3v",
    "text": "Advantage 1: Converts Human Intent into Hardware"
  },
  {
    "id": "h.6dbrrhmskuyj",
    "text": "Advantage 2: Automatic Timing Optimization"
  },
  {
    "id": "h.d82wud50hax9",
    "text": "Advantage 3: Technology Independence"
  },
  {
    "id": "h.8rchwdj0maed",
    "text": "Advantage 4: Area Optimization"
  },
  {
    "id": "h.d50o8s9r7zpt",
    "text": "Advantage 5: Power Optimization"
  },
  {
    "id": "h.bvbsa45r0umy",
    "text": "Advantage 6: Handles Huge Designs"
  },
  {
    "id": "h.9wr5b68v5caa",
    "text": "3. Disadvantages of Logical Synthesis (Very Important)"
  },
  {
    "id": "h.3o08f88b3mv5",
    "text": "Disadvantage 1: Depends Heavily on RTL Quality"
  },
  {
    "id": "h.s1rub1uijsmw",
    "text": "Disadvantage 2: Limited Physical Awareness"
  },
  {
    "id": "h.xe7g3uwosu3z",
    "text": "Disadvantage 3: Over-Optimization Risk"
  },
  {
    "id": "h.rbgqopaq6jkg",
    "text": "Disadvantage 4: Tool-Dependent Results"
  },
  {
    "id": "h.bhnuor39ln9",
    "text": "Disadvantage 5: Debug Complexity"
  },
  {
    "id": "h.ip91bhv5qw26",
    "text": "4. When Logical Synthesis is NOT Enough"
  },
  {
    "id": "h.7xwyt0dmydcy",
    "text": "5. Industry Reality (Very Important)"
  },
  {
    "id": "h.8zsct9abyw2t",
    "text": "6. Student-Friendly Summary"
  },
  {
    "id": "h.qc5o4xfbig46",
    "text": "Advantages:"
  },
  {
    "id": "h.zcfx4ryw9do1",
    "text": "Disadvantages:"
  },
  {
    "id": "h.m8wd1ggdee25",
    "text": "7. Final Conclusion (Lecture Style)"
  },
  {
    "id": "h.vm88f3y6879a",
    "text": "Combinational Merging & Sequential Merging in Logical Synthesis"
  },
  {
    "id": "h.50nlchw76wt2",
    "text": "1. First Understand: What is “Merging”?"
  },
  {
    "id": "h.kp63d6dc88a",
    "text": "2. Combinational Merging (In Depth)"
  },
  {
    "id": "h.9yovqg37t5qt",
    "text": "What is Combinational Logic?"
  },
  {
    "id": "h.3tesde3r8cjb",
    "text": "What is Combinational Merging?"
  },
  {
    "id": "h.fiw3rk4dygsd",
    "text": "Simple RTL Example"
  },
  {
    "id": "h.dpms44m1pvie",
    "text": "Without merging:"
  },
  {
    "id": "h.vnl5tplowsvz",
    "text": "With merging:"
  },
  {
    "id": "h.ben347r718ml",
    "text": "When Does Combinational Merging Happen?"
  },
  {
    "id": "h.mly0hed37fvg",
    "text": "More Realistic Example"
  },
  {
    "id": "h.g88zc9ifmnim",
    "text": "Why Tools Do Combinational Merging?"
  },
  {
    "id": "h.a11o5aa4odk6",
    "text": "When Combinational Merging is Dangerous"
  },
  {
    "id": "h.f8jlzkvihji5",
    "text": "3. Sequential Merging (In Depth)"
  },
  {
    "id": "h.taou57ajs7kt",
    "text": "What is Sequential Logic?"
  },
  {
    "id": "h.c6rtik715osx",
    "text": "What is Sequential Merging?"
  },
  {
    "id": "h.yruwt31o07ha",
    "text": "RTL Example"
  },
  {
    "id": "h.vl8kwjb3iym7",
    "text": "Without merging:"
  },
  {
    "id": "h.chk5beh2f1k",
    "text": "With merging:"
  },
  {
    "id": "h.u2q7uldgwxr5",
    "text": "When Sequential Merging Happens?"
  },
  {
    "id": "h.9za2pkn99go0",
    "text": "Why Sequential Merging is Risky"
  },
  {
    "id": "h.gq5cdaphnma6",
    "text": "4. How to Control Merging (Very Important)"
  },
  {
    "id": "h.83drubm5xk3z",
    "text": "Prevent Merging (Industry Usage)"
  },
  {
    "id": "h.p8pxaulv1l0s",
    "text": "Why Engineers Prevent Merging?"
  },
  {
    "id": "h.1lgzhb5b9dv3",
    "text": "5. Combinational vs Sequential Merging (Comparison)"
  },
  {
    "id": "h.gyv3ip8108lc",
    "text": "6. Interview-Level Understanding"
  },
  {
    "id": "h.a89z7ib7c6vi",
    "text": "7. Student Summary"
  },
  {
    "id": "h.x1urbzs4ov40",
    "text": "8. Conclusion (Lecture Style)"
  },
  {
    "id": "h.ef1jvdnz1u5n",
    "text": "Empty Module in Logical Synthesis – What it is, Why Tool Removes it"
  },
  {
    "id": "h.4p7m7g3bi4hn",
    "text": "1. What is a Module in RTL?"
  },
  {
    "id": "h.wddeee45l419",
    "text": "2. What is an Empty Module?"
  },
  {
    "id": "h.mfdbktom555f",
    "text": "Example of Empty Module"
  },
  {
    "id": "h.3p10b0rgjwfl",
    "text": "3. Why Do Empty Modules Exist?"
  },
  {
    "id": "h.awcwuvuhdpsf",
    "text": "Common reasons:"
  },
  {
    "id": "h.irillgg2090y",
    "text": "1. Placeholder modules"
  },
  {
    "id": "h.hsvkn6j6gsjn",
    "text": "2. Feature disabled by ifdef"
  },
  {
    "id": "h.nb9tgke0ankp",
    "text": "3. Parameter-based removal"
  },
  {
    "id": "h.z0p9863zxmhn",
    "text": "4. IP integration shells"
  },
  {
    "id": "h.e5rm1o7f5hk5",
    "text": "4. What Does Synthesis Do with Empty Modules?"
  },
  {
    "id": "h.ioodg33tvgom",
    "text": "Synthesis Tool Behavior"
  },
  {
    "id": "h.pkt0igiai6mv",
    "text": "Synthesis Message Example"
  },
  {
    "id": "h.z3j37ljp369b",
    "text": "5. At Which Stage Empty Modules Are Removed?"
  },
  {
    "id": "h.x2mic9n6os49",
    "text": "6. Does Removing Empty Module Break Design?"
  },
  {
    "id": "h.26isq4nghc7e",
    "text": "7. When Empty Module Removal is a PROBLEM?"
  },
  {
    "id": "h.96g8wyx4tifz",
    "text": "Dangerous scenarios:"
  },
  {
    "id": "h.g3t9tt58skpn",
    "text": "Case 1: Expected logic missing"
  },
  {
    "id": "h.1y4qez8yem54",
    "text": "Case 2: Missed macro definition"
  },
  {
    "id": "h.p9jwoulbz5rq",
    "text": "8. How to Detect Empty Modules Early?"
  },
  {
    "id": "h.htxfftaf9tjd",
    "text": "Check Elaboration Report"
  },
  {
    "id": "h.4n7kfjq0zn0",
    "text": "9. How to Prevent Removal (If Needed)?"
  },
  {
    "id": "h.ywibozvq0aa4",
    "text": "Option 1. Add Dummy Logic (Rare)"
  },
  {
    "id": "h.n72zy6u8nz7l",
    "text": "Option 2. set_dont_touch (Not recommended for empty logic)"
  },
  {
    "id": "h.ffq193zbrqaa",
    "text": "Real Industry Example"
  },
  {
    "id": "h.l3f038ywkd4s",
    "text": "1.1. Interview Question"
  },
  {
    "id": "h.1gla5rrpso1c",
    "text": "1.2. Student Summary"
  },
  {
    "id": "h.2c0e5oacqfcj",
    "text": "1.3. Conclusion (Lecture Style)"
  },
  {
    "id": "h.mkrzqhg21ft5",
    "text": "set_dont_touch & set_dont_use – How to Control Synthesis Optimization"
  },
  {
    "id": "h.b68bbb82xkn",
    "text": "1. Why Do We Need These Commands?"
  },
  {
    "id": "h.qocbbrfg4t17",
    "text": "Reality of Logical Synthesis"
  },
  {
    "id": "h.p5laqtxhkja4",
    "text": "2. set_dont_touch – What Exactly It Does"
  },
  {
    "id": "h.pxc37crxjavm",
    "text": "Definition (Simple English)"
  },
  {
    "id": "h.gm02wyakt80",
    "text": "What Can Be Protected?"
  },
  {
    "id": "h.krywv7axtszs",
    "text": "Syntax"
  },
  {
    "id": "h.pmnfdx3z186x",
    "text": "Examples"
  },
  {
    "id": "h.x1jc0chtvx9d",
    "text": "Example 1. Protect a module"
  },
  {
    "id": "h.p3zmsiprg95w",
    "text": "Example 2. Protect a specific instance"
  },
  {
    "id": "h.yw22whkt2nbb",
    "text": "Example 3. Protect a register"
  },
  {
    "id": "h.myrmkt2m8d4k",
    "text": "3. When Do We Use set_dont_touch? (Industry Cases)"
  },
  {
    "id": "h.ui0o16kq5qtq",
    "text": "Case 1: Debug logic"
  },
  {
    "id": "h.p166pdkau3a1",
    "text": "Case 2: ECO-ready logic"
  },
  {
    "id": "h.tzct2tyh0h0v",
    "text": "Case 3: Pre-verified IP"
  },
  {
    "id": "h.m4xlzosxa6sb",
    "text": "Case 4: Clock gating cells"
  },
  {
    "id": "h.h6929my7km6d",
    "text": "4. set_dont_touch vs dont_touch_network"
  },
  {
    "id": "h.1wqnuuo7qrd2",
    "text": "dont_touch_network"
  },
  {
    "id": "h.84lzhkfuvf1y",
    "text": "5. Important Warning  (Very Important)"
  },
  {
    "id": "h.ts9ljkj30k6e",
    "text": "6. set_dont_use – What Exactly It Does"
  },
  {
    "id": "h.s8z4bgqpievi",
    "text": "Definition"
  },
  {
    "id": "h.zfwh8221s2gw",
    "text": "Syntax"
  },
  {
    "id": "h.a0ayyn4dauxk",
    "text": "Example 1. Block a slow cell"
  },
  {
    "id": "h.jz0tniw688ca",
    "text": "Example 2. Block low-VT cell (power reason)"
  },
  {
    "id": "h.akj6cidp566d",
    "text": "7. Why set_dont_use is Needed?"
  },
  {
    "id": "h.m8gdooik2txn",
    "text": "Industry Reasons:"
  },
  {
    "id": "h.gqz5p7704olf",
    "text": "1. Timing risk"
  },
  {
    "id": "h.g5gtd8gf49mb",
    "text": "2. Power issue"
  },
  {
    "id": "h.473dvrbrzlzn",
    "text": "3. DRC issue"
  },
  {
    "id": "h.12bzdplxyqh8",
    "text": "4. Physical design constraints"
  },
  {
    "id": "h.wxix50fzbd08",
    "text": "8. Difference: set_dont_touch vs set_dont_use"
  },
  {
    "id": "h.phm7sf7u45s",
    "text": "9. Where These Commands Act in Synthesis Flow?"
  },
  {
    "id": "h.lm4t7v4m3m9",
    "text": "Real Industry Flow Example"
  },
  {
    "id": "h.ncxyidnrq7uz",
    "text": "1.1. Interview Questions"
  },
  {
    "id": "h.qp8ttxyhdoez",
    "text": "1.2. Student Summary"
  },
  {
    "id": "h.xri2ruzymm2",
    "text": "1.3. Conclusion"
  },
  {
    "id": "h.rkgkyfxekj8p",
    "text": "Unresolved References in Logical Synthesis"
  },
  {
    "id": "h.87mpjf470aol",
    "text": "1. What is an Unresolved Reference?"
  },
  {
    "id": "h.8q0p99o9j51s",
    "text": "Simple Definition (Student Friendly)"
  },
  {
    "id": "h.cyugf1x5oyuo",
    "text": "Typical Error Message"
  },
  {
    "id": "h.dtqwmr2r75b",
    "text": "2. Where Does This Error Appear in Flow?"
  },
  {
    "id": "h.h4u6ry8engi5",
    "text": "3. Most Common Causes of Unresolved References"
  },
  {
    "id": "h.9bgeyqs9hr0s",
    "text": "1. Missing RTL File"
  },
  {
    "id": "h.2y1cnv7p7zo7",
    "text": "2. Module Name Mismatch"
  },
  {
    "id": "h.aclacupuxrwa",
    "text": "3. Library Not Loaded (.lib)"
  },
  {
    "id": "h.kv4gx5egpv9",
    "text": "4. Black Box Module"
  },
  {
    "id": "h.ymbpbliolka3",
    "text": "5. Wrong Search Path"
  },
  {
    "id": "h.uya35216qo6m",
    "text": "4. Types of Unresolved References"
  },
  {
    "id": "h.te1juqoztck4",
    "text": "Type 1: RTL Unresolved Reference"
  },
  {
    "id": "h.gbehyrh22j6a",
    "text": "Type 2: Library Cell Unresolved Reference"
  },
  {
    "id": "h.e3k7cc8x3miy",
    "text": "Type 3: IP / Memory Black Box"
  },
  {
    "id": "h.tejojh2oempp",
    "text": "5. How to Detect Unresolved References"
  },
  {
    "id": "h.cunrdm4z3zko",
    "text": "Command"
  },
  {
    "id": "h.9cq6t672i0h6",
    "text": "Output Example"
  },
  {
    "id": "h.wwruxmv695z9",
    "text": "6. How to Fix Unresolved References (Step-by-Step)"
  },
  {
    "id": "h.5gbm5o6nzubx",
    "text": "Fix 1: Read All RTL Files"
  },
  {
    "id": "h.yo43m7ngp60l",
    "text": "Fix 2: Check Module Names"
  },
  {
    "id": "h.hafuv9u0kv6r",
    "text": "Fix 3: Load Correct Libraries"
  },
  {
    "id": "h.gvcuu3j3s2oi",
    "text": "Fix 4: Set Search Path"
  },
  {
    "id": "h.czcrqj9xthrf",
    "text": "Fix 5: Use Black Box Intentionally"
  },
  {
    "id": "h.8o6tpcywzm3k",
    "text": "7. Black Box vs Unresolved Reference"
  },
  {
    "id": "h.34exw5m0nphi",
    "text": "8. Real Industry Example"
  },
  {
    "id": "h.p50jjvnrierb",
    "text": "Scenario:"
  },
  {
    "id": "h.c1perz66vd3r",
    "text": "9. What Happens If You Ignore It?"
  },
  {
    "id": "h.foidbwxu19wl",
    "text": "Interview Questions"
  },
  {
    "id": "h.4ir4v8fc25my",
    "text": "1.1. Student Summary"
  },
  {
    "id": "h.s818tf8ejau2",
    "text": "1.2. Conclusion"
  },
  {
    "id": "h.zfw4ocfbhi79",
    "text": "Clock Gating in Logical Synthesis"
  },
  {
    "id": "h.iyxgwvbxe0pw",
    "text": "1. Why Clock Gating is Needed (Very Simple Start)"
  },
  {
    "id": "h.fshmy2b34wl8",
    "text": "Problem First (Without Clock Gating)"
  },
  {
    "id": "h.1flpu6iu3lsp",
    "text": "Real-Life Example"
  },
  {
    "id": "h.wh1m7ai6ekh0",
    "text": "2. What is Clock Gating? (Correct Industry Definition)"
  },
  {
    "id": "h.qyd8htpr8fc7",
    "text": "3. What Happens Without Clock Gating?"
  },
  {
    "id": "h.dxwbtl9hruvq",
    "text": "4. What Happens With Clock Gating?"
  },
  {
    "id": "h.w8xde631l5bn",
    "text": "5. Where Clock Gating is Added in Flow?"
  },
  {
    "id": "h.v56g2j8mhf0h",
    "text": "Correct Answer (Very Important)"
  },
  {
    "id": "h.8ic65h444k2e",
    "text": "6. Types of Clock Gating"
  },
  {
    "id": "h.mpvv45mkenm",
    "text": "1. RTL Clock Gating (Manual)"
  },
  {
    "id": "h.m373n56zbzgr",
    "text": "2. Synthesis Clock Gating (Automatic)"
  },
  {
    "id": "h.xgnu4cbgy2ex",
    "text": "7. Clock Gating Cell (Very Important)"
  },
  {
    "id": "h.w7wn0tboqc85",
    "text": "What is a Clock Gating Cell?"
  },
  {
    "id": "h.6i1b2x49fbj6",
    "text": "Why Normal AND Gate is NOT Used?"
  },
  {
    "id": "h.k3dfttlc9jn2",
    "text": "8. Clock Gating Working (Step-by-Step)"
  },
  {
    "id": "h.pvorqtalhmnc",
    "text": "9. Command to Enable Clock Gating (Industry Tool)"
  },
  {
    "id": "h.hp8nkftv50tp",
    "text": "Synopsys DC Example"
  },
  {
    "id": "h.yjvqfrctdhiu",
    "text": "Conditions for Clock Gating Inference"
  },
  {
    "id": "h.6bjburv5k3r0",
    "text": "1.1. Example: RTL → Clock Gated Netlist"
  },
  {
    "id": "h.78qd6ntt7q86",
    "text": "RTL Code"
  },
  {
    "id": "h.tnkohdb2npak",
    "text": "Synthesized Result"
  },
  {
    "id": "h.jetdcnr7ub9j",
    "text": "1.2. Why Clock Gating is NOT Done in RTL Always?"
  },
  {
    "id": "h.5aza9b1ufxbf",
    "text": "1.3. Advantages of Clock Gating"
  },
  {
    "id": "h.16w8h1b6o6oh",
    "text": "1.4. Disadvantages of Clock Gating"
  },
  {
    "id": "h.w1vbsposfnnl",
    "text": "1.5. Interview Questions"
  },
  {
    "id": "h.sufeqkvj03z0",
    "text": "1.6. Student Summary"
  },
  {
    "id": "h.lkkghfakjd78",
    "text": "1.7. Conclusion"
  },
  {
    "id": "h.rjtozhrt8xb",
    "text": "How Timing is Met in Logical Synthesis"
  },
  {
    "id": "h.n5k25he4mb6l",
    "text": "1. First Understand: What is “Timing” in Synthesis?"
  },
  {
    "id": "h.v0i122udv3kp",
    "text": "Simple Definition"
  },
  {
    "id": "h.zcp1uaw9fvrn",
    "text": "Real-Life Example"
  },
  {
    "id": "h.adx47tl03ifr",
    "text": "2. Types of Timing in Logical Synthesis"
  },
  {
    "id": "h.v8622ijfk0x3",
    "text": "3. Why Timing Fails After Synthesis?"
  },
  {
    "id": "h.g9gw4vhpzg0h",
    "text": "4. How Synthesis Tool Fixes Timing?"
  },
  {
    "id": "h.s17slwfq67a8",
    "text": "5. Path Grouping (group_path)"
  },
  {
    "id": "h.np2aqfux8km5",
    "text": "What is Path Grouping?"
  },
  {
    "id": "h.6kcckdfr1p0a",
    "text": "Why Needed?"
  },
  {
    "id": "h.v3sh8tdpw2u",
    "text": "Example Path Groups"
  },
  {
    "id": "h.5emk8yb6evj8",
    "text": "Command Example"
  },
  {
    "id": "h.8j9ksthuj3jv",
    "text": "6. Ungrouping (Hierarchy Flattening)"
  },
  {
    "id": "h.a5ey42iwf47s",
    "text": "What is Ungrouping?"
  },
  {
    "id": "h.8pvrqx6qxq6p",
    "text": "Why Needed?"
  },
  {
    "id": "h.7z6rmwigelru",
    "text": "Example"
  },
  {
    "id": "h.6778eu5onnpx",
    "text": "Command"
  },
  {
    "id": "h.pq3fcrycon5g",
    "text": "7. Boundary Optimization"
  },
  {
    "id": "h.76h7lnaapyho",
    "text": "What is Boundary Optimization?"
  },
  {
    "id": "h.t85d9pbl8jhb",
    "text": "Why Important?"
  },
  {
    "id": "h.wt3qprvqkwdq",
    "text": "Command"
  },
  {
    "id": "h.k15ilac8sdc0",
    "text": "8. Constraint Tightening"
  },
  {
    "id": "h.pfeaihta1enk",
    "text": "What is Constraint Tightening?"
  },
  {
    "id": "h.yz8wnygzt4w7",
    "text": "Example"
  },
  {
    "id": "h.pqbuux9jig2e",
    "text": "Command"
  },
  {
    "id": "h.kr37ouadhp6y",
    "text": "9. Cell Resizing & Logic Restructuring"
  },
  {
    "id": "h.m5tz9fr20uis",
    "text": "Multi-Corner Multi-Mode (MCMM)"
  },
  {
    "id": "h.s8unrtwz1k4o",
    "text": "1.1. Timing Closure Strategy (Industry)"
  },
  {
    "id": "h.5y0reyytavzi",
    "text": "1.2. Commands Used for Timing"
  },
  {
    "id": "h.ej4lwsgngbq",
    "text": "1.3. Advantages of These Techniques"
  },
  {
    "id": "h.5rotggb4kan9",
    "text": "1.4. Disadvantages / Cautions"
  },
  {
    "id": "h.l7b0vbe4kfsu",
    "text": "1.5. Interview Questions"
  },
  {
    "id": "h.rt52wjarts4w",
    "text": "1.6. Student Summary"
  },
  {
    "id": "h.walazcjrrx9a",
    "text": "1.7. Conclusion"
  },
  {
    "id": "h.kokuqpirh1u4",
    "text": "Outputs of Logical Synthesis (Industry Perspective)"
  },
  {
    "id": "h.n44eb56fcivr",
    "text": "1. Why Outputs of Logical Synthesis Are Important?"
  },
  {
    "id": "h.ximawa7kxyh1",
    "text": "2. Main Outputs of Logical Synthesis"
  },
  {
    "id": "h.tlskbb98d73j",
    "text": "3. Gate-Level Netlist (.v)"
  },
  {
    "id": "h.wjdcc8ssflk9",
    "text": "What Is Gate-Level Netlist?"
  },
  {
    "id": "h.nbxefce3lkst",
    "text": "How It Looks"
  },
  {
    "id": "h.ivcscgfu5m38",
    "text": "Why It Is Important"
  },
  {
    "id": "h.d83521y9eviz",
    "text": "Command to Generate"
  },
  {
    "id": "h.8vqq0cu0lgiw",
    "text": "4. SDC (Synopsys Design Constraints)"
  },
  {
    "id": "h.vta56gt83ujr",
    "text": "What Is SDC?"
  },
  {
    "id": "h.gznzhzig1j1v",
    "text": "Why Output SDC Is Needed?"
  },
  {
    "id": "h.kyz1irng4ok",
    "text": "Command to Write SDC"
  },
  {
    "id": "h.joys97s4qbk5",
    "text": "5. DDC / DB (Design Database)"
  },
  {
    "id": "h.wz1my76x59qr",
    "text": "What Is DDC?"
  },
  {
    "id": "h.yrpzvnxogvy6",
    "text": "Why Needed?"
  },
  {
    "id": "h.ggirlrmt0jlo",
    "text": "Command"
  },
  {
    "id": "h.gabmuaa5tnoa",
    "text": "6. Timing Reports"
  },
  {
    "id": "h.bkte3ucou401",
    "text": "Why Timing Reports?"
  },
  {
    "id": "h.4tewl3opfm0q",
    "text": "Command"
  },
  {
    "id": "h.pocmwc1mzfk0",
    "text": "Example Output Meaning"
  },
  {
    "id": "h.6ypw051pyl3e",
    "text": "7. Area Reports"
  },
  {
    "id": "h.noxtn545jaa0",
    "text": "Why Area Reports?"
  },
  {
    "id": "h.zf11qa9zcjp4",
    "text": "Command"
  },
  {
    "id": "h.1yec8jul619r",
    "text": "Example Information"
  },
  {
    "id": "h.edr00a8e7y5m",
    "text": "8. Power Reports"
  },
  {
    "id": "h.b1wtldqeoeo",
    "text": "Why Power Reports?"
  },
  {
    "id": "h.gj62ba9bwlwj",
    "text": "Command"
  },
  {
    "id": "h.xx0phh4f0att",
    "text": "Types of Power"
  },
  {
    "id": "h.utpotsez8cta",
    "text": "9. QoR (Quality of Results) Report"
  },
  {
    "id": "h.9ns9itrzanwx",
    "text": "What Is QoR?"
  },
  {
    "id": "h.i5s6vfis0hx8",
    "text": "Command"
  },
  {
    "id": "h.al3te4lxjnl0",
    "text": "Industrial-Level Logical Synthesis Flow (Step-by-Step)"
  },
  {
    "id": "h.3lz6ktp5ty6g",
    "text": "Step 1. Read Libraries"
  },
  {
    "id": "h.z9gfboxv9x3e",
    "text": "Step 2. Read RTL"
  },
  {
    "id": "h.5r8o2uhbku6t",
    "text": "Step 3. Link Design"
  },
  {
    "id": "h.j33p5luqmkbi",
    "text": "Step 4. Apply Constraints"
  },
  {
    "id": "h.kc2m83ul5ey0",
    "text": "Step 5. Compile"
  },
  {
    "id": "h.6m81pgeflfcg",
    "text": "Step 6. Reports"
  },
  {
    "id": "h.fbk54cf5vhnd",
    "text": "Step 7. Write Outputs"
  },
  {
    "id": "h.1fwdzgpsscrx",
    "text": "1.1. analyze vs elaborate vs read_verilog"
  },
  {
    "id": "h.2f5zdz5yr4s1",
    "text": "analyze"
  },
  {
    "id": "h.j3n9l29b7sv5",
    "text": "elaborate"
  },
  {
    "id": "h.t01mbesyfzhz",
    "text": "read_verilog"
  },
  {
    "id": "h.wmwgmymjth0o",
    "text": "Interview Difference Table"
  },
  {
    "id": "h.i4stfypno7go",
    "text": "1.2.  Important Topic"
  },
  {
    "id": "h.u8750mfzdp3i",
    "text": "1.3. Student Final Summary"
  },
  {
    "id": "h.654gkhascsan",
    "text": "1.4. Conclusion"
  },
  {
    "id": "h.d9f4774vlkpq",
    "text": "Linking Stage (Very Important – Often Missed)"
  },
  {
    "id": "h.212i0npgl8tt",
    "text": "What is Linking?"
  },
  {
    "id": "h.sxmxah66j5av",
    "text": "Why Important?"
  },
  {
    "id": "h.7343wn6qgqop",
    "text": "2. Design Rule Constraints (DRC at Synthesis Level)"
  },
  {
    "id": "h.ny7uy2xl2sy6",
    "text": "What Are These?"
  },
  {
    "id": "h.un4qbh727bc4",
    "text": "Why Important?"
  },
  {
    "id": "h.5nzdk2ast93n",
    "text": "3. Multicorner Multi-Mode (MCMM) Awareness"
  },
  {
    "id": "h.68zs7hnmkv56",
    "text": "What Is MCMM?"
  },
  {
    "id": "h.bctlj7mpo7sa",
    "text": "4. Clock Definition & Clock Quality"
  },
  {
    "id": "h.igfg6qttdi8j",
    "text": "Why Clock Is Special?"
  },
  {
    "id": "h.fdip5efeddfq",
    "text": "Tool Optimizes:"
  },
  {
    "id": "h.vuef2wv9rleh",
    "text": "5. Scan & DFT Awareness in Synthesis"
  },
  {
    "id": "h.c3dnc36d64mq",
    "text": "6. Formality / LEC Readiness"
  },
  {
    "id": "h.m0hhy9anhkm8",
    "text": "What Is LEC?"
  },
  {
    "id": "h.f5eceyyrahbz",
    "text": "Why Synthesis Must Care?"
  },
  {
    "id": "h.8pgwvgfzg63t",
    "text": "7. Naming Rules & Netlist Cleanliness"
  },
  {
    "id": "h.sl1mx2oiuv6b",
    "text": "Why Naming Matters?"
  },
  {
    "id": "h.rqhj8yxyyi3r",
    "text": "8. ECO Friendliness"
  },
  {
    "id": "h.7ir07476rxrk",
    "text": "What Is ECO?"
  },
  {
    "id": "h.livdy3tz2lt",
    "text": "How Synthesis Helps?"
  },
  {
    "id": "h.z9bkh7gpo99m",
    "text": "9. Hierarchy Control (Flatten vs Preserve)"
  },
  {
    "id": "h.wa74q3flwofz",
    "text": "Why Important?"
  },
  {
    "id": "h.yd0hiid400hx",
    "text": "Low-Power Intent Awareness (CPF/UPF – Intro Level)"
  }
];
  const dcHeadings = [
  {
    "id": "h.672bqutyqms3",
    "text": "STEP BY STEP PROCESS OF LOGICAL SYNTHESIS USING DC"
  },
  {
    "id": "h.yd89czl5jx61",
    "text": "Step1: create a directory for your new project like ORCA, ARM (mkdir ORCA, cd ORCA )"
  },
  {
    "id": "h.edwjysnj5bvh",
    "text": "Step2: give the permission to that directory (source .cshrc file)"
  },
  {
    "id": "h.qb1jizxp62uh",
    "text": "Step3: launch the dc_shell using below command"
  },
  {
    "id": "h.q6iuofph543e",
    "text": "Step4: search_path"
  },
  {
    "id": "h.knydw88ga0ds",
    "text": "Step5: setting link and target libraries"
  }
];
  const genusHeadings = [
  {
    "id": "h.672bqutyqms3",
    "text": "STEP BY STEP PROCESS OF LOGICAL SYNTHESIS USING Genus"
  },
  {
    "id": "h.7k2zhk6el5g1",
    "text": "1. Set the library search path (Where Genus will look for technology libraries)"
  },
  {
    "id": "h.vkt18hk332hi",
    "text": "2. Set the SDC (timing constraints) search path"
  },
  {
    "id": "h.na3nvyc6y4e",
    "text": "3. Set the Verilog (RTL) search path"
  },
  {
    "id": "h.hre3q7phsx15",
    "text": "4. Set the library file (technology file used for synthesis)"
  },
  {
    "id": "h.5wkyg79zzowp",
    "text": "5. Read the Verilog design"
  },
  {
    "id": "h.lp8p6soz2anh",
    "text": "6. Elaborate the design (build internal model)"
  },
  {
    "id": "h.e7fnskweqk39",
    "text": "7. Find clock ports automatically"
  },
  {
    "id": "h.5blsk3u4mryw",
    "text": "8. Check initial timing status"
  },
  {
    "id": "h.yyawzipr5y8k",
    "text": "9. Source (load) the SDC constraints file"
  },
  {
    "id": "h.8j3tvpxqtz08",
    "text": "10. (Inside sdcfile.tcl) – Clock and timing constraints"
  },
  {
    "id": "h.jtro6y7phy6y",
    "text": "11. Terminal commands (extra checks)"
  },
  {
    "id": "h.rbcutjolc576",
    "text": "12. After report timing fixes (multi-cycle paths)"
  },
  {
    "id": "h.nlz0dhg9jtz3",
    "text": "13. Run synthesis (Translate → Map → Optimize)"
  },
  {
    "id": "h.22t1grju4xyc",
    "text": "14. Generate reports"
  },
  {
    "id": "h.f5ki3b13am0m",
    "text": "15. Write final output files"
  }
];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.moduleLayout}>
      <div className={styles.topicsNav}>
        <div className={styles.navSectionsWrapper}>
          {/* Section 1: Synthesis Basics */}
          <div className={styles.navSection}>
            className={styles.navTitle}>Synthesis Basics - Topics</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllIntro ? introHeadings : introHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {introHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllIntro(!showAllIntro)} 
                className={styles.seeMoreBtn}
              >
                {showAllIntro ? 'See Less' : 'See More'}
              </button>
            )}
          </div>

          {/* Section 2: DC Execution */}
          <div className={styles.navSection}>
            className={styles.navTitle}>DC Execution - Topics</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllDC ? dcHeadings : dcHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {dcHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllDC(!showAllDC)} 
                className={styles.seeMoreBtn}
              >
                {showAllDC ? 'See Less' : 'See More'}
              </button>
            )}
          </div>

          {/* Section 3: Genus Execution */}
          <div className={styles.navSection}>
            className={styles.navTitle}>Genus Execution - Topics</h2>
            <div className={styles.navButtonsGrid}>
              {(showAllGenus ? genusHeadings : genusHeadings.slice(0, 8)).map((heading) => (
                <button key={heading.id} onClick={() => scrollToSection(heading.id)} className={styles.topicNavBtn}>
                  {heading.text}
                </button>
              ))}
            </div>
            {genusHeadings.length > 8 && (
              <button 
                onClick={() => setShowAllGenus(!showAllGenus)} 
                className={styles.seeMoreBtn}
              >
                {showAllGenus ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className={styles.contentCard}>
        <h1 id="h.h2cgzqenuno7" className={styles.h1}>TOPIC 1: WHAT IS SYNTHESIS (DEEP, FROM ZERO)</h1>
        id="h.wingvyc6q50i" className={styles.h2}>1. Why do we need synthesis at all?</h2>
        <p className={styles.paragraph}>A student writes RTL code like this:</p>
        <p className={styles.paragraph}>always @(posedge clk)</p>
        <p className={styles.paragraph}>{`q <= a & b;`}</p>
        <p className={styles.paragraph}>{`Question   Can silicon understand this code?  Can fabrication people manufacture always @ or & operator?`}</p>
        <p className={styles.paragraph}>NO</p>
        <p className={styles.paragraph}>Silicon understands only:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Gates (AND, OR, INV)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Flip-flops<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Wires<br></span></li>` }} />
        <p className={styles.paragraph}>So someone must convert RTL into gates. That someone is called SYNTHESIS.</p>
        <hr className={styles.divider} />
        id="h.cu3btduiykgm" className={styles.h2}>{`2. SIMPLE & INDUSTRY-CORRECT DEFINITION`}</h2>
        <p className={styles.paragraph}>Synthesis is a process of converting RTL code into an optimized gate-level netlist by applying design constraints such as timing, power, and area, so that the design can be physically implemented on silicon.</p>
        <hr className={styles.divider} />
        id="h.h2dnb1ezaajq" className={styles.h2}>3. What synthesis is NOT (important clarity)</h2>
        <p className={styles.paragraph}>Synthesis is NOT:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Simulation<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Verification<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Fabrication<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Physical design<br></span></li>` }} />
        <p className={styles.paragraph}>Synthesis does not place gates, does not route wires.</p>
        <p className={styles.paragraph}>It only decides:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Which gates?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">How many?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">How fast?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">How optimized?<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.h2t817175kx8" className={styles.h2}>4. Real-life analogy (VERY IMPORTANT FOR STUDENTS)</h2>
        <h3 id="h.vuo8y8gggd6l" className={styles.h3}>RTL = Recipe</h3>
        <h3 id="h.mi5gc7wwkh7j" className={styles.h3}>Synthesis = Chef</h3>
        <h3 id="h.ybeq2modzfrn" className={styles.h3}>Gates = Ingredients</h3>
        <p className={styles.paragraph}>Example  You say:</p>
        <p className={styles.paragraph}>“Make biryani in 30 minutes with less oil”</p>
        <p className={styles.paragraph}>Chef decides:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">How much rice?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">How much spice?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Cooking method?<br></span></li>` }} />
        <p className={styles.paragraph}>Similarly:</p>
        <p className={styles.paragraph}>RTL says:</p>
        <p className={styles.paragraph}>y = a + b;</p>
        <p className={styles.paragraph}>Constraints say:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Finish in 1ns<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Low power<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Small area<br></span></li>` }} />
        <p className={styles.paragraph}>Synthesis decides:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Which adder?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Ripple adder or CLA?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">High drive or low drive?<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.kwupvhi7yo44" className={styles.h2}>5. What exactly goes INTO synthesis?</h2>
        <p className={styles.paragraph}>Synthesis does NOT work blindly.</p>
        <p className={styles.paragraph}>It needs:</p>
        <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">RTL → What logic to build<br></span></li><li class="c5 c6 li-bullet-0"><span class="c24">.lib</span><span class="c4">&nbsp;→ What gates are available<br></span></li><li class="c5 c6 li-bullet-0"><span class="c24">.sdc</span><span class="c4">&nbsp;→ How fast &amp; how optimized<br></span></li>` }} />
        <p className={styles.paragraph}>Without ALL THREE, synthesis cannot work.</p>
        <hr className={styles.divider} />
        id="h.rk9iwp5o84o5" className={styles.h2}>6. What exactly comes OUT of synthesis?</h2>
        <p className={styles.paragraph}>After synthesis, you get:</p>
        <p className={styles.paragraph}>Gate-level netlist</p>
        <p className={styles.paragraph}>AND2_X1 U1 (.A(a), .B(b), .Y(n1));</p>
        <p className={styles.paragraph}>DFF_X1  U2 (.D(n1), .CK(clk), .Q(q));</p>
        <p className={styles.paragraph}>This file can be:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Placed<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Routed<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Fabricated<br></span></li>` }} />
        <p className={styles.paragraph}>RTL cannot.</p>
        <hr className={styles.divider} />
        id="h.na8uubo7o7me" className={styles.h2}>7. What happens INSIDE synthesis (conceptual, not headlines)</h2>
        <p className={styles.paragraph}>Synthesis internally does three BIG jobs:</p>
        <h3 id="h.d6dbptj0atln" className={styles.h3}>1. Understand logic</h3>
        <p className={styles.paragraph}>RTL → Boolean equations</p>
        <h3 id="h.ux9rrjqxkpfb" className={styles.h3}>2. Optimize logic</h3>
        <p className={styles.paragraph}>Remove:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Redundant logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Unused logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Slow paths<br></span></li>` }} />
        <h3 id="h.fbr39qj520er" className={styles.h3}>3. Map logic</h3>
        <p className={styles.paragraph}>Boolean logic → Real gates from .lib</p>
        <p className={styles.paragraph}>This happens automatically, based on constraints.</p>
        <hr className={styles.divider} />
        id="h.z0kqfxlsqqx7" className={styles.h2}>8. Very small RTL → synthesis example (CLEAR)</h2>
        <h3 id="h.9liokinlcggh" className={styles.h3}>RTL:</h3>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <h3 id="h.1u7fokctx90a" className={styles.h3}>Library has:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">AND2_X1 (slow, small)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">AND2_X4 (fast, big)<br></span></li>` }} />
        <h3 id="h.otpimaov6adu" className={styles.h3}>Constraint:</h3>
        <p className={styles.paragraph}>create_clock -period 1</p>
        <p className={styles.paragraph}>Tool thinks:</p>
        <p className={styles.paragraph}>“1ns is tight → use AND2_X4”</p>
        <p className={styles.paragraph}>If clock = 10ns:</p>
        <p className={styles.paragraph}>“Relaxed → use AND2_X1”</p>
        <p className={styles.paragraph}>THIS is synthesis intelligence</p>
        <hr className={styles.divider} />
        id="h.qzgsg5npvfnf" className={styles.h2}>9. Why synthesis optimization is REQUIRED</h2>
        <p className={styles.paragraph}>If synthesis did not optimize:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Chip would be too slow<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Too large<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Too hot (power)<br></span></li>` }} />
        <p className={styles.paragraph}>Manufacturing cost increases  Product fails</p>
        <p className={styles.paragraph}>So synthesis is mandatory, not optional.</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image27.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.u0pjla1cg9nb" className={styles.h2}>11. Student takeaway (CRITICAL)</h2>
        <p className={styles.paragraph}>After this topic, a student must remember:</p>
        <p className={styles.paragraph}>RTL is human readable  Gates are silicon readable  Synthesis is the translator + optimizer + Mapping  Constraints control synthesis decisions</p>
        <p className={styles.paragraph}>If a student understands this → foundation is strong.</p>
        <h1 id="h.cf1qrhv1meug" className={styles.h1}>TOPIC 2: TYPES OF SYNTHESIS (FROM ZERO, VERY CLEAR)</h1>
        <p className={styles.paragraph}>Before going deep, remember one golden rule:</p>
        <p className={styles.paragraph}>Synthesis is NOT a single step. It has TYPES depending on HOW MUCH physical information is known.</p>
        <hr className={styles.divider} />
        id="h.pags1i7mndoa" className={styles.h2}>1. Why do we need “types” of synthesis?</h2>
        <p className={styles.paragraph}>Think like this</p>
        <p className={styles.paragraph}>When you write RTL, you don’t know:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Where gates will be placed<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">How long wires will be<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">How congested the chip will be<br></span></li>` }} />
        <p className={styles.paragraph}>So synthesis is done in levels.</p>
        <p className={styles.paragraph}>Just like:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">School → College → Job<br> Each level has more real-world constraints.<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.5xh7lbabcoa4" className={styles.h2}>2. Main Types of Synthesis (Industry View)</h2>
        <p className={styles.paragraph}>There are TWO MAIN TYPES:</p>
        <p className={styles.paragraph}>1. Logical Synthesis 2. Physical Synthesis</p>
        <p className={styles.paragraph}>This is NOT book language — this is industry language</p>
        <hr className={styles.divider} />
        id="h.u979mkpm5aj2" className={styles.h2}>3. Logical Synthesis (MOST IMPORTANT FOR BEGINNERS)</h2>
        <h3 id="h.j4esktty56pw" className={styles.h3}>What Logical Synthesis means (CLEAR definition)</h3>
        <p className={styles.paragraph}>Logical synthesis is the process of converting RTL into an optimized gate-level netlist using timing, power, and area constraints, WITHOUT considering actual physical placement and routing.</p>
        <p className={styles.paragraph}>Key point   No placement, no routing, no wire lengths</p>
        <hr className={styles.divider} />
        <h3 id="h.nzc9is775wj2" className={styles.h3}>What logical synthesis KNOWS:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">RTL logic<br></span></li><li class="c5 c6 li-bullet-0"><span>Gate delays from </span><span class="c1">.lib<br></span></li><li class="c5 c6 li-bullet-0"><span>Clock constraints from </span><span class="c1">.sdc<br></span></li>` }} />
        <h3 id="h.yo2xiacdan8m" className={styles.h3}>What logical synthesis DOES NOT know:</h3>
        <p className={styles.paragraph}>Exact wire length  Cell placement  Congestion</p>
        <p className={styles.paragraph}>So it assumes ideal conditions.</p>
        <hr className={styles.divider} />
        id="h.pe86hdq7vmk7" className={styles.h2}>4. What exactly happens in Logical Synthesis (INSIDE TOOL)</h2>
        <p className={styles.paragraph}>Step by step (student must visualize this):</p>
        <h3 id="h.7f1qm0ugmhvb" className={styles.h3}>STEP 1: RTL is read</h3>
        <p className={styles.paragraph}>{`assign y = (a & b) | c;`}</p>
        <h3 id="h.qa7z4ljff2a7" className={styles.h3}>STEP 2: Boolean equation is created</h3>
        <p className={styles.paragraph}>y = (a AND b) OR c</p>
        <h3 id="h.5lpe5broz3y9" className={styles.h3}>STEP 3: Optimization happens</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Can logic be simplified?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Can gates be shared?<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Can delay be reduced?<br></span></li>` }} />
        <h3 id="h.rut4n8pe6lbc" className={styles.h3}>STEP 4: Mapping happens</h3>
        <p className={styles.paragraph}>Logic → Standard cells from .lib</p>
        <hr className={styles.divider} />
        id="h.grpsxtujricx" className={styles.h2}>5. Example (VERY IMPORTANT)</h2>
        <h3 id="h.aziaonz2uaa" className={styles.h3}>RTL:</h3>
        <p className={styles.paragraph}>{`assign y = a & a;`}</p>
        <h3 id="h.aatsf6o29h49" className={styles.h3}>What student wrote:</h3>
        <p className={styles.paragraph}>AND gate</p>
        <h3 id="h.gb4swksksomw" className={styles.h3}>What synthesis does:</h3>
        <p className={styles.paragraph}>y = a</p>
        <p className={styles.paragraph}>{`AND gate removed  Why? Because a & a = a`}</p>
        <p className={styles.paragraph}>This is logical optimization</p>
        <hr className={styles.divider} />
        id="h.139vuh8ai34k" className={styles.h2}>6. Why Logical Synthesis is REQUIRED</h2>
        <p className={styles.paragraph}>If we skip logical synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Design too slow <br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Area too big <br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Power too high <br></span></li>` }} />
        <p className={styles.paragraph}>PNR tools expect: ✔ Clean ✔ Optimized ✔ Gate-level netlist</p>
        <p className={styles.paragraph}>RTL cannot be given directly to PNR.</p>
        <hr className={styles.divider} />
        id="h.lnex976mp8p3" className={styles.h2}>7. Advantages of Logical Synthesis</h2>
        <p className={styles.paragraph}>Fast execution  Early timing estimation  Catches RTL issues early  Reduces logic complexity  Industry standard first step</p>
        <hr className={styles.divider} />
        id="h.weckgsihnqw3" className={styles.h2}>8. Disadvantages of Logical Synthesis (VERY IMPORTANT)</h2>
        <p className={styles.paragraph}>No real wire delay  Timing may change after placement  Congestion not visible  Clock skew not accurate</p>
        <p className={styles.paragraph}>That’s why Physical Synthesis exists.</p>
        <hr className={styles.divider} />
        id="h.dp5cjsy4ihf8" className={styles.h2}>9. Physical Synthesis (HIGH-LEVEL, not deep yet)</h2>
        <h3 id="h.xh66jkfahxos" className={styles.h3}>Simple definition:</h3>
        <p className={styles.paragraph}>Physical synthesis is synthesis performed with placement awareness, where gate optimization considers real wire lengths and congestion.</p>
        <p className={styles.paragraph}>Logical synthesis = assumption Physical synthesis = reality</p>
        <p className={styles.paragraph}>We will cover this later in detail.</p>
        <hr className={styles.divider} />
        id="h.um0ltxrsolp8" className={styles.h2}>Comparison Table (Student Friendly)</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c12" colspan="1" rowspan="1"><p class="c0"><span class="c14">Feature</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c0"><span class="c14">Logical Synthesis</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c0"><span class="c14">Physical Synthesis</span></p></td></tr><tr class="c63"><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Placement aware</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c7"><span class="c4">&nbsp;No</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c4">&nbsp;Yes</span></p></td></tr><tr class="c10"><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Wire delay</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c7"><span class="c4">Estimated</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c4">Realistic</span></p></td></tr><tr class="c10"><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Speed</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c7"><span class="c4">Faster</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c4">Slower</span></p></td></tr><tr class="c10"><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Accuracy</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c7"><span class="c4">Medium</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c4">High</span></p></td></tr><tr class="c10"><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Used when</span></p></td><td class="c18" colspan="1" rowspan="1"><p class="c7"><span class="c4">Early stage</span></p></td><td class="c40" colspan="1" rowspan="1"><p class="c7"><span class="c4">Later stage</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image21.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.4s2jjbax1qju" className={styles.h2}>1.2. Student Conclusion (VERY IMPORTANT)</h2>
        <p className={styles.paragraph}>A student should remember:</p>
        <p className={styles.paragraph}>✔ Logical synthesis = logic + constraints ✔ Physical synthesis = logic + constraints + placement ✔ Logical synthesis ALWAYS comes first ✔ Physical synthesis refines it</p>
        <h1 id="h.k39uqpi48av0" className={styles.h1}>TOPIC 3: TRANSLATION IN LOGICAL SYNTHESIS (FROM ZERO)</h1>
        <p className={styles.paragraph}>This is the first real internal step of logical synthesis. Most students don’t understand it — now you will</p>
        <hr className={styles.divider} />
        id="h.2iwczqvlj0ok" className={styles.h2}>1. What is Translation? (Very clear definition)</h2>
        <p className={styles.paragraph}>Translation is the process where the synthesis tool converts RTL code (Verilog/VHDL) into an internal Boolean and data-structure representation that the tool can understand and manipulate.</p>
        <p className={styles.paragraph}>Key idea   Tool does NOT work directly on Verilog text  It first converts RTL into its own internal model</p>
        <hr className={styles.divider} />
        id="h.b3aoag13q1sm" className={styles.h2}>2. In which stage of synthesis does Translation happen?</h2>
        <p className={styles.paragraph}>Translation happens at the VERY BEGINNING of Logical Synthesis.</p>
        <h3 id="h.4bsgwhm5bs1m" className={styles.h3}>Logical Synthesis Flow (high level):</h3>
        <p className={styles.paragraph}>1. Translation  2. Optimization 3. Technology Mapping 4. Netlist Generation</p>
        <p className={styles.paragraph}>So remember clearly:</p>
        <p className={styles.paragraph}>Translation = FIRST STEP</p>
        <hr className={styles.divider} />
        id="h.tbyro5qenhe5" className={styles.h2}>3. Why Translation is required?</h2>
        <p className={styles.paragraph}>Humans understand RTL like this:</p>
        <p className={styles.paragraph}>{`assign y = (a & b) | c;`}</p>
        <p className={styles.paragraph}>But tools understand logic like:</p>
        <p className={styles.paragraph}>Node1 = AND(a, b)</p>
        <p className={styles.paragraph}>Node2 = OR(Node1, c)</p>
        <p className={styles.paragraph}>So translation:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Removes syntax<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Builds logic graph<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Creates internal data structures<br></span></li>` }} />
        <p className={styles.paragraph}>Without translation  → No optimization → No mapping → No synthesis</p>
        <hr className={styles.divider} />
        id="h.qg2c1gu590v" className={styles.h2}>4. What exactly happens during Translation? (Internals)</h2>
        <p className={styles.paragraph}>During translation, the tool:</p>
        <p className={styles.paragraph}>✔ Parses RTL syntax ✔ Checks syntax errors ✔ Identifies modules, ports, wires, regs ✔ Builds Boolean equations ✔ Creates RTL database / design database</p>
        <p className={styles.paragraph}>At this stage:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">&nbsp;No optimization<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">&nbsp;No gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">&nbsp;No timing improvement<br></span></li>` }} />
        <p className={styles.paragraph}>Only understanding the design</p>
        <hr className={styles.divider} />
        id="h.62hgfpgfgvnz" className={styles.h2}>5. Simple Example (VERY IMPORTANT)</h2>
        <h3 id="h.7eehm6js3d2q" className={styles.h3}>RTL Code:</h3>
        <p className={styles.paragraph}>module and_or (</p>
        <p className={styles.paragraph}>input a, b, c,</p>
        <p className={styles.paragraph}>output y</p>
        <p className={styles.paragraph}>);</p>
        <p className={styles.paragraph}>{`assign y = (a & b) | c;`}</p>
        <p className={styles.paragraph}>endmodule</p>
        <h3 id="h.905d8dko0ig2" className={styles.h3}>After Translation (Conceptual):</h3>
        <p className={styles.paragraph}>Design DB:</p>
        <p className={styles.paragraph}>Inputs: a, b, c</p>
        <p className={styles.paragraph}>Output: y</p>
        <p className={styles.paragraph}>Logic:</p>
        <p className={styles.paragraph}>t1 = a AND b</p>
        <p className={styles.paragraph}>y  = t1 OR c</p>
        <p className={styles.paragraph}>Still no NAND, NOR, INV  Only logic relationships</p>
        <hr className={styles.divider} />
        id="h.coasll6utayt" className={styles.h2}>6. Commands related to Translation (Industry tools)</h2>
        <h3 id="h.aowvkxx4sy3t" className={styles.h3}>In Synopsys Design Compiler (example):</h3>
        <p className={styles.paragraph}>analyze -format verilog and_or.v</p>
        <p className={styles.paragraph}>elaborate and_or</p>
        <p className={styles.paragraph}>OR (new style):</p>
        <p className={styles.paragraph}>read_verilog and_or.v</p>
        <p className={styles.paragraph}>analyze → parses RTL  elaborate → builds design hierarchy  read_verilog → does both together</p>
        <p className={styles.paragraph}>(We will explain analyze vs elaborate vs read_verilog later in detail)</p>
        <hr className={styles.divider} />
        <p className={styles.paragraph}>7. Errors caught during Translation</p>
        <p className={styles.paragraph}>This stage catches:</p>
        <p className={styles.paragraph}>Syntax errors  Missing modules  Port mismatches  Width mismatches  Unresolved references (we’ll cover later)</p>
        <p className={styles.paragraph}>So translation = RTL sanity check</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image23.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.pgs9fe7v5367" className={styles.h2}>9. Student-Level Summary</h2>
        <p className={styles.paragraph}>A student should remember:</p>
        <p className={styles.paragraph}>✔ Translation is the first step of logical synthesis ✔ RTL is converted into tool-understandable logic ✔ No optimization happens here ✔ Commands: analyze, elaborate, read_verilog ✔ Errors are caught early</p>
        <h1 id="h.u10dfe1abzcz" className={styles.h1}>TOPIC 4: OPTIMIZATION IN LOGICAL SYNTHESIS (FROM ZERO)</h1>
        <p className={styles.paragraph}>This is the heart of synthesis. Most beginners think synthesis = conversion.  No. Synthesis = OPTIMIZATION</p>
        <hr className={styles.divider} />
        id="h.7e3wo2rcewh7" className={styles.h2}>{`1. What is Optimization? (Clear & Practical Definition)`}</h2>
        <p className={styles.paragraph}>Optimization is the process of modifying the translated RTL logic to achieve the best possible timing, area, and power while still maintaining the same functionality.</p>
        <p className={styles.paragraph}>Simple words for students   Same output  Less delay  Less gates  Less power</p>
        <hr className={styles.divider} />
        id="h.6cwr2z38p5gu" className={styles.h2}>2. Why Optimization is Needed? (Real-life example)</h2>
        <p className={styles.paragraph}>Imagine you write RTL like this:</p>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <p className={styles.paragraph}>{`assign z = a & b;`}</p>
        <p className={styles.paragraph}>Functionally correct  But hardware result :</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Two AND gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Same inputs<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Waste of area &amp; power<br></span></li>` }} />
        <p className={styles.paragraph}>Optimization will:</p>
        <p className={styles.paragraph}>{`wire t = a & b;`}</p>
        <p className={styles.paragraph}>assign y = t;</p>
        <p className={styles.paragraph}>assign z = t;</p>
        <p className={styles.paragraph}>✔ One AND gate ✔ Less area ✔ Less power</p>
        <hr className={styles.divider} />
        id="h.725xonbbcgoe" className={styles.h2}>3. When does Optimization happen in synthesis?</h2>
        <p className={styles.paragraph}>Logical Synthesis Flow (updated):</p>
        <p className={styles.paragraph}>1. Translation  2. Optimization  3. Mapping 4. Netlist generation</p>
        <p className={styles.paragraph}>So optimization happens AFTER translation and BEFORE mapping.</p>
        <hr className={styles.divider} />
        id="h.intr1ffgcurb" className={styles.h2}>4. Types of Optimization (VERY IMPORTANT)</h2>
        <p className={styles.paragraph}>Optimization is driven by constraints.</p>
        <h3 id="h.a1juqv2r9em2" className={styles.h3}>1. Timing Optimization</h3>
        <p className={styles.paragraph}>Goal: Make design faster</p>
        <p className={styles.paragraph}>Examples:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Reduce logic depth<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Balance paths<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Restructure logic<br></span></li>` }} />
        <h3 id="h.xdoaxvw4abox" className={styles.h3}>2. Area Optimization</h3>
        <p className={styles.paragraph}>Goal: Use fewer gates</p>
        <p className={styles.paragraph}>Examples:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Remove duplicate logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Share common expressions<br></span></li>` }} />
        <h3 id="h.hv79wnecnmu1" className={styles.h3}>3. Power Optimization</h3>
        <p className={styles.paragraph}>Goal: Reduce switching activity</p>
        <p className={styles.paragraph}>Examples:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Remove unnecessary toggles<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Clock gating (we’ll cover later)<br></span></li>` }} />
        <p className={styles.paragraph}>Tool tries to balance Timing ↔ Area ↔ Power</p>
        <hr className={styles.divider} />
        id="h.e8616lhm3pqi" className={styles.h2}>5. Example: Timing Optimization (Clear)</h2>
        <h3 id="h.b8wrdbaawvw0" className={styles.h3}>RTL:</h3>
        <p className={styles.paragraph}>{`assign y = ((a & b) | (c & d)) & e;`}</p>
        <p className={styles.paragraph}>Logic depth = 3 levels</p>
        <p className={styles.paragraph}>Tool may restructure logic internally to:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Reduce critical path<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Balance gates<br></span></li>` }} />
        <p className={styles.paragraph}>You don’t change RTL  Tool changes structure internally</p>
        <hr className={styles.divider} />
        id="h.qfda424j8u33" className={styles.h2}>6. Optimization Techniques (What tool actually does)</h2>
        <p className={styles.paragraph}>During optimization, tool performs:</p>
        <p className={styles.paragraph}>✔ Boolean simplification ✔ Constant propagation ✔ Dead logic removal ✔ Logic sharing ✔ DeMorgan transformations ✔ Path restructuring</p>
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>{`assign y = a & 1'b1;`}</p>
        <p className={styles.paragraph}>Optimized to:</p>
        <p className={styles.paragraph}>assign y = a;</p>
        <hr className={styles.divider} />
        id="h.1qkf2sxx8wrk" className={styles.h2}>7. Optimization is Constraint Driven (Very Important)</h2>
        <p className={styles.paragraph}>Without constraints:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Tool does </span><span class="c20 c14">minimum work<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No guarantee of timing<br></span></li>` }} />
        <p className={styles.paragraph}>Constraints guide optimization:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c24">.sdc</span><span class="c4">&nbsp;tells tool what to optimize for<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>set_clock_uncertainty 0.2</p>
        <p className={styles.paragraph}>set_max_delay 5</p>
        <p className={styles.paragraph}>Tool now knows:  “I MUST make design fast”</p>
        <hr className={styles.divider} />
        id="h.y98hdh6a2t8v" className={styles.h2}>8. What Optimization is NOT</h2>
        <p className={styles.paragraph}>Not technology mapping  Not gate selection  Not placement aware</p>
        <p className={styles.paragraph}>It is still technology-independent logic optimization.</p>
        <hr className={styles.divider} />
        id="h.w8p5h11taoy4" className={styles.h2}>9. Commands Related to Optimization</h2>
        <p className={styles.paragraph}>Optimization happens during:</p>
        <p className={styles.paragraph}>compile</p>
        <p className={styles.paragraph}>or advanced:</p>
        <p className={styles.paragraph}>compile_ultra</p>
        <p className={styles.paragraph}>You don’t manually say “optimize this AND gate”  Tool decides automatically</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image11.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.q9nxk2wwoynn" className={styles.h2}>1.1. Student-Level Summary</h2>
        <p className={styles.paragraph}>{`✔ Optimization improves timing, area, power ✔ Happens after translation ✔ Same function, better hardware ✔ Driven by constraints ✔ Uses Boolean simplification & restructuring`}</p>
        <h1 id="h.flce0gc6b72z" className={styles.h1}>TOPIC 5: MAPPING (TECHNOLOGY MAPPING)</h1>
        <p className={styles.paragraph}>Till now:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">RTL ✔<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Translation ✔<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Optimization ✔ (technology-independent)<br></span></li>` }} />
        <p className={styles.paragraph}>Now comes the MOST CRITICAL STEP in logical synthesis.</p>
        <hr className={styles.divider} />
        id="h.yeiyyb92zke9" className={styles.h2}>1. What is Mapping? (Best Beginner Definition)</h2>
        <p className={styles.paragraph}>Mapping is the process of converting the optimized generic logic into actual standard cells (gates) available in the target technology library (.lib).</p>
        <p className={styles.paragraph}>In simple student language   Till now, tool knows only AND, OR, NOT (abstract logic)  After mapping, tool knows real gates like NAND2_X1, DFF_X2, AOI21_X4</p>
        <p className={styles.paragraph}>Without mapping → no real hardware</p>
        <hr className={styles.divider} />
        id="h.3yg7l8dl1xgy" className={styles.h2}>2. Why Mapping is Needed? (Very Important Question)</h2>
        <h3 id="h.jq3kmtrf452g" className={styles.h3}>RTL says:</h3>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <p className={styles.paragraph}>But fabrication factory does NOT understand:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c1">&amp;<br></span></li><li class="c5 c6 li-bullet-0"><span class="c1">|<br></span></li>` }} />
        <p className={styles.paragraph}>Factory understands only:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c14">standard cells</span><span class="c4">&nbsp;from a library<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>NAND2_X1</p>
        <p className={styles.paragraph}>NOR2_X2</p>
        <p className={styles.paragraph}>INV_X4</p>
        <p className={styles.paragraph}>DFF_X1</p>
        <p className={styles.paragraph}>Mapping connects logic → real silicon gates</p>
        <hr className={styles.divider} />
        id="h.s3jsgcl5tp7g" className={styles.h2}>3. Where Mapping Happens in Synthesis Flow?</h2>
        <p className={styles.paragraph}>Logical Synthesis Flow (updated):</p>
        <p className={styles.paragraph}>1. RTL 2. Translation 3. Optimization  4. Mapping  5. Gate-level netlist generation</p>
        <hr className={styles.divider} />
        id="h.yn6dt95ckma4" className={styles.h2}>4. What Does Tool Use for Mapping?</h2>
        <h3 id="h.hld36vjqf80r" className={styles.h3}>Standard Cell Library (.lib)</h3>
        <p className={styles.paragraph}>This file contains:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Gate functionality<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Delay<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Area<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Power<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Drive strength<br></span></li>` }} />
        <p className={styles.paragraph}>Example cells:</p>
        <p className={styles.paragraph}>NAND2_X1</p>
        <p className={styles.paragraph}>NAND2_X2</p>
        <p className={styles.paragraph}>NAND2_X4</p>
        <p className={styles.paragraph}>{`Same function, different strength & delay.`}</p>
        <hr className={styles.divider} />
        id="h.pnzzjqm4w1vt" className={styles.h2}>5. Simple Mapping Example (Clear)</h2>
        <h3 id="h.v00if3vtqpf3" className={styles.h3}>RTL:</h3>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <h3 id="h.uf3r53grgo26" className={styles.h3}>Tool Decision:</h3>
        <p className={styles.paragraph}>AND gate not available  But NAND + INV available</p>
        <p className={styles.paragraph}>Mapped result:</p>
        <p className={styles.paragraph}>NAND2_X1 → INV_X1</p>
        <p className={styles.paragraph}>Hardware wise:</p>
        <p className={styles.paragraph}>y = NOT (a NAND b)</p>
        <p className={styles.paragraph}>Function same ✔ Uses available cells ✔</p>
        <hr className={styles.divider} />
        id="h.gm1nv6rt21qm" className={styles.h2}>6. Mapping is Constraint Driven (Again!)</h2>
        <p className={styles.paragraph}>Mapping depends on:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Timing constraints<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Area constraints<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Power constraints<br></span></li>` }} />
        <h3 id="h.kd1sn2lazzlj" className={styles.h3}>Example:</h3>
        <p className={styles.paragraph}>If timing is tight:</p>
        <p className={styles.paragraph}>NAND2_X4 (faster, bigger)</p>
        <p className={styles.paragraph}>If area is critical:</p>
        <p className={styles.paragraph}>NAND2_X1 (slower, smaller)</p>
        <p className={styles.paragraph}>Tool automatically decides.</p>
        <hr className={styles.divider} />
        id="h.cbwxhxrhg4nj" className={styles.h2}>7. What Exactly Happens During Mapping?</h2>
        <p className={styles.paragraph}>Tool performs:</p>
        <p className={styles.paragraph}>✔ Cell selection ✔ Drive strength selection ✔ Gate restructuring ✔ Delay balancing</p>
        <p className={styles.paragraph}>Example: Instead of one slow gate:  Tool may use two faster gates</p>
        <hr className={styles.divider} />
        id="h.we3e7lxxbexf" className={styles.h2}>8. Commands Related to Mapping</h2>
        <p className={styles.paragraph}>Mapping is performed during:</p>
        <p className={styles.paragraph}>compile</p>
        <p className={styles.paragraph}>or</p>
        <p className={styles.paragraph}>compile_ultra</p>
        <p className={styles.paragraph}>But mapping needs library first:</p>
        <p className={styles.paragraph}>set target_library "slow.lib"</p>
        <p className={styles.paragraph}>set link_library "* slow.lib"</p>
        <p className={styles.paragraph}>Without .lib:  Mapping fails  No gate-level netlist</p>
        <hr className={styles.divider} />
        id="h.66rwfrpyxsrw" className={styles.h2}>9. Gate-Level Netlist After Mapping</h2>
        <p className={styles.paragraph}>Before mapping (generic):</p>
        <p className={styles.paragraph}>AND</p>
        <p className={styles.paragraph}>OR</p>
        <p className={styles.paragraph}>NOT</p>
        <p className={styles.paragraph}>After mapping:</p>
        <p className={styles.paragraph}>NAND2_X1</p>
        <p className={styles.paragraph}>INV_X2</p>
        <p className={styles.paragraph}>DFF_X1</p>
        <p className={styles.paragraph}>This is what PNR understands later.</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image8.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.ms8iih2g8q6a" className={styles.h2}>1.1. Student Summary</h2>
        <p className={styles.paragraph}>✔ Mapping converts logic → real gates ✔ Uses .lib file ✔ Happens after optimization ✔ Produces gate-level netlist ✔ Decides speed, area, power</p>
        <h1 id="h.3ad5ir8t4to7" className={styles.h1}>TOPIC 6: RTL vs GATE-LEVEL NETLIST</h1>
        <h3 id="h.wl0bush7fwsm" className={styles.h3}>{`& Why RTL is NOT Used as PNR Input`}</h3>
        <p className={styles.paragraph}>This topic is EXTREMELY IMPORTANT for students. Many beginners get confused here.</p>
        <hr className={styles.divider} />
        id="h.lczt8pirsxdt" className={styles.h2}>1. What is RTL? (Quick Recall – in Simple English)</h2>
        <p className={styles.paragraph}>RTL (Register Transfer Level) describes:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c20 c14">What logic should do<br></span></li><li class="c5 c6 li-bullet-0"><span class="c20 c14">How data flows between registers<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Written by humans<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>always @(posedge clk)</p>
        <p className={styles.paragraph}>{`q <= d;`}</p>
        <p className={styles.paragraph}>RTL:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Abstract<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Technology-independent<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No physical meaning<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.bpfu7acikb6p" className={styles.h2}>2. What is Gate-Level Netlist?</h2>
        <p className={styles.paragraph}>Gate-level netlist is the synthesized output where the design is described using real standard cells from a technology library.</p>
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>DFF_X1 U1 ( .D(d), .CLK(clk), .Q(q) );</p>
        <p className={styles.paragraph}>Gate-level netlist:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Uses real gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Technology-dependent<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Ready for physical design<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.pkvzescfv19p" className={styles.h2}>3. Key Differences (STUDENT MUST MEMORIZE)</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c28" colspan="1" rowspan="1"><p class="c0"><span class="c14">Aspect</span></p></td><td class="c26" colspan="1" rowspan="1"><p class="c0"><span class="c14">RTL</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c0"><span class="c14">Gate-Level Netlist</span></p></td></tr><tr class="c10"><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Written by</span></p></td><td class="c26" colspan="1" rowspan="1"><p class="c7"><span class="c4">Designer</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c7"><span class="c4">Synthesis tool</span></p></td></tr><tr class="c10"><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Abstraction</span></p></td><td class="c26" colspan="1" rowspan="1"><p class="c7"><span class="c4">High</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c7"><span class="c4">Very low</span></p></td></tr><tr class="c10"><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Gates</span></p></td><td class="c26" colspan="1" rowspan="1"><p class="c7"><span class="c4">Not shown</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c7"><span class="c4">Explicit gates</span></p></td></tr><tr class="c10"><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Technology</span></p></td><td class="c26" colspan="1" rowspan="1"><p class="c7"><span class="c4">Independent</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c7"><span class="c4">Dependent (.lib)</span></p></td></tr><tr class="c10"><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing info</span></p></td><td class="c26" colspan="1" rowspan="1"><p class="c7"><span class="c4">No</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c7"><span class="c4">Yes (cell delays)</span></p></td></tr><tr class="c63"><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Used for PNR?</span></p></td><td class="c26" colspan="1" rowspan="1"><p class="c7"><span class="c4">&nbsp;NO</span></p></td><td class="c36" colspan="1" rowspan="1"><p class="c7"><span class="c4">&nbsp;YES</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        id="h.oxhqxgtyvuqy" className={styles.h2}>4. Why RTL Cannot Be Used for PNR? (Very Important)</h2>
        <h3 id="h.igoqw8md69ig" className={styles.h3}>PNR needs:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Exact gate locations<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Exact delays<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Exact connectivity<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Exact cell dimensions<br></span></li>` }} />
        <h3 id="h.alwurhdldir5" className={styles.h3}>RTL does NOT have:</h3>
        <p className={styles.paragraph}>Cell size  Delay  Power  Drive strength</p>
        <p className={styles.paragraph}>PNR tools cannot place always blocks or assign statements</p>
        <hr className={styles.divider} />
        id="h.u3dir7xf4zkk" className={styles.h2}>5. Real-Life Example (BEST FOR STUDENTS)</h2>
        <p className={styles.paragraph}>Think like this:</p>
        <p className={styles.paragraph}>RTL = House Blueprint</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">“Room here”<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">“Door there”<br></span></li>` }} />
        <p className={styles.paragraph}>Gate Netlist = Bricks + Cement</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Brick size<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Wall thickness<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Material type<br></span></li>` }} />
        <p className={styles.paragraph}>You cannot build a house from only blueprint  You need bricks → same as PNR needs gates</p>
        <hr className={styles.divider} />
        id="h.xtblwfi254h3" className={styles.h2}>6. What Exactly PNR Expects as Input?</h2>
        <p className={styles.paragraph}>PNR expects:</p>
        <p className={styles.paragraph}>- Gate-level netlist</p>
        <p className={styles.paragraph}>- Timing constraints (SDC)</p>
        <p className={styles.paragraph}>- Technology LEF</p>
        <p className={styles.paragraph}>- Physical libraries</p>
        <p className={styles.paragraph}>RTL gives NONE of these.</p>
        <hr className={styles.divider} />
        id="h.qz6mphbymgcw" className={styles.h2}>7. Example Comparison (Clear)</h2>
        <h3 id="h.yvd12h4t4zbr" className={styles.h3}>RTL:</h3>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <h3 id="h.n4g510lp9qrg" className={styles.h3}>Gate-level:</h3>
        <p className={styles.paragraph}>NAND2_X1 U1 ( .A(a), .B(b), .Y(n1) );</p>
        <p className={styles.paragraph}>INV_X1   U2 ( .A(n1), .Y(y) );</p>
        <p className={styles.paragraph}>PNR understands: ✔ NAND ✔ INV  assign</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image5.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.utnlm3wmm1p7" className={styles.h2}>9. Student Conclusion</h2>
        <p className={styles.paragraph}>✔ RTL = functional description ✔ Gate netlist = real hardware ✔ PNR works only on gate-level ✔ Synthesis bridges RTL → gates</p>
        <hr className={styles.divider} />
        <h1 id="h.u6uslf5p5c2k" className={styles.h1}>TOPIC 7: INPUTS OF LOGICAL SYNTHESIS</h1>
        <p className={styles.paragraph}>(VERY IMPORTANT – Students must clearly understand this)</p>
        <p className={styles.paragraph}>Logical synthesis cannot start without proper inputs. If any input is wrong or missing → synthesis result will be wrong.</p>
        <hr className={styles.divider} />
        id="h.evbwilb1alet" className={styles.h2}>1. What Are the Inputs of Logical Synthesis?</h2>
        <p className={styles.paragraph}>Logical synthesis mainly needs THREE mandatory inputs:</p>
        <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c20 c14">RTL (Design description)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c20 c14">Technology Library (.lib)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c20 c14">Timing Constraints (.sdc)<br></span></li>` }} />
        <p className={styles.paragraph}>Optional but commonly used:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">UPF / CPF (for low power)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Design constraints (.tcl)<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.o6zvede10egu" className={styles.h2}>2. Input-1: RTL (Register Transfer Level)</h2>
        <h3 id="h.dz7qztxtww0r" className={styles.h3}>What is RTL input?</h3>
        <p className={styles.paragraph}>RTL is the functional description of the design written in:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Verilog<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">SystemVerilog<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">VHDL<br></span></li>` }} />
        <p className={styles.paragraph}>It tells: ✔ What logic to build ✔ How data flows ✔ When registers capture data</p>
        <hr className={styles.divider} />
        <h3 id="h.1jwgceen0ei6" className={styles.h3}>Example RTL:</h3>
        <p className={styles.paragraph}>module and_gate (</p>
        <p className={styles.paragraph}>input a, b,</p>
        <p className={styles.paragraph}>output y</p>
        <p className={styles.paragraph}>);</p>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <p className={styles.paragraph}>endmodule</p>
        <hr className={styles.divider} />
        <h3 id="h.k1u1pwvbv1mo" className={styles.h3}>What information RTL provides?</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c31" colspan="1" rowspan="1"><p class="c0"><span class="c14">RTL Contains</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c0"><span class="c14">RTL Does NOT Contain</span></p></td></tr><tr class="c10"><td class="c31" colspan="1" rowspan="1"><p class="c7"><span class="c4">Logic behavior</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c7"><span class="c4">Gate delays</span></p></td></tr><tr class="c10"><td class="c31" colspan="1" rowspan="1"><p class="c7"><span class="c4">Registers</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c7"><span class="c4">Cell sizes</span></p></td></tr><tr class="c10"><td class="c31" colspan="1" rowspan="1"><p class="c7"><span class="c4">Control logic</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c7"><span class="c4">Power info</span></p></td></tr><tr class="c10"><td class="c31" colspan="1" rowspan="1"><p class="c7"><span class="c4">Functional correctness</span></p></td><td class="c33" colspan="1" rowspan="1"><p class="c7"><span class="c4">Physical info</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.7t63yn6ajlea" className={styles.h3}>Commands to read RTL (Synopsys DC example):</h3>
        <p className={styles.paragraph}>read_verilog design.v</p>
        <p className={styles.paragraph}>or</p>
        <p className={styles.paragraph}>analyze -format verilog design.v</p>
        <p className={styles.paragraph}>elaborate top_module</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image42.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.r56ge5bm1m1u" className={styles.h2}>3. Input-2: Technology Library (.lib)</h2>
        <h3 id="h.vdb6pgkuvflv" className={styles.h3}>What is .lib file?</h3>
        <p className={styles.paragraph}>lib describes ALL standard cells available in the technology.</p>
        <p className={styles.paragraph}>It is provided by:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Foundry (TSMC, Samsung, Intel)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Or standard cell vendor<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.8qdtsmiseq3u" className={styles.h3}>What .lib contains (CRITICAL):</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c49" colspan="1" rowspan="1"><p class="c0"><span class="c14">Parameter</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c0"><span class="c14">Meaning</span></p></td></tr><tr class="c10"><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Cell name</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c7"><span class="c4">NAND2_X1, DFF_X2</span></p></td></tr><tr class="c10"><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Area</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c7"><span class="c4">Cell size</span></p></td></tr><tr class="c10"><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Delay</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing arcs</span></p></td></tr><tr class="c10"><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Power</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c7"><span class="c4">Leakage &amp; dynamic</span></p></td></tr><tr class="c10"><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Drive strength</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c7"><span class="c4">X1, X2, X4</span></p></td></tr><tr class="c10"><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Setup/Hold</span></p></td><td class="c60" colspan="1" rowspan="1"><p class="c7"><span class="c4">Flip-flop timing</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.iz8yk76hll8j" className={styles.h3}>Example Cell in .lib:</h3>
        <p className={styles.paragraph}>{`cell (NAND2_X1) {`}</p>
        <p className={styles.paragraph}>area : 1.23;</p>
        <p className={styles.paragraph}>{`pin (Y) {`}</p>
        <p className={styles.paragraph}>{`timing() {`}</p>
        <p className={styles.paragraph}>related_pin : "A";</p>
        <p className={styles.paragraph}>cell_rise : 0.12;</p>
        <p className={styles.paragraph}>{`}`}</p>
        <p className={styles.paragraph}>{`}`}</p>
        <p className={styles.paragraph}>{`}`}</p>
        <hr className={styles.divider} />
        <h3 id="h.urdebh4qcab7" className={styles.h3}>Why .lib is mandatory?</h3>
        <p className={styles.paragraph}>Without .lib:  Tool doesn’t know what gates exist  Cannot calculate timing  Cannot optimize</p>
        <p className={styles.paragraph}>Synthesis becomes blind</p>
        <hr className={styles.divider} />
        <h3 id="h.5nw2s1qn8j1" className={styles.h3}>Command to read library:</h3>
        <p className={styles.paragraph}>set target_library slow.lib</p>
        <p className={styles.paragraph}>set link_library "* slow.lib"</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image7.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.xzh9gw6p3w7x" className={styles.h2}>4. Input-3: Timing Constraints (.sdc)</h2>
        <h3 id="h.kt1z13o01ip7" className={styles.h3}>What is SDC?</h3>
        <p className={styles.paragraph}>SDC (Synopsys Design Constraints) tells the tool HOW FAST the design must run.</p>
        <p className={styles.paragraph}>{`RTL says what to build SDC says how fast & how strict`}</p>
        <hr className={styles.divider} />
        <h3 id="h.d1sgww10di53" className={styles.h3}>What SDC defines:</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c45" colspan="1" rowspan="1"><p class="c0"><span class="c14">Constraint</span></p></td><td class="c51" colspan="1" rowspan="1"><p class="c0"><span class="c14">Purpose</span></p></td></tr><tr class="c10"><td class="c45" colspan="1" rowspan="1"><p class="c7"><span class="c4">create_clock</span></p></td><td class="c51" colspan="1" rowspan="1"><p class="c7"><span class="c4">Clock frequency</span></p></td></tr><tr class="c10"><td class="c45" colspan="1" rowspan="1"><p class="c7"><span class="c4">set_input_delay</span></p></td><td class="c51" colspan="1" rowspan="1"><p class="c7"><span class="c4">Input timing</span></p></td></tr><tr class="c10"><td class="c45" colspan="1" rowspan="1"><p class="c7"><span class="c4">set_output_delay</span></p></td><td class="c51" colspan="1" rowspan="1"><p class="c7"><span class="c4">Output timing</span></p></td></tr><tr class="c10"><td class="c45" colspan="1" rowspan="1"><p class="c7"><span class="c4">set_false_path</span></p></td><td class="c51" colspan="1" rowspan="1"><p class="c7"><span class="c4">Ignore paths</span></p></td></tr><tr class="c10"><td class="c45" colspan="1" rowspan="1"><p class="c7"><span class="c4">set_multicycle_path</span></p></td><td class="c51" colspan="1" rowspan="1"><p class="c7"><span class="c4">Multi-cycle logic</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.fqs73ic714hr" className={styles.h3}>Example SDC:</h3>
        <p className={styles.paragraph}>create_clock -name clk -period 10 [get_ports clk]</p>
        <p className={styles.paragraph}>10ns period = 100 MHz</p>
        <hr className={styles.divider} />
        <h3 id="h.i70sbnt0hdjv" className={styles.h3}>Input delay example:</h3>
        <p className={styles.paragraph}>set_input_delay 2 -clock clk [get_ports data_in]</p>
        <hr className={styles.divider} />
        <h3 id="h.wy6lx5mzs9c7" className={styles.h3}>Why SDC is required?</h3>
        <p className={styles.paragraph}>Without SDC:  Tool doesn’t know performance target  No timing optimization  Wrong gate selection</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image31.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.wwjtdx2fnxri" className={styles.h2}>5. What Happens If Inputs Are Wrong?</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c14">Issue</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c0"><span class="c14">Result</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Wrong RTL</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c7"><span class="c4">Functional failure</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Wrong .lib</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing mismatch</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Missing SDC</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c7"><span class="c4">Over-design or under-design</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Tight SDC</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c7"><span class="c4">Area &amp; power increase</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Loose SDC</span></p></td><td class="c59" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing failure later</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        id="h.yuh6f5bvpb36" className={styles.h2}>6. Complete Input Flow (Student Friendly)</h2>
        <p className={styles.paragraph}>RTL  ─────┐</p>
        <p className={styles.paragraph}>{`├──> LOGICAL SYNTHESIS ──> Gate Netlist`}</p>
        <p className={styles.paragraph}>lib ─────┤</p>
        <p className={styles.paragraph}>│</p>
        <p className={styles.paragraph}>SDC ──────┘</p>
        <hr className={styles.divider} />
        id="h.rp7hdbv5bcfk" className={styles.h2}>7. Student Conclusion</h2>
        <p className={styles.paragraph}>✔ RTL = what to build ✔ .lib = what gates exist ✔ SDC = how fast it should run ✔ All three are MANDATORY</p>
        id="h.riaawckn7jqe" className={styles.h2}>What Exactly Happens in Logical Synthesis – FLOW DIAGRAM EXPLANATION</h2>
        <hr className={styles.divider} />
        id="h.vy2lbmu68gmd" className={styles.h2}>1. First: Why a “flow diagram” is needed</h2>
        <p className={styles.paragraph}>Students often see this and feel confused:</p>
        <p className={styles.paragraph}>RTL → Synthesis → Netlist</p>
        <p className={styles.paragraph}>This is NOT sufficient</p>
        <p className={styles.paragraph}>Logical synthesis internally has multiple transformation stages. If students don’t understand each block, they will fail in:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Debugging timing<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Fixing synthesis errors<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Understanding reports<br></span></li>` }} />
        <p className={styles.paragraph}>So now we go box by box, like an industry lecture.</p>
        <hr className={styles.divider} />
        id="h.5v0gtupgizze" className={styles.h2}>2. Complete Logical Synthesis Flow (High-Level)</h2>
        <p className={styles.paragraph}>Here is the correct industry flow:</p>
        <p className={styles.paragraph}>RTL Code</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>RTL Analysis</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Elaboration</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Design Optimization</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Technology Mapping</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Constraint-Driven Optimization</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Gate-Level Netlist + Reports</p>
        <p className={styles.paragraph}>Now we will open each box.</p>
        <hr className={styles.divider} />
        id="h.p43kkuvc1jlb" className={styles.h2}>3. Block-1: RTL Code (Input Stage)</h2>
        <h3 id="h.co3ydl7tpvrk" className={styles.h3}>What is given to the tool?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Verilog / SystemVerilog RTL<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Behavioral + structural code<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">May contain:<br></span></li>` }} />
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c41 li-bullet-0"><span class="c4">if / case<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">always blocks<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">arithmetic<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">hierarchy<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>always @(posedge clk) begin</p>
        <p className={styles.paragraph}>if (rst)</p>
        <p className={styles.paragraph}>{`q <= 0;`}</p>
        <p className={styles.paragraph}>else</p>
        <p className={styles.paragraph}>{`q <= d;`}</p>
        <p className={styles.paragraph}>end</p>
        <p className={styles.paragraph}>At this stage:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">No gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No delays<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No power<br></span></li><li class="c5 c6 li-bullet-0"><span>Just </span><span class="c20 c14">intent<br></span></li>` }} />
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image12.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.rnmozenvez97" className={styles.h2}>4. Block-2: RTL Analysis (Syntax + Semantic Check)</h2>
        <h3 id="h.uudylv3513w0" className={styles.h3}>What happens internally?</h3>
        <p className={styles.paragraph}>The tool:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Checks syntax correctness<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Checks signal directions<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Checks multiple drivers<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Checks width mismatches<br></span></li>` }} />
        <p className={styles.paragraph}>Example error caught here:</p>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <p className={styles.paragraph}>assign y = c | d;   // multiple driver</p>
        <p className={styles.paragraph}>Tool stops here if error exists</p>
        <p className={styles.paragraph}>No hardware thinking yet</p>
        <hr className={styles.divider} />
        id="h.vvj8noo4duc2" className={styles.h2}>5. Block-3: Elaboration (Hierarchy Construction)</h2>
        <h3 id="h.4pjh672uyp03" className={styles.h3}>This is the MOST misunderstood stage</h3>
        <h3 id="h.819akqwgtefj" className={styles.h3}>What elaboration really does:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Expands </span><span class="c24">generate</span><span class="c4">&nbsp;blocks<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Resolves parameters<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Connects all submodules<br></span></li><li class="c5 c6 li-bullet-0"><span>Builds </span><span class="c20 c14">full design hierarchy<br></span></li>` }} />
        <p className={styles.paragraph}>Before elaboration:</p>
        <p className={styles.paragraph}>module top;</p>
        <p className={styles.paragraph}>sub #(8) u1();</p>
        <p className={styles.paragraph}>endmodule</p>
        <p className={styles.paragraph}>After elaboration:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Tool knows:<br></span></li>` }} />
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c41 li-bullet-0"><span class="c4">sub width = 8<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">internal nets<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">exact connectivity<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Design becomes complete and concrete</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image28.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        <AdUnit slotId="slot_module6content_mid1" />
          <h2 id="h.tw44u2vehmkv" className={styles.h2}>6. Block-4: Generic Logic Creation (Abstract Logic)</h2>
        <p className={styles.paragraph}>Now tool converts behavior into generic logic</p>
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>{`assign y = (a & b) | c;`}</p>
        <p className={styles.paragraph}>Converted internally to:</p>
        <p className={styles.paragraph}>AND → OR</p>
        <p className={styles.paragraph}>Important:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Still </span><span class="c20 c14">technology independent<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No NAND / NOR yet<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No delay<br></span></li>` }} />
        <p className={styles.paragraph}>This is called generic netlist</p>
        <hr className={styles.divider} />
        id="h.6v5hsfke6sk7" className={styles.h2}>7. Block-5: Design Optimization (Pre-Mapping)</h2>
        <h3 id="h.hnl9j7tfy28" className={styles.h3}>What optimization means here:</h3>
        <p className={styles.paragraph}>Improve logic without knowing real gates</p>
        <h4 id="h.sw6wj1kid4vy" className={styles.h4}>Types of optimization here:</h4>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Boolean simplification<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Constant propagation<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Dead logic removal<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Logic sharing<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>{`assign y = a & 1'b1;`}</p>
        <p className={styles.paragraph}>Optimized to:</p>
        <p className={styles.paragraph}>assign y = a;</p>
        <p className={styles.paragraph}>✔ Function same ✔ Less logic</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image40.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.570narnzkvbp" className={styles.h2}>8. Block-6: Technology Mapping (Gate Selection)</h2>
        <p className={styles.paragraph}>Now tool asks:</p>
        <p className={styles.paragraph}>“Which real cells can implement this logic?”</p>
        <p className={styles.paragraph}>Tool looks into:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c24">.lib</span><span class="c4">&nbsp;(standard cell library)<br></span></li>` }} />
        <p className={styles.paragraph}>Generic logic:</p>
        <p className={styles.paragraph}>AND</p>
        <p className={styles.paragraph}>Mapped to:</p>
        <p className={styles.paragraph}>AND2_X1</p>
        <p className={styles.paragraph}>AND2_X2</p>
        <p className={styles.paragraph}>AND2_X4</p>
        <p className={styles.paragraph}>Tool selects based on:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Timing<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Area<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Power<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Now design becomes real silicon logic</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image13.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.okjweivx7gwq" className={styles.h2}>9. Block-7: Constraint-Driven Optimization (Post-Mapping)</h2>
        <p className={styles.paragraph}>Now SDC controls everything</p>
        <p className={styles.paragraph}>Constraints like:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock period<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Input delay<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Output delay<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Max area<br></span></li>` }} />
        <p className={styles.paragraph}>Tool may:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Upsize gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Restructure logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Replicate logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Balance paths<br></span></li>` }} />
        <p className={styles.paragraph}>This loop may run many times.</p>
        <hr className={styles.divider} />
        id="h.2w3cr8lpo7d" className={styles.h2}>Block-8: Final Output Generation</h2>
        <p className={styles.paragraph}>Tool produces:</p>
        <h3 id="h.8g1sqsjwlntt" className={styles.h3}>Main outputs:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">✔ Gate-level netlist (.v)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">✔ Timing reports<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">✔ Area reports<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">✔ Power reports<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">✔ Constraint files<br></span></li>` }} />
        <p className={styles.paragraph}>Now design is:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Ready for </span><span class="c20 c14">DFT<br></span></li><li class="c5 c6 li-bullet-0"><span>Ready for </span><span class="c20 c14">PNR<br></span></li>` }} />
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image30.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.6y2gpsv9f67n" className={styles.h2}>1.1. Very Important Student Note</h2>
        <h3 id="h.w2jqb643p8kc" className={styles.h3}>Logical synthesis flow is:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c20 c14">RTL understanding → logic thinking → gate thinking<br></span></li>` }} />
        <p className={styles.paragraph}>It is NOT:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Coding tool<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Simulation tool<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Physical tool<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.xmp0fty30n4b" className={styles.h2}>1.2. Summary (Must remember)</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Flow has </span><span class="c20 c14">multiple internal stages<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Each stage modifies the design<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Errors at early stages affect everything later<br></span></li><li class="c5 c6 li-bullet-0"><span>Understanding flow = </span><span class="c20 c14">strong VLSI foundation<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.atcz12f2rp9r" className={styles.h2}>CONCLUSION (Lecture Style)</h2>
        <p className={styles.paragraph}>Logical synthesis is not a black box. It is a step-by-step transformation engine that turns RTL intent into real gates under constraints.</p>
        <hr className={styles.divider} />
        id="h.x17jpytcnqy" className={styles.h2}>Logical Synthesis – Advantages and Disadvantages (Industry Perspective)</h2>
        <p className={styles.paragraph}>This topic is very important for students, because interviewers often ask:</p>
        <p className={styles.paragraph}>“Why do we need logical synthesis? What are its limitations?”</p>
        <p className={styles.paragraph}>So we will not write bullet points only — we will explain WHY.</p>
        <hr className={styles.divider} />
        id="h.6kkb9xyto8sj" className={styles.h2}>1. Why we even need Logical Synthesis (Context)</h2>
        <p className={styles.paragraph}>Before synthesis existed:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Designers manually drew gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Huge designs → impossible to manage<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No automatic timing optimization<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Very high error rate<br></span></li>` }} />
        <p className={styles.paragraph}>Logical synthesis solves this problem.</p>
        <hr className={styles.divider} />
        id="h.h15ucoc0o74f" className={styles.h2}>2. Advantages of Logical Synthesis (With Explanation)</h2>
        <hr className={styles.divider} />
        <h3 id="h.g7b7ha6xrn3v" className={styles.h3}>Advantage 1: Converts Human Intent into Hardware</h3>
        <p className={styles.paragraph}>RTL is human-readable:</p>
        <p className={styles.paragraph}>{`if (a & b)`}</p>
        <p className={styles.paragraph}>y = c;</p>
        <p className={styles.paragraph}>else</p>
        <p className={styles.paragraph}>y = d;</p>
        <p className={styles.paragraph}>Logical synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Understands logic meaning<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Converts it into gates automatically<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Designers focus on function, not gates ✔ Less human error</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image22.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.6dbrrhmskuyj" className={styles.h3}>Advantage 2: Automatic Timing Optimization</h3>
        <p className={styles.paragraph}>Without synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">You don’t know gate delays<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">You can’t fix timing<br></span></li>` }} />
        <p className={styles.paragraph}>With synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Tool knows:<br></span></li>` }} />
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c41 li-bullet-0"><span class="c4">Cell delays<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">Path delays<br></span></li>` }} />
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Automatically:<br></span></li>` }} />
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c41 li-bullet-0"><span class="c4">Restructures logic<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">Upsizes gates<br></span></li><li class="c5 c41 li-bullet-0"><span class="c4">Balances paths<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Slow AND → replaced by faster AND<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Logic depth reduced<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Meets clock frequency automatically</p>
        <hr className={styles.divider} />
        <h3 id="h.d82wud50hax9" className={styles.h3}>Advantage 3: Technology Independence</h3>
        <p className={styles.paragraph}>Same RTL can be used for:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">28nm<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">14nm<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">7nm<br></span></li>` }} />
        <p className={styles.paragraph}>Only .lib changes.</p>
        <p className={styles.paragraph}>✔ RTL reusable ✔ Saves months of effort</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image33.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.8rchwdj0maed" className={styles.h3}>Advantage 4: Area Optimization</h3>
        <p className={styles.paragraph}>Logical synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Removes redundant logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Shares common logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Eliminates unused modules<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <p className={styles.paragraph}>{`assign z = a & b;`}</p>
        <p className={styles.paragraph}>Tool creates one AND gate, shares output.</p>
        <p className={styles.paragraph}>✔ Smaller chip ✔ Lower cost</p>
        <hr className={styles.divider} />
        <h3 id="h.d50o8s9r7zpt" className={styles.h3}>Advantage 5: Power Optimization</h3>
        <p className={styles.paragraph}>Power-aware synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Chooses low-power cells<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Reduces switching activity<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Supports clock gating<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Lower dynamic power ✔ Better battery life</p>
        <hr className={styles.divider} />
        <h3 id="h.bvbsa45r0umy" className={styles.h3}>Advantage 6: Handles Huge Designs</h3>
        <p className={styles.paragraph}>Modern chips:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Millions of gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Thousands of modules<br></span></li>` }} />
        <p className={styles.paragraph}>Logical synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Manages hierarchy<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Handles complexity automatically<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Impossible manually ✔ Industry-scale solution</p>
        <hr className={styles.divider} />
        id="h.9wr5b68v5caa" className={styles.h2}>3. Disadvantages of Logical Synthesis (Very Important)</h2>
        <p className={styles.paragraph}>Now the truth students must know.</p>
        <hr className={styles.divider} />
        <h3 id="h.3o08f88b3mv5" className={styles.h3}>Disadvantage 1: Depends Heavily on RTL Quality</h3>
        <p className={styles.paragraph}>Bad RTL ⇒ Bad netlist</p>
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>always @(a or b or c or d or e or f)</p>
        <p className={styles.paragraph}>Large sensitivity list  Poor logic structure</p>
        <p className={styles.paragraph}>Tool cannot fix bad architecture.</p>
        <p className={styles.paragraph}>✔ Synthesis is NOT magic</p>
        <hr className={styles.divider} />
        <h3 id="h.s1rub1uijsmw" className={styles.h3}>Disadvantage 2: Limited Physical Awareness</h3>
        <p className={styles.paragraph}>Logical synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Does NOT know real placement<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Does NOT know wire congestion<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Does NOT know routing delay accurately<br></span></li>` }} />
        <p className={styles.paragraph}>Result:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Timing looks good in synthesis<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Fails in PNR<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Needs physical synthesis later</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image43.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.xe7g3uwosu3z" className={styles.h3}>Disadvantage 3: Over-Optimization Risk</h3>
        <p className={styles.paragraph}>Aggressive constraints:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Very tight clock<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Very low area limit<br></span></li>` }} />
        <p className={styles.paragraph}>Tool may:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Insert too many buffers<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Replicate logic excessively<br></span></li>` }} />
        <p className={styles.paragraph}>Result:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Higher power<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Hard-to-route design<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.rbgqopaq6jkg" className={styles.h3}>Disadvantage 4: Tool-Dependent Results</h3>
        <p className={styles.paragraph}>Same RTL + different tools:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Different netlists<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Different timing<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Different area<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Designer must understand tool behavior</p>
        <hr className={styles.divider} />
        <h3 id="h.bhnuor39ln9" className={styles.h3}>Disadvantage 5: Debug Complexity</h3>
        <p className={styles.paragraph}>After synthesis:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Gate-level netlist is hard to read<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Debugging becomes difficult<br></span></li>` }} />
        <p className={styles.paragraph}>RTL:</p>
        <p className={styles.paragraph}>if (a) y = b;</p>
        <p className={styles.paragraph}>Gate-level:</p>
        <p className={styles.paragraph}>U123 NAND2_X1</p>
        <p className={styles.paragraph}>U124 INV_X2</p>
        <p className={styles.paragraph}>..</p>
        <p className={styles.paragraph}>✔ Debugging needs experience</p>
        <hr className={styles.divider} />
        id="h.ip91bhv5qw26" className={styles.h2}>4. When Logical Synthesis is NOT Enough</h2>
        <p className={styles.paragraph}>Logical synthesis cannot handle:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Congestion<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">IR drop<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Crosstalk<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Real wire delay<br></span></li>` }} />
        <p className={styles.paragraph}>That is why:  Physical synthesis exists</p>
        <hr className={styles.divider} />
        id="h.7xwyt0dmydcy" className={styles.h2}>5. Industry Reality (Very Important)</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c50" colspan="1" rowspan="1"><p class="c0"><span class="c14">Stage</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c0"><span class="c14">Role</span></p></td></tr><tr class="c10"><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">RTL</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c7"><span class="c4">Function correctness</span></p></td></tr><tr class="c10"><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">Logical Synthesis</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c7"><span class="c4">Logic optimization</span></p></td></tr><tr class="c10"><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">Physical Synthesis</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c7"><span class="c4">Physical realism</span></p></td></tr><tr class="c10"><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">PNR</span></p></td><td class="c38" colspan="1" rowspan="1"><p class="c7"><span class="c4">Final silicon</span></p></td></tr></tbody>` }} />
        </div>
        <p className={styles.paragraph}>Skipping logical synthesis is impossible  Over-trusting logical synthesis is dangerous</p>
        <hr className={styles.divider} />
        id="h.8zsct9abyw2t" className={styles.h2}>6. Student-Friendly Summary</h2>
        <h3 id="h.qc5o4xfbig46" className={styles.h3}>Advantages:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Automates gate creation<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Optimizes timing, area, power<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Technology independent<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Handles large designs<br></span></li>` }} />
        <h3 id="h.zcfx4ryw9do1" className={styles.h3}>Disadvantages:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">RTL quality matters<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Limited physical awareness<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Tool-dependent<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Debug is hard<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.m8wd1ggdee25" className={styles.h2}>7. Final Conclusion (Lecture Style)</h2>
        <p className={styles.paragraph}>Logical synthesis is the brain of the ASIC flow. It understands intent, optimizes logic, and prepares the design for physical reality — but it cannot replace good RTL or physical design knowledge.</p>
        id="h.vm88f3y6879a" className={styles.h2}>{`Combinational Merging & Sequential Merging in Logical Synthesis`}</h2>
        <p className={styles.paragraph}>This topic is very important because:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>It directly affects </span><span class="c20 c14">area, timing, and power<br></span></li><li class="c5 c6 li-bullet-0"><span>Many students see this in reports but </span><span class="c20 c14">don’t understand WHY it happens<br></span></li>` }} />
        <p className={styles.paragraph}>We will explain slowly, from basics, with examples.</p>
        <hr className={styles.divider} />
        id="h.50nlchw76wt2" className={styles.h2}>1. First Understand: What is “Merging”?</h2>
        <p className={styles.paragraph}>Merging means:</p>
        <p className={styles.paragraph}>The synthesis tool combines similar or duplicate logic into a single logic block to optimize the design.</p>
        <p className={styles.paragraph}>Why?</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Reduce area<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Reduce redundant logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Improve power<br></span></li>` }} />
        <p className={styles.paragraph}>There are two types:</p>
        <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Combinational Merging<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Sequential Merging<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.kp63d6dc88a" className={styles.h2}>2. Combinational Merging (In Depth)</h2>
        <hr className={styles.divider} />
        <h3 id="h.9yovqg37t5qt" className={styles.h3}>What is Combinational Logic?</h3>
        <p className={styles.paragraph}>Combinational logic:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Output depends only on </span><span class="c20 c14">current inputs<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No memory<br></span></li>` }} />
        <p className={styles.paragraph}>Examples:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">AND, OR, MUX, ADDER<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.3tesde3r8cjb" className={styles.h3}>What is Combinational Merging?</h3>
        <p className={styles.paragraph}>If the tool finds identical combinational logic, it:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Keeps </span><span class="c20 c14">one copy<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Shares it across multiple outputs<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.fiw3rk4dygsd" className={styles.h3}>Simple RTL Example</h3>
        <p className={styles.paragraph}>{`assign y1 = a & b;`}</p>
        <p className={styles.paragraph}>{`assign y2 = a & b;`}</p>
        <h3 id="h.dpms44m1pvie" className={styles.h3}>Without merging:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Two AND gates created<br></span></li>` }} />
        <h3 id="h.vnl5tplowsvz" className={styles.h3}>With merging:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">One AND gate<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Output shared to y1 and y2<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Area reduced ✔ Power reduced</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image4.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.ben347r718ml" className={styles.h3}>When Does Combinational Merging Happen?</h3>
        <p className={styles.paragraph}>Stage: ✔ During Optimization phase of Logical Synthesis</p>
        <p className={styles.paragraph}>Flow:</p>
        <p className={styles.paragraph}>RTL → Translation → Optimization → Mapping</p>
        <p className={styles.paragraph}>↑</p>
        <p className={styles.paragraph}>Combinational merging</p>
        <hr className={styles.divider} />
        <h3 id="h.mly0hed37fvg" className={styles.h3}>More Realistic Example</h3>
        <p className={styles.paragraph}>{`assign t1 = (a & b) | c;`}</p>
        <p className={styles.paragraph}>{`assign t2 = (a & b) | d;`}</p>
        <p className={styles.paragraph}>Tool behavior:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Extracts </span><span class="c24">(a &amp; b)</span><span class="c4">&nbsp;as common logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Shares it<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.g88zc9ifmnim" className={styles.h3}>Why Tools Do Combinational Merging?</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c29" colspan="1" rowspan="1"><p class="c0"><span class="c14">Benefit</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c0"><span class="c14">Reason</span></p></td></tr><tr class="c10"><td class="c29" colspan="1" rowspan="1"><p class="c7"><span class="c4">Area</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c7"><span class="c4">Fewer gates</span></p></td></tr><tr class="c10"><td class="c29" colspan="1" rowspan="1"><p class="c7"><span class="c4">Power</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c7"><span class="c4">Less switching</span></p></td></tr><tr class="c10"><td class="c29" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing</span></p></td><td class="c32" colspan="1" rowspan="1"><p class="c7"><span class="c4">Reduced load sometimes</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.a11o5aa4odk6" className={styles.h3}>When Combinational Merging is Dangerous</h3>
        <p className={styles.paragraph}>If logic is:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>On </span><span class="c20 c14">critical paths<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Drives different timing paths<br></span></li>` }} />
        <p className={styles.paragraph}>Tool may avoid merging to meet timing.</p>
        <hr className={styles.divider} />
        id="h.f8jlzkvihji5" className={styles.h2}>3. Sequential Merging (In Depth)</h2>
        <hr className={styles.divider} />
        <h3 id="h.taou57ajs7kt" className={styles.h3}>What is Sequential Logic?</h3>
        <p className={styles.paragraph}>Sequential logic:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Stores state<br></span></li><li class="c5 c6 li-bullet-0"><span>Depends on </span><span class="c20 c14">clock<br></span></li><li class="c5 c6 li-bullet-0"><span>Uses </span><span class="c20 c14">flip-flops / latches<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.c6rtik715osx" className={styles.h3}>What is Sequential Merging?</h3>
        <p className={styles.paragraph}>If multiple flip-flops:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Have </span><span class="c20 c14">same clock<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Same reset<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Same data logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Same enable<br></span></li>` }} />
        <p className={styles.paragraph}>Tool may:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Merge them<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Reduce register count<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.yruwt31o07ha" className={styles.h3}>RTL Example</h3>
        <p className={styles.paragraph}>always @(posedge clk)</p>
        <p className={styles.paragraph}>{`q1 <= d;`}</p>
        <p className={styles.paragraph}>always @(posedge clk)</p>
        <p className={styles.paragraph}>{`q2 <= d;`}</p>
        <h3 id="h.vl8kwjb3iym7" className={styles.h3}>Without merging:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Two flip-flops<br></span></li>` }} />
        <h3 id="h.chk5beh2f1k" className={styles.h3}>With merging:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">One flip-flop<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Output split<br></span></li>` }} />
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image32.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.u2q7uldgwxr5" className={styles.h3}>When Sequential Merging Happens?</h3>
        <p className={styles.paragraph}>Stage: ✔ During Optimization phase ✔ Before mapping</p>
        <hr className={styles.divider} />
        <h3 id="h.9za2pkn99go0" className={styles.h3}>Why Sequential Merging is Risky</h3>
        <p className={styles.paragraph}>Sequential merging:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Reduces registers<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">But reduces flexibility<br></span></li>` }} />
        <p className={styles.paragraph}>Problems:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Harder timing fixes<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Harder ECOs<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Can break testability (DFT)<br></span></li>` }} />
        <p className={styles.paragraph}>Because of this, sequential merging is often restricted.</p>
        <hr className={styles.divider} />
        id="h.gq5cdaphnma6" className={styles.h2}>4. How to Control Merging (Very Important)</h2>
        <hr className={styles.divider} />
        <h3 id="h.83drubm5xk3z" className={styles.h3}>Prevent Merging (Industry Usage)</h3>
        <p className={styles.paragraph}>set_dont_touch [get_cells reg1]</p>
        <p className={styles.paragraph}>set_dont_touch_network [get_nets net1]</p>
        <p className={styles.paragraph}>{`✔ Prevents both combinational & sequential merging`}</p>
        <hr className={styles.divider} />
        <h3 id="h.p8pxaulv1l0s" className={styles.h3}>Why Engineers Prevent Merging?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Critical path isolation<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Debug simplicity<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">ECO friendliness<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">DFT requirements<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.1lgzhb5b9dv3" className={styles.h2}>5. Combinational vs Sequential Merging (Comparison)</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c44" colspan="1" rowspan="1"><p class="c0"><span class="c14">Feature</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c0"><span class="c14">Combinational</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c14">Sequential</span></p></td></tr><tr class="c10"><td class="c44" colspan="1" rowspan="1"><p class="c7"><span class="c4">Logic type</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c7"><span class="c4">Gates</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">Flip-flops</span></p></td></tr><tr class="c10"><td class="c44" colspan="1" rowspan="1"><p class="c7"><span class="c4">Risk</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c7"><span class="c4">Low</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">High</span></p></td></tr><tr class="c10"><td class="c44" colspan="1" rowspan="1"><p class="c7"><span class="c4">Area gain</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c7"><span class="c4">Medium</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">High</span></p></td></tr><tr class="c10"><td class="c44" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing impact</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c7"><span class="c4">Usually good</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">Risky</span></p></td></tr><tr class="c10"><td class="c44" colspan="1" rowspan="1"><p class="c7"><span class="c4">DFT impact</span></p></td><td class="c52" colspan="1" rowspan="1"><p class="c7"><span class="c4">Low</span></p></td><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">High</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        id="h.gyv3ip8108lc" className={styles.h2}>6. Interview-Level Understanding</h2>
        <p className={styles.paragraph}>Q: Does synthesis always merge logic? A: No. It depends on:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Timing constraints<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Dont_touch constraints<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Design structure<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.a89z7ib7c6vi" className={styles.h2}>7. Student Summary</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Merging = removing duplicate logic<br></span></li><li class="c5 c6 li-bullet-0"><span>Happens in </span><span class="c20 c14">optimization phase<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Saves area and power<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Must be controlled carefully<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.x1urbzs4ov40" className={styles.h2}>8. Conclusion (Lecture Style)</h2>
        <p className={styles.paragraph}>Combinational merging is generally safe and beneficial, while sequential merging must be handled carefully because it affects timing, testability, and ECO flexibility.</p>
        id="h.ef1jvdnz1u5n" className={styles.h2}>Empty Module in Logical Synthesis – What it is, Why Tool Removes it</h2>
        <p className={styles.paragraph}>This topic confuses many beginners, so we’ll start from absolute ZERO.</p>
        <hr className={styles.divider} />
        id="h.4p7m7g3bi4hn" className={styles.h2}>1. What is a Module in RTL?</h2>
        <p className={styles.paragraph}>A module in Verilog:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Is a </span><span class="c20 c14">block of hardware<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Contains logic (combinational or sequential)<br></span></li><li class="c5 c6 li-bullet-0"><span>Has </span><span class="c20 c14">inputs, outputs, internal logic<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>module adder (</p>
        <p className={styles.paragraph}>input a, b,</p>
        <p className={styles.paragraph}>output sum</p>
        <p className={styles.paragraph}>);</p>
        <p className={styles.paragraph}>assign sum = a ^ b;</p>
        <p className={styles.paragraph}>endmodule</p>
        <p className={styles.paragraph}>✔ This module does something</p>
        <hr className={styles.divider} />
        id="h.wddeee45l419" className={styles.h2}>2. What is an Empty Module?</h2>
        <p className={styles.paragraph}>An empty module:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Has </span><span class="c20 c14">no logic<br></span></li><li class="c5 c6 li-bullet-0"><span>May have ports, but </span><span class="c20 c14">nothing inside<br></span></li><li class="c5 c6 li-bullet-0"><span>Produces </span><span class="c20 c14">no hardware<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.mfdbktom555f" className={styles.h3}>Example of Empty Module</h3>
        <p className={styles.paragraph}>module empty_block (</p>
        <p className={styles.paragraph}>input a,</p>
        <p className={styles.paragraph}>output b</p>
        <p className={styles.paragraph}>);</p>
        <p className={styles.paragraph}>endmodule</p>
        <p className={styles.paragraph}>No assign  No always block  No gates  No registers</p>
        <p className={styles.paragraph}>➡ This module does NOTHING</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image37.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.3p10b0rgjwfl" className={styles.h2}>3. Why Do Empty Modules Exist?</h2>
        <p className={styles.paragraph}>Very important question</p>
        <h3 id="h.awcwuvuhdpsf" className={styles.h3}>Common reasons:</h3>
        <h3 id="h.irillgg2090y" className={styles.h3}>1. Placeholder modules</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Used during early design<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Logic added later<br></span></li>` }} />
        <h3 id="h.hsvkn6j6gsjn" className={styles.h3}>2. Feature disabled by ifdef</h3>
        <p className={styles.paragraph}>`ifdef FEATURE_ON</p>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <p className={styles.paragraph}>`endif</p>
        <p className={styles.paragraph}>If FEATURE_ON is not defined → module becomes empty</p>
        <hr className={styles.divider} />
        <h3 id="h.nb9tgke0ankp" className={styles.h3}>3. Parameter-based removal</h3>
        <p className={styles.paragraph}>if (ENABLE == 0) begin</p>
        <p className={styles.paragraph}>// no logic generated</p>
        <p className={styles.paragraph}>end</p>
        <hr className={styles.divider} />
        <h3 id="h.z0p9863zxmhn" className={styles.h3}>4. IP integration shells</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Top-level created<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">IP logic added later<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.e5rm1o7f5hk5" className={styles.h2}>4. What Does Synthesis Do with Empty Modules?</h2>
        <h3 id="h.ioodg33tvgom" className={styles.h3}>Synthesis Tool Behavior</h3>
        <p className={styles.paragraph}>If a module produces no hardware, the tool removes it</p>
        <p className={styles.paragraph}>Because:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>It has </span><span class="c20 c14">zero gates<br></span></li><li class="c5 c6 li-bullet-0"><span>It has </span><span class="c20 c14">zero effect<br></span></li><li class="c5 c6 li-bullet-0"><span>Keeping it wastes nothing but </span><span class="c20 c14">confuses netlist<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.pkt0igiai6mv" className={styles.h3}>Synthesis Message Example</h3>
        <p className={styles.paragraph}>Warning: Removing empty module empty_block</p>
        <p className={styles.paragraph}>This is NORMAL, not an error.</p>
        <hr className={styles.divider} />
        id="h.z3j37ljp369b" className={styles.h2}>5. At Which Stage Empty Modules Are Removed?</h2>
        <p className={styles.paragraph}>Stage: ✔ Translation + Optimization</p>
        <p className={styles.paragraph}>Flow:</p>
        <p className={styles.paragraph}>RTL Read</p>
        <p className={styles.paragraph}>→ Elaboration</p>
        <p className={styles.paragraph}>→ Translation</p>
        <p className={styles.paragraph}>→ Optimization  ← empty modules removed</p>
        <p className={styles.paragraph}>→ Mapping</p>
        <hr className={styles.divider} />
        id="h.x2mic9n6os49" className={styles.h2}>6. Does Removing Empty Module Break Design?</h2>
        <p className={styles.paragraph}>NO, if:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Module truly has no logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No outputs are used<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Safe removal</p>
        <hr className={styles.divider} />
        id="h.26isq4nghc7e" className={styles.h2}>7. When Empty Module Removal is a PROBLEM?</h2>
        <h3 id="h.96g8wyx4tifz" className={styles.h3}>Dangerous scenarios:</h3>
        <h3 id="h.g3t9tt58skpn" className={styles.h3}>Case 1: Expected logic missing</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>You </span><span class="c46">thought</span><span class="c4">&nbsp;logic exists<br></span></li><li class="c5 c6 li-bullet-0"><span>But </span><span class="c24">ifdef</span><span class="c4">&nbsp;disabled it<br></span></li>` }} />
        <h3 id="h.1y4qez8yem54" className={styles.h3}>Case 2: Missed macro definition</h3>
        <p className={styles.paragraph}>analyze -define FEATURE_ON</p>
        <p className={styles.paragraph}>If missing → logic disappears</p>
        <hr className={styles.divider} />
        id="h.p9jwoulbz5rq" className={styles.h2}>8. How to Detect Empty Modules Early?</h2>
        <h3 id="h.htxfftaf9tjd" className={styles.h3}>Check Elaboration Report</h3>
        <p className={styles.paragraph}>elaborate top</p>
        <p className={styles.paragraph}>check_design</p>
        <p className={styles.paragraph}>Look for:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">“No logic inferred”<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">“Empty module removed”<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.4n7kfjq0zn0" className={styles.h2}>9. How to Prevent Removal (If Needed)?</h2>
        <h3 id="h.ywibozvq0aa4" className={styles.h3}>Option 1. Add Dummy Logic (Rare)</h3>
        <p className={styles.paragraph}>wire dummy;</p>
        <p className={styles.paragraph}>assign dummy = 1'b0;</p>
        <h3 id="h.n72zy6u8nz7l" className={styles.h3}>Option 2. set_dont_touch (Not recommended for empty logic)</h3>
        <p className={styles.paragraph}>set_dont_touch [get_designs empty_block]</p>
        <p className={styles.paragraph}>⚠ Tool may still remove if truly empty</p>
        <hr className={styles.divider} />
        id="h.ffq193zbrqaa" className={styles.h2}>Real Industry Example</h2>
        <p className={styles.paragraph}>In SoC projects:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Many feature blocks are optional<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Disabled blocks → empty modules<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Tools automatically clean them<br></span></li>` }} />
        <p className={styles.paragraph}>This is expected behavior</p>
        <hr className={styles.divider} />
        id="h.l3f038ywkd4s" className={styles.h2}>1.1. Interview Question</h2>
        <p className={styles.paragraph}>Q: Why synthesis removes empty modules? A: Because they generate no hardware and have no functional impact.</p>
        <hr className={styles.divider} />
        id="h.1gla5rrpso1c" className={styles.h2}>1.2. Student Summary</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Empty module = no logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Synthesis removes it automatically<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Happens during optimization<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Usually NOT an issue<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Sometimes indicates missing macro/parameter<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.2c0e5oacqfcj" className={styles.h2}>1.3. Conclusion (Lecture Style)</h2>
        <p className={styles.paragraph}>Empty module removal is a cleanup process in logical synthesis to ensure only meaningful hardware is implemented in silicon.</p>
        id="h.mkrzqhg21ft5" className={styles.h2}>{`set_dont_touch & set_dont_use – How to Control Synthesis Optimization`}</h2>
        <p className={styles.paragraph}>This is a VERY IMPORTANT topic in logical synthesis. Many real-time bugs happen because engineers don’t understand this properly.</p>
        <hr className={styles.divider} />
        id="h.b68bbb82xkn" className={styles.h2}>1. Why Do We Need These Commands?</h2>
        <h3 id="h.qocbbrfg4t17" className={styles.h3}>Reality of Logical Synthesis</h3>
        <p className={styles.paragraph}>Synthesis tool is intelligent. It tries to:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Remove unused logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Merge logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Replace gates<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Optimize timing, power, area<br></span></li>` }} />
        <p className={styles.paragraph}>But sometimes:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>You </span><span class="c14">DON’T want</span><span class="c4">&nbsp;optimization<br></span></li><li class="c5 c6 li-bullet-0"><span>You want to </span><span class="c20 c14">protect logic<br></span></li><li class="c5 c6 li-bullet-0"><span>You want to </span><span class="c20 c14">block certain cells<br></span></li>` }} />
        <p className={styles.paragraph}>That is why set_dont_touch and set_dont_use exist.</p>
        <hr className={styles.divider} />
        id="h.p5laqtxhkja4" className={styles.h2}>2. set_dont_touch – What Exactly It Does</h2>
        <h3 id="h.pxc37crxjavm" className={styles.h3}>Definition (Simple English)</h3>
        <p className={styles.paragraph}>set_dont_touch tells the synthesis tool: “DO NOT optimize, remove, or modify this object.”</p>
        <hr className={styles.divider} />
        <h3 id="h.gm02wyakt80" className={styles.h3}>What Can Be Protected?</h3>
        <p className={styles.paragraph}>You can protect:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Module<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Cell<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Net<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Register<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Instance<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.krywv7axtszs" className={styles.h3}>Syntax</h3>
        <p className={styles.paragraph}>{`set_dont_touch <object>`}</p>
        <hr className={styles.divider} />
        <h3 id="h.pmnfdx3z186x" className={styles.h3}>Examples</h3>
        <h4 id="h.x1jc0chtvx9d" className={styles.h4}>Example 1. Protect a module</h4>
        <p className={styles.paragraph}>set_dont_touch [get_designs fifo_ctrl]</p>
        <p className={styles.paragraph}>✔ Tool will:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">NOT remove<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">NOT merge<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">NOT restructure<br></span></li>` }} />
        <hr className={styles.divider} />
        <h4 id="h.p3zmsiprg95w" className={styles.h4}>Example 2. Protect a specific instance</h4>
        <p className={styles.paragraph}>set_dont_touch [get_cells u_clk_div]</p>
        <hr className={styles.divider} />
        <h4 id="h.yw22whkt2nbb" className={styles.h4}>Example 3. Protect a register</h4>
        <p className={styles.paragraph}>set_dont_touch [get_cells reg_*]</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image14.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.myrmkt2m8d4k" className={styles.h2}>3. When Do We Use set_dont_touch? (Industry Cases)</h2>
        <h3 id="h.ui0o16kq5qtq" className={styles.h3}>Case 1: Debug logic</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Scan logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Observation logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Debug counters<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.p166pdkau3a1" className={styles.h3}>Case 2: ECO-ready logic</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Logic kept for future fixes<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.tzct2tyh0h0v" className={styles.h3}>Case 3: Pre-verified IP</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Don’t disturb proven logic<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.m4xlzosxa6sb" className={styles.h3}>Case 4: Clock gating cells</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Must not be altered<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.h6929my7km6d" className={styles.h2}>4. set_dont_touch vs dont_touch_network</h2>
        <h3 id="h.1wqnuuo7qrd2" className={styles.h3}>dont_touch_network</h3>
        <p className={styles.paragraph}>set_dont_touch_network [get_nets clk]</p>
        <p className={styles.paragraph}>✔ Protects:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock tree nets<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Reset nets<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.84lzhkfuvf1y" className={styles.h2}>5. Important Warning  (Very Important)</h2>
        <p className={styles.paragraph}>Overusing set_dont_touch is BAD</p>
        <p className={styles.paragraph}>Why?</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Tool cannot optimize timing<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Area increases<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Power increases<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Timing violations may remain<br></span></li>` }} />
        <p className={styles.paragraph}>Industry Rule</p>
        <p className={styles.paragraph}>Use set_dont_touch only when absolutely required</p>
        <hr className={styles.divider} />
        id="h.ts9ljkj30k6e" className={styles.h2}>6. set_dont_use – What Exactly It Does</h2>
        <h3 id="h.s8z4bgqpievi" className={styles.h3}>Definition</h3>
        <p className={styles.paragraph}>set_dont_use tells synthesis tool: “DO NOT use this library cell for mapping.”</p>
        <hr className={styles.divider} />
        <h3 id="h.zfwh8221s2gw" className={styles.h3}>Syntax</h3>
        <p className={styles.paragraph}>{`set_dont_use <lib_cell>`}</p>
        <hr className={styles.divider} />
        <h3 id="h.a0ayyn4dauxk" className={styles.h3}>Example 1. Block a slow cell</h3>
        <p className={styles.paragraph}>set_dont_use [get_lib_cells */AND2_X1]</p>
        <hr className={styles.divider} />
        <h3 id="h.jz0tniw688ca" className={styles.h3}>Example 2. Block low-VT cell (power reason)</h3>
        <p className={styles.paragraph}>set_dont_use [get_lib_cells */*_LVT]</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image29.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.akj6cidp566d" className={styles.h2}>7. Why set_dont_use is Needed?</h2>
        <h3 id="h.m8gdooik2txn" className={styles.h3}>Industry Reasons:</h3>
        <h3 id="h.gqz5p7704olf" className={styles.h3}>1. Timing risk</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Certain cells are slow<br></span></li>` }} />
        <h3 id="h.g5gtd8gf49mb" className={styles.h3}>2. Power issue</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Some cells consume more leakage<br></span></li>` }} />
        <h3 id="h.473dvrbrzlzn" className={styles.h3}>3. DRC issue</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Foundry disallows some cells<br></span></li>` }} />
        <h3 id="h.12bzdplxyqh8" className={styles.h3}>4. Physical design constraints</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Cell causes congestion<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.wxix50fzbd08" className={styles.h2}>8. Difference: set_dont_touch vs set_dont_use</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c9" colspan="1" rowspan="1"><p class="c0"><span class="c14">Feature</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c0"><span class="c14">set_dont_touch</span></p></td><td class="c56" colspan="1" rowspan="1"><p class="c0"><span class="c14">set_dont_use</span></p></td></tr><tr class="c10"><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">Applied to</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c7"><span class="c4">Design objects</span></p></td><td class="c56" colspan="1" rowspan="1"><p class="c7"><span class="c4">Library cells</span></p></td></tr><tr class="c10"><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">Prevents</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c7"><span class="c4">Optimization</span></p></td><td class="c56" colspan="1" rowspan="1"><p class="c7"><span class="c4">Cell usage</span></p></td></tr><tr class="c10"><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">Used when</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c7"><span class="c4">Logic must stay</span></p></td><td class="c56" colspan="1" rowspan="1"><p class="c7"><span class="c4">Cell must not be used</span></p></td></tr><tr class="c10"><td class="c9" colspan="1" rowspan="1"><p class="c7"><span class="c4">Stage</span></p></td><td class="c69" colspan="1" rowspan="1"><p class="c7"><span class="c4">Optimization</span></p></td><td class="c56" colspan="1" rowspan="1"><p class="c7"><span class="c4">Mapping</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        id="h.phm7sf7u45s" className={styles.h2}>9. Where These Commands Act in Synthesis Flow?</h2>
        <p className={styles.paragraph}>RTL</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Elaboration</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Translation</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Optimization  ← set_dont_touch works</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Technology Mapping ← set_dont_use works</p>
        <hr className={styles.divider} />
        id="h.lm4t7v4m3m9" className={styles.h2}>Real Industry Flow Example</h2>
        <p className={styles.paragraph}>read_verilog top.v</p>
        <p className={styles.paragraph}>read_liberty slow.lib</p>
        <p className={styles.paragraph}>set_dont_use [get_lib_cells */NAND2_X1]</p>
        <p className={styles.paragraph}>set_dont_touch [get_cells u_scan_chain]</p>
        <p className={styles.paragraph}>compile</p>
        <p className={styles.paragraph}>✔ Scan logic preserved ✔ Bad cells avoided</p>
        <hr className={styles.divider} />
        id="h.ncxyidnrq7uz" className={styles.h2}>1.1. Interview Questions</h2>
        <p className={styles.paragraph}>Q1: What happens if dont_touch is applied on large block?  Timing closure becomes difficult</p>
        <p className={styles.paragraph}>Q2: Can dont_touch prevent empty module removal?   No, empty logic still removed</p>
        <hr className={styles.divider} />
        id="h.qp8ttxyhdoez" className={styles.h2}>1.2. Student Summary</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c24">set_dont_touch</span><span class="c4">&nbsp;→ protect logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c24">set_dont_use</span><span class="c4">&nbsp;→ block cells<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Use carefully<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Overuse causes timing &amp; area problems<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.xri2ruzymm2" className={styles.h2}>1.3. Conclusion</h2>
        <p className={styles.paragraph}>These commands give control to synthesis engineer. Used wisely → design success Used blindly → timing failure</p>
        id="h.rkgkyfxekj8p" className={styles.h2}>Unresolved References in Logical Synthesis</h2>
        <p className={styles.paragraph}>{`(One of the MOST COMMON & CONFUSING synthesis issues for beginners)`}</p>
        <hr className={styles.divider} />
        id="h.87mpjf470aol" className={styles.h2}>1. What is an Unresolved Reference?</h2>
        <h3 id="h.8q0p99o9j51s" className={styles.h3}>Simple Definition (Student Friendly)</h3>
        <p className={styles.paragraph}>Unresolved reference means: Synthesis tool sees a module or cell name, but it does NOT know its definition.</p>
        <p className={styles.paragraph}>In short:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Tool </span><span class="c20 c14">knows the name<br></span></li><li class="c5 c6 li-bullet-0"><span>Tool </span><span class="c20 c14">does NOT know the implementation<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.cyugf1x5oyuo" className={styles.h3}>Typical Error Message</h3>
        <p className={styles.paragraph}>Warning: Unresolved reference to module 'fifo_mem'</p>
        <p className={styles.paragraph}>Warning: Unresolved reference to cell 'DFF_X1'</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image26.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.dtqwmr2r75b" className={styles.h2}>2. Where Does This Error Appear in Flow?</h2>
        <p className={styles.paragraph}>RTL Read</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Analyze</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Elaborate  ← Unresolved reference detected HERE</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Translation</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Optimization</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Mapping</p>
        <p className={styles.paragraph}>Important Unresolved reference is mainly caught during:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c1">analyze<br></span></li><li class="c5 c6 li-bullet-0"><span class="c1">elaborate<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.h4u6ry8engi5" className={styles.h2}>3. Most Common Causes of Unresolved References</h2>
        <h3 id="h.9bgeyqs9hr0s" className={styles.h3}>1. Missing RTL File</h3>
        <p className={styles.paragraph}>module top;</p>
        <p className={styles.paragraph}>fifo u1();  // fifo.v not read</p>
        <p className={styles.paragraph}>endmodule</p>
        <p className={styles.paragraph}>✔ Tool error:</p>
        <p className={styles.paragraph}>fifo module not found</p>
        <hr className={styles.divider} />
        <h3 id="h.2y1cnv7p7zo7" className={styles.h3}>2. Module Name Mismatch</h3>
        <p className={styles.paragraph}>module FIFO (...);   // Capital letters</p>
        <p className={styles.paragraph}>fifo u1 (...);       // lowercase</p>
        <p className={styles.paragraph}>Verilog is case-sensitive</p>
        <hr className={styles.divider} />
        <h3 id="h.aclacupuxrwa" className={styles.h3}>3. Library Not Loaded (.lib)</h3>
        <p className={styles.paragraph}>DFF_X1 not found</p>
        <p className={styles.paragraph}>Cause:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Liberty file not read<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Wrong library<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.kv4gx5egpv9" className={styles.h3}>4. Black Box Module</h3>
        <p className={styles.paragraph}>module mem (...);</p>
        <p className={styles.paragraph}>// no logic</p>
        <p className={styles.paragraph}>endmodule</p>
        <p className={styles.paragraph}>Tool treats it as:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Black box<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No internal definition<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.ymbpbliolka3" className={styles.h3}>5. Wrong Search Path</h3>
        <p className={styles.paragraph}>read_verilog ./rtl/top.v</p>
        <p className={styles.paragraph}>But submodules are in:</p>
        <p className={styles.paragraph}>/rtl/core/</p>
        <hr className={styles.divider} />
        id="h.uya35216qo6m" className={styles.h2}>4. Types of Unresolved References</h2>
        <h3 id="h.te1juqoztck4" className={styles.h3}>Type 1: RTL Unresolved Reference</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Missing Verilog module<br></span></li>` }} />
        <h3 id="h.gbehyrh22j6a" className={styles.h3}>Type 2: Library Cell Unresolved Reference</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Missing standard cell (.lib)<br></span></li>` }} />
        <h3 id="h.e3k7cc8x3miy" className={styles.h3}>Type 3: IP / Memory Black Box</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Expected in ASIC flow<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.tejojh2oempp" className={styles.h2}>5. How to Detect Unresolved References</h2>
        <h3 id="h.cunrdm4z3zko" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>check_design</p>
        <p className={styles.paragraph}>or</p>
        <p className={styles.paragraph}>report_design_warnings</p>
        <hr className={styles.divider} />
        <h3 id="h.9cq6t672i0h6" className={styles.h3}>Output Example</h3>
        <p className={styles.paragraph}>Warning: Unresolved reference 'ram_32x8'</p>
        <hr className={styles.divider} />
        id="h.wwruxmv695z9" className={styles.h2}>6. How to Fix Unresolved References (Step-by-Step)</h2>
        <hr className={styles.divider} />
        <h3 id="h.5gbm5o6nzubx" className={styles.h3}>Fix 1: Read All RTL Files</h3>
        <p className={styles.paragraph}>read_verilog rtl/*.v</p>
        <p className={styles.paragraph}>✔ Best practice:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Use wildcard<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Avoid missing files<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.yo43m7ngp60l" className={styles.h3}>Fix 2: Check Module Names</h3>
        <p className={styles.paragraph}>✔ Ensure:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Same spelling<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Same case<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No typo<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.hafuv9u0kv6r" className={styles.h3}>Fix 3: Load Correct Libraries</h3>
        <p className={styles.paragraph}>read_liberty slow.lib</p>
        <p className={styles.paragraph}>read_liberty fast.lib</p>
        <hr className={styles.divider} />
        <h3 id="h.gvcuu3j3s2oi" className={styles.h3}>Fix 4: Set Search Path</h3>
        <p className={styles.paragraph}>set search_path "./rtl ./lib"</p>
        <hr className={styles.divider} />
        <h3 id="h.czcrqj9xthrf" className={styles.h3}>Fix 5: Use Black Box Intentionally</h3>
        <p className={styles.paragraph}>For memories:</p>
        <p className={styles.paragraph}>set_black_box ram_32x8</p>
        <p className={styles.paragraph}>Used when:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Memory is replaced later<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Physical macro exists<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.8o6tpcywzm3k" className={styles.h2}>7. Black Box vs Unresolved Reference</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c35" colspan="1" rowspan="1"><p class="c0"><span class="c14">Aspect</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c0"><span class="c14">Black Box</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c0"><span class="c14">Unresolved</span></p></td></tr><tr class="c10"><td class="c35" colspan="1" rowspan="1"><p class="c7"><span class="c4">Intentional</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c7"><span class="c4">Yes</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c7"><span class="c4">No</span></p></td></tr><tr class="c10"><td class="c35" colspan="1" rowspan="1"><p class="c7"><span class="c4">Tool aware</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c7"><span class="c4">Yes</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c7"><span class="c4">No</span></p></td></tr><tr class="c10"><td class="c35" colspan="1" rowspan="1"><p class="c7"><span class="c4">Error</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c7"><span class="c4">No</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c7"><span class="c4">Yes</span></p></td></tr><tr class="c10"><td class="c35" colspan="1" rowspan="1"><p class="c7"><span class="c4">Used for</span></p></td><td class="c53" colspan="1" rowspan="1"><p class="c7"><span class="c4">Memories, IPs</span></p></td><td class="c64" colspan="1" rowspan="1"><p class="c7"><span class="c4">Mistakes</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        id="h.34exw5m0nphi" className={styles.h2}>8. Real Industry Example</h2>
        <h3 id="h.p50jjvnrierb" className={styles.h3}>Scenario:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">SRAM provided by foundry<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">RTL model not given<br></span></li>` }} />
        <p className={styles.paragraph}>Solution:</p>
        <p className={styles.paragraph}>set_black_box SRAM_1Kx32</p>
        <p className={styles.paragraph}>✔ Synthesis continues ✔ Timing abstracted</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image38.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.c1perz66vd3r" className={styles.h2}>9. What Happens If You Ignore It?</h2>
        <p className={styles.paragraph}>Tool may:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Remove logic<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Create floating nets<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Produce incorrect netlist<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Cause PNR failure<br></span></li>` }} />
        <p className={styles.paragraph}>NEVER ignore unresolved references</p>
        <hr className={styles.divider} />
        id="h.foidbwxu19wl" className={styles.h2}>Interview Questions</h2>
        <p className={styles.paragraph}>Q1: Can synthesis proceed with unresolved references?   No (except black boxes)</p>
        <p className={styles.paragraph}>Q2: Are unresolved references allowed in PNR?   No</p>
        <hr className={styles.divider} />
        id="h.4ir4v8fc25my" className={styles.h2}>1.1. Student Summary</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Unresolved reference = missing definition<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Happens during analyze/elaborate<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Caused by missing RTL or library<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Fixed by reading files or black boxing<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.s818tf8ejau2" className={styles.h2}>1.2. Conclusion</h2>
        <p className={styles.paragraph}>Unresolved reference is not a tool bug. It is a design completeness problem. A good synthesis engineer fixes it before compile.</p>
        id="h.zfw4ocfbhi79" className={styles.h2}>Clock Gating in Logical Synthesis</h2>
        <p className={styles.paragraph}>(VERY IMPORTANT – asked in interviews + used in every real chip)</p>
        <hr className={styles.divider} />
        id="h.iyxgwvbxe0pw" className={styles.h2}>1. Why Clock Gating is Needed (Very Simple Start)</h2>
        <h3 id="h.fshmy2b34wl8" className={styles.h3}>Problem First (Without Clock Gating)</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Clock toggles </span><span class="c20 c14">every flip-flop<br></span></li><li class="c5 c6 li-bullet-0"><span>Even when data is </span><span class="c20 c14">not changing<br></span></li><li class="c5 c6 li-bullet-0"><span>Causes </span><span class="c20 c14">huge dynamic power waste<br></span></li>` }} />
        <p className={styles.paragraph}>Fact</p>
        <p className={styles.paragraph}>Clock network consumes 30–40% of total chip power</p>
        <hr className={styles.divider} />
        <h3 id="h.1flpu6iu3lsp" className={styles.h3}>Real-Life Example</h3>
        <p className={styles.paragraph}>Think of:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Ceiling fan running </span><span class="c20 c14">even when no one is in the room<br></span></li>` }} />
        <p className={styles.paragraph}>➡ Waste of electricity ➡ Same happens with clock in IC</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image36.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.wh1m7ai6ekh0" className={styles.h2}>2. What is Clock Gating? (Correct Industry Definition)</h2>
        <p className={styles.paragraph}>Clock gating is a low-power technique where the clock signal is selectively turned OFF for idle registers, without affecting functionality.</p>
        <p className={styles.paragraph}>In short:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">If data not changing → stop clock<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">If data needed → allow clock<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.qyd8htpr8fc7" className={styles.h2}>3. What Happens Without Clock Gating?</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c0"><span class="c14">Aspect</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c0"><span class="c14">Without Clock Gating</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Power</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c7"><span class="c4">Very high</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Clock toggling</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c7"><span class="c4">Always</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Battery life</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c7"><span class="c4">Poor</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Thermal</span></p></td><td class="c34" colspan="1" rowspan="1"><p class="c7"><span class="c4">High heat</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        id="h.dxwbtl9hruvq" className={styles.h2}>4. What Happens With Clock Gating?</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c0"><span class="c14">Aspect</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c0"><span class="c14">With Clock Gating</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Power</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c7"><span class="c4">Reduced</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Clock toggling</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c7"><span class="c4">Only when needed</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Performance</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c7"><span class="c4">Same</span></p></td></tr><tr class="c10"><td class="c27" colspan="1" rowspan="1"><p class="c7"><span class="c4">Area</span></p></td><td class="c47" colspan="1" rowspan="1"><p class="c7"><span class="c4">Slight increase</span></p></td></tr></tbody>` }} />
        </div>
        <p className={styles.paragraph}>Important Clock gating affects power, NOT functionality.</p>
        <hr className={styles.divider} />
        id="h.w8xde631l5bn" className={styles.h2}>5. Where Clock Gating is Added in Flow?</h2>
        <h3 id="h.v56g2j8mhf0h" className={styles.h3}>Correct Answer (Very Important)</h3>
        <p className={styles.paragraph}>RTL</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Analyze</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Elaborate</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Translation</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Optimization   ← Clock Gating Inference HERE</p>
        <p className={styles.paragraph}>↓</p>
        <p className={styles.paragraph}>Mapping</p>
        <p className={styles.paragraph}>Clock gating is added during OPTIMIZATION stage</p>
        <hr className={styles.divider} />
        id="h.8ic65h444k2e" className={styles.h2}>6. Types of Clock Gating</h2>
        <h3 id="h.mpvv45mkenm" className={styles.h3}>1. RTL Clock Gating (Manual)</h3>
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>if (enable)</p>
        <p className={styles.paragraph}>{`q <= d;`}</p>
        <p className={styles.paragraph}>Tool infers:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Enable-based gating<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.m373n56zbzgr" className={styles.h3}>2. Synthesis Clock Gating (Automatic)</h3>
        <p className={styles.paragraph}>Tool inserts:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock gating cells<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Based on data activity<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Most common in industry</p>
        <hr className={styles.divider} />
        <AdUnit slotId="slot_module6content_mid2" />
          <h2 id="h.xgnu4cbgy2ex" className={styles.h2}>7. Clock Gating Cell (Very Important)</h2>
        <h3 id="h.w7wn0tboqc85" className={styles.h3}>What is a Clock Gating Cell?</h3>
        <p className={styles.paragraph}>A special standard cell containing:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">AND gate / Latch<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Glitch-free clock control<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.6i1b2x49fbj6" className={styles.h3}>Why Normal AND Gate is NOT Used?</h3>
        <p className={styles.paragraph}>Causes:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock glitches<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Timing failure<br></span></li>` }} />
        <p className={styles.paragraph}>✔ Clock gating cell:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Latch-based<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Safe for clock path<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.k3dfttlc9jn2" className={styles.h2}>8. Clock Gating Working (Step-by-Step)</h2>
        <p className={styles.paragraph}>1. Enable = 0 → Clock blocked → Flops do NOT toggle</p>
        <p className={styles.paragraph}>2. Enable = 1 → Clock passes → Flops toggle normally</p>
        <hr className={styles.divider} />
        id="h.pvorqtalhmnc" className={styles.h2}>9. Command to Enable Clock Gating (Industry Tool)</h2>
        <h3 id="h.hp8nkftv50tp" className={styles.h3}>Synopsys DC Example</h3>
        <p className={styles.paragraph}>set_clock_gating_style \</p>
        <p className={styles.paragraph}>-positive_edge_logic integrated \</p>
        <p className={styles.paragraph}>-control_point before</p>
        <p className={styles.paragraph}>Enable clock gating:</p>
        <p className={styles.paragraph}>compile_ultra -gate_clock</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image45.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.yjvqfrctdhiu" className={styles.h2}>Conditions for Clock Gating Inference</h2>
        <p className={styles.paragraph}>Tool checks:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Enable condition<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Stable enable<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No async reset conflict<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Timing safe<br></span></li>` }} />
        <p className={styles.paragraph}>If conditions fail →  No gating</p>
        <hr className={styles.divider} />
        id="h.6bjburv5k3r0" className={styles.h2}>1.1. Example: RTL → Clock Gated Netlist</h2>
        <h3 id="h.78qd6ntt7q86" className={styles.h3}>RTL Code</h3>
        <p className={styles.paragraph}>always @(posedge clk)</p>
        <p className={styles.paragraph}>if (en)</p>
        <p className={styles.paragraph}>{`q <= d;`}</p>
        <h3 id="h.tnkohdb2npak" className={styles.h3}>Synthesized Result</h3>
        <p className={styles.paragraph}>CLK → CG_CELL → FF</p>
        <p className={styles.paragraph}>↑</p>
        <p className={styles.paragraph}>en</p>
        <p className={styles.paragraph}>✔ Power saved ✔ Function same</p>
        <hr className={styles.divider} />
        id="h.jetdcnr7ub9j" className={styles.h2}>1.2. Why Clock Gating is NOT Done in RTL Always?</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c65" colspan="1" rowspan="1"><p class="c0"><span class="c14">Reason</span></p></td></tr><tr class="c10"><td class="c65" colspan="1" rowspan="1"><p class="c7"><span class="c4">Hard to manage</span></p></td></tr><tr class="c10"><td class="c65" colspan="1" rowspan="1"><p class="c7"><span class="c4">Clock tree issues</span></p></td></tr><tr class="c10"><td class="c65" colspan="1" rowspan="1"><p class="c7"><span class="c4">Risk of glitches</span></p></td></tr><tr class="c10"><td class="c65" colspan="1" rowspan="1"><p class="c7"><span class="c4">CTS complexity</span></p></td></tr></tbody>` }} />
        </div>
        <p className={styles.paragraph}>✔ Best practice:</p>
        <p className={styles.paragraph}>Let synthesis insert gating</p>
        <hr className={styles.divider} />
        id="h.5aza9b1ufxbf" className={styles.h2}>1.3. Advantages of Clock Gating</h2>
        <p className={styles.paragraph}>✔ Huge power reduction ✔ No performance loss ✔ Industry standard ✔ Essential for low-power chips</p>
        <hr className={styles.divider} />
        id="h.16w8h1b6o6oh" className={styles.h2}>1.4. Disadvantages of Clock Gating</h2>
        <p className={styles.paragraph}>Extra area  Slight timing complexity  CTS becomes harder</p>
        <hr className={styles.divider} />
        id="h.w1vbsposfnnl" className={styles.h2}>1.5. Interview Questions</h2>
        <p className={styles.paragraph}>Q1: At which stage is clock gating added?  Optimization stage</p>
        <p className={styles.paragraph}>Q2: Why not use AND gate directly?  Causes glitches</p>
        <p className={styles.paragraph}>Q3: Does clock gating affect functionality?  No</p>
        <hr className={styles.divider} />
        id="h.sufeqkvj03z0" className={styles.h2}>1.6. Student Summary</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock consumes most power<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Clock gating reduces dynamic power<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Inserted during synthesis optimization<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Uses special clock gating cells<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.lkkghfakjd78" className={styles.h2}>1.7. Conclusion</h2>
        <p className={styles.paragraph}>Clock gating is the heart of low-power design. No modern chip exists without it.</p>
        <hr className={styles.divider} />
        id="h.rjtozhrt8xb" className={styles.h2}>How Timing is Met in Logical Synthesis</h2>
        <p className={styles.paragraph}>{`(MOST IMPORTANT for real projects & interviews)`}</p>
        <hr className={styles.divider} />
        id="h.n5k25he4mb6l" className={styles.h2}>1. First Understand: What is “Timing” in Synthesis?</h2>
        <h3 id="h.v0i122udv3kp" className={styles.h3}>Simple Definition</h3>
        <p className={styles.paragraph}>Timing means data must travel from one register to another within the required clock period.</p>
        <p className={styles.paragraph}>If it fails → Timing violation</p>
        <hr className={styles.divider} />
        <h3 id="h.zcp1uaw9fvrn" className={styles.h3}>Real-Life Example</h3>
        <p className={styles.paragraph}>Think of:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Bus leaves at </span><span class="c20 c14">10:00 AM<br></span></li><li class="c5 c6 li-bullet-0"><span>Passenger must reach bus stop </span><span class="c14 c20">before 10:00<br></span></li>` }} />
        <p className={styles.paragraph}>If late → missed bus  Same in chip:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Data must reach before </span><span class="c20 c14">clock edge<br></span></li>` }} />
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image34.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.adx47tl03ifr" className={styles.h2}>2. Types of Timing in Logical Synthesis</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c0"><span class="c14">Type</span></p></td><td class="c61" colspan="1" rowspan="1"><p class="c0"><span class="c14">Meaning</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Setup Timing</span></p></td><td class="c61" colspan="1" rowspan="1"><p class="c7"><span class="c4">Data arrives before clock</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Hold Timing</span></p></td><td class="c61" colspan="1" rowspan="1"><p class="c7"><span class="c4">Data stays stable after clock</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Max Delay</span></p></td><td class="c61" colspan="1" rowspan="1"><p class="c7"><span class="c4">Long paths</span></p></td></tr><tr class="c10"><td class="c21" colspan="1" rowspan="1"><p class="c7"><span class="c4">Min Delay</span></p></td><td class="c61" colspan="1" rowspan="1"><p class="c7"><span class="c4">Short paths</span></p></td></tr></tbody>` }} />
        </div>
        <p className={styles.paragraph}>Logical synthesis mainly focuses on SETUP (Max delay)</p>
        <hr className={styles.divider} />
        id="h.v8622ijfk0x3" className={styles.h2}>3. Why Timing Fails After Synthesis?</h2>
        <p className={styles.paragraph}>Common reasons:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Long combinational paths<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Too many logic levels<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Bad constraints<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Wrong hierarchy<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Over-optimized area<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.g9gw4vhpzg0h" className={styles.h2}>4. How Synthesis Tool Fixes Timing?</h2>
        <p className={styles.paragraph}>Tool uses multiple techniques, not just one.</p>
        <p className={styles.paragraph}>Main techniques:</p>
        <ol className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Path grouping<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Ungrouping<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Boundary optimization<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Constraint tightening<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Cell resizing<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Logic restructuring<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.s17slwfq67a8" className={styles.h2}>5. Path Grouping (group_path)</h2>
        <h3 id="h.np2aqfux8km5" className={styles.h3}>What is Path Grouping?</h3>
        <p className={styles.paragraph}>Dividing timing paths into meaningful groups so tool can optimize better.</p>
        <hr className={styles.divider} />
        <h3 id="h.6kcckdfr1p0a" className={styles.h3}>Why Needed?</h3>
        <p className={styles.paragraph}>Without grouping:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Tool treats all paths equally<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Critical paths may not get focus<br></span></li>` }} />
        <p className={styles.paragraph}>With grouping:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Critical paths optimized first<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.v3sh8tdpw2u" className={styles.h3}>Example Path Groups</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c25" colspan="1" rowspan="1"><p class="c0"><span class="c14">Group</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c0"><span class="c14">Example</span></p></td></tr><tr class="c10"><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c4">reg2reg</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">Normal paths</span></p></td></tr><tr class="c10"><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c4">in2reg</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">Input to register</span></p></td></tr><tr class="c10"><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c4">reg2out</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">Register to output</span></p></td></tr><tr class="c10"><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c4">clk_gating</span></p></td><td class="c50" colspan="1" rowspan="1"><p class="c7"><span class="c4">Clock gating paths</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <h3 id="h.5emk8yb6evj8" className={styles.h3}>Command Example</h3>
        <p className={styles.paragraph}>group_path -name REG2REG -from [all_registers] -to [all_registers]</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image44.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.8j9ksthuj3jv" className={styles.h2}>6. Ungrouping (Hierarchy Flattening)</h2>
        <h3 id="h.a5ey42iwf47s" className={styles.h3}>What is Ungrouping?</h3>
        <p className={styles.paragraph}>Removing hierarchy boundaries so synthesis can optimize across modules.</p>
        <hr className={styles.divider} />
        <h3 id="h.8pvrqx6qxq6p" className={styles.h3}>Why Needed?</h3>
        <p className={styles.paragraph}>Hierarchy blocks:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Logic sharing<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Gate restructuring<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Optimization across modules<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.7z6rmwigelru" className={styles.h3}>Example</h3>
        <p className={styles.paragraph}>Without ungrouping:</p>
        <p className={styles.paragraph}>Module A → Module B</p>
        <p className={styles.paragraph}>With ungrouping:</p>
        <p className={styles.paragraph}>Flat logic → optimized globally</p>
        <hr className={styles.divider} />
        <h3 id="h.6778eu5onnpx" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>ungroup -all -flatten</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image3.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.pq3fcrycon5g" className={styles.h2}>7. Boundary Optimization</h2>
        <h3 id="h.76h7lnaapyho" className={styles.h3}>What is Boundary Optimization?</h3>
        <p className={styles.paragraph}>Optimizing logic across module boundaries to reduce delay.</p>
        <hr className={styles.divider} />
        <h3 id="h.t85d9pbl8jhb" className={styles.h3}>Why Important?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Registers at boundaries<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Long combinational logic split badly<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Timing violations occur at module edges<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.wt3qprvqkwdq" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>set_boundary_optimization true</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image25.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.k15ilac8sdc0" className={styles.h2}>8. Constraint Tightening</h2>
        <h3 id="h.pfeaihta1enk" className={styles.h3}>What is Constraint Tightening?</h3>
        <p className={styles.paragraph}>Intentionally giving tighter timing constraints to force aggressive optimization.</p>
        <hr className={styles.divider} />
        <h3 id="h.yz8wnygzt4w7" className={styles.h3}>Example</h3>
        <p className={styles.paragraph}>Actual clock:</p>
        <p className={styles.paragraph}>10 ns</p>
        <p className={styles.paragraph}>Given constraint:</p>
        <p className={styles.paragraph}>8 ns</p>
        <p className={styles.paragraph}>Tool works harder → better timing margin</p>
        <hr className={styles.divider} />
        <h3 id="h.pqbuux9jig2e" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>create_clock -period 8 [get_ports clk]</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image25.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.kr37ouadhp6y" className={styles.h2}>{`9. Cell Resizing & Logic Restructuring`}</h2>
        <p className={styles.paragraph}>Tool automatically:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Uses faster cells<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Increases drive strength<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Reduces logic depth<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Balances paths<br></span></li>` }} />
        <p className={styles.paragraph}>Example:</p>
        <p className={styles.paragraph}>NAND → AOI → OAI</p>
        <hr className={styles.divider} />
        id="h.m5tz9fr20uis" className={styles.h2}>Multi-Corner Multi-Mode (MCMM)</h2>
        <p className={styles.paragraph}>Tool optimizes for:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Different clocks<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Different modes<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Different corners<br></span></li>` }} />
        <p className={styles.paragraph}>Ensures timing closure in real silicon</p>
        <hr className={styles.divider} />
        id="h.s8unrtwz1k4o" className={styles.h2}>1.1. Timing Closure Strategy (Industry)</h2>
        <p className={styles.paragraph}>1. Clean constraints 2. Group paths 3. Fix hierarchy 4. Optimize critical paths 5. Re-run compile 6. Check reports</p>
        <hr className={styles.divider} />
        id="h.5y0reyytavzi" className={styles.h2}>1.2. Commands Used for Timing</h2>
        <p className={styles.paragraph}>report_timing</p>
        <p className={styles.paragraph}>report_constraint</p>
        <p className={styles.paragraph}>report_qor</p>
        <hr className={styles.divider} />
        id="h.ej4lwsgngbq" className={styles.h2}>1.3. Advantages of These Techniques</h2>
        <p className={styles.paragraph}>✔ Better timing ✔ Fewer ECOs later ✔ Cleaner PNR handoff</p>
        <hr className={styles.divider} />
        id="h.5rotggb4kan9" className={styles.h2}>1.4. Disadvantages / Cautions</h2>
        <p className={styles.paragraph}>Too much flattening increases area  Over-tight constraints increase power  Poor grouping hides real critical paths</p>
        <hr className={styles.divider} />
        id="h.l7b0vbe4kfsu" className={styles.h2}>1.5. Interview Questions</h2>
        <p className={styles.paragraph}>Q: What is grouping vs ungrouping?  Grouping = path focus  Ungrouping = hierarchy removal</p>
        <p className={styles.paragraph}>Q: Why tighten constraints?  Force better optimization</p>
        <hr className={styles.divider} />
        id="h.rt52wjarts4w" className={styles.h2}>1.6. Student Summary</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Timing is main goal of synthesis<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Tool uses multiple optimization tricks<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Engineer guides tool using constraints &amp; commands<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.walazcjrrx9a" className={styles.h2}>1.7. Conclusion</h2>
        <p className={styles.paragraph}>Timing closure is not automatic. Good synthesis engineer = good constraint writer.</p>
        <hr className={styles.divider} />
        id="h.kokuqpirh1u4" className={styles.h2}>Outputs of Logical Synthesis (Industry Perspective)</h2>
        <p className={styles.paragraph}>After logical synthesis completes, tools do NOT just give one file. They generate multiple critical outputs that are used by PNR, STA, DFT, Power teams.</p>
        <hr className={styles.divider} />
        id="h.n44eb56fcivr" className={styles.h2}>1. Why Outputs of Logical Synthesis Are Important?</h2>
        <p className={styles.paragraph}>Logical synthesis is NOT the end. It is a handoff stage.</p>
        <p className={styles.paragraph}>Outputs are used by:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Physical Design (PNR)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Static Timing Analysis (STA)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Power Analysis<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">ECO &amp; Debug<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Tapeout checks<br></span></li>` }} />
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image49.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.ximawa7kxyh1" className={styles.h2}>2. Main Outputs of Logical Synthesis</h2>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c0"><span class="c14">Output</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c0"><span class="c14">Purpose</span></p></td></tr><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c4">Gate-level Netlist</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c4">Physical implementation</span></p></td></tr><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c4">SDC</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing constraints</span></p></td></tr><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c4">DDC / DB</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c4">Tool internal database</span></p></td></tr><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing Reports</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c4">Check timing</span></p></td></tr><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c4">Area Reports</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c4">Check area</span></p></td></tr><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c4">Power Reports</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c4">Check power</span></p></td></tr><tr class="c10"><td class="c16" colspan="1" rowspan="1"><p class="c7"><span class="c4">QoR Reports</span></p></td><td class="c37" colspan="1" rowspan="1"><p class="c7"><span class="c4">Overall quality</span></p></td></tr></tbody>` }} />
        </div>
        <p className={styles.paragraph}>We will explain each one deeply.</p>
        <hr className={styles.divider} />
        id="h.tlskbb98d73j" className={styles.h2}>3. Gate-Level Netlist (.v)</h2>
        <h3 id="h.wjdcc8ssflk9" className={styles.h3}>What Is Gate-Level Netlist?</h3>
        <p className={styles.paragraph}>A Verilog file containing only standard cells from the technology library.</p>
        <hr className={styles.divider} />
        <h3 id="h.nbxefce3lkst" className={styles.h3}>How It Looks</h3>
        <p className={styles.paragraph}>RTL (Before synthesis):</p>
        <p className={styles.paragraph}>{`assign y = a & b;`}</p>
        <p className={styles.paragraph}>Gate-level (After synthesis):</p>
        <p className={styles.paragraph}>AND2_X1 U1 ( .A(a), .B(b), .Z(y) );</p>
        <hr className={styles.divider} />
        <h3 id="h.ivcscgfu5m38" className={styles.h3}>Why It Is Important</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Input for </span><span class="c20 c14">PNR<br></span></li><li class="c5 c6 li-bullet-0"><span>Used for </span><span class="c20 c14">STA<br></span></li><li class="c5 c6 li-bullet-0"><span>Used for </span><span class="c20 c14">GLS (Gate-level simulation)<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.d83521y9eviz" className={styles.h3}>Command to Generate</h3>
        <p className={styles.paragraph}>write -format verilog -hierarchy -output design_netlist.v</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image1.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.8vqq0cu0lgiw" className={styles.h2}>4. SDC (Synopsys Design Constraints)</h2>
        <h3 id="h.vta56gt83ujr" className={styles.h3}>What Is SDC?</h3>
        <p className={styles.paragraph}>A file that contains timing intent of the design.</p>
        <p className={styles.paragraph}>Examples:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock definition<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Input delays<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Output delays<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">False paths<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Multicycle paths<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.gznzhzig1j1v" className={styles.h3}>Why Output SDC Is Needed?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>PNR must follow </span><span class="c20 c14">same timing intent<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">STA must analyze using same constraints<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.kyz1irng4ok" className={styles.h3}>Command to Write SDC</h3>
        <p className={styles.paragraph}>write_sdc design_constraints.sdc</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image24.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.joys97s4qbk5" className={styles.h2}>5. DDC / DB (Design Database)</h2>
        <h3 id="h.wz1my76x59qr" className={styles.h3}>What Is DDC?</h3>
        <p className={styles.paragraph}>Tool’s internal compiled database</p>
        <hr className={styles.divider} />
        <h3 id="h.yrpzvnxogvy6" className={styles.h3}>Why Needed?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Faster reload<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">ECO friendly<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Preserves optimization history<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.ggirlrmt0jlo" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>write -format ddc -hierarchy -output design.ddc</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image6.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.gabmuaa5tnoa" className={styles.h2}>6. Timing Reports</h2>
        <h3 id="h.bkte3ucou401" className={styles.h3}>Why Timing Reports?</h3>
        <p className={styles.paragraph}>To check:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Setup violations<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Slack<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Critical paths<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.4tewl3opfm0q" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>report_timing</p>
        <p className={styles.paragraph}>More detailed:</p>
        <p className={styles.paragraph}>report_timing -max_paths 10 -delay_type max</p>
        <hr className={styles.divider} />
        <h3 id="h.pocmwc1mzfk0" className={styles.h3}>Example Output Meaning</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c71" colspan="1" rowspan="1"><p class="c0"><span class="c14">Term</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c0"><span class="c14">Meaning</span></p></td></tr><tr class="c10"><td class="c71" colspan="1" rowspan="1"><p class="c7"><span class="c4">Slack</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Margin</span></p></td></tr><tr class="c10"><td class="c71" colspan="1" rowspan="1"><p class="c7"><span class="c4">Negative slack</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Timing failure</span></p></td></tr><tr class="c10"><td class="c71" colspan="1" rowspan="1"><p class="c7"><span class="c4">Path</span></p></td><td class="c49" colspan="1" rowspan="1"><p class="c7"><span class="c4">Critical logic</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image17.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.6ypw051pyl3e" className={styles.h2}>7. Area Reports</h2>
        <h3 id="h.noxtn545jaa0" className={styles.h3}>Why Area Reports?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Check design size<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Compare optimization impact<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Cost estimation<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.zf11qa9zcjp4" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>report_area</p>
        <hr className={styles.divider} />
        <h3 id="h.1yec8jul619r" className={styles.h3}>Example Information</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Total cell area<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Combinational vs sequential<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Hierarchy wise breakup<br></span></li>` }} />
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image9.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.edr00a8e7y5m" className={styles.h2}>8. Power Reports</h2>
        <h3 id="h.b1wtldqeoeo" className={styles.h3}>Why Power Reports?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Power budget<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Battery life<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Thermal safety<br></span></li>` }} />
        <hr className={styles.divider} />
        <h3 id="h.gj62ba9bwlwj" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>report_power</p>
        <hr className={styles.divider} />
        <h3 id="h.xx0phh4f0att" className={styles.h3}>Types of Power</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c43" colspan="1" rowspan="1"><p class="c0"><span class="c14">Type</span></p></td><td class="c12" colspan="1" rowspan="1"><p class="c0"><span class="c14">Meaning</span></p></td></tr><tr class="c10"><td class="c43" colspan="1" rowspan="1"><p class="c7"><span class="c4">Dynamic</span></p></td><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Switching power</span></p></td></tr><tr class="c10"><td class="c43" colspan="1" rowspan="1"><p class="c7"><span class="c4">Leakage</span></p></td><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Static power</span></p></td></tr><tr class="c10"><td class="c43" colspan="1" rowspan="1"><p class="c7"><span class="c4">Total</span></p></td><td class="c12" colspan="1" rowspan="1"><p class="c7"><span class="c4">Overall power</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image41.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.utpotsez8cta" className={styles.h2}>9. QoR (Quality of Results) Report</h2>
        <h3 id="h.9ns9itrzanwx" className={styles.h3}>What Is QoR?</h3>
        <p className={styles.paragraph}>Single report summarizing Timing, Area, Power</p>
        <hr className={styles.divider} />
        <h3 id="h.i5s6vfis0hx8" className={styles.h3}>Command</h3>
        <p className={styles.paragraph}>report_qor</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image46.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.al3te4lxjnl0" className={styles.h2}>Industrial-Level Logical Synthesis Flow (Step-by-Step)</h2>
        <p className={styles.paragraph}>Now REAL FLOW, not theory.</p>
        <hr className={styles.divider} />
        <h3 id="h.3lz6ktp5ty6g" className={styles.h3}>Step 1. Read Libraries</h3>
        <p className={styles.paragraph}>set target_library "slow.lib"</p>
        <p className={styles.paragraph}>set link_library "* slow.lib"</p>
        <hr className={styles.divider} />
        <h3 id="h.z9gfboxv9x3e" className={styles.h3}>Step 2. Read RTL</h3>
        <p className={styles.paragraph}>{`analyze -format verilog {top.v block1.v block2.v}`}</p>
        <p className={styles.paragraph}>elaborate top</p>
        <hr className={styles.divider} />
        <h3 id="h.5r8o2uhbku6t" className={styles.h3}>Step 3. Link Design</h3>
        <p className={styles.paragraph}>link</p>
        <hr className={styles.divider} />
        <h3 id="h.j33p5luqmkbi" className={styles.h3}>Step 4. Apply Constraints</h3>
        <p className={styles.paragraph}>source design.sdc</p>
        <hr className={styles.divider} />
        <h3 id="h.kc2m83ul5ey0" className={styles.h3}>Step 5. Compile</h3>
        <p className={styles.paragraph}>compile_ultra</p>
        <hr className={styles.divider} />
        <h3 id="h.6m81pgeflfcg" className={styles.h3}>Step 6. Reports</h3>
        <p className={styles.paragraph}>report_timing</p>
        <p className={styles.paragraph}>report_area</p>
        <p className={styles.paragraph}>report_power</p>
        <hr className={styles.divider} />
        <h3 id="h.fbk54cf5vhnd" className={styles.h3}>Step 7. Write Outputs</h3>
        <p className={styles.paragraph}>write -format verilog -hierarchy -output top_gates.v</p>
        <p className={styles.paragraph}>write_sdc top.sdc</p>
        <p className={styles.paragraph}>write -format ddc -hierarchy -output top.ddc</p>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image39.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.1fwdzgpsscrx" className={styles.h2}>1.1. analyze vs elaborate vs read_verilog</h2>
        <h3 id="h.2f5zdz5yr4s1" className={styles.h3}>analyze</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Checks syntax<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Converts RTL to intermediate form<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">No design creation<br></span></li>` }} />
        <p className={styles.paragraph}>analyze -format verilog design.v</p>
        <hr className={styles.divider} />
        <h3 id="h.j3n9l29b7sv5" className={styles.h3}>elaborate</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Builds design hierarchy<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Resolves parameters<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Creates actual design<br></span></li>` }} />
        <p className={styles.paragraph}>elaborate top</p>
        <hr className={styles.divider} />
        <h3 id="h.t01mbesyfzhz" className={styles.h3}>read_verilog</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">analyze + elaborate together<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Faster for simple designs<br></span></li>` }} />
        <p className={styles.paragraph}>read_verilog design.v</p>
        <hr className={styles.divider} />
        <h3 id="h.wmwgmymjth0o" className={styles.h3}>Interview Difference Table</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c55" colspan="1" rowspan="1"><p class="c0"><span class="c14">Command</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c0"><span class="c14">Purpose</span></p></td></tr><tr class="c10"><td class="c55" colspan="1" rowspan="1"><p class="c7"><span class="c4">analyze</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Syntax + parse</span></p></td></tr><tr class="c10"><td class="c55" colspan="1" rowspan="1"><p class="c7"><span class="c4">elaborate</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Build design</span></p></td></tr><tr class="c10"><td class="c55" colspan="1" rowspan="1"><p class="c7"><span class="c4">read_verilog</span></p></td><td class="c28" colspan="1" rowspan="1"><p class="c7"><span class="c4">Both combined</span></p></td></tr></tbody>` }} />
        </div>
        <hr className={styles.divider} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image15.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.i4stfypno7go" className={styles.h2}>1.2.  Important Topic</h2>
        <p className={styles.paragraph}>✔ Link stage ✔ QoR analysis ✔ Database handoff ✔ ECO friendliness ✔ MCMM readiness</p>
        <p className={styles.paragraph}>(All are industry-critical)</p>
        <hr className={styles.divider} />
        id="h.u8750mfzdp3i" className={styles.h2}>1.3. Student Final Summary</h2>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Logical synthesis produces </span><span class="c20 c14">multiple outputs<br></span></li><li class="c5 c6 li-bullet-0"><span>Each output serves a </span><span class="c20 c14">different team<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Missing or wrong output = project failure<br></span></li>` }} />
        <hr className={styles.divider} />
        id="h.654gkhascsan" className={styles.h2}>1.4. Conclusion</h2>
        <p className={styles.paragraph}>Logical synthesis is not about “compile only”. It is about clean, correct, reusable outputs.</p>
        <hr className={styles.divider} />
        id="h.d9f4774vlkpq" className={styles.h2}>Linking Stage (Very Important – Often Missed)</h2>
        <h3 id="h.212i0npgl8tt" className={styles.h3}>What is Linking?</h3>
        <p className={styles.paragraph}>After elaboration, the tool must:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Match RTL cells → library cells<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Resolve references across hierarchy<br></span></li>` }} />
        <p className={styles.paragraph}>link</p>
        <h3 id="h.sxmxah66j5av" className={styles.h3}>Why Important?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span>Prevents </span><span class="c20 c14">unresolved references<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Ensures correct library usage<br></span></li>` }} />
        <p className={styles.paragraph}>Industry Interview Question  What happens if link fails? ✔ Netlist cannot be generated</p>
        <p className={styles.paragraph}>Image Prompt</p>
        <p className={styles.paragraph}>“RTL modules linked with standard cell library blocks”</p>
        <hr className={styles.divider} />
        id="h.7343wn6qgqop" className={styles.h2}>2. Design Rule Constraints (DRC at Synthesis Level)</h2>
        <h3 id="h.ny7uy2xl2sy6" className={styles.h3}>What Are These?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Max transition<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Max capacitance<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Max fanout<br></span></li>` }} />
        <p className={styles.paragraph}>set_max_transition 0.2 [all_outputs]</p>
        <p className={styles.paragraph}>set_max_fanout 8</p>
        <h3 id="h.un4qbh727bc4" className={styles.h3}>Why Important?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Prevents routing &amp; timing issues later<br></span></li>` }} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image19.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.5nzdk2ast93n" className={styles.h2}>3. Multicorner Multi-Mode (MCMM) Awareness</h2>
        <h3 id="h.68zs7hnmkv56" className={styles.h3}>What Is MCMM?</h3>
        <p className={styles.paragraph}>Design must work across:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Multiple corners (SS, TT, FF)<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Multiple modes (functional, scan)<br></span></li>` }} />
        <p className={styles.paragraph}>Even if full MCMM is done later, synthesis must be MCMM-aware.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image20.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.bctlj7mpo7sa" className={styles.h2}>{`4. Clock Definition & Clock Quality`}</h2>
        <h3 id="h.igfg6qttdi8j" className={styles.h3}>Why Clock Is Special?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock drives everything<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Bad clock = bad chip<br></span></li>` }} />
        <p className={styles.paragraph}>create_clock -name clk -period 10 [get_ports clk]</p>
        <h3 id="h.fdip5efeddfq" className={styles.h3}>Tool Optimizes:</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Clock path<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Clock latency<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Clock skew (pre-CTS assumptions)<br></span></li>` }} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image10.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.vuef2wv9rleh" className={styles.h2}>{`5. Scan & DFT Awareness in Synthesis`}</h2>
        <p className={styles.paragraph}>Even if DFT insertion is separate, synthesis must:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Preserve scan ports<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Respect scan_enable<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Avoid optimizing scan logic wrongly<br></span></li>` }} />
        <p className={styles.paragraph}>set_dont_touch [get_ports scan_enable]</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image48.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.c3dnc36d64mq" className={styles.h2}>6. Formality / LEC Readiness</h2>
        <h3 id="h.m0hhy9anhkm8" className={styles.h3}>What Is LEC?</h3>
        <p className={styles.paragraph}>Logical Equivalence Check:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">RTL vs Gate netlist must match<br></span></li>` }} />
        <h3 id="h.f5eceyyrahbz" className={styles.h3}>Why Synthesis Must Care?</h3>
        <p className={styles.paragraph}>Bad optimization = LEC failure</p>
        <p className={styles.paragraph}>Industry Expectation ✔ Netlist must be formally equivalent</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image16.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.8pgwvgfzg63t" className={styles.h2}>{`7. Naming Rules & Netlist Cleanliness`}</h2>
        <h3 id="h.sl1mx2oiuv6b" className={styles.h3}>Why Naming Matters?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">PNR tools are strict<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Bad names → tool errors<br></span></li>` }} />
        <p className={styles.paragraph}>set verilogout_no_tri true</p>
        <p className={styles.paragraph}>{`set bus_naming_style {%s[%d]}`}</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image35.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.rqhj8yxyyi3r" className={styles.h2}>8. ECO Friendliness</h2>
        <h3 id="h.7ir07476rxrk" className={styles.h3}>What Is ECO?</h3>
        <p className={styles.paragraph}>Small fixes without re-synthesizing full design</p>
        <h3 id="h.livdy3tz2lt" className={styles.h3}>How Synthesis Helps?</h3>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Preserving hierarchy<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Saving DDC<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Avoiding aggressive flattening<br></span></li>` }} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image2.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.z9bkh7gpo99m" className={styles.h2}>9. Hierarchy Control (Flatten vs Preserve)</h2>
        <p className={styles.paragraph}>set_flatten false</p>
        <h3 id="h.wa74q3flwofz" className={styles.h3}>Why Important?</h3>
        <div className={styles.tableContainer}>
          <table className={styles.contentTable} dangerouslySetInnerHTML={{ __html: `<tbody><tr class="c10"><td class="c66" colspan="1" rowspan="1"><p class="c0"><span class="c14">Reason</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c0"><span class="c14">Impact</span></p></td></tr><tr class="c10"><td class="c66" colspan="1" rowspan="1"><p class="c7"><span class="c4">Debug</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c4">Easy</span></p></td></tr><tr class="c10"><td class="c66" colspan="1" rowspan="1"><p class="c7"><span class="c4">ECO</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c4">Faster</span></p></td></tr><tr class="c10"><td class="c66" colspan="1" rowspan="1"><p class="c7"><span class="c4">PNR</span></p></td><td class="c25" colspan="1" rowspan="1"><p class="c7"><span class="c4">Controlled</span></p></td></tr></tbody>` }} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image18.png" alt="" className={styles.contentImage} />
        </div>
        <hr className={styles.divider} />
        id="h.yd0hiid400hx" className={styles.h2}>Low-Power Intent Awareness (CPF/UPF – Intro Level)</h2>
        <p className={styles.paragraph}>Even if power is handled later:</p>
        <ul className={styles.list} dangerouslySetInnerHTML={{ __html: `<li class="c5 c6 li-bullet-0"><span class="c4">Synthesis must not break power intent<br></span></li><li class="c5 c6 li-bullet-0"><span class="c4">Isolation / retention logic must be preserved<br></span></li>` }} />
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc1_image47.png" alt="" className={styles.contentImage} />
        </div>
        <h1 id="h.672bqutyqms3" className={styles.h1}>STEP BY STEP PROCESS OF LOGICAL SYNTHESIS USING DC</h1>
        id="h.yd89czl5jx61" className={styles.h2}>Step1: create a directory for your new project like ORCA, ARM (mkdir ORCA, cd ORCA )</h2>
        id="h.edwjysnj5bvh" className={styles.h2}>Step2: give the permission to that directory (source .cshrc file)</h2>
        id="h.qb1jizxp62uh" className={styles.h2}>Step3: launch the dc_shell using below command</h2>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image23.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image6.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>dc_shell: This is the name of the Synopsys Design Compiler command line shell, which is used</p>
        <p className={styles.paragraph}>for logic synthesis.</p>
        <p className={styles.paragraph}>-output: This is a command line option that specifies the name of the output file generated by</p>
        <p className={styles.paragraph}>the dc_shell. In this case, the output file will be named as ALU.log you can specify any name according to your requirements</p>
        <p className={styles.paragraph}>ALU.log: This is the name of the output file that will be generated by dc_shell.</p>
        <p className={styles.paragraph}>✓ The file extension .log indicates that it will be a log file, which typically contains</p>
        <p className={styles.paragraph}>information about the synthesis process, including any errors or warnings that were</p>
        <p className={styles.paragraph}>encountered.</p>
        <p className={styles.paragraph}>✓ A .log file allows designers and engineers to record this output for later review,</p>
        <p className={styles.paragraph}>debugging, documentation, progress tracking, and optimization analysis.</p>
        <p className={styles.paragraph}>✓ Overall, a .log file is an essential tool for designers and engineers who need to</p>
        <p className={styles.paragraph}>synthesize complex designs and ensure that they are functioning correctly.</p>
        id="h.q6iuofph543e" className={styles.h2}>Step4: search_path</h2>
        <p className={styles.paragraph}>➢ The search_path command is used to specify the directories where the tool should</p>
        <p className={styles.paragraph}>search for files that are included in the design.</p>
        <p className={styles.paragraph}>➢ By specifying the search_path command, the user can tell the tool where to look for</p>
        <p className={styles.paragraph}>files without having to specify the full directory path every time. This can save time</p>
        <p className={styles.paragraph}>and effort and make the design process more efficient.</p>
        <p className={styles.paragraph}>Reasons to Provide a Search Path</p>
        <p className={styles.paragraph}>➢ If we don't specify a search path in your design, the tool will use its default search path</p>
        <p className={styles.paragraph}>to find any files that are not in the current directory. However, if we have files in a</p>
        <p className={styles.paragraph}>different directory that are not included in the default search path, the tool may not be</p>
        <p className={styles.paragraph}>able to find them, which can result in errors during compilation.</p>
        <p className={styles.paragraph}>➢ Therefore, it is mandatory to specify a search path to ensure that all required files are</p>
        <p className={styles.paragraph}>found and compiled correctly.</p>
        <p className={styles.paragraph}>➢ The figure shows the command for setting the search_path. In the search_path, we</p>
        <p className={styles.paragraph}>specify the locations of the .db and. v files. because,</p>
        <p className={styles.paragraph}>➢ When we instantiate a module in our design, the tool needs to know the location of</p>
        <p className={styles.paragraph}>those files to be able to compile and link the design properly.</p>
        <p className={styles.paragraph}>➢ By specifying the path locations of the .db and. v files in the search_path, we are</p>
        <p className={styles.paragraph}>telling the tool where to look for those files during compilation.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image46.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>"set" is a command that is used to modify or set a value in a software tool.</p>
        <p className={styles.paragraph}>"Search_path" is a variable that specifies the directories where the software tool should look</p>
        <p className={styles.paragraph}>for files and resources.</p>
        <p className={styles.paragraph}>➢ if the search_path is not specified and the target_library is set directly, the tool will look</p>
        <p className={styles.paragraph}>for the required files in the current working directory (CWD) and the default directories</p>
        <p className={styles.paragraph}>specified in the tool settings.</p>
        <p className={styles.paragraph}>➢ If the required files are not found in these locations, the tool will generate errors and</p>
        <p className={styles.paragraph}>fail to compile the design.</p>
        id="h.knydw88ga0ds" className={styles.h2}>Step5: setting link and target libraries</h2>
        <p className={styles.paragraph}>Reason to provide set target_library and set link_library at beginning</p>
        <p className={styles.paragraph}>In the DC Shell compiler, the link and target libraries are specified at the beginning of the</p>
        <p className={styles.paragraph}>compilation process for a few reasons:</p>
        <p className={styles.paragraph}>➢ Library Mapping: The link and target libraries are used to map the input design to the</p>
        <p className={styles.paragraph}>desired technology libraries. By specifying the link and target libraries at the beginning,</p>
        <p className={styles.paragraph}>the compiler can determine the correct library mapping for the design.</p>
        <p className={styles.paragraph}>➢ Optimization: The compilation uses the information from the link and target libraries</p>
        <p className={styles.paragraph}>to optimize the design. By knowing the target library, the compiler can optimize the</p>
        <p className={styles.paragraph}>design to meet the specified timing, power, and area constraints.</p>
        <p className={styles.paragraph}>In summary, specifying the link and target libraries at the beginning of the DC Shell</p>
        <p className={styles.paragraph}>compiler is necessary for accurate library mapping, optimization, and timing analysis. This</p>
        <p className={styles.paragraph}>information is needed throughout the compilation process, so it makes sense to specify it</p>
        <p className={styles.paragraph}>at the beginning</p>
        <p className={styles.paragraph}>Target_libaray</p>
        <p className={styles.paragraph}>➢ The target_library is the collection of standard cells that the program uses during the</p>
        <p className={styles.paragraph}>optimization process to map the design.</p>
        <p className={styles.paragraph}>➢ By specifying the target_library in our design, we are telling the compiler which set of</p>
        <p className={styles.paragraph}>standard cells to use during the optimization process.</p>
        <p className={styles.paragraph}>➢ The target library is used during compilation to create a technology-specific gate-level</p>
        <p className={styles.paragraph}>netlist.</p>
        <p className={styles.paragraph}>➢ DC optimization selects the smallest gates that meet the required timing and logic</p>
        <p className={styles.paragraph}>functionality If we do not provide the target_library, the compiler program will not be</p>
        <p className={styles.paragraph}>able to select the suitable components for the design, which can result in the design not</p>
        <p className={styles.paragraph}>meeting its requirements or not working at all. Fig. shows the command for set</p>
        <p className={styles.paragraph}>Target_library</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image28.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Reasons to Provide Target Library</p>
        <p className={styles.paragraph}>If you don't provide a target library, the compiler won't know which set of technology</p>
        <p className={styles.paragraph}>libraries to use to implement your design.</p>
        <p className={styles.paragraph}>Without a target library, the DC Shell compiler will not be able to perform library mapping,</p>
        <p className={styles.paragraph}>optimization, or timing analysis accurately. It may use default libraries, which are not</p>
        <p className={styles.paragraph}>optimized for your specific technology and design, resulting in suboptimal performance, power</p>
        <p className={styles.paragraph}>consumption, and area usage.</p>
        <p className={styles.paragraph}>In the command "set target_library", each word refers to the following:</p>
        <p className={styles.paragraph}>"set": This is a command used to set a variable.</p>
        <p className={styles.paragraph}>"target_library": This is the name of the variable or option being set in the program. It refers</p>
        <p className={styles.paragraph}>to the collection of standard cells that the program will use during the optimization process to</p>
        <p className={styles.paragraph}>map the design.</p>
        <p className={styles.paragraph}>link_library</p>
        <p className={styles.paragraph}>➢ The link_library variable is used to specify a list of libraries and design files that can</p>
        <p className={styles.paragraph}>use to resolve references when a design is loaded.</p>
        <p className={styles.paragraph}>➢ The link command links all the referenced components and designs to the current design</p>
        <p className={styles.paragraph}>to make it complete.</p>
        <p className={styles.paragraph}>➢ An asterisk (*) in the link_library variable specifies that Design Compiler should search</p>
        <p className={styles.paragraph}>memory for the reference.</p>
        <p className={styles.paragraph}>➢ The "*" symbol in the link_library command is used as a wildcard character to include</p>
        <p className={styles.paragraph}>all the libraries in the current directory that match a specific pattern.</p>
        <p className={styles.paragraph}>➢ Using the "*" symbol in the link_library command makes it easier and faster, to include</p>
        <p className={styles.paragraph}>all related libraries without manually listing them one by one. It saves time and effort</p>
        <p className={styles.paragraph}>and reduces the chances of errors while specifying the command.</p>
        <p className={styles.paragraph}>To “resolve” the reference DC (A ‘reference’ is any gate, block, or sub-design that is</p>
        <p className={styles.paragraph}>instantiated in our design):</p>
        <p className={styles.paragraph}>✓ First looks in DC memory for a matching design name.</p>
        <p className={styles.paragraph}>✓ Next look in the technology libraries listed in the link_library variable for a matching</p>
        <p className={styles.paragraph}>library cell name.</p>
        <p className={styles.paragraph}>The figure shows the command for setting the link_library path.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image3.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>In the command set link _library, each word refers to the following,</p>
        <p className={styles.paragraph}>➢ "set" is a command to set a particular value to a specified variable or parameter</p>
        <p className={styles.paragraph}>➢ "Link_library" refers to the variable that stores the list of libraries and design files</p>
        <p className={styles.paragraph}>that the Design Compiler can use to resolve references.</p>
        <p className={styles.paragraph}>➢ If Design Compiler does not find the reference in the link libraries, it searches in the</p>
        <p className={styles.paragraph}>directories specified by the search_path variable.</p>
        <p className={styles.paragraph}>➢ If we don't specify the link_library correctly, the tool won't find the necessary files and</p>
        <p className={styles.paragraph}>libraries for the design, resulting in errors during the design process.</p>
        <p className={styles.paragraph}>➢ The temporary files generated by the analyze command will also be affected, making it</p>
        <p className={styles.paragraph}>difficult to create a fully functional design. So, it is important to provide a link library</p>
        <p className={styles.paragraph}>during the synthesis process.</p>
        <p className={styles.paragraph}>Below Fig. explains how the warning will come, if link_library is not provided properly or if</p>
        <p className={styles.paragraph}>link_library is not given in our design.</p>
        <p className={styles.paragraph}>Step6:Reading files</p>
        <p className={styles.paragraph}>There are two methods to read the files into Dc.</p>
        <p className={styles.paragraph}>✓ analyze and elaborate</p>
        <p className={styles.paragraph}>✓ read_file command.</p>
        <p className={styles.paragraph}>Read Verilog</p>
        <p className={styles.paragraph}>✓ The read_file command analyzes the design and translates it into a technology-</p>
        <p className={styles.paragraph}>independent (GTECH) design in a single step.</p>
        <p className={styles.paragraph}>✓ read_verilog includes two steps, that is, analyze and elaborate, but do not link the</p>
        <p className={styles.paragraph}>design automatically.</p>
        <p className={styles.paragraph}>Reading verilog files using analyze command</p>
        <p className={styles.paragraph}>Through analyze and elaborate command you would specify the directory where you want</p>
        <p className={styles.paragraph}>the design files to be stored but in the case of read_file, the design files would get</p>
        <p className={styles.paragraph}>automatically stored in the present working directory.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image63.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Read_file</p>
        <p className={styles.paragraph}>Reads designs and libraries into memory</p>
        <p className={styles.paragraph}>➢ Performs the same operation as analyzing and elaborating in one step.</p>
        <p className={styles.paragraph}>➢ Does not create intermediate files for Verilog</p>
        <p className={styles.paragraph}>➢ Creates intermediate files for VHDL</p>
        <p className={styles.paragraph}>Does not execute the link command automatically. The link has to be done manually</p>
        <p className={styles.paragraph}>after the read_file command.</p>
        <p className={styles.paragraph}>Analyze</p>
        <p className={styles.paragraph}>The "analyze" command reads source code files written in Verilog or VHDL hardware</p>
        <p className={styles.paragraph}>description language (HDL), checks for syntax errors and issues warnings or errors, reports</p>
        <p className={styles.paragraph}>errors, and converts the source files into machine code. When the files are converted, the</p>
        <p className={styles.paragraph}>resulting binary files are placed in the current working directory (CWD).</p>
        <p className={styles.paragraph}>The "-format verilog" option specifies that the source files are written in the Verilog language.</p>
        <p className={styles.paragraph}>Below Fig. shows the command for Analyze, in our design, we are using the Verilog files which</p>
        <p className={styles.paragraph}>is why we are considering the option -format Verilog.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image52.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Finding the Top – Module name in our design</p>
        <p className={styles.paragraph}>➢ To find the top module name in a Verilog design,</p>
        <p className={styles.paragraph}>➢ Open the Verilog design file in a text editor, with the help of the command. The below</p>
        <p className={styles.paragraph}>command helps to open the Verilog file.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image19.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>➢ Sh, gvim is a command used to start a graphical text editor called gvim.</p>
        <p className={styles.paragraph}>➢ gvim is a text editor that runs in a graphical environment.</p>
        <p className={styles.paragraph}>➢ To open the Verilog file the command sh gvim was executed</p>
        <p className={styles.paragraph}>➢ Look for the module definition at the beginning of the file. The module definition starts</p>
        <p className={styles.paragraph}>with the keyword module, followed by the name of the module and a list of input and</p>
        <p className={styles.paragraph}>output ports.</p>
        <p className={styles.paragraph}>➢ Top module name will be one it should not call in any other module</p>
        <p className={styles.paragraph}>Elaborate</p>
        <p className={styles.paragraph}>The "elaborate" command combines various modules and components of a circuit described in</p>
        <p className={styles.paragraph}>a file (in Verilog or VHDL format) to create a complete circuit design for simulation testing.</p>
        <p className={styles.paragraph}>The steps that happen in Elaborate Command are:</p>
        <p className={styles.paragraph}>➢ At this stage, it reads the RTL code, and this RTL code is converted into modules as per</p>
        <p className={styles.paragraph}>its logical hierarchy.</p>
        <p className={styles.paragraph}>➢ Once it has all logical Boolean representation loaded, the tool maps logic with a</p>
        <p className={styles.paragraph}>technology-independent cell called the Gtech cell.</p>
        <p className={styles.paragraph}>➢ During elaboration, the tool checks whether the design is unique, if not, it stops the</p>
        <p className={styles.paragraph}>tool. Once the design becomes unique, the tool checks for unresolved references in</p>
        <p className={styles.paragraph}>the design.</p>
        <p className={styles.paragraph}>➢ If it has linking issues, then an RTL correction is required, or you need to check if</p>
        <p className={styles.paragraph}>it is due to any missing libraries.</p>
        <p className={styles.paragraph}>➢ After elaboration, it checks for timing loops in design. If you find any timing loop,</p>
        <p className={styles.paragraph}>you need to get the RTL correction done by the designer.</p>
        <p className={styles.paragraph}>➢ The top module is the main thing in a design, containing lower-level modules. When</p>
        <p className={styles.paragraph}>using the elaborate command to create a netlist, we must provide the top module</p>
        <p className={styles.paragraph}>name as input.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image69.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image14.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Compile</p>
        <p className={styles.paragraph}>Compile command performs both logic level and Gate – level netlist synthesis and optimization</p>
        <p className={styles.paragraph}>on the current design.</p>
        <p className={styles.paragraph}>The compile command performs the following steps:</p>
        <p className={styles.paragraph}>➢ Perform optimizations such as technology mapping, and cell replacement to generate a</p>
        <p className={styles.paragraph}>netlist that is optimized for the target technology.</p>
        <p className={styles.paragraph}>➢ Generate a report that lists any errors or warnings detected during the process.</p>
        <p className={styles.paragraph}>➢ Convert the netlist into the target technology format such as Gtech format, which is</p>
        <p className={styles.paragraph}>used by Synopsys tools for implementation and verification.</p>
        <p className={styles.paragraph}>➢ After elaboration, in the compilation stage, the tool maps the Gtech cell with the actual</p>
        <p className={styles.paragraph}>cell (specific technology dependent) from the library. Actual cell mapping is dependent</p>
        <p className={styles.paragraph}>on design constraints or user-specific constraints. Apart from this, the tool removes the</p>
        <p className={styles.paragraph}>registers with constant propagation/unloaded which are not required in the design. If</p>
        <p className={styles.paragraph}>these removed cells are required, then you need to provide feedback to the designer to</p>
        <p className={styles.paragraph}>get the correct RTL.</p>
        <p className={styles.paragraph}>➢ After elaboration and compilation, the tool performs optimizations based on user</p>
        <p className={styles.paragraph}>constraints to meet timing, area, and power requirements.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image68.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Once the compilation process is complete, the netlist is ready for various design activities such as Schematic view, Apply SDC,static timing analysis, and power analysis etc.</p>
        <p className={styles.paragraph}>Start_gui</p>
        <p className={styles.paragraph}>➢ The start_gui command is used to open the graphical user interface (GUI) of the tool.</p>
        <p className={styles.paragraph}>➢ This allows the user to visually interact with the tool Below Command opens the</p>
        <p className={styles.paragraph}>schematic view of design</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image20.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Stop_gui</p>
        <p className={styles.paragraph}>➢ The stop_gui command is used to close the graphical user interface (GUI) of the tool.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image4.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>NOTE : After the elaborate command, the compile command is to optimize the netlist for the target</p>
        <p className={styles.paragraph}>technology.</p>
        <p className={styles.paragraph}>The compilation process includes technology mapping, and cell replacement, along with</p>
        <p className={styles.paragraph}>verifying the netlist for timing and logical errors.</p>
        <p className={styles.paragraph}>Check_timing</p>
        <p className={styles.paragraph}>✓ The "check_timing" command is to identify any possible timing problems in a design.</p>
        <p className={styles.paragraph}>✓ To check for constraint problems such as undefined clocking, undefined input arrival</p>
        <p className={styles.paragraph}>times, and undefined output constraints, we use the check_timing command.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image11.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image64.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>all_inputs</p>
        <p className={styles.paragraph}>➢ The "all_inputs" command is used to gather a list of all input or inout ports in the current</p>
        <p className={styles.paragraph}>design.</p>
        <p className={styles.paragraph}>➢ It returns a collection of these ports and can be useful for analyzing and controlling</p>
        <p className={styles.paragraph}>input data in a design.</p>
        <p className={styles.paragraph}>Below is the command for all_inputs. When this command is executed, it returns a list of all</p>
        <p className={styles.paragraph}>the input or inout ports that exist in our design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image47.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>all_outputs</p>
        <p className={styles.paragraph}>➢ The all_outputs command is used to get a list of all output or inout ports in the current</p>
        <p className={styles.paragraph}>design.</p>
        <p className={styles.paragraph}>➢ It can be used to search for specific output ports, on all output ports at once.</p>
        <p className={styles.paragraph}>Below is the command for all_outputs. When this command is executed, it returns a list of all</p>
        <p className={styles.paragraph}>the output or inout ports that exist in our design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image59.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>all_registers</p>
        <p className={styles.paragraph}>➢ The all_registers command is used to get a list of all the pins in the current design. By</p>
        <p className={styles.paragraph}>default, it will return a list of all the pins in the design.</p>
        <p className={styles.paragraph}>Below is the command for all_registers When this command is executed, it returns a list of all</p>
        <p className={styles.paragraph}>registers that exist in our design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image21.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>all_registers -clock_pins</p>
        <p className={styles.paragraph}>➢ The command all_registers -clock_pins is used to find and return a list of clock pins in</p>
        <p className={styles.paragraph}>the current design.</p>
        <p className={styles.paragraph}>Below Fig. shows the all_registers -clock_pins command returns a list of clock pins in the</p>
        <p className={styles.paragraph}>current design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image16.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Size_of Collection</p>
        <p className={styles.paragraph}>The sizeof_collection is a command, used for determining the number of objects in the</p>
        <p className={styles.paragraph}>Collection.</p>
        <p className={styles.paragraph}>With the help of the below command, we can know how many clock pins are there in our</p>
        <p className={styles.paragraph}>design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image18.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>all_fanin</p>
        <p className={styles.paragraph}>➢ The all_fanin command in synthesis is used to identify all the input signals of a</p>
        <p className={styles.paragraph}>particular signal or a group of signals.</p>
        <p className={styles.paragraph}>all_fanin -to</p>
        <p className={styles.paragraph}>The "all_fanin -to" command is used to find all the input sources connected to a particular</p>
        <p className={styles.paragraph}>output in a design, making it a useful tool for identifying inputs to a specific gate or register.</p>
        <p className={styles.paragraph}>The below command executes every register of the clock pin, as the ALU design consists of 76</p>
        <p className={styles.paragraph}>clock pins. For example, let us consider one clock pin in our design,</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image38.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>all_fanin -to -flat : command help to get a list of all the clock pins</p>
        <p className={styles.paragraph}>associated with registers in the current design, while also flattening the design structure.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image13.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The "all_fanin -to  -flat -startpoints_only" command can be used to identify the</p>
        <p className={styles.paragraph}>start points associated with clock pins in a flattened design structure. The start points are the</p>
        <p className={styles.paragraph}>pins or nets where the paths start.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image32.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>let us consider another clock pin in our design,</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image25.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>We can clearly observe that while giving -flat switch in this clock pin, ‘MUL1/q_reg[0]/CP’we</p>
        <p className={styles.paragraph}>can see that the clock pin consists of flat cells.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image61.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The below command shows the starting points for the clock pin of MUL1/q_reg[0]/CP</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image17.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>So,  design because of more number of clock pins, manually it takes more time to see</p>
        <p className={styles.paragraph}>the start points of every clock pin. With the help of the above commands, we can write a script</p>
        <p className={styles.paragraph}>to find the number of clocks in our design in dc_shell in genus we have direct command [get_clock_ports ].</p>
        <p className={styles.paragraph}># Loop through all registers clock pins</p>
        <p className={styles.paragraph}>{`foreach i [get_object_name [all_registers -clock_pins]] {`}</p>
        <p className={styles.paragraph}># Get all fan-in start points</p>
        <p className={styles.paragraph}>set a [get_object_name [all_fanin -to $i -flat -startpoints_only]]</p>
        <p className={styles.paragraph}># Check if list is not empty</p>
        <p className={styles.paragraph}>{`if {[llength $a] == 1} {`}</p>
        <p className={styles.paragraph}># Loop through all primary inputs</p>
        <p className={styles.paragraph}>{`foreach j [get_object_name [all_inputs]] {`}</p>
        <p className={styles.paragraph}># Compare fan-in with input</p>
        <p className={styles.paragraph}>{`if {$i == $a} {`}</p>
        <p className={styles.paragraph}>lappend c $a</p>
        <p className={styles.paragraph}>{`}`}</p>
        <p className={styles.paragraph}>{`}`}</p>
        <p className={styles.paragraph}>{`}`}</p>
        <p className={styles.paragraph}>{`}`}</p>
        <p className={styles.paragraph}># Print unique sorted list</p>
        <p className={styles.paragraph}>puts [lsort -u $c]</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image36.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>We need to source the above file in shell will get the clock ports name need to create the clock for those ports</p>
        <p className={styles.paragraph}>Create_clock</p>
        <p className={styles.paragraph}>➢ The "create_clock" command creates a clock in a design by defining its source, which</p>
        <p className={styles.paragraph}>can be pins or ports.</p>
        <p className={styles.paragraph}>➢ Only one clock can be associated with a pin or port. If no sources are specified, a virtual</p>
        <p className={styles.paragraph}>clock can be created using the clock name.</p>
        <p className={styles.paragraph}>In the below command, the command creates a clock with the name "CLK" and a period of 10</p>
        <p className={styles.paragraph}>nanoseconds.</p>
        <p className={styles.paragraph}>The "-name" option specifies the name of the clock, while the "-period" option sets the clock</p>
        <p className={styles.paragraph}>period to 10 nanoseconds.</p>
        <p className={styles.paragraph}>The "[get_ports clk]" option selects the port named "clk" as the source for the clock. This means</p>
        <p className={styles.paragraph}>that the "clk" port is defined as the source for the clock signal with a period of 2 nanoseconds.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image33.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>In the below command, the command creates a clock with the name "CLK" and a period of 5</p>
        <p className={styles.paragraph}>nanoseconds.</p>
        <p className={styles.paragraph}>The "-name" option specifies the name of the clock, while the "-period" option sets the clock</p>
        <p className={styles.paragraph}>period to 5 nanoseconds.</p>
        <p className={styles.paragraph}>The "[get_ports clk]" option selects the port named "clk" as the source for the clock. This means</p>
        <p className={styles.paragraph}>that the "clk" port is defined as the source for the clock signal with a period of 5 nanoseconds.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image49.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Report_clocks</p>
        <p className={styles.paragraph}>The “report_clock” command displays important information about the clock network in a</p>
        <p className={styles.paragraph}>design. It shows the details like clock groups, clock period, clock latency, and other clock</p>
        <p className={styles.paragraph}>constraints. To use it, enter the command in the interface.</p>
        <p className={styles.paragraph}>The below command shows the clock report for “CLK and I1”</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image5.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image31.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Need to execute again check timing command to know the other violations warning errors</p>
        <p className={styles.paragraph}>Check_timing</p>
        <p className={styles.paragraph}>The "check_timing" command is to identify any possible timing problems in a design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image44.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image58.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image9.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Set_input_delay</p>
        <p className={styles.paragraph}>➢ The "set_input_delay" command allows setting the delay time for a signal to travel</p>
        <p className={styles.paragraph}>from an input pin to a register in a design.</p>
        <p className={styles.paragraph}>➢ It helps that the input signal arrives at the right time and is properly captured by the</p>
        <p className={styles.paragraph}>register.</p>
        <p className={styles.paragraph}>Below Fig. The "set_input_delay" command is used to set input path delay values in a design.</p>
        <p className={styles.paragraph}>In this, a delay value of 6 nanoseconds is being set for all input signals except for those</p>
        <p className={styles.paragraph}>connected to the "clk" clock. The "remove_from_collection" command is being used to remove</p>
        <p className={styles.paragraph}>the clock and apply it to all input signals connected to the "clk" clock.</p>
        <p className={styles.paragraph}>If we don't know the exact time for the signal to arrive at the input port or output port, we will</p>
        <p className={styles.paragraph}>keep a pessimistic value of 60 % to the external world and 40 % to our design.</p>
        <p className={styles.paragraph}>And the input delay is not a constant value. Worst case, we will assume 60% and company to</p>
        <p className={styles.paragraph}>company changes the input and output values.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image29.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Like this you need to apply input delay for all the output ports with respect to other clock NOTE: when we are define input delay for other clock need to add -add option to command not to override previous command</p>
        <p className={styles.paragraph}>➢ -add_delay We use this switch because the previous input delay of the clock should not</p>
        <p className={styles.paragraph}>replace with another clock of the output delay.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image71.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Set_output_delay</p>
        <p className={styles.paragraph}>➢ The set_output_delay command is used to set the time delay between a clock edge and the</p>
        <p className={styles.paragraph}>output signal on output ports in a design.</p>
        <p className={styles.paragraph}>➢ It's important to specify the delay and meet timing requirements.</p>
        <p className={styles.paragraph}>➢ In this case, the delay being set is 6 nanoseconds of time, and it is applied to all output</p>
        <p className={styles.paragraph}>ports in the design using the "all_outputs" command.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image53.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>After apply input delay output delay respected to all the clocks we need to do again check_timing command for to find remaining warnings and errors</p>
        <p className={styles.paragraph}>Check_timing</p>
        <p className={styles.paragraph}>➢ The "check_timing" command is to identify any possible timing problems in a design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image57.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The above fig shows after clearing all the input delays and endpoints it is showing the non –</p>
        <p className={styles.paragraph}>unate path in the design. To know the command for the non-unate path, we can man the error</p>
        <p className={styles.paragraph}>code which was shown in the check timing i.e., TIM -052</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image56.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>By doing the man for that error code we can see in the above fig it shows the line ‘what next’</p>
        <p className={styles.paragraph}>by reading that description we can find out which command can be used to remove the non-</p>
        <p className={styles.paragraph}>unate path in our design.</p>
        <p className={styles.paragraph}>Timing sense of an arc: The timing sense of an arc is defined as the sense of traversal from</p>
        <p className={styles.paragraph}>the source pin of the timing arc to the sink pin of the timing arc. Timing sense is also called as</p>
        <p className={styles.paragraph}>"unateness" of the timing arc.</p>
        <p className={styles.paragraph}>Non-Unateness</p>
        <p className={styles.paragraph}>The non-unate represents a function where a change in output value cannot be determined from</p>
        <p className={styles.paragraph}>the direction of the change in the input value. The output pin value is not dependent on the</p>
        <p className={styles.paragraph}>single input pin. It also depends on 2nd input pin. Since the timing arc will be between the single</p>
        <p className={styles.paragraph}>input and single output pin, so, it’s difficult to identify this relationship directly.</p>
        <p className={styles.paragraph}>The below figure shows the block diagram of the clock generator, this is the block that contains</p>
        <p className={styles.paragraph}>the non-unateness path in  design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image34.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image22.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>In the above figure, we can see the xor gate with two input pins, i.e., I2 and clk. So, for this</p>
        <p className={styles.paragraph}>gate, the non-unateness is happening. The output pin value is not dependent on the single input</p>
        <p className={styles.paragraph}>pin. It also depends on 2nd input pin. So, we can’t change the clk and the other input for the xor</p>
        <p className={styles.paragraph}>gate is the I2 pin, for this we need to set 0 (constant) for the I2 pin.</p>
        <p className={styles.paragraph}>So, with the help of set case analysis, we can set the value.</p>
        <p className={styles.paragraph}>Set case analysis</p>
        <p className={styles.paragraph}>Specifies that a port or pin is at a constant logic value of 1 or 0.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image50.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The above fig shows that we are making a constant logic value ‘zero’ for the I2 pin, we are</p>
        <p className={styles.paragraph}>setting ‘zero’ for the TE pin also because the output of the xor gate is the input for the Mux,</p>
        <p className={styles.paragraph}>for that Mux the TE is the selection pin so the selection line allows the multiplexer circuit to</p>
        <p className={styles.paragraph}>switch its “attention” between the various input data lines when determining the value to be</p>
        <p className={styles.paragraph}>output. That’s why we are setting zero for the TE pin.</p>
        <p className={styles.paragraph}>Difference between set clock sense and set case analysis</p>
        <p className={styles.paragraph}>Set clock sense</p>
        <p className={styles.paragraph}>This command only is meaningful in the context of a non-unate clock network. To specify the</p>
        <p className={styles.paragraph}>unateness of the clock network, the user needs to specify the name of the design pins through</p>
        <p className={styles.paragraph}>which the clock passes.</p>
        <p className={styles.paragraph}>Set case analysis</p>
        <p className={styles.paragraph}>Case analysis is a way to specify a given mode of the design without altering the netlist</p>
        <p className={styles.paragraph}>structure. For the current timing analysis session, you can specify either that some signals are</p>
        <p className={styles.paragraph}>at a constant value (1 or 0) or that only one type of transition (rising or falling) is to be</p>
        <p className={styles.paragraph}>examined. When you specify case analysis to a constant value, the constant value is propagated</p>
        <p className={styles.paragraph}>through the network as long as a controlling value for the traversed logic is at the constant</p>
        <p className={styles.paragraph}>value.</p>
        <p className={styles.paragraph}>Report_transitive_fanin</p>
        <p className={styles.paragraph}>Reports logic in the transitive fanin of specified sinks.</p>
        <p className={styles.paragraph}>In check timing, we can observe that unconstrained endpoints are removed but there is a</p>
        <p className={styles.paragraph}>warning message i.e., a non-unate path is there for the pin ckGen/U8/z. so, to know the sense</p>
        <p className={styles.paragraph}>of this we can use the command report_transitive_fanin</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image15.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Check_timing</p>
        <p className={styles.paragraph}>➢ The "check_timing" command is to identify any possible timing problems in a design.</p>
        <p className={styles.paragraph}>The below check timing shows that the non-unate has been removed.so, after clearing the non-</p>
        <p className={styles.paragraph}>unate path, it’s showing that some of the endpoints are not constrained for the maximum delay</p>
        <p className={styles.paragraph}>for that we need to apply the output delay with respect to clock.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image10.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Generated clock</p>
        <p className={styles.paragraph}>A generated clock is one that is derived from another clock, known as its master clock by a</p>
        <p className={styles.paragraph}>circuit within the design itself, such as a clock divider. These are divider/multiplier clocks that</p>
        <p className={styles.paragraph}>get generated from a master clock. The generated clock may be of the same frequency or a</p>
        <p className={styles.paragraph}>different frequency than its master clock.</p>
        <p className={styles.paragraph}>Mostly these are defined at the output of a clock divider like a flip-flop or mux. When we define</p>
        <p className={styles.paragraph}>a generated clock, its source clock, the generation point, and division ratio should be provided.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image7.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The above fig shows that the ckDiv_reg block is the divider by circuit. So, that’s why we create</p>
        <p className={styles.paragraph}>the generated clock in our design.</p>
        <p className={styles.paragraph}>The below figure shows the command to create the generated clock in Alu design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image48.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The "create_generated_clock" command is used to define a clock name "gen" in the design.</p>
        <p className={styles.paragraph}>The source clock for this clock is "clk". The frequency of the generated clock is half of the</p>
        <p className={styles.paragraph}>source clock, and it is associated with the Q pin of the "ckDiv_reg" register within the "ckGen"</p>
        <p className={styles.paragraph}>module.</p>
        <p className={styles.paragraph}>Report_clocks</p>
        <p className={styles.paragraph}>The “report_clock” command displays important information about the clock network in a</p>
        <p className={styles.paragraph}>design. It shows the details like clock groups, clock period, clock latency, and other clock</p>
        <p className={styles.paragraph}>constraints. To use it, enter the command in the interface.</p>
        <p className={styles.paragraph}>The below command shows the clock report for clk, I1, gen.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image70.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Check_timing</p>
        <p className={styles.paragraph}>➢ The "check_timing" command is to identify any possible timing problems in a design.</p>
        <p className={styles.paragraph}>The below fig shows that check timing is clear after creating the generated clock.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image51.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Clock uncertainty</p>
        <p className={styles.paragraph}>➢ Clock uncertainty is the deviation of the actual arrival time of the clock edge with</p>
        <p className={styles.paragraph}>respect to the ideal arrival time. In ideal mode, the clock signal can arrive at all clock</p>
        <p className={styles.paragraph}>pins simultaneously.</p>
        <p className={styles.paragraph}>➢ But in fact, that perfection is not achievable. So, to anticipate the fact that the clock will</p>
        <p className={styles.paragraph}>arrive at different times at different clock pins the ‘ideal mode’ clock assumes a clock</p>
        <p className={styles.paragraph}>uncertainty.</p>
        <p className={styles.paragraph}>➢ To define a clock uncertainty, we have to use the command set_clock_uncertainty.</p>
        <p className={styles.paragraph}>Set clock uncertainty</p>
        <p className={styles.paragraph}>This command checks if the clock signal timing is uniform throughout the design, which is</p>
        <p className={styles.paragraph}>important for the circuit to work correctly.</p>
        <p className={styles.paragraph}>Uncertainty has the following factors:</p>
        <p className={styles.paragraph}>Jitter: Jitter is a deviation of the clock signal from its ideal timing</p>
        <p className={styles.paragraph}>Margin: Margin is the safety buffer in a system for reliable operation under varying conditions.</p>
        <p className={styles.paragraph}>Crosstalk: Crosstalk is the coupling of signals between adjacent wires or components in a</p>
        <p className={styles.paragraph}>digital circuit.</p>
        <p className={styles.paragraph}>Skew: Skew is the difference in arrival times of the clock signal at different parts of a circuit.</p>
        <p className={styles.paragraph}>We take 20 % uncertainty for setup (jitter+Margin+crosstalk+skew) and 15 % uncertainty for</p>
        <p className={styles.paragraph}>hold (Margin+crosstalk+skew)</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image55.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The above fig represents, how uncertainty is applied to CLK</p>
        <p className={styles.paragraph}>Command: set_clock_uncertainty -setup 2 [get_clocks CLK]</p>
        <p className={styles.paragraph}>Explanation:</p>
        <p className={styles.paragraph}>✓ set_clock_uncertainty: Specifies the command to set clock uncertainty for timing</p>
        <p className={styles.paragraph}>analysis.</p>
        <p className={styles.paragraph}>✓ -setup: Indicates that the clock uncertainty being set is for setup timing.</p>
        <p className={styles.paragraph}>✓ Sets the setup clock uncertainty value to 2 units.</p>
        <p className={styles.paragraph}>✓ [get_clocks CLK]: Retrieves the clock signal named "CLK" from the design.</p>
        <p className={styles.paragraph}>Command: set_clock_uncertainty -hold 1.5 [get_clocks CLK]</p>
        <p className={styles.paragraph}>Explanation:</p>
        <p className={styles.paragraph}>✓ -hold: Indicates that the clock uncertainty being set is for hold timing.</p>
        <p className={styles.paragraph}>✓ Sets the hold clock uncertainty value to 1.5 units.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image42.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The above fig represents, how uncertainty is applied to the i1 clock</p>
        <p className={styles.paragraph}>Command: set_clock_uncertainty -setup 1 [get_clocks i1]</p>
        <p className={styles.paragraph}>Explanation:</p>
        <p className={styles.paragraph}>✓ set_clock_uncertainty: Specifies the command to set clock uncertainty for timing</p>
        <p className={styles.paragraph}>analysis.</p>
        <p className={styles.paragraph}>✓ -setup: Indicates that the clock uncertainty being set is for setup timing.</p>
        <p className={styles.paragraph}>✓ Sets the setup clock uncertainty value to 1 unit.</p>
        <p className={styles.paragraph}>✓ [get_clocks CLK]: Retrieves the clock signal named "i1" from the design.</p>
        <p className={styles.paragraph}>Command: set_clock_uncertainty -hold 0.75 [get_clocks i1]</p>
        <p className={styles.paragraph}>Explanation:</p>
        <p className={styles.paragraph}>✓ -hold: Indicates that the clock uncertainty being set is for hold timing.</p>
        <p className={styles.paragraph}>✓ Sets the hold clock uncertainty value to 0.75 units.</p>
        <p className={styles.paragraph}>Driving cell</p>
        <p className={styles.paragraph}>We use the set_driving_cell command to specify the drive characteristics of input or inout ports</p>
        <p className={styles.paragraph}>that are driven by the cells in the technology library. These commands associate a library pin</p>
        <p className={styles.paragraph}>with input ports so that delay calculation can be accurately modeled.</p>
        <p className={styles.paragraph}>The syntax of the set_driving_cell command:</p>
        <p className={styles.paragraph}>Set_driving_cell [-lib_cell_name]</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image2.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>The above fig shows after executing the Set_driving _cell command it is showing some</p>
        <p className={styles.paragraph}>warning message in the design. So, there we can man the error code i.e., UID -401.</p>
        <p className={styles.paragraph}>By doing the man for that error code we can see in the above fig it shows the line ‘what next’</p>
        <p className={styles.paragraph}>by reading that description we can find out which command can be used to remove the warning.</p>
        <p className={styles.paragraph}>This is optional but, if we don’t want to see the warnings or errors and to know the next step</p>
        <p className={styles.paragraph}>this is the way to approach and find out.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image41.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>So, after doing the man to that error code, it shows the option no_design_rule to remove the</p>
        <p className={styles.paragraph}>warnings. The below fig shows the warnings are removed.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image12.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Set_load</p>
        <p className={styles.paragraph}>This constraint defines the capacitive load to the output port or any specified net.</p>
        <p className={styles.paragraph}>{`set_driving_cell and set_load are commands to make sure that the interface to your P&R`}</p>
        <p className={styles.paragraph}>block will not cause transition or capacitance violations when connected to external circuitry</p>
        <p className={styles.paragraph}>in a chip.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image66.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Group_path</p>
        <p className={styles.paragraph}>The grouping of paths can be done using the group_path command. It groups a set of paths or</p>
        <p className={styles.paragraph}>endpoints for timing analysis and cost function calculations. Paths within a group are analyzed</p>
        <p className={styles.paragraph}>and optimized separately from other groups. By default, there is one path group per clock. All</p>
        <p className={styles.paragraph}>timing paths clocked by a given clock at the path endpoint belong to that clock's path group.</p>
        <p className={styles.paragraph}>All timing paths within a path group are optimized for timing together, starting with the critical</p>
        <p className={styles.paragraph}>path, which is the path having the worst slack within the group. After the critical path is fixed,</p>
        <p className={styles.paragraph}>the next-worst path becomes the new critical path and the target for fixing. The tool continues</p>
        <p className={styles.paragraph}>fixing paths until all paths in a group have zero slack or until a better optimization solution for</p>
        <p className={styles.paragraph}>the current critical path cannot be found. In this case, the subcritical paths are not fixed are and</p>
        <p className={styles.paragraph}>left with timing violations. Paths within a group are optimized and reported separately from</p>
        <p className={styles.paragraph}>the other groups.</p>
        <p className={styles.paragraph}>Group paths are automatically created when the create_clock and group_path command is used.</p>
        <p className={styles.paragraph}>The default group path contains all paths not captured by a clock. We can use the report_timing</p>
        <p className={styles.paragraph}>command to see which groups we have.</p>
        <p className={styles.paragraph}>The below figure shows the command for creating different group paths for an Alu design.</p>
        <p className={styles.paragraph}>group_path -name r2r -from [all_registers -clock_pins] -to [all_registers data_pins], the group</p>
        <p className={styles.paragraph}>is named r2r, and the paths start from the clock pins of all registers (clock_pins option) and end</p>
        <p className={styles.paragraph}>at the data pins of all registers (-data_pins option), like that we can create a group path for</p>
        <p className={styles.paragraph}>iin2reg, reg2out, and in2out.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image60.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Report_timing</p>
        <p className={styles.paragraph}>The "report_timing" command generates a detailed report with timing information for the</p>
        <p className={styles.paragraph}>current design.</p>
        <p className={styles.paragraph}>And also creates the group paths reports that we created. The below figure shows the report</p>
        <p className={styles.paragraph}>timing all for groups that are created.</p>
        <p className={styles.paragraph}>The below figure shows the report timing for clock path CLK</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image24.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>IN2OUT Port</p>
        <p className={styles.paragraph}>The clock for the in2out port is outside the block and we don’t know which clock is driving</p>
        <p className={styles.paragraph}>in2out.</p>
        <p className={styles.paragraph}>So, we have to filter the inputs and outputs ports for the in2out path and give the delay for those</p>
        <p className={styles.paragraph}>ports with respect to the clock which we created i.e., virtual clock.</p>
        <p className={styles.paragraph}>To filter the input ports, below is the command to get input ports</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image37.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>To filter the output ports, below is the command to get output ports</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image65.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>VIRTUAL CLOCK</p>
        <p className={styles.paragraph}>- A virtual clock can be defined as a clock without any source in other words a virtual clock is</p>
        <p className={styles.paragraph}>a clock that has been defined but has not been associated with any pin/port.</p>
        <p className={styles.paragraph}>- It does not physically exist in the design but it does exist in the memory. It is used as a</p>
        <p className={styles.paragraph}>reference to constrain the interface pins by relating the arrivals at input/output ports.</p>
        <p className={styles.paragraph}>We can simply define the virtual clock by the create_clock command but we don’t need to give</p>
        <p className={styles.paragraph}>any generation point since for the virtual clock there is no actual clock source in the design,</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image8.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Report clocks</p>
        <p className={styles.paragraph}>The “report_clock” command displays important information about the clock network in a</p>
        <p className={styles.paragraph}>design. It shows the details like clock groups, clock period, clock latency, and other clock</p>
        <p className={styles.paragraph}>constraints. To use it, enter the command in the interface. To know whether the clock is</p>
        <p className={styles.paragraph}>created we can use the report clocks command.</p>
        <p className={styles.paragraph}>The below command shows the clock Virtual is created.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image30.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Input Delay</p>
        <p className={styles.paragraph}>We give a 35% delay with respect to the virtual clock for input ports of the in2out path by</p>
        <p className={styles.paragraph}>filtering those ports from the design. If we consider a 60% delay of input and output delay, no</p>
        <p className={styles.paragraph}>positive percentage of timing is left to do analysis.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image40.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Similarly for output delay also we have applied 35% of the delay with respect to the virtual</p>
        <p className={styles.paragraph}>clock.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image39.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>NOTE: AFTER ALL THE CONSTRAIN NEED TO RUN COMPILE COMMAND ONE MORE TIME</p>
        <p className={styles.paragraph}>The below figure shows, after giving the virtual clock for the in2out path the slack is met.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image67.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image1.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Report_qor: Displays QoR (quality of results) information and statistics for the current</p>
        <p className={styles.paragraph}>Design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image26.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Report_area: Displays area information for the current design.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image27.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Report_power: Calculates and reports dynamic and static power for the design .</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image62.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image43.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Write_file: Writes a design netlist from memory to a file.</p>
        <p className={styles.paragraph}>To open this, write file we use below command in dc_shell.</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image45.png" alt="" className={styles.contentImage} />
        </div>
        <p className={styles.paragraph}>Write_sdc</p>
        <p className={styles.paragraph}>It generates SDC file for our current design</p>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image35.png" alt="" className={styles.contentImage} />
        </div>
        <div className={styles.imageContainer}>
          <img loading="lazy" src="/assets/modules/module6/doc2_image54.png" alt="" className={styles.contentImage} />
        </div>
        <h1 id="h.672bqutyqms3" className={styles.h1}>STEP BY STEP PROCESS OF LOGICAL SYNTHESIS USING Genus</h1>
        id="h.7k2zhk6el5g1" className={styles.h2}>1. Set the library search path (Where Genus will look for technology libraries)</h2>
        <p className={styles.paragraph}>{`set_db init_lib_search_path {./libs/}`}</p>
        <p className={styles.paragraph}>This tells Genus where the standard cell library files are stored.</p>
        <hr className={styles.divider} />
        id="h.vkt18hk332hi" className={styles.h2}>2. Set the SDC (timing constraints) search path</h2>
        <p className={styles.paragraph}>{`set_db script_search_path {./constraints/}`}</p>
        <p className={styles.paragraph}>This tells Genus where your timing constraint file (SDC) is located.</p>
        <hr className={styles.divider} />
        id="h.na3nvyc6y4e" className={styles.h2}>3. Set the Verilog (RTL) search path</h2>
        <p className={styles.paragraph}>{`set_db init_hdl_search_path {./rtl/}`}</p>
        <p className={styles.paragraph}>This tells Genus where your design (Verilog files) are stored.</p>
        <hr className={styles.divider} />
        id="h.hre3q7phsx15" className={styles.h2}>4. Set the library file (technology file used for synthesis)</h2>
        <p className={styles.paragraph}>{`set_db library {./libs/tech_library.lib}`}</p>
        <p className={styles.paragraph}>This selects which standard cell library Genus should use.</p>
        <hr className={styles.divider} />
        id="h.5wkyg79zzowp" className={styles.h2}>5. Read the Verilog design</h2>
        <p className={styles.paragraph}>read_hdl ./rtl/alu.v</p>
        <p className={styles.paragraph}>Loads your RTL design into Genus.</p>
        <hr className={styles.divider} />
        id="h.lp8p6soz2anh" className={styles.h2}>6. Elaborate the design (build internal model)</h2>
        <p className={styles.paragraph}>elaborate</p>
        <p className={styles.paragraph}>Genus builds the complete logic hierarchy of your design.</p>
        <hr className={styles.divider} />
        id="h.e7fnskweqk39" className={styles.h2}>7. Find clock ports automatically</h2>
        <p className={styles.paragraph}>get_clock_ports</p>
        <p className={styles.paragraph}>Genus identifies all clock signals in the design.</p>
        <hr className={styles.divider} />
        id="h.5blsk3u4mryw" className={styles.h2}>8. Check initial timing status</h2>
        <p className={styles.paragraph}>check_timing_intent</p>
        <p className={styles.paragraph}>Checks if basic timing information is missing.</p>
        <hr className={styles.divider} />
        id="h.yyawzipr5y8k" className={styles.h2}>9. Source (load) the SDC constraints file</h2>
        <p className={styles.paragraph}>source ./constraints/sdcfile.tcl</p>
        <p className={styles.paragraph}>This file contains all timing constraints like clock, input delay, output delay, etc.</p>
        <hr className={styles.divider} />
        id="h.8j3tvpxqtz08" className={styles.h2}>10. (Inside sdcfile.tcl) – Clock and timing constraints</h2>
        <p className={styles.paragraph}>create_clock -period 10 [get_ports clk]</p>
        <p className={styles.paragraph}>create_clock -period 5 [get_ports ll]</p>
        <p className={styles.paragraph}>{`set_input_delay 6 -clock clk [get_ports [remove_from_collection [all_inputs] {ll clk}]]`}</p>
        <p className={styles.paragraph}>set_output_delay 6 -clock clk [get_ports [all_outputs]]</p>
        <p className={styles.paragraph}>{`set_input_delay 3 -add_delay -clock ll [get_ports [remove_from_collection [all_inputs] {clk ll}]]`}</p>
        <p className={styles.paragraph}>set_output_delay 3 -add_delay -clock ll [get_ports [all_outputs]]</p>
        <p className={styles.paragraph}>{`set_driving_cell -lib_cell BUFDF8BPW40P140HVT [get_ports [remove_from_collection [all_inputs] {clk ll}]]`}</p>
        <p className={styles.paragraph}>set_load 0.00146193 [get_ports [all_outputs]]</p>
        <p className={styles.paragraph}>set_clock_uncertainty -setup 2 [get_clock clk]</p>
        <p className={styles.paragraph}>set_clock_uncertainty -hold 2 [get_clock clk]</p>
        <p className={styles.paragraph}>set_clock_uncertainty -setup 1 [get_clock clk]</p>
        <p className={styles.paragraph}>set_clock_uncertainty -hold 1 [get_clock clk]</p>
        <p className={styles.paragraph}>set_case_analysis 0 TE</p>
        <p className={styles.paragraph}>set_case_analysis 1 T2</p>
        <p className={styles.paragraph}>create_generated_clock -name gen_clk -divide_by 2 -source clk [get_pins ckGen/ckDiv_reg/Q]</p>
        <p className={styles.paragraph}>(These define clocks, input/output delays, uncertainty, loads, and generated clocks.)</p>
        <hr className={styles.divider} />
        id="h.jtro6y7phy6y" className={styles.h2}>11. Terminal commands (extra checks)</h2>
        <p className={styles.paragraph}>check_timing_intent</p>
        <p className={styles.paragraph}>filter_collection [all_fanin -to [all_outputs]] "port_direction == in"</p>
        <p className={styles.paragraph}>filter_collection [all_fanout -from [all_inputs]] "port_direction == out"</p>
        <p className={styles.paragraph}>create_clock -name ver -period 10</p>
        <p className={styles.paragraph}>{`set_input_delay -clock ver 3.5 [get_ports {addc.*to$}]* [TRI]`}</p>
        <p className={styles.paragraph}>set_output_delay -clock ver 3.5 [get_ports sumab[*]]</p>
        <p className={styles.paragraph}>set_false_path -from ll -to ver</p>
        <p className={styles.paragraph}>set_false_path -from ver -to ll</p>
        <hr className={styles.divider} />
        id="h.rbcutjolc576" className={styles.h2}>12. After report timing fixes (multi-cycle paths)</h2>
        <p className={styles.paragraph}>(Kept same commands, but they are fixing long paths for timing)</p>
        <p className={styles.paragraph}>set_multicycle_path -from ci -to ADD1_q_reg[7]/D -setup 2</p>
        <p className={styles.paragraph}>set_multicycle_path -from ci -to ADD1_q_reg[7]/D -hold 1</p>
        <p className={styles.paragraph}>..</p>
        <p className={styles.paragraph}>(set of similar commands for other registers)</p>
        <p className={styles.paragraph}>(These tell Genus that some paths have more than one clock cycle.)</p>
        <hr className={styles.divider} />
        id="h.nlz0dhg9jtz3" className={styles.h2}>13. Run synthesis (Translate → Map → Optimize)</h2>
        <p className={styles.paragraph}>syn_generic</p>
        <p className={styles.paragraph}>syn_map</p>
        <p className={styles.paragraph}>syn_opt</p>
        <p className={styles.paragraph}>This converts RTL to gates and optimizes the logic.</p>
        <hr className={styles.divider} />
        id="h.22t1grju4xyc" className={styles.h2}>14. Generate reports</h2>
        <p className={styles.paragraph}>gui_show</p>
        <p className={styles.paragraph}>report_summary</p>
        <p className={styles.paragraph}>{`report_area > reports/area_report.txt`}</p>
        <p className={styles.paragraph}>{`report_gates > reports/gates_report.txt`}</p>
        <p className={styles.paragraph}>{`report_timing -max_paths 100 > reports/timing_report.txt`}</p>
        <p className={styles.paragraph}>Creates area, gate count, and timing reports.</p>
        <hr className={styles.divider} />
        id="h.f5ki3b13am0m" className={styles.h2}>15. Write final output files</h2>
        <p className={styles.paragraph}>{`write_hdl > outputs/netlist_ALU.v`}</p>
        <p className={styles.paragraph}>{`write_script > outputs/script_ALU.g`}</p>
        <p className={styles.paragraph}>{`write_sdc > outputs/script_ALU.sdc`}</p>
        <AdUnit slotId="slot_module6content" />
      </div>
    </div>
  );
};

export default Module6Content;
