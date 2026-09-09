<?php
/**
 * Прокси заявок в Telegram.
 * На сервере: config.php рядом с этим файлом (см. config.example.php).
 * Фронтенд шлёт JSON { "text": "<b>HTML</b>" } методом POST.
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config.php not found']);
    exit;
}

$config = require $configPath;
$token  = trim($config['bot_token'] ?? '');
$chatId = trim($config['chat_id'] ?? '');

if ($token === '' || $chatId === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Telegram not configured']);
    exit;
}

$raw  = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$text = trim($data['text'] ?? '');
if ($text === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Empty message']);
    exit;
}

$url  = 'https://api.telegram.org/bot' . $token . '/sendMessage';
$body = json_encode([
    'chat_id'                  => $chatId,
    'text'                     => $text,
    'parse_mode'               => 'HTML',
    'disable_web_page_preview' => true,
], JSON_UNESCAPED_UNICODE);

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $body,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
]);
$response = curl_exec($ch);
$code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $code < 200 || $code >= 300) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Telegram API error']);
    exit;
}

$result = json_decode($response, true);
if (empty($result['ok'])) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Telegram rejected message']);
    exit;
}

echo json_encode(['ok' => true]);
