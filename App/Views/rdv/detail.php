{% extends "base.php" %}

{% block title %}GUI-SCHOOL - Dashboard{% endblock %}

{% block body %}
<div class="content container-fluid">

	<div class="row justify-content-center">
		<div class="col-xl-10">
			<div class="card invoice-info-card">
				<div class="card-body">
					<div class="invoice-item invoice-item-one">
						<div class="row">
							<div class="col-md-6">
								<div class="invoice-logo">
									<img src="{{base_url()}}assets/img/avatar.png" alt="logo">
								</div>
								<div class="invoice-head">
									<h2>user </h2>
									<p>#ID : {{rdv['id_rdv']}}</p>
								</div>
							</div>
							<div class="col-md-6">
								<div class="invoice-info">
									<strong class="customer-text-one"> {{userEmit['nom']}}</strong>
									<h6 class="invoice-name"> {{userEmit['email']}}</h6>
									<p class="invoice-details">
										{{userEmit['telephone']}} <br>
										<span class="text-primary">{{userEmit['role_utilisateur']}}</span>

									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Invoice Item -->
					<div class="invoice-item invoice-item-two">
						<div class="row">
							<div class="col-md-6">
								<div class="invoice-info">
									<strong class="customer-text-one">Information RDV</strong>
									<h6 class="invoice-name">Début</h6>
									<p class="invoice-details invoice-details-two">
										{{rdv['date_debut_rdv'] | date('d-m-yy') }} à {{rdv['heure_debut_rdv']}}
									</p>
								</div>
							</div>
							<div class="col-md-6">
								<div class="invoice-info invoice-info2">
									<strong class="customer-text-one">.</strong>
									<h6 class="invoice-name">FIN</h6>
									<p class="invoice-details">
										{{rdv['date_fin_rdv'] | date('d-m-yy')}} à {{rdv['heure_fin_rdv']}}
									</p>

								</div>
							</div>
							<div class="row">
							
								<div class="col-sm-4">
									<ul class="list-group list-group-flush">
										<li class="list-group-item">
											<a href="../update/{{rdv['id_rdv']}}" class="btn btn-primary">
												<i class="fa fa-calendar"></i>&nbsp;
												Modifié le randez vous</a>
										</li>
										<li class="list-group-item">
											<a href="../Confirmé/{{rdv['id_rdv']}}" class="btn btn-primary">
												<i class="fa fa-check"></i>&nbsp;
												Accepter le randez vous</a>
										</li>
										<li class="list-group-item">
											<a href="../annulé/{{rdv['id_rdv']}}" class="btn btn-danger">
												<i class="fa fa-trash"></i> Annuler le randez vous
											</a>
										</li>

									</ul>
								</div>
								
								<div class="col-sm-8">
									<p>Lieux : {{rdv['lieux_rdv'] }} </p>
									<p>
										{{rdv['note_rdv'] }}
									</p>
								</div>
							</div>
						</div>
					</div>
					<!-- /Invoice Item -->

					<!-- Invoice Item -->

					<!-- /Invoice Item -->

					<!-- Invoice Item -->

					<!-- /Invoice Item -->


					<div class="invoice-sign text-end">
						<img class="img-fluid d-inline-block" src="" alt="sign">
						<span class="d-block"></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{% endblock %}