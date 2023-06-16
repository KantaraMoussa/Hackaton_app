<?php

namespace App\Utils;

use GuzzleHttp\Client;
use Infobip\Api\SendSmsApi;
use Infobip\Configuration;
use Infobip\Model\SmsAdvancedTextualRequest;
use Infobip\Model\SmsDestination;
use Infobip\Model\SmsTextualMessage;

class Sms
{

    const BASE_URL = "https://mp6pr9.api.infobip.com";
    const API_KEY = "b31391166c25df1ba6974e6cfbc1a819-f08994a2-8051-404d-b974-f49b039a6f0a";
    const RECIPIENT = "224622377272";
    private $sendSmsApi;

    public function __construct()
    {
        $configuration = (new Configuration)
            ->setHost(self::BASE_URL)
            ->setApiKeyPrefix('Authorization', 'App')
            ->setApiKey('Authorization', self::API_KEY);

        $client = new Client();
        $this->sendSmsApi = new SendSMSApi($client, $configuration);
    }

    public function send($destination, $message):bool
    {

        $destination = (new SmsDestination())->setTo($destination);
        $message = (new SmsTextualMessage())
            ->setFrom('SDN-HACKATON')
            ->setText($message)
            ->setDestinations([$destination]);
            $request = (new SmsAdvancedTextualRequest())->setMessages([$message]);

            try {
                $this->sendSmsApi->sendSmsMessage($request);
                return true;
            } catch (\Throwable $apiException) {
                //echo("HTTP Code: " . $apiException->getCode() . "\n");
                return false;
            }
    }

}
