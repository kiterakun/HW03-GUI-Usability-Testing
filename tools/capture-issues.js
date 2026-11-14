// Capture full-page screenshots of GitHub Issues for the HW03 bug report.
// Usage: node capture-issues.js <outDir> [maxIssues]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const outDir = process.argv[2] || 'Submit/bug_report/screenshots';
  const max = parseInt(process.argv[3] || '23', 10);
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1600 },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();

  for (let n = 1; n <= max; n++) {
    const url = `https://github.com/kiterakun/HW03-GUI-Usability-Testing/issues/${n}`;
    const file = path.join(outDir, `github-issue-${String(n).padStart(2, '0')}.png`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForTimeout(1500);
      // force lazy-loaded images to load
      await page.evaluate(async () => {
        const imgs = Array.from(document.images);
        imgs.forEach((i) => { if (!i.complete) i.loading = 'eager'; });
        await Promise.all(
          imgs.map((i) => (i.complete ? Promise.resolve() : new Promise((r) => { i.onload = i.onerror = r; })))
        );
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 1200));
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(800);

      // Prefer an element screenshot of the issue body (title + body + attachments)
      const sels = [
        'div[data-testid="issue-viewer-outer-box"]',
        'div.js-issue-title',
        'div.js-comment-container',
        '#partial-discussion-header',
        'main',
      ];
      let shot = false;
      for (const sel of sels) {
        const loc = page.locator(sel).first();
        if ((await loc.count()) > 0) {
          try {
            await loc.screenshot({ path: file });
            shot = true;
            break;
          } catch (e) { /* try next */ }
        }
      }
      if (!shot) await page.screenshot({ path: file, fullPage: true });

      const st = fs.statSync(file);
      console.log(`OK  ${url} -> ${file} (${Math.round(st.size / 1024)} KB)`);
    } catch (e) {
      console.log(`ERR ${url}: ${e.message}`);
    }
  }

  await browser.close();
})();
