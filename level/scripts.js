const levelCounts = [7, 7, 9, 2, 6];
const isles = ["Inkwell Isle 1", "Inkwell Isle 2", "Inkwell Isle 3", "Inkwell Hell", "Inkwell Isle 4"];
const colors = ["white", "white", "black", "white", "var(--dlc-font)"];
const backgroundColors = ["cornflowerblue", "lightcoral", "var(--cuphead-yellow)", "grey", "#afe5cb"];
function printLevelData(levelData) {
    let output = '';
    let levelCount = 0;
    for (let levelIndex = 0; levelIndex < levelCounts.length; levelIndex++) {
        output +=
            `<table>
            <tr>
                <td colspan=8; style="color:${colors[levelIndex]};background-color:${backgroundColors[levelIndex]};">${isles[levelIndex]}</td>
            </tr>
            <tr style="font-size:9px;">
                <td style="width:60px;">Played</td>
                <td style="width:60px;">Completed</td>
                <td style="width:90px;">Difficulty</td>
                <td style="width:55px;">Grade</td>
                <td style="width:70px;">Time</td>
                <td style="width:50px;">In-game</td>
                <td style="width:28px;"></td>
                <td style="width:200px;"></td>
            </tr>`;
        for (let i = 0; i < levelCounts[levelIndex]; i++) {
            if (!levelData.isEmpty()) {
                levelCount++;
                const level = levelData.poll();
                const levelID = level.getLevelID();
                const gradeOptions = [...gradeMap.values()].map(grade => `<option value="${grade}"${level.getGrade() === grade ? ' selected' : ''}>${grade}</option>`).join('');
                const difficultyBeatenOptions = [...difficultyBeatenMap.values()].map(difficultyBeaten => `<option value="${difficultyBeaten}"${level.getDifficultyBeaten() === difficultyBeaten ? ' selected' : ''}>${difficultyBeaten}</option>`).join('');
                output +=
                    `<tr>
                        <td>
                            <input type="checkbox" id="played_${levelID}" onchange="checkCompletion();" ${level.isPlayed() ? 'checked' : ''}>
                        </td>
                        <td>
                            <input type="checkbox" id="completed_${levelID}" onchange="checkCompletion();" ${level.isCompleted() ? 'checked' : ''}>
                        </td>
                        <td>
                            <select id="difficultyBeaten_${levelID}" onchange="difficultyBeaten_${levelID}.classList.add('changed')">${difficultyBeatenOptions}</select>
                        </td>
                        <td>
                            <select id="grade_${levelID}" onchange="grade_${levelID}.classList.add('changed')">${gradeOptions}</select>
                        </td>
                        <td>
                            <input id="bestTime_${levelID}" type="text" value="${level.getTime()}" onchange="updateBestTime(${levelID},this.value);" oninput="updateDisplayTime(${levelID},this.value);">
                        </td>
                        <td style="text-align:right;padding-left:1%;padding-right:1%;">
                            <div id="displayTime_${levelID}">${display(level.getTime())}</div>
                        </td>
                        <td><img src="mugshots/${levelCount}.png"></td>
                        <td style="text-align:left;padding-left:1%;">${level.getName()}</td>
                    </tr>`;
            }
        }
        output += '</table>';
    }
    return output;
}
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
function updateBestTime(levelID, value) {
    const bestTime = document.getElementById("bestTime_" + levelID);
    bestTime.value = deserialize(serialize(value));
    bestTime.classList.add("changed");
    checkCompletion();
}
function updateDisplayTime(levelID, value) {
    const displayTime = document.getElementById("displayTime_" + levelID);
    displayTime.innerText = display(deserialize(serialize(value)));
}
function downloadFile(content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
document.getElementById('downloadButton').addEventListener('click', function () {
    const modifiedFile = modifyFile(fileContents);
    downloadFile(modifiedFile, fileName);
});