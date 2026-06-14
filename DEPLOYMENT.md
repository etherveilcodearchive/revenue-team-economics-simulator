# Deployment Guide

This repository deploys to Cloudflare Pages as a static site.

## Cloudflare Pages settings

Use the following settings:

```text
Framework preset: None
Build command: blank
Build output directory: public
Production branch: main
```

## Deployment flow

```text
Commit to main
  ↓
Cloudflare Pages detects new commit
  ↓
Cloudflare deploys contents of /public
  ↓
Live product updates
```

## Current product URLs

Add the Cloudflare Pages production URL here once confirmed.

```text
Production URL: TBD
Preview URL: TBD
```

## Local preview

For a basic local preview, open `public/index.html` directly in a browser.

For a simple local server:

```bash
cd public
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Release discipline

- Every meaningful product change should be committed to GitHub.
- `main` should represent the deployable version.
- Major changes should be documented in `CHANGELOG.md`.
- Simulator assumptions should be documented before public sale.
