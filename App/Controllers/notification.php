<?php

namespace App\Controllers;


use App\Utils\Helpers;
use \Core\View;

use App\Services\Dashboards;


class Notification extends \Core\FrontController

{
 
    private $dashboardService;

    public function __construct()
    {
        session_start();

        $this->dashboardService = new Dashboards();
       
    }

    public function indexAction()
    {
       View::renderTemplate('notification/index.php', array());
    }

    public function listAction()
    {
       View::renderTemplate('notification/list.php', array('notifications'=>$this->dashboardService->getAllNotification()));
    }

   
  
    public function before()
    {

    }
    protected function after()
    {
    }
}
