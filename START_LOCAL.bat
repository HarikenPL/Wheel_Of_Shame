@echo off
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 serve.py
) else (
  python serve.py
)
if errorlevel 1 (
  echo.
  echo Wymagany jest Python 3. Bez niego otworz Wheel_Lab_LOCAL.html.
  pause
)
