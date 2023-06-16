<?php

namespace App\Utils;

use App\Services\Utilisateur as ServicesUtilisateur;
use App\Utils\Helpers as utilHelpers;
use Core\Helpers;

class Connection
{
    private $email;
    private $password;
    private $utilisateurService;
   
    public $usersReq;


    public function __construct($email, $password)
    {

        $this->utilisateurService = new ServicesUtilisateur();
        $this->email = $email;
        $this->password = sha1($password);
        $this->usersReq = new \App\Models\Utlisateurs();
    }
    public function is_member()
    {

        if ($this->usersReq->count2('email', $this->email, 'mot_de_pass', $this->password) == 1) {
            return true;
        } else {
            return false;
        }
    }
    public function is_connected()
    {
        if (empty($_SESSION['id_user']) || empty($_SESSION['email'])) {
            return false;
        } else {
            return true;
        }
    }
    private function getUserInfo()
    {
      return $this->utilisateurService->getUtilisateur('email',$this->email, 0, 1);
    }

    public function disconnect()
    {
        $_SESSION[] = array();
        session_destroy();
        unset($_SESSION);
        header('Location:' . Helpers::url(''));
    }

    private function createSession()
    {

        $user = $this->getUserInfo();
        $_SESSION['id_user'] = $user['id_user'];
        $_SESSION['nom'] = $user['nom'] ;
        $_SESSION['email'] = $user['email'] ;
        $_SESSION['telephone'] = $user['telephone'] ;
        $_SESSION['role_utilisateur'] = $user['role_utilisateur'] ;
    }
    public function test()
    {
        if (!$this->is_member()) {
            return false;
        } else {
            $this->createSession();
            $token=utilHelpers::randomToken();
            $this->utilisateurService->updateToken($token);
            $smsText ="votre code de confirmation "; $smsText.=$token;
            utilHelpers::sendSms('224'.trim($_SESSION['telephone']),$smsText);
            return true;
        }
    }
}
