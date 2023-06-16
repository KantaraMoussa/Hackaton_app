<?php

namespace App\Controllers;


use App\Utils\Helpers;
use App\Utils\Connection;
use Core\Helpers as CoreHelpers;
use \Core\View;
use App\Services\Rdv as ServicesRdv;
use App\Services\Dashboards;
use App\Services\Utilisateur;

class Rdv extends \Core\FrontController

{
    private $rdvService;
    private $userService;
    private $dashboardService;
   

    public function __construct()
    {
        session_start();
        $this->rdvService = new ServicesRdv();
        $this->userService = new Utilisateur(); 
        $this->dashboardService = new Dashboards();       
    }

    public function indexAction()
    {
      
       View::renderTemplate('rdv/index.php', array());
    }
    public function addAction()
    {
       View::renderTemplate('rdv/add.php', array('listUser'=>$this->userService->getAll(),
       'listRdvEmit'=>$this->rdvService->rdvEmit('id_user_ask_rdv',$_SESSION['id_user'])
     ));
    }
    public function choixAction($params)
    {
      $this->rdvService->changeRdvStatus($params['type'],$params['id']);
      exit;
      header('Location: ../../dashboard');
      exit;
    }

    public function updateAction($param)
    {
        $rdv=$this->rdvService->getService('id_rdv',$param['id'],0,1);
        
        View::renderTemplate('rdv/update.php',array(
         'rdv'=>$rdv,
        ));
    }

    public function detailAction($param)
    {
        $rdv=$this->rdvService->getService('id_rdv',$param['id'],0,1);
        $userEmit=$this->userService->getUtilisateur('id_user',$rdv['id_user_ask_rdv'],0,1);
        View::renderTemplate('rdv/detail.php',array(
           'userEmit'=>$userEmit,'rdv'=>$rdv,
        ));
    }
    public function reportingAction($param)
    {
        
        
        View::renderTemplate('rdv/reporting.php',array(
           'emit'=>$this->rdvService->rdvEmit('id_user_ask_rdv',$_SESSION['id_user']),
           'recu'=>$this->rdvService->rdvRecu('id_user_recept_rdv',$_SESSION['id_user'],0,1000),
        ));
    }

    public function crudAction()
    {
        echo $this->rdvService->crud($_POST);
    }
    public function before()
    {

    }
    protected function after()
    {
    }
}
