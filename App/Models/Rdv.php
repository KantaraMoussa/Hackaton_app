<?php

namespace App\Models;

use \Core\Database;
use \Core\SQLQuery as SQLQuery;

class Rdv
{
    private $rdv;
    public function __construct() 
    {   
      
        $this->rdv = new SQLQuery(Database::getInstance(), 'rdv');
    }

    public function create($data)
    {
        return $this->rdv->create($data);
    }

    public function count($field, $data)
    {
        $this->rdv->getCount('id_rdv');
        $this->rdv->where([$field, '=', $data]);
        return $this->rdv->exec();
    }
    public function count2($field, $data,$field2, $data2)
    {
        $this->rdv->getCount('id_rdv');
        $this->rdv->where([$field, '=', $data],'AND',[$field, '=', $data]);
        return $this->rdv->exec();
    }
    public function update($values, $field, $data)
    {
        $this->rdv->update($values);
        $this->rdv->where([$field, '=', $data]);
        return $this->rdv->exec();
    }


    public function get_1($field, $data, $offset, $limit)
    {
        $this->rdv->read('*');
        $this->rdv->where([$field, '=', $data]);
        $this->rdv->limit($offset, $limit);
        return $this->rdv->exec();
    }
    public function get_1_1_destinateur($field, $data, $offset, $limit)
    {
        $this->rdv->read('*');
        $this->rdv->tjoin(array('utilisateur'=>['id_user','id_user_recept_rdv']));
        $this->rdv->where([$field, '=', $data]);
        $this->rdv->limit($offset, $limit);
        return $this->rdv->exec();
    }
    public function get_1_2_destinateur($field, $data,$field2, $data2)
    {
        $this->rdv->read('*');
        $this->rdv->tjoin(array('utilisateur'=>['id_user','id_user_recept_rdv']));
        $this->rdv->where([$field, '=', $data],'AND',[$field2, '=', $data2]);
        return $this->rdv->exec();
    }
    public function get_1_1_ask_rdv($field, $data)
    {
        $this->rdv->read('*');
        $this->rdv->tjoin(array('utilisateur'=>['id_user','id_user_ask_rdv']));
        $this->rdv->where([$field, '=', $data]);
        return $this->rdv->exec();
    }
    public function get_1_2_ask_rdv($field, $data,$field2, $data2, $offset, $limit)
    {
        $this->rdv->read('*');
        $this->rdv->tjoin(array('utilisateur'=>['id_user','id_user_ask_rdv']));
        $this->rdv->where([$field, '=', $data],'AND',[$field2, '=', $data2]);
        $this->rdv->limit($offset, $limit);
        return $this->rdv->exec();
    }

    public function get_1_1($field, $data, $offset, $limit)
    {
        $this->rdv->read('*');
        $this->rdv->tjoin(array('utilisateur'=>['id_user','id_user_ask_rdv']));
        $this->rdv->where([$field, '=', $data]);
        $this->rdv->limit($offset, $limit);
        return $this->rdv->exec();
    }
  


}
