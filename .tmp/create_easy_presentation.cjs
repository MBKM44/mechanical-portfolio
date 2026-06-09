const pptxgen = require("pptxgenjs");

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

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.defineLayout({ name: "LAYOUT_WIDE", width: 10, height: 5.625 });
pptx.author = "Codex";
pptx.company = "C:\\AI_Codex\\mechanical-portfolio";
pptx.subject = "Easy Rice 1968 J-integral presentation";
pptx.title = "Rice's J-Integral: A Simple Way to Measure Crack Danger";
pptx.theme = { headFontFace: "Arial", bodyFontFace: "Arial", lang: "en-US" };

function title(slide, t, k = "Rice 1968") {
  slide.addText(k, { x: 0.48, y: 0.25, w: 2.2, h: 0.2, fontFace: "Arial", fontSize: 8.5, bold: true, color: C.blue, margin: 0 });
  slide.addText(t, { x: 0.48, y: 0.48, w: 8.9, h: 0.45, fontFace: "Arial", fontSize: 22, bold: true, color: C.ink, margin: 0.02 });
  slide.addShape("line", { x: 0.48, y: 1.0, w: 8.65, h: 0, line: { color: C.line, width: 1.15 } });
}

function footer(slide, n) {
  slide.addText(`${n}/10`, { x: 9.0, y: 5.34, w: 0.55, h: 0.16, fontSize: 8, color: C.muted, fontFace: "Arial", align: "right", margin: 0 });
}

function bullets(slide, items, x, y, w, h, size = 15.2) {
  slide.addText(items.map(text => ({ text, options: { bullet: { type: "ul" }, hanging: 4, breakLine: true } })), {
    x, y, w, h, fontFace: "Arial", fontSize: size, color: C.ink, fit: "shrink",
    paraSpaceAfterPt: 8, valign: "top", margin: 0.02,
  });
}

function label(slide, text, x, y, w, color = C.muted, size = 10.5, bold = false, align = "center") {
  slide.addText(text, { x, y, w, h: 0.18, fontFace: "Arial", fontSize: size, color, bold, align, margin: 0 });
}

function crackPlate(slide, x, y, scale = 1, opts = {}) {
  const s = scale;
  slide.addShape("rect", { x, y, w: 3.9*s, h: 1.85*s, fill: { color: C.white }, line: { color: C.line, width: 1.1 } });
  slide.addShape("line", { x: x+0.28*s, y: y+0.92*s, w: 1.72*s, h: 0, line: { color: C.ink, width: 3.3 } });
  slide.addShape("ellipse", { x: x+1.86*s, y: y+0.82*s, w: 0.22*s, h: 0.22*s, fill: { color: C.ink }, line: { color: C.ink } });
  if (opts.zone) slide.addShape("ellipse", { x: x+1.60*s, y: y+0.62*s, w: 0.75*s, h: 0.58*s, fill: { color: opts.zone, transparency: 65 }, line: { color: opts.zone, width: 1.3 } });
  if (opts.contours) {
    slide.addShape("ellipse", { x: x+1.54*s, y: y+0.55*s, w: 0.9*s, h: 0.7*s, fill: { color: C.white, transparency: 100 }, line: { color: C.amber, width: 1.8 } });
    slide.addShape("ellipse", { x: x+1.26*s, y: y+0.36*s, w: 1.48*s, h: 1.08*s, fill: { color: C.white, transparency: 100 }, line: { color: C.blue, width: 1.6 } });
    slide.addShape("ellipse", { x: x+0.94*s, y: y+0.18*s, w: 2.05*s, h: 1.42*s, fill: { color: C.white, transparency: 100 }, line: { color: C.blue2, width: 1.35, dash: "dash" } });
  }
  if (opts.load) {
    [0.78, 1.8, 2.82].forEach(px => {
      slide.addShape("downArrow", { x: x+px*s, y: y-0.45*s, w: 0.18*s, h: 0.32*s, fill: { color: C.blue }, line: { color: C.blue } });
      slide.addShape("upArrow", { x: x+px*s, y: y+1.98*s, w: 0.18*s, h: 0.32*s, fill: { color: C.blue }, line: { color: C.blue } });
    });
  }
}

function gauge(slide, x, y, value = 0.55, labelText = "J") {
  slide.addShape("line", { x, y, w: 2.65, h: 0, line: { color: C.line, width: 6 } });
  slide.addShape("line", { x, y, w: 2.65*value, h: 0, line: { color: value > 0.72 ? C.red : value > 0.45 ? C.amber : C.green, width: 6 } });
  slide.addShape("ellipse", { x: x+2.65*value-0.09, y: y-0.09, w: 0.18, h: 0.18, fill: { color: C.ink }, line: { color: C.ink } });
  label(slide, "low", x-0.05, y+0.22, 0.35, C.muted, 9, false, "left");
  label(slide, "high", x+2.25, y+0.22, 0.45, C.muted, 9, false, "right");
  label(slide, labelText, x+1.06, y-0.45, 0.55, C.ink, 13, true);
}

const notes = [
`Let us start with a simple engineering picture. Imagine a loaded metal component with a small crack. The crack may look small compared with the full part, but the important location is the crack tip. That is where the smooth load in the structure becomes highly concentrated deformation. This presentation is about Rice's 1968 paper, which introduced the J-integral. The main idea is that we can measure the danger of the crack tip using a contour around it, instead of trying to know every microscopic detail at the tip from the beginning.`,
`Far away from the crack, the loading can look simple. Maybe the part is pulled in tension, bent by a moment, or pressurized. Near the crack tip, the situation changes. Stress and strain concentrate in a small region. In metals, this region may even yield plastically while the rest of the component still looks mostly elastic. That is why fracture mechanics focuses so much on the crack tip.`,
`Before we get to Rice's idea, here is the difficulty. As engineers, we often know the far-field information: the load, the approximate geometry, and the material. What we really need is the crack-tip severity. But calculating the exact local stress and strain field near a crack can be very difficult, especially when plasticity occurs. Rice's paper asks whether we can characterize the crack tip without solving the full local field every time.`,
`Rice's answer is to draw a contour around the crack tip. The contour can be close to the tip, or farther away. It can be a small loop or a larger loop. The key result is that a particular integral around that contour has the same value for every valid path. That value is called J. In this picture, J one, J two, and J three are all the same. This is the heart of Rice's 1968 paper.`,
`In plain language, J measures the energy available to drive the crack forward. It is important that J is not just the stress at the crack tip. For a sharp crack, the stress at the mathematical tip can become singular, so asking for one stress value exactly at the tip is not the best engineering question. J asks a more useful question: how much mechanical driving force is available around this crack tip?`,
`This is the only equation I want to show. J is a contour integral of W dy minus T dot du by dx times ds. W is the stored strain energy density. T is the traction acting on the contour. u is displacement, and x is the crack-extension direction. The powerful part is not only the formula. The powerful part is that, under Rice's assumptions, the answer does not depend on which contour we choose.`,
`Here is a simple illustrative case study. Imagine a steel bracket with a bolt hole. A small crack is found near the hole, where stress concentration is already expected. First, identify the crack size and loading. Second, calculate J around the crack tip. Then compare the applied J with the material's crack resistance, often written as Jc. The important point is that J turns the crack problem into a comparison between demand and resistance.`,
`Now consider a welded pipe or pressure vessel wall. Welded regions often have geometric changes, residual stresses, and material changes. If a crack forms near the weld, the crack tip may experience local yielding before the whole wall is close to collapse. This is the kind of situation where a purely linear elastic view may be too limited. The J-integral can represent the crack-driving force in a nonlinear response, within the assumptions of the method.`,
`Historically, fracture mechanics already had major ideas from Griffith and Irwin. Those ideas worked very well for linear elastic fracture mechanics. Rice's 1968 paper gave the field a way to move into nonlinear crack behavior. The J-integral connected energy release, crack-tip deformation, and elastic-plastic fracture characterization. Later work by Hutchinson, Rice, and Rosengren showed how J controls crack-tip fields in hardening materials.`,
`The final takeaway is simple. A crack tip is hard to analyze directly, especially when plasticity appears. Rice's J-integral gives us a contour-based energy measure of crack danger. We draw a contour around the crack tip, calculate one crack-driving quantity, and compare it with the material's resistance. Rice's idea turns crack-tip danger into something measurable, comparable, and useful for engineering decisions.`,
];

let slide;

slide = pptx.addSlide(); slide.background = { color: C.pale };
title(slide, "Start With a Crack", "Non-specialist starting point");
bullets(slide, ["A component is loaded", "A small crack exists", "Failure starts at the crack tip"], 0.72, 1.42, 3.6, 1.55, 16);
crackPlate(slide, 5.2, 1.55, 1.0, { load: true, zone: C.red });
slide.addShape("ellipse", { x: 7.02, y: 2.08, w: 1.18, h: 0.82, fill: { color: C.white }, line: { color: C.blue, width: 1.5 } });
slide.addShape("line", { x: 7.20, y: 2.50, w: 0.62, h: 0, line: { color: C.ink, width: 2 } });
slide.addShape("ellipse", { x: 7.77, y: 2.43, w: 0.2, h: 0.14, fill: { color: C.red, transparency: 45 }, line: { color: C.red } });
label(slide, "zoom: crack tip", 7.0, 3.05, 1.3, C.blue, 11, true);
slide.addNotes(notes[0]); footer(slide, 1);

slide = pptx.addSlide(); slide.background = { color: C.white };
title(slide, "Why the Tip Is the Problem");
bullets(slide, ["Far away: loading looks simple", "Near the tip: deformation concentrates", "Local yielding may begin first"], 0.72, 1.36, 3.85, 1.8, 15.5);
crackPlate(slide, 5.08, 1.42, 1.03, { load: true, zone: C.amber });
slide.addShape("ellipse", { x: 6.62, y: 2.10, w: 0.95, h: 0.62, fill: { color: C.red, transparency: 70 }, line: { color: C.red, width: 1.4 } });
label(slide, "high strain zone", 6.45, 3.33, 1.45, C.red, 11.5, true);
slide.addShape("line", { x: 6.85, y: 3.12, w: 0.20, h: -0.42, line: { color: C.red, width: 1.2 } });
slide.addNotes(notes[1]); footer(slide, 2);

slide = pptx.addSlide(); slide.background = { color: C.pale };
title(slide, "The Old Difficulty");
const boxes = [
  ["Known", "load + geometry", C.blue],
  ["Hard", "local crack-tip field", C.red],
  ["Needed", "safety decision", C.green],
];
boxes.forEach((b, i) => {
  const x = 0.86 + i * 3.0;
  slide.addShape("rect", { x, y: 2.0, w: 2.15, h: 1.15, fill: { color: C.white }, line: { color: b[2], width: 1.5 } });
  label(slide, b[0], x+0.12, 2.28, 1.9, b[2], 17, true);
  label(slide, b[1], x+0.12, 2.68, 1.9, C.muted, 11.5);
  if (i < 2) slide.addShape("rightArrow", { x: x+2.34, y: 2.35, w: 0.35, h: 0.38, fill: { color: C.amber }, line: { color: C.amber } });
});
slide.addText("Rice's question: can we avoid solving every local detail?", { x: 1.45, y: 4.28, w: 7.1, h: 0.32, fontFace: "Arial", fontSize: 16, color: C.ink, bold: true, align: "center", margin: 0 });
slide.addNotes(notes[2]); footer(slide, 3);

slide = pptx.addSlide(); slide.background = { color: C.white };
title(slide, "Rice's Simple Picture");
bullets(slide, ["Draw a contour around the tip", "Calculate J", "Every valid path gives the same value"], 0.72, 1.36, 3.75, 1.65, 15.5);
crackPlate(slide, 5.0, 1.35, 1.05, { load: false, contours: true });
slide.addText("J1 = J2 = J3", { x: 5.42, y: 4.18, w: 2.95, h: 0.32, fontFace: "Arial", fontSize: 18, color: C.ink, bold: true, align: "center", margin: 0 });
slide.addNotes(notes[3]); footer(slide, 4);

slide = pptx.addSlide(); slide.background = { color: C.white };
title(slide, "What J Means in Plain Language");
bullets(slide, ["J is crack-driving energy", "It is not one stress value at the tip", "Higher J means stronger drive for crack growth"], 0.72, 1.34, 4.0, 1.9, 15.5);
crackPlate(slide, 5.35, 1.28, 0.95, { load: false, zone: C.amber });
slide.addShape("rightArrow", { x: 5.02, y: 2.06, w: 0.48, h: 0.3, fill: { color: C.amber }, line: { color: C.amber } });
slide.addShape("rightArrow", { x: 5.02, y: 2.54, w: 0.48, h: 0.3, fill: { color: C.amber }, line: { color: C.amber } });
label(slide, "energy into crack tip", 5.02, 3.65, 2.35, C.amber, 11.5, true);
gauge(slide, 6.2, 4.38, 0.68, "J gauge");
slide.addNotes(notes[4]); footer(slide, 5);

slide = pptx.addSlide(); slide.background = { color: C.pale };
title(slide, "The Only Equation We Need");
slide.addShape("rect", { x: 0.74, y: 1.35, w: 4.6, h: 0.72, fill: { color: C.white }, line: { color: C.line, width: 1.2 } });
slide.addText("J = contour integral ( W dy - T . du/dx ds )", { x: 0.95, y: 1.60, w: 4.15, h: 0.22, fontFace: "Courier New", fontSize: 13.8, bold: true, color: C.ink, margin: 0, fit: "shrink" });
bullets(slide, ["W: stored strain energy density", "T: traction on the contour", "u: displacement field"], 0.88, 2.40, 4.0, 1.2, 14.5);
crackPlate(slide, 6.0, 1.55, 0.78, { contours: true });
slide.addShape("line", { x: 6.65, y: 3.36, w: -0.65, h: 0.47, line: { color: C.amber, width: 1.3 } });
label(slide, "contour around tip", 5.44, 3.88, 1.45, C.amber, 11, true);
slide.addNotes(notes[5]); footer(slide, 6);

slide = pptx.addSlide(); slide.background = { color: C.white };
title(slide, "Case Study 1: Cracked Steel Bracket", "Illustrative engineering case");
bullets(slide, ["Identify crack and load", "Calculate J around the tip", "Compare with material resistance Jc", "Decide: monitor, repair, or redesign"], 0.72, 1.32, 3.9, 2.0, 14.5);
slide.addShape("rect", { x: 5.15, y: 1.35, w: 2.6, h: 2.25, fill: { color: C.white }, line: { color: C.line, width: 1.2 } });
slide.addShape("ellipse", { x: 5.95, y: 2.0, w: 0.65, h: 0.65, fill: { color: C.pale }, line: { color: C.blue, width: 1.4 } });
slide.addShape("line", { x: 6.52, y: 2.33, w: 0.72, h: 0, line: { color: C.ink, width: 2.4 } });
slide.addShape("ellipse", { x: 7.02, y: 2.11, w: 0.52, h: 0.42, fill: { color: C.white, transparency: 100 }, line: { color: C.amber, width: 1.5 } });
label(slide, "bolt hole", 5.78, 2.82, 0.95, C.blue, 10.5, true);
label(slide, "crack + contour", 6.78, 2.82, 1.2, C.amber, 10.5, true);
gauge(slide, 6.0, 4.22, 0.58, "applied J vs Jc");
slide.addNotes(notes[6]); footer(slide, 7);

slide = pptx.addSlide(); slide.background = { color: C.white };
title(slide, "Case Study 2: Welded Pipe Crack", "Illustrative engineering case");
bullets(slide, ["Weld region raises local severity", "Crack tip may yield locally", "J handles nonlinear crack-driving force"], 0.72, 1.34, 3.9, 1.65, 14.8);
slide.addShape("arc", { x: 5.35, y: 1.5, w: 2.8, h: 2.8, adjustPoint: 0.35, fill: { color: C.white, transparency: 100 }, line: { color: C.ink, width: 2.3 } });
slide.addShape("arc", { x: 5.75, y: 1.9, w: 2.0, h: 2.0, adjustPoint: 0.35, fill: { color: C.white, transparency: 100 }, line: { color: C.line, width: 2.3 } });
slide.addShape("rect", { x: 6.55, y: 1.64, w: 0.22, h: 2.55, fill: { color: "E8EEF5" }, line: { color: C.blue2, width: 1 } });
slide.addShape("line", { x: 6.66, y: 2.55, w: 0.75, h: 0.0, line: { color: C.ink, width: 2.2 } });
slide.addShape("ellipse", { x: 7.18, y: 2.34, w: 0.5, h: 0.38, fill: { color: C.white, transparency: 100 }, line: { color: C.amber, width: 1.5 } });
slide.addShape("rightArrow", { x: 4.93, y: 2.35, w: 0.35, h: 0.30, fill: { color: C.blue }, line: { color: C.blue } });
slide.addShape("leftArrow", { x: 8.25, y: 2.35, w: 0.35, h: 0.30, fill: { color: C.blue }, line: { color: C.blue } });
label(slide, "pressure / service load", 5.30, 4.25, 2.9, C.blue, 11, true);
label(slide, "weld", 6.25, 1.28, 0.9, C.blue2, 11, true);
label(slide, "crack contour", 7.0, 2.88, 1.2, C.amber, 10.5, true);
slide.addNotes(notes[7]); footer(slide, 8);

slide = pptx.addSlide(); slide.background = { color: C.pale };
title(slide, "What Rice Changed");
const xs = [1.05, 3.55, 6.05, 8.25];
const labs = [["Griffith / Irwin", "linear energy ideas", C.ink], ["Rice 1968", "path-independent J", C.blue], ["HRR fields", "J-controlled tip fields", C.amber], ["Testing", "elastic-plastic fracture", C.green]];
slide.addShape("line", { x: 1.45, y: 2.8, w: 6.9, h: 0, line: { color: C.line, width: 4 } });
labs.forEach((l, i) => {
  slide.addShape("ellipse", { x: xs[i], y: 2.55, w: 0.5, h: 0.5, fill: { color: l[2] }, line: { color: l[2] } });
  label(slide, l[0], xs[i]-0.45, 2.08, 1.4, l[2], 12, true);
  label(slide, l[1], xs[i]-0.55, 3.22, 1.65, C.muted, 9.5);
});
slide.addNotes(notes[8]); footer(slide, 9);

slide = pptx.addSlide(); slide.background = { color: C.white };
title(slide, "Final Takeaway");
const flow = [["load + crack", C.blue], ["J", C.amber], ["decision", C.green]];
flow.forEach((f, i) => {
  const x = 1.15 + i * 3.05;
  slide.addShape("rect", { x, y: 2.02, w: 1.85, h: 1.0, fill: { color: C.white }, line: { color: f[1], width: 1.6 } });
  label(slide, f[0], x+0.2, 2.42, 1.45, f[1], 17, true);
  if (i < 2) slide.addShape("rightArrow", { x: x+2.15, y: 2.30, w: 0.45, h: 0.42, fill: { color: C.ink }, line: { color: C.ink } });
});
slide.addShape("rect", { x: 1.65, y: 4.25, w: 6.7, h: 0.48, fill: { color: C.ink }, line: { color: C.ink } });
slide.addText("Rice's idea turns crack-tip danger into a measurable energy quantity.", { x: 1.9, y: 4.40, w: 6.2, h: 0.16, fontFace: "Arial", fontSize: 12.5, color: C.white, bold: true, align: "center", margin: 0 });
slide.addNotes(notes[9]); footer(slide, 10);

pptx.writeFile({ fileName: "seminal_paper_presentation_easy.pptx" });
