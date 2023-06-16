<?php

namespace Core;

use App\Config\Config;
use App\Config\DatabaseDev;
use App\Config\DatabaseProd;
use PDO;
use PDOException;

/**
 * Application Databse configuration
 *
 * PHP version 7.0
 */
class Database
{

    private static $_instance;

    public function __construct()
    {
    }

    /**
     * Database encodage
     * @var string
     */
    private static function getCharset()
    {
        return Config::DEVELOPMENT_ENVIRONMENT ? DatabaseDev::DB_CHARSET : DatabaseProd::DB_CHARSET;
    }

    /**
     * Database port
     * @var string
     */
    private static function getPort()
    {
        return Config::DEVELOPMENT_ENVIRONMENT ? DatabaseDev::DB_PORT : DatabaseProd::DB_PORT;
    }

    /**
     * Database host
     * @var string
     */

    private static function getHost()
    {
        return Config::DEVELOPMENT_ENVIRONMENT ? DatabaseDev::DB_HOST : DatabaseProd::DB_HOST;
    }

    /**
     * Database name
     * @var string
     */
    private static function getName()
    {
        return Config::DEVELOPMENT_ENVIRONMENT ? DatabaseDev::DB_NAME : DatabaseProd::DB_NAME;
    }

    /**
     * Database user
     * @var string
     */
    private static function getUser()
    {
        return Config::DEVELOPMENT_ENVIRONMENT ? DatabaseDev::DB_USER : DatabaseProd::DB_USER;
    }

    /**
     * Database password
     * @var string
     */
    private static function getPassword()
    {
        return Config::DEVELOPMENT_ENVIRONMENT ? DatabaseDev::DB_PASSWORD : DatabaseProd::DB_PASSWORD;
    }

    private static function getInstanceConfig(): array
    {

        $dns = ':host=' . self::getHost() . ';port=' . self::getPort() . ';dbname=' . self::getName();
        if (Config::DATABASE_SYSTEM == 'postgresql') {
            $dns .= ";options='--client_encoding=" . self::getCharset() . "'";
        }

        if (Config::DATABASE_SYSTEM == 'mysql') {
            return array('dns' => 'mysql' . $dns, 'options' => array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES ' . self::getCharset()));
        } else if (Config::DATABASE_SYSTEM == 'postgresql') {
            return array('dns' => 'pgsql' . $dns.';options=\'--client_encoding=UTF8\'', 'options' => null);
        }

        return array('dns' => null, 'options' => null);

    }

    public static function getInstance()
    {

        if (!isset(self::$_instance)) {

            $ic = self::getInstanceConfig();

            if (!$ic['dns']) {
                trigger_error("getInstanceConfig() returned null DNS string");
                return;
            }

            try {
                self::$_instance = new PDO($ic['dns'], self::getUser(), self::getPassword(), $ic['options']);
            } catch (PDOException $e) {
                echo $e;
            }
        }

        return self::$_instance;
    }
}
