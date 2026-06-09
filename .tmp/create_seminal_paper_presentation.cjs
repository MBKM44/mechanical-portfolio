const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");

const out = "seminal_paper_presentation.pptx";
const assetDir = path.join(".tmp", "ppt_assets");
fs.mkdirSync(assetDir, { recursive: true });

const C = {
  ink: "1F2933",
  muted: "52606D",
  blue: "1F6B8F",
  blue2: "4C9BB5",
  amber: "D9972B",
  red: "B84A3A",
  green: "5F8D4E",
  pale: "F5F7FA",
  line: "CAD3DF",
  white: "FFFFFF",
};

const svgWrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">${body}</svg>`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function svgPng(name, body) {
  const file = path.join(assetDir, `${name}.png`);
  await sharp(Buffer.from(svgWrap(body))).png().toFile(file);
  return file;
}

function defs() {
  return `
  <defs>
    <marker id="arrowBlue" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto" markerUnits="strokeWidth">
      <path d="M2,2 L12,7 L2,12 Z" fill="#${C.blue}"/>
    </marker>
    <marker id="arrowAmber" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto" markerUnits="strokeWidth">
      <path d="M2,2 L12,7 L2,12 Z" fill="#${C.amber}"/>
    </marker>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#1F2933" flood-opacity="0.14"/>
    </filter>
  </defs>`;
}

function crackContours(label = true) {
  return `
    <rect x="170" y="130" width="760" height="370" rx="8" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <line x1="170" y1="315" x2="545" y2="315" stroke="#${C.ink}" stroke-width="9" stroke-linecap="round"/>
    <path d="M545 315 C565 302, 565 328, 545 315" fill="#${C.ink}"/>
    <ellipse cx="545" cy="315" rx="95" ry="72" fill="none" stroke="#${C.amber}" stroke-width="7"/>
    <ellipse cx="545" cy="315" rx="185" ry="132" fill="none" stroke="#${C.blue}" stroke-width="6"/>
    <path d="M735 195 A260 185 0 1 1 734 435" fill="none" stroke="#${C.blue2}" stroke-width="5" stroke-dasharray="14 14"/>
    <line x1="260" y1="82" x2="260" y2="128" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="430" y1="82" x2="430" y2="128" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="600" y1="82" x2="600" y2="128" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="260" y1="548" x2="260" y2="502" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="430" y1="548" x2="430" y2="502" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="600" y1="548" x2="600" y2="502" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    ${label ? `<text x="640" y="293" font-family="Arial" font-size="34" font-weight="700" fill="#${C.amber}">J</text>
    <text x="745" y="260" font-family="Arial" font-size="30" font-weight="700" fill="#${C.blue}">same J</text>` : ""}`;
}

async function makeAssets() {
  const a = {};
  a.title = await svgPng("title", `${defs()}${crackContours(true)}
    <text x="170" y="590" font-family="Arial" font-size="24" fill="#${C.muted}">Remote load, local crack tip, multiple valid contours</text>`);

  a.why = await svgPng("why", `${defs()}
    <rect x="120" y="130" width="390" height="390" rx="8" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <line x1="170" y1="330" x2="340" y2="330" stroke="#${C.ink}" stroke-width="8" stroke-linecap="round"/>
    <path d="M340 330 C360 318 360 342 340 330" fill="#${C.ink}"/>
    <ellipse cx="340" cy="330" rx="54" ry="38" fill="#${C.amber}" opacity="0.22" stroke="#${C.amber}" stroke-width="4"/>
    <line x1="220" y1="80" x2="220" y2="130" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="350" y1="80" x2="350" y2="130" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="220" y1="570" x2="220" y2="520" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <line x1="350" y1="570" x2="350" y2="520" stroke="#${C.blue}" stroke-width="7" marker-end="url(#arrowBlue)"/>
    <circle cx="760" cy="325" r="148" fill="#FFFFFF" stroke="#${C.blue}" stroke-width="5" filter="url(#softShadow)"/>
    <line x1="660" y1="325" x2="780" y2="325" stroke="#${C.ink}" stroke-width="8" stroke-linecap="round"/>
    <path d="M780 325 C798 314 798 336 780 325" fill="#${C.ink}"/>
    <ellipse cx="780" cy="325" rx="74" ry="50" fill="#${C.red}" opacity="0.16" stroke="#${C.red}" stroke-width="4"/>
    <line x1="505" y1="260" x2="620" y2="305" stroke="#${C.blue}" stroke-width="5" marker-end="url(#arrowBlue)"/>
    <text x="650" y="515" font-family="Arial" font-size="25" font-weight="700" fill="#${C.ink}">near-tip zone controls failure</text>`);

  a.problem = await svgPng("problem", `${defs()}
    <rect x="160" y="130" width="820" height="390" rx="8" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <line x1="225" y1="330" x2="560" y2="330" stroke="#${C.ink}" stroke-width="10" stroke-linecap="round"/>
    <path d="M560 330 C580 317 580 343 560 330" fill="#${C.ink}"/>
    <path d="M560 330 C610 252 720 268 770 328 C718 382 615 405 560 330 Z" fill="#${C.amber}" opacity="0.23" stroke="#${C.amber}" stroke-width="4"/>
    <path d="M580 305 C640 285 675 298 725 325" fill="none" stroke="#${C.red}" stroke-width="5" stroke-dasharray="10 12"/>
    <path d="M578 354 C637 385 696 372 746 335" fill="none" stroke="#${C.red}" stroke-width="5" stroke-dasharray="10 12"/>
    <text x="638" y="325" font-family="Arial" font-size="72" font-weight="700" fill="#${C.red}" opacity="0.70">?</text>
    <text x="220" y="465" font-family="Arial" font-size="28" fill="#${C.muted}">local stress and strain field is hard to solve directly</text>`);

  a.core = await svgPng("core", `${defs()}${crackContours(false)}
    <text x="645" y="287" font-family="Arial" font-size="26" font-weight="700" fill="#${C.amber}">J1</text>
    <text x="735" y="245" font-family="Arial" font-size="26" font-weight="700" fill="#${C.blue}">J2</text>
    <text x="815" y="410" font-family="Arial" font-size="26" font-weight="700" fill="#${C.blue2}">J3</text>
    <text x="260" y="590" font-family="Arial" font-size="34" font-weight="700" fill="#${C.ink}">J1 = J2 = J3</text>`);

  a.analogy = await svgPng("analogy", `${defs()}
    <rect x="85" y="130" width="460" height="390" rx="8" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <rect x="655" y="130" width="460" height="390" rx="8" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <line x1="135" y1="325" x2="315" y2="325" stroke="#${C.ink}" stroke-width="8" stroke-linecap="round"/>
    <path d="M315 325 C333 314 333 336 315 325" fill="#${C.ink}"/>
    <ellipse cx="315" cy="325" rx="175" ry="122" fill="none" stroke="#${C.blue}" stroke-width="6"/>
    <text x="180" y="475" font-family="Arial" font-size="28" font-weight="700" fill="#${C.blue}">far path</text>
    <text x="162" y="508" font-family="Arial" font-size="21" fill="#${C.muted}">easier global information</text>
    <line x1="705" y1="325" x2="885" y2="325" stroke="#${C.ink}" stroke-width="8" stroke-linecap="round"/>
    <path d="M885 325 C903 314 903 336 885 325" fill="#${C.ink}"/>
    <ellipse cx="885" cy="325" rx="74" ry="50" fill="none" stroke="#${C.amber}" stroke-width="7"/>
    <text x="755" y="475" font-family="Arial" font-size="28" font-weight="700" fill="#${C.amber}">near path</text>
    <text x="732" y="508" font-family="Arial" font-size="21" fill="#${C.muted}">crack-tip severity</text>
    <text x="574" y="345" font-family="Arial" font-size="68" font-weight="700" fill="#${C.ink}">=</text>`);

  a.equation = await svgPng("equation", `${defs()}
    <rect x="125" y="130" width="950" height="390" rx="8" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <line x1="235" y1="330" x2="420" y2="330" stroke="#${C.ink}" stroke-width="9" stroke-linecap="round"/>
    <path d="M420 330 C438 318 438 342 420 330" fill="#${C.ink}"/>
    <ellipse cx="420" cy="330" rx="105" ry="76" fill="none" stroke="#${C.blue}" stroke-width="6"/>
    <line x1="421" y1="330" x2="545" y2="330" stroke="#${C.amber}" stroke-width="5" marker-end="url(#arrowAmber)"/>
    <text x="555" y="338" font-family="Arial" font-size="24" font-weight="700" fill="#${C.amber}">x</text>
    <text x="645" y="230" font-family="Arial" font-size="31" font-weight="700" fill="#${C.ink}">J = ∫Γ ( W dy - T · ∂u/∂x ds )</text>
    <line x1="685" y1="247" x2="680" y2="318" stroke="#${C.amber}" stroke-width="4"/>
    <text x="620" y="358" font-family="Arial" font-size="22" fill="#${C.muted}">stored strain energy</text>
    <line x1="842" y1="247" x2="858" y2="318" stroke="#${C.blue}" stroke-width="4"/>
    <text x="815" y="358" font-family="Arial" font-size="22" fill="#${C.muted}">traction work term</text>`);

  a.connects = await svgPng("connects", `${defs()}
    <circle cx="600" cy="330" r="82" fill="#${C.blue}" opacity="0.96" filter="url(#softShadow)"/>
    <text x="573" y="348" font-family="Arial" font-size="54" font-weight="700" fill="#FFFFFF">J</text>
    <circle cx="275" cy="210" r="88" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <circle cx="925" cy="210" r="88" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <circle cx="600" cy="515" r="88" fill="#FFFFFF" stroke="#${C.line}" stroke-width="4"/>
    <line x1="354" y1="242" x2="519" y2="306" stroke="#${C.amber}" stroke-width="6" marker-end="url(#arrowAmber)"/>
    <line x1="846" y1="242" x2="681" y2="306" stroke="#${C.amber}" stroke-width="6" marker-end="url(#arrowAmber)"/>
    <line x1="600" y1="428" x2="600" y2="413" stroke="#${C.amber}" stroke-width="6" marker-end="url(#arrowAmber)"/>
    <text x="205" y="198" font-family="Arial" font-size="24" font-weight="700" fill="#${C.ink}">Energy</text>
    <text x="197" y="230" font-family="Arial" font-size="22" fill="#${C.muted}">-dP/da</text>
    <text x="870" y="198" font-family="Arial" font-size="24" font-weight="700" fill="#${C.ink}">Elastic K</text>
    <text x="845" y="230" font-family="Arial" font-size="22" fill="#${C.muted}">(1-ν²)K²/E</text>
    <text x="537" y="505" font-family="Arial" font-size="24" font-weight="700" fill="#${C.ink}">Near-tip</text>
    <text x="516" y="538" font-family="Arial" font-size="22" fill="#${C.muted}">deformation</text>`);

  a.timeline = await svgPng("timeline", `${defs()}
    <line x1="150" y1="325" x2="1025" y2="325" stroke="#${C.line}" stroke-width="8"/>
    <circle cx="185" cy="325" r="34" fill="#${C.ink}"/>
    <circle cx="430" cy="325" r="42" fill="#${C.blue}"/>
    <circle cx="675" cy="325" r="34" fill="#${C.amber}"/>
    <circle cx="925" cy="325" r="34" fill="#${C.green}"/>
    <text x="125" y="255" font-family="Arial" font-size="26" font-weight="700" fill="#${C.ink}">Griffith / Irwin</text>
    <text x="356" y="255" font-family="Arial" font-size="30" font-weight="700" fill="#${C.blue}">Rice J</text>
    <text x="610" y="255" font-family="Arial" font-size="26" font-weight="700" fill="#${C.amber}">HRR fields</text>
    <text x="838" y="255" font-family="Arial" font-size="26" font-weight="700" fill="#${C.green}">modern testing</text>
    <text x="105" y="400" font-family="Arial" font-size="22" fill="#${C.muted}">linear energy ideas</text>
    <text x="345" y="400" font-family="Arial" font-size="22" fill="#${C.muted}">nonlinear contour measure</text>
    <text x="595" y="400" font-family="Arial" font-size="22" fill="#${C.muted}">J-controlled tip fields</text>
    <text x="825" y="400" font-family="Arial" font-size="22" fill="#${C.muted}">elastic-plastic fracture</text>`);

  a.final = await svgPng("final", `${defs()}${crackContours(true)}
    <rect x="235" y="560" width="720" height="66" rx="8" fill="#${C.ink}"/>
    <text x="294" y="604" font-family="Arial" font-size="34" font-weight="700" fill="#FFFFFF">One contour integral. One crack-driving measure.</text>`);
  return a;
}

function addTitle(slide, title, kicker) {
  slide.addText(kicker || "Rice 1968", {
    x: 0.48, y: 0.26, w: 2.4, h: 0.22, fontFace: "Arial", fontSize: 8.5,
    bold: true, color: C.blue, margin: 0, breakLine: false,
  });
  slide.addText(title, {
    x: 0.48, y: 0.48, w: 8.85, h: 0.44, fontFace: "Arial", fontSize: 22,
    bold: true, color: C.ink, margin: 0.02, breakLine: false,
  });
  slide.addShape("line", { x: 0.48, y: 0.98, w: 8.4, h: 0, line: { color: C.line, width: 1.2 } });
}

function addBullets(slide, items, x, y, w, h, color = C.ink) {
  slide.addText(items.map(t => ({ text: t, options: { bullet: { type: "ul" }, hanging: 4, breakLine: true } })), {
    x, y, w, h, fontFace: "Arial", fontSize: 15.5, color, breakLine: false,
    fit: "shrink", paraSpaceAfterPt: 8, valign: "top", margin: 0.02,
  });
}

function addFooter(slide, n) {
  slide.addText(`${n}/9`, { x: 9.0, y: 5.34, w: 0.5, h: 0.16, fontSize: 8, color: C.muted, fontFace: "Arial", align: "right", margin: 0 });
}

function notesFor(i) {
  const notes = [
    `This presentation is about J. R. Rice's 1968 paper, "A Path Independent Integral and the Approximate Analysis of Strain Concentration by Notches and Cracks." The central idea is surprisingly compact: for a crack or notch in a two-dimensional deformation field, you can draw a contour around the tip and calculate a quantity called J. Under the assumptions of the paper, that value is the same for every valid contour around the tip. So the paper is not just about a new equation. It is about a new way to think about crack-tip severity.`,
    `Cracks are difficult because they are very local problems with structural consequences. In a real component, the load may be applied far away and the geometry may be large and complicated. But failure often starts in a very small region near the crack tip, where stress and strain become highly concentrated. Rice's paper matters because it gives a way to connect the global loading of the body to the local intensity of the crack-tip deformation, even when the material response is nonlinear in the deformation-theory sense.`,
    `Before this work, one major difficulty was that crack-tip fields were mathematically hard to determine, especially for nonlinear materials. If the material is linear elastic, the near-tip stress field has a known singular form and the stress intensity factor tells you how strong that field is. But when plastic deformation appears near the crack tip, the local field becomes much more complicated. Rice's practical question was whether we can characterize the crack tip without solving the entire detailed local boundary-value problem every time.`,
    `Rice's core move was to define a contour integral around the crack or notch tip. The contour can be close to the tip, where deformation is intense, or farther away, where the field may be easier to know from the loading and geometry. The remarkable result is that the integral has the same value on all valid paths. That means J can be evaluated where the mathematics or measurements are convenient, and then interpreted as information about the near-tip region.`,
    `One useful way to think about this is to compare a far contour and a near contour. The near contour directly samples the high strain and stress concentration, but that is exactly where the field is hardest to describe. The far contour is farther away, where stresses and displacements may be easier to estimate. Path independence lets these two views communicate. J acts like a bridge between the accessible global problem and the dangerous local region.`,
    `Here is the essential equation, without deriving every line. J equals the contour integral of W dy minus T dot partial u by partial x times ds. W is the strain energy density. T is the traction vector on the contour. u is displacement, and x is the crack extension direction. The first term is tied to stored energy. The second term accounts for mechanical work associated with tractions and displacement gradients along the contour. The proof uses equilibrium and Green's theorem: the area contribution between two contours vanishes, so both contours give the same J.`,
    `The importance of J becomes clearer when we look at what it connects. First, Rice gives J an energy interpretation: it equals the rate at which potential energy decreases as the crack or notch length increases. Second, in small-scale yielding it reduces to the familiar linear elastic result. For Mode I plane strain, J equals one minus Poisson's ratio squared, times K-I squared, divided by Young's modulus. Third, J is connected to the near-tip deformation field. So Rice generalized classical fracture mechanics rather than replacing it.`,
    `Historically, the J-integral became one of the central ideas in elastic-plastic fracture mechanics. It connected Griffith and Irwin energy ideas to nonlinear material behavior, and it set the stage for the Hutchinson-Rice-Rosengren crack-tip fields. But the paper is careful about its limits. The path independence applies under assumptions such as two-dimensional fields, no body forces, traction-free crack surfaces, and elastic or deformation-theory elastic-plastic behavior. Rice also notes that an analogous integral had not been successfully formulated for incremental plasticity.`,
    `The final takeaway is this: Rice turned a hard local fracture problem into a portable energy measure. Instead of needing the full detailed crack-tip solution from the start, we can calculate J on a convenient contour and use it to characterize crack-tip severity. The genius of the paper is not that it solves every crack problem. It gives engineers and researchers a quantity that makes nonlinear crack problems discussable, measurable, and comparable. That quantity is J.`,
  ];
  return notes[i - 1];
}

async function main() {
  const assets = await makeAssets();
  global.pptx = pptxgen;
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.author = "Codex";
  pres.company = "C:\\AI_Codex\\mechanical-portfolio";
  pres.subject = "Rice 1968 J-integral presentation";
  pres.title = "A Path-Independent Integral: Rice's J-Integral";
  pres.lang = "en-US";
  pres.theme = {
    headFontFace: "Arial",
    bodyFontFace: "Arial",
    lang: "en-US",
  };
  pres.defineLayout({ name: "LAYOUT_WIDE", width: 10, height: 5.625 });

  let s;
  s = pres.addSlide();
  s.background = { color: C.pale };
  s.addShape("rect", { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.pale }, line: { color: C.pale } });
  s.addText("Rice 1968", { x: 0.55, y: 0.45, w: 2.0, h: 0.25, fontFace: "Arial", fontSize: 11, color: C.blue, bold: true, margin: 0 });
  s.addText("A Path-Independent Integral", { x: 0.55, y: 0.78, w: 5.4, h: 0.55, fontFace: "Arial", fontSize: 28, bold: true, color: C.ink, margin: 0 });
  s.addText("The J-integral and the birth of nonlinear fracture mechanics", { x: 0.58, y: 1.38, w: 5.0, h: 0.46, fontFace: "Arial", fontSize: 15, color: C.muted, margin: 0 });
  const dx = 5.45, dy = 0.78;
  s.addShape("rect", { x: dx + 0.08, y: dy + 0.52, w: 3.55, h: 1.8, fill: { color: C.white }, line: { color: C.line, width: 1.2 } });
  s.addShape("line", { x: dx + 0.08, y: dy + 1.42, w: 1.62, h: 0, line: { color: C.ink, width: 3.2 } });
  s.addShape("ellipse", { x: dx + 1.50, y: dy + 0.98, w: 1.68, h: 0.88, fill: { color: C.white, transparency: 100 }, line: { color: C.amber, width: 2.2 } });
  s.addShape("ellipse", { x: dx + 1.15, y: dy + 0.76, w: 2.40, h: 1.34, fill: { color: C.white, transparency: 100 }, line: { color: C.blue, width: 1.8 } });
  s.addShape("ellipse", { x: dx + 2.65, y: dy + 0.48, w: 2.05, h: 1.90, fill: { color: C.white, transparency: 100 }, line: { color: C.blue2, width: 1.5, dash: "dash" } });
  s.addShape("downArrow", { x: dx + 0.62, y: dy + 0.02, w: 0.25, h: 0.42, fill: { color: C.blue }, line: { color: C.blue } });
  s.addShape("downArrow", { x: dx + 1.72, y: dy + 0.02, w: 0.25, h: 0.42, fill: { color: C.blue }, line: { color: C.blue } });
  s.addShape("upArrow", { x: dx + 0.62, y: dy + 2.40, w: 0.25, h: 0.42, fill: { color: C.blue }, line: { color: C.blue } });
  s.addShape("upArrow", { x: dx + 1.72, y: dy + 2.40, w: 0.25, h: 0.42, fill: { color: C.blue }, line: { color: C.blue } });
  s.addText("J", { x: dx + 2.37, y: dy + 1.22, w: 0.22, h: 0.22, fontFace: "Arial", fontSize: 14, bold: true, color: C.amber, margin: 0 });
  s.addText("same J", { x: dx + 3.02, y: dy + 1.06, w: 0.88, h: 0.22, fontFace: "Arial", fontSize: 13, bold: true, color: C.blue, margin: 0 });
  addBullets(s, ["Path-independent contour integral", "Bridge from energy release to crack-tip severity", "A practical language for elastic-plastic fracture"], 0.62, 2.42, 4.35, 1.32);
  s.addNotes(notesFor(1)); addFooter(s, 1);

  s = pres.addSlide(); s.background = { color: C.white };
  addTitle(s, "Why This Paper Matters");
  s.addImage({ path: assets.why, x: 5.45, y: 1.22, w: 4.1, h: 2.31 });
  addBullets(s, ["Failure begins in a tiny near-tip region", "Loads and geometry are usually known far away", "Plasticity makes the local field hard to solve"], 0.72, 1.42, 4.1, 1.8);
  s.addText("Rice connects the global problem to the local crack-tip danger.", { x: 0.72, y: 4.35, w: 8.2, h: 0.32, fontSize: 16, color: C.blue, bold: true, fontFace: "Arial", margin: 0.02 });
  s.addNotes(notesFor(2)); addFooter(s, 2);

  s = pres.addSlide(); s.background = { color: C.white };
  addTitle(s, "The Problem Before the Paper");
  s.addImage({ path: assets.problem, x: 4.92, y: 1.34, w: 4.55, h: 2.56 });
  addBullets(s, ["Linear elastic fracture used K and energy release rate", "Elastic-plastic metals develop concentrated near-tip strain", "Full nonlinear boundary-value solutions are difficult"], 0.72, 1.34, 4.0, 2.05);
  s.addShape("rect", { x: 0.72, y: 4.28, w: 4.15, h: 0.52, fill: { color: "FFF6E6" }, line: { color: "F2C879", width: 1 } });
  s.addText("Can we characterize the tip without solving every local detail?", { x: 0.92, y: 4.43, w: 3.75, h: 0.18, fontSize: 12.5, color: C.ink, bold: true, fontFace: "Arial", margin: 0 });
  s.addNotes(notesFor(3)); addFooter(s, 3);

  s = pres.addSlide(); s.background = { color: C.white };
  addTitle(s, "Rice's Core Move");
  s.addImage({ path: assets.core, x: 4.82, y: 1.18, w: 4.65, h: 2.62 });
  addBullets(s, ["Draw any valid contour around the tip", "Integrate stored energy and boundary work", "The value is the same: J1 = J2 = J3"], 0.72, 1.38, 3.95, 2.0);
  s.addText("Path independence is the central idea.", { x: 0.72, y: 4.26, w: 4.4, h: 0.28, fontSize: 15.5, color: C.blue, bold: true, fontFace: "Arial", margin: 0 });
  s.addNotes(notesFor(4)); addFooter(s, 4);

  s = pres.addSlide(); s.background = { color: C.pale };
  addTitle(s, "Intuitive Example", "How to read J");
  s.addImage({ path: assets.analogy, x: 0.7, y: 1.12, w: 8.85, h: 4.98 });
  s.addShape("rect", { x: 3.35, y: 4.86, w: 3.35, h: 0.42, fill: { color: C.white, transparency: 4 }, line: { color: C.line, width: 1 } });
  s.addText("Evaluate where convenient. Interpret where failure begins.", { x: 3.55, y: 4.98, w: 2.95, h: 0.18, fontSize: 11.4, color: C.ink, bold: true, fontFace: "Arial", align: "center", margin: 0 });
  s.addNotes(notesFor(5)); addFooter(s, 5);

  s = pres.addSlide(); s.background = { color: C.white };
  addTitle(s, "The Essential Equation");
  s.addImage({ path: assets.equation, x: 4.7, y: 1.26, w: 4.75, h: 2.67 });
  s.addText("J = ∫Γ ( W dy - T · ∂u/∂x ds )", { x: 0.7, y: 1.42, w: 4.1, h: 0.42, fontFace: "Courier New", fontSize: 17, bold: true, color: C.ink, margin: 0.02, fit: "shrink" });
  addBullets(s, ["W: strain energy density", "T: traction on the contour", "u: displacement field", "x: crack-extension direction"], 0.78, 2.18, 4.0, 1.9);
  s.addNotes(notesFor(6)); addFooter(s, 6);

  s = pres.addSlide(); s.background = { color: C.white };
  addTitle(s, "What J Connects");
  s.addImage({ path: assets.connects, x: 5.08, y: 1.12, w: 4.25, h: 2.39 });
  addBullets(s, ["Energy rate: J = -dP/da", "Small-scale yielding: J = (1 - ν²)K²/E", "Near-tip severity: averaged local deformation measure"], 0.72, 1.34, 4.25, 2.15);
  s.addText("Rice generalized classical fracture mechanics rather than replacing it.", { x: 0.72, y: 4.32, w: 8.2, h: 0.28, fontSize: 15, color: C.blue, bold: true, fontFace: "Arial", margin: 0 });
  s.addNotes(notesFor(7)); addFooter(s, 7);

  s = pres.addSlide(); s.background = { color: C.white };
  addTitle(s, "What Changed, and What It Does Not Solve");
  s.addImage({ path: assets.timeline, x: 0.72, y: 1.06, w: 8.8, h: 4.95 });
  s.addShape("rect", { x: 0.84, y: 4.52, w: 8.12, h: 0.46, fill: { color: "F8FAFC", transparency: 0 }, line: { color: C.line, width: 1 } });
  s.addText("Assumptions: 2D fields, no body forces, traction-free crack faces, deformation-theory material behavior.", { x: 1.04, y: 4.67, w: 7.72, h: 0.16, fontSize: 10.7, color: C.ink, fontFace: "Arial", margin: 0 });
  s.addNotes(notesFor(8)); addFooter(s, 8);

  s = pres.addSlide(); s.background = { color: C.pale };
  addTitle(s, "Final Takeaway");
  s.addImage({ path: assets.final, x: 5.05, y: 0.98, w: 4.45, h: 2.5 });
  addBullets(s, ["A hard local crack problem becomes a contour-energy measure", "Evaluate J where it is convenient", "Interpret J where failure begins"], 0.72, 1.45, 4.05, 1.85);
  s.addShape("rect", { x: 0.72, y: 4.12, w: 4.9, h: 0.52, fill: { color: C.ink }, line: { color: C.ink } });
  s.addText("That quantity is J.", { x: 0.98, y: 4.28, w: 4.3, h: 0.2, fontSize: 15, color: C.white, bold: true, fontFace: "Arial", align: "center", margin: 0 });
  s.addNotes(notesFor(9)); addFooter(s, 9);

  await pres.writeFile({ fileName: out });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
