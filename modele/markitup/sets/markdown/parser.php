<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

  <!--css personnalisé -->
  <link href="css/style.css" rel="stylesheet">
  <!--CSS de Markitup-->
  <link rel="stylesheet" type="text/css" href="markitup/skins/markitup/style.css" />
<link rel="stylesheet" type="text/css" href="markitup/sets/markdown/style.css" />
  <!--Icônes font axesome parce que Glyphicon est abandonné par Boostrap-->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<title>BAHD</title>
</head>
<body>
<?php
  require 'Markdown.php';
  Markdown($_Post['data']);
 ?>
</body>
</html>
