const levelCounts = [7, 7, 9, 2, 6];
const isles = ["Inkwell Isle 1", "Inkwell Isle 2", "Inkwell Isle 3", "Inkwell Hell", "Inkwell Isle 4"];
const colors = ["white", "white", "black", "white", "var(--dlc-font)"];
const backgroundColors = ["var(--color1)", "var(--color2)", "var(--cuphead-yellow)", "grey", "var(--cuphead-green)"];
function printLevelData(levelData) {
    let output = `<table id="levelTable">`;
    let levelCount = 0;
    for (let levelIndex = 0; levelIndex < levelCounts.length; levelIndex++) {
        output +=
            `<tr>
                <td colspan=12; style="color:${colors[levelIndex]};background-color:${backgroundColors[levelIndex]};">${isles[levelIndex]}</td>
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
                <td style="width:75px;" colspan=2>Chalice P1/P2</td>
                <td style="width:75px;" colspan=2>Curse P1/P2</td>
            </tr>`;
        for (let i = 0; i < levelCounts[levelIndex]; i++) {
            if (!levelData.isEmpty()) {
                levelCount++;
                const level = levelData.poll();
                const levelID = level.levelID;
                const gradeOptions = [...gradeMap.values()].map(grade => `<option value="${grade}"${level.getGrade() === grade ? ' selected' : ''}>${grade}</option>`).join('');
                const difficultyBeatenOptions = [...difficultyBeatenMap.values()].map(difficultyBeaten => `<option value="${difficultyBeaten}"${level.getDifficultyBeaten() === difficultyBeaten ? ' selected' : ''}>${difficultyBeaten}</option>`).join('');
                output +=
                    `<tr>
                        <td>
                            <input type="checkbox" id="played_${levelID}" onchange="checkCompletion();" ${level.played ? 'checked' : ''}>
                        </td>
                        <td>
                            <input type="checkbox" id="completed_${levelID}" onchange="checkCompletion();" ${level.completed ? 'checked' : ''}>
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
                        <td>
                            <img src="level/mugshots/${levelCount}.png" style="width: 31px;">
                        </td>
                        <td style="text-align:left;padding-left:1%;">
                            ${level.getName()}
                        </td>
                        <td>
                            <input type="checkbox" id="completedAsChaliceP1_${levelID}" ${level.completedAsChaliceP1 ? 'checked' : ''}>
                        </td>
                        <td>
                            <input type="checkbox" id="completedAsChaliceP2_${levelID}" ${level.completedAsChaliceP2 ? 'checked' : ''}>
                        </td>
                        <td>
                            <input type="checkbox" id="curseCharmP1_${levelID}" ${level.curseCharmP1 ? 'checked' : ''}>
                        </td>
                        <td>
                            <input type="checkbox" id="curseCharmP2_${levelID}" ${level.curseCharmP2 ? 'checked' : ''}>
                        </td>
                    </tr>`;
            }
        }
    }
    return output+'</table>';
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