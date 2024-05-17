function modifyFile(file) {
    const playedInput = document.querySelectorAll('[id^=played_]');
    const completedInput = document.querySelectorAll('[id^=completed_]');
    const difficultyBeatenInput = document.querySelectorAll('[id^=difficultyBeaten_]');
    const gradeInput = document.querySelectorAll('[id^=grade_]');
    const bestTimeInput = document.querySelectorAll('[id^=bestTime_]');
    const allInput = [...playedInput, ...completedInput, ...difficultyBeatenInput, ...gradeInput, ...bestTimeInput]
    let prev = file.split("levelObjects")[0];
    allInput.forEach(input => {
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
            newValue = input.value;
            if (newValue != "") {
                if (Math.floor(element * 100) / 100 != serialize(newValue)) {
                    element = newValue;
                }
            }else{
                element="3.4028234663852887e38";
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
                console.log("modified");
                element = newValue;
            }
        }
        let temp5 = temp4.substring(temp4.indexOf(',') + 1);
        file = prev + "levelObjects" + beforeID + '"levelID":' + levelID + temp3 + `"${elementType}":` + element + "," + temp5;
    });
    return file;
}