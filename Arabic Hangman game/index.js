
function showBox($id, $content){
	$($id).stackbox({
		closeButton: true,
		position: 'bottom',
		animOpen: 'tada slow',
		closeButton: false,
		content: '<div style="font-size:18px;" class="stackbox-body">' + row.hint+'</div>',
	});
}

/*
	Onload
*/

window.onload = function() {
	var word; // Selected word
	var letter_position; // Letter position
	var letters_count;
	var row_count;
	var counter; // Count correct geusses
	var block;
	var word_arr;
	var word_arr_rev;

	const container = document.getElementById("grid_container");
	let rows = document.getElementsByClassName("gridRow");

	let backspace_button = document.getElementById("backspace");
	let enter_button = document.getElementById("enter");
	
	
	defaultGrid();
	// create alphabet ul
	var buttons = function() {
	myButtons = document.getElementById('buttons');
	letters = document.createElement('ul');

	for (var i = 0; i < alphabet.length; i++) {
		letters.id = 'alphabet';
		list = document.createElement('li');
		list.id = 'letter';
		list.className = "letter";
		list.innerHTML = alphabet[i];
		check();
		myButtons.appendChild(letters);
		letters.appendChild(list);
	}
	}

  // Show lives
  comments = function() {
	var congrats = document.getElementsByClassName("congrats");
	if(counter==5){
		congrats[0].innerHTML = "Congratulations!";
		block = true;
	} else {
		congrats[0].innerHTML = "Better Luck Next Time!";
	}
  }

/*
	Two input ways : Click/Keypress
*/


	// On keypress 
	$(document).on("keypress", function (e) {
		var codek = e.which;
		if(!block){
			if(codek>1568 && codek<1611){
				geuss = unicodeTable[codek-1569];
				var guessedLetter = $("#alphabet .letter:contains('"+geuss+"')");
				if(guessedLetter.length > 0){
					guessedLetter.attr({"class": "active"});
					guessedLetter.off('click');
					checkLetter();
				}
			}
		}
	});

	// OnClick Function
	check = function() {
		list.onclick = function() {
			if(block){
				return;
			}
			geuss_tag = this;
			/*var*/ geuss = (this.innerHTML);
			checkLetter();
		}
	}


	// increment row count on enter
	enter_button.onclick = function() {
		if(block) {
			return;
		}
			// row_count++;
			// letters_count = 0;
			// letter_position = 4;
		counter = 0;
		if((letters_count == 5)&&(row_count<5)){
			let curr_row = document.getElementsByClassName(`cell_${row_count}`);
			console.log(word_arr_rev);
			for(i=0; i<curr_row.length; i++){
				if(word_arr_rev[i]==curr_row[i].innerHTML){
					counter+=1;
					curr_row[i].classList.add("success");
				} else if(word_arr_rev.includes(curr_row[i].innerHTML)){
					curr_row[i].classList.add("warning");
				} else{
					curr_row[i].classList.add("failure");
				}
			}
			row_count++;
			letters_count = 0;
			letter_position = 4;
		}

		if(counter == word_arr.length){
			comments();
		}

		if(row_count == 5) {
			comments();
		}
			// defaultGrid();
	}

	// BackSpace Function
	backspace_button.onclick = function() {
		if(block) {
			return;
		}
		if(letters_count > 0) {

			// console.log("counter: " + counter);
			letter_position++;
			letters_count--;
			// console.log("letters_count: "+letters_count);
			// console.log("letter_position: "+letter_position);
			let row = document.getElementsByClassName(`cell_${row_count}`);
			// console.log("letter_position : "+letter_position);
			let row_cell = row[letter_position];
			row_cell.innerHTML = "";
		}
	}


	checkLetter = function() {

		let curr_row = document.getElementsByClassName(`cell_${row_count}`);
		let curr_cell = curr_row[letter_position];
		curr_cell.innerHTML = geuss;
		
		letters_count+=1;
		letter_position-=1;
	}

	  // Play
	  play = function() {

		// rand_dict = select_five_letter_word();
		word = "قافلة";
		// console.log(word.split(""))
		word_arr = word.split("");
		word_arr_rev = word_arr.reverse();
		buttons();

		lives = 10;
		totalPoints = 100;
		letters_count = 0;
		letter_position = 4;
		row_count = 0;
		counter = 0;
		space = 0;
		block = false;
	  }

	//   reset = function() {
	// 	correct.parentNode.removeChild(correct);
	// 	letters.parentNode.removeChild(letters);
	// 	context.clearRect(0, 0, 400, 400);
	// 	play();
	//   }

	  play();

	  // Reset
	//   document.getElementById('reset').onclick = function() {
	// 	showTotalPoints.innerHTML = '';
	// 	reset();
	//   }
	  
	  // Creates a default grid sized 16x16
	  function defaultGrid() {
		  makeRows(5, 5);
		//   makeColumns(5);
	  }
	  
	  // Takes (rows, columns) input and makes a grid
	  function makeRows(rowNum, colNum) {
		  // Creates rows
		  for (r = 0; r < rowNum; r++) {
			  let row = document.createElement("div");
			  // Creates columns
			  for (c = 0; c < colNum; c++) {
				  let column = document.createElement("div");
				//   column.innerHTML = r + "," + c;
				  row.appendChild(column).className = "cell cell_" + r;
			  }
			  container.appendChild(row).className = "gridRow";
		  };
	  };
}
