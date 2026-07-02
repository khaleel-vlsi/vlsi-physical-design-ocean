import React, { useState, useEffect } from 'react';
import styles from './Module12Content.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Module12Content = () => {
    const [activeHeading, setActiveHeading] = useState('');
    const { profile } = useAuth() || {};
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const headings = Array.from(document.querySelectorAll('h1[id], h2[id]'));
            const scrollPosition = window.scrollY + 100;

            for (let i = headings.length - 1; i >= 0; i--) {
                if (headings[i].offsetTop <= scrollPosition) {
                    setActiveHeading(headings[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveHeading(id);
        }
    };
    
    // Disable right click and copy for protection
    const preventCopy = (e) => {
        e.preventDefault();
        return false;
    };

    return (
        <div className={styles.moduleLayout} onCopy={preventCopy} onContextMenu={preventCopy}>
            {/* Sidebar Navigation */}
            <nav className={styles.sidebar}>
                <h3 className={styles.sidebarTitle}>Topics</h3>
                <ul className={styles.topicList}>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '1-inputs-to-pd-flow' ? styles.active : ''}`}
                        onClick={() => scrollToSection('1-inputs-to-pd-flow')}
                    >
                        1: Inputs to PD Flow
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '1-1-gate-level-netlist' ? styles.active : ''}`}
                        onClick={() => scrollToSection('1-1-gate-level-netlist')}
                    >
                        1.1: Gate Level Netlist
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '2-synopsys-design-constraints-sdc' ? styles.active : ''}`}
                        onClick={() => scrollToSection('2-synopsys-design-constraints-sdc')}
                    >
                        2: Synopsys Design Constraints (SDC)
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '3-logical-libraries' ? styles.active : ''}`}
                        onClick={() => scrollToSection('3-logical-libraries')}
                    >
                        3: Logical Libraries
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '5-technology-file' ? styles.active : ''}`}
                        onClick={() => scrollToSection('5-technology-file')}
                    >
                        5. Technology File
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '6-rc-coefficient-file' ? styles.active : ''}`}
                        onClick={() => scrollToSection('6-rc-coefficient-file')}
                    >
                        6. RC Coefficient File
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '7-mmmc-view-file' ? styles.active : ''}`}
                        onClick={() => scrollToSection('7-mmmc-view-file')}
                    >
                        7. MMMC View File
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '11-power-intent-files-upf-cpf' ? styles.active : ''}`}
                        onClick={() => scrollToSection('11-power-intent-files-upf-cpf')}
                    >
                        11. Power Intent Files (UPF | CPF)
                    </li>
                    <li 
                        className={`${styles.topicItem} ${activeHeading === '12-switching-activity-files-vcd-saif' ? styles.active : ''}`}
                        onClick={() => scrollToSection('12-switching-activity-files-vcd-saif')}
                    >
                        12. Switching Activity Files (VCD | SAIF)
                    </li>
                </ul>
            </nav>

            {/* Main Content Area */}
            <main className={styles.mainContent}>
                <div className={styles.contentCard}>
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image8.png" alt="Module 12 Graphic 1" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <h1 id="1-inputs-to-pd-flow" className={styles.sectionHeadingLevel1}>
                        1: Inputs to PD Flow
                    </h1>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >Inputs required for physical design can be categorized broadly into two types. Some inputs are mandatory&nbsp;in all cases, while others are required for specific purposes. Figure 1 shows the list of inputs required for physical design and categorizes the mandatory and optional inputs.</p><p ></p><hr><p ></p>` }} />
                    <h2 id="1-1-gate-level-netlist" className={styles.sectionHeadingLevel2}>
                        1.1: Gate Level Netlist
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >This is the synthesized netlist. The synthesis team performs synthesis on RTL code with the standard cell libraries and constraints and converts the RTL code into the gate-level netlist&nbsp;based on available standard cells. This file contains all the instances of design and their connections.</p><ul ><li >a)&nbsp;Textual description of circuit components (like logic gates, combinational circuits, sequential circuits), so the netlist is a collection of gates.<br /></li><li >b)&nbsp;It can also be a collection of resistors, capacitors, or transistors.<br /></li></ul><p >Example:</p><p >module and_gate(y, a, b);</p><p >&nbsp; input a, b;</p><p >&nbsp; output y;</p><p >&nbsp; AND2 U1(.Y(y), .A(a), .B(b));</p><p >endmodule</p>` }} />
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image2.png" alt="Module 12 Graphic 2" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <h2 id="2-synopsys-design-constraints-sdc" className={styles.sectionHeadingLevel2}>
                        2: Synopsys Design Constraints (SDC)
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >Overview:<br />&nbsp;SDC is a standard format used to specify design constraints for timing, power, and area. Almost all synthesis, place-and-route (PnR), and other EDA tools support SDC. The file extension is .sdc.</p><ul ><li >SDC syntax follows TCL&nbsp;conventions.<br /></li><li >Comments start with #.<br /></li><li >Lines can be broken with ".<br /></li><li >SDC files can be generated by synthesis tools&nbsp;and reused for PnR.</li></ul><p ></p><p ><br /></p><hr><p ></p>` }} />
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image5.png" alt="Module 12 Graphic 3" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image10.png" alt="Module 12 Graphic 4" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image3.png" alt="Module 12 Graphic 5" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image11.png" alt="Module 12 Graphic 6" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image7.png" alt="Module 12 Graphic 7" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <h3 id="2-1-sdc-components" className={styles.sectionHeadingLevel3}>
                        2.1 SDC Components
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p ></p><h4  id="h.4331c1xa2szt">2.1.1: SDC Version</h4><p >Specifies the version of the SDC file.<br /> Example:</p><p >set sdc_version 2.1</p><p ></p><hr><p ></p><h4  id="h.terdb0oe0wie">2.1.2: Units</h4><p >Specifies units for time, resistance, capacitance, voltage, current, and power. Multiple units can be set in a single command.</p><p >Example:</p><p >set_units -time ns -resistance Kohm -capacitance pF -voltage V -current mA</p><p ></p><hr><p ></p><h4  id="h.jolaksajw2t">2.1.3: Set Driving Cells</h4><p >Specifies the driving cell characteristics for input or inout ports. It maps library pins to input ports to model delays accurately.</p><p >Example:</p><p >set_driving_cell -lib_cell IV {11}</p><p >set_driving_cell -lib_cell AND2 -pin Z -from_pin B {12}</p><p ></p><hr><p ></p><h4  id="h.pjpybuj90hmd">2.1.4: Set Load</h4><p >Sets the capacitive load on specified ports or nets. The unit is based on the capacitance unit defined earlier.</p><p >Example:</p><p ></p><p >set_load -pin_load 0.001 [get_ports {port[10]}]</p><p ></p><hr><p ></p><h4  id="h.gqcbqvfhstcr">2.1.5: Design Rule Constraints</h4><p >Includes maximum fanout, maximum capacitance, and maximum transition time.</p><p >Maximum Fanout:</p><p >set_max_fanout 5 [get_ports {port[10]}]</p><p ></p><p >Maximum Transition Time:</p><p >set_max_transition 2.5 [get_ports IN]</p><p ></p><hr><p ></p><h4  id="h.2enmt7uag7fm">2.1.6: Timing Constraints</h4><p >Used to define clocks, clock groups, latencies, uncertainties, and input/output delays.</p><p >1. Create Clock</p><p ></p><p >create_clock -name CLK -period 30 -waveform {12.0 27.0} [get_ports u13/z]</p><p ></p><p >2. Create Generated Clock<br />&nbsp;Derived from a master clock, can be multiplied, divided, or inverted.</p><p ></p><p >create_generated_clock -multiplied_by 3 -source CLK [get_pins div3/Q]</p><p ></p><p >3. Group Path<br />&nbsp;Specifies a set of paths to optimize even if other paths have violations.</p><p >group_path -name "GROUP1" -weight 2.0 -from [get_ports ABC/in3] -to [get_ports FF1/D]</p><p ></p><p >4. Clock Uncertainty<br />&nbsp;Accounts for variations in the clock network.</p><p ></p><p >set_clock_uncertainty -setup 0.5 [get_clocks clk1]</p><p >set_clock_uncertainty -hold 0.2 [get_clocks clk1]</p><p ></p><p >5. Clock Latency<br />&nbsp;Delay for clock signal from source to sequential element pin.</p><p >set_clock_latency 2.35 [get_pins ABC/XYZ/CP]</p><p ></p><p >6. Input Delay<br />&nbsp;Delay of input ports with respect to the clock edge.</p><p >set_input_delay -max 1.35 -clock clk1 {ain bin}</p><p ></p><p >7. Output Delay<br />&nbsp;Delay of output ports with respect to the clock edge.</p><p >set_output_delay 1.7 -clock [get_clocks CLK1] [all_outputs]</p><p ></p><hr><p ></p><h4  id="h.m5icfdamwe8e">2.1.7: Timing Exceptions</h4><p >Defines exceptions like false paths, multicycle paths, maximum/minimum delays.</p><hr><p ></p>` }} />
                    <h2 id="3-logical-libraries" className={styles.sectionHeadingLevel2}>
                        3: Logical Libraries
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >Logical libraries are also called timing libraries, functional libraries, or power libraries. They provide functionality, timing, and power data&nbsp;for standard cells and macros.</p><p >Contains:</p><ul ><li >Timing details: delay, transitions<br /></li><li >Setup and hold times<br /></li><li >Functionality of cells/macros<br /></li><li >Area of cells/macros<br /></li><li >Pin directions and capacitance<br /></li><li >Leakage power<br /></li></ul><p >File Formats:</p><ul ><li >.lib&nbsp;(Cadence)<br /></li><li >.db&nbsp;(Synopsys)<br /></li></ul><p >Notes:</p><ul ><li >Libraries vary for different PVT corners.<br /></li><li >Provided by the standard cell vendor&nbsp;after characterization.<br /></li></ul><p ></p>` }} />
                    <h3 id="introduction" className={styles.sectionHeadingLevel3}>
                        Introduction
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >The physical library&nbsp;contains the abstract view of the layout&nbsp;for standard cells and macros. These abstract views are essential for placement, routing, and physical verification&nbsp;during ASIC Physical Design.</p><hr><p ></p>` }} />
                    <h3 id="what-does-a-lef-file-contain" className={styles.sectionHeadingLevel3}>
                        What does a LEF file contain?
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >A LEF (Library Exchange Format)&nbsp;file basically contains the following information:</p><ul ><li >Size of the cell&nbsp;(Height and Width)</li><li >Symmetry of the cell</li><li >Pin information, including:</li></ul><ul ><li >Pin name</li><li >Direction</li><li >Use</li><li >Shape</li><li >Layer</li></ul><ul ><li >Pin locations</li></ul><hr><p ></p>` }} />
                    <h3 id="lef-formats-used-by-eda-tools" className={styles.sectionHeadingLevel3}>
                        LEF formats used by EDA tools
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >Physical libraries are provided in different formats depending on the tool:</p><ul ><li >Cadence tools: .lef&nbsp;format</li><li >Synopsys tools: .CELL&nbsp;and FRAM&nbsp;formats</li></ul><p >&nbsp;These files are provided by the standard cell library vendor.</p><hr><p ></p>` }} />
                    <h3 id="lef-file-usage" className={styles.sectionHeadingLevel3}>
                        LEF file usage
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >LEF file is used in ASIC Design</li><li >LEF stands for Library Exchange Format</li><li >LEF files are written in ASCII format, so they are human-readable</li></ul><p >A LEF file describing the library has two main parts:</p><ol  start="1"><li >Technology LEF</li><li >Cell LEF</li></ol><hr><p ></p>` }} />
                    <h3 id="definition" className={styles.sectionHeadingLevel3}>
                        Definition
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >The Technology LEF&nbsp;part contains information related to:</p><ul ><li >Metal interconnect layers</li><li >Via layers</li><li >Design rules</li></ul><p >&nbsp;The Cell LEF&nbsp;part (covered separately) contains geometry information of each standard cell.</p><hr><p ></p>` }} />
                    <h3 id="sample-technology-lef-snapshot" className={styles.sectionHeadingLevel3}>
                        Sample Technology LEF Snapshot
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >(For understanding structure only)</p><p >VERSION 5.5 ;</p><p >NAMESCASESENSITIVE ON:</p><p >BUSBITCHARS "[]";</p><p >DIVIDERCHAR "/":</p><p >PROPERTYDEFINITIONS</p><p >LAYER contactResistance REAL</p><p >END PROPERTYDEFINITIONS</p><p >UNITS</p><p >DATABASE MICRONS 2000</p><p >END UNITS</p><p >MANUFACTURINGGRID 0.0025:</p><p >[UNITS</p><p >[TIME NANOSECONDS convertFactor:</p><p >[CAPACITANCE PICOFARADS convertFactor :]</p><p >[RESISTANCE ONMS convertFactor :]</p><p >[PONER MILLIWATTS convertFactor I]</p><p >[CURRENT MILLIAMPS convertFactor 1]</p><p >(VOLTAGE VOLTS convertFactor :1</p><p >[DATABASE MICRONS LEFconvertFactor ]</p><p >(FREQUENCY MEGAHERTZ convertFactor</p><p >END UNITS!</p><p ></p><hr><p ></p>` }} />
                    <h3 id="information-present-in-technology-lef" className={styles.sectionHeadingLevel3}>
                        Information present in Technology LEF
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >The Technology LEF&nbsp;part contains the following key information:</p><ul ><li >LEF Version&nbsp;(e.g., 5.7, 5.8)</li><li >Units, such as:</li></ul><ul ><li >Database units</li><li >Time</li><li >Resistance</li><li >Capacitance</li></ul><ul ><li >Manufacturing grid</li><li >Design rules and BEOL (Back End Of Layers) details</li></ul><h4  id="h.nbl2peahyyt0">Layer-related details include:</h4><ul ><li >Layer name&nbsp;(poly, contact, via1, metal1, etc.)</li><li >Layer type&nbsp;(routing, masterslice, cut, etc.)</li><li >Preferred routing direction&nbsp;(horizontal or vertical)</li><li >Pitch</li><li >Minimum width</li><li >Spacing</li><li >Sheet resistance</li></ul><hr><p ></p>` }} />
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image4.png" alt="Module 12 Graphic 8" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <h3 id="sample-lef-layer-section-snapshot" className={styles.sectionHeadingLevel3}>
                        Sample LEF Layer Section Snapshot
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >The following example shows layer definitions and metal interconnect dimensions:</p><p >LAYER poly</p><p >TYPE MASTERSLICЕ ;</p><p >END poly</p><p ></p><p >LAYER contact</p><p >TYPE CUT:</p><p >SPACING 0.075:</p><p >PROPERTY contactResistance 10.5:</p><p >END contact</p><p ></p><p >LAYER metall</p><p >TYPE ROUTING:</p><p >DIRECTION HORIZONTAL;</p><p >PITCH 0.19;</p><p >WIDTH 0.065 ;</p><p >SPACING 0.065</p><p >RESISTANCE RPERSQ 0.38</p><p >END metall</p><p ></p><p >LAYER Vvial</p><p >TYPE CUT:</p><p >SPACING 0.075:</p><p >PROPERTY contactResistance 5.69</p><p >END vial</p><p ></p><p ></p><p ></p><hr><p ></p>` }} />
                    <h3 id="key-takeaway-for-students" className={styles.sectionHeadingLevel3}>
                        Key Takeaway for Students 📝
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Technology LEF&nbsp;defines the manufacturing and routing rules</li><li >It is mandatory before placement and routing</li><li >Tools rely on Technology LEF to ensure DRC-clean layouts</li><li >Any mistake in Technology LEF can lead to routing failures or signoff issues</li></ul><hr><p ></p>` }} />
                    <h3 id="cell-lef-overview" className={styles.sectionHeadingLevel3}>
                        Cell LEF Overview
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >The Cell LEF&nbsp;contains information related to each standard cell, defined in separate sections.</p>` }} />
                    <h3 id="sample-cell-lef-snapshot" className={styles.sectionHeadingLevel3}>
                        Sample Cell LEF Snapshot
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >MACRO AND2X2</p><p >CLASS CORE ;</p><p >ORIGIN 0 0 ;</p><p >FOREIGN AND2X2 0 0 ;</p><p >SIZE 0.95 BY 2.47 ;</p><p >SYMMETRY X Y ;</p><p >SITE CoreSite ;</p><p ></p><p >PIN A</p><p >DIRECTION INPUT ;</p><p >USE SIGNAL ;</p><p >PORT</p><p >LAYER metal1 ;</p><p >RECT 0.1475 0.8475 0.2225 0.9825 ;</p><p >END</p><p >END A</p><p >Figure 10</p>` }} />
                    <h3 id="information-present-in-cell-lef" className={styles.sectionHeadingLevel3}>
                        Information Present in Cell LEF
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >Cell LEF basically contains:</p><ul ><li >Cell name (e.g., AND2X2, CLKBUF1)</li><li >Class (CORE or PAD)</li><li >Origin (0,0)</li><li >Size (Width × Height)</li><li >Symmetry (X, Y, XY)</li><li >Pin information</li></ul>` }} />
                    <h3 id="pin-level-information" className={styles.sectionHeadingLevel3}>
                        Pin-Level Information
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >Each pin definition includes:</p><ul ><li >Pin name (A, B, Y, etc.)</li><li >Direction (INPUT, OUTPUT, INOUT)</li><li >Use (SIGNAL, CLOCK, POWER)</li><li >Shape (Abutment – mainly for power pins)</li><li >Metal layer (Metal1, Metal2, etc.)</li><li >Pin geometry (llx, lly, urx, ury)</li></ul>` }} />
                    <h3 id="sample-pin-definitions" className={styles.sectionHeadingLevel3}>
                        Sample Pin Definitions
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >PIN B</p><p >DIRECTION INPUT ;</p><p >USE SIGNAL ;</p><p >PORT</p><p >LAYER metal1 ;</p><p >RECT 0.4175 0.9175 0.6025 1.0525 ;</p><p >END</p><p >END B</p><p ></p><p >PIN Y</p><p >DIRECTION OUTPUT ;</p><p >USE SIGNAL ;</p><p >PORT</p><p >LAYER metal1 ;</p><p >RECT 0.7275 0.1725 0.7925 2.235 ;</p><p >RECT 0.7275 1.1075 0.8025 2.235 ;</p><p >END</p><p >END Y</p><p >Figure 11</p>` }} />
                    <h3 id="why-cell-lef-is-important" className={styles.sectionHeadingLevel3}>
                        Why Cell LEF is Important?
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Used by the router&nbsp;during PnR</li><li >Helps tools identify exact pin locations</li><li >Represents the abstract layout&nbsp;of a standard cell</li></ul><hr><p ></p>` }} />
                    <h2 id="5-technology-file" className={styles.sectionHeadingLevel2}>
                        5. Technology File
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >The technology library&nbsp;is one of the most critical inputs&nbsp;to a Physical Design tool.</p>` }} />
                    <h3 id="contains-information-about" className={styles.sectionHeadingLevel3}>
                        Contains Information About:
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Manufacturing grid</li><li >Layer names (poly, contact, metal1, via2, etc.)</li><li >Metal types and preferred directions</li><li >Pitch</li><li >Width</li><li >Spacing</li><li >Resistance per square</li></ul>` }} />
                    <h3 id="tool-specific-formats" className={styles.sectionHeadingLevel3}>
                        Tool-Specific Formats
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Cadence&nbsp;→ .techlef</li><li >Synopsys&nbsp;→ .tf</li></ul><hr><p ></p>` }} />
                    <h2 id="6-rc-coefficient-file" className={styles.sectionHeadingLevel2}>
                        6. RC Coefficient File
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >TLU&nbsp;stands for Table Look-Up</li><li >Used for RC estimation and extraction</li><li >Also referred to as:</li></ul><ul ><li >QRC file</li><li >Cap table</li></ul><hr><p ></p>` }} />
                    <h2 id="7-mmmc-view-file" className={styles.sectionHeadingLevel2}>
                        7. MMMC View File
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >MMMC (Multi-Mode Multi-Corner)&nbsp;files are used to create different analysis views based on:</p><ul ><li >Constraint modes</li><li >Delay corners</li></ul>` }} />
                    <h3 id="delay-corners-are-defined-using" className={styles.sectionHeadingLevel3}>
                        Delay Corners Are Defined Using:
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Library sets</li><li >RC corners</li></ul><p >Examples of library sets:</p><ul ><li >SS (Slow-Slow)</li><li >FF (Fast-Fast)</li><li >Typical</li></ul><hr><p ></p>` }} />
                    <h3 id="8-block-partition" className={styles.sectionHeadingLevel3}>
                        8. Block Partition
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Required for block-level PnR</li><li >Defines block size and shape</li><li >Shapes can be:</li></ul><ul ><li >Rectangular</li><li >Rectilinear (complex)</li></ul>` }} />
                    <h3 id="9-pin-definition-file" className={styles.sectionHeadingLevel3}>
                        9. Pin Definition File
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Pin locations are decided by full-chip owner</li><li >Provided in DEF format</li><li >Ensures pin alignment across blocks</li><li >Block owner can request changes if required</li></ul>` }} />
                    <h3 id="10-power-plan-script" className={styles.sectionHeadingLevel3}>
                        10. Power Plan Script
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Power plan must match full-chip strategy</li><li >Usually provided as:</li></ul><ul ><li >Rules</li><li >TCL script (.tcl)</li></ul><hr><p ></p>` }} />
                    <h2 id="11-power-intent-files-upf-cpf" className={styles.sectionHeadingLevel2}>
                        11. Power Intent Files (UPF | CPF)
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<p >Power intent files describe:</p><ul ><li >Power rails for each block</li><li >Power ON/OFF behavior</li></ul>` }} />
                    <h3 id="formats" className={styles.sectionHeadingLevel3}>
                        Formats:
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >UPF (Unified Power Format)&nbsp;– used by most tools</li><li >CPF (Common Power Format)&nbsp;– used by Cadence</li></ul><p >Mandatory for multi-voltage domain designs</p><hr><p ></p>` }} />
                    <h2 id="12-switching-activity-files-vcd-saif" className={styles.sectionHeadingLevel2}>
                        12. Switching Activity Files (VCD | SAIF)
                    </h2>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >Used for Dynamic IR Drop analysis</li><li >Captures switching activity information</li></ul>` }} />
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image9.png" alt="Module 12 Graphic 9" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image6.png" alt="Module 12 Graphic 10" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <div className={styles.imageContainer}>
                        <img src="/assets/modules/module12/image1.png" alt="Module 12 Graphic 11" className={styles.nativeImg} loading="lazy" />
                    </div>
                    <h3 id="file-types" className={styles.sectionHeadingLevel3}>
                        File Types:
                    </h3>
                    <div className={styles.sectionBody} dangerouslySetInnerHTML={{ __html: `<ul ><li >VCD&nbsp;– Value Change Dump</li><li >SAIF&nbsp;– Switching Activity Interchange Format</li></ul><p >Dynamic IR analysis helps identify power drops&nbsp;caused by real switching behavior inside the chip.</p><p ></p><p ></p><p >Sanity checks:</p><p >To ensure that the input received from the library team and synthesis team is correct or not. If we</p><p >are not doing these checks then it creates problems in later stages of design.</p><p >Basically, we are checking following input files: and make sure that these files are complete and</p><p >not erroneous.</p><p >1. design/netlist checks</p><p >2. SDC checks</p><p >3. Library checks</p><p ></p><p ></p><p >Design checks:</p><p >Check if current design is consistent or not</p><p >It checks the quality of netlist and identifies:</p><p >1. Floating pins</p><p >2. Multidriven nets</p><p >3. Undriven input ports</p><p >4. Unloaded outputs</p><p >5. Unconstrained pins</p><p >6. Pin mismatch counts between an instance and its reference</p><p >7. Tristate buses with non-tristate drivers</p><p >8. Wire loops across hierarchies</p><p >ICC command: check_design:</p><p >Checks for multi driven nets, floating nets/pins, empty modules.</p><p >Pins mismatch, cells or instances without I/O pins/ports etc.</p><p ></p><p >SDC Checks:</p><p >1. If any unconstrained paths exist in the design then PNR tool will not optimize that path, so</p><p >these checks are used to report unconstrained paths</p><p >2. Checks whether the clock is reaching to all the clock pin of the flip-flop.</p><p >3. Check if multiple clock are driving same registers</p><p >4. Check unconstrained endpoints</p><p >5. Port missing input/output delay.</p><p >6. Port missing slew/load constraints</p><p >ICC command: check_timing</p><p >Library checks:</p><p >It validate the library i.e. it checks the consistency between logical and physical libraries.</p><p >It checks the qualities of both libraries.</p><p >check_library: This command shows the name of the library, library type &amp; its version, units of</p><p >time, capacitance, leakage power, and current. It shows the number of cells missing, the number</p><p >of metal or pins missing in the physical and logical library.</p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p >INPUTS LOADING SCRIPT</p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p><p ></p>` }} />
                </div>
            </main>
        </div>
    );
};

export default Module12Content;
