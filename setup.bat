@echo off
setlocal
pushd %~dp0

if exist "C:\Program Files\nodejs" (
    npm install
    npm install nodemon -g
) else (
    echo need setup nodejs
)

pause
