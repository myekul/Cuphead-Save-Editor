function printLevelData(levelData) {
    let output = '';
    const tableLevelCounts = [7, 7, 9, 2, 6];
    const isles = ["Inkwell Isle 1", "Inkwell Isle 2", "Inkwell Isle 3", "Inkwell Hell", "Inkwell Isle 4"]
    const backgroundColors = ["cornflowerblue", "lightcoral", "gold", "grey", "#afe5cb"]
    let levelCount = 0;
    for (let tableIndex = 0; tableIndex < tableLevelCounts.length; tableIndex++) {
        output +=
            `<table style="color:white;background-color:var(--gray);"><tr><td colspan=8; style="text-align:center;background-color:${backgroundColors[tableIndex]}">${isles[tableIndex]}</td></tr>
        <tr style="font-size:10px;">
            <td style="text-align:center;width:45px;">Played</td>
            <td style="text-align:center;width:65px;">Completed</td>
            <td style="text-align:center;width:90px;">Difficulty</td>
            <td style="text-align:center;width:55px;">Grade</td>
            <td style="text-align:center;">Time</td>
            <td style="text-align:center;">Display Time</td>
            <td></td>
            <td></td>
        </tr>`;
        for (let i = 0; i < tableLevelCounts[tableIndex]; i++) {
            if (!levelData.isEmpty()) {
                levelCount++;
                const level = levelData.poll();
                const gradeOptions = [...gradeMap.values()].map(grade => `<option value="${grade}"${level.getLetterGrade() === grade ? ' selected' : ''}>${grade}</option>`).join('');
                const difficultyBeatenOptions = [...difficultyBeatenMap.values()].map(difficultyBeaten => `<option value="${difficultyBeaten}"${level.getDifficultyBeaten() === difficultyBeaten ? ' selected' : ''}>${difficultyBeaten}</option>`).join('');
                output +=
                    `<tr>
                        <td style="text-align:center;">
                            <input type="checkbox" style="accent-color:var(--cuphead-yellow);" id="played_${level.levelID}" ${level.isPlayed() ? 'checked' : ''}>
                        </td>
                        <td style="text-align:center;">
                            <input type="checkbox" style="accent-color:var(--cuphead-yellow);" id="completed_${level.levelID}" ${level.isCompleted() ? 'checked' : ''}>
                        </td>
                        <td style="text-align:center;width:50px;">
                            <select id="difficultyBeaten_${level.levelID}" style="background-color:var(--cuphead-yellow);">${difficultyBeatenOptions}</select>
                        </td>
                        <td style="text-align:center;width:50px;">
                            <select id="grade_${level.levelID}">${gradeOptions}</select>
                        </td>
                        <td style="text-align:center;width:70px;">
                            <input type="text" value="${level.getTime()}" onchange="updateLevelTime(${level.levelID},this.value)">
                        </td>
                        <td style="text-align:right;padding-right:1%;width:70px;">
                            <div id="bestTime_${level.levelID}">${level.getTime()}</div>
                        </td>
                        <td style="width:28px;"><img src="mugshots/${levelCount}.png"></td>
                        <td style="padding-left:1%;width:200px;">${level.getLevelName()}</td>
                    </tr>`;
            }
        }
        output += '</table>';
    }
    return output;
}
function updateLevelTime(levelID, value) {
    const divId = 'bestTime_' + levelID;
    const updateOutput = document.getElementById(divId);
    if (updateOutput) {
        updateOutput.innerText = deserialize(serialize(value));
        updateOutput.style = "color:black;background-color:var(--cuphead-yellow);";
    }
}
function modifyFile(file) {
    const playedInput = document.querySelectorAll('[id^=played_]');
    const completedInput = document.querySelectorAll('[id^=completed_]');
    const difficultyBeatenInput = document.querySelectorAll('[id^=difficultyBeaten_]');
    const gradeInput = document.querySelectorAll('[id^=grade_]');
    const bestTimeInput = document.querySelectorAll('[id^=bestTime_]');
    const allInput = [...playedInput, ...completedInput, ...difficultyBeatenInput, ...gradeInput, ...bestTimeInput]
    allInput.forEach(input => {
        let elementType = input.id.split("_")[0];
        let levelID = parseInt(input.id.split('_')[1]);
        let prev = file.split("levelObjects")[0];
        let levelObjects = file.split("levelObjects")[1];
        let temp1 = levelObjects.split('"levelID":' + levelID)[0];
        let element = levelObjects.split('"levelID":' + levelID)[1];
        let temp3 = element.split(`"${elementType}":`)[0];
        let temp4 = element.substring(element.indexOf(`"${elementType}":`) + 1).trim();
        let value = element.split(`"${elementType}":`)[1].split(",")[0];
        let newValue="";
        if (elementType == "bestTime") {
            newValue = input.innerText;
            if (newValue != "" && newValue != "?????") {
                newValue = serialize(newValue);
                if (Math.floor(value * 100) / 100 != newValue) {
                    value = newValue;
                }
            }
        } else {
            if (elementType == "grade"||elementType=="difficultyBeaten") {
                const maps=[gradeMap,difficultyBeatenMap];
                newValue += input.options[input.selectedIndex].value;
                for(let mapsIndex=0;mapsIndex<maps.length;mapsIndex++){
                    for (const [key, value] of maps[mapsIndex].entries()) {
                        if (newValue === value) {
                            newValue = key;
                        }
                    }
                }
            }else{
                newValue += input.checked;
            }
            if (value != newValue) {
                value = newValue;
            }
        }
        let temp5 = temp4.substring(temp4.indexOf(',') + 1).trim();
        file = prev + "levelObjects" + temp1 + '"levelID":' + levelID + temp3 + `"${elementType}":` + value + "," + temp5;
    });
    return file;
}
function downloadFile(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');
let fileName = "";
let fileContents = "";

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        fileContents += e.target.result;
        fileName += file.name;
        if (fileName.includes("cuphead_player_data_v1_slot_")) {

            let levelArray = fileContents.split("levelObjects\"")[1].split("levelID\":");
            const levelData = new PriorityQueue();

            for (let i = 1; i < levelArray.length; i++) {
                const dataArray = levelArray[i].split(":");
                const levelID = parseInt(dataArray[0].split(",")[0]);
                const booleanArray = new Array(7).fill(false);
                for (let j = 0; j < 4; j++) {
                    if (dataArray[j + 1].split(",")[0] === "true") {
                        booleanArray[j] = true;
                    }
                }
                const grade = parseInt(dataArray[5].split(",")[0]);
                const difficultyBeaten = parseInt(dataArray[6].split(",")[0]);
                const bestTime = dataArray[7].split(",")[0];
                for (let j = 8; j < 10; j++) {
                    if (dataArray[j + 1].split(",")[0] === "true") {
                        booleanArray[j] = true;
                    }
                }
                const bgmPlayListCurrent = parseInt(levelArray[11].split(",")[0]);
                const level = new Level(levelID, booleanArray, grade, difficultyBeaten, bestTime, bgmPlayListCurrent);
                if (level.getLevelName() !== null) {
                    levelData.add(level);
                }
            }
            output.innerHTML = printLevelData(levelData);
        }
        else {
            output.innerHTML = "Wrong file type!";
        }
    };
    reader.readAsText(file);
});
document.getElementById('downloadButton').addEventListener('click', function () {
    let modifiedFileContent = modifyFile(fileContents);
    downloadFile(modifiedFileContent, fileName);
});