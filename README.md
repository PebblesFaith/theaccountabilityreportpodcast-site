# The Accountability Report Podcast Website

Official website repository for **The Accountability Report Podcast**, hosted by **Sarai Hannah Ajai**.

The Accountability Report Podcast is a public-interest investigative podcast focused on fraud awareness, identity theft documentation, digital misuse, consumer protection concerns, online impersonation issues, intellectual property misuse, documentation review, and accountability reporting.

The website serves as the official online presence for the podcast, including public information about the show, episode listings, written reports or case-file summaries, future podcast platform links, contact information, policy notices, and legally careful public-interest documentation.

## Live Website

Primary production domain:

**https://theaccountabilityreportpodcast.com**

Secondary related domain:

**https://accountabilityreportpodcast.com**

The production website is deployed through **GitHub Pages** with the publishing source set to:

```txt
main / docs
```

## Current Production Status

The website is currently live, deployed, and production-polished.

Completed public pages:

* Home
* About
* Episodes
* Reports
* Submit a Tip
* Contact
* Disclaimer
* Privacy Policy
* Editorial Policy
* Corrections Policy

Completed deployment and production polish:

* GitHub Pages deployment
* IONOS DNS configuration
* HTTPS verification
* Custom domain connection
* Static EJS export workflow
* Favicon and browser tab branding
* Header microphone brand icon refinement
* `robots.txt`
* `sitemap.xml`
* Canonical URLs
* Open Graph metadata
* Twitter/X card metadata
* Social sharing preview image
* Static public pages under `docs/`

## Technology Stack

The source website is built with:

* Node.js
* Express
* EJS templates
* JavaScript
* CSS

The deployed GitHub Pages version is generated as static HTML, CSS, JavaScript, image assets, favicon assets, metadata, `robots.txt`, and `sitemap.xml` under the `docs/` folder.

## Local Development

Install dependencies:

```bash
npm install
```

Run the local Express development server:

```bash
npm run dev
```

Run syntax checks:

```bash
npm run check
```

Generate favicon assets:

```bash
npm run favicons
```

Export the static GitHub Pages version:

```bash
npm run export
```

Preview the static export locally:

```bash
python3 -m http.server 8080 --directory docs
```

Then open:

```txt
http://localhost:8080
```

## Static Export Workflow

Source files are maintained in:

```txt
views/
public/
routes/
scripts/
```

Static deployment files are generated into:

```txt
docs/
```

Important rule:

Do not manually edit generated files inside `docs/` unless there is a specific emergency fix. Most changes should be made in the source files under `views/`, `public/`, or `scripts/`, then regenerated with:

```bash
npm run export
```

The `public/CNAME` file preserves the GitHub Pages custom domain during static export. The exported copy appears at:

```txt
docs/CNAME
```

## Branding Assets

The favicon and browser tab branding use a microphone icon with the project color palette:

```txt
Background: #0e2036
Microphone: #c69e58
```

Master favicon artwork is stored under:

```txt
public/images/branding/
```

Generated favicon and app icon files are stored under:

```txt
public/
```

and copied into:

```txt
docs/
```

during static export.

The Open Graph and social sharing preview image is stored at:

```txt
public/images/branding/accountability-report-social-card.png
```

and exported to:

```txt
docs/images/branding/accountability-report-social-card.png
```

Live production social preview image:

```txt
https://theaccountabilityreportpodcast.com/images/branding/accountability-report-social-card.png
```

## SEO and Sharing Files

The website includes:

```txt
public/robots.txt
public/sitemap.xml
```

which export to:

```txt
docs/robots.txt
docs/sitemap.xml
```

Live production URLs:

```txt
https://theaccountabilityreportpodcast.com/robots.txt
https://theaccountabilityreportpodcast.com/sitemap.xml
```

The shared header partial includes:

* canonical URL support
* Open Graph title, description, URL, and image metadata
* Twitter/X card metadata
* favicon links
* theme color metadata

## Submit a Tip Status

The **Submit a Tip** page is currently a public inactive preview.

Current status:

* Text fields are shown for design and workflow preview.
* Online submissions are not active yet.
* File uploads are disabled.
* No form data is currently submitted or stored.
* No database or Google Sheet intake is connected yet.

A future Phase 1 intake workflow may use:

```txt
GitHub Pages form
→ Google Apps Script Web App
→ Private Google Sheet
```

This future workflow should remain text-only at first and should not request or collect sensitive identifiers, confidential documents, passwords, Social Security numbers, full account numbers, medical records, or uploaded evidence files.

Submit a Tip activation should not occur until the following are finalized:

* Privacy language
* Consent checkbox language
* Prohibited-information warning
* Google Sheet column structure
* Google Apps Script endpoint
* Spam protection approach
* Test submission process
* Review procedure
* Retention procedure

## Recommended Pre-Commit Checklist

Before committing production website changes:

```bash
npm run check
node --check scripts/exportStaticSite.js
node --check scripts/generateFavicons.js
npm run export
git status --short --branch
```

For local static preview:

```bash
python3 -m http.server 8080 --directory docs
```

After previewing, stop the server with:

```txt
Control + C
```

## Planned Future Work

Planned production improvements:

* Secondary domain redirect review
* README maintenance as new deployment steps are added
* Future podcast platform links
* Future episode listing updates
* Future reports/case-file summaries
* Future text-only Submit a Tip intake workflow
* Later secure backend/database workflow if traffic or sensitivity increases

## Design Direction

The visual direction is based on a professional editorial style originally explored with Lovable AI as a design reference. The production implementation is maintained separately in the Node.js, Express, EJS, JavaScript, and CSS stack for direct control, maintainability, and consistency with the developer’s workflow.

## Repository Notes

This repository contains the website source code, static export scripts, generated GitHub Pages output, public assets, favicon branding, social preview branding, metadata, search discovery files, and policy pages for The Accountability Report Podcast.

Sensitive local files such as `.env` should remain ignored and must not be committed.
