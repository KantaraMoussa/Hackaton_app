{% extends "base.php" %}

{% block title %}GUI-SCHOOL - Dashboard{% endblock %}

{% block body %}
<div class="content container-fluid">

    <!-- Page Header -->
    <div class="page-header invoices-page-header">
        <div class="row align-items-center">
            <div class="col">
                <ul class="breadcrumb invoices-breadcrumb">
                    <li class="breadcrumb-item invoices-breadcrumb-item">
                        <a href="#">
                            <i class="fe fe-chevron-left"></i> Prendre un rendez vous
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    </div>
    <!-- /Page Header -->

    <div class="row">
        <div class="col-md-12">
            <div class="card invoices-add-card">
                <div class="card-body">
                    <form method="POST" action="{{'rdv/crud' | url}}" id="update-rdv" data-rid="{{rdv['id_rdv']}}" >
                        <div class="row">
                            <div class="col-12">
                                <h5 class="form-title"><span>Prendre un randez vous </span></h5>
                            </div>
                            
                            <div class="col-12 col-sm-12">
                                <div class="form-group local-forms">
                                    <label>Lieux du randez vous </label>
                                    <input type="text" value="{{rdv['lieux_rdv']}}" class="form-control" placeholder="choisir un lieux de rdv" name="lieu" id="lieu">
                                </div>
                            </div>
                            <div class="col-12 col-sm-3">
                                <div class="form-group local-forms">
                                    <label>Date début <span class="login-danger">*</span></label>
                                    <input class="form-control" value="{{rdv['date_debut_rdv']}}" name="dateDebut" id="dateDebut" required data-required="yes" type="date" placeholder="DD-MM-YYYY">
                                </div>
                            </div>
                            <div class="col-12 col-sm-3">
                                <div class="form-group  local-forms ">
                                    <label>Heure debut <span class="login-danger">*</span></label>
                                    <input value="{{rdv['heure_debut_rdv']}}" class="form-control"  required data-required="yes" id="heureDebut" name="heureDebut" type="time" placeholder="08H00">
                                </div>
                            </div>
                            <div class="col-12 col-sm-3">
                                <div class="form-group local-forms">
                                    <label>Date Fin <span class="login-danger">*</span></label>
                                    <input class="form-control" value="{{rdv['date_fin_rdv']}}"  required data-required="yes" name="dateFin" id="dateFin" type="date" placeholder="DD-MM-YYYY">
                                </div>
                            </div>
                            <div class="col-12 col-sm-3">
                                <div class="form-group  local-forms">
                                    <label>Heure Fin <span class="login-danger">*</span></label>
                                    <input class="form-control" type="time" value="{{rdv['heure_fin_rdv']}}"  required data-required="yes" name="heureFin" id="heureFin" placeholder="08H30">
                                </div>
                            </div>
                            <div class="col-12 col-sm-12">
                                <div class="form-group">
                                    <label>Laisser une note <span class="login-danger">*</span></label>
                                    <textarea class="form-control" name="desc" id="desc" rows="3">
                                    {{rdv['note_rdv']}}
                                    </textarea>
                                </div>

                            </div>

                            <div class="col-12">
                                <div class="student-submit">
                                    <button type="submit" class="btn btn-primary" id="update-rdv-btn">
                                      <i class="fa fa-check" aria-hidden="true"></i>&nbsp;
                                        Modifié le randez vous 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <hr>
          
        </div>
    </div>
</div>

{% endblock %}