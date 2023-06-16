<?php

namespace App\Controllers;

use \Core\View;

/**
 * Home controller
 */
class Error extends \Core\FrontController
{

    /**
     * Show the index page 
     *
     * @return void
     */
    public function _505Action()
    {
        View::renderTemplate('error/505.php');
    }

    public function _404Action()
    {
        View::renderTemplate('error/404.php');
    }

    public function before()
    {

    }

    protected function after()
    {

    }

}
