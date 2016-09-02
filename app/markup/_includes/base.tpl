<!DOCTYPE html>
<html>
<head>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="description" content="none">
        <meta name="keywords" content="none">
        <title>@@title</title>
        <link rel="stylesheet" href="/bower_components/normalize-css/normalize.css">
        <link rel="stylesheet" href="/styles/vinyl.css">
    </head>

    <!--bower:css-->
    <!--endbower-->
</head>
<body>

    <div class="frame">

        <header class="tpad-20 bpad-20">
            <div class="container mobile-wall-pad">
                <nav class="nav-main collapsible-nav">
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

    </div>

    <script src="/scripts/test.js"></script>

    <!--bower:js-->
    <!--endbower-->
</body>
