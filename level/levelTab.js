const levelCounts = [7, 7, 9, 2, 6];
const isles = ["Inkwell Isle 1", "Inkwell Isle 2", "Inkwell Isle 3", "Inkwell Hell", "Inkwell Isle 4"];
const colors = ["white", "white", "black", "white", "var(--dlc-font)"];
const backgroundColors = ["var(--color1)", "var(--color2)", "var(--cuphead-yellow)", "grey", "var(--cuphead-green)"];
let levelCount = 0;
function printLevelData(levelData) {
    levelCount = 0;
    let output = `<table class="levelTable">`;
    // Use for each
    for (let levelIndex = 0; levelIndex < levelCounts.length; levelIndex++) {
        output +=
            `<tr>
                <th colspan=12; style="color:${colors[levelIndex]};background-color:${backgroundColors[levelIndex]};">${isles[levelIndex]}</th>
            </tr>`;
        output += createHeader();
        for (let i = 0; i < levelCounts[levelIndex]; i++) {
            if (!levelData.isEmpty()) {
                output += createRow(levelData.poll())
            }
        }
    }
    output += `</table>
    <button id="moreLevelsButton" onclick='toggleTableVisibility("moreLevels")'>Toggle hidden levels</button>
    <table id="moreLevels" class="levelTable hide">`
    output += createHeader();
    for (let i = 0; i < 16; i++) {
        output += createRow(levelData.poll())
    }
    output += `</table>`
    return output;
}
function createHeader() {
    let output = `<tr style="font-size:9px;">
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
    return output;
}
function createRow(level) {
    levelCount++;
    const levelID = level.levelID;
    const gradeOptions = [...gradeMap.values()].map(grade => `<option value="${grade}"${level.getGrade() === grade ? ' selected' : ''}>${grade}</option>`).join('');
    const difficultyBeatenOptions = [...difficultyBeatenMap.values()].map(difficultyBeaten => `<option value="${difficultyBeaten}"${level.getDifficultyBeaten() === difficultyBeaten ? ' selected' : ''}>${difficultyBeaten}</option>`).join('');
    let output =
        `<tr class="levelRow">
            <td>
                <input type="checkbox" id="played_${levelID}" onchange="checkCompletion();modified('played_${levelID}');" ${level.played ? 'checked' : ''}>
            </td>
            <td>
                <input type="checkbox" id="completed_${levelID}" onchange="checkCompletion();modified('completed_${levelID}');" ${level.completed ? 'checked' : ''}>
            </td>
            <td>
                <select id="difficultyBeaten_${levelID}" onchange="difficultyBeaten_${levelID}.classList.add('changed');modified('difficultyBeaten_${levelID}');">${difficultyBeatenOptions}</select>
            </td>
            <td>
                <select id="grade_${levelID}" onchange="grade_${levelID}.classList.add('changed');modified('grade_${levelID}');">${gradeOptions}</select>
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
                <input type="checkbox" id="completedAsChaliceP1_${levelID}" onchange="modified('completedAsChaliceP1_${levelID}')" ${level.completedAsChaliceP1 ? 'checked' : ''}>
            </td>
            <td>
                <input type="checkbox" id="completedAsChaliceP2_${levelID}" onchange="modified('completedAsChaliceP2_${levelID}')" ${level.completedAsChaliceP2 ? 'checked' : ''}>
            </td>
            <td>
                <input type="checkbox" id="curseCharmP1_${levelID}" onchange="curseCheckbox('curseCharmP1_${levelID}','p1');" ${level.curseCharmP1 ? 'checked' : ''}>
            </td>
            <td>
                <input type="checkbox" id="curseCharmP2_${levelID}" onchange="curseCheckbox('curseCharmP2_${levelID}','p2');" ${level.curseCharmP2 ? 'checked' : ''}>
            </td>
        </tr>`;
    return output;
}
function updateBestTime(levelID, value) {
    const bestTime = document.getElementById("bestTime_" + levelID);
    bestTime.value = deserialize(serialize(value));
    bestTime.classList.add("changed");
    modified("bestTime_" + levelID);
    checkCompletion();
}
function updateDisplayTime(levelID, value) {
    if (levelMap[levelID].levelType < 2) {
        const displayTime = document.getElementById("displayTime_" + levelID);
        displayTime.innerText = display(deserialize(serialize(value)));
    }
}
function modified(id) {
    let modifiedElement = document.getElementById(id);
    modifiedArray.push(modifiedElement);
}