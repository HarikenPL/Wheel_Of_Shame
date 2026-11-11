"""Rebuild embedded audio from the two supplied reference excerpts (stdlib)."""
from pathlib import Path
import base64
import json

root = Path(__file__).parent
assets = {}
for key, filename, mime in [('menu', 'menu.mp3', 'audio/mpeg'), ('tick', 'tick.wav', 'audio/wav')]:
    encoded = base64.b64encode((root / 'audio-source' / filename).read_bytes()).decode('ascii')
    assets[key] = f'data:{mime};base64,{encoded}'
(root / 'app' / 'audio-assets.js').write_text('globalThis.WL_AUDIO_ASSETS = ' + json.dumps(assets) + ';\n')
