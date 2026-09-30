# 🚀 Cloud-Based Physical Design (PnR) Lab — Master Technical Specification & Future Roadmap

> **Author**: VLSI Physical Design Ocean Engineering Team  
> **Status**: Specification & Implementation Reference  
> **Target Module**: `/cloud-lab` (Independent Application & Microservice)

---

## 1. Executive Summary & Architecture Vision

The **Cloud-Based Physical Design (PnR) Lab** is an interactive, browser-based ASIC placement, routing, synthesis, and static timing signoff environment. 

### Key Architectural Principles:
1. **Independent Module Development**: Built with its own frontend route (`/cloud-lab`), REST API backend engine (`pnr-lab-service/server.js`), WebSocket execution streamer, and EDA container runner wrappers.
2. **Future Integration Strategy**: API-driven modular architecture allowing seamless embedding into the main VLSI Physical Design Ocean platform.
3. **Single Sign-On (SSO)**: Shares Supabase / JWT authentication context so users do not need to create secondary accounts.

---

## 2. Sequential PnR Flow Execution & Protection System

The lab enforces strict industrial physical design stage ordering:

```
[1. Floorplanning] ➔ [2. Placement] ➔ [3. Clock Tree Synthesis] ➔ [4. Detailed Routing] ➔ [5. STA Signoff]
```

### Protection Guards:
- **Prerequisite Stage Guard**: Warns users if they attempt to skip ahead (e.g. running *Routing* before *Placement*).
- **Force Re-run Confirmation**: Completed stages receive a `✅ DONE` badge. Auto-execution is blocked to protect design state unless explicitly forced by the user.

---

## 3. Interactive Workspace & Custom File Uploader

1. **Workspace File Tree**:
   - `run_pnr_flow.tcl`: Execution script.
   - `riscv_top.v`: RTL / Netlist file.
   - `constraints.sdc`: Timing constraints file.
   - `sky130_hd.lef`: Technology LEF physical rules.
2. **Instant File Preview**: Clicking any file in the sidebar tree loads and displays its text content directly in the Editor.
3. **`📤 Upload File` Button**: Allows users to upload custom `.v`, `.sdc`, `.tcl`, `.lef`, or `.def` files from their computer for execution.

---

## 4. Universal EDA TCL Command Suite

The live execution CLI terminal (`openroad 1>`) supports **100+ industrial and open-source EDA commands**:

### Category 1: RTL Import & Setup
- `read_verilog`, `read_vhdl`, `read_sdc`, `read_liberty`, `read_lef`, `read_def`, `read_db`, `read_parasitics`, `read_saif`
- `link`, `current_design`, `check_design`

### Category 2: Design Setup & Operating Conditions
- `set_link_library`, `set_target_library`, `set_operating_conditions`, `set_wire_load_model`, `set_units`
- `set_driving_cell`, `set_load`, `set_max_transition`, `set_max_capacitance`, `set_max_fanout`, `set_fix_multiple_port_nets`

### Category 3: Synthesis & RTL Optimization
- `analyze`, `elaborate`, `uniquify`, `compile`, `compile_ultra`, `optimize`, `ungroup`, `change_names`

### Category 4: SDC Timing Constraints
- `create_clock`, `create_generated_clock`, `set_clock_latency`, `set_clock_uncertainty`, `set_clock_transition`, `set_clock_groups`
- `set_input_delay`, `set_output_delay`, `set_false_path`, `set_multicycle_path`, `set_case_analysis`, `set_disable_timing`

### Category 5: Industrial Reports
- `check_timing`, `report_timing`, `report_constraints`, `report_clock`, `report_area`, `report_power`, `report_qor`, `report_reference`, `report_net`, `report_cell`

### Category 6: Physical Design (PnR)
- `initialize_floorplan`, `create_floorplan`, `create_pg_ring`, `create_pg_mesh`, `place_pins`
- `create_placement`, `global_placement`, `legalize_placement`, `place_opt`
- `create_clock_tree`, `clock_tree_synthesis`, `clock_opt`
- `route_global`, `route_detail`, `detailed_route`, `route_opt`, `verify_routes`, `verify_drc`, `verify_connectivity`, `extract_parasitics`

### Category 7: Static Timing Analysis (STA)
- `update_timing`, `report_analysis_coverage`, `report_delay_calculation`, `report_noise`, `report_si`

### Category 8: ECO (Engineering Change Order)
- `eco_route`, `eco_opt`, `insert_buffer`, `remove_buffer`, `change_cell`, `size_cell`, `swap_cell`, `incremental_route`, `incremental_timing`

### Category 9: Signoff & Database Querying
- `write_def`, `write_gds`, `write_sdc`, `write_verilog`, `write_spef`, `write_sdf`, `write_reports`
- `save_design`, `open_design`, `save_block`, `open_block`, `close_design`
- `get_cells`, `get_pins`, `get_nets`, `get_ports`, `get_clocks`, `all_registers`
- `all_fanin`, `all_fanout`, `all_connected`, `sizeof_collection`, `filter_collection`, `foreach_in_collection`

### Category 10: Debug, GUI & Shell Utilities
- `start_gui`, `open_gui`, `gui_start`, `gui_show`, `show_gui`, `win`, `change_selection`
- `highlight_path`, `highlight_net`, `gui_select`, `gui_zoom`, `gui_fit`
- `history`, `echo`, `sh gvim`, `source`, `exit`

---

## 5. Shell & CLI Productivity Features

1. **Nested TCL Bracket Evaluation (`[...]`)**:
   - Supports nested queries e.g. `sizeof_collection [get_pins [get_cells u_reg_pc]]` ➔ Returns object count `5`.
2. **Tab Key Auto-Completion**:
   - Pressing **`Tab`** on unique prefixes (`ini`) auto-completes to `initialize_floorplan`.
   - Pressing **`Tab`** on non-unique prefixes (`rep`) auto-fills common prefix `report_` and lists all matching completions.
3. **Up / Down Arrow Navigation**:
   - Cycle through command history with `↑` and `↓` keys.
4. **Interactive 2D Layout Visualizer**:
   - 4 Modes: **`📍 DEF Layout`**, **`🔴 Congestion Heatmap`**, **`⚡ Critical Timing Path`**, **`⚡ IR-Drop Power Map`**.

---

## 6. Future Enhancement Roadmap

- [ ] Connect container runner to OpenROAD / Yosys Docker container pool on cloud server.
- [ ] Implement live DEF file parsing and WebGL 3D GDSII layout renderer.
- [ ] Add GDSII stream file exporter and DRC error layer highlighter.
