{% extends "base.php" %}

{% block title %}GUI-SCHOOL - Dashboard{% endblock %}

{% block body %}
<div class="content container-fluid">
{{layout.dashboard()}}
	<div class="row">
		<div class="col-sm-12">
			<div class="card card-table">
			<div class="card-header">
                    <h4 class="card-title">Liste de tous mes randez vous </h4>
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
                            {{layout.listRdvTd(recu)}}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
        <hr>
        <div class="col-sm-12">
			<div class="card card-table">
			<div class="card-header">
                    <h4 class="card-title">Liste de tous les randez vous réçus</h4>
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
                            {{layout.listRdvTd(recu)}}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{% endblock %}