(function () {
  function o(c, dx, dy, w) { var p = [c[0] + dy / 111320, c[1] + dx / (111320 * Math.cos(c[0] * Math.PI / 180))]; if (w) p.push(w); return p; }
  var R = [20.0066, 73.7926];      // Ramkund
  var Q = [20.0022, 73.7965];      // Godavari below Gadge Maharaj Bridge
  var T = [20.0035, 73.8125];      // Tapovan
  var D1 = o(R, 118, -138), D2 = o(T, 120, 470), D3 = [20.0402, 73.6812], D4 = [20.04119, 73.684893];
  // Gangapur Dam outline from OpenStreetMap: downstream edge north to south, then upstream edge back
  var DAM = [[20.052343, 73.680105], [20.04934, 73.680013], [20.048388, 73.67996], [20.046336, 73.680024], [20.042325, 73.67981], [20.04039, 73.679981], [20.0391, 73.680324], [20.037427, 73.681033], [20.036903, 73.681054], [20.035895, 73.680711], [20.032906, 73.680802], [20.031666, 73.681231], [20.029338, 73.682782], [20.027715, 73.683758], [20.022579, 73.685743], [20.020018, 73.68662], [20.01835, 73.686802], [20.019541, 73.686514], [20.021335, 73.685905], [20.027474, 73.683402], [20.028217, 73.682989], [20.031851, 73.680217], [20.035184, 73.679903], [20.039023, 73.679634], [20.041131, 73.679478], [20.043467, 73.679502], [20.046859, 73.679723], [20.049404, 73.679889], [20.052354, 73.679986]];
  // Gangapur Left Canal from OpenStreetMap
  var CANAL = [[20.042066, 73.688217], [20.042376, 73.688801], [20.042779, 73.689413], [20.042912, 73.69006], [20.043033, 73.691943], [20.042799, 73.693956], [20.042247, 73.698305], [20.042094, 73.698885], [20.041307, 73.700323], [20.041178, 73.70074], [20.041186, 73.701085], [20.041702, 73.707027], [20.041801, 73.710751], [20.042214, 73.712672], [20.042638, 73.714667], [20.043507, 73.717263], [20.043809, 73.717692], [20.045711, 73.719527], [20.045882, 73.719791], [20.046046, 73.721436], [20.045603, 73.722598]];
  window.PAGE = {
    key: 'water', loads: 'Water sampler, probes, life buoys',
    pres: {
      who: 'Water Resources · River, dam and canal monitoring',
      hero: {
        eyebrow: 'Water department · Godavari, Gangapur Dam and the canal network',
        title: 'Every kilometre of river, dam and canal. Checked every day.',
        sub: 'Drones that live in docks at the dam, the canal head and the river ghats. They fly the same routes every day, see pollution, seepage, theft and blockage as it starts, and bring back a water sample when the camera finds something. <b>An engineer approves every action.</b>',
        chips: ['Water quality from the air', 'Dam and canal inspection', 'Thermal + multispectral cameras', 'Sampling drone']
      },
      problem: {
        title: 'Water assets are long, remote and inspected by people on foot, a few times a year.',
        lead: 'A river is polluted at night through a drain nobody is watching. A dam face is checked twice a year. A canal loses water to seepage and unauthorised pumps long before the farmers at the tail complain. The department learns about each one late.',
        stats: [['6,628', 'large dams in India that must now be inspected before and after every monsoon. Maharashtra has the most'], ['19%', 'of storage already lost to silt, on average, across 439 Indian reservoirs studied'], ['5 ×', 'return reported on a drone irrigation audit in the Pune region: about ₹10 crore spent, about ₹50 crore of water charges added'], ['1 point', 'is all a hand sample tells you about a river. A drone map shows the whole reach']],
        points: [
          ['Pollution enters where nobody is looking', 'Drains and outfalls discharge at night and at dawn. By the time a sample is taken the next week, the evidence has flowed away.'],
          ['A dam face is too big to walk', 'Wet patches, cracks and tree roots on a 4 km embankment are easy to miss from the crest road, and the rules now demand a record twice a year.'],
          ['Canal losses are found by the tail-end farmer', 'Seepage, weed, silt and unauthorised pumps take the water kilometres before anyone measures it.'],
          ['The river at Ramkund will be watched by the whole country', 'In 2027 crores of pilgrims will bathe in this water. Its quality has to be known every morning, not every month.']
        ],
        widget: 'swipe',
        swipe: { title: 'Drag across the river. Find the discharge.', pos: o(Q, 30, -74), z: 18, scale: 1.7, dim: 0.25, say: 'To the eye the water looks the same from bank to bank. A thermal camera shows warm water entering from a drain on the south bank and spreading downstream.', heat: [{ x: 6, y: -12, r: 9, v: 0.9, core: 0.5 }, { x: 34, y: -1, r: 44, ry: 9, v: 0.75, rot: 4 }, { x: 82, y: 2, r: 46, ry: 7, v: 0.45, rot: 0 }], marks: [{ t: 'text', x: -2, y: -26, label: 'DRAIN OUTFALL +4.1°C' }] }
      },
      concept: {
        title: 'A drone that lives at the dam, and flies the same inspection every day.',
        lead: 'Docks sit at the dam, the canal head and along the river. Each houses a drone that launches on a schedule, flies its route by itself, and comes home to charge. Because the route is identical every time, the software can compare today with last week and show only what has changed.',
        loop: [['Dock on site', 'Drone waits, charged, at the dam or canal head.'], ['Patrols itself', 'Same route, same height, every day or every week.'], ['Software compares', 'Temperature, water colour, wet patches, new pumps, weed.'], ['Engineer approves', 'The section engineer sees the evidence and decides.', 1], ['Sampling drone goes', 'Collects water at the exact spot, or a notice is issued.'], ['Record is kept', 'Dated pictures and readings for every inspection.']],
        eyes: 'Surveillance drones carry zoom, thermal and multispectral cameras. They map temperature, muddiness and algae across the whole water surface, and inspect every metre of a dam face or canal bank.',
        hands: 'Payload drones bring back what a camera cannot measure. A sampling drone dips a probe for pH, dissolved oxygen and conductivity, and fills bottles for the laboratory.'
      },
      fleet: ['beetle', 'falcon', 'vtol', 'octa'],
      sensors: [['Thermal camera', '640 × 512 class sensor. Shows warm discharge entering a river and cool, wet seepage on a dry embankment. Best flown at dawn.'], ['Multispectral camera', 'Five colour bands including red-edge and near-infrared. Maps muddiness, algae and floating weed. Tuned with a few water samples on each river.'], ['Sampler and probes', 'Bottles for the laboratory and probes for pH, dissolved oxygen, conductivity and temperature, lowered from a payload drone.']],
      uc: {
        title: 'Fourteen jobs across river, dam, canal and pipeline.',
        lead: 'These are the tasks to agree before a pilot. Each is marked honestly. Where a camera can only estimate, we say so, and pair it with a real sample.',
        items: [
          ['Outfall and discharge detection', 'Dawn thermal flights find warm or cold water entering the river from drains, day after day.', 'Surveillance drone · thermal', 'a'],
          ['Muddiness and algae maps', 'A colour map of turbidity and algae across the whole reach, tuned with a few samples.', 'Surveillance drone · multispectral', 'a'],
          ['Water sampling at the exact spot', 'A payload drone dips a probe and fills bottles where the camera found a problem.', 'Payload drone · sampler + probes', 'a'],
          ['Floating waste and water hyacinth', 'Measures the area of weed mats and waste each week, so removal can be planned and checked.', 'Surveillance drone · zoom', 'g'],
          ['Dam face and spillway inspection', 'Close pictures of every metre before and after the monsoon, with cracks and wet patches marked.', 'Surveillance drone · zoom + thermal', 'g'],
          ['Reservoir silt and capacity survey', 'A measured map of the exposed bed at low water, to track how much storage has been lost.', 'Survey wing · mapping camera', 'g'],
          ['Canal patrol', 'Breaches, seepage, weed and silt found along the whole canal in one flight.', 'Survey wing or surveillance drone', 'g'],
          ['Unauthorised pumps and water theft', 'Pumps and pipes on the bank recorded with time and position, and irrigated area compared with the register.', 'Surveillance drone · zoom', 'g'],
          ['Encroachment on river and flood line', 'New structures and dumping inside the marked line, found by comparing monthly maps.', 'Survey wing · mapping camera', 'g'],
          ['Illegal sand mining watch', 'Night thermal flights over the riverbed record excavators and trucks.', 'Surveillance drone · thermal', 'a'],
          ['Desilting and drain cleaning check', 'Before and after pictures of every drain and nallah ahead of the monsoon, so contractors are paid for work done.', 'Surveillance drone · zoom', 'g'],
          ['Flood watch and rescue', 'Embankments watched through the night in a flood, stranded people found, and life buoys or supplies dropped.', 'Surveillance + payload drones', 'a'],
          ['Pipeline corridor patrol', 'The route of a rising main checked for digging, tapping and wet ground.', 'Survey wing · zoom + thermal', 'a'],
          ['Leaks on buried mains', 'Thermal flights at night can show cool, wet ground above a leak. Results so far are mixed.', 'Surveillance drone · thermal', 'b']
        ],
        not: 'What a camera cannot measure: dissolved oxygen, biological oxygen demand, pH, metals and bacteria. Those need water in a bottle or a probe in the river, which is why the system includes a sampling drone and your laboratory.'
      },
      auto: {
        who: 'The engineer',
        self: ['Launch, route, landing and charging', 'Flies the identical route each time', 'Weather check before every launch', 'Returns to dock on low battery or lost link'],
        detect: ['Temperature and colour change in the water', 'Wet patches, cracks and growth on a dam', 'New pumps, pipes and structures on a bank', 'Shows what changed since the last flight'],
        human: ['Sending the sampling drone', 'Any notice to a landholder or an industry', 'Raising a dam-safety inspection', 'Each decision logged with name and time'],
        quote: 'The drone finds and measures. The engineer decides what it means and what is done about it. The record shows both.'
      },
      close: {
        title: 'Start with one reach of river and one dam, for one month.',
        lead: 'A pilot on the Godavari from Ramkund to Tapovan, and on Gangapur Dam, gives the department a dated baseline and shows which findings its own engineers confirm on the ground.',
        steps: [['Week 1', 'Agree routes', 'Fix the river reach, the dam passes and the canal section with the department. Take the first water samples for tuning.'], ['Weeks 2 to 3', 'Fly with a crew', 'Our pilots fly the routes at dawn. Each thermal and colour finding is checked with a sample or a site visit.'], ['Week 4', 'First reports', 'A water-quality map, a dam inspection report and a canal report, in the department\'s format.'], ['After', 'Docks and daily flights', 'Docks at the dam and canal head, and routine flights before, during and after the monsoon.']],
        fine: ['The demo above uses the real Godavari, Gangapur Dam and Gangapur Left Canal from open map data. Findings, readings and sensor images are sample data. No real outfall, pump or defect is shown.', 'Camera estimates of muddiness and algae are tuned against water samples on each river, and are reported with their margin of error.', 'Remote operation from docks, flights beyond the pilot\'s line of sight and flights near dams are subject to DGCA and local permissions. Until those are in place, a trained pilot is present for every flight.', 'The dock is in prototype. Pilot deployments begin with a crew on site and move to dock operation as approvals and field trials allow.']
      }
    },
    demo: {
      title: 'Godavari and Gangapur Dam · Water monitoring', officer: 'the section engineer', officerName: 'Section engineer', maxNative: 18, viewZ: 18, viewScale: 2,
      note: 'Real river, dam and canal at Nashik. Findings, photos and readings are sample data for this demo.',
      docks: [{ id: 'D-1', name: 'Ramkund ghat', pos: D1 }, { id: 'D-2', name: 'Tapovan · sampling drone', pos: D2 }, { id: 'D-3', name: 'Gangapur Dam', pos: D3 }, { id: 'D-4', name: 'Canal head', pos: D4 }],
      labels: [{ pos: o(R, -150, 130), t: 'Ramkund', ax: 20 }, { pos: o(Q, -300, 250), t: 'Gadge Maharaj Bridge', ax: 130 }, { pos: o(T, 80, -445), t: 'Godavari', ax: 20 }, { pos: [20.0400, 73.6730], t: 'Gangapur reservoir', ax: 40 }, { pos: [20.0440, 73.7050], t: 'Gangapur Left Canal', ax: 50 }],
      missions: [
        {
          tab: 'River water quality', code: 'WR-GOD-0548', eyebrow: 'Mission 1 · Thermal + multispectral', title: 'Godavari dawn run, Ramkund to Tapovan', sub: 'Dock D-1 → 3 km down the river at 100 m → dock. Flown at dawn, when warm discharge shows best.',
          dock: 'D-1', responders: ['D-2'], droneName: 'Surveillance drone', start: '05:48', durMin: 15, alt: '100 m', images: 268, batUse: 44, next: 'tomorrow 05:48, automatic', wx: 'Wind 2 m/s · no rain · go', askZoom: 17,
          route: [o(R, -27, 62), o(R, -27, -60), o(R, 10, -118), o(R, 50, -200), o(Q, -330, 228), o(Q, -300, 150), o(Q, -255, 62), o(Q, -180, 0), o(Q, -100, -52), o(Q, 0, -66), o(Q, 92, -70), o(Q, 215, -70), [20.001664, 73.799483], [20.001614, 73.801091], [20.001741, 73.8035], [20.001917, 73.80504], [20.001779, 73.807177], [20.000374, 73.809884], [19.999816, 73.811392], [19.999637, 73.812745], o(T, 150, -418), o(T, 250, -400)],
          fit: [o(R, -200, 250), o(T, 400, -560)],
          findings: [
            { pos: o(R, -27, 10), sev: 'ok', title: 'Ramkund bathing reach clear', line: 'Even temperature, low muddiness, no floating waste', place: 'Ramkund',
              rec: 'No action. The bathing reach is the reference for the rest of the run.', readings: [['Surface temp', '22.8°C'], ['Muddiness (est.)', '11 NTU'], ['Algae (est.)', 'Low'], ['Floating waste', 'None'], ['Compared with', 'Yesterday: same'], ['Confidence', 'High']],
              how: 'The multispectral camera measures how much red and near-infrared light the water reflects. That is turned into a muddiness estimate using samples taken on this river.',
              views: [{ label: 'Top down', type: 'sat', z: 19, scale: 1.25 }, { label: 'Muddiness map', type: 'index', z: 19, scale: 1.25, dim: 0.35, hi: 'Muddy', lo: 'Clear' }, { label: 'Thermal', type: 'thermal', z: 19, scale: 1.25, dim: 0.4, read: [['MAX', '23.1°C'], ['MIN', '22.6°C'], ['SPREAD', '0.5°C']], hi: '30°C', lo: '20°C' }] },
            { pos: o(Q, -318, 205), sev: 'watch', title: 'Floating waste against the bridge piers', line: 'About 60 m² of flowers and plastic', place: 'Gadge Maharaj Bridge',
              rec: 'Send the skimmer boat to the bridge piers this morning. The mat was 25 m² yesterday.', readings: [['Area today', '60 m²'], ['Yesterday', '25 m²'], ['Type', 'Flowers, plastic'], ['Piers affected', '3'], ['Flow', 'Slow'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', z: 19, scale: 1.25, marks: [{ t: 'poly', pts: [[-22, 6], [-6, 12], [14, 8], [18, -2], [0, -8], [-18, -4]], label: 'FLOATING WASTE · 60 m²', c: '#ffb020', fill: 'rgba(255,176,32,.25)' }] }] },
            { pos: o(Q, 36, -86), sev: 'fix', title: 'Warm discharge from a drain on the south bank', line: '4.1°C warmer than the river, plume 90 m long', place: 'South bank, below the road bridge',
              rec: '<b>Take a sample now, while it is flowing.</b> Warm water is entering from a drain and spreading 90 m downstream. It was not present on yesterday\'s run.', readings: [['Plume temp', '26.9°C'], ['River temp', '22.8°C'], ['Difference', '+4.1°C'], ['Plume length', '90 m'], ['Yesterday', 'Not present'], ['Confidence', 'High']],
              how: 'At dawn the river is one even temperature. Anything flowing in from a drain or a factory is warmer or colder, and shows as a streak on the thermal camera. The camera cannot say what is in the water. The sample does.',
              action: { from: 'D-2', verb: 'Dispatch the sampling drone to the outfall', short: 'sample taken', what: 'It dips a probe for pH, dissolved oxygen and conductivity 10 m below the drain, fills three bottles for the laboratory, and logs the position and time.', launch: 'Sampling drone launched from Dock D-2.', done: 'Probe: pH 8.9, dissolved oxygen 2.1 mg/L, conductivity 1,420 µS/cm. Three bottles on the way to the laboratory.' },
              views: [{ label: 'Thermal', type: 'thermal', z: 18, scale: 2, dim: 0.25, heat: [{ x: -2, y: -8, r: 8, v: 0.9, core: 0.5 }, { x: 28, y: 10, r: 40, ry: 9, v: 0.75, rot: 4 }, { x: 72, y: 13, r: 40, ry: 7, v: 0.45 }], marks: [{ t: 'box', x: -2, y: -8, w: 14, h: 14, label: 'OUTFALL · 26.9°C' }, { t: 'arrow', x1: 10, y1: 22, x2: 80, y2: 24, label: 'PLUME 90 m' }], read: [['MAX', '26.9°C'], ['RIVER', '22.8°C'], ['ΔT', '+4.1°C']], hi: '30°C', lo: '20°C' },
                { label: 'Top down', type: 'sat', z: 18, scale: 2, marks: [{ t: 'ring', x: -2, y: -8, r: 9, label: 'NOTHING VISIBLE TO THE EYE', c: '#ff4d4f' }] },
                { label: 'Muddiness map', type: 'index', z: 18, scale: 2, dim: 0.3, heat: [{ x: 28, y: 10, r: 40, ry: 9, v: 0.5, rot: 4 }], hi: 'Muddy', lo: 'Clear' }] },
            { pos: o(Q, 96, -70), sev: 'watch', title: 'Foam and muddy water below the weir', line: 'Muddiness up from 11 to about 38 NTU', place: 'Weir, 60 m below the outfall',
              rec: 'Add this point to the weekly sampling list. Foam at a weir usually means detergent or sewage upstream.', readings: [['Muddiness (est.)', '38 NTU'], ['Upstream', '11 NTU'], ['Foam', '30 m line'], ['Algae (est.)', 'Medium'], ['Margin of error', '± 6 NTU'], ['Confidence', 'Medium']],
              how: 'Muddiness is an estimate from water colour. On this river it is tuned with hand samples and is good to a few NTU. Foam is seen directly by the zoom camera.',
              views: [{ label: 'Muddiness map', type: 'index', z: 18, scale: 2, dim: 0.25, heat: [{ x: 30, y: 2, r: 34, ry: 9, v: 0.7 }, { x: 0, y: 0, r: 8, v: 0.6 }], marks: [{ t: 'text', x: 8, y: 16, label: 'ABOUT 38 NTU' }, { t: 'text', x: -90, y: 16, label: '11 NTU' }], hi: 'Muddy', lo: 'Clear' }, { label: 'Top down', type: 'sat', z: 18, scale: 2, marks: [{ t: 'box', x: 4, y: 0, w: 12, h: 34, label: 'FOAM LINE', c: '#ffb020' }] }] },
            { pos: o(T, 90, -422), sev: 'watch', title: 'Weed mat covering the channel', line: 'About 6,400 m², up 18% in a week', place: 'Godavari at Tapovan',
              rec: 'Schedule weed removal for this reach. The mat now covers most of the channel width for 220 m and is slowing the flow.', readings: [['Area', '6,400 m²'], ['Last week', '5,400 m²'], ['Growth', '+18%'], ['Length', '220 m'], ['Channel covered', 'About 70%'], ['Confidence', 'High']],
              how: 'Floating plants reflect near-infrared light strongly and open water does not, so the multispectral camera separates them cleanly and measures the area.',
              views: [{ label: 'Top down', type: 'sat', z: 18, scale: 1.5, marks: [{ t: 'poly', pts: [[-110, 6], [-60, -14], [0, -22], [70, -14], [110, 6], [70, 22], [0, 16], [-60, 22]], label: 'WEED MAT · 6,400 m²', c: '#ffb020', dash: '6 5' }] }, { label: 'Vegetation map', type: 'index', pal: 'veg', z: 18, scale: 1.5, hi: 'Plants', lo: 'Water' }] },
            { pos: o(T, 250, -400), sev: 'ok', title: 'End of run: channel open, no new dumping', line: 'Banks unchanged since last week', rec: 'No action. The drone returns to Dock D-1.', readings: [['Bank change', 'None'], ['Dumping', 'None new'], ['Flow', 'Open'], ['Run length', '3.0 km'], ['Pictures', '268'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', z: 18, scale: 1.5 }] }
          ]
        },
        {
          tab: 'Dam inspection', code: 'WR-GPD-PRE', eyebrow: 'Mission 2 · Pre-monsoon dam inspection', title: 'Gangapur Dam: downstream face, then upstream face', sub: 'Dock D-3 → 3.8 km along the downstream slope → back along the upstream slope → dock. One flight covers what takes a team two days on foot.',
          dock: 'D-3', droneName: 'Surveillance drone', start: '06:20', durMin: 22, alt: '50 m', images: 640, batUse: 52, next: 'after the monsoon, and on demand', wx: 'Wind 4 m/s · no rain · go', askZoom: 17,
          route: DAM, fit: [[20.0535, 73.672], [20.017, 73.694]],
          findings: [
            { pos: [20.0519, 73.6803], sev: 'ok', title: 'Spillway gates and channel clear', line: 'No debris, no growth in the channel', place: 'Spillway, north end', rec: 'No action. All gates are free of debris ahead of the monsoon.', readings: [['Gates seen', 'All'], ['Debris', 'None'], ['Channel growth', 'None'], ['Compared with', 'Post-monsoon survey'], ['Pictures', '48'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 0, y: 0, w: 30, h: 90, label: 'SPILLWAY', c: '#3ddc84' }] }] },
            { pos: [20.0452, 73.6806], sev: 'fix', title: 'Wet patch on the downstream slope', line: '14 m × 6 m, 3.8°C cooler than the slope around it', place: 'Downstream slope, chainage 800 m',
              rec: '<b>Raise a dam-safety inspection for this spot before the reservoir fills.</b> A cool, wet patch has appeared on the lower slope. It was dry in the last survey. It may be seepage.', readings: [['Size', '14 m × 6 m'], ['Temperature', '3.8°C cooler'], ['Last survey', 'Dry'], ['Position', 'Lower third of slope'], ['Reservoir level', 'Low'], ['Confidence', 'Medium']],
              how: 'Water seeping through an embankment cools the soil. At dawn that patch is colder than the dry slope around it, and the thermal camera shows it even when the grass looks the same.',
              action: { verb: 'Raise a dam-safety inspection ticket and book a close-up flight', short: 'inspection raised', what: 'The Executive Engineer gets the position, the thermal and colour pictures, and the comparison with the last survey. A low, slow flight over the spot is booked for tomorrow at dawn.', done: 'Inspection ticket raised with pictures and position. Close-up flight booked for 06:00 tomorrow.' },
              views: [{ label: 'Thermal', type: 'thermal', dim: 0, heat: [{ x: 0, y: 0, r: 60, v: 0.22 }, { x: 0, y: 0, r: 9, ry: 5, v: -1, core: 0.6 }, { x: 4, y: -4, r: 6, v: -0.8 }], marks: [{ t: 'box', x: 0, y: 0, w: 20, h: 12, label: 'COOL, WET PATCH · −3.8°C' }], read: [['MIN', '17.9°C'], ['SLOPE', '21.7°C'], ['ΔT', '−3.8°C']], hi: '26°C', lo: '16°C' },
                { label: 'Top down', type: 'sat', marks: [{ t: 'ring', x: 0, y: 0, r: 10, label: 'LOOKS DRY TO THE EYE', c: '#ff4d4f' }] }] },
            { pos: [20.0384, 73.6809], sev: 'watch', title: 'Trees growing on the downstream slope', line: '9 trees with trunks over 15 cm', place: 'Downstream slope, chainage 1,550 m', rec: 'Include in the pre-monsoon clearing work. Roots open paths for water through an earth dam.', readings: [['Trees', '9'], ['Tallest', 'About 5 m'], ['Area', '320 m²'], ['Last survey', '6 trees'], ['Zoom', '20×'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 4, y: 0, w: 26, h: 34, label: 'TREES ON SLOPE ×9', c: '#ffb020' }] }, { label: 'Vegetation map', type: 'index', pal: 'veg', hi: 'Plants', lo: 'Bare' }] },
            { pos: [20.0352, 73.6798], sev: 'watch', title: 'Stone pitching displaced on the upstream face', line: '9 m length at the waterline', place: 'Upstream face, chainage 1,900 m', rec: 'Repair before the reservoir rises. Wave action has pulled stones out of the protective layer.', readings: [['Length', '9 m'], ['Height', '1.5 m'], ['At', 'Waterline'], ['Last survey', 'Intact'], ['Zoom', '30×'], ['Confidence', 'Medium']],
              views: [{ label: 'Zoom', type: 'sat', zoomx: '30×', scale: 3, marks: [{ t: 'box', x: 0, y: 0, w: 5, h: 10, label: 'STONES DISPLACED', c: '#ffb020' }] }, { label: 'Top down', type: 'sat' }] },
            { pos: [20.0277, 73.6836], sev: 'ok', title: 'Crest road and parapet sound', line: 'No cracks or settlement seen', place: 'Crest, southern bend', rec: 'No action.', readings: [['Cracks', 'None seen'], ['Settlement', 'None seen'], ['Drainage', 'Clear'], ['Pictures', '112'], ['Compared with', 'Last survey'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat' }] }
          ]
        },
        {
          tab: 'Canal patrol', code: 'WR-GLC-W14', eyebrow: 'Mission 3 · Weekly canal patrol', title: 'Gangapur Left Canal, head to kilometre 4', sub: 'Dock D-4 → along the canal at 60 m → dock. The same flight every week, so anything new stands out.',
          dock: 'D-4', droneName: 'Surveillance drone', start: '07:05', durMin: 15, alt: '60 m', images: 310, batUse: 48, next: 'next week, automatic', wx: 'Wind 3 m/s · no rain · go', askZoom: 17,
          route: CANAL, fit: [[20.0475, 73.683], [20.0385, 73.724]],
          findings: [
            { pos: [20.0428, 73.69395], sev: 'fix', title: 'Pump lifting water from the canal', line: 'Diesel pump on the bank, pipe runs 110 m to a field', place: 'Left bank, km 0.9',
              rec: '<b>Send the section officer with the picture and position.</b> A pump and pipe have appeared on the bank since last week. No lifting permit is on record for this plot.', readings: [['Pump', 'Running, engine hot'], ['Pipe length', '110 m'], ['Field', 'About 0.8 ha, wet'], ['Last week', 'Not present'], ['Permit on record', 'None'], ['Confidence', 'High']],
              how: 'The drone flies the same line every week. The software compares the two sets of pictures and lists anything new on the bank. A running engine also shows hot on the thermal camera.',
              action: { verb: 'Send the finding to the section officer\'s phone', short: 'sent to section officer', what: 'He gets the picture, the map position and the plot, and the case is opened in the register.', done: 'Sent to the section officer with picture, position and plot. Case opened.' },
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'ring', x: 0, y: 0, r: 5, label: 'PUMP', c: '#ff4d4f' }, { t: 'arrow', x1: 2, y1: -4, x2: 30, y2: -70, label: 'PIPE 110 m', c: '#ffb020' }] }, { label: 'Thermal', type: 'thermal', dim: 0.3, heat: [{ x: 0, y: 0, r: 2.5, v: 1, core: 0.6 }, { x: 34, y: -84, r: 26, v: -0.6 }], marks: [{ t: 'box', x: 0, y: 0, w: 7, h: 7, label: 'ENGINE · 88°C' }, { t: 'text', x: 14, y: -84, label: 'WET FIELD' }], read: [['MAX', '88°C'], ['REF', '24°C'], ['ΔT', '+64°C']], hi: '90°C', lo: '16°C' }] },
            { pos: [20.0412, 73.7004], sev: 'watch', title: 'Seepage along the outer bank', line: 'Wet strip 45 m long at the foot of the bank', place: 'Right bank, km 1.6', rec: 'Inspect on foot this week and line this stretch in the next closure. The strip has grown from 30 m last week.', readings: [['Length', '45 m'], ['Last week', '30 m'], ['Temperature', '2.9°C cooler'], ['Crop beside', 'Waterlogged'], ['Bank height', 'About 2 m'], ['Confidence', 'Medium']],
              views: [{ label: 'Thermal', type: 'thermal', dim: 0, heat: [{ x: 0, y: -10, r: 70, v: 0.2 }, { x: 0, y: -10, r: 26, ry: 6, v: -1, rot: 20, core: 0.6 }], marks: [{ t: 'text', x: -20, y: -24, label: 'COOL, WET STRIP · 45 m' }], read: [['MIN', '19.2°C'], ['BANK', '22.1°C'], ['ΔT', '−2.9°C']], hi: '28°C', lo: '16°C' }, { label: 'Top down', type: 'sat' }] },
            { pos: [20.0417, 73.7070], sev: 'watch', title: 'Weed and silt narrowing the canal', line: 'Open width down from 6 m to about 2.5 m', place: 'km 2.3', rec: 'Add 120 m of this reach to the desilting list. Flow to the tail is being held back here.', readings: [['Open width', 'About 2.5 m'], ['Design width', '6 m'], ['Length', '120 m'], ['Weed cover', 'About 60%'], ['Last month', '4 m open'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 0, y: 0, w: 120, h: 12, rot: -4, label: 'CHOKED REACH · 120 m', c: '#ffb020' }] }, { label: 'Vegetation map', type: 'index', pal: 'veg', hi: 'Plants', lo: 'Water' }] },
            { pos: [20.0427, 73.7147], sev: 'watch', title: 'New structure on the canal bank', line: 'Shed 6 m × 4 m inside the canal boundary', place: 'Left bank, km 3.1', rec: 'Issue a notice. The shed stands inside the marked canal land and was not there last month.', readings: [['Size', '6 m × 4 m'], ['Inside boundary by', '5 m'], ['Last month', 'Not present'], ['Use', 'Not known'], ['Zoom', '20×'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 0, y: 8, w: 7, h: 5, label: 'NEW STRUCTURE', c: '#ffb020' }, { t: 'poly', pts: [[-80, 16], [80, 22]], dash: '8 6', label: 'CANAL BOUNDARY', c: '#5aa9ff' }] }] },
            { pos: [20.0457, 73.7196], sev: 'ok', title: 'Water reaching kilometre 4', line: 'Regulator open, flow steady', place: 'Cross regulator, km 3.9', rec: 'No action. The drone returns to Dock D-4.', readings: [['Flow', 'Steady'], ['Regulator', 'Open'], ['Banks', 'Sound'], ['Patrol length', '3.9 km'], ['Pictures', '310'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat' }] }
          ]
        }
      ]
    }
  };
})();
