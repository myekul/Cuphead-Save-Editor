document.getElementById('downloadButton').addEventListener('click', function () {
    const modifiedFile = modifyLevels(fileContents);
    downloadFile(modifiedFile, fileName);
});
const tabs = document.querySelectorAll('.tab-links li');
const tabContent = document.querySelectorAll('.tab');

tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {
        event.preventDefault();
        tabs.forEach(item => item.classList.remove('active'));
        tabContent.forEach(content => content.classList.remove('active'));
        tab.classList.add('active');
        const activeTab = tab.querySelector('a').getAttribute('href');
        document.querySelector(activeTab).classList.add('active');
    });
});
// SFX
var cardflip = document.getElementById("cardflip");
var cardup = document.getElementById("cardup");
var equip_move = document.getElementById("equip_move");
var category_select = document.getElementById("category_select");
var locked = document.getElementById("locked");
var move = document.getElementById("move");
var ready = document.getElementById("ready");
const audioElements = document.querySelectorAll('audio');
audioElements.forEach(audio => {
    audio.volume = 0.2;
});
function playSound(){
    move.currentTime = 0;
    move.play();
}
const gramophone = document.getElementById('gramophone');
gramophone.addEventListener('click', function () {
    if (this.classList.contains("clicked")) {
        audioElements.forEach(audio => {
            audio.volume = 0.2;
        });
    } else {
        audioElements.forEach(audio => {
            audio.volume = 0.0;
        });
    }
    this.classList.toggle("clicked");
    this.classList.toggle("unclicked");
});