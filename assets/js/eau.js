var url = 'http://localhost/water_test';


$(document).ready( function () {
	// Je fais l'auto complete pour chercher une eau 
    $( "#autocomplete" ).autocomplete({
        source:function (request, response){
            $.ajax({
                url: url + "/index.php",
                method: 'GET',
                dataType: "json",
                data:
                {
                    ajax: 'projet-eau',
                    function : 'autocomplete',
                    term: request.term,
				},
                success: function (data)
                {
					console.log(data);
					response(data);
				}, 
				error: function (e){
					console.log(e)
				}
            });
        },
        minLength: 2,
        // focus: function( event, ui ) {},
        select : function(event, ui){ // lors de la sélection d'une proposition
            var code = ui.item.desc;
            $('#code_eau').val(code)
		}
		
    });

    choixEau();

})//fin dom

// Je clique sur le bouton valider pour avoir ma première eau 
function choixEau(alpha, beta, uranium){
    $( "#valider" ).off('click').on ('click', function(){
		var id_eau = $('#code_eau').val();
		var nom_eau = $('#autocomplete').val();
		if(id_eau != 0){
			$('#aide').remove();
			$('.card-footer').removeClass('d-none');
			if($("#valider").attr('value') == 'compare'){
				console.log('coucou');
				var nb = $("#valider").attr('nb');
				nb++;
				$("#valider").attr('nb', nb);
				itemListWater(nom_eau);
				selectEau(id_eau, alpha, beta, uranium);
			}else{
				$("#valider").empty().append('Comparer');
				$("#valider").attr('value', 'compare');
				$("#valider").attr('nb', 1);
				itemListWater(nom_eau);
				selectEau(id_eau);
			}
		}else{
			$('#autocomplete').focus();
		}
        
    });
}

//Je rajoute les infos de cette eau sur ma liste checkbox
function itemListWater(name){
    var content = '';
    content+='<li class="list-water list-group-item">';
    content+='<label>'+name;
	content+='<input type="checkbox" checked name="list-eau">';
	content+='<span class="checkmark"></span>';
	content+='</label>';
	content+='</li>';
	$('#autocomplete').val('');
	$("#code_eau").val(0);
    $('#list-eau').append(content);
}

//je vais chercher les informations sur mon eau 
function selectEau(id_eau, alpha, beta, uranium){
	$.ajax({
		url: url+'/index.php',
		type: 'GET',
		dataType: 'JSON',
		data :{
			ajax : 'projet-eau',
			function : 'select-eau',
			eau : id_eau
		},
		success: function (results){
			if($("#valider").attr('nb') == 1){
				ChartAlpha(results);
				ChartBeta(results);
				ChartUranium(results);
				choixEau(ChartAlpha(results), ChartBeta(results), ChartUranium(results));
			}else{
				addAlpha(alpha, results.AG, results.des_com);
				addBeta(beta, results.BG, results.BGR, results.des_com);
				addUranium(uranium, results.UP, results.des_com);
			}
			
		}, //success
		error: function (results) {
			console.log(results);
		}
	}); //fin ajax
}

//CHART ALPHA 

	//création du graph
function ChartAlpha(array){
	if(array.AG >= 0.1){
		var color = '#ff0000';
	}else{
		var color = '#006699';
	}
	var barChartData = {
		labels: [array.des_com],
		datasets: [{
			label: 'Bq/l',
			backgroundColor: [color],
			borderColor: [color],
			borderWidth: 1,
			data: [array.AG]
		}]

	};

	var ctx = $('#myChartAlpha');
	// window.myBar = 
	var myBar = new Chart(ctx, {
		type: 'bar',
		data: barChartData,
		options: {
			maintainAspectRatio: false,
			// events: [],
			// responsive: true,
			legend: {
				// position: 'top',
				display: false
			},
			title: {
				display: true,
				text: ['Activités alpha globales', '(valeur guide 0.1 Bq/l)']
			},
			scales: {
				yAxes: [{
					gridLines: {
						drawBorder: false,
						color: ['#f0f0f0', '#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0', '#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','red']
					},
					ticks: {
						max: 1.4,
						min: 0,
						// maxTicksLimit: 1,
						stepSize: 0.1
					}
				}]
			} 
		}
	});
	var alpha = {
		bar : myBar, 
		barData : barChartData
	}
	
	return alpha;
}

//CHART BETA 
	//creation
function ChartBeta(array){
	var barChartData = {
		labels: [array.des_com],
		datasets: [{
			label: 'Beta globales',
			backgroundColor: '#66ff66',
			borderColor:  '#66ff66',
			borderWidth: 1,
			data: [array.BG]
		},{
			label: 'Beta globales résiduelles',
			backgroundColor: '#ff00ff',
			borderColor:  '#ff00ff',
			borderWidth: 1,
			data: [array.BGR]
		}]

	};

	var ctx = $('#myChartBeta');
	// window.myBar = 
	var myBar = new Chart(ctx, {
		type: 'bar',
		data: barChartData,
		options: {
			maintainAspectRatio: false,
			// events: [],
			// responsive: true,
			legend: {
				// position: 'top',
				display: false
			},
			title: {
				display: true,
				text: ['Activités bêta globales et bêta globales résiduelles', '(valeur guide résiduelle 1 Bq/l)'] 
			},
			scales: {
				yAxes: [{
					gridLines: {
						drawBorder: false,
						color: ['#f0f0f0', '#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0', '#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','#f0f0f0','red']
					},
					ticks: {
						max: 6.5,
						min: 0,
						// maxTicksLimit: 1,
						stepSize: 0.5
					}
				}]
			} 
		}
	});
	var beta = {
		bar : myBar, 
		barData : barChartData
	}
	return beta;
}

//CHART URANIUM
	//creation
function ChartUranium(array){
	var barChartData = {
		labels: [array.des_com],
		datasets: [{
			label: 'µg/l',
			backgroundColor: '#000066',
			borderColor: '#000066',
			borderWidth: 1,
			data: [array.UP]
		}]

	};

	var ctx = $('#myChartUranium');
	// window.myBar = 
	var myBar = new Chart(ctx, {
		type: 'bar',
		data: barChartData,
		options: {
			maintainAspectRatio: false,
			// events: [],
			// responsive: true,
			legend: {
				// position: 'top',
				display: false
			},
			title: {
				display: true,
				text: ['Concentration en uranium pondéral','(valeur guide 30 µg/l)']
			},
			scales: {
				yAxes: [{
					gridLines: {
						drawBorder: false,
						color: '#f0f0f0'
					},
					ticks: {
						max: 20,
						min: 0,
						// maxTicksLimit: 1,
						stepSize: 2
					}
				}]
			} 
		}
	});
	var uranium = {
		bar : myBar, 
		barData : barChartData
	}
	
	return uranium;
}



// function ajaxEau(myBar, barChartData){
// 	$( "#valider" ).off('click').on ('click', function(){
// 		var id_eau = $('#code_eau').val();
// 		if(id_eau != 0){
// 			$.ajax({
// 				url: url+'/index.php',
// 				type: 'GET',
// 				dataType: 'JSON',
// 				data :{
// 					ajax : 'projet-eau',
// 					function : 'select-eau',
// 					eau : id_eau
// 				},
// 				success: function (results) {
// 					itemListWater(results.des_com);
// 					addEau(myBar, barChartData, results.AG, results.des_com);
// 				}, 
// 				error: function (results) {
// 					console.log(results);
// 				}
// 			}); //fin ajx
// 		}else{
// 			$( "#autocomplete" ).focus();
// 		}
// 	});
// }

// function addDatasets(myBar, barChartData, array){
// 		if(results.AG >= 0.1){
// 			var color = '#8e1640';
// 		}else{
// 			var color = '#0c7277';
// 		}
// 		var newDataset = {
// 			label: results.des_com,
// 			backgroundColor: color,
// 			borderColor: color,
// 			borderWidth: 1,
// 			data: []
// 		};

// 		for (var index = 0; index < barChartData.labels.length; ++index) {
// 			newDataset.data.push(results.AG);
// 		}
// 		barChartData.datasets.push(newDataset);
// 		myBar.update();
				
// }

function addAlpha(alpha, data, nom){
		if (alpha.barData.datasets.length > 0) {
			// var month = MONTHS[barChartData.labels.length % MONTHS.length];
			alpha.barData.labels.push(nom);

			for (var index = 0; index < alpha.barData.datasets.length; ++index) {
				if(data >= 0.1){
					var color = '#ff0000';
				}else{
					var color = '#006699';
				}
				// myBar.addData(alpha, index);
				alpha.barData.datasets[index].backgroundColor.push(color);
				alpha.barData.datasets[index].borderColor.push(color);
				alpha.barData.datasets[index].data.push(data);
			}

			alpha.bar.update();
		}
	// });
}

function addBeta(beta, data_BG, data_BGR, nom){
		if (beta.barData.datasets.length > 0) {
			// var month = MONTHS[barChartData.labels.length % MONTHS.length];
			beta.barData.labels.push(nom);

			beta.barData.datasets[0].data.push(data_BG);
			beta.barData.datasets[1].data.push(data_BGR);
			// for (var index = 0; index < beta.barData.datasets.length; ++index) {
		
			// 	// myBar.addData(alpha, index);
			// 	beta.barData.datasets[index].data.push(data_BG, data_BGR);
			// }

			beta.bar.update();
		}
	// });
}

function addUranium(uranium, data, nom){
	if (uranium.barData.datasets.length > 0) {
		// var month = MONTHS[barChartData.labels.length % MONTHS.length];
		uranium.barData.labels.push(nom);

		for (var index = 0; index < uranium.barData.datasets.length; ++index) {
	
			// myBar.addData(alpha, index);
			uranium.barData.datasets[index].data.push(data);
		}

		uranium.bar.update();
	}
// });
}

function supprimerEau(){
	$('input[type=chekbox]').on('click', function(){
		var eau = $(this).text();

	})
}

