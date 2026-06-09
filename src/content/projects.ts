export type Project = {
  id: string;
  title: string;
  shortTitle: string;
  phase: string;
  year: string;
  modelFile: string;
  cameraOrbit: string;
  summary: string;
  role: string;
  problem: string;
  result: string;
  viewerAlt: string;
  metrics: string[];
  contributions: string[];
  tools: string[];
};

export const projects: Project[] = [
  {
    id: "awh-v1",
    title: "Atmospheric Water Harvesting Prototype V1",
    shortTitle: "Atmospheric Water Harvesting V1",
    phase: "Proof-of-concept thermal prototype",
    year: "First design iteration",
    modelFile: "models/old-awh-system.glb",
    cameraOrbit: "35deg 68deg 210%",
    summary:
      "Early low-scale prototype for extracting water from humid air using cooling, sorbent-assisted capture, sensors, and test-driven iteration.",
    role:
      "Reviewed the mechanical layout, supported testing, inspected airflow and wiring issues, and used logged temperature/RH data to guide design improvements.",
    problem:
      "Atmospheric water harvesting extracts water from air, but hot and arid conditions reduce condensation efficiency. V1 tested whether cooling, moisture capture, and sensing could work together in a compact prototype.",
    result:
      "Established the baseline package and revealed practical improvement areas: airflow path clarity, service access, wiring robustness, sensor logging, and higher-capacity packaging.",
    viewerAlt: "3D model of atmospheric water harvesting prototype V1",
    metrics: [
      "Low-scale proof-of-concept",
      "Cooling, sorbent, TEC, and sensor integration",
      "Baseline for V2 design decisions"
    ],
    contributions: [
      "Mechanical packaging and component layout review",
      "Airflow, wiring, and data-logging troubleshooting",
      "Prototype testing support and performance interpretation"
    ],
    tools: ["Autodesk Inventor", "Fusion 360", "Arduino Mega", "Processing IDE", "Excel logging"]
  },
  {
    id: "awh-v2",
    title: "Atmospheric Water Harvesting System V2",
    shortTitle: "Atmospheric Water Harvesting V2",
    phase: "Improved higher-scale system design",
    year: "Second design iteration",
    modelFile: "models/new-awh-system.glb",
    cameraOrbit: "-35deg 64deg 230%",
    summary:
      "Upscaled AWH system that improved the V1 concept for stronger airflow control, component access, experimental stability, and yield evaluation.",
    role:
      "Advanced the design toward higher-capacity operation, supported troubleshooting, analyzed yield and energy performance, and contributed to research documentation.",
    problem:
      "The system needed to generate useful water in difficult UAE conditions while remaining testable, serviceable, and clear enough for repeated experimental evaluation.",
    result:
      "Validated a working research prototype: up to 11.33 L/day in VCR-only mode at 0.94 kWh/L, and 13.67 L/day with VCR plus TEC. MOF-assisted operation improved dry-condition resilience.",
    viewerAlt: "3D model of atmospheric water harvesting system V2",
    metrics: [
      "11.33 L/day VCR-only result",
      "13.67 L/day with VCR plus TEC",
      "MOF-assisted dry-condition resilience"
    ],
    contributions: [
      "Upscaled enclosure and airflow concept development",
      "Sensor-driven performance analysis and data logging",
      "Technical reports, posters, proposals, and research documentation"
    ],
    tools: ["Autodesk Inventor", "ANSYS Fluent", "Fusion 360", "Arduino", "Temperature/RH sensors"]
  },
  {
    id: "exoskeleton",
    title: "6-DOF Exoskeleton",
    shortTitle: "6-DOF Exoskeleton",
    phase: "Rehabilitation mechatronics prototype",
    year: "Functional prototype",
    modelFile: "models/exoskeleton.glb",
    cameraOrbit: "20deg 72deg 240%",
    summary:
      "Lower-limb rehabilitation exoskeleton combining adjustable mechanical support, IMU sensing, actuation, AI gait classification, and GUI/AR demonstration workflows.",
    role:
      "Contributed to mechanical design, structural simulation, prototype assembly, IMU data collection, AI integration, circuit layout, testing, and troubleshooting.",
    problem:
      "Rehabilitation devices must support human motion safely without becoming too bulky, fixed, or difficult to adapt. This project focused on a lighter adjustable structure with sensor-driven control.",
    result:
      "Built and tested a functional prototype using carbon-fiber tubes, aluminum parts, and 3D-printed components. Simulations verified structural behavior across gait phases, with motor torque identified above 124.5 N.m.",
    viewerAlt: "3D model of a 6-DOF lower limb exoskeleton prototype",
    metrics: ["6-DOF lower-limb support", "IMU-based gait sensing", "Motor torque above 124.5 N.m"],
    contributions: [
      "Hip, knee, and ankle support link design",
      "Motor housings, couplings, shafts, and sensor placement",
      "MATLAB GUI, Edge Impulse, Arduino, and Unity AR integration support"
    ],
    tools: ["CAD", "ANSYS", "MATLAB/Simulink", "Arduino Nano 33 BLE Sense", "Edge Impulse", "Unity AR"]
  },
  {
    id: "suspension-design",
    title: "Suspension Design",
    shortTitle: "Suspension Design",
    phase: "Double-wishbone CAD assembly",
    year: "CAD portfolio project",
    modelFile: "models/suspension-design.glb",
    cameraOrbit: "35deg 68deg 250%",
    summary:
      "Front double-wishbone suspension corner CAD assembly showing wheel-location geometry, coilover packaging, chassis brackets, and component interaction.",
    role:
      "Designed and assembled the suspension corner, modeled the control arms and brackets, positioned the coilover, and integrated the upright/hub interface.",
    problem:
      "A front suspension corner must locate the wheel accurately, package the spring-damper unit, connect cleanly to the chassis, and communicate force-transfer paths in limited space.",
    result:
      "Produced a portfolio-ready CAD assembly that explains suspension hardpoints, wheel-location logic, packaging, and a clear foundation for future kinematic or structural analysis.",
    viewerAlt: "3D model of a front double-wishbone suspension corner CAD assembly",
    metrics: ["Double-wishbone architecture", "Control arms and upright/hub interface", "Direct coilover packaging"],
    contributions: [
      "Upper and lower control arm layout",
      "Chassis mounting brackets and joint locations",
      "Compact assembly layout for portfolio visualization"
    ],
    tools: ["Autodesk Inventor", "CAD assembly constraints", "3D part modeling", "Coil feature modeling", "Exploded-view preparation"]
  }
];

export const skills = [
  {
    group: "CAD and Simulation",
    items: ["Autodesk Inventor", "Fusion 360", "AutoCAD", "ANSYS", "CFD/Fluent", "COMSOL", "ADAMS"]
  },
  {
    group: "Mechanical Design",
    items: ["Thermal systems", "Airflow packaging", "Suspension layout", "Vehicle dynamics basics", "Machine design"]
  },
  {
    group: "Prototype and Testing",
    items: ["3D printing", "CNC/conventional machining", "Sensor logging", "Troubleshooting", "Experimental data analysis"]
  },
  {
    group: "Controls and Communication",
    items: ["Arduino", "IMU sensors", "MATLAB/Simulink", "Research writing", "Technical documentation", "Arabic and English"]
  }
];
