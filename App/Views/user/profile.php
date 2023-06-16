{% extends "base.php" %}

{% block title %}GUI-SCHOOL - Dashboard{% endblock %}

{% block body %}
<div class="content container-fluid">


	<div class="card">
		<div class="card-body">
			<div class="row">
				<div class="col-md-12">
					<div class="about-info">
						<h4>Profile utilisateur <span><a href="javascript:;"><i class="feather-more-vertical"></i></a></span></h4>
					</div>
					<div class="student-profile-head">
						<div class="profile-bg-img">
							<img src="{{base_url()}}assets/img/profile-bg.jpg" alt="Profile">
						</div>
						<div class="row">
							<div class="col-lg-4 col-md-4">
								<div class="profile-user-box">
									<div class="profile-user-img">
										<img src="{{base_url()}}assets/img/avatar.png" alt="Profile">
										<div class="form-group students-up-files profile-edit-icon mb-0">
											<div class="uplod d-flex">
												<label class="file-upload profile-upbtn mb-0">
													<i class="feather-edit-3"></i><input type="file">
												</label>
											</div>
										</div>
									</div>
									<div class="names-profiles">
										<h4>{{user['nom']}}</h4>
										<h5>{{user['email']}}</h5>
									</div>
								</div>
							</div>
							<div class="col-lg-4 col-md-4 d-flex align-items-center"></div>
							<div class="col-lg-4 col-md-4 d-flex align-items-center">
								<div class="follow-btn-group">
								<a href="{{ "user/edit-profil/#{user['id_user']}" | url }}" class="btn btn-info">Editer Mon Profil</a>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-4">
					<div class="student-personals-grp">
						<div class="card">
							<div class="card-body">
								<div class="heading-detail">
									<h4>Personal Details :</h4>
								</div>
								<div class="personal-activity">
									<div class="personal-icons">
										<i class="feather-user"></i>
									</div>
									<div class="views-personal">
										<h4>Nom</h4>
										<h5>{{user['nom']}}</h5>
									</div>
								</div>

								<div class="personal-activity">
									<div class="personal-icons">
										<i class="feather-phone-call"></i>
									</div>
									<div class="views-personal">
										<h4>Mobile</h4>
										<h5>{{user['telephone']}}</h5>
									</div>
								</div>
								<div class="personal-activity">
									<div class="personal-icons">
										<i class="feather-mail"></i>
									</div>
									<div class="views-personal">
										<h4>Email</h4>
										<h5>{{user['email']}}</h5>
									</div>
								</div>
								<div class="personal-activity">
									<div class="personal-icons">
										<i class="feather-user"></i>
									</div>
									<div class="views-personal">
										<h4>Role</h4>
										<h5>{{user['role_utilisateur']}}</h5>
									</div>
								</div>

							</div>
						</div>
					</div>

				</div>
				<div class="col-lg-8">
					<div class="student-personals-grp">
						<div class="row">
							<div class="col-sm-12">
								<div class="card card-table">
									<div class="card-header">
										<h4 class="card-title">Liste des rendez vous réçus en attente de validation </h4>
									</div>
									<div class="card-body">
										<div class="table-responsive">
											<table class="table table-stripped table-hover datatable">
												<thead class="thead-light">
													<tr>
														<th>Nom et Prénom</th>
														<th>date & heure début</th>
														<th>date & heure de fin</th>
														<th>Lieu</th>
														<th>Status</th>
													</tr>
												</thead>
												<tbody>
													{{layout.listRdvTd(rdv)}}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{% endblock %}