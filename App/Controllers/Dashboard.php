<?php

namespace App\Controllers;
use App\Services\Dashboards;
use App\Services\Utils;
use \Core\View;

/**
 * Home controller
 */
class Dashboard extends \Core\FrontController

{

    private $dashboardService;
    private $utilsService;

    public function __construct()
    {   session_start();
        $this->dashboardService = new Dashboards();
        $this->utilsService = new Utils();
    }
    /**
     * Show the index page
     *
     * @return void
     */
    public function indexAction()
    {
         $rdv=$this->dashboardService->rdvEnAttente('id_user_recept_rdv',$_SESSION['id_user'],'status_rdv','En attente');
         $emit=$this->dashboardService->countRdv1('id_user_ask_rdv',$_SESSION['id_user']);
         $recu=$this->dashboardService->countRdv1('id_user_recept_rdv',$_SESSION['id_user']);
         $confirmer=$this->dashboardService->countRdv2('id_user_ask_rdv',$_SESSION['id_user'],'status_rdv','Confirmé');
         $annuler=$this->dashboardService->countRdv2('id_user_ask_rdv',$_SESSION['id_user'],'status_rdv','annulé');
         $totalRdv=($this->dashboardService->countRdv1('id_user_recept_rdv',$_SESSION['id_user'])+$this->dashboardService->countRdv1('id_user_ask_rdv',$_SESSION['id_user']));
        $_SESSION['notification']=$this->dashboardService->forNotification('id_user_recept_notification',$_SESSION['id_user'],0,5);
         ($totalRdv==0) ? $div=1 : $div=$totalRdv;
        $pe=(($emit*100)/$div);
         $pr=(($recu*100)/$div);
         $pc=(($confirmer*100)/$div);
         $pa=(($annuler*100)/$div);
         //------------------ notification    
         View::renderTemplate('dashboard/index.php',
                            array('listRdvEnAttente'=>$rdv,
                                  'recu'=>$recu,'emit'=>$emit,'confirmer'=>$confirmer,'annuler'=>$annuler,
                                  'pe'=>$pe,'pr'=>$pr,'pc'=>$pc,'pa'=>$pa,
                                ));
    }

    public function before()
    {
       $this->utilsService->onBeforeGlobal();
    }

    protected function after()
    {

    }

}
