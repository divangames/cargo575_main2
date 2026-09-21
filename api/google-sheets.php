<?php
/** Защищает значения от интерпретации как формул в Google Sheets. */
function crmCell($value): string {
    $text = is_scalar($value) ? trim((string) $value) : '';
    return preg_match('/^[=+\-@]/', $text) ? "'" . $text : $text;
}

/** Собирает сведения для существующей колонки E CRM. */
function crmExtra(array $lead): string {
    $fields = [
        'ID заявки' => 'requestId',
        'Тип' => 'type',
        'Источник' => 'source',
        'Груз' => 'cargo',
        'Вес, кг' => 'weight',
        'Объём' => 'volume',
        'Город отправки' => 'fromCity',
        'Город доставки' => 'toCity',
        'Приоритет' => 'priority',
        'Способ связи' => 'contactChannel',
        'Тип товара' => 'kind',
        'Ссылка на товар' => 'productLink',
        'Имена фото' => 'photoNames',
    ];
    $lines = [];
    foreach ($fields as $label => $key) {
        $value = crmCell($lead[$key] ?? '');
        if ($value !== '') {
            $lines[] = $label . ': ' . $value;
        }
    }
    return implode("\n", $lines);
}

/** Передаёт проверенную заявку в уже существующий Apps Script CRM. */
function appendLeadToSheet(array $config, $lead): bool {
    $url = trim($config['sheets_webhook'] ?? $config['sheets_webhook_url'] ?? '');
    $secret = trim($config['sheets_secret'] ?? $config['sheets_webhook_secret'] ?? '');
    if ($url === '' || $secret === '' || !is_array($lead)) {
        return false;
    }

    $requestId = $lead['requestId'] ?? '';
    if (!is_string($requestId) || !preg_match('/^[0-9a-f-]{36}$/i', $requestId)) {
        return false;
    }

    $body = json_encode([
        'secret' => $secret,
        'time' => (new DateTimeImmutable('now', new DateTimeZone('Asia/Krasnoyarsk')))->format('d.m.Y H:i:s'),
        'name' => crmCell($lead['name'] ?? ''),
        'phone' => crmCell($lead['contact'] ?? ''),
        'email' => '',
        'extra' => crmExtra($lead),
        'ymClientId' => '',
        'formName' => crmCell($lead['formTitle'] ?? ''),
        'pageUrl' => crmCell($lead['pageUrl'] ?? ''),
        'utmSource' => crmCell($lead['utmSource'] ?? ''),
        'utmMedium' => crmCell($lead['utmMedium'] ?? ''),
        'utmCampaign' => crmCell($lead['utmCampaign'] ?? ''),
        'utmContent' => crmCell($lead['utmContent'] ?? ''),
        'utmTerm' => crmCell($lead['utmTerm'] ?? ''),
    ], JSON_UNESCAPED_UNICODE);
    if ($body === false) {
        return false;
    }

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 20,
    ]);
    $response = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $code < 200 || $code >= 300) {
        return false;
    }
    $result = json_decode($response, true);
    return is_array($result) && !empty($result['ok']);
}
