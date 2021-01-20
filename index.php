<?php 

    $getParams = isset($_GET) ? $_GET : null;
    $postParams = isset($_POST) ? $_POST : null;
    $params = [
        "get"  => $getParams,
        "post" => $postParams
    ];


    if (isset($_GET['ajax'])){
        require_once('./script_ajax_eau.php');
        projetEau($getParams);
            
    }else{
        require_once('./graphView.php');
    }