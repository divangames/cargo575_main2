<?php
/**
 * Проверка токена Яндекс SmartCaptcha.
 * https://smartcaptcha.cloud.yandex.ru/validate
 */

/**
 * Возвращает true, если токен капчи валиден.
 */
function verifySmartCaptcha(string $serverKey, string $token, string $ip = ''): bool
{
    $serverKey = trim($serverKey);
    $token = trim($token);
    if ($serverKey === '' || $token === '') {
        return false;
    }

    $payload = http_build_query([
        'secret' => $serverKey,
        'token'  => $token,
        'ip'     => $ip,
    ]);

    $ch = curl_init('https://smartcaptcha.cloud.yandex.ru/validate');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/x-www-form-urlencoded'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $code < 200 || $code >= 300) {
        return false;
    }

    $data = json_decode($response, true);
    return is_array($data) && (($data['status'] ?? '') === 'ok');
}

/**
 * IP клиента с учётом типичных прокси.
 */
function smartCaptchaClientIp(): string
{
    $candidates = [
        $_SERVER['HTTP_CF_CONNECTING_IP'] ?? '',
        $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '',
        $_SERVER['REMOTE_ADDR'] ?? '',
    ];
    foreach ($candidates as $raw) {
        $raw = trim((string) $raw);
        if ($raw === '') {
            continue;
        }
        // X-Forwarded-For может быть списком
        $parts = explode(',', $raw);
        $ip = trim($parts[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            return $ip;
        }
    }
    return '';
}

/**
 * Читает токен из JSON-тела или multipart/form-data.
 */
function readSmartCaptchaToken(?array $jsonBody = null): string
{
    if (is_array($jsonBody) && isset($jsonBody['smartToken'])) {
        return trim((string) $jsonBody['smartToken']);
    }
    if (isset($_POST['smartToken'])) {
        return trim((string) $_POST['smartToken']);
    }
    return '';
}

/**
 * Останавливает запрос с 403, если капча не пройдена.
 */
function requireSmartCaptcha(array $config, ?array $jsonBody = null): void
{
    $serverKey = trim((string) ($config['smartcaptcha_server_key'] ?? ''));
    // Если ключ ещё не задан на сервере — не блокируем прод до настройки
    if ($serverKey === '') {
        return;
    }

    $token = readSmartCaptchaToken($jsonBody);
    if ($token === '' || !verifySmartCaptcha($serverKey, $token, smartCaptchaClientIp())) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Captcha failed']);
        exit;
    }
}
