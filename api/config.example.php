<?php
/**
 * Скопируйте в config.php на PHP-хосте и укажите Telegram, SmartCaptcha и Google Sheets.
 * Файл config.php в git не попадает.
 */
return [
    'bot_token' => '',
    'chat_id'   => '',
    // Ключ сервера Яндекс SmartCaptcha (ysc2_…) — только сюда, не на фронт
    'smartcaptcha_server_key' => '',
    // URL уже развёрнутого Apps Script (оканчивается на /exec)
    'sheets_webhook' => '',
    // Значение SHEETS_SECRET из Apps Script — только на сервере
    'sheets_secret' => '',
];
