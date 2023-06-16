{% extends "base.php" %}

{% block title %}GUI-SCHOOL - Dashboard{% endblock %}

{% block body %}
<div class="content container-fluid">

	<div class="row">
		<div class="col-sm-2"></div>
		<div class="col-lg-8">
			<div class="card">
				<div class="card-header">
					<h5 class="card-title">Changer votre mot de pass</h5>
				</div>
				<div class="card-body">
					<form action="{{'user/crud' | url}}" method="POST" id="Change-password">
						<div class="form-group">
							<label>Ancien Mot de Pass : <span class="login-danger">*</span></label>
							<input type="password" data-required="yes" class="form-control" name="old-password" id="old-password" required placeholder="**********">
						</div>
						<div class="form-group">
							<label>Nouveaux Mot de Pass : <span class="login-danger">*</span></label>
							<input type="password" data-required="yes" class="form-control" name="new-password" id="new-password" required placeholder="**********">
						</div>
						<div class="form-group">
							<label>Confirmez Mot de Pass : <span class="login-danger">*</span></label>
							<input type="password" data-required="yes" class="form-control" name="confirm-new-password" id="confirm-new-password" required placeholder="**********">
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