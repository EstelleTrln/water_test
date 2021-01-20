<?php

function projetEau($getParams){
    $watersJson = file_get_contents("assets/eau.json");
    $waters = json_decode($watersJson);

    switch($getParams['function']){
        case 'autocomplete':
            $eau = array();
            foreach($waters as $water){
                if( 
                    strcmp(strtolower($water['designation_commerciale']), strtolower($getParams['term'])) !== 0
                    OR strcmp(strtolower($water['commune']), strtolower($getParams['term'])) !== 0 
                    OR strcmp(strtolower($water['code_dep']), strtolower($getParams['term'])) !== 0 
                ){
                    $d = array();
                    $d['desc'] = $water['id'];
                    // $d['value'] = $water['name_departement'];
                    $d['label'] = $water['designation_commerciale'] . " (" . $water['code_dep'] . ") ". $water['IRSN'];
                    array_push($eau, $d);
                }
            };
            echo json_encode($eau);
            // echo json_encode($waters);
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