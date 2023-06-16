<?php

namespace Core;

use PDO;

use App\Config\Config;
use App\Config\DatabaseDev as Dev;
use App\Config\DatabaseProd as Prod;

/**
 * Base model
 */
abstract class Model
{

    /**
     * Get the PDO database connection
     *
     * @return mixed
     */
    protected static function getDB()
    {
        static $db = null;

        if ($db === null) {
            $dsn = 'mysql:host=' . (Config::DEVELOPMENT_ENVIRONMENT ? Dev::DB_HOST : Prod::DB_HOST ) . ';dbname=' .(Config::DEVELOPMENT_ENVIRONMENT ? Dev::DB_NAME : Prod::DB_NAME ) . ';charset='.(Config::DEVELOPMENT_ENVIRONMENT ? Dev::DB_CHARSET : Prod::DB_CHARSET );
            $db = new PDO($dsn, Config::DEVELOPMENT_ENVIRONMENT ? Dev::DB_USER : Prod::DB_USER , Config::DEVELOPMENT_ENVIRONMENT ? Dev::DB_PASSWORD : Prod::DB_PASSWORD);

            // Throw an Exception when an error occurs
            $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }

        return $db;
    }
}
