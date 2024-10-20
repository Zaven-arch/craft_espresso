@echo off
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --app="http://localhost:3000"
node ".output\server\index.mjs"

:: Terminate the Node.js process when the batch file is closed
taskkill /f /im node.exe
