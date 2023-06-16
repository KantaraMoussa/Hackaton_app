<?php

namespace App\Controllers;

use App\Services\Utils;
use App\Utils\Helpers;
use \Core\View;

/**
 * Home controller
 */
class Auth extends \Core\FrontController

{
    private $utilsService;

    public function __construct()
    {
        $this->utilsService = new  Utils();
  
    }

    /**
     * Show the index page
     *
     * @return void
     */
    public function indexAction()
    {
          View::renderTemplate('external/login.php');    
    } 
    public function addAction()
    {
      
      View::renderTemplate('user/create-account.php',array('role'=>Helpers::roleUser()));    
    } 
    public function resetAction()
    {
          View::renderTemplate('user/reseat-password.php');    
    } 
    public function Auth2Action($param)
    {
          View::renderTemplate('user/auth2.php',array('user'=>$param['id']));    
    } 
    public function changeAction($param)
    {
          View::renderTemplate('user/change-password.php');    
    } 
    public function before()
    {

    }

    protected function after()
    {

    }

}
