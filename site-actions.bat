@echo off
setlocal EnableExtensions EnableDelayedExpansion

rem ============================================================
rem CARGO 575 - push / GitHub Pages
rem Safe staging, UTF-8 commits, wait for Pages deploy
rem ============================================================

cd /d "%~dp0"
chcp 65001 >nul

set "INTERACTIVE=0"
set "CLI_MESSAGE=%~2"
set "RESULT=1"
set "PUSH_CHANGED=0"
set "MSG_FILE=%TEMP%\cargo575-commit-msg.txt"
set "MSG_PS1=%~dp0tools\write-commit-msg.ps1"

if "%~1"=="" (
  set "INTERACTIVE=1"
  goto menu
)

if /i "%~1"=="pages" goto pages
if /i "%~1"=="push" goto push
if /i "%~1"=="all" goto all

echo Unknown command: %~1
echo Usage: site-actions.bat [pages / push / all] ["commit message"]
echo Tip: for Russian text from PowerShell set CARGO575_COMMIT_MSG first.
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

rem ------------------------------------------------------------
rem Tool checks
rem ------------------------------------------------------------

:check_git_gh
where git >nul 2>&1 || (
  echo Error: git was not found.
  exit /b 1
)
where gh >nul 2>&1 || (
  echo Error: GitHub CLI ^(gh^) was not found.
  exit /b 1
)
exit /b 0

:check_npm
where npm >nul 2>&1 || (
  echo Error: npm was not found.
  exit /b 1
)
exit /b 0

rem ------------------------------------------------------------
rem Staging without secrets and junk
rem ------------------------------------------------------------

:safe_stage
rem Tracked edits and deletes
git add -u || exit /b 1

rem New files only from project folders
if exist "src" git add -- "src" || exit /b 1
if exist "public" git add -- "public" || exit /b 1
if exist "assets" git add -- "assets" || exit /b 1
if exist "api" git add -- "api" || exit /b 1
if exist ".github" git add -- ".github" || exit /b 1
if exist "tools" git add -- "tools" || exit /b 1

rem Root site and docs files
for %%F in (
  "index.html"
  "package.json"
  "package-lock.json"
  "vite.config.ts"
  "tsconfig.json"
  "tsconfig.app.json"
  "tsconfig.node.json"
  "README.md"
  "CHANGELOG.md"
  "TODO.md"
  "ROADMAP.md"
  "DESIGN-HERO.md"
  ".gitignore"
  "site-actions.bat"
  "build.bat"
  "preview.bat"
  "deploy.bat"
  "start.bat"
) do if exist "%%~F" git add -- "%%~F" || exit /b 1

rem Guard: secrets must not be staged
set "SECRET_HIT="
for /f "delims=" %%F in ('git diff --cached --name-only') do (
  echo %%F | findstr /i /c:".env" /c:"config.php" /c:".pfx" /c:".pem" /c:"credentials" >nul && set "SECRET_HIT=1"
)
if defined SECRET_HIT (
  echo Error: staged files look like secrets. Aborting.
  git reset
  exit /b 1
)

set "STAGED="
for /f "delims=" %%S in ('git diff --cached --name-only') do set "STAGED=1"
if not defined STAGED (
  echo Nothing relevant to commit after safe staging.
  exit /b 2
)
exit /b 0

rem ------------------------------------------------------------
rem UTF-8 commit message via PowerShell helper
rem ------------------------------------------------------------

:prepare_commit_message
if not exist "!MSG_PS1!" (
  echo Error: helper not found: tools\write-commit-msg.ps1
  exit /b 1
)

rem Pass CLI text via env to avoid empty PowerShell -CliMessage "" issues
set "CARGO575_CLI_MESSAGE=!CLI_MESSAGE!"
powershell -NoProfile -ExecutionPolicy Bypass -File "!MSG_PS1!" -MessageFile "!MSG_FILE!" -Interactive "!INTERACTIVE!"
if errorlevel 1 (
  echo Error: failed to prepare UTF-8 commit message.
  exit /b 1
)

if not exist "!MSG_FILE!" (
  echo Error: commit message file was not created.
  exit /b 1
)
exit /b 0

rem ------------------------------------------------------------
rem Push: build - sync - safe commit - push
rem ------------------------------------------------------------

:push_changes
call :check_git_gh || exit /b 1
call :check_npm || exit /b 1

echo.
echo [1/4] Checking production build...
call npm run build || exit /b 1

echo.
echo [2/4] Syncing with origin/main...
git fetch origin main || exit /b 1
git pull --ff-only origin main || (
  echo Error: cannot fast-forward to origin/main. Resolve divergence manually.
  exit /b 1
)

set "HAS_CHANGES="
for /f "delims=" %%S in ('git status --porcelain') do set "HAS_CHANGES=1"

if defined HAS_CHANGES (
  echo.
  echo [3/4] Safe staging and commit...
  call :prepare_commit_message || exit /b 1

  call :safe_stage
  set "STAGE_CODE=!ERRORLEVEL!"
  if "!STAGE_CODE!"=="1" exit /b 1
  if "!STAGE_CODE!"=="2" (
    echo Local junk/untracked files were skipped. Nothing to commit from staging.
  ) else (
    git -c i18n.commitEncoding=utf-8 commit -F "!MSG_FILE!" || exit /b 1
  )
) else (
  echo No local changes to commit.
)

for /f "delims=" %%S in ('git rev-parse HEAD') do set "LOCAL_SHA=%%S"
for /f "delims=" %%S in ('git rev-parse origin/main') do set "REMOTE_SHA=%%S"
set "PUSH_CHANGED=0"
if /i not "!LOCAL_SHA!"=="!REMOTE_SHA!" set "PUSH_CHANGED=1"

if "!PUSH_CHANGED!"=="0" (
  echo.
  echo [4/4] origin/main already up to date. Skip push.
  set "PUSH_SHA=!LOCAL_SHA!"
  exit /b 0
)

echo.
echo [4/4] Pushing main to origin...
git push origin main || exit /b 1
set "PUSH_SHA=!LOCAL_SHA!"
exit /b 0

rem ------------------------------------------------------------
rem Wait for GitHub Pages run
rem ------------------------------------------------------------

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
call :check_git_gh || exit /b 1
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
set "RESULT=!ERRORLEVEL!"
goto finish

:push
call :push_changes
set "RESULT=!ERRORLEVEL!"
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
if "!RESULT!"=="0" (
  echo Done.
  echo Site: https://divangames.github.io/cargo575_main2/
) else (
  echo Operation failed.
)
if exist "!MSG_FILE!" del /q "!MSG_FILE!" >nul 2>&1
if "!INTERACTIVE!"=="1" pause
exit /b !RESULT!
