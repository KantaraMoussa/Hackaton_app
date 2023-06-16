<?php

namespace Core;

use App\Config\Config;

class Helpers
{

    public static function base_url(): string
    {
        return  str_replace('\\', '/', self::host() . Config::ROOT_FOLDER);
    }

    private static function host(): string
    {
        if (isset($_SERVER['HTTPS'])) {
            $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
        } else {
            $protocol = 'http';
        }

        return $protocol . "://" . $_SERVER['HTTP_HOST'] . DS;
    }

    public static function url($url)
    {
        return str_replace('\\', '/', self::base_url() . $url);
    }

    public static function generateString(int $len): string
    {
        $g = new RandomStringGenerator();
        return $g->generate($len);
    }

    public static function postgres_to_php_array($postgresArray)
    {
        return explode(",", trim($postgresArray, "{}"));
    }
}
