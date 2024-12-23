// Retrieve and process settings
const sortFromPos = parseInt(_settings['Sort from Position'], 10);
if (typeof sortFromPos!== 'number' || isNaN(sortFromPos)) {
    _helpers.LogError("Error: Invalid sortFromPos value.");
} else {
    _helpers.Log(`Searching ${_vars.tracksSelected.length} track(s) to sort cuepoints from position "${sortFromPos}".`);
}

for (const track of _vars.tracksSelected) {
    _helpers.Log(`Working on track "${track.artist} - ${track.title}" Checking "${track.cuepoints.length}" cuepoints.`);

    const cuepoints = track.cuepoints;

    // If there are no cuepoints, skip the track
    if (!cuepoints || cuepoints.length === 0) {
        _helpers.Log(`Track "${track.artist} - ${track.title}" has no cuepoints, skipping to next track (if any)`);
        continue;
    }

    // Get cues that exist from sortFromPos
    const toSort = cuepoints.filter(cue => cue.position >= sortFromPos);

    // If there are no cuepoints to sort, skip to the next track
    if (toSort.length === 0) continue;

    // Ensure cuepoint.name is always a string to prevent potential errors
    toSort.forEach((cuepoint) => {
        if(!('name' in cuepoint)) 
            cuepoint.name = '';
    });

    // Sort the cuepoints by startTime ascending, then by name alphabetically
    toSort.sort((a, b) => {
        if (a.startTime !== b.startTime) {
            return a.startTime - b.startTime;
        }
        return a.name.localeCompare(b.name);
    });

    // Reassign positions sequentially starting from sortFromPos
    toSort.forEach((cue, index) => {
        cue.position = sortFromPos + index;
    });
    

        // Write the new positions to the cuepoints
        for(let i = 0; i < toSort.length; i++) {
            const trackCue = track.cuepoints.find(cuepoint => cuepoint.id === toSort[i].id);

            if(trackCue) {
                trackCue.position = toSort[i].position;
            }
        }

    _helpers.Log('Cuepoints sorted');
}

_helpers.Log('Cuepoint sorting completed successfully.');