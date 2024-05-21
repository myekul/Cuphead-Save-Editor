var audio = document.getElementById("equip_move");
audio.volume = 0.2;
function printPlayerData(playerData) {
    let output = "";
    output += `<div id="flex-container">` + aPlayer(playerData[0], "p1") + aPlayer(playerData[1], "p2") + `</div>`;
    return output;
}
function aPlayer(playerData, player) {
    let output=`<div class="flex-item">`;
    const weaponIDs = Array.from(weaponMap.keys()).map(String);
    const charmIDs = Array.from(charmMap.keys()).map(String);
    output+=nineTable(playerData,player,"weapon",weaponIDs);
    output+=nineTable(playerData,player,"charm",charmIDs);
    output+=`</div>`;
    return output;
}
function nineTable(playerData,player,elementType,IDs) {
    let clickClass = "";
    let output = createTable()
    for (i = 0; i < 5; i++) {
        let clickClass = "clicked";
        if (elementType == "weapon") {
            if (playerData.getWeapons().includes(IDs[i])) {
                clickClass = "unclicked"
            }
        }else{
            if (playerData.getCharms().includes(IDs[i])) {
                clickClass = "unclicked"
            }
        }
        output += createImage(elementType,player, IDs[i], i, clickClass);
    }
    output +=
        `</tr>
        </table>`+ createTable();
    for (i = 5; i < 9; i++) {
        let clickClass = "clicked";
        if (elementType == "weapon") {
            if (playerData.getWeapons().includes(IDs[i])) {
                clickClass = "unclicked"
            }
        }else{
            if (playerData.getCharms().includes(IDs[i])) {
                clickClass = "unclicked"
            }
        }
        output += createImage(elementType,player, IDs[i], i, clickClass);
    }
    output +=
        `</tr>
        </table>`;
    return output;
}
function createTable() {
    return `<table class="inventoryTable">
    <tr>`;
}
function createImage(elementType,player, id, imageID, clickClass) {
    return `<td id="${player}_${elementType}_${id}"><img src="images/${elementType}s/${imageID + 1}.png" class="${clickClass}" onclick="clicked('${elementType}','${player}',${id})" draggable="false"></td>`;
}
function clicked(elementType,player, id) {
    element = document.getElementById(player + "_"+elementType+"_" + id);
    var image = element.querySelector("img");
    audio.currentTime = 0;
    audio.play();
    image.classList.toggle("unclicked");
    image.classList.toggle("clicked");
}