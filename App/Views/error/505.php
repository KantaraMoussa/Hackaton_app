<!DOCTYPE html>
<html lang="zxx" class="js">

<head>
    <base href="../../../">
    <meta charset="utf-8">
    <meta name="author" content="Softnio">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Error 505">
    <!-- Fav Icon  -->
    <link rel="shortcut icon" href="./images/favicon.png">
    <!-- Page Title  -->
    <title>Error 504 </title>
    <!-- StyleSheets  -->
    <link rel="stylesheet" href="{{base_url()}}css/uglcs.css">
    <link id="skin-default" rel="stylesheet" href="{{base_url()}}css/theme.css">
</head>

<body class="nk-body bg-white npc-default pg-error">
    <div class="nk-app-root">
        <!-- main @s -->
        <div class="nk-main ">
            <!-- wrap @s -->
            <div class="nk-wrap nk-wrap-nosidebar">
                <!-- content @s -->
                <div class="nk-content ">
                    <div class="nk-block nk-block-middle wide-md mx-auto">
                        <div class="nk-block-content nk-error-ld text-center">
                            <img class="nk-error-gfx" src="{{base_url()}}images/gfx/error-504.svg" alt="">
                            <div class="wide-xs mx-auto">
                                <h3 class="nk-error-title">Gateway Timeout Error</h3>
                                <p class="nk-error-text">We are very sorry for inconvenience. It looks like some how our server did not receive a timely response.</p>
                                <a href="{{ 'dashboard' | url }}" class="btn btn-lg btn-primary mt-2">Back To Home</a>
                            </div>
                        </div>
                    </div><!-- .nk-block -->
                </div>
                <!-- wrap @e -->
            </div>
            <!-- content @e -->
        </div>
        <!-- main @e -->
    </div>
    <!-- app-root @e -->
    <!-- JavaScript -->
    <script src="{{base_url()}}js/bundle.js"></script>
    <script src="{{base_url()}}js/scripts.js"></script>


</html>