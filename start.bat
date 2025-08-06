@echo off
title Video Wall Launcher
cd /d %~dp0

REM -- Start Node.js proxy server (in a new terminal)
start cmd /k "node server.js"

REM -- Wait a bit for proxy to start
timeout /t 3 /nobreak > nul

REM -- Start static server with npx serve (in another terminal)
start cmd /k "npx serve"

REM -- Wait for static server to start
timeout /t 3 /nobreak > nul

REM -- Launch Chrome in fullscreen (kiosk) mode
start chrome --kiosk http://localhost:3000/index.html