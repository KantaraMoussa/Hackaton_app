<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
	<title>PLATEFORME DE GESTION DE RENDEZ VOUS - LOGIN </title>

	<!-- Favicon -->
	<link rel="shortcut icon" href="{{base_url()}}assets/img/favicon.png">

	<!-- Fontfamily -->
	<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700&display=swap" rel="stylesheet">

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="{{base_url()}}assets/plugins/bootstrap/css/bootstrap.min.css">

	<!-- Feathericon CSS -->
	<link rel="stylesheet" href="{{base_url()}}assets/plugins/feather/feather.css">

	<!-- Pe7 CSS -->
	<link rel="stylesheet" href="{{base_url()}}assets/plugins/icons/flags/flags.css">

	<!-- Fontawesome CSS -->
	<link rel="stylesheet" href="{{base_url()}}assets/plugins/fontawesome/css/fontawesome.min.css">
	<link rel="stylesheet" href="{{base_url()}}assets/plugins/fontawesome/css/all.min.css">

	<!-- Main CSS -->
	<link rel="stylesheet" href="{{base_url()}}assets/css/style.css">
</head>

<body>
	<!-- Main Wrapper -->
	<div class="main-wrapper login-body">
		<div class="login-wrapper">
			<div class="container">
				<div class="loginbox">
					<div class="login-left">
						<img class="img-fluid" src="{{base_url()}}assets/img/rdv.png" alt="Logo">
					</div>
					<div class="login-right">
						<div class="login-right-wrap">
							<!-- Form -->
							<div class="nk-block-head mb-10">
								<div class="nk-block-head-content">
									<h1 class="h1 text-uppercase">Entrerer le code </h1>
									<div class="nk-block-des">

									</div>
								</div>
							</div><!-- .nk-block-head -->
							<hr style="width:50px;background-color: #336699;">

							<form action="{{ 'user/crud' | url }}" data-id="{{user}}" id="AuthConfirmation" method="POST">
								<div class="form-group mb-30">
									<label>Entrer le code Réçu par Sms<span class="login-danger">*</span></label>
									<input class="form-control" required="required" data-required="yes" type="text" name="token" id="token">
									<span class="profile-views"><i class="fa fa-lock"></i></span>
								</div>

								<div class="form-group">
									<button id="AuthConfirmation-btn" class="btn btn-primary btn-large btn-block" type="submit" style="padding: 10px;">
										<i class="fa fa-envelope"></i>&nbsp;
										Connexion
									</button>
								</div>
							</form>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /Main Wrapper -->

	<!-- jQuery -->
	<script src="{{base_url()}}assets/js/jquery-3.6.0.min.js"></script>

	<!-- Bootstrap Core JS -->
	<script src="{{base_url()}}assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Feather Icon JS -->
	<script src="{{base_url()}}assets/js/feather.min.js"></script>

	<!-- Custom JS -->
	<script src="{{base_url()}}assets/js/script.js"></script>

	<!-- Custom JS -->
	<script src="{{base_url()}}assets/js/script.js"></script>
	<script src="{{base_url()}}js/scripts/__jlive.js"></script>
	<script src="{{base_url()}}js/datatables.js"></script>
	<script src="{{base_url()}}js/libs/jquery.form.js"></script>
	<script src="{{base_url()}}js/scripts/jaupl.js"></script>
	<script src="{{base_url()}}js/libs/print.min.js"></script>
	<script type="module" src="{{base_url()}}js/scripts/script.js"></script>

</body>

</html>