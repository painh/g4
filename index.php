<?php
echo <<< EOF
<!DOCTYPE html>
<html> 
<head>
	<meta charset="utf-8"> 
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
    <title>text game</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<h1><span id='spanTitle'></span></h1>
	<div id='divTop'>
		<div id='divExits'></div>
		<div id='divLog'></div>
		<div id='divObjects'></div>
	</div> 
	<div id='divBottom'>
		<div id='divInven'></div> 
	</div>
	<script src='map.js'></script>
	<script src='objects.js'></script>
	<script src='main.js'></script>
</body>
</html>
EOF;
