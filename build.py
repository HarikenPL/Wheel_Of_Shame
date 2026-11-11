"""Build the dependency-free double-click version. PWA files stay in app/."""
from pathlib import Path
r=Path(__file__).parent
a=r/'app'
s=(a/'index.html').read_text()
s=s.replace('<link rel="manifest" href="./manifest.webmanifest">','').replace('<link rel="icon" href="./icon.svg" type="image/svg+xml">','')
s=s.replace('<link rel="stylesheet" href="./style.css">','<style>'+(a/'style.css').read_text()+'</style>')
for f in ['audio-assets.js','audio.js','data.js','engine.js','app.js']:
    s=s.replace('<script src="./'+f+'"></script>','<script>'+(a/f).read_text().replace('</script','<\\/script')+'</script>')
(r/'Wheel_Lab_LOCAL.html').write_text(s)
