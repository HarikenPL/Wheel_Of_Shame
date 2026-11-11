"""Standard-library localhost server. No dependencies, no public network binding."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from functools import partial
import webbrowser
root=Path(__file__).resolve().parent/'app'
class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control','no-cache')
        super().end_headers()
url='http://localhost:8765/'
try:
    server=ThreadingHTTPServer(('127.0.0.1',8765),partial(Handler,directory=str(root)))
except OSError as exc:
    print('Port 8765 jest zajęty. Zamknij wcześniejszy serwer Wheel Lab i spróbuj ponownie.');raise SystemExit(1)
print('Wheel Lab:',url,' — Ctrl+C zatrzymuje serwer.')
webbrowser.open(url)
try: server.serve_forever()
except KeyboardInterrupt: pass
finally: server.server_close()
