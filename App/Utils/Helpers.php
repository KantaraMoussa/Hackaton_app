<?php

namespace App\Utils;

use App\Services\Utilisateur;

use Exception;

class Helpers
{

    public static function roleUser() :array
    {
        return array('administrateur','employé','client');
    }

    /*
     *
    */
    public static function  rdvStatus():array {
        return array('en attente','Confirmé','annulé');
    }
    
    public static function notificationType(): array{
      
        return array('Confirmation de rendez vous','Rappel de rendez vous','Annulation de rendez vous');
    }

    public static function sendSms($dest, $msg)
    {
        $loop = \React\EventLoop\Loop::get();
        new \React\Promise\Promise(function ($resolve) use ($loop, $dest, $msg) {
            $loop->futureTick(function () use ($resolve, $dest, $msg) {
                $sms = new Sms();
                $resolve($sms->send($dest, $msg));
            });
        });
        $loop->run();
    }

    public static function randomToken()
    {
      return  mt_rand(1000, 9999);
    }




}
