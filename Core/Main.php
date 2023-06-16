<?php


require __DIR__ . '/config.php';
require __DIR__ . '/autoload.php';
require dirname(__DIR__) . '/config/config.php';

use Core\Error;

var_dump(class_exists('Core\Error'));
/**
 * Error and Exception handling
 */
error_reporting(E_ALL);
set_error_handler('Core\Error::errorHandler');
set_exception_handler('Core\Error::exceptionHandler');
