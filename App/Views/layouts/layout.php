<?php

namespace App\Views\layouts;

use App\Utils\Helpers;
use Core\Helpers as CoreHelpers;

class layout
{




    public static function dashboard()
    {

        $ret = '
        <!-- Page Header -->
        <div class="page-header">
            <div class="row align-items-center">
                <div class="col">
                    <h3 class="page-title">Bienvenue sur votre tableaux de board</h3>
                    <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="../dashboard">Accueil</a></li>
                        <li class="breadcrumb-item active">Tableau de board</li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- /Page Header -->
        
        <!-- Invoice Header -->
        <div class="page-header">
            <div class="row align-items-center">
                <div class="col"></div>
                <div class="col-auto">
                    <a href="invoices.html" class="invoices-links active">
                        <i class="feather feather-list"></i>
                    </a>
                    <a href="invoice-grid.html" class="invoices-links">
                        <i class="feather feather-grid"></i>
                    </a>
                </div>
            </div>
        </div>
        <!-- /Invoice Header -->
   
        <!-- Report Filter -->
        <div class="card report-card">
            <div class="card-body pb-0">
                <div class="row">
                    <div class="col-md-12">
                        <ul class="app-listing">
                            <li>
                                <div class="multipleSelection">
                                    <div class="selectBox">
                                        <p class="mb-0"><i class="fas fa-user-plus me-1 select-icon"></i> Select User</p>
                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                    </div>							  
                                    <div id="checkBoxes">
                                        <form action="#">
                                            <p class="checkbox-title">Customer Search</p>
                                            <div class="form-custom">
                                                <input type="text" class="form-control bg-grey" placeholder="Enter Customer Name">
                                            </div>
                                            <div class="selectBox-cont">
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="username">
                                                    <span class="checkmark"></span>  Brian Johnson
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="username">
                                                    <span class="checkmark"></span>  Russell Copeland
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="username">
                                                    <span class="checkmark"></span>  Greg Lynch
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="username">
                                                    <span class="checkmark"></span> John Blair
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="username">
                                                    <span class="checkmark"></span> Barbara Moore
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="username">
                                                    <span class="checkmark"></span> Hendry Evan
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="username">
                                                    <span class="checkmark"></span> Richard Miles
                                                </label>
                                            </div>
                                            <button type="submit" class="btn w-100 btn-primary">Apply</button>
                                            <button type="reset" class="btn w-100 btn-grey">Reset</button>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="multipleSelection">
                                    <div class="selectBox">
                                        <p class="mb-0"><i class="fas fa-calendar me-1 select-icon"></i> Select Date</p>
                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                    </div>							  
                                    <div id="checkBoxes">
                                        <form action="#">
                                            <p class="checkbox-title">Date Filter</p>
                                            <div class="selectBox-cont selectBox-cont-one h-auto">
                                                <div class="date-picker">
                                                    <div class="form-custom cal-icon">
                                                        <input class="form-control datetimepicker" type="text" placeholder="Form">
                                                    </div>
                                                </div>
                                                <div class="date-picker pe-0">
                                                    <div class="form-custom cal-icon">
                                                        <input class="form-control datetimepicker" type="text" placeholder="To">
                                                    </div>
                                                </div>
                                                <div class="date-list">
                                                    <ul>
                                                        <li><a href="#" class="btn date-btn">Today</a></li>
                                                        <li><a href="#" class="btn date-btn">Yesterday</a></li>
                                                        <li><a href="#" class="btn date-btn">Last 7 days</a></li>
                                                        <li><a href="#" class="btn date-btn">This month</a></li>
                                                        <li><a href="#" class="btn date-btn">Last month</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="multipleSelection">
                                    <div class="selectBox">
                                        <p class="mb-0"><i class="fas fa-book-open me-1 select-icon"></i> Select Status</p>
                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                    </div>					  
                                    <div id="checkBoxes">
                                        <form action="#">
                                            <p class="checkbox-title">By Status</p>
                                            <div class="selectBox-cont">
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="name" checked>
                                                    <span class="checkmark"></span> All Invoices
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="name">
                                                    <span class="checkmark"></span> Paid
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="name">
                                                    <span class="checkmark"></span> Overdue
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="name">
                                                    <span class="checkmark"></span> Draft
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="name">
                                                    <span class="checkmark"></span> Recurring
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="name">
                                                    <span class="checkmark"></span> Cancelled
                                                </label>
                                            </div>
                                            <button type="submit" class="btn w-100 btn-primary">Apply</button>
                                            <button type="reset" class="btn w-100 btn-grey">Reset</button>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="multipleSelection">
                                    <div class="selectBox">
                                        <p class="mb-0"><i class="fas fa-bookmark me-1 select-icon"></i> By Category</p>
                                        <span class="down-icon"><i class="fas fa-chevron-down"></i></span>
                                    </div>						  
                                    <div id="checkBoxes">
                                        <form action="#">
                                            <p class="checkbox-title">Category</p>
                                            <div class="form-custom">
                                                <input type="text" class="form-control bg-grey" placeholder="Enter Category Name">
                                            </div>
                                            <div class="selectBox-cont">
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="category">
                                                    <span class="checkmark"></span> Advertising
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="category">
                                                    <span class="checkmark"></span> Food
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="category">
                                                    <span class="checkmark"></span> Marketing
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="category">
                                                    <span class="checkmark"></span> Repairs
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="category">
                                                    <span class="checkmark"></span> Software
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="category">
                                                    <span class="checkmark"></span> Stationary
                                                </label>
                                                <label class="custom_check w-100">
                                                    <input type="checkbox" name="category">
                                                    <span class="checkmark"></span> Travel
                                                </label>
                                            </div>
                                            <button type="submit" class="btn w-100 btn-primary">Apply</button>
                                            <button type="reset" class="btn w-100 btn-grey">Reset</button>
                                        </form>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="report-btn">
                                    <a href="#" class="btn">
                                        <img src="assets/img/icons/invoices-icon5.png" alt="" class="me-2"> Generate report
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Report Filter -->
        ';


        return $ret;
    }

    public static function navigation()
    {
        $ret = '
        <div class="card invoices-tabs-card border-0">
            <div class="card-body card-body pt-0 pb-0">
                <div class="invoices-main-tabs">
                    <div class="row align-items-center">
                        <div class="col-lg-8 col-md-8">
                            <div class="invoices-tabs">
                                <ul>
                                    <li><a href="'.CoreHelpers::url('dashboard').'" class="active">Rendez vous en attente</a></li>
                                    <li><a href="'.CoreHelpers::url('user/list-user').'">Les utilisateurs</a></li>	
                                    <li><a href="'.CoreHelpers::url('notification/list').'">Tous mes notification</a></li>		
                                  
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4">
                            <div class="invoices-settings-btn">
                                <a href="'.CoreHelpers::url('rdv/add').'" class="btn">
                                    <i class="feather feather-plus-circle"></i> New Rdv 
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     ';

        return $ret;
    }
    public static function payInvoice($totalrecu, $totalEmis, $totalConfirmer, $totalAnnuler, $pr, $pe, $pa, $pc)
    {
        $ret = '
        <div class="row">
        <div class="col-xl-3 col-sm-6 col-12">
            <div class="card inovices-card">
                <div class="card-body">
                    <div class="inovices-widget-header">
                        <span class="inovices-widget-icon">
                            <img src="assets/img/icons/invoices-icon1.svg" alt="">
                        </span>
                        <div class="inovices-dash-count">
                            <div class="inovices-amount">' . $totalrecu . '</div>
                        </div>
                    </div>
                    <p class="inovices-all">Total rendezvous Réçus <span class="badge badge-danger">' . $pr . '%</span></p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
            <div class="card inovices-card">
                <div class="card-body">
                    <div class="inovices-widget-header">
                        <span class="inovices-widget-icon">
                            <img src="assets/img/icons/invoices-icon2.svg" alt="">
                        </span>
                        <div class="inovices-dash-count">
                            <div class="inovices-amount">' . $totalEmis . '</div>
                        </div>
                    </div>
                    <p class="inovices-all">Rendez vous total émit <span class="badge badge-danger">' . $pe . '%</span></p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
            <div class="card inovices-card">
                <div class="card-body">
                    <div class="inovices-widget-header">
                        <span class="inovices-widget-icon">
                            <img src="assets/img/icons/invoices-icon3.svg" alt="">
                        </span>
                        <div class="inovices-dash-count">
                            <div class="inovices-amount">' . $totalConfirmer . '</div>
                        </div>
                    </div>
                    <p class="inovices-all">Total randez vous confirmé <span class="badge badge-danger">' . $pc . '%</span> </p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6 col-12">
            <div class="card inovices-card">
                <div class="card-body">
                    <div class="inovices-widget-header">
                        <span class="inovices-widget-icon">
                            <img src="assets/img/icons/invoices-icon4.svg" alt="">
                        </span>
                        <div class="inovices-dash-count">
                            <div class="inovices-amount">' . $totalAnnuler . '</div>
                        </div>
                    </div>
                    <p class="inovices-all">Total annulé <span class="badge badge-danger">' . $pa . '%</span></p>
                </div>
            </div>
        </div>
     </div>
        ';

        return $ret;
    }
    public static function notificationBlock(array $models)
    {
        $ret = '';
        foreach ($models as $model) {
        $ret .= '
            <div class="card">
            <div class="card-body">
                <div class="student-box flex-fill">
                    <div class="student-img">
                        <a href="student-details.html">
                            <img class="img-fluid" alt="notification" src="./public/assets/img/bell.png">
                        </a>
                    </div>
                    <div class="student-content pb-0">												
                        <h5><span class="text-danger">'. $model['notification_type'].'</span></h5>
                        <h6>'. $model['desc_notification'].'</h6>
                    </div>
                </div>
            </div>
        </div>';
        }

        return $ret;
        
        return $ret;
    }

   
    public static function select(array $model)
    {
        $ret = '';
        for ($i = 0; $i < count($model); $i++) {
            $ret .= '<option value="' . $model[$i] . '">' . $model[$i] . '</option>';
        }
        return $ret;
    }
    public static function listUserOption(array $models)
    {
        $ret = '';
        foreach ($models as $model) {
            $ret .= '<option value="' . $model['id_user'] . '">' . $model['nom'] . ' - ' . $model['email'] . ' / ' . $model['telephone'] . '</option>';
        }
        return $ret;
    }

    public static function listRdvTd(array $models)
    {
        $ret = '';
        foreach ($models as $model) {
            isset($model['lieux_rdv']) ? $lieux = $model['lieux_rdv'] : $lieux = "Non définie";

            $ret .= '
                  <tr>
                    <td>
                        <h2 class="table-avatar">
                            <a href="' . CoreHelpers::url('rdv/detail/' . $model["id_rdv"]) . '">
                               
                               ' . $model['nom'] . '
                            </a>
                        </h2>

                    <td>' . $model['date_debut_rdv'] . ' à ' . $model['heure_debut_rdv'] . '</td>
                    <td>' . $model['date_fin_rdv'] . ' à ' . $model['heure_fin_rdv'] . '</td>
                    <td>' . $lieux . '</td>
                    <td><span class="badge bg-danger">' . $model['status_rdv'] . '</span></td>
                    
                    </tr>
            
            
            ';
        }

        return $ret;
    }
    public static function listUser(array $models)
    {
        $ret = '';
        foreach ($models as $model) {
            $ret .= '
                  <tr>
                    <td>
                        <h2 class="table-avatar">
                            <a href="' . CoreHelpers::url('user/profile/' . $model["id_user"]) . '">
                                <img class="avatar avatar-sm me-2 avatar-img rounded-circle" src="../public/assets/img/avatar.png" alt="User Image">
                               ' . $model['nom'] . '
                            </a>
                        </h2>
                    <td>' . $model['email'] . '</td>
                    <td>' . $model['telephone'] . '</td>
                    <td><span class="badge bg-danger">' . $model['role_utilisateur'] . '</span></td>
                    </tr>
            
            ';
        }

        return $ret;
    }
    public static function notification(array $models)
    {
        $ret = '';
        foreach ($models as $model) {


            $ret .= '
            <li class="notification-message">
                <a href="#">
                    <div class="media d-flex">
                        <span class="avatar avatar-sm flex-shrink-0">
                            <img class="avatar-img rounded-circle" alt="User Image" src="./public/assets/img/bell.png">
                        </span>
                        <div class="media-body flex-grow-1">
                            <p class="noti-details">' . $model['desc_notification'] . '</p>
                            <p class="noti-time"><span class="notification-time">' . date('d-m-Y h:m', $model['created_at']) . '</span></p>
                        </div>
                    </div>
                </a>
            </li>
        ';
        }

        return $ret;
    }
  
    public static function listNotification(array $models)
    {
        $ret = '';
        foreach ($models as $model) {
            $ret .= '
                  <tr>
                    <td>
                        <h2 class="table-avatar">
                            <a href="#">
                             ' . $model['type_notification'] . '
                            </a>
                        </h2>
                    <td>' . $model['desc_notification'] . '</td>
                    <td>' .date('d-m-Y h:m', $model['created_at']) . '</td>
                    
                    </tr>
            
            ';
        }

        return $ret;
    }
}
