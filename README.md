# Lexicon DJ - Track Helper Plugin

A plugin for various operations in Lexicon DJ. Changing cue points to memory cues, setting energy to star ratings etc

This project is very much a work in progress, and will therefore often contain bugs, have unexpected consequences etc.
Remember to ALWAYS BACKUP YOUR DATABASE before running the bulk operations!!

## Overview of Memory Cue operations

Basically there are two ops for memory cues. 
1. One that copies all the hot cues and creates memory cues of them up to a maximum of 10. it will place it after the first available spot according to the number in the settings. I prefer 17 because my flx10 has 8x2 hot cue banks on each track.
2. The second will convert any hot cue with a matched text value to a memory cue in the tracks that are selected and order them
