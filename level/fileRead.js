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
                if (level.getName() !== null) {
                    levelData.add(level);
                }
            }
            output.innerHTML = printLevelData(levelData);
            playedInput = document.querySelectorAll('[id^=played_]');
            completedInput = document.querySelectorAll('[id^=completed_]');
            difficultyBeatenInput = document.querySelectorAll('[id^=difficultyBeaten_]');
            gradeInput = document.querySelectorAll('[id^=grade_]');
            bestTimeInput = document.querySelectorAll('[id^=bestTime_]');
            allInput = [...playedInput, ...completedInput, ...difficultyBeatenInput, ...gradeInput, ...bestTimeInput];
        }
        else {
            output.innerHTML = "Wrong file type!";
        }
    };
    reader.readAsText(file);
});