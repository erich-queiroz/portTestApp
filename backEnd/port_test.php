<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $ipAddress = $_POST['ipAddress'];
    $ports = explode(',', $_POST['ports']);
    $results = [];

    foreach ($ports as $port) {
        $port = trim($port);
        $connection = @fsockopen($ipAddress, $port, $errno, $errstr, 2);

        if (is_resource($connection)) {
            $results[] = "Porta $port acessível";
            fclose($connection);
        } else {
            $results[] = "Porta $port inacessível";
        }
    }
    echo json_encode($results);
}
?>