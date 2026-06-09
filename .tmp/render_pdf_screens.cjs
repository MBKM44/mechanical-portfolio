const fs = require("fs");
const http = require("http");
const path = require("path");
const sharp = require("sharp");
const { chromium } = require("playwright");

const root = process.cwd();
const deckName = process.argv[2] || "seminal_paper_presentation";
const pdfPath = path.join(root, ".tmp", "rendered", `${deckName}.pdf`);
const outDir = path.join(root, ".tmp", `${deckName}_screens`);
const pdfjsRoot = "C:/Users/Mbkm44/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdfjs-dist/build";
fs.mkdirSync(outDir, { recursive: true });

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    html, body { margin: 0; background: #d7dce4; font-family: Arial, sans-serif; }
    .page { margin: 20px auto; width: fit-content; background: white; box-shadow: 0 4px 18px rgba(31,41,51,.25); }
    canvas { display: block; }
  </style>
</head>
<body>
  <div id="pages"></div>
  <script type="module">
    import * as pdfjsLib from "/pdfjs/pdf.mjs";
    pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.mjs";
    const pdf = await pdfjsLib.getDocument("/deck.pdf").promise;
    window.pageCount = pdf.numPages;
    for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
      const page = await pdf.getPage(pageNo);
      const viewport = page.getViewport({ scale: 1.5 });
      const wrap = document.createElement("div");
      wrap.className = "page";
      wrap.id = "page-" + pageNo;
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      wrap.appendChild(canvas);
      document.getElementById("pages").appendChild(wrap);
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    }
    window.renderDone = true;
  </script>
</body>
</html>`;

function send(res, code, type, body) {
  res.writeHead(code, { "Content-Type": type });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/") return send(res, 200, "text/html", html);
  if (url.pathname === "/deck.pdf") return send(res, 200, "application/pdf", fs.readFileSync(pdfPath));
  if (url.pathname === "/pdfjs/pdf.mjs") return send(res, 200, "text/javascript", fs.readFileSync(path.join(pdfjsRoot, "pdf.mjs")));
  if (url.pathname === "/pdfjs/pdf.worker.mjs") return send(res, 200, "text/javascript", fs.readFileSync(path.join(pdfjsRoot, "pdf.worker.mjs")));
  send(res, 404, "text/plain", "not found");
});

async function main() {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const port = server.address().port;
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1500, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: "networkidle" });
  await page.waitForFunction("window.renderDone === true", null, { timeout: 30000 });
  const count = await page.evaluate("window.pageCount");
  const files = [];
  for (let i = 1; i <= count; i++) {
    const file = path.join(outDir, `slide_${String(i).padStart(2, "0")}.png`);
    await page.locator(`#page-${i} canvas`).screenshot({ path: file });
    files.push(file);
  }
  await browser.close();
  server.close();

  const thumbs = await Promise.all(files.map(async file => {
    const img = sharp(file);
    const meta = await img.metadata();
    const width = 360;
    const height = Math.round(meta.height * width / meta.width);
    return await img.resize(width, height).extend({
      top: 32, bottom: 8, left: 0, right: 0,
      background: { r: 245, g: 247, b: 250, alpha: 1 }
    }).composite([{
      input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="32"><text x="12" y="22" font-family="Arial" font-size="18" font-weight="700" fill="#1F2933">${path.basename(file, ".png").replace("_", " ")}</text></svg>`),
      top: 0, left: 0
    }]).png().toBuffer();
  }));
  const meta0 = await sharp(thumbs[0]).metadata();
  const cols = 3, gap = 18;
  const rows = Math.ceil(thumbs.length / cols);
  const gridW = cols * meta0.width + (cols + 1) * gap;
  const gridH = rows * meta0.height + (rows + 1) * gap;
  const comps = thumbs.map((buf, idx) => ({
    input: buf,
    left: gap + (idx % cols) * (meta0.width + gap),
    top: gap + Math.floor(idx / cols) * (meta0.height + gap),
  }));
  const grid = path.join(outDir, "thumbnail_grid.png");
  await sharp({ create: { width: gridW, height: gridH, channels: 4, background: "#E5EAF1" } })
    .composite(comps)
    .png()
    .toFile(grid);
  console.log(JSON.stringify({ count, grid, files }, null, 2));
}

main().catch(err => {
  server.close();
  console.error(err);
  process.exit(1);
});
