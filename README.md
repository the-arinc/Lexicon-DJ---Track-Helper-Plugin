# Lexicon DJ - Track Helper Plugin

A plugin for various operations in Lexicon DJ. Changing cue points to memory cues, setting energy to star ratings etc

This project is very much a work in progress, and will therefore often contain bugs, have unexpected consequences etc.
Remember to ALWAYS BACKUP YOUR DATABASE before running the bulk operations!!

## Overview of Memory Cue operations

Currently there are two ops for memory cues. 
1. One that copies all the hot cues and creates memory cues of them up to a maximum of 10. it will place it after the first available spot according to the number in the settings. I prefer 17 because my flx10 has 8x2 hot cue banks on each track.
So if you have hotcue 1-8 filled up, it will copy them, add the text value defined in the settings to the front or back of the text description of the cue and sort it by start time from position x and up.

2. The second will convert any hot cue with a matched text value to a memory cue in the tracks that are selected and order them the same way the first function works.

## Overview of other operations

Set Energy to Rating
- Reads the Energy rating in Lexicon and set it accordingly to Composer and the Rating field. 

 1-2 Energy: ⭐

 3-4 Energy: ⭐⭐

 5-6 Energy: ⭐⭐⭐

 7-8 Energy: ⭐⭐⭐⭐

9-10 Energy: ⭐⭐⭐⭐⭐


You may define the emoji used for the Composer field. For the rating field, it will set it according to the energy represented above.

Set Mixable Keys
- Reads the current key (Must be Camelot) and calculates the mixable keys and writes it to one of the fields: "comment", "extra1" or "extra2"

The keys written are: Key +1 and -1, Mayor Up/down and [Semitone -1 / Semitone +1]

Semitones are what you get when you increase or decrease the tone of the song. It's most often used when Fuzzy Key Mixing allowing you to stay within the +-1 Key or Mayor up/down of a song without it sounding absolute rubbish.