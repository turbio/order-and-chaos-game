var CONSECUTIVE_TO_WIN = 5;

$(function(){
	$('.info > .chip').draggable({
		helper: 'clone',
		appendTo: 'body',
		revert: 'invalid',
		containment: 'body'
	}).click(function(){
		$('.info > .chip').removeClass('active');
		$(this).addClass('active');
	});
	$('td').droppable({
		drop: function(event, ui){
			$(ui.draggable).clone().appendTo($(this));
			playerMoved();
		}
	}).click(function(){
		var piece = $('.info > .chip.active');
		if(piece.length == 1){
			$(piece).clone().appendTo(this);
			playerMoved();
		}
	});
	$('#turn-indicator').text((Math.floor(Math.random() * 2)) ? 'order' : 'chaos');
});

function playerMoved(){
	var indicator = $('#turn-indicator');
	indicator.text((indicator.text() == 'chaos') ? 'order' : 'chaos');
	//$('#info > .chip').removeClass('active');

	var winner = checkWinner();
	if(winner){
		$("#result-board > p").text(winner + ' wins');
		$("#piece-select").hide();
		$("#result-board").show();
	}
}

function checkWinner(){
	var rows = $('tr');
	var columns = $('tr:nth-child(1) > td');

	//check rows
	for(var x = 0; x < columns.length; x++){
		var adjacent = 0;
		var color = null;
		for(var y = 0; y < rows.length; y++){
			var curColor = colorOf($($(rows[x]).children()[y]));
			if(color != curColor){
				adjacent = 0;
			}else{
				adjacent++;
			}

			color = curColor;
			if(adjacent >= 4){
				return 'order';
			}
		}
	}

	//check columns
	for(var x = 0; x < rows.length; x++){
		var adjacent = 0;
		var color = null;
		for(var y = 0; y < columns.length; y++){
			var curColor = colorOf($($(rows[y]).children()[x]));
			if(color != curColor){
				adjacent = 0;
			}else{
				adjacent++;
			}

			color = curColor;
			if(adjacent >= 4){
				return 'order';
			}
		}
	}


	if($('td:empty').length == 0){
		return 'chaos';
	}

	return false;
}

function colorOf(square){
	if(square.children().length == 0){
		//if a sqaure has no color, return not a number.
		//This is because NaN != NaN causing two sqaures with no color to be not equal
		return NaN;
	}else if(square.children().hasClass('red')){
		return 'red';
	}else if(square.children().hasClass('blue')){
		return 'blue';
	}
}
