// Checks whether isles should be displayed
function checkCompletion() {
    let currentIsle = 5;
    let isleClearedCheck = true;
    bestTimeInput.forEach(input => {
        let levelID = parseInt(input.id.split('_')[1]);
        let played = document.getElementById("played_" + levelID);
        let completed = document.getElementById("completed_" + levelID);
        let levelType = levelMap[levelID].levelType;
        let isle = levelMap[levelID].isle;
        if (isle > 0 && isle < 4) {
            if (levelType == 0 && (input.value == "" || !played.checked || !completed.checked)) {
                isleClearedCheck = false;
                if (isle < currentIsle) {
                    currentIsle = isle;
                }
            }
        }
    });
    // Restoring display times
    displayTimeInput = document.querySelectorAll('[id^=displayTime_]');
    displayTimeInput.forEach(input => {
        let levelID = parseInt(input.id.split('_')[1]);
        let bestTime = document.getElementById("bestTime_" + levelID);
        input.innerText = display(deserialize(serialize(bestTime.value)));
        // Applying question marks for unchecked played and completion boxes
        let played = document.getElementById("played_" + levelID);
        let completed = document.getElementById("completed_" + levelID);
        if (!played.checked || !completed.checked) {
            input.innerText = "?";
        }
    });
    // Applying question marks for incomplete isles
    if (!isleClearedCheck) {
        displayTimeInput.forEach(input => {
            let levelID = parseInt(input.id.split('_')[1]);
            let isle = levelMap[levelID];
            if (isle.isle > currentIsle) {
                input.innerText = "?";
            }
        });
    }
}
function checkCurse() {
    let curseCharmInput = [...curseCharmP1Input, ...curseCharmP2Input];
    let player="p1";
    curseCharmInput.forEach(input => {
        if(parseInt(input.id.split('_')[0])=="curseCharmP2"){
            player = "p2";
        }
        let levelID = parseInt(input.id.split('_')[1]);
        let levelType = levelMap[levelID].levelType;
        let isle = levelMap[levelID].isle;
        if (input.checked) {
            curseScore[player] += curseScoreGet(levelID, levelType, isle);
        }
    });
    updateRelic(player);
}
function curseScoreGet(levelID, levelType, isle) {
    output = 0;
    if (levelType == 0) {
        if (isle == 1) {
            output = 2;
        } else if (isle == 2) {
            output = 2.5;
        } else if (isle == 3 || isle == 0) {
            output = 3;
        }
        if (levelMap[levelID].name == "The Devil" || levelMap[levelID].name == "Chef Saltbaker") {
            output = 4;
        }
        if (levelMap[levelID].name == "King Dice") {
            output = 1;
        }
    }
    return output;
}
function updateRelic(player) {
    let relic = document.getElementById(player + "_charm_" + 1569309672);
    if (curseScore[player] >= 16) {
        relic.src = "inventory/images/charms/15.png";
    } else if (curseScore[player] >= 12) {
        relic.src = "inventory/images/charms/14.png";
    } else if (curseScore[player] >= 8) {
        relic.src = "inventory/images/charms/13.png";
    } else if (curseScore[player] >= 4) {
        relic.src = "inventory/images/charms/12.png";
    } else if (curseScore[player] >= 0) {
        relic.src = "inventory/images/charms/11.png";
    }
}
function curseCheckbox(elementID,player) {
    let checkbox = document.getElementById(elementID);
    let levelID = parseInt(checkbox.id.split('_')[1]);
    let levelType = levelMap[levelID].levelType;
    let isle = levelMap[levelID].isle;
    if (checkbox.checked) {
        curseScore[player] += curseScoreGet(levelID, levelType, isle);
    } else {
        curseScore[player] -= curseScoreGet(levelID, levelType, isle);
    }
    updateRelic(player);
}