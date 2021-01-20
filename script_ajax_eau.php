<?php
require_once($_SERVER["DOCUMENT_ROOT"] . "/config.php");
require_once(SERVEUR_PATH. '/model/modelGeneral.php');

function projetEau($getParams){
    require_once(SERVEUR_PATH . "/class/connexion.php"); 
    $connexion = new Connexion(NOM_BDD, LOGIN, PASS,SVG);
    switch($getParams['function']){
        case 'autocomplete':
            $sql = "SELECT * from eau WHERE designation_commerciale LIKE '%" . nettoyer_data($getParams['term']) . "%' OR commune LIKE '%" . nettoyer_data($getParams['term']) . "%' OR code_dep LIKE '%" . nettoyer_data($getParams['term']) . "%'";
            $result = $connexion->select($sql);
            $eau = array();
            foreach ($result as $e){
                $d = array();
                $d['desc'] = $e->id;
                // $d['value'] = $dep->name_department;
                $d['label'] = $e->designation_commerciale . " (" . $e->code_dep . ") ". $e->IRSN;
                $eau[] = $d;
            }
            echo json_encode($eau);
        break;
        case 'select-eau':
            $sql = "SELECT * from eau WHERE id =" . $getParams['eau'];
            $result = $connexion->select($sql);
            $d = array();
            foreach ($result as $e){
                $d['id'] = $e->id;
                $d['des_com'] = $e->designation_commerciale;
                $d['AG'] = $e->AG_bq;
                $d['BG'] = $e->BG_bq;
                $d['BGR'] = $e->BGR_bq;
                $d['UP'] = $e->UP_ug;
            }
            echo json_encode($d);
        break;
    }
}

?>