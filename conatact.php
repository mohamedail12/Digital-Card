<?php 
$conn=mysqli_connect('localhost','root','','Digital_Card');
if ($conn->connect_error) {
    die("فشل الاتصال: " . $conn->connect_error);
}


?>