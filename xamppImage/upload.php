<?php
header('Access-Control-Allow-Origin: *');
$target_dir = "uploads/";
$target_file = $target_dir . basename( $_FILES['file']['name']);

if (move_uploaded_file($_FILES['file']['tmp_name'], $target_file)) {
    echo "Upload and move success";
} else {
echo $target_file;
    echo "There was an error uploading the file, please try again!";
}
?>