const tableLevelCounts = [7, 7, 9, 2, 6];
const isles = ["Inkwell Isle 1", "Inkwell Isle 2", "Inkwell Isle 3", "Inkwell Hell", "Inkwell Isle 4"];
const colors=["white","white","black","white","var(--dlc-font)"];
const backgroundColors = ["cornflowerblue", "lightcoral", "gold", "grey", "#afe5cb"];
function printLevelData(levelData) {
    let output = '';
    let levelCount = 0;
    for (let tableIndex = 0; tableIndex < tableLevelCounts.length; tableIndex++) {
        output +=
            `<table style="color:white;background-color:var(--gray);">
            <tr>
                <td colspan=8; style="text-align:center;color:${colors[tableIndex]};background-color:${backgroundColors[tableIndex]};">${isles[tableIndex]}</td>
            </tr>
            <tr style="font-size:10px;">
                <td style="text-align:center;width:45px;">Played</td>
                <td style="text-align:center;width:65px;">Completed</td>
                <td style="text-align:center;width:90px;">Difficulty</td>
                <td style="text-align:center;width:55px;">Grade</td>
                <td style="text-align:center;width:70px;">Time</td>
                <td style="text-align:center;width:50px;">In-game</td>
                <td style="width:28px;"></td>
                <td style="width:200px;"></td>
            </tr>`;
        for (let i = 0; i < tableLevelCounts[tableIndex]; i++) {
            if (!levelData.isEmpty()) {
                levelCount++;
                const level = levelData.poll();
                const levelID=level.levelID;
                const gradeOptions = [...gradeMap.values()].map(grade => `<option value="${grade}"${level.getLetterGrade() === grade ? ' selected' : ''}>${grade}</option>`).join('');
                const difficultyBeatenOptions = [...difficultyBeatenMap.values()].map(difficultyBeaten => `<option value="${difficultyBeaten}"${level.getDifficultyBeaten() === difficultyBeaten ? ' selected' : ''}>${difficultyBeaten}</option>`).join('');
                output +=
                    `<tr>
                        <td style="text-align:center;">
                            <input type="checkbox" style="accent-color:var(--cuphead-yellow);" id="played_${levelID}" ${level.isPlayed() ? 'checked' : ''}>
                        </td>
                        <td style="text-align:center;">
                            <input type="checkbox" style="accent-color:var(--cuphead-yellow);" id="completed_${levelID}" ${level.isCompleted() ? 'checked' : ''}>
                        </td>
                        <td style="text-align:center;">
                            <select id="difficultyBeaten_${levelID}" onchange="difficultyBeaten_${levelID}.classList.add('changed')">${difficultyBeatenOptions}</select>
                        </td>
                        <td style="text-align:center;">
                            <select id="grade_${levelID}" onchange="grade_${levelID}.classList.add('changed')">${gradeOptions}</select>
                        </td>
                        <td style="text-align:center;">
                            <input id="bestTime_${levelID}" type="text" value="${level.getTime()}" onchange="updatebestTime(${levelID},this.value);" oninput="updateDisplayTime(${levelID},this.value);">
                        </td>
                        <td style="text-align:right;padding-left:1%;padding-right:1%;">
                            <div id="displayTime_${levelID}">${display(level.getTime())}</div>
                        </td>
                        <td><img src="mugshots/${levelCount}.png"></td>
                        <td style="padding-left:1%;">${level.getLevelName()}</td>
                    </tr>`;
            }
        }
        output += '</table>';
    }
    return output;
}
function updatebestTime(levelID, value) {
    const bestTime = document.getElementById("bestTime_" + levelID);
    bestTime.value = deserialize(serialize(value));
    bestTime.classList.add("changed");
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
    const modifiedFile=modifyFile(fileContents);
    downloadFile(modifiedFile,fileName);
});