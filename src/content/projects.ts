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
    id: "old-awh",
    title: "OLD Atmospheric Water Harvesting System",
    shortTitle: "OLD AWH",
    phase: "Early low-scale prototype",
    year: "First generation",
    modelFile: "models/old-awh-system.glb",
    cameraOrbit: "35deg 68deg 210%",
    summary:
      "A first-generation atmospheric water harvesting prototype used to prove the core architecture at a smaller scale before the system was expanded.",
    role:
      "Optimized the mechanical layout, supported experimental testing, inspected component issues, and used sensor data to understand where the design needed to improve.",
    problem:
      "AWH systems lose effectiveness under hot, low-humidity UAE conditions. The early prototype had to validate whether refrigeration, sorption, TEC boost cooling, and environmental monitoring could work together as a practical decentralized water system.",
    result:
      "The prototype established the baseline configuration and exposed the next engineering priorities: cleaner airflow paths, better serviceability, more robust wiring, stronger data logging, and a higher-capacity package.",
    viewerAlt: "3D model of the first-generation atmospheric water harvesting prototype",
    metrics: [
      "Baseline low-scale AWH package",
      "Hybrid VCR, TEC, MOF, and sensor-monitoring concept",
      "Used as the design reference for the upscaled version"
    ],
    contributions: [
      "Mechanical packaging and component layout review",
      "Airflow, wiring, and logging issue investigation",
      "Prototype testing support and performance interpretation"
    ],
    tools: [
      "Autodesk Inventor",
      "Fusion 360",
      "Arduino Mega",
      "Processing IDE",
      "Excel logging"
    ]
  },
  {
    id: "new-awh",
    title: "NEW Atmospheric Water Harvesting System",
    shortTitle: "NEW AWH",
    phase: "Improved upscaled design",
    year: "Current generation",
    modelFile: "models/new-awh-system.glb",
    cameraOrbit: "-35deg 64deg 230%",
    summary:
      "An improved and upscaled AWH design that builds from the early prototype into a cleaner, larger, and more research-ready mechanical system.",
    role:
      "Advanced the design toward higher-capacity operation, supported troubleshooting, analyzed yield and energy performance, and contributed to technical reporting and research documentation.",
    problem:
      "The next version needed to preserve the hybrid AWH concept while improving scale, airflow distribution, component access, dry-condition resilience, and experimental stability.",
    result:
      "The AWH research program validated a working prototype with up to 11.33 L/day in VCR-only mode at 0.94 kWh/L and 13.67 L/day with VCR plus TEC. MOF-assisted operation improved dry-condition resilience and measurable yield behavior.",
    viewerAlt: "3D model of the improved and upscaled atmospheric water harvesting design",
    metrics: [
      "11.33 L/day VCR-only test result",
      "13.67 L/day with VCR plus TEC",
      "MOF-assisted dry-condition resilience"
    ],
    contributions: [
      "Upscaled enclosure and airflow concept development",
      "Sensor-driven performance analysis and data logging",
      "Research documentation, posters, reports, and proposal material"
    ],
    tools: [
      "Autodesk Inventor",
      "ANSYS Fluent",
      "Fusion 360",
      "Arduino",
      "Temperature/RH sensors"
    ]
  },
  {
    id: "exoskeleton",
    title: "6-DOF Exoskeleton",
    shortTitle: "Exoskeleton",
    phase: "Mechanical and mechatronics rehabilitation project",
    year: "Prototype project",
    modelFile: "models/exoskeleton.glb",
    cameraOrbit: "20deg 72deg 240%",
    summary:
      "A 6-DOF lower limb rehabilitation exoskeleton combining adjustable mechanical support, IMU sensing, motor actuation, AI gait classification, and GUI/AR demonstration workflows.",
    role:
      "Contributed to mechanical design, simulation, prototype assembly, IMU data collection, AI integration, circuit layout, testing, and troubleshooting.",
    problem:
      "Many rehabilitation exoskeletons are bulky, expensive, fixed-pattern, and weakly adaptive to users. The project focused on a lighter, adjustable, sensor-driven structure for safer gait rehabilitation.",
    result:
      "A functional prototype was built and tested using carbon-fiber tubes, aluminum parts, and 3D-printed components. Simulations verified structural behavior across gait phases, and required motor torque was identified above 124.5 N.m.",
    viewerAlt: "3D model of a 6-DOF lower limb exoskeleton prototype",
    metrics: [
      "6-DOF lower limb support",
      "IMU-based gait sensing",
      "Motor torque requirement above 124.5 N.m"
    ],
    contributions: [
      "Hip, knee, and ankle support link design",
      "Motor housings, couplings, shafts, and sensor placement",
      "MATLAB GUI, Edge Impulse, Arduino, and Unity AR integration support"
    ],
    tools: [
      "CAD",
      "ANSYS",
      "MATLAB/Simulink",
      "Arduino Nano 33 BLE Sense",
      "Edge Impulse",
      "Unity AR"
    ]
  }
];

export const skills = [
  {
    group: "CAD and Simulation",
    items: ["Autodesk Inventor", "Fusion 360", "AutoCAD", "ANSYS", "CFD/Fluent", "COMSOL", "ADAMS"]
  },
  {
    group: "Prototype Build",
    items: ["3D printing", "CNC and conventional machining", "Carbon-fiber tubes", "Aluminum parts", "Basic welding"]
  },
  {
    group: "Controls and Data",
    items: ["Arduino", "IMU sensors", "Temperature/RH sensors", "MATLAB/Simulink", "Processing IDE", "Excel data logging"]
  },
  {
    group: "Engineering Communication",
    items: ["Research writing", "Technical documentation", "Testing reports", "Stakeholder coordination", "Arabic and English"]
  }
];
