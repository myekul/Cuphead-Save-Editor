// Converts save file bestTime to a m:ss.ms or ss.ms duration
function deserialize(value) {
    if (value == "") {
        return "";
    }
    let seconds = parseInt(value.split(".")[0]);
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;
    value = seconds + '.' + value.split('.')[1].slice(0, 2);
    if (value.split(".")[1]?.length == 1) {
        value += "0";
    }
    if (minutes > 0) {
        if (value < 10) {
            value = "0" + value;
        }
        value = minutes + ":" + value;
    }
    if (!value.includes(".")) {
        value += ".00";
    }
    return value;
}
// Converts m:ss.ms duration into a s.ms float value
function serialize(value) {
    if (value == "") {
        return "";
    }
    if (value.split(":")[1] == "") {
        value += "00";
    }
    if (!value.includes(".")) {
        value += ".00";
    }
    if (value.split(".")[1] == "") {
        value += "00";
    }
    if (value.includes(":")) {
        value = parseInt(value.split(":")[0]) * 60 + parseInt(value.split(":")[1].split(".")[0]) + "." + value.split(".")[1];
    }
    return value;
}
// Converts m:ss.ms duration into a m:ss duration
function display(value) {
    if (value == "") {
        return "?";
    }
    if (!value.includes(":")) {
        if(value<10){
            value="0"+value;
        }
        value="0:"+value;
    }
    return value.split(".")[0];
}