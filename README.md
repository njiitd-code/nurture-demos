# Nurture drone-in-a-box demos

Three interactive pages, one per customer. Each page is a presentation first (problem, concept, equipment, use cases, autonomy with a human in the loop) and then a live control-room demo on a real satellite map of Nashik.

| Path | Customer | Demo missions |
|---|---|---|
| `/kumbh` | Nashik–Trimbakeshwar Simhastha 2027 | Amrit Snan dawn patrol, Sadhugram night fire watch, lost child and medical help |
| `/police` | Police department | 112 call first responder, night beat patrol, procession to Ramkund |
| `/water` | Water department | River water quality, Gangapur Dam inspection, canal patrol |

`/poole` redirects to `/police` (see `vercel.json`). `/` is a small landing page with links to the three.

## Deploy on Vercel

1. In Vercel, choose **Add New → Project** and import this repository.
2. Framework preset: **Other**. Leave the build command and output directory empty. The site is static and already built.
3. Deploy. The pages are served at `/kumbh`, `/police` and `/water`.

Nothing needs a server or an API key. At view time the pages load only Google Fonts and Esri World Imagery map tiles, so the viewer needs an internet connection.

## Password gate (optional)

The pages are not password protected in this repository. To gate them the same way as the line patrol demo, encrypt each built `index.html` with StatiCrypt before deploying, for example:

```
npx staticrypt kumbh/index.html -d kumbh -p "<password>"
```

Check the StatiCrypt documentation for the current options. Do not commit the password.

## Change the content

Each page is generated from one data file. Edit the file, then rebuild.

| File | What it holds |
|---|---|
| `src/kumbh.js`, `src/police.js`, `src/water.js` | All wording, numbers, use cases, docks, routes and findings for that page |
| `src/render.js` | The presentation sections and the three "try it" widgets |
| `src/engine.js` | The demo: map, drone animation, timeline, findings, approval step, sensor views, Excel report |
| `src/dock3d.js` | The animated 3D dock (land, charge, launch) |
| `src/base.css`, `src/page.html` | Styling and page shell |
| `src/vendor/` | Leaflet, three.js, the Nurture 3D platform models and the logo |

Rebuild from the repository root:

```
python3 src/build.py .
```

This rewrites `index.html`, `kumbh/index.html`, `police/index.html` and `water/index.html`. Each is a single self-contained file.

## What is real and what is sample

- Real: the satellite imagery, the Godavari, Ramkund, the bridges, Tapovan, Gangapur Dam, the Gangapur Left Canal and the police station positions (from OpenStreetMap).
- Sample: every finding, reading, time and sensor image. The "thermal", "density" and "muddiness" views are simulated on top of the satellite image to show the principle. Each page says so.
- No real outfall, pump, defect, person or incident is shown.

Best viewed on a laptop or a projector in Chrome or Edge. It works on a phone, but the control-room layout is built for a wide screen.
