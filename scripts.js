class PriorityQueue {
    constructor() {
        this.data = [];
    }
    add(item) {
        this.data.push(item);
        this.data.sort((a, b) => a.getlevelPriority() - b.getlevelPriority());
    }
    poll() {
        return this.data.shift();
    }
    isEmpty() {
        return this.data.length === 0;
    }
}
class Level {
    constructor(levelID, booleanArray, grade, difficultyBeaten, bestTime, bgmPlayListCurrent) {
        this.levelID = levelID;
        this.completed = booleanArray[0];
        this.completedAsChaliceP1 = booleanArray[1];
        this.completedAsChaliceP2 = booleanArray[2];
        this.played = booleanArray[3];
        this.grade = grade;
        this.difficultyBeaten = difficultyBeaten;
        this.bestTime = bestTime;
        this.curseCharmP1 = booleanArray[4];
        this.curseCharmP2 = booleanArray[5];
        this.bgmPlayListCurrent = bgmPlayListCurrent;
        // Miscellaneous variables
        this.levelType = 0; // 0=boss, 1=run 'n gun, 2=other
        this.levelPriority = 0;
    }
    getLevelName() {
        switch (this.levelID) {
            case 2:
                this.levelPriority = 15;
                return "Captain Brineybeard";
            case 5:
                this.levelPriority = 20;
                return "Phantom Express";
            case 6:
                this.levelPriority = 0;
                return "The Root Pack";
            case 7:
                this.levelPriority = 4;
                return "Ribby and Croaks";
            case 1428495827:
                this.levelPriority = 11;
                return "Wally Warbles";
            case 1429976377:
                this.levelPriority = 14;
                return "Rumor Honeybottoms";
            case 1430652919:
                this.levelPriority = 17;
                return "Werner Werman";
            case 1432722919:
                this.levelPriority = 10;
                return "Grim Matchstick";
            case 1446558823:
                this.levelPriority = 19;
                return "Cala Maria";
            case 1449745424:
                this.levelPriority = 2;
                return "Hilda Berg";
            case 1450266910:
                this.levelPriority = 3;
                return "Cagney Carnation";
            case 1450863107:
                this.levelPriority = 1;
                return "Goopy Le Grande";
            case 1451300935:
                this.levelPriority = 7;
                return "Baroness Von Bon Bon";
            case 1452935394:
                this.levelPriority = 18;
                return "Dr. Kahl's Robot";
            case 1456125457:
                this.levelPriority = 8;
                return "Beppi The Clown";
            case 1456740288:
                this.levelPriority = 16;
                return "Sally Stageplay";
            case 1460200177:
                this.levelPriority = 9;
                return "Djimmi The Great";
            case 1464969490:
                this.levelType = 1;
                this.levelPriority = 5;
                return "Forest Follies";
            case 1464969491:
                this.levelType = 1;
                this.levelPriority = 6;
                return "Treetop Trouble";
            case 1464969492:
                this.levelType = 1;
                this.levelPriority = 21;
                return "Perious Piers";
            case 1464969493:
                this.levelType = 1;
                this.levelPriority = 22;
                return "Rugged Ridge";
            case 1465296077:
                this.levelPriority = 23;
                return "King Dice";
            case 1466688317:
                this.levelPriority = 24;
                return "The Devil";
            case 1481199742:
                this.levelType = 2;
                this.levelPriority = 31;
                return "Mausoleum";
            case 1496818712:
                this.levelType = 1;
                this.levelPriority = 13;
                return "Funhouse Frazzle";
            case 1499704951:
                this.levelType = 1;
                this.levelPriority = 12;
                return "Funfair Fever";
            case 1573044456:
                this.levelPriority = 30;
                return "Chef Saltbaker";
            case 1511943573:
                this.levelPriority = 27;
                return "The Howling Aces";
            case 1530096313:
                this.levelPriority = 29;
                return "Esther Winchester";
            case 1523429320:
                this.levelPriority = 25;
                return "Glumstone The Giant";
            case 1518081307:
                this.levelPriority = 26;
                return "Moonshine Mob";
            case 1527591209:
                this.levelPriority = 28;
                return "Mortimer Freeze";
            case 1616405510:
                this.levelType = 2;
                this.levelPriority = 37;
                return "Angel and Demon";
            case 1562078899:
                this.levelType = 2;
                this.levelPriority = 32;
                return "The Pawns";
            case 1560339521:
                this.levelType = 2;
                this.levelPriority = 33;
                return "The Knight";
            case 1526556188:
                this.levelType = 2;
                this.levelPriority = 34;
                return "The Bishop";
            case 1560855325:
                this.levelType = 2;
                this.levelPriority = 35;
                return "The Rook";
            case 1561124831:
                this.levelType = 2;
                this.levelPriority = 36;
                return "The Queen";
            default:
                return null;
        }
    }
    getLetterGrade() {
        switch (this.grade) {
            case 0:
                return "D-";
            case 1:
                return "D";
            case 2:
                return "D+";
            case 3:
                return "C-";
            case 4:
                return "C";
            case 5:
                return "C+";
            case 6:
                return "B-";
            case 7:
                return "B";
            case 8:
                return "B+";
            case 9:
                return "A-";
            case 10:
                return "A";
            case 11:
                return "A+";
            case 12:
                return "S";
            case 13:
                return "P";
            default:
                return null;
        }
    }
    getDifficulty() {
        switch (this.difficultyBeaten) {
            case 0:
                return "Simple";
            case 1:
                return "Regular";
            case 2:
                return "Expert";
            default:
                return null;
        }
    }
    getTime() {
        let output = "";
        if (this.bestTime !== "3.4028234663852887e38") {
            output = mathing(this.bestTime);
        }
        return output;
    }
    isPlayed() {
        return this.played;
    }
    isCompleted() {
        return this.completed;
    }
    getLevelType() {
        return this.levelType;
    }
    getlevelPriority() {
        return this.levelPriority;
    }
}
function mathing(value) {
    let seconds = parseFloat(value);
    let minutes = 0;
    while (seconds >= 60) {
        seconds -= 60;
        minutes++;
    }
    seconds = Math.floor(seconds * 100) / 100;
    value = seconds.toString();
    if (value.split(".")[1]?.length === 1) {
        value += "0";
    }
    if (seconds < 10) {
        value = "0" + value;
    }
    if (minutes > 0) {
        value = minutes + ":" + value;
    }
    if (!value.includes(".")) {
        value += ".00";
    }
    return value;
}
function floatify(value) {
    if (value.includes(":")) {
        value = parseInt(value.split(":")[0]) * 60 + parseFloat(value.split(":")[1]);
    }
    if (!value.toString().includes(".")) {
        value += ".00";
    }
    return value;
}
function printLevelData(levelData) {
    let output = '';
    const tableLevelCounts = [7, 7, 9, 2, 6];
    const isles = ["Inkwell Isle 1", "Inkwell Isle 2", "Inkwell Isle 3", "Inkwell Hell", "Inkwell Isle 4"]
    const backgroundColors = ["cornflowerblue", "lightcoral", "gold", "grey", "#afe5cb"]
    let levelCount = 0;
    for (let tableIndex = 0; tableIndex < tableLevelCounts.length; tableIndex++) {
        output += `<table style="color:white;background-color:#434343;"><tr><td colspan=5; style="text-align:center;background-color:${backgroundColors[tableIndex]}">${isles[tableIndex]}</td></tr>`;
        for (let i = 0; i < tableLevelCounts[tableIndex]; i++) {
            if (!levelData.isEmpty()) {
                levelCount++;
                const level = levelData.poll();
                const grades = ['D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+', 'S', 'P'];
                const gradeOptions = grades.map(grade => `<option value="${grade}"${level.getLetterGrade() === grade ? ' selected' : ''}>${grade}</option>`).join('');
                if (level.isPlayed()) {
                    if (level.isCompleted()) {
                        output +=
                            `<tr>
                                <td style="text-align:center;width:50px;"><select>${gradeOptions}</select></td>
                                <td style="text-align:right;width:70px;">
                                    <input type="text" value="${level.getTime()}" onchange="updateLevelTime(${level.levelID},this.value)">
                                </td>
                                <td style="text-align:right;width:70px;">
                                    <div id="updateOutput_${level.levelID}">${level.getTime()}</div>
                                </td>
                                <td style="width:28px;"><img src="mugshots/${levelCount}.png"></td>
                                <td style="width:200px;">${level.getLevelName()}</td>
                            </tr>`;
                    } else {
                        output += `<tr><td></td><td style="text-align:right;"></td><td>${level.getLevelName()}</td></tr>`;
                    }

                } else {
                    output += `<tr><td></td><td style="text-align:right;"></td><td></td></tr>`;
                }
            }
        }
        output += '</table>';
    }
    return output;
}
function updateLevelTime(levelID, value) {
    const divId = 'updateOutput_' + levelID;
    const updateOutput = document.getElementById(divId);
    if (updateOutput) {
        if (value.includes(":")) {
            value = parseInt(value.split(":")[0]) * 60 + parseInt(value.split(":")[1].split(".")[0]) + "." + value.split(".")[1];
        }
        updateOutput.innerText = mathing(value);
        updateOutput.style = "color:black;background-color:var(--cuphead-yellow);";
    }
}
function modifyFile(file) {
    const bestTimeDivs = document.querySelectorAll('[id^=updateOutput_]');
    bestTimeDivs.forEach(div => {
        newTime = floatify(div.innerText);
        let levelID = parseInt(div.id.split('_')[1]);
        let prev = file.split('"levelObjects":')[0];
        let levelObjects = file.split('"levelObjects":')[1];
        let temp1 = levelObjects.split('"levelID":' + levelID)[0];
        let level = levelObjects.split('"levelID":' + levelID)[1];
        let temp3 = level.split('"bestTime":')[0];
        let temp4 = level.substring(level.indexOf('"bestTime":') + 1).trim();
        let oldTime = level.split('"bestTime":')[1].split(",")[0];
        let time = oldTime;
        if (Math.floor(oldTime * 100) / 100 != newTime) {
            time = newTime;
        }
        let temp5 = temp4.substring(temp4.indexOf(',') + 1).trim();
        file = prev + '"levelObjects":' + temp1 + '"levelID":' + levelID + temp3 + '"bestTime":' + time + "," + temp5;
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
let fileName="";
let fileContents = "";

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        fileContents += e.target.result;
        fileName+=file.name;
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
    downloadFile(modifiedFileContent,fileName);
});