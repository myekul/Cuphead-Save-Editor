const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');

// Listens to "fileInput" HTML element for change
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    let fileName = "";
    let fileContents = "";
    output.innerHTML = "";

    reader.onload = function (e) {
        fileName += file.name;
        if (fileName.includes("cuphead_player_data_v1_slot_")) {
            fileContents += e.target.result;
            // readPlayerData(fileContents);
            readLevelData(fileContents);
        }
        else {
            output.innerHTML = "Wrong file type!";
        }
    };
    reader.readAsText(file);
});
function readPlayerData(fileContents) {
    let playerData = [null, null];

    // Loadouts
    let loadout_P1 = [];
    let loadout_P2 = [];
    let loadoutArray = fileContents.replace("}", "").split('loadouts":')[1].split(":");

    for (let i = 0; i < 4; i++) {
        loadout_P1[i] = parseInt(loadoutArray[i + 2].split(",")[0]);
    }

    for (let i = 0; i < 4; i++) {
        loadout_P2[i] = parseInt(loadoutArray[i + 7].split(",")[0]);
    }

    // Inventories
    let inventoryArray = fileContents.replace("}", "").split('inventories":')[1].split(":");
    let money_P1 = 0;
    let money_P2 = 0;
    let newPurchase_P1 = false;
    let newPurchase_P2 = false;

    money_P1 = parseInt(inventoryArray[3].split(",")[0]);
    if (inventoryArray[4].split(",")[0] === "true") {
        newPurchase_P1 = true;
    }

    let weapons_P1 = inventoryArray[5].split("[")[1].split("]")[0].split(",");
    let supers_P1 = inventoryArray[6].split("[")[1].split("]")[0].split(",");
    let charms_P1 = inventoryArray[7].split("[")[1].split("]")[0].split(",");


    money_P2 = parseInt(inventoryArray[9].split(",")[0]);
    if (inventoryArray[10].split(",")[0] === "true") {
        newPurchase_P2 = true;
    }

    let weapons_P2 = inventoryArray[11].split("[")[1].split("]")[0].split(",");
    let supers_P2 = inventoryArray[12].split("[")[1].split("]")[0].split(",");
    let charms_P2 = inventoryArray[13].split("[")[1].split("]")[0].split(",");

    // Statictics
    let statictics_P1 = [];
    let statictics_P2 = [];
    let staticticsArray = fileContents.split("statictics")[1].replace("}", "").split(":");

    statictics_P1[0] = parseInt(staticticsArray[4].split(",")[0]);
    statictics_P1[1] = parseInt(staticticsArray[5].split(",")[0]);
    statictics_P2[0] = parseInt(staticticsArray[7].split(",")[0]);
    statictics_P1[1] = parseInt(staticticsArray[8].split(",")[0]);

    playerData[0] = new Player(loadout_P1, money_P1, newPurchase_P1, weapons_P1, supers_P1, charms_P1, statictics_P1);
    playerData[1] = new Player(loadout_P2, money_P2, newPurchase_P2, weapons_P2, supers_P2, charms_P2, statictics_P2);
    output.innerHTML=printPlayerData(playerData);
}
function readLevelData(fileContents) {
    let levelArray = fileContents.split("levelObjects")[1].split('levelID":');
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
    checkCompletion();
}