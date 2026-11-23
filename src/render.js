/* Builds the presentation sections from window.PAGE, then the widgets. */
(function () {
  'use strict';
  var P = window.PAGE, S = P.pres, $ = function (s, r) { return (r || document).querySelector(s); };
  var FLEET = {
    beetle: { model: 'isr', tab: 'Surveillance drone', name: 'BEETLE', role: 'Surveillance · lives in the dock', desc: 'The eyes. Flies the scheduled patrols on its own, streams live video to the control room, and returns to the dock to charge.', spec: [['Flight time', '70 min'], ['Range', '15 km'], ['Take-off weight', '6.5 kg'], ['Day camera', '30× optical zoom, 4K'], ['Night camera', 'Thermal imaging'], ['Wind limit', '12 m/s']] },
    falcon: { model: 'drop', tab: 'Payload drone', name: 'FALCON-20', role: 'Payload · four separate drops', desc: 'The hands. Carries four loads and releases each one at a different place in a single flight, on an officer\'s approval.', spec: [['Payload', '6 kg'], ['Drops per flight', '4 × 1.5 kg'], ['Flight time', '50 to 60 min'], ['Range', '5 km at 60 km/h'], ['Release', 'Remote, one at a time'], ['Loads', P.loads || 'Life buoys, medical kits']] },
    octa: { model: 'lift', tab: 'Heavy-lift drone', name: 'OCTA PLUS XTREAM', role: 'Heavy lift · 20 kg', desc: 'For the heavy jobs: bulk relief, rescue equipment, large loudspeaker or lighting units. Redundant motors keep it flying if one fails.', spec: [['Payload', '20 kg'], ['Take-off weight', '50 kg'], ['Motors', 'Redundant'], ['Range', '5 km'], ['Control', 'Autonomous route, manual override'], ['Loads', 'Relief, equipment, lighting']] },
    recon: { model: 'ugv', tab: 'Ground robot + tethered drone', name: 'RECON + EYES', role: 'Tethered watch · unlimited flight time', desc: 'A 4-wheel-drive ground robot that carries a tethered drone. Power comes up the cable, so the camera stays over one spot for a whole shift.', spec: [['Flight time', 'Unlimited on tether'], ['Base', '4-wheel-drive robot'], ['Deploy and recover', 'Automatic'], ['Use', 'Fixed watch over one area'], ['Link', 'Video through the cable'], ['Night', 'Thermal camera']] },
    vtol: { model: 'vtol', tab: 'Long-range survey wing', name: 'VTOL SURVEY WING', role: 'Long corridors · no runway', desc: 'Takes off straight up, then flies like an aeroplane. Built for long rivers, canals and pipelines where a multirotor would need many battery changes.', spec: [['Take-off', 'Vertical, no runway'], ['Best for', 'Long linear corridors'], ['Cameras', 'Mapping, zoom, thermal'], ['Output', 'Maps and measured models'], ['Positioning', 'RTK, centimetre level'], ['Crew', 'Planned route, flies itself']] }
  };
  function h(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  var main = $('#pres'), o = '';
  // nav
  $('#nav-who').textContent = S.who;
  // hero
  o += '<section class="s" id="top"><div class="wrap hero"><div><p class="eyebrow rv">' + S.hero.eyebrow + '</p><h1 class="rv">' + S.hero.title + '</h1><p class="lead rv">' + S.hero.sub + '</p><div class="chips rv">' + S.hero.chips.map(function (c) { return '<span class="chip">' + c + '</span>'; }).join('') + '</div><div class="cta rv"><a class="btn" href="#demo">▶ Open the live demo</a><a class="btn ghost" href="#problem">Start with the problem ↓</a></div></div>' +
    '<div class="rv"><div class="dock3d" id="dock3d"></div><div class="concept-note">Nurture drone-in-a-box. Live 3D illustration of one cycle: return, land, charge, launch.</div></div></div></section>';
  // problem
  o += '<section class="s alt" id="problem"><div class="wrap"><p class="eyebrow red rv">The problem</p><h2 class="rv">' + S.problem.title + '</h2><p class="lead rv">' + S.problem.lead + '</p>' +
    '<div class="stats">' + S.problem.stats.map(function (s) { return '<div class="stat rv"><div class="n">' + s[0] + '</div><div class="l">' + s[1] + '</div></div>'; }).join('') + '</div>' +
    '<div class="two"><div class="pts">' + S.problem.points.map(function (p, i) { return '<div class="pt rv"><div class="k">0' + (i + 1) + '</div><p><b>' + p[0] + '</b>' + p[1] + '</p></div>'; }).join('') + '</div><div class="widget rv" id="widget"></div></div></div></section>';
  // concept
  var C = S.concept;
  o += '<section class="s" id="concept"><div class="wrap"><p class="eyebrow rv">The concept</p><h2 class="rv">' + C.title + '</h2><p class="lead rv">' + C.lead + '</p>' +
    '<div class="loop rv" id="loop">' + C.loop.map(function (l, i) { return '<div class="lst' + (l[2] ? ' human' : '') + '"><b>' + l[0] + '</b><p>' + l[1] + '</p></div>'; }).join('') + '</div>' +
    '<div class="three">' +
    '<div class="card rv"><div class="tag">Eyes · surveillance drones</div><h3>See it early</h3><p>' + C.eyes + '</p></div>' +
    '<div class="card rv"><div class="tag">Hands · payload drones</div><h3>Reach it fast</h3><p>' + C.hands + '</p></div>' +
    '<div class="card rv"><div class="tag">Home · the dock</div><h3>Always on site</h3><p>A weatherproof box, 1.4 m × 1.4 m, that the drone lands in, charges in and launches from. Built for 48 °C summers, dust and rain, with a solar option. It checks the weather before every launch and signs a record of every flight.</p></div>' +
    '</div></div></section>';
  // fleet
  o += '<section class="s alt" id="fleet"><div class="wrap"><p class="eyebrow rv">The equipment</p><h2 class="rv">Nurture platforms, designed and built in India</h2><p class="lead rv">Drag the model to turn it. Each aircraft is specified by what it must do. Cameras are chosen by performance: optical zoom for detail by day, thermal for night and heat' + (P.key === 'water' ? ', multispectral for water colour' : '') + '.</p>' +
    '<div class="ftabs rv">' + S.fleet.map(function (k, i) { return '<button class="ftab' + (i ? '' : ' on') + '" data-k="' + k + '">' + FLEET[k].tab + '</button>'; }).join('') + '</div>' +
    '<div class="fleet rv"><div class="fview" id="fview"><div class="role" id="frole"></div><div class="cap">Drag to rotate · illustrative 3D model</div></div><div class="fspec" id="fspec"></div></div>' +
    '<div class="three" style="margin-top:22px">' + S.sensors.map(function (s) { return '<div class="card rv"><div class="tag">' + s[0] + '</div><p>' + s[1] + '</p></div>'; }).join('') + '</div></div></section>';
  // use cases
  o += '<section class="s" id="usecases"><div class="wrap"><p class="eyebrow rv">Use cases</p><h2 class="rv">' + S.uc.title + '</h2><p class="lead rv">' + S.uc.lead + '</p>' +
    '<div class="legend rv"><span><span class="badge g">Ready</span> used in the field by agencies today</span><span><span class="badge a">Pilot first</span> works, needs tuning on your site</span><span><span class="badge b">Trial</span> experimental, we will say so</span></div>' +
    '<div class="uc">' + S.uc.items.map(function (u, i) { return '<div class="ucc rv"><div class="top"><span class="num">' + (i < 9 ? '0' : '') + (i + 1) + '</span><span class="badge ' + u[3] + '">' + ({ g: 'Ready', a: 'Pilot first', b: 'Trial' })[u[3]] + '</span></div><b>' + u[0] + '</b><p>' + u[1] + '</p><div class="sn">' + u[2] + '</div></div>'; }).join('') + '</div>' +
    (S.uc.not ? '<p class="fine rv" style="margin-top:18px">' + S.uc.not + '</p>' : '') + '</div></section>';
  // autonomy
  var A = S.auto;
  o += '<section class="s alt" id="autonomy"><div class="wrap"><p class="eyebrow amber rv">Autonomy with a human in the middle</p><h2 class="rv">The software does the flying and the watching. ' + A.who + ' makes every decision that matters.</h2><p class="lead rv">Autonomy is what makes one control room able to run many drones. It is not what decides. This is the line we draw, and the demo below works exactly this way.</p>' +
    '<div class="auto"><div class="card rv"><div class="tag">1 · Flies itself</div><h3>No pilot for routine work</h3><ul>' + A.self.map(li).join('') + '</ul></div>' +
    '<div class="card rv"><div class="tag">2 · Detects and proposes</div><h3>Software ranks what it sees</h3><ul>' + A.detect.map(li).join('') + '</ul></div>' +
    '<div class="card h rv"><div class="tag">3 · A person decides</div><h3>Nothing is sent without approval</h3><ul>' + A.human.map(li).join('') + '</ul></div></div>' +
    '<p class="quote rv">' + A.quote + '</p></div></section>';
  function li(x) { return '<li>' + x + '</li>'; }
  main.innerHTML = o;
  // closing section goes after the demo
  var K = S.close;
  $('#after').innerHTML = '<section class="s" id="next"><div class="wrap"><p class="eyebrow rv">Next step</p><h2 class="rv">' + K.title + '</h2><p class="lead rv">' + K.lead + '</p>' +
    '<div class="steps3">' + K.steps.map(function (s, i) { return '<div class="card rv"><div class="tag">' + s[0] + '</div><h3>' + s[1] + '</h3><p>' + s[2] + '</p></div>'; }).join('') + '</div>' +
    '<ul class="fine rv">' + K.fine.map(li).join('') + '</ul>' +
    '<div class="sign rv"><div><b>Mohit Bafna</b>Co-founder & CEO, Nurture Aerospace<br>mohit@nurtureaerospace.com</div><div><b>Nitin Jain</b>Co-founder & COO, Nurture Aerospace<br>nitinjain@nurtureaerospace.com</div></div></div></section>';

  // reveal on scroll
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
  Array.prototype.forEach.call(document.querySelectorAll('.rv'), function (e, i) { e.style.transitionDelay = (i % 6) * 60 + 'ms'; io.observe(e); });
  // nav highlight
  var links = document.querySelectorAll('.nav .links a[href^="#"]');
  var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) Array.prototype.forEach.call(links, function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); }); }); }, { rootMargin: '-45% 0px -50% 0px' });
  Array.prototype.forEach.call(document.querySelectorAll('section[id]'), function (s) { io2.observe(s); });
  // loop animation
  var ls = document.querySelectorAll('#loop .lst'), li0 = 0; setInterval(function () { Array.prototype.forEach.call(ls, function (e, i) { e.classList.toggle('on', i === li0); }); li0 = (li0 + 1) % ls.length; }, 1500);
  // 3D
  var fz = (location.search.match(/d3=([0-9.]+)/) || [])[1]; try { window.Dock3D($('#dock3d'), { freeze: fz ? +fz : null, models: ['isr', 'drop'], names: ['Surveillance drone', 'Payload drone'] }); } catch (e) { $('#dock3d').classList.add('no3d'); }
  var viewer = null;
  function showFleet(k) {
    var f = FLEET[k]; $('#frole').textContent = f.role;
    $('#fspec').innerHTML = '<div class="fr">' + f.role + '</div><h3>' + f.name + '</h3><p>' + f.desc + '</p><div class="spec">' + f.spec.map(function (s) { return '<div><span>' + s[0] + '</span><b>' + s[1] + '</b></div>'; }).join('') + '</div>';
    Array.prototype.forEach.call(document.querySelectorAll('.ftab'), function (b) { b.classList.toggle('on', b.getAttribute('data-k') === k); });
    if (window.NA3D) { try { if (!viewer) { viewer = window.NA3D.create({ zoom: false }); $('#fview').insertBefore(viewer.el, $('#fview').firstChild); } viewer.set(f.model); viewer.size(); } catch (e) {} }
  }
  Array.prototype.forEach.call(document.querySelectorAll('.ftab'), function (b) { b.onclick = function () { showFleet(b.getAttribute('data-k')); }; });
  showFleet(S.fleet[0]);

  /* ---------- widgets ---------- */
  var w = $('#widget');
  if (S.problem.widget === 'density') {
    w.innerHTML = '<div class="wt">Try it</div><h3>How many people fit in one square metre?</h3><canvas width="840" height="440"></canvas><input type="range" min="1" max="8" step="0.5" value="2"><div class="wread"><div><span class="big" id="wd">2.0</span> people per m²</div><div class="band" id="wb"></div></div><div class="wsay" id="ws"></div><div class="wfoot">Each square is one square metre, seen from above. Safety guidance for moving crowds sets the limit at 4 people per m².</div>';
    var cv = $('canvas', w), cx = cv.getContext('2d'), rg = $('input', w), seed = [];
    for (var i = 0; i < 400; i++) seed.push([Math.random(), Math.random(), Math.random()]);
    var drawD = function () {
      var d = +rg.value, cols = 7, rows = 3.5, s = 120; cx.clearRect(0, 0, 840, 440); cx.fillStyle = '#0b1013'; cx.fillRect(0, 0, 840, 440);
      var col = d > 5 ? '#ff2d2f' : d >= 4 ? '#ff8a1f' : d >= 2 ? '#ffd84d' : '#3ddc84';
      cx.strokeStyle = 'rgba(255,255,255,.12)'; for (var x = 0; x <= cols; x++) { cx.beginPath(); cx.moveTo(x * s, 0); cx.lineTo(x * s, 440); cx.stroke(); } for (var y = 0; y <= 4; y++) { cx.beginPath(); cx.moveTo(0, y * s); cx.lineTo(840, y * s); cx.stroke(); }
      var n = Math.round(d * cols * rows), t = performance.now() / 1000, mv = d < 4 ? (4 - d) / 3 : 0;
      for (var k = 0; k < n; k++) { var q = seed[k % 400], px = ((q[0] * 840 + t * 26 * mv * (0.5 + q[2])) % 840), py = q[1] * 440 + Math.sin(t * 2 + k) * 3 * mv; cx.beginPath(); cx.ellipse(px, py, 15, 10, 0, 0, 6.3); cx.fillStyle = 'rgba(0,0,0,.5)'; cx.fill(); cx.beginPath(); cx.ellipse(px, py, 14, 9, 0, 0, 6.3); cx.fillStyle = col; cx.globalAlpha = 0.85; cx.fill(); cx.globalAlpha = 1; cx.beginPath(); cx.arc(px, py, 5.5, 0, 6.3); cx.fillStyle = '#1b1f22'; cx.fill(); }
      $('#wd').textContent = d.toFixed(1); var b = $('#wb'); b.style.color = col;
      b.textContent = d > 5 ? 'Crush risk' : d >= 4 ? 'At the limit' : d >= 2 ? 'Busy, still moving' : 'Free movement';
      $('#ws').textContent = d > 5 ? 'People are pressed together and cannot choose where to go. The crowd moves like a liquid. One person falling can start a crush, and nobody inside can see it coming.' : d >= 4 ? 'People touch on all sides. Walking slows to a shuffle. This is the point where entry must be held, and it is the number our drones watch for.' : d >= 2 ? 'A normal festival crowd. People can still walk, turn and step aside.' : 'Plenty of room. People walk at their own speed.';
    };
    rg.oninput = drawD; (function loop() { drawD(); requestAnimationFrame(loop); })();
  }
  if (S.problem.widget === 'race') {
    w.innerHTML = '<div class="wt">Try it</div><h3>Who reaches the scene first?</h3><div class="wread"><div>Distance from the police station: <span class="big" id="wd">2.0</span> km</div></div><input type="range" min="0.5" max="4" step="0.1" value="2"><div class="bars"><div class="bar"><div class="bl"><span>Drone from the dock on the station roof</span><b id="t1"></b></div><div class="bt"><i id="b1" style="background:var(--green)"></i></div></div><div class="bar"><div class="bl"><span>Patrol van through city traffic</span><b id="t2"></b></div><div class="bt"><i id="b2" style="background:var(--red)"></i></div></div></div><div class="wsay" id="ws"></div><div class="wfoot">Illustration. Drone: 45 s to launch, then 15 m/s in a straight line. Van: 60 s to dispatch, then 20 km/h by road, with the road 1.3 times the straight distance. The pilot measures both for real.</div>';
    var r2 = $('input', w), fmt = function (s) { return Math.floor(s / 60) + ' min ' + ('0' + Math.round(s % 60)).slice(-2) + ' s'; };
    var drawR = function () { var d = +r2.value, a = 45 + d * 1000 / 15, b = 60 + d * 1.3 / 20 * 3600; $('#wd').textContent = d.toFixed(1); $('#t1').textContent = fmt(a); $('#t2').textContent = fmt(b); $('#b1').style.width = (a / 1000 * 100) + '%'; $('#b2').style.width = Math.min(100, b / 1000 * 100) + '%'; $('#ws').innerHTML = 'The control room sees the scene <b style="color:var(--text)">' + fmt(b - a) + '</b> before the van arrives. That is time to send the right help, warn the crew of what is waiting, or stand them down.'; };
    r2.oninput = drawR; drawR();
  }
  if (S.problem.widget === 'swipe') {
    var sw = S.problem.swipe;
    w.innerHTML = '<div class="wt">Try it</div><h3>' + sw.title + '</h3><div class="swipe"><div class="lay" id="sw1"></div><div class="lay top" id="sw2"></div><div class="hdl"></div><span class="tg l">WHAT THE EYE SEES</span><span class="tg r">WHAT THE THERMAL CAMERA SEES · SIMULATED</span></div><div class="wsay">' + sw.say + '</div><div class="wfoot">Real satellite image of the Godavari at Nashik. The thermal layer is simulated to show the principle.</div>';
    var go = function () { var f = { id: 'W', time: '', pos: sw.pos, _m: { alt: '' } }; window.NDemo.drawView($('#sw1'), f, { type: 'sat', z: sw.z || 18, scale: sw.scale || 1.6, cap: false }); window.NDemo.drawView($('#sw2'), f, { type: 'thermal', z: sw.z || 18, scale: sw.scale || 1.6, cap: false, cross: false, heat: sw.heat, dim: sw.dim, marks: sw.marks }); var vs = $('#sw2 .vsim'); if (vs) vs.remove(); var vb = $('#sw2 .vbar'); if (vb) vb.remove(); };
    setTimeout(go, 300);
    var box = $('.swipe', w), mv2 = function (e) { var r = box.getBoundingClientRect(), x = Math.max(0, Math.min(1, ((e.touches ? e.touches[0].clientX : e.clientX) - r.left) / r.width)); $('#sw2').style.clipPath = 'inset(0 0 0 ' + (x * 100) + '%)'; $('.hdl', box).style.left = (x * 100) + '%'; };
    box.addEventListener('mousemove', mv2); box.addEventListener('touchmove', mv2, { passive: true });
  }
})();
