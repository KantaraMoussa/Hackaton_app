{% extends "base.php" %}

{% block title %}GUI-SCHOOL - Dashboard{% endblock %}

{% block body %}
<div class="content container-fluid">

    <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-lg-8">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Changer votre photo de profile</h5>
                </div>
                <div class="card-body">
                    <form action="{{'user/upload' | url}}" method="POST" id="add-avatar" enctype="multipart/form-data">

                        <div class="form-group">
                            <label for="formFile" class="form-label"> Photo de profil </label>
                            <input class="form-control" type="file" id="avatar" name="avatar">
                        </div>
                        <div class="form-group text-center">
                            <button type="submit" class="btn btn-primary" id="add-avatar-btn">
                                <i class="fa fa-upload"></i>&nbsp;
                                Téléchargé la Photo
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </div>
        <div class="col-sm-2"></div>
    </div>
</div>

{% endblock %}