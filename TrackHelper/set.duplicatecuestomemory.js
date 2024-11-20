// Iterates through all cuepoints for one or more selected tracks
// Copies the 10 first cue points (that are not loops) and assigns them as memory cues
// The Cue will be prefixed or suffixed according to the settings by the user.

// Retrieve and process settings
let cueTextAdd = (_settings['Memory Cue Text Add'] || '').toString();

let cueTextLocation = _settings['Text Location'];
cueTextLocation = cueTextLocation.toLowerCase();

let sortFromPos = _settings['Sort from Position'];
sortFromPos = parseInt(sortFromPos, 10);

let includeLoops = _settings['Include Loops'];
includeLoops = includeLoops.toLowerCase();

let tracksUpdated = 0;
let cuepointsUpdated = 0;

let trackBatch = await _library.track.getNextAllBatch();

while (trackBatch.length > 0) {
	for (const track of trackBatch) {
		_helpers.Log(`Working on track "${track.artist} - ${track.title}": Checking ${track.cuepoints.length} cuepoints.`);
	
		let newCueArray = [];
		let highestCuePos = 0;
		
		for (const trackCue of track.cuepoints) {
			if(trackCue.position > highestCuePos) {
				highestCuePos = trackCue.position;
			}
	  
			if(trackCue.type != 1 && !(includeLoops === "true" && trackCue.type === 5)) {
				_helpers.Log(`Cue Point "${trackCue.name}" is not a regular cue point. Skipping`);
			} else if(trackCue.name.toLowerCase().includes(cueTextAdd.toLowerCase())) {
				_helpers.Log(`Cue Point "${trackCue.name}" contain the same text as a memory cue. Skipping`);
			} else {
				let newMemoryCue = { ...trackCue };
				newMemoryCue.id = null;
				newMemoryCue.position = -1;
		  
				switch(cueTextLocation) {
					case 'start':
						newMemoryCue.name = `${cueTextAdd} ${newMemoryCue.name}`;
					break;
					case 'end':
						newMemoryCue.name = `${newMemoryCue.name} ${cueTextAdd}`;
					break;
					default:
						throw new Error(`Warning: Unknown cueTextLocation "${cueTextLocation}" for track "${track.artist} - ${track.title}".`);
					break;
				}
			
				if(!newMemoryCue.data) {
					newMemoryCue.data = {};
				}
			  
				if(!newMemoryCue.data.rekordbox) {
					newMemoryCue.data.rekordbox = {};
				}
			
				newMemoryCue.data.rekordbox.originalNum = -1;
				
				newCueArray.push(newMemoryCue);
			}
		}
  
		if(newCueArray.length > 2) {
			newCueArray.sort((a, b) => {
				if (a.startTime !== b.startTime) {
					// Sort by 'startTime'
					return a.startTime - b.startTime;
				} else {
					// If 'startTime' is the same, sort by 'name'
					return a.name.localeCompare(b.name);
				}
			});
		}
  
		let startCuePos = 17;
		if(highestCuePos > 16) {
			startCuePos = highestCuePos+1;
		}
  
		let maxCue = 10;
		
		if(newCueArray.length < maxCue) {
			maxCue = newCueArray.length;
		}
  
		for (let i = 0; i < maxCue; i++) {
			newCueArray[i].position = startCuePos + i;
			track.cuepoints.push(newCueArray[i]);
		}
		
		_helpers.Log(`Track "${track.artist} - ${track.title}": Added ${newCueArray.length} cuepoints.`);
	}
  
	trackBatch = await _library.track.getNextAllBatch();
}