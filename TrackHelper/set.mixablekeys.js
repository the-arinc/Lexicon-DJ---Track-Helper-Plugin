<<<<<<< HEAD
var selectedField = _settings['Mixable Keys Field'];
var selectedField = selectedField.toLowerCase();

function GetMinMajKey(input) {
	let letter = input.slice(-1).toLowerCase();
	let number = parseInt(input.slice(0,-1), 10);
	
	switch(letter) {
		case 'a':
			letter = 'b';
			number--;
		break;
		case 'b':
			letter = 'a';
			number++;
		break;
	}

	if(number == 0)
	{
		number = 12;
	} else if(number == 13) {
		number = 1;
	}
	
	return number + letter.toUpperCase();
}

function GetPlusMinusOneKeys(input) {
	const letter = input.slice(-1).toUpperCase();
	const number = parseInt(input.slice(0,-1), 10);
	
	let plusOne = number+1;
	let minusOne = number-1;
	
	if (plusOne > 12) {
		plusOne = plusOne - 12;
	}
	
	if (minusOne < 1) {
		minusOne = 12 + minusOne;
	}
	
	let newLetter = letter;
	switch(letter) {
		case 'A':
			newLetter = 'B';
		break;
		case 'B':
			newLetter = 'A';
		break;
	}
	
	return minusOne + letter + " / " + plusOne + letter + " / " + number + newLetter;
}

function GetSemitoneKeys(input) {
	const letter = input.slice(-1).toUpperCase();
	const number = parseInt(input.slice(0,-1), 10);
	
	let plusSeven = number+7;
	let minusSeven = number-7;
	
	if (plusSeven > 12) {
		plusSeven = plusSeven - 12;
	}
	
	if (minusSeven < 1) {
		minusSeven = 12 + minusSeven;
	}
	
	return minusSeven + letter + " / " + plusSeven + letter;
}

_helpers.Log(`${_vars.tracksSelected.length} track(s) selected`);

if(selectedField === "comment" || selectedField === "extra1" || selectedField === "extra2") {
	_helpers.Log(`Selected field is valid: ${selectedField}`);
} else {
	_helpers.Log(`Selected field is invalid: ${selectedField} - Asking user to select a valid option`);
	
	const answer = await _ui.showInputDialog({
			input: 'select', // Show a select dropdown
			message: 'Invalid field in settings. Please select a valid field:',  // Message to the user
		  default: 'Comment', // Optional. Default input value
		  options: [
			'Comment',
			'Extra1',
			'Extra2'
		  ],
		  settingsKey: 'Mixable Keys Field', // Optional. config.settings key so this value is stored automatically and can also be adjusted using the Settings UI button
		  type: 'info' // Optional. Type/color of popup. Can be: primary, success, info, warning, error
		});
		
	selectedField = answer.toLowerCase();
}

for (const track of _vars.tracksSelected) {
	
	_helpers.Log(`Working on track ${track.title} with a key value of ${track.key}`);
	
	const minMaj = GetMinMajKey(track.key);
	const semitones = GetSemitoneKeys(track.key);
	const plusMinus = GetPlusMinusOneKeys(track.key);
	
	let newFieldValue = `${plusMinus} / ${minMaj} [ ${semitones} ]`;
	
	switch(selectedField.toLowerCase()) {
		case "extra1":
			track.extra1 = newFieldValue;
		break;
			
		case "extra2":
			track.extra2 = newFieldValue;
		break;
		
		case "comment":
			track.comment = newFieldValue;
		break;
		
		default:
			// We should only end up here if the user is doing stuff they shouldn't
		break;
		
	}
}

=======
var selectedField = _settings['Mixable Keys Field'];
var selectedField = selectedField.toLowerCase();

function GetMinMajKey(input) {
	let letter = input.slice(-1).toLowerCase();
	let number = parseInt(input.slice(0,-1), 10);
	
	switch(letter) {
		case 'a':
			letter = 'b';
			number--;
		break;
		case 'b':
			letter = 'a';
			number++;
		break;
	}

	if(number == 0)
	{
		number = 12;
	} else if(number == 13) {
		number = 1;
	}
	
	return number + letter.toUpperCase();
}

function GetPlusMinusOneKeys(input) {
	const letter = input.slice(-1).toUpperCase();
	const number = parseInt(input.slice(0,-1), 10);
	
	let plusOne = number+1;
	let minusOne = number-1;
	
	if (plusOne > 12) {
		plusOne = plusOne - 12;
	}
	
	if (minusOne < 1) {
		minusOne = 12 + minusOne;
	}
	
	let newLetter = letter;
	switch(letter) {
		case 'A':
			newLetter = 'B';
		break;
		case 'B':
			newLetter = 'A';
		break;
	}
	
	return minusOne + letter + " / " + plusOne + letter + " / " + number + newLetter;
}

function GetSemitoneKeys(input) {
	const letter = input.slice(-1).toUpperCase();
	const number = parseInt(input.slice(0,-1), 10);
	
	let plusSeven = number+7;
	let minusSeven = number-7;
	
	if (plusSeven > 12) {
		plusSeven = plusSeven - 12;
	}
	
	if (minusSeven < 1) {
		minusSeven = 12 + minusSeven;
	}
	
	return minusSeven + letter + " / " + plusSeven + letter;
}

_helpers.Log(`${_vars.tracksSelected.length} track(s) selected`);

if(selectedField === "comment" || selectedField === "extra1" || selectedField === "extra2") {
	_helpers.Log(`Selected field is valid: ${selectedField}`);
} else {
	_helpers.Log(`Selected field is invalid: ${selectedField} - Asking user to select a valid option`);
	
	const answer = await _ui.showInputDialog({
			input: 'select', // Show a select dropdown
			message: 'Invalid field in settings. Please select a valid field:',  // Message to the user
		  default: 'Comment', // Optional. Default input value
		  options: [
			'Comment',
			'Extra1',
			'Extra2'
		  ],
		  settingsKey: 'Mixable Keys Field', // Optional. config.settings key so this value is stored automatically and can also be adjusted using the Settings UI button
		  type: 'info' // Optional. Type/color of popup. Can be: primary, success, info, warning, error
		});
		
	selectedField = answer.toLowerCase();
}

for (const track of _vars.tracksSelected) {
	
	_helpers.Log(`Working on track ${track.title} with a key value of ${track.key}`);
	
	const minMaj = GetMinMajKey(track.key);
	const semitones = GetSemitoneKeys(track.key);
	const plusMinus = GetPlusMinusOneKeys(track.key);
	
	let newFieldValue = `${plusMinus} / ${minMaj} [ ${semitones} ]`;
	
	switch(selectedField.toLowerCase()) {
		case "extra1":
			track.extra1 = newFieldValue;
		break;
			
		case "extra2":
			track.extra2 = newFieldValue;
		break;
		
		case "comment":
			track.comment = newFieldValue;
		break;
		
		default:
			// We should only end up here if the user is doing stuff they shouldn't
		break;
		
	}
}

>>>>>>> LexiconDJ-Plugin/main
_helpers.Log(`Added Minor Major mixable key and Semitones to ${_vars.tracksSelected.length} track(s) ${selectedField} Field`);