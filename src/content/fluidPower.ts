export type FluidPowerCategory = "Pneumatics" | "Electro-Pneumatics" | "Sequencing" | "Timing";

export type FluidPowerStudy = {
  id: string;
  title: string;
  sequence: string;
  description: string;
  category: FluidPowerCategory;
  tags: FluidPowerCategory[];
  mediaFile: string;
};

const mediaBase = "media/fluid-power/pneumatics";

export const fluidPowerFilters: Array<"All" | FluidPowerCategory> = [
  "All",
  "Pneumatics",
  "Electro-Pneumatics",
  "Sequencing",
  "Timing"
];

export const fluidPowerStudies: FluidPowerStudy[] = [
  {
    id: "single-cylinder-manual",
    title: "Single-Cylinder Manual Extend/Retract Control",
    sequence: "A+ A-",
    description:
      "Basic pneumatic cylinder extension and retraction using two manual push-button inputs.",
    category: "Pneumatics",
    tags: ["Pneumatics"],
    mediaFile: `${mediaBase}/single-cylinder-manual-extend-retract.gif`
  },
  {
    id: "two-cylinder-manual",
    title: "Two-Cylinder Manual Sequential Control",
    sequence: "A+ A- B+ B-",
    description:
      "Manual two-actuator sequence where each cylinder completes its stroke before the next action.",
    category: "Sequencing",
    tags: ["Pneumatics", "Sequencing"],
    mediaFile: `${mediaBase}/two-cylinder-manual-sequential-control.gif`
  },
  {
    id: "simultaneous-return-buttons",
    title: "Two-Cylinder Advance with Simultaneous Return",
    sequence: "A+ B+ then A- B-",
    description:
      "Coordinated actuator advance followed by a paired return cycle using button-based logic.",
    category: "Sequencing",
    tags: ["Pneumatics", "Sequencing"],
    mediaFile: `${mediaBase}/two-cylinder-advance-simultaneous-return-buttons.gif`
  },
  {
    id: "relay-two-cylinder",
    title: "Relay-Based Two-Cylinder Sequencing",
    sequence: "A+ B+ then A- B-",
    description:
      "Relay logic automates a two-cylinder sequence and demonstrates electro-pneumatic control behavior.",
    category: "Electro-Pneumatics",
    tags: ["Electro-Pneumatics", "Sequencing"],
    mediaFile: `${mediaBase}/relay-based-two-cylinder-sequencing.gif`
  },
  {
    id: "manual-ab-cycle",
    title: "Manual A-B Cycle Sequencing",
    sequence: "A+ B+ A- B-",
    description:
      "Common two-cylinder motion cycle using manual control elements and limit-based sequencing.",
    category: "Sequencing",
    tags: ["Pneumatics", "Sequencing"],
    mediaFile: `${mediaBase}/manual-ab-cycle-sequencing.gif`
  },
  {
    id: "three-cylinder-relay",
    title: "Three-Cylinder Relay Sequencing",
    sequence: "A+ B+ C+ A- B- C-",
    description:
      "Multi-actuator electro-pneumatic sequencing using relay-based control logic.",
    category: "Electro-Pneumatics",
    tags: ["Electro-Pneumatics", "Sequencing"],
    mediaFile: `${mediaBase}/three-cylinder-relay-sequencing.gif`
  },
  {
    id: "delayed-speed-control",
    title: "Delayed / Speed-Controlled Actuator Sequence",
    sequence: "A+ then B+ slowly",
    description:
      "Staged actuator motion with controlled cylinder speed using flow-control behavior.",
    category: "Timing",
    tags: ["Pneumatics", "Timing"],
    mediaFile: `${mediaBase}/delayed-speed-controlled-actuator-sequence.gif`
  },
  {
    id: "direct-no-relays",
    title: "Direct Two-Cylinder Sequence without Relays",
    sequence: "A+ B+ A- B-",
    description:
      "Direct pneumatic sequencing approach without relay-based electrical logic.",
    category: "Pneumatics",
    tags: ["Pneumatics", "Sequencing"],
    mediaFile: `${mediaBase}/direct-two-cylinder-sequence-no-relays.gif`
  },
  {
    id: "standard-two-cylinder",
    title: "Two-Cylinder Pneumatic Sequence",
    sequence: "A+ B+ A- B-",
    description:
      "Standard two-cylinder extension and return cycle simulated in FluidSIM.",
    category: "Pneumatics",
    tags: ["Pneumatics", "Sequencing"],
    mediaFile: `${mediaBase}/two-cylinder-pneumatic-sequence.gif`
  },
  {
    id: "timed-relay",
    title: "Timed Relay-Controlled Sequence",
    sequence: "A+ B+ B- A-",
    description:
      "Timer relay logic controls sequencing delay and actuator return timing.",
    category: "Timing",
    tags: ["Electro-Pneumatics", "Timing"],
    mediaFile: `${mediaBase}/timed-relay-controlled-sequence.gif`
  },
  {
    id: "oscillating-cylinder",
    title: "Oscillating Cylinder with Controlled Return",
    sequence: "A+ with slow A-",
    description:
      "Repeated cylinder motion with a slower return stroke controlled through flow regulation.",
    category: "Timing",
    tags: ["Pneumatics", "Timing"],
    mediaFile: `${mediaBase}/oscillating-cylinder-controlled-return.gif`
  }
];
