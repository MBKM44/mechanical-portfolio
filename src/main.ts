import "@google/model-viewer";
import "./styles.css";
import { fluidPowerFilters, fluidPowerStudies, type FluidPowerStudy } from "./content/fluidPower";
import {
  actuationFeature,
  mediaFilters,
  mediaLibraryItems,
  type MediaLibraryItem
} from "./content/mediaLibrary";
import { projects, skills, type Project, type ProjectVariant } from "./content/projects";

type ModelViewerElement = HTMLElement & {
  cameraOrbit?: string;
  jumpCameraToGoal?: () => void;
};

type ViewerModel = Pick<Project, "modelFile" | "cameraOrbit" | "viewerAlt">;

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

const renderModelViewer = (model: ViewerModel, compact = false) => `
  <div class="viewer-shell ${compact ? "viewer-shell--compact" : ""}" data-viewer-shell>
    <model-viewer
      src="${assetUrl(model.modelFile)}"
      alt="${model.viewerAlt}"
      camera-controls
      touch-action="pan-y"
      auto-rotate
      auto-rotate-delay="2600"
      shadow-intensity="0.8"
      exposure="0.92"
      camera-orbit="${compact ? "-35deg 64deg 150%" : model.cameraOrbit}"
      min-camera-orbit="auto auto 70%"
      max-camera-orbit="auto auto 520%"
      loading="lazy"
      reveal="auto"
      data-camera-orbit="${compact ? "-35deg 64deg 150%" : model.cameraOrbit}"
    ></model-viewer>
    <div class="viewer-placeholder" aria-live="polite">
      <strong>3D model coming soon</strong>
      <span>The viewer will appear here once a valid GLB is available.</span>
    </div>
    <div class="viewer-status" aria-live="polite">Loading GLB</div>
  </div>
`;

const renderProjectVariant = (variant: ProjectVariant) => `
  <article class="configuration-card" id="${variant.id}">
    <div class="configuration-card__header">
      <span>${variant.label}</span>
      <h3>${variant.title}</h3>
      <p>${variant.summary}</p>
      <div class="configuration-card__meta">
        ${renderPills(variant.metrics)}
      </div>
    </div>
    ${renderModelViewer(variant)}
  </article>
`;

const renderProjectViewerArea = (project: Project) => {
  if (!project.variants?.length) {
    return renderModelViewer(project);
  }

  return `
    <div class="configuration-stack" aria-label="${project.title} configurations">
      ${project.variants.map(renderProjectVariant).join("")}
    </div>
  `;
};

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
        ${renderProjectViewerArea(project)}
      </div>
    </div>

    <div class="container project-tools">
      <div>
        <h3>Design Contribution</h3>
        <ul>${renderList(project.contributions)}</ul>
      </div>
      <div>
        <h3>Tools Used</h3>
        <div class="pill-row">${renderPills(project.tools)}</div>
      </div>
    </div>
  </section>
`;

const renderFluidPowerCard = (study: FluidPowerStudy) => `
  <button
    class="fluid-card"
    type="button"
    data-fluid-card
    data-study-id="${study.id}"
    data-tags="${study.tags.join("|")}"
    aria-label="Open ${study.title}"
  >
    <span class="fluid-card__media">
      <img src="${assetUrl(study.mediaFile)}" alt="${study.title} FluidSIM preview" loading="lazy" decoding="async" />
    </span>
    <span class="fluid-card__body">
      <span class="fluid-card__meta">${study.category} | ${study.sequence}</span>
      <strong>${study.title}</strong>
      <span>${study.description}</span>
    </span>
  </button>
`;

const renderActuationFeature = () => `
  <section class="media-feature" aria-labelledby="actuation-feature-title">
    <div class="media-feature__copy">
      <p class="eyebrow">Mechatronics highlight</p>
      <h3 id="actuation-feature-title">${actuationFeature.title}</h3>
      <p>${actuationFeature.description}</p>
      <div class="pill-row">${renderPills(actuationFeature.points)}</div>
    </div>
    <div class="media-feature__videos">
      ${actuationFeature.videos
        .map(
          (video) => `
            <article class="media-feature-video">
              <video src="${assetUrl(video.source)}" controls muted playsinline preload="metadata"></video>
              <span>${video.title}</span>
            </article>
          `
        )
        .join("")}
    </div>
  </section>
`;

const renderMediaPreview = (item: MediaLibraryItem) => {
  if (item.kind === "youtube") {
    if (!item.youtubeId) {
      return `
        <div class="media-card__fallback">
          <span>YouTube video</span>
          <a href="${item.externalUrl ?? item.source}" target="_blank" rel="noreferrer">Watch on YouTube</a>
        </div>
      `;
    }

    return `
      <iframe
        src="${item.source}"
        title="${item.title}"
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  }

  if (item.kind === "video") {
    return `<video src="${assetUrl(item.source)}" controls muted playsinline preload="metadata"></video>`;
  }

  return `<img src="${assetUrl(item.source)}" alt="${item.title}" loading="lazy" decoding="async" />`;
};

const renderMediaActions = (item: MediaLibraryItem) => {
  if (item.kind === "youtube") {
    return `<a href="${item.externalUrl ?? item.source}" target="_blank" rel="noreferrer">Watch on YouTube</a>`;
  }

  return `
    <button type="button" data-media-open data-media-id="${item.id}">
      ${item.kind === "video" ? "Open larger" : "Enlarge image"}
    </button>
  `;
};

const renderMediaCard = (item: MediaLibraryItem) => `
  <article
    class="media-card media-card--${item.kind}"
    data-media-card
    data-tags="${item.tags.join("|")}"
  >
    <div class="media-card__preview">
      ${renderMediaPreview(item)}
    </div>
    <div class="media-card__body">
      <span>${item.cluster}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="media-card__actions">
        ${renderMediaActions(item)}
      </div>
    </div>
  </article>
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
      <a href="#fluid-power">Fluid Power</a>
      <a href="#media-library">Media</a>
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
          Mechanical engineering portfolio focused on CAD, practical design, thermal systems,
          fluid power simulation, controls, testing, troubleshooting, and prototype development
          for industry-facing engineering roles.
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
          <h2>Mechanical engineer focused on practical design, simulation, testing, and technical operations.</h2>
        </div>
        <div class="about-copy">
          <p>
            I am a Mechanical Engineering graduate and MSc student at Abu Dhabi University,
            with hands-on exposure to industrial compressors, CAD assemblies, fluid power
            circuits, vapor-compression refrigeration, sensor-based monitoring, and experimental
            data analysis.
          </p>
          <p>
            My strongest work combines mechanical design with practical validation: airflow
            and structural thinking, controls integration, simulation, maintenance-style
            troubleshooting, documentation, and clear engineering communication.
          </p>
        </div>
      </div>
    </section>

    <section class="projects section-pad" id="projects">
      <div class="container section-heading">
        <p class="eyebrow">Selected work</p>
        <h2>Engineering projects with browser-based 3D model inspection.</h2>
        <p>
          Five selected project areas showing mechanical design, system iteration, prototype
          validation, CAD packaging, kinematics, and interactive GLB model viewing without CAD software.
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
          <h2 id="progression-title">Atmospheric water harvesting, from first-generation prototype to V2 system design.</h2>
          <p>
            Atmospheric water harvesting extracts water from humid air. In hot, arid
            environments, low humidity and high temperature make condensation harder, so the
            design combines air handling, cooling, sorbent-assisted capture, sensors, and
            testing to evaluate real performance.
          </p>
        </div>
        <ol class="progression-steps">
          <li>
            <span>01</span>
            <strong>V1 Prototype</strong>
            <p>Proved the compact hybrid architecture at low scale.</p>
          </li>
          <li>
            <span>02</span>
            <strong>Testing</strong>
            <p>Measured yield, energy use, airflow behavior, and monitoring reliability.</p>
          </li>
          <li>
            <span>03</span>
            <strong>V2 Configurations</strong>
            <p>Improved scale, serviceability, airflow distribution, research capacity, and compact packaging.</p>
          </li>
        </ol>
      </div>
    </section>

    ${projects.map(renderProjectDetail).join("")}

    <section class="fluid-gallery section-pad" id="fluid-power" aria-labelledby="fluid-power-title">
      <div class="container fluid-heading">
        <div>
          <p class="eyebrow">FluidSIM studies</p>
          <h2 id="fluid-power-title">Fluid Power Simulation Library</h2>
          <p>
            Compact pneumatic and electro-pneumatic circuit studies showing actuator sequencing,
            relay logic, timing, flow control, and simulation-based troubleshooting.
          </p>
        </div>
        <div class="fluid-filter-group" role="group" aria-label="Filter FluidSIM studies">
          ${fluidPowerFilters
            .map(
              (filter, index) => `
                <button class="filter-button ${index === 0 ? "is-active" : ""}" type="button" data-fluid-filter="${filter}">
                  ${filter}
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="container fluid-grid">
        ${fluidPowerStudies.map(renderFluidPowerCard).join("")}
      </div>
    </section>

    <section class="media-library section-pad" id="media-library" aria-labelledby="media-library-title">
      <div class="container media-heading">
        <div>
          <p class="eyebrow">Project media</p>
          <h2 id="media-library-title">Engineering Media Library</h2>
          <p>
            Selected videos and images showing practical CAD work, prototype testing,
            mechatronics integration, industrial exposure, and simulation support.
          </p>
        </div>
        <div class="media-filter-group" role="group" aria-label="Filter engineering media">
          ${mediaFilters
            .map(
              (filter, index) => `
                <button class="filter-button ${index === 0 ? "is-active" : ""}" type="button" data-media-filter="${filter}">
                  ${filter}
                </button>
              `
            )
            .join("")}
        </div>
      </div>

      <div class="container">
        ${renderActuationFeature()}
      </div>

      <div class="container media-grid">
        ${mediaLibraryItems.map(renderMediaCard).join("")}
      </div>
    </section>

    <section class="skills section-pad" id="skills">
      <div class="container section-heading">
        <p class="eyebrow">Skills and tools</p>
        <h2>Mechanical design backed by CAD, simulation, controls, testing, and documentation.</h2>
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
          <h2>Download the full CV for education, industrial exposure, projects, publications, and training.</h2>
        </div>
        <a class="button button-primary" href="${assetUrl("cv/CV-Mubarak-Al-Hamadi.pdf")}" download>Download CV</a>
      </div>
    </section>

    <section class="contact section-pad" id="contact">
      <div class="container contact-layout">
        <div>
          <p class="eyebrow">Contact</p>
          <h2>Available for mechanical design, project engineering, testing, maintenance, automation, and technical operations roles.</h2>
        </div>
        <div class="contact-links">
          <a href="mailto:Mubarak.alhamadi22@gmail.com">Mubarak.alhamadi22@gmail.com</a>
          <a href="https://www.linkedin.com/in/mubarak-al-hamadi" target="_blank" rel="noreferrer">LinkedIn profile</a>
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

  <div class="lightbox" data-fluid-lightbox hidden>
    <button class="lightbox__backdrop" type="button" data-lightbox-close aria-label="Close FluidSIM preview"></button>
    <section class="lightbox__panel" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
      <button class="lightbox__close" type="button" data-lightbox-close aria-label="Close FluidSIM preview">Close</button>
      <div class="lightbox__media">
        <img data-lightbox-image alt="" />
      </div>
      <div class="lightbox__copy">
        <p class="eyebrow" data-lightbox-category></p>
        <h2 id="lightbox-title" data-lightbox-title></h2>
        <p class="lightbox__sequence" data-lightbox-sequence></p>
        <p data-lightbox-description></p>
        <a class="lightbox__fullsize" data-lightbox-fullsize target="_blank" rel="noreferrer">Open full size</a>
      </div>
    </section>
  </div>

  <div class="media-lightbox" data-media-lightbox hidden>
    <button class="media-lightbox__backdrop" type="button" data-media-close aria-label="Close media preview"></button>
    <section class="media-lightbox__panel" role="dialog" aria-modal="true" aria-labelledby="media-lightbox-title">
      <button class="media-lightbox__close" type="button" data-media-close aria-label="Close media preview">Close</button>
      <div class="media-lightbox__stage" data-media-stage></div>
      <div class="media-lightbox__copy">
        <p class="eyebrow" data-media-cluster></p>
        <h2 id="media-lightbox-title" data-media-title></h2>
        <p data-media-description></p>
        <a class="media-lightbox__fullsize" data-media-fullsize target="_blank" rel="noreferrer">Open full size</a>
      </div>
    </section>
  </div>
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

const bindFluidPowerGallery = () => {
  const cards = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-fluid-card]"));
  const filters = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-fluid-filter]"));
  const lightbox = document.querySelector<HTMLElement>("[data-fluid-lightbox]");
  const lightboxImage = document.querySelector<HTMLImageElement>("[data-lightbox-image]");
  const lightboxCategory = document.querySelector<HTMLElement>("[data-lightbox-category]");
  const lightboxTitle = document.querySelector<HTMLElement>("[data-lightbox-title]");
  const lightboxSequence = document.querySelector<HTMLElement>("[data-lightbox-sequence]");
  const lightboxDescription = document.querySelector<HTMLElement>("[data-lightbox-description]");
  const lightboxFullsize = document.querySelector<HTMLAnchorElement>("[data-lightbox-fullsize]");
  const closeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-lightbox-close]"));

  filters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const activeFilter = filterButton.dataset.fluidFilter ?? "All";

      filters.forEach((button) => button.classList.toggle("is-active", button === filterButton));
      cards.forEach((card) => {
        const tags = card.dataset.tags?.split("|") ?? [];
        const isVisible = activeFilter === "All" || tags.includes(activeFilter);
        card.hidden = !isVisible;
      });
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const study = fluidPowerStudies.find((item) => item.id === card.dataset.studyId);
      if (
        !study ||
        !lightbox ||
        !lightboxImage ||
        !lightboxCategory ||
        !lightboxTitle ||
        !lightboxSequence ||
        !lightboxDescription ||
        !lightboxFullsize
      ) {
        return;
      }

      const mediaUrl = assetUrl(study.mediaFile);
      lightboxImage.src = mediaUrl;
      lightboxImage.alt = `${study.title} FluidSIM simulation`;
      lightboxCategory.textContent = study.category;
      lightboxTitle.textContent = study.title;
      lightboxSequence.textContent = `Sequence: ${study.sequence}`;
      lightboxDescription.textContent = study.description;
      lightboxFullsize.href = mediaUrl;
      lightbox.hidden = false;
      document.body.classList.add("has-lightbox");
    });
  });

  const closeLightbox = () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    document.body.classList.remove("has-lightbox");
  };

  closeButtons.forEach((button) => button.addEventListener("click", closeLightbox));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
    }
  });
};

const bindMediaLibrary = () => {
  const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-media-card]"));
  const filters = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-media-filter]"));
  const openButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-media-open]"));
  const lightbox = document.querySelector<HTMLElement>("[data-media-lightbox]");
  const stage = document.querySelector<HTMLElement>("[data-media-stage]");
  const cluster = document.querySelector<HTMLElement>("[data-media-cluster]");
  const title = document.querySelector<HTMLElement>("[data-media-title]");
  const description = document.querySelector<HTMLElement>("[data-media-description]");
  const fullsize = document.querySelector<HTMLAnchorElement>("[data-media-fullsize]");
  const closeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-media-close]"));

  filters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const activeFilter = filterButton.dataset.mediaFilter ?? "All";

      filters.forEach((button) => button.classList.toggle("is-active", button === filterButton));
      cards.forEach((card) => {
        const tags = card.dataset.tags?.split("|") ?? [];
        const isVisible = activeFilter === "All" || tags.includes(activeFilter);
        card.hidden = !isVisible;
      });
    });
  });

  const closeMediaLightbox = () => {
    if (!lightbox || !stage) {
      return;
    }

    const activeVideo = stage.querySelector("video");
    activeVideo?.pause();
    stage.replaceChildren();
    lightbox.hidden = true;
    document.body.classList.remove("has-lightbox");
  };

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const item = mediaLibraryItems.find((mediaItem) => mediaItem.id === button.dataset.mediaId);
      if (!item || !lightbox || !stage || !cluster || !title || !description || !fullsize) {
        return;
      }

      stage.replaceChildren();

      if (item.kind === "video") {
        const video = document.createElement("video");
        video.src = assetUrl(item.source);
        video.controls = true;
        video.muted = true;
        video.playsInline = true;
        video.preload = "metadata";
        stage.append(video);
      } else {
        const image = document.createElement("img");
        image.src = assetUrl(item.source);
        image.alt = item.title;
        stage.append(image);
      }

      cluster.textContent = item.cluster;
      title.textContent = item.title;
      description.textContent = item.description;
      fullsize.href = assetUrl(item.source);
      lightbox.hidden = false;
      document.body.classList.add("has-lightbox");
    });
  });

  closeButtons.forEach((button) => button.addEventListener("click", closeMediaLightbox));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMediaLightbox();
    }
  });
};

bindModelViewers();
bindSmoothScroll();
bindFluidPowerGallery();
bindMediaLibrary();
