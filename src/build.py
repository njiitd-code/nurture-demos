"""Builds the three self-contained demo pages.

Usage:  python3 src/build.py .        (from the repository root)

Each page is one HTML file with all scripts and styles inlined. The only things loaded from the
network at view time are Google Fonts and the satellite map tiles.
"""
import base64, re, os, sys
S = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(S)
rd = lambda p: open(p, encoding='utf-8').read()
V = S + '/vendor'
lcss = re.sub(r'url\([^)]*\)', 'none', rd(V + '/leaflet.css'))
ljs = rd(V + '/leaflet.js').replace('//# sourceMappingURL=leaflet.js.map', '')
three = rd(V + '/three.min.js')
models = rd(V + '/models.js')
assert 'build: build' in models
logo = 'data:image/png;base64,' + base64.b64encode(open(V + '/logo-light.png', 'rb').read()).decode()
tpl = rd(S + '/page.html')
def safe(js): return js.replace('</script', '<\\/script')
pages = {'kumbh': 'Nurture Aerospace · Simhastha 2027 crowd safety', 'police': 'Nurture Aerospace · Police drone first responder', 'water': 'Nurture Aerospace · River, dam and canal monitoring'}
for k, title in pages.items():
    h = tpl
    for a, b in [('__TITLE__', title), ('__LEAFLET_CSS__', lcss), ('__CSS__', rd(S + '/base.css')), ('__LOGO__', logo), ('__LEAFLET_JS__', safe(ljs)), ('__THREE__', safe(three)), ('__MODELS__', safe(models)), ('__DOCK__', safe(rd(S + '/dock3d.js'))), ('__PAGE__', safe(rd(S + '/' + k + '.js'))), ('__ENGINE__', safe(rd(S + '/engine.js'))), ('__RENDER__', safe(rd(S + '/render.js')))]:
        h = h.replace(a, b)
    os.makedirs(OUT + '/' + k, exist_ok=True)
    open(OUT + '/' + k + '/index.html', 'w', encoding='utf-8').write(h)
    print(k, len(h))
open(OUT + '/index.html', 'w', encoding='utf-8').write(rd(S + '/index.html').replace('__LOGO__', logo))
