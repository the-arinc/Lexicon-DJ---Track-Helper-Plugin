// Retrieve and process settings
const sortFromPos = parseInt(_settings['Sort from Position'], 10);
_helpers.Log(`Searching ${_vars.tracksSelected.length} track(s) to sort Cue Points from position "${sortFromPos}".`);

for (const track of _vars.tracksSelected) {
    // Set startIndex to sortFromPos, i.e., the start of the sorting range
    let startIndex = sortFromPos;
    // Initialize end index to the last cue point's position
    let endIndex = track.cuepoints.length;
    // Maximum memory cues = 10, maxumum hot cues = 8 for purposes of CDJs
    let maxCuePosition = Math.max(...track.cuepoints.map((cue) => cue.position));

    _helpers.Log(`Calculated maxCuePosition: ${maxCuePosition}`);

    if (typeof maxCuePosition!== 'number' || isNaN(maxCuePosition)) {
        _helpers.LogError("Error: Invalid maxCuePosition value.");
    }

    // Initialize populatedCuePoints and emptyCuePoints
    let populatedCuePoints = [];
    let emptyCuePoints = [];

    // Log the track being processed
    _helpers.Log(`Working on track "${track.artist} - ${track.title}"...`);
    _helpers.Log(`This track has ${endIndex} cuepoints in total.`);
    _helpers.Log(`This track has a maximum cue position of ${maxCuePosition}.`);

    // Loop through cuepoint positions to store what the track has <= maxCuePosition
    for (let currentPosition = 0; currentPosition <= maxCuePosition; currentPosition++) {
        const cuepoint = track.cuepoints.find((cue) => parseInt(cue.position) === currentPosition);
        _helpers.Log(`Position ${currentPosition} is populated`);

        if (cuepoint!== undefined) {
            _helpers.Log(`Position ${currentPosition} is populated`);

            // Store the cue point's ID, name, and start time in a separate array with its original position as key
            populatedCuePoints.push({
                id: cuepoint.id,
                position: cuepoint.position,
                name: cuepoint.name,
                startTime: cuepoint.startTime
            });
        } else {
            _helpers.Log(`Position ${currentPosition} is an empty cuepoint.`);

            // Store the position value in emptyCuePoints
            emptyCuePoints.push({
                position: currentPosition
            });
        }
    }

    // Separate populated cue points into two groups: those less than startIndex and those greater than or equal to startIndex
    const populatedCuePointsBeforeStartIndexCount = populatedCuePoints.filter(cue => parseInt(cue.position) < startIndex).length;
    const populatedCuepointsGreaterThanOrEqualToStartIndexCount = populatedCuePoints.filter(cue => parseInt(cue.position) >= startIndex).length;
    const emptyCuepointsLessThanStartIndexCount = emptyCuePoints.filter(cue => parseInt(cue.position) < startIndex).length;
    const emptyCuepointsGreaterThanOrEqualToStartIndexCount = emptyCuePoints.filter(cue => parseInt(cue.position) >= startIndex).length;
    _helpers.Log(`Populated Cue Points Before Start Index: ${populatedCuePointsBeforeStartIndexCount}`);
    _helpers.Log(`Populated Cue Points After Start Index: ${populatedCuepointsGreaterThanOrEqualToStartIndexCount}`);
    _helpers.Log(`Empty Cue Points Less Than Start Index: ${emptyCuepointsLessThanStartIndexCount}`);
    _helpers.Log(`Empty Cue Points After Start Index: ${emptyCuepointsGreaterThanOrEqualToStartIndexCount}`);

    // Sort the populated cue points greater than or equal to startIndex by their start time
    const sortedCuepoints = populatedCuePoints.filter(cue => parseInt(cue.position) >= startIndex).sort((a, b) => {
        return a.startTime - b.startTime
    });

    let updatedPositions = [];
    for (const cue of sortedCuepoints) {
        // Store the cue point in updatedPositions with its original position
        updatedPositions.push({
            //position: parseInt(cue.position),
            id: cue.id,
            name: cue.name,
            startTime: cue.startTime
        });
    }

    // Filter the populated cue points and empty cue points to get the required elements
    const populatedCuePointsBeforeStartIndex = populatedCuePoints.filter(cue => parseInt(cue.position) < startIndex);
    const emptyCuePointsBeforeStartIndex = emptyCuePoints.filter(cue => parseInt(cue.position) < startIndex);
    const populatedCuePointsAfterStartIndex = populatedCuePoints.filter(cue => parseInt(cue.position) >= startIndex).sort((a, b) => {
        return a.startTime - b.startTime
    });

    // See if I can concat the arrays and if that works
    let updatedCuePoints = populatedCuePointsBeforeStartIndex.concat(emptyCuePointsBeforeStartIndex).concat(populatedCuePointsAfterStartIndex);

    // Replace the original cue points with the new ones, commented out for now.
    //track.cuepoints = updatedCuePoints;

    // These variables now store the string representation of arrays.
    let populatedCuePointsStr = JSON.stringify(populatedCuePoints);
    let emptyCuePointsStr = JSON.stringify(emptyCuePoints);
    let populatedCuePointsAfterStartIndexStr = JSON.stringify(sortedCuepoints);
    let updatedPositionsStr = JSON.stringify(updatedPositions);
    let updatedCuePointsStr = JSON.stringify(updatedCuePoints);

    // Log these strings with a prefix to make them stand out in the log
    _helpers.Log(`populatedCuePoints: ${populatedCuePointsStr}`);
    _helpers.Log(`emptyCuePoints: ${emptyCuePointsStr}`);
    _helpers.Log(`populatedCuePointsAfterStartIndex : ${populatedCuePointsAfterStartIndexStr}`);
    _helpers.Log(`updatedPositions: ${updatedPositionsStr}`);
    _helpers.Log(`updatedCuePoints: ${updatedCuePointsStr}`);

    // Process the track after iteration
    _helpers.Log(`Execution complete.`);
    }

// Process the track after iteration
_helpers.Log(`Execution complete.`);
