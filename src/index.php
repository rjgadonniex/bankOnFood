<?php
$host = 'db';
$user = 'user';
$pass = 'password';
$db   = 'bank_on_food';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected to MySQL database '$db'.";
?>