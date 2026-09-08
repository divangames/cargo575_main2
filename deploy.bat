@echo off
cd /d "%~dp0"
call npm run build
echo Сборка лежит в папке dist. Залейте её на хостинг 575cargo.ru
pause
