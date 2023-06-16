<?php

namespace App\Config;


/**
 * Application Databse for production configuration
 *
 * PHP version 7.0
 */
class DatabaseProd
{

    /**
     * Database encodage
     * @var string
     */
    const DB_CHARSET = 'UTF8';

    /**
     * Database port
     * @var string
     */
    
    const DB_PORT = 'your-database-port';
    /**
     * Database host
     * @var string
     */
    const DB_HOST = 'your-database-host';

    /**
     * Database name
     * @var string
     */
    const DB_NAME = 'your-database-name';

    /**
     * Database user
     * @var string
     */
    const DB_USER = 'your-database-user';

    /**
     * Database password
     * @var string
     */
    const DB_PASSWORD = 'your-database-password';
}
