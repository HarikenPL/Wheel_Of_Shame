"""Prepare docs/ for GitHub Pages and the standalone HTML, using only stdlib.

Run: python prepare_release.py --version 0.2.6
Without --version, rebuild the current version.
"""
import argparse
import datetime
import json
from pathlib import Path
import re
import runpy
import shutil

root = Path(__file__).parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--version', help='New technical version, for example 0.2.6')
args = parser.parse_args()
if args.version:
    if not re.fullmatch(r'\d+\.\d+\.\d+', args.version):
        parser.error('Version must look like 0.2.6')
    v = args.version
    p = root / 'app' / 'data.js'
    p.write_text(re.sub(r'("appVersion"\s*:\s*")[^"]+', lambda m: m[1] + v, p.read_text()))
    p = root / 'app' / 'sw.js'
    p.write_text(re.sub(r"const VERSION='[^']+'", f"const VERSION='{v}'", p.read_text()))
    p = root / 'make_data.py'
    p.write_text(re.sub(r"appVersion='[^']+'", f"appVersion='{v}'", p.read_text()))
    p = root / 'app' / 'version.json'
    data = json.loads(p.read_text()); data['version'] = v
    data['released'] = datetime.date.today().isoformat()
    p.write_text(json.dumps(data, ensure_ascii=False) + '\n')
runpy.run_path(str(root / 'build_audio.py'))
runpy.run_path(str(root / 'build.py'))
docs = root / 'docs'
docs.mkdir(exist_ok=True)
# Copy only deployable files. Never put local backups or player data in docs/.
shutil.copytree(root / 'app', docs, dirs_exist_ok=True)
print('Ready: docs/ for GitHub Pages, Wheel_Lab_LOCAL.html for local testing.')
