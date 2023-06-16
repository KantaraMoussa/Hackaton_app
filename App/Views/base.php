<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <title>{% block title %}{% endblock %} | GESTION DES RANDEZ VOUS </title>
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
    <!-- other CSS -->
    <link id="skin-default" rel="stylesheet" href="{{base_url()}}css/animate.min.css">
    <link id="skin-default" rel="stylesheet" href="{{base_url()}}css/datatable.min.css">
    <link id="skin-default" rel="stylesheet" href="{{base_url()}}css/theme.css">


    {% block link %}{% endblock %}
    <script>
        var baseUrl = '{{base_url()}}';
    </script>
</head>

<body>

    <!-- Main Wrapper -->
    <div class="main-wrapper">

        <!-- Header -->
        <div class="header">

            <!-- Logo -->
            <div class="header-left">
                <a href="index.html" class="logo">
                    <img src="{{base_url()}}assets/img/logo.png" alt="Logo">
                </a>
                <a href="index.html" class="logo logo-small">
                    <img src="{{base_url()}}assets/img/logo-small.png" alt="Logo" width="30" height="30">
                </a>
            </div>
            <!-- /Logo -->

            <div class="menu-toggle">
                <a href="javascript:void(0);" id="toggle_btn">
                    <i class="fas fa-bars"></i>
                </a>
            </div>

            <!-- Search Bar -->
            <div class="top-nav-search">
                <form>
                    <input type="text" class="form-control" placeholder="Search here">
                    <button class="btn" type="submit"><i class="fas fa-search"></i></button>
                </form>
            </div>
            <!-- /Search Bar -->

            <!-- Mobile Menu Toggle -->
            <a class="mobile_btn" id="mobile_btn">
                <i class="fas fa-bars"></i>
            </a>
            <!-- /Mobile Menu Toggle -->

            <!-- Header Right Menu -->
            <ul class="nav user-menu">

                <!-- Notifications -->
                <li class="nav-item dropdown noti-dropdown me-2">
                    <a href="#" class="dropdown-toggle nav-link header-nav-list" data-bs-toggle="dropdown">
                        <img src="{{base_url()}}assets/img/icons/header-icon-05.svg" alt="">
                    </a>
                    <div class="dropdown-menu notifications">
                        <div class="topnav-dropdown-header">
                            <span class="notification-title">Notifications</span>
                        </div>
                        <div class="noti-content">
                            <ul class="notification-list">
                                {% for notification in _SESSION['notification'] %}
                                <li class="notification-message">
                                    <a href="#">
                                        <div class="media d-flex">
                                            <span class="avatar avatar-sm flex-shrink-0">
                                                <img class="avatar-img rounded-circle" alt="User Image" src="./public/assets/img/bell.png">
                                            </span>
                                            <div class="media-body flex-grow-1">
                                                <p class="noti-details">{{notification['desc_notification']}}</p>
                                                <p class="noti-time"><span class="notification-time">{{notification['created_at'] | date('d-m-Y h:m') }}</span></p>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                {% endfor %}
                            </ul>
                        </div>
                        <div class="topnav-dropdown-footer">
                            <a href="#">Voir+</a>
                        </div>
                    </div>
                </li>
                <!-- /Notifications -->
                <li class="nav-item zoom-screen me-2">
                    <a href="#" class="nav-link header-nav-list win-maximize">
                        <img src="{{base_url()}}assets/img/icons/header-icon-04.svg" alt="">
                    </a>
                </li>

                <!-- User Menu -->
                <li class="nav-item dropdown has-arrow new-user-menus">
                    <a href="#" class="dropdown-toggle nav-link" data-bs-toggle="dropdown">
                        <span class="user-img">
                            <img class="rounded-circle" src="{{base_url()}}assets/img/profiles/avatar-01.jpg" width="31" alt="Ryan Taylor">
                            <div class="user-text">
                                <h6>{{ _SESSION['nom'] }}</h6>
                                <p class="text-muted mb-0">{{ _SESSION['role_utilisateur'] }}</p>
                            </div>
                        </span>
                    </a>
                    <div class="dropdown-menu">
                        <div class="user-header">
                            <div class="avatar avatar-sm">
                                <img src="{{base_url()}}assets/img/profiles/avatar-01.jpg" alt="User Image" class="avatar-img rounded-circle">
                            </div>
                            <div class="user-text">
                                <h6>kantara Moussa</h6>
                                <p class="text-muted mb-0">Administrateur</p>
                            </div>
                        </div>
                        <a class="dropdown-item" href="{{ "user/profile/#{_SESSION['id_user']}" | url }}"><i class="fa fa-user"></i>&nbsp; Profile utilisateur</a>
                        <a class="dropdown-item" href="{{ "user/change-password/#{_SESSION['id_user']}" | url }}"><i class="fa fa-lock"></i>&nbsp; Changez de mot de Pass</a>
                        <a class="dropdown-item" href="{{ "user/add-avatar/#{_SESSION['id_user']}" | url }}"><i class="fa fa-user-circle"></i>&nbsp; Ajouté la photo de profile</a>
                        <a class="dropdown-item" href="{{'user/logout' | url}}"> <i class="fa fa-share-square"></i>&nbsp; Déconnexion</a>
                    </div>
                </li>
                <!-- /User Menu -->

            </ul>
            <!-- /Header Right Menu -->

        </div>
        <!-- /Header -->

        <!-- Sidebar -->
        <div class="sidebar" id="sidebar">
            <div class="sidebar-inner slimscroll">
                <div id="sidebar-menu" class="sidebar-menu">
                    <ul>
                        <li class="menu-title">
                            <span>Main Menu</span>
                        </li>
                        <li class="active">
                            <a href="{{'dashboard' | url }}"><i class="feather-grid"></i><span>Dashboard</span></a>
                        </li>
                        <li class="submenu">
								<a href="#"><i class="fas fa-graduation-cap"></i> <span> Utilisateur</span> <span class="menu-arrow"></span></a>
								<ul>
									<li><a href="{{'user/list-user' | url }}">Liste des utilisateur</a></li>
									
								</ul>
							</li>
							<li class="submenu">
								<a href="#"><i class="fas fa-chalkboard-teacher"></i> <span> Rendez Vous </span> <span class="menu-arrow"></span></a>
								<ul>
									<li><a href="{{'dashboard' | url }}">Rendezvous</a></li>
								
								</ul>
							</li>
                            <li class="submenu">
								<a href="#"><i class="fas fa-chalkboard-teacher"></i> <span> Notification </span> <span class="menu-arrow"></span></a>
								<ul>
									<li><a href="{{'notification/list' | url }}">Les Notifications</a></li>
								
								</ul>
							</li>
                            <li class="submenu">
								<a href="#"><i class="fas fa-chalkboard-teacher"></i> <span> Reporting </span> <span class="menu-arrow"></span></a>
								<ul>
									<li><a href="{{'rdv/reporting' | url }}">reporting</a></li>
								
								</ul>
							</li>
                        

                    </ul>
                </div>
            </div>
        </div>
        <!-- /Sidebar -->

        <!-- Page Wrapper -->
        <div class="page-wrapper">
            {% block body %}{% endblock %}
            <!-- Footer -->
            <footer>
                <p class="text-capitalize lnr-text-align-justify">
                    Copyright © 2023 GUI-SCHOOL . <br>
                    <span>Téléphone : +224 623 90 25 28</span> <br>
                    <span>Email: info@gui-school.com</span>
                </p>
            </footer>
            <!-- /Footer -->

        </div>
        <!-- /Page Wrapper -->



    </div>
    <!-- /Main Wrapper -->
    <!-- JS templete -->
    {% block script %}{% endblock %}
    <script src="{{base_url()}}assets/js/jquery-3.6.0.min.js"></script>
    <script src="{{base_url()}}assets/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="{{base_url()}}assets/js/feather.min.js"></script>
    <script src="{{base_url()}}assets/plugins/slimscroll/jquery.slimscroll.min.js"></script>
    <script src="{{base_url()}}assets/plugins/apexchart/apexcharts.min.js"></script>
    <script src="{{base_url()}}assets/plugins/apexchart/chart-data.js"></script>
    <script src="{{base_url()}}assets/js/script.js"></script>

    <!-- JS other -->
    <script src="{{base_url()}}js/scripts/__jlive.js"></script>

    <script src="{{base_url()}}js/datatables.js"></script>
    <script src="{{base_url()}}js/libs/jquery.form.js"></script>
    <script src="{{base_url()}}js/scripts/jaupl.js"></script>
    <script src="{{base_url()}}js/libs/print.min.js"></script>


    <script type="module" src="{{base_url()}}js/scripts/script.js"></script>

</body>

</html>