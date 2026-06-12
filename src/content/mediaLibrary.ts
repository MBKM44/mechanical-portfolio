export type MediaKind = "youtube" | "video" | "image";

export type MediaFilter = "All" | "Videos" | "YouTube" | "Images" | "Mechatronics" | "Testing";

export type MediaLibraryItem = {
  id: string;
  title: string;
  description: string;
  kind: MediaKind;
  source: string;
  cluster: string;
  tags: Exclude<MediaFilter, "All">[];
  youtubeId?: string;
  externalUrl?: string;
};

export const mediaFilters: MediaFilter[] = ["All", "Videos", "YouTube", "Images", "Mechatronics", "Testing"];

export const actuationFeature = {
  title: "AI-Based Actuating Protection System",
  description:
    "Computer-vision demonstration that tracks a face, filters the detected position, converts it into servo motor angles, and drives a non-functional dummy actuator for controlled pan/tilt response.",
  points: ["Face tracking", "Signal filtering", "Angle mapping", "Servo actuation"],
  videos: [
    {
      id: "actuation-test-1",
      title: "Pan/Tilt Tracking Test 1",
      source: "media/videos/ai-actuating-protection-system-test-1.mp4"
    },
    {
      id: "actuation-test-2",
      title: "Pan/Tilt Tracking Test 2",
      source: "media/videos/ai-actuating-protection-system-test-2.mp4"
    }
  ]
};

export const mediaLibraryItems: MediaLibraryItem[] = [
  {
    id: "youtube-cura-3d-printing",
    title: "Cura 3D Printing Tutorial",
    description: "Introductory slicing workflow for preparing a part for 3D printing.",
    kind: "youtube",
    source: "https://www.youtube-nocookie.com/embed/nGMX9gRSXA4",
    youtubeId: "nGMX9gRSXA4",
    externalUrl: "https://youtu.be/nGMX9gRSXA4",
    cluster: "YouTube Tutorials",
    tags: ["Videos", "YouTube"]
  },
  {
    id: "youtube-harvesting-rover",
    title: "Harvesting Rover Extended Video",
    description: "Extended demonstration video included as supporting project media.",
    kind: "youtube",
    source: "https://www.youtube-nocookie.com/embed/aTS6cFhiquU",
    youtubeId: "aTS6cFhiquU",
    externalUrl: "https://youtu.be/aTS6cFhiquU",
    cluster: "YouTube Demonstrations",
    tags: ["Videos", "YouTube", "Mechatronics"]
  },
  {
    id: "youtube-exoskeleton-capstone",
    title: "Lower Limb Exoskeleton Capstone",
    description: "Capstone overview of the lower-limb rehabilitation exoskeleton project.",
    kind: "youtube",
    source: "https://www.youtube-nocookie.com/embed/n3mlujyvvdE",
    youtubeId: "n3mlujyvvdE",
    externalUrl: "https://youtu.be/n3mlujyvvdE",
    cluster: "YouTube Demonstrations",
    tags: ["Videos", "YouTube", "Mechatronics"]
  },
  {
    id: "youtube-exoskeleton-testing",
    title: "Lower Limb Exoskeleton Testing",
    description: "Testing footage showing prototype movement and validation activity.",
    kind: "youtube",
    source: "https://www.youtube-nocookie.com/embed/OrZCBoD9zek",
    youtubeId: "OrZCBoD9zek",
    externalUrl: "https://youtu.be/OrZCBoD9zek",
    cluster: "YouTube Demonstrations",
    tags: ["Videos", "YouTube", "Mechatronics", "Testing"]
  },
  {
    id: "youtube-hydraulics-pneumatics-1",
    title: "Hydraulics & Pneumatics Tutorial 1",
    description: "Fluid power tutorial covering basic hydraulic and pneumatic circuit concepts.",
    kind: "youtube",
    source: "https://www.youtube-nocookie.com/embed/qBQCzK-L-L8",
    youtubeId: "qBQCzK-L-L8",
    externalUrl: "https://youtu.be/qBQCzK-L-L8",
    cluster: "YouTube Tutorials",
    tags: ["Videos", "YouTube"]
  },
  {
    id: "youtube-hydraulics-pneumatics-2",
    title: "Hydraulics & Pneumatics Tutorial 2",
    description: "Follow-up tutorial for fluid power circuit behavior and control logic.",
    kind: "youtube",
    source: "https://www.youtube-nocookie.com/embed/Cs3WDD1jXsk",
    youtubeId: "Cs3WDD1jXsk",
    externalUrl: "https://youtu.be/Cs3WDD1jXsk",
    cluster: "YouTube Tutorials",
    tags: ["Videos", "YouTube"]
  },
  {
    id: "youtube-ai-actuating-demo",
    title: "AI Integration with Actuating Demo",
    description: "Short demonstration of vision-guided servo response for a mechatronics prototype.",
    kind: "youtube",
    source: "https://www.youtube-nocookie.com/embed/zkde9PmPu2o",
    youtubeId: "zkde9PmPu2o",
    externalUrl: "https://youtube.com/shorts/zkde9PmPu2o?feature=share",
    cluster: "YouTube Demonstrations",
    tags: ["Videos", "YouTube", "Mechatronics", "Testing"]
  },
  {
    id: "video-ar-exoskeleton",
    title: "AR Implementation in Lower Limb Exoskeleton",
    description: "Augmented-reality visualization workflow supporting the exoskeleton demonstration.",
    kind: "video",
    source: "media/videos/ar-implementation-lower-limb-exoskeleton.mp4",
    cluster: "Local Video Demonstrations",
    tags: ["Videos", "Mechatronics"]
  },
  {
    id: "video-suspension-simulation",
    title: "Suspension Simulation",
    description: "Short simulation clip showing suspension movement and CAD-based mechanism review.",
    kind: "video",
    source: "media/videos/suspension-simulation.mp4",
    cluster: "Local Video Demonstrations",
    tags: ["Videos", "Testing"]
  },
  {
    id: "video-actuation-test-1",
    title: "AI-Based Actuation Test 1",
    description: "Face-tracking position data mapped into servo pan/tilt response.",
    kind: "video",
    source: "media/videos/ai-actuating-protection-system-test-1.mp4",
    cluster: "Mechatronics Testing",
    tags: ["Videos", "Mechatronics", "Testing"]
  },
  {
    id: "video-actuation-test-2",
    title: "AI-Based Actuation Test 2",
    description: "Second validation clip for filtered tracking and servo actuation behavior.",
    kind: "video",
    source: "media/videos/ai-actuating-protection-system-test-2.mp4",
    cluster: "Mechatronics Testing",
    tags: ["Videos", "Mechatronics", "Testing"]
  },
  {
    id: "image-airflow-visualization",
    title: "Airflow Visualization Experiment",
    description: "Prototype testing image focused on airflow behavior and validation.",
    kind: "image",
    source: "media/images/library/airflow-visualization-experiment.jpg",
    cluster: "Prototype & Testing",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-awh-testing",
    title: "Atmospheric Water Harvester Testing",
    description: "AWH prototype testing setup for water-generation and system checks.",
    kind: "image",
    source: "media/images/library/atmospheric-water-harvester-testing.jpeg",
    cluster: "Prototype & Testing",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-awhs-2",
    title: "Atmospheric Water Harvesting Setup",
    description: "System build image showing the atmospheric water harvesting prototype package.",
    kind: "image",
    source: "media/images/library/awhs-2.jpeg",
    cluster: "Prototype & Testing",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-awhs-3-prototype",
    title: "AWH Prototype Assembly",
    description: "Prototype assembly view used during system development and testing.",
    kind: "image",
    source: "media/images/library/awhs-3-prototype.jpeg",
    cluster: "Prototype & Testing",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-awhs-4-testing",
    title: "AWH Testing Configuration",
    description: "Testing configuration for the atmospheric water harvesting prototype.",
    kind: "image",
    source: "media/images/library/awhs-4-testing.jpeg",
    cluster: "Prototype & Testing",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-condensation-tec",
    title: "Thermoelectric Cooler Condensation",
    description: "Condensation observation from thermoelectric cooling tests for AWH.",
    kind: "image",
    source: "media/images/library/condensation-thermoelectric-coolers-awh.jpeg",
    cluster: "Prototype & Testing",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-temperature-testing",
    title: "AWH Temperature Testing",
    description: "Temperature check during atmospheric water harvesting prototype evaluation.",
    kind: "image",
    source: "media/images/library/temperature-testing-check-awh.jpeg",
    cluster: "Prototype & Testing",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-exoskeleton-assembly",
    title: "Lower Limb Exoskeleton Assembly",
    description: "Mechanical assembly view of the lower-limb exoskeleton prototype.",
    kind: "image",
    source: "media/images/library/assembly-prototype-lower-limb-exoskeleton.jpg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics", "Testing"]
  },
  {
    id: "image-exoskeleton-capstone",
    title: "Lower Limb Exoskeleton Capstone",
    description: "Capstone project image from the exoskeleton development workflow.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-capstone.jpeg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics"]
  },
  {
    id: "image-exoskeleton-group",
    title: "Exoskeleton Project Team",
    description: "Team image from the lower-limb exoskeleton project.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-group-picture.jpeg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics"]
  },
  {
    id: "image-exoskeleton-event",
    title: "Exoskeleton Event Demonstration",
    description: "Public demonstration image from the exoskeleton project.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-mubadala-event.png",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics"]
  },
  {
    id: "image-exoskeleton-event-2",
    title: "Exoskeleton Event Showcase",
    description: "Showcase image from the lower-limb exoskeleton demonstration.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-mubadala-event-2.jpeg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics"]
  },
  {
    id: "image-exoskeleton-prototype",
    title: "Exoskeleton Prototype",
    description: "Prototype build image showing the lower-limb support structure.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-prototype.jpeg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics", "Testing"]
  },
  {
    id: "image-exoskeleton-prototype-2",
    title: "Exoskeleton Prototype Detail",
    description: "Closer prototype view for mechanical assembly and fit review.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-prototype-2.jpeg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics", "Testing"]
  },
  {
    id: "image-exoskeleton-prototype-3",
    title: "Exoskeleton Prototype Setup",
    description: "Prototype setup image used during assembly and testing.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-prototype-3.jpeg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics", "Testing"]
  },
  {
    id: "image-exoskeleton-testing",
    title: "Exoskeleton Testing",
    description: "Testing image for evaluating prototype fit and movement behavior.",
    kind: "image",
    source: "media/images/library/lower-limb-exoskeleton-testing-1.jpeg",
    cluster: "Robotics & Mechatronics",
    tags: ["Images", "Mechatronics", "Testing"]
  },
  {
    id: "image-atlas-air-dryer",
    title: "Industrial Air Dryer",
    description: "Industrial compressor-system exposure from Atlas Copco internship work.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-air-dryer.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-atlas-compressor",
    title: "Industrial Compressor",
    description: "Compressor equipment exposure from industrial maintenance and operations.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-compressor.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-atlas-exhaust-silencer",
    title: "Compressor Exhaust Silencer",
    description: "Industrial system component observed during compressor-related training.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-exhaust-silencer.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-atlas-induction",
    title: "Industrial Induction Session",
    description: "Training and site exposure during Atlas Copco internship.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-induction.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-atlas-induction-2",
    title: "Industrial Training Session",
    description: "Additional induction and training exposure from industrial systems work.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-induction-2.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-atlas-n2-membranes",
    title: "Nitrogen Membrane System",
    description: "N2 membrane equipment observed during industrial compressor-system exposure.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-n2-membranes.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-atlas-n2-maintenance",
    title: "N2 Membrane Maintenance",
    description: "Maintenance-oriented exposure to nitrogen membrane system components.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-n2-membranes-maintenance.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-atlas-internship",
    title: "Atlas Copco Internship",
    description: "Industrial training context from compressor and utility-system exposure.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship.jpeg",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-atlas-certificate",
    title: "Atlas Copco Internship Certificate",
    description: "Internship record supporting practical industrial exposure.",
    kind: "image",
    source: "media/images/library/atlas-copco-internship-certificate.png",
    cluster: "Industrial Systems & Maintenance",
    tags: ["Images"]
  },
  {
    id: "image-crack-simulation",
    title: "Crack Simulation",
    description: "Simulation image showing structural behavior and analysis visualization.",
    kind: "image",
    source: "media/images/library/crack-simulation.jpg",
    cluster: "CAD & Simulation",
    tags: ["Images", "Testing"]
  },
  {
    id: "image-exoskeleton-simulation",
    title: "Exoskeleton Simulation",
    description: "Simulation media supporting lower-limb exoskeleton design review.",
    kind: "image",
    source: "media/images/library/exoskeleton-simulation.gif",
    cluster: "CAD & Simulation",
    tags: ["Images", "Mechatronics", "Testing"]
  }
];
