# AGENTS.md

Guidance for future Codex work on this portfolio.

## Project Goal

Keep this as a professional, hiring-focused mechanical engineering portfolio. The site should make Mubarak's engineering judgment, prototyping experience, and project progression clear to HR reviewers, hiring managers, and technical interviewers.

## Technical Stack

- Static Vite + TypeScript
- Plain HTML rendering from `src/main.ts`
- Project data in `src/content/projects.ts`
- FluidSIM gallery data in `src/content/fluidPower.ts`
- Engineering media library data in `src/content/mediaLibrary.ts`
- Styling in `src/styles.css`
- 3D models rendered with `@google/model-viewer`
- GitHub Pages deployment through `.github/workflows/deploy.yml`

Avoid adding a large framework unless the site grows beyond a single-page portfolio.

## Content Rules

- Do not reference STEP, STP, DWG, IPT, IAM, SLDPRT, SLDASM, F3D, or source CAD files from the public website.
- Keep public web models in `public/models/`.
- Keep the CV in `public/cv/`.
- Keep future optional renders/images in `public/media/`.
- Keep public FluidSIM GIFs or image previews under `public/media/fluid-power/`.
- Keep public project videos under `public/media/videos/` and public gallery images under `public/media/images/library/`.
- Use the correct visible label "Pneumatics" even if the original source folder is misspelled as `Penumatics`.
- Do not add empty video slots or placeholder media blocks after project viewers.
- Keep Oil Palm Rover out of the visible project list until a web-ready model or strong visual asset exists.
- Preserve the AWH relationship:
  - Atmospheric Water Harvesting Prototype V1 = early low-scale initial design iteration
  - Atmospheric Water Harvesting System V2 = improved higher-scale design with modular and compact configurations
  - Do not make V1 sound failed or disposable.
- Keep the Robotic Arm Assembly wording conservative unless new documentation supports stronger claims. "Approximately 5-DOF excluding gripper" is based on current project context, not a formal DOF audit.

## Design Rules

- Keep the style clean, technical, and professional.
- Prioritize fast scanning for recruiters: clear role, outcome, tools, and quantified results.
- Use model viewers as the primary visual assets.
- Keep cards and tool surfaces at 8px border radius or less.
- Check desktop and mobile layouts after visual changes.

## Verification

Before handing off changes:

1. Run `npm run build`.
2. Run or preview the site locally.
3. Confirm all project model viewers load or show the intended fallback, including both V2 configurations.
4. Confirm the CV download link points to `public/cv/CV-Mubarak-Al-Hamadi.pdf`.
5. Confirm FluidSIM gallery filters and lightbox open/close behavior work.
6. Confirm no private CAD/source files were moved into `public/`.
