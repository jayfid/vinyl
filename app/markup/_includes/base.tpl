<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="description" content="none">
    <meta name="keywords" content="none">
    <title>@@title</title>

    <!-- build:css styles/vendor.css -->
    <!-- bower:css -->
    <link rel="stylesheet" href="/bower_components/normalize-css/normalize.css">
    <!-- endbower -->
    <!-- endbuild -->

    <!-- build:css styles/vinyl.css -->
    <link rel="stylesheet" href="/styles/vinyl.css">
    <!-- endbuild -->

    <!-- build:js scripts/vinyl.js -->
    <script src="scripts/utility.js"></script>
    <script src="scripts/vinyl.js"></script>
    <script src="scripts/data.js"></script>
    <script src="scripts/locks.js"></script>
    <script src="scripts/draggable.js"></script>
    <script src="scripts/display.js"></script>
    <!-- endbuild -->
</head>
<body>

    <div class="frame">
        <div class="compensate-fixed-menu desktop-hide"></div>

        <div class="sliding-pane">

            <header class="tpad-20 bpad-20 color-bg-blue sticky-top" id="header-bar">
                <div class="container mobile-wall-pad set-height" data-height-ref="">
                    <nav class="nav-main collapsible-nav">
                        <div class="set-height color-bg-white desktop-hide" data-height-ref="header-bar"></div>
                        <a class="link" href="/" class="link-row-1">HOME</a>
                        <a class="link" href="/ui.html">UI</a>
                        <a class="link" href="/">TEST #1</a>
                        <a class="link" href="/">TEST #2</a>
                    </nav>
                </div>
            </header>
            <section id="content">
                @@include('@@main')
            </section>

            <footer>
                <section class="container mobile-wall-pad">
                    <div class="row">
                        <div class="grid-12">
                            <h2>Footer</h2>
                            <address></address>
                            <small class="copyright">&copy; 20XX Light Industries</small>
                        </div>
                    </div>
                </section>
            </footer>

        </div> <!-- sliding-pane -->

    </div> <!-- frame -->

    <!-- build:js scripts/vendor.js -->
    <!-- bower:js -->
    <!-- endbower -->
    <!-- endbuild -->
    
</body>
