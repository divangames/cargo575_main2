# Подготовка UTF-8 файла с сообщением коммита для site-actions.bat
# Приоритет: CARGO575_COMMIT_MSG → CARGO575_CLI_MESSAGE → интерактив → значение по умолчанию

param(
  [Parameter(Mandatory = $true)]
  [string]$MessageFile,

  [ValidateSet("0", "1")]
  [string]$Interactive = "0"
)

$ErrorActionPreference = "Stop"

$msg = $env:CARGO575_COMMIT_MSG

if ([string]::IsNullOrWhiteSpace($msg) -and -not [string]::IsNullOrWhiteSpace($env:CARGO575_CLI_MESSAGE)) {
  $msg = $env:CARGO575_CLI_MESSAGE
}

if ([string]::IsNullOrWhiteSpace($msg) -and $Interactive -eq "1") {
  $inputMsg = Read-Host "Commit message [Обновить сайт]"
  if ([string]::IsNullOrWhiteSpace($inputMsg)) {
    $msg = "Обновить сайт"
  } else {
    $msg = $inputMsg
  }
}

if ([string]::IsNullOrWhiteSpace($msg)) {
  $msg = "Обновить сайт"
}

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($MessageFile, $msg.Trim() + [Environment]::NewLine, $utf8NoBom)
Write-Host "Commit message: $($msg.Trim())"
