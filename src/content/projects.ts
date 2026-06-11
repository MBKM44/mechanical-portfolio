export type ProjectVariant = {
  id: string;
  label: string;
  title: string;
  summary: string;
  modelFile: string;
  cameraOrbit: string;
  viewerAlt: string;
  metrics: string[];
};

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
  variants?: ProjectVariant[];
};

export const projects: Project[] = [
  {
    id: "awh-v1",
    title: "Atmospheric Water Harvesting Prototype V1",
    shortTitle: "Atmospheric Water Harvesting V1",
    phase: "First-generation thermal prototype",
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
      "Established the baseline package, recorded testing up to 13.67 L/day with VCR plus TEC, and revealed improvement areas in airflow clarity, service access, wiring robustness, and sensor logging.",
    viewerAlt: "3D model of atmospheric water harvesting prototype V1",
    metrics: [
      "Initial low-scale prototype",
      "13.67 L/day with VCR plus TEC",
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
      "Improved atmospheric water harvesting system developed in modular and compact configurations for stronger airflow control, service access, test stability, and yield evaluation.",
    role:
      "Advanced the design toward higher-capacity operation, supported troubleshooting, reviewed compact packaging options, and prepared clear technical documentation for the improved system family.",
    problem:
      "The system needed to generate useful water in difficult UAE conditions while remaining testable, serviceable, and clear enough for repeated experimental evaluation.",
    result:
      "Developed an improved V2 design family with a modular package for research components and a compact package for smaller-footprint deployment, ready for further build, testing, and refinement.",
    viewerAlt: "3D model of atmospheric water harvesting system V2",
    metrics: [
      "Modular and compact configurations",
      "Improved packaging and service access",
      "Prepared for future validation testing"
    ],
    contributions: [
      "Upscaled enclosure and airflow concept development",
      "Compact package review using the same core system concept",
      "Sensor-driven performance analysis and data logging",
      "Technical reports, posters, proposals, and project documentation"
    ],
    tools: ["Autodesk Inventor", "ANSYS Fluent", "Fusion 360", "Arduino", "Temperature/RH sensors"],
    variants: [
      {
        id: "awh-v2-modular",
        label: "Modular",
        title: "Modular Configuration",
        summary:
          "Longer research-focused package with additional internal space for sorbent beds, evaporator pads, alternate airflow paths, sensors, and future experimental modules.",
        modelFile: "models/new-awh-system.glb",
        cameraOrbit: "-35deg 64deg 230%",
        viewerAlt: "3D model of the modular atmospheric water harvesting system V2 configuration",
        metrics: ["More internal module space", "Research-friendly service access", "Flexible test configuration"]
      },
      {
        id: "awh-v2-compact",
        label: "Compact",
        title: "Compact Configuration",
        summary:
          "Small-footprint version using the same core atmospheric water harvesting concept with tighter component packaging for improved space efficiency and easier deployment.",
        modelFile: "models/compact-awh-system.glb",
        cameraOrbit: "-30deg 64deg 230%",
        viewerAlt: "3D model of the compact atmospheric water harvesting system V2 configuration",
        metrics: ["Smaller footprint", "Same core system concept", "Deployment-oriented packaging"]
      }
    ]
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
  },
  {
    id: "robotic-arm-assembly",
    title: "5-DOF Robotic Arm Assembly",
    shortTitle: "Robotic Arm Assembly",
    phase: "Kinematics course assembly",
    year: "Educational mechanism project",
    modelFile: "models/robotic-arm-assembly.glb",
    cameraOrbit: "32deg 68deg 235%",
    summary:
      "Educational robotic arm assembly focused on joint arrangement, link motion, workspace understanding, and end-effector positioning concepts.",
    role:
      "Supported the assembly and configuration, reviewed the joint layout and motion sequence, and connected the mechanical structure to degrees of freedom and link-joint behavior.",
    problem:
      "Robotic arms require coordinated joint motion to position an end effector accurately. The project focused on how multiple revolute joints combine to create useful motion and workspace coverage.",
    result:
      "Completed a kinematics-focused assembly/model suitable for demonstrating robotic arm joint sequencing, mechanism behavior, and mechanical motion principles.",
    viewerAlt: "3D model of an educational robotic arm assembly",
    metrics: ["Approximately 5-DOF excluding gripper", "Link-joint motion study", "Kinematics-focused assembly"],
    contributions: [
      "Assembly and joint layout review",
      "Motion sequence and workspace interpretation",
      "CAD/model review for mechanism behavior"
    ],
    tools: ["Robotic arm assembly", "Kinematics", "Degrees of freedom", "Link-joint motion", "CAD/model review"]
  }
];

export const skills = [
  {
    group: "CAD and Simulation",
    items: ["Autodesk Inventor", "Fusion 360", "AutoCAD", "ANSYS", "CFD/Fluent", "FluidSIM", "COMSOL", "ADAMS"]
  },
  {
    group: "Mechanical Design",
    items: [
      "Thermal systems",
      "Airflow packaging",
      "Suspension layout",
      "Robotic arm assembly",
      "Pneumatics",
      "Vehicle dynamics basics",
      "Machine design"
    ]
  },
  {
    group: "Prototype and Testing",
    items: ["3D printing", "CNC/conventional machining", "Sensor logging", "Troubleshooting", "Experimental data analysis"]
  },
  {
    group: "Controls and Communication",
    items: ["Arduino", "IMU sensors", "MATLAB/Simulink", "Relay logic", "Kinematics", "Technical documentation", "Arabic and English"]
  }
];
