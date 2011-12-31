<?php

// es/wordpress/wp-load.php
// es/wordpress/wp-content/themes/vestride/libs/ajax.php
require_once('../../../../wp-load.php');

function sendContactMessage($data, $ip) {
    $data = json_decode($data);
    //$data = urldecode($data);
    $errors = Utils::validateContactForm($data);
    if (empty($errors)) {
        $success = Utils::sendContactMessage($data);
        $return = new stdClass();
        $return->success = $success;
        return json_encode($return);
    } else {
        return json_encode($errors);
    }
}



$method = $_REQUEST['method'];
$data = $_REQUEST['data'];


$return = call_user_func($method, stripslashes($data), $_SERVER['REMOTE_ADDR']);
echo $return;

?>
