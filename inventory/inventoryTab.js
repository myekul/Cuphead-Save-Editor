function printInventoryData(playerData) {
    let output = `<div id=inventoryHeader>
    <pre id='controls'>
    Controls:
    LEFT CLICK to equip primary weapon, super, and charm.
    RIGHT CLICK to equip secondary weapon.
    SHIFT+CLICK to add or remove items from inventory.
    </pre>
    <table id="inventoryOptions">
        <tr>
            <td><input id="p2toggle" type="checkbox" onchange="p2toggle();"></td>
            <td>Show P2</td>
        </tr>
        <tr>
            <td><input id="showUnused" type="checkbox" onchange="showUnused();"></td>
            <td>Show unused items</td>
        </tr>
    </table>
    </div>`;
    output += `<div id="flex-container">` + anInventory(playerData[0], "p1") + anInventory(playerData[1], "p2") + `</div>`;
    return output;
}
function anInventory(playerData, player) {
    let output = `<div id="${player}" class="player-column">`;
    const weaponIDs = Array.from(weaponMap.keys()).map(String);
    const charmIDs = Array.from(charmMap.keys()).map(String);
    const superIDs = Array.from(superMap.keys()).map(String);
    output += nineTable(playerData, player, "weapon", weaponIDs);
    output +=
        `<table class="inventoryTable">
            <tr>
                <th colspan=3>SUPER ART</th>
            </th>
            <tr>`;
    for (let i = 0; i < 3; i++) {
        output += processRow(playerData, player, "super", superIDs, i);
    }
    output += `</tr></table>`
    output += nineTable(playerData, player, "charm", charmIDs);
    output += `</div>`;
    return output;
}
function nineTable(playerData, player, elementType, IDs) {
    let output =
        `<table class="inventoryTable">
            <tr>
                <th colspan=5>${elementType.toUpperCase()}</th>
            </tr>
            <tr>`;
    for (let i = 0; i < 5; i++) {
        output += processRow(playerData, player, elementType, IDs, i);
    }
    output +=
        `</tr>
    </table>
    <table class="inventoryTable">
        <tr>`;
    for (let i = 5; i < 9; i++) {
        output += processRow(playerData, player, elementType, IDs, i);
    }
    output +=
        `</tr>
    </table>
    <table id='${player}_${elementType}sUnused' class="inventoryTable" style="display:none;">
        <tr>`;
    output += processRow(playerData, player, elementType, IDs, 9);
    if (elementType == "weapon") {
        output += processRow(playerData, player, elementType, IDs, 10);
    }
    output += `</tr>
        </table>`;
    return output;
}
let currentEquip = {};
function processRow(playerData, player, elementType, IDs, i) {
    let clickClass = "unclicked";
    let equipClass = "unequipped";
    if (i < 9) {
        if (!playerData[elementType + "s"].includes(IDs[i])) {
            clickClass = "clicked";
        }
    }
    if (elementType == "weapon") {
        let primaryID = playerData.primaryWeapon;
        if (primaryID == IDs[i]) {
            equipClass = "primary";
            currentEquip[player + "primary"] = player + "_weapon_" + primaryID;
        }
        let secondaryID = playerData.secondaryWeapon;
        if (secondaryID == IDs[i]) {
            equipClass = "secondary";
            currentEquip[player + "secondary"] = player + "_weapon_" + secondaryID;
        }
    } else {
        let elementID = playerData[elementType];
        if (elementID == IDs[i]) {
            equipClass = elementType;
            currentEquip[player + elementType] = player + "_" + elementType + "_" + elementID;
        }
    }
    return createImage(elementType, player, IDs[i], i, clickClass, equipClass);
}
function createImage(elementType, player, id, imageID, clickClass, equipClass) {
    return `<td class="item">
                <img
                    id="${player}_${elementType}_${id}"
                    src="inventory/images/${elementType}s/${imageID + 1}.png"
                    class="${clickClass} ${equipClass}"
                    onmousedown="clicked('${elementType}','${player}',${id})"
                    onmouseup="rightClickUp('${elementType}','${player}',${id})"
                    oncontextmenu="contextMenuPrevent()"
                    draggable="false"
                >
            </td>`;
}
function clicked(elementType, player, id) {
    let element = document.getElementById(player + "_" + elementType + "_" + id);
    if (event.shiftKey) {
        if (id == "1458758183" || id == "1465906052" || id == "1487056728") {
            locked.currentTime = 0;
            locked.play();
        } else {
            equip_move.currentTime = 0;
            equip_move.play();
            element.classList.toggle("unclicked");
            element.classList.toggle("clicked");
        }
    } else if (event.button === 2) {
        event.preventDefault();
        element.classList.remove("rightClickUp");
        element.classList.add("rightClickDown");
        if (elementType == "weapon") {
            weaponCheck(element, "secondary");
        } else {
            locked.currentTime = 0;
            locked.play();
        }
    } else {
        if (elementType == "weapon") {
            weaponCheck(element, "primary");
        } else {
            weaponCheck(element, elementType);
        }
    }
}
function rightClickUp(elementType, player, id) {
    let element = document.getElementById(player + "_" + elementType + "_" + id);
    element.classList.remove("rightClickDown");
    element.classList.add("rightClickUp");
}
function contextMenuPrevent() {
    event.preventDefault();
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
function p2toggle() {
    let p2toggle = document.getElementById("p2toggle");
    let p2 = document.getElementById("p2");
    if (p2toggle.checked) {
        p2.style.display = "block";
    } else {
        p2.style.display = "none";
    }
}
function showUnused() {
    let showUnused = document.getElementById("showUnused");
    let p1_weaponsUnused = document.getElementById("p1_weaponsUnused");
    let p2_weaponsUnused = document.getElementById("p2_weaponsUnused");
    let p1_charmsUnused = document.getElementById("p1_charmsUnused");
    let p2_charmsUnused = document.getElementById("p2_charmsUnused");
    if (showUnused.checked) {
        p1_weaponsUnused.style.display = "table";
        p2_weaponsUnused.style.display = "table";
        p1_charmsUnused.style.display = "table";
        p2_charmsUnused.style.display = "table";
    } else {
        p1_weaponsUnused.style.display = "none";
        p2_weaponsUnused.style.display = "none";
        p1_charmsUnused.style.display = "none";
        p2_charmsUnused.style.display = "none";
    }
}