(function () {
  function o(c, dx, dy) { return [c[0] + dy / 111320, c[1] + dx / (111320 * Math.cos(c[0] * Math.PI / 180))]; }
  var R = [20.0066, 73.7926];      // Ramkund ghats, real position
  var T = [20.0035, 73.8125];      // Tapovan, real position
  var D1 = [20.0097447, 73.7945917], D2 = o(R, 118, -138), D3 = o(T, 120, 470);
  window.PAGE = {
    key: 'kumbh', title: 'Nurture Aerospace · Simhastha 2027 crowd safety', loads: 'Life buoys, medical kits',
    pres: {
      who: 'Nashik–Trimbakeshwar Simhastha 2027',
      hero: {
        eyebrow: 'Nashik–Trimbakeshwar Simhastha 2027 · Crowd safety from the air',
        title: 'See the crush forming. Act before it happens.',
        sub: 'Drones that live in weatherproof docks along the Godavari. They patrol the ghats on their own, measure how tightly the crowd is packed every few minutes, and carry help over the crowd in the first two minutes. <b>An officer approves every response.</b>',
        chips: ['3 Amrit Snan days', 'Docks on site day and night', 'Surveillance + payload drones', 'Human approves every action']
      },
      problem: {
        title: 'On the big bathing days, danger builds in minutes, and nobody can see all of it.',
        lead: 'Crores of pilgrims will come to a few hundred metres of ghat at Ramkund, mostly on three mornings. The warning signs of a crush are visible from above long before they are visible from inside the crowd.',
        stats: [['39', 'pilgrims died in the 2003 crush at the Nashik Kumbh, on a narrow road to the river'], ['3', 'Amrit Snan days in Nashik: 2 August, 31 August and 11 September 2027'], ['4 per m²', 'the crowd density where safe movement ends. Above it, risk rises sharply'], ['54,357', 'lost people had to be reunited with families at the 2025 Maha Kumbh']],
        points: [
          ['Fixed cameras see a street, not a crowd', 'Thousands of pole cameras still leave gaps on a ghat, a bridge or a lane. Nobody has one picture of where the pressure is building.'],
          ['The warning comes, the response is late', 'After the January 2025 crush at Prayagraj, officials said the surge alerts did come in time. There were too few police at the choke point to act on them.'],
          ['The river edge at night', 'The holiest dip is before dawn. A person in trouble in dark water cannot be seen from the bank. A thermal camera sees them at once.'],
          ['Help cannot drive through a packed crowd', 'A life buoy or a medical kit that is 300 metres away can be 25 minutes away on foot. Over the crowd, it is two.']
        ],
        widget: 'density'
      },
      concept: {
        title: 'A drone that lives at the ghat, and a control room that sees everything it sees.',
        lead: 'We place docks at the ghats, the bridges and Sadhugram. Each dock houses a drone that launches on a schedule or on demand, flies its patrol by itself, and comes home to charge. Nobody has to carry a drone through the crowd.',
        loop: [['Dock on site', 'Drone waits, charged, inside a sealed box at the ghat.'], ['Patrols itself', 'Launches on schedule. Flies the same route every 20 to 40 minutes.'], ['Software detects', 'Crowd density per square, people in water, heat, blocked lanes.'], ['Officer approves', 'The control room sees the evidence and says yes or hold.', 1], ['Payload drone responds', 'Life buoy, medical kit or loudspeaker message, in about two minutes.'], ['Record is kept', 'Every flight, finding and decision is logged for review.']],
        eyes: 'Surveillance drones with zoom and thermal cameras fly the ghats and approach roads. They report crowd density square by square, not a guess of total numbers, and they see people in the water at night.',
        hands: 'Payload drones carry what the first two minutes need: life buoys, a medical kit, a loudspeaker. One drone can make four separate drops in one flight.'
      },
      fleet: ['beetle', 'falcon', 'octa', 'recon'],
      sensors: [['Day camera', '30× optical zoom with 4K video. Reads a blocked lane or a fallen person from 80 m up without flying low over people.'], ['Thermal camera', '640 × 512 class sensor. Finds a person in dark water, and a fire in a tent row before there is smoke. It cannot identify who a person is.'], ['Voice and drop', 'Loudspeaker for announcements in Marathi and Hindi. Remote release for life buoys and kits, one at a time.']],
      uc: {
        title: 'Thirteen jobs, one system. These are the tasks to agree before a pilot.',
        lead: 'We have marked each one honestly. Where a use is proven by agencies in the field, we say so. Where it needs tuning on your ghats first, we say that too.',
        items: [
          ['Crowd density map of every ghat', 'A colour grid of people per square metre, refreshed every patrol. Alerts when any square crosses 4.', 'Surveillance drone · zoom + thermal', 'g'],
          ['Flow and counter-flow on bridges', 'Spots two streams of people pushing against each other on a bridge or lane, the classic start of a crush.', 'Surveillance drone · video analytics', 'a'],
          ['Person in the water, day or night', 'Thermal camera picks out a swimmer beyond the safety line and holds the position for the rescue boat.', 'Surveillance drone · thermal', 'g'],
          ['Life buoy drop', 'A payload drone releases a life buoy next to the swimmer while the boat is on its way.', 'Payload drone · remote release', 'a'],
          ['Loudspeaker from the air', 'Announcements to one part of the crowd: hold here, use the other bridge, a child is waiting at post 4.', 'Surveillance or payload drone · loudspeaker', 'g'],
          ['Lost child and elderly search', 'An operator searches a described area from above and guides the nearest volunteers to the person.', 'Surveillance drone · zoom', 'g'],
          ['Medical kit over the crowd', 'First-aid kit or defibrillator delivered to a medical post or a police picket that an ambulance cannot reach.', 'Payload drone · 6 kg', 'a'],
          ['Fire watch over Sadhugram', 'Night thermal sweeps of the tent city find a hot spot early. A fire-response drone and the fire tender are called together.', 'Surveillance drone · thermal', 'a'],
          ['All-day watch over the main ghat', 'A tethered drone takes power up its cable and holds one position for a whole shift.', 'Tethered drone on ground robot', 'g'],
          ['Parking and approach roads', 'Live picture of how full each parking zone and approach road is, so entry can be held upstream.', 'Surveillance drone · zoom', 'g'],
          ['Blocked emergency lanes', 'Finds handcarts, stalls and parked vehicles in the lanes kept for ambulances and fire tenders.', 'Surveillance drone · zoom', 'a'],
          ['Night lighting for a dark stretch', 'A heavy-lift or tethered drone carries a floodlight over a ghat or a lane when power fails.', 'Heavy-lift drone · lighting unit', 'a'],
          ['Daily map for the planners', 'A fresh, measured map of barricades, tents and routes each morning, and a full record after the mela.', 'Survey drone · mapping camera', 'g']
        ],
        not: 'What we do not claim: a head count of the whole crowd, face recognition, or weapon detection from the air. These are not proven at this scale, so the system reports density by square and leaves identification to officers on the ground.'
      },
      auto: {
        who: 'The duty officer',
        self: ['Launch, patrol route, landing and charging', 'Weather check before every launch', 'Return to dock on low battery or lost link', 'Keeps out of no-fly areas set by the authority'],
        detect: ['Crowd density per square, with trend', 'Person in water, heat source, blocked lane', 'Ranks findings: fix now, watch, all clear', 'Proposes one response for each urgent finding'],
        human: ['Dispatch of any payload drone', 'Any loudspeaker message to the crowd', 'Any alert that moves police or medical teams', 'Each approval logged with name and time'],
        quote: 'At Prayagraj the alerts came, and the response was late. The answer is not to remove the officer. It is to put the evidence, the proposal and the means to respond on one screen.'
      },
      close: {
        title: 'Start with one ghat, before the first Amrit Snan.',
        lead: 'A pilot at Ramkund proves the density map, the night thermal watch and the life-buoy drop on real crowds during an ordinary festival day, well before 2 August 2027.',
        steps: [['Week 1', 'Site survey', 'Agree dock positions, patrol routes and the tasks from the list above with the Mela Authority and Nashik Police.'], ['Weeks 2 to 3', 'Fly with a crew', 'Our pilots fly the routes on site. The density map is tuned against counts on the ground.'], ['Week 4', 'Control room live', 'Findings and approvals run on your screens at the command centre.'], ['After', 'Scale to the mela', 'Docks at each ghat, the bridges, Sadhugram and Trimbakeshwar, and teams trained.']],
        fine: ['The demo above uses the real Ramkund and Tapovan sites. Findings, readings and sensor images are sample data.', 'Remote operation from docks, flights beyond the pilot\'s line of sight and flights at night are subject to DGCA and local police permissions. Until those are in place for the site, a trained pilot is present for every flight.', 'The dock is in prototype. Pilot deployments begin with a crew on site and move to dock operation as approvals and field trials allow.', 'Figures for aircraft are indicative and vary with configuration and weather.']
      }
    },
    demo: {
      title: 'Simhastha 2027 · Ramkund sector', officer: 'the duty officer', officerName: 'Duty officer, Mela control room', maxNative: 19, viewZ: 19, viewScale: 1.25,
      note: 'Real ghats, bridges and river at Nashik. Findings, photos and readings are sample data for this demo.',
      docks: [{ id: 'D-1', name: 'Panchavati police chowky', pos: D1 }, { id: 'D-2', name: 'Ghat control post · payload', pos: D2 }, { id: 'D-3', name: 'Tapovan · Sadhugram', pos: D3 }],
      labels: [{ pos: o(R, -150, 130), t: 'Ramkund', ax: 20 }, { pos: o(R, -235, 215), t: 'Ahilyabai Holkar Bridge', ax: 60, ay: 18 }, { pos: o(R, 70, -262), t: 'Gadge Maharaj Bridge', ax: -8 }, { pos: o(T, -250, 310), t: 'Sadhugram ground', ax: 40 }, { pos: o(R, -28, -40), t: 'Godavari', ax: 50 }],
      missions: [
        {
          tab: 'Amrit Snan dawn patrol', code: 'KM-0802-A', eyebrow: 'Mission 1 · Surveillance drone', title: 'Ramkund ghats, dawn patrol on a bathing day', sub: 'Dock D-1 → Holkar Bridge → Ramkund → Gadge Maharaj Bridge → dock. Repeats every 20 minutes.',
          dock: 'D-1', responders: ['D-2'], droneName: 'Surveillance drone', start: '05:40', durMin: 12, alt: '80 m', images: 214, batUse: 34, next: 'in 8 min, automatic', askZoom: 18,
          route: [o(R, -150, 300), o(R, -215, 195), o(R, -150, 105), o(R, -45, 128), o(R, -22, 72), o(R, -5, 40), o(R, -27, 8), o(R, -20, -70), o(R, 10, -118), o(R, 48, -190), o(R, 55, -252), o(R, 95, -150), o(R, 45, -15), o(R, 80, 160)],
          fit: [o(R, -280, 380), o(R, 260, -300)],
          findings: [
            { pos: o(R, -215, 195), sev: 'ok', title: 'Holkar Bridge moving freely', line: '1.6 people per m², one-way flow', place: 'Ahilyabai Holkar Bridge',
              rec: 'No action. Both footpaths are flowing towards the ghats at walking speed.', readings: [['Density', '1.6 per m²'], ['Flow', 'One way'], ['Speed', 'Walking'], ['Trend', 'Steady'], ['Checked', 'Every 20 min'], ['Confidence', 'High']],
              how: 'The software counts heads in each square of the image and divides by the area on the ground.',
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 0, y: 0, w: 22, h: 120, rot: 32, label: 'BRIDGE DECK · FLOWING', c: '#3ddc84' }] }, { label: 'Density grid', type: 'density', marks: [{ t: 'cells', x: -40, y: 40, cols: 8, rows: 8, size: 10, base: 1.3, hot: [[4, 4, 0.5, 6]] }] }] },
            { pos: o(R, -5, 42), sev: 'fix', title: 'Crowd at the limit on the east ghat', line: '4.6 people per m² and rising', place: 'East ghat, below the footbridge',
              rec: '<b>Hold entry at the footbridge and open the south exit.</b> Density has gone from 3.1 to 4.6 in two patrols. At this rate it crosses 5 within ten minutes.',
              readings: [['Peak density', '4.6 per m²'], ['20 min ago', '3.1 per m²'], ['Squares over 4', '7 of 48'], ['Trend', 'Rising fast'], ['Exit lane', 'Partly blocked'], ['Confidence', 'High']],
              how: 'Each square is 9 m across. The drone compares the same squares on every patrol, so it sees a build-up as a trend, not a single snapshot.',
              action: { verb: 'Play the hold announcement and alert the sector officer', short: 'announcement played', what: 'The drone holds over the ghat and plays the recorded message in Marathi and Hindi. Police at the footbridge are told to stop entry.', done: 'Announcement played over east ghat. Sector officer acknowledged. Entry held at footbridge.' },
              views: [{ label: 'Density grid', type: 'density', marks: [{ t: 'cells', x: -18, y: 26, cols: 6, rows: 8, size: 9, base: 2.3, hot: [[1, 2, 2.6, 4], [2, 4, 1.2, 3]] }, { t: 'text', x: -18, y: 32, label: 'EAST GHAT · 9 m SQUARES' }] },
                { label: 'Top down', type: 'sat', marks: [{ t: 'box', x: -8, y: 2, w: 26, h: 34, label: 'OVER 4 PER m²', c: '#ff4d4f' }, { t: 'arrow', x1: 30, y1: -50, x2: 8, y2: -18, label: 'OPEN SOUTH EXIT', c: '#3ddc84' }] },
                { label: 'Thermal', type: 'thermal', pal: 'iron', dim: 0.35, heat: [{ x: -8, y: 4, r: 20, ry: 26, v: 0.75 }, { x: 6, y: -24, r: 14, v: 0.45 }, { x: -14, y: 30, r: 10, v: 0.5 }], read: [['MAX', '34.1°C'], ['REF', '24.8°C'], ['ΔT', '+9.3°C']], hi: '36°C', lo: '22°C' }] },
            { pos: o(R, -22, 72), sev: 'watch', title: 'Two streams meeting on the footbridge', line: 'Counter-flow on a 4 m wide deck', place: 'Ramkund footbridge',
              rec: 'Make the footbridge one-way towards the east bank until the ghat clears. Send two constables to the west end.', readings: [['Density', '3.4 per m²'], ['Flow', 'Two-way'], ['Deck width', '4 m'], ['Trend', 'Rising'], ['Queue', '35 m, west end'], ['Confidence', 'Medium']],
              how: 'The software tracks the direction of movement in each square. Opposite arrows in the same square mean counter-flow.',
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'arrow', x1: -22, y1: 2, x2: -4, y2: 2, label: 'TO EAST BANK', c: '#3ddc84' }, { t: 'arrow', x1: 16, y1: -2, x2: -2, y2: -2, c: '#ff4d4f' }, { t: 'box', x: 0, y: 0, w: 44, h: 9, label: '', c: '#ffb020' }] }, { label: 'Density grid', type: 'density', marks: [{ t: 'cells', x: -24, y: 8, cols: 12, rows: 4, size: 4, base: 2.6, hot: [[6, 2, 1.2, 5]] }] }] },
            { pos: o(R, -27, 8), sev: 'fix', title: 'Person in deep water beyond the safety line', line: 'Alone, 9 m from the steps, not moving towards the bank', place: 'Godavari channel, below the footbridge',
              rec: '<b>Send a life buoy now and direct the rescue boat.</b> One person is outside the barricaded bathing area and has drifted for 40 seconds.', readings: [['Distance from steps', '9 m'], ['Time in view', '40 s'], ['Movement', 'Drifting south'], ['Water temp', '23°C'], ['Rescue boat', '180 m away'], ['Confidence', 'High']],
              how: 'A body at 30°C stands out against 23°C water in the thermal camera, even before sunrise. The safety line is drawn on the map once, and the software checks which side each person is on.',
              action: { from: 'D-2', verb: 'Dispatch the payload drone with two life buoys', short: 'life buoys dropped', what: 'It reaches the spot from Dock D-2 in about 40 seconds and drops one buoy on each side of the person. The rescue boat is sent the position.', launch: 'Payload drone launched from Dock D-2 with two life buoys.', done: 'Two life buoys dropped beside the swimmer. Rescue boat has the position.' },
              views: [{ label: 'Thermal', type: 'thermal', pal: 'white', dim: 0.45, heat: [{ x: 0, y: 0, r: 2.2, v: 1, core: 0.6 }, { x: 22, y: 14, r: 12, ry: 30, v: 0.4 }, { x: -30, y: -10, r: 5, v: 0.3 }], marks: [{ t: 'box', x: 0, y: 0, w: 7, h: 7, label: 'PERSON · 30.2°C' }, { t: 'poly', pts: [[10, 40], [9, 10], [12, -30], [16, -50]], dash: '6 5', label: 'SAFETY LINE', c: '#ffb020' }], read: [['MAX', '30.2°C'], ['WATER', '23.0°C'], ['ΔT', '+7.2°C']], hi: '32°C', lo: '20°C' },
                { label: 'Top down', type: 'sat', marks: [{ t: 'ring', x: 0, y: 0, r: 5, label: 'SWIMMER', c: '#ff4d4f' }, { t: 'poly', pts: [[10, 40], [9, 10], [12, -30], [16, -50]], dash: '6 5', label: 'SAFETY LINE', c: '#ffb020' }] }] },
            { pos: o(R, 46, -14), sev: 'watch', title: 'Emergency lane narrowed by parked vehicles', line: 'Ambulance lane down to 2.4 m', place: 'East bank parking',
              rec: 'Send the towing team. The lane kept for ambulances and the fire tender is 2.4 m wide at this point. It needs 3.5 m.', readings: [['Lane width now', '2.4 m'], ['Needed', '3.5 m'], ['Vehicles', '4'], ['Since', '05:20'], ['Nearest picket', '60 m'], ['Confidence', 'Medium']],
              how: 'The emergency lane is drawn on the map once. The zoom camera checks it for anything standing inside it on every patrol.',
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 2, y: 2, w: 16, h: 38, rot: -18, label: '4 VEHICLES IN LANE', c: '#ffb020' }, { t: 'poly', pts: [[-12, 60], [-4, 20], [10, -30], [22, -60]], dash: '8 6', label: 'EMERGENCY LANE', c: '#5aa9ff' }] }] },
            { pos: o(R, 55, -252), sev: 'ok', title: 'Gadge Maharaj Bridge and south ghat clear', line: '0.9 people per m², exits open', place: 'Gadge Maharaj Bridge',
              rec: 'No action. This is the relief route if the east ghat has to be emptied.', readings: [['Density', '0.9 per m²'], ['Exits', 'Open'], ['Flow', 'Light'], ['Trend', 'Steady'], ['Lighting', 'Working'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 0, y: 0, w: 120, h: 16, rot: -12, label: 'RELIEF ROUTE · CLEAR', c: '#3ddc84' }] }, { label: 'Density grid', type: 'density', marks: [{ t: 'cells', x: -50, y: 30, cols: 10, rows: 6, size: 10, base: 0.8, hot: [[5, 3, 0.4, 6]] }] }] }
          ]
        },
        {
          tab: 'Sadhugram night fire watch', code: 'KM-0801-N', eyebrow: 'Mission 2 · Surveillance drone, thermal', title: 'Sadhugram tent city, night thermal sweep', sub: 'Dock D-3 → six passes over the camp ground → dock. Runs every 40 minutes through the night.',
          dock: 'D-3', responders: ['D-3'], droneName: 'Surveillance drone', start: '01:10', durMin: 14, alt: '90 m', images: 186, batUse: 38, next: 'in 26 min, automatic', wx: 'Wind 3 m/s · no rain · go', askZoom: 17,
          route: [o(T, -130, 440), o(T, -390, 440), o(T, -390, 370), o(T, -130, 370), o(T, -130, 300), o(T, -390, 300), o(T, -390, 230), o(T, -130, 230), o(T, -130, 170), o(T, -390, 170)],
          fit: [o(T, -480, 560), o(T, 220, 100)],
          zones: [{ poly: [o(T, -410, 460), o(T, -110, 460), o(T, -110, 150), o(T, -410, 150)], c: '#ffb020', t: 'SADHUGRAM CAMP (laid out for the mela)', tp: o(T, -400, 480) }],
          findings: [
            { pos: o(T, -260, 440), sev: 'ok', title: 'Fire lane along the north edge is clear', line: '6 m wide, no obstruction', rec: 'No action. The fire tender can reach every row from this lane.', readings: [['Lane width', '6 m'], ['Obstructions', 'None'], ['Hydrant points', '3 visible'], ['Checked', 'Every 40 min'], ['Lighting', 'Working'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', z: 18, scale: 2, marks: [{ t: 'box', x: 0, y: -4, w: 150, h: 10, label: 'FIRE LANE · CLEAR', c: '#3ddc84' }] }, { label: 'Thermal', type: 'thermal', z: 18, scale: 2, dim: 0.5, heat: [{ x: -40, y: -30, r: 4, v: 0.3 }, { x: 30, y: -40, r: 4, v: 0.3 }], read: [['MAX', '27.4°C'], ['REF', '21.0°C'], ['ΔT', '+6.4°C']], hi: '60°C', lo: '18°C' }] },
            { pos: o(T, -300, 345), sev: 'fix', title: 'Heat rising fast in tent row C', line: '212°C and growing between two tents', place: 'Sadhugram, row C',
              rec: '<b>Call the fire tender and send the fire-response drone.</b> The hot spot has grown from 60°C to 212°C in under two minutes. No smoke is visible yet on the day camera.', readings: [['Max temperature', '212°C'], ['2 min ago', '60°C'], ['Size', '1.8 m across'], ['Nearest tents', '3 m'], ['Wind', '3 m/s from west'], ['Confidence', 'High']],
              how: 'Cooking fires sit at a steady temperature and size. The software raises an alarm only when a hot spot grows quickly or appears where no kitchen is marked.',
              action: { from: 'D-3', verb: 'Dispatch the fire-response drone and call the fire tender', short: 'fire drone sent', what: 'The drone drops extinguishing balls on the hot spot from Dock D-3 in about one minute. The fire station gets the exact position and the clear lane to use.', launch: 'Fire-response drone launched from Dock D-3.', done: 'Extinguishing balls released on the hot spot. Fire tender routed by the north lane.' },
              views: [{ label: 'Thermal', type: 'thermal', z: 18, scale: 2, dim: 0.55, heat: [{ x: 0, y: 0, r: 5, v: 1, core: 0.5 }, { x: 0, y: 0, r: 16, v: 0.35 }, { x: -50, y: 20, r: 3, v: 0.5 }, { x: 44, y: -34, r: 3, v: 0.5 }, { x: 60, y: 30, r: 3, v: 0.45 }], marks: [{ t: 'box', x: 0, y: 0, w: 14, h: 14, label: 'HOT SPOT · 212°C · GROWING' }, { t: 'text', x: -56, y: 28, label: 'kitchen fire · steady' }], read: [['MAX', '212°C'], ['REF', '22°C'], ['ΔT', '+190°C']], hi: '250°C', lo: '18°C' },
                { label: 'Top down', type: 'sat', z: 18, scale: 2, marks: [{ t: 'ring', x: 0, y: 0, r: 9, label: 'NO SMOKE VISIBLE YET', c: '#ff4d4f' }] }] },
            { pos: o(T, -180, 300), sev: 'watch', title: 'Gas cylinders stacked against a tent wall', line: '11 cylinders, 1 m from fabric', rec: 'Ask the camp manager to move the cylinders to the marked store before morning. Recheck on the next patrol.', readings: [['Cylinders', '11'], ['Gap to tent', '1 m'], ['Rule', '5 m minimum'], ['Temperature', 'Normal'], ['First seen', '23:50'], ['Confidence', 'Medium']],
              how: 'The zoom camera recognises the shape and colour of cylinders. An operator confirms before it is logged.',
              views: [{ label: 'Top down', type: 'sat', z: 18, scale: 2, marks: [{ t: 'box', x: 0, y: 0, w: 8, h: 6, label: 'CYLINDERS ×11', c: '#ffb020' }] }, { label: 'Thermal', type: 'thermal', z: 18, scale: 2, dim: 0.5, heat: [{ x: 14, y: 6, r: 3, v: 0.45 }], read: [['MAX', '26.1°C'], ['REF', '21.5°C'], ['ΔT', '+4.6°C']], hi: '60°C', lo: '18°C' }] },
            { pos: o(T, -350, 230), sev: 'watch', title: 'Generator running hot', line: 'Casing at 96°C, normal is under 70°C', rec: 'Send the electrical team to check the generator behind kitchen 4. Keep the area around it clear.', readings: [['Casing', '96°C'], ['Normal', 'Under 70°C'], ['Fuel store', '4 m away'], ['Trend', 'Rising slowly'], ['First seen', '00:30'], ['Confidence', 'High']],
              views: [{ label: 'Thermal', type: 'thermal', z: 18, scale: 2, dim: 0.5, heat: [{ x: 0, y: 0, r: 3.5, v: 0.8 }, { x: -20, y: 10, r: 3, v: 0.4 }], marks: [{ t: 'box', x: 0, y: 0, w: 8, h: 8, label: 'GENERATOR · 96°C' }], read: [['MAX', '96°C'], ['REF', '22°C'], ['ΔT', '+74°C']], hi: '120°C', lo: '18°C' }, { label: 'Top down', type: 'sat', z: 18, scale: 2, marks: [{ t: 'ring', x: 0, y: 0, r: 6, label: 'GENERATOR', c: '#ffb020' }] }] },
            { pos: o(T, -200, 170), sev: 'ok', title: 'South rows normal', line: 'Only steady kitchen fires, all at marked kitchens', rec: 'No action.', readings: [['Hot spots', '6'], ['At marked kitchens', '6'], ['Growing', 'None'], ['People on lanes', 'Few'], ['Checked', 'Every 40 min'], ['Confidence', 'High']],
              views: [{ label: 'Thermal', type: 'thermal', z: 18, scale: 2, dim: 0.5, heat: [{ x: -40, y: 20, r: 3, v: 0.5 }, { x: 0, y: -10, r: 3, v: 0.5 }, { x: 40, y: 24, r: 3, v: 0.5 }, { x: 60, y: -30, r: 3, v: 0.45 }], read: [['MAX', '58°C'], ['REF', '21°C'], ['ΔT', '+37°C']], hi: '120°C', lo: '18°C' }, { label: 'Top down', type: 'sat', z: 18, scale: 2 }] }
          ]
        },
        {
          tab: 'Lost child and medical help', code: 'KM-0802-S', eyebrow: 'Mission 3 · Search, then payload delivery', title: 'A child is missing, and a pilgrim has collapsed', sub: 'Dock D-1 → search of the west bank and bridges → dock. Launched on request from the lost-and-found centre.',
          dock: 'D-1', responders: ['D-2'], droneName: 'Surveillance drone', start: '09:15', durMin: 9, alt: '60 m', images: 122, batUse: 26, next: 'on request', askZoom: 18,
          hint: 'A father has reported his 6-year-old missing near Ramkund. Press ▶ to launch the search.',
          route: [o(R, 60, 180), o(R, -60, 150), o(R, -60, 40), o(R, -95, 40), o(R, -95, -70), o(R, -60, -70), o(R, -60, -130), o(R, 10, -118), o(R, 60, -60), o(R, 100, 60)],
          fit: [o(R, -260, 380), o(R, 260, -260)],
          findings: [
            { pos: o(R, -60, 100), sev: 'ok', title: 'Search area set from the father\'s report', line: 'Last seen at the west steps, 09:05', rec: 'The operator has drawn the search box. The drone flies it in strips at 60 m, low enough to tell a child from an adult.', readings: [['Last seen', '09:05'], ['Description', 'Boy, 6, red shirt'], ['Search box', '150 × 250 m'], ['Strips', '4'], ['Time to cover', '5 min'], ['Mode', 'Operator-led']],
              how: 'This is an operator-led search. The software highlights small figures standing alone and red clothing. A person decides.',
              views: [{ label: 'Top down', type: 'sat', z: 18, scale: 1.6, marks: [{ t: 'box', x: -18, y: -50, w: 90, h: 240, label: 'SEARCH BOX', c: '#5aa9ff' }] }] },
            { pos: o(R, -92, -40), sev: 'fix', title: 'Child matching the description, alone', line: 'Red shirt, standing by a parked car for 3 minutes', place: 'West bank road',
              rec: '<b>Send the nearest volunteers and tell the father.</b> The match is by clothing and size only. Volunteers confirm on the ground.', readings: [['Match', 'Red shirt, child height'], ['Alone for', '3 min'], ['Nearest volunteers', '70 m, post 4'], ['Father', 'At lost-and-found'], ['Zoom', '30×'], ['Confidence', 'Medium']],
              how: 'The zoom camera gives enough detail for clothing and height. It does not recognise faces. The officer sees the picture and decides.',
              action: { verb: 'Guide volunteers from post 4 and announce by loudspeaker', short: 'volunteers guided', what: 'The drone hovers above the child as a marker, the volunteers get the position on their phones, and the loudspeaker tells the child to stay where he is.', done: 'Volunteers from post 4 reached the child in 2 minutes. Father informed.' },
              views: [{ label: 'Zoom', type: 'sat', scale: 2.2, zoomx: '30×', marks: [{ t: 'ring', x: 0, y: 0, r: 2.5, label: 'POSSIBLE MATCH', c: '#ff4d4f' }, { t: 'arrow', x1: 28, y1: 26, x2: 6, y2: 5, label: 'VOLUNTEERS · POST 4', c: '#3ddc84' }] }, { label: 'Top down', type: 'sat', marks: [{ t: 'ring', x: 0, y: 0, r: 5, c: '#ff4d4f' }] }] },
            { pos: o(R, -8, -112), sev: 'fix', title: 'Person collapsed in the queue', line: 'On the ground, a circle of people around them', place: 'Road bridge, east end',
              rec: '<b>Send the medical kit by air and the nearest medic on foot.</b> The ambulance cannot get through this queue for at least 15 minutes.', readings: [['On the ground for', '50 s'], ['Crowd around', 'About 30 people'], ['Nearest medic', '140 m, post 2'], ['Ambulance by road', '15 min or more'], ['Drone from D-2', '50 s'], ['Confidence', 'High']],
              how: 'A person lying down with a ring of people standing around is a pattern the software flags for the operator to check.',
              action: { from: 'D-2', verb: 'Dispatch the payload drone with a medical kit and defibrillator', short: 'medical kit delivered', what: 'It lowers the kit to the constable at the bridge picket in under a minute. The medic from post 2 is sent the position.', launch: 'Payload drone launched from Dock D-2 with a medical kit.', done: 'Medical kit and defibrillator delivered to the bridge picket. Medic on the way.' },
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'ring', x: 0, y: 0, r: 6, label: 'PERSON DOWN', c: '#ff4d4f' }, { t: 'arrow', x1: 40, y1: -20, x2: 8, y2: -4, label: 'DROP POINT · PICKET', c: '#ffb020' }] }, { label: 'Thermal', type: 'thermal', dim: 0.4, heat: [{ x: 0, y: 0, r: 8, v: 0.6 }, { x: 0, y: 0, r: 1.6, v: 0.9, core: 0.6 }, { x: -20, y: 6, r: 14, ry: 6, v: 0.45 }], read: [['MAX', '33.8°C'], ['REF', '27.0°C'], ['ΔT', '+6.8°C']], hi: '36°C', lo: '22°C' }] },
            { pos: o(R, 62, -58), sev: 'ok', title: 'East parking and exit route normal', line: 'No one else matching, lanes open', rec: 'No action. Search closed at 09:23.', readings: [['Density', '1.1 per m²'], ['Exit', 'Open'], ['Search', 'Closed'], ['Duration', '8 min'], ['Area covered', '3.7 ha'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat' }] }
          ]
        }
      ]
    }
  };
})();
