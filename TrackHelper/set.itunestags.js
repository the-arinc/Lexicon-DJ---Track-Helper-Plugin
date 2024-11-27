const replaceTags = _settings['Overwrite'].toLowerCase();

for (const track of _vars.tracksSelected) {
    let searchTerms = cleanAndEncodeSearchTerm(track.artist, track.title);

    const result = await searchiTunes(searchTerms);

    if(result.length == 0) {
        _helpers.Report(`No matches found in iTunes for Artist: ${track.artist} - ${track.title}`);
    }
    else
    {
        let resultArray = [];

        let index = 0;
        
        for(const item of result) {
            resultArray.push(`${index}: ${item.artist} - ${item.title} - Genre: ${item.genre} - Release Year: ${item.year} - Duration: ${Math.round(item.trackTimeMillis/1000)}`);
            index++;
        }

        const userDialogOptions = {
            input: "select",
            message: `Select the the best match for Artist: ${track.artist} - ${track.title} - Duration: ${Math.round(track.duration)} or click Skip to search the next track`,
            options: resultArray,
            type: "success",
            confirmLabel: "Save Metadata",
            skipLabel: "Skip"
        };

        const userResponse = await _ui.showInputDialog(userDialogOptions);

        if(userResponse != null) {
            let index = parseInt(userResponse.split(':')[0], 10);

            const selectedResult = result[index];

            if(replaceTags == "true") {
                track.year = parseInt(selectedResult.year);
                track.genre = selectedResult.genre;
                track.albumTitle = selectedResult.album;
            } else {
                if(track.year.length == 0) {
                    track.year = parseInt(selectedResult.year);
                }

                if(track.genre.length == 0) {
                    track.genre = selectedResult.genre;
                }

                if(track.albumTitle.length == 0) {
                    track.albumTitle = selectedResult.album;
                }
            }
            
        }
    }
}

function cleanAndEncodeSearchTerm(artist, title) {
    // Clean the Artist String
    // Remove parentheses and their content, including any leading whitespace
    _helpers.Log(`Cleaning up search term. Artist: ${artist} - Title: ${title}`);
    let cleanedArtist = artist.replace(/\s*\(.*?\)/g, '');
    
    // If there's a comma, take only the text before the first comma
    if (cleanedArtist.includes(',')) {
        cleanedArtist = cleanedArtist.split(',')[0].trim();
    } else {
        cleanedArtist = cleanedArtist.trim();
    }

    // Clean the Title String
    // Split the title at '(' or '[' and take the first part
    let cleanedTitle = title.split(/[\(\[]/)[0].trim();

    // Combine the cleaned title and artist with a space in between
    let combinedString = `${cleanedTitle} ${cleanedArtist}`;

    _helpers.Log(`Search String combined: ${combinedString}`);

    // Use encodeURIComponent to encode the string
    // Then replace '%20' with '+' to match the desired format
    let encodedString = encodeURIComponent(combinedString).replace(/%20/g, '+');

    return encodedString;
}

async function searchiTunes(terms) {
    const media = "music"
    const entity = "song";
    const country = "US";
    const limit = 10;

    const url = `https://itunes.apple.com/search?term=${terms}&media=${media}&entity=${entity}&country=${country}&limit=${limit}`;

    try {
        const response = await _network.GET({url: url, headers: {}});

        _helpers.Log(`iTunes API returned: ${response.resultCount} results`);

        // Check if results exist
        if (!response.results || response.results.length === 0) {
            _helpers.Log('Info: No results found.');
            return [];
        }

        // Extract desired fields from each result
        const extractedData = response.results.map(item => ({
            artist: item.artistName || 'N/A',
            album: item.collectionName || 'N/A',
            title: item.trackName || 'N/A',
            year: item.releaseDate ? item.releaseDate.split('-')[0] : 'N/A',
            trackTimeMillis: item.trackTimeMillis || 0,
            genre: item.primaryGenreName || 'N/A',
            explicit: item.trackExplicitness || 'Undefined'
        }));

        return extractedData;

    } catch (error) {
        // Handle errors gracefully
        _helpers.Log('Error: Error fetching data from iTunes API:', error);
        _helpers.Log(`URL: ${url}`);
        return []; // Return an empty array in case of error
    }
}