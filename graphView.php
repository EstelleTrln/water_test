<script type="text/javascript" src="<?php echo LOCAL_URL;?>/assets/js/eau.js"></script>
<div id="home-eau">
    <div class="container mb-4">
        <div class="row m-0" id="eau-top">
            <div class="col-md-12">
                <div class="card p-2">
                    <div class="row">
                        <div class="col-md-6 col-sm-12 m-auto">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" id="autocomplete" placeholder="Mon eau est ...">
                                <input type="hidden" id="code_eau" name="dp" value="0">
                                <div class="input-group-prepend">
                                    <button class="btn" id="valider" value="valid">Rechercher</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="card mt-4">
                    <div class="card-header"> 
                        <ul class="list-group" id="list-eau">
                        </ul>
                    </div> 
                    <div class="card-body">
                        <!-- tab menu -->
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#alpha" role="tab" aria-controls="home" aria-selected="true">Alpha</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Bêta</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Uranium</a>
                            </li>
                        </ul>
                        <!-- graph -->
                        <div class="tab-content" id="eau-center">
                            <div class="tab-pane fade show active" id="alpha" role="tabpanel">
                                <div class="row justify-content-center align-items-center">
                                    <p id="aide" class="position-absolute" style="color:#acb5b6">
                                    <i>Sélectionnez l’eau à consulter puis ‘Rechercher’ pour en connaitre les caractéristiques radiologiques. <br>Vous pouvez ajouter plusieurs eaux pour comparer les résultats. </i>
                                    </p>
                                    <canvas id="myChartAlpha" width="300" height="300"></canvas>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel">
                                <div class="row">
                                    <canvas id="myChartBeta" width="300" height="300"></canvas>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="contact" role="tabpanel">
                                <div class="row">
                                    <canvas id="myChartUranium" width="300" height="300"></canvas>
                                </div>
                            </div>
                        </div> 
                    </div> <!-- fin card body -->
                    <div class='card-footer d-none'>
                        <p> Consulter la source des données <a target="_blank" href="<?php echo LOCAL_URL;?>/assets/img/bilan-qualite-radiologique-eaux-conditionnees-2012.pdf"><i>ici</i></a></p>
                    </div>
                </div><!-- fin card -->
            </div>
        </div>
    </div>
</div>

<!-- https://www.chartjs.org/samples/latest/charts/bar/vertical.html -->