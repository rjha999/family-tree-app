@echo off
echo ====================================
echo Family Tree Application Launcher
echo ====================================
echo.
echo This will start both the backend API and frontend application.
echo.

echo Starting Backend API...
start "Family Tree API" powershell -NoExit -Command "cd '%~dp0FamilyTreeAPI'; dotnet run"

echo Waiting for API to initialize...
timeout /t 5 /nobreak >nul

echo.
echo Starting Frontend Application...
start "Family Tree App" powershell -NoExit -Command "cd '%~dp0FamilyTreeApp'; npm start"

echo.
echo ====================================
echo Both servers are starting!
echo ====================================
echo.
echo Backend API: https://localhost:7071
echo Frontend App: http://localhost:4200
echo.
echo Two PowerShell windows will open.
echo Keep both windows open while using the app.
echo.
echo Press any key to exit this window...
pause >nul
