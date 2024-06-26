function modifyLevels(file) {
    let prev = file.split("levelObjects")[0];
    modifiedArray.forEach(input => {
        let elementType = input.id.split("_")[0];
        let levelID = parseInt(input.id.split('_')[1]);
        let levelObjects = file.split("levelObjects")[1];
        let beforeID = levelObjects.split('"levelID":' + levelID)[0];
        let level = levelObjects.split('"levelID":' + levelID)[1];
        let temp3 = level.split(`"${elementType}":`)[0];
        let temp4 = level.substring(level.indexOf(`"${elementType}":`) + 1);
        let element = level.split(`"${elementType}":`)[1].split(",")[0];
        let newValue = "";
        if (elementType == "bestTime") {
            newValue = serialize(input.value);
            if (newValue != "") {
                if (Math.floor(element * 100) / 100 != newValue) {
                    element = newValue;
                }
            } else {
                element = "3.4028234663852887e38";
            }
        } else {
            if (elementType == "grade" || elementType == "difficultyBeaten") {
                const maps = [gradeMap, difficultyBeatenMap];
                newValue += input.options[input.selectedIndex].value;
                for (let mapsIndex = 0; mapsIndex < maps.length; mapsIndex++) {
                    for (const [key, value] of maps[mapsIndex].entries()) {
                        if (newValue === value) {
                            newValue = key;
                        }
                    }
                }
            } else {
                newValue += input.checked;
            }
            if (element != newValue) {
                element = newValue;
            }
        }
        let temp5 = temp4.substring(temp4.indexOf(',') + 1);
        file = prev + "levelObjects" + beforeID + '"levelID":' + levelID + temp3 + `"${elementType}":` + element + "," + temp5;
    });
    return file;
}
function modifyInventory(file) {
    let prev = file.split("loadouts")[0];
    let loadouts = file.split("loadouts")[1];
    let primaryPrev=loadouts.split('"primaryWeapon":')[0];
    let primaryNext=loadouts.split(",")[1];
    console.log(loadouts.split(":")[3]);

    loadout("p1", loadouts);
    loadout("p2", loadouts.split("player2")[1]);
    file = prev+"loadouts";
}
function loadout(player, file) {
    
}