<html>
<head>
    <title>WPLibBox</title>
</head>
<body>
<?php
$hosts = file_get_contents(dirname(__DIR__) . DIRECTORY_SEPARATOR . '.hosts');
$hosts = explode("\n", $hosts);
echo '<ul>';
foreach ($hosts as $host) {
    echo "<li><a href=\"http://{$host}\">{$host}</a></li>";
}
echo '</ul>';
?>
</body>
</html>
