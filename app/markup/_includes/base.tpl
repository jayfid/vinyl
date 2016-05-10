<!DOCTYPE html>
<html>
<head>
@@include('page/head.tpl', {"title": "@@title"})
<!--bower:css-->
<!--endbower-->
</head>
<body>
    <header>
    @@include('page/nav.tpl')
    </header>
    <section id="content">
        @@include('@@main')
    </section>
    @@include('page/footer.tpl')
   
    @@include('page/scripts.tpl')
     <!--bower:js-->
    <!--endbower-->
</body>
