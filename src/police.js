(function () {
  function o(c, dx, dy, w) { var p = [c[0] + dy / 111320, c[1] + dx / (111320 * Math.cos(c[0] * Math.PI / 180))]; if (w) p.push(w); return p; }
  var G = [20.0085, 73.7690];      // Gangapur Road, real position
  var N = [20.0100, 73.7955];      // Panchavati, real position
  var R = [20.0066, 73.7926];      // Ramkund, real position
  var D1 = [20.0056431, 73.779722], D2 = [20.0097447, 73.7945917], D3 = [19.9674127, 73.822852];
  var S = o(G, -140, 52);
  window.PAGE = {
    key: 'police', loads: 'First-aid kit, rope, loudspeaker',
    pres: {
      who: 'Nashik City Police · Drone first responder',
      hero: {
        eyebrow: 'Police department · Drone as first responder',
        title: 'Eyes on the scene in two minutes. Before the first van arrives.',
        sub: 'A drone lives in a dock on the roof of each police station. When a 112 call comes in, the control room sends it with one click. It flies straight over the traffic and shows officers what is really happening, while the patrol van is still on its way. <b>An officer approves every response.</b>',
        chips: ['Dock on the station roof', 'Launch in under a minute', 'Night patrols with thermal', 'Every flight on record']
      },
      problem: {
        title: 'For the first minutes of every emergency, the control room is blind.',
        lead: 'All it has is a frightened caller\'s words. The van is sent without knowing whether it is going to a quarrel or a riot, one injured person or five. Police forces that put a drone overhead first have measured what that changes.',
        stats: [['2 to 2.5 min', 'for police drones to reach the scene in Gujarat\'s 2025 pilot, less than half the time a patrol van took'], ['97 sec', 'average drone arrival in a US city police programme, when the drone is first on scene'], ['4,629', 'calls in that programme closed from the air, with no patrol unit sent, out of 25,000 or more'], ['24', 'missing children reunited on one Mumbai immersion night in 2025, where 16 drones fed the police command centre']],
        points: [
          ['The van drives to a description, not a picture', 'Officers arrive not knowing how many people, whether anyone is armed, or which lane the accused ran into.'],
          ['Traffic slows the van, not the drone', 'At night in the old city or on a festival day, two kilometres by road can take ten minutes. In a straight line it takes two.'],
          ['Night beats cover too much ground', 'Two constables on a motorcycle cannot see rooftops, riverbeds and back lanes. A thermal camera sees a person in the dark from 80 metres up.'],
          ['No record of the first minutes', 'What the scene looked like before anyone arrived is usually lost. A drone records it, with time and position.']
        ],
        widget: 'race'
      },
      concept: {
        title: 'A drone on every station roof, sent by the control room like a patrol unit.',
        lead: 'The dock keeps a charged drone ready all day and night. It can be sent to an address from the 112 desk, or fly a fixed beat on a schedule. Video goes live to the control room and to the phone of the officer in the van.',
        loop: [['Dock on the roof', 'A charged drone waits inside a sealed box at the station.'], ['Call comes in', 'The dispatcher clicks the address. The drone launches by itself.'], ['Software detects', 'People, vehicles, crowds, fire, a person lying on the road.'], ['Officer approves', 'The control room sees the scene and decides the response.', 1], ['Help is sent right', 'Ambulance, more units, a first-aid drop, or no van at all.'], ['Record is kept', 'Video, track and every decision stored as evidence.']],
        eyes: 'Surveillance drones with zoom and thermal cameras reach the scene first, hold over it, and follow a fleeing vehicle or person so the ground units know exactly where to go.',
        hands: 'Payload drones bring what cannot wait: a first-aid kit to an accident, a rope or life buoy to a riverbank, a loudspeaker over a crowd.'
      },
      fleet: ['beetle', 'falcon', 'recon'],
      sensors: [['Day camera', '30× optical zoom with 4K video. Shows what a person is doing and which way a vehicle went, from a height that keeps the drone out of the way.'], ['Thermal camera', '640 × 512 class sensor. Finds people on rooftops, in fields and on riverbeds at night. It shows a warm shape, not a face.'], ['Voice and light', 'Loudspeaker and searchlight for crowd messages, and to tell a person on the ground that they are being watched.']],
      uc: {
        title: 'Fourteen jobs for one police drone network.',
        lead: 'These are the tasks to agree before a pilot. Each is marked honestly: in use with police forces today, ready after tuning on your streets, or still a trial.',
        items: [
          ['First responder to 112 calls', 'Drone reaches the address first and streams the scene to the control room and the van.', 'Surveillance drone · zoom', 'g'],
          ['Night beat patrol', 'Scheduled thermal patrols over markets, banks, ATMs, rooftops and riverbeds while the city sleeps.', 'Surveillance drone · thermal', 'g'],
          ['Processions and festivals', 'Crowd density along the route, choke points, and a loudspeaker when a section has to be held.', 'Surveillance drone · zoom', 'g'],
          ['Traffic jams and violations', 'Finds the cause of a jam in minutes and records wrong-side driving and illegal parking on main roads.', 'Surveillance drone · zoom', 'g'],
          ['Missing person search', 'Thermal search of fields, hills and riverbanks at night, guided by an operator.', 'Surveillance drone · thermal', 'g'],
          ['Following a fleeing vehicle', 'An operator keeps the vehicle in view from above and passes its position to units ahead.', 'Surveillance drone · zoom', 'a'],
          ['Accident scene record', 'A measured overhead picture of the scene in two minutes, so the road can be reopened sooner.', 'Survey drone · mapping camera', 'a'],
          ['First-aid and rescue drops', 'A first-aid kit to an accident, a life buoy to the river, before the ambulance arrives.', 'Payload drone · 6 kg', 'a'],
          ['Loudspeaker and searchlight', 'Clear instructions to a crowd, or light on a dark lane for officers on foot.', 'Payload drone · loudspeaker', 'g'],
          ['Illegal crops and stills', 'Surveys of remote land for cannabis plots and illicit liquor units.', 'Surveillance drone · zoom', 'g'],
          ['Sand mining watch', 'Night flights over riverbeds to record excavators and trucks with time and position.', 'Surveillance drone · thermal', 'a'],
          ['VIP route check', 'Rooftops and side lanes along a route checked from above before a convoy moves.', 'Surveillance drone · zoom', 'a'],
          ['Flood and disaster response', 'Finding stranded people and dropping supplies when roads are cut.', 'Surveillance + payload drones', 'a'],
          ['Evidence with a flight log', 'Every video carries time, position and the signed record of the flight it came from.', 'Dock flight record', 'g']
        ],
        not: 'What we do not claim: face recognition, number-plate reading or weapon detection from the air. No Indian force has published accuracy figures for these, so the system shows people and vehicles, and officers identify them.'
      },
      auto: {
        who: 'The officer',
        self: ['Launch on a dispatcher\'s click, and scheduled beats', 'Flies to the address and holds over it', 'Returns to the dock on low battery or lost link', 'Lands, charges and reports ready'],
        detect: ['People, vehicles, crowds and fire in the picture', 'A person on the ground, a vehicle leaving', 'Ranks findings: fix now, watch, all clear', 'Proposes one response for each urgent finding'],
        human: ['Which units and services are sent', 'Any payload drop or loudspeaker message', 'Whether to follow a person or vehicle', 'Each decision logged with name and time'],
        quote: 'The drone does not replace the patrol van. It tells the van what it is driving into, and it tells the control room when no van is needed.'
      },
      close: {
        title: 'Start with one police station and measure it against the van.',
        lead: 'A 30-day pilot at one station answers the only question that matters: how much sooner does the control room see the scene, and what does it do with that time?',
        steps: [['Week 1', 'Pick the station', 'Choose a station with heavy call volume. Survey the roof for the dock and agree the patrol beats.'], ['Weeks 2 to 3', 'Fly with a crew', 'Our pilots answer live calls alongside the patrol van. Both arrival times are logged.'], ['Week 4', 'Report the numbers', 'Time to scene, calls closed from the air, and night-beat findings, shared with the Commissioner.'], ['After', 'Add stations', 'Each new dock covers about a 2 km radius. Docks overlap to cover the city.']],
        fine: ['The demo above uses real Nashik streets and police station positions from open map data. Calls, findings, readings and sensor images are sample data.', 'Remote operation from docks, flights beyond the pilot\'s line of sight and flights at night are subject to DGCA and Home Department permissions. Until those are in place, a trained pilot is present for every flight.', 'Response times in the demo assume 45 seconds to launch and 15 m/s in a straight line. The pilot measures real times.', 'The dock is in prototype. Pilot deployments begin with a crew on site and move to dock operation as approvals and field trials allow.', 'Video and flight records are stored under the department\'s control and its data rules.']
      }
    },
    demo: {
      title: 'Nashik City Police · Drone first responder', officer: 'the control room officer', officerName: 'Control room officer', maxNative: 19, viewZ: 19, viewScale: 1.25,
      note: 'Real streets and police station positions in Nashik. Calls, findings, photos and readings are sample data for this demo.',
      docks: [{ id: 'D-1', name: 'Sarkarwada Police Station', pos: D1 }, { id: 'D-2', name: 'Panchavati police chowky', pos: D2 }, { id: 'D-3', name: 'Upnagar Police Station', pos: D3 }],
      labels: [{ pos: o(G, 60, -60), t: 'Gangapur Road', ax: -10 }, { pos: o(R, -150, 130), t: 'Ramkund', ax: 20 }, { pos: o(R, -28, -40), t: 'Godavari', ax: 50 }],
      missions: [
        {
          tab: '112 call: road accident', code: 'NP-112-2142', eyebrow: 'Mission 1 · Drone as first responder', title: '112 call at 21:42: accident on Gangapur Road', sub: 'Caller is not sure how many are hurt. Dock D-1 is 1.3 km away in a straight line. The patrol van is 6 minutes away by road.',
          dock: 'D-1', responders: ['D-1'], droneName: 'Surveillance drone', start: '21:42:10', durMin: 9, speed: 15, launchDelay: 45, alt: '70 m', images: 96, batUse: 30, next: 'on the next call', wx: 'Wind 3 m/s · no rain · go', askZoom: 18,
          hint: 'A 112 call has come in. Press ▶ to send the drone from Dock D-1.',
          route: [S.concat([35]), o(S, 30, 22, 15), o(S, -26, 26, 15), o(S, -150, 55, 12), o(S, 0, 0, 10), o(G, 0, -5), o(G, 100, -68), o(G, 228, -112, 25), o(G, 0, -5), S.concat([90])],
          fit: [o(G, -420, 420), D1, o(G, 300, -200)],
          zones: [{ circle: D1, r: 2000, c: '#3ddc84', t: 'D-1 · 2 km · about 3 min', fo: 0.03 }, { circle: D2, r: 2000, c: '#5aa9ff', t: 'D-2 · 2 km', fo: 0.03 }],
          findings: [
            { ts: 134, pos: S, sev: 'fix', title: 'On scene in 2 min 13 s: one person on the road', line: 'Two vehicles, one person lying down, not moving', place: 'Gangapur Road',
              rec: '<b>Send an ambulance now and tell the van what it is driving into.</b> A car and a two-wheeler have collided. One person is lying on the road, and about fifteen people have gathered.', readings: [['Time from call', '2 min 13 s'], ['Patrol van', '4 min 20 s away'], ['Vehicles', 'Car + two-wheeler'], ['People down', '1'], ['Bystanders', 'About 15'], ['Fire or fuel', 'None seen']],
              how: 'The software marks vehicles stopped at odd angles and a person lying down. The officer sees the live picture and decides.',
              action: { from: 'D-1', verb: 'Call the ambulance and send the payload drone with a first-aid kit', short: 'ambulance + first-aid kit', what: 'The ambulance and the van get the live video and exact position. A second drone carries a first-aid kit to the scene in under two minutes, for the bystanders to use until help arrives.', launch: 'Payload drone launched from Dock D-1 with a first-aid kit.', done: 'First-aid kit lowered to the scene. Ambulance and patrol van have live video.' },
              views: [{ label: 'Zoom', type: 'sat', zoomx: '12×', marks: [{ t: 'box', x: 2, y: 0, w: 7, h: 4, rot: 20, label: 'CAR', c: '#ffe14d' }, { t: 'box', x: -6, y: -3, w: 3, h: 2, rot: -30, label: 'TWO-WHEELER', c: '#ffe14d' }, { t: 'ring', x: -4, y: 4, r: 2.2, label: 'PERSON DOWN', c: '#ff4d4f' }] },
                { label: 'Thermal', type: 'thermal', pal: 'white', dim: 0.45, heat: [{ x: 2, y: 0, r: 3.5, v: 0.8 }, { x: -6, y: -3, r: 1.6, v: 0.7 }, { x: -4, y: 4, r: 1.4, v: 0.95, core: 0.6 }, { x: -12, y: 10, r: 6, v: 0.5 }, { x: 10, y: 9, r: 5, v: 0.45 }], marks: [{ t: 'ring', x: -4, y: 4, r: 2.2, label: 'PERSON · 31°C' }, { t: 'text', x: 5, y: -6, label: 'ENGINE HOT' }], read: [['MAX', '78°C'], ['REF', '24°C'], ['ΔT', '+54°C']], hi: '80°C', lo: '20°C' }] },
            { ts: 215, pos: o(S, -150, 55), sev: 'watch', title: 'Traffic backing up to the roundabout', line: '160 m queue, eastbound lane blocked', rec: 'Send one traffic constable to the roundabout to turn vehicles back. The ambulance should come in from the east side.', readings: [['Queue', '160 m'], ['Lane blocked', 'Eastbound'], ['Best approach', 'From the east'], ['Growing', 'Yes'], ['Since', '21:43'], ['Confidence', 'High']],
              views: [{ label: 'Top down', type: 'sat', z: 18, scale: 1.8, marks: [{ t: 'arrow', x1: 20, y1: -8, x2: 140, y2: -52, label: 'QUEUE 160 m', c: '#ffb020' }, { t: 'ring', x: 0, y: 0, r: 16, label: 'ROUNDABOUT', c: '#5aa9ff' }] }] },
            { ts: 290, pos: o(G, 228, -112), sev: 'watch', title: 'Car left the scene, followed for 420 m', line: 'White car, went east, now stopped at the junction', place: 'Gangapur Road, east junction',
              rec: 'Pass the car\'s position and description to the van coming from the east. The operator followed it from the scene to this junction.', readings: [['Followed', '420 m'], ['Vehicle', 'White car'], ['Now', 'Stopped at junction'], ['Left scene', '21:46:05'], ['Number plate', 'Not readable from air'], ['Mode', 'Operator-led']],
              how: 'An operator keeps the vehicle in the centre of the picture. The software holds the lock. The number plate is read by officers on the ground, not from the air.',
              action: { verb: 'Send the car\'s live position to the nearest patrol unit', short: 'position sent to patrol', what: 'The unit at the east junction gets the map position and a still picture of the car.', done: 'Position and picture sent. Patrol unit acknowledged.' },
              views: [{ label: 'Zoom', type: 'sat', zoomx: '20×', marks: [{ t: 'box', x: 0, y: 0, w: 6, h: 3.5, rot: 25, label: 'WHITE CAR · STOPPED', c: '#ffb020' }] }, { label: 'Top down', type: 'sat', z: 18, scale: 1.6, marks: [{ t: 'arrow', x1: -200, y1: 98, x2: -12, y2: 6, label: 'TRACK FROM SCENE', c: '#ffb020' }] }] },
            { ts: 392, pos: o(S, 8, -6), sev: 'ok', title: 'Patrol van on scene at 6 min 32 s', line: 'Handover complete, ambulance arriving', rec: 'No further action. The drone had the scene for 4 minutes 19 seconds before the van. It now returns to its dock.', readings: [['Van arrival', '6 min 32 s'], ['Drone arrival', '2 min 13 s'], ['Head start', '4 min 19 s'], ['Ambulance', '1 min away'], ['Video stored', 'Yes'], ['Flight record', 'Signed']],
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 10, y: -6, w: 7, h: 3.5, rot: 20, label: 'PATROL VAN', c: '#3ddc84' }] }] }
          ]
        },
        {
          tab: 'Night beat patrol', code: 'NP-BEAT-0210', eyebrow: 'Mission 2 · Surveillance drone, thermal', title: 'Panchavati night beat, 02:10', sub: 'Dock D-2 → market road → bus stand → school → back lanes → dock. Flies every hour from midnight to 5 am.',
          dock: 'D-2', droneName: 'Surveillance drone', start: '02:10', durMin: 11, alt: '80 m', images: 148, batUse: 32, next: 'at 03:10, automatic', wx: 'Wind 2 m/s · no rain · go', askZoom: 18,
          route: [o(N, -20, 60), o(N, 60, 172), o(N, 130, 196), o(N, 232, 120), o(N, 150, 0), o(N, 60, -100), o(N, -120, -100)],
          fit: [o(N, -260, 320), o(N, 330, -220)],
          findings: [
            { pos: o(N, -20, 60), sev: 'watch', title: 'Person on the roof of a closed shop', line: 'One warm figure, on the roof for 6 minutes', place: 'Market road',
              rec: 'Send the beat marshals to check. The shops in this row closed at 22:00 and the roof has no stair from the street.', readings: [['People', '1'], ['On roof for', '6 min'], ['Shops closed', 'Since 22:00'], ['Beat marshals', '350 m away'], ['Temperature', '30°C against 19°C'], ['Confidence', 'High']],
              how: 'At night a person is the warmest thing on a roof. The software knows which buildings are marked as closed and raises anyone on top of them.',
              action: { verb: 'Send the beat marshals and switch on the searchlight', short: 'marshals sent', what: 'The drone lights the roof and holds position, so the person knows they are seen and the marshals know exactly where to go.', done: 'Searchlight on. Beat marshals reached the shop in 3 minutes.' },
              views: [{ label: 'Thermal', type: 'thermal', pal: 'white', dim: 0.5, heat: [{ x: 0, y: 0, r: 1.5, v: 1, core: 0.6 }, { x: 30, y: -24, r: 3, v: 0.4 }, { x: -34, y: 30, r: 2.5, v: 0.35 }], marks: [{ t: 'box', x: 0, y: 0, w: 6, h: 6, label: 'PERSON · 30°C' }], read: [['MAX', '30.4°C'], ['REF', '19.0°C'], ['ΔT', '+11.4°C']], hi: '32°C', lo: '16°C' }, { label: 'Top down', type: 'sat', marks: [{ t: 'ring', x: 0, y: 0, r: 5, label: 'ROOF, CLOSED SHOP', c: '#ffb020' }] }] },
            { pos: o(N, 60, 172), sev: 'fix', title: 'Fire in a waste heap beside a transformer', line: '340°C, flames 4 m from the transformer', place: 'Near the bus stand',
              rec: '<b>Call the fire brigade and the power company.</b> A burning waste heap is four metres from a street transformer. Nobody is near it.', readings: [['Max temperature', '340°C'], ['Size', '2.5 m across'], ['Transformer', '4 m away'], ['People nearby', 'None'], ['Wind', '2 m/s'], ['Confidence', 'High']],
              action: { verb: 'Alert the fire brigade and the power company control room', short: 'fire brigade alerted', what: 'Both get the map position, the thermal picture and the clear approach road.', done: 'Fire brigade and power company alerted with position and picture.' },
              views: [{ label: 'Thermal', type: 'thermal', dim: 0.5, heat: [{ x: 0, y: 0, r: 4, v: 1, core: 0.55 }, { x: 0, y: 0, r: 12, v: 0.35 }, { x: 5, y: -3, r: 2, v: 0.5 }], marks: [{ t: 'box', x: 0, y: 0, w: 10, h: 10, label: 'FIRE · 340°C' }, { t: 'text', x: 7, y: -8, label: 'TRANSFORMER · 61°C' }], read: [['MAX', '340°C'], ['REF', '19°C'], ['ΔT', '+321°C']], hi: '350°C', lo: '16°C' }, { label: 'Top down', type: 'sat', marks: [{ t: 'ring', x: 0, y: 0, r: 7, label: 'WASTE HEAP', c: '#ff4d4f' }] }] },
            { pos: o(N, 130, 196), sev: 'watch', title: 'Vehicle parked in the empty bus stand, engine warm', line: 'Arrived in the last 20 minutes, two people inside', rec: 'Ask the night patrol to check on its next round. The bus stand is closed until 05:00.', readings: [['Engine', 'Warm'], ['People inside', '2'], ['Arrived', 'After 01:50'], ['Bus stand', 'Closed'], ['Number plate', 'Not readable from air'], ['Confidence', 'Medium']],
              how: 'The drone compares this patrol with the last one. Anything new and warm in a closed area is listed.',
              views: [{ label: 'Thermal', type: 'thermal', pal: 'white', dim: 0.5, heat: [{ x: 0, y: 1, r: 2.4, v: 0.85 }, { x: 0, y: -1.5, r: 1.2, v: 0.6 }], marks: [{ t: 'box', x: 0, y: 0, w: 5, h: 7, label: 'VEHICLE · ENGINE 52°C' }], read: [['MAX', '52°C'], ['REF', '19°C'], ['ΔT', '+33°C']], hi: '60°C', lo: '16°C' }, { label: 'Top down', type: 'sat' }] },
            { pos: o(N, 150, 0), sev: 'ok', title: 'School compound quiet', line: 'Gates shut, nobody inside', rec: 'No action.', readings: [['People', 'None'], ['Gates', 'Shut'], ['Vehicles', 'None new'], ['Last patrol', 'Same'], ['Checked', 'Hourly'], ['Confidence', 'High']],
              views: [{ label: 'Thermal', type: 'thermal', pal: 'white', dim: 0.5, heat: [{ x: 40, y: 30, r: 2, v: 0.3 }], read: [['MAX', '24°C'], ['REF', '19°C'], ['ΔT', '+5°C']], hi: '32°C', lo: '16°C' }, { label: 'Top down', type: 'sat' }] },
            { pos: o(N, -120, -100), sev: 'ok', title: 'Back lanes and ATM lane clear', line: 'Two people walking, one street dog pack', rec: 'No action.', readings: [['People', '2, walking'], ['Vehicles', 'None moving'], ['ATM lane', 'Clear'], ['Street lights', '2 not working'], ['Checked', 'Hourly'], ['Confidence', 'High']],
              views: [{ label: 'Thermal', type: 'thermal', pal: 'white', dim: 0.5, heat: [{ x: -10, y: 6, r: 1.2, v: 0.9 }, { x: -8, y: 8, r: 1.2, v: 0.9 }, { x: 30, y: -20, r: 2, v: 0.5 }], read: [['MAX', '30°C'], ['REF', '19°C'], ['ΔT', '+11°C']], hi: '32°C', lo: '16°C' }, { label: 'Top down', type: 'sat' }] }
          ]
        },
        {
          tab: 'Procession to Ramkund', code: 'NP-PROC-1830', eyebrow: 'Mission 3 · Surveillance drone over a procession', title: 'Immersion procession to Ramkund, 18:30', sub: 'Dock D-2 → along the procession route → Gadge Maharaj Bridge → dock. One pass every 15 minutes.',
          dock: 'D-2', droneName: 'Surveillance drone', start: '18:30', durMin: 10, alt: '80 m', images: 132, batUse: 30, next: 'in 5 min, automatic', askZoom: 18,
          route: [o(R, 42, 250), o(R, 60, 150), o(R, 75, 60), o(R, 96, -40), o(R, 110, -140), o(R, 90, -228), o(R, 55, -255), o(R, 130, -120)],
          fit: [o(R, -240, 400), o(R, 320, -300)],
          zones: [{ poly: [o(R, 34, 250), o(R, 52, 150), o(R, 67, 60), o(R, 88, -40), o(R, 102, -140), o(R, 84, -226), o(R, 96, -230), o(R, 118, -140), o(R, 104, -40), o(R, 83, 60), o(R, 68, 150), o(R, 50, 250)], c: '#ffb020', t: 'PROCESSION ROUTE', tp: o(R, 60, 262), fo: 0.12 }],
          findings: [
            { pos: o(R, 42, 250), sev: 'ok', title: 'Tail of the procession moving', line: '1.8 people per m², steady walking pace', rec: 'No action. The last group has cleared the main road junction.', readings: [['Density', '1.8 per m²'], ['Pace', 'Walking'], ['Vehicles', '2 trucks'], ['Trend', 'Steady'], ['Checked', 'Every 15 min'], ['Confidence', 'High']],
              views: [{ label: 'Density grid', type: 'density', marks: [{ t: 'cells', x: -30, y: 40, cols: 6, rows: 8, size: 10, base: 1.5, hot: [[3, 4, 0.5, 5]] }] }, { label: 'Top down', type: 'sat' }] },
            { pos: o(R, 75, 60), sev: 'fix', title: 'Crowd compressing where the road narrows', line: '4.4 people per m², two groups have merged', place: 'Route, narrow section',
              rec: '<b>Hold the next group at the junction behind and let this section drain.</b> Two groups have closed up at the narrowest part of the road. Density went from 2.9 to 4.4 in fifteen minutes.', readings: [['Peak density', '4.4 per m²'], ['15 min ago', '2.9 per m²'], ['Road width', '7 m'], ['Trend', 'Rising'], ['Groups merged', '2'], ['Confidence', 'High']],
              how: 'The drone compares the same squares on each pass, so it sees a section filling up before the people in it do.',
              action: { verb: 'Hold the next group and play the loudspeaker message', short: 'group held', what: 'Police at the junction behind are told to hold the next group for ten minutes. The drone plays the message asking people to keep moving towards the bridge.', done: 'Next group held at the junction. Loudspeaker message played. Section draining.' },
              views: [{ label: 'Density grid', type: 'density', marks: [{ t: 'cells', x: -22, y: 40, cols: 5, rows: 9, size: 9, base: 2.4, hot: [[2, 4, 2.3, 4]] }] }, { label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 0, y: 0, w: 22, h: 40, rot: -10, label: 'OVER 4 PER m²', c: '#ff4d4f' }, { t: 'arrow', x1: -6, y1: 62, x2: -2, y2: 34, label: 'HOLD HERE', c: '#ffb020' }] }] },
            { pos: o(R, 96, -40), sev: 'watch', title: 'Stalled tempo in the emergency lane', line: 'Blocking half the road beside the procession', rec: 'Send the towing vehicle from the south side. The emergency lane beside the procession is blocked at this point.', readings: [['Stopped for', '9 min'], ['Lane left', '2.2 m'], ['Needed', '3.5 m'], ['Tow truck', '300 m, south'], ['Since', '18:27'], ['Confidence', 'Medium']],
              views: [{ label: 'Top down', type: 'sat', marks: [{ t: 'box', x: 0, y: 0, w: 4, h: 8, rot: -12, label: 'STALLED VEHICLE', c: '#ffb020' }] }] },
            { pos: o(R, 124, -128), sev: 'watch', title: 'Thirty people on an old balcony', line: 'Watching the procession from a weak structure', rec: 'Send two constables to clear the balcony. It is on the list of unsafe old buildings.', readings: [['People', 'About 30'], ['Structure', 'Old balcony'], ['On unsafe list', 'Yes'], ['Constables', '80 m away'], ['Zoom', '20×'], ['Confidence', 'Medium']],
              how: 'Buildings marked unsafe by the municipal corporation are loaded on the map. The software lists any of them with a crowd on top.',
              action: { verb: 'Send constables to clear the balcony', short: 'constables sent', what: 'The nearest picket gets the building position and a picture.', done: 'Constables sent. Balcony cleared in 4 minutes.' },
              views: [{ label: 'Zoom', type: 'sat', zoomx: '20×', marks: [{ t: 'box', x: 0, y: 0, w: 14, h: 5, label: 'ABOUT 30 PEOPLE', c: '#ffb020' }] }, { label: 'Thermal', type: 'thermal', dim: 0.4, heat: [{ x: 0, y: 0, r: 7, ry: 3, v: 0.75 }], read: [['MAX', '33°C'], ['REF', '26°C'], ['ΔT', '+7°C']], hi: '36°C', lo: '22°C' }] },
            { pos: o(R, 62, -252), sev: 'ok', title: 'Bridge and immersion point flowing', line: '2.1 people per m², exits open', place: 'Gadge Maharaj Bridge', rec: 'No action. The head of the procession is crossing at a steady pace.', readings: [['Density', '2.1 per m²'], ['Exits', 'Open'], ['Boats', '3 in position'], ['Lighting', 'Working'], ['Trend', 'Steady'], ['Confidence', 'High']],
              views: [{ label: 'Density grid', type: 'density', marks: [{ t: 'cells', x: -50, y: 24, cols: 10, rows: 5, size: 10, base: 1.7, hot: [[5, 2, 0.6, 5]] }] }, { label: 'Top down', type: 'sat' }] }
          ]
        }
      ]
    }
  };
})();
