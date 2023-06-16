<?php

namespace App\Utils;

class LogFile
{
    private $fp;
    private $filename;
    public function __construct()
    {
        $this->filename = realpath('log/') . DS . 'log.univGest';
        $this->fp = fopen($this->filename, 'a+');
    }
    public function add($t)
    {
        $text = "[" . date('d-M-Y  H:i:s e P') . ']  ' . mb_strtoupper($_SESSION['fname_users'] . ' ' . $_SESSION['lname_users']) . ' (ID:' . $_SESSION['id_users'] . ', MTRLE:' . $_SESSION['matricule_users'] . ")\n";
        $text .= $t . "\n\n";

        fwrite($this->fp, $text, strlen($text));
    }
    public function read($size)
    {
        fread($this->fp, $size);
    }
    public function readAll()
    {
        fread($this->fp, $this->getSize());
    }

    function empty() {
        ftruncate($this->fp, 0);
    }
    private function getSize()
    {
        return filesize($this->filename);
    }

    public function __destruct()
    {
        fclose($this->fp);
    }
}
