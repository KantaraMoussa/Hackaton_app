<?php

namespace App\Models;

use \Core\Database;
use \Core\SQLQuery as SQLQuery;

class Notification
{
    private $notification;
    public function __construct()
    {
        $this->notification = new SQLQuery(Database::getInstance(), 'notification_rdv');
    }

    public function create($data)
    {
        return $this->notification->create($data);
    }

    public function count($field, $data)
    {
        $this->notification->getCount('id_notification');
        $this->notification->where([$field, '=', $data]);
        return $this->notification->exec();
    }
    public function count2($field, $data,$field2, $data2)
    {
        $this->notification->getCount('id_notification');
        $this->notification->where([$field, '=', $data],'AND',[$field2, '=', $data2]);
        return $this->notification->exec();
    }


 
    public function update($values, $field, $data)
    {
        $this->notification->update($values);
        $this->notification->where([$field, '=', $data]);
        return $this->notification->exec();
    }
    // $this->student->orderBy('created_at_registration','DESC');

    public function get($field, $data, $offset, $limit)
    {
        $this->notification->read('*');
        $this->notification->where([$field, '=', $data]);
        $this->notification->orderBy('created_at','DESC');
        $this->notification->limit($offset, $limit);
        return $this->notification->exec();
    }
    
    public function getAll()
    {
        $this->notification->read('*');
        return $this->notification->exec();
    }


}
