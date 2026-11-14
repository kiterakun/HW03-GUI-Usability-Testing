#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Markdown -> HTML -> PDF (Playwright/Chromium)."""
import io, os, re, sys, subprocess, json, pathlib
import markdown
import sys as _sys
_sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from mdutil import escape_document

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CSS = """
@page { size: A4; margin: 16mm 12mm 18mm 12mm; }
* { box-sizing: border-box; }
body {
  font-family: "Segoe UI", "Noto Sans", Arial, sans-serif;
  font-size: 10pt; line-height: 1.55; color: #1f2328; background: #fff;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
h1 { font-size: 20pt; color: #0b3d63; border-bottom: 3px solid #0b3d63; padding-bottom: 6px; margin: 0 0 14px; }
h2 { font-size: 15pt; color: #0b3d63; border-bottom: 1.5px solid #9fc5de; padding-bottom: 4px; margin: 26px 0 10px; page-break-after: avoid; }
h3 { font-size: 12.5pt; color: #14507f; margin: 18px 0 7px; page-break-after: avoid; }
h4 { font-size: 11pt; color: #2b5f86; margin: 14px 0 6px; page-break-after: avoid; }
p { margin: 0 0 8px; text-align: justify; }
ul, ol { margin: 0 0 9px; padding-left: 22px; }
li { margin: 2px 0; }
blockquote {
  margin: 10px 0; padding: 8px 14px; background: #f2f7fb;
  border-left: 4px solid #2b7fb8; color: #26333d; page-break-inside: avoid;
}
blockquote p:last-child { margin-bottom: 0; }
table {
  border-collapse: collapse; width: 100%; margin: 9px 0 14px;
  font-size: 8.2pt; line-height: 1.38; page-break-inside: auto;
}
thead { display: table-header-group; }
tr { page-break-inside: avoid; }
th {
  background: #0b3d63; color: #fff; font-weight: 600; text-align: left;
  padding: 5px 6px; border: 1px solid #0b3d63; vertical-align: top;
}
td { padding: 4px 6px; border: 1px solid #c9d6e0; vertical-align: top; }
tbody tr:nth-child(even) { background: #f6f9fc; }
code {
  font-family: "Cascadia Mono", Consolas, monospace; font-size: 8.4pt;
  background: #eef2f6; padding: 1px 3px; border-radius: 3px; color: #0b3d63;
}
pre {
  background: #f5f7fa; border: 1px solid #d8e0e8; border-radius: 4px;
  padding: 8px 10px; overflow-x: auto; font-size: 8pt; page-break-inside: avoid;
}
pre code { background: none; padding: 0; }
img { max-width: 100%; max-height: 112mm; width: auto; height: auto; border: 1px solid #ccd6de; border-radius: 3px; margin: 6px auto 2px; display: block; }
a { color: #0b64a0; text-decoration: none; }
hr { border: 0; border-top: 1px solid #d8e0e8; margin: 20px 0; }
strong { color: #10222e; }
.pagebreak { page-break-after: always; }
"""


def md_to_html(md_path, out_html):
    d = os.path.dirname(os.path.abspath(md_path))
    txt = escape_document(io.open(md_path, encoding="utf-8").read())

    # Resolve relative image paths to absolute file:// URIs
    def fix_img(m):
        src = m.group(2)
        if src.startswith(("http://", "https://", "data:")):
            return m.group(0)
        p = os.path.normpath(os.path.join(d, src))
        if os.path.exists(p):
            return '%s%s%s' % (m.group(1), pathlib.Path(p).as_uri(), m.group(3))
        return m.group(0)

    txt = re.sub(r'(!\[[^\]]*\]\()([^)]+)(\))', fix_img, txt)

    body = markdown.markdown(
        txt,
        extensions=["tables", "fenced_code", "sane_lists", "attr_list", "toc", "md_in_html"],
        output_format="html5",
    )

    title = re.search(r"^#\s+(.+)$", txt, re.M)
    title = title.group(1) if title else os.path.basename(md_path)

    html = (
        "<!DOCTYPE html><html lang='vi'><head><meta charset='utf-8'>"
        "<title>%s</title><style>%s</style></head><body>%s</body></html>"
        % (title, CSS, body)
    )
    io.open(out_html, "w", encoding="utf-8").write(html)
    return out_html


def html_to_pdf(html_path, pdf_path):
    js = r"""
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const html = process.argv[2], pdf = process.argv[3];
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///' + path.resolve(html).replace(/\\/g, '/'), { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(i => i.complete ? Promise.resolve() : new Promise(r => { i.onload = i.onerror = r; })));
  });
  await page.pdf({
    path: pdf, format: 'A4', printBackground: true,
    margin: { top: '14mm', bottom: '16mm', left: '11mm', right: '11mm' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: '<div style="width:100%;font-size:8px;color:#6b7b8a;padding:0 12mm;display:flex;justify-content:space-between;"><span>HW03-AI — GUI &amp; Usability Testing · 23120341</span><span class="pageNumber"></span>/<span class="totalPages"></span></div>',
  });
  await browser.close();
})();
"""
    js_path = os.path.join(BASE, "tools", "_md2pdf.js")
    io.open(js_path, "w", encoding="utf-8").write(js)
    env = dict(os.environ)
    import shutil
    npm = shutil.which("npm.cmd") or shutil.which("npm")
    if npm:
        try:
            root = subprocess.check_output([npm, "root", "-g"], text=True).strip()
            env["NODE_PATH"] = root
        except Exception:
            pass
    if not env.get("NODE_PATH"):
        env["NODE_PATH"] = os.path.join(os.path.expanduser("~"), "AppData", "Roaming", "npm", "node_modules")
    subprocess.check_call(["node", js_path, html_path, pdf_path], env=env)
    return pdf_path


if __name__ == "__main__":
    md = sys.argv[1]
    pdf = sys.argv[2]
    html = os.path.join(BASE, "tools", "_tmp_render.html")
    md_to_html(md, html)
    html_to_pdf(html, pdf)
    print("PDF ->", pdf, os.path.getsize(pdf), "bytes")
