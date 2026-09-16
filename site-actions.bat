@echo off
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

set "INTERACTIVE=0"
set "CLI_MESSAGE=%~2"

if "%~1"=="" (
  set "INTERACTIVE=1"
  goto menu
)

if /i "%~1"=="pages" goto pages
if /i "%~1"=="push" goto push
if /i "%~1"=="all" goto all

echo Unknown command: %~1
echo Usage: site-actions.bat [pages^|push^|all] ["commit message"]
exit /b 2

:menu
cls
echo ==============================================
echo          CARGO 575 - SITE ACTIONS
echo ==============================================
echo.
echo [1] Pages only - redeploy current origin/main
echo [2] Push only  - build, commit and push changes
echo [3] All        - push and wait for Pages deploy
echo [4] Exit
echo.
set /p "ACTION=Select action: "

if "%ACTION%"=="1" goto pages
if "%ACTION%"=="2" goto push
if "%ACTION%"=="3" goto all
if "%ACTION%"=="4" exit /b 0
goto menu

:check_tools
where git >nul 2>&1 || (
  echo Error: git was not found.
  exit /b 1
)
where gh >nul 2>&1 || (
  echo Error: GitHub CLI ^(gh^) was not found.
  exit /b 1
)
where npm >nul 2>&1 || (
  echo Error: npm was not found.
  exit /b 1
)
exit /b 0

:push_changes
call :check_tools || exit /b 1

echo.
echo [1/3] Checking production build...
call npm run build || exit /b 1

echo.
echo [2/3] Fetching origin/main...
git fetch origin main || exit /b 1

set "HAS_CHANGES="
for /f "delims=" %%S in ('git status --porcelain') do set "HAS_CHANGES=1"

if defined HAS_CHANGES (
  set "COMMIT_MESSAGE=Update website"
  if defined CLI_MESSAGE set "COMMIT_MESSAGE=!CLI_MESSAGE!"
  if "!INTERACTIVE!"=="1" set /p "COMMIT_MESSAGE=Commit message [Update website]: "
  if not defined COMMIT_MESSAGE set "COMMIT_MESSAGE=Update website"

  git add -A || exit /b 1
  git commit -m "!COMMIT_MESSAGE!" || exit /b 1
) else (
  echo No local changes to commit.
)

for /f "delims=" %%S in ('git rev-parse HEAD') do set "LOCAL_SHA=%%S"
for /f "delims=" %%S in ('git rev-parse origin/main') do set "REMOTE_SHA=%%S"
set "PUSH_CHANGED=0"
if /i not "!LOCAL_SHA!"=="!REMOTE_SHA!" set "PUSH_CHANGED=1"

echo.
echo [3/3] Pushing main to origin...
git push origin main || exit /b 1
set "PUSH_SHA=!LOCAL_SHA!"
exit /b 0

:wait_run
set "RUN_ID="
set /a "WAIT_TRIES=0"

:wait_run_loop
set /a "WAIT_TRIES+=1"
for /f "delims=" %%R in ('gh run list --workflow pages.yml --event !RUN_EVENT! --commit !RUN_SHA! --limit 1 --json databaseId --jq ".[0].databaseId"') do set "RUN_ID=%%R"

if defined RUN_ID if defined OLD_RUN_ID if "!RUN_ID!"=="!OLD_RUN_ID!" set "RUN_ID="
if defined RUN_ID goto watch_run

if !WAIT_TRIES! GEQ 20 (
  echo Error: a new GitHub Pages run did not appear within 60 seconds.
  exit /b 1
)

timeout /t 3 /nobreak >nul
goto wait_run_loop

:watch_run
echo Found Pages run: !RUN_ID!
gh run watch !RUN_ID! --exit-status || exit /b 1
exit /b 0

:dispatch_pages
call :check_tools || exit /b 1
git fetch origin main || exit /b 1
for /f "delims=" %%S in ('git rev-parse origin/main') do set "RUN_SHA=%%S"

set "OLD_RUN_ID="
for /f "delims=" %%R in ('gh run list --workflow pages.yml --event workflow_dispatch --commit !RUN_SHA! --limit 1 --json databaseId --jq ".[0].databaseId"') do set "OLD_RUN_ID=%%R"

echo Starting GitHub Pages for origin/main...
gh workflow run pages.yml --ref main || exit /b 1
set "RUN_EVENT=workflow_dispatch"
call :wait_run || exit /b 1
exit /b 0

:pages
call :dispatch_pages
set "RESULT=%ERRORLEVEL%"
goto finish

:push
call :push_changes
set "RESULT=%ERRORLEVEL%"
goto finish

:all
call :push_changes || (
  set "RESULT=1"
  goto finish
)

if "!PUSH_CHANGED!"=="1" (
  set "RUN_EVENT=push"
  set "RUN_SHA=!PUSH_SHA!"
  set "OLD_RUN_ID="
  call :wait_run
) else (
  echo Push did not start a new run. Dispatching Pages manually...
  call :dispatch_pages
)
set "RESULT=!ERRORLEVEL!"
goto finish

:finish
echo.
if "%RESULT%"=="0" (
  echo Done.
) else (
  echo Operation failed.
)
if "%INTERACTIVE%"=="1" pause
exit /b %RESULT%
