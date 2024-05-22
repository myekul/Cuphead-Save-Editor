function printInventoryData(playerData) {
    let output = "Controls:<br>CLICK to add or remove items from inventory.<br>SHIFT+CLICK to equip primary weapon, super, and charm.<br>ALT+CLICK to equip secondary weapon.</p>";
    output += `<div id="flex-container">` + anInventory(playerData[0], "p1") + anInventory(playerData[1], "p2") + `</div>`;
    return output;
}
function anInventory(playerData, player) {
    let output = `<div class="player-column">`;
    const weaponIDs = Array.from(weaponMap.keys()).map(String);
    const charmIDs = Array.from(charmMap.keys()).map(String);
    const superIDs = Array.from(superMap.keys()).map(String);
    output += nineTable(playerData, player, "weapon", weaponIDs) + `<br>`;
    output += createTable() + `<tr><td colspan=3>SUPER ART</td></tr><tr>`;
    for (let i = 0; i < 3; i++) {
        output += processRow(playerData, player, "super", superIDs, i);
    }
    output += `</tr></table>`
    output += nineTable(playerData, player, "charm", charmIDs);
    output += `</div>`;
    return output;
}
function nineTable(playerData, player, elementType, IDs) {
    let output = createTable() + `<tr><td colspan=5>${elementType.toUpperCase()}</td></tr><tr>`;
    for (let i = 0; i < 5; i++) {
        output += processRow(playerData, player, elementType, IDs, i);
    }
    output +=
        `</tr>
        </table>`+ createTable() + `<tr>`;
    for (let i = 5; i < 9; i++) {
        output += processRow(playerData, player, elementType, IDs, i);
    }
    output +=
        `</tr>
        </table>`;
    return output;
}
function createTable() {
    return `<table class="inventoryTable">`;
}
let currentEquip = {};
function processRow(playerData, player, elementType, IDs, i) {
    let clickClass = "clicked";
    let primaryEquip = "unequipped";
    let secondaryEquip = "unequipped";
    let equipClass = "unequipped";
    if (playerData[elementType + "s"].includes(IDs[i])) {
        clickClass = "unclicked";
    }
    if (elementType == "weapon") {
        let primaryID = playerData.primaryWeapon;
        if (primaryID == IDs[i]) {
            primaryEquip = "primary";
            currentEquip[player + "primary"] = player + "_weapon_" + primaryID;
        }
        let secondaryID = playerData.secondaryWeapon;
        if (secondaryID == IDs[i]) {
            secondaryEquip = "secondary";
            currentEquip[player + "secondary"] = player + "_weapon_" + secondaryID;
        }
    } else {
        let elementID = playerData[elementType];
        if (elementID == IDs[i]) {
            equipClass = elementType;
            currentEquip[player + elementType] = player + "_" + elementType + "_" + elementID;
        }
    }
    return createImage(elementType, player, IDs[i], i, clickClass, equipClass, primaryEquip, secondaryEquip);
}
function createImage(elementType, player, id, imageID, clickClass, equipClass, primaryEquip, secondaryEquip) {
    return `<td><img id="${player}_${elementType}_${id}" src="inventory/images/${elementType}s/${imageID + 1}.png" class="${clickClass} ${equipClass} ${primaryEquip} ${secondaryEquip}" onclick="clicked('${elementType}','${player}',${id})" draggable="false"></td>`;
}
function clicked(elementType, player, id) {
    let element = document.getElementById(player + "_" + elementType + "_" + id);
    if (event.shiftKey) {
        if (elementType == "weapon") {
            weaponCheck(element, "primary");
        } else {
            weaponCheck(element, elementType);
        }
    } else if (event.altKey) {
        if (elementType == "weapon") {
            weaponCheck(element, "secondary");
        }
    } else {
        equip_move.currentTime = 0;
        equip_move.play();
        element.classList.toggle("unclicked");
        element.classList.toggle("clicked");
    }
}
function weaponCheck(element, equipType) {
    let player = element.id.split("_")[0];
    let equipTypeID = currentEquip[player + equipType];
    let equipTypeReference = document.getElementById(equipTypeID);
    if (element.classList.contains(equipType)) {
        element.classList.remove(equipType);
        currentEquip[player + equipType] = null;
    } else {
        if (equipTypeID != null) {
            equipTypeReference.classList.remove(equipType);
        }
        currentEquip[player + equipType] = element.id;
        element.classList.add(equipType);
    }
    category_select.currentTime = 0;
    category_select.play();
    element.classList.toggle("unequipped");
}