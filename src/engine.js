/* Interactive mission demo: real satellite map, docks, drones, timeline, findings, human approval. */
(function () {
  'use strict';
  var P = window.PAGE, D = P.demo, $ = function (s, r) { return (r || document).querySelector(s); };
  var TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
  var COL = { fix: '#ff4d4f', watch: '#ffb020', ok: '#3ddc84' }, SEV = { fix: 'FIX NOW', watch: 'WATCH', ok: 'ALL CLEAR' };
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function rad(x) { return x * Math.PI / 180; }
  function hav(a, b) { var R = 6371000, p1 = rad(a[0]), p2 = rad(b[0]), dp = p2 - p1, dl = rad(b[1] - a[1]); var h = Math.sin(dp / 2) * Math.sin(dp / 2) + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) * Math.sin(dl / 2); return 2 * R * Math.asin(Math.sqrt(h)); }
  function off(p, dx, dy) { return [p[0] + dy / 111320, p[1] + dx / (111320 * Math.cos(rad(p[0])))]; }
  function bearing(a, b) { var y = (b[1] - a[1]) * Math.cos(rad(a[0])), x = b[0] - a[0]; return Math.atan2(y, x) * 180 / Math.PI; }
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function clock(startStr, secs) { var p = startStr.split(':'), s = (+p[0]) * 3600 + (+p[1]) * 60 + (+(p[2] || 0)) + Math.round(secs); return pad2(Math.floor(s / 3600) % 24) + ':' + pad2(Math.floor(s / 60) % 60) + ':' + pad2(s % 60); }
  function docks(id) { for (var i = 0; i < D.docks.length; i++) if (D.docks[i].id === id) return D.docks[i]; return D.docks[0]; }

  /* ---------- prepare missions ---------- */
  D.missions.forEach(function (m) {
    var dk = docks(m.dock), r = [dk.pos].concat(m.route);
    if (m.returns !== false) r.push(dk.pos);
    // time-based path: constant speed between points, optional dwell seconds as third element of a route point
    var len = 0, i; for (i = 1; i < r.length; i++) len += hav(r[i - 1], r[i]);
    var dw = (m.launchDelay || 0); r.forEach(function (p) { dw += (p[2] || 0); });
    var spd = m.speed || len / Math.max(1, m.durMin * 60 - dw);
    var R2 = [r[0]], cum = [0], dist = [0], tt = 0, dd = 0;
    if (m.launchDelay) { R2.push(r[0]); tt += m.launchDelay; cum.push(tt); dist.push(0); }
    for (i = 1; i < r.length; i++) {
      var sg = hav(r[i - 1], r[i]); tt += sg / spd; dd += sg; R2.push(r[i]); cum.push(tt); dist.push(dd);
      if (r[i][2]) { tt += r[i][2]; R2.push(r[i]); cum.push(tt); dist.push(dd); }
    }
    m._r = R2; m._cum = cum; m._dist = dist; m._len = tt; m._km = dd / 1000; m.durMin = tt / 60;
    m.findings.forEach(function (f, i) {
      f._i = i; f._m = m; f.id = m.code + '-' + pad2(i + 1);
      if (f.ts != null) f.at = f.ts / m._len; if (f.at == null) { f.at = nearestFrac(m, f.pos); }
      f.shown = false; f.decision = null;
    });
    m.findings.sort(function (a, b) { return a.at - b.at; });
    m.findings.forEach(function (f, i) { f._i = i; f.id = m.code + '-' + pad2(i + 1); });
  });
  function nearestFrac(m, p) { var best = 0, bd = 1e12; for (var k = 0; k <= 400; k++) { var q = at(m, k / 400), d = hav(q, p); if (d < bd) { bd = d; best = k / 400; } } return best; }
  function at(m, f) {
    var d = f * m._len, c = m._cum, r = m._r, i = 1; while (i < c.length - 1 && c[i] < d) i++;
    var a = r[i - 1], b = r[i], s = c[i] - c[i - 1], u = s ? (d - c[i - 1]) / s : 0;
    var br = (a[0] === b[0] && a[1] === b[1]) ? (m._lb || 0) : bearing(a, b); m._lb = br;
    return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, br, m._dist[i - 1] + (m._dist[i] - m._dist[i - 1]) * u];
  }
  function flown(m, f) { var d = f * m._len, c = m._cum, r = m._r, out = [r[0]]; for (var i = 1; i < r.length && c[i] <= d; i++) out.push(r[i]); var p = at(m, f); out.push([p[0], p[1]]); return out; }

  /* ---------- DOM ---------- */
  var root = $('#demo');
  root.innerHTML =
    '<div class="dtop"><div class="ttl">' + D.title + ' <span>· live demo</span></div><div class="mtabs"></div><span class="sp"></span><span class="pill" id="p-id"></span><span class="pill" id="p-time" style="display:none"></span><span class="pill y">Sample mission · demo findings</span></div>' +
    '<div class="dmain"><aside class="side"><div class="hd"><p class="eyebrow" id="s-eye"></p><h3 id="s-title"></h3><div class="sub" id="s-sub"></div></div>' +
    '<div class="cnt"><div class="f"><b id="c-f">0</b><span>Fix now</span></div><div class="w"><b id="c-w">0</b><span>Watch</span></div><div class="o"><b id="c-o">0</b><span>All clear</span></div></div>' +
    '<div class="flabel"><span>Findings</span><span id="f-n"></span></div><div class="flist" id="flist"></div>' +
    '<div class="dockc" id="dockc"></div>' +
    '<div class="sbtn"><button class="btn ghost" id="xls">⬇ Mission report (Excel)</button><div class="nt">' + D.note + '</div></div></aside>' +
    '<div class="mapw"><div id="map"></div><div class="toast" id="toast"></div><div class="logbox" id="logbox"></div>' +
    '<div class="tl"><button class="play nudge" id="play" title="Play / pause (space)">▶</button><button class="spd" id="spd">1×</button><div class="track" id="track"><div class="base"></div><div class="fill"></div><div class="knob"></div></div>' +
    '<div class="hud"><div>TIME<b id="h-t">--</b></div><div>ALTITUDE<b id="h-a">--</b></div><div>COVERED<b id="h-c">--</b></div><div>IMAGES<b id="h-i">0</b></div><div>BATTERY<b id="h-b">100%</b></div></div></div></div></div>';
  var scrim = el('div', 'scrim'); scrim.innerHTML = '<div class="modal"><div class="mimg"><div class="vtabs"></div><div class="vstage"></div></div><div class="minfo"></div></div>'; document.body.appendChild(scrim);
  // palette filters for simulated sensor views
  var defs = el('div'); defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  defs.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><defs>' +
    '<filter id="pal-iron" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.3 0.5 0.2 0 0  0.3 0.5 0.2 0 0  0.3 0.5 0.2 0 0  0 0 0 1 0"/><feGaussianBlur stdDeviation="1.1"/><feComponentTransfer><feFuncR type="table" tableValues="0.02 0.22 0.55 0.85 0.98 1 1"/><feFuncG type="table" tableValues="0 0.02 0.06 0.22 0.55 0.86 1"/><feFuncB type="table" tableValues="0.1 0.42 0.56 0.36 0.08 0.2 0.85"/></feComponentTransfer></filter>' +
    '<filter id="pal-white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.3 0.5 0.2 0 0  0.3 0.5 0.2 0 0  0.3 0.5 0.2 0 0  0 0 0 1 0"/><feGaussianBlur stdDeviation="1.1"/><feComponentTransfer><feFuncR type="table" tableValues="0.02 0.12 0.3 0.6 1"/><feFuncG type="table" tableValues="0.02 0.12 0.3 0.6 1"/><feFuncB type="table" tableValues="0.03 0.14 0.32 0.62 1"/></feComponentTransfer></filter>' +
    '<filter id="pal-index" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.3 0.5 0.2 0 0  0.3 0.5 0.2 0 0  0.3 0.5 0.2 0 0  0 0 0 1 0"/><feGaussianBlur stdDeviation="0.8"/><feComponentTransfer><feFuncR type="table" tableValues="0.03 0.05 0.1 0.45 0.9 0.85 0.6"/><feFuncG type="table" tableValues="0.08 0.3 0.6 0.8 0.8 0.5 0.25"/><feFuncB type="table" tableValues="0.3 0.6 0.55 0.3 0.15 0.1 0.08"/></feComponentTransfer></filter>' +
    '<filter id="pal-veg" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="-1.6 2.6 -1.0 0 0.22  -1.6 2.6 -1.0 0 0.22  -1.6 2.6 -1.0 0 0.22  0 0 0 1 0"/><feGaussianBlur stdDeviation="0.9"/><feComponentTransfer><feFuncR type="table" tableValues="0.05 0.35 0.75 0.85 0.45 0.1 0.02"/><feFuncG type="table" tableValues="0.12 0.25 0.55 0.8 0.8 0.65 0.4"/><feFuncB type="table" tableValues="0.35 0.2 0.25 0.3 0.2 0.15 0.1"/></feComponentTransfer></filter>' +
    '</defs></svg>';
  document.body.appendChild(defs);

  /* ---------- map ---------- */
  var map = L.map('map', { zoomControl: true, attributionControl: true, scrollWheelZoom: false, zoomSnap: 0.25 });
  map.on('focus click', function () { map.scrollWheelZoom.enable(); });
  L.tileLayer(TILE, { maxZoom: 20, maxNativeZoom: D.maxNative || 18, attribution: 'Imagery © Esri, Maxar, Earthstar Geographics · Route data © OpenStreetMap contributors' }).addTo(map);
  var gStatic = L.layerGroup().addTo(map), gMission = L.layerGroup().addTo(map), gFind = L.layerGroup().addTo(map), gResp = L.layerGroup().addTo(map);
  function divIcon(html, w, h, cls) { return L.divIcon({ html: html, className: cls || '', iconSize: [w, h], iconAnchor: [w / 2, h / 2] }); }
  var dockMk = {};
  D.docks.forEach(function (d) {
    dockMk[d.id] = L.marker(d.pos, { icon: L.divIcon({ html: '<div class="dk off">▣ Dock ' + d.id + '<small>' + d.name + '</small></div>', className: '', iconSize: [0, 0], iconAnchor: [-10, 14] }), zIndexOffset: 300 }).addTo(gStatic);
    L.circleMarker(d.pos, { radius: 6, color: '#fff', weight: 2, fillColor: '#0a0e11', fillOpacity: 1 }).addTo(gStatic);
  });
  (D.labels || []).forEach(function (l) { L.marker(l.pos, { icon: L.divIcon({ html: '<div class="pl">' + l.t + '</div>', className: '', iconSize: [0, 0], iconAnchor: [l.ax || 0, l.ay || 0] }), interactive: false }).addTo(gStatic); });
  var droneSvg = function (c) { return '<svg class="dr" width="40" height="40" viewBox="-20 -20 40 40"><g stroke="' + c + '" stroke-width="2.2" fill="none"><line x1="-9" y1="-9" x2="9" y2="9"/><line x1="-9" y1="9" x2="9" y2="-9"/></g><g fill="rgba(255,255,255,.18)" stroke="#fff" stroke-width="1.2"><circle cx="-10" cy="-10" r="5.5"/><circle cx="10" cy="-10" r="5.5"/><circle cx="-10" cy="10" r="5.5"/><circle cx="10" cy="10" r="5.5"/></g><rect x="-4.5" y="-6" width="9" height="12" rx="3" fill="' + c + '" stroke="#fff" stroke-width="1"/><path d="M0 -11 L3 -6 L-3 -6 Z" fill="#fff"/></svg>'; };

  /* ---------- state ---------- */
  var M = null, t = 0, playing = false, speed = 1, last = 0, REAL = 55, drone, lineDone, linePlan, coverage, sel = null, pending = null, logN = 0, log = [], firstPlay = true;
  var tabs = $('.mtabs', root);
  D.missions.forEach(function (m, i) { var b = el('button', 'mtab', '<i>' + (i + 1) + '</i>' + m.tab); b.onclick = function () { load(i); }; tabs.appendChild(b); m._tab = b; });

  function load(i) {
    M = D.missions[i]; t = 0; playing = false; pending = null; sel = null; log = [];
    D.missions.forEach(function (m) { m._tab.classList.toggle('on', m === M); });
    M.findings.forEach(function (f) { f.shown = false; f.decision = null; f._mk = null; });
    gMission.clearLayers(); gFind.clearLayers(); gResp.clearLayers(); $('#flist').innerHTML = '<div class="empty">Press ▶ to launch the drone from the dock. Findings appear here as it flies.</div>'; $('#logbox').innerHTML = '';
    hideApprove();
    $('#s-eye').textContent = M.eyebrow; $('#s-title').textContent = M.title; $('#s-sub').textContent = M.sub;
    $('#p-id').textContent = M.code; $('#p-time').textContent = 'Launch ' + M.start + ' · back ' + clock(M.start, M.durMin * 60).slice(0, 5);
    D.docks.forEach(function (d) { var e = dockMk[d.id].getElement(); if (e) e.firstChild.className = 'dk' + (d.id === M.dock || (M.responders || []).indexOf(d.id) >= 0 ? '' : ' off'); });
    (M.zones || []).forEach(function (z) {
      var ly = z.circle ? L.circle(z.circle, { radius: z.r, color: z.c || '#3ddc84', weight: 1.2, dashArray: '5 6', fillOpacity: z.fo == null ? 0.04 : z.fo, interactive: false }) : L.polygon(z.poly, { color: z.c || '#fff', weight: 1.2, dashArray: '4 5', fillOpacity: z.fo == null ? 0.06 : z.fo, interactive: false });
      ly.addTo(gMission);
      if (z.t) L.marker(z.tp || (z.circle ? off(z.circle, 0, z.r) : z.poly[0]), { icon: L.divIcon({ html: '<div class="pl" style="color:' + (z.c || '#fff') + '">' + z.t + '</div>', className: '', iconSize: [0, 0] }), interactive: false }).addTo(gMission);
    });
    linePlan = L.polyline(M._r, { color: '#fff', weight: 1.5, opacity: 0.55, dashArray: '2 7' }).addTo(gMission);
    lineDone = L.polyline([M._r[0]], { color: '#3ddc84', weight: 3.5, opacity: 0.95, dashArray: '1 7', lineCap: 'round' }).addTo(gMission);
    drone = L.marker(M._r[0], { icon: divIcon('<div class="dwrap">' + droneSvg('#3ddc84') + '</div>', 40, 40), zIndexOffset: 800, interactive: false }).addTo(gMission);
    var tr = $('#track'); Array.prototype.slice.call(tr.querySelectorAll('.tick')).forEach(function (x) { x.remove(); });
    M.findings.forEach(function (f) { var k = el('div', 'tick'); k.style.left = (f.at * 100) + '%'; k.style.background = COL[f.sev]; k.title = f.title; tr.appendChild(k); });
    map.fitBounds(L.latLngBounds(M.fit || M._r), { padding: [28, 28], animate: false });
    if (M.zoomAdj) map.setZoom(map.getZoom() + M.zoomAdj, { animate: false });
    toast(M.hint || 'Press ▶ to launch. Click any dot to see what the drone saw.', 6000);
    addLog('Mission ' + M.code + ' loaded. ' + M.droneName + ' ready in Dock ' + M.dock + '.');
    render();
  }

  function addLog(msg, cls, time) {
    var ts = time || clock(M.start, t * M.durMin * 60); log.push([ts, msg]);
    var b = $('#logbox'), l = el('div', 'logl ' + (cls || ''), ts + ' <b>' + msg + '</b>'); b.insertBefore(l, b.firstChild);
    while (b.children.length > 5) b.removeChild(b.lastChild);
  }
  var toastT; function toast(msg, ms) { var e = $('#toast'); e.textContent = msg; e.style.opacity = 1; clearTimeout(toastT); toastT = setTimeout(function () { e.style.opacity = 0; }, ms || 3500); }

  function reveal(f, quiet) {
    if (f.shown) return; f.shown = true;
    var mk = L.marker(f.pos, { icon: divIcon('<div class="mk" style="background:' + COL[f.sev] + ';color:' + COL[f.sev] + '"></div>', 18, 18), zIndexOffset: 600 }).addTo(gFind);
    mk.on('click', function () { openModal(f); }); mk.bindTooltip(f.title, { direction: 'top', offset: [0, -10] }); f._mk = mk;
    var list = $('#flist'); if (list.querySelector('.empty')) list.innerHTML = '';
    var it = el('div', 'item'); it.onclick = function () { openModal(f); }; f._it = it; list.appendChild(it); paintItem(f); list.scrollTop = list.scrollHeight;
    if (!quiet) { addLog(SEV[f.sev] + ': ' + f.title, f.sev === 'fix' ? 'r' : f.sev === 'watch' ? 'a' : '', f.time); }
  }
  function paintItem(f) {
    var st = '';
    if (f.action) st = f.decision ? '<i class="st ' + (f.decision.ok ? 'ap">✓ Approved · ' + f.action.short : 'hd">Held by officer') + '</i>' : '<i class="st wt">Awaiting officer approval</i>';
    f._it.innerHTML = '<span class="d" style="background:' + COL[f.sev] + '"></span><div><b>' + f.title + '</b><span>' + f.line + '</span>' + (st ? '<br>' + st : '') + '</div><time>' + f.time.slice(0, 5) + '</time>';
  }
  function render() {
    var p = at(M, t), secs = t * M.durMin * 60;
    drone.setLatLng([p[0], p[1]]); var w = drone.getElement(); if (w) w.firstChild.style.transform = 'rotate(' + p[2] + 'deg)';
    lineDone.setLatLngs(flown(M, t));
    $('.fill', root).style.width = (t * 100) + '%'; $('.knob', root).style.left = (t * 100) + '%';
    $('#h-t').textContent = clock(M.start, secs);
    $('#h-a').textContent = (t <= 0 || t >= 1) ? 'On dock' : M.alt;
    $('#h-c').textContent = (p[3] / 1000).toFixed(2) + ' km';
    $('#h-i').textContent = Math.round(t * M.images);
    var bat = Math.round(100 - t * (M.batUse || 62)); $('#h-b').textContent = bat + '%';
    var n = { fix: 0, watch: 0, ok: 0 }; M.findings.forEach(function (f) { f.time = clock(M.start, f.at * M.durMin * 60); if (f.shown) n[f.sev]++; });
    $('#c-f').textContent = n.fix; $('#c-w').textContent = n.watch; $('#c-o').textContent = n.ok; $('#f-n').textContent = (n.fix + n.watch + n.ok) + ' of ' + M.findings.length;
    var dk = docks(M.dock), state = t <= 0 ? ['Drone docked, lids closed', '100%'] : t >= 1 ? ['Landed, lids closed, charging', bat + '% → 100% in ' + Math.round((100 - bat) * 0.45) + ' min'] : ['Drone away on patrol', bat + '% in flight'];
    $('#dockc').innerHTML = '<div class="dh"><span>Dock ' + dk.id + ' · ' + dk.name + '</span><span>' + (t > 0 && t < 1 ? '● LIVE' : '■ READY') + '</span></div>' +
      '<div class="r"><span>Status</span><b>' + state[0] + '</b></div><div class="r"><span>Battery</span><b>' + state[1] + '</b></div>' +
      '<div class="r"><span>Weather check</span><b>' + (M.wx || 'Wind 4 m/s · no rain · go') + '</b></div><div class="r"><span>Next patrol</span><b>' + (M.next || 'in 40 min, automatic') + '</b></div><div class="r"><span>Flight record</span><b>' + (t >= 1 ? 'signed and stored' : 'recording') + '</b></div>';
    $('#play').textContent = playing ? '❚❚' : (t >= 1 ? '↺' : '▶');
  }
  function seek(nt, user) {
    var prev = t; t = Math.max(0, Math.min(1, nt));
    M.findings.forEach(function (f) {
      if (f.at <= t && !f.shown) { f.time = clock(M.start, f.at * M.durMin * 60); reveal(f, user); if (!user && f.action && !f.decision) { ask(f); } }
    });
    if (t >= 1 && prev < 1) { playing = false; addLog(M.droneName + ' landed on Dock ' + M.dock + '. Charging. Flight record signed.'); toast('Patrol complete. The drone is back in its dock and charging. Click any finding to review.', 7000); }
    render();
  }
  function tick(now) {
    requestAnimationFrame(tick);
    var dt = (now - last) / 1000; last = now; if (!playing || pending || dt > 0.5) return;
    seek(t + dt * speed / REAL);
  }
  $('#play').onclick = function () {
    $('#play').classList.remove('nudge');
    if (pending) { toast('The drone is holding. An officer must approve or hold the proposed action first.'); return; }
    if (t >= 1) { load(D.missions.indexOf(M)); }
    playing = !playing; if (playing && firstPlay) { firstPlay = false; }
    if (playing && t === 0) { addLog('Lids open. ' + M.droneName + ' launched from Dock ' + M.dock + '.'); toast('Launched from Dock ' + M.dock + '. No pilot on site.', 3000); }
    render();
  };
  $('#spd').onclick = function () { speed = speed === 1 ? 2 : speed === 2 ? 4 : 1; this.textContent = speed + '×'; };
  $('#track').onclick = function (e) { if (pending) return; var r = this.getBoundingClientRect(); seek((e.clientX - r.left) / r.width, true); };
  document.addEventListener('keydown', function (e) {
    if (scrim.classList.contains('open')) { if (e.key === 'Escape') closeModal(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); return; }
    var r = root.getBoundingClientRect(); if (e.code === 'Space' && r.top < innerHeight / 2 && r.bottom > innerHeight / 2 && !/INPUT|BUTTON/.test(document.activeElement.tagName)) { e.preventDefault(); $('#play').click(); }
  });

  /* ---------- human approval ---------- */
  var apEl = null;
  function ask(f) {
    pending = f; map.flyTo(f.pos, Math.max(map.getZoom(), M.askZoom || 17), { duration: 0.8 });
    apEl = el('div', 'approve');
    apEl.innerHTML = '<div class="ah"><span>⚠ Decision needed · human in the loop</span><span>' + f.time + '</span></div><h4>' + f.title + '</h4>' +
      '<p>The software proposes: <b>' + f.action.verb + '</b>. ' + f.action.what + '</p>' +
      '<div class="ab"><button class="btn" data-a="1">✓ Approve</button><button class="btn hold" data-a="0">Hold</button><button class="lnk">See the evidence first</button></div>' +
      '<small>The drone flies and detects on its own. It never sends a response without ' + (D.officer || 'the duty officer') + '. Every decision is logged with a name and time.</small>';
    $('.mapw', root).appendChild(apEl);
    apEl.querySelector('[data-a="1"]').onclick = function () { decide(f, true); };
    apEl.querySelector('[data-a="0"]').onclick = function () { decide(f, false); };
    apEl.querySelector('.lnk').onclick = function () { openModal(f); };
    addLog('Proposed: ' + f.action.verb + '. Waiting for officer.', 'a', f.time);
  }
  function hideApprove() { if (apEl) { apEl.remove(); apEl = null; } }
  function decide(f, ok) {
    if (f.decision) return; f.decision = { ok: ok, time: f.time, by: D.officerName || 'Duty officer' };
    if (pending === f) { pending = null; hideApprove(); }
    paintItem(f);
    if (ok) { addLog('Approved by ' + f.decision.by + ': ' + f.action.verb, '', f.time); respond(f); }
    else { addLog('Held by ' + f.decision.by + '. No response sent.', 'a', f.time); toast('Held. Nothing was sent. The finding stays on the list.'); }
    if (sel === f) fillInfo(f);
    if (!scrim.classList.contains('open')) { playing = true; render(); }
    setTimeout(function () { if (!pending) map.flyToBounds(L.latLngBounds(M.fit || M._r), { padding: [28, 28], duration: 1 }); }, ok && f.action.from ? 6500 : 1200);
  }
  function respond(f) {
    var a = f.action;
    if (a.from) {
      var d = docks(a.from), A = d.pos, B = f.pos, c = '#ffb020';
      var ln = L.polyline([A, A], { color: c, weight: 3, dashArray: '1 7', lineCap: 'round' }).addTo(gResp);
      var mk = L.marker(A, { icon: divIcon(droneSvg(c), 40, 40), zIndexOffset: 900, interactive: false }).addTo(gResp);
      var e0 = mk.getElement(); if (e0) e0.firstChild.style.transform = 'rotate(' + bearing(A, B) + 'deg)';
      toast(a.launch || ('Payload drone launched from Dock ' + d.id + '.'), 3500);
      var T0 = performance.now(), go = 4200, hold = 1600;
      (function anim(now) {
        var u = (now - T0) / go;
        if (u < 1) { var p = [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u]; mk.setLatLng(p); ln.setLatLngs([A, p]); requestAnimationFrame(anim); }
        else if (u < 1 + hold / go) { if (!mk._dropped) { mk._dropped = true; mk.setLatLng(B); ripple(B, c); addLog(a.done, '', f.time); toast(a.done, 4000); } requestAnimationFrame(anim); }
        else if (u < 2 + hold / go) { var v = u - 1 - hold / go, q = [B[0] + (A[0] - B[0]) * v, B[1] + (A[1] - B[1]) * v]; mk.setLatLng(q); var e1 = mk.getElement(); if (e1) e1.firstChild.style.transform = 'rotate(' + bearing(B, A) + 'deg)'; requestAnimationFrame(anim); }
        else { gResp.removeLayer(mk); ln.setStyle({ opacity: 0.45 }); }
      })(T0);
    } else { ripple(f.pos, '#3ddc84'); toast(a.done, 4500); addLog(a.done, '', f.time); }
  }
  function ripple(p, c) { var r = 4, ci = L.circleMarker(p, { radius: r, color: c, weight: 3, fill: false }).addTo(gResp), n = 0; var iv = setInterval(function () { r += 3; n++; ci.setRadius(r); ci.setStyle({ opacity: 1 - n / 16 }); if (n > 15) { clearInterval(iv); gResp.removeLayer(ci); } }, 60); }

  /* ---------- modal ---------- */
  function openModal(f) { var was = playing; playing = false; scrim._was = was; sel = f; scrim.classList.add('open'); fillInfo(f); showView(f, 0); M.findings.forEach(function (x) { if (x._it) x._it.classList.toggle('sel', x === f); }); render(); }
  function closeModal() { scrim.classList.remove('open'); sel = null; if (!pending && scrim._was && t < 1) { playing = true; } render(); }
  scrim.addEventListener('click', function (e) { if (e.target === scrim) closeModal(); });
  function step(d) { var sh = M.findings.filter(function (x) { return x.shown; }), i = sh.indexOf(sel); if (i < 0) return; var n = sh[(i + d + sh.length) % sh.length]; sel = n; fillInfo(n); showView(n, 0); }
  function fillInfo(f) {
    var a = f.action, act = '';
    if (a) {
      if (!f.decision) act = '<div class="act"><div class="ah">⚠ Proposed action · needs approval</div><p><b>' + a.verb + '.</b> ' + a.what + '</p><div class="ab"><button class="btn" data-a="1">✓ Approve</button><button class="btn hold" data-a="0">Hold</button></div></div>';
      else act = '<div class="act done"><div class="ah">' + (f.decision.ok ? '✓ Approved' : '■ Held') + ' by ' + f.decision.by + ' · ' + f.decision.time + '</div><p style="margin:0">' + (f.decision.ok ? a.done : 'No response was sent. ' + a.verb + ' remains available.') + '</p></div>';
    }
    var info = $('.minfo', scrim);
    info.innerHTML = '<div class="mhd"><span class="sev ' + f.sev + '">' + SEV[f.sev] + '</span><div class="mnav"><button data-n="-1">‹ Previous</button><button data-n="1">Next ›</button><button data-n="x">✕</button></div></div>' +
      '<div><h3>' + f.title + '</h3><div class="where">' + f.id + ' · ' + f.time + ' · ' + f.pos[0].toFixed(5) + ', ' + f.pos[1].toFixed(5) + (f.place ? ' · ' + f.place : '') + '</div></div>' +
      '<div class="rec"><span>What to do</span>' + f.rec + '</div>' + act +
      '<div class="rgrid">' + f.readings.map(function (r) { return '<div><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join('') + '</div>' +
      (f.how ? '<div class="how"><b>How the drone knows:</b> ' + f.how + '</div>' : '') +
      '<div class="mdis">Demo: the satellite view stands in for the drone photo, and sensor views are simulated. Readings are sample data.</div>';
    info.querySelector('[data-n="-1"]').onclick = function () { step(-1); }; info.querySelector('[data-n="1"]').onclick = function () { step(1); }; info.querySelector('[data-n="x"]').onclick = closeModal;
    var b1 = info.querySelector('[data-a="1"]'); if (b1) { b1.onclick = function () { decide(f, true); closeModal(); }; info.querySelector('[data-a="0"]').onclick = function () { decide(f, false); closeModal(); }; }
  }
  function showView(f, i) {
    var vt = $('.vtabs', scrim); vt.innerHTML = '';
    f.views.forEach(function (v, k) { var b = el('button', 'vtab' + (k === i ? ' on' : ''), v.label); b.onclick = function () { showView(f, k); }; vt.appendChild(b); });
    drawView($('.vstage', scrim), f, f.views[i]);
  }

  /* ---------- sensor view renderer (shared with page widgets) ---------- */
  function drawView(stage, f, v) {
    stage.innerHTML = '';
    var W = stage.clientWidth || 700, H = stage.clientHeight || 500, z = v.z || D.viewZ || 18, sc = (v.scale || (v.z ? 2.2 : D.viewScale) || 2.2) * (v.zoomx && !v.scale ? 2.6 : 1), c = v.center || f.pos;
    var n = Math.pow(2, z), xt = (c[1] + 180) / 360 * n, yt = (1 - Math.log(Math.tan(rad(c[0])) + 1 / Math.cos(rad(c[0]))) / Math.PI) / 2 * n;
    var ppm = 256 * n / (40075016.686 * Math.cos(rad(c[0]))) * sc;
    var wrap = el('div'); wrap.style.cssText = 'position:absolute;inset:0;' + (v.type === 'thermal' ? 'filter:url(#pal-' + (v.pal || 'iron') + ')' : v.type === 'index' ? 'filter:url(#pal-' + (v.pal || 'index') + ')' : '');
    var tiles = el('div', 'vtiles'); tiles.style.transform = 'scale(' + sc + ')';
    var nx = Math.ceil(W / sc / 256 / 2) + 1, ny = Math.ceil(H / sc / 256 / 2) + 1, x0 = Math.floor(xt), y0 = Math.floor(yt);
    for (var dx = -nx; dx <= nx; dx++) for (var dy = -ny; dy <= ny; dy++) {
      var im = new Image(); im.draggable = false; im.src = TILE.replace('{z}', z).replace('{x}', x0 + dx).replace('{y}', y0 + dy);
      im.style.left = ((x0 + dx - xt) * 256) + 'px'; im.style.top = ((y0 + dy - yt) * 256) + 'px'; tiles.appendChild(im);
    }
    wrap.appendChild(tiles);
    var NS = 'http://www.w3.org/2000/svg';
    function X(m) { return W / 2 + m * ppm; } function Y(m) { return H / 2 - m * ppm; }
    function svgEl(html, blend) { var s = el('div'); s.style.cssText = 'position:absolute;inset:0;' + (blend ? 'mix-blend-mode:' + blend : ''); s.innerHTML = '<svg class="vsvg" xmlns="' + NS + '" viewBox="0 0 ' + W + ' ' + H + '">' + html + '</svg>'; return s; }
    if (v.type === 'thermal' || v.type === 'index') {
      if (v.dim != null) { var dm = el('div'); dm.style.cssText = 'position:absolute;inset:0;background:#000;opacity:' + v.dim; wrap.appendChild(dm); }
      var g = '', hs = '';
      (v.heat || []).forEach(function (h, k) {
        var id = 'hg' + k + Math.round(Math.random() * 1e6), col = h.v >= 0 ? '255,255,255' : '0,0,0', o = Math.abs(h.v);
        g += '<radialGradient id="' + id + '"><stop offset="0" stop-color="rgba(' + col + ',' + o + ')"/><stop offset="' + (h.core || 0.35) + '" stop-color="rgba(' + col + ',' + (o * 0.75) + ')"/><stop offset="1" stop-color="rgba(' + col + ',0)"/></radialGradient>';
        hs += '<ellipse cx="' + X(h.x) + '" cy="' + Y(h.y) + '" rx="' + (h.r * ppm) + '" ry="' + ((h.ry || h.r) * ppm) + '" fill="url(#' + id + ')" transform="rotate(' + (h.rot || 0) + ' ' + X(h.x) + ' ' + Y(h.y) + ')"/>';
      });
      wrap.appendChild(svgEl('<defs>' + g + '</defs>' + hs));
    }
    stage.appendChild(wrap);
    // annotations
    var a = '';
    (v.marks || []).forEach(function (m) {
      var col = m.c || (v.type === 'sat' || v.type === 'density' ? '#ffe14d' : '#ffffff');
      if (m.t === 'box') { var w = m.w * ppm, h = m.h * ppm, x = X(m.x) - w / 2, y = Y(m.y) - h / 2; a += '<g transform="rotate(' + (m.rot || 0) + ' ' + X(m.x) + ' ' + Y(m.y) + ')"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="none" stroke="' + col + '" stroke-width="2"/>' + corners(x, y, w, h, col) + '</g>' + (m.label ? lab(x, y - 6, m.label, col) : ''); }
      if (m.t === 'ring') { a += '<circle cx="' + X(m.x) + '" cy="' + Y(m.y) + '" r="' + (m.r * ppm) + '" fill="none" stroke="' + col + '" stroke-width="2" stroke-dasharray="6 5"/>' + (m.label ? lab(X(m.x) + m.r * ppm + 6, Y(m.y) + 4, m.label, col) : ''); }
      if (m.t === 'arrow') { var id2 = 'ar' + Math.round(Math.random() * 1e6); a += '<defs><marker id="' + id2 + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="' + col + '"/></marker></defs><line x1="' + X(m.x1) + '" y1="' + Y(m.y1) + '" x2="' + X(m.x2) + '" y2="' + Y(m.y2) + '" stroke="' + col + '" stroke-width="3" marker-end="url(#' + id2 + ')"/>' + (m.label ? lab(X(m.x1) + 6, Y(m.y1) - 8, m.label, col) : ''); }
      if (m.t === 'poly') { a += '<polygon points="' + m.pts.map(function (p) { return X(p[0]) + ',' + Y(p[1]); }).join(' ') + '" fill="' + (m.fill || 'none') + '" stroke="' + col + '" stroke-width="2" stroke-dasharray="' + (m.dash || '') + '"/>' + (m.label ? lab(X(m.pts[0][0]), Y(m.pts[0][1]) - 6, m.label, col) : ''); }
      if (m.t === 'text') { a += lab(X(m.x), Y(m.y), m.label, col); }
      if (m.t === 'cells') {
        var s = m.size * ppm, gx = X(m.x), gy = Y(m.y), cells = '';
        for (var i = 0; i < m.cols; i++) for (var j = 0; j < m.rows; j++) {
          var val = m.base; (m.hot || []).forEach(function (hh) { var d2 = (i - hh[0]) * (i - hh[0]) + (j - hh[1]) * (j - hh[1]); val += hh[2] * Math.exp(-d2 / (hh[3] || 3)); });
          val += (Math.sin(i * 12.9898 + j * 78.233) * 43758.5453 % 1) * 0.35; val = Math.max(0.2, val);
          var cc = val >= 5 ? '#ff2d2f' : val >= 4 ? '#ff8a1f' : val >= 2 ? '#ffd84d' : '#3ddc84';
          cells += '<rect x="' + (gx + i * s) + '" y="' + (gy + j * s) + '" width="' + (s - 1.5) + '" height="' + (s - 1.5) + '" fill="' + cc + '" fill-opacity="' + (val >= 4 ? 0.62 : 0.4) + '" stroke="' + cc + '" stroke-width="1"/>' + (s > 30 ? '<text x="' + (gx + i * s + s / 2) + '" y="' + (gy + j * s + s / 2 + 4) + '" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" font-weight="700" fill="#fff" style="paint-order:stroke;stroke:#000;stroke-width:2.5px">' + val.toFixed(1) + '</text>' : '');
        }
        a += '<g transform="rotate(' + (m.rot || 0) + ' ' + gx + ' ' + gy + ')">' + cells + '</g>';
      }
    });
    function corners(x, y, w, h, c2) { var k = Math.min(10, w / 3, h / 3), p = ''; [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]].forEach(function (q) { p += '<path d="M' + (q[0] + q[2] * k) + ' ' + q[1] + 'L' + q[0] + ' ' + q[1] + 'L' + q[0] + ' ' + (q[1] + q[3] * k) + '" fill="none" stroke="' + c2 + '" stroke-width="4"/>'; }); return p; }
    function lab(x, y, tx, c2) { return '<text x="' + x + '" y="' + y + '" font-family="JetBrains Mono,monospace" font-size="12" font-weight="700" fill="' + c2 + '" style="paint-order:stroke;stroke:#000;stroke-width:3px">' + tx + '</text>'; }
    if (v.cross !== false && (v.type === 'thermal')) a += '<g stroke="#fff" stroke-width="1.2" opacity=".85"><line x1="' + (W / 2 - 16) + '" y1="' + H / 2 + '" x2="' + (W / 2 - 5) + '" y2="' + H / 2 + '"/><line x1="' + (W / 2 + 5) + '" y1="' + H / 2 + '" x2="' + (W / 2 + 16) + '" y2="' + H / 2 + '"/><line x1="' + W / 2 + '" y1="' + (H / 2 - 16) + '" x2="' + W / 2 + '" y2="' + (H / 2 - 5) + '"/><line x1="' + W / 2 + '" y1="' + (H / 2 + 5) + '" x2="' + W / 2 + '" y2="' + (H / 2 + 16) + '"/></g>';
    stage.appendChild(svgEl(a));
    if (v.read) { var rd = el('div', 'vread'); rd.innerHTML = v.read.map(function (r) { return '<div><span>' + r[0] + '</span><b>' + r[1] + '</b></div>'; }).join(''); stage.appendChild(rd); }
    if (v.type === 'thermal' || v.type === 'index') {
      var bar = el('div', 'vbar'); bar.style.background = v.type === 'index' ? (v.pal === 'veg' ? 'linear-gradient(to top,#0d1f59,#594033,#bf8c40,#d9cc4d,#73cc33,#1aa626,#056619)' : 'linear-gradient(to top,#08144d,#0d4d99,#1a998c,#73cc4d,#e6cc26,#d98019,#99401a)') : (v.pal === 'white' ? 'linear-gradient(to top,#050508,#4d4d52,#fff)' : 'linear-gradient(to top,#05001a,#38056b,#8c0f8f,#d9385c,#fa8c14,#ffdb33,#ffffd9)');
      bar.setAttribute('data-hi', v.hi || ''); bar.setAttribute('data-lo', v.lo || ''); stage.appendChild(bar);
      stage.appendChild(el('div', 'vsim', 'SIMULATED ' + (v.type === 'index' ? 'INDEX MAP' : 'THERMAL')));
    }
    if (v.type === 'density') { var lg = el('div', 'vleg'); lg.innerHTML = '<b>People per m²</b><div><i style="background:#3ddc84"></i>Under 2 · free movement</div><div><i style="background:#ffd84d"></i>2 to 4 · busy, moving</div><div><i style="background:#ff8a1f"></i>4 to 5 · at the limit</div><div><i style="background:#ff2d2f"></i>Over 5 · crush risk</div>'; stage.appendChild(lg); stage.appendChild(el('div', 'vsim', 'SIMULATED DENSITY GRID')); }
    if (v.legend) { var l2 = el('div', 'vleg'); l2.innerHTML = v.legend; stage.appendChild(l2); }
    if (f && v.cap !== false) { var cp = el('div', 'vcap'); cp.innerHTML = '<span>' + (v.capt || (v.type === 'thermal' ? 'IR' : v.type === 'index' ? 'MS' : 'EO')) + '-' + f.id + '</span><span>' + f.time + '</span><span>ALT ' + (v.alt || f._m.alt) + '</span><span>GIMBAL ' + (v.gimbal || '-90°') + '</span><span>' + c[0].toFixed(5) + ', ' + c[1].toFixed(5) + '</span>' + (v.zoomx ? '<span>ZOOM ' + v.zoomx + '</span>' : ''); stage.appendChild(cp); }
  }
  window.NDemo = { drawView: drawView };

  /* ---------- Excel report ---------- */
  $('#xls').onclick = function () {
    var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
    var rows = M.findings.filter(function (f) { return f.shown; });
    var h = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="utf-8"></head><body>' +
      '<table border="1"><tr><th colspan="9" style="font-size:14pt;text-align:left">' + esc(D.title + ' · ' + M.title) + '</th></tr>' +
      '<tr><td colspan="9">Mission ' + M.code + ' · Launch ' + M.start + ' · ' + esc(M.droneName) + ' from Dock ' + M.dock + ' · SAMPLE DATA FOR DEMONSTRATION</td></tr>' +
      '<tr style="background:#dfe7ea"><th>ID</th><th>Time</th><th>Priority</th><th>Finding</th><th>Latitude</th><th>Longitude</th><th>Readings</th><th>What to do</th><th>Officer decision</th></tr>' +
      rows.map(function (f) { return '<tr><td>' + f.id + '</td><td>' + f.time + '</td><td>' + SEV[f.sev] + '</td><td>' + esc(f.title) + '</td><td>' + f.pos[0].toFixed(6) + '</td><td>' + f.pos[1].toFixed(6) + '</td><td>' + esc(f.readings.map(function (r) { return r[0] + ': ' + r[1]; }).join('; ')) + '</td><td>' + esc(f.rec.replace(/<[^>]+>/g, '')) + '</td><td>' + (f.action ? (f.decision ? (f.decision.ok ? 'Approved ' : 'Held ') + f.decision.time + ' by ' + f.decision.by + (f.decision.ok ? ' · ' + esc(f.action.done) : '') : 'Awaiting approval: ' + esc(f.action.verb)) : 'No action needed') + '</td></tr>'; }).join('') +
      '</table><br><table border="1"><tr style="background:#dfe7ea"><th>Time</th><th>Mission log</th></tr>' + log.map(function (l) { return '<tr><td>' + l[0] + '</td><td>' + esc(l[1]) + '</td></tr>'; }).join('') + '</table></body></html>';
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + h], { type: 'application/vnd.ms-excel' })); a.download = M.code + '_mission_report.xls'; a.click();
    if (!rows.length) toast('Report downloaded. Play the mission first to fill it with findings.');
  };

  load(0); requestAnimationFrame(function (n) { last = n; requestAnimationFrame(tick); });
  setTimeout(function () { map.invalidateSize(); map.fitBounds(L.latLngBounds(M.fit || M._r), { padding: [28, 28], animate: false }); if (M.zoomAdj) map.setZoom(map.getZoom() + M.zoomAdj, { animate: false }); }, 400);
  window.addEventListener('resize', function () { map.invalidateSize(); });
})();
