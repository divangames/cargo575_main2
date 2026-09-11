<?php
/**
 * Заявки «Ссылка или фото товара» в Telegram.
 * POST multipart: text (HTML), photos[] (до 5 файлов, JPG/PNG/WEBP/HEIC, до 10 МБ).
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

$text = trim($_POST['text'] ?? '');
if ($text === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Empty message']);
    exit;
}

/** Отправляет JSON-запрос в Telegram Bot API */
function tgRequest(string $token, string $method, array $payload): array {
    $url = 'https://api.telegram.org/bot' . $token . '/' . $method;
    $ch  = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 30,
    ]);
    $response = curl_exec($ch);
    $code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $code < 200 || $code >= 300) {
        return ['ok' => false];
    }

    $result = json_decode($response, true);
    return is_array($result) ? $result : ['ok' => false];
}

/** Проверяет загруженное фото */
function isAllowedPhoto(array $file): bool {
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        return false;
    }
    if (($file['size'] ?? 0) > 10 * 1024 * 1024) {
        return false;
    }

    $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    $mime    = mime_content_type($file['tmp_name']);
    if ($mime && in_array($mime, $allowed, true)) {
        return true;
    }

    $ext = strtolower(pathinfo($file['name'] ?? '', PATHINFO_EXTENSION));
    return in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'], true);
}

$message = tgRequest($token, 'sendMessage', [
    'chat_id'                  => $chatId,
    'text'                     => $text,
    'parse_mode'               => 'HTML',
    'disable_web_page_preview' => true,
]);

if (empty($message['ok'])) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Telegram text error']);
    exit;
}

$uploads = $_FILES['photos'] ?? null;
if (is_array($uploads) && isset($uploads['name']) && is_array($uploads['name'])) {
    $count = min(count($uploads['name']), 5);
    for ($i = 0; $i < $count; $i++) {
        $file = [
            'name'     => $uploads['name'][$i] ?? '',
            'type'     => $uploads['type'][$i] ?? '',
            'tmp_name' => $uploads['tmp_name'][$i] ?? '',
            'error'    => $uploads['error'][$i] ?? UPLOAD_ERR_NO_FILE,
            'size'     => $uploads['size'][$i] ?? 0,
        ];
        if (!isAllowedPhoto($file)) {
            continue;
        }

        $photo = tgRequest($token, 'sendPhoto', [
            'chat_id' => $chatId,
            'photo'   => new CURLFile($file['tmp_name'], $file['type'] ?: 'application/octet-stream', $file['name']),
        ]);

        if (empty($photo['ok'])) {
            http_response_code(502);
            echo json_encode(['ok' => false, 'error' => 'Telegram photo error']);
            exit;
        }
    }
}

echo json_encode(['ok' => true]);
