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
    <!-- endbower -->
    <!-- endbuild -->

    <!-- build:css styles/vinylsiding.css -->
    <link rel="stylesheet" href="/styles/vinylsiding.css">
    <!-- endbuild -->

    <!-- build:js scripts/vinylsiding.js -->
    <script src="scripts/vinylsiding.js"></script>
    <script src="scripts/utility.js"></script>
    <script src="scripts/data.js"></script>
    <script src="scripts/locks.js"></script>
    <script src="scripts/draggable.js"></script>
    <script src="scripts/display.js"></script>
    <script src="scripts/modal.js"></script>
    <script src="scripts/invoke.js"></script>
    <!-- endbuild -->
</head>

<body>
    <div class="frame">
        <header class="tpad-20 bpad-20 border-bottom bpush-40" id="header-bar">
            <div class="container mobile-wall-pad">
                <nav class="nav-main">
                    <a class="color-text-blue rpad-20" href="/">Home</a>
                    <a class="color-text-blue rpad-20" href="/ui.html">UI</a>
                    <a class="color-text-blue rpad-20" href="/modal.html">Modal</a>
                    <a class="color-text-blue"         href="/images.html">Images</a>
                </nav>
            </div>
        </header>
        <section id="content" class="bpush-100">
            @@include('@@main')
        </section>

        <footer class="text-center border-top tpad-30">
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
    </div><!-- frame -->
</body>
