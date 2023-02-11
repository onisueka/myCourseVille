<!DOCTYPE html>

<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

 

<head>

    <meta charset="utf-8">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Books Page</title>

    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

</head>

 

<body>

    <!-- React root DOM -->

    <div id="app"></div>
 

</body>

</html>