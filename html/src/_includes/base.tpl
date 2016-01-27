<!DOCTYPE html>
<html>
<head>
@@include('page/head.tpl', {"title": "@@title"})
</head>
<body>
    <header>
    @@include('page/nav.tpl')
    </header>
    <main id="content">
        @@include('@@main')
    </main>
    @@include('page/footer.tpl')
    @@include('page/scripts.tpl')
</body>
