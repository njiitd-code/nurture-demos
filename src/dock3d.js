/* Animated 3D drone-in-a-box scene: drone lands, pad lowers, lids close, battery charges, lids open, drone leaves. */
window.Dock3D = function (el, opts) {
  opts = opts || {};
  var T = window.THREE;
  if (!T || !window.NA3D || !window.NA3D.build) { el.classList.add('no3d'); return null; }
  var renderer;
  try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { el.classList.add('no3d'); return null; }
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setClearColor(0x000000, 0);
  var cv = renderer.domElement; cv.className = 'dock3d-cv'; el.appendChild(cv);
  var scene = new T.Scene(), cam = new T.PerspectiveCamera(30, 1, 0.1, 80);
  scene.add(new T.HemisphereLight(0xf2fbff, 0x10171b, 0.7));
  var key = new T.DirectionalLight(0xffffff, 0.75); key.position.set(4, 7, 5); scene.add(key);
  var rim = new T.DirectionalLight(0x9fd8ff, 0.7); rim.position.set(-5, 3, -4); scene.add(rim);
  var pivot = new T.Group(); scene.add(pivot);
  function M(c, m, r, e, ei) { var mat = new T.MeshStandardMaterial({ color: c, metalness: m, roughness: r, emissive: e || 0x000000 }); if (ei != null) mat.emissiveIntensity = ei; return mat; }
  function box(w, h, d, mat, x, y, z) { var b = new T.Mesh(new T.BoxGeometry(w, h, d), mat); b.position.set(x, y, z); return b; }
  var white = M(0xd9dfe2, 0.1, 0.6), dark = M(0x2a3136, 0.5, 0.5), pad = M(0x161b1f, 0.4, 0.6);
  var led = M(0x35e08a, 0.1, 0.3, 0x1fd27a, 1.2), teal = M(0x49e6c8, 0.1, 0.3, 0x2fd6b6, 1.4), cell = M(0xcfd6da, 0.3, 0.4);
  var grid = new T.GridHelper(26, 52, 0x35505a, 0x1f2f36); grid.material.transparent = true; grid.material.opacity = 0.7; pivot.add(grid);
  // dock body: 3.4 x 1.0 x 2.4, hollow
  var W = 3.4, H = 1.3, D = 2.4, wt = 0.09;
  var dock = new T.Group(); pivot.add(dock);
  dock.add(box(W + 0.12, 0.1, D + 0.12, dark, 0, 0.05, 0));
  dock.add(box(W + 0.02, 0.05, D + 0.02, led, 0, 0.125, 0));
  var glass = new T.MeshStandardMaterial({ color: 0xd9dfe2, metalness: 0.1, roughness: 0.6, transparent: true, opacity: 1, depthWrite: false });
  dock.add(box(W, H - 0.15, wt, glass, 0, 0.15 + (H - 0.15) / 2, D / 2 - wt / 2));
  dock.add(box(W, H - 0.15, wt, white, 0, 0.15 + (H - 0.15) / 2, -D / 2 + wt / 2));
  dock.add(box(wt, H - 0.15, D, white, W / 2 - wt / 2, 0.15 + (H - 0.15) / 2, 0));
  dock.add(box(wt, H - 0.15, D, white, -W / 2 + wt / 2, 0.15 + (H - 0.15) / 2, 0));
  dock.add(box(W - 0.1, 0.04, D - 0.1, dark, 0, 0.17, 0));
  // battery magazine: six packs along the back wall, each with a status light
  var packs = [];
  for (var i = 0; i < 6; i++) {
    var x = -1.25 + i * 0.5;
    dock.add(box(0.36, 0.3, 0.2, cell, x, 0.36, -D / 2 + 0.26));
    var l = box(0.2, 0.04, 0.02, M(0x35e08a, 0.1, 0.3, 0x1fd27a, 1.0), x, 0.46, -D / 2 + 0.37); dock.add(l); packs.push(l);
  }
  // charge bar on the front face
  var barBg = box(1.6, 0.06, 0.02, dark, 0, 0.62, D / 2 + 0.005); dock.add(barBg);
  var bar = box(1.6, 0.06, 0.03, led, 0, 0.62, D / 2 + 0.01); dock.add(bar);
  // landing pad (moves up and down)
  var padG = new T.Group(); dock.add(padG);
  padG.add(box(2.5, 0.05, 1.9, pad, 0, 0, 0));
  var ring = new T.Mesh(new T.RingGeometry(0.62, 0.7, 48), new T.MeshBasicMaterial({ color: 0x49e6c8, side: T.DoubleSide, transparent: true, opacity: 0.9 }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.03; padG.add(ring);
  var ring2 = new T.Mesh(new T.RingGeometry(0.2, 0.24, 32), new T.MeshBasicMaterial({ color: 0x49e6c8, side: T.DoubleSide, transparent: true, opacity: 0.7 }));
  ring2.rotation.x = -Math.PI / 2; ring2.position.y = 0.03; padG.add(ring2);
  var glow = new T.PointLight(0x35e08a, 0, 6); glow.position.set(0, 0.6, 0); dock.add(glow);
  var follow = new T.PointLight(0xffffff, 1.6, 7); pivot.add(follow);
  // lids
  var lidL = new T.Group(), lidR = new T.Group();
  lidL.add(box(W / 2 + 0.03, 0.09, D + 0.06, white, -(W / 4), 0, 0)); lidL.add(box(W / 2 + 0.03, 0.02, D + 0.06, dark, -(W / 4), -0.05, 0));
  lidR.add(box(W / 2 + 0.03, 0.09, D + 0.06, white, (W / 4), 0, 0)); lidR.add(box(W / 2 + 0.03, 0.02, D + 0.06, dark, (W / 4), -0.05, 0));
  lidL.position.set(0, H + 0.05, 0); lidR.position.set(0, H + 0.05, 0); dock.add(lidL); dock.add(lidR);
  // mast with weather sensor
  dock.add(box(0.04, 0.9, 0.04, dark, W / 2 + 0.15, 0.5, -D / 2 + 0.1));
  var cup = box(0.22, 0.03, 0.03, white, W / 2 + 0.15, 0.97, -D / 2 + 0.1); dock.add(cup);

  // drones
  var kinds = opts.models || ['isr', 'drop'], names = opts.names || ['Surveillance drone', 'Payload drone'], drones = {}, cur = 0, drone = null, K = 0.72;
  function getDrone(i) {
    var id = kinds[i]; if (!drones[id]) { var d = window.NA3D.build(id); d.scale.multiplyScalar(K); d.userData.hh = d.userData.h * K; drones[id] = d; }
    return drones[id];
  }
  function swap(i) { if (drone) pivot.remove(drone); cur = i % kinds.length; drone = getDrone(cur); pivot.add(drone); }
  swap(0);

  // overlay
  var ui = document.createElement('div'); ui.className = 'dock3d-ui';
  ui.innerHTML = '<div class="d3-top"><span class="d3-live"></span><span class="d3-name"></span></div>' +
    '<div class="d3-steps"><span data-s="0">Return</span><span data-s="1">Precision landing</span><span data-s="2">Lids close</span><span data-s="3">Charging</span><span data-s="4">Launch</span></div>' +
    '<div class="d3-bat"><div class="d3-batl"><span>Battery</span><b class="d3-pct">22%</b></div><div class="d3-track"><i></i></div><div class="d3-msg"></div></div>' +
    '<div class="d3-hint">Drag to rotate</div>';
  el.appendChild(ui);
  var eName = ui.querySelector('.d3-name'), ePct = ui.querySelector('.d3-pct'), eFill = ui.querySelector('.d3-track i'), eMsg = ui.querySelector('.d3-msg'), eSteps = ui.querySelectorAll('.d3-steps span');
  function step(n, msg) { for (var i = 0; i < eSteps.length; i++) eSteps[i].className = i === n ? 'on' : (i < n ? 'done' : ''); eMsg.textContent = msg; }

  var ry = -0.62, rx = 0.3, drag = false, lx = 0, ly = 0, idle = 0, visible = true;
  function size() { var w = el.clientWidth, h = el.clientHeight; if (!w || !h) return; renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
  cv.style.touchAction = 'pan-y'; cv.style.cursor = 'grab';
  cv.addEventListener('pointerdown', function (e) { drag = true; lx = e.clientX; ly = e.clientY; cv.style.cursor = 'grabbing'; try { cv.setPointerCapture(e.pointerId); } catch (x) {} });
  cv.addEventListener('pointermove', function (e) { if (!drag) return; ry += (e.clientX - lx) * 0.01; rx = Math.max(0.05, Math.min(1.1, rx + (e.clientY - ly) * 0.006)); lx = e.clientX; ly = e.clientY; });
  function up() { if (drag) { drag = false; idle = 180; cv.style.cursor = 'grab'; } }
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  if (window.ResizeObserver) new ResizeObserver(size).observe(el); else window.addEventListener('resize', size);
  if (window.IntersectionObserver) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(el);

  function ease(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }
  function seg(t, a, b) { return ease((t - a) / (b - a)); }
  var CY = 19, t0 = performance.now(), lastCycle = -1;
  var padTop = H - 0.06, padLow = 0.24;
  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;
    var tt = ((now - t0) / 1000), cyc = Math.floor(tt / CY), t = tt % CY;
    if (opts.freeze != null) { t = opts.freeze; cyc = 0; }
    if (cyc !== lastCycle) { lastCycle = cyc; swap(cyc); eName.textContent = 'Dock D-1 · ' + names[cur]; }
    var hh = drone.userData.hh / 2 + 0.03;
    // lids: open 0..8.2, closing 8.2..9.4, closed ..14, opening 14..15.2
    var closed = t < 8.2 ? 0 : t < 9.4 ? seg(t, 8.2, 9.4) : t < 14 ? 1 : 1 - seg(t, 14, 15.2);
    var open = 1 - closed;
    lidL.position.x = -open * 1.5; lidR.position.x = open * 1.5;
    lidL.rotation.z = open * 0.28; lidR.rotation.z = -open * 0.28;
    lidL.position.y = H + 0.05 + open * 0.12; lidR.position.y = H + 0.05 + open * 0.12;
    // pad: up until 7, lowers 7..8.2, low until 15, rises 15..16.2
    var low = t < 7 ? 0 : t < 8.2 ? seg(t, 7, 8.2) : t < 15 ? 1 : 1 - seg(t, 15, 16.2);
    var py = padTop + (padLow - padTop) * low; padG.position.y = py;
    // drone path
    var x = 0, y = py + hh, z = 0, spin = 0, pct = 22;
    if (t < 4) { var a = seg(t, 0, 4); x = 6.5 * (1 - a); y = py + hh + 1.5 + 3.2 * (1 - a); z = -2.2 * (1 - a); spin = 1; step(0, 'Mission complete. Returning to the dock on its own.'); }
    else if (t < 6.4) { var b = seg(t, 4, 6.4); y = py + hh + 1.5 * (1 - b); x = Math.sin(t * 5) * 0.03 * (1 - b); spin = 1; step(1, 'Camera locks on the pad marker. Lands within a few centimetres.'); }
    else if (t < 7) { spin = 1 - seg(t, 6.4, 7); step(1, 'Touchdown. Rotors stop.'); }
    else if (t < 9.4) { step(2, 'Pad lowers, lids close. The drone is out of the sun, dust and rain.'); }
    else if (t < 14) { var c = (t - 9.4) / 4.6; pct = 22 + Math.round(78 * ease(c)); step(3, 'Fast charge and health check. Images upload to the control room.'); glow.intensity = 1.2 + Math.sin(t * 6) * 0.5; }
    else if (t < 16.2) { pct = 100; step(4, 'Next patrol is due. Weather check passed. Lids open.'); }
    else if (t < 16.8) { pct = 100; spin = seg(t, 16.2, 16.8); step(4, 'Rotors start.'); }
    else { pct = 100; var d = seg(t, 16.8, CY); y = py + hh + 4.6 * d; x = -6.5 * d * d; z = 2 * d * d; spin = 1; step(4, 'Launched for the next patrol. No pilot on site.'); }
    if (t < 9.4 || t >= 14) glow.intensity = 0;
    var see = t < 8.6 ? 0 : t < 9.6 ? seg(t, 8.6, 9.6) : t < 13.6 ? 1 : 1 - seg(t, 13.6, 14.4); glass.opacity = 1 - 0.78 * see; barBg.visible = bar.visible = see < 0.5;
    follow.position.set(x + 1.2, y + 1.6, z + 1.8);
    drone.position.set(x, y, z);
    drone.rotation.set(0, t < 4 ? -0.4 : 0, (t < 4 ? -0.08 : t > 16.8 ? 0.1 : 0));
    drone.userData.spins.forEach(function (o) { o.rotation[o.userData.axis] += o.userData.spin * 2.2 * spin; });
    var f = pct / 100; bar.scale.x = Math.max(0.02, f); bar.position.x = -0.8 * (1 - f);
    ePct.textContent = pct + '%'; eFill.style.width = pct + '%';
    packs.forEach(function (p, i) { p.material.emissiveIntensity = 0.5 + 0.5 * Math.sin(now / 400 + i); });
    ring.material.opacity = (t > 3 && t < 7) ? 0.55 + 0.45 * Math.sin(now / 120) : 0.8;
    cup.rotation.y += 0.12;
    if (!drag) { if (idle > 0) idle--; else ry += 0.0016; }
    var dist = cam.aspect < 1.1 ? 15 : 12.5;
    cam.position.set(Math.sin(ry) * Math.cos(rx) * dist, 1.6 + Math.sin(rx) * dist, Math.cos(ry) * Math.cos(rx) * dist);
    cam.lookAt(0, 1.5, 0);
    renderer.render(scene, cam);
  }
  size(); requestAnimationFrame(frame);
  return { size: size };
};
