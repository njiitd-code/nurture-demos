/* Illustrative 3D platform models, built from primitives. Exposes window.NA3D = { has(id), create(opts) }. */
(function () {
  'use strict';
  var T = window.THREE;
  function webgl() { try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { return false; } }
  if (!T || !webgl()) { window.NA3D = null; return; }

  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* Colours follow each platform's product photography. Edges are kept faint so the models read as solid objects. */
  function M(color, metal, rough, emissive) { return new T.MeshStandardMaterial({ color: color, metalness: metal, roughness: rough, emissive: emissive || 0x000000 }); }
  var MAT = {
    hull: M(0x4a6470, 0.5, 0.45),
    black: M(0x1b1f22, 0.45, 0.55),
    carbon: M(0x24292d, 0.55, 0.45),
    gun: M(0x59626a, 0.6, 0.38),
    grey: M(0x8a9196, 0.55, 0.4),
    silver: M(0xc4cacd, 0.8, 0.25),
    white: M(0xe6eaec, 0.2, 0.4),
    olive: M(0x56623f, 0.3, 0.6),
    green: M(0x2a5f2e, 0.3, 0.6),
    tan: M(0x977d60, 0.35, 0.75),
    tanDark: M(0x7d6850, 0.35, 0.75),
    navy: M(0x1f2b45, 0.45, 0.5),
    teal: M(0x2f97a8, 0.35, 0.45),
    lilac: M(0xb7b4d6, 0.3, 0.5),
    maroon: M(0x6a2e2e, 0.4, 0.55),
    red: M(0xb6262b, 0.35, 0.45),
    copper: M(0xa9483c, 0.3, 0.55),
    hot: M(0xff7a2f, 0.3, 0.5, 0x4a1c02),
    amber: M(0xff9a4a, 0.1, 0.4, 0xff6a1a),
    ledG: M(0x6cff9a, 0.1, 0.3, 0x2bdc63),
    ledW: M(0xffffff, 0.1, 0.3, 0xdff4ff),
    ledB: M(0x6aa8ff, 0.1, 0.3, 0x2f6cff),
    lens: M(0x1d3a4a, 0.9, 0.15, 0x0b2230),
    tyre: M(0x141618, 0.1, 0.9),
    disc: new T.MeshBasicMaterial({ color: 0x9bb0b6, transparent: true, opacity: 0.06, side: T.DoubleSide, depthWrite: false }),
    edge: new T.LineBasicMaterial({ color: 0xa9bec2, transparent: true, opacity: 0.16 })
  };

  /* ---------- primitives ---------- */
  function fin(m, p, r, noEdge) {
    if (p) m.position.set(p[0], p[1], p[2]);
    if (r) m.rotation.set(r[0], r[1], r[2]);
    if (!noEdge) m.add(new T.LineSegments(new T.EdgesGeometry(m.geometry, 28), MAT.edge));
    return m;
  }
  function box(w, h, d, mat, p, r) { return fin(new T.Mesh(new T.BoxGeometry(w, h, d), mat || MAT.hull), p, r); }
  function cyl(rt, rb, h, mat, p, r, seg) { return fin(new T.Mesh(new T.CylinderGeometry(rt, rb, h, seg || 20), mat || MAT.hull), p, r); }
  function sph(rad, mat, p) { return fin(new T.Mesh(new T.SphereGeometry(rad, 18, 14), mat || MAT.lens), p, null, true); }
  function grp(p, r) { var g = new T.Group(); if (p) g.position.set(p[0], p[1], p[2]); if (r) g.rotation.set(r[0], r[1], r[2]); return g; }
  /* side profile [[x,y],...] extruded along z, centred on z */
  function prism(pts, depth, mat, p) {
    var s = new T.Shape(); s.moveTo(pts[0][0], pts[0][1]); pts.slice(1).forEach(function (q) { s.lineTo(q[0], q[1]); });
    var geo = new T.ExtrudeGeometry(s, { depth: depth, bevelEnabled: false }); geo.translate(0, 0, -depth / 2);
    return fin(new T.Mesh(geo, mat), p);
  }
  var HP = Math.PI / 2;

  function prop(rad, y, dir, blades, mat) {
    var g = grp([0, y, 0]), n = blades || 2, i;
    for (i = 0; i < n; i++) {
      var bl = grp(null, [0, i * 2 * Math.PI / n, 0]);
      bl.add(box(rad * 0.92, 0.012, rad * 0.14, mat || MAT.carbon, [rad * 0.52, 0, 0], [0.2, 0, 0]));
      g.add(bl);
    }
    g.add(cyl(rad * 0.09, rad * 0.09, 0.04, MAT.black, null, null, 10));
    var d = new T.Mesh(new T.CircleGeometry(rad, 28), MAT.disc); d.rotation.x = -HP; g.add(d);
    g.userData.spin = (dir || 1) * 0.5; g.userData.axis = 'y';
    return g;
  }
  /* o: {hub, cap, lugs, spokes} */
  function wheel(rad, w, p, o) {
    o = o || {};
    var g = grp(p), i;
    g.add(cyl(rad, rad, w, MAT.tyre, null, [HP, 0, 0], 24));
    if (o.lugs) for (i = 0; i < o.lugs; i++) { var a = i * 2 * Math.PI / o.lugs; g.add(box(rad * 0.16, rad * 0.12, w * 0.9, MAT.tyre, [Math.cos(a) * rad, Math.sin(a) * rad, 0], [0, 0, a])); }
    g.add(cyl(rad * (o.hubR || 0.58), rad * (o.hubR || 0.58), w * 1.04, o.hub || MAT.black, null, [HP, 0, 0], 16));
    if (o.holes) [-1, 1].forEach(function (s) { for (i = 0; i < o.holes; i++) { var b = i * 2 * Math.PI / o.holes; g.add(cyl(rad * 0.07, rad * 0.07, 0.01, MAT.black, [Math.cos(b) * rad * 0.28, Math.sin(b) * rad * 0.28, s * w * 0.53], [HP, 0, 0], 8)); } });
    g.add(cyl(rad * 0.14, rad * 0.14, w * 1.1, o.cap || MAT.gun, null, [HP, 0, 0], 10));
    return g;
  }

  /* ---------- multirotor family ---------- */
  function strut(g, a, b, t, mat) {
    var d = new T.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]), L = d.length();
    var m = cyl(t, t, L, mat || MAT.carbon, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2], null, 10);
    m.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), d.normalize());
    g.add(m); return m;
  }
  /* skid gear: two skids along x at z = +/-hw, each with two struts up to the body; optional end caps */
  function skids(g, hl, hw, drop, mat, caps, top) {
    top = top || [hl * 0.45, hw * 0.45];
    [-1, 1].forEach(function (s) {
      strut(g, [-hl, -drop, s * hw], [hl, -drop, s * hw], 0.026, mat);
      [-1, 1].forEach(function (e) {
        strut(g, [e * top[0], -0.04, s * top[1]], [e * hl * 0.55, -drop, s * hw], 0.022, mat);
        if (caps) g.add(cyl(0.042, 0.042, 0.09, caps, [e * (hl + 0.03), -drop, s * hw], [0, 0, HP], 12));
      });
    });
  }
  /* splayed legs: one leg per point, from the body down and out to a small foot */
  function splay(g, top, foot, drop, mat, t, footMat) {
    top.forEach(function (p, i) {
      var f = foot[i];
      strut(g, [p[0], -0.05, p[1]], [f[0], -drop, f[1]], t || 0.02, mat);
      g.add(sph(0.03, footMat || MAT.black, [f[0], -drop, f[1]]));
    });
  }
  function radial(n, R, off) { var p = [], i, a; for (i = 0; i < n; i++) { a = (off == null ? Math.PI / n : off) + i * 2 * Math.PI / n; p.push([Math.cos(a) * R, Math.sin(a) * R]); } return p; }
  /* o.pts: rotor positions [x,z]; one rotor is drawn per point, so the rotor count always equals pts.length */
  function multirotor(o) {
    var g = grp(), pr = o.prop, t = o.arm || 0.034;
    o.pts.forEach(function (p, i) {
      var a = o.attach ? o.attach(p, i) : [0, 0];
      strut(g, [a[0], 0, a[1]], [p[0], 0, p[1]], t, o.armMat || MAT.carbon);
      var mh = o.motorH || 0.1, mr = o.motorR || pr * 0.16;
      g.add(cyl(mr, mr * 1.08, mh, o.motorMat || MAT.black, [p[0], 0.03 + mh / 2 - 0.05, p[1]], null, 16));
      if (o.ring) g.add(cyl(mr * 1.1, mr * 1.1, 0.02, o.ring, [p[0], 0.0, p[1]], null, 16));
      if (o.under) g.add(cyl(mr * 0.7, mr * 0.7, 0.03, o.under, [p[0], -0.06, p[1]], null, 12));
      if (o.joint) g.add(cyl(t * 1.5, t * 1.5, 0.07, o.joint, [a[0] + (p[0] - a[0]) * 0.55, 0, a[1] + (p[1] - a[1]) * 0.55], [0, -Math.atan2(p[1] - a[1], p[0] - a[0]), HP], 12));
      var q = prop(pr, mh + 0.02, i % 2 ? 1 : -1, o.blades, o.bladeMat); q.position.x = p[0]; q.position.z = p[1]; q.rotation.y = i * 0.9; g.add(q);
    });
    o.body(g);
    return g;
  }
  function gimbal(g, y, x, mat) {
    g.add(cyl(0.03, 0.03, 0.08, MAT.black, [x, y + 0.03, 0], null, 10));
    g.add(box(0.05, 0.12, 0.03, mat || MAT.black, [x, y - 0.04, 0.08]));
    var ball = sph(0.075, mat || MAT.black, [x, y - 0.1, 0]); g.add(ball);
    g.add(sph(0.032, MAT.lens, [x + 0.065, y - 0.1, 0.02])); g.add(sph(0.022, MAT.lens, [x + 0.068, y - 0.1, -0.03]));
  }

  /* ---------- models ---------- */
  var MODELS = {
    /* quadcopter, dark grey: long slim arms, box fuselage, belly gimbal with sensor pod, four splayed legs */
    isr: function () {
      return multirotor({ pts: radial(4, 1.05), prop: 0.55, blades: 2, arm: 0.03, armMat: MAT.black, motorMat: MAT.gun, bladeMat: MAT.black, body: function (g) {
        g.add(box(0.46, 0.17, 0.3, MAT.gun));
        g.add(box(0.3, 0.06, 0.24, MAT.black, [-0.05, 0.11, 0]));
        g.add(box(0.12, 0.08, 0.16, MAT.carbon, [0.24, -0.02, 0]));
        gimbal(g, -0.12, 0.14, MAT.carbon);
        g.add(box(0.2, 0.14, 0.18, MAT.black, [-0.04, -0.36, 0])); g.add(sph(0.035, MAT.lens, [0.065, -0.36, 0.04])); g.add(sph(0.035, MAT.lens, [0.065, -0.36, -0.04]));
        strut(g, [-0.04, -0.1, 0], [-0.04, -0.29, 0], 0.012, MAT.black);
        splay(g, [[0.16, 0.12], [0.16, -0.12], [-0.16, 0.12], [-0.16, -0.12]], [[0.42, 0.36], [0.42, -0.36], [-0.42, 0.36], [-0.42, -0.36]], 0.62, MAT.black, 0.014);
      } });
    },
    /* quadcopter, H-frame: carbon-black fuselage, olive arm tubes, red-capped motors, two drop canisters, olive skids */
    drop: function () {
      var pts = [[0.5, 0.88], [-0.5, 0.88], [-0.5, -0.88], [0.5, -0.88]];
      return multirotor({ pts: pts, prop: 0.5, blades: 2, arm: 0.04, armMat: MAT.olive, motorMat: MAT.black, ring: MAT.red, bladeMat: MAT.carbon, motorR: 0.08, motorH: 0.14,
        attach: function (p) { return [p[0], 0]; },
        body: function (g) {
          g.add(box(1.25, 0.16, 0.3, MAT.black, [0, 0.02, 0]));
          g.add(box(0.5, 0.04, 0.24, MAT.carbon, [0.05, 0.12, 0]));
          [-0.1, 0.1].forEach(function (x) { g.add(box(0.05, 0.05, 0.12, MAT.gun, [x, 0.17, 0])); });
          [-1, 1].forEach(function (s) {
            g.add(cyl(0.075, 0.075, 0.34, MAT.black, [-0.12, -0.3, s * 0.1], null, 18));
            g.add(sph(0.075, MAT.black, [-0.12, -0.47, s * 0.1]));
            g.add(cyl(0.03, 0.03, 0.08, MAT.gun, [-0.12, -0.1, s * 0.1], null, 10));
          });
          gimbal(g, -0.1, 0.42);
          skids(g, 0.62, 0.3, 0.6, MAT.olive, MAT.black, [0.4, 0.12]);
        } });
    },
    /* quadcopter, black X frame: square deck, large grey motor pods with amber lights, copper box on top, battery tray, skids with red caps */
    lift: function () {
      return multirotor({ pts: radial(4, 1.05), prop: 0.6, blades: 2, arm: 0.05, armMat: MAT.black, motorMat: MAT.gun, under: MAT.amber, joint: MAT.silver, bladeMat: MAT.black, motorR: 0.13, motorH: 0.18, body: function (g) {
        g.add(box(0.72, 0.13, 0.72, MAT.black));
        g.add(box(0.24, 0.08, 0.18, MAT.copper, [0.05, 0.105, 0]));
        g.add(sph(0.012, MAT.amber, [0.17, 0.11, 0.04]));
        [[0.25, 0.25], [0.25, -0.25], [-0.25, 0.25], [-0.25, -0.25]].forEach(function (c) { strut(g, [c[0], -0.06, c[1]], [c[0], -0.3, c[1]], 0.015, MAT.black); });
        g.add(box(0.62, 0.025, 0.62, MAT.black, [0, -0.3, 0]));
        g.add(box(0.46, 0.17, 0.34, MAT.grey, [0, -0.2, 0]));
        skids(g, 0.55, 0.42, 0.85, MAT.black, MAT.red, [0.26, 0.26]);
        [[0.26, 0.26], [0.26, -0.26], [-0.26, 0.26], [-0.26, -0.26]].forEach(function (c) { g.add(sph(0.03, MAT.silver, [c[0], -0.06, c[1]])); });
      } });
    },
    /* quadcopter, compact X frame in dark navy: white three-blade props, stacked plates, battery, nose-forward olive warhead */
    lm: function () {
      return multirotor({ pts: radial(4, 0.6), prop: 0.32, blades: 3, arm: 0.028, armMat: MAT.navy, motorMat: MAT.black, bladeMat: MAT.white, motorR: 0.05, body: function (g) {
        g.add(box(0.46, 0.03, 0.18, MAT.navy));
        g.add(box(0.46, 0.03, 0.18, MAT.navy, [0, 0.12, 0]));
        [-0.2, 0.2].forEach(function (x) { [-0.07, 0.07].forEach(function (z) { g.add(cyl(0.01, 0.01, 0.12, MAT.gun, [x, 0.06, z], null, 6)); }); });
        g.add(box(0.2, 0.06, 0.1, MAT.hot, [-0.12, 0.165, 0]));
        g.add(box(0.12, 0.05, 0.1, MAT.copper, [0.08, 0.06, 0]));
        g.add(box(0.07, 0.07, 0.08, MAT.black, [0.25, 0.06, 0], [0, 0, 0.35])); g.add(sph(0.026, MAT.lens, [0.29, 0.075, 0]));
        [-1, 1].forEach(function (s) { strut(g, [0.12, -0.01, s * 0.08], [0.0, -0.16, s * 0.08], 0.012, MAT.navy); strut(g, [-0.12, -0.01, s * 0.08], [0.0, -0.16, s * 0.08], 0.012, MAT.navy); });
        g.add(cyl(0.085, 0.085, 0.18, MAT.olive, [-0.02, -0.2, 0], [0, 0, HP], 18));
        g.add(cyl(0.0, 0.085, 0.24, MAT.olive, [0.19, -0.2, 0], [0, 0, -HP], 18));
        g.add(cyl(0.05, 0.085, 0.06, MAT.olive, [-0.14, -0.2, 0], [0, 0, HP], 18));
        g.add(cyl(0.022, 0.022, 0.05, MAT.silver, [0.32, -0.2, 0], [0, 0, HP], 10));
        strut(g, [-0.2, 0.14, 0.05], [-0.3, 0.36, 0.05], 0.008, MAT.black);
      } });
    },
    /* quadcopter (per product photo): olive arms and canopy, black motors with green LED rings, white hourglass tank, spreader, splayed black legs */
    agri: function () {
      return multirotor({ pts: radial(4, 1.0), prop: 0.52, blades: 2, arm: 0.036, armMat: MAT.olive, motorMat: MAT.black, ring: MAT.ledG, bladeMat: MAT.black, motorR: 0.075, body: function (g) {
        g.add(box(0.46, 0.1, 0.46, MAT.black, null, [0, Math.PI / 4, 0]));
        var dome = sph(0.27, MAT.olive, [0, 0.05, 0]); dome.scale.set(1.08, 0.42, 1.08); g.add(dome);
        g.add(cyl(0.008, 0.008, 0.22, MAT.black, [0, 0.25, 0], null, 6)); g.add(cyl(0.035, 0.035, 0.03, MAT.black, [0, 0.36, 0], null, 10));
        g.add(cyl(0.18, 0.26, 0.2, MAT.white, [0, -0.2, 0], null, 22));
        g.add(cyl(0.26, 0.15, 0.24, MAT.white, [0, -0.42, 0], null, 22));
        g.add(box(0.06, 0.12, 0.16, MAT.red, [0.24, -0.3, 0], [0, 0, -0.35]));
        g.add(cyl(0.1, 0.1, 0.1, MAT.black, [0, -0.6, 0], null, 16));
        g.add(cyl(0.2, 0.17, 0.05, MAT.black, [0, -0.68, 0], null, 22));
        splay(g, [[0.16, 0.14], [0.16, -0.14], [-0.16, 0.14], [-0.16, -0.14]], [[0.5, 0.46], [0.5, -0.46], [-0.5, 0.46], [-0.5, -0.46]], 0.82, MAT.black, 0.02);
      } });
    },
    /* hexacopter (per product image): teal hub, hydrogen cylinder strapped on top, grey arms with red folding joints, fuel-cell pack with fans below, maroon legs, red and black feet */
    h2: function () {
      return multirotor({ pts: radial(6, 1.12, 0), prop: 0.46, blades: 2, arm: 0.034, armMat: MAT.grey, motorMat: MAT.grey, joint: MAT.red, bladeMat: MAT.grey, motorR: 0.08, motorH: 0.12, body: function (g) {
        g.add(cyl(0.3, 0.32, 0.16, MAT.teal, [0, 0.02, 0], null, 6));
        g.add(cyl(0.3, 0.3, 0.05, MAT.lilac, [0, -0.08, 0], null, 6));
        g.add(cyl(0.15, 0.15, 0.5, MAT.silver, [0, 0.27, 0], [HP, 0, 0], 22));
        g.add(sph(0.15, MAT.silver, [0, 0.27, 0.25])); g.add(sph(0.15, MAT.silver, [0, 0.27, -0.25]));
        g.add(cyl(0.035, 0.035, 0.07, MAT.tanDark, [0, 0.27, -0.42], [HP, 0, 0], 10));
        [-0.12, 0.12].forEach(function (z) { g.add(cyl(0.157, 0.157, 0.035, MAT.black, [0, 0.27, z], [HP, 0, 0], 22)); });
        g.add(box(0.36, 0.2, 0.32, MAT.grey, [0, -0.24, 0]));
        [-0.08, 0.08].forEach(function (z) { g.add(cyl(0.06, 0.06, 0.02, MAT.gun, [0.185, -0.24, z], [0, 0, HP], 16)); });
        [-1, 1].forEach(function (s) {
          strut(g, [0.16, -0.1, s * 0.14], [0.3, -0.85, s * 0.38], 0.02, MAT.maroon);
          strut(g, [-0.16, -0.1, s * 0.14], [-0.22, -0.85, s * 0.38], 0.02, MAT.maroon);
          g.add(cyl(0.045, 0.045, 0.18, MAT.red, [0.36, -0.86, s * 0.38], [0, 0, HP], 12));
          g.add(cyl(0.045, 0.045, 0.18, MAT.black, [-0.28, -0.86, s * 0.38], [0, 0, HP], 12));
        });
      } });
    },
    /* fixed wing, white: blended pod fuselage, long straight wings with upturned winglets, under-wing booms with four lift rotors, rear pusher */
    vtol: function () {
      var g = grp();
      var f = sph(0.5, MAT.white, [0.05, 0, 0]); f.scale.set(1.25, 0.32, 0.5); g.add(f);
      var r = sph(0.5, MAT.white, [-0.45, 0.01, 0]); r.scale.set(0.5, 0.18, 0.22); g.add(r);
      g.add(sph(0.06, MAT.black, [0.5, -0.1, 0])); g.add(sph(0.03, MAT.lens, [0.55, -0.11, 0]));
      [-1, 1].forEach(function (s) {
        g.add(box(0.5, 0.04, 0.5, MAT.white, [-0.02, 0.0, s * 0.42]));
        g.add(box(0.38, 0.032, 1.3, MAT.white, [-0.06, 0.03, s * 1.3], [s * 0.04, 0, 0]));
        g.add(box(0.26, 0.2, 0.026, MAT.white, [-0.1, 0.13, s * 1.96], [s * -0.25, 0, 0]));
        strut(g, [0.6, -0.06, s * 0.78], [-0.85, -0.06, s * 0.78], 0.03, MAT.white);
        [0.55, -0.8].forEach(function (x, i) {
          g.add(cyl(0.045, 0.05, 0.08, MAT.gun, [x, -0.01, s * 0.78], null, 12));
          var p = prop(0.3, 0.05, (i + (s > 0 ? 1 : 0)) % 2 ? 1 : -1, 2, MAT.black); p.position.x = x; p.position.z = s * 0.78; p.rotation.y = i + s; g.add(p);
        });
      });
      g.add(cyl(0.05, 0.03, 0.12, MAT.gun, [-0.72, 0.02, 0], [0, 0, HP], 12));
      var pp = prop(0.26, 0, 1, 2, MAT.black); pp.rotation.z = HP; pp.position.set(-0.8, 0.02, 0); pp.userData.axis = 'y'; g.add(pp);
      return g;
    },
    /* 4x4 UGV in desert tan: faceted armoured body, dark front fascia with LED headlight bar, large lugged tyres */
    ugv: function () {
      var g = grp();
      g.add(prism([[-0.78, 0.36], [0.74, 0.36], [0.8, 0.5], [0.76, 0.66], [-0.76, 0.66], [-0.8, 0.5]], 0.78, MAT.tanDark));
      g.add(prism([[-0.74, 0.66], [0.62, 0.66], [0.8, 0.74], [0.52, 0.94], [-0.42, 0.97], [-0.72, 0.86]], 0.86, MAT.tan));
      g.add(box(0.08, 0.14, 0.78, MAT.black, [0.79, 0.72, 0]));
      g.add(box(0.02, 0.025, 0.24, MAT.ledW, [0.835, 0.75, 0.22])); g.add(box(0.02, 0.025, 0.24, MAT.ledW, [0.835, 0.75, -0.22]));
      g.add(box(0.14, 0.24, 0.72, MAT.tanDark, [0.8, 0.46, 0]));
      [-1, 1].forEach(function (s) {
        [-0.56, 0.56].forEach(function (x) {
          g.add(wheel(0.34, 0.26, [x, 0.34, s * 0.58], { lugs: 18, hub: MAT.black, hubR: 0.55, cap: MAT.gun }));
          g.add(box(0.12, 0.08, 0.2, MAT.gun, [x, 0.5, s * 0.38]));
        });
        g.add(box(1.0, 0.3, 0.04, MAT.tan, [0, 0.52, s * 0.41]));
      });
      return g;
    },
    /* man-portable UGV (per field image): low skeletal chassis, raised deck on posts, four large tyres with silver hubs, mast */
    mugv: function () {
      var g = grp();
      g.add(box(0.8, 0.12, 0.42, MAT.gun, [0, 0.26, 0]));
      g.add(box(0.7, 0.1, 0.3, MAT.black, [0, 0.36, 0]));
      [[0.28, 0.17], [0.28, -0.17], [-0.28, 0.17], [-0.28, -0.17]].forEach(function (c) { g.add(cyl(0.016, 0.016, 0.26, MAT.silver, [c[0], 0.5, c[1]], null, 8)); });
      g.add(box(0.72, 0.03, 0.42, MAT.grey, [0, 0.64, 0]));
      g.add(box(0.26, 0.12, 0.24, MAT.black, [-0.12, 0.71, 0]));
      g.add(box(0.1, 0.08, 0.1, MAT.black, [0.28, 0.69, 0])); g.add(sph(0.03, MAT.lens, [0.335, 0.69, 0]));
      g.add(cyl(0.007, 0.007, 0.36, MAT.black, [-0.3, 0.84, -0.15], null, 6));
      [-1, 1].forEach(function (s) { [-0.3, 0.3].forEach(function (x) { g.add(wheel(0.2, 0.16, [x, 0.2, s * 0.32], { hub: MAT.silver, hubR: 0.5, cap: MAT.gun })); }); });
      return g;
    },
    /* throwbot in the 4WD pair configuration: two green axle bodies joined by a centre block, spiked black wheels with green hubs */
    throw: function () {
      var g = grp();
      [-0.27, 0.27].forEach(function (x) {
        g.add(cyl(0.11, 0.11, 0.46, MAT.green, [x, 0.22, 0], [HP, 0, 0], 22));
        [-1, 1].forEach(function (s) {
          var w = wheel(0.2, 0.1, [x, 0.22, s * 0.29], { hub: MAT.green, hubR: 0.62, cap: MAT.green, holes: 6 }); g.add(w);
          for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; w.add(box(0.035, 0.035, 0.07, MAT.tyre, [Math.cos(a) * 0.215, Math.sin(a) * 0.215, 0], [0, 0, a])); }
        });
      });
      g.add(box(0.36, 0.15, 0.3, MAT.green, [0, 0.22, 0]));
      g.add(box(0.1, 0.03, 0.12, MAT.grey, [-0.27, 0.34, 0.06]));
      g.add(sph(0.016, MAT.ledB, [0.18, 0.24, 0.13]));
      g.add(sph(0.03, MAT.lens, [0.18, 0.22, 0]));
      return g;
    },
    /* crew vehicle (no product photo yet): olive body, black roll cage, four large tyres */
    atv: function () {
      var g = grp();
      g.add(box(2.3, 0.2, 1.0, MAT.olive, [0, 0.62, 0]));
      g.add(box(0.75, 0.24, 0.9, MAT.olive, [0.85, 0.84, 0], [0, 0, -0.12]));
      g.add(box(0.12, 0.3, 0.9, MAT.black, [1.2, 0.7, 0]));
      g.add(box(0.7, 0.32, 1.0, MAT.olive, [-0.85, 0.88, 0]));
      [-1, 1].forEach(function (s) {
        [0.8, -0.78].forEach(function (x) { g.add(wheel(0.42, 0.28, [x, 0.42, s * 0.62], { lugs: 20, hub: MAT.black, cap: MAT.gun })); g.add(box(0.7, 0.04, 0.3, MAT.black, [x, 0.9, s * 0.62])); });
        var t = 0.028;
        g.add(cyl(t, t, 1.0, MAT.black, [0.48, 1.2, s * 0.48], [0, 0, 0.42], 8));
        g.add(cyl(t, t, 0.9, MAT.black, [-0.5, 1.2, s * 0.48], null, 8));
        g.add(cyl(t, t, 0.8, MAT.black, [-0.1, 1.65, s * 0.48], [0, 0, HP], 8));
        g.add(cyl(t, t, 0.72, MAT.black, [-0.82, 1.38, s * 0.48], [0, 0, -0.85], 8));
        g.add(cyl(t, t, 0.86, MAT.black, [0.1, 1.2, s * 0.48], null, 8));
        [0.2, -0.3].forEach(function (x) { g.add(box(0.3, 0.08, 0.34, MAT.black, [x, 0.78, s * 0.24])); g.add(box(0.07, 0.46, 0.34, MAT.black, [x - 0.16, 1.0, s * 0.24], [0, 0, 0.12])); });
        g.add(sph(0.06, MAT.ledW, [1.27, 0.78, s * 0.32]));
      });
      [0.28, -0.5, -0.1].forEach(function (x) { g.add(cyl(0.028, 0.028, 0.96, MAT.black, [x, 1.65, 0], [HP, 0, 0], 8)); });
      g.add(box(0.06, 0.34, 0.9, MAT.black, [1.34, 0.62, 0]));
      g.add(cyl(0.01, 0.01, 0.4, MAT.black, [-0.5, 1.85, 0.4], null, 6));
      return g;
    },
    /* quadruped (no product photo yet): gunmetal body, black legs */
    robots: function () {
      var g = grp();
      g.add(box(0.95, 0.2, 0.34, MAT.gun, [0, 0.72, 0]));
      g.add(box(0.5, 0.05, 0.3, MAT.black, [-0.05, 0.845, 0]));
      g.add(box(0.2, 0.17, 0.3, MAT.black, [0.55, 0.74, 0]));
      g.add(sph(0.035, MAT.lens, [0.66, 0.76, 0.08])); g.add(sph(0.035, MAT.lens, [0.66, 0.76, -0.08]));
      g.add(cyl(0.06, 0.06, 0.07, MAT.black, [0.3, 0.9, 0], null, 14));
      [-1, 1].forEach(function (s) {
        [0.36, -0.36].forEach(function (x) {
          g.add(cyl(0.07, 0.07, 0.1, MAT.black, [x, 0.7, s * 0.22], [HP, 0, 0], 12));
          g.add(box(0.09, 0.4, 0.07, MAT.gun, [x - 0.08, 0.53, s * 0.25], [0, 0, -0.45]));
          g.add(cyl(0.03, 0.022, 0.42, MAT.black, [x - 0.08, 0.2, s * 0.25], [0, 0, 0.45], 8));
          g.add(sph(0.04, MAT.tyre, [x, 0.03, s * 0.25]));
        });
      });
      return g;
    }
  };

  var GROUND = { ugv: 1, mugv: 1, throw: 1, atv: 1, robots: 1 };
  function build(id) {
    var g = MODELS[id](), b = new T.Box3().setFromObject(g), s = new T.Vector3(), c = new T.Vector3();
    b.getSize(s); b.getCenter(c);
    var w = Math.max(s.x, s.z), k = (s.y < w * 0.55 ? 3.1 : 2.5) / Math.max(w, s.y * 1.5);
    if (GROUND[id]) k = Math.min(k, 2.7 / s.length());
    var holder = new T.Group(); g.position.set(-c.x, -c.y, -c.z); holder.add(g); holder.scale.setScalar(k);
    holder.userData.h = s.y * k;
    var spins = []; g.traverse(function (o) { if (o.userData.spin) spins.push(o); });
    holder.userData.spins = spins;
    return holder;
  }

  function create(opts) {
    opts = opts || {};
    var el = document.createElement('div'); el.className = 'na3d';
    var renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    var scene = new T.Scene(), cam = new T.PerspectiveCamera(32, 1, 0.1, 50);
    scene.add(new T.HemisphereLight(0xefffff, 0x1a2123, 1.25));
    var key = new T.DirectionalLight(0xffffff, 1.15); key.position.set(3, 5, 4); scene.add(key);
    var rim = new T.DirectionalLight(0xefffff, 0.9); rim.position.set(-4, 2, -3); scene.add(rim);
    var warm = new T.PointLight(0xff7a2f, 0.7, 12); warm.position.set(2, -1, 3); scene.add(warm);
    var pivot = new T.Group(); scene.add(pivot);
    var grid = new T.GridHelper(7, 28, 0x637c85, 0x4d6067); grid.material.transparent = true; grid.material.opacity = 0.55; if (opts.grid !== false) pivot.add(grid);
    var model = null, cur = null, cache = {};
    var ry = -0.6, rx = 0.36, vy = 0, drag = false, lx = 0, ly = 0, idle = 0, visible = true, raf = 0, dist = opts.dist || 5.4;

    function set(id) {
      if (!MODELS[id] || id === cur) return !!MODELS[id];
      if (model) pivot.remove(model);
      model = cache[id] || (cache[id] = build(id)); cur = id; pivot.add(model);
      grid.position.y = -model.userData.h / 2 - 0.02;
      ry = -0.6; rx = 0.36; idle = 0; draw();
      return true;
    }
    function size() {
      var w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
      renderer.setSize(w, h, false); cam.aspect = w / h;
      cam.position.set(0, 0, dist * (cam.aspect < 1.25 ? 1.25 / cam.aspect : 1)); cam.updateProjectionMatrix(); draw();
    }
    function draw() { pivot.rotation.set(rx, ry, 0); renderer.render(scene, cam); }
    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible || !model) return;
      if (!drag) { if (idle > 0) idle--; else if (!still) ry += 0.0045; ry += vy; vy *= 0.92; }
      if (!still) model.userData.spins.forEach(function (o) { o.rotation[o.userData.axis] += o.userData.spin; });
      draw();
    }
    var cv = renderer.domElement;
    cv.style.touchAction = 'pan-y'; cv.style.cursor = 'grab';
    cv.addEventListener('pointerdown', function (e) { drag = true; lx = e.clientX; ly = e.clientY; vy = 0; cv.style.cursor = 'grabbing'; try { cv.setPointerCapture(e.pointerId); } catch (x) {} });
    cv.addEventListener('pointermove', function (e) {
      if (!drag) return; var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
      ry += dx * 0.01; vy = dx * 0.004; rx = Math.max(-0.25, Math.min(1.2, rx + dy * 0.008)); if (still) draw();
    });
    function up() { if (!drag) return; drag = false; idle = 150; cv.style.cursor = 'grab'; }
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up); cv.addEventListener('lostpointercapture', up);
    if (opts.zoom) cv.addEventListener('wheel', function (e) { if (!e.ctrlKey) return; e.preventDefault(); dist = Math.max(4, Math.min(9, dist + e.deltaY * 0.01)); size(); }, { passive: false });
    if (window.ResizeObserver) new ResizeObserver(size).observe(el); else window.addEventListener('resize', size);
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(el);
    raf = requestAnimationFrame(tick);
    return { el: el, set: set, size: size, current: function () { return cur; } };
  }

  window.NA3D = { has: function (id) { return !!MODELS[id]; }, create: create, build: build };
})();
