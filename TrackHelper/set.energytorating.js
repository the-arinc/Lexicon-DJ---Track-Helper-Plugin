<<<<<<< HEAD
const energyEmoji = _settings['Energy Rating Emoji'];

for (const track of _vars.tracksSelected) {
	
	_helpers.Log(`Working on track ${track.title} with an energy value of ${track.energy}`);
	
	
	switch(track.energy) {
		case 1:
		case 2:
			track.rating = 1;
			track.composer = `${energyEmoji}`;
		break;
		
		case 3:
		case 4:
			track.rating = 2;
			track.composer = `${energyEmoji}${energyEmoji}`;		
		break;
		
		case 5:
		case 6:
			track.rating = 3;
			track.composer = `${energyEmoji}${energyEmoji}${energyEmoji}`;		
		break;
		
		case 7:
		case 8:
			track.rating = 4;
			track.composer = `${energyEmoji}${energyEmoji}${energyEmoji}${energyEmoji}`;		
		break;
		
		case 9:
		case 10:
			track.rating = 5;
			track.composer = `${energyEmoji}${energyEmoji}${energyEmoji}${energyEmoji}${energyEmoji}`;		
		break;
		
		default:
			track.rating = 0;
			track.composer = "";
		break;
	}
}

=======
const energyEmoji = _settings['Energy Rating Emoji'];

for (const track of _vars.tracksSelected) {
	
	_helpers.Log(`Working on track ${track.title} with an energy value of ${track.energy}`);
	
	
	switch(track.energy) {
		case 1:
		case 2:
			track.rating = 1;
			track.composer = `${energyEmoji}`;
		break;
		
		case 3:
		case 4:
			track.rating = 2;
			track.composer = `${energyEmoji}${energyEmoji}`;		
		break;
		
		case 5:
		case 6:
			track.rating = 3;
			track.composer = `${energyEmoji}${energyEmoji}${energyEmoji}`;		
		break;
		
		case 7:
		case 8:
			track.rating = 4;
			track.composer = `${energyEmoji}${energyEmoji}${energyEmoji}${energyEmoji}`;		
		break;
		
		case 9:
		case 10:
			track.rating = 5;
			track.composer = `${energyEmoji}${energyEmoji}${energyEmoji}${energyEmoji}${energyEmoji}`;		
		break;
		
		default:
			track.rating = 0;
			track.composer = "";
		break;
	}
}

>>>>>>> LexiconDJ-Plugin/main
_helpers.Log(`Operation completed`);