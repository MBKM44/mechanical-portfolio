# AGENTS.md

Guidance for future Codex work on this portfolio.

## Project Goal

Keep this as a professional, hiring-focused mechanical engineering portfolio. The site should make Mubarak's engineering judgment, prototyping experience, and project progression clear to HR reviewers, hiring managers, and technical interviewers.

## Technical Stack

- Static Vite + TypeScript
- Plain HTML rendering from `src/main.ts`
- Project data in `src/content/projects.ts`
- Styling in `src/styles.css`
- 3D models rendered with `@google/model-viewer`
- GitHub Pages deployment through `.github/workflows/deploy.yml`

Avoid adding a large framework unless the site grows beyond a single-page portfolio.

## Content Rules

- Do not reference STEP, STP, DWG, IPT, IAM, SLDPRT, SLDASM, F3D, or source CAD files from the public website.
- Keep public web models in `public/models/`.
- Keep the CV in `public/cv/`.
- Keep future optional renders/images in `public/media/`.
- Do not add empty video slots or placeholder media blocks after project viewers.
- Keep Oil Palm Rover out of the visible project list until a web-ready model or strong visual asset exists.
- Preserve the AWH relationship:
  - Atmospheric Water Harvesting Prototype V1 = early low-scale proof-of-concept
  - Atmospheric Water Harvesting System V2 = improved higher-scale design
  - Do not make V1 sound failed or disposable.

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
3. Confirm all four model viewers load or show the intended fallback.
4. Confirm the CV download link points to `public/cv/CV-Mubarak-Al-Hamadi.pdf`.
5. Confirm no private CAD/source files were moved into `public/`.
