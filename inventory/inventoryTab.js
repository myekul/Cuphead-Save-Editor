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
            <td><input id="p2toggle" type="checkbox" onchange="toggleVisibility('tooltip');toggleVisibility('p2');"></td>
            <td>Show P2</td>
        </tr>
        <tr>
            <td><input id="showUnused" type="checkbox" onchange="toggleUnused();"></td>
            <td>Show unused items</td>
        </tr>
    </table>
    </div>`;
    output += `<div id="flex-container">` + anInventory(playerData[0], "p1") + tooltip() + anInventory(playerData[1], "p2") + `</div>`;
    return output;
}
function anInventory(playerData, player) {
    let output = `<div id="${player}" class="player-column`;
    if (player == "p2") {
        output += " hide"
    }
    output += '">'
    const weaponIDs = Array.from(weaponMap.keys()).map(String);
    const charmIDs = Array.from(charmMap.keys()).map(String);
    const superIDs = Array.from(superMap.keys()).map(String);
    output += nineTable(playerData, player, "weapon", weaponIDs);
    output +=
        `<table class="inventoryTable">
            <tr>
                <th colspan=3>SUPER</th>
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
    // Unused weapons / charm
    output +=
        `</tr>
    </table>
    <table id='${player}_${elementType}sUnused' class="inventoryTable hide">
        <tr>`;
    output += processRow(playerData, player, elementType, IDs, 9);
    if (elementType == "weapon") {
        output += processRow(playerData, player, elementType, IDs, 10);
    }
    output += `</tr>
        </table>`;
    return output;
}
function processRow(playerData, player, elementType, IDs, i) {
    let clickClass = "unclicked";
    let equipClass = "unequipped";
    if (i < 9) {
        if (!playerData[elementType + "s"].includes(IDs[i])) {
            clickClass = "clicked";
        }
    }
    let elementTypes = ["primary", "secondary", "super", "charm"];
    elementTypes.forEach(type => {
        let ID = playerData[type];
        if (ID == IDs[i]) {
            equipClass = type;
            currentEquip[player + type] = ID;
        }
    });
    return createImage(elementType, player, IDs[i], i + 1, clickClass, equipClass);
}
function createImage(elementType, player, id, imageID, clickClass, equipClass) {
    return `<td class="item">
                <img
                    id="${player}_${elementType}_${id}"
                    src="inventory/images/${elementType}s/${imageID}.png"
                    class="${clickClass} ${equipClass}"
                    onmouseover="changeTooltip(${id},'${elementType}',${imageID})"
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
        if (id == "1458758183" || id == "1465906052" || id == "1487056728") { // The three unused items
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
    let elementType = element.id.split("_")[1];
    let equipTypeID = currentEquip[player + equipType];
    let equipTypeReference = document.getElementById(player + "_" + elementType + "_" + equipTypeID);
    if (element.classList.contains(equipType)) {
        element.classList.remove(equipType);
        currentEquip[player + equipType] = nullItem;
    } else {
        if (equipTypeID != nullItem) {
            equipTypeReference.classList.remove(equipType);
        }
        currentEquip[player + equipType] = parseInt(element.id.split("_")[2]);
        element.classList.add(equipType);
    }
    category_select.currentTime = 0;
    category_select.play();
    element.classList.toggle("unequipped");
}
function toggleUnused() {
    toggleTableVisibility("p1_weaponsUnused");
    toggleTableVisibility("p2_weaponsUnused");
    toggleTableVisibility("p1_charmsUnused");
    toggleTableVisibility("p2_charmsUnused");
}
function toggleVisibility(elementID) {
    let element = document.getElementById(elementID);
    element.classList.toggle("show");
    element.classList.toggle("hide");
}
function toggleTableVisibility(elementID) {
    let element = document.getElementById(elementID);
    element.classList.toggle("showTable");
    element.classList.toggle("hide");
}
function tooltip() {
    let output = `
    <div id="tooltip" class="show">
        <img id="tooltipIcon">
        <div id="tooltipTitle"></div>
        <div id="tooltipSubtitle"></div>
        <div id="tooltipDescription"></div>
    </div>`;
    return output;
}
function changeTooltip(id, elementType, imageID) {
    let tooltip = document.getElementById("tooltip");
    if (!tooltip.classList.contains("hide")) {
        let item = tooltipMap[id]
        let icon = document.getElementById("tooltipIcon");
        let title = document.getElementById("tooltipTitle");
        let subtitle = document.getElementById("tooltipSubtitle");
        let description = document.getElementById("tooltipDescription");
        icon.src = "inventory/images/" + elementType + "s/" + imageID + ".png"
        title.innerText = item.name;
        subtitle.innerText = item.subtitle;
        description.innerHTML = item.description;
    }
}