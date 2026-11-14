#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Tien ich dung chung cho cac bo sinh bao cao."""


def escape_outside_code(text):
    """Escape ky tu '<' nam NGOAI code span (backtick) thanh '&lt;'.

    Ly do: python-markdown giu nguyen raw HTML trong o text; cac the HTML
    nhu <h1>, <title> gay sai lenh parse cua trinh duyet (raw-text element)
    va lam anh / bang bi mo nhat trong HTML -> PDF.
    """
    if not text:
        return text
    parts = text.split("`")
    for i in range(0, len(parts), 2):          # chi so chan = ngoai code span
        parts[i] = parts[i].replace("<", "&lt;")
    return "`".join(parts)


def escape_document(md_text):
    """Escape '<' toan bo tai lieu (ngoai code span) truoc khi render."""
    out = []
    in_fence = False
    for line in md_text.split("\n"):
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            out.append(line)
            continue
        if in_fence:
            out.append(line)
            continue
        out.append(escape_outside_code(line))
    return "\n".join(out)
