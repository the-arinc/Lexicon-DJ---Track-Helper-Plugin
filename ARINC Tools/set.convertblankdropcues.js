// Convert first 4 blank drop hot cues to new template
// Cuepoint[0]: purple/lilac → green memory cue "'-32D1"
// Cuepoint[1]: green → green hot cue "D1"
// Cuepoint[2]: purple/lilac → yellow memory cue "'-32D2"
// Cuepoint[3]: green → yellow hot cue "D2"
// Works with either blank labels OR "Cue 1", "Cue 2", "Cue 3", "Cue 4" labels

_helpers.Log(`Processing ${_vars.tracksSelected.length} track(s) for blank drop cue conversion.`);

let tracksUpdated = 0;
let tracksSkipped = 0;

for (const track of _vars.tracksSelected) {
  _helpers.Log(`Checking track "${track.artist} - ${track.title}": ${track.cuepoints.length} cuepoints.`);
  
  const cues = track.cuepoints || [];
  
  // Need at least 4 cuepoints
  if (cues.length < 4) {
    _helpers.Log(`Track has fewer than 4 cuepoints, skipping.`);
    tracksSkipped++;
    continue;
  }
  
  // Check if all first 4 cues have empty names OR specific "Cue N" labels
  const name0 = cues[0].name || "";
  const name1 = cues[1].name || "";
  const name2 = cues[2].name || "";
  const name3 = cues[3].name || "";
  
  const allBlank = (name0 === "" && name1 === "" && name2 === "" && name3 === "");
  const allCueN = (name0 === "Cue 1" && name1 === "Cue 2" && name2 === "Cue 3" && name3 === "Cue 4");
  
  if (!allBlank && !allCueN) {
    _helpers.Log(`Cuepoint names don't match criteria. Expected all blank or "Cue 1-4". Got: "${name0}", "${name1}", "${name2}", "${name3}"`);
    tracksSkipped++;
    continue;
  }
  
  _helpers.Log(`Names match criteria (${allBlank ? "blank" : "Cue N"}). Checking colors...`);
  
  // Get colors as strings
  const c0 = cues[0].color;
  const c1 = cues[1].color;
  const c2 = cues[2].color;
  const c3 = cues[3].color;
  
  _helpers.Log(`Colors found - c0: "${c0}", c1: "${c1}", c2: "${c2}", c3: "${c3}"`);
  
  // Check all colors exist
  if (!c0 || !c1 || !c2 || !c3) {
    _helpers.Log(`One or more cuepoints missing color data, skipping track.`);
    tracksSkipped++;
    continue;
  }
  
  // Check cuepoint[0] is purple (violet/blue_violet) OR lilac (violet_light)
  if (!(c0 === "violet" || c0 === "blue_violet" || c0 === "violet_light")) {
    _helpers.Log(`Cuepoint[0] color mismatch. Expected violet/blue_violet/violet_light, got "${c0}"`);
    tracksSkipped++;
    continue;
  }
  
  // Check cuepoint[1] is green
  if (c1 !== "green") {
    _helpers.Log(`Cuepoint[1] color mismatch. Expected green, got "${c1}"`);
    tracksSkipped++;
    continue;
  }
  
  // Check cuepoint[2] is purple (violet/blue_violet) OR lilac (violet_light)
  if (!(c2 === "violet" || c2 === "blue_violet" || c2 === "violet_light")) {
    _helpers.Log(`Cuepoint[2] color mismatch. Expected violet/blue_violet/violet_light, got "${c2}"`);
    tracksSkipped++;
    continue;
  }
  
  // Check cuepoint[3] is green
  if (c3 !== "green") {
    _helpers.Log(`Cuepoint[3] color mismatch. Expected green, got "${c3}"`);
    tracksSkipped++;
    continue;
  }
  
  // All criteria met - apply the changes
  _helpers.Log(`Track matches criteria. Applying cue conversions...`);
  
  // Cuepoint[0]: purple/lilac → green memory cue "'-32D1"
  if (!cues[0].data) {
    cues[0].data = {};
  }
  if (!cues[0].data.rekordbox) {
    cues[0].data.rekordbox = {};
  }
  cues[0].data.rekordbox.originalNum = -1;
  cues[0].name = "'-32D1";
  cues[0].color = "green";
  
  // Cuepoint[1]: green → green hot cue "D1" (stays green, just add name)
  cues[1].name = "D1";
  // Color stays green - no change needed
  
  // Cuepoint[2]: purple/lilac → yellow memory cue "'-32D2"
  if (!cues[2].data) {
    cues[2].data = {};
  }
  if (!cues[2].data.rekordbox) {
    cues[2].data.rekordbox = {};
  }
  cues[2].data.rekordbox.originalNum = -1;
  cues[2].name = "'-32D2";
  cues[2].color = "yellow";
  
  // Cuepoint[3]: green → yellow hot cue "D2"
  cues[3].name = "D2";
  cues[3].color = "yellow";
  
  // Save the modified track
  track.cuepoints = cues;
  
  tracksUpdated++;
  _helpers.Log(`Track updated successfully.`);
}

_helpers.Log(`Conversion complete: ${tracksUpdated} track(s) updated, ${tracksSkipped} track(s) skipped.`);
