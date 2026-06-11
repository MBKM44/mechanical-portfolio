# Mechanical Engineering Portfolio

Submission-ready version of Mubarak Al Hamadi's mechanical engineering portfolio website.

The site is a static Vite + TypeScript portfolio using `<model-viewer>` for browser-based GLB inspection. It is prepared for free deployment through GitHub Pages.

## Included Projects

- Atmospheric Water Harvesting Prototype V1 - early low-scale initial design iteration
- Atmospheric Water Harvesting System V2 - modular and compact higher-scale configurations
- 6-DOF Exoskeleton - mechanical/mechatronics rehabilitation prototype
- Suspension Design - front double-wishbone suspension CAD assembly
- 5-DOF Robotic Arm Assembly - educational kinematics assembly/model
- Fluid Power Simulation Library - compact FluidSIM pneumatic/electro-pneumatic circuit studies

Oil Palm Rover is intentionally not included yet because no web-ready CAD/GLB is currently available for it.

## Folder Structure

```text
public/
  cv/
    CV-Mubarak-Al-Hamadi.pdf
  media/
    fluid-power/
      pneumatics/
        FluidSIM GIF previews
    Put future optional renders or images here
  models/
    old-awh-system.glb
    new-awh-system.glb
    compact-awh-system.glb
    exoskeleton.glb
    suspension-design.glb
    robotic-arm-assembly.glb
src/
  content/
    fluidPower.ts
    projects.ts
  main.ts
  styles.css
.github/workflows/deploy.yml
```

Source CAD files and original staging folders are ignored through `.gitignore` so STEP, STP, DWG, IPT, IAM, SLDPRT, SLDASM, F3D, and other private design files are not deployed accidentally.

## Local Development

Install dependencies:

```bash
npm install
```

Run the local dev server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## GitHub Pages Deployment

1. Push this project to a GitHub repository.
2. In GitHub, open `Settings -> Pages`.
3. Under `Build and deployment`, select `GitHub Actions`.
4. Push to the `main` branch.
5. The workflow in `.github/workflows/deploy.yml` will build and deploy `dist/`.

The Vite config uses `base: "./"` so the site works on GitHub Pages project URLs without hardcoding a repository name.

## Updating Content

- Edit project copy, tools, metrics, and model paths in `src/content/projects.ts`.
- Keep V2 Atmospheric Water Harvesting variants grouped under the V2 project data when adding future standard/compact configurations.
- Replace public GLB files in `public/models/` using the existing filenames, or update the matching `modelFile` value.
- Add future project renders or still images to `public/media/`.
- Edit FluidSIM gallery captions, filters, and media paths in `src/content/fluidPower.ts`.
- Replace the CV at `public/cv/CV-Mubarak-Al-Hamadi.pdf` when needed.

## 3D Viewer Notes

The viewers load GLB files directly from `public/models/`. If a model is missing or fails to load, the page shows a clean "3D model coming soon" placeholder.

`<model-viewer>` supports rotation, zoom, and panning through `camera-controls`; panning is enabled by default via right-click/modifier drag or two-finger touch.
