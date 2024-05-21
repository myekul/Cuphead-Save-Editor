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