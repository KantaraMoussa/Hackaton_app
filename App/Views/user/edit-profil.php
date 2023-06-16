{% extends "base.php" %}

{% block title %}GUI-SCHOOL - Dashboard{% endblock %}

{% block body %}
<div class="content container-fluid">

	<div class="row">
		<div class="col-sm-2"></div>
		<div class="col-lg-8">
			<div class="card">
				<div class="card-header">
					<h5 class="card-title">Changer les information de votre profile</h5>
				</div>
				<div class="card-body">
					<form action="{{'user/crud' | url}}" method="POST" id="edit-profil" data-id="{{user['id_user']}}">
						<div class="row">
                        <div class="form-group fol-sm-6">
							<label>Nom : <span class="login-danger">*</span></label>
							<input type="text" value="{{user['nom']}}" data-required="yes" class="form-control" name="nom" id="nom" required >
						</div>
						<div class="form-group fol-sm-6">
							<label>Email : <span class="login-danger">*</span></label>
							<input type="text" value="{{user['email']}}" data-required="yes" class="form-control" name="email" id="email" required >
						</div>
                        </div>
						<div class="row">
                        <div class="form-group fol-sm-6">
							<label>Telephone : <span class="login-danger">*</span></label>
							<input type="text" value="{{user['telephone']}}" data-required="yes" class="form-control" name="telephone" id="telephone" required >
						</div>
                        <div class="form-group fol-sm-6">
							<label>Role : <span class="login-danger">*</span></label>
							<select class="form-control form-select" name="role" id="role">
                                <option value="{{user['role_utilisateur']}}">{{user['role_utilisateur']}}</option>
                                {{layout.select(select)}}
                            </select>
						</div>
                        </div>
						<div class="form-group text-center">
							<button type="submit" class="btn btn-primary" id="add-user-btn">
								<i class="fa fa-check"></i>&nbsp;
								Modifié
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