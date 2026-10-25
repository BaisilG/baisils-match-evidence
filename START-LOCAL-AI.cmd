@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Install Node.js from https://nodejs.org first.
 pause
 exit /b 1
)
echo Open http://127.0.0.1:4173 in your browser after the server starts.
echo For AI, install Ollama and run: ollama pull phi4-mini
node server.mjs
pause
