import "@google/model-viewer";
import "./styles.css";
import { projects, skills, type Project } from "./content/projects";

type ModelViewerElement = HTMLElement & {
  cameraOrbit?: string;
  jumpCameraToGoal?: () => void;
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const renderList = (items: string[]) => items.map((item) => `<li>${item}</li>`).join("");

const renderPills = (items: string[]) =>
  items.map((item) => `<span class="pill">${item}</span>`).join("");

const renderMetricCards = (project: Project) =>
  project.metrics
    .map(
      (metric, index) => `
        <li>
          <span>0${index + 1}</span>
          <strong>${metric}</strong>
        </li>
      `
    )
    .join("");

const renderModelViewer = (project: Project, compact = false) => `
  <div class="viewer-shell ${compact ? "viewer-shell--compact" : ""}" data-viewer-shell>
    <model-viewer
      src="${assetUrl(project.modelFile)}"
      alt="${project.viewerAlt}"
      camera-controls
      touch-action="pan-y"
      auto-rotate
      auto-rotate-delay="2600"
      shadow-intensity="0.8"
      exposure="0.92"
      camera-orbit="${compact ? "-35deg 64deg 150%" : project.cameraOrbit}"
      min-camera-orbit="auto auto 70%"
      max-camera-orbit="auto auto 520%"
      loading="lazy"
      reveal="auto"
      data-camera-orbit="${compact ? "-35deg 64deg 150%" : project.cameraOrbit}"
    ></model-viewer>
    <div class="viewer-placeholder" aria-live="polite">
      <strong>3D model coming soon</strong>
      <span>The viewer will appear here once a valid GLB is available.</span>
    </div>
    <div class="viewer-status" aria-live="polite">Loading GLB</div>
  </div>
`;

const renderProjectCard = (project: Project) => `
  <a class="project-card" href="#${project.id}">
    <span>${project.phase}</span>
    <h3>${project.shortTitle}</h3>
    <p>${project.summary}</p>
    <strong>Open project</strong>
  </a>
`;

const renderProjectDetail = (project: Project, index: number) => `
  <section class="project-detail section-pad ${index % 2 === 1 ? "project-detail--alt" : ""}" id="${project.id}">
    <div class="container project-layout">
      <div class="project-copy">
        <p class="eyebrow">${project.phase}</p>
        <h2>${project.title}</h2>
        <p class="lead">${project.summary}</p>

        <div class="project-narrative">
          <div>
            <h3>Engineering Problem</h3>
            <p>${project.problem}</p>
          </div>
          <div>
            <h3>My Role</h3>
            <p>${project.role}</p>
          </div>
          <div>
            <h3>Outcome</h3>
            <p>${project.result}</p>
          </div>
        </div>

        <ul class="metric-strip">
          ${renderMetricCards(project)}
        </ul>
      </div>

      <div class="project-media">
        ${renderModelViewer(project)}
        <div class="media-reserve">
          <span>Render / video area</span>
        </div>
      </div>
    </div>

    <div class="container project-tools">
      <div>
        <h3>Designed and Contributed</h3>
        <ul>${renderList(project.contributions)}</ul>
      </div>
      <div>
        <h3>Tools Used</h3>
        <div class="pill-row">${renderPills(project.tools)}</div>
      </div>
    </div>
  </section>
`;

app.innerHTML = `
  <header class="site-header">
    <a class="brand" href="#top" aria-label="Mubarak Al Hamadi portfolio home">
      <span>MA</span>
      <strong>Mubarak Al Hamadi</strong>
    </a>
    <nav aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="top">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-model" aria-hidden="true">
        ${renderModelViewer(projects[1], true)}
      </div>
      <div class="hero-scrim"></div>
      <div class="container hero-content">
        <p class="eyebrow">Mechanical Engineer | CAD, Prototyping, Simulation, Mechatronics</p>
        <h1 id="hero-title">Mubarak Al Hamadi</h1>
        <p>
          I design and test mechanical systems that move from CAD to working prototypes:
          atmospheric water harvesting hardware, rehabilitation exoskeletons, sensor-driven
          testing, and field-ready engineering documentation.
        </p>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects">View projects</a>
          <a class="button button-secondary" href="${assetUrl("cv/CV-Mubarak-Al-Hamadi.pdf")}" download>Download CV</a>
        </div>
      </div>
    </section>

    <section class="about section-pad" id="about">
      <div class="container about-grid">
        <div>
          <p class="eyebrow">About</p>
          <h2>Prototype-minded mechanical engineer with research and service experience.</h2>
        </div>
        <div class="about-copy">
          <p>
            I am a Mechanical Engineering graduate and MSc student at Abu Dhabi University,
            with hands-on exposure to industrial compressors, vapor-compression refrigeration,
            sensor-based monitoring, experimental data analysis, and multidisciplinary R&D.
          </p>
          <p>
            My strongest projects combine mechanical design with practical validation: CAD
            assemblies, airflow and structural thinking, electronics integration, testing,
            troubleshooting, documentation, and presentation-ready engineering communication.
          </p>
        </div>
      </div>
    </section>

    <section class="projects section-pad" id="projects">
      <div class="container section-heading">
        <p class="eyebrow">Selected work</p>
        <h2>Engineering projects with browser-based 3D model inspection.</h2>
        <p>
          The AWH projects are shown as a progression: the OLD AWH is the early low-scale
          prototype, and the NEW AWH is the improved upscaled design.
        </p>
      </div>
      <div class="container project-card-grid">
        ${projects.map(renderProjectCard).join("")}
      </div>
    </section>

    <section class="progression section-pad" aria-labelledby="progression-title">
      <div class="container progression-layout">
        <div>
          <p class="eyebrow">Design progression</p>
          <h2 id="progression-title">From first-generation prototype to improved AWH system.</h2>
          <p>
            The atmospheric water harvesting work is presented as an engineering iteration,
            not two disconnected projects. The older model shows the first validation package;
            the newer model shows the scaled response to what testing revealed.
          </p>
        </div>
        <ol class="progression-steps">
          <li>
            <span>01</span>
            <strong>Prototype</strong>
            <p>Prove the hybrid AWH architecture at a low scale.</p>
          </li>
          <li>
            <span>02</span>
            <strong>Test</strong>
            <p>Measure yield, energy, airflow behavior, and monitoring reliability.</p>
          </li>
          <li>
            <span>03</span>
            <strong>Upscale</strong>
            <p>Improve packaging, serviceability, airflow distribution, and research capacity.</p>
          </li>
        </ol>
      </div>
    </section>

    ${projects.map(renderProjectDetail).join("")}

    <section class="skills section-pad" id="skills">
      <div class="container section-heading">
        <p class="eyebrow">Skills and tools</p>
        <h2>Mechanical design backed by analysis, build work, controls, and documentation.</h2>
      </div>
      <div class="container skills-grid">
        ${skills
          .map(
            (skillGroup) => `
              <section class="skill-panel">
                <h3>${skillGroup.group}</h3>
                <div class="pill-row">${renderPills(skillGroup.items)}</div>
              </section>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="cv-band section-pad">
      <div class="container cv-layout">
        <div>
          <p class="eyebrow">CV</p>
          <h2>Download the full CV for education, experience, publications, and training.</h2>
        </div>
        <a class="button button-primary" href="${assetUrl("cv/CV-Mubarak-Al-Hamadi.pdf")}" download>Download CV</a>
      </div>
    </section>

    <section class="contact section-pad" id="contact">
      <div class="container contact-layout">
        <div>
          <p class="eyebrow">Contact</p>
          <h2>Available for engineering roles, research projects, and technical collaborations.</h2>
        </div>
        <div class="contact-links">
          <a href="mailto:Mubarak.alhamadi22@gmail.com">Mubarak.alhamadi22@gmail.com</a>
          <a href="https://www.linkedin.com/in/mubarak-al-hamadi" target="_blank" rel="noreferrer">LinkedIn profile</a>
          <span>GitHub Pages link to be added after publishing</span>
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <span>Mubarak Al Hamadi</span>
      <span>Mechanical Engineering Portfolio</span>
    </div>
  </footer>
`;

const bindModelViewers = () => {
  const viewers = document.querySelectorAll<ModelViewerElement>("model-viewer");

  viewers.forEach((viewer) => {
    const shell = viewer.closest<HTMLElement>("[data-viewer-shell]");
    const status = shell?.querySelector<HTMLElement>(".viewer-status");

    viewer.addEventListener("load", () => {
      shell?.classList.add("is-loaded");
      if (status) {
        status.textContent = "Interactive GLB viewer";
      }
    });

    viewer.addEventListener("error", () => {
      shell?.classList.add("is-missing");
      if (status) {
        status.textContent = "3D model coming soon";
      }
    });
  });
};

const bindSmoothScroll = () => {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.hash);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
};

bindModelViewers();
bindSmoothScroll();
